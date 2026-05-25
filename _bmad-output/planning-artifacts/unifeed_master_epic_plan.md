# UniFeed Master Epic Plan

This document serves as the single source of truth, combining both the initial epic plan and the V2 additional epics into one comprehensive guide.

# UniFeed Final Chronological Epic Plan

**Project:** UniFeed / Campus Platform  
**Purpose:** Build the project further without missing core PRD features, newly requested admin approval features, or currently incomplete/wrongly implemented features.  
**Basis:** Re-review of the uploaded codebase, PRD/architecture/design docs, existing `_bmad-output` stories, and the current implementation state.

---

## Current Reality of the Codebase

The project already has a strong base: Next.js app router, Prisma/PostgreSQL schema, NextAuth credentials auth, protected student and organizer shells, event feed components, RSVP logic, QR ticket utility, organizer dashboard pages, hub pages, hub follow/editing, discussion threads, and some tests.

But the current implementation still has important gaps:

- Events are currently scoped only to `Club`, not to `College` / `University`.
- Roles are only `USER` and `ORGANIZER`; no `ADMIN` role exists.
- Admin approval does not exist.
- `EventStatus` only supports `DRAFT` and `PUBLISHED`; it cannot represent submitted, approved, rejected, cancelled, etc.
- Event creation attaches to the first/default club instead of a selected organizer-managed club.
- Student profile/passport fields are missing from the database.
- Current QR flow is event-ticket based; the new requirement is a permanent student QR that is checked against each event RSVP.
- Home feed, dashboard metrics, organizer event list, search, global, and some discovery sections are static or partially wired.
- Event editing is explicitly not implemented.
- Attendee PRN/branch data is fake/fallback-based.
- Uploads and test scripts need production hardening.

This file is the final epic order to move from the current codebase to a usable MVP.

---

## Build Strategy

Build in this order:

1. Stabilize the existing project.
2. Add college, role, and student identity foundations.
3. Fix auth and permission safety.
4. Fix community ownership.
5. Add admin approval.
6. Complete event lifecycle.
7. Replace static student/organizer screens with real data.
8. Convert QR/check-in to the new permanent student QR model.
9. Add search, discovery, profile, hubs, notifications, and production hardening.

Do **not** start admin approval, QR redesign, or multi-college behavior until the data model foundation is complete.

---

# Epic 0: Stabilize the Existing Codebase Before Feature Work

## Goal
Make the current codebase runnable, type-checkable, and safe to modify.

## Why this comes first
The current ZIP contains several partially implemented or demo-coded areas. Before adding college admins, approval workflows, or new QR logic, the team needs a known-good baseline.

## Stories

### Story 0.1: Install dependencies and run the app locally
**Tasks**
- Run `npm install`.
- Run Prisma generate.
- Configure local `.env` from `.env.example`.
- Start local database.
- Run seed script.
- Run dev server.

**Acceptance criteria**
- App opens locally.
- Login/register works with allowed domains.
- Seeded events/clubs appear.
- No missing env crash during basic navigation.

---

### Story 0.2: Fix package scripts for modern Next.js
**Current issue**
`package.json` uses `next lint`, which may be incompatible depending on the installed Next.js version and tooling.

**Tasks**
- Verify `npm run lint`, `npm run typecheck`, `npm run build`.
- Replace deprecated lint command if needed.
- Add a dedicated unit test script for existing `*.test.ts` files.
- Keep Playwright e2e script separate.

**Acceptance criteria**
- `npm run typecheck` passes.
- `npm run build` passes.
- `npm run test:unit` exists and runs unit tests.
- CI runs lint/typecheck/build/unit tests.

---

### Story 0.3: Remove or mark demo-only code paths
**Tasks**
- Find hardcoded dashboards, fake PRN values, fallback Unsplash images, local-only check-in state, and placeholder pages.
- Add `TODO-MVP` comments only where temporarily accepted.
- Create GitHub issues or tracker items for each placeholder.

**Acceptance criteria**
- No hidden fake production behavior remains.
- Every temporary behavior is either removed or explicitly marked.

---

### Story 0.4: Confirm current implemented feature map
**Tasks**
- Verify which current routes are real, partial, or placeholder.
- Confirm which existing `_bmad-output` stories are actually implemented in code.
- Keep an implementation checklist in `docs/implementation-status.md`.

**Acceptance criteria**
- Team knows what can be reused and what must be rebuilt.

---

# Epic 1: College, Role, and Identity Data Foundation

## Goal
Introduce the data model required for multi-college admins, college-scoped communities, secure student identity, and event approval.

## Why this comes now
The newly requested admin approval system depends on knowing which college an admin, community, student, and event belong to.

## Stories

### Story 1.1: Add `College` model
**Tasks**
- Add a `College` model to Prisma.
- Include fields such as `id`, `name`, `slug`, `emailDomains`, `logoUrl`, `createdAt`, `updatedAt`.
- Decide whether `emailDomains` is JSON/string array or a normalized table.

**Acceptance criteria**
- Colleges can be seeded.
- Each college has unique slug/domain configuration.

---

### Story 1.2: Scope users, clubs, events, and hubs to a college
**Tasks**
- Add `collegeId` to `User`.
- Add `collegeId` to `Club`.
- Add `collegeId` to `Event`.
- Ensure `Event.collegeId` matches its club's college.
- Backfill seeded data to a default college.

**Acceptance criteria**
- Every user belongs to one college.
- Every community/club belongs to one college.
- Every event belongs to one college.
- College A queries cannot accidentally show College B private/admin data.

---

### Story 1.3: Add role model for student, organizer, admin, and super admin
**Current issue**
Current enum only has `USER` and `ORGANIZER`.

**Tasks**
- Replace/extend `Role` enum with:
  - `STUDENT`
  - `ORGANIZER`
  - `ADMIN`
  - optional `SUPER_ADMIN`
- Migrate existing `USER` rows to `STUDENT`.
- Update all role checks.

**Acceptance criteria**
- Students cannot access organizer/admin pages.
- Organizers cannot access admin approval tools unless also admin.
- Admins can approve only within their college.
- Super admin, if added, can manage colleges/admin assignment globally.

---

### Story 1.4: Add `StudentProfile` model
**Current issue**
Passport and attendee tables need PRN/branch/year, but the database only stores name/email/role.

**Tasks**
- Add `StudentProfile` with fields:
  - `userId`
  - `collegeId`
  - `prn` or enrollment number
  - `branch`
  - `course`
  - `graduationYear`
  - optional `section`
  - optional `phone`
  - `isVerified`
  - `lockedAt`
