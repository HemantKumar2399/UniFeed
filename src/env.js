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
    UPLOAD_BUCKET_NAME: z.string().default("my-bucket"),
    UPLOAD_REGION: z.string().default("us-east-1"),
    UPLOAD_ACCESS_KEY_ID: z.string().default("test"),
    UPLOAD_SECRET_ACCESS_KEY: z.string().default("test"),
  },
  client: {},
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    ALLOWED_DOMAINS: process.env.ALLOWED_DOMAINS,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    UPLOAD_BUCKET_NAME: process.env.UPLOAD_BUCKET_NAME,
    UPLOAD_REGION: process.env.UPLOAD_REGION,
    UPLOAD_ACCESS_KEY_ID: process.env.UPLOAD_ACCESS_KEY_ID,
    UPLOAD_SECRET_ACCESS_KEY: process.env.UPLOAD_SECRET_ACCESS_KEY,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
