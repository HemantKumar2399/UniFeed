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

      // Verify student profile exists and is verified
      const profile = await ctx.db.studentProfile.findUnique({
        where: { userId },
      });
      if (!profile || !profile.isVerified) {
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
});
