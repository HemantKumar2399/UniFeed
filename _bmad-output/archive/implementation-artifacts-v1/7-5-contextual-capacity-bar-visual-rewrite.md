# Story 7.5: Contextual Capacity Bar Visual Rewrite

Status: done
Depends on: [Campus Pulse Event Card Design Refactor](https://github.com/HemantKumar822/UniFeed/issues/113)


## Epic 7: MVP UI Migration & Polish
**Epic Goal:** Refactor all Epic 1-5 pages (Home, Dashboard) to match Tactile Utility standards, replacing any legacy feeds with the curated "Campus Pulse".

## Story
As a student,
I want the progress bar on an event to visually communicate urgency using the new Design System color ramps,
So that I can scan availability faster without looking at the exact numerical percentages.

## Acceptance Criteria

**Given** the 3.2 capacity progress bar implementation
**When** the capacity exceeds 75% then 95%
**Then** the UI gracefully animates between Neutral to Orange (Warning) to Pink/Red (Critical)
**And** the bar components implement a clean `rounded-full` progress track without excessive gradients.

## Development Context
- **Interactivity:** Utilize Framer Motion or smooth `transition-all duration-300` Tailwind utilities for the progress bar color and width expansion.
- **Architectural Note:** Logic exists but needs visual re-mapping to the new color scale (`bg-neutral-200 -> bg-orange-500 -> bg-red-500`).
- **Dependencies:** React, Tailwind CSS.

## Tasks / Subtasks

- [x] Analyze acceptance criteria
- [x] Implement core functionality
- [x] Write unit/integration tests
- [x] Review against Tactile Utility guidelines and existing components
