---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments: ['prd.md', 'campus-platform-idea.md', 'brainstorming-session-20260401-1637.md', 'ux-design-specification.md']
workflowType: 'architecture'
project_name: 'Campus Platform'
user_name: 'Hemant'
date: '2026-04-15'
lastStep: 8
status: 'complete'
completedAt: '2026-04-15'
---

# Architecture Decision Document

> Historical proposal from April 2026. For implemented behavior and deployment limits, use [Current architecture](current.md) and [Implementation status](../implementation-status.md). Completion labels in this proposal do not certify shipped features.

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
The application demands a multi-tenant identity foundation (university boundaries via email validation), high-fidelity media processing (ephemeral stories and multi-step uploads), high-availability transactional workflows ("One-Tap" registration), and real-time visualization (live capacity bars and organizer dashboards). The recent pivot to a **"Tactile Utility"** design mandates strict adherence to Optimistic UI/Pessimistic Locking states for RSVPs, dynamic QR code rendering for Digital Passports, and a scan-only pipeline for event check-ins. A distraction-free block editor (Notion-style) is required for Organizers. Architecturally, this requires strong data integrity mixed with scalable media delivery and WebSocket coordination, while strictly supporting "Mobile-First" rendering behavior for the student experience and "Dashboard Expansion" for organizers.

**Non-Functional Requirements:**
Architecture must prioritize strict Row-Level Security (RLS) for tenant isolation, high concurrency (500+ simultaneous transactions), extremely low latency (sub-200ms visual interaction responses), and a responsive Web/mobile-first approach ("Dashboard Expansion" up to 3 columns on desktop, `max-w-md` constraints on mobile feeds). The UX spec mandates WCAG AA accessibility compliance, fluid **mobile-native physics** (spring physics, active scale-downs), and robust client-side error handling (e.g., graceful degradation of the QR checking pipeline). The aesthetic relies on warm neutrals (`#f6f5f4`, `#31302e`), near-black text, and "whisper borders" (`1px solid rgba(0,0,0,0.1)`).

**Scale & Complexity:**
The platform bridges consumer-grade social feel with B2B SaaS multi-tenancy, requiring "app-like" performance from a web client.

- Primary domain: Mobile-First Full-Stack Web Application (Tactile Utility)
- Complexity level: High
- Estimated architectural components: Auth, Tenancy, Media Storage, Campus Pulse Feed, Transactions (RSVPs with locks), Real-time Sync, Digital Passport/QR Subsystem, Block Editor, Analytics Dashboards.

### Technical Constraints & Dependencies

- Development starts locally using PostgreSQL and Prisma before migrating to managed Supabase.
- Codebase must adhere to Feature-First Vertical Slicing with strict file size limitations (~200 LOC per file).
- Use of the T3 Stack (Next.js App Router, Prisma, Tailwind, tRPC) mixed with `shadcn/ui` to guarantee strict control over accessibility and presentation.
- UI layer mandates the use of Tailwind CSS and `tailwindcss-animate` for physics-based micro-interactions (`active:scale-95`, etc.).
- Strict enforcement of `next/image` optimization for network responsiveness.

### Cross-Cutting Concerns Identified

- **Multitenancy & RLS:** Enforcing university boundaries (`@jecrc.edu`) on every database query.
- **Real-Time State:** Syncing capacity and attendee metrics concurrently using a "Locking" UI buffer to prevent data races during RSVPs.
- **Component & Layout Rigidity:** Strict adherence to the 8-point typography grid, touch target thresholds (44x44px), and the responsive "Dashboard Expansion" semantic behavior.
- **Error Handling & Offline Resilience:** Providing robust fallback mechanisms when WebSockets/optimistic queries fail, paired with manual lookup tables for broken venue QR scans.

## Starter Template Evaluation

### Primary Technology Domain

Mobile-First Full-Stack Web App based on project requirements analysis and UX design specification.

### Starter Options Considered

1. **`create-next-app -e with-supabase`**: The official Supabase template. Great for connecting directly to Supabase immediately, but relies heavily on Supabase's specific client libraries (`@supabase/ssr`) and doesn't natively bootstrap Prisma for local-first schema migrations.
2. **`create-t3-app`**: A highly opinionated, community-standard scaffolding tool that natively bundles Next.js, Prisma, and Tailwind CSS. It perfectly supports our local-PostgreSQL-first, Supabase-later strategy.

### Selected Starter: create-t3-app

**Rationale for Selection:**
We selected `create-t3-app` because it immediately provides the exact triad of technologies. Next.js (App Router) supports the complex layouts required by the Dashboard Expansion UX direction. Tailwind CSS allows us to implement the strict 8-point design grid and `motion-safe` utilities. Prisma handles local PostgreSQL development before we migrate to Supabase. Coupled with `npx shadcn-ui@latest init`, we get a complete toolkit for high-fidelity UI.

**Initialization Command:**

