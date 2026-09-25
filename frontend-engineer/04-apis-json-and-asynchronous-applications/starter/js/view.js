// view.js: one function for each state the dashboard can be in: loading,
// error, empty, and ready. Design all four, not just "ready".

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

// TODO 6: Export renderForecast(target, days, place, sourceLine):
// - a sentence naming the driest day: "Driest day for walking to a study
//   session: <dayName> (<rain>% chance of rain)."
// - a <table> with a <caption> "7-day forecast for <place>", column headers
//   Day, High, Low, Chance of rain (<th scope="col">), and one row per day
//   whose first cell is a <th scope="row"> with the day's name. Mark the
//   driest row with class "best" and the words "(driest)": not colour alone.
// - wrap the table in <div class="table-wrap" tabindex="0" role="region"
//   aria-label="7-day forecast for <place>"> so it can scroll on a phone.
// - a <p class="source"> with sourceLine, saying where the data came from.
export function renderForecast(target, days, place) {
  target.replaceChildren(el('p', `${days.length} days for ${place}. (TODO 6: show them in a table.)`));
}

// TODO 7: Export renderError(target, message, onRetry): a <div class="state
// error"> with an <h2> "The forecast could not load", the message, a
// sentence suggesting "Use sample data", and a "Try again" button that
// calls onRetry.
export function renderError(target, message) {
  target.replaceChildren(el('p', message, 'state error'));
}

// TODO 8: Export renderEmpty(target, place): a calm sentence saying the
// service answered, but with no days.
export function renderEmpty(target, place) {
  target.replaceChildren(el('p', `No days for ${place}.`, 'state'));
}
