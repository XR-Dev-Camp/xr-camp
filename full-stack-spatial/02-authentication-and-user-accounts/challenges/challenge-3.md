# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Add an account-lockout notice, and an admin-free way to test it.

## Task

1. In `rateLimit.js`, add `msUntilUnlocked(key)`, returning how many milliseconds remain before `isRateLimited(key)` would return `false` again (or `0` if it is not currently limited).
2. Have `login`'s `429` response include `{ error, retryAfterSeconds }`, using that function (rounded up to whole seconds). Add an HTTP `Retry-After` header with the same value — a real, standard HTTP header ([MDN: `Retry-After`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After)) clients and proxies already know how to read.
3. In `js/main.js`, show that countdown in the login form's error message ("Too many attempts. Try again in 3:42.") and update it once a second (a live region already exists for this — reuse `#login-errors`, or the status banner).
4. Add a route, available only in a test environment (guard it with `if (process.env.NODE_ENV === 'test')` or similar, and say clearly in a comment that it must never ship in a real deployment), that clears the rate limiter for one key — this is what makes the countdown testable in `server.test.js` without waiting 15 real minutes for every test run.
5. Add tests for the new `retryAfterSeconds` field and the countdown's boundary (0 seconds left, versus still limited).

## Why this matters

A rate limit that gives no feedback just looks broken to the person it is protecting — "invalid password" five times in a row, forever, with no explanation, teaches nothing about what actually happened. A visible, honest countdown is a small UX decision with real security value: it discourages the exact "keep trying" behaviour the limit exists to slow down, without hiding what is going on. The test-only escape hatch is itself a lesson: features written only to make automated testing possible need the same care about not leaking into production as any other code path — Course 5.5 studies exactly this category of mistake.

## Done when

- [ ] A `429` response includes a `Retry-After` header and a `retryAfterSeconds` field that counts down correctly across repeated requests.
- [ ] The login form shows and updates a human-readable countdown.
- [ ] The test-only reset route is guarded, commented, and never reachable when `NODE_ENV` is not `test`.
- [ ] `node --test` passes, including tests for the new behaviour.
