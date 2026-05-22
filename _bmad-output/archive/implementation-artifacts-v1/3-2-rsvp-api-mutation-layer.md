# Story: 3-2-rsvp-api-mutation-layer

# Story 3.2: RSVP API Mutation Layer

Status: done

## Story

As a Developer,
I want to expose the RSVP transaction via a secure tRPC mutation,
So that the frontend can trigger registrations and receive exact error codes.

## Dependencies
- Story 3.1

## Acceptance Criteria

1. **Given** an authenticated user
   **When** they call the `rsvp.register` mutation
   **Then** the endpoint validates their session and triggers the transaction.
2. **And** returns explicit errors (e.g., `EVENT_FULL`, `ALREADY_REGISTERED`) mapped for the UI to display.

## Tasks / Subtasks

- [x] Task 1: Protected Endpoint Construction (AC: 1)
  - [x] Define `rsvp.register` within a protected tRPC Router context to ensure `ctx.session.user.id` is available.
  - [x] Pass the session ID to the locking transaction designed in 3.1.
- [x] Task 2: TRPC Error Mapping (AC: 2)
  - [x] Wrap the transaction in a try/catch mapping Prisma error codes to clean `TRPCError` exceptions.
  - [x] Return `CONFLICT` for already registered.
  - [x] Return `PRECONDITION_FAILED` or `BAD_REQUEST` for full capacity.

## Dev Notes

- **Implementation Integrity:** Never accept the `userId` from the client mutation payload, always extract it securely from the NextAuth Server Context.

### References

- [Source: planning-artifacts/architecture.md#API] -> TRPC mutation validation standards.

## Dev Agent Record
- Agent: Antigravity

### File List
- `src/server/api/routers/rsvp.ts`
- `src/server/api/root.ts`

### Change Log
- Created a protected TRPC method `rsvp.register`.
- Used `ctx.session.user.id` to prevent malicious RSVP changes.
- Wrapped the call to `createRsvpPessimistic` in a try-catch for `TRPCError` matching.
- Updated `root.ts` to include `rsvpRouter`.

### Completion Notes
✅ All subtasks completed successfully.

### Review Findings
- [x] [Review][Defer] Missing `onError` Event Emitter handling [`src/server/api/routers/rsvp.ts`] — deferred, pre-existing 
✅ Added explicit error messaging (`EVENT_FULL`, `ALREADY_REGISTERED`).
✅ Typechecks completed successfully.
