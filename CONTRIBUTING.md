# Contributing to UniFeed

Use Node 24 and the committed npm lockfile. Start with the [README](README.md) and [current implementation status](docs/implementation-status.md).

## Development

Create a branch from main (for example `codex/fix-event-check-in`), keep changes focused, and use conventional commit messages. Open a PR with the problem, changed behavior, validation, and any remaining limitations. Do not push or merge automatically from an agent task unless the user asks.

## Code boundaries

- Keep Next.js routes in `src/app`, domain UI in `src/features`, shared navigation in `src/components/layout`, and server policies/services in `src/server`.
- Use the existing tRPC/Zod, Prisma/PostgreSQL, Tailwind v4, React Query and semantic CSS tokens. Tailwind tokens live in `src/styles/globals.css`.
- Prefer server components where practical. Share repeated layouts rather than copying role-specific shells.
- Check college, membership, event visibility and deletion state at server boundaries. Never rely on hidden buttons for authorization.
- Serialize seat allocation, cancellation, waitlist promotion and check-in using the event-row lock. Preserve successful durable mutations even if later fan-out fails.
- Profile completion does not verify identity. Administrators review college records before granting verification.
- Include labels, visible keyboard focus, mobile touch targets, reduced-motion behavior, and actionable loading/error/empty states.
- Use environment configuration for secrets and deployment origins. Keep user-facing copy direct and consistent.

## Tests and checks

Write regressions for meaningful behavior: permission boundaries, state transitions, capacity, identity, rejected/offline scans, and recovery. Avoid tests that assert source text, exact styling, or constants without exercising behavior.

Run `npm run check`, `npm run test:unit`, and `npm run build`. Run generated-type checks and builds sequentially. For DB changes, migrate a disposable test database and run `npm run test:integration`. Verify affected browser journeys with Chromium. See [tests/README.md](tests/README.md).

Never run seeds, migrations that delete data, or database-writing tests against an existing personal/production database. Demo reset requires an explicit `--reset-demo` flag and is guarded to local hosts.

## Documentation and tooling

Update current feature/setup docs when behavior changes. Keep dated audit records as history; do not silently rewrite old test results. BMAD plans and vendored skills are optional development tooling rather than runtime application dependencies. Obsolete issue-sync scripts were removed; remaining GitHub maintenance utilities require deliberate review before use.
