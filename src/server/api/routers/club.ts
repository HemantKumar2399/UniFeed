import { createTRPCRouter, adminProcedure, protectedOrganizerProcedure } from "@/server/api/trpc";
import { assertCanManageClub, getManageableClubsForUser } from "@/server/permissions/club-management";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const clubFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Club name must be at least 3 characters long.")
    .max(120, "Club name cannot exceed 120 characters."),
  logoUrl: z.string().trim().url("Enter a valid logo URL."),
});

export const clubRouter = createTRPCRouter({
  getMyManagedClubs: protectedOrganizerProcedure.query(async ({ ctx }) => {
    return getManageableClubsForUser(ctx);
  }),

  create: adminProcedure
    .input(clubFormSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.collegeId) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Admin session is missing a college association.",
        });
      }

      return ctx.db.club.create({
        data: {
          name: input.name,
          logoUrl: input.logoUrl,
          collegeId: ctx.session.user.collegeId,
        },
        select: {
          id: true,
          name: true,
          logoUrl: true,
          collegeId: true,
        },
      });
    }),

  getEditorManagement: protectedOrganizerProcedure
    .input(z.object({ clubId: z.number().int().positive() }))
    .query(async ({ ctx, input }) => {
      await assertCanManageClub(ctx, input.clubId, {
        requireOwner: true,
        forbiddenMessage: "Only club owners can manage editors for this club.",
      });

      const club = await ctx.db.club.findUnique({
        where: { id: input.clubId },
        select: {
          id: true,
          name: true,
          collegeId: true,
          members: {
            where: {
              role: {
                in: ["OWNER", "EDITOR"],
              },
            },
            orderBy: [{ role: "asc" }, { user: { name: "asc" } }],
            select: {
              userId: true,
              role: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  role: true,
                },
              },
            },
          },
        },
      });

      if (!club) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Club not found." });
      }

      const assignedUserIds = new Set(club.members.map((member) => member.userId));
      const eligibleUsers = await ctx.db.user.findMany({
        where: {
          collegeId: club.collegeId,
          role: {
            in: ["ORGANIZER", "ADMIN"],
          },
          id: {
            notIn: [...assignedUserIds],
          },
        },
        orderBy: [{ name: "asc" }, { email: "asc" }],
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });

      return {
        clubId: club.id,
        clubName: club.name,
        owners: club.members
          .filter((member) => member.role === "OWNER")
          .map((member) => ({
            id: member.user.id,
            name: member.user.name,
            email: member.user.email,
            role: member.user.role,
          })),
        editors: club.members
          .filter((member) => member.role === "EDITOR")
          .map((member) => ({
            id: member.user.id,
            name: member.user.name,
            email: member.user.email,
            role: member.user.role,
          })),
        eligibleUsers,
      };
    }),

  assignEditor: protectedOrganizerProcedure
    .input(
      z.object({
        clubId: z.number().int().positive(),
        userId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { club } = await assertCanManageClub(ctx, input.clubId, {
        requireOwner: true,
        forbiddenMessage: "Only club owners can assign editors.",
      });

      const targetUser = await ctx.db.user.findUnique({
        where: { id: input.userId },
        select: {
          id: true,
          collegeId: true,
          role: true,
        },
      });

      if (!targetUser) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found." });
      }

      if (targetUser.collegeId !== club.collegeId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can only assign editors from the same college.",
        });
      }

      if (targetUser.role === "STUDENT") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Promote the user to ORGANIZER before assigning editor access.",
        });
      }

      const existingMembership = await ctx.db.clubMembership.findUnique({
        where: {
          userId_clubId: {
            userId: input.userId,
            clubId: input.clubId,
          },
        },
        select: { role: true },
      });

      if (existingMembership?.role === "OWNER") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Owners are managed through the admin panel, not the editor assignment flow.",
        });
      }

      return ctx.db.clubMembership.upsert({
        where: {
          userId_clubId: {
            userId: input.userId,
            clubId: input.clubId,
          },
        },
        update: {
          role: "EDITOR",
        },
        create: {
          userId: input.userId,
          clubId: input.clubId,
          role: "EDITOR",
        },
      });
    }),

  removeEditor: protectedOrganizerProcedure
    .input(
      z.object({
        clubId: z.number().int().positive(),
        userId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await assertCanManageClub(ctx, input.clubId, {
        requireOwner: true,
        forbiddenMessage: "Only club owners can remove editors.",
      });

      const existingMembership = await ctx.db.clubMembership.findUnique({
        where: {
          userId_clubId: {
            userId: input.userId,
            clubId: input.clubId,
          },
        },
        select: { role: true },
      });

      if (!existingMembership) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Editor membership not found." });
      }

      if (existingMembership.role !== "EDITOR") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Only editor memberships can be removed from this workflow.",
        });
      }

      return ctx.db.clubMembership.delete({
        where: {
          userId_clubId: {
            userId: input.userId,
            clubId: input.clubId,
          },
        },
      });
    }),
});
