# Story 14.2: Organizer Thread Resolution & Highlights

Status: ready-for-dev
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

- [ ] Analyze acceptance criteria
- [ ] Implement core functionality
- [ ] Write unit/integration tests
- [ ] Review against Tactile Utility guidelines and existing components
