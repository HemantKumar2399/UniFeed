# Story 9.1: The Campus Pulse Mobile Feed

Status: ready-for-dev
Depends on: [Story 8.1: University Domain Authentication](https://github.com/HemantKumar822/UniFeed/issues/118)

## Story

As a student,
I want to view a chronological feed of upcoming campus events,
so that I can easily discover activities without infinite scrolling algorithms.

## Acceptance Criteria

1. **Given** I am an authenticated student
   **When** I navigate to the Home tab
   **Then** I see a vertical, mobile-optimized list (max-w-md constraint) of active events
   **And** the layout features appropriate 8-point grid spacing and Tactile Utility neutral colors.

## Tasks / Subtasks

- [ ] Create Pulse feed layout
  - [ ] Apply `max-w-md` constraints and proper 8-point spacing
- [ ] Fetch events chronologically
  - [ ] Integrate tRPC endpoint to return upcoming events

## Dev Notes

- Relevant architecture patterns and constraints: Mobile-centric layout, max-w-md constraint. Tactile Utility colors.
- Source tree components to touch: `src/app/page.tsx` or `src/app/pulse/page.tsx`, `src/server/api/routers/event.ts`.
- Testing standards summary: Verify chronological sorting, valid layout constraints.

### Project Structure Notes

- Alignment with unified project structure: Standard page layouts.
- Detected conflicts or variances: None.

### References

- Cite all technical details with source paths and sections: [Source: epics.md#Story 9.1]

## Dev Agent Record

### Agent Model Used

Gemini 3.1 Pro

### Debug Log References

### Completion Notes List

### File List
