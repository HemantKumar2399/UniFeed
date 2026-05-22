# Story 6.1: Typography & Color Token Definition

Status: review
Depends on: None

## Story

As a developer,
I want to configure the global CSS and foundational generic components using the exact Design System palette,
So that the rest of the application has standard rules for styling to pull from.

## Acceptance Criteria

1. **Given** a fresh Next.js T3 scaffold
   **When** the UI library is configured
   **Then** `globals.css` reflects the warm neutral palette (`#f6f5f4`, `#31302e`)
2. **And** generic Shadcn core components (Buttons, Inputs, Cards) are overridden to feature 1px solid borders ("Whisper Border") and specific radii (`rounded-2xl` max).

## Tasks / Subtasks

- [x] Task 1: Configure Theme Variables & Color Palette
  - [x] Defined 40+ CSS custom properties in `src/styles/globals.css` using Tailwind v4 `@theme {}` block — full warm neutral palette, shadow stacks, radius scale, spacing, duration tokens.
  - [x] Warm neutral palette implemented: `#f6f5f4`, `#31302e`, `#615d59`, `#a39e98`, Notion Blue `#0075de`, badge colors, semantic accents.
- [x] Task 2: Typography & Base Styles Setup
  - [x] Switched font from Geist to Inter (4 weights: 400/500/600/700) in `layout.tsx` via `next/font/google` — NotionInter-equivalent characteristics.
  - [x] All 13 typographic tiers defined as semantic CSS classes in `globals.css @layer base`.
  - [x] Letter-spacing compression: -2.125px at 64px → normal at 16px → +0.125px at 12px (badges only — the only positive tracking in the system).
- [x] Task 3: Shadcn/ui Foundation Adjustments
  - [x] Wrote `button.tsx` with CVA — 3-tier hierarchy: Primary (Notion Blue), Secondary (translucent warm gray), Ghost (transparent + underline). Whisper border outline variant added.
  - [x] Wrote `card.tsx` — whisper border, 12px/16px radii, exact 4-layer/5-layer shadow stacks. Full Card/Header/Title/Description/Content/Footer family.
  - [x] Wrote `input.tsx` — #dddddd border, 4px micro radius, warm gray placeholder #a39e98, 2px Focus Blue ring #097fe8, 44px min-height (UX-DR9).
  - [x] Wrote `badge.tsx` — 9999px pill radius, +0.125px tracking, semantic variants: default/success/warning/critical/neutral/dark/outline.

## Dev Notes

- Reference NFR-2: Strict adherence to Typography, Color Palette, and Elevation specs.
- Tailwind v4 note: Config is CSS-native via `@theme {}` in globals.css — no `tailwind.config.ts` token changes needed.
- The project runs on Next.js (App Router). Inter loaded at 4 weights via `next/font/google`.
- Adhere to the "Tactile Utility" design philosophy. No dated drop shadows.

## Dev Agent Record

- Agent: Antigravity
- Date: 2026-04-15

### Completion Notes

- **globals.css**: Full rewrite with Tailwind v4 `@theme {}` token block — 40+ CSS custom properties for colors, shadows, radii, letter-spacing, and duration. `@layer base` with 13 typographic class tiers. `@layer components` with `.card-surface`, `.badge-pill`, `.feed-container`, `.capacity-bar-*`. `@layer utilities` with skeleton pulse animation.
- **layout.tsx**: Font switched Geist → Inter (400/500/600/700), variable `--font-inter` wired into `--font-sans`. Body bg/color delegated to globals.css base layer. App title updated to "Campus Platform".
- **button.tsx**: CVA-powered 3-tier system. All variants: `active:scale-95` haptic via `motion-safe:`, min-h 44px touch targets, focus-visible ring.
- **card.tsx**: Full component family (Card/Header/Title/Description/Content/Footer). Whisper border + 4-layer/5-layer shadow stacks matching DESIGN.md exactly.
- **input.tsx**: #dddddd border, 4px radius, warm gray placeholder #a39e98, 2px Focus Blue ring #097fe8, 44px min-height.
- **badge.tsx**: 9999px pill, +0.125px tracking (only positive in system), 7 semantic variants.
- **LongPressButton.tsx**: Progress fill updated from rose-600 to Notion Blue tint #0075de/20.
- TypeScript: All new `src/` files compile cleanly. Pre-existing `.cjs` script errors are pre-existing.

### File List

- `src/styles/globals.css` — MODIFIED (full design system rewrite)
- `src/app/layout.tsx` — MODIFIED (Inter font, delegated body styles)
- `src/components/ui/button.tsx` — MODIFIED (CVA 3-tier Tactile system)
- `src/components/ui/card.tsx` — CREATED
- `src/components/ui/input.tsx` — CREATED
- `src/components/ui/badge.tsx` — CREATED
- `src/components/ui/LongPressButton.tsx` — MODIFIED (Notion Blue tint)
- `package.json` — MODIFIED (class-variance-authority, radix-ui, lucide-react, tw-animate-css added)

### Change Log

- 2026-04-15: Implemented Story 6.1 — full Tactile Utility typography and color token system. Complete `globals.css` rewrite with Tailwind v4 `@theme` tokens. Font switched to Inter. Button/Card/Input/Badge components written from scratch to exact DESIGN.md spec.
