# Campus Platform (UniFeed) — Tactile Utility Pivot

> **Status:** MVP Data Layer Built — Pivoting to "Tactile Utility" Design System (Epics 6+)  
> **Working Title:** Campus Platform / UniFeed  
> **Founder:** Hemant Kumar, JECRC University (AI/ML Community Lead, Batch 2024–2028)  
> **Date:** April 2026

---

## 1. The Problem

Students at Indian universities (starting with JECRC, Jaipur) consistently miss events, workshops, and hackathons — not because they don't care, but because information is **fragmented and unreliable**.

### How information currently travels:
- WhatsApp groups (noisy, easy to miss)
- Physical notice boards (nobody checks)
- Word of mouth from teachers or friends
- Random Instagram stories from club accounts
- Most common outcome: students find out **after the event has ended**

### Why existing solutions don't work:
- Platforms like Corq, iCommunify, Modern Campus Involve **require university admin buy-in**
- Indian universities (especially tier-2/3) don't adopt top-down tools — too slow, too bureaucratic
- No platform is designed for **student-first, bottom-up adoption**
- Generic tools aren't personalized — same feed for a CSE student and an MBA student

### The real gap:
> There is no mobile-native, student-first platform where university clubs can broadcast and students can discover what's happening on campus — personalized to their domain, course, and interests, without feeling like "homework" or an addictive social media trap.

---

## 2. The Solution — Tactile Utility Campus Platform

A Notion-inspired campus utility platform that focuses on intentional discovery and frictionless interactions. We are moving away from the "Instagram-clone" endless scroll to a **"Tactile Utility"** model.

### Core philosophy:
- **Clubs manage. Students discover.** Clean separation of roles with dedicated tools.
- **Bottom-up adoption** — no admin needed to launch. One club signing up is enough to start.
- **Intentional, not addictive** — algorithm surfaces what's relevant to YOU in curated collections, avoiding infinite scrolling. 
- **Playful Polish meets Minimalist Design** — visually clean (warm neutrals, whisper borders) but interactively satisfying (physics-based micro-interactions).

---

## 3. How It Works

### Two types of accounts/experiences:

**Organizer Dashboard (Clubs/Communities):**
- Any registered university club can create an account
- They post event details via a distraction-free, Notion-like block editor
- Manage their own **Campus Hub**, follower count, and event history
- Access real-time data tables of attendees with 1-click CSV exports and live capacity tracking

**Student Passport (Attendees):**
- Created at signup with pre-filled info (name, course, year, branch)
- Identity is locked and acts as a universal ticket
- Navigates the **"Campus Pulse"** to find curated events
- Profile stores: course, branch, year, interests/domains, and a digital wallet of RSVPs

---

## 4. Key Features

### Campus Pulse (Discovery Dashboard)
- Curated, categorized view (e.g., "Happening Today", "For Your Major")
- Shows highly readable, information-dense event cards
- Algorithmic ranking based on:
  - Student's course and branch
  - Domains they've selected as interests
  - Past event registrations and interactions
  - Event urgency (deadline approaching = higher rank)
- NOT an infinite social feed — a structured dashboard

### The Student Passport (One-Tap Registration)
- Student profile stores verified `.edu` anchored details
- Event registration = one tap, triggering a satisfying micro-interaction (physics-based drop into wallet)
- Confirmation stored in student's personal calendar
- Completely eliminates "form-filling fatigue"

### Campus Hubs
- Public, minimalist workspace pages for clubs showing past and upcoming events
- Static resources, FAQs, and contact info
- "Follow" button for students

### Threaded Discussions
- Focused, professional Q&A boards attached to events
- Replaces noisy comment sections with structured communication

---

## 5. The Algorithm (Personalization Layer)

Unlike static bulletin boards, this platform ranks content based on:

| Signal | Weight |
|---|---|
| Student's selected interest domains | High |
| Student's course/branch match with event | High |
| Club follow relationship | Medium |
| Past registration behavior | Medium |
| Event deadline proximity | Medium |

Goal: A CSE-AI student should see ML workshops and hackathons at the top. A design student should see UI/UX events.

---

## 6. Why This Wins Over Existing Solutions

| Factor | Existing Tools | This Platform |
|---|---|---|
| Requires admin buy-in | ✅ Yes (fatal in India) | ❌ No |
| Student-first design | ❌ No | ✅ Yes |
| Frictionless UX (One-Tap RSVP)| ❌ No | ✅ Yes |
| Premium "Tactile Utility" Vibe| ❌ No | ✅ Yes |
| India-specific Context | ❌ No | ✅ Yes |
| Bottom-up Adoption | ❌ No | ✅ Yes |

---

## 7. Go-To-Market — JECRC First

### Unfair advantages:
- Hemant leads the **JECRC AI/ML Community** — first club account on the platform
- Direct relationships with other club leads at JECRC

### Launch sequence:
1. Build MVP UI Migration (Epic 6 & 7 - Tactile Utility Overhaul)
2. Onboard 3–5 JECRC clubs personally (AI/ML Community, coding clubs, entrepreneurship cell)
3. Get 100 students using it organically
4. Show traction → approach other clubs → approach HOD
5. Expand to other Jaipur universities (Manipal, Poornima, etc.)

---

## 8. Current Roadmap (Alignment)
- **Epics 1-5:** MVP Data Layer (Users, Roles, RSVPs, Tickets via Prisma/tRPC) [COMPLETED]
- **Epic 6:** Design System & Component Library MVP (Tactile Utility, NotionInter font)
- **Epic 7:** MVP UI Migration (Moving legacy UI to the new Tactile Utility framework)
- **Epic 8+:** Campus Hubs, Threaded Discussions, and Smart Additions

---

## 9. Tech Stack

- **Frontend:** Next.js + Tailwind CSS + shadcn/ui (customized for Tactile Utility)
- **Backend/DB:** PostgreSQL (Prisma), tRPC
- **Animations:** Motion/tailwindcss-animate for micro-actions
- **Hosting:** Vercel

---

## 10. The One-Line Pitch

> **"Campus Platform — the premium, distraction-free utility for discovering university events and communities."**
