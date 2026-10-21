# Stabilization and UX refresh — 22 October 2026

Completed on branch `codex/hackathon-stabilization`, starting at `502a528`.

## Result

UniFeed now has a cleaner shared student/organizer interface and a verified local demo path: discovery → RSVP → passport → organizer check-in → attendance. Existing user database contents were preserved; database/browser validation used a newly provisioned disposable PostgreSQL cluster.

## Changes

- Closed student attendee-stream exposure and cross-college/unpublished bookmark access. Student realtime updates contain capacity and the viewer's own status.
- Removed unrelated-domain and same-local-part login fallbacks; normalized registration/login email; server sessions refresh current database role/college and reject deleted accounts.
- Self-entered profiles remain pending. College admins can explicitly verify identity, and unverified profiles cannot generate usable passport QR/check in through QR.
- Local uploads are development-only, decode actual raster content and re-encode WebP; spoofed HTML/SVG are rejected. Storage uploads accept a restricted MIME set and safe extensions.
- Check-in and cancellation coordinate through the event lock; repeated check-ins preserve timestamps. Committed RSVP/check-in outcomes survive later live-update failures.
- Added attendee-counter reconciliation for existing data and corrected seed counters.
- Offline reconciliation preserves rejected/unresolved scans and their reasons. Camera lifetime is independent of mutation renders and stops late-acquired streams.
- Replaced duplicate role shells with shared navigation, readable mobile labels, better spacing, event date stamps, image fallbacks, focus/skip links, system-theme support and reduced motion.
- Removed dead Google/settings controls and misleading portfolio/delivery claims. Notifications expose failure/retry. Logo refetches preserve hub block drafts.
- Removed unused starter posts API/UI, unused hooks/components, obsolete scripts, a source-order test and the factory-only browser example. Replaced the registration constant check with real endpoint behavior tests.
- Setup is cross-platform, fail-fast and non-destructive. Seeding requires an explicit reset flag; local-host guards parse the hostname. Browser/integration tests require a dedicated local test database and explicit opt-in before reusing an existing server.
- Updated README, contribution/test instructions, implementation status, UX direction and remaining backlog. Historical planning docs are clearly identified as references.

## Verification

| Check                             | Observed result                                                                                                                                                                                      |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lint and type checking            | PASS: `npm run check`                                                                                                                                                                                |
| Isolated unit/API/component tests | PASS: 205 tests via `npm run test:unit`; no local DB/env file required                                                                                                                               |
| PostgreSQL integration            | PASS: 2 tests, concurrent RSVP allocation and check-in/cancellation race; isolated fixture cleanup                                                                                                   |
| Fresh database migrations         | PASS: all 10 migrations on PostgreSQL 17.10                                                                                                                                                          |
| Counter backfill                  | PASS: deliberately stale count repaired; every demo counter matches active registrations                                                                                                             |
| Explicit demo seed/bootstrap      | PASS against the disposable database                                                                                                                                                                 |
| Production build                  | PASS: Next build using the disposable environment                                                                                                                                                    |
| Production Chromium suite         | PASS: all 11 tests, including admin approval, cross-page RSVP state, deadline extension plus registration, responsive navigation, notification recovery, landing sign-in and durable manual check-in |
| Visual review                     | Desktop/mobile home, passport and organizer screenshots inspected; light/dark and narrow layouts covered                                                                                             |
| Patch hygiene                     | `git diff --check` passed                                                                                                                                                                            |

Runtime: Windows, Node 24.19.0, npm 11.17.0, PostgreSQL 17.10, Chromium. Unit test ESM loading was repaired for Next/Auth.js entry points and exact bracketed route filenames. The initial browser harness shared storage with its output directory; it was corrected to separate disposable database storage from browser artifacts before the successful final runs.

CI configuration is repaired and supplies its own secrets/test database. The hosted GitHub workflow itself was not executed in this local session. Firefox/WebKit, real object storage and physical phone camera behavior were not verified.

Local artifacts are ignored: `scratch/verification` contains verification logs/runtime; `test-results` contains browser screenshots/results. They are not repository runtime dependencies.

## What is next

1. Rehearse the actual phone-camera QR flow on the devices/network planned for the hackathon.
2. Choose the deployment target, configure secrets/storage, and deploy a single-instance demo.
3. Before open public registration, add mailbox verification, rate limiting, monitoring and a clear identity-review policy.
4. Use shared pub/sub before scaling to multiple app instances. Add reminder/digest delivery only when it is an intentional product feature.

This pass establishes a working, tested demo baseline. It does not claim a full production security certification or a redesign of every specialized editor.
