import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createStudentQrId } from "@/lib/student-qr";

export const studentRouter = createTRPCRouter({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.studentProfile.findUnique({
      where: { userId: ctx.session.user.id },
      include: {
        college: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }),

  createProfile: protectedProcedure
    .input(
      z.object({
        prn: z.string().min(1, "PRN is required").max(50),
        branch: z.string().min(1, "Branch is required").max(100),
        course: z.string().min(1, "Course is required").max(100),
        graduationYear: z.number().int().min(2020).max(2100),
        section: z.string().max(10).optional(),
        phone: z.string().max(20).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const collegeId = ctx.session.user.collegeId;

      if (!collegeId) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "User session lacks college association.",
        });
      }

      // Check if profile already exists for the user
      const existingProfile = await ctx.db.studentProfile.findUnique({
        where: { userId },
      });
      if (existingProfile) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Profile already exists.",
        });
      }

      // Check if PRN is already registered in the same college
      const duplicatePrn = await ctx.db.studentProfile.findUnique({
        where: {
          collegeId_prn: {
            collegeId,
            prn: input.prn,
          },
        },
      });
      if (duplicatePrn) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "PRN_ALREADY_REGISTERED",
        });
      }

      // Generate a permanent QR identifier for the student
      const studentQrId = createStudentQrId();

      // Create the profile
      const newProfile = await ctx.db.studentProfile.create({
        data: {
          userId,
          collegeId,
          prn: input.prn,
          branch: input.branch,
          course: input.course,
          graduationYear: input.graduationYear,
          section: input.section ?? null,
          phone: input.phone ?? null,
          isVerified: false, // Completing a profile does not prove campus identity.
          studentQrId,
        },
      });

      return newProfile;
    }),
});
