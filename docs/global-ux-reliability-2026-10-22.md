# Regional configuration and UI reliability

Follow-up to the initial stabilization, 22 October 2026.

## Changes

- All event/date labels now share `NEXT_PUBLIC_LOCALE` and `NEXT_PUBLIC_TIME_ZONE`, defaulting to `en` and `UTC`. Server-rendered edit forms and browser deadline changes interpret times in the same configured zone. Existing UTC timestamps remain unchanged.
- Invalid calendar dates, daylight-saving gaps and repeated times are rejected instead of silently moving an event. Event and deadline forms state the time zone; ordinary event-time labels include its abbreviation.
- Search keeps live results while submitting a query creates a history entry. Back/Forward synchronize the input and results. Search errors have a retry action.
- Image uploads clear the file selection so the same file can be retried, reject unsupported types before networking, and use unique accessible input identifiers.
- Event covers and hub/story images accept external HTTP(S) image hosts without expanding the server optimizer allowlist. External images load directly in the browser; local images retain Next's optimization. External image resizing/CDN policy remains the host's responsibility.
- Event-editor actions sit above the mobile navigation. Onboarding uses generic enrollment examples, an explicitly labeled passport preview and a truthful profile-creation action.
- Removed build-time Google font fetching after a network failure delayed the build. Typography uses installed Inter/system fonts, and the document language follows the configured locale.
- The standard E2E command prepares its dedicated smoke fixtures before testing. Bootstrap and deadline tests select the organizer's actual managed club instead of a fixed campus name.

## Configuration

Set public date options before building. The local demo uses `en-IN` and `Asia/Kolkata`; a deployment elsewhere can use, for example, `en-GB` / `Europe/London` without changing source. Rebuild after editing public settings. Invalid locale/time-zone configuration fails instead of falling back to the host zone.

College identity and email domains come from the database. Campus access remains isolated. This change supports one display/editor time zone per deployment; it does not add per-college time zones, translated interface text, or public cross-college discovery.

## Verification

Initial regression tests reproduced host-zone timestamp drift, calendar rollover, lost search history, stuck file selections, unsupported-file upload attempts and the unconfigured image-host rendering error.

- `npm run check`: lint and TypeScript pass.
- `npm run test:unit`: all 211 tests pass; 16 date/deadline cases also rerun after final formatter changes.
- Production build: passes with `en-IN` / `Asia/Kolkata`, with no build-time font download.
- Full Chromium suite against that production build: all 15 tests pass after preparing the dedicated smoke fixtures. The first run had 13 passes and two failures caused by previously mutated smoke fixtures; preparation and the repeatable npm command resolve that setup issue.
- Desktop home and narrow mobile search/navigation screenshots inspected; no horizontal overflow. Date labels consistently show the configured event time zone.
- `git diff --check`: passes.

The running demo is at `http://localhost:3100`, backed by the isolated PostgreSQL test database on port 55440. Student login: `student.1@students.example.edu`; organizer login: `organizer.coding@students.example.edu`; demo password: `Test@1234`. A new registration can use `hemant.demo@students.example.edu` or another unused address in that demo domain.

Browser upload checks simulate a failed presign request and verify retries and client-side type rejection. They do not prove a real production storage bucket or a physical phone camera. Firefox and WebKit were not rerun in this pass.

Tests use the disposable database under `scratch/verification`, not the original application database. No production data migration or reset was needed.

## Remaining work

Physical-phone QR rehearsal, mailbox ownership verification, rate limiting and deployment configuration remain as described in `placeholder-backlog.md`. This targeted pass does not certify that every possible UI flow is bug-free.
