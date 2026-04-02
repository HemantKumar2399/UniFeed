---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish']
inputDocuments: ['campus-platform-idea.md', '_bmad-output/brainstorming/brainstorming-session-20260401-1637.md']
workflowType: 'prd'
documentCounts:
  briefCount: 1
  researchCount: 0
  brainstormingCount: 1
  projectDocsCount: 0
classification:
  projectType: 'Social-first Multi-tenant Platform'
  domain: 'EdTech / Campus Community'
  complexity: 'Medium'
  projectContext: 'Greenfield'
---

# Product Requirements Document - UniFeed

**Author:** Hemant & Antigravity  
**Status:** Polished / Final  
**Date:** 2026-04-02

## 1. Executive Summary

**UniFeed** is a social-first campus discovery engine designed to replace the fragmented noise of WhatsApp groups and physical notice boards with a high-fidelity "Command Center" for university life. By focusing on a student-centric, bottom-up adoption model, UniFeed allows university clubs to broadcast events and daily engagement hooks ("Club Pulse") directly to a personalized, data-driven student feed.

The platform initially targets a high-impact MVP at **JECRC University**, utilizing a multi-tenant architecture designed to scale into a federated network of "Private World" university ecosystems.

### 1.1 Core Differentiators
*   **Instagram-Style Utility:** Melding the visual engagement of Stories/Feeds with the functional utility of event management.
*   **The "One-Tap" Passport:** Pre-verified student profiles (PRN, Branch) enable registration in under 3 seconds—zero forms required.
*   **Direct-to-Organizer Dashboard:** Eliminates Google Sheets by providing clubs with a real-time "Command Center" for attendee lists and verification.

---

## 2. Success Criteria

### 2.1 User Success Metrics
*   **Engagement:** 50% of JECRC students return to the feed/stories twice a week.
*   **Aha! Moment:** Successful "One-Tap" registration in under 3 seconds for 40% of first-time users.
*   **Clarity:** Reduction in "information silos"—100% of major club events are discoverable in one central feed.

### 2.2 Business & Adoption Success
*   **The JECRC Beachhead:** Onboard 3–5 active core clubs and reach 100–300 daily active users (DAU) within 3 months post-launch.
*   **Workflow Migration:** 100% of onboarded clubs move their registration flow from Google Forms to the UniFeed Dashboard.

### 2.3 Technical Excellence
*   **Performance:** Zero-latency feed scrolling and instant (<500ms) registration feedback.
*   **Security:** Multi-tenant isolation ensuring JECRC data is invisible to unauthorized cross-campus entities.

---

## 3. Product Scope & Roadmap

### 3.1 Phase 1: JECRC MVP (The "Beachhead")
*   **Discovery:** Home Feed (Stories/Posts) + Search (Clubs/Events).
*   **Identity:** "Locked Profile" for JECRC Students (PRN/Branch/Email).
*   **Utility:** "One-Tap" Register (Long-press) + In-app Event Calendar.
*   **Club Tooling:** Mobile-first Dashboard for Content Creation and Attendee Management.

### 3.2 Phase 2: Growth (The "Jaipur Network")
*   **Federated Discovery:** Activation of the "Global Feed" Tab for cross-campus sharing.
*   **Production Scaling:** Seamless migration from Local Postgres to **Supabase**.
*   **Automated Engagement:** Push notifications and algorithmic "For You" discovery.

### 3.3 Phase 3: Expansion (The "Platform")
*   **Campus Economy:** Integrated commerce for tickets and university-wide voting/polls.
*   **Advanced Analytics:** Real-time engagement heatmaps for organizers.

---

## 4. User Journeys

### 4.1 Aman's "Zero-Friction" Journey
*   **Trigger:** Aman sees a 15-second teaser story for the "Coding Club Hackathon."
*   **Action:** He **Long-Presses** the "Register" button at the bottom of the story.
*   **Outcome:** His pre-verified "Passport" handles the data. He is registered instantly.
*   **Result:** A QR Code Ticket is generated in his Profile Tab; the event is synced to his in-app calendar.

