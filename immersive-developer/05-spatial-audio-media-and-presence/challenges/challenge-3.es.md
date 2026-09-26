# Reto 3: Explorador

**Reto opcional.** Aproximadamente 90 minutos.

Compara la pantalla de historia basada en canvas de esta lección con un video real, usando `THREE.VideoTexture`.

## Tarea

1. Encuentra o crea un clip de video corto y pequeño propio (unos pocos segundos son suficientes), hecho por ti o con licencia CC0, muy por debajo del presupuesto de video de 10 MB en [`docs/en/3d-assets-and-versions.md`](../../../docs/en/3d-assets-and-versions.md). Agrégalo a `assets/`, y acredítalo en `ATTRIBUTION.md` si no es completamente tuyo.
2. Crea un elemento `<video>` oculto en `index.html`, con `muted`, `loop`, `playsinline`, y su propio `<track kind="captions">` apuntando a un archivo WebVTT con cues que coincidan con tu clip.
3. En una copia de `video.js`, reemplaza el canvas y el `THREE.CanvasTexture` por `new THREE.VideoTexture(videoEl)` como el `map` del plano. Lee primero el propio código fuente de three.js para `VideoTexture` (`src/textures/VideoTexture.js` en la etiqueta fijada r186), y anota en un comentario qué comprueba antes de decidir actualizar, en comparación con el `texture.needsUpdate = true` manual que `drawFrame()` de esta lección establece a mano.
4. Reutiliza `captions.js` sin cambios, apuntándolo a tu nuevo elemento `<video>` en lugar de a `guide-audio`, para demostrar que el mismo código de lectura de subtítulos funciona tanto para un `<video>` como para un `<audio>`.

## Por qué importa

`CanvasTexture` y `VideoTexture` son parientes cercanos: ambos ponen una imagen cambiante sobre un material de three.js, y esta lección construyó deliberadamente su propio `drawFrame()` para que aprendieras exactamente cómo se le "avisa" a una textura que se actualice. Leer después el propio código fuente de `VideoTexture` te muestra la misma idea, hecha automáticamente, dentro de una biblioteca real.

## Se completa cuando

- [ ] Un video real se reproduce en la pantalla de historia en lugar de la animación generada por canvas.
- [ ] Sus propios subtítulos y transcripción funcionan a través de las mismas funciones de `captions.js`, sin cambios.
- [ ] Puedes explicar, con tus propias palabras, qué comprueba `VideoTexture` en cada cuadro que `CanvasTexture` no puede.
- [ ] El nuevo recurso está acreditado en `ATTRIBUTION.md` y dentro del presupuesto.
