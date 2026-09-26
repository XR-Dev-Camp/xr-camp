// wsAuth.js: carried over from Course 5.4. Checks who is asking *before* a
// WebSocket connection is allowed to open at all, using the same session
// cookie Course 5.2 built for HTTP routes -- a browser's WebSocket
// constructor cannot set custom headers, so this cannot reuse an
// Authorization header the way an API client might; it reads the ordinary
// cookies the upgrade request already carries instead.
//
// checkOrigin (also carried over from Course 5.4) is the other half of that
// check: a cookie alone cannot tell this app's own page apart from a
// hostile page in another tab, since browsers attach cookies to a
// cross-site WebSocket handshake too (cross-site WebSocket hijacking, or
// CSWSH). It rejects any upgrade whose Origin header is missing or is not
// in an explicit allow-list.
import { parseCookies } from './cookies.js';
import { getSession } from './sessions.js';
import { findUserById } from './db.js';

export function checkOrigin(req, allowedOrigins) {
  const origin = req.headers.origin;
  if (!origin) return false;
  return allowedOrigins.includes(origin);
}

export function authenticateUpgrade(req) {
  const cookies = parseCookies(req.headers.cookie);
  const session = getSession(cookies.sid);
  if (!session) return null;
  const user = findUserById(session.userId);
  if (!user) return null;
  return { user, session };
}
