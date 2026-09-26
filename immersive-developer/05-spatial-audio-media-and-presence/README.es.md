# Audio espacial, medios y presencia

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `immersive-developer` · **Lección:** `spatial-audio-media-and-presence-05` · **Tiempo:** unas 10 horas · 14 sesiones de 45 minutos · unas 4 semanas con 4 sesiones por semana

---

> Crea una escena inmersiva de medios o narración.

---

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Crear y configurar un **`THREE.PositionalAudio`**, y explicar `setRefDistance()`, `setRolloffFactor()`, `setMaxDistance()`, y los tres modelos de distancia de Web Audio: `'linear'`, `'inverse'`, y `'exponential'`.
2. Adjuntar un `PositionalAudio` a cualquier `Object3D` para que herede la posición de ese objeto en cada cuadro, y colocar un **`THREE.AudioListener`** en la cámara para que el paneo siempre se mida desde quien mira.
3. Explicar por qué un `AudioContext` empieza **suspendido**, y reanudarlo desde dentro de un gesto genuino del usuario, junto con los propios `play()` y `pause()` de three.js.
4. Construir una textura que cambia con el tiempo con **`THREE.CanvasTexture`**: redibujar un canvas en cada cuadro, y establecer `texture.needsUpdate` para que three.js la vuelva a cargar.
5. Explicar la diferencia entre `CanvasTexture` y **`THREE.VideoTexture`**, y cuándo recurrirías a cada una.
6. Redactar un archivo de subtítulos **WebVTT**, y leer sus cues en JavaScript con la API **`TextTrack`**: `track.mode`, el evento `cuechange`, y `track.activeCues`.
7. Construir una **transcripción** siempre presente a partir de los mismos cues que usa una pista de subtítulos, para que la información nunca viva en un solo lugar.
8. Aplicar juntas la regla de "el audio solo empieza por acción del usuario" y la regla de movimiento reducido, en una sola escena que tiene tanto sonido como elementos visuales en movimiento.

## Requisitos previos

- **Fundamentos de WebXR (4.1)**: el starter de esta lección es la exhibición terminada de 4.1, incluyendo su botón "Enter VR". Deberías sentirte cómoda con `renderer.xr`, `OrbitControls`, y `renderer.setAnimationLoop`.
- **Entrada e interacción en XR (4.2)**, **Diseño de UX espacial (4.3)**, y **Accesibilidad y ética en experiencias inmersivas (4.4)**, si las completaste, son contexto útil pero no obligatorio.
- **My XR Camp**, la pequeña app propia de la Fase 2: la misma idea de construir una sola cosa a lo largo de varias lecciones continúa aquí, con la exhibición virtual ganando una voz.

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Un navegador de escritorio basado en Chromium (Chrome o Edge) | WebGL 2, la Web Audio API, y DevTools | Gratis |
| Un servidor local | Los módulos, los mapas de importación, y los archivos de medios necesitan `http://` | Gratis |
| Python 3 con `numpy` (opcional) | Solo necesario si quieres regenerar o agregar tus propios sonidos procedurales, tal como se hicieron los propios archivos `assets/*.wav` de esta lección | Gratis |

La biblioteca `three` se carga desde `cdn.jsdelivr.net`; si eso es lento o está bloqueado donde vives, descarga los archivos fijados una vez donde sí funcionen y cambia el mapa de importación para que apunte a tu propia copia. Nada en esta lección necesita ninguna cuenta de pago, clave de API, ni herramienta de texto a voz.

## Lo que vas a construir

La exhibición de 4.1 gana una voz. Cada uno de los tres pedestales ahora reproduce su propio sonido silencioso y en bucle con `THREE.PositionalAudio`, así que el balance entre ellos cambia mientras te mueves por la exhibición, la misma idea en la que confía una guía de audio real, o tus propios oídos. Una pequeña pantalla sobre la exhibición, construida a partir de un `<canvas>` redibujado en lugar de un archivo de video, muestra una breve guía de audio con subtítulos; los mismos subtítulos y una transcripción completa siempre son legibles en la página, hayas presionado reproducir o no.

Todo el audio de este proyecto se genera de forma procedural (ver [`ATTRIBUTION.md`](./ATTRIBUTION.md)): no se usó ni se necesita ningún equipo de grabación, ninguna biblioteca de sonido con licencia, ni ninguna herramienta de texto a voz. Nada se reproduce hasta que se lo pides.

