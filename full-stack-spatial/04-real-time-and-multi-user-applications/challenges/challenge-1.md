# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

Add a fourth message type — a "wave" gesture — and relay it the same way position updates are relayed.

## Task

1. On the server, add a small `MAX_WAVES_PER_MINUTE`-style rate limit (reuse the sliding-window idea from `isChatRateLimited` in `realtime.js`, at whatever rate feels reasonable) and a new branch in `handleConnection`'s message router: `if (message.type === 'wave') return handleWave(roomId, member, message);`.
2. Write `handleWave(roomId, member, message)`: check the rate limit, then `broadcast()` `{ type: 'wave', userId: member.userId, username: member.username, serverTime: Date.now() }` to the room — no fields at all need to come from the incoming message, since a wave carries no data beyond "who, and when."
3. On the client, add a "Wave" button next to the movement controls in `index.html`, a `sendWave()` method in `net.js` (a one-line `send({ type: 'wave' })`, no throttling object needed since the server already rate-limits it), and an `onWave` handler in `main.js` that shows something — a temporary line in the chat log ("alice waved!") is enough.
4. Add at least one test to `server.test.js` proving a wave is relayed to another member, and that exceeding your rate limit gets an error instead of a flood of waves.

## Why this matters

Every message type in this lesson — position, chat, block, report — follows the same shape: validate what needs validating, rate-limit what could be abused, resolve identity from the server's own record, and broadcast through the one shared function. A gesture with no payload at all is the simplest possible case of that shape, and building one from scratch is the fastest way to prove you actually understood the pattern, not just the specific four message types this lesson wrote for you.

## Done when

- [ ] A "Wave" button sends a `wave` message, and every other tab in the room sees it.
- [ ] Waving faster than your own rate limit produces an error, not an unbounded flood of messages.
- [ ] At least one new test in `server.test.js` covers the wave message type, and `node --test` passes.
