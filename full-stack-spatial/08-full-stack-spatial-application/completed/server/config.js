// config.js: FIXED (TODO 4). APP_SECRET now comes from the environment,
// never from source code, so the real value never reaches source control:
// not this file, not a commit, not git history. .env.example documents the
// variable's name and how to generate a value, without ever holding a real
// one itself. server.js's first import is env.js, which loads server/.env
// into process.env before this file (reached transitively, through
// routes.js) ever evaluates -- see env.js's own comment for why the import
// order matters here.
//
// Failing loudly with no fallback default matters here: a silently-applied
// default secret (or an empty string) would be just as forgeable as the
// hardcoded value this replaces, and far harder to notice.
const secret = process.env.APP_SECRET;
if (!secret) {
  throw new Error(
    'APP_SECRET is not set. Copy server/.env.example to server/.env and set a value '
    + '(see that file for how to generate one).',
  );
}
export const APP_SECRET = secret;
