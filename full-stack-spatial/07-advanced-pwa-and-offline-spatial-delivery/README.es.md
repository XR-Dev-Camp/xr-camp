# PWA avanzada y entrega espacial sin conexión

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `full-stack-spatial` · **Lección:** `advanced-pwa-and-offline-spatial-delivery-07` · **Tiempo:** unas 10 horas · 14 sesiones de 45 minutos · unas 4 semanas con 4 sesiones por semana

---

> Haz que una aplicación espacial sea instalable y funcione con conectividad intermitente.

---

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Construir un "paquete de escena" (scene bundle) descargable como un archivo JSON de manifiesto que liste cada archivo que necesita y su tamaño, y usar ese manifiesto para mostrar progreso real antes, durante, y después de una descarga.
2. Guardar archivos binarios grandes con el Origin Private File System (OPFS, sistema de archivos privado del origen) donde esté soportado, y recurrir a la Cache API donde no lo esté, sin cambiar cómo el resto de la aplicación vuelve a leer un archivo guardado.
3. Leer el uso de almacenamiento y la cuota propios de una página con `navigator.storage.estimate()`, y pedirle al navegador que proteja ese almacenamiento del desalojo automático con `navigator.storage.persist()`.
4. Cancelar limpiamente una descarga en curso con `AbortController`, y reanudar una interrumpida sin volver a descargar los archivos que ya se guardaron.
5. Usar la Background Sync API (sincronización en segundo plano) donde esté soportada, y recurrir al evento `online` de la ventana en todas partes donde no lo esté, para que una descarga pausada termine una vez que vuelve la conexión.
6. Agregar un modo de bajo consumo de datos que pida confirmación antes de una descarga grande, y una URL base de recursos configurable para que una escuela o comunidad pueda alojar su propio espejo (mirror) regional de los archivos de un proyecto.
7. Explicar, para cada API de almacenamiento o red que usa esta lección, qué navegadores actuales la soportan (según MDN) y qué hace la aplicación en su lugar cuando falta alguna.

## Requisitos previos

- **Curso 4.6: Aplicaciones web progresivas**: esta lección reutiliza su patrón de instalación/activación del service worker y su idea de modo de bajo consumo de datos.
- **Curso 3.5: Interacción, recursos y animación en Three.js**: esta lección reutiliza directamente su exhibición, sus dos modelos glTF, y su atribución.
- Comodidad con `async`/`await`, `fetch`, y `Promise.allSettled`, del Curso 4.4.

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Un navegador moderno (se recomienda Chrome o Edge, para ver cada función funcionando; Firefox y Safari también funcionan, con alternativas documentadas) | Probar descargas, almacenamiento, y comportamiento sin conexión | Gratis |
| Un editor de texto (por ejemplo, VS Code) | Escribir el código | Gratis |
| Un servidor local de archivos estático (por ejemplo, el integrado en Python, `python3 -m http.server`, ya usado en otras partes de este curso) | Los service workers, OPFS, y Background Sync requieren todos un contexto seguro; `http://localhost` y `http://127.0.0.1` cuentan como uno | Gratis |

Este proyecto no llama a ningún servicio externo y no necesita ninguna cuenta, clave de API, o paquete de npm: cada archivo que descarga lo sirve el mismo servidor estático que la propia página, a menos que configures tú misma una URL base de recursos distinta (ver "Lo que vas a construir"). Nada aquí se ve afectado por las condiciones de red en China continental, ya que nada sale de tu propia máquina.

## Lo que vas a construir

El Curso 4.6 le dio al panel de clima de la semana de estudio un service worker y un modo de bajo consumo de datos. El Curso 3.5 le dio a la exhibición dos modelos glTF reales, cargados con `GLTFLoader`. Esta lección combina ambas ideas en algo que ninguna necesitaba por sí sola: una pequeña biblioteca de **paquetes de escena sin conexión**: un manifiesto que nombra los archivos de una escena y sus tamaños, un botón **Download for offline** (descargar para uso sin conexión) con progreso real y un **Cancel** (cancelar) que funciona, y un **panel de almacenamiento** que muestra cuánto espacio está usando este proyecto y te deja pedirle al navegador que lo conserve. Una vez que un paquete se ha descargado, su página de escena (`scene.html`) funciona sin ninguna conexión a la red, leyendo sus modelos de vuelta desde el Origin Private File System (OPFS), o, en un navegador sin OPFS, desde la Cache API en su lugar.

