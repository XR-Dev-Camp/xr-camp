# Internationalization and Localization

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `professional-developer` · **Lesson:** `internationalization-and-localization-02` · **Time:** about 10 hours · 14 sessions of 45 minutes · about 4 weeks at 4 sessions a week

---

> Release an application in English, Spanish, and Simplified Chinese.

## Learning objectives

By the end of this project you will be able to:

1. Explain the difference between internationalization (i18n: making an app *able* to change language) and localization (l10n: doing the actual translation work for one language).
2. Choose a learner's best available language from a list of BCP 47 tags, using `Intl.Locale` and script maximization.
3. Format numbers, dates, and relative times correctly for a language with `Intl.NumberFormat`, `Intl.DateTimeFormat`, and `Intl.RelativeTimeFormat`, instead of writing your own formatting rules.
4. Choose the correct plural form for a language with `Intl.PluralRules`, including for a language, like Simplified Chinese, that only has one.
5. Draw a 3D text label on a `<canvas>` so it can show any script a browser can render, and explain why A-Frame's and three.js's built-in text cannot.
6. Set up a font stack, `lang` attributes, and line-breaking rules that give Chinese text the right typeface and the right break points, without faking italics it does not have.
7. Build a layout that survives text expansion, and test it with a pseudo-localization mode before a single string is professionally translated.
8. Work through a translation QA checklist, and correctly mark a first-pass, non-native translation as a draft.

## Prerequisites

- **Course 2.9: Production Frontend Application**, which built the language-choosing machinery (`pickLocale`, `setLocale`, `t()`) this lesson copies forward and extends.
- **Course 3.7: Interactive Web3D Experience**, whose virtual cultural exhibit this lesson's compact three-item version is built from.
- Comfort with ES modules, `async`/`await`, and the three.js basics from Phase 3 (scene, camera, renderer).

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser (Chrome, Firefox, Safari, or Edge) | Runs the exhibit and its `Intl` calls | Free |
| A code editor (e.g. VS Code) | Writing the JavaScript, CSS, and locale files | Free |
| A local static server (e.g. `python3 -m http.server`) | Serving pages over `http://`, required for ES modules | Free |
| Google Chrome DevTools, or Firefox/Safari's equivalent | Checking rendered fonts and console warnings per language | Free, built in |

No paid accounts, no API keys, and no installed language packs are needed: every font stack below falls back to a system font, and Chrome, Firefox, and the Microsoft Edge and UC Browser builds available in mainland China all support the `Intl` APIs this lesson uses.

## What you will build

A compact, three-object version of the Phase 3 capstone exhibit (the clay pot, woven basket ring, and jade stone from `web3d-developer/07`), rebuilt so every word in it — 3D labels, the info panel, the scene description, and a small statistics panel — can switch between English, Spanish (Latin American), and Simplified Chinese without touching any 3D code. The reference solution is in [`completed/`](completed/), and the starter has 12 numbered TODOs across seven files.

Along the way you extend the language-switching approach from Course 2.9 with the parts a single-language app never needed: `Intl.NumberFormat`, `Intl.DateTimeFormat`, and `Intl.RelativeTimeFormat`; canvas-drawn 3D labels that render Chinese characters and accented Spanish; a font stack and line-breaking rules for Chinese typography; and a pseudo-localization mode that stress-tests your layout before a translator ever opens the project.

The Spanish and Simplified Chinese strings you write in this lesson are first-pass drafts, marked `draft: true`, in every locale file — including in the reference solution. See "Translation QA checklist" below before treating any of them as ready to publish.

## Folder guide

```text
02-internationalization-and-localization/
├── README.md
├── starter/        # begin here
├── completed/      # reference solution
├── challenges/     # Three challenges: Foundation is required
├── tests/          # self-review checklist
├── assets/
└── screenshots/
```

## Setup

