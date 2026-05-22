# Story: 5-2-server-side-algorithmic-search

# Story 5.2: Server-Side Algorithmic Search

Status: backlog

## Story

As a Student,
I want to search for events by name or keyword,
So I can find specific things I heard about without scrolling endlessly.

## Dependencies
- Story 2.1
- Story 5.1

## Acceptance Criteria

1. **Given** the search input
   **When** I type a keyword
   **Then** the server queries the database and returns events matching the title or description (case-insensitive).
2. **And** the query is debounced by 300ms to protect the database from spam.

## Tasks / Subtasks

- [x] Task 1: ILIKE Query Logic (AC: 1)
  - [x] Expose `event.search` within the TRPC router precisely.
  - [x] Implement Prisma `where: { OR: [{ title: { contains: input.query, mode: 'insensitive' } }] }`.
- [x] Task 2: Network Debouncing (AC: 2)
  - [x] Expose a strict `useDebounce` hook inside React globally.
  - [x] Run the TRPC fetch *only* off the debounced string payload value preventing character-by-character DB querying.
### Review Findings
- [x] [Review][Patch] Fix Typescript `no-misused-promises` error where `runCommand()` was typed synchronously, but `signOut()` returns a Promise. [src/components/CommandMenu.tsx:21]
## File List
- src/server/api/routers/event.ts
- src/hooks/useDebounce.ts
- src/components/CommandMenu.tsx

## Change Log
- Added `event.search` TRPC endpoint handling title and description searches with mode: "insensitive"
- Created standard `useDebounce` React hook in src/hooks/useDebounce.ts
- Connected the CommandMenu input parameter with 300ms debouncing directly mapped to TRPC event searches.

## Status
done


## Dev Notes

- **Scale Warning:** Un-debounced keystrokes map to an equivalent DoS attack against your Postgres bounds. 300ms is the absolute minimum requirement (NFR-10).

### References

- [Source: planning-artifacts/epics.md#NFR-10] -> Protection against unbounded DB hammering.

## Dev Agent Record
- Agent: Antigravity
