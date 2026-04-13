import { z } from "zod";
import { createTRPCRouter, protectedOrganizerProcedure } from "@/server/api/trpc";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "@/env";
import { TRPCError } from "@trpc/server";

export const uploadRouter = createTRPCRouter({
  getPresignedUrl: protectedOrganizerProcedure
    .input(
      z.object({
        filename: z.string(),
        contentType: z.string().regex(/^image\//, "Only images are allowed"),
        size: z.number().max(5 * 1024 * 1024, "Image must be less than 5MB"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const s3Client = new S3Client({
            region: env.UPLOAD_REGION,
            credentials: {
                accessKeyId: env.UPLOAD_ACCESS_KEY_ID,
                secretAccessKey: env.UPLOAD_SECRET_ACCESS_KEY,
            }
        });

        const safeFilename = input.filename.replace(/[^a-zA-Z0-9.-]/g, "") || "image";
        const key = `events/${ctx.session.user.id}/${Date.now()}-${safeFilename}`;

        const command = new PutObjectCommand({
            Bucket: env.UPLOAD_BUCKET_NAME,
            Key: key,
            ContentType: input.contentType,
            ContentLength: input.size,
        });

        const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
        
        return {
            url: presignedUrl,
            key,
            finalUrl: `https://${env.UPLOAD_BUCKET_NAME}.s3.${env.UPLOAD_REGION}.amazonaws.com/${key}`
        };
      } catch (err) {
        console.error("Presigned URL error", err);
        throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Could not generate upload URL"
        });
      }
    }),
});
