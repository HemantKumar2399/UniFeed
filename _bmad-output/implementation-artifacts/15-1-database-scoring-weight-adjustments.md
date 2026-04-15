# Story 15.1: Database Scoring Weight Adjustments

Status: ready-for-dev
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

- [ ] Analyze acceptance criteria
- [ ] Implement core functionality
- [ ] Write unit/integration tests
- [ ] Review against Tactile Utility guidelines and existing components
