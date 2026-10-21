import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

function visibleEvents(collegeId: string) {
  return {
    collegeId,
    status: "PUBLISHED" as const,
    deletedAt: null,
    club: { isActive: true, deletedAt: null },
  };
}

export const profileRouter = createTRPCRouter({
  getPreferences: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const prefs = await ctx.db.userPreference.findUnique({
      where: { userId },
    });

    if (!prefs) {
      return {
        marketingEmails: true,
        eventReminders: true,
        preferredCategories: [] as string[],
      };
    }

    return prefs;
  }),

  updatePreferences: protectedProcedure
    .input(
      z.object({
        marketingEmails: z.boolean(),
        eventReminders: z.boolean(),
        preferredCategories: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      return ctx.db.userPreference.upsert({
        where: { userId },
        update: {
          marketingEmails: input.marketingEmails,
          eventReminders: input.eventReminders,
          preferredCategories: input.preferredCategories,
        },
        create: {
          userId,
          marketingEmails: input.marketingEmails,
          eventReminders: input.eventReminders,
          preferredCategories: input.preferredCategories,
        },
      });
    }),

  getSavedEvents: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    // Fetch the events directly for ease of rendering
    return ctx.db.event.findMany({
      where: {
        ...visibleEvents(ctx.session.user.collegeId),
        savedBy: {
          some: {
            userId,
          },
        },
      },
      include: {
        club: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
          },
        },
        _count: {
          select: {
            rsvps: {
              where: {
                status: {
                  in: ["GOING", "ATTENDED"] as ("GOING" | "ATTENDED")[],
                },
              },
            },
          },
        },
        rsvps: {
          where: {
            userId,
          },
          select: {
            status: true,
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    });
  }),

  checkSavedStatus: protectedProcedure
    .input(z.object({ eventId: z.number().int().positive() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const visible = await ctx.db.event.findFirst({
        where: {
          id: input.eventId,
          ...visibleEvents(ctx.session.user.collegeId),
        },
        select: { id: true },
      });
      if (!visible) return false;

      const bookmark = await ctx.db.savedEvent.findUnique({
        where: {
          userId_eventId: {
            userId,
            eventId: input.eventId,
          },
        },
      });

      return !!bookmark;
    }),

  toggleSavedEvent: protectedProcedure
    .input(z.object({ eventId: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const visible = await ctx.db.event.findFirst({
        where: {
          id: input.eventId,
          ...visibleEvents(ctx.session.user.collegeId),
        },
        select: { id: true },
      });
      if (!visible)
        throw new TRPCError({ code: "NOT_FOUND", message: "Event not found" });

      const existing = await ctx.db.savedEvent.findUnique({
        where: {
          userId_eventId: {
            userId,
            eventId: input.eventId,
          },
        },
      });

      if (existing) {
        await ctx.db.savedEvent.delete({
          where: {
            userId_eventId: {
              userId,
              eventId: input.eventId,
            },
          },
        });
        return { saved: false };
      } else {
        await ctx.db.savedEvent.create({
          data: {
            userId,
            eventId: input.eventId,
          },
        });
        return { saved: true };
      }
    }),
});
