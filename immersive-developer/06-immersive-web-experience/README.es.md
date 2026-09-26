# Proyecto final de la Fase 4: Experiencia web inmersiva

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `immersive-developer` · **Lección:** `immersive-web-experience-06` · **Tiempo:** unas 22 horas · 30 sesiones de 45 minutos · unas 8 semanas con 4 sesiones por semana

---

> Publica una experiencia XR completa, usable con y sin visor.

---

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Combinar cuatro subsistemas de WebXR ya construidos -entrada a VR, entrada de usuario, correcciones de accesibilidad y ética, y audio espacial- en una sola página funcional, integrando en lugar de reescribir.
2. Solicitar una sesión `immersive-vr` a partir de un clic real, aplicar comodidad mientras se presenta, y reportar con honestidad un límite del área de juego, incluso cuando no se reporta ninguno.
3. Dar a cada interacción XR -seleccionar, agarrar, colocar- un equivalente alcanzable por teclado y en pantalla, para que nada aquí requiera tener un visor para probarlo.
4. Aplicar una corrección de ética que explica una función que usa un sensor antes de pedir permiso, y que nunca guarda ni muestra lo que percibe.
5. Anclar un subtítulo a quien visita en lugar de a un punto en el mundo 3D, tanto en una página plana como dentro de una sesión VR.
6. Construir una descripción de la escena y una gemela 2D a partir de un solo objeto de estado compartido, para que ninguna pueda desincronizarse de la otra.
7. Leer un brief y una rúbrica antes de construir, y probar contra una matriz declarada: escritorio, teléfono, un emulador, y un visor si hay uno disponible.
8. Escribir notas de versión que describan lo que realmente contiene una versión publicada, incluyendo lo que no se probó.

## Requisitos previos

- **Curso 4.1: Fundamentos de WebXR** hasta **Curso 4.5: Audio espacial, medios y presencia** (la solución de referencia de este proyecto final reutiliza directamente las ideas de 4.1, 4.2, 4.4, y 4.5, como código terminado en el starter; las ideas de anclaje al mundo y al cuerpo de 4.3 se dan por sentadas, no se demuestran por separado aquí).
- Sentirte cómoda leyendo y extendiendo módulos de JavaScript existentes a través de varios archivos, en lugar de escribir una escena 3D desde cero.
- Un proyecto de three.js que puedas ejecutar a través de un servidor local, como lo ha sido cada lección hasta ahora.

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Un navegador moderno (Chrome, Firefox, Edge, o Safari) | Ejecuta la exhibición y su lienzo WebGL 2. | Gratis |
| Un servidor local de archivos estáticos (por ejemplo, `python3 -m http.server`, o Live Server de VS Code) | Sirve la página por `http://`, que los módulos ES requieren. | Gratis |
| Un editor de texto (por ejemplo, VS Code) | Editar HTML, CSS, y JavaScript. | Gratis |
| DevTools del navegador (integrado en cada navegador de arriba) | La consola, para errores; la emulación de dispositivos, para la matriz de pruebas. | Gratis |
| Una extensión de navegador emuladora de WebXR (opcional; por ejemplo, "Immersive Web Emulator") | Te permite probar Enter VR sin tener un visor. | Gratis |
| Un visor VR (opcional) | Te permite probar la ruta real de Enter VR y su reporte de límite del área de juego. | No es obligatorio |

Esta lección no usa ninguna cuenta de pago, ninguna clave de API, ni ningún servicio bloqueado en China continental.

## Lo que vas a construir

El proyecto final de la Fase 4: una página que combina todo lo que enseñaron 4.1 a 4.5, continuando la misma exhibición de three.js (una olla de barro, un aro de canasta tejida, y una piedra de jade) desde web3d-developer/04-threejs-foundations. Enter VR (4.1) solicita una sesión real, con comodidad y un reporte del límite del área de juego. Seleccionar, agarrar, y colocar un marcador (4.2) funcionan cada uno por control, por squeeze, y por un botón en pantalla alcanzable por teclado. Las correcciones de accesibilidad y ética de 4.4 siguen vigentes: subtítulos anclados a quien visita, una ruta completa por teclado, y una función "Personalize" basada en cámara que se explica a sí misma antes de pedir permiso. El audio espacial y los subtítulos (4.5) dan a cada pedestal su propio sonido, una barra de subtítulos, y una transcripción completa antes de que nadie presione reproducir.

