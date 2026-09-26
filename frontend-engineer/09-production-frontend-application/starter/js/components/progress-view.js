// progress-view.js: the dashboard's pieces (Course 2.2's dashboard.js).
// Each function takes data and returns elements; none changes any state.

import { t, formatPercent } from '../i18n.js';
import { fraction } from '../utils.js';

function el(tag, text, className) {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  if (className) element.className = className;
  return element;
}

// A progress bar with its value also in words: never a bar alone.
export function progressBar(done, total, label) {
  const wrap = el('div', undefined, 'progress');
  const bar = el('progress');
  bar.max = total;
  bar.value = done;
  bar.setAttribute('aria-label', label);
  const text = el('span', t('progress.count', { done, total, percent: formatPercent(fraction(done, total)) }), 'progress-text');
  wrap.append(bar, text);
  return wrap;
}

export function nextUp(lesson) {
  return lesson
    ? el('p', t('dashboard.next', { title: lesson.title }))
    : el('p', t('dashboard.allDone'));
}

// Progress by phase, as a table. It is also the 2D twin of the 3D view:
// every number the columns show is here, in text.
export function phaseTable(rows) {
  const table = el('table', undefined, 'phase-table');
  table.append(el('caption', t('dashboard.tableCaption')));

  const headRow = el('tr');
  for (const key of ['dashboard.colPhase', 'dashboard.colDone', 'dashboard.colLessons', 'dashboard.colPercent']) {
    const th = el('th', t(key));
    th.scope = 'col';
    headRow.append(th);
  }
  const head = el('thead');
  head.append(headRow);

  const body = el('tbody');
  for (const row of rows) {
    const name = el('th', t('dashboard.phaseName', { phase: row.phase, title: row.title }));
    name.scope = 'row';
    const tr = el('tr');
    tr.append(
      name,
      el('td', String(row.done), 'num'),
      el('td', String(row.total), 'num'),
      el('td', formatPercent(fraction(row.done, row.total)), 'num'),
    );
    body.append(tr);
  }
  table.append(head, body);

  const wrap = el('div', undefined, 'table-wrap');
  wrap.tabIndex = 0;
  wrap.setAttribute('role', 'region');
  wrap.setAttribute('aria-label', t('dashboard.tableCaption'));
  wrap.append(table);
  return wrap;
}
