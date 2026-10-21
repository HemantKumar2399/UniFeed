import type {
  ClubRole,
  EventApprovalAction,
  EventStatus,
} from "@prisma/client";
import { observable } from "@trpc/server/observable";
import {
  createTRPCRouter,
  protectedProcedure,
  protectedOrganizerProcedure,
} from "@/server/api/trpc";
import { z } from "zod";
import {
  CreateEventSchema,
  type CreateEventInput,
} from "@/features/events/components/CreateEventSchema";
import {
  attendeeFilterStatuses,
  attendeeSortOptions,
  filterAndSortAttendees,
  getAttendeeCounts,
  mapAttendeeRow,
} from "@/features/attendance/attendee-management";
import { type EventAttendanceRealtimePayload } from "@/features/attendance/realtime-attendance";
import { resolveDiscussionDisplayName } from "@/lib/discussion";
import { isRegistrationReopenable } from "@/lib/event-registration";
import {
  decodeStudentQrToken,
  getStudentQrSecret,
  verifyStudentQrToken,
} from "@/lib/student-qr";
import { buildHappeningThisWeekQuery } from "@/server/services/happening-this-week-query";
import { getPersonalizedFeed } from "@/server/domain/feed-engine";
import { publishAttendanceUpdate } from "@/server/services/attendance-realtime";
import type { db as prismaDb } from "@/server/db";
import { ee } from "@/server/events";
import {
  assertCanManageEvent,
  getClubManagementRole,
  isAdminUserRole,
} from "@/server/permissions/club-management";
import { TRPCError } from "@trpc/server";

type OrganizerCtx = {
  db: typeof prismaDb;
  session: {
    user: {
      id: string;
      role?: "ORGANIZER" | "ADMIN" | "STUDENT";
      collegeId?: string | null;
    };
  };
};

const manageableClubRoles: ClubRole[] = ["OWNER", "EDITOR"];
const editableEventStatuses: EventStatus[] = ["DRAFT", "REJECTED"];
const scannableEventStatuses: EventStatus[] = ["PUBLISHED"];
const REGISTRATION_DEADLINE_INVALID_MESSAGE =
  "Registration deadline must be set to a future time before the event starts.";

type StudentQrVerificationOutcome =
  | "CHECKED_IN"
  | "ALREADY_CHECKED_IN"
  | "NOT_REGISTERED"
  | "WRONG_COLLEGE"
  | "INVALID_QR"
  | "REVOKED_QR"
  | "EVENT_NOT_SCANNABLE"
  | "SCANNER_UNAVAILABLE";

type StudentQrVerificationResult = {
  outcome: StudentQrVerificationOutcome;
  message: string;
  attendeeName?: string;
  rsvpId?: number;
  userId?: string;
};

function isEditableEventStatus(status: EventStatus): boolean {
  return editableEventStatuses.includes(status);
}

function isScannableEventStatus(status: EventStatus): boolean {
  return scannableEventStatuses.includes(status);
}

