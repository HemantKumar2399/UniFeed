# Remaining product and deployment work

Updated 22 October 2026. The older claim that every placeholder was resolved was inaccurate.

- Add mailbox ownership verification and abuse/rate limiting before public account registration at scale.
- Choose a deployment target and configure object storage/CDN content policy and operational monitoring.
- Use shared pub/sub before running multiple app instances.
- Build reminder/digest delivery only if it belongs in the product scope; current UI labels them as future delivery preferences.
- Validate the physical camera/QR workflow on the phones used at the event. Browser automation cannot prove camera hardware behavior.
- Revisit large event/admin editor components in focused changes as new behavior is added; avoid a general rewrite.

Google login, payments and employer portfolios are outside the current hackathon demo. Their dead controls/claims were removed rather than presented as working features.
