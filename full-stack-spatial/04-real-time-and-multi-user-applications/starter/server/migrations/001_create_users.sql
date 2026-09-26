-- 001_create_users.sql: the accounts this API knows about. Carried over
-- unchanged from Course 5.3, which carried it over from Course 5.2's JSON
-- file. This lesson signs learners in with the same accounts so the
-- WebSocket upgrade in server.js has a real identity to authenticate — see
-- wsAuth.js. password_hash is always auth.js's self-describing scrypt
-- string, never a plain-text secret.
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL
);
