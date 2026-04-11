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

- [ ] Task 1: ILIKE Query Logic (AC: 1)
  - [ ] Expose `event.search` within the TRPC router precisely.
  - [ ] Implement Prisma `where: { OR: [{ title: { contains: input.query, mode: 'insensitive' } }] }`.
- [ ] Task 2: Network Debouncing (AC: 2)
  - [ ] Expose a strict `useDebounce` hook inside React globally.
  - [ ] Run the TRPC fetch *only* off the debounced string payload value preventing character-by-character DB querying.

## Dev Notes

- **Scale Warning:** Un-debounced keystrokes map to an equivalent DoS attack against your Postgres bounds. 300ms is the absolute minimum requirement (NFR-10).

### References

- [Source: planning-artifacts/epics.md#NFR-10] -> Protection against unbounded DB hammering.

## Dev Agent Record
- Agent: Antigravity
