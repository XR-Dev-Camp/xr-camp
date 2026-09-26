// store.js: the only file that touches the disk. Everything else asks this
// module for accounts or the curator's note, or hands it new data to save;
// it never sees a request, a response, or a plain-text password. That
// split (the same one Course 5.1 used) means Course 5.3's real database
// can replace these two JSON files without changing anything outside this
// file.
//
// Every account record is one plain object: { id, username, passwordHash,
// recoveryCodeHash, role, privacySharesSettings, settings, createdAt }.
// passwordHash and recoveryCodeHash are always the self-describing scrypt
// strings auth.js produces (TODO 1) — never a plain-text secret.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_SETTINGS } from './validation.js';

const HERE = dirname(fileURLToPath(import.meta.url));

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

// Finished: a small pair of helpers loadAccounts/saveAccounts and
// loadCuratorNote/saveCuratorNote build on, below.
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

// TODO 7: finish findAccountByUsername, findAccountById, insertAccount,
// updateAccount, and deleteAccount, using loadAccounts()/saveAccounts()
// above (both are finished).
//
// findAccountByUsername(username) / findAccountById(id): load every
// account, and return the first one whose .username (or .id) matches —
// or null if none does.
//
// insertAccount(account): load every account, push the new one onto the
// array, save the whole array back, and return `account`.
//
// updateAccount(id, changes): load every account, find the index whose id
// matches (return null if none does), replace that one entry with
// { ...accounts[index], ...changes }, save the array back, and return the
// updated account.
//
// deleteAccount(id): load every account, filter out the one whose id
// matches, save the shorter array back, and return whether anything was
// actually removed (compare the two lengths).
export async function findAccountByUsername(username) {
  throw new Error('TODO 7: findAccountByUsername is not implemented yet');
}

export async function findAccountById(id) {
  throw new Error('TODO 7: findAccountById is not implemented yet');
}

export async function insertAccount(account) {
  throw new Error('TODO 7: insertAccount is not implemented yet');
}

export async function updateAccount(id, changes) {
  throw new Error('TODO 7: updateAccount is not implemented yet');
}

export async function deleteAccount(id) {
  throw new Error('TODO 7: deleteAccount is not implemented yet');
}

// Finished: the curator's note is a single small file, no lookup needed.
export async function loadCuratorNote() {
  return readJson(CURATOR_NOTE_FILE, DEFAULT_CURATOR_NOTE);
}

export async function saveCuratorNote(note) {
  await writeJson(CURATOR_NOTE_FILE, note);
  return note;
}

export { DEFAULT_SETTINGS };
