import { z } from "zod";
import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const adminRouter = createTRPCRouter({
  promoteUser: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        role: z.enum(["STUDENT", "ORGANIZER", "ADMIN", "SUPER_ADMIN"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const callerId = ctx.session.user.id;
      const callerRole = ctx.session.user.role;
      const callerCollegeId = ctx.session.user.collegeId;

      // Prevent self modification
      if (input.userId === callerId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot modify your own role.",
        });
      }

      // Fetch target user
      const userToPromote = await ctx.db.user.findUnique({
        where: { id: input.userId },
      });

      if (!userToPromote) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Target user not found.",
        });
      }

      // Enforce college-scope boundaries for standard ADMIN
      if (callerRole === "ADMIN") {
        if (userToPromote.collegeId !== callerCollegeId) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Cannot manage users outside your college.",
          });
        }
        if (input.role === "SUPER_ADMIN") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "College admins cannot assign SUPER_ADMIN role.",
          });
        }
      }

      // Perform promotion
      return ctx.db.user.update({
        where: { id: input.userId },
        data: { role: input.role },
      });
    }),

  assignClubMembership: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        clubId: z.number().int().positive(),
        role: z.enum(["OWNER", "EDITOR"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const callerRole = ctx.session.user.role;
      const callerCollegeId = ctx.session.user.collegeId;

      // Fetch the target club
      const club = await ctx.db.club.findUnique({
        where: { id: input.clubId },
      });

      if (!club) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Club not found.",
        });
      }

      // Fetch the target user
      const targetUser = await ctx.db.user.findUnique({
        where: { id: input.userId },
      });

      if (!targetUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found.",
        });
      }

      // Enforce college-scope boundaries for standard ADMIN
      if (callerRole === "ADMIN") {
        if (club.collegeId !== callerCollegeId) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Cannot manage clubs outside your college.",
          });
        }
        if (targetUser.collegeId !== callerCollegeId) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Cannot assign memberships to users outside your college.",
          });
        }
      }

      // Target user must not be a basic student (they must have organizer permissions to manage clubs)
      if (targetUser.role === "STUDENT") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User must be promoted to ORGANIZER before assigning club membership.",
        });
      }

      // Upsert membership
      return ctx.db.clubMembership.upsert({
        where: {
          userId_clubId: {
            userId: input.userId,
            clubId: input.clubId,
          },
        },
        update: {
          role: input.role,
        },
        create: {
          userId: input.userId,
          clubId: input.clubId,
          role: input.role,
        },
      });
    }),
});
