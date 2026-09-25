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
  // unique name: "Done: HTML Foundations", not twenty checkboxes called "Done".
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

// TODO 3: Export renderPhase(phase, lessons): a <section class="phase"> with
// data-phase set, an <h2> linked by aria-labelledby, a progress() bar, and a
// <ul class="lessons" role="list"> of lessonRow items. (Safari drops list
// semantics when list-style is none, so role="list" puts them back.)

// TODO 6: Export updatePhaseProgress(section, lessons), which replaces ONLY the
// .progress element inside one section, so the checkbox that was just ticked
// is not rebuilt and keeps its focus.

// TODO 4: Export renderOverall(target, lessons): one progress() for every lesson.

// TODO 5: Export renderNextUp(target, lessons): the first lesson that is ready
// and not done, with its time; or a message when every ready lesson is done.

// TODO 8: Export goalItem(goal): an <li class="goal"> with data-goal-id, the
// goal's text, and a Remove button with aria-label="Remove goal: <text>".
