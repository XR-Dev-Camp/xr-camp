#!/usr/bin/env node
/**
 * build.mjs: writes the XR Camp site, one page per language.
 *
 * Inputs   src/strings.mjs (all words), src/page.mjs (the template), and the
 *          lessons repository's catalog.json (phases, sessions, lesson status).
 * Outputs  index.html, es-419/index.html, zh-hans/index.html
 * Deps     Node 18+ only.
 *
 * Run      node build.mjs
 *          node build.mjs --catalog path/to/catalog.json
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { STRINGS } from './src/strings.mjs';
import { page } from './src/page.mjs';

const HERE = fileURLToPath(new URL('.', import.meta.url));

// The public lessons repository. Every GitHub link on the site starts here.
const REPO = 'https://github.com/XR-Dev-Camp/xr-camp';

const SESSIONS_PER_WEEK = 4;
const WEEKS_PER_MONTH = 4.345;

const arg = process.argv.indexOf('--catalog');
// The site lives in the lessons repository, one folder down from catalog.json.
const catalogPath = arg > -1 ? process.argv[arg + 1] : join(HERE, '..', 'catalog.json');
const catalog = JSON.parse(await readFile(catalogPath, 'utf8'));

// One summary per phase, in course order.
const phases = catalog.courses.map(({ id, phase }) => {
  const projects = catalog.projects.filter((p) => p.courseId === id);
  const sessions = projects.reduce((sum, p) => sum + p.schedule.sessions, 0);
  return {
    courseId: id,
    phase,
    sessions,
    months: Math.max(1, Math.round(sessions / SESSIONS_PER_WEEK / WEEKS_PER_MONTH)),
    total: projects.length,
    ready: projects.filter((p) => p.status === 'review' || p.status === 'published').length,
  };
});

for (const [lang, t] of Object.entries(STRINGS)) {
  const root = t.dir ? '../' : '';
  const html = page({ t, lang, all: STRINGS, phases, repo: REPO, root });
  const dir = join(HERE, t.dir);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), html, 'utf8');
  console.log(`wrote ${t.dir || ''}index.html`);
}
