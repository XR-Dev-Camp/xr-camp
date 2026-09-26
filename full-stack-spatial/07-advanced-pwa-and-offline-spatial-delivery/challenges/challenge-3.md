# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Resume a single interrupted file partway through, instead of only skipping files that already finished.

## Task

1. Read [MDN: HTTP range requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests). A server that supports them answers a request with a `Range: bytes=1000-` header with a `206 Partial Content` response containing only the remaining bytes, and advertises support with an `Accept-Ranges: bytes` response header on ordinary requests.
2. In `download-manager.js`, before starting a fresh fetch for a file, check whether a *partial* copy already exists (you will need a new, small OPFS or Cache API record of "bytes saved so far" per file — `bundle-store.js`'s current `saveFile` only ever saves a whole, finished file, so this means adding a second, smaller save path for in-progress files).
3. If a partial copy exists, first send a lightweight request (or check a cached response's headers) to confirm the server still supports ranges and the file has not changed, then fetch only the missing range with a `Range` header, and append the new bytes to the partial copy before finally saving the completed file the normal way.
4. If the server does not send `Accept-Ranges: bytes` (Python's `http.server`, used to test this project, does not), fall back to this lesson's existing behaviour: re-download the whole file.
5. Test it: start a download, cut the connection after the larger file (`CesiumMilkTruck.glb`) is partway through, reconnect, and confirm (with the Network panel) that the resumed request only asks for the missing bytes when the server supports it.

## Why this matters

This lesson's own resume logic works at the level of whole files: a 370 KB model that was 90% downloaded when the connection dropped restarts from zero. Range requests are the real technique production offline-delivery tools (including most download managers and video players) use to avoid exactly that waste — genuinely useful on a slow or metered connection, and a good example of a browser feature that only pays off once you check for it, since not every server supports it.

## Done when

- [ ] A file interrupted partway through resumes from where it left off, when the server supports range requests.
- [ ] The fallback (re-download the whole file) still works against a server that does not.
- [ ] The Network panel shows a real `206 Partial Content` response for the resumed request, with a `Content-Range` header matching what was actually missing.
