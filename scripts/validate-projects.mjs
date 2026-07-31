#!/usr/bin/env node
/**
 * validate-projects.mjs
 *
 * Purpose
 *   Enforce the structural contract between this public repository and the
 *   private xrcamp.dev platform. The platform resolves a lesson to its project
 *   via project.json; a malformed or duplicated identifier silently breaks the
 *   learner's path from lesson to code. That failure is invisible in review,
 *   so it is checked mechanically.
 *
 * Inputs   Every <course>/<NN-slug>/project.json in the repository.
 * Outputs  Human-readable report on stdout. Exit 0 on pass, 1 on failure.
 * Deps     Node 18+ only. No packages, deliberately — this must run anywhere.
 *
 * Run      node scripts/validate-projects.mjs
 *          node scripts/validate-projects.mjs --write-catalog
 */

import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
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

const errors = [];
const warnings = [];

const fail = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

const exists = async (p) => { try { await stat(p); return true; } catch { return false; } };

async function main() {
  const seenIds = new Map();
  const seenLessonIds = new Map();
  const catalog = [];

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

      // Identifier uniqueness. This is the contract the platform depends on.
      if (seenIds.has(p.id)) fail(where, `duplicate id "${p.id}" (also in ${seenIds.get(p.id)})`);
      else seenIds.set(p.id, where);

      if (seenLessonIds.has(p.lessonId)) {
        fail(where, `duplicate lessonId "${p.lessonId}" (also in ${seenLessonIds.get(p.lessonId)})`);
      } else seenLessonIds.set(p.lessonId, where);

      if (typeof p.estimatedMinutes !== 'number' || p.estimatedMinutes <= 0) {
        fail(where, 'estimatedMinutes must be a positive number');
      }

      if (!p.title?.en) fail(where, 'title.en is required');
      for (const loc of LOCALES) {
        if (!p.title?.[loc]) warn(where, `title.${loc} is not translated`);
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
      }

      catalog.push({
        id: p.id, courseId: p.courseId, lessonId: p.lessonId, phase: p.phase,
        title: p.title, estimatedMinutes: p.estimatedMinutes, difficulty: p.difficulty,
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