La solución de referencia está en [`completed/`](completed/). Tiene 8 TODOs numerados repartidos entre `starter/index.html` y `starter/js/main.js` -todo lo demás en el starter (`js/app.js`, `js/exhibit.js`, `js/describe.js`, `js/xr.js`, `js/interact.js`, `js/presenter.js`, `js/audio-captions.js`) ya funciona, porque este proyecto final se trata de integración, no de construir una escena 3D desde cero. Lee [`starter/brief.md`](starter/brief.md) y [`starter/rubric.md`](starter/rubric.md) antes de empezar.

Más adelante, una vez que "My XR Camp" (2.1-2.3) tenga un lugar para ello, esta exhibición del proyecto final es el tipo de proyecto al que un diario de aprendizaje o una entrada de portafolio enlazaría -guarda tus capturas de pantalla y tu `CHANGELOG.md` en algún lugar donde puedas volver a encontrarlos.

## Guía de carpetas

```text
06-immersive-web-experience/
├── README.md
├── ATTRIBUTION.md
├── starter/                 # begin here: brief.md, rubric.md, and 8 numbered TODOs
│   ├── brief.md
│   ├── rubric.md
│   ├── index.html
│   ├── CHANGELOG.md
│   ├── styles.css
│   └── js/
├── completed/               # reference solution
│   ├── index.html
│   ├── CHANGELOG.md
│   ├── styles.css
│   └── js/
├── challenges/          # Three challenges: Foundation is required
├── tests/                    # self-review checklist
├── assets/                   # three pedestal sounds and a caption file, reused from 4.5
└── screenshots/
```

## Configuración

