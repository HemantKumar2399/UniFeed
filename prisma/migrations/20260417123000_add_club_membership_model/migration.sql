DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ClubRole') THEN
        CREATE TYPE "ClubRole" AS ENUM ('OWNER', 'EDITOR');
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS "ClubMembership" (
    "userId" TEXT NOT NULL,
    "clubId" INTEGER NOT NULL,
    "role" "ClubRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClubMembership_pkey" PRIMARY KEY ("userId", "clubId")
);

CREATE INDEX IF NOT EXISTS "ClubMembership_clubId_idx" ON "ClubMembership"("clubId");
CREATE INDEX IF NOT EXISTS "ClubMembership_userId_idx" ON "ClubMembership"("userId");

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'ClubMembership_userId_fkey'
    ) THEN
        ALTER TABLE "ClubMembership"
        ADD CONSTRAINT "ClubMembership_userId_fkey"
        FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'ClubMembership_clubId_fkey'
    ) THEN
        ALTER TABLE "ClubMembership"
        ADD CONSTRAINT "ClubMembership_clubId_fkey"
        FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;