async function getEventAttendanceSnapshot(ctx: OrganizerCtx, eventId: number) {
  const event = await ctx.db.event.findUnique({
    where: { id: eventId },
    select: {
      id: true,
      title: true,
      date: true,
      capacity: true,
      club: {
        select: {
          name: true,
        },
      },
      college: {
        select: {
          name: true,
        },
      },
      rsvps: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          userId: true,
          status: true,
          checkedInAt: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              studentProfile: {
                select: {
                  prn: true,
                  branch: true,
                  course: true,
                  graduationYear: true,
                },
              },
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

  return {
    event: {
      id: event.id,
      title: event.title,
      date: event.date,
      capacity: event.capacity,
      clubName: event.club.name,
      collegeName: event.college.name,
    },
    attendees: event.rsvps.map(mapAttendeeRow),
  };
}

async function assertCanCheckInToEvent(ctx: OrganizerCtx, eventId: number) {
  const { event } = await assertCanManageEvent(ctx, eventId, {
    forbiddenMessage: "Unauthorized for this event",
  });

  if (event.status === "CANCELLED") {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Cancelled events do not allow check-in.",
    });
  }

  return event;
}

async function markAttendedRsvp(
  ctx: OrganizerCtx,
  params: { eventId: number; rsvpId: number; expectedUserId: string },
) {
  return ctx.db.$transaction(async (tx) => {
    await tx.$executeRaw`SELECT id FROM "Event" WHERE id = ${params.eventId} FOR UPDATE`;
    const event = await tx.event.findUnique({ where: { id: params.eventId } });
    if (!event || event.deletedAt || event.status !== "PUBLISHED") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Event is not available for check-in.",
      });
    }
    const rsvp = await tx.rSVP.findUnique({
      where: { id: params.rsvpId },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!rsvp) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Attendee ticket not found",
      });
    }

    if (rsvp?.eventId !== params.eventId) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Ticket does not belong to this event",
      });
    }

    if (rsvp.userId !== params.expectedUserId) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Ticket ownership mismatch",
      });
    }

    if (rsvp.status === "ATTENDED") {
      return {
        changed: false,
        rsvp,
      };
    }

    if (rsvp.status !== "GOING") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Only confirmed attendees can be checked in.",
      });
    }

    const updatedRsvp = await tx.rSVP.update({
      where: { id: rsvp.id },
      data: { status: "ATTENDED", checkedInAt: new Date() },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return {
      changed: true,
      rsvp: updatedRsvp,
    };
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

function buildEventCreateData(
  input: CreateEventInput,
  params: { authorId: string; collegeId: string },
) {
  return {
    title: input.title,
    description: input.description,
    date: input.date,
    registrationClosesAt: input.registrationClosesAt,
    location: input.location,
    imageUrl: input.imageUrl,
    capacity: input.capacity,
    clubId: input.clubId,
    collegeId: params.collegeId,
    category: input.category,
    tags: input.tags,
    domain: input.domain,
    isFreeFood: input.isFreeFood,
    hasCertificate: input.hasCertificate,
    isPaid: input.isPaid,
    targetBranches: input.targetBranches,
    authorId: params.authorId,
  };
}

function buildStudentQrVerificationResult(
  outcome: StudentQrVerificationOutcome,
  message: string,
  extra: Omit<StudentQrVerificationResult, "outcome" | "message"> = {},
): StudentQrVerificationResult {
  return {
    outcome,
    message,
    ...extra,
  };
}

function buildEventUpdateData(
  input: CreateEventInput,
  params: { collegeId: string },
) {
  return {
    title: input.title,
    description: input.description,
    date: input.date,
    registrationClosesAt: input.registrationClosesAt,
    location: input.location,
    imageUrl: input.imageUrl,
    capacity: input.capacity,
    clubId: input.clubId,
    collegeId: params.collegeId,
    category: input.category,
    tags: input.tags,
    domain: input.domain,
    isFreeFood: input.isFreeFood,
    hasCertificate: input.hasCertificate,
    isPaid: input.isPaid,
    targetBranches: input.targetBranches,
  };
}

function getRegistrationDeadlineValidationMessage(
  input: {
    date: Date;
    registrationClosesAt: Date | null;
  },
  now: Date = new Date(),
): string | null {
  if (!input.registrationClosesAt) {
    return REGISTRATION_DEADLINE_INVALID_MESSAGE;
  }

  if (input.registrationClosesAt <= now) {
    return REGISTRATION_DEADLINE_INVALID_MESSAGE;
  }

  if (input.registrationClosesAt >= input.date) {
    return REGISTRATION_DEADLINE_INVALID_MESSAGE;
  }

  return null;
}

function assertValidRegistrationDeadline(
  input: {
    date: Date;
    registrationClosesAt: Date | null;
  },
  now: Date = new Date(),
) {
  const message = getRegistrationDeadlineValidationMessage(input, now);

  if (message) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message,
    });
  }
}

