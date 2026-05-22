# Story 11.3: 1-Click CSV Export

Status: ready-for-dev
Depends on: [Story 11.2: Real-time Attendee Heatmap Table](https://github.com/HemantKumar822/UniFeed/issues/62)

## Story

As a club organizer,
I want to download my attendee list instantly,
so that I can provide the physical gate security with an accurate list for check-in.

## Acceptance Criteria

1. **Given** I am viewing the attendee data table for an event
   **When** I click the "Export to CSV" secondary button
   **Then** a formatted CSV downloads immediately containing the finalized list of confirmed attendees.

## Tasks / Subtasks

- [ ] Implement "Export to CSV" Action Button
  - [ ] Apply Secondary Tactile UI styling
- [ ] Scaffold CSV Generation logic
  - [ ] Transform table data or query fresh server-side payload to generate CSV attachment to client

## Dev Notes

- Relevant architecture patterns and constraints: "Export to CSV" secondary button styling (Solid Translucent Gray).
- Source tree components to touch: `src/components/AttendeeTable.tsx` / `src/components/ExportCSV.tsx`, `src/server/api/export.ts` if server-sided.
- Testing standards summary: Check CSV headers and encoding structure.

### Project Structure Notes

- Alignment with unified project structure: Browser-native or fetch-blob export.
- Detected conflicts or variances: None.

### References

- Cite all technical details with source paths and sections: [Source: epics.md#Story 11.3]

## Dev Agent Record

### Agent Model Used

Gemini 3.1 Pro

### Debug Log References

### Completion Notes List

### File List
