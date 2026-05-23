# Epic 0 Placeholder Backlog

This backlog tracks temporary or intentionally deferred behavior discovered during Epic 0. Each item is explicit so the codebase does not silently pretend unfinished work is production-ready.

## High Priority Follow-Ups

1. Organizer club selector for event creation
Current state: `event.create` now requires an existing organizer club membership, but the UI still does not let organizers choose among multiple managed clubs.
Target epic: Epic 3 / Story 3.1 through 3.3.

2. Real organizer event list and metrics
Current state: `/dashboard`, `/dashboard/events`, and `/dashboard/metrics` now show honest placeholder states instead of fabricated KPIs or event cards.
Target epic: Epic 5 and Epic 11.

3. Student profile identity fields
Current state: attendee tables and manual fallback no longer fabricate PRN or branch values. Those fields remain unavailable until the real `StudentProfile` model exists.
Target epic: Epic 1 and Epic 9.

4. Event editing
Current state: `/dashboard/events/[id]/edit` is still an explicit placeholder page.
Target epic: Epic 5 / Story 5.4 and 5.5.

5. Search and global discovery
Current state: `/search` and `/global` are placeholder routes and should stay clearly labeled until they are either built or removed from MVP navigation.
Target epic: Epic 10 and Epic 15.

## Medium Priority Follow-Ups

1. Real upload/storage configuration
Current state: the UI no longer masks upload failures with a fake Unsplash image. Organizers must use a real upload or paste a hosted URL manually.
Target epic: Epic 5 / Story 5.7.

2. Membership-based event authorization
Current state: many organizer actions still authorize against `authorId` instead of reusable club membership rules.
Target epic: Epic 3 / Story 3.4.

3. Legacy event-ticket QR dependency
Current state: Resolved in Epic 8. Passport and scan mode now use the permanent student QR contract.
Target epic: Completed in Epic 8.

4. Playwright coverage expansion
Current state: only the example smoke suite exists.
Target epic: Epic 16.
