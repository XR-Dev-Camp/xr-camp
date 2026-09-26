# Changelog

Every notable change to My XR Camp, for the people who use it, in plain
words. The version numbers follow [Semantic Versioning](https://semver.org/):
MAJOR.MINOR.PATCH. `js/config.js`, `sw.js`, and the version shown in the App
tab are always kept equal to the newest entry here; `check.html` checks that
`js/config.js` and `sw.js` agree.

## 1.0.0 — 2026-09-28

The first release: one app for all of Phase 2.

### Added

- A dashboard that shows progress by phase, with a table and, optionally, a
  3D bar chart (Courses 2.1, 2.2).
- A course map built from `data/catalog.json`, with `<lesson-card>` for every
  lesson (Courses 2.1, 2.5).
- A session planner: add, complete, and delete 45-minute study sessions
  (Course 2.3).
- Study-week weather: a 7-day forecast for cities where XR Camp learners
  study, with a offline sample forecast as a fallback (Courses 2.4, 2.6).
- Installable, offline, with an accessible update prompt (Course 2.6).
- Three languages: English (complete), and short first-draft Spanish and
  Simplified Chinese, with a language switcher that sets `<html lang>`.
- A "See my progress in 3D" button that loads A-Frame only when pressed,
  with a text description and table twin of everything the 3D view shows.
- `check.html`, a page of pure-function checks for `js/utils.js` and
  `js/i18n.js`, run with no framework and no network.
