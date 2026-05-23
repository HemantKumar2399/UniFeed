-- AlterEnum
ALTER TYPE "EventApprovalAction" ADD VALUE 'CANCELLED';

-- AlterTable
ALTER TABLE "Event"
ADD COLUMN "cancelledAt" TIMESTAMP(3),
ADD COLUMN "cancellationReason" TEXT;
