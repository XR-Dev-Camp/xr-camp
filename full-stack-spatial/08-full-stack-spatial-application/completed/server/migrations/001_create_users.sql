-- 001_create_users.sql: one account per row, carried over unchanged from
-- Courses 5.2-5.4. password_hash is a self-describing scrypt string (see
-- auth.js) -- never a plain password.
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL
);
