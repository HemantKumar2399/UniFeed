# Story 7.6: The "Digital Certificate & Skills Builder" Redesign

Status: done
Depends on: [Contextual Capacity Bar Visual Rewrite](https://github.com/HemantKumar822/UniFeed/issues/115)


## Epic 7: MVP UI Migration & Polish
**Epic Goal:** Refactor all Epic 1-5 pages (Home, Dashboard) to match Tactile Utility standards, replacing any legacy feeds with the curated "Campus Pulse".

## Story
As a student,
I want my profile to act as a verified portfolio of attended events instead of just a ticket history,
So that I can use it as a credible credential for my active engagement in university life.

## Acceptance Criteria

**Given** the student Profile/Passport view
**When** a ticket is marked as "Attended" via QR Check-in
**Then** the ticket visually transforms into a permanent "Digital Certificate" card
**And** the UI aggregates these certificates visually, allowing me to share public proof of my skills/engagement.

## Development Context
- **Features:** Render QR tickets differently based on their `status` property ("Attended" vs "Secured").
- **Dependencies:** Data layer likely fetching `Ticket` or `RSVP` with `.status`. Visually represent the card differently with potentially golden or verified badges (`Badge` from the Design System).

## Tasks / Subtasks

- [x] Analyze acceptance criteria
- [x] Implement core functionality
- [x] Write unit/integration tests
- [x] Review against Tactile Utility guidelines and existing components
