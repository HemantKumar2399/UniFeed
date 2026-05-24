# Story 17.4: Live Organizer Dashboard Sync

Status: done

## Summary

Moved organizer attendance widgets onto a live dashboard stream while keeping lifecycle lanes snapshot-based.

## Implemented

- Added `OrganizerLiveAttendanceContent`
- Live-updated `Total RSVPs`
- Live-updated RSVP state totals
- Live-updated recent attendee activity using emitted attendance activity ordering
- Kept event status lanes and non-attendance cards server-rendered

## Verification

- `npm run test:unit`

