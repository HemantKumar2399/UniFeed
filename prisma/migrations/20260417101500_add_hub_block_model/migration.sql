DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'HubBlockType') THEN
        CREATE TYPE "HubBlockType" AS ENUM ('TEXT', 'RESOURCE', 'FAQ');
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS "HubBlock" (
    "id" SERIAL NOT NULL,
    "clubId" INTEGER NOT NULL,
    "type" "HubBlockType" NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "linkUrl" TEXT,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HubBlock_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "HubBlock_clubId_position_idx" ON "HubBlock"("clubId", "position");

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'HubBlock_clubId_fkey'
    ) THEN
        ALTER TABLE "HubBlock"
        ADD CONSTRAINT "HubBlock_clubId_fkey"
        FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;