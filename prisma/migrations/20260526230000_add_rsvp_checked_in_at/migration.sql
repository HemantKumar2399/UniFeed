-- Add a durable check-in timestamp for attendance exports and analytics.
ALTER TABLE "RSVP"
ADD COLUMN "checkedInAt" TIMESTAMP(3);
