---
title: Consistent configurable dates and reliable navigation
type: bugfix
created: 2026-10-22
status: done
baseline_commit: 46db550
context: []
---

<frozen-after-approval>

## Intent

Make the existing campus platform usable across regions and smoother to navigate. Remove fixed regional dates and misleading campus examples, correct event editing across server/browser time zones, and repair observable search/upload failures. The user authorized autonomous decisions and a local server restart.

## Boundaries & Constraints

Always preserve campus authorization and existing stored UTC timestamps. Keep changes focused and verify against the isolated demo database. Review directly to respect the user's agent usage limit. Never migrate real user data, open registration to arbitrary campuses, or publish externally.

## I/O & Edge-Case Matrix

| Scenario | Input | Expected behavior |
| --- | --- | --- |
| Deployment region | Configured locale/time zone | Server and client use the same labels and editor values |
| Event editing | UTC persisted timestamp | Date/time fields round trip without changing the instant |
| Invalid wall time | Impossible calendar date or DST gap/fold | Validation error, no silently shifted event |
| Search navigation | Navigate between search URLs/back | Input and results reflect the URL without replacing history |
| Upload retry | Same file selected after failure | A fresh upload attempt is possible |

</frozen-after-approval>

## Code Map

- `src/lib/platform-date.ts`: shared display configuration and wall-time conversion.
- `src/features/events/event-editor.utils.ts`, `src/app/dashboard/events/EventActions.tsx`: event and deadline parsing.
- Date formatter consumers throughout home/feed/admin/dashboard/passport/hubs.
- `src/features/discovery/components/SearchPageClient.tsx`: query state and URL synchronization.
- `src/components/ui/ImageUploader.tsx`: file input validation, identifiers and retry.
- `src/app/onboarding/`: remove campus-specific and expired sample values.

## Tasks & Acceptance

- [x] Add date regressions first; implement shared configurable formatting/conversion and migrate all displayed dates.
- [x] Verify search history failure in browser; repair query synchronization and add regression coverage.
- [x] Verify same-file retry and unsupported MIME behavior; repair upload input and add browser regression.
- [x] Remove misleading fixed onboarding values; document configuration and remaining limitations.
- [x] Run unit, lint/type, build and Chromium checks; restart the local demo.

Given a server/browser in different zones, editing an event preserves its saved instant. Given a new regional deployment, public locale/time-zone configuration controls all date labels and input values. Given invalid local event time, submission fails clearly. Given search history navigation, displayed input/results follow the URL. Given a failed file upload, selecting the same file retries it.

## Verification

Use targeted node tests before and after fixes, then `npm run test:unit`, `npm run check`, production build and Chromium against the isolated local database. Leave the app running for user review and report its address and demo credentials.

## Review notes

Reviewed directly under the user's minimal-agent instruction. Additional confirmed issue: user-supplied image hosts passed form validation but Next image rendering rejected them. Shared `HostedImage` keeps local optimization and loads remote images in the browser; a browser fixture reproduced the original error and verifies a successful decoded image after the fix. Review checked UTC persistence, DST rejection, campus isolation, failed upload retries, query history, and production-only upload restrictions. Public date settings are build-time settings; translations and per-college zones remain outside this pass.

## Suggested Review Order

- Shared deployment configuration and safe wall-time conversion.
  [platform-date.ts:1](../../src/lib/platform-date.ts#L1)

- Shared handling for externally hosted media.
  [HostedImage.tsx:1](../../src/components/HostedImage.tsx#L1)

- Search state follows navigable URLs.
  [SearchPageClient.tsx:25](../../src/features/discovery/components/SearchPageClient.tsx#L25)

- Retryable uploads and accessible field identities.
  [ImageUploader.tsx:20](../../src/components/ui/ImageUploader.tsx#L20)

- Production UI regression journeys.
  [global-ux.spec.ts:1](../../tests/e2e/global-ux.spec.ts#L1)

## Final validation

211 unit tests, 15 production Chromium journeys, lint, types, production build and whitespace checks pass. Demo left running at localhost:3100.