1. Abre esta carpeta en tu editor.
2. Inicia un servidor local en la raíz del repositorio (por ejemplo `python3 -m http.server 8766`), para que la página se sirva por `http://`, no abierta como una ruta `file://`.
3. Abre `starter/index.html` a través de ese servidor.
4. Lee [`starter/brief.md`](starter/brief.md) y [`starter/rubric.md`](starter/rubric.md) por completo antes de escribir cualquier código.
5. Confirma que el starter ya se ejecuta: se cargan tres pedestales y un avatar quieto, la lista de exhibición muestra un botón Select por exhibición, y Select, Pause, y Reload funcionan todos. Ese es el motor terminado de 4.1-4.5; nada aquí está roto antes de que empieces.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Lee `brief.md` y `rubric.md`; revisa por encima las carpetas terminadas de 4.1, 4.2, 4.4, y 4.5 para ver qué reutiliza este proyecto final. | Una imagen clara de qué archivo terminado hace cada trabajo. |
| 2 | Configura el starter y confirma que el motor se ejecuta sin cambios. | Tres pedestales y un avatar cargando, Select funcionando, en tu navegador. |
| 3 | Lee por completo `js/xr.js`, `js/interact.js`, `js/presenter.js`, y `js/audio-captions.js`. | Notas sobre qué posee cada archivo, para que integres en lugar de reescribir. |
| 4 | Paso 3: agrega el marcado de `#boundary-status` (TODO 1). | Un párrafo de límite presente pero vacío bajo Enter VR. |
| 5 | Paso 4: conecta `isVRSupported()` y `enterVR()` (TODO 2). | Un botón Enter VR funcional, su nota de compatibilidad, y un reporte de límite. |
| 6 | Prueba la ruta de Enter VR con un emulador de WebXR o leyendo el mensaje del botón deshabilitado en un dispositivo sin compatibilidad. | Prueba de que el botón se comporta correctamente en ambos casos. |
| 7 | Paso 5: agrega el botón `#place-marker` (TODO 3). | Un botón visible Place marker en la sección Controls. |
| 8 | Paso 6, parte 1: extiende el elemento de lista de cada exhibición con botones Grab y Play narration (TODO 4, parte 1). | Tres exhibiciones, cada una con tres botones. |
| 9 | Paso 6, parte 2: conecta los clics de Grab, Play, y Place marker (TODO 4, parte 2). | Agarrar gira una exhibición; Place marker agrega un marcador; ambos anuncian lo que pasó. |
| 10 | Pase solo con teclado: usa Tab para llegar a cada botón agregado hasta ahora y confirma que cada uno funciona igual. | Prueba de que cada control nuevo tiene una ruta completa por teclado (4.2). |
| 11 | Paso 7: agrega la explicación, el botón de consentimiento, y el párrafo de resultado de la sección Personalize (TODO 5). | Una sección Personalize que se explica a sí misma, todavía sin un botón funcional. |
| 12 | Paso 8: conecta el clic de consentimiento a `requestPersonalize()` (TODO 6). | Un botón Personalize que solo pide la cámara después de ese clic. |
| 13 | Prueba Personalize de tres formas: permítelo, deníégalo, y (en una bandera de DevTools) simula que no hay cámara compatible. | Tres mensajes de resultado honestos, ninguno de ellos un fallo. |
| 14 | Paso 9: agrega el marcado de la barra de subtítulos y la transcripción (TODO 7). | Una barra de subtítulos vacía y una lista de transcripción vacía, ambas visibles. |
| 15 | Paso 10, parte 1: construye la transcripción a partir de `transcriptLines()` (TODO 8, parte 1). | Los tres subtítulos listados, antes de que se haya reproducido ninguna narración. |
| 16 | Paso 10, parte 2: escribe `setCaption()` y llámalo desde la rama de Play narration (TODO 8, parte 2). | Presionar Play narration actualiza la barra de subtítulos y reproduce su sonido. |
| 17 | Paso 10, parte 3: adjunta y desprende la malla HUD de subtítulos al iniciar y terminar VR (TODO 8, parte 3). | El subtítulo se mueve de la página a la vista del visor, y de vuelta. |
| 18 | Confirma que `#scene-description` se actualiza correctamente para cada estado: selección, agarre, marcador, y estado de VR. | Una descripción que nunca dice algo que la página no muestra. |
| 19 | Un pase de movimiento reducido: confirma que el giro de una exhibición agarrada empieza en pausa cuando el sistema operativo lo pide, y que Pause siempre indica qué hará a continuación. | Movimiento reducido comportándose correctamente en la emulación de tu navegador. |
| 20 | Prueba a 390 px y 1280 px; corrige cualquier desbordamiento horizontal. | Una página que funciona en ambos anchos. |
| 21 | Prueba la ruta alternativa sin WebGL (desactiva WebGL, o usa DevTools para simularlo). | Confirmación de que la lista de exhibición y la transcripción siguen llevando cada dato. |
| 22 | Construye la matriz de pruebas de este README (ver abajo) a partir de lo que realmente probaste. | Una matriz de pruebas completa y honesta. |
| 23 | Paso 11: escribe la entrada `1.0.0` de `CHANGELOG.md`. | Una nota de versión que describe lo que tu proyecto final realmente publica. |
| 24 | Vuelve a leer tu propio código y comentarios buscando la intención, no solo la corrección. | Comentarios que explican el por qué, no solo el qué. |
| 25 | Recorre [`tests/checklist.md`](tests/checklist.md) de principio a fin. | Cada casilla marcada, o una corrección para cada una que no lo esté. |
| 26 | Confirma cada fila de `starter/rubric.md` contra tu propia construcción. | El reto Fundamento (los ocho TODOs) completo. |
| 27 | Elige Creativo o Explorador, y empiézalo. | Una primera versión funcional de tu extensión elegida. |
| 28 | Termina tu reto elegido; actualiza `CHANGELOG.md` si cambiaste algo. | La extensión completa y documentada. |
| 29 | Un pase completo solo con teclado por cada control de la página, una vez más. | Cada interacción confirmada como alcanzable y usable sin un mouse. |
| 30 | Entrega final: capturas de pantalla, la lista de verificación revisada de nuevo, y tu pregunta de diario respondida. | Un proyecto final listo para entregar. |

### Paso 1: lee el brief y la rúbrica

Abre [`starter/brief.md`](starter/brief.md) y [`starter/rubric.md`](starter/rubric.md). Como el proyecto final de web3d-developer/07, este empieza con un brief y una rúbrica, no con una página en blanco -leer ambos antes de escribir cualquier código es en sí mismo parte de la habilidad que enseña esta lección.

### Paso 2: recorre el motor terminado del starter

