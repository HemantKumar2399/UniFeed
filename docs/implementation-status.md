# UniFeed Implementation Status

This document is the Epic 0 route-and-system baseline. It records what is currently real, partial, or placeholder so later epics can build from verified behavior instead of assumptions.

## Route Matrix

| Area | Route / System | Status | Notes |
| --- | --- | --- | --- |
| Public landing | `/` | `real` | Renders the public marketing shell. |
| Auth | `/login`, `/api/auth/[...nextauth]`, `/api/auth/register` | `partial` | Credentials and domain checks exist, but college scoping and role hardening are not implemented yet. |
| Student home feed | `/home` | `partial` | Uses real event queries and carousel services, but still mixes in placeholder hero/trending UI. |
| Discover | `/discover` | `partial` | UI exists, but filtering and discovery behavior are still mostly static. |
| Search | `/search` | `placeholder` | Explicit placeholder screen. Backend event search exists separately. |
| Global | `/global` | `placeholder` | Explicit placeholder screen; no MVP-global behavior yet. |
| Passport | `/passport` | `partial` | Uses real RSVP-backed ticket data, but still relies on the old event-ticket QR model. |
| Profile | `/profile` | `partial` | Shows real session identity, but actions and saved/preference flows are not wired. |
| Organizer overview | `/dashboard` | `placeholder` | Demo KPI cards were removed in Epic 0; real organizer analytics are deferred. |
| Organizer events list | `/dashboard/events` | `placeholder` | Demo event cards were removed in Epic 0; real list lands in Epic 5. |
| Organizer metrics | `/dashboard/metrics` | `placeholder` | Demo metrics were removed in Epic 0; real reporting lands in Epic 11. |
| Event creation | `/dashboard/events/new` | `partial` | Wizard exists and can create events only for an organizer's existing club membership with a real image URL. |
| Event edit | `/dashboard/events/[id]/edit` | `placeholder` | Explicit "coming soon" page. |
| Event attendees | `/dashboard/events/[id]` | `partial` | Real attendee list and CSV export exist, but student profile fields are not in the schema yet. |
| Event scanner | `/dashboard/events/[id]/scan` | `partial` | Scanner and manual fallback exist, but they still use the legacy event-ticket QR model. |
| Hub public pages | `/hubs/[clubId]` | `partial` | Club pages and follow logic exist, but later epics add college scoping and moderation controls. |
| Organizer hubs | `/dashboard/hubs` | `partial` | Hub editor exists, but admin/community governance is still missing. |

## System Matrix

| System | Status | Notes |
| --- | --- | --- |
| Prisma schema and seed data | `partial` | Seeds real clubs, users, events, and hub content, but still models the pre-college, pre-student-profile schema. |
| Unit test suite | `real` | Existing `node:test` files now run through `tsx` via `npm run test:unit`. |
| Playwright setup | `partial` | Runner config is valid and test discovery works, but only example smoke coverage exists. |
| CI workflow | `real` | Epic 0 enables lint, typecheck, build, and unit-test steps with local-safe env defaults. |
| Upload pipeline | `partial` | Presigned URL generation exists, but local/mock fallback behavior was removed and real storage config is still required for uploads. |
| Organizer event authorization | `partial` | Still author-based; club-membership-based ownership is a later epic. |
| Attendee identity data | `placeholder` | PRN/branch are intentionally not fabricated anymore; real student profile fields arrive in Epic 1. |

## `_bmad-output` Cross-Check

| Story Artifact | Current Code Reality | Status |
| --- | --- | --- |
| `_bmad-output/implementation-artifacts/4-6-organizer-event-list-panel.md` | Organizer event list route existed, but it was still showing sample cards. Epic 0 replaces those with an explicit placeholder state. | `mismatch documented` |
| `_bmad-output/implementation-artifacts/4-5-secure-image-upload-pipeline.md` | Presigned upload code exists, but the UI had a local Unsplash fallback that hid real upload failures. Epic 0 removes that fallback. | `mismatch documented` |
| `_bmad-output/implementation-artifacts/4-7-live-attendee-data-table.md` | Attendee list and export exist, but PRN/branch were fake and check-in toggles were local-only. Epic 0 removes those misleading behaviors. | `mismatch documented` |
| `_bmad-output/implementation-artifacts/5-5-organizer-camera-scanner-utility.md` | Scanner flow exists, but it is still tied to event-ticket QR payloads rather than the future permanent student QR model. | `expected future rewrite` |
| `_bmad-output/implementation-artifacts/7-4-organizer-dashboard-distraction-free-refactor.md` | Organizer dashboard layout exists, but it was still filled with fabricated KPIs. Epic 0 removes the fake metrics rather than pretending the story is complete. | `mismatch documented` |
