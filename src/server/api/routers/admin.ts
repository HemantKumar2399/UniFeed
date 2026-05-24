import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, adminProcedure, collegeAdminProcedure } from "@/server/api/trpc";
import { createStudentQrId } from "@/lib/student-qr";
import type { db as prismaDb } from "@/server/db";

type AdminReviewCtx = {
  db: typeof prismaDb;
  session: {
    user: {
      id: string;
      role: "STUDENT" | "ORGANIZER" | "ADMIN";
      collegeId?: string | null;
    };
  };
};

function assertCollegeScope(
  sessionUser: { role: "STUDENT" | "ORGANIZER" | "ADMIN"; collegeId?: string | null },
  targetCollegeId: string,
  message: string,
) {
  if (!sessionUser.collegeId || sessionUser.collegeId !== targetCollegeId) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message,
    });
  }
}

async function getScopedReviewEvent(
  ctx: AdminReviewCtx,
  eventId: number,
) {
  const event = await ctx.db.event.findUnique({
    where: { id: eventId },
    include: {
      club: {
        select: {
          id: true,
          name: true,
          logoUrl: true,
          collegeId: true,
        },
      },
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      approvalLogs: {
        orderBy: { createdAt: "desc" },
        include: {
          actor: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
      },
    },
  });

  if (!event) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Event not found.",
    });
  }

  assertCollegeScope(ctx.session.user, event.collegeId, "Cannot review events outside your college.");

  return event;
}

