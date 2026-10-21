# UniFeed codebase audit — 21 October 2026

Follow-up: see the [22 October stabilization report](stabilization-2026-10-22.md) for fixes and current verification. This audit remains the historical baseline.

Baseline: `502a528`. Scope: repository inventory, application/backend/UI inspection, schema and migrations, setup, CI, tests, and documentation. Three parallel reviewers covered backend, frontend, and repository health; the lead reviewer checked the highest-impact code paths. This is a broad static audit, not a claim that every line or exploit has been executed.

## Assessment

UniFeed is a substantial campus event application worth stabilizing. It does not need a rewrite. Its main weaknesses are inconsistent authorization between features, unreliable setup/verification, a few data-loss paths, and documentation that overstates completeness. Prioritize a reliable demo and correct access boundaries before redesigning or adding features.

The stack is Next.js 15 / React 19 / TypeScript, tRPC and React Query, PostgreSQL with Prisma, Auth.js credentials/JWT, and Tailwind. There are 204 tracked source files, including 38 test files, and 12 tRPC routers. Of 1,306 tracked files, 960 are vendored `.agents` tooling and 75 are `_bmad-output` artifacts. File volume is dominated by tooling, not application code.

## What exists

| Area       | Implemented surface                                                                                                                                                                             |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Student    | Credentials registration/login, onboarding, personalized feed, discovery/search, hub following, event details/discussions, RSVP/waitlist/cancellation, saved events, notifications, passport QR |
| Organizer  | Event editor and lifecycle, club permissions, attendee search/CSV, manual and camera check-in, offline queue, attendance updates, metrics, hub resource/FAQ editing                             |
| Admin      | Event moderation, college-scoped role/community management, student QR revoke/reissue                                                                                                           |
| Foundation | Typed API validation, reusable permission helpers, signed/versioned QR identity, transactional RSVP locking, meaningful policy and workflow tests                                               |

RSVP creation/cancellation locks the event row, and the database enforces unique user/event registration. QR verification includes HMAC signatures, timing-safe comparisons, revocation/version checks, and registration checks. These are foundations to preserve.

## Highest-priority findings

P1 means fix before exposing real student data or relying on the affected flow. P2 means fix for a dependable demo/development baseline. Findings below are confirmed code paths; race interleavings and browser execution consequences remain untested at runtime.

### P1 — Attendee information reaches student subscriptions

`src/server/api/routers/event.ts:316` allows students into `onAttendanceChange` after same-college visibility checks, then emits the entire payload at line 372. That payload contains all attendee rows, including email, PRN, branch, course, graduation year, and attendance status (`src/server/services/attendance-realtime.ts:76`, `src/features/attendance/realtime-attendance.ts:28`). The ordinary attendee endpoint is organizer-only, so the subscription bypasses its privacy boundary.

Separate student capacity/self-status updates from organizer attendee updates. Verify a student subscription cannot receive other students' identity fields.

### P1 — Saved events bypass college and publication restrictions

`src/server/api/routers/profile.ts:117` accepts arbitrary event IDs for bookmarks without checking access. `getSavedEvents` at line 50 has no college filter and includes APPROVED as well as PUBLISHED events. Saving a guessed ID can expose another college's event or an approved-but-unpublished record.

Reuse the student event visibility policy both when saving and reading, including soft-delete restrictions.

### P1 — Identity verification and domain membership are too permissive

`src/server/auth/domain.ts:40` maps an unmatched `.edu.in` address to the first college supporting any `.edu.in` domain. Registration creates usable accounts without mailbox verification, and `src/server/api/routers/student.ts:85` marks self-entered profiles verified. A made-up address and PRN can therefore become a “verified” passport identity.

Remove the unrelated-domain fallback. Decide the actual identity proof required for the hackathon: explicit demo accounts, mailbox verification, or administrator verification. Profile completion should not itself assert verified identity.

### P1 — Local upload permits arbitrary file extensions/content

`src/app/api/upload/route.ts:41` trusts the client MIME type; line 59 derives the extension independently from the submitted filename and saves raw bytes under `public/uploads`. An HTML filename/body with an image MIME passes these checks. Same-origin HTML execution is a likely consequence of static serving, not a reproduced exploit. The route also lacks a development-only guard.

Validate/decode actual image content, produce a known raster format and extension, and explicitly restrict local storage fallback to development.

