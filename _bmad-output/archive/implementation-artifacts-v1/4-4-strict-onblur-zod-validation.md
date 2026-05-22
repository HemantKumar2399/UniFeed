# Story: 4-4-strict-onblur-zod-validation

# Story 4.4: Strict onBlur Zod Validation

Status: done

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

- [x] Task 1: Core Zod Contracts (AC: 1)
  - [x] Develop `CreateEventSchema` strictly analyzing Title, Description boundaries (e.g. max chars), Date logic, and numeric capacities securely.
- [x] Task 2: React Hook Form Configuration (AC: 1, 2)
  - [x] Implement `react-hook-form` connected tightly with `@hookform/resolvers/zod` utilizing the schema.
  - [x] Explicitly map the setup config to `mode: "onBlur"` skipping standard `onChange` evaluation to prevent typo jitters!
- [x] Task 3: Granular Input Warnings (AC: 2)
  - [x] Add accessible localized error labels painted in our Brand-Rose/Red directly underneath faulted inputs leveraging the exact error texts surfaced natively by Zod.

### Review Findings
- [x] [Review][Patch] Improve empty date schema handling [CreateEventSchema.ts]
- [x] [Review][Defer] Keyboard `Enter` press to advance Wizard steps is not natively hooked [CreateEventWizard.tsx] — deferred, pre-existing

## Dev Notes

- **UX Guardrail:** Forms checking validity mid-typing frustrates users. Strict `onBlur` avoids warning a user their password is too short when they have only typed 1 character. (UX-DR-10).
- Remember to pass the `react-hook-form` context tightly to child steps within the Wizard built in 4.3.

### References

- [Source: planning-artifacts/ux-design-specification.md#UX-DR-10] -> Strict `onBlur` form evaluation specifications.

## Dev Agent Record
- Agent: Antigravity

### Completion Notes
- Integrated `react-hook-form` and `@hookform/resolvers/zod`.
- Developed `CreateEventSchema.ts` mirroring Prisma constraints and mapped validation limits.
- Set form mode explicitly to `onBlur` for typo jitter prevention.
- Added input fields inside `StepDetails`, `StepMedia`, and `StepReview`.
- Displayed localized, granular red/rose error labels seamlessly under inputs.

## File List
- src/features/events/components/CreateEventSchema.ts
- src/features/events/components/CreateEventSchema.test.ts
- src/features/events/components/CreateEventWizard.tsx
- src/features/events/components/StepDetails.tsx
- src/features/events/components/StepMedia.tsx
- src/features/events/components/StepReview.tsx
- package.json

## Change Log
- 2026-04-13: Integrated strict localized onBlur zod validations for CreateEvent form flow.
