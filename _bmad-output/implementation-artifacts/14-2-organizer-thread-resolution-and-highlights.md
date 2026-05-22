# Story 14.2: Organizer Thread Resolution & Highlights

Status: done
Depends on: [Event Q&A Board Implementation](https://github.com/HemantKumar822/UniFeed/issues/69)


## Epic 14: Structured Threaded Discussions (Platform Expansion)
Replace noisy comment sections with focused, professional Q&A boards attached to specific events.

## Story
As an event organizer,
I want to answer questions and pin/highlight the most important clarifications,
So that I can effectively manage attendees' expectations without repeating myself.

## Acceptance Criteria
- **Given** I am an Organizer managing my event
- **When** I reply to a student's thread
- **Then** my reply gets an "Organizer" badge for strict authority validation
- **And** I can toggle a "Pinned" state to bump the Q&A block securely to the top of the board.

## Implementation Notes
- Use the status badge styling (tinted blue background) for the Organizer label.
- Add pinned boolean flag for discussion records in schema to support ordering.
- Create an Organizer-only UI toggle (optimistic update via tRPC) for Pin action.


## Tasks / Subtasks

- [x] Analyze acceptance criteria
- [x] Implement core functionality
- [x] Write unit/integration tests
- [x] Review against Tactile Utility guidelines and existing components

## Dev Agent Record

### Completion Notes
- Added organizer-only thread reply mutation with strict ownership enforcement against event author identity.
- Implemented organizer authority labeling in discussion replies and organizer badge rendering in the UI.
- Added pinned thread persistence in the schema and organizer-only pin/unpin mutation in the event router.
- Implemented optimistic pin toggling in the Discussions tab using tRPC cache updates and rollback on failure.

## File List
- prisma/schema.prisma
- prisma/migrations/20260417160000_add_event_discussion_models/migration.sql
- src/server/api/routers/event.ts
- src/features/feed/components/EventCard.tsx
- src/features/feed/components/discussion-board.utils.ts
- src/components/ui/textarea.tsx
- src/lib/discussion.ts
- src/lib/discussion.test.ts
- src/features/feed/components/discussion-board.utils.test.ts

## Change Log
- 2026-04-17: Implemented organizer replies with authority badge and secure pin/highlight toggles with optimistic UI behavior.
- 2026-04-17: Added shared discussion permission/display helpers, safer thread sorting for malformed timestamps, and stronger client-side guardrails.
