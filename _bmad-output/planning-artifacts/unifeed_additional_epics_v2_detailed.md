# UniFeed Additional Epics v2: Security, Registration Deadline, UI Fixes, and Stabilization

**Purpose:**  
This document expands the previous additional epic plan into a more implementation-ready specification for an AI coding agent or teammate. It covers the new product requirement for event registration deadlines/reopening, UI problems reported by the team, and critical issues discovered during review of the latest UniFeed codebase.

**Position in roadmap:**  
These epics should be treated as **Epic 18–23**, continuing after the existing 17-epic MVP implementation plan.

**Important priority note:**  
Even though the registration deadline feature is new and important, **Epic 18 must be completed first** because it fixes security and college-scoping problems. Do not build more user-facing features on top of unsafe role assignment or cross-college data leaks.

---

## Global Context for Coding Agent

UniFeed is a multi-college campus event platform with these current concepts:

- Students register using college email domains.
- Colleges have their own admins.
- Communities/clubs belong to a college.
- Organizers create events for communities they manage.
- Admins approve/reject events for their own college.
- Students see only published events from their own college.
- Students RSVP to events.
- Students have a permanent QR identity that scanners verify against event RSVP records.

The project already has many of these concepts implemented. The goal of these new epics is not to rewrite the application, but to **stabilize and extend the current implementation safely**.

### Expected engineering rules

1. Keep all college-scoped data isolated by `collegeId`.
2. Never trust client-side role, college, club, or event ownership input without backend validation.
3. Use backend permissions for every mutation.
4. Keep event registration state derived from event status, event date, registration deadline, capacity, and RSVP status.
5. Prefer small reusable components for status badges, deadline labels, and lane cards.
6. Update tests and docs alongside implementation.

---

# Epic 18 — Security, College Scoping, and Production Hardening Hotfix

## Epic goal

Fix critical security/scoping issues before adding new product behavior. Public registration must never create elevated users. Student-facing and realtime event data must not leak across colleges. Production image configuration must not allow arbitrary remote hosts.

## Why this is necessary

The latest project version implemented multi-college support and college-specific admins. Once this exists, security and scoping become non-negotiable. A single bug can allow a student to become an admin or see/subscribe to another college’s event data.

## Problems to fix

### Problem 1 — Unsafe public role assignment

The current registration logic appears to infer elevated roles from email prefixes such as `admin...` or `organizer...`.

This is dangerous because a user with a valid college email can potentially create an admin or organizer account just by choosing a matching email local part.

### Problem 2 — Happening This Week is not college scoped

The home feed is college-scoped, but the weekly carousel/query may return all published events for the week without filtering by the logged-in user’s college.

### Problem 3 — Public capacity subscription

A realtime capacity subscription is currently public or insufficiently visibility-checked. This can leak event activity/capacity data.

### Problem 4 — Remote image wildcard

`next.config.js` allows remote image hosts using a wildcard such as `hostname: "**"`. This should not be used in production.

### Problem 5 — Documentation drift

Some docs still describe old placeholder states even though the code now has many implemented features.

## Dependencies

- Existing auth system
- Existing role system
- Existing college model
- Existing event feed and RSVP routers
- Existing admin/organizer role-management code

This epic should be done before Epic 19.

## Implementation stories

### Story 18.1 — Force public registration to create only STUDENT users

#### Target behavior

Every user created through public registration must be assigned:

```ts
role: "STUDENT"
```

Public registration must ignore or reject:

- client-submitted `role`
- email prefix role inference
- query parameter role values
- hidden form fields
- any local-part heuristic such as `admin...` or `organizer...`

#### Likely files to inspect

- `src/app/api/auth/register/route.ts`
- registration form component
- auth utilities
- seed/dev-only role scripts
- tests around registration

#### Implementation notes

Remove logic similar to:

```ts
const localPart = email.split("@")[0]?.toLowerCase();

if (localPart?.startsWith("admin")) {
  role = "ADMIN";
} else if (localPart?.startsWith("organizer")) {
  role = "ORGANIZER";
}
```

Replace with direct assignment:

```ts
const role = "STUDENT" as const;
```

If demo users need admin/organizer roles, create them through seed scripts only, not public registration.

#### Acceptance criteria

- Registering `admin.demo@college.edu` creates a student.
- Registering `organizer.demo@college.edu` creates a student.
- Public API does not accept role assignment.
- Existing seeded admins/organizers still work if seed data creates them directly.

---

### Story 18.2 — Verify role promotion is admin-controlled

#### Target behavior

Only authorized users can promote or assign roles.

Rules:

- Student cannot promote anyone.
- Organizer cannot create admins.
- College admin can manage users only in their own college.
- College admin can assign organizer access only to clubs/communities in their college.
- Super admin, if present, can manage cross-college data.

#### Likely files to inspect

- admin user-management router
- admin role-management page
- club membership router/service
- permission helpers
- tRPC context/session helpers

