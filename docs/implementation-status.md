# UniFeed Implementation Status

This document is the Epic 0 route-and-system baseline. It records what is currently real, partial, or placeholder so later epics can build from verified behavior instead of assumptions.

## Route Matrix

| Area | Route / System | Status | Notes |
| --- | --- | --- | --- |
| Public landing | `/` | `real` | Renders the public marketing shell. |
| Auth | `/login`, `/api/auth/[...nextauth]`, `/api/auth/register` | `real` | Credentials and domain checks exist, and college scoping and role hardening have been implemented (Epic 18). |
| Student home feed | `/home` | `real` | Uses protected, college-scoped event queries and a college-scoped Happening This Week carousel. |
| Discover | `/discover` | `real` | Uses protected college-scoped discovery queries with category and collection filters. |
| Search | `/search` | `real` | Searches upcoming published events and communities within the viewer's college scope. |
| Global | `/global` | `real` | Implemented in Epic 10/15 with global discovery behavior. |
| Passport | `/passport` | `real` | Shows real student identity data, permanent student QR, and active registrations using the Epic 8 passport flow. |
| Profile | `/profile` | `real` | Shows real session identity and wired saved/preference flows. |
| Organizer overview | `/dashboard` | `real` | Shows live organizer/admin workflow metrics, RSVP totals, and attendance activity for the viewer's managed scope. |
| Organizer events list | `/dashboard/events` | `real` | URL-driven tabs, filters, and real lifecycle actions now use managed-club event data. |
| Organizer metrics | `/dashboard/metrics` | `real` | Real reporting implemented in Epic 11, with Epic 27 RSVP-to-attendance conversion charts. |
| Event creation | `/dashboard/events/new` | `real` | Shared event editor supports full metadata, draft saving, submission, and upload/manual image flows. |
| Event edit | `/dashboard/events/[id]/edit` | `real` | Shared event editor now loads existing events with status-aware locking and actions. |
| Event attendees | `/dashboard/events/[id]` | `real` | Real attendee list, CSV export with checked-in timestamps, filtering, check-in state, and StudentProfile identity fields are wired. |
| Event scanner | `/dashboard/events/[id]/scan` | `real` | Scanner verifies the permanent student passport QR against the selected event and keeps the manual fallback path. |
| Hub public pages | `/hubs/[clubId]` | `real` | Club pages feature college scoping and moderation controls. |
| Organizer hubs | `/dashboard/hubs` | `real` | Hub editor and membership-based management with moderation workflows are fully implemented. |

## System Matrix

| System | Status | Notes |
| --- | --- | --- |
| Prisma schema and seed data | `real` | Models colleges, users, clubs, events, memberships, StudentProfile identity, permanent student QR IDs, and seeded isolation data. |
| Unit test suite | `real` | Existing `node:test` files now run through `tsx` via `npm run test:unit`. |
| Playwright setup | `real` | Playwright test coverage expanded in Epic 16. |
| CI workflow | `real` | Epic 0 enables lint, typecheck, build, and unit-test steps with local-safe env defaults. |
| Upload pipeline | `real` | Production upload pipeline implemented with real bucket credentials configuration support. |
| Organizer event authorization | `real` | Organizer mutations use reusable club membership and same-college admin permission checks. |
| Attendee identity data | `real` | PRN, branch, course, graduation year, and permanent student QR state come from StudentProfile records. |
| Calendar exports and analytics | `real` | Epic 27 adds authenticated event `.ics` downloads, durable RSVP check-in timestamps, waitlist promotion regression coverage, and organizer conversion analytics. |

## `_bmad-output` Cross-Check

| Story Artifact | Current Code Reality | Status |
| --- | --- | --- |
| `_bmad-output/implementation-artifacts/4-6-organizer-event-list-panel.md` | Organizer event list route existed, but it was still showing sample cards. Epic 0 replaces those with an explicit placeholder state. | `mismatch documented` |
| `_bmad-output/implementation-artifacts/4-5-secure-image-upload-pipeline.md` | Presigned upload code exists, but the UI had a local Unsplash fallback that hid real upload failures. Epic 0 removes that fallback. | `mismatch documented` |
| `_bmad-output/implementation-artifacts/4-7-live-attendee-data-table.md` | Attendee list and export exist, but PRN/branch were fake and check-in toggles were local-only. Epic 0 removes those misleading behaviors. | `mismatch documented` |
| `_bmad-output/implementation-artifacts/5-5-organizer-camera-scanner-utility.md` | Scanner flow now uses the permanent student QR model and no longer redeems event-ticket payloads. | `updated in Epic 8` |
| `_bmad-output/implementation-artifacts/7-4-organizer-dashboard-distraction-free-refactor.md` | Organizer dashboard layout exists, but it was still filled with fabricated KPIs. Epic 0 removes the fake metrics rather than pretending the story is complete. | `mismatch documented` |
