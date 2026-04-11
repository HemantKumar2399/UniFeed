# Story: 4-3-the-multi-step-form-state-machine

# Story 4.3: The Multi-Step Form State Machine

Status: backlog

## Story

As an Organizer,
I want a multi-step guided flow to create events,
So that I don't feel overwhelmed by a giant wall of input fields.

## Dependencies
- Story 4.2

## Acceptance Criteria

1. **Given** the "Create Event" page
   **When** interacted with
   **Then** the UI is split logically into 3 steps (Details, Media, Capacity/Review).
2. **And** Next/Back buttons seamlessly transition between steps while preserving state in memory.

## Tasks / Subtasks

- [ ] Task 1: Wizard Component Wrapper (AC: 1, 2)
  - [ ] Implement `CreateEventWizard.tsx` holding a `[currentStep, setCurrentStep]` tracking integer (1-3) localized to state.
- [ ] Task 2: Step Components (AC: 1)
  - [ ] Scaffold empty React functional components for `<StepDetails />`, `<StepMedia />`, and `<StepReview />`.
  - [ ] Connect these components into a switch-case statement swapping precisely depending on the parent integer state perfectly.
- [ ] Task 3: Wizard Control Buttons (AC: 2)
  - [ ] Mount independent `Prev` and `Next` buttons that increment integers.
  - [ ] Ensure they are hidden conditionally (`Prev` hidden on step 1, `Next` turns to `Submit` on step 3).

## Dev Notes

- **Component Sizing Limits:** A giant form rapidly exceeds 200 lines. Breaking this wizard completely down into 3 separate step components is mathematically required to preserve NFR-7.

### References

- [Source: planning-artifacts/epics.md#FR-MO-1] -> Multi-step content creator logic.

## Dev Agent Record
- Agent: Antigravity