#### Implementation details

Create or verify permission helpers such as:

```ts
assertIsAdmin(ctx)
assertSameCollege(ctx.session.user.collegeId, targetCollegeId)
assertCanManageUserRole(ctx, targetUserId, targetRole)
assertCanManageClub(ctx, clubId)
```

Use these helpers in all role or membership mutations.

#### Acceptance criteria

- Student receives unauthorized error when trying role mutation.
- Organizer receives unauthorized error when trying admin role mutation.
- College A admin cannot promote College B student.
- College A admin cannot assign organizer role for College B club.
- Audit log records role/membership changes if an audit system exists.

---

### Story 18.3 — College-scope Happening This Week

#### Target behavior

The weekly/happening carousel must return only events from the logged-in user’s college.

Rules:

- Procedure should be protected.
- Query must include `collegeId: ctx.session.user.collegeId`.
- Query must include `status: "PUBLISHED"`.
- Query must return only current/future events inside the week window.
- It must not return other-college events.

#### Likely files to inspect

- event router
- feed router
- feed query builders
- `getHappeningThisWeek`
- home page carousel component
- happening-this-week component

#### Example implementation direction

```ts
getHappeningThisWeek: protectedProcedure.query(async ({ ctx }) => {
  const collegeId = ctx.session.user.collegeId;

  return ctx.db.event.findMany({
    where: {
      collegeId,
      status: "PUBLISHED",
      date: {
        gte: startOfWeek,
        lte: endOfWeek,
      },
    },
    include: {
      club: true,
      rsvps: true,
    },
    orderBy: { date: "asc" },
  });
});
```

Adapt this to the project’s actual helper/service style.

#### Acceptance criteria

- College A student sees only College A events.
- College B events do not appear in College A carousel.
- Logged-out users cannot call protected college-scoped weekly feed.
- Test covers cross-college leak prevention.

---

### Story 18.4 — Protect RSVP/capacity realtime subscription

#### Target behavior

Capacity/realtime subscriptions must validate the viewer before emitting event data.

Rules by role:

- Student can subscribe only to published events in their own college.
- Organizer can subscribe to events from clubs they manage.
- Admin can subscribe to events in their own college.
- Super admin, if present, can subscribe cross-college.

#### Likely files to inspect

- `rsvp` router
- `onCapacityChange`
- event visibility helper
- realtime/emitter utilities
- subscription tests

#### Implementation details

If currently public:

```ts
onCapacityChange: publicProcedure.subscription(...)
```

Change to protected:

```ts
onCapacityChange: protectedProcedure
  .input(z.object({ eventId: z.string() }))
  .subscription(async function* ({ ctx, input }) {
    await assertCanViewEventCapacity(ctx, input.eventId);
    ...
  })
```

Create a reusable helper:

```ts
async function assertCanViewEvent(ctx, eventId: string) {
  // fetch event college/status/club ownership
  // enforce role-specific visibility rules
}
```

#### Acceptance criteria

- Logged-out caller cannot subscribe.
- College A student cannot subscribe to College B event.
- Student cannot subscribe to unpublished event unless explicitly allowed.
- Organizer can subscribe to managed event.
- Admin can subscribe to same-college event.

---

### Story 18.5 — Restrict `next/image` remote hosts

#### Target behavior

Remove wildcard remote image host config.

Allowed hosts should include only:

- production upload/storage CDN
- known development/test host if needed
- optionally `images.unsplash.com` only if seed/demo content still uses it intentionally

#### Likely files to inspect

- `next.config.js`
- image upload router/service
- seed data image URLs
- environment variables for upload provider

#### Example config

```js
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: process.env.NEXT_PUBLIC_IMAGE_CDN_HOST,
    },
    {
      protocol: "https",
      hostname: "images.unsplash.com",
    },
  ].filter(Boolean),
}
```

Do not leave:

```js
hostname: "**"
```

#### Acceptance criteria

- Wildcard image hostname is removed.
- Production image host is documented in `.env.example`.
- Seed/demo image hosts are explicitly allowed or seed data is migrated to local/app storage.

---

### Story 18.6 — Update stale docs after security fixes

#### Target docs

Inspect and update:

- `README.md`
- `docs/implementation-status.md`
- `docs/placeholder-backlog.md`
- `docs/product/prd.md` if needed
- `docs/architecture/architecture.md` if needed
- env setup docs
- final epic/status docs

#### Acceptance criteria

Docs must accurately reflect:

- search is implemented
- event editing is implemented if still true
- StudentProfile fields exist if still true
- admin approval exists
- college scoping exists
- permanent student QR exists
- new registration deadline feature status after Epic 19
- remaining known limitations

## Epic 18 final acceptance checklist

- [ ] Public registration always creates students.
- [ ] Role/membership changes are admin-controlled.
- [ ] Happening-this-week is college-scoped.
- [ ] Realtime capacity subscription is protected and college-scoped.
- [ ] Remote image wildcard removed.
- [ ] Tests cover security/scoping changes.
- [ ] Docs updated to current reality.

