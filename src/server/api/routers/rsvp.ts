import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { createRsvpPessimistic, CapacityError } from "@/server/services/rsvp";
import {
  emitAttendanceChange,
  getAttendanceLatestActivity,
} from "@/server/services/attendance-realtime";
import { TRPCError } from "@trpc/server";
import { ee } from "@/server/events";
import { observable } from "@trpc/server/observable";
import type { Prisma, RSVPStatus } from "@prisma/client";

import { resolveStudentEventAccess } from "@/lib/student-event-visibility";
import { assertCanManageEvent } from "@/server/permissions/club-management";

const REGISTRATION_CLOSED_MESSAGE = "Registration for this event is closed.";

export const rsvpRouter = createTRPCRouter({
  onCapacityChange: protectedProcedure
    .input(z.object({ eventId: z.number().int().positive() }))
    .subscription(async ({ ctx, input }) => {
      const event = await ctx.db.event.findUnique({
        where: { id: input.eventId },
        select: { id: true, clubId: true, collegeId: true, status: true },
      });

      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }

      if (ctx.session.user.role === "STUDENT") {
        const accessDecision = resolveStudentEventAccess({
          eventStatus: event.status,
          eventCollegeId: event.collegeId,
          userCollegeId: ctx.session.user.collegeId,
        });

        if (accessDecision !== "visible") {
          throw new TRPCError({
            code:
              accessDecision === "wrong_college" ? "FORBIDDEN" : "NOT_FOUND",
            message:
              accessDecision === "wrong_college"
                ? "You cannot subscribe to another college's event."
                : "Event not found",
          });
        }
      } else {
        await assertCanManageEvent(
          {
            db: ctx.db,
            session: {
              user: {
                id: ctx.session.user.id,
                role: ctx.session.user.role,
                collegeId: ctx.session.user.collegeId,
              },
            },
          },
          input.eventId,
          { forbiddenMessage: "Unauthorized for this event" },
        );
      }

      return observable<{
        eventId: number;
        newCapacity: number;
        viewerRsvpStatus: RSVPStatus | null;
      }>((emit) => {
        const onCapacityChange = (data: {
          eventId: number;
          newCapacity: number;
        }) => {
          if (data.eventId === input.eventId) {
            void ctx.db.rSVP
              .findUnique({
                where: {
                  userId_eventId: {
                    userId: ctx.session.user.id,
                    eventId: input.eventId,
                  },
                },
                select: { status: true },
              })
              .then((ownRsvp) =>
                emit.next({
                  ...data,
                  viewerRsvpStatus: ownRsvp?.status ?? null,
                }),
              )
              .catch(() =>
                emit.error(
                  new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Unable to refresh registration status",
                  }),
                ),
              );
          }
        };

        ee.on("capacityChange", onCapacityChange);

        return () => {
          ee.off("capacityChange", onCapacityChange);
        };
      });
    }),

  register: protectedProcedure
    .input(z.object({ eventId: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const collegeId = ctx.session.user.collegeId;

      if (!collegeId) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "USER_NO_COLLEGE",
        });
      }

      const event = await ctx.db.event.findUnique({
        where: { id: input.eventId },
        select: {
          id: true,
          title: true,
          status: true,
          collegeId: true,
          date: true,
          registrationClosesAt: true,
        },
      });

      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "EVENT_NOT_FOUND",
        });
      }

      if (event.collegeId !== collegeId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "COLLEGE_MISMATCH",
        });
      }

      if (event.status === "CANCELLED") {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "EVENT_CANCELLED",
        });
      }

      if (event.status !== "PUBLISHED") {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "EVENT_NOT_PUBLISHED",
        });
      }

      if (event.date < new Date()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "EVENT_PAST",
        });
      }

      if (
        !event.registrationClosesAt ||
        event.registrationClosesAt <= new Date()
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: REGISTRATION_CLOSED_MESSAGE,
        });
      }

      try {
        const { rsvp } = await createRsvpPessimistic(
          userId,
          input.eventId,
          ctx.db,
        );
        try {
          const latestActivity = await getAttendanceLatestActivity(
            ctx.db,
            rsvp.id,
          );
          await emitAttendanceChange(ctx.db, input.eventId, latestActivity);

          // Notify student about RSVP
          await ctx.db.notification.create({
            data: {
              userId,
              type: "RSVP_CONFIRMED",
              title:
                rsvp.status === "GOING" ? "RSVP Confirmed" : "RSVP Waitlisted",
              message:
                rsvp.status === "GOING"
                  ? `You have successfully registered for the event "${event.title}".`
                  : `The event "${event.title}" is full. You have been added to the waitlist.`,
              linkUrl: `/tickets`,
            },
          });
        } catch (error) {
          console.error(
            "[rsvp] Registration committed; notification or live update failed",
            error,
          );
        }
        return rsvp;
      } catch (error: unknown) {
        if (error instanceof TRPCError) throw error;
        if (error instanceof CapacityError) {
          throw new TRPCError({
            code: "PRECONDITION_FAILED",
            message: "EVENT_FULL",
          });
        }

        // Prisma unique constraint violation code for `@@unique([userId, eventId])`
        if (
          error &&
          typeof error === "object" &&
          "code" in error &&
          error.code === "P2002"
        ) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "ALREADY_REGISTERED",
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred during RSVP.",
        });
      }
    }),

  cancel: protectedProcedure
    .input(z.object({ eventId: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const eventId = input.eventId;

      const result = await ctx.db.$transaction(
        async (tx: Prisma.TransactionClient) => {
          // Enforce pessimistic locking on the event to serialize waitlist promotions
          await tx.$executeRaw`SELECT id FROM "Event" WHERE id = ${eventId} FOR UPDATE`;

          const event = await tx.event.findUnique({
            where: { id: eventId },
            select: {
              id: true,
              title: true,
              capacity: true,
              date: true,
              registrationClosesAt: true,
            },
          });

          if (!event) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "EVENT_NOT_FOUND",
            });
          }

          if (event.date < new Date()) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "EVENT_PAST",
            });
          }

          const rsvp = await tx.rSVP.findUnique({
            where: {
              userId_eventId: {
                userId,
                eventId,
              },
            },
          });

          if (!rsvp || rsvp.status === "CANCELLED") {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "RSVP_NOT_FOUND",
            });
          }

          if (rsvp.status === "ATTENDED") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "CANNOT_CANCEL_ATTENDED",
            });
          }

          const originalStatus = rsvp.status;

          const updatedRsvp = await tx.rSVP.update({
            where: { id: rsvp.id },
            data: {
              status: "CANCELLED",
            },
          });

          // Decrement attendeeCount if student was active (GOING)
          if (originalStatus === "GOING") {
            await tx.event.update({
              where: { id: eventId },
              data: { attendeeCount: { decrement: 1 } },
            });
          }

          let promotedRsvpId: number | null = null;

          const canPromoteWaitlist =
            event.registrationClosesAt &&
            event.registrationClosesAt > new Date();

          if (originalStatus === "GOING" && canPromoteWaitlist) {
            const nextWaitlist = await tx.rSVP.findFirst({
              where: {
                eventId,
                status: "WAITLISTED",
              },
              orderBy: {
                createdAt: "asc",
              },
            });

            if (nextWaitlist) {
              await tx.rSVP.update({
                where: { id: nextWaitlist.id },
                data: {
                  status: "GOING",
                },
              });
              // Increment attendeeCount since waitlisted user is promoted to GOING
              await tx.event.update({
                where: { id: eventId },
                data: { attendeeCount: { increment: 1 } },
              });
              promotedRsvpId = nextWaitlist.id;
              // Notify waitlist promoted student
              await tx.notification.create({
                data: {
                  userId: nextWaitlist.userId,
                  type: "RSVP_CONFIRMED",
                  title: "Waitlist Promotion",
                  message: `Good news! You have been promoted from the waitlist for the event "${event.title}".`,
                  linkUrl: `/tickets`,
                },
              });
            }
          }

          return {
            promotedRsvpId,
            updatedRsvp,
          };
        },
      );

      try {
        const cancelledActivity = await getAttendanceLatestActivity(
          ctx.db,
          result.updatedRsvp.id,
        );
        await emitAttendanceChange(ctx.db, eventId, cancelledActivity);

        if (result.promotedRsvpId) {
          const promotedActivity = await getAttendanceLatestActivity(
            ctx.db,
            result.promotedRsvpId,
          );
          await emitAttendanceChange(ctx.db, eventId, promotedActivity);
        }
      } catch (error) {
        console.error(
          "[rsvp] Cancellation committed; live update failed",
          error,
        );
      }
      return result.updatedRsvp;
    }),
});
