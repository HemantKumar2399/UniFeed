-- CreateEnum
CREATE TYPE "EventApprovalAction" AS ENUM ('SUBMITTED', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN "submittedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "EventApprovalLog" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "actorId" TEXT NOT NULL,
    "action" "EventApprovalAction" NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventApprovalLog_pkey" PRIMARY KEY ("id")
);

-- Backfill
UPDATE "Event"
SET "submittedAt" = "updatedAt"
WHERE "status" = 'SUBMITTED' AND "submittedAt" IS NULL;

-- CreateIndex
CREATE INDEX "Event_collegeId_status_submittedAt_idx" ON "Event"("collegeId", "status", "submittedAt");

-- CreateIndex
CREATE INDEX "EventApprovalLog_eventId_createdAt_idx" ON "EventApprovalLog"("eventId", "createdAt");

-- CreateIndex
CREATE INDEX "EventApprovalLog_actorId_idx" ON "EventApprovalLog"("actorId");

-- AddForeignKey
ALTER TABLE "EventApprovalLog" ADD CONSTRAINT "EventApprovalLog_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventApprovalLog" ADD CONSTRAINT "EventApprovalLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
