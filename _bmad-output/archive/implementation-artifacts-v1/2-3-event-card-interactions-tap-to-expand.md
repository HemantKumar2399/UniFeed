# Story: 2-3-event-card-interactions-tap-to-expand

# Story 2.3: Event Card Interactions (Tap-to-Expand)

Status: done

## Story

As a Student,
I want the event card to responsively expand when I tap it for details,
So that I am not immediately taken away to a new page, preserving my scroll state.

## Dependencies
- Story 2.2

## Acceptance Criteria

1. **Given** a rendered Event Card
   **When** I tap the image
   **Then** motion-safe animations reveal the hidden description text.
2. **And** the UI visually responds to my tap haptics/animation in under 500ms (NFR-1).

## Tasks / Subtasks

- [x] Task 1: Expandable State Logic (AC: 1)
  - [x] Extract an `isExpanded` boolean UI state via `useState` inside `EventCard.tsx`.
  - [x] Wrap the image surface in a clickable element to flip this state. Add `aria-expanded` attributes for accessibility.
- [x] Task 2: Animation Implementation (AC: 1, 2)
  - [x] Configure CSS grid transition (`grid-template-rows: 0fr` to `1fr`) OR use Framer Motion layout animations to reveal the `<p>` description text smoothly.
  - [x] Explicitly respect the OS preference using the `motion-safe:` utility class to skip animations for users with reduced motion preferences (UX-DR-15).

## Dev Notes

- **Performance Validation:** Tap expansion happens completely in the client edge DOM. It should not cause the entire feed list to re-render. Make sure state is localized to the specific card. 
- **UX Guardrail:** Keep it feeling snappy! CSS transitions on `max-height` or generic libraries can get laggy. Framer motion is highly recommended if available in repo.

### References

- [Source: planning-artifacts/ux-design-specification.md#Interaction] -> NFR-1 latency, `<500ms` timing logic constraint.

## Dev Agent Record
- Agent: Antigravity

### Implementation Plan
- Keep expansion state local per card with `useState` to avoid feed-wide re-renders.
- Toggle state via a clickable image surface and expose accessibility state via `aria-expanded` and `aria-controls`.
- Use CSS grid row transition (`0fr`/`1fr`) plus `motion-safe:` transition utilities and sub-500ms duration.
- Add utility-level tests for timing threshold and reveal class behavior.

### Debug Log
- Ran `npm run typecheck` successfully.
- Ran `npm run lint` successfully.
- Ran `npx -y tsx --test src/features/feed/components/event-card.utils.test.ts` successfully (3 passing tests).

### Completion Notes
- Added localized `isExpanded` state inside `EventCard.tsx` and tap-to-expand interaction on image surface.
- Added `aria-expanded` and `aria-controls` for accessibility semantics.
- Implemented description reveal using `grid-template-rows` transition pattern with `motion-safe:` utilities.
- Enforced animation budget with utility constant set to `300ms` (< 500ms target).

## File List
- src/features/feed/components/EventCard.tsx
- src/features/feed/components/event-card.utils.ts
- src/features/feed/components/event-card.utils.test.ts

## Change Log
- 2026-04-09: Implemented tap-to-expand card behavior with motion-safe animation and utility-level validation.
