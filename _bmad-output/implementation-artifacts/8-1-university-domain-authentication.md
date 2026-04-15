# Story 8.1: University Domain Authentication

Status: ready-for-dev
Depends on: None

## Story

As a student,
I want to authenticate securely using my university email (@jecrc.edu),
so that my identity is verified instantly without filling out manual registration forms.

## Acceptance Criteria

1. **Given** I am an unauthenticated user on the login screen
   **When** I enter a valid `@jecrc.edu` email address and authenticate via OAuth/Magic Link
   **Then** my account is created or retrieved in the database
   **And** I am securely logged into the platform.

2. **Given** I am an unauthenticated user
   **When** I attempt to authenticate with a non-university email (e.g., `@gmail.com`)
   **Then** the authentication is rejected
   **And** I see a clear 'University Email Required' error message.

## Tasks / Subtasks

- [ ] Configure NextAuth beta (v5) with Magic Link or OAuth provider
  - [ ] Implement custom sign-in page matching Tactile Utility design
- [ ] Add domain validation middleware/callback
  - [ ] Reject non-`@jecrc.edu` emails with clear error messaging
  - [ ] Allow valid emails to proceed and create `User` records in database

## Dev Notes

- Relevant architecture patterns and constraints: NextAuth.js (v5 beta) using Prisma adapters. Multi-tenancy & RLS.
- Source tree components to touch: `src/server/auth.ts` or related NextAuth config, `src/app/(auth)/login/page.tsx`, `src/middleware.ts`.
- Testing standards summary: Cover both valid domain authentication and invalid domain rejection scenarios.

### Project Structure Notes

- Alignment with unified project structure: Next.js App Router conventions.
- Detected conflicts or variances: None.

### References

- Cite all technical details with source paths and sections: [Source: epics.md#Story 8.1]

## Dev Agent Record

### Agent Model Used

Gemini 3.1 Pro

### Debug Log References

### Completion Notes List

### File List
