# Story 6.2: Tactile Utility Component Variations

Status: review
Depends on: Story 6.1 (Typography & Color Token Definition)

## Story

As a developer,
I want to implement the standard physics-based animation hooks (`tailwindcss-animate`) and strict button hierarchies,
So that all interactive elements across the platform have the signature "Tactile" feel and WCAG AA compliance while maintaining visual hierarchy.

## Acceptance Criteria

1. **Given** the configured design system
   **When** interactive elements (Buttons) are pressed
   **Then** they utilize an `active:scale-95` transform for a haptic bounce.
2. **And** the codebase strictly provides `motion-safe` fallbacks and `aria-live` attributes to maintain accessibility standards.
3. **When** button components are used across the app
   **Then** they follow a strict 3-tier system: Primary Notion Blue, Solid Translucent Gray (Secondary), and Ghost/Link styles.
4. **And** Status badges render as full rounded pills (`9999px`) with tinted blue backgrounds.

## Tasks / Subtasks

- [x] Task 1: Setup Animation Primitives
  - [x] `tailwindcss-animate` already configured in `globals.css` via `@plugin "tailwindcss-animate"`. Verified.
  - [x] Created `src/lib/animations.ts` — typed animation constants, `HAPTIC_PRESS_CLASSES`, `SLIDE_UP_CLASSES`, `FADE_IN_CLASSES`, `hapticClass()` and `interactiveCardClass()` utilities. All use `motion-safe:active:scale-95`.
  - [x] `active:scale-95` applied to all Button variants and InteractiveCard via `HAPTIC_PRESS_CLASSES` constant. Transition: 200ms ease-out.
- [x] Task 2: Standardize Component Variations (Button)
  - [x] `button.tsx` (built in 6.1) exports 3-tier CVA variants: `primary` (Notion Blue #0075de), `secondary` (translucent warm gray bg-black/05), `ghost` (transparent + underline hover).
  - [x] Additional `outline` and `destructive` variants added for completeness.
  - [x] All sizes: `default` (8px/16px padding), `sm`, `lg`, `icon` (44×44px).
- [x] Task 3: Accessibility Implementation
  - [x] Created `src/hooks/use-reduced-motion.ts` — SSR-safe hook reads `prefers-reduced-motion` media query, subscribes to OS-level changes.
  - [x] Created `src/hooks/use-async-state.ts` — manages idle/loading/success/error with `message` string for `aria-live="polite"` regions. Prevents double-fire. Auto-resets.
  - [x] Added `.sr-only`, `.sr-only-focusable`, `.aria-live-region` utilities to `globals.css @layer utilities`.
  - [x] All animation classes use Tailwind `motion-safe:` prefix — CSS-level WCAG guard, no JS needed for basic compliance.
- [x] Task 4: Standardize the Status Badge
  - [x] `badge.tsx` (built in 6.1) enforces `9999px` pill radius, `+0.125px` letter-spacing (only positive tracking in system).
  - [x] 7 semantic variants: `default` (blue tint), `success` (green), `warning` (orange), `critical` (pink), `neutral` (warm gray), `dark` (inverted), `outline` (whisper border).
  - [x] Created `src/components/ui/interactive-card.tsx` — applies `HAPTIC_PRESS_CLASSES` + hover shadow intensification to clickable card surfaces. Full keyboard navigation (Enter/Space). role=button when clickable.

## Dev Notes

- Reference NFR-3: Engaging Polish—fluid tactile animations must offset the minimal UI.
- Interaction Latency NFR-1 target is <50ms. CSS transforms execute on the compositor thread — well under threshold.
- Ensure all interactive areas have a minimum `44x44px` touch target size as per UX-DR9 constraints.
- For JS-controlled animations (e.g., bottom sheet spring), check `useReducedMotion()` and set duration to 0ms when true.

## Dev Agent Record

- Agent: Antigravity
- Date: 2026-04-15

### Completion Notes

- **animations.ts**: Typed animation primitives library with constants, pre-composed class strings (HAPTIC_PRESS_CLASSES, FADE_IN, SLIDE_UP/DOWN), and `hapticClass()` / `interactiveCardClass()` utility functions. All use `motion-safe:` prefix.
- **use-reduced-motion.ts**: SSR-safe hook reading `prefers-reduced-motion`. Subscribes to changes. Used for JS-driven animation control (e.g., spring physics durations).
- **use-async-state.ts**: Aria-live companion hook for RSVP and form states. Produces a `message` string for a visually-hidden `aria-live="polite"` span. Auto-resets. Prevents double-fire.
- **interactive-card.tsx**: Clickable card wrapper with haptic press + hover shadow intensification + full keyboard support (role=button, tabIndex, Enter/Space activation). Only applies interactive behavior when `onClick` is provided.
- **globals.css**: Added `.sr-only`, `.sr-only-focusable`, `.aria-live-region` utility classes to `@layer utilities`.
- TypeScript: All Story 6.2 files compile cleanly (zero `src/` errors).

### File List

- `src/lib/animations.ts` — CREATED
- `src/hooks/use-reduced-motion.ts` — CREATED
- `src/hooks/use-async-state.ts` — CREATED
- `src/components/ui/interactive-card.tsx` — CREATED
- `src/styles/globals.css` — MODIFIED (accessibility utilities added)

### Change Log

- 2026-04-15: Implemented Story 6.2 — Animation primitives library, reduced-motion hook, async-state aria-live hook, InteractiveCard with haptic behavior, accessibility utility classes in globals.css.

### Review Findings

- [x] [Review][Patch] Unimplemented `asChild` Prop [src/components/ui/button.tsx:102]
- [x] [Review][Patch] Hardcoded utility classes ignore Design Tokens [src/components/ui/input.tsx]
- [x] [Review][Defer] Disabled buttons block tooltips via `pointer-events-none` [src/components/ui/button.tsx] — deferred, pre-existing (shadcn default)
