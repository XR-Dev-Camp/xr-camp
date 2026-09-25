# Project check

Work through this list before you submit.

## Content
- [ ] The home page says who you are and what you build in the first two sentences.
- [ ] There is a card for at least three projects, each saying what it is, who it was for, and the skills it shows.
- [ ] Each card links to the live project and to its code, with link text that names the project.
- [ ] At least one case study has every section: key facts, problem, audience, process, decisions with a "why", accessibility, and what you learned.
- [ ] Practice projects and imagined organisations are labelled honestly.
- [ ] The words are plain: short sentences, and evidence instead of adjectives.

## Privacy
- [ ] No home address, personal phone number, ID number, or birth date anywhere.
- [ ] Contact is by a portfolio email address, or a link.
- [ ] No screenshot shows real people's names or data.
- [ ] No password, API key, or token in any file in your repository.

## Structure and style
- [ ] `lang` and a descriptive `<title>` on every page.
- [ ] One `h1` per page, then headings in order.
- [ ] The same navigation, in the same order, on every page, with `aria-current="page"` on the current page.
- [ ] Every colour is a design token, and the contrast ratios are written in the comment.

## Accessibility
- [ ] Everything works with the keyboard, and focus is always visible.
- [ ] Repeated card pictures have `alt=""`; informative pictures have meaningful alt text.
- [ ] Text contrast is at least 4.5:1; the focus outline is at least 3:1.
- [ ] A screen reader announces "Showing 1 of 4 projects" (or your numbers) when the filter changes.
- [ ] With JavaScript switched off, every project is still shown, and the filter does not appear.
- [ ] You audited every page with keyboard, screen reader, zoom, and an automated tool, and fixed what you found.

## Responsive and fast
- [ ] At 320 pixels wide, no page scrolls sideways.
- [ ] Every page looks intentional at 390, 768, and 1280 pixels.
- [ ] You tested on at least one real phone.
- [ ] Every image has `width` and `height`, and no screenshot is wider than it needs to be.

## Published
- [ ] Your portfolio is live on GitHub Pages, and you opened it on your phone.
- [ ] Every link works on the published site.
- [ ] Your repository has a `README.md` saying what the site is, how it was built, and how it was tested.
- [ ] The footer shows when the site was last updated.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] The scene description (`id="scene-description"`) matches your gallery exactly: the number of panels, the rows, and the colours.
- [ ] Every panel you can click can also be selected with the Previous and Next buttons.
- [ ] A screen reader announces which project is selected.
- [ ] Nothing in the scene moves on its own, and the camera never moves.
- [ ] The plain list of projects says everything the gallery shows, and works with WebGL switched off.
