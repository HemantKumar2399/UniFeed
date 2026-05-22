# Story 15.2: The "Happening This Week" Carousel

Status: done
Depends on: [Database Scoring Weight Adjustments](https://github.com/HemantKumar822/UniFeed/issues/71), [Static Resource & FAQ Blocks](https://github.com/HemantKumar822/UniFeed/issues/68)


## Epic 15: The Intelligent Discovery Algorithm (Platform Expansion)
Implement the personalized event ranking engine based on student course, branch, and follow behavior instead of mindless chronological feeds.

## Story
As a student,
I want highly urgent events to be visually separated from general browsing cards,
So that I don't accidentally miss a hackathon deadline.

## Acceptance Criteria
- **Given** there are events occurring within the next 7 days
- **When** I load the Campus Pulse
- **Then** a dedicated horizontal-scrolling section ("Happening This Week") appears at the very top
- **And** these urgent cards prioritize Date/Time visibility above all other metadata.

## Implementation Notes
- Add a new horizontal slider (e.g. `overflow-x-auto` container with snap-x scrolling) component to the Campus Pulse layout.
- Limit this feed chunk strictly strictly by a `< 7 Days` range filter in the tRPC router.
- Use Tactile Utility styling emphasizing the Typography Date styling for the "urgent cards".


## Tasks / Subtasks

- [x] Analyze acceptance criteria
- [x] Implement core functionality
- [x] Write unit/integration tests
- [x] Review against Tactile Utility guidelines and existing components

### Review Findings
- [x] [Review][Patch] Add integration tests for strict less-than-7-days filtering in event.getHappeningThisWeek [src/server/services/happening-this-week-query.integration.test.ts:1]
- [x] [Review][Patch] Add a UI-level test proving Happening This Week renders above the main feed header when weekly events exist [src/app/(protected)/home/page.layout.test.ts:1]

## Dev Agent Record

### Completion Notes
- Added a dedicated `event.getHappeningThisWeek` tRPC query with strict server-side `< 7 days` window filtering and ascending urgency ordering.
- Created a reusable time-window service for consistent strict-boundary calculations.
- Implemented a new top-of-home horizontal "Happening This Week" carousel with date/time-first visual hierarchy and snap scrolling.
- Added utility helpers and tests for urgent date/time formatting, plus boundary tests for the strict weekly window logic.
- Validation summary: `node --loader ts-node/esm --test src/server/services/feed-ranking.test.ts src/server/services/happening-this-week.test.ts src/features/feed/components/happening-this-week.utils.test.ts` passed; `npm run typecheck` passed; `npm run lint` is currently misconfigured in this repo (`next lint` argument parsing issue).
- Resolved review patch findings by extracting strict weekly-query helpers, adding integration tests for less-than-7-days filtering, and adding a UI-level placement test for top-of-feed carousel rendering.

## File List
- src/server/api/routers/event.ts
- src/server/services/happening-this-week.ts
- src/server/services/happening-this-week.test.ts
- src/server/services/happening-this-week-query.ts
- src/server/services/happening-this-week-query.integration.test.ts
- src/features/feed/components/HappeningThisWeekCarousel.tsx
- src/features/feed/components/happening-this-week.utils.ts
- src/features/feed/components/happening-this-week.utils.test.ts
- src/app/(protected)/home/page.tsx
- src/app/(protected)/home/page.layout.test.ts

## Change Log
- 2026-04-17: Added strict server-side "Happening This Week" query and reusable 7-day window utility.
- 2026-04-17: Implemented top-level home carousel for urgent events with date/time-prioritized card treatment and supporting tests.
- 2026-04-17: Applied code-review fixes with integration/UI-level verification for strict weekly filtering and top placement behavior.
