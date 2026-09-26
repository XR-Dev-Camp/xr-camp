# Desafío 3: Explorador

**Ampliación opcional.** Aproximadamente 90 minutos.

Agrega una segunda API: terremotos recientes cerca de la ciudad elegida.

## Tarea

1. El Servicio Geológico de los Estados Unidos (USGS) publica feeds gratuitos de terremotos en formato GeoJSON, sin clave y con CORS permitido. Empieza con los terremotos de magnitud 2.5 o mayor de la última semana: `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson`. Lee primero su respuesta en el navegador (Paso 1 de la lección).
2. Cada terremoto es un `feature` con `properties.mag`, `properties.place`, `properties.time`, y `geometry.coordinates` (longitud, latitud, profundidad: fíjate en el orden).
3. Escribe una función pura `nearby(features, city, km)` que conserve los terremotos dentro de `km` de distancia de la ciudad. Busca la **fórmula de haversine** para la distancia entre dos puntos en un globo.
4. Muéstralos con los mismos cuatro estados: cargando, error, vacío ("No hay terremotos sobre 2.5 en 500 km esta semana": buenas noticias, dichas con calma) y listo.
5. Crea un archivo de ejemplo con la misma forma, para trabajar sin conexión. Si el feed de USGS va lento o está bloqueado donde vives, construye primero con el archivo de ejemplo.
6. Las dos solicitudes son independientes: inicia ambas a la vez con `Promise.allSettled`, para que si una falla no oculte a la otra.

## Por qué importa

Los paneles reales combinan varias fuentes, y cada una puede fallar por su cuenta. `Promise.allSettled`, un conjunto de estados por fuente, y un archivo de ejemplo por fuente son la manera en que las apps profesionales siguen siendo útiles cuando parte de internet no lo está.

## Terminado cuando

- [ ] Los terremotos cerca de la ciudad elegida aparecen en una tabla o lista accesible.
- [ ] Cada fuente tiene sus propios estados de carga, error, vacío y listo.
- [ ] Si una fuente falla, no detiene a la otra.
- [ ] Ambas funcionan sin conexión con datos de ejemplo.