- Add unique constraints for `collegeId + prn`.

**Acceptance criteria**
- Student identity data exists in DB.
- PRN is unique inside a college.
- Attendee tables can use real profile fields.

---

### Story 1.5: Add permanent student QR identity fields
**New requirement**
A student should have one permanent QR identity used across all events. Event verification checks whether that student is registered for the selected event.

**Tasks**
- Add stable QR identity fields, for example:
  - `studentQrId`
  - `studentQrSecretVersion`
  - `qrRevokedAt`
- Decide whether QR payload contains a signed token or opaque ID.
- Add QR rotation/revocation capability for lost/compromised QR.

**Acceptance criteria**
- Each verified student can have one active QR identity.
- QR does not expose raw sensitive profile data.
- QR can be rotated by admin/support.

---

### Story 1.6: Convert RSVP status to enum
**Current issue**
`RSVP.status` is a plain string.

**Tasks**
- Add `RSVPStatus` enum:
  - `GOING`
  - `WAITLISTED`
  - `CANCELLED`
  - `ATTENDED`
  - optional `NO_SHOW`
- Migrate current strings.
- Update all queries and UI.

**Acceptance criteria**
- RSVP lifecycle is type-safe.
- Check-in uses `ATTENDED` enum.
- Future waitlist/cancel behavior is safe.

---

### Story 1.7: Expand event lifecycle status
**Current issue**
`EventStatus` only has `DRAFT` and `PUBLISHED`.

**Tasks**
- Add statuses:
  - `DRAFT`
  - `SUBMITTED`
  - `APPROVED`
  - `PUBLISHED`
  - `REJECTED`
  - `CANCELLED`
  - optional `ARCHIVED`
- Decide exact meaning:
  - `DRAFT`: organizer editing, not submitted
  - `SUBMITTED`: waiting for college admin review
  - `APPROVED`: admin approved but not live yet, if needed
  - `PUBLISHED`: visible to students
  - `REJECTED`: admin rejected with reason
  - `CANCELLED`: event cancelled after publish

**Acceptance criteria**
- Approval flow is possible without overloading `PUBLISHED`.
- Student feed only shows approved/published events.

---

### Story 1.8: Add event category/tag metadata
**Current issue**
Discovery and personalization need event categories, but schema does not support them properly.

**Tasks**
- Add event category/type fields, such as:
  - `category`
  - `tags`
  - `domain`
  - `isFreeFood`
  - `hasCertificate`
  - `isPaid`
  - optional `targetBranches`
- Update event creation form and seed data.

**Acceptance criteria**
- Discover filters and feed personalization can use real data.

---

# Epic 2: Authentication, Registration, and Permission Safety

## Goal
Make registration and access control safe for real college-scoped users.

## Stories

### Story 2.1: Remove public role self-selection
**Current risk**
Registration should not allow a user to make themselves organizer/admin casually.

**Tasks**
- Ensure registration creates `STUDENT` only.
- Remove or disable any role self-selection in UI/API.
- Add server-side validation.

**Acceptance criteria**
- A new user cannot become organizer/admin by editing the request.

---

### Story 2.2: Assign college during registration
**Tasks**
- Match email domain to `College.emailDomains`.
- Store `collegeId` on the user.
- Reject unknown domains or route them to waitlist/request access.

**Acceptance criteria**
- Student from College A is assigned College A.
- Student from College B is assigned College B.
- Cross-college assignment cannot be spoofed.

---

### Story 2.3: Add student onboarding for passport data
**Tasks**
- After registration, collect PRN, branch, course, graduation year.
- Validate required fields.
- Create `StudentProfile`.
- Decide whether profile is immediately verified or pending verification.

**Acceptance criteria**
- Student cannot fully use RSVP/tickets until required identity fields are completed.
- Passport page displays real profile data.

---

### Story 2.4: Add controlled organizer assignment
**Tasks**
- Add admin/super-admin action to promote student to organizer.
- Add `ClubMembership` owner/editor assignment.
- Prevent organizers from joining/creating random clubs without approval.

**Acceptance criteria**
- Organizer access is granted intentionally.
- Organizer can manage only assigned communities.

---

### Story 2.5: Add controlled admin assignment
**Tasks**
- Add super-admin or seed-based admin assignment.
- Store admin's college scope using `user.collegeId`.
- Prevent college admins from changing their own college scope.

**Acceptance criteria**
- College A admin can approve College A events only.
- College B admin can approve College B events only.

---

### Story 2.6: Align middleware and server auth config
**Current issue**
Auth middleware should use the same assumptions as server auth.

**Tasks**
- Review `src/middleware.ts` and `src/server/auth/config.ts`.
- Ensure protected routes, dashboard routes, and admin routes are consistently guarded.
- Add `adminProcedure` and `collegeAdminProcedure` in tRPC.

**Acceptance criteria**
- `/admin` requires `ADMIN` or `SUPER_ADMIN`.
- `/dashboard` requires organizer/admin as intended.
- tRPC procedures enforce the same rules as pages.

---

# Epic 3: Community Ownership and College-Scoped Clubs

## Goal
Fix community/club ownership before events and admin approval are rebuilt.

## Stories

### Story 3.1: Replace default club selection in event creation
**Current issue**
`event.create` uses the first club or creates `University Club`.

**Tasks**
- Require `clubId` in create event input.
- Validate the club belongs to the organizer's college.
- Validate organizer has `OWNER` or `EDITOR` membership for that club.
- Remove default club fallback from production code.

**Acceptance criteria**
- Organizer must choose a community they manage.
- Events cannot be accidentally attached to the wrong club.

---

### Story 3.2: Build `club.getMyManagedClubs`
**Tasks**
- Add tRPC query returning clubs where current user has owner/editor membership.
- Include club id, name, logo, role, college.

**Acceptance criteria**
- Event creation UI can list valid communities.
- Organizer dashboard can filter by managed communities.

---

### Story 3.3: Build community selector in event creation UI
**Tasks**
- Add required community selector to event creation wizard.
- Show empty state if organizer manages no community.
- Do not allow submit without club.

**Acceptance criteria**
- Every created event has correct `clubId` and `collegeId`.

---

### Story 3.4: Replace author-only authorization with membership authorization
**Current issue**
Event manage checks mostly compare `authorId` with current user.

