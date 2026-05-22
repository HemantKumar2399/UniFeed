# Story: 2-5-story-bar-deep-linking-logic

# Story 2.5: Story Bar Deep-Linking Logic

Status: done

## Story

As a Student,
I want tapping an avatar to show a 15-second teaser and immediately link me to the event,
So that discovery turns instantly into an RSVP opportunity.

## Dependencies
- Story 2.4
- Story 2.2

## Acceptance Criteria

1. **Given** an unwatched story avatar
   **When** tapped
   **Then** a full-screen or modal 15-second timer graphic plays.
2. **And** clicking the "View Event" link deep-links directly down to the associated Event Card in the feed, automatically expanding it.

## Tasks / Subtasks

- [x] Task 1: Teaser Auto-Modal (AC: 1)
  - [x] Mount a full-screen Dialog or Overlay above the layout when an avatar is tapped.
  - [x] Show the associated event's cover photo.
  - [x] Implement a CSS-powered 15-second tracking progress bar at the top edge. Auto-close modal when it depletes.
- [x] Task 2: Anchor Scrolling Logic (AC: 2)
  - [x] Assign unique stable HTML IDs to all compiled Event Cards in the feed (`id={\`event-${event.id}\`}`).
  - [x] Add a "View Event" CTA at the bottom of the teaser modal.
  - [x] On click, fire `document.getElementById('event-X').scrollIntoView({ behavior: 'smooth' })`.
- [x] Task 3: Contextual State Triggering (AC: 2)
  - [x] Because the card must also auto-expand, utilize a lightweight Context, Zustand store, or browser URL Hash listener to programmatically set the targeted card's `isExpanded` boolean to true after scrolling.

## Dev Notes

- **Implementation Trap:** Deep-linking state across siblings (StoryBar -> Feed -> EventCard) requires clean state management. Using the URL hash (`#event-123`) is completely valid and often cleaner than massive Provider wrapping!
- **CSS Tip:** The 15s timer can be fully powered by CSS keyframes without React `useEffect` re-rendering every millisecond.

### References

- [Source: planning-artifacts/epics.md#FR-SF-2] -> Story Bar deep-links requirement.

## Senior Developer Review (AI)

### Review Findings

- [x] [Review][Patch] Native Scroll Race Condition and React Router bypass [src/features/feed/components/StoryTeaserModal.tsx:18] — Combining `element.scrollIntoView()` and `window.location.hash = ...` causes jerky behavior. Should use Next.js/React standard `router.push('/home#event-X')` instead to handle the jump and hash simultaneously.

## Dev Agent Record
- Agent: Antigravity
