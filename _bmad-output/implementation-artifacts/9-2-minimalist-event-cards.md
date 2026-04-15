# Story 9.2: Minimalist Event Cards

Status: ready-for-dev
Depends on: [Story 9.1: The Campus Pulse Mobile Feed](https://github.com/HemantKumar822/UniFeed/issues/120)

## Story

As a student,
I want to see critical event metadata directly on the pulse feed cards,
so that I can evaluate an event's relevance instantly without opening a new page.

## Acceptance Criteria

1. **Given** there are active events in the Campus Pulse feed
   **When** I view an event card
   **Then** the card displays the Event Title, Club Avatar, Time, and Location
   **And** the UI uses whisper borders (`1px solid rgba(0,0,0,0.1)`) and high-contrast typography.

## Tasks / Subtasks

- [ ] Build Event Card component
  - [ ] Implement whisper borders and high-contrast typography
  - [ ] Render Title, Club Avatar, Time, and Location

## Dev Notes

- Relevant architecture patterns and constraints: Minimalist UI, whisper borders, "NotionInter" typography.
- Source tree components to touch: `src/components/EventCard.tsx`.
- Testing standards summary: Ensure card renders correct props safely.

### Project Structure Notes

- Alignment with unified project structure: Shared components UI.
- Detected conflicts or variances: None.

### References

- Cite all technical details with source paths and sections: [Source: epics.md#Story 9.2]

## Dev Agent Record

### Agent Model Used

Gemini 3.1 Pro

### Debug Log References

### Completion Notes List

### File List