Abre `starter/js/app.js`, `js/exhibit.js`, y `js/describe.js` (los pedestales, los datos de exhibición, y el constructor de la descripción de la escena -sin cambios desde lecciones anteriores), luego `js/xr.js` (4.1), `js/interact.js` (4.2), `js/presenter.js` (4.4), y `js/audio-captions.js` (4.5). Los siete están terminados. Tu trabajo en este proyecto final vive solo en `starter/index.html` y `starter/js/main.js`.

### Paso 3: el marcado de estado del límite (TODO 1)

En `starter/index.html`, encuentra el TODO 1 dentro de la sección Enter VR y agrega un párrafo con `id="boundary-status"` y `class="scene-text"`, que empiece vacío. `enterVR()` de `js/xr.js` ya reporta el límite del área de juego a través de un callback `onBoundary`; el Paso 4 escribe ese reporte aquí.

### Paso 4: conectando Enter VR (TODO 2)

En `starter/js/main.js`, encuentra el TODO 2. Llama a `isVRSupported()` una vez, al cargar, para activar el botón Enter VR o explicar en `#vr-support-note` por qué se queda desactivado. Al hacer clic, llama a `enterVR(app, { onStart, onEnd, onBoundary })`: `onStart` pone `state.xrActive = true` y llama a `updateDescription()`; `onBoundary` escribe una oración simple en `#boundary-status`, diciendo cuántos puntos se reportaron, o que no se reportó ninguno. Envuelve el cuerpo del manejador de clic en `try`/`catch`, ya que `requestSession()` puede rechazarse.

### Paso 5: el botón Place marker (TODO 3)

En la sección Controls de `starter/index.html`, encuentra el TODO 3 y agrega un botón con `id="place-marker"`, etiquetado "Place marker" -el equivalente 2D/teclado de la colocación con hit-test AR de 4.2, para cualquiera sin un teléfono o visor compatible.

### Paso 6: Grab, Play narration, y conectarlos (TODO 4)

En `starter/js/main.js`, encuentra el TODO 4 en dos lugares: primero, extiende la plantilla del elemento de lista de cada exhibición (junto al botón Select existente) con un botón Grab (`data-grab`, `aria-pressed="false"`) y un botón Play narration (`data-play`). Segundo, en el manejador de clic de abajo, agrega una rama `else if (btn.dataset.grab)` que llame a `setGrabbed(app, ...)`, y una rama `else if (btn.dataset.play)` que llame a `playNarration(sounds, ...)`. También conecta el botón Place marker del Paso 5 a `placeMarker(app)`.

### Paso 7: el marcado de la sección Personalize (TODO 5)

En `starter/index.html`, encuentra el TODO 5 y agrega: un párrafo que explique exactamente qué hace y qué no hace esta función con la cámara; un botón con `id="personalize-consent"`; y un párrafo con `id="personalize-result"` y `role="status"`. Esta es la corrección de 4.4 para un starter que antes tomaba una foto sin preguntar -explica, luego pregunta, en ese orden.

### Paso 8: conectando Personalize (TODO 6)

En `starter/js/main.js`, encuentra el TODO 6. Agrega un listener de clic en el botón del Paso 7 que llame a `await requestPersonalize()` y escriba uno de cuatro mensajes simples en `#personalize-result`, según si el acceso fue otorgado, denegado, no compatible, o falló por otra razón. `requestPersonalize()` ya detiene la cámara inmediatamente después de comprobarla; nunca la llames desde ningún otro lugar que no sea este clic.

### Paso 9: el marcado de la barra de subtítulos y la transcripción (TODO 7)

En `starter/index.html`, encuentra el TODO 7 y agrega la sección de barra de subtítulos (un encabezado visualmente oculto más `#caption-text`, `role="status"`) y la sección de transcripción (un encabezado más una lista `#transcript` vacía). Este es el subtítulo de 4.5, anclado a quien visita en lugar de a un punto en el mundo -la corrección que pidió la auditoría de 4.4.

### Paso 10: conectando los subtítulos y la transcripción (TODO 8)

En `starter/js/main.js`, encuentra el TODO 8 en tres lugares: construye la transcripción a partir de `transcriptLines()` para que esté completa antes de que nada se reproduzca; escribe un ayudante `setCaption(text)` que actualice `#caption-text` y llame a `captionHud.setText(text)`, llamado desde la rama Play narration del Paso 6; y, dentro de los callbacks `onStart`/`onEnd` de `enterVR()`, adjunta y desprende `captionHud.mesh` a `app.camera`, ocultando y mostrando `#caption-bar` en consecuencia.

