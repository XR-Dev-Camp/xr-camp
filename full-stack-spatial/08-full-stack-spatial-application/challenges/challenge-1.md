# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

Add a rate limit to the description-draft endpoint, so one account cannot request unlimited drafts in a row.

## Task

1. Open `server/rateLimit.js` and re-read how `isRateLimited`, `recordFailedAttempt`, and `clearAttempts` already work for login attempts in `routes.js`'s `login` function.
2. In `describeScene` (`server/routes.js`), build a rate-limit key from the account, for example `` `describe:${auth.user.id}` ``.
3. Before building a draft, call `isRateLimited` with that key. If it is rate-limited, respond with status 429 and a short JSON error, the same shape `login` already uses.
4. After a successful draft, call `recordFailedAttempt` with the same key (reusing the existing function, even though nothing "failed", is the simplest way to reuse `rateLimit.js`'s counter — say so in a comment).
5. Write one `node:test` in `server/server.test.js` that requests a draft more times than the limit allows in quick succession, and asserts that at least one of those requests returns 429.
6. Run `npm test` and confirm your new test passes alongside the existing ten.

## Why this matters

`server/ai.js`'s comment already notes that a real AI provider costs money or time per call, even though the mock provider used in this capstone does not. A rate limit on this endpoint is what stands between "safe to ship" and "one buggy client script that calls this in a loop" once a real provider is ever plugged in (see the Explorer challenge) — and it is good practice even while the provider stays mock, since an unlimited endpoint is still one more thing an attacker could use to slow your server down.

## Done when

- [ ] `describeScene` returns 429 after too many requests from the same account in a short window.
- [ ] A normal, occasional request still succeeds.
- [ ] A new `node:test` proves both behaviours.
- [ ] `npm test` passes in full, including your new test.
