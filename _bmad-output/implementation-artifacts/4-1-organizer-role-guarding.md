# Story: 4-1-organizer-role-guarding

# Story 4.1: Organizer Role Guarding

Status: done

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

- [x] Task 1: Extend NextAuth Session (AC: 1)
  - [x] Update `next-auth.d.ts` to extend the NextAuth User types with a `role` enum (`USER` | `ORGANIZER`).
  - [x] Map the `role` field directly from the Prisma DB into both the NextAuth `jwt` and `session` callbacks so it's globally available on the client.
- [x] Task 2: Middleware & Routing (AC: 2)
  - [x] Implement Next.js `middleware.ts` logic to catch requests to `/dashboard/*`.
  - [x] Redirect any session that lacks the Organizer enum straight to `/unauthorized`.
- [x] Task 3: TRPC Context Security (AC: 2)
  - [x] In `server/api/trpc.ts`, author a new `protectedOrganizerProcedure` middleware ensuring that the exact endpoint logic blocks non-organizers at the API level (not just the UI!).

## Dev Notes

- **Architecture:** API layer protection is FAR more important than UI middleware redirects. Always protect BOTH.
- Ensure the Prisma `User` schema natively possesses a `String` or `Enum` field for `role`, defaulting to `USER`.

### References

- [Source: planning-artifacts/architecture.md#Role System] -> Multi-tenant and role protection.

## Dev Agent Record
- Agent: Antigravity

### Implementation Notes
- Added role checking in session configuration
- Configured Next.js middleware with Edge support
- Updated session options
- Added TRPC `protectedOrganizerProcedure`

## File List
- src/server/auth/config.ts
- src/middleware.ts
- src/server/api/trpc.ts

## Change Log
- **2026-04-11**: Implemented NextAuth global session role injection, Edge middleware route handler redirects, and API layer TRPC middleware for securing organizer routes.

### Review Findings
- [x] [Review][Patch] Middleware uses Edge-incompatible imports — `src/middleware.ts` imports full NextAuth configuration containing `bcryptjs` and `PrismaAdapter` which breaks under Edge runtime.
- [x] [Review][Patch] Weak defense-in-depth on layout — `src/app/(dashboard)/layout.tsx` checks for session existence but fails to check for `ORGANIZER` role, relying entirely on middleware.
