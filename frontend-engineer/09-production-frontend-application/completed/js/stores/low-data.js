// low-data.js: the learner's low-data choice. Copied from Course 2.6, with
// one addition: subscribe(), so the dashboard can hide or show its 3D button
// the moment the choice changes, like every other store in this app.

import { LOW_DATA_KEY } from '../config.js';

const listeners = new Set();

// Some browsers (mostly Chromium ones) say when the learner has asked to save
// data. Others have no navigator.connection at all: ?. keeps this safe.
export function deviceSavesData() {
  return navigator.connection?.saveData === true;
}

// The learner's own choice wins. With no choice saved, follow the device.
export function lowDataPreferred() {
  try {
    const saved = localStorage.getItem(LOW_DATA_KEY);
    if (saved === 'on') return true;
    if (saved === 'off') return false;
  } catch {
    // Storage switched off: fall back to the device setting.
  }
  return deviceSavesData();
}

export function setLowData(on) {
  try {
    localStorage.setItem(LOW_DATA_KEY, on ? 'on' : 'off');
  } catch {
    // Storage switched off: the choice lasts until the page closes.
  }
  for (const listener of listeners) listener(on);
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
