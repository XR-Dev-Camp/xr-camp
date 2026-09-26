# Reto 3: Explorador

**Reto opcional.** Aproximadamente 90 minutos.

Agrega un breve clip de video propio.

## Tarea

1. Elige un clip breve que sea importante para ti (un objeto de tu casa, un lugar, un video familiar), de unos pocos segundos, muy por debajo del límite de 10 MB para video en [`docs/en/3d-assets-and-versions.md`](../../../docs/en/3d-assets-and-versions.md) (en inglés). Guárdalo como `.mp4` en tu propia carpeta `assets/`.
2. Agrégalo a `<a-assets>` como un `<video>`, silenciado (`muted`, necesario para el autoplay en una escena) y con `playsinline`, y luego muéstralo con `<a-video src="#tu-clip" width="..." height="..." position="..."></a-video>`, con un tamaño que no se superponga con los otros paneles.
3. Agrega una entrada correspondiente a `exhibitData`, para que obtenga un botón "Mirar" y una entrada en la lista 2D como todo lo demás.
4. Como `<a-video>` en sí no admite subtítulos, agrégalos donde la alternativa 2D pueda mostrarlos: ya sea un elemento `<video>` de HTML simple en otra parte de la página con un `<track kind="captions" src="tus-subtitulos.vtt" srclang="es">`, o una breve transcripción escrita en la descripción de ese punto en la lista de la exhibición.
5. Decide si el video debe reproducirse automáticamente en la escena 3D. Si tiene sonido, trátalo exactamente como el audio del Paso 7: nunca un sonido que se reproduce solo (WCAG 1.4.2). Un visual silencioso y en bucle sí puede reproducirse automáticamente; el sonido no.

## Por qué importa

El video es el único tipo de recurso que esta lección deliberadamente no incluye, porque un archivo de video obligatorio también es un recurso que alguien tendría que crear o conseguir, y esta lección no podía elegir uno para cada estudiante. Agregar el tuyo propio es una versión pequeña y realista de la decisión que enfrenta cualquier proyecto de A-Frame tarde o temprano: incorporar un recurso multimedia real, y decidir, con intención, cómo se comporta y cómo se mantiene accesible.

## Se completa cuando

- [ ] Un breve video propio se reproduce en la sala 3D a través de `<a-video>`.
- [ ] Tiene un botón "Mirar" y una entrada en la lista 2D.
- [ ] Tiene subtítulos o una transcripción disponible en 2D.
- [ ] Si tiene sonido, no se reproduce automáticamente.
