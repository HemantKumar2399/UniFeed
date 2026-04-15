---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
inputDocuments: ['docs/product/prd.md', 'docs/architecture/architecture.md', 'docs/design/ux-design-specification.md']
---

# Campus Platform - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Campus Platform, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR-ID-1: Secure "Student Passport" storing PRN, Branch, and Grad Year; locked for registration integrity.
FR-ID-2: Structured profile view utilizing minimal nested cards and clean typography.
FR-CP-1: Campus Pulse: A curated, categorized view of upcoming activities.
FR-CP-2: Event Cards: Minimalist, information-dense components with hidden captions.
FR-RE-1: Interactive Registration: 1-Click Registration utilizing the Passport, paired with a satisfying visual interaction.
FR-RE-2: Live Capacity Indicators: Subtle, precise numeric pill-badge indicators of available spots.
FR-MO-1: Distraction-Free Creator: A focused text-entry environment for drafting event details.
FR-MO-2: Live Attendee Data Table: Sorting, managing, and 1-click CSV exports.
FR-MO-3: QR Entrance Scanner: Integrated tool to verify student passports at event venues.

### NonFunctional Requirements

NFR-1: Interaction Latency: Micro-interactions and UI feedback must occur in <50ms.
NFR-2: Tactile Utility Design System: Strict adherence to Typography, Color Palette, and Elevation specs.
NFR-3: Engaging Polish: Fluid, tactile animations must offset minimal UI.

### Additional Requirements

- Starter Template: `create-t3-app` with Next.js App Router, Tailwind, Prisma, tRPC, PostgreSQL
- Multi-tenancy & RLS: Enforcing university boundaries (@jecrc.edu) natively in the database.
- Auth: NextAuth.js (v5 beta) using Prisma adapters.
- Real-time: tRPC WebSocket subscriptions for live capacity syncing combined with pessimistic "Locking" states.
- Client State: Zustand (v5.0) for localized state and UI toggles.
- UI Components: shadcn/ui configured natively with Tailwind CSS and motion-safe utilities.
- UX constraints: Strict max-w-md constraints for mobile feeds, expanding to 3-columns for Dashboard.
- Error Handling: Robust fallback mechanisms for offline queuing and manual scanning lookups.

### UX Design Requirements

UX-DR1: The "One-Tap" RSVP with optimistic UI transitions and <200ms haptic-like scale-downs.
UX-DR2: Live Capacity Momentum via flowing progress bars mapped to real-time WebSocket data.
UX-DR3: Dashboard Expansion layout strategy (1-column on mobile -> 3-column on desktop).
UX-DR4: 3-tier button visual hierarchy strictly enforced (Primary, Secondary, Ghost).
UX-DR5: Digital Passport Ticket rendering using native OS wallet aesthetics and dynamic high-contrast QR codes.
UX-DR6: Contextual Capacity Bar changing color from Neutral -> Warning (75%) -> Critical (95%).
UX-DR7: Bottom-anchored Sheet overlays for event details (rather than route changes).
UX-DR8: Empty state designs specifically for Passport and Hubs views routing back to the feed.
UX-DR9: 8-point spacing grid and minimum 44x44px touch targets.
UX-DR10: Form validations on blur and "Unsaved Changes" warnings for destructive closures.

### FR Coverage Map

FR-ID-1: Epic 8 - Secure "Student Passport"
FR-ID-2: Epic 8 - Structured profile view
FR-CP-1: Epic 9 - Campus Pulse
FR-CP-2: Epic 9 - Event Cards
FR-RE-1: Epic 10 - Interactive Registration
FR-RE-2: Epic 10 - Live Capacity Indicators
FR-MO-1: Epic 11 - Distraction-Free Creator
FR-MO-2: Epic 11 - Live Attendee Data Table
FR-MO-3: Epic 12 - QR Entrance Scanner

### Epic List

### Epic 6: Design System & Component Library MVP
Establish the strict Tactile Utility design components: typography scale, neutral palette, whisper borders, and animation primitives.
**FRs covered:** None (Supports NFR-2, NFR-3, UX-DR4, UX-DR9)

### Epic 7: MVP UI Migration & Polish
Refactor all Epic 1-5 pages (Home, Dashboard) to match Tactile Utility standards, replacing any legacy feeds with the curated "Campus Pulse".
**FRs covered:** None (Supports UX-DR1, UX-DR2, UX-DR3, UX-DR6, UX-DR7, UX-DR8)

