// The exhibit's data: the same three pedestals from 4.1-4.5 (continuing the
// three.js exhibit from web3d-developer/04-threejs-foundations), with the
// facts this capstone's caption bar and transcript read from. Kept as plain
// data, not scattered across files, so the scene, the 2D list, the captions,
// and the scene description can never disagree with each other.
export const EXHIBITS = [
  {
    id: 'clay-pot',
    name: 'Clay pot',
    material: 'hand-shaped, kiln-fired clay, unglazed',
    color: 0xb5502a,
    geometry: 'cylinder',
    caption: 'The clay pot was hand-shaped and kiln-fired. Its surface carries no glaze.',
    sound: '../assets/pedestal-clay.wav',
  },
  {
    id: 'basket-ring',
    name: 'Woven basket ring',
    material: 'coiled plant fibre, woven round and round',
    color: 0xc9a15a,
    geometry: 'torus',
    caption: 'The basket rim shows the same plant fibre woven round and round.',
    sound: '../assets/pedestal-basket.wav',
  },
  {
    id: 'jade-stone',
    name: 'Jade stone',
    material: 'polished jade',
    color: 0x2f7a53,
    geometry: 'icosahedron',
    caption: 'The jade stone turns slowly, catching the light as it goes.',
    sound: '../assets/pedestal-jade.wav',
  },
];

export function findExhibit(id) {
  return EXHIBITS.find((e) => e.id === id) ?? null;
}