## Priority

**P0. Must complete before real demo, deployment, or additional feature expansion.**

---

# Epic 19 — Event Registration Deadline and Reopen Flow

## Epic goal

Add a formal last date/time to register for an event. Students must not be able to RSVP after this deadline. Organizers/admins with permission must be able to extend the deadline to a future time and reopen registration without recreating the event.

## Product requirement summary

1. Every event has a registration close date/time.
2. Students can register only before the registration deadline.
3. Once the deadline passes, registration closes automatically.
4. Organizer can update the deadline to a future date/time.
5. Updating the deadline reopens registration automatically if the event is still valid/published.
6. Capacity and waitlist rules still apply after reopening.
7. Admin approval should account for expired deadlines.

## Dependencies

Depends on:

- Epic 18 security/scoping hotfix
- existing event lifecycle
- existing organizer event create/edit flow
- existing RSVP router
- existing admin approval flow

Can run in parallel with:

- Epic 20 admin layout fix
- Epic 21 bottom-left placeholder fix
- Epic 22 status lane UI, after agreeing on deadline display contract

## Core data model decision

Add this field to `Event`:

```prisma
registrationClosesAt DateTime?
```

Recommended final behavior:

- Required for newly submitted/published events.
- Optional only for old migrated events or incomplete drafts.
- Must be earlier than event start time.
- Should usually be in the future when submitting for approval.

## Derived registration state

Do **not** store a separate `registrationStatus` unless the current project architecture already has a strong reason to do so.

Derive registration state from:

- `event.status`
- `event.date`
- `event.registrationClosesAt`
- `event.capacity`
- RSVP counts
- current user RSVP status

Recommended helper:

```ts
type RegistrationAvailability =
  | "OPEN"
  | "CLOSING_SOON"
  | "CLOSED_BY_DEADLINE"
  | "FULL"
  | "WAITLIST_OPEN"
  | "EVENT_STARTED"
  | "EVENT_CANCELLED"
  | "NOT_PUBLISHED";
```

Example helper behavior:

```ts
function getRegistrationAvailability(event, now = new Date()) {
  if (event.status === "CANCELLED") return "EVENT_CANCELLED";
  if (event.status !== "PUBLISHED") return "NOT_PUBLISHED";
  if (event.date <= now) return "EVENT_STARTED";
  if (!event.registrationClosesAt) return "CLOSED_BY_DEADLINE";
  if (event.registrationClosesAt <= now) return "CLOSED_BY_DEADLINE";
  if (isFull && waitlistEnabled) return "WAITLIST_OPEN";
  if (isFull) return "FULL";
  if (event.registrationClosesAt - now < 24h) return "CLOSING_SOON";
  return "OPEN";
}
```

Adapt naming to existing code style.

## Implementation stories

### Story 19.1 — Add registration deadline to schema and migration

#### Tasks

- Add `registrationClosesAt DateTime?` to `Event` model.
- Create migration.
- Update seed data with realistic registration deadlines.
- Update test factories/fixtures.
- Update event serializers/selectors/includes where needed.

#### Migration/backfill guidance

For existing events:

- If event is future: set deadline to maybe 24 hours before event date.
- If event is past: leave null or set to past date.
- If event is draft: allow null.

For seed/demo events, explicitly set valid deadlines.

#### Acceptance criteria

- Prisma schema includes deadline field.
- DB migration applies cleanly.
- Seed data creates events with valid deadlines.
- Existing queries do not crash if old events have null deadlines.

---

### Story 19.2 — Validate deadline in event creation

#### Target behavior

Organizer must provide a valid registration deadline when creating/submitting an event.

Validation rules:

- `registrationClosesAt` is required when event is submitted for approval or directly published by admin.
- Deadline must be in the future.
- Deadline must be before event start time.
- Deadline must use consistent timezone handling with event date.
- Drafts may allow missing deadline only if other incomplete draft fields are allowed.

#### Likely files to inspect

- event create router/mutation
- event create form
- form validation schema
- event wizard components
- server-side event validation service

#### Error messages

Use clear messages:

- `Registration deadline is required.`
- `Registration deadline must be before the event starts.`
- `Registration deadline must be in the future.`

#### Acceptance criteria

- Submitting event without deadline fails.
- Submitting event with deadline after event start fails.
- Submitting event with past deadline fails unless saving incomplete draft is intentionally allowed.
- Valid deadline saves successfully.

---

### Story 19.3 — Add deadline field to event create/edit UI

#### Target UI

Add form field label:

```txt
Registration closes on
```

Helper text:

```txt
Students cannot register after this date and time. You can extend it later if the event has not started.
```

Use either:

- `datetime-local` input for MVP
- existing date/time picker component if project already uses one

#### UI locations

