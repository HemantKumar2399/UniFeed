---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish', 'step-e-01-discovery', 'step-e-02-review', 'step-e-03-edit']
inputDocuments: ['campus-platform-idea.md', '_bmad-output/brainstorming/brainstorming-session-20260401-1637.md']
workflowType: 'prd'
documentCounts:
  briefCount: 1
  researchCount: 0
  brainstormingCount: 1
  projectDocsCount: 0
classification:
  projectType: 'Utility-first Multi-tenant Platform'
  domain: 'EdTech / Campus Community'
  complexity: 'Medium'
  projectContext: 'Greenfield'
lastEdited: '2026-04-15'
---

# Product Requirements Document - Campus Platform

**Author:** Hemant & Antigravity  
**Status:** Polished / Final  
**Date:** 2026-04-15

## 1. Executive Summary

**Campus Platform** is a high-engagement, frictionless campus event utility designed to replace the noisy fragmentation of WhatsApp groups and physical noticeboards with a high-fidelity "Command Center" for university life. 

Pivoting away from an "Instagram-clone" model, the platform utilizes a **"Tactile Utility"** design language. By adopting Notion's clean aesthetic (warm neutrals, whisper-thin borders, compressed typography) but pairing it with satisfying, physics-based micro-interactions, the app avoids feeling like "homework" and instead feels like a premium, dynamic, student-focused tool. It allows university clubs to broadcast events directly to a curated "Campus Pulse" dashboard. 

### 1.1 Core Differentiators
*   **Tactile Utility Design:** Clean, Notion-inspired visual hierarchy (`#f6f5f4`, 1px borders) combined with playful micro-interactions that make the app feel alive and rewarding to use.
*   **The "Student Passport":** Pre-verified student profiles (PRN, Branch) enable registration in under 3 seconds—zero forms required.
*   **Organizer Dashboard:** Eliminates Google Sheets by providing clubs with a real-time, distraction-free management interface.

---

## 2. Success Criteria

### 2.1 User Success Metrics
*   **Utility Engagement:** 50% of JECRC students use "Campus Pulse" weekly to actively find events, rather than mindlessly scrolling.
*   **Aha! Moment:** Successful "One-Tap" passport registration dropping gracefully into their profile in under 3 seconds for 40% of first-time users.
*   **Clarity:** 100% of major club events are discoverable in one structured, categorized Campus Pulse interface.

### 2.2 Business & Adoption Success
*   **Workflow Migration:** 100% of onboarded clubs move their registration flow from Google Forms to the Organizer Dashboard.

---

## 3. Product Scope & Roadmap

### Phase 1: The MVP Data Layer (Epics 1-5, Completed)
*   **Data Models:** Users, Roles, Events, RSVPs, Tickets implemented via Prisma/tRPC.
*   **Core Systems:** Email/Domain verification, QR code generation, pessimistic locking for RSVPs.

### Phase 2: Design Pivot & UI Consolidation
*   **Epic 6: Design System & Component Library MVP.** Establishing the strict `DESIGN.md` UI components. Building the warm neutral palette, `NotionInter` typography scale, whisper borders, and satisfying animation primitives.
*   **Epic 7: MVP UI Migration.** Refactoring all existing Epic 1-5 pages (Home, Dashboard) to match the new Tactile Utility standards and replacing the legacy Infinite Feed with the curated "Campus Pulse".

### Phase 3: Platform Expansion
*   **Epic 8+: Campus Hubs:** Dedicated Notion-style pages for specific clubs, branches, or societies to host their permanent resources and events.
*   **Epic 9+: Threaded Discussions:** Focused, structured event Q&A boards to replace generic comment feeds, mapping to professional communication patterns.

---

## 4. User Journeys

### 4.1 Aman's "Zero-Friction" Journey
*   **Trigger:** Aman opens **Campus Pulse** to check his algorithmic "Happening This Week" collection.
*   **Action:** He clicks the primary Notion Blue CTA on a minimalist event card for the "Coding Club Hackathon."
*   **Outcome:** A playful, physics-based micro-interaction registers his RSVP using his pre-verified **Student Passport**.
*   **Result:** A status pill badge indicates success, and the Ticket drops visibly into his personal schedule view.

### 4.2 Hemant's "Command Center" Journey
*   **Trigger:** Hemant (Club Lead) needs to create a new workshop.
*   **Action:** He opens the **Organizer Dashboard** on desktop—a clean, wide-canvas interface with a subtle warm background (`#f6f5f4`).
*   **Outcome:** He inputs details into a focused, distraction-free block editor. 
*   **Result:** As RSVPs come in, the live data table populates instantly, letting him use a 1-click CSV export utility.

---

## 5. Functional Requirements (The Capability Contract)

### 5.1 Identity & Profile Management
*   **FR-ID-1:** Secure "Student Passport" storing PRN, Branch, and Grad Year; locked for registration integrity.
*   **FR-ID-2:** Structured profile view utilizing minimal nested cards and clean typography.

### 5.2 Discovery: Campus Pulse
*   **FR-CP-1:** **Campus Pulse:** A curated, categorized view of upcoming activities (e.g., "Free Food", "Your Major"). No infinite auto-play loops.
*   **FR-CP-2:** **Event Cards:** Minimalist, information-dense components with hidden captions (expand-on-tap).

### 5.3 Registration & Utility
*   **FR-RE-1:** **Interactive Registration:** 1-Click Registration utilizing the Passport, paired with a satisfying visual interaction.
*   **FR-RE-2:** **Live Capacity Indicators:** Subtle, precise numeric pill-badge indicators of available spots.

### 5.4 Management: Organizer Dashboard
*   **FR-MO-1:** **Distraction-Free Creator:** A focused text-entry environment for drafting event details (Notion-style).
*   **FR-MO-2:** **Live Attendee Data Table:** Sorting, managing, and 1-click CSV exports.
*   **FR-MO-3:** **QR Entrance Scanner:** Integrated tool to verify student passports at event venues.

---

## 6. Non-Functional Requirements (The Quality Contract)

### 6.1 Performance & Fluidity
*   **Interaction Latency:** Micro-interactions and UI feedback must occur in **<50ms**, emphasizing the feeling of a hyper-responsive local utility.

### 6.2 Maintainability & Component Architecture
*   **Tactile Utility Design System:** Strict adherence to the `DESIGN.md` spec:
    *   **Typography:** `NotionInter` with aggressive compression at display sizes (-2.125px) and readable body copy.
    *   **Color Palette:** Warm neutrals (`#f6f5f4`, `#31302e`), near-black text (`rgba(0,0,0,0.95)`).
    *   **Elevation:** Ultra-thin "whisper borders" (`1px solid rgba(0,0,0,0.1)`) and multi-layer, sub-0.05 opacity shadow stacks.
*   **Engaging Polish:** Minimal UI must be offset by fluid, tactile animations (e.g., tickets dropping into wallets, hover state scale transforms) to prevent the "LMS/homework" feel.

---

## 7. Innovation & Market Positioning
*   **"Tactile Utility":** Replacing hyper-stimulating social feeds with a focused, respectful tool that values the user's time while still being a joy to tap and navigate.
*   **Zero-Friction Strategy:** Solving "Form-Filling Fatigue" through the locked Student Passport.
