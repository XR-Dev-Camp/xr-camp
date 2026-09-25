// view.js: one function for each state the dashboard can be in.
// Every request is in one of four states: loading, error, empty, or ready.
// Designing all four, not just "ready", is what makes an app feel solid.

import { driestDay, dayName } from './forecast.js';

function el(tag, text, className) {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  if (className) element.className = className;
  return element;
}

export function renderLoading(target, place) {
  target.replaceChildren(el('p', `Loading the forecast for ${place}…`, 'state'));
}

export function renderError(target, message, onRetry) {
  const box = el('div', undefined, 'state error');
  const retry = el('button', 'Try again');
  retry.type = 'button';
  retry.addEventListener('click', onRetry);
  box.append(
    el('h2', 'The forecast could not load'),
    el('p', message),
    el('p', 'Try again, or tick "Use sample data" to keep working without the internet.'),
    retry,
  );
  target.replaceChildren(box);
}

export function renderEmpty(target, place) {
  target.replaceChildren(el('p', `The weather service answered, but sent no days for ${place}.`, 'state'));
}

export function renderForecast(target, days, place, sourceLine) {
  const best = driestDay(days);
  const summary = el('p', `Driest day for walking to a study session: ${dayName(best.date)} (${best.rain}% chance of rain).`);

  const table = el('table');
  const caption = el('caption', `7-day forecast for ${place}`);
  const head = el('thead');
  const headRow = el('tr');
  for (const label of ['Day', 'High', 'Low', 'Chance of rain']) {
    const th = el('th', label);
    th.scope = 'col';
    headRow.append(th);
  }
  head.append(headRow);

  const body = el('tbody');
  for (const day of days) {
    const row = el('tr', undefined, day === best ? 'best' : '');
    const name = el('th', day === best ? `${dayName(day.date)} (driest)` : dayName(day.date));
    name.scope = 'row';
    row.append(
      name,
      el('td', `${Math.round(day.max)} °C`, 'num'),
      el('td', `${Math.round(day.min)} °C`, 'num'),
      el('td', `${day.rain}%`, 'num'),
    );
    body.append(row);
  }
  table.append(caption, head, body);

  // The wrapper scrolls on narrow screens; tabindex lets keyboard users scroll it.
  const wrap = el('div', undefined, 'table-wrap');
  wrap.tabIndex = 0;
  wrap.setAttribute('role', 'region');
  wrap.setAttribute('aria-label', `7-day forecast for ${place}`);
  wrap.append(table);

  target.replaceChildren(summary, wrap, el('p', sourceLine, 'source'));
}
