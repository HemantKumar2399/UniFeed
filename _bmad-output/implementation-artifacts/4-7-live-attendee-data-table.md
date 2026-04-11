# Story: 4-7-live-attendee-data-table

# Story 4.7: Live Attendee Data Table

Status: backlog

## Story

As an Organizer,
I want to click into an event and see exactly who has RSVP'd,
So that I can prepare for the headcount.

## Dependencies
- Story 4.6
- Story 3.1

## Acceptance Criteria

1. **Given** an Active event page in the dashboard
   **When** viewed
   **Then** a data table renders listing the PRN and Name of all successfully registered students.

## Tasks / Subtasks

- [ ] Task 1: Attendee Sub-Query Hook (AC: 1)
  - [ ] Author `event.getAttendees` TRPC query executing `include: { RSVP: { include: user } }` filtering cleanly against the targeted `eventId`.
- [ ] Task 2: Data Grid Render (AC: 1)
  - [ ] Add `/dashboard/events/[id]` route structure matching desktop norms.
  - [ ] Render the tabular logic specifically including fields: `Name`, `PRN`, `Branch`, and a Checkbox (Checked-In vs RSVP Status layout element).

## Dev Notes

- **File Limits:** Consider modularizing the React Table logic into its own explicit component tree if sorting/filtering functions exceed 100 lines out of bounds! 

### References

- [Source: planning-artifacts/epics.md#FR-MO-3] -> Organizer real-time dashboard data tables.

## Dev Agent Record
- Agent: Antigravity
