---
story_id: 8-1
key: 8-1-design-secure-student-qr-payload
status: done
---

# Story 8.1: Design Secure Student QR Payload

## Story Context
**Epic 8:** Permanent Student QR and Event Check-In Redesign
**Goal:** Replace the legacy event-ticket payload with a permanent student passport QR contract that can be verified safely across events.

**Acceptance Criteria:**
- QR payload contains only the permanent student QR identity and rotation metadata.
- Passport rendering and scan mode both use the new signed student QR contract.
- Legacy event-ticket QR usage is removed from the active product flow.

## Tasks / Subtasks

- [x] Introduce dedicated signed student QR helper and tests
- [x] Generate random stable `studentQrId` values for profiles and seeds
- [x] Rebuild passport around real student identity data and permanent QR rendering
- [x] Replace scan verification backend and organizer scan UI with permanent student QR flow
- [x] Add admin revoke/regenerate QR controls
- [x] Remove legacy event-ticket QR helpers from the active implementation path

## Dev Notes

- Active implementation touches the student profile lifecycle, admin controls, passport page, scanner page, and event verification mutation together so the QR contract stays consistent end to end.
- `STUDENT_QR_SECRET` is now the dedicated signing secret for permanent passport QR tokens.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Completion Notes List

- Added signed permanent student QR tokens with version-aware rotation support.
- Replaced the old ticket-token passport and scanner flow with a single student-passport QR flow.
- Added admin QR revoke/regenerate controls and verification tests covering the new outcomes.

### File List

- src/lib/student-qr.ts
- src/app/(protected)/passport/page.tsx
- src/app/dashboard/events/[id]/scan/page.tsx
- src/server/api/routers/event.ts
- src/server/api/routers/admin.ts
