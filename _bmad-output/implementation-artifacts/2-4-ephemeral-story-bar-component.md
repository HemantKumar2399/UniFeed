# Story: 2-4-ephemeral-story-bar-component

# Story 2.4: Ephemeral Story Bar Component

Status: done

## Story

As a Student,
I want a row of club avatars at the top of the feed to indicate active stories,
So that I can quickly spot trending or newly posted events.

## Dependencies
- Story 2.1

## Acceptance Criteria

1. **Given** the feed layout
   **When** rendered
   **Then** a horizontal, swipeable list of `w-16 h-16` circular avatars sits at the top.
2. **And** visual borders indicate whether a story is "unwatched" or "watched".

## Tasks / Subtasks

- [x] Task 1: Story Bar Layout (AC: 1)
  - [x] Create `StoryBar.tsx` pointing to `src/features/feed/components/`.
  - [x] Map unique active clubs retrieved from the event dataset into a horizontal carousel wrapper containing `flex overflow-x-auto snap-x hide-scrollbar`.
- [x] Task 2: Club Avatar Items (AC: 1, 2)
  - [x] Create an atomic `StoryAvatar` component for each club.
  - [x] Use Next `<Image>` bounded to `w-16 h-16` with strictly applied `rounded-full`.
  - [x] Wrap the avatar in a ring offset (`ring-2 ring-offset-2 ring-offset-black`).
  - [x] Style unwatched stories using the primary accent `ring-rose-600` and watched stories tracking to `ring-neutral-800`.

## Dev Notes

- **UI Implementation Requirements:** Only rely on Tailwind CSS for the scroll snap (`snap-mandatory`, `overflow-x-scroll`). Do not import any heavy carousel slider libraries just to display horizontal avatars.
- **Data Hook:** Map over the relationships (Events -> Clubs) initialized in the PRD, aggregating the distinct Clubs that have active upcoming events. 

### References

- [Source: planning-artifacts/epics.md#FR-SF-2] -> Story Bar ephemerality requirements.

## Senior Developer Review (AI)

### Review Findings

- [x] [Review][Patch] Missing StoryBar integration [src/app/(protected)/home/page.tsx:37] — `StoryBar` must be imported, clubs must be extracted from the `events` payload, and rendered at the top of the feed layout. Currently, it is completely absent.
- [x] [Review][Patch] Invalid a11y trigger element [src/features/feed/components/StoryBar.tsx:16] — The loop maps over avatars with `<div onClick={...}>` instead of an interactive `<button>` element with `type="button"`.

## Dev Agent Record
- Agent: Antigravity
