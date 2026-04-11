# Story: 4-5-secure-image-upload-pipeline

# Story 4.5: Secure Image Upload Pipeline

Status: backlog

## Story

As an Organizer,
I want to upload high-fidelity cover photos for my events,
So that they look attractive in the Student Feed.

## Dependencies
- Story 4.3

## Acceptance Criteria

1. **Given** the Media step of the event creator
   **When** an image is uploaded
   **Then** the client requests a secure presigned URL from the backend.
2. **And** uploads the image directly to object storage without choking the Node server, returning the final image URL to the form.

## Tasks / Subtasks

- [ ] Task 1: TRPC URL Generation (AC: 1)
  - [ ] Configure `upload.getPresignedUrl` in the backend leveraging `protectedOrganizerProcedure` from 4.1.
  - [ ] Initialize AWS SDK or specific object-store utilities to vend the PUT url with strict 5MB size policies.
- [ ] Task 2: Front-end Direct PUT Injection (AC: 2)
  - [ ] Attach `<input type="file" accept="image/*" />` to step 2 of the form widget.
  - [ ] Utilize vanilla `fetch` or Axios to `PUT` the local blob precisely to the vended pre-signed URL upon selection.
  - [ ] Bind the finished URL output into the NextJS Form payload logic directly securely.

## Dev Notes

- **Architecture Trap Check:** NEVER pipe base64 encoded images directly upward into a Next API Route or Postgres table (it crashes databases and chokes JS runtimes). The front-end MUST execute a Direct-To-Storage PUT leveraging a temporal short-lived signature.

### References

- [Source: planning-artifacts/architecture.md#Upload Architecture] -> S3 / Direct Upload mandates mapped herein.

## Dev Agent Record
- Agent: Antigravity
