# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

Add an eighth review target this lesson does not already cover — a missing rate limit on creating scenes and annotations — and a `node:test` that proves you fixed it.

## Task

1. In `completed/server/`, notice that `createScene` and `createAnnotation` (in `routes.js`) have no rate limit at all: a signed-in account can create as many scenes or annotations as it likes, as fast as it likes. Course 5.2's `rateLimit.js` (carried over unchanged into this lesson) already gives you `isRateLimited`, `recordFailedAttempt`, and `clearAttempts` — the same functions `login` already uses.
2. Add a rate limit to `createScene` and to `createAnnotation`: a reasonable ceiling (for example, 10 scenes or annotations per account per 15 minutes — reuse `rateLimit.js`'s existing window, or choose and justify your own) that returns `429` with a clear message once exceeded, the same shape `login` already uses for repeated failed attempts.
3. Write one `node:test` in `server.test.js` that creates scenes past your limit and asserts the server eventually responds `429`.
4. Update the README's Threat model table: which STRIDE category does an *unlimited* creation endpoint belong to, and why did this lesson's original seven not include it?

## Why this matters

A signed-in account with no rate limit on write endpoints can still cause real harm — filling a database with junk data, running up storage costs, or using the app as a spam relay against other users who read what it creates (like `getScene`'s annotations list). Every other lesson in this course that could be abused this way (login attempts, chat, position updates) already has a limit; this challenge asks you to notice, and close, the one this lesson's own review left open.

## Done when

- [ ] `createScene` and `createAnnotation` both return `429` once your chosen limit is exceeded, with a message a learner using the real app would understand.
- [ ] A new `node:test` proves it, and `npm test` still passes in full.
- [ ] The README's Threat model table has a new row (or an updated one) naming this threat.
