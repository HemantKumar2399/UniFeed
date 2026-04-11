# Story: 4-1-organizer-role-guarding

# Story 4.1: Organizer Role Guarding

Status: backlog

## Story

As a Developer,
I want to extend NextAuth sessions and tRPC context to include user roles (Student vs Organizer),
So that we can securely restrict access to `/dashboard` routes and API endpoints.

## Dependencies
- Story 1.3

## Acceptance Criteria

1. **Given** the NextAuth configuration
   **When** a session is initialized
   **Then** the `ROLE` flag is successfully attached to the session object.
2. **And** any user without the Organizer role attempting to access a dashboard route is redirected to `/unauthorized`.

## Tasks / Subtasks

- [ ] Task 1: Extend NextAuth Session (AC: 1)
  - [ ] Update `next-auth.d.ts` to extend the NextAuth User types with a `role` enum (`USER` | `ORGANIZER`).
  - [ ] Map the `role` field directly from the Prisma DB into both the NextAuth `jwt` and `session` callbacks so it's globally available on the client.
- [ ] Task 2: Middleware & Routing (AC: 2)
  - [ ] Implement Next.js `middleware.ts` logic to catch requests to `/dashboard/*`.
  - [ ] Redirect any session that lacks the Organizer enum straight to `/unauthorized`.
- [ ] Task 3: TRPC Context Security (AC: 2)
  - [ ] In `server/api/trpc.ts`, author a new `protectedOrganizerProcedure` middleware ensuring that the exact endpoint logic blocks non-organizers at the API level (not just the UI!).

## Dev Notes

- **Architecture:** API layer protection is FAR more important than UI middleware redirects. Always protect BOTH.
- Ensure the Prisma `User` schema natively possesses a `String` or `Enum` field for `role`, defaulting to `USER`.

### References

- [Source: planning-artifacts/architecture.md#Role System] -> Multi-tenant and role protection.

## Dev Agent Record
- Agent: Antigravity
