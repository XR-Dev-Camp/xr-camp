// forecast-view.js: one function for each state the weather can be in:
// loading, error, empty, or ready. Course 2.4's view.js, with its words in
// the locale files, and numbers and dates formatted by Intl.

import { t, formatDay, formatTemperature, formatPercent } from '../i18n.js';
import { driestDay } from '../utils.js';

function el(tag, text, className) {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  if (className) element.className = className;
  return element;
}

export function renderLoading(target, place) {
  target.replaceChildren(el('p', t('weather.loading', { place }), 'state'));
}

export function renderError(target, message, onRetry) {
  const box = el('div', undefined, 'state error');
  const retry = el('button', t('weather.retry'));
  retry.type = 'button';
  retry.addEventListener('click', onRetry);
  // h3: the weather view's heading is an h2.
  box.append(el('h3', t('weather.errorHeading')), el('p', message), el('p', t('weather.errorHint')), retry);
  target.replaceChildren(box);
}

export function renderEmpty(target, place) {
  target.replaceChildren(el('p', t('weather.empty', { place }), 'state'));
}

export function renderForecast(target, days, place, sourceLine) {
  const best = driestDay(days);
  const summary = el('p', t('weather.driest', { day: formatDay(best.date), rain: formatPercent(best.rain / 100) }));

  const table = el('table');
  const caption = el('caption', t('weather.caption', { place }));
  const headRow = el('tr');
  for (const key of ['weather.day', 'weather.high', 'weather.low', 'weather.rain']) {
    const th = el('th', t(key));
    th.scope = 'col';
    headRow.append(th);
  }
  const head = el('thead');
  head.append(headRow);

  const body = el('tbody');
  for (const day of days) {
    const row = el('tr', undefined, day === best ? 'best' : '');
    const name = el('th', day === best ? t('weather.driestMark', { day: formatDay(day.date) }) : formatDay(day.date));
    name.scope = 'row';
    row.append(
      name,
      el('td', formatTemperature(day.max), 'num'),
      el('td', formatTemperature(day.min), 'num'),
      el('td', formatPercent(day.rain / 100), 'num'),
    );
    body.append(row);
  }
  table.append(caption, head, body);

  // The wrapper scrolls on narrow screens; tabindex lets keyboard users scroll it.
  const wrap = el('div', undefined, 'table-wrap');
  wrap.tabIndex = 0;
  wrap.setAttribute('role', 'region');
  wrap.setAttribute('aria-label', t('weather.caption', { place }));
  wrap.append(table);

  target.replaceChildren(summary, wrap, el('p', sourceLine, 'source'));
}
