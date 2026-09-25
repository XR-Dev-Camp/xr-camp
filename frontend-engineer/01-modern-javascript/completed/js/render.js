// render.js: turning data into page elements. Every function here takes data
// and returns an element; none of them fetches or stores anything.

import { describeTime, hours, plural } from './format.js';

// A small helper: create an element with text in one line.
function el(tag, text, className) {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  if (className) element.className = className;
  return element;
}

export function renderLesson({ title, minutes, sessions, status }) {
  const item = el('li', undefined, 'lesson');
  item.append(
    el('span', title, 'lesson-title'),
    el('span', describeTime({ minutes, sessions }), 'lesson-time'),
    el('span', status === 'ready' ? 'Ready' : 'Coming soon', `badge ${status}`),
  );
  return item;
}

export function renderPhase(phase, lessons, { minutes, ready }) {
  const section = el('section', undefined, 'phase');
  const headingId = `phase-${phase.phase}`;
  section.setAttribute('aria-labelledby', headingId);

  const heading = el('h2', `Phase ${phase.phase}: ${phase.title}`);
  heading.id = headingId;

  const summary = el('p', `${lessons.length} ${plural(lessons.length, 'lesson')}, about ${hours(minutes)} hours. ${ready} ready.`);

  const list = el('ol');
  list.append(...lessons.map(renderLesson));

  section.append(heading, summary, list);
  return section;
}

export function renderError(message, onRetry) {
  const box = el('div', undefined, 'error');
  box.setAttribute('role', 'alert');
  const retry = el('button', 'Try again');
  retry.type = 'button';
  retry.addEventListener('click', onRetry);
  box.append(el('p', message), retry);
  return box;
}
