# Good first issues

Real problems in this repository, waiting to be fixed. In your copy, open a new issue for the one you choose: copy its title and description, and add the label **good first issue**. Then fix it in a branch, and send a pull request that says `Fixes #<number>`.

## 1. The 3D example has no scene description

`3d/index.html` shows three shapes, but a screen-reader user hears nothing about them. Add a paragraph with `id="scene-description"` before the scene, describing what is in it, left to right.

## 2. The 3D example moves even when people ask for less motion

The shapes spin all the time. Check `prefers-reduced-motion`, start paused when it is set, and add a **Pause animation** button with `aria-pressed`.

## 3. A typo on the study tips wall

The heading on `index.html` says "Study tpis". Fix it.

## 4. Low contrast on the tips wall

The small print at the bottom of `index.html` uses `#999999` on white, a contrast ratio of about 2.8:1. WCAG 2.2 asks for at least 4.5:1 for normal text. Choose a darker grey and check it with a contrast checker.

## 5. Translate the 3D example's text

The 3D example's heading and instructions are in English only. Make a copy, `3d/index.es.html` or `3d/index.zh-Hans.html`, with `lang` set correctly and everything translated, and link the two pages to each other.

## 6. The page has no language set

`index.html` has `<html>` with no `lang` attribute, so screen readers may read it with the wrong voice. Add `lang="en"`.
