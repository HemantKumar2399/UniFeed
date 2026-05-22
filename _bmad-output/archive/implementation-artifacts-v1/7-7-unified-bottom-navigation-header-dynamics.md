# Story 7.7: Unified Bottom Navigation & Header Dynamics

Status: done
Depends on: [Cards, Containers, & Semantic Shadows](https://github.com/HemantKumar822/UniFeed/issues/110)


## Epic 7: MVP UI Migration & Polish
**Epic Goal:** Refactor all Epic 1-5 pages (Home, Dashboard) to match Tactile Utility standards, replacing any legacy feeds with the curated "Campus Pulse".

## Story
As a mobile user,
I want a perfectly smooth tab-bar navigation experiencing zero layout shifts,
So that the web app functions indistinguishably from an iOS/Android native app.

## Acceptance Criteria

**Given** a mobile viewport viewport (<768px)
**When** navigating between Pulse, Hubs, Passport, and Profile
**Then** the persistent bottom tab bar routes instantaneously using Next.js layout retention
**And** the top header seamlessly updates its title without jarring page flashes.

## Development Context
- **Routing:** Ensure the Tab Bar and Header are mounted in a top-level `layout.tsx` (Next.js App Router). This ensures they are not re-rendered on page transitions.
- **Interactivity:** Utilize Next.js `usePathname` hook to update the active tab state and top header title dynamically without mounting/unmounting.
- **Dependencies:** `next/navigation`, `lucide-react` for tab icons, Tailwind CSS for fixed positioning (`fixed bottom-0 w-full`).

## Tasks / Subtasks

- [x] Analyze acceptance criteria
- [x] Implement core functionality
- [x] Write unit/integration tests
- [x] Review against Tactile Utility guidelines and existing components
