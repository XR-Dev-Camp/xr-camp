# Challenge 2: Creative

**Optional.** Roughly 45-60 minutes.

Make the room reflect your own language, culture, or community.

## Task

1. Change the room's name from "main-hall" to something that means something to you — a place from your city, a word in your own language for "gathering" or "meeting place" — updating `KNOWN_ROOMS` in `server/rooms.js` and the room string in `js/net.js` to match. Keep the underlying mechanism (an allow-list checked on the server) exactly as it is; only the name changes.
2. Give the avatars a small visual identity beyond a plain colour: a pattern, a shape from your own culture's craft or textile traditions, or a colour palette that means something to you specifically (not a generic "nice colours" choice — write, in a comment, *why* you chose it). `js/scene.js`'s `makeAvatarMesh` is where to make this change.
3. Add one system chat message, sent from the client when you join, greeting the room in your own language alongside English — for example `"¡Hola! / Hello!"` — and explain in a comment or in your journal what the phrase means and why you chose it.
4. Re-run `tests/checklist.md`'s accessibility items against your changes: a new avatar shape or colour still needs to pass contrast and motion checks, and any new text still needs a plain-language 2D equivalent.

## Why this matters

A shared room is meant to feel like somewhere; a generic "Room 1" with identical grey avatars does not. Small, deliberate choices — a name, a shape, a greeting — are what make a tool feel like it was built by and for a real community, not assembled from a template. This is also good practice for a portfolio: a screenshot of "the exercise, exactly as given" says less about you than one small change that is clearly, specifically yours.

## Done when

- [ ] The room's name is changed everywhere it appears (server and client agree, or the WebSocket upgrade will be rejected with a 1008 close code).
- [ ] Avatars look different from the reference solution's plain colours, in a way you can explain.
- [ ] A greeting in your own language appears when you join, and it still passes the accessibility checklist.
