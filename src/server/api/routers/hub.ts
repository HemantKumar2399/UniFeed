import { normalizeHubBlocksForSave } from "@/features/hubs/hub-blocks.utils";
import { createTRPCRouter, protectedOrganizerProcedure, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { assertCanManageClub, getManageableClubsForUser, getClubManagementRole } from "@/server/permissions/club-management";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const hubBlockInputSchema = z.object({
  type: z.enum(["TEXT", "RESOURCE", "FAQ"]),
  title: z.string().max(120).nullable().optional(),
  content: z.string().min(1).max(2000),
  linkUrl: z.string().url().nullable().optional(),
  position: z.number().int().min(0),
});

export const hubRouter = createTRPCRouter({
  getDirectory: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user.collegeId) {
      return [];
    }

    const followedRows = await ctx.db.hubFollow.findMany({
      where: { userId: ctx.session.user.id },
      select: { clubId: true },
    });

    const followedClubIds = new Set(followedRows.map((row) => row.clubId));

    const clubs = await ctx.db.club.findMany({
      where: {
        collegeId: ctx.session.user.collegeId,
        isActive: true,
      },
      orderBy: { name: "asc" },
      take: 24,
      include: {
        events: {
          where: { status: "PUBLISHED" },
          orderBy: { date: "asc" },
          take: 1,
          select: {
            id: true,
            title: true,
            date: true,
            location: true,
          },
        },
        _count: {
          select: {
            followers: true,
            events: true,
            blocks: true,
          },
        },
      },
    });

    return clubs.map((club) => ({
      id: club.id,
      name: club.name,
      logoUrl: club.logoUrl,
      isFollowed: followedClubIds.has(club.id),
      followerCount: club._count.followers,
      eventCount: club._count.events,
      blockCount: club._count.blocks,
      updatedAt: club.updatedAt,
      nextEvent: club.events[0] ?? null,
    }));
  }),

  follow: protectedProcedure
    .input(z.object({ clubId: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      const club = await ctx.db.club.findUnique({
        where: { id: input.clubId },
        select: { id: true },
      });

      if (!club) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Hub not found" });
      }

      const existing = await ctx.db.hubFollow.findUnique({
        where: {
          userId_clubId: {
            userId: ctx.session.user.id,
            clubId: input.clubId,
          },
        },
      });

      if (existing) {
        await ctx.db.hubFollow.delete({
          where: {
            userId_clubId: {
              userId: ctx.session.user.id,
              clubId: input.clubId,
            },
          },
        });
        return {
          clubId: input.clubId,
          isFollowed: false,
        };
      } else {
        await ctx.db.hubFollow.create({
          data: {
            userId: ctx.session.user.id,
            clubId: input.clubId,
          },
        });
        return {
          clubId: input.clubId,
          isFollowed: true,
        };
      }
    }),

  getHubContent: publicProcedure
    .input(z.object({ clubId: z.number().int().positive() }))
    .query(async ({ ctx, input }) => {
      const club = await ctx.db.club.findUnique({
        where: { id: input.clubId },
        select: {
          id: true,
          name: true,
          logoUrl: true,
          isActive: true,
          collegeId: true,
          blocks: {
            orderBy: { position: "asc" },
            select: {
              id: true,
              type: true,
              title: true,
              content: true,
              linkUrl: true,
              position: true,
              updatedAt: true,
            },
          },
          events: {
            where: { status: "PUBLISHED" },
            orderBy: { date: "asc" },
            take: 6,
            select: {
              id: true,
              title: true,
              date: true,
              location: true,
            },
          },
        },
      });

      if (!club) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Hub not found" });
      }

      if (!club.isActive) {
        const canManage = ctx.session?.user
          ? await getClubManagementRole(
              {
                db: ctx.db,
                session: { user: ctx.session.user },
              },
              club,
            ).then((role) => !!role)
          : false;

        if (!canManage) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Hub not found" });
        }
      }

      return club;
    }),

  getEditableHubs: protectedOrganizerProcedure.query(async ({ ctx }) => {
    const clubs = await getManageableClubsForUser(ctx);

    return clubs.map((club) => ({
      id: club.id,
      name: club.name,
      role: club.role,
    }));
  }),

  saveBlocks: protectedOrganizerProcedure
    .input(
      z.object({
        clubId: z.number().int().positive(),
        blocks: z.array(hubBlockInputSchema).max(50),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const club = await ctx.db.club.findUnique({
        where: { id: input.clubId },
        select: { id: true },
      });

      if (!club) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Hub not found" });
      }

      await assertCanManageClub(ctx, input.clubId, {
        forbiddenMessage: "You can only edit hubs for clubs you manage.",
      });

      const normalizedBlocks = normalizeHubBlocksForSave(input.blocks);

      await ctx.db.$transaction(async (tx) => {
        await tx.hubBlock.deleteMany({
          where: { clubId: input.clubId },
        });

        if (normalizedBlocks.length > 0) {
          await tx.hubBlock.createMany({
            data: normalizedBlocks.map((block) => ({
              clubId: input.clubId,
              type: block.type,
              title: block.title,
              content: block.content,
              linkUrl: block.linkUrl,
              position: block.position,
            })),
          });
        }
      });

      const savedBlocks = await ctx.db.hubBlock.findMany({
        where: { clubId: input.clubId },
        orderBy: { position: "asc" },
      });

      return {
        clubId: input.clubId,
        blocks: savedBlocks,
      };
    }),
});
