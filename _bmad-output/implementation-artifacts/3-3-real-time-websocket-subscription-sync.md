# Story: 3-3-real-time-websocket-subscription-sync

# Story 3.3: Real-Time WebSocket Subscription Sync

Status: done

## Story

As a Developer,
I want to broadcast capacity changes via WebSockets,
So that all connected clients see live availability updates in under 200ms without polling (NFR-2).

## Dependencies
- Story 3.2

## Acceptance Criteria

1. **Given** the tRPC router
   **When** a successful RSVP mutation occurs
   **Then** an updated capacity payload is emitted via the `rsvp.onCapacityChange` subscription to all clients viewing that event.

## Tasks / Subtasks

- [x] Task 1: Node EventEmitter / Websocket Setup (AC: 1)
  - [x] Install `@trpc/server/adapters/ws` if not present.
  - [x] Mount a minimal Node `EventEmitter` instance locally (or Redis PubSub if scaled later) to handle pub/sub channels.
- [x] Task 2: Subscriptions & Hooks (AC: 1)
  - [x] Expose `rsvp.onCapacityChange` inside the tRPC router wrapping an observable.
  - [x] Modify the `rsvp.register` mutation (Story 3.2) to emit the new total capacity payload matching the `eventId` topic immediately after transaction success.

## Dev Notes

- **Scale Warning:** T3 handles webSockets elegantly via Observables. Ensure your `EventEmitter` instance is globally shared in the Next.js dev environment to prevent hot-reloads from destroying the connections.
- **Protocol:** Avoid continuous long-polling, NFR-2 specifies WS specifically for <200ms broadcast.

### References

- [Source: planning-artifacts/epics.md#NFR-2] -> Real-Time Sync latency requirement.

## Dev Agent Record
- Agent: Antigravity

### File List
- `package.json`
- `src/server/events.ts`
- `src/server/services/rsvp.ts`
- `src/server/api/routers/rsvp.ts`

### Change Log
- Added `ws` and `@types/ws` dependencies.
- Added `src/server/events.ts` emitting singleton Node `EventEmitter`.
- Added subscription router `onCapacityChange` taking `eventId` input and generating a TRPC `observable`.
- Modified `createRsvpPessimistic` to return `remainingCapacity` after incrementing the query `rSVP.count`.
- Hooked `ee.emit("capacityChange", { eventId, newCapacity })` on `rsvp.register`.

### Completion Notes
✅ Node `EventEmitter` instance configured as a global singleton.
✅ Subscription added for `<200ms` WebSockets broadcast updates as requested by NFR-2.
✅ Passed type verification.
