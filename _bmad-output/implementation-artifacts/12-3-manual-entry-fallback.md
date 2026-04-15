# Story 12.3: Manual Entry Fallback

Status: ready-for-dev
Depends on: [Story 12.2: Organizer Scan-Only Pipeline](https://github.com/HemantKumar822/UniFeed/issues/65)

## Story

As an event organizer,
I want the ability to manually search and check-in a student if their screen is broken or the QR fails,
so that the physical line doesn't halt due to technical glitches.

## Acceptance Criteria

1. **Given** I am an Organizer in "Scan Mode" at a venue
   **When** a student's QR code cannot be scanned
   **Then** I can use a search input to find their PRN/Name manually
   **And** I can click "Force Check-In" to mark them as Attended in the database.

## Tasks / Subtasks

- [ ] Add Search capabilities to 'Scan Mode' view
  - [ ] Create Text bar to search via Type-ahead or on-enter
  - [ ] Hit tRPC queries checking matching names/PRNs in Attendee List
- [ ] Manual Check-in function
  - [ ] Click 'Force Check-In' next to resulting user
  - [ ] Triggers same redemption backend flow as scanner

## Dev Notes

- Relevant architecture patterns and constraints: Organizer dashboard / Scanning mode. Robust fallback mechanism.
- Source tree components to touch: `src/app/organizer/events/[id]/scan/page.tsx`, `src/components/ManualCheckInFallback.tsx`, `src/server/api/routers/event.ts`.
- Testing standards summary: Searching logic mapping to correct student ID.

### Project Structure Notes

- Alignment with unified project structure: Follows design language for inputs.
- Detected conflicts or variances: None.

### References

- Cite all technical details with source paths and sections: [Source: epics.md#Story 12.3]

## Dev Agent Record

### Agent Model Used

Gemini 3.1 Pro

### Debug Log References

### Completion Notes List

### File List
