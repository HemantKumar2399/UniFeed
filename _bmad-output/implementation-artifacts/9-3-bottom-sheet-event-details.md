# Story 9.3: Bottom Sheet Event Details

Status: ready-for-dev
Depends on: [Story 9.2: Minimalist Event Cards](https://github.com/HemantKumar822/UniFeed/issues/121)

## Story

As a student,
I want to tap an event card to read full details without losing my place in the feed,
so that my browsing experience is frictionless and native-feeling.

## Acceptance Criteria

1. **Given** I am viewing the Campus Pulse feed
   **When** I tap an event card's expanded area
   **Then** a slide-up bottom sheet appears containing the full event description and poster
   **And** I can dismiss the sheet via swiping or closing it to return exactly where I was in the feed.

## Tasks / Subtasks

- [ ] Integrate Bottom Sheet UI component (shadcn Drawer/Sheet)
  - [ ] Configure to slide up without route change
- [ ] Render full event details
  - [ ] Pass event data to bottom sheet (description, poster)

## Dev Notes

- Relevant architecture patterns and constraints: Bottom-anchored Sheet overlays for event details (UX-DR7). Latency <50ms.
- Source tree components to touch: `src/components/EventSheet.tsx` or similar, `src/components/ui/drawer.tsx`.
- Testing standards summary: Check responsive interaction, closing preserves feed scroll state.

### Project Structure Notes

- Alignment with unified project structure: Zustand/local state for open/close, shadcn primitives.
- Detected conflicts or variances: None.

### References

- Cite all technical details with source paths and sections: [Source: epics.md#Story 9.3]

## Dev Agent Record

### Agent Model Used

Gemini 3.1 Pro

### Debug Log References

### Completion Notes List

### File List