La solución de referencia está en [`completed/`](completed/). El starter es la exhibición terminada de 4.1 con tres archivos nuevos (`js/audio.js`, `js/video.js`, `js/captions.js`) y pequeños añadidos en otros tres: diez TODOs en total.

## Guía de carpetas

```text
05-spatial-audio-media-and-presence/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html, styles.css    # The page, audio guide player, captions, and transcript (finished)
│   └── js/
│       ├── app.js                # The engine, from 4.1: TODOs 3, 9
│       ├── exhibit.js            # The objects, from 4.1 (finished)
│       ├── xr.js                 # Entering and leaving VR, from 4.1 (finished)
│       ├── audio.js              # New: pedestal spatial sound. TODOs 1-2
│       ├── video.js              # New: the canvas-driven story screen. TODO 6
│       ├── captions.js           # New: reading WebVTT cues. TODOs 7-8
│       ├── describe.js           # The description: TODO 10
│       └── main.js               # Wiring the page: TODOs 4-5
├── completed/            # Reference solution: open this last
├── challenges/           # Three challenges: Foundation is required
├── tests/checklist.md    # Self-review before you submit
├── assets/               # Procedurally generated .wav files and captions.vtt
└── screenshots/
```

## Configuración

1. Copia el starter dentro de tu carpeta `virtual-exhibit`, junto a tu trabajo anterior, y súbelo con Git (commit).
2. Inicia tu servidor local y abre `index.html`. La exhibición de escritorio y el panel "Enter VR" funcionan exactamente igual que al final de 4.1. El reproductor de la guía de audio, el párrafo de subtítulos, y la lista de transcripción son visibles pero todavía no hacen nada.
3. Mira `assets/` antes de empezar: tres sonidos cortos de pedestal, una pista de guía más larga, y `captions.vtt`, todos ya generados para ti. No necesitas Python para esta lección a menos que intentes los retos Creativo o Fundamento.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración: copia la exhibición terminada de 4.1 como el starter de esta lección, y lee el HTML nuevo | La exhibición sin cambios, más un reproductor de guía de audio y una transcripción vacía |
| 2 | Paso 1: `THREE.PositionalAudio` y su configuración de distancia (TODO 1) | Cada sonido de pedestal se carga con su modelo de distancia configurado, aunque todavía nada se reproduce |
| 3 | Paso 2: adjuntar un sonido a la malla de su pedestal (TODO 2) | Cada sonido hereda la posición propia de su pedestal |
| 4 | Paso 3: el `AudioListener`, agregado a la cámara (TODO 3) | Los sonidos ahora miden la distancia desde donde realmente está la cámara |
| 5 | Paso 4: reanudar el `AudioContext` dentro de un clic real (TODO 4) | Presionar "Start pedestal sounds" produce sonido, por primera vez |
| 6 | Paso 5: conectar el selector de modelo de distancia (TODO 5) | Cambiar entre `linear`, `inverse`, y `exponential` cambia la caída en vivo |
| 7 | Paso 6: dibujar un cuadro en el canvas de la pantalla de historia (TODO 6) | La pantalla muestra un degradado en movimiento y texto de subtítulo |
| 8 | Paso 7: leer subtítulos con `cuechange` (TODO 7) | El párrafo de subtítulos se actualiza mientras se reproduce la guía de audio |
| 9 | Paso 8: construir la transcripción a partir de la misma pista (TODO 8) | La lista de transcripción aparece, y se mantiene incluso cuando nada se está reproduciendo |
| 10 | Paso 9: conectar la pantalla de historia al bucle de renderizado (TODO 9) | La pantalla sigue animándose en cada cuadro, en sincronía con el resto de la escena |
| 11 | Paso 10: extender la descripción de la escena (TODO 10) | La descripción reporta si hay sonidos reproduciéndose, qué modelo de distancia está elegido, y el subtítulo actual |
| 12 | Pruebas: movimiento reducido, uso solo con teclado, y la alternativa 2D/3D, según [`docs/en/xr-accessibility.md`](../../docs/en/xr-accessibility.md) | Confirmación de que el sonido, los subtítulos, y la transcripción funcionan todos sin WebGL, y de que nada se reproduce automáticamente |
| 13 | [`tests/checklist.md`](tests/checklist.md) | Una exhibición terminada, que cuenta una historia |
| 14 | Un reto de extensión, y luego **Entregando tu trabajo** | Tu extensión elegida, y la exhibición lista para entregar |

