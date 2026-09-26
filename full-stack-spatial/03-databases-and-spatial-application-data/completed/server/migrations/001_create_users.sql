-- 001_create_users.sql: the accounts this API knows about. Carried over from
-- Course 5.2's JSON file, one row per account instead of one array element.
-- password_hash and recovery_code_hash are always auth.js's self-describing
-- scrypt strings (see completed/server/auth.js) — never a plain-text secret.
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  recovery_code_hash TEXT NOT NULL,
  created_at TEXT NOT NULL
);
