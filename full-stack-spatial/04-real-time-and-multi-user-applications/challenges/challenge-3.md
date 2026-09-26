# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Add a second room, and a way to move between them.

## Task

1. Add a second entry to `KNOWN_ROOMS` in `server/rooms.js` (e.g. `'quiet-corner'`), and a small `<select>` or pair of buttons in `index.html` for choosing a room before (or after) connecting.
2. In `js/net.js`, support switching rooms without a full page reload: `stop()` the current connection cleanly (send a real close, not just abandon the socket) and open a new one with the new room name. Decide, and document in a comment, what happens to state that belonged to the old room — should the roster and chat log clear, or should the learner be able to switch back and see them again?
3. On the server, make sure a member who switches rooms is removed from the old room's presence (a `leave` event fires there) and added to the new one's (a `join` event fires there) — `handleConnection`'s existing lifecycle assumes one room per connection for its whole lifetime, so switching rooms in this design means closing one WebSocket and opening a new one, which naturally triggers `leaveRoom`'s cleanup for the old room and `joinRoom`'s setup for the new one.
4. Add a short-lived "recently active rooms" indicator: track, in server memory, how many members are currently in each `KNOWN_ROOMS` entry, and expose it — a plain `GET /api/rooms` HTTP route returning `[{ roomId, memberCount }]` is enough; no WebSocket needed for this part.
5. Write at least one test proving a member who "moves" from one room to another stops receiving that room's messages and starts receiving the other's.

## Why this matters

Every real chat or presence system beyond a single fixed room has to answer the same question this challenge raises: what happens to a connection's identity and state when the thing it is connected *to* changes? There is no single right answer — closing and reopening the connection (this challenge's approach) is simpler to reason about than keeping one connection alive across rooms, at the cost of a visible reconnect. Working through that trade-off yourself, instead of being told the answer, is the point of an "Explorer" challenge.

## Done when

- [ ] At least two rooms exist, and a learner can choose between them from the UI.
- [ ] Switching rooms correctly removes a member from the old room's roster (for everyone else there) and adds them to the new one's.
- [ ] `GET /api/rooms` returns an accurate member count per room.
- [ ] A new automated test covers switching rooms, and `node --test` passes.