### Paso 1: `PositionalAudio` y su configuración de distancia (TODO 1)

`THREE.PositionalAudio` envuelve el `PannerNode` de la Web Audio API. `setRefDistance(1.2)` establece la distancia, en los propios metros de esta escena, a la que un sonido se reproduce a su volumen grabado; `setRolloffFactor(1.5)` controla qué tan rápido se desvanece más allá de eso; `setMaxDistance(10)` limita hasta dónde llega el cálculo de distancia (los tres verificados directamente contra el propio código fuente de three.js r186, `src/audio/PositionalAudio.js`). `setDistanceModel('inverse')` elige `'inverse'`, el propio valor por defecto de la Web Audio API (verificado en la referencia de `PannerNode` de MDN), de entre los tres modelos que define.

### Paso 2: adjuntar un sonido a su pedestal (TODO 2)

`THREE.Audio` y sus subclases son instancias de `Object3D`, exactamente como una malla o una luz. `mesh.add(sound)` convierte el sonido en hijo de la malla de ese pedestal: en cada cuadro, three.js lee la posición mundial del sonido directamente del `matrixWorld` de su padre, el mismo mecanismo que usa una luz o una cámara, y se la pasa al `PannerNode` subyacente.

### Paso 3: el `AudioListener` (TODO 3)

Un `AudioListener` representa los "oídos" en la escena: el punto desde el que cada `PositionalAudio` mide su distancia y dirección. `camera.add(listener)` lo mantiene exactamente donde está mirando quien observa, tanto en la vista de escritorio como dentro de un visor WebXR, sin código adicional necesario para ninguno de los dos modos.

### Paso 4: iniciar el audio desde un clic real (TODO 4)

Los navegadores inician cada `AudioContext` **suspendido** hasta que un gesto genuino del usuario lo reanuda; el propio código fuente de three.js no llama a `resume()` por ti (verificado en `src/audio/Audio.js` de r186). La propia regla de esta lección, "nada suena hasta que lo pides", resulta necesitar exactamente lo mismo: llamar a `listener.context.resume()` y luego a `play()` en cada sonido, todo dentro del manejador `click` de un solo botón.

### Paso 5: comparar modelos de distancia (TODO 5)

Llamar de nuevo a `setDistanceModel()` en un sonido que ya se está reproduciendo cambia su comportamiento de inmediato: no hace falta detenerlo ni reiniciarlo. Conectar el evento `change` del `<select>` para llamarlo en cada sonido de pedestal convierte los tres modelos de distancia de una definición que lees en algo cuya diferencia puedes escuchar, en vivo, mientras caminas por la exhibición.

### Paso 6: el canvas de la pantalla de historia (TODO 6)

`THREE.CanvasTexture` no vigila su propio canvas: después de cada dibujo, `texture.needsUpdate = true` le dice a three.js que vuelva a cargar los píxeles a la GPU antes del siguiente cuadro. Sin esa línea, lo que se dibujó primero se queda en la pantalla para siempre. Un `THREE.VideoTexture` real no necesita esta línea en absoluto: en su lugar comprueba el propio `readyState` del elemento de video en cada cuadro (ver `src/textures/VideoTexture.js` de r186), que es la principal diferencia práctica entre ambos, explorada más a fondo en el reto Explorador.

### Paso 7: leer subtítulos con `cuechange` (TODO 7)

El `TextTrack` de un elemento `<track>` empieza por defecto en `mode: 'disabled'`, que no carga nada en absoluto. Establecer `track.mode = 'hidden'` carga sus cues y dispara `cuechange` cada vez que cambia el conjunto de cues activos, sin activar además el renderizado propio de subtítulos del navegador, que esta lección no usa: en su lugar tiene su propio párrafo de subtítulos y texto en canvas.

### Paso 8: la transcripción, a partir de los mismos cues (TODO 8)

Los cues de un `<track>` no están disponibles en el instante en que el elemento existe en el DOM. El evento `'load'` del propio elemento `<track>`, no del elemento `<audio>`, se dispara una vez que su archivo WebVTT realmente se descargó y analizó; ese es el momento de leer `track.cues` y construir los elementos de lista de la transcripción.

