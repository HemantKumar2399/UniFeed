# Story: 2-2-minimalist-event-cards-static-geometry

# Story 2.2: Minimalist Event Cards (Static Geometry)

Status: done

## Story

As a Student,
I want to see the basic structure of the Event Cards in my feed,
So that I can scan visually heavy imagery rather than text.

## Dependencies
- Story 2.1

## Acceptance Criteria

1. **Given** the array of events from tRPC
   **When** the feed renders
   **Then** image-first cards (`max-w-md`) are painted to the screen.
2. **And** Date/Venue metadata is clearly overlaid with proper gradient contrast for readability (UX-DR-14).

## Tasks / Subtasks

- [x] Task 1: Event Card Component Shell (AC: 1)
  - [x] Create `EventCard.tsx` under `src/features/feed/components/`.
  - [x] Use `next/image` to render high-fidelity cover photos mapping to the full bounded width and maintaining a consistent aspect ratio (e.g., 4:5 or square).
- [x] Task 2: Metadata Overlay & Contrast (AC: 2)
  - [x] Overlay the Event Title, Date, and Venue absolutely positioned at the bottom of the card wrapper.
  - [x] Implement a dark linear gradient (`bg-gradient-to-t from-black/90 to-transparent`) behind the text to ensure ADA accessible 4.5:1 contrast regardless of the background photo.
- [x] Task 3: Feed Integration (AC: 1)
  - [x] Iterate over `event.getFeed.useQuery` in your Home route and render a stack of cards separated by generous margins (e.g. `gap-8`).

## Dev Notes

- **UX Constraint:** Event cards MUST sit perfectly within the `max-w-md` shell width. This creates the "Instagram-like" feed UI.
- **Image Performance:** Ensure you update `next.config.js` or `next.config.ts` to allow images from whatever domain you used in the seed data (e.g., `images.unsplash.com`).

### References

- [Source: planning-artifacts/epics.md#FR-SF-3] -> Minimalist Event Cards.
- [Source: planning-artifacts/ux-design-specification.md] -> Contrast requirements (UX-DR-14).

## Dev Agent Record
- Agent: Antigravity

### Implementation Plan
- Build a reusable feed card component with fixed `max-w-md` geometry and image-first composition.
- Add bottom gradient metadata overlay to preserve readability over high-contrast photos.
- Integrate card list into protected home feed via `event.getFeed.useQuery` with stacked spacing.
- Configure Next.js remote image domain for seeded Unsplash assets.

### Debug Log
- Ran `npm run typecheck` successfully.
- Ran `npm run lint` successfully.
- Ran `npx -y tsx --test src/features/feed/components/event-card.utils.test.ts` successfully (3 passing tests).

### Completion Notes
- Implemented `EventCard` static geometry using `next/image` with `aspect-[4/5]` and `max-w-md` feed width constraints.
- Added metadata overlay (title, date, venue) with `bg-gradient-to-t from-black/90 to-transparent` for contrast.
- Integrated feed rendering in protected home route using `api.event.getFeed.useQuery` and `gap-8` card spacing.
- Updated image configuration in Next.js for `images.unsplash.com` seeded image support.

## File List
- src/features/feed/components/EventCard.tsx
- src/features/feed/components/event-card.utils.ts
- src/app/(protected)/home/page.tsx
- next.config.js
- src/features/feed/components/event-card.utils.test.ts

## Change Log
- 2026-04-09: Implemented story 2.2 event card shell, gradient metadata overlay, feed integration, and validation checks.
