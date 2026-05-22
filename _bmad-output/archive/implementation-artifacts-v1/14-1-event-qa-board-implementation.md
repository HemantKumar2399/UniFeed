# Story 14.1: Event Q&A Board Implementation

Status: done
Depends on: [Bottom-Sheet Event Details](https://github.com/HemantKumar822/UniFeed/issues/122), [University Domain Authentication](https://github.com/HemantKumar822/UniFeed/issues/118)


## Epic 14: Structured Threaded Discussions (Platform Expansion)
Replace noisy comment sections with focused, professional Q&A boards attached to specific events.

## Story
As an attendee,
I want to ask structured questions directly on an event's page,
So that my questions (and the organizer's answers) are visible and permanently helpful to others.

## Acceptance Criteria
- **Given** I am viewing the Event Details bottom-sheet
- **When** I submit a question in the "Discussions" tab
- **Then** it appears as a distinct Thread block in the UI
- **And** other students can read it without it getting lost in an infinite "chat" stream.

## Implementation Notes
- Add the Discussions tab to the bottom-anchored Event Details sheet.
- Store forum-style nested questions mapped to the event.
- Use shadcn/ui components (e.g. Card, Textarea) avoiding heavy shadow UI.


## Tasks / Subtasks

- [x] Analyze acceptance criteria
- [x] Implement core functionality
- [x] Write unit/integration tests
- [x] Review against Tactile Utility guidelines and existing components

## Dev Agent Record

### Completion Notes
- Implemented a bottom-anchored Event Details drawer flow in `EventCard` with an explicit `Discussions` tab.
- Added attendee question submission with server persistence tied to `eventId` and on-screen thread rendering.
- Ensured discussions render as distinct thread blocks with clear author context and stable ordering.
- Added targeted utility tests for discussion ordering and display-name fallbacks; validated related event-card utility tests.

## File List
- prisma/schema.prisma
- prisma/migrations/20260417160000_add_event_discussion_models/migration.sql
- src/server/api/routers/event.ts
- src/features/feed/components/EventCard.tsx
- src/components/ui/textarea.tsx
- src/features/feed/components/discussion-board.utils.ts
- src/features/feed/components/discussion-board.utils.test.ts
- src/features/feed/components/event-card.utils.test.ts
- src/lib/discussion.ts
- src/lib/discussion.test.ts

## Change Log
- 2026-04-17: Implemented Event Q&A board foundation in event details drawer with persisted thread creation and validated utility tests.
- 2026-04-17: Hardened discussions UX with explicit query-error state, retry action, bounded inputs, and hash cleanup on drawer close.
