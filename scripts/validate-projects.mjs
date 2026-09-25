#!/usr/bin/env node
/**
 * validate-projects.mjs
 *
 * Purpose
 *   Enforce the structure every project must follow. Links, bookmarks, and
 *   catalog.json resolve a lesson through project.json; a malformed or
 *   duplicated identifier silently breaks the learner's path from lesson to
 *   code. That failure is invisible in review, so it is checked mechanically.
 *
 *   It also enforces the teaching standards that review misses: a lesson
 *   marked ready must have no placeholder text, 3D lessons must carry the
 *   manual 3D/XR accessibility checks, libraries must be the versions pinned
 *   in versions.json, and assets must stay within the size budgets that keep
 *   lessons usable on slow and metered connections.
 *
 * Inputs   Every <course>/<NN-slug>/project.json in the repository, plus
 *          versions.json.
 * Outputs  Human-readable report on stdout. Exit 0 on pass, 1 on failure.
 * Deps     Node 18+ only. No packages, deliberately — this must run anywhere.
 *
 * Run      node scripts/validate-projects.mjs
 *          node scripts/validate-projects.mjs --write-catalog
 */

import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

// fileURLToPath, not URL.pathname: the latter percent-encodes spaces in the
// path and prefixes a slash to the Windows drive letter.
const ROOT = fileURLToPath(new URL('..', import.meta.url));

const COURSES = [
  'preface', 'web-developer', 'frontend-engineer', 'web3d-developer',
  'immersive-developer', 'full-stack-spatial', 'professional-developer', 'capstone',
];

const LOCALES = ['es-419', 'zh-Hans'];

const REQUIRED_FILES = [
  'README.md', 'README.es.md', 'README.zh-Hans.md', 'project.json',
  'ATTRIBUTION.md', 'LICENSE', 'tests/checklist.md',
  'challenges/challenge-1.md', 'challenges/challenge-2.md', 'challenges/challenge-3.md',
];

const CODE_FILES = ['starter/index.html', 'completed/index.html'];

// draft: being written, never shown to learners.
// review: English complete, awaiting review and translation.
// published: complete in every language; ready to show to learners.
const STATUSES = ['draft', 'review', 'published'];
const PLACEHOLDERS = [
  '_Content to be authored._', '_To be authored._', 'Reference solution placeholder',
  '_Contenido pendiente de redacción._', '_Pendiente de redacción._', // Spanish templates
  '_内容待撰写。_', '_待撰写。_', // Chinese templates
];
const UNTRANSLATED = 'TODO: translate';

// Automated audits cannot see inside a 3D canvas, so 3D lessons must declare
// the manual checks. See docs/en/xr-accessibility.md.
const THREE_D_TECH = ['A-Frame', 'Three.js', 'WebXR', 'X3D/X3DOM'];
const CHECKS_3D = ['scene-description', 'keyboard-3d', 'reduced-motion-3d', '2d-fallback', 'comfort'];
const CHECKS_XR = ['xr-input-alternatives', 'xr-seated-mode'];
// Code shown as text (in <pre> or comments) is not a scene, so strip it first.
// Case matters for THREE: page titles say "Three.js"; code says "THREE.".
const liveCode = (html) => html.replace(/<pre[\s\S]*?<\/pre>|<!--[\s\S]*?-->/gi, '');
const hasScene = (html) => /<a-scene|<x3d[\s>]/i.test(html) || /from\s+['"][^'"]*three|\bTHREE\./.test(html);
const hasMotion = (html) => /animation=|<a-animation|requestAnimationFrame|setAnimationLoop|<timeSensor/i.test(html);

// Per-file size budgets. See docs/en/3d-assets-and-versions.md.
const MB = 1024 * 1024;
const BUDGETS = [
  { kind: '3D model', exts: ['.glb', '.gltf', '.bin', '.x3d', '.x3dv'], max: 5 * MB },
  { kind: 'image or texture', exts: ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.ktx2', '.gif'], max: 1 * MB },
  { kind: 'audio', exts: ['.mp3', '.ogg', '.m4a', '.wav', '.flac'], max: 2 * MB },
  { kind: 'video', exts: ['.mp4', '.webm'], max: 10 * MB },
];
const PROJECT_BUDGET = 20 * MB;

const errors = [];
const warnings = [];

const fail = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

const exists = async (p) => { try { await stat(p); return true; } catch { return false; } };

const read = (p) => readFile(p, 'utf8').catch(() => '');

async function listFiles(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true }).catch(() => [])) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...await listFiles(p));
    else if (e.isFile()) out.push(p);
  }
  return out;
}