```bash
npx create-t3-app@latest ./ \
  --appRouter \
  --tailwind \
  --prisma \
  --trpc \
  --dbProvider postgres \
  --noGit
```

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- **Authentication Strategy**: NextAuth.js (v5 beta) using Prisma adapters.
- **API & Real-time Layer**: tRPC with WebSocket subscriptions for live capacity syncing combined with strict Pessimistic "Locking" states prior to mutation completion.
- **Database Tenancy**: Prisma ORM combined with PostgreSQL Row-Level Security for multi-tenancy.
- **UI Component System**: `shadcn/ui` implemented on top of Tailwind CSS for full component ownership and native accessibility (Radix UI).

**Important Decisions (Shape Architecture):**
- **Client State Management**: Zustand (v5.0) for managing localized state (like UI toggles and filter states) independently of the complex data fetching layer.

**Deferred Decisions (Post-MVP):**
- Offline Optimistic Action Queuing (deferred to prioritize MVP execution velocity, explicitly requiring connectivity for registration actions).

### Data Architecture
- **Database**: PostgreSQL
- **ORM**: Prisma. 
- **Rationale**: Prisma handles all typing automatically. We will configure database-level Row-Level Security (RLS) to enforce our "Private World" constraint on the data-plane itself.

### Authentication & Security
- **Auth Provider**: NextAuth.js (v5 Beta)
- **Rationale**: Best choice to meet our local-first constraint. Avoids premature vendor lock-in to Supabase Auth while allowing precise, custom validation (strictly enforcing `@jecrc.edu` domains).

### API & Communication Patterns
- **Protocol**: tRPC paired with traditional HTTP endpoints + tRPC-WebSocket server integrations.
- **Interaction Syncing**: UI uses a "Locking" buffer. An RSVP triggers an optimistic "Locking..." state, fires the tRPC mutation, and upon success changes to "Secured" while the WebSocket subscription globally increments the Capacity Bar.

### Frontend Architecture
- **Component Layer**: `shadcn/ui` configured natively into the app, avoiding immutable dependency conflicts.
- **Styling**: Tailwind CSS utilizing strict `max-w-md`/`max-w-xl` constraints on mobile feeds, expanding to a 3-column layout via CSS Grid/Flexbox boundaries on Desktop. **Animations**: Relying on built-in native physics and `tailwindcss-animate` for "One-Tap" responses and progress bar easing.
- **State Management**: Zustand for UI toggles; tRPC React Query hooks for Server State. Optimistic UI is wrapped with a "Locking" buffer state.
- **Content Creation**: A distraction-free block editor implementation for organizers.

### Infrastructure & Deployment
- **Hosting Strategy**: Local development using a managed local PostgreSQL instance. Vercel for frontend. Migration to Supabase for the managed database capability.

### Decision Impact Analysis

**Implementation Sequence:**
1. Next.js Init, Database Setup, and NextAuth Integration + `shadcn-ui` init.
2. Tenant Boundary System: University Domain verification logic.
3. Base UI Layouts (Dashboard Expansion shell).
4. tRPC API routing and generic feed views.
5. WebSocket Real-time registration pathways & Digital Passport QR generation.

## Implementation Patterns & Consistency Rules

### Naming Patterns

**Database Naming Conventions:**
*   **Tables:** Singular `snake_case` (e.g., `user`, `event`).
*   **Columns:** `snake_case` (e.g., `created_at`, `university_id`).
*   **Prisma Mapping:** Use `@@map("table_name")` and `@map("column_name")` to allow `camelCase` in JS.

**API Naming Conventions (tRPC):**
*   **Router Namespaces:** Singular, domain-based (e.g., `eventRouter`).
*   **Procedure Naming:** Action-first camelCase (e.g., `getById`, `create`).

**Code Naming Conventions:**
*   **React Components:** `PascalCase.tsx` (e.g., `CapacityBar.tsx`).
*   **Types/Interfaces:** Prefix with `T` for explicitly exported shared types (e.g., `TEventPayload`).

### Structure Patterns

**File Structure Patterns:**
*   **Feature Slicing:** Isolate domains strictly (e.g., `src/features/events/components/...`). 
*   **Shared UI:** Generic atoms (Buttons, Inputs) from `shadcn` go purely in `src/components/ui/`.

### Process Patterns

**UX, Feedback & Tactile Utility Patterns:**
*   **Design Language:** Notion-inspired Tactile Utility. Warm neutral palettes (`#f6f5f4`, `#31302e`), near-black text (`rgba(0,0,0,0.95)`), and "whisper borders" (`1px solid rgba(0,0,0,0.1)`).
*   **Typography:** `Inter` or `Geist`, aggressively compressed at display sizes (-2.125px) and relaxed body copy.
*   **Button Hierarchy:** Strict 3-tier: Primary (Action in Blue/Indigo), Secondary (Outline), Ghost (Tertiary).
*   **Success Feedback:** Inline state changes (e.g. Button turns green and smoothly scales). `Toast` is NOT used for primary success loops (like RSVPs).
*   **Error Feedback:** Bottom-anchored `Toast` for network errors.
*   **Loading States:** Pulsing Skeletons mimicking real card dimensions; sub-200ms visual micro-interactions (`active:scale-95`).

