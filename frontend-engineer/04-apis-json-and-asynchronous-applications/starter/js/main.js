// main.js: choose a city, load its forecast, and show the right state.

import { CITIES, CACHE_MINUTES } from './config.js';
import { fetchForecast, fetchSample } from './api.js';
import { readCache, writeCache } from './cache.js';
import { toDays } from './forecast.js';
import { renderLoading, renderError, renderEmpty, renderForecast } from './view.js';

const form = document.querySelector('#controls');
const citySelect = document.querySelector('#city');
const sampleBox = document.querySelector('#use-sample');
const result = document.querySelector('#result');
const status = document.querySelector('#status');

const clock = new Intl.DateTimeFormat(document.documentElement.lang, { hour: '2-digit', minute: '2-digit' });

function announce(message) {
  status.textContent = message;
}

// Finished: turn any failure into a sentence a learner can act on.
function explain(error) {
  if (error.name === 'TimeoutError') return 'The weather service took too long to answer.';
  if (error instanceof TypeError) return 'The weather service could not be reached. You may be offline, or it may be blocked on this network.';
  if (error instanceof SyntaxError) return 'The weather service sent something that was not valid JSON.';
  return error.message;
}

function show(json, place, sourceLine) {
  const days = toDays(json);
  if (days.length === 0) renderEmpty(result, place);
  else renderForecast(result, days, place, sourceLine);
}

// TODO 10: Make load() async and give it the three states:
//   renderLoading → try { await fetchForecast(city); show(...); announce }
//   catch (error) { renderError(result, explain(error), () => load(...)) }
// Set aria-busy="true" on #result while waiting, and remove it in finally.
//
// TODO 11: CACHE FIRST. Before fetching, readCache(key, CACHE_MINUTES). If
// there is a saved copy (and this is not a Refresh), show it at once; if it
// is fresh, stop there. After a successful fetch, writeCache. If the fetch
// fails but you had a saved copy, show the saved copy and say it could not
// update, instead of the error.
//
// TODO 12: RACES. Pick Bogotá, then Chengdu, quickly. If Bogotá's answer
// arrives last, the page shows the wrong city. Fix it: keep a counter
// (let latestRequest = 0), give each load a number (const request =
// ++latestRequest), and after every await, stop if request !== latestRequest.
//
// TODO 13: SAMPLE DATA AND OFFLINE. When #use-sample is ticked, use
// fetchSample() and the cache key 'sample', and disable the city list.
// Listen for window's "online" event and load again.
function load({ refresh = false } = {}) {
  const city = CITIES.find((c) => c.id === citySelect.value);
  renderLoading(result, city.name);
}

// Fill the city list from config, so there is one list of cities.
citySelect.replaceChildren(...CITIES.map((city) => new Option(city.name, city.id)));

// Refresh is the form's submit button, so Enter works too.
form.addEventListener('submit', (event) => {
  event.preventDefault();
  load({ refresh: true });
});
citySelect.addEventListener('change', () => load());

form.hidden = false;
load();
