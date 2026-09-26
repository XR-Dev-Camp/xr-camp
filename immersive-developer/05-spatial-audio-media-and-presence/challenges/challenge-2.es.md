# Reto 2: Creativo

**Opcional.** Aproximadamente 45-60 minutos.

Haz que la guía de audio sea tuya: tu idioma, o un sonido que signifique algo para ti.

## Tarea

1. Escribe un segundo archivo de subtítulos, `assets/captions-mine.vtt`, con los mismos tiempos de cue que `assets/captions.vtt` pero en tu propio idioma, o en un idioma que estés aprendiendo. Agrega un segundo elemento `<track>` al elemento `<audio>` en `index.html` (un `srclang` y `label` distintos, con `default` dejado solo en el original), para que una estudiante pueda elegir cualquiera desde el propio menú de subtítulos del navegador.
2. Cambia el tono, el ritmo, o el timbre de uno de los sonidos de pedestal en el script de generación de Python (ajusta los valores `freq`, `harmonics`, o `dur`), a algo que te recuerde un sonido de tu propia cultura o comunidad: una campana, un instrumento, un ritmo. Regenera ese archivo `.wav` y escucha la diferencia.
3. Actualiza la descripción de ese pedestal en `js/exhibit.js` y el texto del subtítulo si ahora describe algo distinto para ti.

## Por qué importa

El audio espacial y los subtítulos son herramientas para contar una historia. La API de three.js no le importa de quién es la historia: el mismo `PositionalAudio`, el mismo formato de archivo WebVTT, y el mismo párrafo de subtítulos funcionan igual de bien para una historia de cualquier idioma o cultura. Este reto trata de notar eso, y de usarlo.

## Se completa cuando

- [ ] Existe una segunda pista de subtítulos, en tu propio idioma, con tiempos de cue coincidentes.
- [ ] Al menos el sonido de un pedestal se ha regenerado con parámetros distintos, y puedes explicar qué cambiaste.
- [ ] La transcripción y la descripción de la escena siguen leyéndose correctamente con tus cambios.
