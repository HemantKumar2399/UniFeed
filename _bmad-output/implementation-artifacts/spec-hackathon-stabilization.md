---
title: Hackathon stabilization
type: bugfix
created: 2026-10-22
status: done
baseline_commit: 502a528
context: []
---

<frozen-after-approval reason="User authorized the audit cleanup and requested completion with verification">

## Intent

Make the existing UniFeed application dependable for development and a campus event demonstration. Apply the concrete audit fixes, preserve existing features, and report verification honestly.

## Boundaries & Constraints

Always preserve existing user data, use current architecture, and validate access at server boundaries. Work on the cleanup branch in the current checkout. Execute directly with minimal agent use per the user's latest instruction. Do not deploy, send messages, reset the existing database, or remove vendored agent tooling indiscriminately. Keep unsupported features visibly unavailable rather than inventing new delivery/payment infrastructure.

## I/O & Edge-Case Matrix

| Scenario                                                          | Expected behavior                                                      |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Student requests attendee stream or another college's saved event | Server denies access; student capacity updates remain usable           |
| Unknown university domain / unverified profile                    | No college fallback or verified-identity assertion                     |
| Demoted or deleted user reuses session                            | Current database authorization applies                                 |
| Spoofed image upload                                              | Reject invalid bytes and derive safe extension from re-encoded content |
| Offline rejected scan / request failure                           | Preserve unresolved item and show reason                               |
| Duplicate scan / cancellation race                                | One valid state transition, no resurrection of cancelled ticket        |
| Repeat setup                                                      | No implicit destructive seed; native failures terminate setup          |
| Unit test without local environment/database                      | Pure and mocked tests run independently of DB integration              |

</frozen-after-approval>

## Code Map

- `src/server/auth/`, `src/server/api/routers/{profile,student,admin}.ts`: identity, current permissions, bookmarks.
- `src/server/api/routers/{event,rsvp}.ts`, `src/server/services/`: attendance privacy and transactions.
- `src/app/api/upload/route.ts`: development upload boundary.
- `src/features/attendance/`, `src/components/Scanner.tsx`, scanner route: queue and camera lifecycle.
- `scripts/`, `package.json`, `.github/workflows/ci.yml`: reliable setup/test entry points.
- `README.md`, `docs/`: current setup, audit resolution and remaining limits.

## Tasks & Acceptance

- [x] Repair Node test runtime and separate isolated/DB tests.
- [x] Fix attendee/bookmark authorization, domain/session identity, and upload validation with regressions.
- [x] Coordinate check-in state changes; make committed RSVP outcomes survive fan-out errors; backfill counters.
- [x] Preserve offline scans and camera resources; remove misleading UI and preserve hub drafts.
- [x] Make setup non-destructive and fail fast; configure CI explicitly.
- [x] Run unit tests, lint, types, production build, and any safely available isolated DB/browser checks.
- [x] Publish dated verification and next steps; preserve original audit history.

Given a clean clone, when isolated checks run, then no local database or secret file is required. Given an unauthorized caller or failed scan, when the affected endpoint is used, then no private data or unresolved queue entry is silently lost. Given the existing checkout, when cleanup completes, then existing database contents remain intact and verification gaps are explicit.

## Verification

Run targeted regression tests before and after fixes, then `npm run test:unit`, `npm run check`, `npm run build`, and `git diff --check`. Run DB integration/browser checks only against a separately provisioned disposable database. A passing build alone does not establish demo correctness.

## Scope update and review

The user subsequently authorized a stronger frontend/UX refresh, removal of unnecessary code/tests, and current documentation. Implementation stayed within that expanded scope. Review was performed directly to honor the user's instruction to minimize subagents. No unresolved regression was left in the executed checks. Production follow-ups are recorded in the stabilization report.

## Suggested Review Order

- Start with the shared interface and mobile navigation.
  [PlatformShell.tsx:41](../../src/components/layout/PlatformShell.tsx#L41)
- Check server-session authorization refresh.
  [config.ts:87](../../src/server/auth/config.ts#L87)
- Review college-scoped bookmark reads.
  [profile.ts:60](../../src/server/api/routers/profile.ts#L60)
- Review the shared event lock before attendance transitions.
  [event.ts:170](../../src/server/api/routers/event.ts#L170)
- Check offline reconciliation before the UI queue integration.
  [offline-scan-queue.ts:3](../../src/features/attendance/offline-scan-queue.ts#L3)
- Review regression coverage and isolated execution.
  [security-regressions.test.ts:1](../../src/server/security-regressions.test.ts#L1)
  [run-tests.mjs:1](../../scripts/run-tests.mjs#L1)
- Finish with the dated validation record and remaining release limits.
  [stabilization-2026-10-22.md:1](../../docs/stabilization-2026-10-22.md#L1)
