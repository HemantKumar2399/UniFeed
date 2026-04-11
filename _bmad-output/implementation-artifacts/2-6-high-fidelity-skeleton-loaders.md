# Story: 2-6-high-fidelity-skeleton-loaders

# Story 2.6: High-Fidelity Skeleton Loaders

Status: done

## Story

As a Student on a slow campus mobile network,
I want structural skeletons to hold the screen layout while data fetches,
So that the UI doesn't jarringly pop or shift once data arrives.

## Dependencies
- Story 2.2
- Story 2.4

## Acceptance Criteria

1. **Given** a loading state on `event.getFeed`
   **When** the page builds
   **Then** CSS-animated dark blocks mimic the story bar and 2-3 event cards.
2. **And** these skeleton bounds perfectly match the final initialized DOM geometry (UX-DR-11).

## Tasks / Subtasks

- [x] Task 1: Component Scaffolding (AC: 1)
  - [x] Create `FeedSkeleton.tsx`.
  - [x] Emulate the DOM layout of `<StoryBar />` (a horizontal row of circle `w-16 h-16` elements).
  - [x] Directly beneath, emulate the DOM layout of 3 stacked Event Cards (using the precise height classes or aspect ratios).
- [x] Task 2: Visual Styling & Integration (AC: 1, 2)
  - [x] Utilize the Tailwind `animate-pulse` and `bg-neutral-800` to style the skeleton placeholders. Note: Ensure it fits the monochrome-base.
  - [x] Hook this skeleton into your `event.getFeed` `isLoading` or `isPending` state so it renders correctly before real data mounts.

## Dev Notes

- **Metrics Validation (CLS):** Do NOT make the skeletons randomly sized. The precise pixel bounds MUST match the final initialized components precisely to score 0 on Cumulative Layout Shift. 
- **Component Standard:** It's acceptable to reuse Tailwind classes or map out 3 explicit repeated blank chunks rather than building overly complex components. 

### References

- [Source: planning-artifacts/ux-design-specification.md#UX-DR-11] -> Skeleton Loaders mimicking DOM sizing perfectly.

## Senior Developer Review (AI)

### Review Findings

- [x] [Review][Patch] CLS Wrapper Mismatch [src/features/feed/components/FeedSkeleton.tsx:3] — The Skeleton uses `mx-auto flex w-full flex-col gap-8 py-6` at the root, then nests `w-full max-w-md` inside for cards. Meanwhile `HomePage` has no outer top-level wrapper beyond `max-w-md` for the entire view. The DOM geometry does not match layout structure and will trigger Cumulative Layout Shift when toggling between Skeleton and Mounted Feed. 

## Dev Agent Record
- Agent: Antigravity
