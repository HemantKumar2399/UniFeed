# Story 7.3: Campus Pulse & Event Card Design Refactor

Status: done
Depends on: [Cards, Containers, & Semantic Shadows](https://github.com/HemantKumar822/UniFeed/issues/110)


## Epic 7: MVP UI Migration & Polish
**Epic Goal:** Refactor all Epic 1-5 pages (Home, Dashboard) to match Tactile Utility standards, replacing any legacy feeds with the curated "Campus Pulse".

## Story
As a visually-aware user,
I want the Campus Pulse layout and its event cards fully updated the "Tactile Utility" design system,
So that the aesthetic is cohesive, clean, and avoids generic "Instagram clone" UI.

## Acceptance Criteria

**Given** the current event feed view
**When** scrolling through the Campus Pulse
**Then** image cards have 12px top radii, and the containers use whisper borders
**And** typography (Times, Locations, Titles) aligns entirely with the NotionInter specifications.

## Development Context
- **Design System:** `border`, `rounded-t-[12px]`, `1px solid rgba(0,0,0,0.1)`. Typography scale mapped to `NotionInter`.
- **Architectural Note:** Refactor existing `<EventCard />` component used in the Pulse Feed without breaking existing data-binding behavior.
- **Dependencies:** Tailwind `border-opacity`, mapping the new font rules setup in Epic 6.

## Tasks / Subtasks

- [x] Analyze acceptance criteria
- [x] Implement core functionality
- [x] Write unit/integration tests
- [x] Review against Tactile Utility guidelines and existing components
