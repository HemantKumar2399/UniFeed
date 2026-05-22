---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
inputDocuments: ['docs/product/prd.md', 'docs/architecture/architecture.md', 'docs/design/ux-design-specification.md']
---

# Campus Platform - Epic Breakdown (Omnichannel V2)

## Overview
This document provides the epic and story breakdown for Campus Platform. We have entirely replaced the old hardcoded and static feeds/dashboards with a massive foundational Journey and Flow strategy (The Omnichannel Architecture). 

## Requirements Inventory

### Functional Requirements
FR-FD-1: The Premium "Front Door" Journey (Landing Page, Registration Flow, and Login) must function as a seamless gateway.
FR-SF-1: Epics SF-1 & SF-2 - Student Discovery & Omnichannel Feed Experience + Engagement & Tickets.
FR-OM-1: Epic OM-1 - Omnichannel Organizer Dashboard.
FR-OA-1: The Omnichannel Architecture Matrix must route all core navigation and heavy interactions via bottom-sheets or side-drawers without reloading pages.

### NonFunctional Requirements
NFR-1: Interaction Latency: Micro-interactions and UI feedback must occur in <50ms.
NFR-2: Tactile Utility Design System: Strict adherence to Typography, Color Palette, and Elevation specs (NotionInter font, compress headers, Vercel polish).
NFR-3: Omnichannel Shell: Absolute zero full-page reload jolt during deep-links or modal transitions.

---

## Epic List

### Foundational Journey 1: The Premium "Front Door" Journey (FD-1)
A frictionless, "3-second" gateway from landing page to authenticated state using Tactile Utility tokens.

### Foundational Journey 2: The Omnichannel Architecture Shell (OA-1)
A definitive routing structure where heavy interactions utilize elegant bottom-sheets or side-drawers (Vaul powered).

### Epic SF-1: Student Discovery & Omnichannel Feed 
Completely replaces the old static student feed with a dynamic, fluid bento-grid "Discovery Feed". Powered by bottom-sheets on mobile and side-drawers on desktop.

### Epic SF-2: Student Engagement, Tickets & Deep Content
Covers frictionless RSVP, the Apple Wallet-style digital student passport, and profile management over a clean overlay.

### Epic OM-1: The Omnichannel Organizer Dashboard
Vercel/Linear style dashboard for creators. Features distraction-free split-pane editors, Cmd+K navigation, and a dedicated high-contrast scan pipeline.

---

## Foundational Stories

### Story FD.1: The Premium "Front Door" Journey
**Status**: ready-for-dev
As an unauthenticated user, I want the landing page and login to feel like a single premium experience built on Tactile Utility tokens.

### Story OA.1: The Omnichannel Architecture Shell
**Status**: ready-for-dev
As an authenticated user, I want all major transitions and deep links to load intuitively over my current view via drawers or bottom-sheets, so I never lose my sense of place.
