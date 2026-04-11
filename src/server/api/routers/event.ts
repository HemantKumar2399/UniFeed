import { createTRPCRouter, publicProcedure, protectedProcedure } from "@/server/api/trpc";

export const eventRouter = createTRPCRouter({
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
