# Story 10.1: "One-Tap" RSVP with Locking State

Status: ready-for-dev
Depends on: [Story 9.3: Bottom Sheet Event Details](https://github.com/HemantKumar822/UniFeed/issues/122), [Story 8.1: University Domain Authentication](https://github.com/HemantKumar822/UniFeed/issues/118)

## Story

As a student,
I want to RSVP to an event with a single tap,
so that I can secure my spot without filling out confirmation forms.

## Acceptance Criteria

1. **Given** I am viewing an event card with available capacity
   **When** I tap the primary "RSVP" button
   **Then** the button visually transitions to a "Locking..." state immediately
   **And** upon database success, it shifts to a green "✓ Secured" state with a sub-200ms scale-down micro-interaction.

## Tasks / Subtasks

- [ ] Build "One-Tap" RSVP button component
  - [ ] Implement transition states ("RSVP" -> "Locking..." -> "✓ Secured")
  - [ ] Add <200ms scale-down micro-interaction animation
- [ ] Connect RSVP action to tRPC mutation
  - [ ] Update UI optimistically during pending database operation

## Dev Notes

- Relevant architecture patterns and constraints: "One-Tap" RSVP optimistic UI, <200ms haptic-like scale-downs (UX-DR1). NFR-1 Latency rules.
- Source tree components to touch: `src/components/RSVPButton.tsx`, `src/server/api/routers/rsvp.ts`.
- Testing standards summary: Check button states, animation scale constraints, and network simulation.

### Project Structure Notes

- Alignment with unified project structure: Shared components for UI, tRPC mutation layer.
- Detected conflicts or variances: None.

### References

- Cite all technical details with source paths and sections: [Source: epics.md#Story 10.1]

## Dev Agent Record

### Agent Model Used

Gemini 3.1 Pro

### Debug Log References

### Completion Notes List

### File List
