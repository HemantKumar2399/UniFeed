# Story 11.2: Real-time Attendee Heatmap Table

Status: ready-for-dev
Depends on: [Story 11.1: Distraction-Free Block Editor](https://github.com/HemantKumar822/UniFeed/issues/61)

## Story

As a club organizer,
I want to view a live table of students who have RSVP'd to my event,
so that I can monitor demographic breakdowns (Course/Year) dynamically.

## Acceptance Criteria

1. **Given** I am an Organizer viewing an active event dashboard
   **When** students RSVP to the event
   **Then** the attendee data table auto-updates in real-time
   **And** I can sort the table columns by Name, PRN, Branch, or Time of RSVP.

## Tasks / Subtasks

- [ ] Create Attendee Table view UI
  - [ ] Support sorting by Name, PRN, Branch, and Time of RSVP
- [ ] Bind table to real-time updates
  - [ ] Re-fetch or push update rows over WebSockets when reservations happen

## Dev Notes

- Relevant architecture patterns and constraints: Dashboard Expansion layout strategy, Real-time sync, Shadcn Table component.
- Source tree components to touch: `src/app/organizer/events/[id]/page.tsx`, `src/components/AttendeeTable.tsx`.
- Testing standards summary: Confirm sort logic, check table refresh mechanics when new RSVPs happen.

### Project Structure Notes

- Alignment with unified project structure: Standard data components.
- Detected conflicts or variances: None.

### References

- Cite all technical details with source paths and sections: [Source: epics.md#Story 11.2]

## Dev Agent Record

### Agent Model Used

Gemini 3.1 Pro

### Debug Log References

### Completion Notes List

### File List
