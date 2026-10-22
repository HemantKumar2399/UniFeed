# UniFeed

A campus event platform for students, organizers, and college administrators.

Students discover events, reserve seats or join waitlists, save events, follow communities, and use a permanent passport QR. Organizers publish events, manage attendees, check students in, and view attendance metrics. College admins approve events, manage roles, and verify student identities.

## Start locally

Use **Node 24**, npm, and either local PostgreSQL or Docker/Podman. The database starter uses PostgreSQL 17 when creating a container.

```sh
npm run setup
npm run dev
```

The same commands work in PowerShell, macOS and Linux. Setup copies the environment example if needed, generates missing signing secrets, installs the lockfile, starts or detects the local database, and applies migrations. It stops on failure and preserves existing data.

Configure the connection in `.env` before setup when using your own local PostgreSQL installation. Existing databases previously created with `db:push` may need Prisma migration baselining; setup intentionally does not reset them.

## Optional demo data

**This explicitly replaces existing application data in the configured local database.** Run it only for a disposable demo database:

```sh
npm run db:seed -- --reset-demo
```

The first domain in `ALLOWED_DOMAINS` determines demo email addresses. Password: `Test@1234`.

| Role      | Email                       |
| --------- | --------------------------- |
| Student   | `student.1@<domain>`        |
| Organizer | `organizer.coding@<domain>` |
| Admin     | `admin.jecrc@<domain>`      |

Fresh registrations receive STUDENT access. Profile completion stays pending until a college administrator verifies identity against college records in the admin QR controls. Seeded demo profiles are verified. Email domain eligibility alone is not proof of mailbox ownership; email verification/delivery is not implemented.

## Environment

| Variable                                                                                  | Purpose                                                                                          |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `DATABASE_URL`                                                                            | PostgreSQL connection URL                                                                        |
| `AUTH_SECRET`                                                                             | Session signing secret                                                                           |
| `ALLOWED_DOMAINS`                                                                         | Seed email-domain configuration; existing College.emailDomains records govern login/registration |
| `STUDENT_QR_SECRET`                                                                       | Separate passport signing secret, at least 16 characters                                         |
| `NEXT_PUBLIC_APP_URL`                                                                     | Optional deployed origin                                                                         |
| `NEXT_PUBLIC_LOCALE`, `NEXT_PUBLIC_TIME_ZONE`                                             | Shared date locale and IANA time zone, default `en` / `UTC`; rebuild after changing              |
| `UPLOAD_BUCKET_NAME`, `UPLOAD_REGION`, `UPLOAD_ACCESS_KEY_ID`, `UPLOAD_SECRET_ACCESS_KEY` | Optional object storage                                                                          |
| `UPLOAD_PUBLIC_BASE_URL`                                                                  | Uploaded media origin, also allowlisted for next/image                                           |

All displayed event dates, event inputs and deadline changes use the configured time zone, independent of the server or browser location. For example, set `NEXT_PUBLIC_LOCALE=en-IN` and `NEXT_PUBLIC_TIME_ZONE=Asia/Kolkata` for an India deployment. Stored timestamps remain UTC. Impossible dates and ambiguous daylight-saving times are rejected; choose a time outside the clock change. This is one deployment-wide time zone, not per-college time zones or translated interface text.

Development uploads are decoded and re-encoded to WebP. Local file uploads are disabled in production; configure storage or paste an HTTP(S) hosted image URL. External images load directly in the browser so new campus image hosts do not require code changes or a wider server image optimizer allowlist. The presigned storage path restricts image MIME types, but deployment should also enforce object-storage/CDN content policy.

## Verification

```sh
npm run check
npm run test:unit
npm run build
```

Unit tests use isolated defaults and do not need `.env` or a database. Database integration tests require a dedicated **local database with test in its name**:

```powershell
$env:TEST_DATABASE_URL = "postgresql://postgres:password@localhost:5432/unifeed_test"
$env:DATABASE_URL = $env:TEST_DATABASE_URL
npm run db:migrate
npm run test:integration
```

For browser tests, migrate and explicitly seed that disposable database first, then:

```sh
npx playwright install chromium
npm run test:e2e:smoke
```

Set `BASE_URL` and explicitly set `REUSE_TEST_SERVER=1` only when attaching to a server already configured with the disposable test database. Browser/database tests write fixtures; keep them away from a personal or production database. Run type generation and production builds sequentially because both write Next.js generated files.

## Current docs

- [Rich event creation and viewing](docs/event-details.md)
- [Event experience design research and theme motion](docs/event-experience-design.md)
- [Implementation and feature status](docs/implementation-status.md)
- [Verification record and release limits](docs/production-readiness.md)
- [UX direction](docs/ux-refresh.md)
- [Regional configuration and UI reliability](docs/global-ux-reliability-2026-10-22.md)
- [Original audit](docs/codebase-audit-2026-10-21.md)
- [Contributing](CONTRIBUTING.md)

The historical [PRD](docs/product/prd.md), [architecture](docs/architecture/architecture.md), and archived BMAD epics describe original intent. Current implementation status and verification records take precedence over old completion labels.

Realtime updates currently require a single app process. Reminder emails, digests, Google login, payments, and employer portfolios are not shipped features.
