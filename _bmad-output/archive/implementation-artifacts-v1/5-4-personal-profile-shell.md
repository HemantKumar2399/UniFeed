# Story: 5-4-personal-profile-shell

# Story 5.4: Personal Profile Shell

Status: backlog

## Story

As a Student,
I want a dedicated profile page,
So I can verify my connected account identity and access my settings.

## Dependencies
- Story 1.4

## Acceptance Criteria

1. **Given** the Bottom Navigation Bar
   **When** I tap the "Profile" icon
   **Then** I am routed to `/profile`, where my User Avatar, Name, and PRN are displayed.

## Tasks / Subtasks

- [ ] Task 1: UI Route Construction (AC: 1)
  - [ ] Scaffold `app/(protected)/profile/page.tsx`.
  - [ ] Extract NextAuth `useSession()` extracting standard `user.image` and `user.email` metadata perfectly.
- [ ] Task 2: Visual Structure (AC: 1)
  - [ ] Arrange the component leveraging a vertical flex layout `flex-col items-center py-10` mapping an elegant clean profile card.
  - [ ] Embed the default NextAuth Logout logic into a red-tinted Destructive Button correctly to complete cycle!

## Dev Notes

- **Consistent Typography:** Ensure PRNs (emails extracted) utilize the specific `text-zinc-400 text-sm` monochrome pairing established universally.

### References

- [Source: planning-artifacts/ux-design-specification.md#Typography] -> Monochrome standard font weights.

## Dev Agent Record
- Agent: Antigravity