1. Clone or download this repository.
2. Serve the repository root with a local server, for example `python3 -m http.server 8766`.
3. Open `starter/index.html` through that server (an `http://` address, not `file://`: ES modules need one).
4. Open the browser's DevTools console. Until the TODOs are done, it shows "Missing string" warnings and the pedestals show no labels — that is expected.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Read the starter, add the Simplified Chinese entry to `LOCALES` (TODO 1) | Three language buttons on the page |
| 2 | Read `i18n.js`'s `pickLocale`/`setLocale` from Course 2.9; write `formatVisitorCount` (TODO 2) | A correctly grouped visitor number |
| 3 | Write `formatOpenedDate` (TODO 3) | A localized, spelled-out opening date |
| 4 | Write `formatOpenedRelative` with `Intl.RelativeTimeFormat` (TODO 4) | A live "X years ago" phrase |
| 5 | Translate the two missing keys in `es.js` and `zh-Hans.js` (TODO 5) | Every UI string filled in for all three languages |
| 6 | Write `buildJadeStone()` in `exhibit.js` (TODO 6) | The third pedestal's object appears in 3D |
| 7 | Write the canvas-drawing code in `labels.js` (TODO 7) | A readable name label above each pedestal |
| 8 | Read and confirm the billboarding note in `app.js` (TODO 8), test orbiting | Labels stay readable from every angle |
| 9 | Wire selection and the info panel in `main.js` (TODO 9) | Clicking a pedestal fills the info panel |
| 10 | Mark the active language button in `main.js` (TODO 10) | A visibly and programmatically current language button |
| 11 | Write `pseudoLocalize()` in `pseudo.js` (TODO 11) | Bracketed, stretched text on demand |
| 12 | Wire the pseudo-localization checkbox (TODO 12) | Toggling the checkbox visibly stress-tests the layout |
| 13 | Work through `tests/checklist.md` in all three languages, with pseudo-localization on and off | A clean console and a checked-off list |
| 14 | One challenge extension (Foundation is required), then **Submitting your work** | A fourth localized fact, and your submission |

### Step 1: Add the third language (TODO 1)

`config.js` lists every language the app offers. Each entry needs a BCP 47 code — the same kind of tag `<html lang>` and the `Accept-Language` header use — and a name written in that language itself, so a reader can find their own language without first reading English.

```js
{ code: 'zh-Hans', name: '简体中文' },
```

The `Hans` subtag is a *script* subtag: it says "Simplified Han", as opposed to `Hant` (Traditional Han). `pickLocale()` (copied from Course 2.9) uses `Intl.Locale(...).maximize()` to fill this in even for a learner whose browser only reports `zh-CN`, so they land on the right script without you having to list every regional variant.

### Step 2: Format the visitor count (TODO 2)

```js
export function formatVisitorCount(count, locale = current) {
  return new Intl.NumberFormat(locale).format(count);
}
```

`Intl.NumberFormat` already knows that English groups thousands with a comma, Spanish with a period, and that Chinese also groups by three digits in `Intl.NumberFormat`'s default mode (its traditional grouping by 万, ten-thousands, is a `notation` option this lesson does not need). No list of separators is written anywhere.

### Step 3: Format the opening date (TODO 3)

```js
export function formatOpenedDate(isoDate, locale = current) {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long' })
    .format(new Date(`${isoDate}T12:00:00`));
}
```

Adding `T12:00:00` before parsing keeps the date from shifting a day earlier or later in a time zone west or east of UTC — a real bug that only shows up for some readers, at some times of year, if it is left out.

### Step 4: Format "how long ago" (TODO 4)

```js
const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
rtf.format(-days, 'day');
```

`Intl.RelativeTimeFormat` turns a signed number and a unit into the right words: `-3, 'day'` becomes "3 days ago" in English, "hace 3 días" in Spanish, and "3天前" in Chinese. `numeric: 'auto'` also lets it say "yesterday" instead of "1 day ago" where a language has a special word for it.

### Step 5: Fill the two missing translations (TODO 5)

`es.js` and `zh-Hans.js` are each missing `motion.hint` and `stats.openedRelative` on purpose. Translate them from `en.js`. Until you do, `t()` correctly falls back to the English text for just those two keys — that fallback, not a crash or blank text, is what makes a `draft: true` locale safe to ship incomplete.

### Step 6: Build the jade stone (TODO 6)

```js
function buildJadeStone() {
  const geometry = new THREE.IcosahedronGeometry(0.22, 0);
  const material = new THREE.MeshStandardMaterial({ color: '#2f7d5b', roughness: 0.35, metalness: 0 });
  return new THREE.Mesh(geometry, material);
}
```

Low roughness and zero metalness is what gives a polished, non-metal stone its highlight as it turns — the same physically-based material choice as the Phase 3 capstone this exhibit is copied down from.

### Step 7: Draw a 3D label on a canvas (TODO 7)

