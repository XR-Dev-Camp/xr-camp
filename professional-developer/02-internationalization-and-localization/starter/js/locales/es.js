// es.js: Spanish (neutral, Latin American) strings — DRAFT.
//
// `draft: true` marks this as a short first-pass translation, made by a
// non-native process without a native Spanish speaker's review. See
// "Translation QA checklist" in the README before this ships to learners.
// Any key missing here falls back to English (i18n.js): a draft is allowed
// to be incomplete, and must never crash the page.
//
// TODO 5: this file is deliberately missing two keys — 'motion.hint' and
// 'stats.openedRelative' — that main.js needs. Translate them from en.js and
// add them below, in the same neutral Latin American Spanish as the rest of
// this file (informal "tú", not "usted"; no Spain-only slang). Reload with
// Spanish selected afterwards: until you do, the page correctly falls back
// to the English text for just those two strings — that fallback is the
// point of the `draft` flag, not a bug to hide.

export const draft = true;

export default {
  'skip.toContent': 'Ir al contenido',
  'page.title': 'La exhibición, en tu idioma',
  'page.intro': 'La misma exhibición de tres objetos del proyecto final de Web3D, reconstruida para que cada palabra —etiquetas, descripciones y números— pueda cambiar de idioma sin tocar el código 3D.',

  'lang.heading': '1. Elige tu idioma',
  'lang.label': 'Elige tu idioma',
  'lang.draftNotice': 'Esta traducción es un primer borrador breve. Aún no ha sido revisada por una persona hablante nativa. Ver el README.',

  'select.heading': '2. Selecciona una pieza',
  'select.hint': 'Haz clic o toca una pieza en la vista 3D, o elígela aquí. Esta es la ruta por teclado hacia la exhibición: hace exactamente lo mismo, sin necesitar un puntero.',
  'select.buttonLabel': 'Seleccionar: {name}',

  'info.heading': '3. Panel de información',
  'info.empty': 'Aún no hay nada seleccionado. Elige una pieza arriba para ver sus detalles aquí.',
  'info.made': 'Hecho de {made}.',

  'motion.heading': '4. Animación',
  'motion.pause': 'Pausar animación',

  'pseudo.heading': '5. Pseudolocalización (pruebas)',
  'pseudo.label': 'Activar pseudolocalización',
  'pseudo.hint': 'Envuelve y alarga cada texto de esta página, sin traducirlo, para ver si el diseño resiste un texto más largo antes de que lo revise una persona traductora. Ver "Pseudolocalización" en el README.',

  'scene.heading': 'La exhibición',
  'twin.heading': 'Gemelo 2D',
  'twin.hint': 'Esta lista tiene la misma información que la imagen, en palabras, así que siempre está disponible, funcione o no WebGL (WCAG 1.3.1).',

  'stats.heading': 'Sobre esta exhibición',
  'stats.visitors': '{count} visitas hasta ahora.',
  'stats.opened': 'Inaugurada el {date}.',

  'stats.count': { one: '{count} objeto en esta sala.', other: '{count} objetos en esta sala.' },

  'item.clay-pot.name': 'Vasija de barro',
  'item.clay-pot.made': 'arcilla de terracota sin esmaltar',
  'item.clay-pot.note': 'Vasijas moldeadas a mano y cocidas en horno como esta no llevan esmalte en la superficie.',

  'item.basket-ring.name': 'Aro de cesta tejida',
  'item.basket-ring.made': 'fibra vegetal tejida',
  'item.basket-ring.note': 'El borde de una cesta enrollada, tejida con pasto seco o junco.',

  'item.jade-stone.name': 'Piedra de jade',
  'item.jade-stone.made': 'jade pulido',
  'item.jade-stone.note': 'Tallada y pulida hasta quedar lisa, así que refleja la luz al girar.',

  'desc.intro': 'Tres pedestales en fila: una vasija de barro, un aro de cesta tejida y una piedra de jade, de izquierda a derecha.',
  'desc.selected': 'La pieza seleccionada es: {name}; sus detalles están en el panel de información de arriba.',
  'desc.noneSelected': 'Nada está seleccionado. Haz clic en una pieza, o usa un botón Seleccionar, para ver sus detalles en el panel de información.',
  'desc.animating': 'La piedra de jade gira lentamente.',
  'desc.paused': 'La animación está en pausa: nada gira en este momento.',
  'desc.orbitHint': 'Arrastra la vista, o enfócala y presiona las flechas, para mirar alrededor. La cámara solo se mueve cuando tú la mueves.',
};
