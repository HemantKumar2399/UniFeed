# Story 15.1: Database Scoring Weight Adjustments

Status: done
Depends on: [Campus Pulse Mobile Feed](https://github.com/HemantKumar822/UniFeed/issues/120)


## Epic 15: The Intelligent Discovery Algorithm (Platform Expansion)
Implement the personalized event ranking engine based on student course, branch, and follow behavior instead of mindless chronological feeds.

## Story
As the system algorithm,
I want to calculate an event's relevance score against a specific student's profile,
So that the highest priority events are surfaced first.

## Acceptance Criteria
- **Given** a student is viewing the Campus Pulse feed
- **When** the database fetches the active events
- **Then** it applies the scoring weight: High (Course Match), High (Selected Domains), Medium (Followed Club)
- **And** returns a sorted array ordering the most relevant events at the absolute top of the feed grid.

## Implementation Notes
- Construct a customized Prisma/SQL sorting logic that computes relevance based dynamically on the authenticated Passport identity.
- Refactor the Campus Pulse tRPC feed router to accept user preferences or extract from context to resolve ranking.


## Tasks / Subtasks

- [x] Analyze acceptance criteria
- [x] Implement core functionality
- [x] Write unit/integration tests
- [x] Review against Tactile Utility guidelines and existing components

### Review Findings
- [x] [Review][Patch] Use explicit feed preference signals from request context for High (Course Match) instead of email-local-part heuristics [src/server/services/feed-preferences.ts:46]
- [x] [Review][Patch] Use an independent selected-domains signal source (header-driven preferences) instead of deriving it from followed clubs [src/server/services/feed-preferences.ts:47]
- [x] [Review][Patch] Apply relevance ordering before candidate truncation to preserve absolute-top relevance behavior [src/server/api/routers/event.ts:203]
- [x] [Review][Patch] Replace substring-only keyword checks with token or boundary-aware matching to reduce false-positive boosts [src/server/services/feed-ranking.ts:63]
- [x] [Review][Patch] Add integration tests for event.getFeed ordering across more than 30 candidates to validate acceptance behavior [src/server/services/feed-query.integration.test.ts:1]

## Dev Agent Record

### Completion Notes
- Implemented a weighted relevance engine with explicit High/High/Medium scoring buckets for course match, selected domains, and followed clubs.
- Added profile construction helpers and relevance scoring functions in the feed-ranking service, including deterministic tie-breaking.
- Refactored event feed query flow to derive profile signals from authenticated identity and followed clubs, then sort published events by relevance before truncating feed payload.
- Added and passed dedicated ranking tests covering weighted ordering behavior and priority constraints.
- Validation summary: `npm run typecheck` passed; `node --loader ts-node/esm --test src/server/services/feed-ranking.test.ts` passed; repository-wide `node --loader ts-node/esm --test src/**/*.test.ts` has existing loader-resolution failures in unrelated tests.
- Resolved review patch findings by removing pre-ranking candidate truncation, introducing boundary-aware keyword matching, and adding integration coverage for >30 candidate feed ranking.
- Resolved previously deferred profile-source concerns by introducing explicit, independently scoped header-driven preference signals for course and selected-domain ranking inputs.

## File List
- src/server/services/feed-ranking.ts
- src/server/services/feed-ranking.test.ts
- src/server/services/feed-query.ts
- src/server/services/feed-query.integration.test.ts
- src/server/services/feed-preferences.ts
- src/server/services/feed-preferences.test.ts
- src/server/api/routers/event.ts

## Change Log
- 2026-04-17: Implemented weighted personalized feed relevance (course/domain/follow signals) and integrated ranking into event feed retrieval.
- 2026-04-17: Added relevance ranking unit tests and validated type safety for updated feed logic.
- 2026-04-17: Applied code-review fixes for ranking correctness and added integration tests to validate absolute-top relevance behavior.
- 2026-04-17: Replaced heuristic/derived profile signals with explicit independent feed-preference signals and added dedicated tests.
