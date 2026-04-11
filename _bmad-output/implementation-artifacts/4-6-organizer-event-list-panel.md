# Story: 4-6-organizer-event-list-panel

# Story 4.6: Organizer Event List Panel

Status: backlog

## Story

As an Organizer,
I want to see a list of my drafted, active, and past events,
So I can manage my portfolio.

## Dependencies
- Story 2.1
- Story 4.2

## Acceptance Criteria

1. **Given** the dashboard home page
   **When** rendered
   **Then** a table or list queries only events authored by the current Organizer session.

## Tasks / Subtasks

- [ ] Task 1: API Segregation Context (AC: 1)
  - [ ] Provide `event.getOrganizerDrafts` within TRPC.
  - [ ] Safely add a strict `where: { authorId: ctx.session.user.id }` modifier protecting visibility.
- [ ] Task 2: Management Views Mapping (AC: 1)
  - [ ] Mount queried payload arrays into an HTML table (mapping standard Title, Status, Date fields) or visually distinct management widgets inside `/dashboard` layout bounds natively.

## Dev Notes

- **Multi-Tenancy Guard:** A massive data-leak occurs if Organizers see other club's internal events. Verify the `where` constraints in Prisma strictly filter by session identity (NFR-4).

### References

- [Source: planning-artifacts/epics.md#NFR-4] -> Row-Level data scaling and tenant privacy specifications.

## Dev Agent Record
- Agent: Antigravity
