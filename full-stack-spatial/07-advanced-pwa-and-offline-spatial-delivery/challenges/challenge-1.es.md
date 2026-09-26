# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 45 minutos.

Muestra cuáles de los archivos individuales de un paquete ya están guardados, antes de que una descarga termine o incluso empiece.

## Tarea

1. En `js/bundles-ui.js`, agrega una pequeña `<ul>` de nombres de archivo a cada tarjeta (dentro de `renderBundleCard`, usando `manifest.files`), con un `<li>` por archivo.
2. Escribe una función nueva, `updateFileList(li, bundleId, manifest)`, que llame a `readFileUrl(bundleId, file.path)` (de `bundle-store.js`) para cada archivo del manifiesto, y marque cada `<li>` como "guardado" o "todavía no guardado" según si vuelve una URL.
3. Llama a `updateFileList` una vez cuando una tarjeta se renderiza por primera vez, y de nuevo cada vez que se llama a `updateBundleCard` con `status: 'downloaded'`; una descarga que reanudó un paquete parcialmente guardado debería mostrar cada archivo como guardado una vez que termina, no solo los descargados en este intento en particular.
4. Confirma que funciona: inicia una descarga, y cancélala a mitad de camino. Recarga la página. La tarjeta debería mostrar al menos un archivo ya guardado, y el resto no.

## Por qué importa

Todo el sistema de descarga de esta lección está construido alrededor de saltar archivos que ya están guardados (ver `downloadBundle` de `download-manager.js`), así que quien aprende usando esta página tiene derecho a ver eso pasando, no solo confiar en que pasa. Una lista visible por archivo también hace la depuración mucho más fácil: si un paquete parece "atascado," puedes ver exactamente qué archivo no se guardó.

## Terminado cuando

- [ ] Cada tarjeta de paquete lista sus archivos, cada uno marcado como guardado o no.
- [ ] La lista se actualiza después de que termina una descarga reanudada o repetida.
- [ ] Sin errores de consola, y la página sigue pasando `tests/checklist.md`.
