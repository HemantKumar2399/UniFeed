# Story 12.1: Dynamic Digital Ticket QR

Status: done
Depends on: [Story 10.1: "One-Tap" RSVP with Locking State](https://github.com/HemantKumar822/UniFeed/issues/58)

## Story

As a student,
I want my secured event tickets to generate a high-contrast QR code,
so that I can use it for incredibly fast, offline-resilient venue entry.

## Acceptance Criteria

1. **Given** I have a "✓ Secured" ticket in my Passport
   **When** I tap to expand the ticket for entry
   **Then** a dynamic QR code containing an encrypted payload of my Student ID and Event Ticket ID is rendered
   **And** the UI maximizes screen brightness (if supported by the browser API) for easy scanning.

## Tasks / Subtasks

- [x] Render Digital Ticket "Secured" expanded view
  - [x] Present dynamic QR code locally mapping UserID and EventTicketID
- [x] Encrypt/Authenticate Payload format
  - [x] Prevent basic tampering of ID structure
- [x] Web APIs Integration
  - [x] Optional: request browser wake lock API / max-brightness on QR load where available

## Dev Notes

- Relevant architecture patterns and constraints: Digital Passport Ticket rendering natively. Use a library like `qrcode.react`.
- Source tree components to touch: `src/components/DigitalTicket.tsx`, `src/app/passport/page.tsx`.
- Testing standards summary: Ensure valid QR payload scans out cleanly.

### Project Structure Notes

- Alignment with unified project structure: Components map to standard.
- Detected conflicts or variances: None.

### References

- Cite all technical details with source paths and sections: [Source: epics.md#Story 12.1]

## Dev Agent Record

### Agent Model Used

GPT-5.3-Codex

### Debug Log References

- Added `qrcode.react` dependency and implemented a dedicated `DigitalTicket` client component with expand/collapse behavior.
- Added signed payload token helper with HMAC-based signature and strict token verification to prevent basic tampering.
- Upgraded passport page to fetch the latest secured ticket, generate a signed payload server-side, and pass it to QR UI.

### Completion Notes List

- Implemented secure dynamic QR rendering for expanded secured ticket state in the passport flow.
- Payload now includes Student ID and Event Ticket ID with versioned signature format and verification helper.
- Added optional browser wake lock request while QR is expanded to improve scanner reliability under dimming conditions.
- Added unit tests for payload generation, decoding, and tamper rejection.

### File List

- src/app/(protected)/passport/page.tsx
- src/components/DigitalTicket.tsx
- src/lib/ticket-payload.ts
- src/lib/ticket-payload.test.ts
- package.json
