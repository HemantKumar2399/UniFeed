# Story: 3-6-live-capacity-progress-bar

# Story 3.6: Live Capacity Progress Bar

Status: backlog

## Story

As a Student,
I want a visual indicator of how full an event is,
So I feel the urgency to register before spots run out.

## Dependencies
- Story 3.3
- Story 2.2

## Acceptance Criteria

1. **Given** the Event Card
   **When** a WebSocket capacity update is received
   **Then** an accent-colored progress bar animates to the new fill percentage.
2. **And** changes color at the 75% (Warning) and 95% (Critical) thresholds (UX-DR-8).

## Tasks / Subtasks

- [ ] Task 1: Live Hook Binding (AC: 1)
  - [ ] Inject `trpc.rsvp.onCapacityChange.useSubscription` into the EventCard.
  - [ ] Update card's local capacity state reacting directly to the WS payload.
- [ ] Task 2: Math and UI Bar (AC: 1)
  - [ ] Calculate `(rsvpCount / totalCapacity) * 100`.
  - [ ] Render a `<div style={{width: \`\${percent}%\`}}>` progress bar. 
- [ ] Task 3: Color Breakpoint Thresholds (AC: 2)
  - [ ] If < 75%: Neutral (`bg-zinc-300`).
  - [ ] If >= 75% & < 95%: Warning Theme (e.g. `bg-amber-500`).
  - [ ] If >= 95%: Critical Theme (`bg-rose-600` or deep red).

## Dev Notes

- **Performance Tip:** TRPC Subscriptions can trigger massive re-renders if placed too high in the tree. Put the Subscription hook directly in a micro-component called `<CapacityBar />` isolated from the heavy image wrapper.
- Ensure the color transitions use standard `transition-colors duration-300` smoothly.

### References

- [Source: planning-artifacts/ux-design-specification.md#UX-DR-8] -> 75/95 contextual progress thresholds.

## Dev Agent Record
- Agent: Antigravity