Dos funciones más pequeñas y relacionadas completan la lección: un **modo de bajo consumo de datos** que pregunta antes de que empiece una descarga grande, y una **URL base de recursos configurable**, para que una escuela o comunidad con una conexión lenta o bloqueada al internet más amplio pueda alojar su propia copia de la carpeta `assets/` de este proyecto (un "espejo regional") y apuntar esta página hacia ella, sin ningún otro cambio en el código.

La solución de referencia está en [`completed/`](completed/); el starter tiene **18 TODOs numerados**, repartidos en diez módulos pequeños y de propósito único (`js/mirror.js`, `js/manifest-loader.js`, `js/bundle-store.js`, `js/storage-panel.js`, `js/download-manager.js`, `js/low-data.js`, `js/background-sync.js`, `js/bundles-ui.js`, `js/main.js`, `sw.js`), más uno en `js/scene-main.js` donde se une la historia de funcionamiento sin conexión. `js/scene-loader.js`, `js/scene-exhibit.js`, `js/scene-describe.js`, y `js/scene-app.js` están heredados del Curso 3.5, terminados, así esta lección puede enfocarse en la entrega, no en la vista 3D en sí.

## Guía de carpetas

```text
07-advanced-pwa-and-offline-spatial-delivery/
├── README.md
├── starter/                  # begin here
│   ├── index.html, scene.html, offline.html, styles.css, manifest.webmanifest
│   ├── sw.js                  # TODO 17
│   ├── data/
│   │   ├── bundles.json        # the bundle catalogue — finished
│   │   └── bundles/history-exhibit.manifest.json  # finished
│   └── js/
│       ├── mirror.js            # TODO 1
│       ├── manifest-loader.js    # TODO 2
│       ├── bundle-store.js        # TODO 3, 4, 5
│       ├── storage-panel.js        # TODO 6, 7
│       ├── download-manager.js      # TODO 8, 9
│       ├── low-data.js               # TODO 10
│       ├── background-sync.js         # TODO 11, 12
│       ├── bundles-ui.js               # TODO 13
│       ├── main.js                      # TODO 14, 15, 16
│       ├── scene-loader.js, scene-exhibit.js, scene-describe.js, scene-app.js  # finished, from 3.5
│       └── scene-main.js                 # TODO 18
├── completed/                # reference solution
├── assets/                    # Fox.glb, CesiumMilkTruck.glb — copied from 3.5
├── challenges/                # Three challenges: Foundation is required
├── tests/                     # self-review checklist
└── screenshots/
```

## Configuración

