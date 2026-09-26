// DELIBERATELY VULNERABLE -- for learning on localhost only; never deploy.
//
// config.js: TODO 4. APP_SECRET gates /api/admin/stats (see routes.js) and
// is committed directly in this file, in the same repository the whole
// class can read. That is the bug: a value titled "secret" that anyone
// with read access to the source -- or to its git history, forever, even
// after a later commit deletes it -- can also read. See the README's
// "Secrets management" section for what to do instead (an environment
// variable, loaded from a file that is never committed) and why rotating a
// leaked secret, not just moving it, is the real fix once one has shipped.
//
// The value below is an obviously fake placeholder, not a real secret, so
// that a secret scanner reading this teaching repository does not (and
// should not) flag it as a live credential.
export const APP_SECRET = 'not-a-real-secret-change-me';
