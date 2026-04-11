# Story 1.2: Unauthenticated Landing Page

Status: done

## Story

As a Guest Student,
I want to see a beautiful, minimalist landing page,
So that I understand the value of UniFeed and can register using my university email.

## Dependencies
- Story 1.1

## Acceptance Criteria

1. **Given** a student visits the root URL (`/`)
   **When** they are not logged in
   **Then** they see the high-fidelity Hero section with the " functional minimalist" aesthetic.
2. **And When** they click the "Join JECRC Community" CTA
   **Then** they are directed to the login/registration flow.

## Tasks / Subtasks

- [x] Task 1: Implement Hero Component
  - [x] Create a visually striking, minimal Hero section.
  - [x] Use premium typography and spacing.
- [x] Task 2: Landing Page Layout
  - [x] Implement the landing page in `src/app/page.tsx`.
  - [x] Ensure it only shows to unauthenticated users (redirect logic deferred to story 1.3).

## Dev Notes

- Focus on "WOW" factor. Use gradients and micro-interactions.

## Dev Agent Record
- Agent: Antigravity

### Completion Notes
✅ Hero component implemented with high-fidelity design.
✅ Root page configured to showcase the platform value proposition.
