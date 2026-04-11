# Story: 5-5-active-expired-ticket-sorting

# Story 5.5: Active / Expired Ticket Sorting

Status: backlog

## Story

As a Student,
I want my profile to securely split my RSVPs into "Upcoming" and "Past" buckets,
So I easily know where I'm going vs where I've been.

## Dependencies
- Story 5.4
- Story 3.7

## Acceptance Criteria

1. **Given** the Profile View
   **When** I view my tickets
   **Then** they are segregated locally into 2 mutually exclusive tabs (Upcoming vs Past) by comparing the Javascript `Date` standard payload logically!

## Tasks / Subtasks

- [ ] Task 1: Tab Component Build (AC: 1)
  - [ ] Include Radix UI or a custom state tracker `[activeTab, setActiveTab]` holding `"upcoming" | "past"`.
- [ ] Task 2: Sub-Render Query (AC: 1)
  - [ ] Mount the RSVP timeline output constructed in 3.7.
  - [ ] Apply `array.filter(e => e.date > Date.now())` for Upcoming cleanly, avoiding massive redundant database trips.

## Dev Notes

- **Timezone Awareness Check:** Ensure the Prisma payloads encode Dates accurately globally utilizing strict ISO 8601 formatting preventing client-shift layout discrepancies!

### References

- [Source: planning-artifacts/epics.md#FR-RE-3] -> Split requirement between active RSVPs and historical data bounds natively.

## Dev Agent Record
- Agent: Antigravity
