# Story: 3-5-transient-ui-state-machine-integration

# Story 3.5: Transient UI State Machine Integration

Status: backlog

## Story

As a Student,
I want clear visual feedback during the registration process,
So I know exactly what is happening under the hood.

## Dependencies
- Story 3.2
- Story 3.4

## Acceptance Criteria

1. **Given** the Long-Press button is triggered
   **When** the tRPC mutation is firing
   **Then** the UI overrides to a "Locking Seat..." loading state.
2. **And** immediately transitions to "Secured ✅" on success, or reverts with an error toast on failure (UX-DR-5).

## Tasks / Subtasks

- [ ] Task 1: Local State Management (AC: 1)
  - [ ] Mount a distinct React state or enum (`IDLE`, `LOCKING`, `SECURED`, `ERROR`) inside the EventCard.
- [ ] Task 2: Loading Lockout (AC: 1)
  - [ ] While `LOCKING`, strictly `disabled={true}` the button to block redundant click events.
  - [ ] Replace button text with a lightweight spinner or loading label styled in `bg-neutral-800`.
- [ ] Task 3: Error Feedback Cycle (AC: 2)
  - [ ] Implement `react-hot-toast` or sonner to gracefully catch the TRPC exceptions generated in 3.2 (e.g. `ALREADY_REGISTERED`) without blowing up the layout bounds.

## Dev Notes

- **UX Continuity:** Avoid layout shifting (CLS) when flipping button strings ("Reserve" to "Secured"). Constrain the button's exact pixel width physically prior to the state swap.
- **UX-DR-5 Compliance:** State transitions are the core of a high-fidelity feel. Do not leave the user hanging.

### References

- [Source: planning-artifacts/ux-design-specification.md#UX-DR-5] -> Event card transient states.

## Dev Agent Record
- Agent: Antigravity
