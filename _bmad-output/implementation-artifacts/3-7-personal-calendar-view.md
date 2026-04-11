# Story: 3-7-personal-calendar-view

# Story 3.7: Personal Calendar View

Status: done

## Story

As a Student,
I want a unified view of all my upcoming registered events,
So I can manage my schedule efficiently.

## Dependencies
- Story 3.1
- Story 1.4

## Acceptance Criteria

1. **Given** the Calendar/Profile tab
   **When** navigated to
   **Then** a list of exclusively the user's successfully RSVP'd events is fetched and displayed chronologically.

## Tasks / Subtasks

- [x] Task 1: Calendar Feed API (AC: 1, 2)
  - [x] Add `event.getMyCalendar` to the tRPC router.
  - [x] Query Prisma for `Events` where `RSVP.userId == ctx.session.user.id`.
  - [x] Strictly apply `orderBy: { date: 'asc' }` formatting!
- [x] Task 2: UI Injection (AC: 1)
  - [x] Mount the query results into the `/profile` or `/calendar` protected route established in 1.4.
  - [x] Reuse the exact `EventCard` component mapped out in Epic 2, keeping UI geometry consistent.

## Dev Notes

- **UX Continuity:** Do not build a completely new visual "list" component. The design system specifically calls for reusing the same `EventCard` layouts across the Feed, Search, and Calendar for structural consistency.
- No WS subscriptions are strictly needed here since calendar events are fundamentally static after a user has confirmed attendance, saving socket bandwidth!

### References

- [Source: planning-artifacts/epics.md#FR-RE-3] -> In-App Calendar view requirements.

## Dev Agent Record
- Agent: Antigravity

### Completion Notes
- Implemented `event.getMyCalendar` query in `src/server/api/routers/event.ts`.
- Integrated `getMyCalendar` in `src/app/(protected)/profile/page.tsx` utilizing `EventCard` component to ensure consistency across the application.
- Checked TypeScript errors (0 errors found).

## File List
- `src/server/api/routers/event.ts`
- `src/app/(protected)/profile/page.tsx`

## Change Log
- Refactored `profile/page.tsx` to list user's calendar/events ordered chronologically ascending.
