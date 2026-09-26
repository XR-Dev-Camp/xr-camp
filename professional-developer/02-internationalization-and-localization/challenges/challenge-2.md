# Challenge 2: Creative

**Optional.** Roughly 45–60 minutes.

Customize the project so it reflects your own interests, community, or language.

## Task

1. Replace one of the three exhibit items with an object from your own
   culture or community — something you could describe honestly in a
   sentence or two, the way `item.clay-pot.note` describes the clay pot.
   Change its geometry in `exhibit.js` (reuse a primitive shape; you do not
   need a new technique) and its `name`/`made`/`note` keys in all three
   locale files.
2. If you speak a language this lesson does not cover, add it as a fourth
   locale: a new entry in `config.js`'s `LOCALES`, a new `js/locales/<code>.js`
   file with every key from `en.js` translated (mark it `draft: true`), and a
   font-stack entry in `main.js`'s `FONT_STACKS` if your language needs one
   for its 3D label (most Latin-script languages do not; right-to-left
   scripts need more than a font stack — note that as a limitation if you
   try one, rather than guessing at a fix this lesson has not covered).
3. Make sure your new item's label still renders correctly in every
   language, including the two you did not just add.

## Why this matters

A real translation is never quite like the placeholder example in a lesson.
Swapping in an object, or a whole language, that means something to you is
the fastest way to find the places this lesson's pattern does not quite fit
yet — which is exactly what a translator or a new market does to a real app.

## Done when

- [ ] Your new item (or language) appears correctly in the 3D view, the info
      panel, the 2D twin, and the scene description.
- [ ] The keyboard route still reaches everything.
- [ ] Nothing breaks when you switch back to the two languages you did not touch.