**Tasks**
- Build helper: `assertCanManageEvent(userId, eventId)`.
- Allow club owners/editors to manage club events.
- Keep audit fields like `authorId` for tracking creator.

**Acceptance criteria**
- Community owner can manage all events in their community.
- Random organizer cannot manage another community's event.

---

### Story 3.5: Add basic community management
**Tasks**
- Add community creation request or admin-created communities.
- Add member management for owner/editor roles.
- Add college scoping.

**Acceptance criteria**
- Admin can create/manage communities for their college.
- Community owners can add editors if allowed by product rules.

---

# Epic 4: College Admin Approval System

Status: Completed on 2026-05-23.

## Goal
Implement the new requirement: college-specific admins approve community-created events.

## Stories

### Story 4.1: Create admin route group and shell
**Tasks**
- Add `/admin` route group.
- Add admin sidebar/navigation.
- Add route guard for `ADMIN`/`SUPER_ADMIN`.
- Show current college context.

**Acceptance criteria**
- Admin dashboard is separate from organizer dashboard.
- Non-admin users cannot access it.

---

### Story 4.2: Add admin tRPC router
**Tasks**
- Add `adminRouter` to `src/server/api/root.ts`.
- Add protected college admin procedures.
- Add queries:
  - pending events
  - event review detail
  - approval history
  - college communities
- Add mutations:
  - approve event
  - reject event
  - request changes, optional

**Acceptance criteria**
- Admin APIs only return same-college data.
- Admin cannot approve another college's event.

---

### Story 4.3: Add event submission flow for organizers
**Tasks**
- Organizer creates `DRAFT`.
- Organizer submits event for review, status becomes `SUBMITTED`.
- Submitted events become locked or limited-edit until admin decision.
- Show status in organizer event list.

**Acceptance criteria**
- Draft events are not visible to students.
- Submitted events are visible to admins only.

---

### Story 4.4: Build pending approval queue
**Tasks**
- Admin sees list of `SUBMITTED` events from their college.
- Include community, organizer, date, capacity, location, submitted time.
- Add search/filter by community/status/date.

**Acceptance criteria**
- College A admin sees only College A submitted events.
- Queue is usable for daily review.

---

### Story 4.5: Build event review detail page
**Tasks**
- Show full event data.
- Show image, description, capacity, location, organizer, community.
- Show approval buttons.
- Require rejection reason when rejecting.

**Acceptance criteria**
- Approve changes status to `PUBLISHED` or `APPROVED` based on lifecycle decision.
- Reject changes status to `REJECTED` and stores reason.
- Organizer can see decision.

---

### Story 4.6: Add approval audit log
**Tasks**
- Add `EventApprovalLog` model with:
  - `eventId`
  - `adminId`
  - `action`
  - `reason/comment`
  - timestamps
- Record submit, approve, reject, request changes.

**Acceptance criteria**
- Approval decisions are traceable.
- Admin actions can be reviewed later.

---

### Story 4.7: Notify organizer about approval decision
**Tasks**
- Add basic in-app notification or status banner.
- Notify organizer when event is approved/rejected.
- Show rejection reason and next action.

**Acceptance criteria**
- Organizer does not need to guess approval status.

---

# Epic 5: Event Creation, Editing, and Lifecycle Completion

## Goal
Make event management complete and correct after admin approval foundations are ready.

## Stories

### Story 5.1: Update event creation backend
**Tasks**
- Include `clubId`, `collegeId`, category/tags, event metadata.
- Save as `DRAFT` by default.
- Add submit mutation.
- Validate all fields server-side.

**Acceptance criteria**
- Events are created in correct college/community.
- Events do not bypass admin approval.

---

### Story 5.2: Improve event creation wizard
**Tasks**
- Add community selector.
- Add category/tags/domain fields.
- Add date/time validation.
- Add image upload integration.
- Add Save Draft and Submit for Approval buttons.

**Acceptance criteria**
- Organizer can create a complete event without manual DB changes.

---

### Story 5.3: Build real organizer event list
**Current issue**
`/dashboard/events` uses static sample cards.

**Tasks**
- Fetch real events for managed communities.
- Add tabs: Draft, Submitted, Published, Rejected, Cancelled, Past.
- Add search and filters.
- Add action buttons based on status.

**Acceptance criteria**
- Organizer sees real events only.
- Status and RSVP counts are real.

---

### Story 5.4: Build event editing backend
**Current issue**
Edit page says coming soon.

**Tasks**
- Add `event.update` mutation.
- Validate edit permissions via community membership.
- Define edit rules by status:
  - Draft: full edit
  - Rejected: editable and resubmittable
  - Submitted: limited or locked
  - Published: limited changes or requires re-approval

**Acceptance criteria**
- Organizers can edit valid events safely.

---

### Story 5.5: Build event editing UI
**Tasks**
- Load existing event into form.
- Reuse creation wizard where possible.
- Show current status and admin notes.
- Save changes.
- Resubmit rejected events.

**Acceptance criteria**
- `/dashboard/events/[id]/edit` is no longer placeholder.

---

### Story 5.6: Add event cancellation flow
**Tasks**
- Add cancellation mutation.
- Allow organizer/admin cancellation based on rules.
- Store cancellation reason.
- Notify registered students.

**Acceptance criteria**
- Cancelled events are hidden/marked correctly.
- RSVP/check-in is disabled for cancelled events.

---

### Story 5.7: Complete image upload pipeline
**Current issue**
Image upload has local/mock fallback behavior.

**Tasks**
- Configure real S3/R2/Supabase storage.
- Document env variables.
- Validate file type and file size.
- Remove production fallback to random Unsplash image.
- Add upload error UI.

**Acceptance criteria**
- Event images upload reliably in production.

---

# Epic 6: Student Feed, Event Detail, RSVP Visibility

## Goal
Replace static student screens with real approved/published event data.

## Stories

### Story 6.1: Replace hardcoded home feed
**Current issue**
`/home` contains hardcoded event content.

**Tasks**
- Fetch real published events from `event.getFeed`.
- Show only current student's college events unless global mode is explicitly enabled.
- Render real `EventCard` data.
- Remove fake dates/event names.
- Add loading/empty/error states.

**Acceptance criteria**
- Home feed is fully DB-backed.
- College A student sees College A approved events.

---

### Story 6.2: Update feed query for approval and college scope
**Tasks**
- Only show `PUBLISHED` events.
- Filter by `collegeId`.
- Hide rejected/draft/submitted/cancelled events.
- Exclude past events from primary feed unless needed.