### P1 — Demotion does not revoke existing JWT privileges

`src/server/auth/config.ts:108` puts role/college into the JWT only at sign-in. Authorization trusts those claims afterward, while admin role changes only update the database (`src/server/api/routers/admin.ts:125`). A demoted administrator can keep using an existing privileged session.

Revalidate current authorization or introduce a checked session version/revocation mechanism.

### P1 — Offline scanner reports success after losing rejected scans

`src/app/dashboard/events/[id]/scan/page.tsx:87` ignores the server verification outcome. Only network errors retain queue items; other errors and normal rejection outcomes are dropped, then line 105 reports successful synchronization. Invalid or unregistered scans can disappear without an operator-visible explanation.

Track accepted, rejected, and unresolved outcomes separately. Only remove acknowledged items under an explicit reconciliation policy.

### P1 operational — Setup implicitly resets existing data

Both setup scripts unconditionally seed. `prisma/seed.ts:330` deletes application records before rebuilding fixtures. Its local-database guard at line 20 matches the entire URL rather than its hostname; remote URLs can accidentally satisfy the check. Smoke bootstrap uses a similar guard.

Separate repeatable installation from an explicit demo reset, parse and validate the destination hostname/database, and use a dedicated disposable test database.

## Reliability and setup findings

| Priority | Evidence                                                                    | Consequence / next action                                                                                                                                                                                                            |
| -------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| P2       | `.github/workflows/ci.yml:12`; `src/env.js:6`; `package.json:30`            | CI omits production `AUTH_SECRET`, never creates the required `.env`, and has no PostgreSQL service despite running a DB test. Establish truthful, reproducible checks.                                                              |
| P2       | `src/server/services/rsvp.integration.test.ts:9`                            | The unit-test glob runs a real DB mutation test and reuses existing records. Separate unit/integration commands and isolate DB fixtures.                                                                                             |
| P2       | `scripts/setup-local.ps1:28`; `scripts/start-database.ps1:30`               | Native exit codes are not checked; Windows setup can print success after failure. Fail fast and verify readiness.                                                                                                                    |
| P2       | `scripts/setup-local.sh:40`; `start-database.sh:40`                         | Unix setup does not start the DB; the DB starter checks an occupied port before recognizing its running container. Make setup rerunnable.                                                                                            |
| P2       | `src/server/api/routers/event.ts:156`, `:1056`                              | Check-in reads GOING then writes ATTENDED without coordinating with cancellation's event lock. A cancellation/waitlist-promotion interleaving can revive a cancelled ticket. Share the transaction/locking policy and test the race. |
| P2       | `src/server/api/routers/rsvp.ts:149`                                        | Ticket commit precedes awaited realtime/notification operations. A later failure returns RSVP failure despite a committed ticket. Separate durable success from fan-out failure.                                                     |
| P2       | `prisma/migrations/20260526224500_add_event_attendee_count/migration.sql:1` | Existing registrations receive a zero counter without backfill. Reconcile active counts before trusting the denormalized value.                                                                                                      |
| P2       | `src/components/Scanner.tsx:83`, `:170`, `:178`                             | Busy/callback changes restart the camera; a delayed camera request can resolve after cleanup without stopping its stream. Stabilize camera lifetime and handle cancellation.                                                         |
| P2       | `src/app/dashboard/hubs/page.tsx:62`, `:96`                                 | Saving a logo refetches hub content and overwrites unsaved block drafts. Preserve dirty state or save atomically.                                                                                                                    |

Realtime uses a process-local EventEmitter (`src/server/events.ts`). It is suitable only for a single-process demo without additional pub/sub; updates do not cross server instances. This limitation is already acknowledged in the readiness document and is a deployment constraint, not proof that the local demo is broken.

## Product polish that currently misleads users

- Google login looks available but has no handler (`src/components/AuthForm.tsx:138`); the backend only configures credentials. Hide it or finish the provider flow.
- Organizer settings presents four inactive clickable rows (`src/app/dashboard/settings/page.tsx:58`). Remove unavailable actions from the demo surface.
- Notifications render query failure as “All caught up” (`src/features/notifications/components/NotificationsPageClient.tsx:10`, `:90`). Add an error/retry state.
- Reminder/digest toggles persist preferences, but no delivery job was found. Change the promises or implement delivery before claiming it works.
- Landing footer links target `#`; some portfolio marketing claims exceed the inspected implementation.
- `tests/e2e/example.spec.ts:10` expects UniFeed in the title while the layout uses Campus Platform. Correct the branding/test contract.
- Reduced-motion support is defined but unused in navigation shells; keyboard focus and nested notification link/button semantics need attention.

