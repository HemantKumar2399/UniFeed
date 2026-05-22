## Previously deferred from: code review of 15-1-database-scoring-weight-adjustments.md (2026-04-17)
- Use an authoritative student-profile source for High (Course Match) signal instead of email-local-part heuristics [src/server/api/routers/event.ts:109] — resolved on 2026-04-17.
- Define an independent user preference source for High (Selected Domains) signal instead of deriving it from followed club names [src/server/api/routers/event.ts:118] — resolved on 2026-04-17.

## Resolved from deferred backlog (2026-04-17)
- Implemented explicit independent feed preference signals from request context in [src/server/services/feed-preferences.ts](src/server/services/feed-preferences.ts) and integrated into [src/server/api/routers/event.ts](src/server/api/routers/event.ts), replacing heuristic and conflated signal derivation paths.
