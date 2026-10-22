# Event experience: design research and implementation plan

Date: 22 October 2026. Audience: students deciding whether to attend a campus event. Primary job: understand the event and confidently reserve a place.

## Research and decisions

These are design hypotheses informed by published guidance, not findings from user interviews.

- [NN/G: visual design principles](https://www.nngroup.com/articles/principles-visual-design/): hierarchy and proximity help communicate importance and relationships. Apply a distinct event title, group date/location, and place registration beside event content. Avoid equally weighted boxes competing for attention.
- [NN/G: progressive disclosure](https://www.nngroup.com/articles/progressive-disclosure/): expose frequently needed information first and label access to secondary information clearly. Keep date, location, availability and registration visible; separate discussion from the overview, without hiding the schedule or preparation behind extra accordions.
- [NN/G: modal and nonmodal dialogs](https://www.nngroup.com/articles/modal-nonmodal-dialog/): modal interruptions have interaction costs. Retain the existing user-requested preview for continuity, with an explicit close control and full-page destination; make the full event page the comfortable reading surface. Do not introduce more nested dialogs.
- [IBM Carbon: motion](https://www.carbondesignsystem.com/building-blocks/foundations/motion/overview): reserve expressive motion for selected moments and keep task feedback efficient. Use one expressive theme reveal; avoid ambient motion, bouncing cards and animated reading content.
- [MDN: using view transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using): snapshot the old and new document, then animate the new snapshot with a growing clip centered on the initiating control. Feature detection preserves theme changes without this browser capability.
- [W3C: animation from interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions): support disabling nonessential movement. The full-screen reveal is skipped under reduced motion. This is guidance from the AAA criterion, not a claim of platform-wide WCAG certification.

Material's current motion page requires JavaScript and did not expose usable guidance in the research reader; Carbon supplied the directly readable motion reference. No new animation library is needed.

## Diagnosis of the existing event screen

The screenshot gives an image more space than the actual image stage uses; the stage shrinks because aspect ratio and a height constraint transfer into automatic width. The small title competes poorly with that large empty space. Registration sits below the image rather than alongside it. The full page similarly separates the title, poster and decision controls too far apart. Mobile should establish identity before asking for commitment.

## Direction: campus event pass

Palette uses existing shared tokens: paper #f5f7fb, white #ffffff, ink #17243b, slate #536278, blue #1763dd. Dark surfaces become midnight #111827 and raised slate #182235, with readable cool-gray secondary text. Existing semantic success/warning/error colors retain their meanings. Display: Trebuchet MS/system rounded, strong restrained headings. Body: installed Inter/system. Utility: system sans with tabular figures for attendance. No font downloads.

Chosen composition:

    Back to events
    [month/day]  Host / category
                 Event title
                 [date and time] [location]
    ------------------------------------------------
    [complete poster + gallery] | [Registration      ]
    [Overview | Discussions  ] | [availability      ]
    [About / agenda / prepare] | [capacity/deadline ]
    [Host / contact          ] | [primary action    ]
                               | [Save | Calendar   ]

Mobile: heading, image, registration, then the long-form overview. Desktop: registration stays alongside the content while reading. The event pass's date stamp encodes real event data; no invented counters or decorative statistics. Posters remain contained, not cropped. Optional fields appear only when provided.

Alternative rejected: a full-width cinematic image above the title. It would repeat the screenshot's problem, bury registration and crop text-heavy posters. Critique of the first pass: a blue registration card alone was too generic, so the chosen direction also restores event identity through the real month/day stamp and a unified reading-and-action grid. Use borders and spacing to group information, not a card around every paragraph.

## Implementation

1. EventDetailPageShell.tsx: a single event identity header, real date stamp and grouped date/location; children hold the shared reading/action composition.
2. EventDetailContent.tsx and events/[id]/page.tsx: gallery and registration share a grid; sensible mobile reading order; consistent overview/discussion controls and quiet secondary actions. Preserve RSVP, waitlist, save, calendar and moderation behavior.
3. EventMediaGallery.tsx and EventCard.tsx: full-width image stage, readable thumbnails, compact preview with a clear escape to the full page.
4. ThemeToggle.tsx, theme-transition.ts and globals.css: both directions reveal the new theme from the actual button center to the furthest viewport corner; responsive duration approximately 520–760ms. Synchronously commit theme state in the snapshot callback. Scope pseudo-element styling to this effect. Skip on reduced motion or unsupported APIs. Clean up skipped/failed transitions and serialize repeated activation.

## Acceptance and focused verification

- Given an event with portrait or landscape media, when opened, then its image is visible without cropping or unexplained half-width space, and all provided details remain available.
- Given desktop or mobile, when reading an event, then title/date/location precede the decision and the layout has no horizontal overflow.
- Given either theme, when the visible toggle is activated, then the new theme expands from that control, reaches every viewport corner, persists after reload and preserves scroll position.
- Given reduced motion or an unavailable transition API, when toggling, then the theme still changes immediately without a full-screen animation.
- Verify one browser layout journey, one theme journey with fallbacks, existing heading test, and production build/type checks. Re-run the create/review/publish journey only if the shared event composition changes that flow. No unrelated full-suite run.

Status: complete. Visual inspection and final outcomes are recorded below.

## Implemented outcome and verification

Completed on 22 October 2026. The event full page and feed preview share a gallery/reading/registration composition. Full-page identity now includes the real month/day stamp, a stronger title and grouped date/location. Mobile shows identity and media before registration; a short scroll can be needed to reach the action. Overview and discussion have consistent controls, and Save/Calendar fit the registration panel without crowding. The shared dark palette now uses midnight/slate surfaces, lighter links, dark action text on light-blue buttons, and readable success labels.

The fluid reveal is live on every existing ThemeToggle instance. It starts at the activated button's center, works in both directions, preserves scroll, and persists through next-themes. Browser support is feature-detected; reduced motion and unsupported APIs use the direct theme change. Activations during an active reveal are ignored until cleanup. It is a circular liquid-like reveal, not a physical water simulation.

Final production build, lint and TypeScript passed. One existing heading test passed. Three focused Chromium journeys passed in 19.5 seconds: responsive event layout, admin creation/edit/review/publish/student registration/gallery, and theme reveal/persistence/keyboard/reduced-motion/unsupported-API behavior. Theme screenshots were inspected in desktop dark and mobile light, along with event light/dark and portrait/landscape media. No unrelated suite was run. Other browser engines were not exercised.

Visual review corrected subpixel test comparisons, crowded secondary actions and dark-mode button/status contrast. Image screenshots await decoding and repaint. The local production preview is running at http://localhost:3100; the sample event remains /events/42. No deployment, production database change or added package was needed.

User correction: dark mode uses neutral black (#0a0a0a), charcoal (#111111 / #191919), neutral gray text and neutral supporting panels. This supersedes the earlier midnight/slate direction. Blue remains an interactive accent; the theme reveal is unchanged.

## Compact preview refinement

The user's next refinement replaces the detail-filled drawer with a non-scrolling event preview. Its purpose is to help a student decide whether to explore the event. Existing typography, neutral black/charcoal and blue action tokens remain. Desktop pairs one contained cover image with essential facts; mobile stacks them. Titles and locations have bounded visual lines, with complete information on the full page. In short viewports the image and deadline are omitted to prioritize facts and navigation. The only primary action is View full event. Registration, long descriptions, gallery selection, schedule and discussion live on the full page. Preview-only full-detail component options were removed to keep the code simpler.

Acceptance: preview has no scrolling region; desktop, narrow phone and landscape sizes keep its close and full-page controls visible; opening the full page exposes complete information and registration. Verification is limited to the preview/layout check, the existing event publication/gallery journey, and the production build.

Verification for the compact preview: production build (including lint and TypeScript) passed. Two focused Chromium journeys passed in 13.9 seconds. The preview was checked at 1366×768, 375×812, 320×568 and 844×390 with no scrolling region and visible close/full-page controls. Desktop/mobile screenshots were inspected. The existing create/edit/review/publish/student registration/gallery journey also passed with the new preview contract. The server is running at port 3100. No unrelated suite was run.