**Acceptance criteria**
- Unapproved events never appear in student feed.

---

### Story 6.3: Add consistent event detail page
**Tasks**
- Build/standardize event detail route.
- Show event metadata, club, capacity, RSVP state, discussion, related events.
- Respect event visibility and college scope.

**Acceptance criteria**
- Students can open and understand any event from feed/search/discover.

---

### Story 6.4: Show registration state everywhere
**Tasks**
- Show Going/Waitlisted/Cancelled/Attended state on cards and detail pages.
- Disable duplicate RSVP.
- Reflect capacity changes.

**Acceptance criteria**
- Student always understands whether they are registered.

---

# Epic 7: RSVP, Capacity, Cancellation, and Waitlist

## Goal
Make event registration reliable and aligned with the approval system.

## Stories

### Story 7.1: Restrict RSVP to approved/published events
**Tasks**
- Update RSVP mutation to verify event status.
- Reject RSVP for draft/submitted/rejected/cancelled/past events.
- Verify same college as student.

**Acceptance criteria**
- Students cannot register for unapproved events.

---

### Story 7.2: Preserve capacity-safe RSVP logic
**Current good part**
The code already uses pessimistic locking for RSVP capacity.

**Tasks**
- Keep pessimistic lock behavior.
- Update it for new enum statuses.
- Ensure cancelled RSVP frees capacity if product wants that.

**Acceptance criteria**
- Capacity cannot be oversold under concurrent requests.

---

### Story 7.3: Add RSVP cancellation
**Tasks**
- Add cancellation mutation.
- Define cutoff rules.
- Update UI to allow cancel RSVP.
- Reflect capacity changes.

**Acceptance criteria**
- Student can cancel according to policy.
- Capacity updates correctly.

---

### Story 7.4: Decide and implement waitlist
**Tasks**
- Decide whether waitlist is MVP or post-MVP.
- If MVP:
  - add waitlist behavior when full
  - promote waitlisted students when seats open
  - notify promoted students

**Acceptance criteria**
- Full event behavior is clear and tested.

---

# Epic 8: Permanent Student QR and Event Check-In Redesign

## Goal
Replace event-ticket QR dependency with the requested one-time/permanent student QR model.

## New product rule
A student has one QR identity. When they register for an event, the event scanner checks whether that student QR belongs to a student who has a valid RSVP for that event.

## Stories

### Story 8.1: Design secure student QR payload
**Tasks**
- Decide QR format:
  - signed token containing student QR ID, or
  - opaque public QR ID resolved server-side.
- Do not include PRN/email/raw user ID directly if avoidable.
- Add signature/expiry/rotation strategy.

**Acceptance criteria**
- QR cannot be easily forged.
- QR reveals minimal personal data.

---

### Story 8.2: Generate permanent student QR
**Tasks**
- Generate QR when student profile is completed/verified.
- Store active QR identity.
- Show QR on Passport page.
- Add regenerate/revoke capability for admin/support.

**Acceptance criteria**
- Student has one active QR for all events.

---

### Story 8.3: Rebuild Passport page with real identity data
**Current issue**
Passport currently shows limited user data and ticket count.

**Tasks**
- Show name, college, PRN, branch, course, graduation year.
- Show permanent QR.
- Show verification status.
- Show active registered events/tickets below.

**Acceptance criteria**
- Passport is the student's real event identity card.

---

### Story 8.4: Build QR verification backend
**Tasks**
- Add mutation such as `attendance.verifyStudentQrForEvent`.
- Input: event ID + scanned student QR token.
- Decode/resolve student.
- Check:
  - event belongs to scanner's manageable community
  - event is published/active
  - student belongs to same college or allowed scope
  - student has RSVP for this event
  - RSVP is not cancelled
  - RSVP is not already attended, or return already checked in
- Mark RSVP as `ATTENDED`.

**Acceptance criteria**
- Scanning a student's QR at Event X only checks them into Event X if they registered for Event X.
- Same QR works across all registered events.

---

### Story 8.5: Update scanner UI for student QR
**Current issue**
Scanner currently expects event ticket token.

**Tasks**
- Update scanner instructions.
- Show result states:
  - valid and checked in
  - not registered for this event
  - already checked in
  - wrong college
  - invalid/revoked QR
  - event not scannable
- Keep paste-token fallback for dev/manual use.

**Acceptance criteria**
- Event volunteers can understand scan results quickly.

---

### Story 8.6: Decommission or repurpose event-specific QR tickets
**Tasks**
- Decide whether `/tickets` still shows event passes or only list of registered events.
- Remove old `eventTicketId` QR payload if no longer needed.
- Keep event cards/tickets as visual passes without unique QR, if desired.

**Acceptance criteria**
- There is no confusion between permanent student QR and old event ticket QR.

---

# Epic 9: Attendee Management and Manual Check-In

## Goal
Make organizer attendee operations accurate, persistent, and based on real student identity.

## Stories

### Story 9.1: Replace fake attendee identity fields
**Current issue**
Attendee UI uses fallback/fake PRN and branch values.

**Tasks**
- Join `StudentProfile` in attendee queries.
- Display real PRN, branch, course, year.
- Remove `@ts-expect-error` fallback fields.

**Acceptance criteria**
- Attendee table displays real student data.

---

### Story 9.2: Persist manual check-in
**Current issue**
Some check-in UI state is local-only.

**Tasks**
- Use backend mutation to mark RSVP `ATTENDED`.
- Update table from server state.
- Add confirmation and undo policy if needed.

**Acceptance criteria**
- Manual check-in persists after refresh.

---

### Story 9.3: Add attendee filters and search
**Tasks**
- Filters: All, Going, Attended, Cancelled, Waitlisted, No-show if used.
- Search by name, email, PRN.
- Sort by registration time/check-in status.

**Acceptance criteria**
- Organizer can manage large attendee lists.

---

### Story 9.4: Improve CSV export
**Tasks**
- Export real student profile fields.
- Include RSVP status and check-in time if added.
- Include college/community/event metadata.

**Acceptance criteria**
- Export is useful for attendance records.

---

# Epic 10: Search and Discover

## Goal
Make search and discovery real instead of placeholder/static.

## Stories

### Story 10.1: Build functional search page
**Current issue**
`/search` is placeholder-level.

**Tasks**
- Add search input and debounced query.
- Use backend search.
- Search events, clubs/hubs, maybe users/resources later.
- Scope by college.
- Show empty/loading/error states.