### Epic 13: Campus Hubs & Community Pages (Platform Expansion)
Introduce persistent, Notion-style public pages for university clubs and branches to host static resources and events.
**FRs covered:** FR-CP-1

### Epic 14: Structured Threaded Discussions (Platform Expansion)
Replace noisy comment sections with focused, professional Q&A boards attached to specific events.
**FRs covered:** FR-CP-2

### Epic 15: The Intelligent Discovery Algorithm (Platform Expansion)
Implement the personalized event ranking engine based on student course, branch, and follow behavior instead of mindless chronological feeds.
**FRs covered:** FR-CP-1

### Epic 8: The Student Passport & Identity Layer
Establish the core multi-tenant identity foundation with university domain validation and basic profile structures.
**FRs covered:** FR-ID-1, FR-ID-2

### Epic 9: Campus Pulse & Event Discovery
Build the mobile-first, categorized feed of campus activities with minimalist event cards.
**FRs covered:** FR-CP-1, FR-CP-2

### Epic 10: Frictionless Registration & Transaction State
Implement the "One-Tap" RSVP interaction, WebSocket-powered live capacity indicators, and strict pessimistic locking.
**FRs covered:** FR-RE-1, FR-RE-2

### Epic 11: Organizer Dashboard & Management
Deliver the Notion-style distraction-free block editor for event creation and the real-time attendee data table with CSV exports.
**FRs covered:** FR-MO-1, FR-MO-2

### Epic 12: Digital Passport & Venue Entry
Complete the event loop with dynamic QR code generation for the digital passport and the scan-only pipeline for organizers.
**FRs covered:** FR-MO-3

## Epic 6: Design System & Component Library MVP

Establish the strict Tactile Utility design components: typography scale, neutral palette, whisper borders, and animation primitives.

### Story 6.1: Initialize shadcn/ui & Tactile Utility Variables

As a developer,
I want to configure the global CSS and foundational generic components using the exact Design System palette,
So that the rest of the application has standard rules for styling to pull from.

**Acceptance Criteria:**

**Given** a fresh Next.js T3 scaffold
**When** the UI library is configured
**Then** `globals.css` reflects the warm neutral palette (`#f6f5f4`, `#31302e`)
**And** generic Shadcn core components (Buttons, Inputs, Cards) are overridden to feature 1px solid borders and specific radii (`rounded-2xl` max).

### Story 6.2: Core Animation Primitives & Accessibility

As a developer,
I want to implement the standard physics-based animation hooks (`tailwindcss-animate`),
So that all interactive elements across the platform have the signature "Tactile" feel and WCAG AA compliance.

**Acceptance Criteria:**

**Given** the configured design system
**When** interactive elements (Buttons) are pressed
**Then** they utilize an `active:scale-95` transform for a haptic bounce
**And** the codebase strictly provides `motion-safe` fallbacks and `aria-live` attributes to maintain accessibility standards.

### Story 6.3: Typography Implementation & Text Styles

As a designer/developer,
I want to implement the fully specified NotionInter typographic scale,
So that the platform achieves its precise compressions at display sizes and readable body styles.

**Acceptance Criteria:**

**Given** the configured design system
**When** text styles are rendered
**Then** the heading layers use `-2.125px` tracking at 64px relaxing progressively to normal at 16px
**And** the 4-weight system (400, 500, 600, 700) is strictly mapped to the Tailwind configurations.

### Story 6.4: The 3-Tier Button & Badge Interactive System

As a developer,
I want to create a strict hierarchy of interactive button components,
So that primary CTA paths are visibly prioritized over secondary or structural actions.

**Acceptance Criteria:**

**Given** the component library
**When** button components are used across the app
**Then** they follow a strict 3-tier system: Primary Notion Blue, Solid Translucent Gray (Secondary), and Ghost/Link styles
**And** Status badges render as full rounded pills (`9999px`) with tinted blue backgrounds.

### Story 6.5: Cards, Containers, & Semantic Shadows

As a developer,
I want to establish the standardized shadow and border aesthetic for cards and containers,
So that elements possess depth without heavy, dated "drop shadow" feels.

**Acceptance Criteria:**

**Given** the design system configuration
**When** an element requires elevation (e.g. modals, featured cards)
**Then** it uses carefully crafted multi-layer shadow stacks with sub-0.05 cumulative opacity
**And** standard element division relies exclusively on a `1px solid rgba(0,0,0,0.1)` "Whisper Border" layout rule.

## Epic 7: MVP UI Migration & Polish

