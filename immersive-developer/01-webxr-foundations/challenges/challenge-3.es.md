# Reto 3: Explorador

**Reto opcional.** Aproximadamente 90 minutos.

Compara tu propio código de sesión, escrito a mano, contra el `VRButton` ya listo de three.js, e intenta detectar también la función `immersive-ar` junto con `immersive-vr`.

## Tarea

1. Lee `three/addons/webxr/VRButton.js` (descárgalo de `https://cdn.jsdelivr.net/npm/three@0.186.1/examples/jsm/webxr/VRButton.js`, o búscalo dentro del paquete fijado). Importa `{ VRButton }` en una copia de `main.js`, y agrega `document.body.append(VRButton.createButton(app.renderer))` junto a tu propio botón. Compara: ¿qué hace `VRButton` que tu `xr.js` no hace (pista: lee su manejo de `sessiongranted`), y qué hace de forma distinta a como lo eligió esta lección, y por qué (pista: mira `stylizeElement`)?
2. Escribe una segunda función de detección de funciones, `supportsImmersiveAR()`, junto a `supportsImmersiveVR()` en `xr.js`, comprobando `navigator.xr.isSessionSupported('immersive-ar')` de la misma manera. Muestra una línea de estado corta y separada que reporte si AR está disponible también, sin construir todavía una sesión AR: la colocación completa en AR es tema de 4.2.
3. En tu diario, anota cuáles de Chrome, Firefox, Safari, y el propio navegador de tu teléfono reportaron `true` para cada modo cuando probaste. La compatibilidad cambia con el tiempo y según el dispositivo, así que trata tus propios resultados como una fotografía de un día, no como un hecho permanente.

## Por qué importa

Leer el código fuente de una biblioteca, en lugar de solo su documentación, es una habilidad que sigue funcionando mucho después de que cualquier versión de three.js haya desaparecido: así es como responderás "¿esto realmente hace lo que creo que hace?" por el resto de tu carrera. Comparar dos implementaciones de la misma idea, una escrita para ti y otra que entiendes línea por línea, es una de las formas más rápidas de notar qué está decidiendo un atajo en silencio, en tu nombre.

## Se completa cuando

- [ ] Tanto el botón de `VRButton` como el tuyo aparecen en la página, y cualquiera de los dos puede iniciar el mismo tipo de sesión.
- [ ] `supportsImmersiveAR()` existe y reporta un resultado sin fallar en un navegador que carece por completo de `navigator.xr`.
- [ ] Tu diario indica en qué lo probaste y qué encontraste, sin afirmarlo como universalmente cierto.