**Acceptance criteria**
- Student can find real approved events and communities.

---

### Story 10.2: Expand backend search
**Tasks**
- Search title, description, club name, tags, category, location.
- Return normalized result types.
- Prevent unapproved events from appearing.

**Acceptance criteria**
- Search results are useful and safe.

---

### Story 10.3: Build functional discover page
**Current issue**
Discover UI has categories/search but little real filtering.

**Tasks**
- Wire categories to event metadata.
- Add category result pages/states.
- Add community/hub discovery.
- Add â€œHappening this weekâ€, â€œFree foodâ€, â€œWorkshopsâ€, â€œCulturalâ€, etc.

**Acceptance criteria**
- Discover helps students find events without typing.

---

### Story 10.4: Decide campus map scope
**Tasks**
- Either implement location/map feature or remove the card from MVP.
- If implemented, add location metadata and map UI.

**Acceptance criteria**
- No dead map UI remains.

---

# Epic 11: Dashboards and Metrics With Real Data

## Goal
Replace static admin/organizer/student metric screens with real data.

## Stories

### Story 11.1: Build admin overview metrics
**Tasks**
- Pending approvals count.
- Approved/rejected events by period.
- Active communities.
- Upcoming events by college.
- RSVP totals by college.

**Acceptance criteria**
- Admin dashboard helps college admins act quickly.

---

### Story 11.2: Build organizer overview metrics
**Current issue**
Dashboard uses fake numbers.

**Tasks**
- Real event count.
- Real RSVP count.
- Upcoming event count.
- Pending approval count.
- Recent attendees/check-ins.

**Acceptance criteria**
- Organizer dashboard reflects actual DB state.

---

### Story 11.3: Add status-aware dashboard cards
**Tasks**
- Show Draft, Submitted, Published, Rejected, Cancelled cards.
- Add CTA based on status.

**Acceptance criteria**
- Organizer knows what to do next for each event.

---

# Epic 12: Hubs, Communities, and Public Club Pages

## Goal
Polish the existing hub/community system and connect it to the new college/admin model.

## Stories

### Story 12.1: College-scope hub directory
**Tasks**
- Show hubs from current student's college.
- Optionally support global/cross-college hubs later.

**Acceptance criteria**
- College A student does not see College B hubs by default.

---

### Story 12.2: Improve public hub pages
**Tasks**
- Show club logo/banner.
- Show upcoming approved events only.
- Show followers count.
- Show resources/FAQs.
- Link events back to event detail.

**Acceptance criteria**
- Hub pages are useful to students.

---

### Story 12.3: Improve hub editor
**Tasks**
- Add block validation.
- Add preview mode.
- Add save state/toasts.
- Add image/logo/banner upload.

**Acceptance criteria**
- Community owners can maintain public pages.

---

### Story 12.4: Add community moderation/admin controls
**Tasks**
- Admin can create/disable communities.
- Admin can assign/remove community owners.
- Admin can review problematic hubs if needed.

**Acceptance criteria**
- College admin controls community structure.

---

# Epic 13: Profile, Preferences, and Personalization

## Goal
Complete the student profile and use real preferences for feed ranking.

## Stories

### Story 13.1: Complete profile page actions
**Current issue**
Profile page has menu rows but not complete functionality.

**Tasks**
- Wire sign out.
- Add personal information screen.
- Add saved events screen.
- Add preferences screen.

**Acceptance criteria**
- Profile is not just a static settings shell.

---

### Story 13.2: Add preferences model and UI
**Current issue**
Feed preferences are derived from request headers, not real profile preferences.

**Tasks**
- Store interests/domains/categories.
- Let students select preferences.
- Use preferences in feed ranking.

**Acceptance criteria**
- Personalization is based on real saved user data.

---

### Story 13.3: Add saved/bookmarked events
**Tasks**
- Add `SavedEvent` model.
- Add save/unsave UI.
- Show saved events in profile.

**Acceptance criteria**
- Students can bookmark events they are interested in.

---

# Epic 14: Notifications and Communication

## Goal
Inform users when important workflow events happen.

## Stories

### Story 14.1: Add notification model
**Tasks**
- Add in-app notification table.
- Include recipient, type, payload, read status.

**Acceptance criteria**
- App can store and show important notifications.

---

### Story 14.2: Notify organizers about admin decisions
**Tasks**
- Notify on approve/reject/request changes.
- Include admin comment/reason.

**Acceptance criteria**
- Organizers know what happened to submitted events.

---

### Story 14.3: Notify students about RSVP lifecycle
**Tasks**
- Notify on registration success.
- Notify on event cancellation.
- Notify on waitlist promotion if waitlist exists.

**Acceptance criteria**
- Students are not surprised by lifecycle changes.

---

### Story 14.4: Optional email notifications
**Tasks**
- Decide whether MVP includes email.
- If yes, add email provider and templates.

**Acceptance criteria**
- Email is either implemented or explicitly deferred.

---

# Epic 15: Global / Multi-College Mode Decision

## Goal
Decide whether `/global` is part of MVP or should be removed/hidden.

## Stories

### Story 15.1: Decide global page MVP status
**Current issue**
`/global` is placeholder-level, but multi-college logic is now required for admin scoping.

**Options**
- Option A: Hide global page for MVP.
- Option B: Show read-only public cross-college events.
- Option C: Build full cross-college discovery later.

**Acceptance criteria**
- No placeholder global page remains in production navigation.

---

### Story 15.2: Implement global mode only if approved
**Tasks if enabled**
- Add visibility rules: college-only vs public/global.
- Add admin controls for cross-college visibility.
- Add filters by college.

**Acceptance criteria**
- Global does not break college privacy or admin ownership.

---

# Epic 16: Security, Audit, and Production Hardening

## Goal
Prepare the MVP for real student and college usage.

## Stories

### Story 16.1: Add authorization tests
**Tasks**
- Test student cannot access dashboard/admin.
- Test organizer cannot manage other community events.
- Test admin cannot approve other college events.
- Test super admin behavior if used.

**Acceptance criteria**
- Core permission rules are tested.

---

### Story 16.2: Add QR security tests
**Tasks**
- Invalid QR fails.
- Revoked QR fails.
- Student not registered fails.
- Already attended returns correct state.
- Wrong event fails.

**Acceptance criteria**
- QR check-in cannot be bypassed easily.

---

