# Story 13.1: Club Public Profiles & Follow Mechanism

Status: ready-for-dev
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

- [ ] Analyze acceptance criteria
- [ ] Implement core functionality
- [ ] Write unit/integration tests
- [ ] Review against Tactile Utility guidelines and existing components