export const adminRouter = createTRPCRouter({
  promoteUser: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        role: z.enum(["STUDENT", "ORGANIZER", "ADMIN"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const callerId = ctx.session.user.id;
      const callerRole = ctx.session.user.role;
      const callerCollegeId = ctx.session.user.collegeId;

      if (input.userId === callerId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot modify your own role.",
        });
      }

      const userToPromote = await ctx.db.user.findUnique({
        where: { id: input.userId },
      });

      if (!userToPromote) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Target user not found.",
        });
      }

      if (callerRole === "ADMIN") {
        if (userToPromote.collegeId !== callerCollegeId) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Cannot manage users outside your college.",
          });
        }
      }

      return ctx.db.user.update({
        where: { id: input.userId },
        data: { role: input.role },
      });
    }),

  assignClubMembership: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        clubId: z.number().int().positive(),
        role: z.enum(["OWNER", "EDITOR"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const callerRole = ctx.session.user.role;
      const callerCollegeId = ctx.session.user.collegeId;

      const club = await ctx.db.club.findUnique({
        where: { id: input.clubId },
      });

      if (!club) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Club not found.",
        });
      }

      const targetUser = await ctx.db.user.findUnique({
        where: { id: input.userId },
      });

      if (!targetUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found.",
        });
      }

      if (callerRole === "ADMIN") {
        if (club.collegeId !== callerCollegeId) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Cannot manage clubs outside your college.",
          });
        }
        if (targetUser.collegeId !== callerCollegeId) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Cannot assign memberships to users outside your college.",
          });
        }
      }

      if (targetUser.role === "STUDENT") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User must be promoted to ORGANIZER before assigning club membership.",
        });
      }

      return ctx.db.clubMembership.upsert({
        where: {
          userId_clubId: {
            userId: input.userId,
            clubId: input.clubId,
          },
        },
        update: {
          role: input.role,
        },
        create: {
          userId: input.userId,
          clubId: input.clubId,
          role: input.role,
        },
      });
    }),

  revokeStudentQr: collegeAdminProcedure
    .input(
      z.object({
        userId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const profile = await ctx.db.studentProfile.findUnique({
        where: { userId: input.userId },
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

      if (!profile) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Student profile not found.",
        });
      }

      if (profile.collegeId !== ctx.collegeId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Cannot manage student QR outside your college.",
        });
      }

      const updated = await ctx.db.studentProfile.update({
        where: { id: profile.id },
        data: {
          qrRevokedAt: new Date(),
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

      return updated;
    }),

  regenerateStudentQr: collegeAdminProcedure
    .input(
      z.object({
        userId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const profile = await ctx.db.studentProfile.findUnique({
        where: { userId: input.userId },
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

      if (!profile) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Student profile not found.",
        });
      }

      if (profile.collegeId !== ctx.collegeId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Cannot manage student QR outside your college.",
        });
      }

      const updated = await ctx.db.studentProfile.update({
        where: { id: profile.id },
        data: {
          studentQrId: createStudentQrId(),
          studentQrSecretVersion: {
            increment: 1,
          },
          qrRevokedAt: null,
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

      return updated;
    }),

  getCollegeCommunities: collegeAdminProcedure.query(async ({ ctx }) => {
    return ctx.db.club.findMany({
      where: { collegeId: ctx.collegeId },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            events: true,
          },
        },
      },
    });
  }),

  getPendingEvents: collegeAdminProcedure
    .input(
      z
        .object({
          query: z.string().trim().max(100).optional(),
          clubId: z.number().int().positive().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const query = input?.query;
      const clubId = input?.clubId;

      return ctx.db.event.findMany({
        where: {
          collegeId: ctx.collegeId,
          status: "SUBMITTED",
          ...(clubId ? { clubId } : {}),
          ...(query
            ? {
                OR: [
                  { title: { contains: query, mode: "insensitive" } },
                  { description: { contains: query, mode: "insensitive" } },
                  { author: { name: { contains: query, mode: "insensitive" } } },
                  { author: { email: { contains: query, mode: "insensitive" } } },
                ],
              }
            : {}),
        },
        orderBy: [{ submittedAt: "asc" }, { createdAt: "asc" }],
        select: {
          id: true,
          title: true,
          status: true,
          date: true,
          capacity: true,
          location: true,
          submittedAt: true,
          createdAt: true,
          club: {
            select: {
              id: true,
              name: true,
            },
          },
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    }),

  getEventReviewDetail: adminProcedure
    .input(z.object({ eventId: z.number().int().positive() }))
    .query(async ({ ctx, input }) => {
      const event = await getScopedReviewEvent(ctx, input.eventId);

      return {
        ...event,
        approvalLogs: event.approvalLogs,
      };
    }),

  getApprovalHistory: adminProcedure
    .input(z.object({ eventId: z.number().int().positive() }))
    .query(async ({ ctx, input }) => {
      const event = await getScopedReviewEvent(ctx, input.eventId);

      return event.approvalLogs;
    }),

  approveEvent: adminProcedure
    .input(z.object({ eventId: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      const event = await getScopedReviewEvent(ctx, input.eventId);

      if (event.status !== "SUBMITTED") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Only submitted events can be approved.",
        });
      }

      const [updatedEvent] = await ctx.db.$transaction([
        ctx.db.event.update({
          where: { id: event.id },
          data: { status: "APPROVED" },
          select: {
            id: true,
            title: true,
            status: true,
            clubId: true,
            collegeId: true,
          },
        }),
        ctx.db.eventApprovalLog.create({
          data: {
            eventId: event.id,
            actorId: ctx.session.user.id,
            action: "APPROVED",
          },
        }),
        ctx.db.notification.create({
          data: {
            userId: event.authorId,
            type: "EVENT_APPROVED",
            title: `Event Approved: ${event.title}`,
            message: `Your event "${event.title}" has been approved by the college admin.`,
            linkUrl: `/events/${event.id}`,
          },
        }),
      ]);

      return updatedEvent;
    }),

  rejectEvent: adminProcedure
    .input(
      z.object({
        eventId: z.number().int().positive(),
        reason: z.string().trim().min(10, "Rejection reason must be at least 10 characters.").max(500),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const event = await getScopedReviewEvent(ctx, input.eventId);

      if (event.status !== "SUBMITTED") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Only submitted events can be rejected.",
        });
      }

      const [updatedEvent] = await ctx.db.$transaction([
        ctx.db.event.update({
          where: { id: event.id },
          data: { status: "REJECTED" },
          select: {
            id: true,
            title: true,
            status: true,
            clubId: true,
            collegeId: true,
          },
        }),
        ctx.db.eventApprovalLog.create({
          data: {
            eventId: event.id,
            actorId: ctx.session.user.id,
            action: "REJECTED",
            reason: input.reason,
          },
        }),
        ctx.db.notification.create({
          data: {
            userId: event.authorId,
            type: "EVENT_REJECTED",
            title: `Event Rejected: ${event.title}`,
            message: `Your event "${event.title}" has been rejected. Reason: ${input.reason}`,
            linkUrl: `/dashboard/events`,
          },
        }),
      ]);

      return updatedEvent;
    }),
});
