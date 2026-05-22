# Story 2.1: Feed Database Seeding & Mock API

Status: done

## Story

As a Developer,
I want Prisma models mapped for Events and Clubs and a robust seed script,
So that the frontend API has reliable, dummy data (no empty states) to build components against.

## Dependencies
- Story 1.1

## Acceptance Criteria

1. **Given** an empty database
   **When** `npm run db:seed` is executed
   **Then** 10 realistic JECRC events and some corresponding clubs are populated.
2. **And** an exposed tRPC endpoint `event.getFeed` successfully returns this list to the client.

## Tasks / Subtasks

- [x] Task 1: Prisma Schema Design (AC: 1)
  - [x] Design Prisma `Event` model (title, description, date, capacity, location, imageUrl).
  - [x] Design Prisma `Club` model (name, logoUrl).
  - [x] Map 1-to-Many relational linking. Run `npx prisma db push`.
- [x] Task 2: Seeding Script (AC: 1)
  - [x] Create `prisma/seed.ts`. Use faker or hardcoded local JECRC data.
  - [x] Tie `ts-node prisma/seed.ts` to `package.json` seed command.
- [x] Task 3: Feed API Query (AC: 2)
  - [x] Define `event.getFeed` inside `server/api/routers/event.ts`.
  - [x] Retrieve events ordered by `date` ascending, including the relational `club` data for the avatar UI.

### Review Findings

- [x] [Review][Decision] Seed script destructive reset is now guarded to local/non-production databases only.
- [x] [Review][Patch] Added Prisma migration for Event/Club schema for deploy-based environments [prisma/migrations/20260409163000_add_event_club_models/migration.sql:1]
- [x] [Review][Patch] Wrapped delete-and-reseed flow in a single transaction to avoid partial state on failure [prisma/seed.ts:146]
- [x] [Review][Patch] Restricted feed query projection for `club` fields (id, name, logoUrl) [src/server/api/routers/event.ts:8]

## Dev Notes

- **Architecture:** Keep your tRPC queries lean. Do not query 500 rows if we only need 10 to seed.
- **Mock Data Standard:** Ensure `imageUrl` links to valid unsplash placeholders or static assets so the frontend isn't dealing with broken image icons!

### References

- [Source: planning-artifacts/architecture.md#Database] -> Schema considerations.

## Dev Agent Record
- Agent: Antigravity
- Debug Log:
  - Created story artifact from provided GitHub issue details.
  - Implemented Prisma `Club` and `Event` models with one-to-many relation.
  - Added seed script with 5 clubs and 10 JECRC-focused events using valid Unsplash image URLs.
  - Added `event.getFeed` tRPC endpoint and registered `event` router in app router.
  - Installed `ts-node` and wired `npm run db:seed`.
  - Validation blocker resolved after PostgreSQL was restarted locally.
  - `npm run db:push` succeeded and synced schema.
  - `npm run db:seed` succeeded with output: "Seed completed: 10 events across 5 clubs".
  - Validated seeded data shape and relation via Prisma query (`eventCount: 10`, first event has club relation).
  - Validated AC2 over HTTP by querying `/api/trpc/event.getFeed`, receiving the seeded event list including nested `club` data.
- Completion Notes:
  - Typecheck and lint pass.
  - AC1 complete and verified against running local Postgres.
  - AC2 complete and verified through tRPC API response.

## File List
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `src/server/api/routers/event.ts`
- `src/server/api/root.ts`
- `package.json`
- `package-lock.json`
- `generated/prisma/*`
- `_bmad-output/implementation-artifacts/2-1-feed-database-seeding-mock-api.md`

## Change Log
- 2026-04-09: Story file created from upstream issue details.
- 2026-04-09: Implemented schema, seed script, and feed API query; blocked on local DB connectivity for final AC1 validation.
- 2026-04-09: Database restored and validations completed; story moved to review.
- 2026-04-09: Code review findings resolved; migration path hardened and story moved to done.