1. Desde la raíz del repositorio, inicia un servidor estático si no hay uno corriendo ya: `python3 -m http.server 8766 --bind 127.0.0.1`.
2. Abre `http://127.0.0.1:8766/full-stack-spatial/07-advanced-pwa-and-offline-spatial-delivery/starter/index.html`.
3. Abre DevTools > Application > Service Workers y marca **Update on reload** mientras trabajas, así un service worker viejo nunca oculta tus cambios.
4. La lista de paquetes, el panel de almacenamiento, y la configuración aparecen de inmediato; antes de que termine el TODO 1, descargar un paquete fallará (sus archivos resuelven a la dirección equivocada); eso es esperado, y es tu mapa de por dónde empezar.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Lee este Recorrido; ejecuta los pasos de Configuración de arriba; abre cada archivo del starter una vez. | Una página corriendo cuya lista de paquetes y panel de almacenamiento ya muestran algo, y una lista de cada TODO por delante. |
| 2 | TODO 1: `getAssetBaseUrl`, `setAssetBaseUrl`, y `resolveAssetUrl` de `js/mirror.js`. | Escribir una URL en "Asset base URL" y hacer clic en Save, y luego recargar, muestra de vuelta el mismo valor. |
| 3 | TODO 2: `fetchCatalog` y `fetchBundleManifest` de `js/manifest-loader.js`. | La tarjeta "History exhibit" aparece con su número real de archivos y tamaño total. |
| 4 | TODO 3: `supportsOPFS` y `saveFile` de `js/bundle-store.js`. | Hacer clic en Download guarda archivos reales; DevTools > Application > Storage (o Cache Storage) muestra que aparecen. |
| 5 | TODO 4: `readFileUrl` de `js/bundle-store.js`; TODO 5: `deleteBundle`. | "Delete bundle" elimina los archivos guardados, y volver a descargar los vuelve a obtener desde cero. |
| 6 | TODO 6: `readStorageEstimate` de `js/storage-panel.js`; TODO 7: `requestPersistence`. | El panel de almacenamiento muestra un número real de uso que crece después de una descarga, y el botón de persistencia reporta un resultado real. |
| 7 | TODO 8: `readWithProgress` y `downloadBundle` de `js/download-manager.js`. | La barra de progreso se mueve con suavidad mientras se descarga un modelo, en lugar de saltar de 0% a 100%. |
| 8 | TODO 9: la cola de reanudación de `js/download-manager.js` (`queueForResume`, `readQueue`, `clearFromQueue`). | Perder la conexión a mitad de una descarga (DevTools > Network > Offline) y volver a estar en línea reanuda la descarga sin reiniciar los archivos ya terminados. |
| 9 | TODO 10: `js/low-data.js`. | Con el interruptor de bajo consumo de datos activado, descargar el paquete de la exhibición histórica (más de 300 KB) pide confirmación primero. |
| 10 | TODO 11: `supportsBackgroundSync` y `registerResume` de `js/background-sync.js`; TODO 12: `watchForResume`. | La sección "How offline downloads keep going" (cómo siguen las descargas sin conexión) nombra correctamente si tu navegador soporta Background Sync. |
| 11 | TODO 13: `updateBundleCard` de `js/bundles-ui.js`. | Cada estado (no descargado, descargando, descargado, pausado) muestra su propio texto y botones correctos. |
| 12 | TODO 14: `startDownload` de `js/main.js`. | Una descarga completa, una cancelación, y una reanudación después de perder la conexión funcionan todas de principio a fin desde el clic del botón. |
| 13 | TODO 15 y TODO 16: la conexión del panel de almacenamiento y la configuración del espejo de `js/main.js`; TODO 17: el manejador `sync` de `sw.js`; TODO 18: `resolveModelUrl` de `js/scene-main.js`. | `scene.html` carga sus modelos primero desde tu paquete descargado sin conexión, sin ninguna solicitud de red en absoluto; confirma esto con DevTools > Network > Offline. |
| 14 | Trabaja [`tests/checklist.md`](tests/checklist.md); completa el [reto Fundamento](challenges/challenge-1.es.md) obligatorio; un reto de extensión más, y luego **Entregando tu trabajo**. | Cada elemento de la lista marcado, tu propia extensión pequeña, y un proyecto listo para mostrar. |

### Paso 1: lee la forma del manifiesto (sin TODO todavía)

Antes de escribir nada, abre `data/bundles/history-exhibit.manifest.json`. Observa que lista solo dos archivos, cada uno con una `path` y un conteo real de `bytes`; sin URLs, sin origen. Eso es deliberado: un manifiesto describe *qué* contiene un paquete, nunca *de dónde* obtenerlo. El "de dónde" es el único trabajo de `js/mirror.js` (Paso 2), que es exactamente lo que hace posible un espejo regional después sin tocar un solo manifiesto.

### Paso 2: la URL base de recursos (TODO 1)

