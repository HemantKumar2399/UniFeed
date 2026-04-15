# Story 10.3: Database Pessimistic Locking

Status: ready-for-dev
Depends on: [Story 10.2: Live Capacity Momentum Progress Bar](https://github.com/HemantKumar822/UniFeed/issues/59)

## Story

As a standard user (handled by the system),
I want the database to strictly manage concurrent RSVPs,
so that the event never exceeds its maximum capacity even if 500 students tap RSVP simultaneously.

## Acceptance Criteria

1. **Given** an event is 1 spot away from maximum capacity
   **When** multiple users tap RSVP at the exact same millisecond
   **Then** the database pessimistic lock ensures only one transaction succeeds
   **And** the failed users receive a graceful "Event is now full / Added to Waitlist" UI state.

## Tasks / Subtasks

- [ ] Implement Pessimistic Locking on Event row during RSVP mutation
  - [ ] Check capacity `SELECT ... FOR UPDATE` before inserting RSVP
- [ ] Add capacity exceeded error handling
  - [ ] Return appropriate error code to client to trigger "Event is full" UI

## Dev Notes

- Relevant architecture patterns and constraints: PostgreSQL transactions, Prisma raw queries for pessimistic locking or Prisma's interactive transaction APIs.
- Source tree components to touch: `src/server/api/routers/rsvp.ts`.
- Testing standards summary: Concurrent request integration testing to ensure no over-booking.

### Project Structure Notes

- Alignment with unified project structure: Prisma/tRPC transaction bounds.
- Detected conflicts or variances: None.

### References

- Cite all technical details with source paths and sections: [Source: epics.md#Story 10.3]

## Dev Agent Record

### Agent Model Used

Gemini 3.1 Pro

### Debug Log References

### Completion Notes List

### File List