### Story 16.3: Add approval lifecycle tests
**Tasks**
- Draft not visible to students.
- Submitted visible to college admin only.
- Rejected not visible to students.
- Published visible to same-college students.

**Acceptance criteria**
- Approval system is protected by tests.

---

### Story 16.4: Complete environment documentation
**Tasks**
- Document auth env vars.
- Document database env vars.
- Document upload env vars.
- Document QR signing secret.
- Document allowed domains and college seed setup.

**Acceptance criteria**
- A new developer can run the project using docs.

---

### Story 16.5: Remove generated Prisma client from source if appropriate
**Current observation**
The ZIP includes `generated/prisma` files. Decide whether this should be committed or generated during install/build.

**Tasks**
- Review deployment strategy.
- If not needed, add generated client output to `.gitignore` and regenerate in build.

**Acceptance criteria**
- Repo stays clean and deployment remains reliable.

---

### Story 16.6: Production readiness checklist
**Tasks**
- Run build.
- Run typecheck.
- Run lint.
- Run unit tests.
- Run e2e smoke tests.
- Verify database migrations from clean DB.
- Verify seed script.
- Verify production env variables.

**Acceptance criteria**
- MVP can be deployed confidently.

---

# Epic 17: Post-MVP Enhancements

These should not block the first working MVP unless the team explicitly decides otherwise.

## Candidate enhancements
- Real-time websocket capacity sync in production.
- Calendar integration.
- Certificates/skills builder.
- Advanced analytics and heatmaps.
- Email/push notification system.
- Cross-college/global discovery.
- Admin moderation for comments/discussions.
- University SSO / Google OAuth / magic link.
- Full row-level security at database level.
- Mobile app or PWA offline ticket support.

---

# Chronological Build Order Summary

## Phase 1: Stabilization
1. Epic 0: Stabilize existing project.

## Phase 2: Core foundation
2. Epic 1: College, role, identity, status schema.
3. Epic 2: Auth, registration, permission safety.
4. Epic 3: Community ownership and college-scoped clubs.

## Phase 3: Admin and event lifecycle
5. Epic 4: College admin approval system.
6. Epic 5: Event creation/editing/lifecycle.

## Phase 4: Student product becomes real
7. Epic 6: Real home feed/event detail/registration visibility.
8. Epic 7: RSVP/capacity/cancellation/waitlist.
9. Epic 8: Permanent student QR.
10. Epic 9: Attendee management/check-in.

## Phase 5: Discovery and dashboards
11. Epic 10: Search and discover.
12. Epic 11: Real dashboards and metrics.
13. Epic 12: Hubs and communities polish.
14. Epic 13: Profile/preferences/personalization.
15. Epic 14: Notifications.

## Phase 6: Scope decisions and launch hardening
16. Epic 15: Global/multi-college mode decision.
17. Epic 16: Security, audit, production hardening.
18. Epic 17: Post-MVP enhancements.

---

# MVP Must-Have List

The MVP should not be considered complete until these are done:

- College model exists.
- Users, clubs, and events are college-scoped.
- Admin role exists.
- College admins approve only their college's events.
- Organizers create events under communities they manage.
- Events go through Draft â†’ Submitted â†’ Approved/Published or Rejected.
- Student feed shows only approved/published events.
- Event editing exists.
- Student profile/passport stores real PRN, branch, course, year.
- Permanent student QR exists.
- Scanner verifies student QR against event RSVP.
- Attendee table uses real profile data.
- Home feed, organizer event list, and dashboard metrics are not static.
- Search/discover are functional or intentionally hidden.
- Build/typecheck/tests pass.

---

# Critical Dependency Map

- Admin approval depends on: `College`, `ADMIN` role, college-scoped `Event`.
- Organizer event creation depends on: managed clubs and `clubId` selector.
- Student QR depends on: `StudentProfile` and permanent QR identity.
- QR check-in depends on: RSVP enum, event visibility, scanner permission checks.
- Feed/search/discover depend on: event status, college scope, category/tags.
- Dashboard metrics depend on: real event lifecycle and RSVP statuses.

---

# Suggested Sprint Breakdown

## Sprint 1
- Epic 0 stabilization.
- Begin Epic 1 schema migration.

## Sprint 2
- Complete College/User/Club/Event scoping.
- Add roles and StudentProfile.
- Add RSVP/Event status enums.

## Sprint 3
- Auth/registration updates.
- Admin/organizer permission safety.
- Community ownership fixes.

## Sprint 4
- Admin approval router and pages.
- Organizer submit/reject/approve flow.

## Sprint 5
- Event creation fixes.
- Real organizer event list.
- Event editing.

## Sprint 6
- Real student home feed.
- Event detail.
- RSVP restrictions and cancellation.

## Sprint 7
- Permanent student QR.
- Passport rebuild.
- Scanner backend/UI conversion.

## Sprint 8
- Attendee table real profile fields.
- Manual check-in persistence.
- CSV export.

## Sprint 9
- Search/discover.
- Dashboards/metrics.
- Hubs/profile/preferences polish.

## Sprint 10
- Notifications.
- Global page decision.
- Security tests.
- Production hardening.

---

# Developer Notes

- Do not implement new visible features without checking college scope.
- Do not allow events to skip admin approval.
- Do not use `authorId` alone as the long-term permission model; use community membership.
- Do not continue fake PRN/branch fallbacks after StudentProfile exists.
- Do not keep two competing QR systems unless the UI clearly explains the difference.
- Do not leave placeholder routes in production navigation.
- Prefer server-side authorization even if client UI hides buttons.
- Every feature should have loading, empty, error, and unauthorized states.

---

# Final Recommendation

Start building from **Epic 0 â†’ Epic 1 â†’ Epic 2 â†’ Epic 3 â†’ Epic 4**.  
Do not jump directly to UI polishing. The highest leverage work is the data model and permission foundation: college scoping, admin role, student profile, community ownership, event lifecycle, and approval system.

Once those are correct, the rest of the product can be built faster without repeatedly rewriting features.


---

# UniFeed Additional Epics v2: Security, Registration Deadline, UI Fixes, and Stabilization

**Purpose:**  
This document expands the previous additional epic plan into a more implementation-ready specification for an AI coding agent or teammate. It covers the new product requirement for event registration deadlines/reopening, UI problems reported by the team, and critical issues discovered during review of the latest UniFeed codebase.

**Position in roadmap:**  
These epics should be treated as **Epic 18â€“23**, continuing after the existing 17-epic MVP implementation plan.

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

