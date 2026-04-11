## Deferred from: code review of 3-2-rsvp-api-mutation-layer (2026-04-11)
- Missing `onError` Event Emitter handling - If tx.rSVP.create fails because of a P2002 duplicate unique key error, it throws out of the transaction. Capacity isn't actually overbooked, so no emitter changes needed.