- organizer event creation wizard
- organizer event edit page
- admin event edit/review page if admins can edit event details

#### UX rules

- Show error if deadline is after event start.
- Show warning if deadline is very close.
- Show warning if deadline passes while event is still waiting for approval.
- For past/cancelled events, disable the deadline field and explain why.

#### Acceptance criteria

- Organizer can set deadline during event creation.
- Organizer can see existing deadline during event edit.
- Form validation errors are visible before/after submit.
- Field is accessible with proper label.

---

### Story 19.4 — Block RSVP after deadline

#### Target behavior

Students cannot RSVP after `registrationClosesAt`.

Server-side RSVP checks must run in this order:

1. User authenticated.
2. User is a student or allowed attendee role.
3. Event exists.
4. Event belongs to same college as user.
5. Event status is `PUBLISHED`.
6. Event is not cancelled.
7. Event has not started.
8. Registration deadline exists and is in the future.
9. Then capacity/waitlist logic runs.

#### Important

Do not rely only on disabled frontend buttons. The backend mutation must reject late registration.

#### Error message

```txt
Registration for this event is closed.
```

Optionally include deadline:

```txt
Registration closed on 24 Aug, 6:00 PM.
```

#### Acceptance criteria

- RSVP before deadline succeeds.
- RSVP after deadline fails from API even if frontend button is bypassed.
- RSVP button shows disabled state after deadline.
- Closed state is visible on card and detail page.

---

### Story 19.5 — Allow organizer/admin to extend deadline and reopen registration

#### Target behavior

If registration is closed only because the deadline passed, an authorized organizer/admin can update `registrationClosesAt` to a future time and registration becomes open again automatically.

#### Rules

- Organizer must manage the event’s club/community.
- Admin must belong to same college unless super admin.
- Cannot reopen cancelled event unless product explicitly allows uncancel flow.
- Cannot reopen past/started event.
- New deadline must be before event start.
- New deadline must be in future.
- Reopen does not change event status if event is already `PUBLISHED`.

#### Optional audit/logging

Record an audit event:

```txt
Registration deadline extended from [old] to [new] by [user]
```

#### Acceptance criteria

- Organizer can extend own managed event deadline.
- Organizer cannot extend other community’s event.
- College A organizer cannot extend College B event.
- Admin can extend same-college event.
- Extending deadline re-enables student RSVP.

---

### Story 19.6 — Integrate deadline with admin approval

#### Target behavior

Admin should not approve an event with an expired registration deadline without noticing.

Recommended MVP rule:

- Admin cannot approve event if registration deadline has passed.
- Admin must reject/request changes, or organizer must update deadline.

Alternative acceptable rule:

- Admin can approve but receives a strong warning and the event remains closed to registration.

Preferred rule is to block approval to prevent broken UX.

#### Admin review UI should show

- event date/time
- registration deadline
- whether deadline is valid
- warning if deadline is expired or too close

#### Acceptance criteria

- Admin review page shows deadline.
- Approval mutation blocks expired deadline or handles it according to chosen rule.
- Expired deadline is visible in status lane/card.

---

### Story 19.7 — Show deadline and registration state in student UI

#### Target surfaces

- home feed event cards
- happening-this-week carousel
- event detail page
- search results
- discover cards
- saved events/profile if event cards appear there

#### Required UI content

On cards:

```txt
Register by: 24 Aug, 6:00 PM
```

On detail page:

```txt
Registration closes: 24 Aug, 6:00 PM
```

CTA states:

- `RSVP` / `Register` when open
- `Closing Soon` hint if deadline is near
- `Registration Closed` disabled when deadline passed
- `Event Full` if full and no waitlist
- `Join Waitlist` if full and waitlist available
- `Event Started` if event already started

#### Acceptance criteria

- Deadline is visible before student clicks RSVP.
- Disabled button is understandable.
- Reopened event becomes actionable again without recreating event.

---

### Story 19.8 — Show deadline in organizer/admin dashboards and status lanes

#### Target surfaces

- organizer event list
- organizer dashboard status lanes
- admin approval queue
- admin event detail/review page
- dashboard metrics if relevant

#### Required labels

- `Registration open`
- `Closing soon`
- `Registration closed`
- `Deadline expired before approval`
- `Reopened` if audit/logging supports it; otherwise simply open again

#### Acceptance criteria

- Organizer can quickly see which events are closed.
- Organizer can identify events that can be reopened.
- Admin can identify submitted events with expired deadlines.

---

### Story 19.9 — Define waitlist behavior around deadline

#### Recommended MVP rule

After the registration deadline passes:

- new RSVPs are blocked
- waitlist joining is blocked
- automatic waitlist promotion on cancellation is also blocked

If organizer extends/reopens deadline:

- RSVP and waitlist behavior resume
- cancellations can promote waitlisted users again

#### Acceptance criteria

