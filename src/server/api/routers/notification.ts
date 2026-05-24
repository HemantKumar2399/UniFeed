import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const notificationRouter = createTRPCRouter({
  getUnreadCount: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return ctx.db.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });
  }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return ctx.db.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });
  }),

  markAsRead: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // Verify ownership before updating
      const notification = await ctx.db.notification.findFirst({
        where: {
          id: input.id,
          userId,
        },
      });

      if (!notification) {
        throw new Error("Notification not found");
      }

      return ctx.db.notification.update({
        where: {
          id: input.id,
        },
        data: {
          isRead: true,
        },
      });
    }),

  markAllAsRead: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return ctx.db.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
  }),
});
