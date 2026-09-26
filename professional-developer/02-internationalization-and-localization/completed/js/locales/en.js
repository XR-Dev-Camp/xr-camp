// en.js: English strings. The source language: every other locale file is
// judged against this one, and i18n.js falls back to this file for any key
// a draft locale does not have yet. English must never be missing a key.

export default {
  'skip.toContent': 'Skip to content',
  'page.title': 'The exhibit, in your language',
  'page.intro': 'The same three-object exhibit from the Web3D capstone, rebuilt so every word in it — labels, descriptions, and numbers — can change language without changing any 3D code.',

  'lang.heading': '1. Choose your language',
  'lang.label': 'Choose your language',
  'lang.draftNotice': 'This translation is a short first draft. It has not yet been reviewed by a fluent speaker. See the README.',

  'select.heading': '2. Select an exhibit',
  'select.hint': 'Click or tap an item in the 3D view, or choose it here. This is the keyboard route into the exhibit: it does exactly the same thing, without a pointer.',
  'select.buttonLabel': 'Select: {name}',

  'info.heading': '3. Info panel',
  'info.empty': 'Nothing is selected yet. Choose an exhibit above to see its details here.',
  'info.made': 'Made of {made}.',

  'motion.heading': '4. Animation',
  'motion.pause': 'Pause animation',
  'motion.hint': 'The jade stone turns slowly on its own. Nothing else moves, and the camera never moves unless you move it.',

  'pseudo.heading': '5. Pseudo-localization (testing)',
  'pseudo.label': 'Turn on pseudo-localization',
  'pseudo.hint': 'Wraps and stretches every string on this page, without translating it, so you can see whether the layout survives longer text before a translator ever touches it. See "Pseudo-localization" in the README.',

  'scene.heading': 'The exhibit',
  'twin.heading': '2D twin',
  'twin.hint': 'This list is the same information as the picture, in words, so it is always here, whether or not WebGL works (WCAG 1.3.1).',

  'stats.heading': 'About this exhibit',
  'stats.visitors': '{count} visitors so far.',
  'stats.opened': 'Opened on {date}.',
  'stats.openedRelative': 'That was {relative}.',
  'stats.count': { one: '{count} object in this room.', other: '{count} objects in this room.' },

  'item.clay-pot.name': 'Clay pot',
  'item.clay-pot.made': 'unglazed terracotta clay',
  'item.clay-pot.note': 'Hand-shaped and kiln-fired storage pots like this one carry no glaze on their surface.',

  'item.basket-ring.name': 'Woven basket ring',
  'item.basket-ring.made': 'woven plant fibre',
  'item.basket-ring.note': 'The rim of a coiled basket, woven from dried grass or reed.',

  'item.jade-stone.name': 'Jade stone',
  'item.jade-stone.made': 'polished jade',
  'item.jade-stone.note': 'Carved and polished smooth, so it catches the light as it turns.',

  'desc.intro': 'Three pedestals stand in a row: a clay pot, a woven basket ring, and a jade stone, left to right.',
  'desc.selected': 'The {name} is currently selected; its details are in the info panel above.',
  'desc.noneSelected': 'Nothing is selected. Click an item, or use a Select button, to see its details in the info panel.',
  'desc.animating': 'The jade stone turns slowly.',
  'desc.paused': 'Animation is paused: nothing is turning right now.',
  'desc.orbitHint': 'Drag the view, or focus it and press the arrow keys, to look around. The camera only moves when you move it.',
};
