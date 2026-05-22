# Story 6.5: Cards, Containers, & Semantic Shadows

Status: review
Depends on: [Story 6.4: The 3-Tier Button & Badge Interactive System](https://github.com/HemantKumar822/UniFeed/issues/109)

## Story

As a developer,
I want to establish the standardized shadow and border aesthetic for cards and containers,
so that elements possess depth without heavy, dated "drop shadow" feels.

## Acceptance Criteria

1. **Given** the design system configuration  
   **When** an element requires elevation (e.g. modals, featured cards)  
   **Then** it uses carefully crafted multi-layer shadow stacks with sub-0.05 cumulative opacity  
   **And** standard element division relies exclusively on a `1px solid rgba(0,0,0,0.1)` "Whisper Border" layout rule.

## Tasks / Subtasks

- [x] Configure semantic shadow utilities
  - [x] Implement multi-layer shadow stacks with sub-0.05 cumulative opacity within `globals.css` (Tailwind V4 equivalent for `tailwind.config.ts`).
- [x] Implement global "Whisper Border" definitions
  - [x] Map border colors globally or add bespoke utility for `1px solid rgba(0,0,0,0.1)`.
- [x] Update Card schema
  - [x] Apply shadow and borders consistently.
  - [x] Define standard elevation thresholds (Modals vs Featured Cards).

## Dev Notes

- With Tailwind V4, we moved away from `tailwind.config.ts` extending, implementing all constraints globally within `@theme` inside `globals.css`.
- The native shadow mapping leverages 4-layer bounds for standard boxes (`--shadow-card`) and 5-layer structures for elevated modals/dialogs (`--shadow-deep`).
- `src/components/ui/card.tsx` was correctly refactored so that variants directly tap the generic design token helper classes (`.border-whisper`, `.shadow-card`, `.shadow-deep`, etc.) instead of hardcoded specific properties.

## Dev Agent Record

### Agent Model Used

Antigravity

### Completion Notes List
- Validated CSS variables across both `globals.css` component tiers and `utilities`.
- Ensured container schemas (`.card-surface`, `.card-surface-featured`) dynamically utilize the configured token elements.
- Re-routed standard UI card implementations to the tokens to guarantee visual uniformity.

### File List
- `src/styles/globals.css`
- `src/components/ui/card.tsx`
