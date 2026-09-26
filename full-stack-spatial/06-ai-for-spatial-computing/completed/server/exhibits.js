// exhibits.js: the fixed list of exhibits every scene is built from, the
// same three objects Course 5.3 used (clay pot, woven basket ring, jade
// stone). validation.js, db.js, ai.js, and js/main.js all import this one
// file instead of repeating the list, so a name always matches an id the
// same way everywhere — including inside a description an AI provider
// writes, which ai.js checks against exactly this list (see
// checkDescriptionForHallucinations in ai.js).

export const EXHIBITS = [
  { id: 'clay-pot', name: 'Clay pot' },
  { id: 'basket-ring', name: 'Woven basket ring' },
  { id: 'jade-stone', name: 'Jade stone' },
];

export const EXHIBIT_IDS = EXHIBITS.map((exhibit) => exhibit.id);

export function exhibitName(id) {
  return EXHIBITS.find((exhibit) => exhibit.id === id)?.name ?? id;
}
