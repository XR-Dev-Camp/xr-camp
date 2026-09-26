// dashboard.js: building the dashboard's elements, and updating them.

import { describeTime } from './format.js';
import { state } from './state.js';

function el(tag, text, className) {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  if (className) element.className = className;
  return element;
}

const percent = (part, whole) => (whole === 0 ? 0 : Math.round((part / whole) * 100));

// A progress bar with its value also in words: never a bar alone.
function progress(done, total, label) {
  const wrap = el('div', undefined, 'progress');
  const bar = el('progress');
  bar.max = total;
  bar.value = done;
  bar.setAttribute('aria-label', label);
  const text = el('span', `${done} of ${total} done (${percent(done, total)}%)`, 'progress-text');
  wrap.append(bar, text);
  return wrap;
}

function lessonRow(lesson) {
  const item = el('li', undefined, 'lesson');
  item.dataset.lessonId = lesson.id;

  // A checkbox whose label includes the lesson's title, so each one has a
  // unique name: "Done: HTML Foundations", not fifty-eight checkboxes called "Done".
  const id = `done-${lesson.id}`;
  const box = el('input');
  box.type = 'checkbox';
  box.id = id;
  box.checked = state.done.has(lesson.id);
  const label = el('label');
  label.htmlFor = id;
  label.append(el('span', 'Done: ', 'visually-hidden'), el('span', lesson.title, 'lesson-title'));

  item.append(box, label, el('span', describeTime(lesson), 'lesson-time'),
    el('span', lesson.status === 'ready' ? 'Ready' : 'Coming soon', `badge ${lesson.status}`));
  return item;
}

export function renderPhase(phase, lessons) {
  const section = el('section', undefined, 'phase');
  section.dataset.phase = phase.phase;
  const headingId = `phase-${phase.phase}`;
  section.setAttribute('aria-labelledby', headingId);
  const heading = el('h2', `Phase ${phase.phase}: ${phase.title}`);
  heading.id = headingId;

  const done = lessons.filter((lesson) => state.done.has(lesson.id)).length;
  const list = el('ul', undefined, 'lessons');
  list.setAttribute('role', 'list'); // Safari drops list semantics when list-style is none.
  list.append(...lessons.map(lessonRow));
  section.append(heading, progress(done, lessons.length, `Phase ${phase.phase} progress`), list);
  return section;
}

// Update one phase's progress without rebuilding it, so focus stays put.
export function updatePhaseProgress(section, lessons) {
  const done = lessons.filter((lesson) => state.done.has(lesson.id)).length;
  section.querySelector('.progress').replaceWith(progress(done, lessons.length, `Phase ${section.dataset.phase} progress`));
}

export function renderOverall(target, lessons) {
  const done = lessons.filter((lesson) => state.done.has(lesson.id)).length;
  target.replaceChildren(progress(done, lessons.length, 'Overall progress'));
}

export function renderNextUp(target, lessons) {
  const next = lessons.find((lesson) => lesson.status === 'ready' && !state.done.has(lesson.id));
  target.replaceChildren(next
    ? el('p', `${next.title}: ${describeTime(next)}.`)
    : el('p', 'Every ready lesson is done. New lessons are on their way.'));
}

export function goalItem(goal) {
  const item = el('li', undefined, 'goal');
  item.dataset.goalId = goal.id;
  const remove = el('button', 'Remove');
  remove.type = 'button';
  remove.className = 'remove';
  // The visible word is "Remove"; the accessible name says what is removed.
  remove.setAttribute('aria-label', `Remove goal: ${goal.text}`);
  item.append(el('span', goal.text), remove);
  return item;
}
