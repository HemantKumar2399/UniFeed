---
title: Event experience and fluid theme reveal
status: done
created: 2026-10-22
baseline_commit: c35f112
---

## Authorized scope

The user requested deeper internet design research, a considered event-detail redesign, and a theme reveal spreading from the clicked control. The user explicitly prefers autonomous decisions, no extra agents, and focused verification. This small combined change follows that scope.

## Plan

The research, alternatives, palette, typography, wireframe, critique, implementation paths and acceptance criteria are in [Event experience design](../../docs/event-experience-design.md). It supersedes the earlier quick-view-only proposal: mobile establishes event identity and poster before registration, with scrolling allowed, while desktop keeps the registration action in the initial preview.

- Explicit gallery width fixes the aspect-ratio/height constraint that left half the old frame empty.
- One date/title header and shared gallery/registration grid replace the disconnected full-page hero.
- Compact preview has a stronger title, explicit close control and full-page link.
- Overview and discussion use consistent controls; RSVP/save/calendar mutations are unchanged.
- Theme transitions use the initiating button center and viewport dimensions. The new snapshot expands over the previous theme in either direction. Reduced motion and unsupported browsers change the theme directly. Repeated activations during a reveal are ignored; cleanup handles skipped or failed transitions.
- Dark surfaces and action/status colors use semantic variables. Default buttons use the theme's foreground color for readable contrast.

## Focused verification

The initial gallery check reproduced 1,096px gallery versus 533px stage; after the fix the preview is 652px versus 650px, accounting for the border. The new theme test initially failed because no document animation existed. The implemented reveal passed the browser check; a test assertion was corrected to tolerate browser serialization rounding of subpixel coordinates.

One existing heading test passed. Production compilation, lint and TypeScript checks passed. Final focused browser checks and screenshots are recorded below. No unrelated suite or additional agent was used.

## Direct review

Reviewed shared composition, no duplicate gallery on the full page, unchanged authorization/mutation logic, optional field rendering, safe image links, theme hydration/persistence, reduced-motion behavior, snapshot cleanup and supported-browser fallback. Visual critique shortened crowded secondary labels, corrected dark-button foreground contrast and kept cancellation visually secondary to registration. Screenshots wait for image decoding and browser paint to avoid capturing an incomplete SVG repaint after theme changes.

## Final result

Completed: production build (including lint and TypeScript), the existing heading test, and three focused Chromium journeys passed. The final browser run completed in 19.5 seconds. Desktop/mobile event and two-direction theme screenshots were visually inspected. Both portrait and landscape media render; the corrected gallery frame uses its available width. The existing rich-event creation, approval, publication, RSVP and gallery journey passed after composition changes. Server restarted on port 3100 with the final build. No unrelated tests or extra agents were used.
