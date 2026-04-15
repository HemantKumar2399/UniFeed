# Story 10.2: Live Capacity Momentum Progress Bar

Status: ready-for-dev
Depends on: [Story 10.1: "One-Tap" RSVP with Locking State](https://github.com/HemantKumar822/UniFeed/issues/58)

## Story

As a student,
I want to see a live visual indicator of how full an event is,
so that I feel urgency and trust that the capacity metric is accurate.

## Acceptance Criteria

1. **Given** I am viewing an event card
   **When** the event capacity changes (due to RSVPs hitting the database)
   **Then** a horizontal progress bar updates smoothly via WebSockets
   **And** the color shifts from Neutral to Warning at 75% full, and Critical (Red) at 95% full.

## Tasks / Subtasks

- [ ] Create horizontal Progress Bar component
  - [ ] Shift color ranges: Neutral (0-74%), Warning (75-94%), Critical/Red (95%+)
- [ ] Implement real-time sync with WebSockets
  - [ ] Connect via tRPC WebSocket subscriptions to receive capacity updates

## Dev Notes

- Relevant architecture patterns and constraints: Live Capacity Momentum mapped to real-time WebSocket data (UX-DR2). Contextual Capacity Bar color logic (UX-DR6).
- Source tree components to touch: `src/components/CapacityBar.tsx`, tRPC router subscription layer `src/server/api/routers/event.ts`.
- Testing standards summary: Subscribe to WebSocket event, verify bar width and color transition logic.

### Project Structure Notes

- Alignment with unified project structure: tRPC subscriptions enablement.
- Detected conflicts or variances: None.

### References

- Cite all technical details with source paths and sections: [Source: epics.md#Story 10.2]

## Dev Agent Record

### Agent Model Used

Gemini 3.1 Pro

### Debug Log References

### Completion Notes List

### File List
