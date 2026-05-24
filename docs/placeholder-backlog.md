# Epic 0 Placeholder Backlog

This backlog tracks temporary or intentionally deferred behavior discovered during Epic 0. Each item is explicit so the codebase does not silently pretend unfinished work is production-ready.

## High Priority Follow-Ups

1. Organizer club selector for event creation
Current state: `event.create` now requires an existing organizer club membership, but the UI still does not let organizers choose among multiple managed clubs.
Target epic: Epic 3 / Story 3.1 through 3.3.

2. Global discovery
Current state: `/global` is a placeholder route and should stay clearly labeled until it is either built or removed from MVP navigation.
Target epic: Epic 10 and Epic 15.

## Medium Priority Follow-Ups

1. Real upload/storage configuration
Current state: local uploads work in development and presigned uploads work when storage is configured. Deployed environments still need real bucket credentials and `UPLOAD_PUBLIC_BASE_URL` pointing at the public image host.
Target epic: Epic 5 / Story 5.7.

2. Legacy event-ticket QR dependency
Current state: Resolved in Epic 8. Passport and scan mode now use the permanent student QR contract.
Target epic: Completed in Epic 8.

3. Playwright coverage expansion
Current state: only the example smoke suite exists.
Target epic: Epic 16.
