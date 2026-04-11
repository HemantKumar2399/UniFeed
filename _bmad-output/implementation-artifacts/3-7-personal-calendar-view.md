# Story: 3-7-personal-calendar-view

# Story 3.7: Personal Calendar View

Status: backlog

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

- [ ] Task 1: Calendar Feed API (AC: 1, 2)
  - [ ] Add `event.getMyCalendar` to the tRPC router.
  - [ ] Query Prisma for `Events` where `RSVP.userId == ctx.session.user.id`.
  - [ ] Strictly apply `orderBy: { date: 'asc' }` formatting!
- [ ] Task 2: UI Injection (AC: 1)
  - [ ] Mount the query results into the `/profile` or `/calendar` protected route established in 1.4.
  - [ ] Reuse the exact `EventCard` component mapped out in Epic 2, keeping UI geometry consistent.

## Dev Notes

- **UX Continuity:** Do not build a completely new visual "list" component. The design system specifically calls for reusing the same `EventCard` layouts across the Feed, Search, and Calendar for structural consistency.
- No WS subscriptions are strictly needed here since calendar events are fundamentally static after a user has confirmed attendance, saving socket bandwidth!

### References

- [Source: planning-artifacts/epics.md#FR-RE-3] -> In-App Calendar view requirements.

## Dev Agent Record
- Agent: Antigravity
