// main.js: the only file that touches the DOM directly at the top level. It
// wires together every module Courses 2.1 to 2.8 built, now living as
// services, stores, and components (see the "Folder guide" in the README).
//
// Five views, one page, in-page navigation
// -----------------------------------------------------------------------
// My XR Camp has five small views (VIEWS in config.js): dashboard, course
// map, planner, weather, app. A learner moves between them often, in short
// 45-minute sessions, often offline. A client-side router library, or five
// separate pages, would both work; this app instead shows and hides
// <section>s by id, driven by location.hash. Reasons, in order:
//   1. No build step: the whole course avoids bundlers, so a router meant
//      for one is not a good fit either.
//   2. The hash is already a URL: "index.html#planner" is bookmarkable and
//      works after a reload, offline, with no server route to configure.
//   3. Five sections is not enough sections to need more machinery. If My
//      XR Camp grew to twenty views, a router would earn its cost; Course
//      6's later work is where that trade-off is revisited.
import './components/lesson-card.js';   // registers <lesson-card>; side-effect import

import {
  VIEWS, DEFAULT_VIEW, CITIES, AFRAME_SIZE_MB, APP_VERSION, WEEKLY_GOAL, SESSION_MINUTES,
} from './config.js';
import { startI18n, t, translatePage, currentLocale, setLocale, isDraft } from './i18n.js';
import { phaseProgress, nextLesson, isSemver } from './utils.js';
import * as progressStore from './stores/progress-store.js';
import * as plannerStore from './stores/planner-store.js';
import * as lowData from './stores/low-data.js';
import { loadCatalog } from './services/catalog.js';
import { fetchForecast, fetchSample } from './services/api.js';
import { readCache, writeCache } from './services/cache.js';
import { registerServiceWorker, showUpdateBanner, offerInstall, isInstalled } from './services/pwa.js';
import { progressBar, nextUp, phaseTable } from './components/progress-view.js';
import * as forecastView from './components/forecast-view.js';
import { renderSessionList } from './components/session-list.js';
import { weekSummary } from './components/week-summary.js';
import { mountThreeProgress } from './components/three-progress.js';

let catalog = null;

// --- Navigation --------------------------------------------------------------

function currentView() {
  const requested = location.hash.replace('#', '');
  return VIEWS.includes(requested) ? requested : DEFAULT_VIEW;
}

function showView(view) {
  for (const id of VIEWS) {
    const section = document.getElementById(id);
    if (section) section.hidden = id !== view;
  }
  for (const link of document.querySelectorAll('[data-view]')) {
    const active = link.dataset.view === view;
    link.setAttribute('aria-current', active ? 'page' : 'false');
  }
  // Moving focus to the new view's heading tells screen reader and keyboard
  // users where they landed, the same way a full page navigation would.
  document.getElementById(view)?.querySelector('h1')?.focus();
}

window.addEventListener('hashchange', () => showView(currentView()));

// --- Dashboard -----------------------------------------------------------

function renderDashboard() {
  if (!catalog) return;
  const done = progressStore.getDone();
  const rows = phaseProgress(catalog, done);
  const target = document.getElementById('dashboard-progress');

  const totalDone = rows.reduce((sum, row) => sum + row.done, 0);
  const totalLessons = rows.reduce((sum, row) => sum + row.total, 0);
  target.replaceChildren(
    progressBar(totalDone, totalLessons, t('dashboard.tableCaption')),
    nextUp(nextLesson(catalog.lessons, done)),
    phaseTable(rows),
  );

  renderThreeDGate(rows);
}

function renderThreeDGate(rows) {
  const button = document.getElementById('three-button');
  const hint = document.getElementById('three-hint');
  const skip = document.getElementById('three-skip-notice');
  const container = document.getElementById('three-container');

  hint.textContent = t('dashboard.threeDHint', { size: AFRAME_SIZE_MB });

  const skipFor3d = lowData.lowDataPreferred();
  button.hidden = skipFor3d;
  skip.hidden = !skipFor3d;
  if (skipFor3d) container.replaceChildren();

  button.onclick = () => mountThreeProgress(container, rows);
}

// --- Course map ------------------------------------------------------------

function renderCourse() {
  if (!catalog) return;
  const done = progressStore.getDone();
  const list = document.getElementById('course-list');
  list.replaceChildren(...catalog.lessons.map((lesson) => {
    const li = document.createElement('div');
    li.setAttribute('role', 'listitem');
    const card = document.createElement('lesson-card');
    card.setAttribute('lesson-id', lesson.id);
    card.setAttribute('lesson-title', lesson.title);
    card.setAttribute('minutes', String(lesson.minutes));
    card.setAttribute('status', lesson.status);
    card.setAttribute('heading-level', '3');
    card.toggleAttribute('done', done.has(lesson.id));
    li.append(card);
    return li;
  }));
}

document.addEventListener('lesson-toggle', (event) => {
  const { lessonId, done } = event.detail;
  progressStore.setDone(lessonId, done);
});

progressStore.subscribe(() => {
  renderDashboard();
  renderCourse();
});

// --- Planner ---------------------------------------------------------------

function renderPlanner() {
  const sessions = plannerStore.getSessions();
  renderSessionList(document.getElementById('planner-list'), sessions);
  document.getElementById('planner-summary').replaceChildren(...weekSummary(sessions));
}

