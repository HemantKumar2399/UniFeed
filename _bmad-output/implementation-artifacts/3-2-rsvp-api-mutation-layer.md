# Story: 3-2-rsvp-api-mutation-layer

# Story 3.2: RSVP API Mutation Layer

Status: backlog

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

- [ ] Task 1: Protected Endpoint Construction (AC: 1)
  - [ ] Define `rsvp.register` within a protected tRPC Router context to ensure `ctx.session.user.id` is available.
  - [ ] Pass the session ID to the locking transaction designed in 3.1.
- [ ] Task 2: TRPC Error Mapping (AC: 2)
  - [ ] Wrap the transaction in a try/catch mapping Prisma error codes to clean `TRPCError` exceptions.
  - [ ] Return `CONFLICT` for already registered.
  - [ ] Return `PRECONDITION_FAILED` or `BAD_REQUEST` for full capacity.

## Dev Notes

- **Implementation Integrity:** Never accept the `userId` from the client mutation payload, always extract it securely from the NextAuth Server Context.

### References

- [Source: planning-artifacts/architecture.md#API] -> TRPC mutation validation standards.

## Dev Agent Record
- Agent: Antigravity