### Paso 11: la matriz de pruebas

Completa la tabla bajo "Consideraciones de rendimiento" más abajo con lo que realmente probaste en este proyecto final: tu navegador de escritorio, un teléfono (incluso sin WebXR, para confirmar la ruta 2D), un emulador de WebXR si usaste uno, y un visor real si tienes acceso a uno. Escribe "no probado" con honestidad donde aplique -un vacío honesto es más útil para la siguiente persona que una suposición.

### Paso 12: notas de versión y un pase final de accesibilidad

Escribe la entrada `1.0.0` de `CHANGELOG.md`: qué se publicó, y cualquier limitación conocida (por ejemplo, hardware que no pudiste probar). Luego lee en voz alta el texto de `#scene-description`, confirma que cada región dinámica (`role="status"`) anuncia una vez por cambio, y confirma que el orden de encabezados no está roto. Un proyecto final es donde cada hábito de accesibilidad de cuatro lecciones anteriores tiene que sostenerse a la vez.

## Explicación del código clave

- **`enterVR()` de `js/xr.js`** solicita la sesión solo desde dentro de un manejador de clic real (una activación de usuario), porque la WebXR Device API rechaza en silencio las llamadas a `requestSession()` hechas de cualquier otra forma. También desactiva `OrbitControls` por comodidad: una vez que un visor posee la cámara, una vista arrastrada con mouse competiría con ella.
- **Los eventos de rayo y squeeze del control de `js/interact.js`** son una forma de entrar a `selectExhibit()` y `setGrabbed()` -las mismas funciones que llaman los botones Select y Grab en pantalla. Ninguna ruta es una alternativa de la otra; ambas son rutas igualmente reales hacia el mismo estado.
- **`requestPersonalize()` de `js/presenter.js`** llama a `getUserMedia()` solo desde un clic explícito, y detiene cada pista inmediatamente después de que se resuelve el aviso de permiso. Nunca renderiza una vista previa, porque esta demo necesita saber si se otorgó el acceso, no qué vio la cámara.
- **`createCaptionHud()` de `js/audio-captions.js`** dibuja un subtítulo sobre un `CanvasTexture` respaldado por `<canvas>`, en un plano agregado como hijo de la cámara en lugar de la escena -así que siempre se queda en el mismo lugar en la vista de quien visita, frente a ella, sin importar hacia dónde gire la cabeza.
- **`buildSceneDescription()`** lee los mismos objetos `app` y `state` que cada manejador de botón ya actualiza, así que la descripción nunca puede describir una selección, un agarre, o una sesión de VR que no sea realmente la actual.
- **Los ocho TODOs numerados están todos en `index.html` y `main.js`**, nunca en `app.js`, `xr.js`, `interact.js`, `presenter.js`, o `audio-captions.js`. Un proyecto final que integra código ya funcional es una habilidad más realista que empezar desde cero cada vez.

## Accesibilidad 3D y XR

Este proyecto final es 3D de principio a fin, continuando la exhibición de 4.1-4.5, así que su trabajo de accesibilidad no es un momento dentro de una página 2D -es toda la página. Cada requisito de abajo ya se enseñó en una lección anterior de Desarrolladora Inmersiva; el trabajo de este proyecto final es asegurarse de que todos sigan vigentes una vez que se combinan todos los subsistemas.

