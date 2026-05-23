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
- Add “Happening this week”, “Free food”, “Workshops”, “Cultural”, etc.

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
- Events go through Draft → Submitted → Approved/Published or Rejected.
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

Start building from **Epic 0 → Epic 1 → Epic 2 → Epic 3 → Epic 4**.  
Do not jump directly to UI polishing. The highest leverage work is the data model and permission foundation: college scoping, admin role, student profile, community ownership, event lifecycle, and approval system.

Once those are correct, the rest of the product can be built faster without repeatedly rewriting features.
