// main.js: choose a city, load its forecast, and show the right state.

import { CITIES, CACHE_MINUTES } from './config.js';
import { fetchForecast, fetchSample } from './api.js';
import { readCache, writeCache } from './cache.js';
import { toDays } from './forecast.js';
import { renderLoading, renderError, renderEmpty, renderForecast } from './view.js';
import { registerServiceWorker, showUpdateBanner, isInstalled, offerInstall } from './pwa.js';
import { lowDataPreferred, setLowData, deviceSavesData } from './low-data.js';

const form = document.querySelector('#controls');
const citySelect = document.querySelector('#city');
const sampleBox = document.querySelector('#use-sample');
const result = document.querySelector('#result');
const status = document.querySelector('#status');

const clock = new Intl.DateTimeFormat(document.documentElement.lang, { hour: '2-digit', minute: '2-digit' });

// Each load gets a number. If the learner switches city while a request is
// still travelling, the older answer arrives late and must be ignored.
let latestRequest = 0;

function announce(message) {
  status.textContent = message;
}

// Turn any failure into a sentence a learner can act on.
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

async function load({ refresh = false } = {}) {
  const request = ++latestRequest;
  const useSample = sampleBox.checked;
  const city = CITIES.find((c) => c.id === citySelect.value);
  const place = useSample ? 'the sample city' : city.name;
  const key = useSample ? 'sample' : city.id;

  // 1. Show a saved copy at once, if there is one. If it is fresh, stop here.
  const cached = readCache(key, CACHE_MINUTES);
  if (cached && !refresh) {
    show(cached.data, place, `Saved in this browser at ${clock.format(cached.savedAt)}.`);
    if (cached.fresh) {
      announce(`Forecast for ${place}, saved at ${clock.format(cached.savedAt)}.`);
      return;
    }
  } else {
    renderLoading(result, place);
  }

  // 2. Ask the network. aria-busy tells screen readers the region is updating.
  result.setAttribute('aria-busy', 'true');
  try {
    const { json, savedAt } = useSample ? await fetchSample() : await fetchForecast(city);
    if (request !== latestRequest) return;   // a newer request has started
    writeCache(key, json, savedAt ?? Date.now());
    // savedAt is set when the service worker answered from its cache: say so.
    let source = `Live data from Open-Meteo.com (CC BY 4.0), updated at ${clock.format(Date.now())}.`;
    if (useSample) source = 'Sample data: not a real forecast.';
    else if (savedAt) source = `Could not update. Saved by this app at ${clock.format(savedAt)}.`;
    show(json, place, source);
    announce(savedAt && !useSample
      ? `Could not update. Showing the forecast saved at ${clock.format(savedAt)}.`
      : `Forecast for ${place} loaded.`);
  } catch (error) {
    if (request !== latestRequest) return;
    if (cached) {
      // Old data is better than no data: show it, and say so.
      show(cached.data, place, `Could not update. Saved in this browser at ${clock.format(cached.savedAt)}.`);
      announce(`Could not update. Showing the forecast saved at ${clock.format(cached.savedAt)}.`);
    } else {
      renderError(result, explain(error), () => load({ refresh: true }));
      announce('The forecast could not load.');
    }
  } finally {
    if (request === latestRequest) result.removeAttribute('aria-busy');
  }
}

// Fill the city list from config, so there is one list of cities.
citySelect.replaceChildren(...CITIES.map((city) => new Option(city.name, city.id)));

// Refresh is the form's submit button, so Enter works too.
form.addEventListener('submit', (event) => {
  event.preventDefault();
  load({ refresh: true });
});
citySelect.addEventListener('change', () => load());
sampleBox.addEventListener('change', () => {
  citySelect.disabled = sampleBox.checked;
  load();
});

// When the connection comes back, try again.
window.addEventListener('online', () => load({ refresh: true }));

form.hidden = false;
load();


// --- Course 2.6: this dashboard as an app ------------------------------------

// Updates: when a new version is waiting, offer it. Never reload by surprise.
registerServiceWorker({
  onUpdateReady: (worker) => showUpdateBanner(worker, {
    message: document.querySelector('#update-message'),
    button: document.querySelector('#update-reload'),
  }),
});

// Offline: say so once the service worker has saved the app.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(() => {
    document.querySelector('#offline-ready').textContent = 'Saved on this device: this app opens even with no internet.';
  });
}

// Install: a button in Chromium browsers; written steps everywhere.
const installStatus = document.querySelector('#install-status');
if (isInstalled()) {
  installStatus.textContent = 'You are using the installed app.';
} else {
  offerInstall({ button: document.querySelector('#install'), status: installStatus });
}

// Low-data mode: hide the 3D moment, and say why.
const lowDataBox = document.querySelector('#low-data');
const threeDLink = document.querySelector('#three-d-link');
const threeDOff = document.querySelector('#three-d-off');

function applyLowData(on) {
  lowDataBox.checked = on;
  threeDLink.hidden = on;
  threeDOff.hidden = !on;
}

applyLowData(lowDataPreferred());
if (deviceSavesData()) {
  document.querySelector('#low-data-hint').textContent = 'Your device asks websites to save data, so this starts switched on.';
}
lowDataBox.addEventListener('change', () => {
  setLowData(lowDataBox.checked);
  applyLowData(lowDataBox.checked);
});
document.querySelector('#app-panel').hidden = false;
