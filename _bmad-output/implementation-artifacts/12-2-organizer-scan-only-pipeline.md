# Story 12.2: Organizer Scan-Only Pipeline

Status: ready-for-dev
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

- [ ] Create Organizer 'Scan Mode' UI
  - [ ] Connect HTML5 / browser native QR scanning capabilities (e.g. `html5-qrcode`)
- [ ] Process Scanned payload via tRPC mutation
  - [ ] Validate payload and emit check-in success
  - [ ] Apply screen flash 'Green' success or 'Red' fail
  - [ ] Handle continuous sequential scanning without reload

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

Gemini 3.1 Pro

### Debug Log References

### Completion Notes List

### File List