- Behavior is documented in code comments/tests.
- Cancellation after deadline does not unexpectedly promote waitlist unless deliberately chosen.
- Reopen restores normal waitlist behavior.

## Epic 19 final acceptance checklist

- [ ] Event schema has `registrationClosesAt`.
- [ ] Event create/edit forms include registration deadline.
- [ ] RSVP API blocks late registration.
- [ ] Organizer/admin can extend deadline and reopen registration.
- [ ] Admin approval handles expired deadline safely.
- [ ] Student event cards/details show deadline.
- [ ] Organizer/admin dashboards show deadline state.
- [ ] Tests cover create, RSVP, reopen, approval, cross-college permission, and waitlist behavior.

## Priority

**P1. Product-critical. Implement immediately after Epic 18.**

---

# Epic 20 — Admin Route Layout and Scrolling UX Fix

## Epic goal

Fix the admin route layout so the admin interface scrolls naturally and does not feel like half the screen is locked/rigid while only the lower half scrolls.

## User-reported issue

In the admin route, the header/top area does not scroll up properly. Around half the screen remains rigid while the lower half scrolls. This kills user experience, especially for event review queues and admin details.

## Target behavior

Admin pages should behave like a normal app layout:

- No large fixed/sticky area consuming half the viewport.
- Page content should scroll as one continuous page.
- Header can either scroll away or be compact-sticky.
- If sticky, header height should be small, around 56–72px.
- Avoid nested scroll containers unless absolutely necessary.

## Dependencies

Can be implemented independently after current admin route exists.

Can run in parallel with:

- Epic 19 registration deadline
- Epic 21 placeholder fix
- Epic 22 status lane UI improvement

## Implementation stories

### Story 20.1 — Audit admin layout and scroll containers

#### Likely files to inspect

- `src/app/admin/layout.tsx`
- `src/app/admin/page.tsx`
- `src/app/admin/events/page.tsx`
- `src/app/admin/events/[id]/page.tsx`
- shared admin shell component
- shared dashboard shell component
- sidebar/header components used by admin pages

#### Search for problematic classes

```txt
fixed
sticky
h-screen
min-h-screen
overflow-hidden
overflow-y-auto
max-h
top-0
inset-0
grid-rows-[...]
```

#### Common cause

Bad pattern:

```tsx
<div className="h-screen overflow-hidden">
  <Header className="sticky top-0 h-[40vh]" />
  <main className="overflow-y-auto">...</main>
</div>
```

Good pattern:

```tsx
<div className="min-h-screen bg-background">
  <AdminHeader />
  <main className="mx-auto w-full max-w-7xl px-4 py-6">
    {children}
  </main>
</div>
```

#### Acceptance criteria

- Root admin layout no longer traps scroll in lower content only.
- Header section does not consume half viewport.

---

### Story 20.2 — Normalize admin shell layout

#### Target structure

Use one page scroll context:

```tsx
<body/page>
  <div className="min-h-screen">
    <CompactAdminHeader />
    <main>{children}</main>
  </div>
</body/page>
```

If sidebar exists:

```tsx
<div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
  <aside className="hidden lg:block border-r">...</aside>
  <div className="min-w-0">
    <CompactHeader />
    <main className="px-4 py-6">...</main>
  </div>
</div>
```

Avoid setting `overflow-hidden` on the main root unless there is a clear reason.

#### Acceptance criteria

- Admin pages scroll as full document.
- Header is compact.
- No nested-scroll frustration.
- Sidebar, if present, does not create broken scroll behavior.

---

### Story 20.3 — Verify admin approval workflow pages

#### Pages to manually test

- `/admin`
- `/admin/events`
- `/admin/events/[id]`
- admin user management route if present
- admin community/role management route if present

#### Viewports

- 1366x768
- 1440x900
- mobile width around 390px
- tablet width around 768px

#### Acceptance criteria

- On laptop height, admin can see useful content quickly.
- Event review detail page scrolls naturally from top to bottom.
- No important buttons are stuck below nested scroll containers.

## Epic 20 final acceptance checklist

- [ ] Admin layout audited.
- [ ] Problematic fixed/sticky/overflow classes removed or reduced.
- [ ] Header is compact or scrolls naturally.
- [ ] Admin queue and detail pages use full page scroll.
- [ ] Smoke test covers admin page rendering.

## Priority

**P1. High UX impact for admins.**

---

# Epic 21 — Remove or Replace Bottom-Left Placeholder Across Role Layouts

## Epic goal

Remove the useless bottom-left placeholder visible across roles, or replace it with an intentional role-aware control. The current placeholder looks broken, scrolls with the page, and has no clear purpose.

## User-reported issue

There is a placeholder in the bottom-left corner for every role. It scrolls up when the page scrolls. It does not do anything useful. It makes the app look unfinished.

## Recommended decision

For MVP, **remove it completely** unless there is an already-planned useful function.

Do not add a feature just to justify keeping the placeholder.

## Dependencies

Can be done independently.