**Accessibility Patterns:**
*   **Motion:** Use `motion-safe` Tailwind utilities for all animations.
*   **Screen Readers:** Dynamic async states (like a successful RSVP) must use `aria-live="polite"`.
*   **Touch Targets:** Minimum `44x44px` physical hit areas on all interactive elements.

**Error Handling Patterns:**
*   **API Layer:** Never leak database errors. Always catch and throw structured `TRPCError`.
*   **Client Layer:** React Error Boundaries at the feature level.

## Project Structure & Boundaries

### Complete Project Directory Structure

```text
campus-platform/
├── README.md
├── package.json
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── env.mjs                     # T3 type-safe environment variables
├── .env                        # Local postgres connection
├── prisma/
│   └── schema.prisma           # Single source of truth for DB models
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/
│   │   ├── (public)/           # Public facing pages (Login)
│   │   ├── (feed)/             # Main student feed (Campus Pulse - max-w-md constraint)
│   │   ├── (admin)/            # Protected organizer dashboard
│   │   ├── globals.css         # Restricted to core CSS variables (Tactile Utility colors)
│   │   └── layout.tsx          # Dashboard Expansion Layout Root
│   ├── components/             # Dumb, shared presentation components
│   │   └── ui/                 # shadcn/ui components (Buttons, inputs, modals)
│   ├── features/               # ⚠️ VERTICAL FEATURE SLICES
│   │   ├── identity/           # 'One-Tap' Passport logic & QR generation
│   │   ├── feed/               # Event algorithms, Campus Pulse UI & animations
│   │   ├── registration/       # Transactional logic & Live Capacity Bars
│   │   ├── block-editor/       # Distraction-free Notion-style editor
│   │   └── admin/              # Organizer Heatmaps & CSV Export
│   ├── server/                 # Strict Server-Side Code
│   │   ├── api/routers/        # Feature-specific tRPC routers
│   │   ├── auth.ts             # NextAuth Provider Configurations
│   │   └── db.ts               # Prisma Client Instantiation
│   ├── trpc/                   # tRPC Client Setup & WebSocket hooks
│   └── lib/                    # Shared pure functions (e.g., QR generators)
```

### Architectural Boundaries

**Component Boundaries:**
*   `src/app/*` only handles layout, routing, and checking device capability.
*   `src/components/ui/` components are strictly styling wrappers with zero business logic.
*   `src/features/*` binds the dumb standard components with tRPC react-query logic.

**Service & Data Boundaries:**
*   All Prisma database calls are strictly isolated to `src/server/api/routers/*`. 
*   No cross-fetching: The Client can only fetch data by asking tRPC.

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
High compatibility. T3 Stack (Next.js + Prisma + tRPC + Tailwind) + `shadcn/ui` merges our architectural need for type-safety and backend capability with total styling and accessibility control on the frontend.

**Structure Alignment:**
The Feature-First Structure inherently supports the "Dashboard vs Mobile" layout direction and complex async locking sequences inside specific vertical domains.

### Requirements Coverage Validation ✅

**Epic/Feature Coverage:**
- *One-Tap Identity & Discover:* Covered via NextAuth, `feed` slices, and optimistic UI transitions.
- *Live Registration:* Covered via tRPC WebSockets and Zustand.
- *Digital Passport:* Handled via isolated Next.js views and specific manual-fallback search endpoints.
- *Organizer Dashboard:* Covered via expanded layouts (Direction B).

**Non-Functional Requirements Coverage:**
- *Multi-tenancy:* PostgreSQL RLS.
- *Latency / App Feel:* Addressed using sub-200ms scale animations, Skeleton loaders, and local Zustand states.
- *WCAG AA Accessibility:* Ensured via `shadcn/ui` Radix primitives and `motion-safe`/`aria-live` enforcement.

### Implementation Readiness Validation ✅

**Decision Completeness:** Complete coverage of frontend frameworks, database strategies, auth pipelines, and UI interaction states.
**Structure Completeness:** Explicit directory mapping established mapping exactly to the UX direction.
**Pattern Completeness:** Error handling, visual feedback, accessibility markers, and naming conventions fully defined.

### Architecture Completeness Checklist
- [x] Project context updated with UX specifications
- [x] Critical decisions documented with UI integrations (`shadcn/ui`)
- [x] Implementation & Accessibility patterns established
- [x] Directory structure mapping completed
- [x] Ready for final Epic/Story breakdowns

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION
**Confidence Level:** HIGH based on validation results and use of the robust T3 + Shadcn ecosystem constraints.

**Key Strengths:**
- Strict adherence to DB-level multi-tenancy rules prevents catastrophic university data leaks.
- tRPC combined with pessimistic "locking" states prevents edge-case double-booking errors typical in event platforms.

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented.
- Apply `motion-safe` and `aria-live` exactly as detailed in the patterns rules.
- Respect project structure and boundaries.
- Refer to this document and the `ux-design-specification.md` for visual implementations.

**First Implementation Priority:**
```bash
npx create-t3-app@latest ./ --appRouter --tailwind --prisma --trpc --dbProvider postgres --noGit
npx shadcn-ui@latest init
```
