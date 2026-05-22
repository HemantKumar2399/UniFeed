# Story: 4-6-organizer-event-list-panel

# Story 4.6: Organizer Event List Panel

Status: done

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

- [x] Task 1: API Segregation Context (AC: 1)
  - [x] Provide `event.getOrganizerDrafts` within TRPC.
  - [x] Safely add a strict `where: { authorId: ctx.session.user.id }` modifier protecting visibility.
- [x] Task 2: Management Views Mapping (AC: 1)
  - [x] Mount queried payload arrays into an HTML table (mapping standard Title, Status, Date fields) or visually distinct management widgets inside `/dashboard` layout bounds natively.

## Dev Notes

- **Multi-Tenancy Guard:** A massive data-leak occurs if Organizers see other club's internal events. Verify the `where` constraints in Prisma strictly filter by session identity (NFR-4).

### References

- [Source: planning-artifacts/epics.md#NFR-4] -> Row-Level data scaling and tenant privacy specifications.

## Dev Agent Record
- Agent: Antigravity

### Review Findings

- [x] [Review][Patch] Syntax error: `imprt { env }` instead of `import` [src/server/api/routers/upload.ts:4]
- [x] [Review][Patch] Middleware improperly instantiates an empty `NextAuth({ providers: [] })` instead of reusing configured `auth` [src/middleware.ts:4]
- [x] [Review][Patch] Hardcoded `role: "ORGANIZER"` overrides DB user role for all logins via credentials [src/server/auth/config.ts:74]
- [x] [Review][Patch] `protectedOrganizerProcedure` accesses `ctx.session.user` blindly without verifying `ctx.session` exists, leading to 500 TypeError [src/server/api/trpc.ts:143]
- [x] [Review][Patch] Hardcoded `0 / {event.capacity}` capacity UI string; needs `_count: { rsvps: true }` dynamically queried [src/app/(dashboard)/page.tsx:61]
- [x] [Review][Patch] Filename sanitization could yield an empty string (`filename.replace(/[^a-zA-Z0-9.-]/g, "")`) creating invalid S3 keys [src/server/api/routers/upload.ts:27]
