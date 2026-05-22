# Story: 4-7-live-attendee-data-table

# Story 4.7: Live Attendee Data Table

Status: done

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

- [x] Task 1: Attendee Sub-Query Hook (AC: 1)
  - [x] Author `event.getAttendees` TRPC query executing `include: { RSVP: { include: user } }` filtering cleanly against the targeted `eventId`.
- [x] Task 2: Data Grid Render (AC: 1)
  - [x] Add `/dashboard/events/[id]` route structure matching desktop norms.
  - [x] Render the tabular logic specifically including fields: `Name`, `PRN`, `Branch`, and a Checkbox (Checked-In vs RSVP Status layout element).

### Review Findings

- [ ] [Review][Patch] Missing Error Type — Both endpoints throw generic `Error()` instead of `TRPCError`.
- [ ] [Review][Patch] Authorization Timing — `getAttendees` fetches full event + RSVPs before checking authorization.
- [ ] [Review][Patch] Unvalidated Number Input — `eventId: z.number()` doesn't constrain the range. Should use `.int().positive()`.
- [ ] [Review][Patch] Data Overfetching — `include: { user: true }` returns entire user profile, should `select` needed fields.
- [ ] [Review][Patch] Property name mismatch — RSVP relation uses `rsvps` not `RSVP` as stated in specs.
- [x] [Review][Defer] Incomplete Code — `getOrganizerDrafts` has `// ...` placeholder, missing implementation. — deferred, pre-existing
- **File Limits:** Consider modularizing the React Table logic into its own explicit component tree if sorting/filtering functions exceed 100 lines out of bounds! 

### References

- [Source: planning-artifacts/epics.md#FR-MO-3] -> Organizer real-time dashboard data tables.

## Dev Agent Record
- Agent: Antigravity
