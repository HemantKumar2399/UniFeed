# Story 17.1: Realtime Attendance Foundation

Status: done

## Summary

Established the shared realtime attendance model for Epic 17 using the existing tRPC subscription path and the in-process event emitter.

## Implemented

- Added canonical attendance payload types and pure helpers in `src/features/attendance/realtime-attendance.ts`
- Added server-side attendance snapshot and emit helpers in `src/server/services/attendance-realtime.ts`
- Added `event.onAttendanceChange({ eventId })`
- Added `dashboard.getOrganizerLiveMetrics()` and `dashboard.onOrganizerAttendanceChange()`
- Kept the deployment model single-instance and preserved the legacy capacity subscription fan-out

## Verification

- `npm run test:unit`