### Paso 9: conectar la pantalla de historia al bucle de renderizado (TODO 9)

`onFrame()` de `app.js` deja que cualquier módulo registre una función para ejecutarse una vez por cuadro renderizado, en escritorio o en XR, sin necesitar una referencia al renderer ni a su propio bucle de renderizado. `drawFrame()` de `video.js` se registra así desde `main.js`, lo cual mantiene a `app.js` a cargo de exactamente un bucle de renderizado, el mismo principio que 4.1 ya estableció para el propio bucle de cuadro XR.

### Paso 10: la descripción de la escena lo reporta todo (TODO 10)

`describeExhibit()` ya le decía a una persona que usa lector de pantalla qué había en la exhibición. Ahora también necesita decir si los sonidos de pedestal se están reproduciendo, qué modelo de distancia está elegido en ese momento, y qué dice actualmente el subtítulo de la pantalla de historia, para que una estudiante que no puede ver el canvas ni escuchar el audio siga sabiendo exactamente en qué estado está la escena.

## Explicación del código clave

**`new THREE.PositionalAudio(listener)`** crea un sonido espacial al que hay que darle un buffer (`setBuffer()`) antes de que pueda reproducirse, y que debe ser descendiente de algún `Object3D` para tener una posición con sentido; un `PositionalAudio` sin padre se comporta como si estuviera en el origen de la escena.

**`listener.context.resume()`** reanuda el `AudioContext` compartido de Web Audio que comparten todos los `THREE.Audio` y `THREE.PositionalAudio` de una escena a través de su `AudioListener` común; debe llamarse desde dentro de un gesto de usuario real, y three.js nunca lo llama por ti.

**`texture.needsUpdate = true`** es lo que hace que un `CanvasTexture` (o cualquier textura cuya fuente sigue cambiando) realmente vuelva a llegar a la GPU; `VideoTexture` establece esto por ti automáticamente, una vez por cuadro, cada vez que el `<video>` subyacente tiene un cuadro nuevo listo.

**`track.mode = 'hidden'`** carga los cues de un `<track>` y dispara sus eventos sin dibujar la propia superposición de subtítulos del navegador; `'showing'` también dibujaría esa superposición (útil para un `<video>` real, no usado por el `<audio>` de esta lección), y el valor por defecto, `'disabled'`, no carga nada en absoluto.

**`track.activeCues`** es una lista en vivo de cada `VTTCue` actualmente "en pantalla" en el momento actual del audio; para un archivo de subtítulos sin cues superpuestos, como el de esta lección, contiene como máximo un cue.

## Accesibilidad 3D y XR

- La descripción de la escena (`#scene-description`) reporta el estado de los sonidos de pedestal, el modelo de distancia elegido, y el subtítulo actual de la pantalla de historia, junto con todo lo que ya describía 4.1.
- Ningún sonido se reproduce automáticamente: tanto los sonidos de pedestal como la guía de audio esperan un clic real, ya sea en "Start pedestal sounds" o en el propio botón nativo de reproducir de la guía de audio.
- La cámara nunca se mueve por sí sola, y nada del audio espacial cambia eso: `PositionalAudio` solo cambia el volumen y el balance estéreo, nunca el punto de vista de nadie.
- Cada acción disponible a través del sonido (escuchar qué pedestal está más cerca) tiene una alternativa completa e igual de capaz en texto: la lista siempre presente de la exhibición, el párrafo de subtítulos, y la transcripción.
- Con el movimiento reducido activado, tanto el giro de la piedra de jade como la propia animación de la pantalla de historia empiezan en pausa; esto no tiene efecto sobre el sonido, ya que la preferencia de movimiento reducido trata sobre movimiento, no sobre audio.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| Ningún audio se reproduce automáticamente; siempre se requiere un clic primero | Buena práctica | El sonido con reproducción automática desorienta, especialmente con audífonos o un visor, y algunas estudiantes dependen de su propio audio de lector de pantalla, que un sonido en competencia ahogaría. |
| La guía de audio tiene una alternativa de texto sincronizada (subtítulos) | 1.2.2 | El elemento `<track kind="captions">` da una alternativa de texto para el contenido de audio de la guía, sincronizada con él. |
| Existe una transcripción completa, independiente de si el audio alguna vez se reprodujo | 1.2.1 | La transcripción en `#transcript` lleva la misma información que la guía de audio, para cualquiera que no pueda o no quiera reproducir audio. |
| El párrafo de subtítulos (`#caption-text`) es una región dinámica | Buena práctica | Una persona que usa lector de pantalla escucha cada cambio de subtítulo en el momento en que ocurre, sin necesidad de seguir releyendo la página. |
| Los cambios de estado del sonido y del modelo de distancia se reflejan en la descripción de la escena | Buena práctica | Una estudiante que no puede ver la exhibición ni los controles igual tiene un lugar que dice exactamente qué está pasando. |
| La animación de la pantalla de historia respeta `prefers-reduced-motion`, y un botón de Pausa la controla | 2.2.2 | Una pantalla que se sigue moviendo por sí sola puede ser una distracción o una molestia para algunas estudiantes; tanto la comprobación automática como el botón manual devuelven el control. |