// Every A-Frame or three.js URL must name the pinned version exactly.
// "latest", a different version, or no version at all breaks lessons silently
// the day a new release ships.
function checkLibraryVersions(where, file, html, versions) {
  for (const url of html.match(/https?:\/\/[^\s"'<>)]+/g) ?? []) {
    // Only code the page loads; an ordinary link to documentation is fine.
    if (!/\.m?js$|\.css$|\/jsm\/|\/build\//.test(url)) continue;
    for (const [lib, { version }] of Object.entries(versions)) {
      // "/aframe.", "three@", "www.x3dom.org" — but not "aframe-extras".
      if (!new RegExp(`[/@.]${lib}[@/.]`, 'i').test(url)) continue;
      // npm-style "lib@1.2.3/" or site-style "/releases/1.2.3/" or "/download/1.2.3/".
      const found = url.match(new RegExp(`${lib}@([^/]+)`, 'i')) ?? url.match(/\/(?:releases|download)\/([^/]+)\//);
      const got = found?.[1];
      if (got !== version) {
        fail(where, `${file} loads ${lib} ${got ? `version "${got}"` : 'without a version'}; versions.json pins ${version}`);
      }
    }
  }
}

async function main() {
  const seenIds = new Map();
  const seenLessonIds = new Map();
  const catalog = [];

  let versions = {};
  try {
    versions = JSON.parse(await readFile(join(ROOT, 'versions.json'), 'utf8')).libraries;
  } catch (e) {
    fail('versions.json', `missing or not valid JSON: ${e.message}`);
  }

  for (const course of COURSES) {
    const courseDir = join(ROOT, course);
    if (!await exists(courseDir)) { fail(course, 'course directory is missing'); continue; }

    const entries = (await readdir(courseDir, { withFileTypes: true }))
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .sort();

    if (entries.length === 0) warn(course, 'course contains no projects');

    let expected = 1;
    for (const name of entries) {
      const dir = join(courseDir, name);
      const where = `${course}/${name}`;

      if (!/^\d{2}-[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) {
        fail(where, 'directory name must match NN-kebab-case-slug');
      }

      const num = Number.parseInt(name.slice(0, 2), 10);
      if (num !== expected) warn(where, `numbering gap: expected ${String(expected).padStart(2, '0')}`);
      expected = num + 1;

      const raw = await readFile(join(dir, 'project.json'), 'utf8').catch(() => null);
      if (raw === null) { fail(where, 'project.json is missing'); continue; }

      let p;
      try { p = JSON.parse(raw); } catch (e) { fail(where, `project.json is not valid JSON: ${e.message}`); continue; }

      for (const key of ['id', 'courseId', 'lessonId', 'title', 'estimatedMinutes', 'difficulty', 'technologies']) {
        if (p[key] === undefined) fail(where, `project.json is missing required key "${key}"`);
      }

      if (p.courseId !== course) {
        fail(where, `courseId "${p.courseId}" does not match its directory "${course}"`);
      }

      // Identifier uniqueness. Every link to a lesson depends on it.
      if (seenIds.has(p.id)) fail(where, `duplicate id "${p.id}" (also in ${seenIds.get(p.id)})`);
      else seenIds.set(p.id, where);

      if (seenLessonIds.has(p.lessonId)) {
        fail(where, `duplicate lessonId "${p.lessonId}" (also in ${seenLessonIds.get(p.lessonId)})`);
      } else seenLessonIds.set(p.lessonId, where);

      if (typeof p.estimatedMinutes !== 'number' || p.estimatedMinutes <= 0) {
        fail(where, 'estimatedMinutes must be a positive number');
      }

      if (!STATUSES.includes(p.status)) {
        fail(where, `status must be one of ${STATUSES.join(', ')}`);
      }

      // Drafts are expected to be untranslated; only nag once a lesson is ready.
      if (!p.title?.en) fail(where, 'title.en is required');
      for (const loc of LOCALES) {
        if (p.title?.[loc]) continue;
        if (p.status === 'published') fail(where, `title.${loc} must be translated before publishing`);
        else if (p.status === 'review') warn(where, `title.${loc} is not translated`);
      }

      // The schedule is what learners plan their week around, so it must agree
      // with the estimate.
      const { sessions, sessionMinutes } = p.schedule ?? {};
      if (!(sessionMinutes > 0) || sessions !== Math.ceil(p.estimatedMinutes / sessionMinutes)) {
        fail(where, 'schedule.sessions must equal estimatedMinutes / schedule.sessionMinutes, rounded up');
      }

      for (const rel of REQUIRED_FILES) {
        if (!await exists(join(dir, rel))) fail(where, `required file missing: ${rel}`);
      }

      if (p.hasCode !== false) {
        for (const rel of CODE_FILES) {
          if (!await exists(join(dir, rel))) fail(where, `required file missing: ${rel}`);
        }
        const completed = await readFile(join(dir, 'completed/index.html'), 'utf8').catch(() => '');
        if (completed && !/<html[^>]+lang=/i.test(completed)) {
          fail(where, 'completed/index.html does not declare a document language (WCAG 3.1.1)');
        }
        if (completed && !/name=["']viewport["']/i.test(completed)) {
          fail(where, 'completed/index.html has no viewport meta tag');
        }

        // Every scene in the reference solution needs a text alternative, and any
        // scene that moves must stop moving on request.
        for (const file of (await listFiles(join(dir, 'completed'))).filter((f) => extname(f) === '.html')) {
          const rel = relative(dir, file);
          const html = liveCode(await read(file));
          if (!hasScene(html)) continue;
          if (!/id=["']scene-description["']/.test(html)) {
            fail(where, `${rel} has a 3D scene but no element with id="scene-description" (WCAG 1.1.1)`);
          }
          if (hasMotion(html) && !/prefers-reduced-motion/.test(html)) {
            fail(where, `${rel} animates a 3D scene but does not check prefers-reduced-motion (WCAG 2.3.3)`);
          }
        }
      }

      // Lessons marked ready must not show learners placeholder text.
      if (p.status === 'review' || p.status === 'published') {
        const english = ['README.md', 'tests/checklist.md', ...REQUIRED_FILES.filter((f) => f.startsWith('challenges/'))];
        if (p.hasCode !== false) english.push(...CODE_FILES);
        for (const rel of english) {
          const text = await read(join(dir, rel));
          if (PLACEHOLDERS.some((ph) => text.includes(ph))) fail(where, `${rel} still contains placeholder text but status is "${p.status}"`);
        }
      }
      if (p.status === 'published') {
        const translated = ['README.es.md', 'README.zh-Hans.md'];
        for (const n of [1, 2, 3]) translated.push(`challenges/challenge-${n}.es.md`, `challenges/challenge-${n}.zh-Hans.md`);
        for (const rel of translated) {
          const text = await read(join(dir, rel));
          if (text.includes(UNTRANSLATED) || PLACEHOLDERS.some((ph) => text.includes(ph))) {
            fail(where, `${rel} is not fully translated but status is "published"`);
          }
        }
      }

      const is3d = (p.technologies ?? []).some((t) => THREE_D_TECH.includes(t));
      if (is3d) {
        const required = [...CHECKS_3D, ...(p.technologies.includes('WebXR') ? CHECKS_XR : [])];
        const missing = required.filter((c) => !(p.accessibilityChecks ?? []).includes(c));
        if (missing.length) fail(where, `3D project is missing accessibilityChecks: ${missing.join(', ')}`);
      }

      const files = await listFiles(dir);
      let total = 0;
      for (const file of files) {
        const rel = relative(dir, file);
        const { size } = await stat(file);
        total += size;
        const budget = BUDGETS.find((b) => b.exts.includes(extname(file).toLowerCase()));
        if (budget && size > budget.max) {
          fail(where, `${rel} is ${(size / MB).toFixed(1)} MB; the ${budget.kind} budget is ${budget.max / MB} MB`);
        }
        if (extname(file).toLowerCase() === '.html') checkLibraryVersions(where, rel, await read(file), versions);
      }
      if (total > PROJECT_BUDGET) {
        fail(where, `project is ${(total / MB).toFixed(1)} MB; the budget is ${PROJECT_BUDGET / MB} MB`);
      }

      catalog.push({
        id: p.id, courseId: p.courseId, lessonId: p.lessonId, status: p.status, phase: p.phase,
        title: p.title, estimatedMinutes: p.estimatedMinutes, schedule: p.schedule, difficulty: p.difficulty,
        technologies: p.technologies, hasCode: p.hasCode !== false,
        path: `${course}/${name}`,
      });
    }
  }

  if (process.argv.includes('--write-catalog')) {
    await writeFile(
      join(ROOT, 'catalog.json'),
      JSON.stringify({
        repository: 'xrcamp-projects',
        schemaVersion: 1,
        courses: COURSES.map((id, phase) => ({ id, phase })),
        projects: catalog,
      }, null, 2) + '\n',
      'utf8',
    );
    console.log('catalog.json rewritten');
  }

  console.log(`\nvalidated ${catalog.length} projects across ${COURSES.length} courses`);
  if (warnings.length) {
    console.log(`\n${warnings.length} warning(s):`);
    for (const w of warnings) console.log(`  ! ${w}`);
  }
  if (errors.length) {
    console.log(`\n${errors.length} error(s):`);
    for (const e of errors) console.log(`  x ${e}`);
    console.log('');
    process.exit(1);
  }
  console.log('\nall structural checks passed\n');
}

main().catch((e) => { console.error(e); process.exit(1); });
