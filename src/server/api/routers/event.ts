import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

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
      },
    });
  }),
});
