# Reto 2: Creativo

**Opcional.** Aproximadamente 60 minutos.

Subtítulos y una transcripción para un video corto sobre tu comunidad.

## Tarea

1. Graba con tu celular un video de 30 a 60 segundos sobre un lugar o una actividad de tu comunidad. Pide permiso a todas las personas que aparezcan.
2. Escribe un archivo de subtítulos en formato WebVTT, `captions.vtt`, con los tiempos:

   ```text
   WEBVTT

   00:00:00.000 --> 00:00:04.000
   Welcome to the Saturday market in our neighbourhood.

   00:00:04.000 --> 00:00:09.000
   Every week, more than forty families sell food and crafts here.
   ```

3. Agrega el video a una página con `<video controls>` y `<track kind="captions" src="captions.vtt" srclang="en" label="English" default>`. Si prefieres, usa tu propio idioma en los subtítulos y en `srclang` (por ejemplo, `srclang="es"` y `label="Español"`).
4. Debajo del video, agrega la **transcripción** completa como texto, incluidos los sonidos importantes y todo lo que se muestra pero no se dice.

## Por qué esto importa

Los subtítulos sirven a las personas sordas y con pérdida auditiva, y a cualquiera que esté en un autobús ruidoso o en una biblioteca silenciosa. Una transcripción sirve a quienes no pueden reproducir video en absoluto, también con conexiones lentas, y se puede buscar y traducir.

## Se completa cuando

- [ ] Los subtítulos aparecen al mismo tiempo que se habla.
- [ ] La página tiene una transcripción completa debajo del video.
