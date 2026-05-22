# Story 12.2: Organizer Scan-Only Pipeline

Status: done
Depends on: [Story 12.1: Dynamic Digital Ticket QR](https://github.com/HemantKumar822/UniFeed/issues/64), [Story 11.2: Real-time Attendee Heatmap Table](https://github.com/HemantKumar822/UniFeed/issues/62)

## Story

As an event organizer,
I want a dedicated interface to rapidly scan student QR codes at the door,
so that I can process a line of 300 students without manual typing or self-check-in abuse.

## Acceptance Criteria

1. **Given** I am an Organizer in "Scan Mode" at an active event
   **When** I scan a valid student QR code
   **Then** the system instantly marks that ticket as "Redeemed/Attended" in the database
   **And** the UI provides large, clear visual success framing (Full green screen flash) so I can immediately scan the next person.

## Tasks / Subtasks

- [x] Create Organizer 'Scan Mode' UI
  - [x] Connect HTML5 / browser native QR scanning capabilities (e.g. `html5-qrcode`)
- [x] Process Scanned payload via tRPC mutation
  - [x] Validate payload and emit check-in success
  - [x] Apply screen flash 'Green' success or 'Red' fail
  - [x] Handle continuous sequential scanning without reload

## Dev Notes

- Relevant architecture patterns and constraints: Scanning pipeline UI/UX. Must respond incredibly quickly to not hold the line.
- Source tree components to touch: `src/app/organizer/events/[id]/scan/page.tsx`, `src/components/Scanner.tsx`.
- Testing standards summary: Stub camera inputs or manually call mutation for test workflows.

### Project Structure Notes

- Alignment with unified project structure: Next.js routing, component structure
- Detected conflicts or variances: None.

### References

- Cite all technical details with source paths and sections: [Source: epics.md#Story 12.2]

## Dev Agent Record

### Agent Model Used

GPT-5.3-Codex

### Debug Log References

- Added organizer scan mode page with continuous camera scanning and high-visibility success/failure flash feedback.
- Implemented secure token redemption mutation validating organizer ownership, signature authenticity, and ticket-event binding.
- Added manual token fallback input in scanner component to avoid scan pipeline dead-ends during camera issues.

### Completion Notes List

- Built `/dashboard/events/[id]/scan` route as dedicated organizer scan-only surface.
- Implemented browser-native camera QR detection flow using BarcodeDetector + getUserMedia for rapid sequential scanning.
- Added `event.redeemTicket` tRPC mutation to authenticate signed payloads and mark RSVP records as `ATTENDED`.
- Added clear green/red full-screen visual framing for immediate next-scan confidence.

### File List

- src/app/dashboard/events/[id]/scan/page.tsx
- src/components/Scanner.tsx
- src/server/api/routers/event.ts
- src/app/dashboard/events/[id]/page.tsx
