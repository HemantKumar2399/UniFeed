ALTER TABLE "Club"
ADD COLUMN "deletedAt" TIMESTAMP(3);

ALTER TABLE "Event"
ADD COLUMN "deletedAt" TIMESTAMP(3);

CREATE INDEX "Club_deletedAt_idx" ON "Club"("deletedAt");
CREATE INDEX "Club_collegeId_deletedAt_idx" ON "Club"("collegeId", "deletedAt");
CREATE INDEX "Event_deletedAt_idx" ON "Event"("deletedAt");
CREATE INDEX "Event_collegeId_status_deletedAt_idx" ON "Event"("collegeId", "status", "deletedAt");
