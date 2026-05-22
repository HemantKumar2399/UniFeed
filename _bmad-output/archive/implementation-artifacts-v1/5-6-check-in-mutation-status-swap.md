# Story: 5-6-check-in-mutation-status-swap

# Story 5.6: Check-In Mutation & Status Swap

Status: backlog

## Story

As an Organizer,
I want the system to immediately verify a scanned QR code and check the student in,
So that I can keep the entry line moving fast while maintaining an accurate headcount.

## Dependencies
- Story 5.5, Story 3.1

## Acceptance Criteria

**Given** the live video scanner
**When** a valid RSVP QR code is read
**Then** the client fires a `checkIn` tRPC mutation.
**And** the backend swaps the RSVP state from `Reserved` to `Checked-In`, returning a success haptic/audio cue to the Organizer.
**And** an invalid/duplicate QR code immediately triggers an error state on screen.

## Tasks / Subtasks

- [ ] Task 1 (AC: All)
  - [ ] Implement Check-In Mutation & Status Swap

## Dev Notes

- Review PRD and Architecture for exact constraints.
- No single code file exceeding ~200 lines.
- Ensure strict Monochrome+Rose theme for UI.

### Project Structure Notes

- Feature-First Architecture in `src/features/*` applies.

### References

- [Source: _bmad-output/planning-artifacts/epics.md]

## Dev Agent Record

### Agent Model Used

Antigravity

### Debug Log References

### Completion Notes List

### File List
