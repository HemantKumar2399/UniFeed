import { z } from "zod";
import { createTRPCRouter, protectedOrganizerProcedure } from "@/server/api/trpc";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "@/env";
import { resolveUploadPublicUrl } from "@/lib/runtime-config";
import { TRPCError } from "@trpc/server";

/**
 * Returns true only when all four required S3 env vars are present AND
 * do not contain the placeholder "test" values from .env.example.
 */
function isRealS3Configured(): boolean {
  const { UPLOAD_BUCKET_NAME, UPLOAD_REGION, UPLOAD_ACCESS_KEY_ID, UPLOAD_SECRET_ACCESS_KEY } = env;
  if (!UPLOAD_BUCKET_NAME || !UPLOAD_REGION || !UPLOAD_ACCESS_KEY_ID || !UPLOAD_SECRET_ACCESS_KEY) {
    return false;
  }
  // Reject obvious placeholder values
  const placeholders = new Set(["test", "placeholder", "changeme", "your-key", "your-secret"]);
  if (
    placeholders.has(UPLOAD_ACCESS_KEY_ID.toLowerCase()) ||
    placeholders.has(UPLOAD_SECRET_ACCESS_KEY.toLowerCase())
  ) {
    return false;
  }
  return true;
}

/**
 * LOCAL_UPLOAD_TOKEN is a sentinel value the client checks to decide whether
 * to use the local /api/upload route instead of a presigned S3 PUT.
 * Exported from the router for server-side use; the client reads `useLocalUpload` from the response.
 */
export const LOCAL_UPLOAD_TOKEN = "__local_upload__";

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
      // --- Local dev fallback ---
      if (!isRealS3Configured()) {
        // Signal the client to use the /api/upload route directly.
        return {
          url: LOCAL_UPLOAD_TOKEN,
          key: "",
          finalUrl: "",
          useLocalUpload: true,
        };
      }

      // --- Real S3/R2 path ---
      try {
        const s3Client = new S3Client({
          region: env.UPLOAD_REGION!,
          credentials: {
            accessKeyId: env.UPLOAD_ACCESS_KEY_ID!,
            secretAccessKey: env.UPLOAD_SECRET_ACCESS_KEY!,
          },
        });

        const safeFilename = input.filename.replace(/[^a-zA-Z0-9.-]/g, "") || "image";
        const key = `events/${ctx.session.user.id}/${Date.now()}-${safeFilename}`;

        const command = new PutObjectCommand({
          Bucket: env.UPLOAD_BUCKET_NAME!,
          Key: key,
          ContentType: input.contentType,
          ContentLength: input.size,
        });

        const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

        return {
          url: presignedUrl,
          key,
          finalUrl: resolveUploadPublicUrl({
            key,
            presignedUrl,
            publicBaseUrl: env.UPLOAD_PUBLIC_BASE_URL,
          }),
          useLocalUpload: false,
        };
      } catch (err) {
        if (err instanceof TRPCError) {
          throw err;
        }
        console.error("Presigned URL error", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not generate upload URL",
        });
      }
    }),
});