`js/mirror.js` resuelve un nombre de archivo simple como `"Fox.glb"` contra cualquiera que sea la URL base configurada en ese momento: la propia carpeta `../assets/` del proyecto por defecto, o una URL guardada en `localStorage` si se estableció un espejo. Termina `getAssetBaseUrl`, `setAssetBaseUrl`, y `resolveAssetUrl` siguiendo los comentarios del archivo. Un espejo es un origen distinto, así que debe enviar encabezados CORS para que `fetch()` lea su respuesta: la misma regla entre orígenes que cubrió el Curso 5.1 para cualquier API.

### Paso 3: carga el catálogo (TODO 2)

`fetchCatalog` de `js/manifest-loader.js` lee `data/bundles.json` (siempre desde el propio servidor de este proyecto, nunca a través de un espejo; solo los propios *archivos* de un paquete pueden reflejarse); `fetchBundleManifest` lee el propio manifiesto de un paquete. Ambas son llamadas `fetch()` ordinarias con un solo trabajo cada una: obtener, comprobar `.ok`, analizar JSON, devolverlo.

### Paso 4: guarda un archivo, en OPFS o la Cache API (TODO 3)

`supportsOPFS()` de `js/bundle-store.js` comprueba si existe `navigator.storage.getDirectory` antes de que nada intente usarlo; nunca asumas que un navegador tiene una función por su nombre o versión. `saveFile` entonces elige un almacén: el stream `createWritable()` de OPFS cuando está disponible, o un par `Request`/`Response` en una `Cache` con nombre cuando no lo está. Todo lo que está por encima de esta función (la lógica de descarga, la interfaz) nunca necesita saber cuál de las dos ocurrió en verdad.

### Paso 5: vuelve a leer un archivo, y elimina un paquete (TODO 4, TODO 5)

`readFileUrl` es el inverso de `saveFile`: dado el id de un paquete y una ruta, devuelve una URL `blob:` lista para entregarle a cualquier cosa que quiera el archivo (un `fetch`, una `<img>`, o, en `scene-main.js`, `GLTFLoader`), intentando primero OPFS y luego la caché. `deleteBundle` elimina los archivos de un paquete de ambos almacenes incondicionalmente, ya que un paquete descargado antes de que una actualización de navegador cambiara el soporte de OPFS podría haber terminado dividido entre ambos.

### Paso 6: el panel de almacenamiento (TODO 6, TODO 7)

`js/storage-panel.js` envuelve dos métodos de `navigator.storage`: `estimate()`, que reporta cuántos bytes está usando este origen y su cuota aproximada, y `persist()`, que le pide al navegador que no borre este almacenamiento automáticamente bajo presión de disco. Ambos se comprueban primero por función: `estimate()` está ampliamente soportado, Safari soporta `persist()` desde la versión 15.2 (diciembre de 2021), y el navegador puede rechazar la solicitud de todos modos, así `requestPersistence()` siempre reporta lo que en verdad pasó en lugar de asumir éxito.

### Paso 7: descarga con progreso (TODO 8)

`readWithProgress` lee el cuerpo de una respuesta `fetch` con `getReader()` en lugar de llamar a `.blob()` directamente, para poder reportar bytes reales a medida que llegan; `downloadBundle` la llama una vez por archivo, suma los bytes de cada archivo a un total corriente, y llama a `saveFile` (Paso 4) una vez que un archivo termina. El detalle que vale la pena leer dos veces: **antes** de obtener cada archivo, comprueba si `readFileUrl` (Paso 5) ya tiene una copia guardada, y lo salta directamente si es así.

### Paso 8: la cola de reanudación (TODO 9)

Esa comprobación de saltar-si-ya-está-guardado del Paso 7 es también todo el mecanismo detrás de reanudar una descarga interrumpida: `queueForResume` solo recuerda el id de un paquete en `localStorage` cuando una descarga falla por una razón distinta a un Cancel deliberado, y reanudarla después (Paso 12, y `background-sync.js`) no es más que volver a llamar a `downloadBundle`: cada archivo ya guardado se salta automáticamente, y solo se obtienen los que faltan.

