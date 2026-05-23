-- Remove SUPER_ADMIN from the Role enum.
-- Step 1: Migrate any existing SUPER_ADMIN users to ADMIN.
UPDATE "public"."User" SET "role" = 'ADMIN'::"Role" WHERE "role" = 'SUPER_ADMIN'::"Role";

-- Step 2: Drop the column default that references the old enum type.
ALTER TABLE "public"."User" ALTER COLUMN "role" DROP DEFAULT;

-- Step 3: Rename old enum, create new 3-value enum, and swap the column type.
ALTER TYPE "public"."Role" RENAME TO "Role_old";
CREATE TYPE "public"."Role" AS ENUM ('STUDENT', 'ORGANIZER', 'ADMIN');
ALTER TABLE "public"."User" ALTER COLUMN "role" TYPE "public"."Role" USING "role"::text::"public"."Role";
DROP TYPE "public"."Role_old";

-- Step 4: Restore the default value using the new enum type.
ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'STUDENT'::"public"."Role";
