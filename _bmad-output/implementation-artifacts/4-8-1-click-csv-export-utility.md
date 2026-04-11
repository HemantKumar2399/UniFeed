# Story: 4-8-1-click-csv-export-utility

# Story 4.8: 1-Click CSV Export Utility

Status: backlog

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

- [ ] Task 1: Client Encoding Sequence (AC: 1)
  - [ ] Construct an array-to-string extraction mapping header keys (Name, PRN, Branch) and comma separation logic directly in JS.
  - [ ] Pre-pend standard URI prefixes `data:text/csv;charset=utf-8,`.
- [ ] Task 2: Native Browser Trigger Payload (AC: 1)
  - [ ] Inject explicit DOM link functionality dynamically mapping `encodeURI(csvContent)` into `URL.createObjectURL(blob)`.
  - [ ] Define the click-to-download triggering protocol securely against standard button bindings.

## Dev Notes

- **Network Resilience:** Doing this CSV translation completely client-side utilizing the already-fetched cached table array removes total network dependence on a backend endpoint. It drastically speeds up UX while satisfying the offline edge-case.

### References

- [Source: planning-artifacts/epics.md#FR-MO-3] -> Core 1-click output request.

## Dev Agent Record
- Agent: Antigravity
