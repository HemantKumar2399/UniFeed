# Story 14.1: Event Q&A Board Implementation

Status: ready-for-dev
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

- [ ] Analyze acceptance criteria
- [ ] Implement core functionality
- [ ] Write unit/integration tests
- [ ] Review against Tactile Utility guidelines and existing components