# Epic 18 â€” Security, College Scoping, and Production Hardening Hotfix

## Epic goal

Fix critical security/scoping issues before adding new product behavior. Public registration must never create elevated users. Student-facing and realtime event data must not leak across colleges. Production image configuration must not allow arbitrary remote hosts.

## Why this is necessary

The latest project version implemented multi-college support and college-specific admins. Once this exists, security and scoping become non-negotiable. A single bug can allow a student to become an admin or see/subscribe to another collegeâ€™s event data.

## Problems to fix

### Problem 1 â€” Unsafe public role assignment

The current registration logic appears to infer elevated roles from email prefixes such as `admin...` or `organizer...`.

This is dangerous because a user with a valid college email can potentially create an admin or organizer account just by choosing a matching email local part.

### Problem 2 â€” Happening This Week is not college scoped

The home feed is college-scoped, but the weekly carousel/query may return all published events for the week without filtering by the logged-in userâ€™s college.

### Problem 3 â€” Public capacity subscription

A realtime capacity subscription is currently public or insufficiently visibility-checked. This can leak event activity/capacity data.

### Problem 4 â€” Remote image wildcard

`next.config.js` allows remote image hosts using a wildcard such as `hostname: "**"`. This should not be used in production.

### Problem 5 â€” Documentation drift

Some docs still describe old placeholder states even though the code now has many implemented features.

## Dependencies

- Existing auth system
- Existing role system
- Existing college model
- Existing event feed and RSVP routers
- Existing admin/organizer role-management code

This epic should be done before Epic 19.

## Implementation stories

### Story 18.1 â€” Force public registration to create only STUDENT users

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

### Story 18.2 â€” Verify role promotion is admin-controlled

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

### Story 18.3 â€” College-scope Happening This Week

#### Target behavior

The weekly/happening carousel must return only events from the logged-in userâ€™s college.

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

Adapt this to the projectâ€™s actual helper/service style.

#### Acceptance criteria

- College A student sees only College A events.
- College B events do not appear in College A carousel.
- Logged-out users cannot call protected college-scoped weekly feed.
- Test covers cross-college leak prevention.

---

### Story 18.4 â€” Protect RSVP/capacity realtime subscription

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

### Story 18.5 â€” Restrict `next/image` remote hosts

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

### Story 18.6 â€” Update stale docs after security fixes

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

# Epic 19 â€” Event Registration Deadline and Reopen Flow

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

### Story 19.1 â€” Add registration deadline to schema and migration

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

### Story 19.2 â€” Validate deadline in event creation

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

### Story 19.3 â€” Add deadline field to event create/edit UI

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

### Story 19.4 â€” Block RSVP after deadline

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

### Story 19.5 â€” Allow organizer/admin to extend deadline and reopen registration

#### Target behavior

If registration is closed only because the deadline passed, an authorized organizer/admin can update `registrationClosesAt` to a future time and registration becomes open again automatically.

#### Rules

- Organizer must manage the eventâ€™s club/community.
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
- Organizer cannot extend other communityâ€™s event.
- College A organizer cannot extend College B event.
- Admin can extend same-college event.
- Extending deadline re-enables student RSVP.

---

### Story 19.6 â€” Integrate deadline with admin approval

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

### Story 19.7 â€” Show deadline and registration state in student UI

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

### Story 19.8 â€” Show deadline in organizer/admin dashboards and status lanes

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

### Story 19.9 â€” Define waitlist behavior around deadline

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

# Epic 20 â€” Admin Route Layout and Scrolling UX Fix

## Epic goal

Fix the admin route layout so the admin interface scrolls naturally and does not feel like half the screen is locked/rigid while only the lower half scrolls.

## User-reported issue

In the admin route, the header/top area does not scroll up properly. Around half the screen remains rigid while the lower half scrolls. This kills user experience, especially for event review queues and admin details.

## Target behavior

Admin pages should behave like a normal app layout:

- No large fixed/sticky area consuming half the viewport.
- Page content should scroll as one continuous page.
- Header can either scroll away or be compact-sticky.
- If sticky, header height should be small, around 56â€“72px.
- Avoid nested scroll containers unless absolutely necessary.

## Dependencies

Can be implemented independently after current admin route exists.

Can run in parallel with:

- Epic 19 registration deadline
- Epic 21 placeholder fix
- Epic 22 status lane UI improvement

## Implementation stories

### Story 20.1 â€” Audit admin layout and scroll containers

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

### Story 20.2 â€” Normalize admin shell layout

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

### Story 20.3 â€” Verify admin approval workflow pages

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

# Epic 21 â€” Remove or Replace Bottom-Left Placeholder Across Role Layouts

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

### Story 21.1 â€” Locate the placeholder source

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

### Story 21.2 â€” Remove placeholder completely

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

### Story 21.3 â€” Optional: replace with intentional role-aware action

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

# Epic 22 â€” Status Lane UI Improvement

## Epic goal

Improve the visual clarity and usefulness of status lanes across organizer/admin views. Status lanes must clearly communicate event lifecycle, approval state, registration deadline state, and next actions.

## Why this matters

UniFeed now has a more complex event lifecycle:

