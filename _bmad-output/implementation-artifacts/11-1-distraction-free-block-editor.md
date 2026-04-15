# Story 11.1: Distraction-Free Block Editor

Status: ready-for-dev
Depends on: [Story 8.1: University Domain Authentication](https://github.com/HemantKumar822/UniFeed/issues/118)

## Story

As a club organizer,
I want to create events using a clean, text-focused interface,
so that I can draft event descriptions rapidly without fighting complex layout tools.

## Acceptance Criteria

1. **Given** I have Organizer privileges
   **When** I navigate to 'Create New Event'
   **Then** I am presented with a minimalist, Notion-style text editor
   **And** I can set the Title, Description, Date, Time, Location, and Max Capacity in a single, flowing document structure.

## Tasks / Subtasks

- [ ] Ensure route is guarded for 'Organizer' privileges
- [ ] Build minimalist, Notion-style single-column document editor
  - [ ] Fields: Title, Description, Date, Time, Location, Max Capacity
  - [ ] Submit mutation to `createEvent`

## Dev Notes

- Relevant architecture patterns and constraints: Notion-style distraction-free block editor. Strict 1px light gray borders, 3-tier layout logic.
- Source tree components to touch: `src/app/organizer/events/new/page.tsx` or similar, `src/components/BlockEditor.tsx`.
- Testing standards summary: Check form constraints, rendering. Check strict role guarding.

### Project Structure Notes

- Alignment with unified project structure: Auth guarded pages.
- Detected conflicts or variances: None.

### References

- Cite all technical details with source paths and sections: [Source: epics.md#Story 11.1]

## Dev Agent Record

### Agent Model Used

Gemini 3.1 Pro

### Debug Log References

### Completion Notes List

### File List
