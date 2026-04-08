# Story 1.3: Restricted Domain Authentication

Status: in-progress

## Story

As a University Student,
I want to authenticate securely using my university email address via Google OAuth,
So that I know the network is exclusive and safe.

## Dependencies
- Story 1.1

## Acceptance Criteria

1. **Given** the login flow
   **When** a user attempts to sign in via Google OAuth with an email outside the allowed university domains (e.g., `@gmail.com`)
   **Then** the system rejects the auth and displays an error message
2. **And When** a user authenticates with an allowed university domain (e.g., `@jecrc.ac.in`)
   **Then** the NextAuth session is created and the user is redirected to the protected dashboard zone.

## Tasks / Subtasks

- [x] Task 1: Configure NextAuth (AC: 1, 2)
  - [x] Set up NextAuth (v5 beta) with Prisma adapter.
  - [x] Add CredentialsProvider (email + password) replacing Google OAuth per user direction.
- [x] Task 2: Domain Validation Logic (AC: 1)
  - [x] In the NextAuth `authorize` callback, inspect email domain against `ALLOWED_DOMAINS` env var.
  - [x] Reject non-JECRC domains — returns null (triggers CredentialsSignin error).
  - [x] Wire error redirect to `/error?error=AccessDenied` via `pages` config.
- [x] Task 3: Attach UI Login hook (AC: 2)
  - [x] Hero CTA now links to `/login` page via Next.js `Link` (no `console.log`).
  - [x] Login page calls `signIn("credentials")` from `next-auth/react`.

## Dev Notes

- **Security Constraint:** The university lock (FR-ID-1) happens *before* the DB row is finalized in `signIn()`.
- **Testing/Dev Constraint:** You may need to add a `localhost` mock bypass or env variable `ALLOWED_DOMAINS` to prevent locking yourself out during local dev.

### References

- [Source: planning-artifacts/prd.md#FR-ID-1] -> Lock registration to verified university domains.

## Dev Agent Record
- Agent: Antigravity

### Approach Change
- User directed switch from Google OAuth → email/password `CredentialsProvider` during implementation.
- Domain validation now in `authorize()` callback; JWT session strategy required for credentials.
- Registration handled via `/api/auth/register` route (domain check + bcrypt hash).

### Completion Notes
✅ Task 1: `src/server/auth/config.ts` — CredentialsProvider with Prisma adapter + JWT strategy.
✅ Task 2: `isAllowedDomain()` utility reads `ALLOWED_DOMAINS` env var; returns null on mismatch; `/error` page wired.
✅ Task 3: Hero CTA → `/login` page; login page calls `signIn("credentials")` from next-auth/react.
✅ Registration: `/api/auth/register` route with duplicate check and bcrypt hashing.
✅ Prisma migration: `add_user_password` — adds `password String?` to User model.

## File List
- `src/server/auth/config.ts`
- `src/app/login/page.tsx`
- `src/app/error/page.tsx`
- `src/app/api/auth/register/route.ts`
- `src/features/landing/components/Hero.tsx`
- `src/components/ui/button.tsx`
- `src/env.js`
- `.env.example`
- `prisma/schema.prisma`
- `prisma/migrations/20260407114520_add_user_password/migration.sql`

## Change Log
- Replaced DiscordProvider + Google OAuth approach with CredentialsProvider (email + password).
- Added domain enforcement via `ALLOWED_DOMAINS` env var (no hardcoded domains).
- Added `/login` page with unified login/register flow.
- Added `/error` page for auth errors.
- Added `/api/auth/register` API route.
- Updated Hero CTA to link to `/login`.
- Added `asChild` support to Button component.

### Review Findings

**Patches (must fix):**
- [ ] [Review][Patch] Domain rejection at login shows wrong error code — `authorize()` returning `null` fires `CredentialsSignin`, not `AccessDenied`; throw `new Error("AccessDenied")` for domain rejection instead [src/server/auth/config.ts:62-64]
- [ ] [Review][Patch] `isAllowedDomain()` duplicated across `config.ts` and `register/route.ts` — extract to shared utility [src/server/auth/config.ts:32, src/app/api/auth/register/route.ts:14]
- [ ] [Review][Patch] Auto-login after register silently swallows `signIn` failures — show error if `result?.ok` is false [src/app/login/page.tsx:86-88]
- [ ] [Review][Patch] `error/page.tsx` h1 hardcoded "Access Denied" for all error codes — use dynamic heading per error type [src/app/error/page.tsx:26]
- [ ] [Review][Patch] `Hero.tsx` marked `"use client"` unnecessarily — no hooks or browser APIs used [src/features/landing/components/Hero.tsx:1]
- [ ] [Review][Patch] No bcrypt 72-byte password truncation guard — enforce `maxLength={72}` on password input and ≤72 byte check in route [src/app/api/auth/register/route.ts:36, src/app/login/page.tsx:158]
- [ ] [Review][Patch] `email.split("@")[1]` fails on multi-`@` emails — use `.split("@").pop()` or validate email format explicitly [src/server/auth/config.ts:33, src/app/api/auth/register/route.ts:15]
- [ ] [Review][Patch] No max-length on `name` field — add a reasonable cap (e.g., 100 chars) in the register route [src/app/api/auth/register/route.ts:68]
- [ ] [Review][Patch] Race condition on duplicate email check — catch Prisma P2002 error and return 409 instead of 500 [src/app/api/auth/register/route.ts:74-79]
- [ ] [Review][Patch] Open redirect via unvalidated `callbackUrl` — validate it is an internal path before calling `router.push` [src/app/login/page.tsx:20, 52, 87]

**Deferred (pre-existing, not caused by this change):**
- [x] [Review][Defer] `email String?` nullable in Prisma schema but validated non-null at app layer — schema inconsistency [prisma/schema.prisma:61] — deferred, pre-existing schema from NextAuth scaffold
- [x] [Review][Defer] No CSRF protection on `/api/auth/register` POST route — deferred, Next.js App Router CSRF strategy is a project-wide concern
- [x] [Review][Defer] `asChild` class merging order in Button may surprise consumers — deferred, cosmetic/DX issue, pre-existing design choice
- [x] [Review][Defer] Empty-string ALLOWED_DOMAINS space edge case — deferred, operational concern, not a code defect
