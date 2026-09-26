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

// TODO 4: authenticateUpgrade(req). This is the same three-step check
// requireAuth() makes for an ordinary HTTP request in routes.js:
//   1. Parse req.headers.cookie with parseCookies (above), and look up
//      cookies.sid with getSession() from sessions.js.
//   2. If there is no valid session, return null.
//   3. Otherwise look up the account with findUserById(session.userId). If
//      it no longer exists (deleted since the cookie was issued), return
//      null.
// On success, return { user, session }. Never trust anything else about
// `req` here — not a query string, not a header the client could set by
// hand — because none of those prove who is holding the browser.
export function authenticateUpgrade(req) {
  throw new Error('authenticateUpgrade is not implemented yet — see TODO 4');
}
