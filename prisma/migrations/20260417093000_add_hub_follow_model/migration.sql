CREATE TABLE IF NOT EXISTS "HubFollow" (
    "userId" TEXT NOT NULL,
    "clubId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HubFollow_pkey" PRIMARY KEY ("userId","clubId")
);

CREATE INDEX IF NOT EXISTS "HubFollow_clubId_idx" ON "HubFollow"("clubId");

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'HubFollow_userId_fkey'
    ) THEN
        ALTER TABLE "HubFollow"
        ADD CONSTRAINT "HubFollow_userId_fkey"
        FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'HubFollow_clubId_fkey'
    ) THEN
        ALTER TABLE "HubFollow"
        ADD CONSTRAINT "HubFollow_clubId_fkey"
        FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;