// store.js: the only file that should touch the disk. Everything else asks
// this module for settings, or hands it settings to save.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_SETTINGS } from './validation.js';

const HERE = dirname(fileURLToPath(import.meta.url));

// An environment variable, so tests (and later lessons) can point this at a
// throwaway file instead of the real one. See .env.example. resolve(), not
// join(): DATA_FILE may be relative or an absolute path (a test's temporary
// file), and resolve() handles both correctly.
const DATA_FILE = process.env.DATA_FILE
  ? resolve(HERE, process.env.DATA_FILE)
  : join(HERE, 'data', 'settings.json');

// TODO 4: finish loadSettings and saveSettings.
//
// loadSettings() should:
//   - Read DATA_FILE with readFile(DATA_FILE, 'utf8') and JSON.parse it.
//   - If reading fails because the file does not exist yet (error.code is
//     'ENOENT'), that is the normal first-run case: return a COPY of
//     DEFAULT_SETTINGS (structuredClone(DEFAULT_SETTINGS) is an easy copy).
//   - If reading fails for any other reason (bad JSON, a permissions
//     problem), log it with console.error and also fall back to the
//     defaults, rather than crashing the server over a settings file.
//
// saveSettings(settings) should:
//   - Make sure the settings file's folder exists: mkdir(dirname(DATA_FILE),
//     { recursive: true }).
//   - Write the file: writeFile(DATA_FILE, JSON.stringify(settings, null, 2),
//     'utf8').
//   - Return settings.
export async function loadSettings() {
  throw new Error('TODO 4: loadSettings is not implemented yet');
}

export async function saveSettings(settings) {
  throw new Error('TODO 4: saveSettings is not implemented yet');
}

export async function resetSettings() {
  const defaults = structuredClone(DEFAULT_SETTINGS);
  await saveSettings(defaults);
  return defaults;
}