- La descripción de la escena se actualiza para la selección, el agarre, la colocación de marcador, y el estado de VR/límite (`js/describe.js`).
- La lista de exhibición y la transcripción llevan los mismos datos que la vista 3D y la barra de subtítulos, así que ningún dato existe solo dentro del lienzo.
- Cada interacción tiene una ruta por teclado: Select, Grab, Play narration, Place marker, Pause, Reload, Enter VR, y Personalize, ninguna de las cuales requiere un puntero o un control.
- Se respeta el movimiento reducido: el giro de una exhibición agarrada empieza en pausa cuando el sistema operativo lo pide, y Pause siempre indica qué hará a continuación.
- El subtítulo está anclado a quien visita (una barra del DOM en una pantalla, un plano HUD adjunto a la cámara en VR), nunca a un punto fijo en el mundo 3D.
- La cámara nunca se mueve por sí sola; solo el arrastre de quien aprende, o el propio seguimiento de un visor, la mueve.
- La función Personalize se explica a sí misma antes de pedir acceso a la cámara, y nunca guarda ni muestra lo que ve la cámara.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| `#status`, `#boundary-status`, `#caption-text`, y `#personalize-result` usan `role="status"` donde anuncian un cambio | 4.1.3 (Status Messages) | Una persona que usa lector de pantalla escucha qué acaba de pasar sin necesitar mover el foco para averiguarlo. |
| El nombre accesible de cada botón empieza con su palabra visible ("Select: Jade stone") | 2.5.3 (Label in Name) | Una persona que usa control por voz o lector de pantalla puede activar un botón por la palabra que ve. |
| La función Personalize pide consentimiento antes de solicitar acceso a la cámara, y explica primero qué hace | Buena práctica (XR Accessibility User Requirements: consentimiento informado) | Quien visita nunca debería sorprenderse por lo que una función que usa un sensor hace con su cámara. |
| El foco es visible en cada control | 2.4.7 (Focus Visible) | El contorno `:focus-visible` de este proyecto debe mostrarse en cada botón, antiguo y nuevo. |
| El movimiento reducido detiene el giro de la exhibición agarrada | 2.2.2 (Pause, Stop, Hide) | La propia animación de la exhibición empieza en pausa cuando el sistema operativo pide menos movimiento, exactamente como lo corrigió 4.4. |
| `role="list"` en cada lista con estilo `list-style: none` | Buena práctica (Safari elimina la semántica de lista si no) | Tanto la lista de exhibición como la transcripción se siguen anunciando como listas. |

## Consideraciones de rendimiento

La matriz de pruebas de este proyecto final, completada con lo que realmente se probó para esta solución de referencia:

| Objetivo | ¿Probado? | Resultado |
| --- | --- | --- |
| Navegador de escritorio (Chrome, gráficos integrados) | Sí | Se ejecuta a 60 fps; sin errores de consola; Enter VR reporta correctamente "no compatible" sin un visor. |
| Navegador de escritorio, sin WebGL 2 (simulado) | Sí | La lista de exhibición y la transcripción siguen siendo completamente legibles; el panel 3D y sus controles se ocultan de forma limpia. |
| Navegador de teléfono (sin WebXR) | Sí | La ruta 2D (Select, Grab, Play narration, Place marker, Personalize) funciona por completo al tacto. |
| Extensión emuladora de WebXR | No probado para esta versión | Ver las limitaciones conocidas de `CHANGELOG.md`. |
| Visor VR real | No probado para esta versión | Ver las limitaciones conocidas de `CHANGELOG.md`. |

Reemplaza esta tabla con tus propios resultados una vez que completes el Paso 11 -un "no probado" honesto es más útil que una suposición sobre hardware que no tienes.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Llamar a `requestSession()` desde una cadena de promesas en lugar de directamente dentro del manejador de clic | El navegador la rechaza en silencio, sin ningún error útil | Llama a `enterVR()` como la primera línea del cuerpo del manejador de clic |
| Conectar Grab y Play narration solo dentro de la rama `if (btn.dataset.select)` del manejador de clic | Agarrar y reproducir narración nunca funcionan, aunque los botones existan | Agrega ramas `else if` separadas para `btn.dataset.grab` y `btn.dataset.play` |
| Llamar a `requestPersonalize()` al cargar la página "para comprobar la compatibilidad temprano" | El navegador pide acceso a la cámara antes de que quien visita haya leído para qué es | Llámala solo desde el manejador de clic del botón de consentimiento, exactamente una vez por clic |
| Agregar la malla HUD de subtítulos a la escena en lugar de a la cámara | El subtítulo se queda fijo en el mundo 3D y puede terminar detrás de quien visita | `app.camera.add(captionHud.mesh)`, no `app.scene.add(...)` |
| Escribir la matriz de pruebas de memoria en lugar de probar realmente cada fila | El README afirma una cobertura que nadie comprobó | Prueba cada fila, o márcala honestamente como "no probado", como hace la propia tabla de esta lección |

## Solución de problemas

**Enter VR se queda desactivado incluso en un dispositivo que sé que es compatible con WebXR.** `isVRSupported()` puede resolverse en `false` en orígenes `http://` distintos de `localhost` o `127.0.0.1` -algunos navegadores requieren un contexto seguro. Confirma que estás sirviendo exactamente desde la dirección que nombra el brief.

