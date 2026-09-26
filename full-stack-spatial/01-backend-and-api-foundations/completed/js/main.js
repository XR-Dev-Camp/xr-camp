// main.js: the settings panel. It loads settings (from the API if the
// server is running, from this browser's storage if not), fills the form,
// and keeps the 3D scene in sync. No three.js API appears in this file —
// scene.js owns that — and no fetch() appears in scene.js. Each file has
// one job, the same rule Course 3.4 (and Course 2.3, for the planner) used.

import { createScene, EXHIBITS } from './scene.js';

const $ = (id) => document.getElementById(id);
const API_URL = '/api/settings';
const LOCAL_KEY = 'xrc_fss01_settings';

// The same defaults and known values as completed/server/validation.js.
// Two small lists like this, kept in sync by hand across a client and a
// server with no shared build step, are a normal trade-off at this stage —
// Course 6.1 introduces the tooling that would remove the duplication.
const DEFAULT_SETTINGS = {
  visibleExhibits: ['clay-pot', 'basket-ring', 'jade-stone'],
  cameraStart: 'front',
  language: 'en',
  reducedMotion: false,
};
const LANGUAGE_LABELS = { en: 'English', 'es-419': 'Español', 'zh-Hans': '简体中文' };

let serverAvailable = true; // optimistic until a request fails

function setStatus(message, kind) {
  const banner = $('status');
  banner.textContent = message;
  banner.classList.toggle('is-offline', kind === 'offline');
  banner.classList.toggle('is-error', kind === 'error');
}

function readLocalSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(LOCAL_KEY));
    if (saved && Array.isArray(saved.visibleExhibits)) return saved;
  } catch {
    // Corrupt or missing: fall through to defaults.
  }
  // No saved choice yet: default to the device's own reduced-motion
  // request (checked once, in the page's head — see the inline script in
  // index.html), rather than always starting animated.
  return { ...structuredClone(DEFAULT_SETTINGS), reducedMotion: window.__reducedMotion === true };
}

function writeLocalSettings(settings) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(settings));
  } catch {
    // Private browsing or a full quota: the page still works for this
    // visit, it just will not remember next time.
  }
}

// Tries the API first. Any failure — no server, a network error, or the
// static-only server this repository's checks use, which has no /api
// routes at all — falls back to this browser's storage, and remembers
// that fallback for the rest of the visit, so every later Save also goes
// straight to localStorage instead of trying the API again.
async function loadSettings() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`GET ${API_URL} returned ${res.status}`);
    serverAvailable = true;
    return await res.json();
  } catch {
    serverAvailable = false;
    setStatus('Server not running: settings are saved in this browser only.', 'offline');
    return readLocalSettings();
  }
}

