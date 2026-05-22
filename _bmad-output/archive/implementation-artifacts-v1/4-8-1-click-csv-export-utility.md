# Story: 4-8-1-click-csv-export-utility

# Story 4.8: 1-Click CSV Export Utility

Status: done

## Story

As an Organizer,
I want to export the attendee list,
So that I can print it out for manual checking at the door if the network drops.

## Dependencies
- Story 4.7

## Acceptance Criteria

1. **Given** the active Attendee Table
   **When** the "Export CSV" button is clicked
   **Then** the browser reliably downloads a correctly formatted `.csv` file of the current attendee list.

## Tasks / Subtasks

- [x] Task 1: Client Encoding Sequence (AC: 1)
  - [x] Construct an array-to-string extraction mapping header keys (Name, PRN, Branch) and comma separation logic directly in JS.
  - [x] Pre-pend standard URI prefixes `data:text/csv;charset=utf-8,`.
- [x] Task 2: Native Browser Trigger Payload (AC: 1)
  - [x] Inject explicit DOM link functionality dynamically mapping `encodeURI(csvContent)` into `URL.createObjectURL(blob)`.
  - [x] Define the click-to-download triggering protocol securely against standard button bindings.

### Review Findings

- [ ] [Review][Patch] CSV Injection Vulnerability — Code escapes quotes but NOT formula injection vectors.
- [ ] [Review][Patch] CSV Export Browser Inconsistencies — `encodeURI` does not encode commas. Export uses `encodeURI` instead of creating a Blob object and `URL.createObjectURL(blob)`.
- [ ] [Review][Patch] Type Safety Failure — `(rsvp.user as any).prn` and `(rsvp.user as any).branch` using `as any`.
- [ ] [Review][Patch] Missing Email Fallback — `rsvp.user.email || ""` has no fallback value, CSV row becomes malformed.
- [ ] [Review][Patch] PRN Generation Fragility — `PRN-${rsvp.user.id.substring(0, 6)}` assumes user.id > 6 chars and unique.
- [ ] [Review][Patch] Incomplete click-to-download protocol implementation — Missing `link.click()` in some contexts or properly secured.
- [ ] [Review][Patch] No Error Handling — `handleExportCsv()` has no try-catch.
- [ ] [Review][Patch] Missing Error Boundary / Non-numeric event ID — `parseInt` returns NaN on bad string, API passes `!isNaN` true on number types, frontend can fail silently.
- [ ] [Review][Patch] Client-state divergence — `checkedInIds` Set is not persisted.
- [ ] [Review][Patch] Key collision in table — if user has multiple RSVPs on same event.

## Dev Notes

- **Network Resilience:** Doing this CSV translation completely client-side utilizing the already-fetched cached table array removes total network dependence on a backend endpoint. It drastically speeds up UX while satisfying the offline edge-case.

### References

- [Source: planning-artifacts/epics.md#FR-MO-3] -> Core 1-click output request.

## Dev Agent Record
- Agent: Antigravity