A-Frame's default text and three.js's `TextGeometry` both draw from a pre-baked font atlas that only ships a handful of Latin glyphs — no accents, and no Chinese at all. A `<canvas>` has no such limit: the browser's own text renderer draws whatever the current font supports, exactly as it would on any web page.

```js
const ctx = canvas.getContext('2d');
ctx.font = `600 56px ${fontFamily}`;
ctx.fillText(text, canvas.width / 2, canvas.height / 2);
const texture = new THREE.CanvasTexture(canvas);
texture.colorSpace = THREE.SRGBColorSpace;
```

Sizing the canvas to the *measured* text width (not a fixed size) is what keeps a short English word from wasting texture memory and a long Chinese sentence from being clipped.

### Step 8: Keep labels facing the camera (TODO 8)

`THREE.Sprite` always renders facing the camera, in every direction you orbit — that billboarding is free, and is exactly why this lesson wraps each label's `CanvasTexture` in a `Sprite` rather than a plane `Mesh`, which would need its rotation copied from the camera by hand, every frame.

### Step 9: Wire selection and the info panel (TODO 9)

```js
infoPanel.textContent = `${t(`item.${id}.name`)} — ${t('info.made', { made: t(`item.${id}.made`) })} ${t(`item.${id}.note`)}`;
```

Every user-visible word here comes from `t()`, keyed by the exhibit's data-only `id` — never a hard-coded English sentence with a translated word spliced into it. Splicing breaks word order in languages that put adjectives, verbs, or numbers in a different place than English does.

### Step 10: Mark the current language (TODO 10)

```js
button.setAttribute('aria-pressed', String(button.dataset.locale === currentLocale()));
```

`aria-pressed` on every button in the group, not just a visual highlight on the active one, is what makes this a toggle-button group a screen reader can announce correctly.

### Step 11: Write the pseudo-localization transform (TODO 11)

```js
export function pseudoLocalize(text) {
  // accent vowels, stretch words, wrap the result in brackets
}
```

See "Pseudo-localization" below for what this is testing and why. The transform in the reference solution accents vowels, adds about 30% length by repeating the tail of each long word, and wraps everything in `[⟦…⟧]` so a pseudo-string is unmistakable — and so is a real string that was missed.

### Step 12: Wire the pseudo-localization toggle (TODO 12)

```js
pseudoToggle.addEventListener('change', () => setPseudo(pseudoToggle.checked));
```

`setPseudo()` (already written, in `i18n.js`) saves the choice and dispatches the same `'localechange'` event the language switcher uses, so the one `renderAll()` listener already redraws everything — no new event, no new render path.

## Key code explained

- **`Intl.Locale(...).maximize()`**: turns a short tag like `'zh-CN'` into its full form, `'zh-Hans-CN'`, filling in the script a human reader assumes but a short tag does not state. `pickLocale()` uses this to match a learner's browser language against the app's available locales by language and script, ignoring region.
- **`Intl.PluralRules`**: chooses which of a message's plural forms (`{ one: '…', other: '…' }`) fits a given count, per language. English and Spanish need `one`/`other`; Simplified Chinese has no grammatical plural, so its messages only ever need `other` — writing an `other`-only object for Chinese, instead of guessing at a `one` form that does not exist, is correct, not incomplete.
- **Canvas-drawn labels (`labels.js`)**: a `CanvasTexture` painted by the browser's own text renderer, wrapped in a `THREE.Sprite`. This is the only text-rendering approach in this lesson's toolbox (A-Frame text, three.js `TextGeometry`, or canvas) that can show both accented Spanish and Chinese without a custom font atlas.
- **`pseudoLocalize()`**: a reversible, meaning-preserving stress test, not a translation. Running every real string through it before a translator sees the project catches text-expansion and missed-`t()`-call bugs for free.
- **`:lang(zh-Hans)` in `styles.css`**: a CSS selector that matches any element whose language (inherited from `<html lang>` or its own `lang` attribute) is Simplified Chinese, used here to apply a CJK-first font stack, disable faux italics, and turn on strict Chinese line-breaking — all three explained under "3D and XR accessibility" below.
- **`draft: true`**: a flag on a locale module, read by `isDraft()`, that shows a visible notice and is checked by `scripts/validate-projects.mjs` before a lesson can be marked `published`. It exists so a first-pass, non-native translation can ship to learners honestly labelled, instead of either being hidden or claimed as finished.

## 3D and XR accessibility

