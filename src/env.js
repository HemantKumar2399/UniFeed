import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    ALLOWED_DOMAINS: z.string().min(1),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    STUDENT_QR_SECRET: z.string().min(16).optional(),
    UPLOAD_BUCKET_NAME: z.string().min(1).optional(),
    UPLOAD_REGION: z.string().min(1).optional(),
    UPLOAD_ACCESS_KEY_ID: z.string().min(1).optional(),
    UPLOAD_SECRET_ACCESS_KEY: z.string().min(1).optional(),
    UPLOAD_PUBLIC_BASE_URL: z.string().url().optional(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().optional(),
    NEXT_PUBLIC_LOCALE: z.string().optional(),
    NEXT_PUBLIC_TIME_ZONE: z.string().optional(),
  },
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    ALLOWED_DOMAINS: process.env.ALLOWED_DOMAINS,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    STUDENT_QR_SECRET: process.env.STUDENT_QR_SECRET,
    UPLOAD_BUCKET_NAME: process.env.UPLOAD_BUCKET_NAME,
    UPLOAD_REGION: process.env.UPLOAD_REGION,
    UPLOAD_ACCESS_KEY_ID: process.env.UPLOAD_ACCESS_KEY_ID,
    UPLOAD_SECRET_ACCESS_KEY: process.env.UPLOAD_SECRET_ACCESS_KEY,
    UPLOAD_PUBLIC_BASE_URL: process.env.UPLOAD_PUBLIC_BASE_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_LOCALE: process.env.NEXT_PUBLIC_LOCALE,
    NEXT_PUBLIC_TIME_ZONE: process.env.NEXT_PUBLIC_TIME_ZONE,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