## Consideraciones de rendimiento

Decodificar tres archivos `.wav` cortos y uno más largo es barato: juntos ocupan menos de 1.5 MB, decodificados una vez por la Web Audio API y luego reproducidos en bucle o desde memoria, no transmitidos en streaming. Redibujar un canvas de 512×288 una vez por cuadro y volver a cargarlo como textura es un costo pequeño y constante, bien dentro de lo que maneja una GPU de nivel teléfono junto con tres mallas primitivas simples; un canvas mucho más grande, o actualizar varias texturas así a la vez, es donde este enfoque empezaría a costar más que un video real. Three.js ya actualiza la posición de cada `PositionalAudio` a partir del `matrixWorld` de su padre como parte de las mismas actualizaciones de matriz que el renderer hace en cada cuadro de todos modos, así que el propio audio espacial no agrega ningún recorrido adicional por cuadro del grafo de escena.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Llamar a `sound.play()` antes de que el `AudioContext` se haya reanudado | La llamada tiene éxito sin ningún error, pero no se escucha nada | Llama primero a `listener.context.resume()`, dentro del mismo manejador de clic |
| Olvidar `mesh.add(sound)` | El sonido se reproduce al mismo volumen en todas partes, ya que mide la distancia desde el origen de la escena | Adjunta cada `PositionalAudio` al objeto del que debería parecer que proviene |
| Dejar el `mode` de un `<track>` en su valor por defecto | `cuechange` nunca se dispara, y `track.cues` se queda vacío | Establece `track.mode = 'hidden'` (o `'showing'`) antes de depender de cualquiera de los dos |
| Olvidar `texture.needsUpdate = true` después de dibujar en el canvas de un `CanvasTexture` | La pantalla muestra solo el primer cuadro, para siempre | Establécelo cada vez, justo después de las llamadas de dibujo que cambiaron el canvas |
| Escribir subtítulos que describen habla que el audio en realidad no contiene | Los subtítulos engañan a una estudiante sobre lo que está escuchando | Di con claridad, como hace el propio `ATTRIBUTION.md` de este proyecto, cuando el audio no es habla real |
| Leer `track.cues` inmediatamente después de crear un elemento `<track>` | La lista está vacía; el archivo aún no se ha cargado | Espera al propio evento `'load'` del `<track>`, o comprueba `readyState === 2` |

## Solución de problemas

**Presionar "Start pedestal sounds" no produce sonido, sin ningún error.** El `AudioContext` probablemente sigue suspendido. Comprueba que `listener.context.resume()` se ejecuta antes de `play()`, dentro del propio manejador de clic. En Firefox, comprueba que `about:preferences#privacy` no haya bloqueado la reproducción automática para todo el sitio; un clic directo debería seguir estando permitido de todos modos.

**Los sonidos se reproducen a volumen completo en todas partes, sin efecto de distancia.** Comprueba que `mesh.add(sound)` se ejecutó para cada pedestal (TODO 2), y que el sonido no siga emparentado a la propia escena.

**El párrafo de subtítulos nunca se actualiza.** Comprueba que `track.mode` esté establecido en `'hidden'`, y no dejado en su valor por defecto; el panel Elements de DevTools puede mostrar el `readyState` y el `mode` actuales de un `<track>` si lo inspeccionas directamente.

**La transcripción se queda vacía.** El evento `'load'` del `<track>` puede haberse disparado ya antes de que se adjuntara tu listener, especialmente en un servidor local rápido. Comprueba la alternativa `readyState === 2` en `buildTranscript()`.

