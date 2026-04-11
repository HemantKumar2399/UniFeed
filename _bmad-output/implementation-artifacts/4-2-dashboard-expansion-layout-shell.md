# Story: 4-2-dashboard-expansion-layout-shell

# Story 4.2: Dashboard Expansion Layout Shell

Status: backlog

## Story

As an Organizer,
I want a spacious, desktop and mobile-optimized dashboard layout,
So that I can comfortably manage complex administrative data.

## Dependencies
- Story 4.1

## Acceptance Criteria

1. **Given** an Organizer navigating to `/dashboard` on a desktop viewport
   **When** the layout renders
   **Then** it breaks out of the mobile `max-w-md` constraints into a 3-column structural layout (UX-DR-4).
2. **And** it maintains the monochrome/rose theme while providing sidebar navigation.

## Tasks / Subtasks

- [ ] Task 1: Desktop Route Group Container (AC: 1)
  - [ ] Scaffold `app/(dashboard)/layout.tsx`.
  - [ ] Omit the hard `max-w-md` class from this layout loop entirely.
  - [ ] Provide a `w-full` 3-column responsive flex or grid architecture (e.g. `grid-cols-[250px_1fr_300px]`).
- [ ] Task 2: Sidebar Components (AC: 2)
  - [ ] Abstract a fixed `Sidebar.tsx` rendering navigational icons to /dashboard, /dashboard/events, and /dashboard/metrics.
  - [ ] Persist the exact `bg-black text-white` monochromatic properties as designed in 1.1.

## Dev Notes

- **UX Identity Check:** The transition from the mobile-app feed shell to a completely horizontal administration dashboard marks the "Dashboard Expansion" paradigm. Ensure no layout pollution bleeds over from `(protected)` to `(dashboard)`.

### References

- [Source: planning-artifacts/ux-design-specification.md#UX-DR-4] -> Dashboard Expansion layout approach defined clearly here.

## Dev Agent Record
- Agent: Antigravity
