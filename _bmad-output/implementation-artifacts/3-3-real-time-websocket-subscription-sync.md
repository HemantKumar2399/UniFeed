# Story: 3-3-real-time-websocket-subscription-sync

# Story 3.3: Real-Time WebSocket Subscription Sync

Status: backlog

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

- [ ] Task 1: Node EventEmitter / Websocket Setup (AC: 1)
  - [ ] Install `@trpc/server/adapters/ws` if not present.
  - [ ] Mount a minimal Node `EventEmitter` instance locally (or Redis PubSub if scaled later) to handle pub/sub channels.
- [ ] Task 2: Subscriptions & Hooks (AC: 1)
  - [ ] Expose `rsvp.onCapacityChange` inside the tRPC router wrapping an observable.
  - [ ] Modify the `rsvp.register` mutation (Story 3.2) to emit the new total capacity payload matching the `eventId` topic immediately after transaction success.

## Dev Notes

- **Scale Warning:** T3 handles webSockets elegantly via Observables. Ensure your `EventEmitter` instance is globally shared in the Next.js dev environment to prevent hot-reloads from destroying the connections.
- **Protocol:** Avoid continuous long-polling, NFR-2 specifies WS specifically for <200ms broadcast.

### References

- [Source: planning-artifacts/epics.md#NFR-2] -> Real-Time Sync latency requirement.

## Dev Agent Record
- Agent: Antigravity