### 4.2 Hemant's "Command Center" Journey
*   **Trigger:** Hemant (Club Lead) needs to announce a prize-pool update.
*   **Action:** He uses the **Instagram-style Multi-step Uploader** to post a high-fidelity image.
*   **Outcome:** He monitors the **Live Capacity Bar** as registrations surge.
*   **Result:** At the event entrance, his team uses the **Built-in Scanner** to verify student QR Tickets—syncing attendance in real-time.

---

## 5. Functional Requirements (The Capability Contract)

### 5.1 Identity & Profile Management
*   **FR-ID-1:** Lock registration to verified university email domains (e.g., `@jecrc.ac.in`).
*   **FR-ID-2:** Secure "Student Passport" storing PRN, Branch, and Grad Year; locked for registration integrity.
*   **FR-ID-3:** Immediate generation of dynamic QR code tickets upon successful registration.

### 5.2 Discovery & Social Feed
*   **FR-SF-1:** **4-Tab Navigation:** Home (Local Feed), Search (Algorithmic Discovery), Global (Cross-Campus), and Profile (Passport/Settings).
*   **FR-SF-2:** **Story Bar:** 15-second ephemeral club teasers with deep-links to event cards.
*   **FR-SF-3:** **Minimalist Event Cards:** Visual-first design with hidden captions (expand-on-tap) and live metadata (Date/Venue).

### 5.3 Registration & Engagement
*   **FR-RE-1:** **Long-Press Registration:** Satisfying interaction model to trigger one-action intent.
*   **FR-RE-2:** **Live Capacity Bar:** Visual indicator (accent-colored) showing real-time registrations vs. total spots.
*   **FR-RE-3:** **In-App Calendar:** Unified view of all registered upcoming events.

### 5.4 Management & Verification (Organizer POV)
*   **FR-MO-1:** **Multi-Step Content Creator:** Instagram-style uploader for high-fidelity media and event tags.
*   **FR-MO-2:** **QR Entrance Scanner:** Integrated tool to verify student passports at event venues.
*   **FR-MO-3:** **Live Attendee Dashboard:** Real-time list of registered students with 1-click CSV export capability.

---

## 6. Non-Functional Requirements (The Quality Contract)

### 6.1 Performance & Fluidity
*   **Interaction Latency:** 95% of UI feedback (haptics/animations) must occur in **<500ms**.
*   **Real-time Sync:** Live capacity bars must update across all clients in **<200ms** via WebSockets.
*   **Mobile Web Optimization:** Final bundle must be an installable PWA with offline caching.

### 6.2 Security & Multi-tenancy
*   **Data Isolation:** Implement Row-Level Security (RLS) to prevent unauthorized cross-university data access.
*   **Identity Lock:** Student PRN/Branch data is Read-Only after initial account verification.

### 6.3 Maintainability & Engineering Standards
*   **Architecture:** **Feature-First Architecture** (Vertical Slicing) to ensure modularity and scalability.
*   **File Limit:** No single code file should exceed **~200 lines** to maintain professional-grade SRP (Single Responsibility Principle).
*   **Design System:** Strict Monochrome-base UI (Grey/White/Black) with a single **"Rose" Accent** for high-priority CTA buttons.

### 6.4 Reliability
*   **Availability:** 99.9% uptime target for the JECRC registration portal.
*   **Scalability:** Support for **500+ concurrent registrations** during high-demand traffic spikes.

---

## 7. Innovation & Market Positioning

*   **"Functional Social":** We are moving beyond "Posts" to "Engagement Widgets"—transforming static messages into live, data-driven utility cards.
*   **Zero-Friction Strategy:** Outpacing WhatsApp by removing the "Form-Filling Fatigue" through the locked identity passport.
*   **Native Verification:** Solving the administrative bottleneck of "Fake Registrations" through university-email anchoring.
