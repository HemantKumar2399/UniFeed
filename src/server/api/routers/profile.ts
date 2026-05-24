import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

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
      })
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
        savedBy: {
          some: {
            userId,
          },
        },
        // Only show events that are not draft/rejected to prevent viewing unpublished items
        status: {
          in: ["APPROVED", "PUBLISHED"],
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
    .input(z.object({ eventId: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

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
    .input(z.object({ eventId: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

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
