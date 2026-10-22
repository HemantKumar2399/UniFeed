---
title: Rich event details and poster gallery
type: feature
created: 2026-10-22
status: done
baseline_commit: b2d1e04
context: []
---

<frozen-after-approval>

## Intent

Make opening an event useful and visually clear. Support additional event images and optional agenda, preparation notes, organizer contact and venue link through creation, editing, admin review and student viewing. Preserve existing RSVP and campus permissions. User authorized implementation and autonomous design decisions.

## Boundaries

Use additive nullable/defaulted database fields; existing events remain valid. Up to six additional images, existing cover retained. Plain text preserves paragraphs without accepting HTML. Links allow HTTP(S) only, contact is a validated email. Admins use the existing dashboard event editor and approval process. Do not add payments, public cross-campus access or mandatory new fields. Review directly without agents.

## Scenarios

| Input | Expected |
| --- | --- |
| Existing event without richer fields | Clean details, no empty sections |
| Portrait poster | Entire poster visible, no destructive cropping |
| Gallery images | Keyboard-accessible thumbnails switch the main image |
| Broken image | Useful fallback; other images remain selectable |
| Invalid contact, unsafe link, more than six images | Field validation rejects saving |
| Edited event | All optional details survive saving and admin review |

</frozen-after-approval>

## Design

Retain the platform palette: paper #f5f7fb, white #ffffff, ink #17243b, secondary #536278, blue #1763dd. Trebuchet display, system body, tabular date labels. Signature is a poster stage that preserves the entire artwork, with a compact thumbnail strip. Follow with a strong event heading and date/location summary. Main content uses quiet section rules and paragraphs; a separate registration panel holds capacity, deadline and actions. Mobile stacks the panel without horizontal overflow. Quick view uses the same information and media with a clear full-page link and close control.

## Code Map / Execution

- [x] Prisma schema/migration: add galleryImages, agenda, requirements, contactEmail and venueUrl safely.
- [x] CreateEventSchema, event router and editor utilities: validate and persist optional fields; regression tests first.
- [x] EventEditor and edit page: add optional information fields and up to six image uploads/URLs with removal controls.
- [x] Shared EventMediaGallery and EventInformation components: render actual content and images, omit absent sections.
- [x] EventDetailPageShell, EventDetailContent and EventCard: redesign page/quick view, retain RSVP/discussion behavior.
- [x] Admin event review: show full additional details and gallery before approving.
- [x] Verify migrations, unit tests, lint/types, production build and browser creation/edit/view flow; restart demo.

## Acceptance

Given an authorized admin or organizer, when they save rich event details, then reloading the editor preserves them and a student viewing a published event sees those details. Given a portrait or multiple images, when opening the event, then artwork is fully visible and thumbnails work. Given no additional data, then no misleading empty sections appear. Existing registration, cancellation, discussion and campus-access checks continue to pass.

## Verification

Following the user's scope update, run only affected schema/editor/event API/heading tests, additive migrate deploy on the isolated demo database, types/build, and one Chromium creation-to-publication journey with desktop/mobile screenshots. Do not rerun the unrelated unit, camera, notification or browser suites. Leave the production demo on port 3100.

## Review and results

Reviewed directly under the user’s minimal-agent preference. Confirmed optional-field defaults, HTTP(S)-only links, plain-text rendering, existing club/admin authorization, gallery bounds, read-only published records, and preservation of RSVP/discussion actions. Visual review added a full-size poster link and corrected the event breadcrumb. All changes are additive; only the disposable demo database received the migration and labeled sample event.

56 affected tests passed. TypeScript and production build/lint passed. One Chromium creation → edit → review → approve → publish → student RSVP/gallery/quick-view journey passed on the final build in 8 seconds. Desktop/mobile screenshots inspected. Unrelated suites intentionally not rerun.

## Suggested Review Order

- Event page composition.
  [EventDetailPageShell.tsx:1](../../src/features/feed/components/EventDetailPageShell.tsx#L1)

- Poster sizing, image selection and recovery.
  [EventMediaGallery.tsx:1](../../src/features/feed/components/EventMediaGallery.tsx#L1)

- Optional details and safe plain-text rendering.
  [EventInformation.tsx:1](../../src/features/feed/components/EventInformation.tsx#L1)

- Admin and organizer authoring controls.
  [EventEditor.tsx:1](../../src/features/events/components/EventEditor.tsx#L1)

- Field limits and safe URLs.
  [CreateEventSchema.ts:1](../../src/features/events/components/CreateEventSchema.ts#L1)

- Additive persistence.
  [migration.sql:1](../../prisma/migrations/20261022020000_rich_event_details/migration.sql#L1)

- Focused publication and student journey.
  [rich-event-details.spec.ts:1](../../tests/e2e/rich-event-details.spec.ts#L1)
