// wsAuth.js: carried over unchanged from Course 5.4. Checks who is asking
// *before* a WebSocket connection is allowed to open at all, using the
// same session cookie Course 5.2 built for HTTP routes -- a browser's
// WebSocket constructor cannot set custom headers, so this cannot reuse an
// Authorization header the way an API client might; it reads the ordinary
// cookies the upgrade request already carries instead.
import { parseCookies } from './cookies.js';
import { getSession } from './sessions.js';
import { findUserById } from './db.js';

export function authenticateUpgrade(req) {
  const cookies = parseCookies(req.headers.cookie);
  const session = getSession(cookies.sid);
  if (!session) return null;
  const user = findUserById(session.userId);
  if (!user) return null;
  return { user, session };
}