Can run in parallel with:

- Epic 19
- Epic 20
- Epic 22

## Implementation stories

### Story 21.1 — Locate the placeholder source

#### Search terms

```txt
placeholder
bottom-left
fixed bottom
absolute bottom
floating
dock
role switcher
dev
debug
quick action
```

#### Likely locations

- protected student layout
- organizer/dashboard layout
- admin layout
- global role shell
- sidebar/nav component
- floating action component
- dev/debug component

#### Acceptance criteria

- Exact component/source of placeholder is identified.
- It is clear which roles/routes render it.

---

### Story 21.2 — Remove placeholder completely

#### Tasks

- Delete component if unused.
- Remove imports.
- Remove reserved layout spacing.
- Remove CSS related to placeholder.
- Confirm no blank gap remains.

#### Acceptance criteria

- No placeholder visible in student routes.
- No placeholder visible in organizer routes.
- No placeholder visible in admin routes.
- Page layout remains aligned after removal.

---

### Story 21.3 — Optional: replace with intentional role-aware action

Only implement this story if product explicitly wants a floating control.

#### Allowed useful actions

Student:

- Help/feedback only, or nothing.

Organizer:

- Create event
- Scan QR
- View dashboard

Admin:

- Review pending events
- Manage users

#### Rules if retained

- Must use intentional fixed positioning, not normal flow.
- Must not scroll awkwardly with content.
- Must not overlap important content.
- Must hide on routes where irrelevant.
- Must have accessible label.

Example:

```tsx
<div className="fixed bottom-4 left-4 z-40">
  <Button aria-label="Create event">Create event</Button>
</div>
```

#### Acceptance criteria

- If replaced, it has a real action.
- It is role-specific.
- It is not displayed as a random placeholder.
- It is tested on mobile.

## Epic 21 final acceptance checklist

- [ ] Placeholder source found.
- [ ] Placeholder removed or intentionally replaced.
- [ ] No role has useless bottom-left UI.
- [ ] No weird scrolling behavior remains.
- [ ] Layout still looks clean on student, organizer, and admin pages.

## Priority

**P1 UI polish. It appears across roles, so fix soon.**

---

# Epic 22 — Status Lane UI Improvement

## Epic goal

Improve the visual clarity and usefulness of status lanes across organizer/admin views. Status lanes must clearly communicate event lifecycle, approval state, registration deadline state, and next actions.

## Why this matters

UniFeed now has a more complex event lifecycle:

```txt
DRAFT → SUBMITTED → APPROVED → PUBLISHED
SUBMITTED → REJECTED
PUBLISHED → CANCELLED
```

After Epic 19, each event also has registration deadline state:

```txt
Open, Closing Soon, Closed, Full, Waitlist Open, Event Started
```

If status lanes are visually weak, admins and organizers may miss important actions such as approval, deadline extension, rejection fixes, or publishing.

## Dependencies

Can start after existing status lanes are located.

Final version depends on:

- Epic 19 for registration deadline display
- existing event status values
- existing admin/organizer event list data

Can run in parallel with:

- Epic 20
- Epic 21

## Implementation stories

### Story 22.1 — Inventory all status lane locations

#### Find every status-lane-like UI

Search for:

```txt
lane
kanban
status
DRAFT
SUBMITTED
APPROVED
PUBLISHED
REJECTED
CANCELLED
Pending Review
```

Likely surfaces:

- organizer dashboard
- organizer event list
- admin approval queue
- admin dashboard
- event lifecycle page/panel

#### Acceptance criteria

- All status lane surfaces are identified.
- Decide whether to use one shared component or separate role-specific variants.

---

### Story 22.2 — Create shared status badge and status metadata system

#### Goal

Ensure status labels/colors/descriptions are consistent everywhere.

#### Suggested file

Create or update something like:

```txt
src/lib/event-status.ts
src/components/event-status-badge.tsx
```

#### Recommended mapping

```ts
const EVENT_STATUS_META = {
  DRAFT: {
    label: "Draft",
    description: "Not submitted yet",
  },
  SUBMITTED: {
    label: "Pending Review",
    description: "Waiting for college admin review",
  },
  APPROVED: {
    label: "Approved",
    description: "Approved by admin, ready to publish",
  },
  REJECTED: {
    label: "Needs Changes",
    description: "Admin requested changes",
  },
  PUBLISHED: {
    label: "Published",
    description: "Visible to students",
  },
  CANCELLED: {
    label: "Cancelled",
    description: "No longer active",
  },
};
```

#### Registration metadata

After Epic 19, add:

```ts
const REGISTRATION_STATUS_META = {
  OPEN: { label: "Registration Open" },
  CLOSING_SOON: { label: "Closing Soon" },
  CLOSED_BY_DEADLINE: { label: "Registration Closed" },
  FULL: { label: "Full" },
  WAITLIST_OPEN: { label: "Waitlist Open" },
  EVENT_STARTED: { label: "Event Started" },
};
```

