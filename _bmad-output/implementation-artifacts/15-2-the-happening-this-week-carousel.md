# Story 15.2: The "Happening This Week" Carousel

Status: ready-for-dev
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

- [ ] Analyze acceptance criteria
- [ ] Implement core functionality
- [ ] Write unit/integration tests
- [ ] Review against Tactile Utility guidelines and existing components
