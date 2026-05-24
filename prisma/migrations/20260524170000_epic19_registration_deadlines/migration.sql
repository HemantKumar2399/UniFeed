ALTER TABLE "Event"
ADD COLUMN "registrationClosesAt" TIMESTAMP(3);

ALTER TYPE "EventApprovalAction"
ADD VALUE 'REGISTRATION_DEADLINE_EXTENDED';

UPDATE "Event"
SET "registrationClosesAt" = "date" - INTERVAL '24 hours'
WHERE "status" <> 'DRAFT'
  AND "date" > NOW();
