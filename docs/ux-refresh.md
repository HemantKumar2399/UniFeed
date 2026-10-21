# UniFeed UX refresh

The audience is students finding a worthwhile event and organizers running it. The primary student screen should answer: what is happening, when, where, and can I join?

The visual direction is a campus activity board: a cool paper canvas, clear blue wayfinding, and event imagery as the expressive element. Palette: paper `#f5f7fb`, ink `#17243b`, secondary ink `#536278`, action blue `#1763dd`, light blue `#edf4ff`, and white cards. Existing semantic status colors remain for actual event state. Dark mode uses the existing semantic surface system.

Display typography uses a rounded Trebuchet/system stack, body text retains Inter, and dates/counts use tabular numbers. This avoids adding another font download. Event date stamps are the signature: useful calendar information, not decoration.

Desktop uses a quiet 240px navigation rail and a readable main canvas. Mobile uses five consistently labeled destinations with notifications/search in the top bar. Both role shells share one implementation. Navigation no longer remounts page trees for blur animations. Visible focus, a skip link, large touch targets, motion preferences and safe-area spacing are baseline behavior.

Home opens with a meaningful heading and discovery action, then the week ahead and the personalized feed. Cards show event name, host, time, location, availability, and capacity. Event details keep one clear registration action. Organizer screens use the same workspace frame and a direct Create event action.

Unsupported settings and sign-in methods are removed from active flows. Notification failures show retry. Pending identity is distinct from verified identity. Offline scans retain rejected/unresolved records and explain the outcome.

Verification must include desktop and narrow mobile views of home, discovery, event details, passport and organizer workflows. Layout and copy choices are reviewed visually; tests protect navigation, authorization, registration, reconciliation and identity behavior rather than exact class names or source order.
