# Story: 5-1-immutable-passport-model

# Story 5.1: Immutable Passport Model

Status: backlog

## Story

As a Developer,
I want to ensure the Student PRN, Branch, and Grad Year fields are strictly write-once upon registration,
So that students cannot spoof or alter their campus identities after creating an account.

## Dependencies
- Story 1.3

## Acceptance Criteria

**Given** an existing student account
**When** a mutation attempts to change the `prn` or `branch` fields
**Then** the Prisma update query throws a validation error and the mutation is rejected.

## Tasks / Subtasks

- [ ] Task 1 (AC: All)
  - [ ] Implement Immutable Passport Model

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
