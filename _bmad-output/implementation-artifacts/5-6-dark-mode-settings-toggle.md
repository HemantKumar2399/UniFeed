# Story: 5-6-dark-mode-settings-toggle

# Story 5.6: Dark Mode Settings Toggle

Status: backlog

## Story

As a User,
I want the ability to toggle or enforce Dark Mode globally,
So that I can customize my aesthetic.

## Dependencies
- Story 5.4

## Acceptance Criteria

1. **Given** the Profile view
   **When** I tap the Settings tab
   **Then** a "Theme Toggle" cleanly executes modifying the Root HTML layout attributes correctly.

## Tasks / Subtasks

- [ ] Task 1: Global Theme Provider (AC: 1)
  - [ ] Implement `next-themes` `<ThemeProvider>` globally in the root layout wrapping session context cleanly.
  - [ ] Enforce `defaultTheme="dark"` securely overriding browser system-flags on init!
- [ ] Task 2: Hardware Control (AC: 1)
  - [ ] Scaffold standard `<Switch />` UI component in `/profile` modifying `useTheme().setTheme()` bounds universally!

## Dev Notes

- **FOUC Prevention:** Utilizing `next-themes` natively prevents the dreaded "Flash of Unstyled Content" by securely injecting the class payload prior to React Hydration. Never build a custom solution for this in Next v14.

### References

- [Source: planning-artifacts/architecture.md#Design System] -> Mandatory Dark-Mode defaulting constraints.

## Dev Agent Record
- Agent: Antigravity
