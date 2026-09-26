// wsAuth.js: the one new idea this lesson adds to authentication — checking
// who is asking *before* a WebSocket connection is allowed to open at all,
// using the exact same session cookie Course 5.2 built for HTTP routes.
//
// A browser's WebSocket constructor cannot set custom headers, so this
// cannot reuse an Authorization header the way an API client might. What it
// can do, for a same-origin `ws://` or `wss://` URL, is send the page's
// ordinary cookies with the upgrade request — the same way a fetch() with
// credentials: 'include' does. server.js reads that cookie here, on the
// plain node:http `upgrade` event, before ws ever takes over the socket.

import { parseCookies } from './cookies.js';
import { getSession } from './sessions.js';
import { findUserById } from './db.js';

// Returns { user, session } for a request carrying a valid, unexpired
// session cookie, or null. Never trusts anything else about the request —
// not a query string, not a header the client could set by hand — because
// none of those prove who is holding the browser.
export function authenticateUpgrade(req) {
  const cookies = parseCookies(req.headers.cookie);
  const session = getSession(cookies.sid);
  if (!session) return null;
  const user = findUserById(session.userId);
  if (!user) return null;
  return { user, session };
}
