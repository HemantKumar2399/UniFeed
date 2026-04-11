# Story 1.1: Project Initialization & Base Theme Shell

Status: done

## Story

As a Developer,
I want to initialize the T3 Stack project with Prisma, NextAuth, and tRPC,
So that we have a type-safe foundation for the campus platform.

## Acceptance Criteria

1. **Given** a new project requirement
   **When** the project is scaffolded using T3 Stack
   **Then** Prisma is configured for PostgreSQL, and NextAuth is ready for implementation.
2. **And When** the base design system tokens (colors, fonts) are added
   **Then** the global layout uses the "functional minimalist" aesthetic.

## Tasks / Subtasks

- [x] Task 1: Scaffold T3 Project
  - [x] Initialize with `create-t3-app`.
  - [x] Configure Prisma with PostgreSQL provider.
- [x] Task 2: Base Design System
  - [x] Set up typography (Outfit/Inter).
  - [x] Define functional color palette (Noir/Pure white).
- [x] Task 3: Setup Local Developer DX
  - [x] Create `setup-local.sh` for one-tap onboarding.

## Dev Notes

- Project uses Next.js 15 (App Router).
- Design system follows the "Functional Social" philosophy—high contrast, zero noise.

## Dev Agent Record
- Agent: Antigravity

### Completion Notes
✅ Project initialized with T3 Stack.
✅ Design system core configured in `tailwind.config.ts` and `globals.css`.
✅ setup-local.sh script created and verified.
