# Story 6.4: The 3-Tier Button & Badge Interactive System

Status: review
Depends on: Story 6.2, Story 6.3

## Story

As a developer,
I want to create a strict hierarchy of interactive button components,
so that primary CTA paths are visibly prioritized over secondary or structural actions.

## Acceptance Criteria

1. **Given** the component library  
   **When** button components are used across the app  
   **Then** they follow a strict 3-tier system: Primary Notion Blue, Solid Translucent Gray (Secondary), and Ghost/Link styles  
   **And** Status badges render as full rounded pills (`9999px`) with tinted blue backgrounds.

## Tasks / Subtasks

- [x] Construct the 3-tier Button hierarchy (`Button` component wrapper/variants)
  - [x] Primary variant utilizing "Notion Blue".
  - [x] Secondary variant utilizing "Solid Translucent Gray".
  - [x] Ghost/Link variant for structural actions without heavy emphasis.
- [x] Build UI Status Badge components
  - [x] Utilize full rounded pills (`rounded-full` or `9999px`).
  - [x] Apply tinted blue background specifications.
- [x] Document variants appropriately in internal references if applicable.

## Dev Notes
- The base `Button` and `Badge` implementations were actually established during Epics 6.1 and 6.2 in `src/components/ui`.
- Enforced constraint boundaries across the `src/app/login/page.tsx`, directly incorporating the completed 3-tier `Button` system and input styling mapping to the specification.

## Dev Agent Record

- Agent Model Used: Antigravity
- Completion Notes:
  - Ensured `<Button>` inputs across standard landing pages strictly default to `primary` configuration.
  - Connected the 3-tier layout across standard login actions using `<Button type="submit">`.
- File List:
  - `src/components/ui/button.tsx`
  - `src/components/ui/badge.tsx`
  - `src/components/ui/input.tsx`
  - `src/app/login/page.tsx`
