# Reto 2: Creativo

**Opcional.** Aproximadamente 45-60 minutos.

Haz que el laboratorio de interacción hable con tus propias palabras, y elige tu propio objeto para agarrar y colocar.

## Tarea

1. Reescribe las tres etiquetas de botón del menú (en `menu.js`), y los mensajes de estado que anuncian `controllers.js`, `ar.js`, y `main.js`, en tu propio idioma, dialecto, o la forma de hablar de tu comunidad. `drawButtonTexture()` ya dibuja sus etiquetas con `<canvas>`, así que cualquier escritura o carácter acentuado que escribas funciona exactamente como lo escribiste, a diferencia del texto por defecto de A-Frame, que pierde los acentos y todo el chino.
2. Cambia qué elemento de la exhibición se puede agarrar y colocar: en lugar de la piedra de jade, usa la olla de barro o el aro de canasta tejida (o cambia por un objeto propio, siguiendo el patrón ITEMS de exhibit.js). Actualiza `getGrabTarget`, la malla sustituta de `createPlacement`, y cada mensaje que actualmente nombra "the jade stone" (la piedra de jade).
3. Opcionalmente, cambia el color o la forma del objeto colocado por algo significativo para ti o tu comunidad.

## Por qué importa

Un laboratorio de interacción que solo habla un idioma, y que solo te deja sostener un objeto específico, le dice en silencio a todos los demás que no se pensó en ellos al construirlo. Por pequeños que sean, estos cambios son la diferencia entre una lección que seguiste y un proyecto que de verdad es tuyo.

## Se completa cuando

- [ ] El menú, y cada mensaje de estado que agregó esta lección, se lee con tus propias palabras.
- [ ] Se puede agarrar (directamente) y colocar (con AR o "Place object (2D)") un elemento distinto de la exhibición, y cada mensaje que lo nombra es consistente.
- [ ] Todo sigue funcionando: sin errores de consola, y cada alternativa 2D/de teclado sigue funcionando.
