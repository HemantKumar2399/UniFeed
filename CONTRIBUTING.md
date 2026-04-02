# Contributing to UniFeed

We use a strict GitHub-centric CI/CD workflow combined with local AI agents (BMad Workflow).

## Branching Strategy

All development requires creating a branch from `main`:
- Features: `feature/123-ticket-name`
- Bug Fixes: `fix/456-bug-description`
- Chores/Docs: `chore/docs-update`

## Commit Conventions

We strictly use **Conventional Commits**:
- `feat: added digital passport scanner component`
- `fix: resolved pessimistic lock failure on RSVP`
- `docs: updated UX specifications`
- `style: unified card radius tokens`
- `refactor: extracted ticket UI into compound component`
- `test: added e2e flows for checkout`

## Working With AI generated Stories
1. We automate the addition of stories via `/scripts/sync-issues.sh`.
2. Find an issue on the GitHub Kanban.
3. Assign it to yourself.
4. Execute `bmad-dev-story` locally passing the story markdown, or code it yourself.

## Enterprise Coding Standards & Rules

To maintain high quality across the codebase and ensure AI agents can safely modify it alongside humans, adhere strictly to the following engineering paradigms:

### 1. Architecture & Tech Stack Rules
* **T3 Stack Strictness:** We use Next.js App Router, Prisma ORM, tRPC, and TailwindCSS. Do not introduce new massive libraries (like Redux or styled-components) without a formal architecture review.
* **Component Boundaries:** 
  * `src/components/ui/`: Strictly reserved for zero-logic, generic `shadcn/ui` components ONLY.
  * `src/features/`: Complex domain logic mapped strictly to feature folders (e.g. `src/features/auth/`, `src/features/feed/`).
* **Server-First Execution:** Default all React components to Server Components (`RSC`). Only add `"use client"` at the precise subtree where interactivity (e.g., `useState`, `onClick`) is necessary.

### 2. Database & Data Fetching
* **Database Naming:** DB Schemas use `snake_case` (e.g., `event_registrations`). Map them to `camelCase` in code via Prisma's `@@map` and `@map`.
* **State Management:** Prioritize URL State (e.g., URL parameters via `useSearchParams()`) over React State (`useState`) for dashboard filters so states are naturally shareable and persistent.
* **Transactions & Concurrency:** Any highly-concurrent database mutations (like RSVPs to a limited-capacity event) MUST use pessimistic locking or serialized queue strategies to prevent overselling.

### 3. UX, Accessibility & Styling
* **Tailwind & Variables:** Do not hardcode raw hex values in Tailwind (`className="text-[#123123]"`). Always use semantic CSS variables mapped in `tailwind.config.ts` (e.g., `text-primary`, `bg-background`).
* **Micro-Interactions.** Use `active:scale-95` on interactive buttons to ensure a tactile, native-app feel. Use `motion-safe` utilities for transitions.
* **Accessibility (a11y):** Wait states and errors MUST be announced to screen readers. Use `aria-live="polite"` for inline feedback, and ensure touch targets on mobile meet a 44x44px minimum.

### 4. Zero Hardcoding Policy
* Every API key, endpoint, environment URL, feature flag, or dynamic UI string MUST be decoupled into a configuration file, `constants.ts`, or fetched dynamically. No magic numbers or hardcoded secrets.

### 5. Defensive Programming
* **Input Validation:** All server boundaries (API routes, Server Actions, tRPC mutations) MUST use Zod to validate input payloads before processing.
* **Graceful Failure:** Treat failure as a valid state. Catch errors explicitly and deliver friendly fallbacks using Next.js `error.tsx` boundary files. Never trust the client state.

## Pull Requests
1. Fill out the mandatory PR template checkboxes completely.
2. Ensure `npm run lint` and `npm run build` pass successfully.
3. At least 1 code review approval is required before merging to `main`.
