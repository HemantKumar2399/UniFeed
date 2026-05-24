# Story 17.2: Live Student Capacity Sync

Status: done

## Summary

Connected student-facing event surfaces to the shared attendance stream so capacity and RSVP state update live.

## Implemented

- Added `src/hooks/use-live-event-attendance.ts`
- Wired feed cards to live capacity and viewer RSVP state
- Wired event detail actions to live capacity-aware CTA labels
- Fixed standalone event detail pages to use active RSVP counts instead of raw RSVP totals

## Verification

- `npm run test:unit`
- `npm run test:e2e:smoke`