#### Acceptance criteria

- Event status labels are consistent across admin and organizer UI.
- No page manually invents conflicting labels.
- Badge component is reusable.

---

### Story 22.3 — Redesign lane headers

Each lane header should show:

1. status label
2. count
3. short explanation
4. optional urgent indicator

Example:

```txt
Pending Review · 4
Waiting for college admin review
```

```txt
Needs Changes · 2
Organizer must update and resubmit
```

#### Acceptance criteria

- Lane count is visible.
- Lane meaning is clear.
- Empty lanes do not look broken.

---

### Story 22.4 — Redesign status cards

Each status lane card should include:

- event title
- club/community name
- college if admin/super admin context needs it
- event date/time
- registration deadline
- RSVP count/capacity
- current event status badge
- registration status badge
- urgent warning if deadline expired/soon
- primary action button

#### Role-specific actions

Organizer card actions:

- Edit
- Submit for approval
- Resubmit
- Publish if approved
- View attendees
- Extend deadline

Admin card actions:

- Review
- Approve
- Reject/request changes
- View audit/history

#### Acceptance criteria

- Cards show enough metadata to act without opening every event.
- Primary action is obvious.
- Deadline issues are visible.

---

### Story 22.5 — Add useful empty states

Examples:

```txt
No events waiting for review.
```

```txt
No rejected events. Great!
```

```txt
No published events yet. Publish an approved event to make it visible to students.
```

#### Acceptance criteria

- Empty lanes show helpful text.
- No lane is just blank whitespace.

---

### Story 22.6 — Make status lanes responsive

#### Desktop behavior

- Horizontal lanes are acceptable if viewport is wide.
- Cards should have consistent widths.
- Horizontal scroll is acceptable only if intentional and styled.

#### Mobile behavior

- Stack lanes vertically, or make lanes collapsible.
- Avoid tiny cards and unreadable columns.
- Primary actions remain accessible.

#### Acceptance criteria

- Works at 1366px width.
- Works at mobile width around 390px.
- No accidental horizontal overflow on mobile.

## Epic 22 final acceptance checklist

- [ ] Status lane locations inventoried.
- [ ] Shared status metadata/badge implemented.
- [ ] Lane headers show status, count, explanation.
- [ ] Cards show date, deadline, RSVP/capacity, and action.
- [ ] Empty states improved.
- [ ] Mobile and desktop layouts are usable.
- [ ] Deadline states from Epic 19 are surfaced.

## Priority

**P2. Important admin/organizer UX improvement.**

---

# Epic 23 — Regression Tests, Documentation, and Final Stabilization

## Epic goal

After implementing Epics 18–22, add tests and documentation updates so the system stays stable. This epic verifies that security, college scoping, deadlines, reopening, UI layout, and status lanes work without breaking existing RSVP, QR, admin approval, and organizer flows.

## Dependencies

Depends on:

- Epic 18
- Epic 19
- Epic 20
- Epic 21
- Epic 22

Some test work can be started earlier, but final completion comes last.

## Implementation stories

### Story 23.1 — Add role and registration security tests

#### Test cases

- New registration always creates `STUDENT`.
- Email `admin...` does not create admin.
- Email `organizer...` does not create organizer.
- Student cannot access admin routes.
- Organizer cannot access admin approval route.
- College admin cannot access other college admin data.

#### Acceptance criteria

- Tests fail before Epic 18 changes and pass after.

---

### Story 23.2 — Add college scoping tests

#### Test cases

- College A student sees only College A published events.
- College A student does not see College B event in happening-this-week.
- College A admin cannot approve College B event.
- College A organizer cannot edit College B club event.
- Capacity subscription rejects cross-college event.

#### Acceptance criteria

- No cross-college leak remains in feed, admin, organizer, or realtime flows.

---

### Story 23.3 — Add registration deadline tests

#### Test cases

- Event creation requires deadline when submitting/publishing.
- Deadline after event start is rejected.
- Deadline in the past is rejected for submission.
- Student can RSVP before deadline.
- Student cannot RSVP after deadline.
- Organizer can extend deadline.
- Student can RSVP after deadline is extended.
- Cross-college organizer cannot extend deadline.
- Cancelled/past events cannot be reopened by deadline extension.
- Admin cannot approve event with expired deadline, if using block rule.

#### Acceptance criteria

- Core deadline lifecycle is covered at backend level.

---

### Story 23.4 — Add QR and RSVP regression tests

#### Test cases

- Permanent student QR works for registered event.
- QR fails for unregistered event.
- QR fails across colleges.
- Revoked QR fails.
- Already attended RSVP is handled gracefully.
- RSVP cancellation respects deadline/waitlist rules.

#### Acceptance criteria

- Deadline changes do not break QR/check-in.

---

### Story 23.5 — Add UI smoke/regression tests

#### Test cases

