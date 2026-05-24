# Story 17.3: Live Scan And Attendee Sync

Status: done

## Summary

Updated organizer attendance surfaces so scan mode and attendee management react to check-ins through the shared realtime stream.

## Implemented

- Scan mode now reads checked-in counts from the live attendance hook
- Attendee management now hydrates once and reapplies filter/sort state locally as live roster updates arrive
- Manual check-in fallback no longer depends on attendee-page invalidation for the main roster refresh path
- QR and manual check-in mutations both emit attendance updates

## Verification

- `npm run test:unit`

