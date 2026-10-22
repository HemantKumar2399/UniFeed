# Verification and release limits

Verification date: 22 October 2026. Branch: `codex/hackathon-stabilization`. Baseline: `502a528`.

Current validation is recorded in [the stabilization report](stabilization-2026-10-22.md). Historical Epic 16 PASS labels were removed because they did not establish the current branch's status.

The subsequent [regional configuration and UI reliability report](global-ux-reliability-2026-10-22.md) records the date, search and image fixes and their verification.

## Release checks

Run `npm run check`, `npm run test:unit`, `npm run build`, migrations and integration tests on a disposable PostgreSQL database, then Chromium smoke and the affected user journeys. Run Next type generation and builds sequentially.

The hackathon path is student discovery → RSVP → passport → organizer check-in → attendance metrics, with administrator approval and identity review available separately.

## Deployment limits

- Realtime is process-local; one app instance only without a broker.
- New profiles remain pending until college-admin identity verification. Mailbox verification and rate limiting remain production work.
- Production uploads require configured storage; local writes are development-only. Enforce upload content policy at object storage/CDN boundaries.
- Secrets must be supplied through deployment environment values; `AUTH_SECRET` and `STUDENT_QR_SECRET` are distinct.
- Automated camera tests do not replace a real-device camera/network check at the event.
- The local seed is destructive and requires `--reset-demo`. Setup does not run it automatically.

See [remaining backlog](placeholder-backlog.md) for follow-up work. A passing build is not proof that every product or deployment scenario is ready.