plannerStore.subscribe(renderPlanner);

document.getElementById('planner-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;
  const day = form.day.value;
  const time = form.time.value;
  const topic = form.topic.value.trim();
  const error = document.getElementById('planner-error');

  if (!topic) {
    error.textContent = t('planner.topicLabel');
    form.topic.focus();
    return;
  }
  error.textContent = '';
  plannerStore.addSession({ day, time, topic });
  form.reset();
  form.day.value = day; // keep the day: the next session is often the same day
  form.topic.focus();
});

document.getElementById('planner-list').addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const id = button.closest('li').dataset.id;
  if (button.dataset.action === 'toggle') plannerStore.toggleSession(id);
  else if (button.dataset.action === 'delete') plannerStore.removeSession(id);
});

// --- Weather -----------------------------------------------------------------

let weatherRequest = 0;

function cityLabel(city) {
  return t(`city.${city.id}`);
}

async function loadWeather(city) {
  const target = document.getElementById('weather-view');
  const place = cityLabel(city);
  const requestId = ++weatherRequest;
  const cached = readCache(city.id, 30);

  if (cached) forecastView.renderForecast(target, toDaysSafe(cached.data), place, sourceLine(cached.savedAt));
  else forecastView.renderLoading(target, place);

  try {
    const { json, savedAt } = await fetchForecast(city);
    if (requestId !== weatherRequest) return; // a newer city was chosen meanwhile
    writeCache(city.id, json);
    forecastView.renderForecast(target, toDaysSafe(json), place, sourceLine(savedAt));
  } catch {
    if (requestId !== weatherRequest) return;
    if (cached) return; // the cached render above already stands
    try {
      const { json } = await fetchSample();
      if (requestId !== weatherRequest) return;
      forecastView.renderForecast(target, toDaysSafe(json), place, t('weather.sampleSource'));
    } catch {
      forecastView.renderEmpty(target, place);
    }
  }
}

function toDaysSafe(json) {
  const daily = json?.daily;
  if (!daily?.time) return [];
  return daily.time.map((date, i) => ({
    date, max: daily.temperature_2m_max[i], min: daily.temperature_2m_min[i], rain: daily.precipitation_probability_max[i],
  }));
}

function sourceLine(savedAt) {
  return savedAt ? `${t('weather.source')} ` : t('weather.source');
}

function populateCitySelect() {
  const select = document.getElementById('weather-city');
  const previous = select.value;
  select.replaceChildren(...CITIES.map((city) => {
    const option = document.createElement('option');
    option.value = city.id;
    option.textContent = cityLabel(city);
    return option;
  }));
  select.value = CITIES.some((c) => c.id === previous) ? previous : CITIES[0].id;
}

document.getElementById('weather-city').addEventListener('change', (event) => {
  const city = CITIES.find((c) => c.id === event.target.value);
  if (city) loadWeather(city);
});

// --- App view: language, low data, install, updates --------------------------

function renderLanguageControls() {
  document.getElementById('language-select').value = currentLocale();
  document.getElementById('language-draft-notice').hidden = !isDraft();
}

document.getElementById('language-select').addEventListener('change', async (event) => {
  await setLocale(event.target.value);
});

// Registered only once startup's first render is done (see start()), so the
// very first, unsaved locale pick made by startI18n() does not trigger a
// second, redundant render of a page that has not shown anything yet.
function onLocaleChange() {
  translatePage();
  renderLanguageControls();
  renderDashboard();
  renderCourse();
  renderPlanner();
  populateCitySelect();
  const city = CITIES.find((c) => c.id === document.getElementById('weather-city').value) ?? CITIES[0];
  loadWeather(city);
}

function renderLowDataControls() {
  document.getElementById('low-data-toggle').checked = lowData.lowDataPreferred();
}

document.getElementById('low-data-toggle').addEventListener('change', (event) => {
  lowData.setLowData(event.target.checked);
});

lowData.subscribe(() => {
  renderLowDataControls();
  if (catalog) renderThreeDGate(phaseProgress(catalog, progressStore.getDone()));
});

// --- Startup -----------------------------------------------------------------

async function start() {
  await startI18n();
  translatePage();
  renderLanguageControls();
  renderLowDataControls();

  document.getElementById('app-version').textContent = t('app.version', { version: APP_VERSION });
  console.assert(isSemver(APP_VERSION), 'APP_VERSION in config.js is not a valid semantic version');

  try {
    catalog = await loadCatalog();
  } catch (error) {
    console.warn('Could not load the course catalog:', error);
    catalog = { phases: [], lessons: [] };
  }
  renderDashboard();
  renderCourse();
  renderPlanner();

  populateCitySelect();
  await loadWeather(CITIES[0]);

  showView(currentView());

  const registration = await registerServiceWorker({
    onUpdateReady: (worker) => {
      document.getElementById('update-message').classList.add('visible');
      showUpdateBanner(worker, {
        message: document.getElementById('update-text'),
        button: document.getElementById('update-button'),
      });
    },
  });
  if (registration) console.info('Service worker registered:', registration.scope);

  offerInstall({ button: document.getElementById('install-button'), status: document.getElementById('install-status') });
  if (isInstalled()) document.getElementById('install-status').textContent = t('install.done');

  document.addEventListener('localechange', onLocaleChange);
}

start();
