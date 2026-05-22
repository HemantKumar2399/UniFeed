CREATE TABLE IF NOT EXISTS "EventDiscussionThread" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "authorId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventDiscussionThread_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "EventDiscussionReply" (
    "id" SERIAL NOT NULL,
    "threadId" INTEGER NOT NULL,
    "authorId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventDiscussionReply_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "EventDiscussionThread_eventId_pinned_createdAt_idx" ON "EventDiscussionThread"("eventId", "pinned", "createdAt");
CREATE INDEX IF NOT EXISTS "EventDiscussionThread_authorId_idx" ON "EventDiscussionThread"("authorId");
CREATE INDEX IF NOT EXISTS "EventDiscussionReply_threadId_createdAt_idx" ON "EventDiscussionReply"("threadId", "createdAt");
CREATE INDEX IF NOT EXISTS "EventDiscussionReply_authorId_idx" ON "EventDiscussionReply"("authorId");

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'EventDiscussionThread_eventId_fkey'
    ) THEN
        ALTER TABLE "EventDiscussionThread"
        ADD CONSTRAINT "EventDiscussionThread_eventId_fkey"
        FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'EventDiscussionThread_authorId_fkey'
    ) THEN
        ALTER TABLE "EventDiscussionThread"
        ADD CONSTRAINT "EventDiscussionThread_authorId_fkey"
        FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'EventDiscussionReply_threadId_fkey'
    ) THEN
        ALTER TABLE "EventDiscussionReply"
        ADD CONSTRAINT "EventDiscussionReply_threadId_fkey"
        FOREIGN KEY ("threadId") REFERENCES "EventDiscussionThread"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'EventDiscussionReply_authorId_fkey'
    ) THEN
        ALTER TABLE "EventDiscussionReply"
        ADD CONSTRAINT "EventDiscussionReply_authorId_fkey"
        FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;
