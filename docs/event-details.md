# Creating and viewing rich events

Admins can choose **Create event** in the review queue or organizer workspace. Organizers use **Create event** in their workspace. Community permissions and the existing submit → approve → publish flow still apply.

The editor supports the existing title, description, start time, deadline, venue, capacity, audience, tags and benefits, plus:

| Field | Behavior |
| --- | --- |
| Cover image | Existing upload or hosted URL; displayed in full without cropping the poster |
| Event gallery | Up to six additional uploaded images or hosted URLs; removable in the editor |
| Schedule / agenda | Optional plain text, up to 4,000 characters; line breaks are preserved |
| What to bring / requirements | Optional preparation and accessibility notes, up to 2,000 characters |
| Organizer contact email | Optional validated email, displayed as a contact link |
| Venue / directions link | Optional HTTP(S) link opened in a separate tab |

Empty optional sections stay hidden. Gallery thumbnails are keyboard-accessible buttons. Missing images have a fallback, and other images remain selectable. Event description and notes render as text rather than HTML.

Both the full page and feed quick view show the additional information and images. Quick view has a close button and a link to the full page. The registration panel keeps capacity, the deadline, registration, saving and calendar actions together. Admin reviewers can inspect the complete gallery and additional details before approving.

The additive `20261022020000_rich_event_details` migration gives existing events an empty gallery and nullable optional fields. Apply migrations and regenerate Prisma before running the updated app. Upload storage requirements are unchanged: local uploads are development-only; production requires object storage or a hosted image URL.

## Verification for this change

Verification is deliberately focused following the user's request to avoid repeated full-suite runs. The affected event/schema/editor/heading tests, TypeScript and production build are checked, followed by one browser journey through admin creation, reload/edit, review, approval, publication, student registration and gallery use on desktop/mobile. Final results are recorded in the implementation spec.

Completed on 22 October 2026: 56 affected tests passed, TypeScript and the production build (including lint) passed, and the focused Chromium journey passed against the final production build. Desktop and 375px mobile screenshots were inspected. No unrelated unit/browser suites were rerun. Production object storage and physical camera behavior were outside this change.

The isolated local demo contains **Campus Build Night · Demo**, at `http://localhost:3100/events/42`, with two locally served sample posters and complete optional details. This is explicitly sample content, not an actual scheduled event. The original application database was not modified.

The [subsequent design research and implementation](event-experience-design.md) records the revised event page, quick view, fluid theme reveal and focused verification.