```txt
DRAFT â†’ SUBMITTED â†’ APPROVED â†’ PUBLISHED
SUBMITTED â†’ REJECTED
PUBLISHED â†’ CANCELLED
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

### Story 22.1 â€” Inventory all status lane locations

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

### Story 22.2 â€” Create shared status badge and status metadata system

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

### Story 22.3 â€” Redesign lane headers

Each lane header should show:

1. status label
2. count
3. short explanation
4. optional urgent indicator

Example:

```txt
Pending Review Â· 4
Waiting for college admin review
```

```txt
Needs Changes Â· 2
Organizer must update and resubmit
```

#### Acceptance criteria

- Lane count is visible.
- Lane meaning is clear.
- Empty lanes do not look broken.

---

### Story 22.4 â€” Redesign status cards

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

### Story 22.5 â€” Add useful empty states

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

### Story 22.6 â€” Make status lanes responsive

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

# Epic 23 â€” Regression Tests, Documentation, and Final Stabilization

## Epic goal

After implementing Epics 18â€“22, add tests and documentation updates so the system stays stable. This epic verifies that security, college scoping, deadlines, reopening, UI layout, and status lanes work without breaking existing RSVP, QR, admin approval, and organizer flows.

## Dependencies

Depends on:

- Epic 18
- Epic 19
- Epic 20
- Epic 21
- Epic 22

Some test work can be started earlier, but final completion comes last.

## Implementation stories

### Story 23.1 â€” Add role and registration security tests

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

### Story 23.2 â€” Add college scoping tests

#### Test cases

- College A student sees only College A published events.
- College A student does not see College B event in happening-this-week.
- College A admin cannot approve College B event.
- College A organizer cannot edit College B club event.
- Capacity subscription rejects cross-college event.

#### Acceptance criteria

- No cross-college leak remains in feed, admin, organizer, or realtime flows.

---

### Story 23.3 â€” Add registration deadline tests

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

### Story 23.4 â€” Add QR and RSVP regression tests

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

### Story 23.5 â€” Add UI smoke/regression tests

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

### Story 23.6 â€” Verify build scripts from fresh clone

Run or add scripts:

```bash
npm run typecheck
npm run lint
npm run test:unit
npm run test:e2e
npm run build
```

If a script is missing, add it to `package.json` with the projectâ€™s chosen tooling.

#### Acceptance criteria

- Fresh clone can install dependencies.
- Typecheck passes.
- Lint passes or has documented known exceptions.
- Unit/integration/e2e tests pass.
- Production build succeeds.

---

### Story 23.7 â€” Update documentation and release notes

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

## Phase 1 â€” Safety first

1. Epic 18.1 Remove self-admin/self-organizer registration.
2. Epic 18.2 Verify/admin-lock role promotion.
3. Epic 18.3 College-scope happening-this-week.
4. Epic 18.4 Protect capacity subscription.
5. Epic 18.5 Restrict remote image hosts.

This phase should be completed before adding the deadline feature.

## Phase 2 â€” Registration deadline foundation

1. Epic 19.1 Schema/migration.
2. Epic 19.2 Backend validation in event create/update.
3. Epic 19.4 RSVP blocking after deadline.
4. Epic 19.5 Reopen by extending deadline.
5. Epic 19.6 Admin approval integration.

This phase creates correct backend behavior.

## Phase 3 â€” Registration deadline UI

1. Epic 19.3 Form fields.
2. Epic 19.7 Student UI deadline display and CTA states.
3. Epic 19.8 Organizer/admin dashboard deadline display.
4. Epic 19.9 Waitlist behavior documentation/tests.

## Phase 4 â€” UI polish fixes

These can be done by another teammate in parallel with Phase 2/3:

1. Epic 20 Admin scroll/layout fix.
2. Epic 21 Bottom-left placeholder removal/replacement.
3. Epic 22 Status lane UI improvement.

## Phase 5 â€” Stabilization

1. Epic 23 tests.
2. Epic 23 docs.
3. Fresh install/typecheck/build/e2e.

---

# Parallel Work Plan for Two Developers

## Developer A â€” Backend/security/data

Start with:

1. Epic 18 security/scoping hotfixes
2. Epic 19 schema + backend validation
3. Epic 19 RSVP deadline blocking
4. Epic 19 reopen logic
5. Epic 23 backend tests

## Developer B â€” UI/product/dashboard

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

# Definition of Done for Epics 18â€“23

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

---

# Epic 23 System Documentation and Reference Guide

This section contains developer documentation of the behavior, rules, and architecture implemented across Epics 18–23.

## 1. Registration Deadline Behavior
* **Validation Rules:**
  - An event cannot be submitted for admin review or published unless it has a valid `registrationClosesAt` timestamp.
  - The deadline must be set in the future relative to the time of submission/publication, and must occur before the event start date/time.
* **RSVP Blocking:**
  - Once the registration deadline passes, the event availability transitions to `CLOSED_BY_DEADLINE`.
  - The student-facing RSVP button is disabled and displays "Registration Closed".
  - If a student directly invokes the `rsvp.register` tRPC procedure after the deadline has passed, the request is rejected with a `BAD_REQUEST` error.

## 2. Reopen and Extend Behavior
* **Extension Criteria:**
  - Managed organizers or administrators from the same college can extend the registration deadline of a published event if it has not yet started or been cancelled.
  - Reopening is done by providing a new `registrationClosesAt` timestamp in the future.
* **Flow:**
  - The organizer navigates to `/dashboard/events?tab=published`.
  - On the target event card, the organizer clicks "Reopen / Extend Registration".
  - The organizer inputs a new date/time and submits.
  - Upon submission, the event status is updated, and the registration state returns to `OPEN` or `CLOSING_SOON`. Students are then able to RSVP once again.

## 3. Waitlist Behavior
* **After Deadline:**
  - When the registration deadline passes, the waitlist is frozen.
  - If a student cancels their RSVP *before* the deadline, the waitlist promotion is triggered automatically (the first student in the queue is promoted to `GOING`).
  - If a student cancels their RSVP *after* the deadline, the waitlist promotion is blocked (the slot is not backfilled) to respect the closure of registration.

## 4. Role Assignment and Promotion Rules
* **Public Registration:**
  - Any user signing up via the public credentials registration form is strictly created with the `STUDENT` role. No role promotion fields are exposed on the signup page.
* **Admin-Controlled Role Promotion:**
  - Only administrators can promote users to `ORGANIZER` or `ADMIN` roles.
  - Role promotion is strictly restricted within college boundaries: an admin can only promote a user belonging to the same college. Any attempt to promote a user from a different college is rejected with a `FORBIDDEN` error.

## 5. College Scoping and Isolation Rules
* **Content Scoping:**
  - All event feeds, search results, "Happening This Week" listings, and directories are scoped to the user's `collegeId`.
  - The server injects the user's `collegeId` into the where-clause filters for all student discovery routes.
* **Realtime RSVP Protection:**
  - In `useLiveEventAttendance`, the subscription link (`onAttendanceChange`) checks that the subscriber's college matches the event's college. Cross-college subscriptions are immediately rejected to prevent data leakage.

## 6. Image Host Configuration
* **Safety Rules:**
  - Next.js image optimization remote patterns are configured to only allow image domains specified in `UPLOAD_PUBLIC_BASE_URL` or fallback Unsplash domains to mitigate SSR request forgery vulnerabilities.
  - Organizers without S3 configured upload media to local development folders (`/uploads/...`), which are served from the app's server context.

## 7. Verification Actions
* Run unit tests: `npm run test:unit`
* Run Playwright E2E tests: `npx playwright test tests/e2e/epic23-regression.spec.ts --project=chromium`
* Compile and lint verification: `npm run check`
