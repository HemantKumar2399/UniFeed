# Story 13.1: Club Public Profiles & Follow Mechanism

Status: done
Depends on: [University Domain Authentication](https://github.com/HemantKumar822/UniFeed/issues/118)


## Epic 13: Campus Hubs & Community Pages (Platform Expansion)
Introduce persistent, Notion-style public pages for university clubs and branches to host static resources and events.

## Story
As a student,
I want to view a club's public page and click "Follow",
So that I can stay updated on their specific activities and resources.

## Acceptance Criteria
- **Given** I am browsing the "Hubs" directory
- **When** I click "Follow" on a club's card
- **Then** the UI optimistically updates the follow state with a 200ms haptic feedback
- **And** the database records the relationship, slightly boosting this club's events in my Pulse feed algorithm.

## Implementation Notes
- Use Zustand for optimistic UI updates for the "Follow" state.
- Create a tRPC mutation to record the follow relationship in the database mapping the student's Passport to the Hub.
- Ensure the follow button utilizes the standard 3-tier button system.


## Tasks / Subtasks

- [x] Analyze acceptance criteria
- [x] Implement core functionality
- [x] Write unit/integration tests
- [x] Review against Tactile Utility guidelines and existing components

### Review Findings

- [x] [Review][Patch] Remove duplicate `hubRouter` import and duplicate `hub` key in root router registration [src/server/api/root.ts:2]

## Dev Agent Record

### Agent Model Used

GPT-5.3-Codex

### Debug Log References

- Added `HubFollow` persistence model + migration to map student identity (Passport owner session user) to hub follows.
- Added `hub` tRPC router with protected hub directory query and idempotent follow mutation.
- Implemented feed-ranking helper to apply subtle follow-weighted ordering in `event.getFeed`.
- Added Discover "Hubs Directory" client section with optimistic follow state via Zustand and 200ms haptic feedback animation.

### Completion Notes List

- Students can now browse a Hubs directory in Discover and follow clubs using the existing 3-tier button system.
- Follow action updates UI optimistically, applies 200ms tactile feedback, and persists via `hub.follow` mutation.
- Pulse feed ranking now slightly boosts events from followed hubs without disrupting chronological relevance.
- Hub discovery cards now showcase stronger follow signals (featured hubs, recently updated hubs, and resource counts).
- Seed data now includes realistic follow relationships and RSVP activity to visualize momentum in action.
- Added unit tests for ranking behavior and lint validation for changed files.

### File List

- prisma/schema.prisma
- prisma/migrations/20260417093000_add_hub_follow_model/migration.sql
- src/server/services/feed-ranking.ts
- src/server/services/feed-ranking.test.ts
- src/server/api/routers/hub.ts
- src/server/api/root.ts
- src/server/api/routers/event.ts
- src/features/hubs/state/follow-store.ts
- src/features/hubs/components/HubsDirectorySection.tsx
- src/app/(protected)/discover/page.tsx
- prisma/seed.ts
- package.json
- package-lock.json

## Change Log

- 2026-04-17: Implemented Hub follows with optimistic UI + feed algorithm boost and moved story to review.
- 2026-04-17: Addressed code review patch findings and moved story to done.
- 2026-04-17: Improved hub showcase discoverability and refreshed seeded mock activity for better demo realism.
