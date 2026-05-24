# Story 17.5: Realtime Hardening And Smoke Tests

Status: done

## Summary

Finished Epic 17 with deterministic smoke coverage and deployment notes for the single-instance realtime model.

## Implemented

- Added realtime helper tests for payload building and recent-activity merging
- Extended the smoke bootstrap with a deterministic published realtime event
- Added `tests/e2e/epic17-realtime.spec.ts`
- Updated `test:e2e:smoke` to run Epic 16 and Epic 17 smoke checks together
- Documented the single-instance realtime scope in production readiness notes

## Verification

- `npm run test:unit`
- `npm run test:e2e:smoke`
