# UniFeed implementation status

Updated 22 October 2026. This is the current code map; historical epic completion labels are not verification evidence.

| Area              | Current implementation                                                                                                                               |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Student discovery | Home feed, week-ahead links, search, categories/collections, college-scoped events and hub directory                                                 |
| Registration      | Domain eligibility, credentials, STUDENT-only public registration, onboarding with pending identity                                                  |
| Identity          | Permanent signed passport QR; college admins verify profiles, revoke and regenerate QR; unverified profiles cannot use QR check-in                   |
| Events            | Shared organizer editor, draft/submission/admin review/publication/cancellation/deadline extension                                                   |
| RSVP              | Transactional seat allocation, waitlist, cancellation/promotion, private self-status/capacity stream                                                 |
| Attendance        | Authorized organizer attendee list, CSV, manual/QR check-in, stable check-in timestamp, offline reconciliation                                       |
| Communities       | Following, resources/FAQ blocks, owner/editor management, logo uploads; draft blocks survive logo refetches                                          |
| Reporting         | Organizer workflow, registration and attendance metrics, authenticated calendar downloads                                                            |
| UX                | Shared responsive shell, compact non-scrolling event previews, full event pages, neutral black dark mode, button-origin theme reveal, reduced motion |
| Tooling           | Node 24, locked npm install, non-destructive cross-platform setup, isolated unit tests, guarded PostgreSQL integration suite, Chromium smoke         |

## Scope boundaries

There is no separate `/global` route. Google sign-in, payments, employer portfolios, email reminders and weekly digests are not implemented. Saved communication preferences do not imply a delivery service. Do not advertise these as working capabilities.

College domain matching restricts eligibility and never maps an unrelated .edu.in address to a college. Mailbox ownership verification is still a future production requirement. College-admin identity review protects the verified passport contract.

Realtime delivery currently uses one app process; distributed deployment requires shared pub/sub. S3 presigned uploads restrict MIME types but require deployment-side storage/CDN content policy. Local image uploads are development-only and re-encode raster bytes.

## Source of truth

Use [README](../README.md) for setup, [current architecture](architecture/current.md) for the code map, [production readiness](production-readiness.md) for dated verification, and [UX refresh](ux-refresh.md) for current UI direction. Original PRD/architecture/design documents retain planning context. Vendored skills and generated plans are no longer versioned; local copies and prior Git history preserve them. See [repository recovery](repository.md) for backup and restoration.