**La pantalla de historia muestra solo un cuadro, o está en blanco.** Comprueba que `texture.needsUpdate = true` se ejecuta después de cada dibujo en `drawFrame()`, y que `app.onFrame()` realmente lo está llamando (TODO 9): un error común es completar `drawFrame()` correctamente pero olvidar conectarlo al bucle de renderizado.

**En Safari, el botón de subtítulos de la guía de audio no aparece.** Esto es esperado: el menú nativo de subtítulos de Safari en `<audio>` (a diferencia de `<video>`) es limitado. Esta lección no depende de él: el párrafo de subtítulos y la transcripción se leen directamente de los cues del mismo `<track>` en JavaScript, y funcionan igual en cualquier navegador actual.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.md)**: dale a la pantalla de historia su propio sonido espacial silencioso, adjuntado de la misma forma en que se adjuntan los sonidos de los pedestales.
2. **[Creativo](challenges/challenge-2.md)**: agrega una segunda pista de subtítulos en tu propio idioma, y regenera el sonido de un pedestal con parámetros que signifiquen algo para ti.
3. **[Explorador](challenges/challenge-3.md)**: reemplaza la pantalla de historia basada en canvas por un `THREE.VideoTexture` real, usando un clip corto propio.

## Cómo entregar tu trabajo

1. Completa cada elemento de [`tests/checklist.md`](tests/checklist.md).
2. Toma capturas de pantalla: la exhibición antes de que empiece cualquier sonido, la guía de audio reproduciéndose con su subtítulo visible, la transcripción, y tu reto de extensión elegido.
3. Guárdalas, junto con este proyecto, en tu diario de aprendizaje y portafolio. Cuando abra la comunidad de XR Camp, compártelas ahí.
4. En tu diario, responde: ¿por qué un `AudioContext` empieza suspendido, y qué podría salir mal para una estudiante si un proyecto real ignorara eso e intentara reproducir sonido en el momento en que carga su página?

## Lecturas adicionales

- [W3C: Web Audio API](https://www.w3.org/TR/webaudio/) (en inglés)
- [MDN: Web Audio spatialization basics](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Web_audio_spatialization_basics) (en inglés)
- [MDN: `PannerNode`](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode) (en inglés)
- [W3C: WebVTT: The Web Video Text Tracks Format](https://www.w3.org/TR/webvtt1/) (en inglés)
- [Documentación de three.js: `PositionalAudio`](https://threejs.org/docs/#api/en/audio/PositionalAudio) (en inglés)

## Mujeres que conviene conocer

**Nonny de la Peña** es una periodista estadounidense ampliamente reconocida por crear el "periodismo inmersivo". Su obra *Hunger in Los Angeles* fue el primer documental en VR y la primera pieza en VR de New Frontier en Sundance, en 2012; luego fundó Emblematic Group, y ahora es directora fundadora del programa de Narrativa y Medios Emergentes de Arizona State University.

Su trabajo puso una historia real, contada con sonido y una escena alrededor de quien mira, en el centro de para qué podía servir un visor, años antes de que existieran las herramientas de esta lección. Los subtítulos, la transcripción, y los sonidos espaciales silenciosos que construiste aquí son piezas pequeñas y actuales de la misma idea: presencia e historia, trabajando juntas, y siempre con una entrada para quien no puede, o prefiere no, depender solo del audio.

> **Nota editorial: verificar antes de publicar.** Los datos biográficos de las secciones «Mujeres que conviene conocer» deben verificarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

La **Web Audio API**, detrás de cada `AudioContext`, `PannerNode`, y el `THREE.PositionalAudio` de esta lección, la publica el Web Audio Working Group del W3C; a mediados de 2026 es un Working Draft dentro del camino hacia Recommendation, aún no una Recommendation terminada. **WebVTT**, el formato de archivo de subtítulos detrás de `assets/captions.vtt` y el elemento `<track>`, lo publica el Timed Text Working Group del W3C, y está más avanzado: un Candidate Recommendation Draft. Three.js implementa ambas funciones subyacentes de la plataforma web en lugar de inventar las suyas propias: `PositionalAudio` es un envoltorio delgado alrededor del `PannerNode` estándar, y la API `TextTrack` de `<track>` se usa directamente, sin cambios, en `captions.js`.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
