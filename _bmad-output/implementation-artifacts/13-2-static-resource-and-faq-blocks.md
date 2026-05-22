# Story 13.2: Static Resource & FAQ Blocks

Status: done
Depends on: [Club Public Profiles & Follow Mechanism](https://github.com/HemantKumar822/UniFeed/issues/67)


## Epic 13: Campus Hubs & Community Pages (Platform Expansion)
Introduce persistent, Notion-style public pages for university clubs and branches to host static resources and events.

## Story
As a club organizer,
I want to add static resources, links, and FAQs to my Campus Hub,
So that students have a permanent place to find our important materials instead of scrolling old events.

## Acceptance Criteria
- **Given** I am an Organizer editing my Campus Hub
- **When** I add a resource link or text block
- **Then** it is saved to the database and instantly rendered on the public Campus Hub view
- **And** it follows the strict design system "Whisper Borders" and neutral background formatting.

## Implementation Notes
- Re-use the Notion-style distraction-free block editor components for adding content.
- Update the Prisma schema to support Hub resources/blocks.
- Ensure styling adheres to the 1px solid rgba(0,0,0,0.1) 'Whisper Border' and the warm neutral palette.


## Tasks / Subtasks

- [x] Analyze acceptance criteria
- [x] Implement core functionality
- [x] Write unit/integration tests
- [x] Review against Tactile Utility guidelines and existing components

### Review Findings

- [x] [Review][Decision] Define organizer-to-club ownership authorization model for Hub editing endpoints — resolved with explicit membership ownership: organizers can edit hubs only when they are OWNER/EDITOR members of that club [src/server/api/routers/hub.ts:132]
- [x] [Review][Patch] Remove duplicate `hubRouter` import and duplicate `hub` key in root router registration [src/server/api/root.ts:2]

## Dev Agent Record

### Agent Model Used

GPT-5.3-Codex

### Debug Log References

- Extended Prisma schema with `HubBlock` model and `HubBlockType` enum; added migration for persistence.
- Added explicit `ClubMembership` model and role-based hub edit authorization (`OWNER` / `EDITOR`).
- Added hub block normalization utility and tests for trimming/sanitization and ordering.
- Extended `hub` tRPC router with public hub content query, organizer hub listing, and block save mutation.
- Built organizer-facing `/dashboard/hubs` editor with Notion-style block workflow and preview.
- Added public `/hubs/[clubId]` page to instantly render saved resources/FAQ blocks with whisper-border styling.

### Completion Notes List

- Organizers can add and save static text/resource/FAQ blocks for hubs, persisted in database tables.
- Public hub pages render saved content immediately from database reads.
- Visual presentation follows neutral palette and 1px whisper-border treatment.
- Hub editor access is now constrained by explicit club membership roles instead of inferred ownership.
- Seed script now populates club memberships and hub content to make organizer/public hub flows demo-ready.
- Added focused unit tests and lint validation for the block normalization and related code paths.

### File List

- prisma/schema.prisma
- prisma/migrations/20260417101500_add_hub_block_model/migration.sql
- prisma/migrations/20260417123000_add_club_membership_model/migration.sql
- prisma/seed.ts
- src/features/hubs/hub-blocks.utils.ts
- src/features/hubs/hub-blocks.utils.test.ts
- src/server/api/routers/hub.ts
- src/features/hubs/components/HubBlocksRenderer.tsx
- src/app/dashboard/hubs/page.tsx
- src/app/hubs/[clubId]/page.tsx
- src/components/layout/premium/PremiumOrganizerShell.tsx

## Change Log

- 2026-04-17: Implemented static resource/FAQ block editing + persistence + public hub rendering and moved story to review.
- 2026-04-17: Addressed code review decision and patch findings, then moved story to done.
- 2026-04-17: Upgraded hub edit authorization to explicit membership roles and seeded end-to-end hub demo data.