export const eventRouter = createTRPCRouter({
  onAttendanceChange: protectedOrganizerProcedure
    .input(z.object({ eventId: z.number().int().positive() }))
    .subscription(async ({ ctx, input }) => {
      await assertCanManageEvent(ctx, input.eventId, {
        forbiddenMessage: "Unauthorized for this event",
      });

      return observable<EventAttendanceRealtimePayload>((emit) => {
        const onAttendanceChange = (
          payload: EventAttendanceRealtimePayload,
        ) => {
          if (payload.eventId === input.eventId) {
            emit.next(payload);
          }
        };

        ee.on("attendanceChange", onAttendanceChange);

        return () => {
          ee.off("attendanceChange", onAttendanceChange);
        };
      });
    }),

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

      return ctx.db.event.update({
        where: { id: input.id },
        data: { deletedAt: new Date() },
      });
    }),

  update: protectedOrganizerProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
        data: CreateEventSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { event } = await assertCanManageEvent(ctx, input.id, {
        forbiddenMessage: "Unauthorized for this event",
      });

      if (!isEditableEventStatus(event.status)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Only draft or rejected events can be edited.",
        });
      }

      if (!input.data.imageUrl.trim()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Add a real event image URL before saving this event.",
        });
      }

      assertValidRegistrationDeadline(input.data);

      const { club } = await assertCanManageClubForCreation(
        ctx,
        input.data.clubId,
      );

      if (
        !ctx.session.user.collegeId ||
        ctx.session.user.collegeId !== club.collegeId
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "User session is not associated with the selected club's college.",
        });
      }

      return ctx.db.event.update({
        where: { id: input.id },
        data: buildEventUpdateData(input.data, {
          collegeId: club.collegeId,
        }),
        select: {
          id: true,
          title: true,
          status: true,
          updatedAt: true,
        },
      });
    }),

  cancel: protectedOrganizerProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
        reason: z
          .string()
          .trim()
          .min(10, "Cancellation reason must be at least 10 characters.")
          .max(500),
      }),
    )
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

      const rsvps = await ctx.db.rSVP.findMany({
        where: {
          eventId: input.id,
          status: {
            in: ["GOING", "WAITLISTED"],
          },
        },
        select: {
          userId: true,
        },
      });

      const cancelledAt = new Date();
      const [updatedEvent] = await ctx.db.$transaction([
        ctx.db.event.update({
          where: { id: input.id },
          data: {
            status: "CANCELLED",
            cancelledAt,
            cancellationReason: input.reason,
          },
          select: {
            id: true,
            title: true,
            status: true,
            cancelledAt: true,
            cancellationReason: true,
          },
        }),
        createApprovalLog(ctx, {
          eventId: input.id,
          action: "CANCELLED",
          reason: input.reason,
        }),
      ]);

      if (rsvps.length > 0) {
        await ctx.db.notification.createMany({
          data: rsvps.map((r) => ({
            userId: r.userId,
            type: "EVENT_CANCELLED",
            title: `Event Cancelled: ${updatedEvent.title}`,
            message: `The event "${updatedEvent.title}" has been cancelled by the organizer. Reason: ${input.reason}`,
            linkUrl: `/events/${updatedEvent.id}`,
          })),
        });
      }

      return updatedEvent;
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

      assertValidRegistrationDeadline(input);

      const { club } = await assertCanManageClubForCreation(ctx, input.clubId);

      if (
        !ctx.session.user.collegeId ||
        ctx.session.user.collegeId !== club.collegeId
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "User session is not associated with the selected club's college.",
        });
      }

      return ctx.db.event.create({
        data: {
          ...buildEventCreateData(input, {
            authorId: ctx.session.user.id,
            collegeId: club.collegeId,
          }),
          status: "DRAFT",
          submittedAt: null,
          cancelledAt: null,
          cancellationReason: null,
        },
      });
    }),

  submitForReview: protectedOrganizerProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      const { event } = await assertCanManageEvent(ctx, input.id, {
        forbiddenMessage: "Unauthorized for this event",
      });

      if (!isEditableEventStatus(event.status)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Only draft or rejected events can be submitted for review.",
        });
      }

      const currentEvent = await ctx.db.event.findUnique({
        where: { id: event.id },
        select: {
          id: true,
          date: true,
          registrationClosesAt: true,
        },
      });

      if (!currentEvent) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }

      assertValidRegistrationDeadline(currentEvent);

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

      const currentEvent = await ctx.db.event.findUnique({
        where: { id: event.id },
        select: {
          id: true,
          date: true,
          registrationClosesAt: true,
        },
      });

      if (!currentEvent) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }

      assertValidRegistrationDeadline(currentEvent);

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

  extendRegistrationDeadline: protectedOrganizerProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
        registrationClosesAt: z.coerce.date({
          required_error: "Please enter a registration deadline",
          invalid_type_error: "Please enter a valid registration deadline",
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { event } = await assertCanManageEvent(ctx, input.id, {
        forbiddenMessage: "Unauthorized for this event",
      });

      const currentEvent = await ctx.db.event.findUnique({
        where: { id: event.id },
        select: {
          id: true,
          title: true,
          status: true,
          date: true,
          registrationClosesAt: true,
        },
      });

      if (!currentEvent) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }

      if (!isRegistrationReopenable(currentEvent)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Only approved or published upcoming events can extend registration.",
        });
      }

      assertValidRegistrationDeadline({
        date: currentEvent.date,
        registrationClosesAt: input.registrationClosesAt,
      });

      const reason = currentEvent.registrationClosesAt
        ? `Registration deadline updated from ${currentEvent.registrationClosesAt.toISOString()} to ${input.registrationClosesAt.toISOString()}.`
        : `Registration deadline set to ${input.registrationClosesAt.toISOString()}.`;

      const [updatedEvent] = await ctx.db.$transaction([
        ctx.db.event.update({
          where: { id: currentEvent.id },
          data: {
            registrationClosesAt: input.registrationClosesAt,
          },
          select: {
            id: true,
            title: true,
            status: true,
            date: true,
            registrationClosesAt: true,
          },
        }),
        createApprovalLog(ctx, {
          eventId: currentEvent.id,
          action: "REGISTRATION_DEADLINE_EXTENDED",
          reason,
        }),
      ]);

      return updatedEvent;
    }),

  getOrganizerDrafts: protectedOrganizerProcedure.query(async ({ ctx }) => {
    const where =
      isAdminUserRole(ctx.session.user.role) && ctx.session.user.collegeId
        ? { collegeId: ctx.session.user.collegeId, deletedAt: null }
        : {
            deletedAt: null,
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
          select: { rsvps: true },
        },
      },
      orderBy: { date: "desc" },
    });
  }),

  getFeed: protectedProcedure.query(async ({ ctx }) => {
    const collegeId = ctx.session.user.collegeId;
    const userId = ctx.session.user.id;

    if (!collegeId) {
      throw new TRPCError({
        code: "PRECONDITION_FAILED",
        message: "User session is missing a college association.",
      });
    }

    return getPersonalizedFeed(
      { db: ctx.db, headers: ctx.headers },
      userId,
      collegeId,
    );
  }),

  getHappeningThisWeek: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user.collegeId) {
      throw new TRPCError({
        code: "PRECONDITION_FAILED",
        message: "User session is missing a college association.",
      });
    }
    return ctx.db.event.findMany(
      buildHappeningThisWeekQuery(ctx.session.user.collegeId),
    );
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
          displayName: resolveDiscussionDisplayName(
            thread.author.name,
            thread.author.email,
          ),
        },
        replies: thread.replies.map((reply) => ({
          id: reply.id,
          message: reply.message,
          createdAt: reply.createdAt,
          author: {
            id: reply.author.id,
            displayName: resolveDiscussionDisplayName(
              reply.author.name,
              reply.author.email,
            ),
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
        forbiddenMessage:
          "Only club managers can reply with organizer authority",
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
    .input(
      z.object({
        eventId: z.number().int().positive(),
        q: z.string().trim().max(100).optional(),
        status: z.enum(attendeeFilterStatuses).optional(),
        sort: z.enum(attendeeSortOptions).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      await assertCanManageEvent(ctx, input.eventId, {
        forbiddenMessage: "Unauthorized to view attendees for this event",
      });

      const { event, attendees } = await getEventAttendanceSnapshot(
        ctx,
        input.eventId,
      );

      return {
        event,
        attendees: filterAndSortAttendees(attendees, input),
        counts: getAttendeeCounts(attendees),
      };
    }),

  verifyStudentQrForEvent: protectedOrganizerProcedure
    .input(
      z.object({
        eventId: z.number().int().positive(),
        token: z.string().min(10),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { event } = await assertCanManageEvent(ctx, input.eventId, {
        forbiddenMessage: "Unauthorized for this event",
      });

      if (!isScannableEventStatus(event.status)) {
        return buildStudentQrVerificationResult(
          "EVENT_NOT_SCANNABLE",
          "This event is not currently scannable.",
        );
      }

      let payloadSecret: string;
      try {
        payloadSecret = getStudentQrSecret();
      } catch {
        return buildStudentQrVerificationResult(
          "SCANNER_UNAVAILABLE",
          "Student QR security is not configured.",
        );
      }

      if (!verifyStudentQrToken(input.token, payloadSecret)) {
        return buildStudentQrVerificationResult(
          "INVALID_QR",
          "Invalid student passport QR.",
        );
      }

      let payload: ReturnType<typeof decodeStudentQrToken>;
      try {
        payload = decodeStudentQrToken(input.token, payloadSecret);
      } catch {
        return buildStudentQrVerificationResult(
          "INVALID_QR",
          "Invalid student passport QR.",
        );
      }

      const studentProfile = await ctx.db.studentProfile.findUnique({
        where: {
          studentQrId: payload.studentQrId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      if (!studentProfile?.studentQrId) {
        return buildStudentQrVerificationResult(
          "INVALID_QR",
          "Invalid student passport QR.",
        );
      }

      if (
        studentProfile.qrRevokedAt ||
        studentProfile.studentQrSecretVersion !== payload.studentQrSecretVersion
      ) {
        return buildStudentQrVerificationResult(
          "REVOKED_QR",
          "This student passport QR has been revoked.",
        );
      }

      if (!studentProfile.isVerified)
        return buildStudentQrVerificationResult(
          "INVALID_QR",
          "Student identity is pending college verification.",
        );

      if (studentProfile.collegeId !== event.collegeId) {
        return buildStudentQrVerificationResult(
          "WRONG_COLLEGE",
          "This student passport belongs to a different college.",
        );
      }

      const rsvp = await ctx.db.rSVP.findUnique({
        where: {
          userId_eventId: {
            userId: studentProfile.userId,
            eventId: input.eventId,
          },
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      if (
        !rsvp ||
        rsvp.status === "WAITLISTED" ||
        rsvp.status === "CANCELLED"
      ) {
        return buildStudentQrVerificationResult(
          "NOT_REGISTERED",
          "This student is not registered for this event.",
        );
      }

      const attendeeName = rsvp.user.name ?? rsvp.user.email ?? "Student";

      if (rsvp.status === "ATTENDED") {
        return buildStudentQrVerificationResult(
          "ALREADY_CHECKED_IN",
          `${attendeeName} has already been checked in.`,
          {
            attendeeName,
            rsvpId: rsvp.id,
            userId: rsvp.userId,
          },
        );
      }

      if (rsvp.status !== "GOING") {
        return buildStudentQrVerificationResult(
          "NOT_REGISTERED",
          "This student is not registered for this event.",
        );
      }

      let checkIn;
      try {
        checkIn = await markAttendedRsvp(ctx, {
          eventId: input.eventId,
          rsvpId: rsvp.id,
          expectedUserId: studentProfile.userId,
        });
      } catch (error) {
        if (
          error instanceof TRPCError &&
          (error.code === "BAD_REQUEST" || error.code === "NOT_FOUND")
        ) {
          return buildStudentQrVerificationResult(
            "NOT_REGISTERED",
            error.message,
          );
        }
        throw error;
      }
      const updated = checkIn.rsvp;
      if (!checkIn.changed)
        return buildStudentQrVerificationResult(
          "ALREADY_CHECKED_IN",
          "This student has already been checked in.",
          { rsvpId: updated.id, userId: updated.userId, attendeeName },
        );

      await publishAttendanceUpdate(ctx.db, input.eventId, updated.id);

      return buildStudentQrVerificationResult(
        "CHECKED_IN",
        `Checked in: ${updated.user.name ?? updated.user.email ?? "Student"}`,
        {
          attendeeName: updated.user.name ?? updated.user.email ?? "Student",
          rsvpId: updated.id,
          userId: updated.userId,
        },
      );
    }),

  searchAttendees: protectedOrganizerProcedure
    .input(
      z.object({
        eventId: z.number().int().positive(),
        query: z.string().trim().min(1).max(100),
      }),
    )
    .query(async ({ ctx, input }) => {
      await assertCanCheckInToEvent(ctx, input.eventId);

      const { attendees } = await getEventAttendanceSnapshot(
        ctx,
        input.eventId,
      );

      return filterAndSortAttendees(attendees, {
        q: input.query,
        sort: "registered_desc",
      }).slice(0, 20);
    }),

  forceCheckIn: protectedOrganizerProcedure
    .input(
      z.object({
        eventId: z.number().int().positive(),
        userId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await assertCanCheckInToEvent(ctx, input.eventId);

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
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Attendee ticket not found",
        });
      }

      const { changed, rsvp: updated } = await markAttendedRsvp(ctx, {
        eventId: input.eventId,
        rsvpId: rsvp.id,
        expectedUserId: input.userId,
      });

      if (changed) {
        await publishAttendanceUpdate(ctx.db, input.eventId, updated.id);
      }

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
        deletedAt: null,
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
          },
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

async function assertCanManageClubForCreation(
  ctx: OrganizerCtx,
  clubId: number,
) {
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
