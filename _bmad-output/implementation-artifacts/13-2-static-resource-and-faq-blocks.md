# Story 13.2: Static Resource & FAQ Blocks

Status: ready-for-dev
Depends on: [Club Public Profiles & Follow Mechanism](https://github.com/HemantKumar822/UniFeed/issues/67)


## Epic 13: Campus Hubs & Community Pages (Platform Expansion)
Introduce persistent, Notion-style public pages for university clubs and branches to host static resources and events.

## Story
As a club organizer,
I want to add static resources, links, and FAQs to my Campus Hub,
So that students have a permanent place to find our important materials instead of scrolling old events.

## Acceptance Criteria
- **Given** I am an Organizer editing my Campus Hub
- **When** I add a resource link or text block
- **Then** it is saved to the database and instantly rendered on the public Campus Hub view
- **And** it follows the strict design system "Whisper Borders" and neutral background formatting.

## Implementation Notes
- Re-use the Notion-style distraction-free block editor components for adding content.
- Update the Prisma schema to support Hub resources/blocks.
- Ensure styling adheres to the 1px solid rgba(0,0,0,0.1) 'Whisper Border' and the warm neutral palette.


## Tasks / Subtasks

- [ ] Analyze acceptance criteria
- [ ] Implement core functionality
- [ ] Write unit/integration tests
- [ ] Review against Tactile Utility guidelines and existing components