### Paso 9: modo de bajo consumo de datos (TODO 10)

Heredado conceptualmente del Curso 4.6, donde ocultaba por completo el momento 3D. Aquí, el contenido 3D *es* la descarga, así que `lowDataPreferred()` en su lugar condiciona una confirmación en `main.js` (Paso 12): quien aprende y ha elegido ahorrar datos todavía puede decidir, archivo por archivo, que una descarga en particular vale la pena.

### Paso 10: Background Sync, con una alternativa (TODO 11, TODO 12)

`supportsBackgroundSync()` comprueba `'serviceWorker' in navigator && 'SyncManager' in window`; según la tabla actual de soporte de navegadores de MDN, esto solo viene en navegadores basados en Chromium. `registerResume()` le pide al service worker que dispare un evento `sync` una vez que el navegador considere que la conexión volvió, incluso si para entonces cada pestaña de esta aplicación está cerrada; `watchForResume()` escucha el mensaje que envía ese evento (ver Paso 13), y, en cada navegador, incluidos los que no tienen Background Sync en absoluto, también escucha directamente el evento `online` de la ventana, que solo necesita que una pestaña esté abierta.

### Paso 11: muestra el estado real del paquete (TODO 13)

`updateBundleCard` es DOM puro: dado un objeto de estado (`idle`, `downloading`, `downloaded`, o `error`), muestra los botones correctos y escribe las palabras correctas, incluido el valor de la barra de progreso en movimiento y un conteo de bytes preciso. Nunca llama a `fetch`, al almacenamiento, ni al propio service worker; esa separación es lo que permite que el `startDownload` del Paso 12 cambie *qué* pasó sin que esta función necesite nunca cambiar *cómo se muestra*.

### Paso 12: conecta el botón de descarga (TODO 14)

`startDownload` de `main.js` une los Pasos 2–11: comprueba el modo de bajo consumo de datos, crea un `AbortController`, llama a `downloadBundle` con `onProgress` conectado a `updateBundleCard`, y maneja los dos resultados distintos de un fallo: `error.name === 'AbortError'` (un Cancel deliberado: restablece la tarjeta, no pongas nada en cola) frente a cualquier otro error (un fallo real: pon el paquete en cola para reanudar, y pídele ayuda a Background Sync si puede).

### Paso 13: termina la configuración, la llamada de despertar, y la escena sin conexión (TODO 15, TODO 16, TODO 17, TODO 18)

Cuatro piezas pequeñas e independientes cierran esta lección: `renderStoragePanel` de `main.js` y los manejadores de botones de la configuración del espejo (Pasos 6 y 2, ahora mostrados en pantalla); el escuchador del evento `sync` de `sw.js`, que le dice a cada página abierta que intente `resumeQueuedDownloads()` de nuevo; y `resolveModelUrl` de `scene-main.js`, que intenta `readFileUrl` (Paso 5) antes de recurrir a `resolveAssetUrl` (Paso 2). Esa última función es donde en verdad rinde frutos cada paso anterior: es la única línea que está entre "descargado" y "funciona sin ninguna conexión a la red en absoluto."

## Explicación del código clave

