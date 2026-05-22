# Story 7.1: The 3-Tier Dashboard Expansion Layout

Status: done
Depends on: [Cards, Containers, & Semantic Shadows](https://github.com/HemantKumar822/UniFeed/issues/110)


## Epic 7: MVP UI Migration & Polish
**Epic Goal:** Refactor all Epic 1-5 pages (Home, Dashboard) to match Tactile Utility standards, replacing any legacy feeds with the curated "Campus Pulse".

## Story
As a student or organizer on a desktop browser,
I want the mobile-first UI to intuitively expand into a comprehensive dashboard view,
So that no screen space is wasted when I use a larger device.

## Acceptance Criteria

**Given** the application is viewed on a device > 1024px width
**When** navigating the core feeds
**Then** the UI splits into a 3-column layout (Sidebar Nav, Central Feed locked to `max-w-lg`, Right Contextual/Analytics Panel)
**And** it seamlessly collapses back to a single column with a bottom-tab bar cleanly on mobile viewports.

## Development Context
- **Design System:** Use the Tactile Utility design components.
- **Architectural Note:** Utilize CSS Grid and Flexbox for the layout adaptation, keeping mobile-first responsive design best practices (e.g., Tailwind classes `lg:grid-cols-3`).
- **Dependencies:** Tailwind CSS.


## Tasks / Subtasks

- [x] Analyze acceptance criteria
- [x] Implement core functionality
  - [x] Swapped `lg` rules in `(protected)/layout.tsx` to handle true 1024px break. Extracted old Dark Mode/Geist tags mapping them to the new Tactile Utility semantic variables (`bg-warm-white`, `text-notion-black`).
  - [x] Central feed mapped to `max-w-lg` constraint at desktop (vs `md`).
  - [x] Converted `src/app/dashboard/layout.tsx` and `(protected)/layout.tsx` layouts into 3-tier configurations.
  - [x] Refactored `BottomNav.tsx` and `SidebarNav.tsx` to drop zinc/rose palettes and adopt "Campus Platform" naming, tactile colors (`notion-blue`, `pure-white`), and `active:scale-95` tap behaviors.
- [x] Review against Tactile Utility guidelines and existing components

## Dev Agent Record

- Developer: Antigravity
- Date: 2026-04-16

### Completion Notes

- Refactored `src/app/(protected)/layout.tsx` to utilize `bg-warm-white` and `text-notion-black`.
- Implemented the strict 3-tier Dashboard expansion triggering natively at `>=lg` (1024px) utilizing Flex/Grid column structures in `dashboard/` and `protected/` roots.
- Overhauled `BottomNav.tsx` styling and `Sidebar.tsx` to match the exact Tactile Utility ruleset (omitting old `#09090b` heavy borders and embracing 1px whisper borders for all dividers).
