import { createTRPCRouter, publicProcedure, protectedProcedure, protectedOrganizerProcedure } from "@/server/api/trpc";
import { z } from "zod";

import { TRPCError } from "@trpc/server";

export const eventRouter = createTRPCRouter({
  getOrganizerDrafts: protectedOrganizerProcedure.query(async ({ ctx }) => {    
    return ctx.db.event.findMany({
      where: {
        authorId: ctx.session.user.id,
      },
      include: {
        _count: {
          select: { rsvps: true }
        }
      },
      orderBy: { date: "desc" },
    });
  }),

  getFeed: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.event.findMany({
      take: 10,
      orderBy: { date: "asc" },
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
            rsvps: true,
          },
        },
      },
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

      if (event.authorId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Unauthorized to view attendees for this event",
        });

      return event.rsvps;
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