Every exhibit item's label is drawn on a canvas (see Step 7), because A-Frame's bundled font and three.js's `TextGeometry` both render from a fixed MSDF (multi-channel signed distance field) glyph atlas. The atlas XR Camp has used through Phase 3 ships only unaccented Latin letters: `á` and `ñ` render as blank boxes, and Chinese — tens of thousands of possible characters — cannot be pre-baked into one small atlas at all. Building a custom MSDF atlas that includes specific CJK characters is possible, but it means choosing every character in advance and shipping a larger font file; a canvas-drawn label needs neither, at the cost of being a flat, camera-facing sprite rather than a true extruded 3D glyph.

`id="scene-description"` holds a plain-language description built from the same data and the same `t()` calls as everything else, so it is never a separate, easy-to-forget translation. The jade stone's turning respects `prefers-reduced-motion` on load and can be paused at any time with a labelled, `aria-pressed` button (WCAG 2.2.2): nothing else in the scene moves on its own, and the camera never moves unless the learner moves it. The 2D twin list and the info panel repeat every fact the 3D view shows, in every language, so WebGL or a slow model load is never the only way to reach the content (WCAG 1.3.1). Every 3D interaction — selecting an item, pausing the animation, orbiting the view — has a full keyboard route: real `<button>` elements for selection and pause, and native arrow-key orbiting from `OrbitControls.listenToKeyEvents()`.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| `<html lang>` matches the chosen language | 3.1.1 Language of Page | Screen readers choose pronunciation and voice, and browsers choose fallback fonts, from this attribute |
| Every 3D label, info panel entry, and description updates on language change | 1.1.1 Non-text Content | A 3D label is not text a screen reader can read; the info panel and description are its always-present text alternative |
| The 2D twin list repeats everything the 3D view shows | 1.3.1 Info and Relationships | The same information must not depend on WebGL rendering successfully |
| Visible button text starts the accessible name (e.g. "Select: Jade stone") | 2.5.3 Label in Name | Matters even more with translated labels, where a mismatched `aria-label` is easy to introduce by accident |
| The jade stone's auto-rotation can be paused, and starts paused under `prefers-reduced-motion` | 2.2.2 Pause, Stop, Hide | It is motion that starts on its own, not in response to a user action |
| Every control is reachable and operable by keyboard alone | 2.1.1 Keyboard | Selection, pausing, and the language switcher are all real, focusable elements |
| Focus is always visible | 2.4.7 Focus Visible | Kept from the shared stylesheet's `:focus-visible` rule, in every language |
| Colour contrast meets AA in every language | 1.4.3 Contrast (Minimum) | Longer Spanish or smaller Chinese text must not force a lighter, lower-contrast font weight to fit |
| Draft-translation notice is announced | 4.1.3 Status Messages | `role="status"` on the draft notice so switching to a draft language is announced without moving focus |

## Performance considerations

Canvas-drawn labels are cheap compared to loading a custom font: three small canvases (one per pedestal), each redrawn only when the language changes, not every frame. Disposing the previous `CanvasTexture` and `SpriteMaterial` before creating the next one (in `setLabel()`) keeps repeated language switching from leaking GPU memory — the same disposal discipline as the model-swapping in `web3d-developer/06`. Formatting with `Intl` objects is not free: `i18n.js` creates a fresh `Intl.NumberFormat`/`Intl.DateTimeFormat`/`Intl.RelativeTimeFormat` per call rather than caching one per locale, which is fine at this app's scale (redraws happen only on language change or selection, not every frame) but is worth caching in an app that formats hundreds of values per second.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Building a sentence by concatenating translated words (`t('the') + ' ' + t('item')`) | Word order breaks in any language that orders words differently from English | Translate the whole sentence, with `{placeholders}` for the parts that change |
| Writing `if (count === 1)` instead of using `Intl.PluralRules` | Wrong for languages with more plural categories than English, and silently wrong (not broken-looking) for Chinese, which has none | Use `Intl.PluralRules(locale).select(count)` and a message object with the forms a language actually needs |
| A fixed-width button or label for translated text | Spanish or German-length text gets clipped or overlaps | Flexible widths, `flex-wrap`, no `white-space: nowrap` on translated text |
| Assuming a Latin font stack covers Chinese | Chinese renders in a fallback font, or as tofu boxes, and may pick up a faked italic slant | A CJK-first stack under `:lang(zh-Hans)`, with `font-style: normal !important` |
| Marking a machine or first-pass translation as finished | Wrong tone, wrong formality, or outright errors ship to real learners | Keep `draft: true` and the visible notice until a native speaker has reviewed it in context |

