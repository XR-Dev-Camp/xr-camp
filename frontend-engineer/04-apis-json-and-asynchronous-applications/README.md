# APIs, JSON, and Asynchronous Applications

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `frontend-engineer` · **Lesson:** `apis-json-and-asynchronous-applications-04` · **Time:** about 12 hours · 16 sessions of 45 minutes · about 4 weeks at 4 sessions a week

---

> Build a public-data, cultural, education, or community dashboard.

---

## Learning objectives

By the end of this project you will be able to:

1. Explain what an **API** is, and read its JSON answer in the browser before writing code.
2. Build a request URL safely with `URLSearchParams`.
3. Use `fetch` with `async` and `await`, check `response.ok`, and set a **timeout**.
4. Design all four states of a request: **loading**, **error**, **empty**, and **ready**.
5. **Cache** answers with the time they were saved, so the app is fast and still useful offline.
6. Prevent **race conditions**, where a slow, older answer overwrites a newer one.
7. Work with **mock data** that has the same shape as the real API, so you can build and test without the internet.

## Prerequisites

- **Course 2.1: Modern JavaScript** (`async`/`await`, modules, error handling).
- **Course 2.3: Application Architecture** (config, pure functions, one job per file).

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser, with its developer tools | The **Network** panel shows every request and answer | Free |
| VS Code and a local server | Modules and `fetch` need `http://` | Free |
| [Open-Meteo](https://open-meteo.com/) | Weather forecasts: no key, no account | Free for non-commercial use |

**If Open-Meteo is slow or blocked where you are**, tick **Use sample data**: the whole lesson works offline with `data/sample-forecast.json`. That is also exactly how professional teams work when an API is not ready yet.

## What you will build

The fourth part of **My XR Camp**: a **study-week weather dashboard**. Choose your city, and see the next seven days: highs, lows, and the chance of rain, with the driest day picked out, so you can plan the sessions you walk to (a library, a study group, a community centre) on dry days.

It is small, but it behaves like a professional app: it shows a saved forecast instantly, updates it in the background, explains failures in plain words, offers **Try again**, keeps working offline, and never shows the wrong city.

The reference solution is in [`completed/`](completed/). The starter has the page, the styles, the config, and sample data finished; the JavaScript files have thirteen TODOs.

## Folder guide

```text
04-apis-json-and-asynchronous-applications/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html, styles.css        # Finished
│   ├── data/sample-forecast.json     # Sample data, with the API's exact shape
│   ├── js/config.js     # Finished; TODO 1 is at the top
│   ├── js/api.js        # TODOs 2 and 5
│   ├── js/forecast.js   # TODOs 3–4
│   ├── js/view.js       # TODOs 6–8
│   ├── js/cache.js      # TODO 9
│   ├── js/main.js       # TODOs 10–13
│   └── 3d-moment.html   # The forecast as 3D bars
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Copy the starter into a new folder, `weather`, and commit it with Git.
2. Start your local server. Open `index.html` with the **Network** and **Console** panels open.
3. Until TODO 10, the page says "Loading…" forever. That is expected.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; Step 1: what an API is (TODO 1) | You have read the API's JSON |
| 2 | Step 2: building the URL (TODO 2) | A working request URL |
| 3 | Step 3: turning JSON into days (TODOs 3–4) | Pure functions for the data |
| 4 | Step 4: `fetch`, `async`, and `await` (TODO 5) | `fetchJson` with a timeout |
| 5 | Step 5: the ready state (TODO 6) | A forecast table |
| 6 | Step 6: loading and errors (TODOs 7, 10) | Every failure explained |
| 7 | Step 6, continued: test the failures | Offline, blocked, and slow, all handled |
| 8 | Step 7: the empty state (TODO 8) | Nothing is ever just blank |
| 9 | Step 8: caching (TODO 9) | Saved answers with a time |
| 10 | Step 8, continued (TODO 11) | Instant loads, and offline use |
| 11 | Step 9: race conditions (TODO 12) | Never the wrong city |
| 12 | Step 10: mock data and going offline (TODO 13) | Works with no internet |
| 13 | Step 11: test with keyboard and screen reader | A tested dashboard |
| 14 | The **3D moment** | The forecast as 3D bars |
| 15 | [`tests/checklist.md`](tests/checklist.md) | A finished dashboard |
| 16 | One challenge extension, then **Submitting your work** | The fourth part of My XR Camp |

### Step 1: what an API is (TODO 1)

An **API** (Application Programming Interface) is a way for one program to ask another for something. A **web API** is a web address that answers with data instead of a page. Usually the data is **JSON**: the same objects and arrays you know from JavaScript, written as text.

Before writing any code, open the address in TODO 1 in your browser. Read the answer. Firefox shows it as a tree; in Chrome and Edge, tick **Pretty-print**. In Safari, open it in the Network panel of Web Inspector to see it formatted. You will find:

```json
"daily": {
  "time": ["2026-09-28", "2026-09-29", …],
  "temperature_2m_max": [26.8, 25.4, …],
  "precipitation_probability_max": [94, 59, …]
}
```

Three **parallel arrays**: position 0 in each belongs to the first day. Always read an API's real answer first. Its documentation tells you what it *should* send; the answer tells you what it *does*.

### Step 2: building the URL (TODO 2)

The part after `?` is the **query string**: `name=value` pairs joined by `&`. Do not glue it together by hand. `URLSearchParams` builds it and encodes anything unusual (spaces, accents, commas) correctly:

```js
const params = new URLSearchParams({ latitude: 19.43, longitude: -99.13, forecast_days: 7 });
`${API_URL}?${params}`   // …/forecast?latitude=19.43&longitude=-99.13&forecast_days=7
```

### Step 3: turning JSON into days (TODOs 3–4)

The API's shape is good for the API. Your page wants something else: one object per day. Convert it once, in a pure function, and the rest of your code never needs to know about parallel arrays:

```js
return daily.time.map((date, i) => ({ date, max: daily.temperature_2m_max[i], … }));
```

If the API changes its shape one day, this is the only function you fix.

### Step 4: `fetch`, `async`, and `await` (TODO 5)

A request takes time: a few milliseconds on fast Wi-Fi, several seconds on a busy mobile connection. JavaScript does not stop and wait. `fetch` returns a **promise**, and `await` pauses only your `async` function until the answer arrives, while the page stays responsive.

Two things surprise almost everyone:

- **`fetch` does not fail on "404" or "500".** Those are answers, just unhappy ones. `fetch` only rejects when there is no answer at all: offline, blocked, or cancelled. So always check `response.ok`.
- **A request can hang for a long time.** `AbortSignal.timeout(8000)` cancels it after eight seconds, so the learner sees an error instead of "Loading…" forever.

Open `3d-moment.html` with the **Network** panel open: it already calls `fetchForecast`, so you can watch the request, its status (200), its size, and its time. The dashboard itself starts fetching once TODO 10 is done.

### Step 5: the ready state (TODO 6)

A forecast is a table: days down the side, measurements across. Use a real `<table>`, with a `<caption>`, `<th scope="col">` for the column headings, and `<th scope="row">` for each day's name. A screen reader can then say "Tuesday, High, 25 °C" as the learner moves through it.

The driest day is marked with bold, a colour, *and* the word "(driest)", so the meaning never depends on colour alone.

### Step 6: loading and errors (TODOs 7 and 10)

Every request is in one of four states. Most beginners build only the happy one. Build them all:

| State | What the learner sees |
| --- | --- |
| **Loading** | "Loading the forecast for Lima…", and `aria-busy="true"` on the region |
| **Error** | What went wrong, in plain words, and a **Try again** button |
| **Empty** | The service answered, but with nothing to show: say so calmly |
| **Ready** | The forecast |

`explain(error)` turns technical errors into sentences a learner can act on. A `TypeError` from `fetch` means the network failed; a `TimeoutError`, that it took too long.

**Test every failure on purpose.** In the Network panel, choose **Offline** from the throttling menu, or right-click the request and choose **Block request URL**. Choose **Slow 4G** (Chrome) to watch the loading state. You cannot trust an error message you have never seen.

### Step 7: the empty state (TODO 8)

`toDays` returns `[]` when the answer has no days. That is not an error (the request worked) and not ready (there is nothing to show). Test it by editing a copy of the sample file to remove `daily`.

### Step 8: caching (TODOs 9 and 11)

A forecast does not change every second. Asking the API again each time the learner switches city wastes their data and time. So save each answer with the time you saved it:

```js
{ "savedAt": 1790000000000, "data": { …the API's answer… } }
```

The strategy in `load()` is called **cache first, then network**:

1. If there is a saved copy, **show it at once**. If it is younger than 30 minutes, stop.
2. Otherwise, ask the network. When the answer arrives, save it and show it.
3. If the network fails, but you had a saved copy, **keep showing it**, and say it could not update.

Always say where the data came from, and when: "Saved in this browser at 14:05." Old data that says it is old is useful. Old data pretending to be new is not.

### Step 9: race conditions (TODO 12)

Choose Bogotá, then quickly Chengdu. Two requests are now travelling. If Bogotá's answer is slower, it arrives last and replaces Chengdu's, and the page shows Bogotá's forecast while the city list says Chengdu. This is a **race condition**, and it is one of the most common bugs in real apps.

The fix: number every request, and after every `await`, check you are still the latest:

```js
const request = ++latestRequest;
const json = await fetchForecast(city);
if (request !== latestRequest) return;   // a newer request has started
```

To see the bug, in the Network panel throttle to **Slow 4G** and switch cities quickly, before and after your fix.

### Step 10: mock data and going offline (TODO 13)

`data/sample-forecast.json` has **exactly the same shape** as the real answer. So all your code (toDays, the table, the 3D bars) works with it unchanged. Teams use **mock data** like this to build before an API exists, to test without the internet, and to create awkward cases (an empty answer, a 100% chance of rain) on purpose.

When the connection comes back, the browser fires an `online` event: listen for it, and refresh.

### Step 11: test with keyboard and screen reader

- Change city with the keyboard. Is the new forecast announced?
- Go offline and Refresh. Is the error announced? Can you reach **Try again**?
- On a phone-width screen, can you scroll the table sideways with the keyboard (it is focusable)?

## Key code explained

**`json?.daily`** (optional chaining). If `json` is `null` or `undefined`, the result is `undefined` instead of an error.

**`AbortSignal.timeout(ms)`** gives `fetch` a signal that cancels it after `ms` milliseconds. The rejected error's `name` is `"TimeoutError"`.

**`new Option(text, value)`** creates an `<option>` element: a short way to fill a `<select>` from data.

**`finally`** runs after `try`, whether it succeeded or failed: the right place to remove `aria-busy`.

**`new Date(\`${date}T12:00:00\`)`**. A date with no time, like `2026-09-28`, is read as midnight UTC, which is still the day before in the Americas. Adding a local noon keeps the day right everywhere.

## 3D moment

Open [`completed/3d-moment.html`](completed/3d-moment.html): the same forecast as seven 3D bars. Height shows the high temperature (25 °C becomes 2.5 metres); colour runs from sand (dry) to deep blue (rain).

The page follows a rule you will use for every data visualisation in 3D: **one array of data, several views of it**. The same `days` array makes the bars, the scene description ("The tallest bar is Friday, at 27 °C"), and the table under the scene. The table is the 2D twin: everything the bars show, in a form every learner can use.

The camera is fixed (`look-controls` and `wasd-controls` switched off) and nothing moves, so there is nothing to pause. In the starter, try changing the height scale, or add a second row of bars for the lows.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| The forecast is a real table, with a caption and header cells | 1.3.1 | Screen readers announce each value with its day and column. |
| Loading, errors, and updates are announced | 4.1.3 | Status messages reach screen-reader users. |
| Errors say what happened and what to do | Good practice | "You may be offline" and **Try again**, not "Error". |
| The driest day is marked in words, not only colour | 1.4.1 | Colour alone is not enough. |
| The table scrolls inside its own region on narrow screens | 1.4.10 | The page never scrolls sideways. |
| The scrolling region can be reached with the keyboard | 2.1.1 | Keyboard users can scroll it too. |
| The 3D bars have a text description and a table twin | 1.1.1 | The information never lives only in the 3D scene. |

## Performance considerations

The cache is the biggest win: switching back to a city you have seen is instant and costs no data. The request asks for three daily values, not everything the API offers: smaller answers, faster pages. Count the bytes in the Network panel: the whole forecast is under 1 KB, smaller than a single icon.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Not checking `response.ok` | A 404 page is parsed as JSON, and fails with a confusing error | Throw your own clear error |
| No timeout | "Loading…" forever on a bad connection | `AbortSignal.timeout` |
| Only building the happy state | A blank page when anything goes wrong | Design loading, error, empty, and ready |
| Forgetting `await` | You get a `Promise` object instead of data | `await` inside an `async` function |
| Showing old data without saying so | Learners trust a forecast from yesterday | Always show when it was saved |
| Ignoring late answers | The wrong city's forecast appears | Number requests; ignore old ones |
| Putting an API key in front-end code | Anyone can read and misuse it | Use no-key APIs, or a server (Phase 5) |

## Troubleshooting

**`Failed to fetch` (Chrome), `NetworkError when attempting to fetch resource.` (Firefox), or `Load failed` (Safari).** You are offline, or the service is blocked on your network. Try **Use sample data**.

**Blocked by CORS policy.** The API does not allow requests from other websites. Open-Meteo does allow them; if you switch to another API, check its documentation for "CORS". If the page is blank and the Console says something was blocked by CORS policy for `main.js`, you opened the page as a file: use your local server instead.

**The dates are one day off.** You created a `Date` from `"2026-09-28"` without a time. See **Key code explained**.

**`fetchJson is not defined`** in the starter's 3D moment: finish TODOs 2 to 6.

**Nothing changes after editing the sample file.** You are seeing the cache. Clear it in the **Application** panel (Firefox: **Storage**) under Local Storage, or press **Refresh**.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: remember the learner's city, and show "updated 5 minutes ago".
2. **[Creative](challenges/challenge-2.md)**: a dashboard of public data for your own community.
3. **[Explorer](challenges/challenge-3.md)**: earthquakes near you, from a second API, on the same four states.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take screenshots of three states: ready, error (go offline), and sample data. And one of the 3D bars.
3. Keep them in your learner journal and portfolio. Share them with other developers: see [where to share your work and ask for help](../../docs/en/community.md).
4. In your journal, answer: which failure did you not expect, and how does your app explain it now?

## Further reading

- [MDN: Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [MDN: async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN: URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- [MDN: AbortSignal.timeout()](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static)
- [Open-Meteo: Weather Forecast API documentation](https://open-meteo.com/en/docs)

## Women to Know

**Paola Villarreal** is a self-taught Mexican programmer and data scientist from Mexico City. She was technology director at the city's innovation lab, the Laboratorio para la Ciudad. Later, as a Mozilla and Ford Open Web Fellow with the ACLU of Massachusetts, she produced the data analysis for "Data for Justice", which supported the dismissal of more than 21,000 drug convictions tainted by a scandal at a state drug-testing laboratory.

Public data changes lives when someone fetches it, cleans it, and shows it clearly: the same steps as this dashboard, on a much bigger scale. She taught herself, as many of you are doing now.

_Facts from public sources, checked 2026. Spotted an error? [Tell us](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Standards spotlight

`fetch`, `Response`, and `response.ok` are defined by the WHATWG's **Fetch Standard**, which also defines **CORS**: the rules that decide whether a page on one website may read an answer from another. JSON's syntax is standardised as **ECMA-404** and in the IETF's **RFC 8259**. `AbortSignal` comes from the WHATWG's **DOM Standard**. Because these are open standards, the same dashboard works in every modern browser.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
