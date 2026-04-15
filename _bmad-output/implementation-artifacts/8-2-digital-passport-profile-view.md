# Story 8.2: The Digital Passport Profile View

Status: ready-for-dev
Depends on: [Story 8.1: University Domain Authentication](https://github.com/HemantKumar822/UniFeed/issues/118)

## Story

As a student,
I want to view my Digital Passport containing my basic details (PRN, Branch, Grad Year),
so that I know my identity is correctly anchored to the platform for future event registrations.

## Acceptance Criteria

1. **Given** I am an authenticated student
   **When** I navigate to the Profile/Passport tab
   **Then** I see a clean, structured view of my identity details
   **And** my email, PRN (derived/entered once), and Branch are prominently displayed using the Tactile Utility design aesthetics.

## Tasks / Subtasks

- [ ] Create Profile/Passport page UI
  - [ ] Implement clean, structured presentation layout according to Tactile Utility
- [ ] Connect profile data to database
  - [ ] Fetch user details (email, PRN, Branch, Grad Year)
  - [ ] Form for entering missing PRN/Branch if not already set (entered once)

## Dev Notes

- Relevant architecture patterns and constraints: Strict max-w-md constraints for mobile layouts. Tactile Utility Design System.
- Source tree components to touch: `src/app/passport/page.tsx` or similar profile route, tRPC routers for profile data fetch/update.
- Testing standards summary: Ensure data reads correctly and empty states gracefully request details.

### Project Structure Notes

- Alignment with unified project structure: App router standards.
- Detected conflicts or variances: None.

### References

- Cite all technical details with source paths and sections: [Source: epics.md#Story 8.2]

## Dev Agent Record

### Agent Model Used

Gemini 3.1 Pro

### Debug Log References

### Completion Notes List

### File List
