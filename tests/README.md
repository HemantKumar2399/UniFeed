# Verification

Use Node 24 and run commands from the repository root.

- `npm run test:unit`: real utilities and API/component behavior with isolated database doubles. No local environment file or DB is loaded.
- `npm run test:integration`: actual PostgreSQL transactions. Set `TEST_DATABASE_URL` to a dedicated local database whose name includes test, apply migrations to it using `DATABASE_URL`, then run.
- `npm run test:e2e:smoke`: student sign-in/event details, administrator approval, and cross-page RSVP updates. Requires a running/migrated/seeded disposable database and `npx playwright install chromium`.
- `npx playwright test --project=chromium --workers=1 tests/e2e/hackathon-readiness.spec.ts`: responsive navigation and recovery checks, plus screenshots in ignored test output.

Browser fixtures read the first `ALLOWED_DOMAINS` domain and use the demo password from the seed. Seed explicitly with `npm run db:seed -- --reset-demo`; that command deletes existing data in the target local database. `BASE_URL` chooses the test URL. Set `REUSE_TEST_SERVER=1` explicitly to attach to an existing disposable test server; otherwise Playwright starts its own server and refuses a port conflict.

The test runner uses a small Node ESM compatibility loader for Auth.js/Next entry points. Exact test import URLs include bracketed Next route filenames without treating them as globs. Keep DB integration tests named `*.integration.test.ts`; pure query-builder tests belong in the unit suite.

Protect observable behavior rather than component source order or CSS. Browser tests should click the action and verify its result. Unit success alone does not prove a database or browser journey works.
