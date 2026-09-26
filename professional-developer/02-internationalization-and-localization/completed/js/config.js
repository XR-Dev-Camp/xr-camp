// config.js: every setting for the localized exhibit, in one place.
// This is the same pattern as js/config.js in frontend-engineer/09.

// --- Languages ---------------------------------------------------------------
// Each code is a BCP 47 language tag, the same kind <html lang> uses, and the
// name of a file in js/locales/. Names are written in their own language, so
// everyone can find theirs.
export const LOCALES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español (Latinoamérica)' },
  { code: 'zh-Hans', name: '简体中文' },
];
export const DEFAULT_LOCALE = 'en';
export const LANGUAGE_KEY = 'xrc-exhibit-language';
export const PSEUDO_KEY = 'xrc-exhibit-pseudo';

// --- The exhibit ---------------------------------------------------------------
// Three primitives only, copied down from the five-item capstone exhibit in
// web3d-developer/07: this lesson is about words, not new 3D content, so the
// two glTF models (and the loading, disposal, and attribution work they
// bring) are left out to keep the starter compact. Each id is also a key
// prefix in js/locales/*.js: 'item.<id>.name', '.made', '.note'.
export const ITEMS = [
  { id: 'clay-pot', x: -0.9 },
  { id: 'basket-ring', x: 0 },
  { id: 'jade-stone', x: 0.9 },
];

// --- The Intl demo panel -------------------------------------------------------
// A fixed opening date, so every learner sees the same "Opened on" date and a
// relative phrase ("3 years ago") that keeps advancing correctly, because it
// is computed fresh from the real clock every time the page runs.
export const OPENED_DATE = '2024-03-02';
export const VISITOR_COUNT = 128430;
