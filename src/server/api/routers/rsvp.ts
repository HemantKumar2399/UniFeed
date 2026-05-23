import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { createRsvpPessimistic, CapacityError } from "@/server/services/rsvp";
import { TRPCError } from "@trpc/server";
import { ee } from "@/server/events";
import { observable } from "@trpc/server/observable";
import type { Prisma } from "@prisma/client";

export const rsvpRouter = createTRPCRouter({
  onCapacityChange: publicProcedure
    .input(z.object({ eventId: z.number().int().positive() }))
    .subscription(({ input }) => {
      return observable<{ eventId: number; newCapacity: number }>((emit) => {
        const onCapacityChange = (data: { eventId: number; newCapacity: number }) => {
          if (data.eventId === input.eventId) {
            emit.next(data);
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
          status: true,
          collegeId: true,
          date: true,
        },
      });

      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "EVENT_NOT_FOUND",
        });
      }

      if (event.status !== "PUBLISHED") {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: event.status === "CANCELLED" ? "EVENT_CANCELLED" : "EVENT_NOT_PUBLISHED",
        });
      }

      if (event.date < new Date()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "EVENT_PAST",
        });
      }

      if (event.collegeId !== collegeId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "COLLEGE_MISMATCH",
        });
      }

      // Verify student profile exists and is verified
      const profile = await ctx.db.studentProfile.findUnique({
        where: { userId },
      });
      if (!profile?.isVerified) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "PROFILE_UNVERIFIED",
        });
      }

      try {
        const { rsvp, remainingCapacity } = await createRsvpPessimistic(userId, input.eventId);
        ee.emit("capacityChange", { eventId: input.eventId, newCapacity: remainingCapacity });
        return rsvp;
      } catch (error: unknown) {
        if (error instanceof CapacityError) {
          throw new TRPCError({
            code: "PRECONDITION_FAILED",
            message: "EVENT_FULL",
          });
        }

        // Prisma unique constraint violation code for `@@unique([userId, eventId])`
        if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
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

      return await ctx.db.$transaction(async (tx: Prisma.TransactionClient) => {
        const event = await tx.event.findUnique({
          where: { id: eventId },
          select: {
            id: true,
            capacity: true,
            date: true,
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

        let newCapacity = 0;

        if (originalStatus === "GOING") {
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
            newCapacity = 0;
          } else {
            const activeCount = await tx.rSVP.count({
              where: {
                eventId,
                status: {
                  in: ["GOING", "ATTENDED"],
                },
              },
            });
            newCapacity = event.capacity - activeCount;
          }
        } else {
          const activeCount = await tx.rSVP.count({
            where: {
              eventId,
              status: {
                in: ["GOING", "ATTENDED"],
              },
            },
          });
          newCapacity = event.capacity - activeCount;
        }

        ee.emit("capacityChange", { eventId, newCapacity });

        return updatedRsvp;
      });
    }),
});