## Repository cleanup

Keep `src`, `prisma`, tests, and the lockfile. Avoid a broad refactor until the demo passes. Large event/admin/editor components can be split when fixing concrete bugs rather than as a prerequisite to all work.

Choose one canonical product/architecture/UX document set. The two UX specifications diverge, the implementation matrix claims a `/global` route absent from the route tree, and several story links point to removed paths. The sprint status was last updated May 26, with Epics 28–31 still backlog. Historical PASS labels in `docs/production-readiness.md` are not current verification evidence.

CONTRIBUTING references a missing Tailwind config and snake_case Prisma mappings that the schema does not use. Old issue/milestone synchronization scripts target stale paths or epic ranges. Archive obsolete automation and correct the contribution instructions.

Decide deliberately whether to vendor all 960 `.agents` files or document tool installation; do not delete skills indiscriminately. `.next`, Playwright reports, test results, and TypeScript build info are already ignored generated output. They are not the main source-control problem. Extend environment ignore patterns to cover additional `.env` variants while preserving `.env.example`.

## Recommended cleanup sequence

1. **Reproducible foundation:** install locked dependencies; align the Node version; make setup fail fast; separate demo reset from setup; use a disposable database; make lint/typecheck/build/unit/integration commands truthful.
2. **Access and data correctness:** close subscription/bookmark leaks; harden domain/identity/session handling and uploads; coordinate check-in/cancellation; repair offline reconciliation and counter backfill.
3. **One dependable demo:** student login → discovery → event → RSVP/waitlist → passport → organizer scan → attendee count/metrics. Exercise admin approval as a setup step. Test with two users and a full event, including failed network and duplicate scan cases.
4. **Remove misleading affordances:** Google/settings placeholders, delivery promises, incorrect empty states and stale branding. Preserve the existing visual direction.
5. **Documentation and dust:** publish dated verification results, consolidate canonical docs, archive obsolete scripts/artifacts, then extract oversized components selectively.

Do not expand scope into payments, public portfolios, additional social features, or multi-instance realtime until the core demo and checks are dependable.

## Verification record

Tracked working tree was clean at the audit baseline. Source, lockfile, and database were not changed during inspection. Dependency installation was attempted for runtime validation; final outcome is recorded below. No seed/reset/migration or database-writing tests were executed. Existing readiness claims were not treated as proof. Security issues and concurrency risks above are source-based findings, not penetration-test results.

| Check                                           | Observed result                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Locked dependency installation                  | PASS: `npm ci --no-audit --no-fund`, after retry with network access; 648 packages installed, Prisma client generated                                                                                                                                                                                      |
| Lint                                            | PASS: `npm run lint`                                                                                                                                                                                                                                                                                       |
| Type checking                                   | PASS: `npm run typecheck`                                                                                                                                                                                                                                                                                  |
| Production build                                | PASS: `npm run build` with required access. Initial restricted attempt failed fetching Google Fonts and writing a build directory.                                                                                                                                                                         |
| Non-database test selection                     | INCOMPLETE: ran 37 test files, excluding `rsvp.integration.test.ts`, with Node/tsx. Only two passing results appeared before the run stalled. A retry with normal subprocess access, concurrency 4, and per-test timeout also stalled after two results; both were stopped. Root cause remains unverified. |
| Database integration / migrations / browser E2E | NOT RUN; no disposable database was provisioned and existing data was preserved                                                                                                                                                                                                                            |
| Dependency vulnerability advisory audit         | NOT RUN; no claim that installed dependencies are vulnerability-free                                                                                                                                                                                                                                       |

Verification used the host's Node 24.19.0 / npm 11.17.0; `.nvmrc` and CI request Node 20. Repeat checks under the selected supported project runtime during cleanup. Build success with local environment values does not resolve the separately identified fresh-clone CI configuration defects or verify database-backed user journeys.

Audit output is this document only. Installed dependencies and generated build/client artifacts are local ignored output; no application fixes were applied.
