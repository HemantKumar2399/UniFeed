# Story 12.1: Dynamic Digital Ticket QR

Status: ready-for-dev
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

- [ ] Render Digital Ticket "Secured" expanded view
  - [ ] Present dynamic QR code locally mapping UserID and EventTicketID
- [ ] Encrypt/Authenticate Payload format
  - [ ] Prevent basic tampering of ID structure
- [ ] Web APIs Integration
  - [ ] Optional: request browser wake lock API / max-brightness on QR load where available

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

Gemini 3.1 Pro

### Debug Log References

### Completion Notes List

### File List
