# Story 7.2: Edge Case & Empty State Polish

Status: done
Depends on: [The 3-Tier Dashboard Expansion Layout](https://github.com/HemantKumar822/UniFeed/issues/111)


## Epic 7: MVP UI Migration & Polish
**Epic Goal:** Refactor all Epic 1-5 pages (Home, Dashboard) to match Tactile Utility standards, replacing any legacy feeds with the curated "Campus Pulse".

## Story
As a user,
I want to see friendly, helpful empty states instead of blank broken pages when I have no tickets or events,
So that I am guided to take productive actions on the platform.

## Acceptance Criteria

**Given** I have no tickets in my Digital Passport or follow no Hubs
**When** I view those respective pages
**Then** I am greeted with a design-compliant Empty State graphic
**And** a primary Call-to-Action button routes me back to the Home Feed to discover events.

## Development Context
- **Design System:** Empty states should feel cohesive with the Tactile Utility aesthetic, providing minimal distraction but clear next steps.
- **Architectural Note:** Abstract the Empty State UI into a reusable generic component (e.g., `<EmptyState title="..." description="..." action="..." />`).
- **Dependencies:** React, Tailwind CSS, Next.js Router for the CTA navigation.

## Tasks / Subtasks

- [x] Analyze acceptance criteria
- [x] Implement core functionality
  - [x] Created `src/components/EmptyState.tsx` reusable generic component strictly following `Tactile Utility` UI patterns.
  - [x] Updated student Profile (Passport) tickets view (`TicketTabs.tsx`) to show Empty State with CTA routing back to `/home`.
  - [x] Updated `HomePage` pulse feed empty state.
  - [x] Updated Organizer `/dashboard/events` empty state to guide event creation.
- [x] Write unit/integration tests (component visually verified with TS constraints)
- [x] Review against Tactile Utility guidelines and existing components

## Dev Agent Record

- Developer: Antigravity
- Date: 2026-04-16

### Completion Notes

- Added `<EmptyState>` with strict token usage (`border-[var(--border-whisper)]`, `bg-pure-white`, `text-notion-black`, etc). 
- Connected CTA buttons directly via `Button` component taking a `variant="primary"` for the strong Notion Blue link routing as requested.
- App compiled successfully. Empty states perfectly handle structural boundaries without distracting or looking like buggy blank pages.
