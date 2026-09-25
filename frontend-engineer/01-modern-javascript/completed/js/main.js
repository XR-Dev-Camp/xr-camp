// main.js: the starting point. It imports what it needs from the other
// modules, loads the data, and draws the page.

import { loadCatalog, groupByPhase, totals } from './data.js';
import { renderPhase, renderError } from './render.js';
import { hours } from './format.js';

const map = document.querySelector('#map');
const summary = document.querySelector('#summary');
const readyOnly = document.querySelector('#ready-only');

let catalog = null;   // filled in once the data has loaded

function draw() {
  const lessons = readyOnly.checked
    ? catalog.lessons.filter((lesson) => lesson.status === 'ready')
    : catalog.lessons;

  const groups = groupByPhase(lessons);
  const all = totals(catalog.lessons);

  summary.textContent =
    `${catalog.lessons.length} lessons in ${catalog.phases.length} phases, about ${hours(all.minutes)} hours. ` +
    `${all.ready} are ready now.`;

  map.replaceChildren(
    ...catalog.phases
      .filter((phase) => groups[phase.phase])          // skip phases with nothing to show
      .map((phase) => renderPhase(phase, groups[phase.phase], totals(groups[phase.phase]))),
  );
}

async function start() {
  map.replaceChildren();
  summary.textContent = 'Loading the course map…';
  try {
    catalog = await loadCatalog();
    draw();
  } catch (error) {
    summary.textContent = '';
    map.replaceChildren(renderError(error.message, start));
  }
}

readyOnly.addEventListener('change', () => catalog && draw());
start();
