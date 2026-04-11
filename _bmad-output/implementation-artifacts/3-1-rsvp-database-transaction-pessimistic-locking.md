# Story: 3-1-rsvp-database-transaction-pessimistic-locking

# Story 3.1: RSVP Database Transaction & Pessimistic Locking

Status: backlog

## Story

As a Developer,
I want to write a strict, atomic database transaction for RSVPs,
So that the system guarantees no overbooking, even if 500 students click simultaneously.

## Dependencies
- Story 2.1

## Acceptance Criteria

1. **Given** an event with exactly 1 spot remaining
   **When** 2 users attempt to register at the exact same millisecond
   **Then** the `prisma.$transaction` locks the row, grants 1 RSVP, and correctly rejects the other with a capacity error.

## Tasks / Subtasks

- [ ] Task 1: Setup Prisma RSVP Model (AC: 1)
  - [ ] Hook `RSVP` relational join mapping `User` to `Event` in `schema.prisma`.
  - [ ] Define the crucial `@@unique([userId, eventId])` compound constraint to prevent double-booking at the DB layer.
- [ ] Task 2: Pessimistic Logic Construction (AC: 1)
  - [ ] Standard Prisma updates are vulnerable to race conditions for capacity checks. Write a raw SQL query hook or utilizing Prisma `$executeRaw` that issues a `SELECT ... FOR UPDATE` lock on the event row.
  - [ ] If `capacity - RSVP_Count <= 0`, cleanly rollback the transaction.

## Dev Notes

- **Extreme Guardrail:** This is the single most critical structural mutation in the system. The capacity decrement and RSVP insert must be strictly atomic (NFR-10). If you rely on typical `prisma.event.findUnique()` followed by `prisma.event.update()`, you will incur a severe race condition during high-stress registration drops.
- A database-level unique constraint on `[userId, eventId]` is the final guarantee against script-kiddie double submissions.

### References

- [Source: planning-artifacts/architecture.md#Concurrency] -> NFR-10 constraint requiring pessimistic locking.

## Dev Agent Record
- Agent: Antigravity
