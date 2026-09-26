# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Add a real per-connection rate limit to chat and annotation creation, matching the shape Course 5.4's `realtime.js` already used for position updates.

## Task

1. Re-read Course 5.4's `realtime.js` (`full-stack-spatial/04-real-time-and-multi-user-applications/completed/server/realtime.js`) — specifically `POSITION_MIN_INTERVAL_MS` and how `handlePosition` checks it *before* validating or broadcasting anything.
2. In this lesson's `completed/server/realtime.js`, add a sliding-window rate limit to the chat handler: no more than, for example, 5 messages per 10 seconds per connection (5.4's `CHAT_WINDOW_MS`/`CHAT_MAX_MESSAGES` pattern is a reasonable model), returning a clear `error` message over the WebSocket once exceeded — not silently dropping the message with no feedback.
3. Add an equivalent limit to `createAnnotation` in `routes.js` (a signed-in account should not be able to leave annotations faster than a real person plausibly could).
4. Write `node:test` assertions for both limits: send messages/annotations faster than the limit and assert the server responds with an error (over the WebSocket) or a `429` (over HTTP) once the limit is reached, and that a slower pace is never blocked.
5. In your journal, compare this fix to Challenge 1's (if you did it): what is different about rate-limiting a WebSocket message versus an HTTP request, and why does 5.4's position-sync limit check the rate *before* validating the message's contents?

## Why this matters

A real-time connection has no natural pause between messages the way a form submission does — nothing stops a modified client (or a script instead of a browser) from sending as fast as the network allows. This is the same principle Course 5.4 already applied to position updates; this challenge asks you to notice it was never applied to this lesson's own chat and annotation features, and to fix that gap the same way, on the server, independent of anything a well-behaved client already does on its own.

## Done when

- [ ] Chat messages faster than your chosen limit receive a clear error, not silence.
- [ ] Annotations faster than your chosen limit receive a `429`.
- [ ] `node:test` proves both limits, and a normal, slower pace of use is never falsely blocked.
- [ ] A short journal note compares this fix to rate-limiting an HTTP endpoint.
