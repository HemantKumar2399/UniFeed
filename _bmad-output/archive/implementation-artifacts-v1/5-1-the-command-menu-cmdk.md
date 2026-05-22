# Story: 5-1-the-command-menu-cmdk

# Story 5.1: The Command Menu (Cmd+K)

Status: backlog

## Story

As a Power User,
I want a globally accessible command menu,
So I can instantly search for events or navigate the app without taking my hands off the keyboard.

## Dependencies
- Story 1.4

## Acceptance Criteria

1. **Given** any protected route in the app
   **When** I press Cmd+K (Mac) or Ctrl+K (Windows)
   **Then** a global search overlay instantly appears.
2. **And** pressing Escape closes it smoothly.

## Tasks / Subtasks

- [x] Task 1: Component Shell (AC: 1)
  - [x] Initialize `cmdk` (or equivalent accessible modal primitive).
  - [x] Mount `<CommandMenu>` globally within the `app/(protected)/layout.tsx` so it persists securely across feed/profile bounds.
- [x] Task 2: Event Listener Hook (AC: 2)
  - [x] Attach `useEffect` mapping the keypress combination to a `[isOpen, setIsOpen]` boolean toggle natively bounding to standard browser standards perfectly.

### Review Findings
- [x] [Review][Patch] Use `<Command.Dialog>` instead of a manual div for better accessibility and focus trapping as per cmdk documentation. [src/components/CommandMenu.tsx:32]

## File List
- src/components/CommandMenu.tsx
- src/app/(protected)/layout.tsx

## Change Log
- Initialized cmdk and lucide-react dependencies
- Added CommandMenu interactive client component in src/components/CommandMenu.tsx
- Injected CommandMenu globally in src/app/(protected)/layout.tsx using the Command modal design
- Attached standard useEffect hook for toggling `[open, setOpen]` on metaKey+K combination.

## Status
done


## Dev Notes

- **UX Identity Check:** The App shell logic is globally wrapped. Verify Z-index scaling is correctly managed (e.g. `z-50`) so it correctly mounts *above* any static event card media components (UX-DR-9).

### References

- [Source: planning-artifacts/ux-design-specification.md#UX-DR-9] -> Global modal specifications.

## Dev Agent Record
- Agent: Antigravity
