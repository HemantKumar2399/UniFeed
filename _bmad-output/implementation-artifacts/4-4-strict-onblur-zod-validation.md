# Story: 4-4-strict-onblur-zod-validation

# Story 4.4: Strict onBlur Zod Validation

Status: backlog

## Story

As an Organizer,
I want immediate feedback if I make a typo in my event details, but only after I finish typing,
So that I am not annoyed by premature error messages.

## Dependencies
- Story 4.3

## Acceptance Criteria

1. **Given** any input field in the Event Creator
   **When** the user types, **Then** no validation runs.
2. **And When** the input loses focus (`onBlur`)
   **Then** Zod validation executes and displays localized error text if the input is invalid (UX-DR-10).

## Tasks / Subtasks

- [ ] Task 1: Core Zod Contracts (AC: 1)
  - [ ] Develop `CreateEventSchema` strictly analyzing Title, Description boundaries (e.g. max chars), Date logic, and numeric capacities securely.
- [ ] Task 2: React Hook Form Configuration (AC: 1, 2)
  - [ ] Implement `react-hook-form` connected tightly with `@hookform/resolvers/zod` utilizing the schema.
  - [ ] Explicitly map the setup config to `mode: "onBlur"` skipping standard `onChange` evaluation to prevent typo jitters!
- [ ] Task 3: Granular Input Warnings (AC: 2)
  - [ ] Add accessible localized error labels painted in our Brand-Rose/Red directly underneath faulted inputs leveraging the exact error texts surfaced natively by Zod.

## Dev Notes

- **UX Guardrail:** Forms checking validity mid-typing frustrates users. Strict `onBlur` avoids warning a user their password is too short when they have only typed 1 character. (UX-DR-10).
- Remember to pass the `react-hook-form` context tightly to child steps within the Wizard built in 4.3.

### References

- [Source: planning-artifacts/ux-design-specification.md#UX-DR-10] -> Strict `onBlur` form evaluation specifications.

## Dev Agent Record
- Agent: Antigravity