Refactor all Epic 1-5 pages (Home, Dashboard) to match Tactile Utility standards, replacing any legacy feeds with the curated "Campus Pulse".

### Story 7.1: The 3-Tier Dashboard Expansion Layout

As a student or organizer on a desktop browser,
I want the mobile-first UI to intuitively expand into a comprehensive dashboard view,
So that no screen space is wasted when I use a larger device.

**Acceptance Criteria:**

**Given** the application is viewed on a device > 1024px width
**When** navigating the core feeds
**Then** the UI splits into a 3-column layout (Sidebar Nav, Central Feed locked to `max-w-lg`, Right Contextual/Analytics Panel)
**And** it seamlessly collapses back to a single column with a bottom-tab bar cleanly on mobile viewports.

### Story 7.2: Edge Case & Empty State Polish

As a user,
I want to see friendly, helpful empty states instead of blank broken pages when I have no tickets or events,
So that I am guided to take productive actions on the platform.

**Acceptance Criteria:**

**Given** I have no tickets in my Digital Passport or follow no Hubs
**When** I view those respective pages
**Then** I am greeted with a design-compliant Empty State graphic
**And** a primary Call-to-Action button routes me back to the Home Feed to discover events.

### Story 7.3: Campus Pulse & Event Card Design Refactor

As a visually-aware user,
I want the Campus Pulse layout and its event cards fully updated the "Tactile Utility" design system,
So that the aesthetic is cohesive, clean, and avoids generic "Instagram clone" UI.

**Acceptance Criteria:**

**Given** the current event feed view
**When** scrolling through the Campus Pulse
**Then** image cards have 12px top radii, and the containers use whisper borders
**And** typography (Times, Locations, Titles) aligns entirely with the NotionInter specifications.

### Story 7.4: Organizer Dashboard & Distraction-Free Refactor

As an event organizer,
I want my creation interfaces and analytics tables styled with the new warm minimalism,
So that managing an event doesn't feel like using a chaotic admin panel but a clean utility.

**Acceptance Criteria:**

**Given** the current Organizer dashboard and form components
**When** I load the dashboard views
**Then** inputs and block editor fields use 1px light gray borders without heavy shadows
**And** the metric views present large bold digits (e.g., "50 RSVPs") in NotionInter with understated warm gray subtitles.

### Story 7.5: Contextual Capacity Bar Visual Rewrite

As a student,
I want the progress bar on an event to visually communicate urgency using the new Design System color ramps,
So that I can scan availability faster without looking at the exact numerical percentages.

**Acceptance Criteria:**

**Given** the 3.2 capacity progress bar implementation
**When** the capacity exceeds 75% then 95%
**Then** the UI gracefully animates between Neutral to Orange (Warning) to Pink/Red (Critical)
**And** the bar components implement a clean `rounded-full` progress track without excessive gradients.

### Story 7.6: The "Digital Certificate & Skills Builder" Redesign

As a student,
I want my profile to act as a verified portfolio of attended events instead of just a ticket history,
So that I can use it as a credible credential for my active engagement in university life.

**Acceptance Criteria:**

**Given** the student Profile/Passport view
**When** a ticket is marked as "Attended" via QR Check-in
**Then** the ticket visually transforms into a permanent "Digital Certificate" card
**And** the UI aggregates these certificates visually, allowing me to share public proof of my skills/engagement.

### Story 7.7: Unified Bottom Navigation & Header Dynamics

As a mobile user,
I want a perfectly smooth tab-bar navigation experiencing zero layout shifts,
So that the web app functions indistinguishably from an iOS/Android native app.

**Acceptance Criteria:**

**Given** a mobile viewport viewport (<768px)
**When** navigating between Pulse, Hubs, Passport, and Profile
**Then** the persistent bottom tab bar routes instantaneously using Next.js layout retention
**And** the top header seamlessly updates its title without jarring page flashes.

## Epic 13: Campus Hubs & Community Pages (Platform Expansion)

Introduce persistent, Notion-style public pages for university clubs and branches to host static resources and events.

### Story 13.1: Club Public Profiles & Follow Mechanism

As a student,
I want to view a club's public page and click "Follow",
So that I can stay updated on their specific activities and resources.

**Acceptance Criteria:**

**Given** I am browsing the "Hubs" directory
**When** I click "Follow" on a club's card
**Then** the UI optimistically updates the follow state with a 200ms haptic feedback
**And** the database records the relationship, slightly boosting this club's events in my Pulse feed algorithm.

