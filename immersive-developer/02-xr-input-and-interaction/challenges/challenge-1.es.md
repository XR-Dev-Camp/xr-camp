# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 45 minutos.

Agrega un cuarto botón al menú del mundo, conectado de la misma forma que los otros tres.

## Tarea

1. En `menu.js`, agrega un cuarto botón a `buildMenu()`: etiquétalo "Turn left" (o con tu propia redacción), dale `userData.action = 'turnLeft'`, y colócalo de modo que los cuatro botones sigan cabiendo cómodamente en una fila (ajusta las posiciones `x`, y ensancha el grupo si hace falta).
2. En `main.js`, extiende `onMenuAction(action)` con un caso para `'turnLeft'` que llame a `app.controls.rotateLeft(Math.PI / 8)`, la misma llamada que ya hace el propio botón "Turn left" de la página.
3. Pruébalo: en VR (o en Immersive Web Emulator), apunta al nuevo botón y selecciónalo. La vista debería rotar exactamente igual que con "Turn left" en el escritorio.

## Por qué importa

Cada botón del menú sigue el mismo patrón de tres partes: una malla etiquetada con un nombre de acción, un acierto de raycast en `controllers.js`, y un caso en `onMenuAction`. Agregar un cuarto botón por tu cuenta confirma que entiendes ese patrón lo bastante bien como para extenderlo, no solo para leerlo.

## Se completa cuando

- [ ] Aparece un cuarto botón en el menú del mundo, claramente etiquetado y sin superponerse a los demás.
- [ ] Seleccionarlo (en VR, o en el emulador) rota la vista de la misma forma que el botón "Turn left" de la página.
- [ ] No aparece ningún error de consola, ni en VR ni en la vista de escritorio.
