// store.js: the only file that touches the disk. Everything else asks this
// module for accounts or the curator's note, or hands it new data to save;
// it never sees a request, a response, or a plain-text password. That
// split (the same one Course 5.1 used for its single settings file) means
// Course 5.3's real database can replace these two JSON files without
// changing anything outside this file.
//
// Every account record (see routes.js's register()) is one plain object:
// { id, username, passwordHash, recoveryCodeHash, role,
//   privacySharesSettings, settings, createdAt }. passwordHash and
// recoveryCodeHash are always the self-describing scrypt strings auth.js
// produces — never a plain-text secret.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_SETTINGS } from './validation.js';

const HERE = dirname(fileURLToPath(import.meta.url));

// Environment variables, so tests (and later lessons) can point these at
// throwaway files instead of the real ones. See .env.example.
const ACCOUNTS_FILE = process.env.ACCOUNTS_FILE
  ? resolve(HERE, process.env.ACCOUNTS_FILE)
  : join(HERE, 'data', 'accounts.json');
const CURATOR_NOTE_FILE = process.env.CURATOR_NOTE_FILE
  ? resolve(HERE, process.env.CURATOR_NOTE_FILE)
  : join(HERE, 'data', 'curator-note.json');

const DEFAULT_CURATOR_NOTE = {
  text: 'Welcome to the exhibit. A curator has not written a note yet.',
  updatedBy: null,
  updatedAt: null,
};

async function readJson(file, fallback) {
  try {
    return JSON.parse(await readFile(file, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(`Could not read ${file}, using defaults:`, error.message);
    }
    return structuredClone(fallback);
  }
}

async function writeJson(file, data) {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(data, null, 2), 'utf8');
}

export async function loadAccounts() {
  return readJson(ACCOUNTS_FILE, []);
}

export async function saveAccounts(accounts) {
  await writeJson(ACCOUNTS_FILE, accounts);
}

export async function findAccountByUsername(username) {
  const accounts = await loadAccounts();
  return accounts.find((account) => account.username === username) ?? null;
}

export async function findAccountById(id) {
  const accounts = await loadAccounts();
  return accounts.find((account) => account.id === id) ?? null;
}

export async function insertAccount(account) {
  const accounts = await loadAccounts();
  accounts.push(account);
  await saveAccounts(accounts);
  return account;
}

// Merges `changes` into the one account whose id matches, and saves every
// account back to the same file (this file store keeps the whole list in
// memory for the length of one request; Course 5.3's database gives each
// row its own update, without reading and rewriting every other row).
export async function updateAccount(id, changes) {
  const accounts = await loadAccounts();
  const index = accounts.findIndex((account) => account.id === id);
  if (index === -1) return null;
  accounts[index] = { ...accounts[index], ...changes };
  await saveAccounts(accounts);
  return accounts[index];
}

export async function deleteAccount(id) {
  const accounts = await loadAccounts();
  const next = accounts.filter((account) => account.id !== id);
  await saveAccounts(next);
  return next.length !== accounts.length;
}

export async function loadCuratorNote() {
  return readJson(CURATOR_NOTE_FILE, DEFAULT_CURATOR_NOTE);
}

export async function saveCuratorNote(note) {
  await writeJson(CURATOR_NOTE_FILE, note);
  return note;
}

export { DEFAULT_SETTINGS };