- **Un manifiesto describe archivos; `mirror.js` decide dónde viven.** Nada en `data/bundles/*.manifest.json` nombra un servidor. Esa separación es lo que hace posible que exista un espejo regional: cambia una URL guardada, y los archivos de cada paquete resuelven a un origen distinto, sin tocar ningún manifiesto, código de descarga, o código de almacenamiento.
- **Saltar-si-ya-está-guardado es todo el mecanismo de reanudación.** `downloadBundle` comprueba `readFileUrl` antes de obtener cada archivo. No hay ninguna ruta de código separada para "reanudar" en ningún lugar de este proyecto; una llamada de descarga nueva y una reanudada son la misma llamada a función, y la única diferencia es cuántos archivos encuentra ya guardados.
- **Dos almacenes, una interfaz.** `bundle-store.js` es el único archivo que sabe si un navegador dado tiene OPFS. Todo lo demás (la lógica de descarga, la interfaz, `scene-main.js`) llama a `saveFile` y `readFileUrl` y nunca pregunta cuál almacén respondió.
- **Detección de funciones, no detección de navegador.** Cada API opcional de esta lección (`navigator.storage.getDirectory`, `navigator.storage.persist`, `'SyncManager' in window`) se comprueba directamente, con una alternativa que funciona, en lugar de adivinarse a partir de un nombre o versión de navegador; el único enfoque que sigue funcionando correctamente a medida que los navegadores agregan soporte con el tiempo.
- **El progreso necesita el cuerpo de la respuesta, no `.blob()`.** `readWithProgress` lee el stream de una respuesta fetch fragmento por fragmento específicamente para que `onProgress` pueda reportar números reales mientras un archivo grande todavía está llegando; una llamada simple a `.blob()` no da ningún progreso hasta que el archivo completo ya está en memoria.
- **Una URL `blob:` es indistinguible de una de red, para `GLTFLoader`.** `resolveModelUrl` en `scene-main.js` puede devolver cualquiera de los dos tipos, y `GLTFLoader.load()` nunca necesita saber cuál; toda la pregunta de "¿esto funciona sin conexión?" se reduce a qué URL devuelve esa única función.

## Accesibilidad 3D y XR

- **Descripción de la escena.** `#scene-description` (`describeExhibit` de `scene-describe.js`) se construye a partir del mismo arreglo `items` que renderiza la vista 3D, y se actualiza cada vez que un modelo termina de cargar, falla, o el estado de conexión cambia (WCAG 1.1.1, 1.3.1).
- **Rutas de teclado para cada interacción.** "Turn left," "Turn right," y "Reset view" alcanzan cada movimiento de cámara que ofrece esta escena sin un mouse; arrastrar el lienzo es una forma de mirar alrededor, nunca la única.
- **Un gemelo 2D de la vista 3D.** `#exhibit-list` nombra cada elemento y su estado actual (cargando, cargado, o fallido) en texto ordinario, siempre presente, no solo cuando WebGL no está disponible.
- **Movimiento reducido y un control de Pausa.** El giro de la piedra de jade, y la propia animación de cada modelo cargado, empiezan pausados cuando `prefers-reduced-motion: reduce` está activado; el botón **Pause animation** (con `aria-pressed`) funciona sin importar esa preferencia.
- **Comodidad.** La cámara solo se mueve en respuesta a un arrastre, una pulsación de tecla, o los botones Turn/Reset; nunca por sí sola, y nunca porque una descarga termine o falle.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| El estado y progreso de cada descarga se anuncian como texto, en un elemento `role="status"` | 1.4.1, 4.1.3 | Quien aprende y no puede ver una barra de progreso en movimiento igual necesita saber que una descarga está ocurriendo, y qué tan avanzada va. |
| Una descarga pausada y en cola lo dice con palabras, no solo ocultando su barra de progreso | 1.4.1 | "Paused: will resume automatically" y "Not downloaded yet" nunca deben distinguirse solo por color o forma. |
| `role="list"` en cada `<ul>` con `list-style: none` | Buena práctica | Safari elimina la semántica de lista de un `<ul>` al que se le quitó el estilo de lista. |
| Cada botón repetido ("Download," "Cancel," "Delete" por paquete) tiene una etiqueta visible que inicia su nombre accesible | 2.5.3 | Un `textContent` sin `aria-label` como "Download for offline: History exhibit" significa que la palabra visible y la palabra anunciada son la misma palabra. |
| La animación respeta `prefers-reduced-motion` y ofrece un botón de Pausa | 2.2.2 | El movimiento que se inicia solo, sin que quien aprende lo pida, debe poder detenerse. |
| Cada interacción (configuración, descarga, cancelar, eliminar, mirar alrededor) tiene una ruta de teclado | 2.1.1 | Nada en esta lección depende de un mouse o el tacto. |

## Consideraciones de rendimiento

