import type { ClubRole, EventApprovalAction } from "@prisma/client";
import { createTRPCRouter, publicProcedure, protectedProcedure, protectedOrganizerProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { CreateEventSchema } from "@/features/events/components/CreateEventSchema";
import { matchesAttendeeQuery, resolveAttendeePrn } from "@/features/attendance/checkin-search.utils";
import { decodeTicketPayloadToken, getTicketPayloadSecret, verifyTicketPayloadToken } from "@/lib/ticket-payload";
import { resolveDiscussionDisplayName } from "@/lib/discussion";
import { deriveFeedPreferenceSignals } from "@/server/services/feed-preferences";
import { FEED_RESULT_LIMIT, buildPublishedFeedQuery, selectTopPersonalizedFeedEvents } from "@/server/services/feed-query";
import { buildHappeningThisWeekQuery } from "@/server/services/happening-this-week-query";
import {
  buildStudentRelevanceProfile,
} from "@/server/services/feed-ranking";
import type { db as prismaDb } from "@/server/db";
import { assertCanManageEvent, getClubManagementRole, isAdminUserRole } from "@/server/permissions/club-management";
import { TRPCError } from "@trpc/server";

type OrganizerCtx = {
  db: typeof prismaDb;
  session: {
    user: {
      id: string;
      role?: "ORGANIZER" | "ADMIN" | "SUPER_ADMIN" | "STUDENT";
      collegeId?: string | null;
    };
  };
};

const manageableClubRoles: ClubRole[] = ["OWNER", "EDITOR"];

async function assertOrganizerOwnsEvent(ctx: OrganizerCtx, eventId: number): Promise<void> {
  await assertCanManageEvent(ctx, eventId, {
    forbiddenMessage: "Unauthorized for this event",
  });
}

async function markAttendedRsvp(
  ctx: OrganizerCtx,
  params: { eventId: number; rsvpId: number; expectedUserId: string },
) {
  const rsvp = await ctx.db.rSVP.findUnique({
    where: { id: params.rsvpId },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  if (rsvp?.eventId !== params.eventId) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Ticket does not belong to this event" });
  }

  if (rsvp.userId !== params.expectedUserId) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Ticket ownership mismatch" });
  }

  if (rsvp.status === "ATTENDED") {
    return rsvp;
  }

  return ctx.db.rSVP.update({
    where: { id: rsvp.id },
    data: { status: "ATTENDED" },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
  });
}

function createApprovalLog(
  ctx: OrganizerCtx,
  params: { eventId: number; action: EventApprovalAction; reason?: string },
) {
  return ctx.db.eventApprovalLog.create({
    data: {
      eventId: params.eventId,
      actorId: ctx.session.user.id,
      action: params.action,
      reason: params.reason,
    },
  });
}

export const eventRouter = createTRPCRouter({
  delete: protectedOrganizerProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      const { event } = await assertCanManageEvent(ctx, input.id, {
        forbiddenMessage: "Unauthorized for this event",
      });

      if (event.status !== "DRAFT" && event.status !== "REJECTED") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Only draft or rejected events can be deleted.",
        });
      }
      
      return ctx.db.event.delete({ where: { id: input.id } });
    }),

  updateStatus: protectedOrganizerProcedure
    .input(z.object({ id: z.number().int(), status: z.literal("CANCELLED") }))
    .mutation(async ({ ctx, input }) => {
      const { event } = await assertCanManageEvent(ctx, input.id, {
        forbiddenMessage: "Unauthorized for this event",
      });

      if (event.status !== "PUBLISHED") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Only published events can be cancelled.",
        });
      }
      
      return ctx.db.event.update({
        where: { id: input.id },
        data: { status: input.status },
      });
    }),

  create: protectedOrganizerProcedure
    .input(CreateEventSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.imageUrl.trim()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Add a real event image URL before saving this event.",
        });
      }

      const { club } = await assertCanManageClubForCreation(ctx, input.clubId);

      if (!ctx.session.user.collegeId || ctx.session.user.collegeId !== club.collegeId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User session is not associated with the selected club's college.",
        });
      }

      return ctx.db.event.create({
        data: {
          title: input.title,
          description: input.description,
          date: input.date,
          location: input.location,
          imageUrl: input.imageUrl,
          capacity: input.capacity,
          clubId: input.clubId,
          authorId: ctx.session.user.id,
          collegeId: club.collegeId,
        },
      });
    }),

  submitForReview: protectedOrganizerProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      const { event } = await assertCanManageEvent(ctx, input.id, {
        forbiddenMessage: "Unauthorized for this event",
      });

      if (event.status !== "DRAFT") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Only draft events can be submitted for review.",
        });
      }

      const submittedAt = new Date();
      const [updatedEvent] = await ctx.db.$transaction([
        ctx.db.event.update({
          where: { id: event.id },
          data: {
            status: "SUBMITTED",
            submittedAt,
          },
          select: {
            id: true,
            title: true,
            status: true,
            submittedAt: true,
          },
        }),
        createApprovalLog(ctx, {
          eventId: event.id,
          action: "SUBMITTED",
        }),
      ]);

      return updatedEvent;
    }),

  publishApproved: protectedOrganizerProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      const { event } = await assertCanManageEvent(ctx, input.id, {
        forbiddenMessage: "Unauthorized for this event",
      });

      if (event.status !== "APPROVED") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Only approved events can be published.",
        });
      }

      return ctx.db.event.update({
        where: { id: event.id },
        data: {
          status: "PUBLISHED",
        },
        select: {
          id: true,
          title: true,
          status: true,
        },
      });
    }),

  search: protectedProcedure
    .input(z.object({ query: z.string().min(1).max(100) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.event.findMany({
        where: {
          status: "PUBLISHED",
          OR: [
            { title: { contains: input.query, mode: "insensitive" } },
            { description: { contains: input.query, mode: "insensitive" } },
          ],
        },
        take: 5,
        orderBy: { date: "asc" },
      });
    }),
  getOrganizerDrafts: protectedOrganizerProcedure.query(async ({ ctx }) => {    
    const where =
      isAdminUserRole(ctx.session.user.role) && ctx.session.user.collegeId
        ? { collegeId: ctx.session.user.collegeId }
        : {
            club: {
              is: {
                members: {
                  some: {
                    userId: ctx.session.user.id,
                    role: {
                      in: manageableClubRoles,
                    },
                  },
                },
              },
            },
          };

    return ctx.db.event.findMany({
      where,
      include: {
        approvalLogs: {
          where: {
            action: "REJECTED",
          },
          orderBy: { createdAt: "desc" },
          take: 1,
          select: {
            reason: true,
            createdAt: true,
          },
        },
        _count: {
          select: { rsvps: true }
        }
      },
      orderBy: { date: "desc" },
    });
  }),

  getFeed: publicProcedure.query(async ({ ctx }) => {
    const events = await ctx.db.event.findMany(buildPublishedFeedQuery());

    if (!ctx.session?.user?.id) {
      return events.slice(0, FEED_RESULT_LIMIT);
    }

    const followedRows = await ctx.db.hubFollow.findMany({
      where: { userId: ctx.session.user.id },
      select: {
        clubId: true,
      },
    });

    const followedClubIds = followedRows.map((row) => row.clubId);
    const { courseKeywords, selectedDomains } = deriveFeedPreferenceSignals(ctx.headers);

    const profile = buildStudentRelevanceProfile({
      courseKeywords,
      selectedDomains,
      followedClubIds,
    });

    return selectTopPersonalizedFeedEvents(events, profile);
  }),

  getHappeningThisWeek: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.event.findMany(buildHappeningThisWeekQuery());
  }),

  getDiscussionThreads: protectedProcedure
    .input(z.object({ eventId: z.number().int().positive() }))
    .query(async ({ ctx, input }) => {
      const event = await ctx.db.event.findUnique({
        where: { id: input.eventId },
        select: { id: true, authorId: true, clubId: true, collegeId: true },
      });

      if (!event) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Event not found" });
      }

      const threads = await ctx.db.eventDiscussionThread.findMany({
        where: { eventId: input.eventId },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          replies: {
            orderBy: { createdAt: "asc" },
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
        orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
      });

      const viewerCanManagePin = Boolean(
        await getClubManagementRole(
          ctx,
          { id: event.clubId, collegeId: event.collegeId },
          undefined,
        ),
      );

      return threads.map((thread) => ({
        id: thread.id,
        eventId: thread.eventId,
        question: thread.question,
        pinned: thread.pinned,
        createdAt: thread.createdAt,
        author: {
          id: thread.author.id,
          displayName: resolveDiscussionDisplayName(thread.author.name, thread.author.email),
        },
        replies: thread.replies.map((reply) => ({
          id: reply.id,
          message: reply.message,
          createdAt: reply.createdAt,
          author: {
            id: reply.author.id,
            displayName: resolveDiscussionDisplayName(reply.author.name, reply.author.email),
            isOrganizer: reply.authorId === event.authorId,
          },
        })),
        canManagePin: viewerCanManagePin,
      }));
    }),

  createDiscussionThread: protectedProcedure
    .input(
      z.object({
        eventId: z.number().int().positive(),
        question: z.string().trim().min(8).max(600),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const event = await ctx.db.event.findUnique({
        where: { id: input.eventId },
        select: { id: true },
      });

      if (!event) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Event not found" });
      }

      return ctx.db.eventDiscussionThread.create({
        data: {
          eventId: input.eventId,
          authorId: ctx.session.user.id,
          question: input.question,
        },
      });
    }),

  replyToDiscussionThread: protectedOrganizerProcedure
    .input(
      z.object({
        threadId: z.number().int().positive(),
        message: z.string().trim().min(3).max(800),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const thread = await ctx.db.eventDiscussionThread.findUnique({
        where: { id: input.threadId },
        select: {
          id: true,
          eventId: true,
        },
      });

      if (!thread) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Thread not found" });
      }

      await assertCanManageEvent(ctx, thread.eventId, {
        forbiddenMessage: "Only club managers can reply with organizer authority",
      });

      return ctx.db.eventDiscussionReply.create({
        data: {
          threadId: thread.id,
          authorId: ctx.session.user.id,
          message: input.message,
        },
      });
    }),

  toggleDiscussionPin: protectedOrganizerProcedure
    .input(
      z.object({
        threadId: z.number().int().positive(),
        pinned: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const thread = await ctx.db.eventDiscussionThread.findUnique({
        where: { id: input.threadId },
        select: {
          id: true,
          eventId: true,
        },
      });

      if (!thread) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Thread not found" });
      }

      await assertCanManageEvent(ctx, thread.eventId, {
        forbiddenMessage: "Only club managers can pin or unpin threads",
      });

      return ctx.db.eventDiscussionThread.update({
        where: { id: thread.id },
        data: { pinned: input.pinned },
        select: { id: true, pinned: true },
      });
    }),

  getAttendees: protectedOrganizerProcedure
    .input(z.object({ eventId: z.number().int().positive() }))
    .query(async ({ ctx, input }) => {
      const event = await ctx.db.event.findUnique({
        where: {
          id: input.eventId,
        },
        include: {
          rsvps: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      });

      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }

      await assertCanManageEvent(ctx, input.eventId, {
        forbiddenMessage: "Unauthorized to view attendees for this event",
      });

      return event.rsvps;
    }),

  redeemTicket: protectedOrganizerProcedure
    .input(
      z.object({
        eventId: z.number().int().positive(),
        token: z.string().min(10),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await assertOrganizerOwnsEvent(ctx, input.eventId);

      let payloadSecret: string;
      try {
        payloadSecret = getTicketPayloadSecret();
      } catch {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Ticket security is not configured",
        });
      }

      const isValidToken = verifyTicketPayloadToken(input.token, payloadSecret);

      if (!isValidToken) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid QR payload" });
      }

      let payload: ReturnType<typeof decodeTicketPayloadToken>;
      try {
        payload = decodeTicketPayloadToken(input.token, payloadSecret);
      } catch {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Malformed QR payload" });
      }

      const ticketId = Number.parseInt(payload.eventTicketId, 10);
      if (!Number.isInteger(ticketId) || ticketId <= 0) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid ticket identifier" });
      }

      const updated = await markAttendedRsvp(ctx, {
        eventId: input.eventId,
        rsvpId: ticketId,
        expectedUserId: payload.studentId,
      });

      return {
        rsvpId: updated.id,
        userId: updated.userId,
        attendeeName: updated.user.name ?? updated.user.email ?? "Student",
        status: updated.status,
      };
    }),

  searchAttendees: protectedOrganizerProcedure
    .input(
      z.object({
        eventId: z.number().int().positive(),
        query: z.string().min(1).max(100),
      }),
    )
    .query(async ({ ctx, input }) => {
      await assertOrganizerOwnsEvent(ctx, input.eventId);

      const attendees = await ctx.db.rSVP.findMany({
        where: { eventId: input.eventId },
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      return attendees
        .filter((rsvp) =>
          matchesAttendeeQuery(
            {
              userId: rsvp.user.id,
              name: rsvp.user.name,
              email: rsvp.user.email,
            },
            input.query,
          ),
        )
        .slice(0, 20)
        .map((rsvp) => ({
          rsvpId: rsvp.id,
          userId: rsvp.user.id,
          name: rsvp.user.name,
          email: rsvp.user.email,
          prn: resolveAttendeePrn({ userId: rsvp.user.id, email: rsvp.user.email }),
          status: rsvp.status,
        }));
    }),

  forceCheckIn: protectedOrganizerProcedure
    .input(
      z.object({
        eventId: z.number().int().positive(),
        userId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await assertOrganizerOwnsEvent(ctx, input.eventId);

      const rsvp = await ctx.db.rSVP.findFirst({
        where: {
          eventId: input.eventId,
          userId: input.userId,
        },
        select: {
          id: true,
        },
      });

      if (!rsvp) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Attendee ticket not found" });
      }

      const updated = await markAttendedRsvp(ctx, {
        eventId: input.eventId,
        rsvpId: rsvp.id,
        expectedUserId: input.userId,
      });

      return {
        rsvpId: updated.id,
        userId: updated.userId,
        attendeeName: updated.user.name ?? updated.user.email ?? "Student",
        status: updated.status,
      };
    }),

  getMyCalendar: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.event.findMany({
      where: {
        rsvps: {
          some: {
            userId: ctx.session.user.id,
          },
        },
      },
      orderBy: { date: "asc" },
      include: {
        rsvps: {
          where: {
            userId: ctx.session.user.id,
          },
          select: {
            status: true,
          }
        },
        club: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
          },
        },
        _count: {
          select: {
            rsvps: true,
          },
        },
      },
    });
  }),
});

async function assertCanManageClubForCreation(ctx: OrganizerCtx, clubId: number) {
  const club = await ctx.db.club.findUnique({
    where: { id: clubId },
    select: {
      id: true,
      collegeId: true,
    },
  });

  if (!club) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Selected club was not found.",
    });
  }

  const accessRole = await getClubManagementRole(ctx, club);
  if (!accessRole) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You can only create events for clubs you manage.",
    });
  }

  return { club, accessRole };
}