### Story 13.2: Static Resource & FAQ Blocks

As a club organizer,
I want to add static resources, links, and FAQs to my Campus Hub,
So that students have a permanent place to find our important materials instead of scrolling old events.

**Acceptance Criteria:**

**Given** I am an Organizer editing my Campus Hub
**When** I add a resource link or text block
**Then** it is saved to the database and instantly rendered on the public Campus Hub view
**And** it follows the strict design system "Whisper Borders" and neutral background formatting.

## Epic 14: Structured Threaded Discussions (Platform Expansion)

Replace noisy comment sections with focused, professional Q&A boards attached to specific events.

### Story 14.1: Event Q&A Board Implementation

As an attendee,
I want to ask structured questions directly on an event's page,
So that my questions (and the organizer's answers) are visible and permanently helpful to others.

**Acceptance Criteria:**

**Given** I am viewing the Event Details bottom-sheet
**When** I submit a question in the "Discussions" tab
**Then** it appears as a distinct Thread block in the UI
**And** other students can read it without it getting lost in an infinite "chat" stream.

### Story 14.2: Organizer Thread Resolution & Highlights

As an event organizer,
I want to answer questions and pin/highlight the most important clarifications,
So that I can effectively manage attendees' expectations without repeating myself.

**Acceptance Criteria:**

**Given** I am an Organizer managing my event
**When** I reply to a student's thread
**Then** my reply gets an "Organizer" badge for strict authority validation
**And** I can toggle a "Pinned" state to bump the Q&A block securely to the top of the board.

## Epic 15: The Intelligent Discovery Algorithm (Platform Expansion)

Implement the personalized event ranking engine based on student course, branch, and follow behavior instead of mindless chronological feeds.

### Story 15.1: Database Scoring Weight Adjustments

As the system algorithm,
I want to calculate an event's relevance score against a specific student's profile,
So that the highest priority events are surfaced first.

**Acceptance Criteria:**

**Given** a student is viewing the Campus Pulse feed
**When** the database fetches the active events
**Then** it applies the scoring weight: High (Course Match), High (Selected Domains), Medium (Followed Club)
**And** returns a sorted array ordering the most relevant events at the absolute top of the feed grid.

### Story 15.2: The "Happening This Week" Carousel

As a student,
I want highly urgent events to be visually separated from general browsing cards,
So that I don't accidentally miss a hackathon deadline.

**Acceptance Criteria:**

**Given** there are events occurring within the next 7 days
**When** I load the Campus Pulse
**Then** a dedicated horizontal-scrolling section ("Happening This Week") appears at the very top
**And** these urgent cards prioritize Date/Time visibility above all other metadata.

## Epic 8: The Student Passport & Identity Layer

Establish the core multi-tenant identity foundation with university domain validation and basic profile structures.

### Story 8.1: University Domain Authentication

As a student,
I want to authenticate securely using my university email (@jecrc.edu),
So that my identity is verified instantly without filling out manual registration forms.

**Acceptance Criteria:**

**Given** I am an unauthenticated user on the login screen
**When** I enter a valid `@jecrc.edu` email address and authenticate via OAuth/Magic Link
**Then** my account is created or retrieved in the database
**And** I am securely logged into the platform.

**Given** I am an unauthenticated user
**When** I attempt to authenticate with a non-university email (e.g., `@gmail.com`)
**Then** the authentication is rejected
**And** I see a clear 'University Email Required' error message.

### Story 8.2: The Digital Passport Profile View

As a student,
I want to view my Digital Passport containing my basic details (PRN, Branch, Grad Year),
So that I know my identity is correctly anchored to the platform for future event registrations.

**Acceptance Criteria:**

**Given** I am an authenticated student
**When** I navigate to the Profile/Passport tab
**Then** I see a clean, structured view of my identity details
**And** my email, PRN (derived/entered once), and Branch are prominently displayed using the Tactile Utility design aesthetics.

## Epic 9: Campus Pulse & Event Discovery

Build the mobile-first, categorized feed of campus activities with minimalist event cards.

### Story 9.1: The Campus Pulse Mobile Feed

As a student,
I want to view a chronological feed of upcoming campus events,
So that I can easily discover activities without infinite scrolling algorithms.

**Acceptance Criteria:**

**Given** I am an authenticated student
**When** I navigate to the Home tab
**Then** I see a vertical, mobile-optimized list (max-w-md constraint) of active events
**And** the layout features appropriate 8-point grid spacing and Tactile Utility neutral colors.

### Story 9.2: Minimalist Event Cards

As a student,
I want to see critical event metadata directly on the pulse feed cards,
So that I can evaluate an event's relevance instantly without opening a new page.

**Acceptance Criteria:**

**Given** there are active events in the Campus Pulse feed
**When** I view an event card
**Then** the card displays the Event Title, Club Avatar, Time, and Location
**And** the UI uses whisper borders (`1px solid rgba(0,0,0,0.1)`) and high-contrast typography.

### Story 9.3: Bottom Sheet Event Details

As a student,
I want to tap an event card to read full details without losing my place in the feed,
So that my browsing experience is frictionless and native-feeling.

**Acceptance Criteria:**

**Given** I am viewing the Campus Pulse feed
**When** I tap an event card's expanded area
**Then** a slide-up bottom sheet appears containing the full event description and poster
**And** I can dismiss the sheet via swiping or closing it to return exactly where I was in the feed.

## Epic 10: Frictionless Registration & Transaction State

Implement the "One-Tap" RSVP interaction, WebSocket-powered live capacity indicators, and strict pessimistic locking.

### Story 10.1: "One-Tap" RSVP with Locking State

As a student,
I want to RSVP to an event with a single tap,
So that I can secure my spot without filling out confirmation forms.

**Acceptance Criteria:**

**Given** I am viewing an event card with available capacity
**When** I tap the primary "RSVP" button
**Then** the button visually transitions to a "Locking..." state immediately
**And** upon database success, it shifts to a green "✓ Secured" state with a sub-200ms scale-down micro-interaction.

### Story 10.2: Live Capacity Momentum Progress Bar

As a student,
I want to see a live visual indicator of how full an event is,
So that I feel urgency and trust that the capacity metric is accurate.

**Acceptance Criteria:**

**Given** I am viewing an event card
**When** the event capacity changes (due to RSVPs hitting the database)
**Then** a horizontal progress bar updates smoothly via WebSockets
**And** the color shifts from Neutral to Warning at 75% full, and Critical (Red) at 95% full.

### Story 10.3: Database Pessimistic Locking

As a standard user (handled by the system),
I want the database to strictly manage concurrent RSVPs,
So that the event never exceeds its maximum capacity even if 500 students tap RSVP simultaneously.

**Acceptance Criteria:**

**Given** an event is 1 spot away from maximum capacity
**When** multiple users tap RSVP at the exact same millisecond
**Then** the database pessimistic lock ensures only one transaction succeeds
**And** the failed users receive a graceful "Event is now full / Added to Waitlist" UI state.

## Epic 11: Organizer Dashboard & Management

Deliver the Notion-style distraction-free block editor for event creation and the real-time attendee data table with CSV exports.

### Story 11.1: Distraction-Free Block Editor

As a club organizer,
I want to create events using a clean, text-focused interface,
So that I can draft event descriptions rapidly without fighting complex layout tools.

**Acceptance Criteria:**

**Given** I have Organizer privileges
**When** I navigate to 'Create New Event'
**Then** I am presented with a minimalist, Notion-style text editor
**And** I can set the Title, Description, Date, Time, Location, and Max Capacity in a single, flowing document structure.

### Story 11.2: Real-time Attendee Heatmap Table

As a club organizer,
I want to view a live table of students who have RSVP'd to my event,
So that I can monitor demographic breakdowns (Course/Year) dynamically.

**Acceptance Criteria:**

**Given** I am an Organizer viewing an active event dashboard
**When** students RSVP to the event
**Then** the attendee data table auto-updates in real-time
**And** I can sort the table columns by Name, PRN, Branch, or Time of RSVP.

### Story 11.3: 1-Click CSV Export

As a club organizer,
I want to download my attendee list instantly,
So that I can provide the physical gate security with an accurate list for check-in.

**Acceptance Criteria:**

**Given** I am viewing the attendee data table for an event
**When** I click the "Export to CSV" secondary button
**Then** a formatted CSV downloads immediately containing the finalized list of confirmed attendees.

## Epic 12: Digital Passport & Venue Entry

Complete the event loop with dynamic QR code generation for the digital passport and the scan-only pipeline for organizers.

### Story 12.1: Dynamic Digital Ticket QR

As a student,
I want my secured event tickets to generate a high-contrast QR code,
So that I can use it for incredibly fast, offline-resilient venue entry.

**Acceptance Criteria:**

**Given** I have a "✓ Secured" ticket in my Passport
**When** I tap to expand the ticket for entry
**Then** a dynamic QR code containing an encrypted payload of my Student ID and Event Ticket ID is rendered
**And** the UI maximizes screen brightness (if supported by the browser API) for easy scanning.

### Story 12.2: Organizer Scan-Only Pipeline

As an event organizer,
I want a dedicated interface to rapidly scan student QR codes at the door,
So that I can process a line of 300 students without manual typing or self-check-in abuse.

**Acceptance Criteria:**

**Given** I am an Organizer in "Scan Mode" at an active event
**When** I scan a valid student QR code
**Then** the system instantly marks that ticket as "Redeemed/Attended" in the database
**And** the UI provides large, clear visual success framing (Full green screen flash) so I can immediately scan the next person.

### Story 12.3: Manual Entry Fallback

As an event organizer,
I want the ability to manually search and check-in a student if their screen is broken or the QR fails,
So that the physical line doesn't halt due to technical glitches.

**Acceptance Criteria:**

**Given** I am an Organizer in "Scan Mode" at a venue
**When** a student's QR code cannot be scanned
**Then** I can use a search input to find their PRN/Name manually
**And** I can click "Force Check-In" to mark them as Attended in the database.

---

## Epic 13: Campus Hubs & Community Pages (Platform Expansion)

### Story 13.1: Hub Schema & Notion-Style Page Rendering
**Description:** Implement database schema for `CampusHub` and create a dynamic renderer supporting simple markdown/rich text.
**Acceptance Criteria:**
- Create `Hub` model linked to `User` (owners/admins) and `Events`.
- Render a `/hubs/[slug]` public page using a Notion-like typography hierarchy (H1, H2, rich text blocks).
- Ensure DB-level constraints for unique slugs per university domain.

### Story 13.2: Hub Follow/Subscribe Mechanism
**Description:** Allow authenticated users to "follow" a Hub to populate their discovery algorithm.
**Acceptance Criteria:**
- Implement `followHub` tRPC mutation.
- Show optimistic UI toggle (Follow/Unfollow) using the active state pattern (`bg-black text-white` vs `bg-white/80 text-black border`).
- Sync follower count live via WebSockets.

---

## Epic 14: Structured Threaded Discussions (Platform Expansion)

### Story 14.1: The Q&A Sub-Panel Layer
**Description:** Create a threaded Q&A section beneath Event Details mimicking a professional forum rather than a social media comment section.
**Acceptance Criteria:**
- Build a hierarchical comment schema (`Thread`, `Reply`).
- Upvote/Downvote interactions on a single thread.
- Collapse replies deeper than 1 level by default.
- Require authenticated "Passport" identity to post.

### Story 14.2: Thread Pinning & Organizer Moderation
**Description:** Event organizers need the ability to pin important Q&A threads and mute abusive ones.
**Acceptance Criteria:**
- Implement `pinThread` and `deleteThread` tRPC mutations guarded by Organizer role checks.
- Pinned threads appear at the very top of the Q&A list with a distinct visual badge.

---

## Epic 15: The Intelligent Discovery Algorithm (Platform Expansion)

### Story 15.1: Algorithm Weighting Engine
**Description:** Replace chronological event lists with a ranked feed based on user context (branch, year, followed hubs).
**Acceptance Criteria:**
- Create a backend scoring algorithm on the `getEvents` query.
- Factor 1: Hubs the user follows (+3 points).
- Factor 2: Events matching the user's major/branch (+2 points).
- Factor 3: Events with high RSVP velocity (+1 point).

### Story 15.2: Discovery Feed Integration & Infinite Scroll
**Description:** Connect the scoring engine to the frontend UI with performant cursor-based pagination.
**Acceptance Criteria:**
- Implement tRPC `useInfiniteQuery` for the ranked discovery list.
- Add IntersectionObserver to auto-fetch the next page.
- Show the previously created skeleton loaders while fetching the next ranked batch.

## Epic {{N}}: {{epic_title_N}}

{{epic_goal_N}}

<!-- Repeat for each story (M = 1, 2, 3...) within epic N -->

### Story {{N}}.{{M}}: {{story_title_N_M}}

As a {{user_type}},
I want {{capability}},
So that {{value_benefit}}.

**Acceptance Criteria:**

<!-- for each AC on this story -->

**Given** {{precondition}}
**When** {{action}}
**Then** {{expected_outcome}}
**And** {{additional_criteria}}

<!-- End story repeat -->