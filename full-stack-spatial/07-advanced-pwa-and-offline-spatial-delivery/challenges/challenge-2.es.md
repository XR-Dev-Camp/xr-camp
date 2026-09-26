# Reto 2: Creativo

**Opcional.** Aproximadamente 45-60 minutos.

Personaliza el proyecto para que refleje tus propios intereses, comunidad, o idioma.

## Tarea

1. Escribe un pequeño archivo JSON tipo "postal" sobre un lugar real de tu propia comunidad: un mercado, un parque, un edificio, un punto de referencia; con campos como `title`, `language`, `description`, y un par de `facts` (afirmaciones cortas y verdaderas que puedas respaldar). Mantenlo por debajo de unas pocas cientas de palabras; esto son datos, no un documento.
2. Guárdalo como `assets/my-postcard.json`, y agrégale una entrada de `bytes` (comprueba su tamaño real) a un manifiesto de paquete nuevo, `data/bundles/my-postcard.manifest.json`, siguiendo la misma forma que `history-exhibit.manifest.json`.
3. Agrega tu nuevo paquete al arreglo `bundles` de `data/bundles.json`, con un `title` en tu propio idioma y un `sceneUrl`; para este reto, `sceneUrl` puede simplemente apuntar a una página corta `postcard.html` que escribas tú misma, que obtenga y muestre los campos del archivo JSON descargado como HTML ordinario y accesible (un encabezado, un párrafo, y una lista; no se necesita 3D para este).
4. Descarga tu nuevo paquete desde la lista de paquetes, y luego confirma que abre y funciona con tu navegador sin conexión.

## Por qué importa

Un paquete de escena no tiene que ser una escena 3D: el sistema de manifiesto, descarga, y almacenamiento que construye esta lección funciona para cualquier conjunto de archivos que quien aprende quiera hacer disponible sin conexión. Construir uno alrededor de algo de tu propia vida es una forma genuina y de bajo riesgo de demostrar que entiendes toda la canalización, no solo el único ejemplo con el que viene esta lección.

## Terminado cuando

- [ ] `data/bundles/my-postcard.manifest.json` lista tu(s) propio(s) archivo(s) y sus tamaños reales en bytes.
- [ ] Tu paquete aparece en la lista de paquetes, se descarga con progreso, y se puede eliminar.
- [ ] `postcard.html` muestra tu contenido, y lo sigue mostrando con el navegador sin conexión, después de que el paquete se ha descargado una vez.
