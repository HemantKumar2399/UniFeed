# Story: 3-4-long-press-gesture-ui-component

# Story 3.4: Long-Press Gesture UI Component

Status: backlog

## Story

As a Student,
I want a tactile, satisfying button that requires a deliberate long-press,
So that I don't accidentally register for events I didn't mean to.

## Dependencies
- Story 2.2

## Acceptance Criteria

1. **Given** the RSVP button on an Event Card
   **When** I press and hold it
   **Then** a progress animation fills up over 1.5 seconds.
2. **And** releasing before 1.5 seconds cancels the action.
3. **And** holding for the full 1.5 seconds triggers the `onRegister` intent cleanly.

## Tasks / Subtasks

- [ ] Task 1: Pointer Hook & Timing Math (AC: 1, 2)
  - [ ] Extract an isolated component `<LongPressButton />`.
  - [ ] Utilize `onPointerDown`/`onPointerUp`/`onPointerLeave` DOM events (native pointer events are vastly superior to onClick for this).
  - [ ] Fire a `setTimeout` for 1500ms; clear it accurately if pointer leaves the radius or is lifted early.
- [ ] Task 2: Haptic Visuality (AC: 1)
  - [ ] Overlay a `<div className="bg-rose-600">` inside the button filling from `width: 0%` to `width: 100%` during the drag.
  - [ ] Tie the CSS transition duration natively to match exactly `1.5s linear` triggered on press.
- [ ] Task 3: Trigger Output (AC: 3)
  - [ ] Execute `props.onComplete()` passing intent up.

## Dev Notes

- **Accessibility Constraint:** Long Press gestures absolutely require a fallback mechanism for motor-impaired users (e.g., standard click with confirmation, or double-click). Use `aria-pressed` states.
- **Mobile First Focus:** iOS Safari aggressively hijacks long-press for text-selection/magnifying default behaviors. Make sure to apply CSS `user-select: none; -webkit-touch-callout: none;` to the button!

### References

- [Source: planning-artifacts/epics.md#FR-RE-1] -> Long-Press interaction specifications.

## Dev Agent Record
- Agent: Antigravity
