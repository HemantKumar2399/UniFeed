-- Reconcile events created before the denormalized counter was introduced.
UPDATE "Event" AS e
SET "attendeeCount" = (
  SELECT COUNT(*)::INTEGER FROM "RSVP" AS r
  WHERE r."eventId" = e.id AND r.status IN ('GOING', 'ATTENDED')
);
