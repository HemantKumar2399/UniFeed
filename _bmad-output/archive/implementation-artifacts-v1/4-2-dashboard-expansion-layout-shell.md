# Story: 4-2-dashboard-expansion-layout-shell

# Story 4.2: Dashboard Expansion Layout Shell

Status: done

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

- [x] Task 1: Desktop Route Group Container (AC: 1)
  - [x] Scaffold `app/(dashboard)/layout.tsx`.
  - [x] Omit the hard `max-w-md` class from this layout loop entirely.
  - [x] Provide a `w-full` 3-column responsive flex or grid architecture (e.g. `grid-cols-[250px_1fr_300px]`).
- [x] Task 2: Sidebar Components (AC: 2)
  - [x] Abstract a fixed `Sidebar.tsx` rendering navigational icons to /dashboard, /dashboard/events, and /dashboard/metrics.
  - [x] Persist the exact `bg-black text-white` monochromatic properties as designed in 1.1.

## Dev Notes

- **UX Identity Check:** The transition from the mobile-app feed shell to a completely horizontal administration dashboard marks the "Dashboard Expansion" paradigm. Ensure no layout pollution bleeds over from `(protected)` to `(dashboard)`.

### References

- [Source: planning-artifacts/ux-design-specification.md#UX-DR-4] -> Dashboard Expansion layout approach defined clearly here.

## Dev Agent Record
- Agent: Antigravity

### Implementation Notes
- Created `app/(dashboard)/layout.tsx` applying a `w-full` max width breaking standard flow. Using grid layout (`grid-cols-[250px_1fr_300px]`) via flex container and grid overrides on lg screens. 
- Created `src/components/navigation/Sidebar.tsx` containing links to expected routing paths. Included generic branding text for now.

## File List
- src/app/(dashboard)/layout.tsx
- src/components/navigation/Sidebar.tsx

## Change Log
- **2026-04-11**: Finished scaffolding dashboard layout boundary and implementing Sidebar for organizer views.