- Admin page renders and page scroll is not trapped in lower half.
- Bottom-left placeholder is absent or intentional control is visible.
- Status lanes render counts and empty states.
- Event cards show registration deadline.
- Disabled CTA appears after deadline.
- Extended deadline re-enables CTA after refresh/refetch.

#### Acceptance criteria

- Playwright/e2e smoke tests cover most visible regressions.

---

### Story 23.6 — Verify build scripts from fresh clone

Run or add scripts:

```bash
npm run typecheck
npm run lint
npm run test:unit
npm run test:e2e
npm run build
```

If a script is missing, add it to `package.json` with the project’s chosen tooling.

#### Acceptance criteria

- Fresh clone can install dependencies.
- Typecheck passes.
- Lint passes or has documented known exceptions.
- Unit/integration/e2e tests pass.
- Production build succeeds.

---

### Story 23.7 — Update documentation and release notes

#### Docs to update

- README setup
- environment variables
- implementation status
- placeholder backlog
- product/PRD notes
- architecture notes if deadline/security architecture changed
- epic tracker
- deployment checklist

#### Must document

- registration deadline behavior
- reopen behavior
- waitlist behavior after deadline
- role assignment rules
- admin approval restrictions
- college scoping rules
- image host configuration
- known remaining limitations

#### Acceptance criteria

- Docs match actual implementation.
- A new developer can understand how registration deadlines and admin approval work.
- No old placeholder claims remain for implemented features.

## Epic 23 final acceptance checklist

- [ ] Role/security tests added.
- [ ] College scoping tests added.
- [ ] Registration deadline tests added.
- [ ] QR/check-in regression tests added.
- [ ] UI smoke tests added.
- [ ] Fresh build/typecheck/test pass.
- [ ] Docs updated.
- [ ] No known P0/P1 issues remain.

## Priority

**P1 after implementation. Required before calling these changes complete.**

---

# Recommended Chronological Build Order

## Phase 1 — Safety first

1. Epic 18.1 Remove self-admin/self-organizer registration.
2. Epic 18.2 Verify/admin-lock role promotion.
3. Epic 18.3 College-scope happening-this-week.
4. Epic 18.4 Protect capacity subscription.
5. Epic 18.5 Restrict remote image hosts.

This phase should be completed before adding the deadline feature.

## Phase 2 — Registration deadline foundation

1. Epic 19.1 Schema/migration.
2. Epic 19.2 Backend validation in event create/update.
3. Epic 19.4 RSVP blocking after deadline.
4. Epic 19.5 Reopen by extending deadline.
5. Epic 19.6 Admin approval integration.

This phase creates correct backend behavior.

## Phase 3 — Registration deadline UI

1. Epic 19.3 Form fields.
2. Epic 19.7 Student UI deadline display and CTA states.
3. Epic 19.8 Organizer/admin dashboard deadline display.
4. Epic 19.9 Waitlist behavior documentation/tests.

## Phase 4 — UI polish fixes

These can be done by another teammate in parallel with Phase 2/3:

1. Epic 20 Admin scroll/layout fix.
2. Epic 21 Bottom-left placeholder removal/replacement.
3. Epic 22 Status lane UI improvement.

## Phase 5 — Stabilization

1. Epic 23 tests.
2. Epic 23 docs.
3. Fresh install/typecheck/build/e2e.

---

# Parallel Work Plan for Two Developers

## Developer A — Backend/security/data

Start with:

1. Epic 18 security/scoping hotfixes
2. Epic 19 schema + backend validation
3. Epic 19 RSVP deadline blocking
4. Epic 19 reopen logic
5. Epic 23 backend tests

## Developer B — UI/product/dashboard

Start with:

1. Epic 20 admin route layout fix
2. Epic 21 bottom-left placeholder fix
3. Epic 22 status lane UI improvement
4. Epic 19 form fields + event card/detail deadline UI
5. Epic 23 UI smoke tests/docs

## Shared integration points

Both developers must agree on:

- `registrationClosesAt` field name
- event deadline validation rules
- registration availability helper output
- final status labels
- whether admin approval blocks expired deadlines
- waitlist behavior after deadline

---

# Definition of Done for Epics 18–23

The work is complete only when all of the following are true:

1. A public user cannot become admin/organizer through registration.
2. College A users cannot see, modify, subscribe to, or approve College B data unless super-admin rules explicitly allow it.
3. Every submitted/published event has a registration deadline.
4. Students cannot RSVP after the deadline.
5. Organizer/admin can extend deadline and reopen registration for valid future events.
6. Student, organizer, and admin UIs clearly show registration deadline state.
7. Admin route scrolls naturally.
8. Bottom-left placeholder is removed or replaced with a useful intentional control.
9. Status lanes are readable, actionable, and responsive.
10. Tests cover the security, deadline, QR, RSVP, and UI regressions.
11. Fresh build/typecheck/test pass.
12. Docs reflect the actual state of the codebase.
