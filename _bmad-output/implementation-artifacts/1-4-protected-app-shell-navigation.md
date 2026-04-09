# Story 1.4: Protected App Shell & Navigation

Status: done

## Story

As a logged-in Student,
I want a persistent protected navigation shell,
So that I can seamlessly move between the Home (Local), Search, Global, and Profile tabs.

## Dependencies
- Story 1.1
- Story 1.3

## Acceptance Criteria

1. **Given** an authenticated session
   **When** the user accesses the protected route
  **Then** persistent navigation is visible (bottom nav on mobile, sidebar nav on desktop)
2. **And** clicking the 4 tabs updates the active route state (even if the pages themselves are placeholders).

## Tasks / Subtasks

- [x] Task 1: Protected Route Group (AC: 1)
  - [x] Create a Next.js `app/(protected)/layout.tsx` to wrap the authenticated dashboard.
  - [x] Validate NextAuth session inside the layout; redirect unauthorized users to `/`.
- [x] Task 2: Bottom Navigation Bar UI (AC: 2)
  - [x] Build a `<BottomNav />` component fixed to the bottom, constrained to `w-full max-w-md mx-auto`.
  - [x] Implement four tabs with lucide-react icons: Home, Search, Globe, User.
  - [x] Read active route via `usePathname` and highlight the active icon in the Rose accent color.
- [x] Task 4: Desktop Navigation Shell (AC: 1, 2)
  - [x] Render a desktop sidebar navigation for the same 4 protected routes.
  - [x] Keep bottom nav mobile-only and preserve active route highlighting across both navs.
- [x] Task 3: Placeholder Views (AC: 2)
  - [x] Create basic empty route pages for `/home`, `/search`, `/global`, `/profile`.

## Dev Notes

- **UX Guardrail:** Keep bottom nav mobile-only. On desktop, use sidebar navigation and centered content shell so feed surfaces remain readable.
- **Component Standard:** Implement `aria-live` or standard semantic `<nav>` for accessibility.

### References

- [Source: planning-artifacts/epics.md#FR-SF-1] -> 4-Tab Navigation specifications.

## Dev Agent Record
- Agent: Antigravity
- Completion Notes:
  - Created `app/(protected)/layout.tsx` to wrap pages and block unauthorized access.
  - Created `<BottomNav/>` in `src/components/navigation/BottomNav.tsx` with tailwind classes ensuring max width, centered fixed positioning and responsive active routing via `usePathname`.
  - Added desktop sidebar navigation and responsive protected shell behavior for larger viewports.
  - Installed `lucide-react`, `clsx`, and `tailwind-merge` and created the `src/lib/utils.ts` utility for tailwind classes.
  - Created placeholder pages for /home, /search, /global, and /profile.
  - Passed typechecking.
     
## File List
- `src/app/(protected)/layout.tsx`
- `src/app/(protected)/home/page.tsx`
- `src/app/(protected)/search/page.tsx`
- `src/app/(protected)/global/page.tsx`
- `src/app/(protected)/profile/page.tsx`
- `src/components/navigation/BottomNav.tsx`
- `src/lib/utils.ts`
- `package.json`

## Change Log
- Installed new dependencies (lucide-react, clsx, tailwind-merge)
- Added new utility (cn)
- Scaffolded app shell and bottom nav component
- Scaffolded standard views