async function saveSettings(settings) {
  if (!serverAvailable) {
    writeLocalSettings(settings);
    setStatus('Server not running: settings are saved in this browser only.', 'offline');
    return { ok: true, settings };
  }
  try {
    const res = await fetch(API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    if (res.status === 400) {
      const body = await res.json();
      return { ok: false, details: body.details ?? [body.error] };
    }
    if (!res.ok) throw new Error(`PUT ${API_URL} returned ${res.status}`);
    return { ok: true, settings: await res.json() };
  } catch {
    serverAvailable = false;
    writeLocalSettings(settings);
    setStatus('Server not running: settings are saved in this browser only.', 'offline');
    return { ok: true, settings };
  }
}

async function resetSettings() {
  if (!serverAvailable) {
    writeLocalSettings(DEFAULT_SETTINGS);
    return structuredClone(DEFAULT_SETTINGS);
  }
  try {
    const res = await fetch(API_URL, { method: 'DELETE' });
    if (!res.ok) throw new Error(`DELETE ${API_URL} returned ${res.status}`);
  } catch {
    serverAvailable = false;
    setStatus('Server not running: settings are saved in this browser only.', 'offline');
  }
  return loadSettings();
}

// --- Form <-> settings object -----------------------------------------------

function applyToForm(settings) {
  for (const item of EXHIBITS) {
    $(`exhibit-${item.id}`).checked = settings.visibleExhibits.includes(item.id);
  }
  const cameraInput = document.querySelector(`input[name="cameraStart"][value="${settings.cameraStart}"]`);
  if (cameraInput) cameraInput.checked = true;
  $('language').value = settings.language;
  $('reduced-motion').checked = settings.reducedMotion;
}

function readForm() {
  return {
    visibleExhibits: EXHIBITS.filter((item) => $(`exhibit-${item.id}`).checked).map((item) => item.id),
    cameraStart: document.querySelector('input[name="cameraStart"]:checked')?.value ?? 'front',
    language: $('language').value,
    reducedMotion: $('reduced-motion').checked,
  };
}

// --- The always-present 2D description --------------------------------------
// Built from the same EXHIBITS list the scene is built from (WCAG 1.3.1):
// the words and the picture can never disagree about which objects exist.

function renderExhibitList(settings) {
  const list = $('exhibit-list');
  list.replaceChildren(...EXHIBITS.map((item) => {
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = item.name;
    const shown = settings.visibleExhibits.includes(item.id);
    li.append(strong, document.createTextNode(` — ${item.made}. ${shown ? 'Shown in the exhibit.' : 'Hidden by your settings.'}`));
    return li;
  }));
}

function updateDescription(settings, animating) {
  const shown = EXHIBITS.filter((item) => settings.visibleExhibits.includes(item.id)).map((item) => item.name.toLowerCase());
  const parts = [];
  parts.push(shown.length > 0
    ? `The exhibit shows: ${shown.join(', ')}.`
    : 'No exhibits are shown: every exhibit is hidden in your settings.');
  parts.push(`The camera starts at the ${settings.cameraStart} view.`);
  parts.push(animating ? 'The jade stone turns slowly, when it is shown.' : 'Animation is paused: nothing is turning right now.');
  parts.push(`Language preference: ${LANGUAGE_LABELS[settings.language] ?? settings.language}.`);
  $('scene-description').textContent = parts.join(' ');
}

// --- Wiring ------------------------------------------------------------------

async function init() {
  const settings = await loadSettings();
  applyToForm(settings);
  renderExhibitList(settings);

  const scene = createScene($('canvas-box'));
  scene.applySettings(settings);

  // The pause button's label and aria-pressed must agree with whatever
  // applySettings just decided (reducedMotion may have started it paused),
  // not with the "Pause animation" text index.html happens to start with.
  const pauseButton = $('pause-toggle');
  function setAnimating(on) {
    scene.setAnimating(on);
    pauseButton.setAttribute('aria-pressed', String(!on));
    pauseButton.textContent = on ? 'Pause animation' : 'Resume animation';
    updateDescription(readForm(), on);
  }
  setAnimating(scene.isAnimating());
  pauseButton.addEventListener('click', () => setAnimating(!scene.isAnimating()));

  $('settings-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const errorList = $('field-errors');
    errorList.replaceChildren();

    const next = readForm();
    if (next.visibleExhibits.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'Show at least one exhibit.';
      errorList.append(li);
      $('exhibit-clay-pot').focus();
      return;
    }

    const result = await saveSettings(next);
    if (!result.ok) {
      errorList.replaceChildren(...result.details.map((message) => {
        const li = document.createElement('li');
        li.textContent = message;
        return li;
      }));
      return;
    }

    scene.applySettings(result.settings);
    renderExhibitList(result.settings);
    updateDescription(result.settings, scene.isAnimating());
    if (serverAvailable) setStatus('Settings saved.');
  });

  $('reset-button').addEventListener('click', async () => {
    const restored = await resetSettings();
    applyToForm(restored);
    scene.applySettings(restored);
    renderExhibitList(restored);
    updateDescription(restored, scene.isAnimating());
    $('field-errors').replaceChildren();
    if (serverAvailable) setStatus('Settings reset to defaults.');
  });
}

init();