- **Reporta los tamaños propios del manifiesto antes de obtener cualquier cosa.** La tarjeta del paquete muestra un tamaño total real en el instante en que carga su manifiesto; quien aprende decide si descargar *antes* de que se haya movido un solo byte de los archivos reales.
- **Saltar-si-ya-está-guardado evita transferencia desperdiciada, no solo tiempo desperdiciado.** Cada llamada de descarga reanudada o repetida vuelve a comprobar `readFileUrl` por archivo, así una conexión lenta o medida nunca tiene que obtener un archivo dos veces.
- **`Content-Length` impulsa la barra de progreso, pero las descargas igual funcionan sin él.** Si un servidor (o un espejo) no lo envía, el `total` de `readWithProgress` es `0` y la barra simplemente permanece oculta; un encabezado faltante degrada la visualización, nunca la descarga en sí.
- **OPFS evita una segunda copia en memoria de un archivo grande por su propio bien.** `createWritable()` transmite un archivo a disco en streaming; nada en esta lección mantiene dos copias completas de un modelo de 370 KB en memoria a la vez, y un modelo del mundo real mucho más grande importaría mucho más aquí.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Comprobar `navigator.userAgent` (o el nombre de un navegador) para decidir si OPFS o Background Sync está disponible | Se rompe en el instante en que un navegador agrega o quita soporte, o en un navegador que no pensaste en probar | Detecta por función el propio método o interfaz (`navigator.storage?.getDirectory`, `'SyncManager' in window`) cada vez |
| Llamar a `response.blob()` para descargar un archivo con una barra de progreso | La barra no puede moverse hasta que todo el archivo ya haya llegado, anulando el propósito de mostrar progreso en absoluto | Lee el cuerpo de la respuesta con `getReader()` y reporta bytes a medida que llega cada fragmento |
| Tratar `AbortError` (un Cancel deliberado) igual que un fallo de red | Quien aprende y hace clic en Cancel ve su descarga "pausada" y reintentada en silencio más tarde, en lugar de detenida | Comprueba `error.name === 'AbortError'` y salta la cola de reanudación para ese caso |
| Construir a mano la URL de archivo de un paquete, mezclando el origen del espejo en el código de manifiesto o descarga | Cambiar la URL base de recursos después significa encontrar y corregir cada lugar donde se construyó una URL | Enruta cada URL de archivo a través de `resolveAssetUrl` de `mirror.js`, y en ningún otro lugar |
| Asumir que un navegador sin OPFS no tiene ningún almacenamiento sin conexión | Una función entera se deshabilita innecesariamente en versiones de Firefox anteriores a la 111, o en Safari | Recurre a la Cache API, que está soportada en todos lados donde hay un service worker |

## Solución de problemas

**Los modelos de un paquete muestran "failed to load" de inmediato.** Antes de que se termine el TODO 1, `resolveAssetUrl` aún no está implementada, así que los archivos resuelven a la dirección equivocada. Esto es esperado hasta el Paso 2.

**Las descargas muestran 0% todo el tiempo, y luego saltan a 100%.** `readWithProgress` (TODO 8) todavía no está terminada, o a la respuesta del servidor le falta un encabezado `Content-Length`; revisa los encabezados de respuesta del archivo en cuestión en el panel de Red.

**"This browser does not support requesting persistent storage."** Safari implementa `persist()` desde la versión 15.2; el navegador puede rechazar la solicitud según su propia heurística. Nada está roto; el almacenamiento simplemente no está protegido del desalojo automático de la forma en que lo estaría en otro lugar.

**Una descarga cancelada igual aparece en la cola de reanudación.** Comprueba que el bloque `catch` de `startDownload` distinga `error.name === 'AbortError'` de cualquier otro error; solo un fallo real debería llamar a `queueForResume`.

**Perder la conexión y volver a abrir `scene.html` igual intenta la red.** Confirma que `resolveModelUrl` (TODO 18) comprueba `readFileUrl` *antes* que `resolveAssetUrl`, no después, y que el paquete en verdad terminó de descargarse (revisa el número de uso del panel de almacenamiento, o DevTools > Application).

