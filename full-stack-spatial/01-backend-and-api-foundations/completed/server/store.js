// store.js: the only file that touches the disk. Everything else asks this
// module for settings, or hands it settings to save; it never sees a
// request or a response. That split means routes.js could later swap a
// JSON file for the SQLite database Course 5.3 adds, and only this file
// would change.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_SETTINGS } from './validation.js';

const HERE = dirname(fileURLToPath(import.meta.url));

// An environment variable, so tests (and later lessons) can point this at a
// throwaway file instead of the real one. See .env.example. resolve(), not
// join(): DATA_FILE may be relative ("./data/settings.json") or an absolute
// path (a test's temporary file), and resolve() handles both correctly,
// where join() would nest an absolute path under HERE by mistake.
const DATA_FILE = process.env.DATA_FILE
  ? resolve(HERE, process.env.DATA_FILE)
  : join(HERE, 'data', 'settings.json');

export async function loadSettings() {
  try {
    const text = await readFile(DATA_FILE, 'utf8');
    return JSON.parse(text);
  } catch (error) {
    // ENOENT: no file yet, the normal case on a first run. Anything else
    // (bad JSON, a permissions problem) also falls back to the defaults,
    // rather than crashing the server over a settings file.
    if (error.code !== 'ENOENT') {
      console.error('Could not read the settings file, using defaults:', error.message);
    }
    return structuredClone(DEFAULT_SETTINGS);
  }
}

export async function saveSettings(settings) {
  await mkdir(dirname(DATA_FILE), { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(settings, null, 2), 'utf8');
  return settings;
}

export async function resetSettings() {
  const defaults = structuredClone(DEFAULT_SETTINGS);
  await saveSettings(defaults);
  return defaults;
}
