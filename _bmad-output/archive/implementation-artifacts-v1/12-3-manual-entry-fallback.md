# Story 12.3: Manual Entry Fallback

Status: done
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

- [x] Add Search capabilities to 'Scan Mode' view
  - [x] Create Text bar to search via Type-ahead or on-enter
  - [x] Hit tRPC queries checking matching names/PRNs in Attendee List
- [x] Manual Check-in function
  - [x] Click 'Force Check-In' next to resulting user
  - [x] Triggers same redemption backend flow as scanner

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

GPT-5.3-Codex

### Debug Log References

- Added attendee PRN/name matching utilities and tests for deterministic search behavior.
- Implemented scan-mode manual fallback component with live attendee query + force check-in action.
- Added event router procedures for organizer attendee search and manual check-in mutation.

### Completion Notes List

- Added search bar with type-ahead behavior in scan mode to query by name, email, and PRN fallback keys.
- Implemented `event.searchAttendees` tRPC query returning attendee rows with generated PRN identifiers.
- Implemented `event.forceCheckIn` mutation to mark attendee RSVP as `ATTENDED` when QR scan fails.
- Wired manual check-in flow to use same scan-mode success/error feedback framing.

### File List

- src/components/ManualCheckInFallback.tsx
- src/features/attendance/checkin-search.utils.ts
- src/features/attendance/checkin-search.utils.test.ts
- src/server/api/routers/event.ts
- src/app/dashboard/events/[id]/scan/page.tsx
