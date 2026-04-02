# UniFeed — Campus Event & Community Platform

> **Status:** Early ideation — problem validated, MVP scope TBD  
> **Working Title:** UniFeed  
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
- Generic tools aren't personalized — same feed for a CSE student and a MBA student

### The real gap:
> There is no mobile-native, student-first platform where university clubs can broadcast and students can discover what's happening on campus — personalized to their domain, course, and interests.

---

## 2. The Solution — UniFeed

An Instagram-style campus social platform — but purpose-built for university communities. Not for reels or personal posts. Only for clubs, communities, and events.

### Core philosophy:
- **Clubs post. Students discover.** Clean separation of roles.
- **Bottom-up adoption** — no admin needed to launch. One club signing up is enough to start.
- **Personalized, not static** — algorithm surfaces what's relevant to YOU, not a broadcast to everyone.

---

## 3. How It Works

### Two types of accounts:

**Club/Community Accounts:**
- Any registered university club can create an account
- They post event posters, announcements, workshop details, hackathon info
- Manage their own profile, follower count, post history
- Can tag: domain (AI/ML, Web Dev, Design, Finance, etc.), event type, date, registration deadline

**Student Accounts:**
- Created at signup with pre-filled info (name, course, year, branch)
- Can only interact — like, save, register, follow clubs
- Cannot post publicly (keeps feed clean, no noise)
- Profile stores: course, branch, year, interests/domains

---

## 4. Key Features

### Feed (Home Screen)
- Instagram-style scrollable feed
- Shows posts/posters from clubs the student follows
- Algorithmic ranking based on:
  - Student's course and branch
  - Domains they've selected as interests
  - Past event registrations and interactions
  - Event urgency (deadline approaching = higher rank)
- NOT a static chronological feed — personalized for each student

### Discovery / Search
- Search by club name, event type, domain, keyword
- "For You" section — events recommended based on profile even from clubs not followed
- Filter by: upcoming / this week / free / with certificate / hackathon / workshop

### One-Tap Registration
- Student profile stores name, email, roll number, branch, year
- Event registration = one tap, no form filling
- Confirmation stored in student's "My Events" tab
- Optional: export to calendar

### Club Profiles
- Public page showing all past and upcoming events
- Follower count, event history
- "Follow" button for students

### Notifications
- Smart push notifications — not spam
- "Event tomorrow you might like" based on interest
- "Registration closing in 24 hours" for saved events
- "New post from [Club you follow]"

### Student Profile
- Course, branch, year (set at signup)
- Domains of interest (selected tags: AI/ML, design, entrepreneurship, etc.)
- Events attended / registered
- Clubs followed

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
| Event type preference (workshops vs talks vs hackathons) | Low-Medium |

Goal: A CSE-AI student should see ML workshops and hackathons at the top. A design student should see UI/UX events. Not the same feed for everyone.

---

## 6. Why This Wins Over Existing Solutions

| Factor | Existing Tools | This Platform |
|---|---|---|
| Requires admin buy-in | ✅ Yes (fatal in India) | ❌ No |
| Student-first design | ❌ No | ✅ Yes |
| Personalized feed | ❌ No | ✅ Yes |
| One-tap registration | ❌ No | ✅ Yes |
| Mobile-native UX | Partial | ✅ Yes |
| India-specific context | ❌ No | ✅ Yes |
| Bottom-up adoption | ❌ No | ✅ Yes |

---

## 7. Go-To-Market — JECRC First

### Unfair advantages:
- Hemant leads the **JECRC AI/ML Community** — first club account on the platform
- Direct relationships with other club leads at JECRC
- Can approach HODs and faculty with a working prototype
- Knows the exact pain point from the inside

### Launch sequence:
1. Build MVP (core feed + club posting + student discovery)
2. Onboard 3–5 JECRC clubs personally (AI/ML Community, coding clubs, entrepreneurship cell)
3. Get 100 students using it organically
4. Show traction → approach other clubs → approach HOD
5. Expand to other Jaipur universities (Manipal, Poornima, etc.)
6. Template the onboarding so any university can self-serve

### Cold start solution:
- Hemant's own community = Day 1 content
- No chicken-and-egg problem if the founder IS the first club

---

## 8. MVP Scope (Build First)

Just enough to prove the core loop works:

- [ ] Student signup with profile (course, branch, year, interests)
- [ ] Club account creation + posting (image/poster + event details)
- [ ] Home feed (followed clubs, basic ranking)
- [ ] One-tap event registration
- [ ] Basic search/filter
- [ ] Push notifications (event reminders)

**NOT in MVP:**
- Full personalization algorithm (manual curation first)
- Multi-university support
- Analytics dashboard for clubs
- Monetization

---

## 9. Tech Stack (Suggested)

Given Hemant's existing stack:

- **Frontend:** Next.js + Tailwind CSS
- **Backend/DB:** Supabase (auth, database, storage)
- **Notifications:** Supabase + web push or OneSignal
- **Hosting:** Vercel
- **Image storage:** Supabase Storage

---

## 10. Open Questions to Resolve

- [ ] What do we call it? (Name TBD)
- [ ] Web-first or mobile-first? (PWA vs native app)
- [ ] How do clubs verify they're a real JECRC club? (manual approval vs open)
- [ ] Does the platform expand beyond events? (study groups, notes, placements?)
- [ ] Monetization path? (premium clubs, sponsored events, placement tie-ins?)
- [ ] How do we handle multiple universities with different club structures?

---

## 11. Broader Vision (Post-MVP)

Once JECRC is working:
- Expand to other universities in Rajasthan
- White-label / self-serve onboarding for any university
- Analytics for clubs (reach, registrations, engagement)
- Placement/internship board integrated into the same platform
- Alumni network layer
- Potential B2B angle: companies pay to post internships/events to targeted student segments by course + interest

---

## 12. The One-Line Pitch

> **"UniFeed — your university's personalized feed of events, clubs, and what's actually happening on campus."**

---

*Document generated from ideation session — April 2026*  
*Working title: UniFeed (subject to change)*  
*Continue building this out with your AI agent in VS Code*
