# Story: 5-3-global-search-overlay

# Story 5.3: Global Search Overlay

Status: backlog

## Story

As a Student,
I want the search interface to look premium and readable,
So I can cleanly digest the results.

## Dependencies
- Story 5.1
- Story 5.2

## Acceptance Criteria

1. **Given** the Cmd+K modal is open
   **When** results are fetched
   **Then** they render elegantly within a frosted-glass overlay.
2. **And** clicking a result transports me directly to the Deep-Linked event page or feed location.

## Tasks / Subtasks

- [ ] Task 1: Aesthetic Container Design (AC: 1)
  - [ ] Execute `backdrop-blur-md bg-black/80 border-white/10` wrapping on the Command Dialog component implementing the "Monochrome + Rose" spec strictly.
- [ ] Task 2: Data Piping & Routing (AC: 2)
  - [ ] Inject 5.2 output arrays over `Command.Item` iterating components correctly.
  - [ ] Bind onClick handlers invoking Next `router.push('/feed#event-' + id)` leveraging the bookmark standard developed in 2.5 cleanly!

## Dev Notes

- **Design Polish:** The command dialog dictates the literal "Speed" UX of the application. Animations in and out should be tuned exactly to `150ms ease-out`.

### References

- [Source: planning-artifacts/ux-design-specification.md#Design System] -> Backdrop blur values and monochrome defaults.

## Dev Agent Record
- Agent: Antigravity
