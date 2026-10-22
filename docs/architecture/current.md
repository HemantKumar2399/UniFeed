# Current architecture

UniFeed is one Next.js application backed by PostgreSQL. It serves students, organizers and college administrators from the same deployment. Use this document for the implemented architecture; the older architecture proposal is historical design context.

## Runtime and source layout

- `src/app`: App Router pages, route handlers and providers. Protected pages share a responsive platform shell.
- `src/features`: event, feed, identity, profile, community and attendance UI.
- `src/components`: shared UI, theme toggle and layout; theme tokens live in `src/styles/globals.css`.
- `src/server/api/routers`: tRPC procedures, Zod validation and server authorization.
- `src/server`: authentication, database access and domain services.
- `prisma`: schema, committed migrations and an explicitly destructive demo seed.
- `scripts`: local setup, database startup and test support.
- `tests` and colocated `*.test.*` files: browser journeys and focused unit/integration regressions.
- `.github`: CI, dependency updates and contribution templates.

The supported development runtime is Node 24 with npm and the committed lockfile. Next.js 15, React 19, TypeScript, tRPC, React Query, Auth.js, Prisma and Tailwind v4 are the current stack.

## Identity and data boundaries

Credentials sessions identify the viewer. Server procedures enforce college scope, community membership, event visibility and deletion state; the UI is not an authorization boundary. Public registration grants student access. Onboarding completion leaves identity pending; college administrators verify identities before passport QR check-in is usable.

RSVP and check-in operations use transactions and an event-row lock to protect capacity, waitlist promotion and durable attendance. Viewer RSVP status is private; aggregate capacity and an authorized organizer attendee list serve different purposes. The database is the durable source of truth.

## Media and realtime

Event previews contain limited facts and route to the full event page for registration, the gallery, schedule and discussion. Uploaded raster images are decoded and re-encoded locally during development. Production needs configured object storage or hosted URLs. Hosted images load in the browser without opening the server optimizer to arbitrary origins.

Realtime fan-out is process-local, so run one application instance until shared pub/sub is implemented. Offline check-in records need server reconciliation; rejected or unresolved records must remain visible for recovery.

## Operations

Environment values and secrets are local/deployment configuration, not source files. Prisma migrations are versioned. Setup preserves existing data; demo reset requires `--reset-demo`. Unit tests need no database. Integration/browser checks must use a disposable local test database. See [repository recovery](../repository.md), [testing](../../tests/README.md) and [release limits](../production-readiness.md).
