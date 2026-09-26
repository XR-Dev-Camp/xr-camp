# Challenge 2: Creative

Customize the project so it reflects your own interests, community, or language. About 45–60 minutes.

## Task

Make My XR Camp yours. Pick at least one:

- **Your own icon.** Draw a new `icon.svg` (and a matching maskable version) in a style that feels like you, and re-render the PNGs. Update `ATTRIBUTION.md`.
- **Your own city.** Add a city near you to `CITIES` in `config.js`, with its latitude and longitude, and a `city.<id>` key in every locale file.
- **Your own language.** If you speak a language that is not yet one of the three drafts, add a fourth locale file, a `LOCALES` entry in `config.js`, and an option in the language switcher. Flag it as a draft, the same way Spanish and Chinese are, unless you are a native speaker confident it needs no review.
- **Your own colour theme.** Change the CSS custom properties in `styles.css` (`--color-primary` and friends), and re-check every colour pair against WCAG 2.2 AA.

## Why this matters

A tool that only works the way its author imagined it is a demo. A tool a learner can bend toward her own city, her own language, her own taste, without touching the code that makes it work — that is closer to something worth keeping.

## Done when

- [ ] At least one change above is made, and works in every language you support.
- [ ] `node scripts/validate-projects.mjs` still passes.
- [ ] `tests/checklist.md` still passes.
