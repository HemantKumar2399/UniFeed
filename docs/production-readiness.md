# Production Readiness

Epic 16 is the release-hardening pass for UniFeed. Use this checklist to verify the MVP can be run, reviewed, and deployed with the current multi-college event approval model.

## Environment

- [x] `AUTH_SECRET` documented and required for real authentication environments
- [x] `DATABASE_URL` documented and points to PostgreSQL
- [x] `ALLOWED_DOMAINS` documented and used by registration plus seeded accounts
- [x] `STUDENT_QR_SECRET` documented and kept distinct from `AUTH_SECRET`
- [x] `NEXT_PUBLIC_APP_URL` documented for explicit deployment origins
- [x] Upload variables documented for direct organizer uploads

## Seed and Generated Client Decisions

- [x] Seed password for all seeded users is `Test@1234`
- [x] Seeded roles include student, organizer, and admin accounts
- [x] Seeded college/domain setup follows the first configured `ALLOWED_DOMAINS` entry
- [x] Generated Prisma client stays out of source control via `/generated/`
- [x] Prisma client generation remains handled by `postinstall` and `npm run db:generate`

## Verification Checklist

| Check | Command / Action | Result |
| --- | --- | --- |
| Lint | `npm run lint` | `PASS` |
| Typecheck | `npm run typecheck` | `PASS` |
| Build | `npm run build` | `PASS` |
| Unit tests | `npm run test:unit` | `PASS` |
| Prisma client generation | `npm run db:generate` | `PASS` |
| Epic 16 smoke | `npm run test:e2e:smoke` | `PASS` |
| Clean DB reset | `npx prisma migrate reset --force --skip-generate --skip-seed` | `PASS` |
| Migrations from clean DB | `npm run db:migrate` | `PASS` |
| Seed script from clean DB | `npm run db:seed` | `PASS` |

## Local Smoke Expectations

- Student sign-in lands on `/home`
- Student can see and open a seeded published event from the feed
- Student RSVP changes fan out across open pages for the deterministic realtime smoke event
- Admin sign-in can reach `/admin/events`
- Admin can approve the deterministic submitted smoke event created by the local bootstrap script

## Notes

- The local smoke bootstrap is guarded to local/test databases only.
- `test:e2e` remains the broader Playwright suite, while `test:e2e:smoke` is the deterministic release check used by Epic 16.
- `prisma/migrations/20260524143000_epic16_schema_alignment/migration.sql` was added during Epic 16 to align the migration chain with the current Prisma schema before clean-reset verification.
- Epic 17 realtime attendance fan-out is intentionally single-instance only; multi-instance brokered pub/sub is deferred.
