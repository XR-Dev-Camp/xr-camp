# Challenge 2: Creative

**Optional.** Roughly 60 minutes.

Make the app yours: its icon, its colours, its name, and its offline page, in your language.

## Task

1. Draw your own icon in SVG: something from your town, your culture, or your community's weather (a mountain, a volcano, a river, a lantern). Keep it simple: a few shapes read best at small sizes.
2. Make a maskable version: fill the whole square with colour, and keep the important shapes inside the central circle (radius 40% of the width). Check it in the free [Maskable.app editor](https://maskable.app/editor).
3. Make the PNGs: open the SVG in your browser, take a screenshot at 192 and 512 pixels (or use any free image editor), and replace the files in `icons/`. Credit your icon in `ATTRIBUTION.md`.
4. Change `name`, `short_name`, `theme_color`, and `background_color`. Set `lang` to `es` or `zh-Hans` if your app is in Spanish or Chinese, and translate `offline.html` and the update message.
5. Change `VERSION` so learners who already have the app get it.

## Why this matters

An icon on a home screen is a promise: this is something made for you. When the name, the icon, and the offline page all speak your community's language, the app feels like it belongs to them.

## Done when

- [ ] Your own icon appears in **Application > Manifest**, and the maskable one survives a circle.
- [ ] The name and colours are yours, with text still meeting contrast (4.5:1) on the offline page.
- [ ] `offline.html` and the update message are in your language, with `lang` set correctly.
- [ ] Your icon is credited in `ATTRIBUTION.md`.