**Los cambios del service worker no parecen aplicarse.** Marca **Update on reload** en DevTools > Application > Service Workers (Firefox: `about:debugging#/runtime/this-firefox`; Safari: el submenú Service Workers del menú Develop), o desregistra el worker viejo a mano.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: muestra cuáles de los archivos individuales de un paquete ya están guardados, antes de que su descarga termine o incluso empiece.
2. **[Creativo](challenges/challenge-2.es.md)**: construye tu propio pequeño paquete de escena alrededor de algo de tu propia comunidad, en tu propio idioma.
3. **[Explorador](challenges/challenge-3.es.md)**: reanuda un solo archivo interrumpido con solicitudes de rango HTTP, en lugar de solo saltar archivos completos que ya terminaron.

## Cómo entregar tu trabajo

1. Trabaja [`tests/checklist.md`](tests/checklist.md).
2. Toma capturas de pantalla: la lista de paquetes a mitad de descarga con su barra de progreso visible, el panel de almacenamiento después de una descarga exitosa, y la escena de la exhibición histórica corriendo con DevTools configurado en Offline.
3. Guárdalas en tu diario de aprendizaje y portafolio. Cuando abra la comunidad de XR Camp, compártelas ahí.
4. Pregunta de diario: esta lección siempre intenta un archivo guardado sin conexión antes que la red (`resolveModelUrl`). Encuentra otro lugar en una aplicación real que uses seguido (un mapa, una aplicación de mensajería, un reproductor de música) donde creas que el mismo orden de "primero la copia guardada, luego la red" la haría notablemente más usable en una mala conexión. ¿Qué tendría que guardar esa aplicación, y cómo sabría cuándo su copia guardada está desactualizada?

## Lecturas adicionales

- [MDN: Origin private file system](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system) (en inglés)
- [MDN: Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache) (en inglés)
- [MDN: Background Synchronization API](https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API) (en inglés)
- [MDN: StorageManager](https://developer.mozilla.org/en-US/docs/Web/API/StorageManager) (en inglés)
- [MDN: Using readable streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams) (en inglés)

## Mujeres que conviene conocer

**Africa Flores-Anderson** (África Flores) es una científica guatemalteca de teledetección. Trabajó para SERVIR, el programa conjunto de observación de la Tierra de la NASA y USAID, y lideró un proyecto financiado por Microsoft y AI for Earth de National Geographic que usó datos satelitales y aprendizaje automático para monitorear y pronosticar floraciones de algas en el Lago Atitlán. En 2020 fue nombrada Geospatial Woman Champion of the Year por Geospatial World.

Los datos satelitales solo ayudan a una comunidad si llegan a las personas que los necesitan, a menudo por conexiones lentas o poco confiables. Empaquetar datos espaciales grandes para que puedan descargarse una vez y usarse sin conexión, como hiciste en esta lección, es parte de ese mismo trabajo.

> **Nota editorial: verificar antes de publicar.** Los datos biográficos de las secciones «Mujeres que conviene conocer» deben verificarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

La Cache API y la especificación de Service Workers de la que depende están mantenidas por el W3C Web Applications Working Group, siguiendo el proceso habitual de Recommendation del W3C. El Origin Private File System (la parte de la File System API que usa esta lección) y la Background Sync API tomaron un camino distinto: ambas empezaron como propuestas dentro del WICG (Web Incubator Community Group), un espacio más ligero que usan los fabricantes de navegadores para desarrollar y probar una función antes de que, si alguna vez sucede, pase a una vía formal de estandarización. Esa diferencia de proceso es una razón real y práctica (no la única) de por qué las notas de soporte de esta lección son mucho más cautelosas sobre OPFS y Background Sync que sobre la Cache API: el estatus de estándar de una función y su soporte entre navegadores tienden a moverse juntos, que es exactamente por qué esta lección revisa las tablas de compatibilidad actuales de MDN, en lugar de confiar en cuán establecido suena el nombre de una API.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
