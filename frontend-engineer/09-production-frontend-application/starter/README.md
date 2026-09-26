# Starter - Phase 2 Capstone - Production Frontend Application

Begin here. Follow the walkthrough in [../README.md](../README.md).

## What to copy from which lesson

Every module below is already written for you in this starter, copied (and,
where the README says so, adapted) from an earlier lesson. This table exists
so that if you build My XR Camp from scratch instead of starting from this
folder, you know exactly where each piece comes from.

| File | Copied from | What changed for this lesson |
| --- | --- | --- |
| `js/config.js` | Every lesson's own `config.js` (2.1–2.6) | Merged into one file, grouped by feature; added the language and 3D settings |
| `js/utils.js` | Every lesson's own `utils.js` (2.1–2.4, 2.7) | Merged; nothing else changed — these were already pure functions |
| `js/i18n.js` | New in this lesson | — |
| `js/locales/en.js` | New in this lesson | — |
| `js/locales/es.js`, `js/locales/zh-Hans.js` | New in this lesson | First-draft translations; see "Multilingual-ready" in the README |
| `js/stores/progress-store.js` | Course 2.2's `state.js` and Course 2.5's `progress.js` | Merged into one store, with the store pattern (`subscribe()`) from Course 2.3 |
| `js/stores/planner-store.js` | Course 2.3's `store.js` | Renamed the storage key constant only; its saved value is unchanged |
| `js/stores/low-data.js` | Course 2.6's `low-data.js` | Added `subscribe()`, so more than one view can react to it |
| `js/services/api.js`, `js/services/cache.js` | Course 2.4's `api.js` and `cache.js` | Unchanged |
| `js/services/catalog.js` | Course 2.1's `data.js` | Renamed |
| `js/services/pwa.js` | Course 2.6's `pwa.js` | Every message now comes from `t()` instead of being written in English |
| `js/components/lesson-card.js` | Course 2.5's `lesson-card.js` | Every string now comes from `t()`; listens for `"localechange"` |
| `js/components/progress-view.js` | Course 2.2's `dashboard.js` | Words moved to locale files; numbers formatted with `Intl` |
| `js/components/forecast-view.js` | Course 2.4's `view.js` | Same, moved to locale files and `Intl` |
| `js/components/session-item.js`, `session-list.js`, `week-summary.js` | Course 2.3's same-named files | Same, moved to locale files and `Intl` |
| `js/components/three-progress.js` | New in this lesson | — |
| `manifest.webmanifest`, `sw.js`, `offline.html`, `icons/` | Course 2.6 | Renamed the caches; added the 3D moment's caching notes |
| `check.html` | Course 2.3's `check.html`, extended | Also checks `i18n.js` and that `sw.js`'s version agrees with `config.js` |
| `styles.css` | Course 2.3's `styles.css` | Extended, in a clearly labelled section, for navigation, the language switcher, and the 3D view |
| `js/main.js` | **Not copied. Yours to write.** | Eight numbered TODOs wire every module above together |

## Your work

Open `js/main.js`. Everything else above already works; your eight TODOs
connect it to the page in `index.html`. Read the walkthrough in
[`../README.md`](../README.md) for the order to do them in.