**Grab no hace nada cuando hago clic.** Comprueba que la rama del manejador de clic del TODO 4 se agregó como un `else if` **separado**, no añadido dentro del bloque `if (btn.dataset.select)` existente -un error común de copiar y pegar.

**El subtítulo nunca aparece en VR, solo en la página.** Confirma que el callback `onStart` del TODO 8 llama a `app.camera.add(captionHud.mesh)` -sin eso, `setText()` actualiza una textura que nada en la escena está mostrando.

**Firefox:** la compatibilidad con WebXR varía según la versión; revisa `about:config` para `dom.vr.webxr.enabled` si `isVRSupported()` se resuelve inesperadamente en `false`.

**Safari:** aún no es compatible con la WebXR Device API en la mayoría de las plataformas; `#vr-support-note` lo explicará correctamente, y cada otro control sigue funcionando.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.md)**: termina los ocho TODOs numerados para que los cuatro subsistemas combinados funcionen juntos.
2. **[Creativo](challenges/challenge-2.md)**: reemplaza una exhibición con algo de tu propia cultura, comunidad, o idioma.
3. **[Explorador](challenges/challenge-3.md)**: construye una sesión real `immersive-ar` con hit-test, manteniendo el botón 2D "Place marker" como su equivalente.

## Cómo entregar tu trabajo

1. Recorre [`tests/checklist.md`](tests/checklist.md) de principio a fin, incluyendo la sección "3D and XR (manual)".
2. Toma dos o tres capturas de pantalla: la exhibición con un elemento seleccionado y sostenido, y el panel Enter VR mostrando su nota de compatibilidad o su reporte de límite.
3. Guárdalas en tu diario de aprendizaje y portafolio. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. Pregunta de diario: ¿cuál de las cuatro lecciones combinadas (4.1, 4.2, 4.4, 4.5) requirió más cuidado para conectar correctamente, y qué estuvo a punto de salir mal?

## Lecturas adicionales

- [MDN: WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API) (en inglés)
- [W3C: WebXR Hit Test Module](https://www.w3.org/TR/webxr-hit-test-1/) (en inglés)
- [W3C: XR Accessibility User Requirements (XAUR)](https://www.w3.org/TR/xaur/) (en inglés)
- [MDN: ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) (en inglés)
- [Keep a Changelog](https://keepachangelog.com/) (en inglés)

## Mujeres que conviene conocer

Ayşegül Yönet es una experta invitada del W3C y copresidenta del W3C Immersive Web Working Group (junto con Ada Rose Cannon y Chris Wilson), el grupo que desarrolla la WebXR Device API sobre la que está construido todo este proyecto final -la misma llamada `navigator.xr.requestSession()` que usa `js/xr.js`. Ha sido Senior Cloud Developer Advocate en Microsoft, enfocada en computación espacial y WebXR, es Google Developer Expert en Tecnologías Web, copresenta el San Francisco WebXR Meetup, y enseña el curso de Frontend Masters "3D on the Web & WebXR".

Un proyecto final que combina Enter VR, entrada de control, y colocación con hit-test en una sola página depende por completo de que la WebXR Device API se mantenga como un estándar estable y multiplataforma en lugar de un conjunto de APIs de proveedor incompatibles -exactamente el trabajo que hace el grupo de trabajo de Yönet. Leer una especificación antes de usar una API, tal como los comentarios de `js/xr.js` remiten a las propias reglas de la WebXR Device API sobre la activación del usuario, es un pequeño hábito diario que mantiene visible este tipo de trabajo de estandarización.

> **Nota editorial: verificar antes de publicar.** Los datos biográficos de las secciones «Mujeres que conviene conocer» deben verificarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

Cada subsistema que combina este proyecto final descansa sobre un estándar del W3C: la WebXR Device API (`navigator.xr`), desarrollada por el Immersive Web Working Group, con los módulos WebXR Hit Test y Augmented Reality extendiéndola para la colocación sobre superficies. El grupo de trabajo publica estos y otros módulos de WebXR, incluyendo los módulos Hand Input y Depth Sensing, como Working Drafts dentro del camino hacia Recommendation. Un proyecto final que "simplemente funciona" en un teléfono, un visor, y una pantalla común descansa en silencio sobre que esa única API se mantenga igual en todos lados donde se ejecuta.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