## Troubleshooting

**Chinese text shows boxes or the wrong font.** Your OS may not have a Chinese font installed. Windows ships Microsoft YaHei by default; on Linux, install `fonts-noto-cjk` (free) or add Google's free Noto Sans SC as a web font if this must work without any system font installed.

**Switching language does not persist after a reload.** Some browsers block `localStorage` in a private/incognito window; `i18n.js` already catches that and falls back to detecting the browser's language every time, which is expected, not a bug.

**Firefox shows a different default monospace/serif fallback than Chrome for `:lang(zh-Hans)`.** This lesson only sets a sans-serif stack, so it should not matter; if you add serif Chinese text yourself, test it in Firefox's Fonts settings panel (`about:preferences#general` → Fonts), since its per-script font choice lives in a different place than Chrome's.

**Safari's `Intl.RelativeTimeFormat` output reads oddly for very large day counts.** This is expected: the reference solution switches from days to months to years past fixed thresholds specifically to avoid saying "412 days ago" — check `formatOpenedRelative`'s thresholds if your own numbers look strange.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: add a fourth `Intl`-formatted fact (an opening time) to the stats panel, in all three languages.
2. **[Creative](challenges/challenge-2.md)**: replace an exhibit item with one from your own culture, or add a fourth language of your own.
3. **[Explorer](challenges/challenge-3.md)**: write an automated overflow check that catches text-expansion problems pseudo-localization exposes.

## Submitting your work

1. Work through [`tests/checklist.md`](tests/checklist.md) in all three languages, with pseudo-localization on and off.
2. Take a screenshot of the exhibit in each of the three languages, and one with pseudo-localization on.
3. Keep them in your learner journal and portfolio. Share them with other developers: see [where to share your work and ask for help](../../docs/en/community.md).
4. Journal question: which single string, item, or layout choice broke first when you turned on pseudo-localization — and what does that tell you about writing UI text before you have thought about translation?

## Further reading

- [MDN: Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) — the full reference for `NumberFormat`, `DateTimeFormat`, `RelativeTimeFormat`, `PluralRules`, and `Locale`.
- [W3C Internationalization: Localization vs. Internationalization](https://www.w3.org/International/questions/qa-i18n) — the definitions this lesson's first objective is built on.
- [Unicode CLDR](https://cldr.unicode.org/) — the locale data (number formats, plural rules, date patterns) that `Intl` implementations are built from.
- [MDN: CSS :lang() pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:lang) — how language-aware CSS selectors work.
- [IETF BCP 47 / RFC 5646](https://www.rfc-editor.org/info/bcp47) — the specification behind the language tags (`en`, `es`, `zh-Hans`) used throughout this lesson.

## Women to Know

Irma Alvarez Ccoscco is a Quechua poet, educator, and digital-language activist from Haquira, in the Apurímac region of Peru, whose work centres on bringing software into her native language. In 2010 she translated the roughly 35,000-word interface of the Chamilo e-learning platform into Cusco Quechua, and went on to localize the TuxMath and TuxType children's learning games, drawing original Andean artwork for their KunturMat and KunturQillqa versions. In 2013 she organized a team of eight volunteers, working with Mozilla Perú, to begin translating Firefox into Cusco Quechua.

Her work is a reminder that localization is not only about the large world languages a project starts with. The same `Intl` APIs, font-stack thinking, and translation-QA discipline this lesson practises on Spanish and Chinese apply just as much to a language spoken by a few million people as to one spoken by a billion — and a language with far less existing software localized into it needs that care even more.

_Facts from public sources, checked 2026. Spotted an error? [Tell us](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Standards spotlight

Three separate bodies underpin everything in this lesson: the IETF's BCP 47 (RFC 5646) defines the language tag syntax (`en`, `es-419`, `zh-Hans`) that `<html lang>`, `Intl`, and this lesson's own `LOCALES` list all use; the Unicode Consortium publishes both the Unicode Standard itself (the character set that lets a browser render Quechua, Spanish accents, and Chinese characters in the same document) and CLDR, the locale data — plural rules, date formats, number grouping — that browser implementations of `Intl` are built from; and the W3C's Internationalization Activity publishes web-specific best practices, including the guidance on `:lang()`, line-breaking, and CJK typography this lesson's CSS follows.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
