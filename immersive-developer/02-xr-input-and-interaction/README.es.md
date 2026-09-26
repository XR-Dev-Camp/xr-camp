# Entrada e interacción en XR

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `immersive-developer` · **Lección:** `xr-input-and-interaction-02` · **Tiempo:** unas 12 horas · 16 sesiones de 45 minutos · unas 4 semanas con 4 sesiones por semana

---

> Construye un laboratorio de interacción en XR.

---

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Leer los eventos **`select`**/`selectstart`/`selectend` y **`squeeze`**/`squeezestart`/`squeezeend` de WebXR, y las propiedades de **`XRInputSource`** (`targetRayMode`, `handedness`, `hand`, `gamepad`) que describen qué los disparó.
2. Mostrar un modelo real de control con `renderer.xr.getControllerGrip()` y **`XRControllerModelFactory`**, y una mano rastreada con `renderer.xr.getHand()` y **`XRHandModelFactory`**.
3. Explicar **gaze** (mirada) y **transient-pointer** (puntero transitorio) como valores de `targetRayMode` distintos de `tracked-pointer`, y cuándo una página podría encontrarse con cada uno.
4. Construir una interacción basada en rayo ("a distancia"), un menú dentro del mundo virtual al que apuntas y seleccionas, y un **agarre directo** basado en proximidad, y explicar cuándo conviene cada estilo de interacción para una tarea.
5. Dar retroalimentación visual y, cuando sea compatible, **háptica** para una selección, sin depender nunca solo de lo háptico.
6. Solicitar una sesión **immersive-ar** con la función obligatoria `'hit-test'`, y usar `XRHitTestSource` y `frame.getHitTestResults()` para colocar un objeto sobre una superficie real.
7. Explicar por qué un dispositivo solo puede ejecutar una sesión de WebXR a la vez, y diseñar los botones de una página según esa restricción.
8. Ofrecer una alternativa completa, sin XR, por teclado o 2D, para cada interacción que este laboratorio ofrece en VR o AR.
9. Probar de forma responsable funciones de WebXR cuya compatibilidad varía mucho entre dispositivos (seguimiento de manos, hit-test), y decir con claridad cuando algo no se pudo confirmar.

## Requisitos previos

- **Desarrolladora Inmersiva, Fundamentos de WebXR (4.1)**: el starter de esta lección es la exhibición terminada de 4.1, ya compatible con WebXR. Ya deberías sentirte cómoda con `renderer.xr.enabled`, solicitar y terminar una sesión, y los propios eventos `sessionstart`/`sessionend` de `renderer.xr`.
- **Desarrolladora Web3D, Fundamentos de three.js (3.4)**: `WebGLRenderer`, `THREE.Group`, y liberar geometrías y materiales.
- **My XR Camp**, la pequeña app propia de la Fase 2: esta lección no la extiende directamente, pero la misma idea de construir una sola cosa a lo largo de varias lecciones continúa aquí, con la exhibición ganando manos y un menú flotante propio.

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Un navegador de escritorio basado en Chromium (Chrome o Edge) | Compatibilidad con WebXR y DevTools | Gratis |
| La extensión de navegador [Immersive Web Emulator](https://github.com/meta-quest/immersive-web-emulator) | Probar sesiones con controles sin tener un visor | Gratis |
| Un visor VR con controles o seguimiento de manos (opcional) | Pruebas en dispositivo real de controles, manos y háptica | Varía; no es obligatorio |
| Un teléfono o visor compatible con AR (opcional) | Pruebas en dispositivo real de colocación con hit-test | Varía; no es obligatorio |
| Un servidor local | Los módulos, los mapas de importación y la propia WebXR necesitan `http://` | Gratis |

Immersive Web Emulator puede simular de forma confiable una sesión con controles; su compatibilidad para simular una mano rastreada o una superficie de hit-test en AR varía según la versión y la plataforma, así que trata todo lo que no pueda mostrar como no probado, no como roto, y confírmalo en un dispositivo real cuando puedas. La biblioteca `three` se carga desde `cdn.jsdelivr.net`; si eso es lento o está bloqueado, descarga los archivos fijados una vez donde sí funcionen y cambia el mapa de importación para que apunte a tu propia copia.

## Lo que vas a construir

La exhibición WebXR de 4.1 se convierte en un **laboratorio de interacción**: un pequeño menú flotante al que apuntas con un control, una mano rastreada, o un toque en la pantalla; una piedra de jade que puedes recoger directamente estirando la mano hacia ella; y un segundo tipo de sesión de WebXR, separado, AR inmersiva, que te permite colocar una piedra de jade virtual sobre una superficie real de tu propia habitación. Cada una de estas funciones tiene una alternativa completa en 2D o por teclado, así que nada en esta lección requiere tener un visor para probarlo.

La solución de referencia está en [`completed/`](completed/). El starter es la exhibición terminada de 4.1, compatible con WebXR, con tres archivos nuevos (`controllers.js`, `menu.js`, `ar.js`) y pequeños añadidos en otros dos: diez TODOs, numerados del 2 al 11. El paso 1 no necesita código.

## Guía de carpetas

```text
02-xr-input-and-interaction/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html, styles.css    # The page, controls, and every new panel (finished)
│   └── js/
│       ├── app.js                # The engine, from 4.1, plus onXRFrame() (finished)
│       ├── exhibit.js            # The objects, from 4.1 (finished)
│       ├── xr.js                 # Entering/leaving VR, from 4.1 (finished)
│       ├── menu.js               # The in-world menu's geometry and labels (finished)
│       ├── describe.js           # The description: TODO 7
│       ├── controllers.js        # New: controllers, hands, ray, grab. TODOs 2-6
│       ├── ar.js                 # New: AR sessions and hit-test placement. TODOs 8-10
│       └── main.js               # Wiring the page: TODO 11
├── completed/            # Reference solution: open this last
├── challenges/           # Three challenges: Foundation is required
├── tests/checklist.md    # Self-review before you submit
├── assets/
└── screenshots/
```

## Configuración

1. Copia el starter dentro de tu carpeta `virtual-exhibit`, junto a tu trabajo anterior, y súbelo con Git (commit).
2. Inicia tu servidor local y abre `index.html`. La exhibición se comporta exactamente como la dejó 4.1: el panel "Enter VR" funciona, pero el menú dentro del mundo, el agarre directo, "Enter AR", y las nuevas alternativas 2D todavía no hacen nada.
3. Si aún no lo hiciste, instala la extensión de navegador Immersive Web Emulator.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración: copia la exhibición terminada de 4.1, y lee los tres archivos nuevos | Una exhibición de escritorio sin cambios, más paneles nuevos vacíos |
| 2 | Paso 1: el grip del control y su modelo (TODO 2) | Aparece un modelo de control en VR, en un dispositivo que tenga uno |
| 3 | Paso 2: el modelo de mano rastreada (TODO 3) | Se renderiza una mano rastreada, en un dispositivo compatible con seguimiento de manos |
| 4 | Paso 3: el rayo de apuntado (TODO 4, parte 1) | Un rayo se extiende desde una fuente de entrada conectada |
| 5 | Paso 3, continuación: `'connected'`/`'disconnected'` (TODO 4, parte 2) | El rayo aparece solo cuando hay realmente presente una fuente de entrada |
| 6 | Paso 4: seleccionar el menú del mundo con el rayo (TODO 5) | Apuntar a un botón y seleccionarlo lo resalta y lo activa |
| 7 | Paso 4, continuación: retroalimentación háptica | Un control compatible vibra brevemente al seleccionar |
| 8 | Paso 5: agarre directo con squeeze (TODO 6, parte 1) | Mantener presionado el botón de grip cerca de la piedra de jade la recoge |
| 9 | Paso 5, continuación: soltar, y el pellizco de una mano para agarrar (TODO 6, parte 2) | Soltar regresa la piedra a su lugar; una mano rastreada también puede agarrarla |
| 10 | Paso 6: la descripción de la escena consciente de la interacción (TODO 7) | La descripción nombra la entrada conectada y el estado de la piedra |
| 11 | Paso 7: solicitar una sesión AR con hit-test (TODO 8) | "Enter AR" solicita una sesión que requiere la función `hit-test` |
| 12 | Paso 7, continuación: la fuente de hit-test y la mira (TODO 9) | Una mira rastrea una superficie real y plana en cada cuadro |
| 13 | Paso 8: colocar un objeto al seleccionar (TODO 10) | Seleccionar en AR coloca la piedra de jade en la posición de la mira |
| 14 | Paso 9: conectando todo, y las alternativas 2D (TODO 11) | Un laboratorio de interacción completo, con cada acción XR con su gemela 2D o de teclado |
| 15 | Pruebas con Immersive Web Emulator, y un visor o teléfono real si tienes uno | Confirmación de qué funciona, y una nota honesta sobre qué no se pudo probar |
| 16 | [`tests/checklist.md`](tests/checklist.md), un reto de extensión, y luego **Entregando tu trabajo** | Un laboratorio de interacción terminado |

### Paso 1: el grip del control y su modelo (TODO 2)

`renderer.xr.getControllerGrip(index)` devuelve un `THREE.Group` que three.js mantiene actualizado según la **pose de grip** de la fuente de entrada: dónde debería estar un objeto virtual si se sostuviera en la mano de quien lo usa. Un grupo vacío no dibuja nada: `XRControllerModelFactory.createControllerModel(grip)` es lo que lo hace visible, leyendo el propio arreglo `profiles` de la fuente de entrada conectada (una lista de cadenas que identifica el dispositivo exacto) y buscando en tiempo real un modelo 3D que coincida, en lugar de dibujar una forma genérica para cada control.

### Paso 2: el modelo de mano rastreada (TODO 3)

`renderer.xr.getHand(index)` es la misma idea para una mano rastreada, y `XRHandModelFactory.createHandModel(hand, 'mesh')` construye una malla articulada que sigue las 25 articulaciones que reporta el módulo Hand Input de WebXR: la muñeca, cuatro para el pulgar, y cinco para cada uno de los otros cuatro dedos. Pasar `'boxes'` o `'spheres'` en lugar de `'mesh'` dibuja formas simples de marcador de posición en cada articulación, útil para probar sin descargar un modelo (ver el reto Explorador).

### Paso 3: el rayo de apuntado (TODO 4)

`renderer.xr.getController(index)` devuelve un tercer grupo, para el **espacio del rayo objetivo** de la fuente de entrada: no es la misma pose que el grip, ya que el rayo de un control se inclina ligeramente respecto a cómo se sostiene físicamente, y el rayo de una mano rastreada sigue su dedo índice en lugar de su palma. Una `THREE.Line` dibujada a lo largo del propio eje local -Z de este grupo apunta, por definición, exactamente hacia donde WebXR dice que apunta la fuente de entrada. `'connected'` y `'disconnected'` se disparan en este grupo cada vez que una sesión realmente empieza o deja de suministrar una fuente de entrada coincidente, por lo cual el rayo solo aparece cuando de verdad hay una presente, en lugar de dibujarse para dos asientos que podrían quedar vacíos toda la sesión.

### Paso 4: seleccionar el menú del mundo con el rayo (TODO 5)

Seleccionar el menú es interacción "a distancia": nada de esto depende de qué tan cerca esté la fuente de entrada de los botones, solo de hacia dónde apunta. `selectstart` se dispara sin ninguna geometría propia útil, así que este paso lanza un rayo desde la posición mundial propia del control y su dirección hacia adelante contra las tres mallas de botón de `menu.js`, usando el `THREE.Raycaster` común. Un acierto ejecuta la cadena `action` que lleva el botón, y da dos tipos de retroalimentación: `setButtonHighlight()` (visual, de `menu.js`) y un pulso corto de `GamepadHapticActuator.pulse()`, intentado solo donde la fuente de entrada realmente tiene uno.

### Paso 5: agarre directo (TODO 6)

Agarrar la piedra de jade es lo opuesto al Paso 4: interacción "directa", o "cercana", donde solo importa la distancia real al objeto, no hacia dónde apunta nada. `squeezestart`/`squeezeend` se disparan para el botón físico de grip de un control; una mano rastreada no tiene un gesto de squeeze estandarizado, así que su pellizco (reportado, como el gatillo de un control, como `select`) hace el mismo trabajo cada vez que la mano está lo bastante cerca de la piedra en lugar de apuntar al menú. `Object3D.attach()` cambia el padre de la piedra a la fuente de entrada que la agarró, manteniendo exactamente su posición y rotación actuales, así que nada salta en el momento del agarre; soltar lo revierte, restaurando de inmediato el padre, la posición y la rotación originales de la piedra.

### Paso 6: la descripción de la escena consciente de la interacción (TODO 7)

La descripción ya cambió una vez, en 4.1, para decir si había un visor activo. Ahora también dice qué tipo de entrada está conectada (una mano, un control, o ninguna todavía) y qué hacen los gestos de esa entrada, y si la piedra de jade está sostenida en ese momento. Una persona que usa lector de pantalla y depende de este párrafo debería recibir exactamente tanta información como ve una persona vidente, ni más ni menos.

### Paso 7: solicitar una sesión AR con hit-test (TODO 8)

`immersive-ar` se solicita de la misma forma en que se solicitó `immersive-vr` en 4.1, con una diferencia: `requiredFeatures: ['hit-test']`. No hay forma de detectar `'hit-test'` por adelantado de la manera en que `isSessionSupported()` comprueba un modo de sesión; un runtime que no puede proveer una función obligatoria simplemente rechaza toda la llamada a `requestSession()`, por lo cual `enterAR()` la envuelve en try/catch y reporta `error.message` en lugar de suponer que tuvo éxito.

### Paso 8: la fuente de hit-test y la mira, y luego colocar un objeto (TODOs 9-10)

Una fuente de hit-test se solicita contra el espacio de referencia **`'viewer'`** -anclado hacia donde apunta el propio dispositivo- así que `frame.getHitTestResults(source)`, llamado una vez por cuadro XR a través de `app.onXRFrame()`, reporta qué superficie real hay justo enfrente en ese momento. El `getPose()` de cada resultado devuelve una matriz de transformación completa, que la mira copia directamente; seleccionar descompone esa misma matriz en una posición y rotación para la piedra de jade colocada, ya que una `Matrix4` no se puede asignar directamente a las propiedades `position` o `quaternion` de un `Object3D`.

### Paso 9: conectando todo (TODO 11)

El último paso conecta todo: el menú del mundo se construye una vez y se agrega a la escena; `initInteraction()` se llama una vez, sin efecto negativo, sea cual sea la compatibilidad con WebXR que resulte tener este navegador; `initXR()` e `initAR()` desactivan cada uno el botón del otro mientras su propia sesión está activa, ya que un dispositivo solo puede ejecutar una sesión de WebXR a la vez; y "Lift jade stone" (levantar la piedra de jade) y "Place object (2D)" (colocar objeto (2D)) dan a las mismas dos ideas, agarrar y colocar, una forma que no necesita en absoluto visor, control, ni mano.

## Explicación del código clave

**`XRInputSource.targetRayMode`** es `'gaze'` (una dirección rastreada por cabeza u ojos, sin ningún control involucrado), `'tracked-pointer'` (un control o mano físicamente rastreados), `'screen'` (un toque en la pantalla de un teléfono, incluso en una sesión inline o AR), o `'transient-pointer'` (un puntero generado por el sistema operativo a partir de información sensible que no puede exponerse directamente, como intenciones basadas en la mirada, o de entradas sintetizadas por webdriver o por tecnología de asistencia) -no es lo mismo que `'gaze'`, aunque ambos puedan sustituir a "sin control físico".

**`renderer.xr.getController(i)`**, **`getControllerGrip(i)`**, y **`getHand(i)`** devuelven cada uno un `THREE.Group` distinto para la misma fuente de entrada: el espacio del rayo objetivo, el espacio de grip, y la pose general de la mano, respectivamente. Adjuntar el modelo equivocado al grupo equivocado es un error común y silencioso (ver "Errores comunes").

**`XRControllerModelFactory`** y **`XRHandModelFactory`** aceptan ambas un `GLTFLoader` opcional en su constructor y por defecto crean el suyo propio; sus métodos `createControllerModel(grip)`/`createHandModel(hand, profile)` buscan en tiempo real, en el registro de [WebXR input profiles](https://github.com/immersive-web/webxr-input-profiles), un modelo que coincida con el dispositivo conectado, por lo cual nada en este proyecto incluye su propio archivo de modelo de control o de mano.

**`session.requestHitTestSource({ space })`** y **`frame.getHitTestResults(source)`** son todo el módulo WebXR Hit Test usado aquí: el primero pregunta "dime qué superficies reales sigue encontrando este rayo", el segundo pregunta en cada cuadro "qué encontró justo ahora".

**`GamepadHapticActuator.pulse(intensity, duration)`**, alcanzado a través de `inputSource.gamepad.hapticActuators[0]`, es la llamada háptica más simple que expone WebXR; la compatibilidad es lo bastante inconsistente que cada llamada aquí está envuelta para que una vibración faltante nunca rompa una selección.

## Accesibilidad 3D y XR

- La descripción de la escena nombra cualquiera que sea la entrada conectada, y se actualiza en el instante en que eso cambia, en el momento en que la piedra de jade se agarra o se suelta, y en el momento en que se coloca algo.
- Cada interacción basada en rayo y cada interacción directa tiene un equivalente completo en 2D o por teclado: las tres acciones del menú también son botones comunes de la página, "Lift jade stone" refleja el agarre directo, y "Place object (2D)" refleja la colocación en AR.
- La cámara nunca se mueve por sí sola en ningún modo, incluido AR, donde el propio seguimiento de passthrough del dispositivo -no esta página- mueve la vista.
- La retroalimentación háptica siempre va acompañada de un resaltado visible, nunca es la única señal de que una selección funcionó.
- Entrar a VR o AR mantiene el mismo diseño sentado y de alcance cómodo que estableció 4.1: tanto el menú como la piedra de jade quedan al alcance fácil de la posición inicial sentada.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| La descripción de la escena nombra la entrada actual y el estado de interacción | 1.1.1, 4.1.2 | Una persona que usa lector de pantalla recibe la misma idea de "qué puedo hacer ahora" que ve una persona vidente. |
| Cada acción XR (menú, agarre, colocación en AR) tiene una alternativa fuera de XR | 2.1.1 | Todo el laboratorio se mantiene completamente usable con un mouse, un dedo o un teclado; VR y AR siempre son opcionales. |
| La retroalimentación háptica nunca es la única retroalimentación de una acción | Buena práctica | No toda fuente de entrada puede vibrar, y no toda estudiante lo sentiría aunque pudiera. |
| El texto visible del botón siempre coincide con lo que hace en ese momento | 2.5.3, 4.1.2 | "Enter VR"/"Exit VR" y "Place object (2D)"/"Remove placed object" dicen exactamente qué pasará a continuación. |
| La cámara nunca se mueve a menos que quien aprende (o, en AR, su propio dispositivo) la mueva | 2.2.2 | El movimiento no solicitado desorienta, y puede causar malestar físico real. |
| Agarrar y colocar un objeto nunca se animan a lo largo del tiempo | 2.3.3 | Los cambios de posición instantáneos no tienen riesgo de mareo por movimiento; una animación gradual sí lo tendría. |

## Consideraciones de rendimiento

Se crean por adelantado dos grupos de control y dos grupos de mano, haya o no una sesión que llegue a suministrar fuentes de entrada coincidentes: cuestan casi nada mientras están vacíos, ya que `XRControllerModelFactory` y `XRHandModelFactory` solo buscan y construyen un modelo una vez que realmente llega un evento `'connected'`. El raycast contra los tres botones del menú se ejecuta solo en `selectstart`, no en cada cuadro, así que no agrega costo por cuadro; el bucle de hit-test en `ar.js` sí se ejecuta en cada cuadro XR, pero `frame.getHitTestResults()` está diseñado exactamente para eso y no hace ningún recorrido de la escena propio como sí lo haría un `THREE.Raycaster`.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Adjuntar un modelo de control a `getController()` en lugar de a `getControllerGrip()` | El modelo queda en el ángulo equivocado, inclinado según el rayo objetivo en lugar del grip | Usa `getControllerGrip()` para modelos, `getController()` para rayos |
| Leer eventos `squeeze` en una mano rastreada | No pasa nada; las fuentes de entrada de mano no tienen un gesto de squeeze estandarizado | Usa `select` (pellizco) para el agarre de una mano, `squeeze` para el de un control |
| Suponer que `isSessionSupported('immersive-ar')` garantiza que hit-test funciona | `requestSession()` con `requiredFeatures: ['hit-test']` puede rechazarse de todos modos | Siempre envuélvela en try/catch, como con cualquier llamada a `requestSession()` |
| Dejar activados a la vez "Enter VR" y "Enter AR" | La segunda llamada a `requestSession()` falla, ya que una sesión ya está activa | Desactiva cada botón mientras la sesión del otro está activa (TODO 11) |
| Animar el regreso de la piedra de jade a su pedestal | Agrega movimiento que una estudiante con movimiento reducido no pidió, sin beneficio real | Restablece su posición al instante, como hace esta lección |
| Depender de un pulso háptico para confirmar una selección | Estudiantes con manos, o con controles sin háptica, no reciben ninguna confirmación | Siempre combínalo con `setButtonHighlight()` u otro cambio visible |

## Solución de problemas

**No aparece ningún modelo de control o mano en VR.** Comprueba que el listener 'connected' realmente se disparó: registra `event.data.profiles` para confirmar que llegó alguna fuente de entrada. Si llegó, comprueba que el modelo se adjuntó al grupo *grip*, no al grupo del control (rayo objetivo).

**El botón del menú nunca se resalta ni se activa.** Registra los aciertos del raycaster; una causa común es lanzar el rayo desde el `matrixWorld` del grupo equivocado, o olvidar normalizar la dirección del rayo después de `applyMatrix4()`.

**Agarrar funciona con un control pero no con una mano rastreada.** Las manos no tienen evento `squeeze`; comprueba que la llamada de agarre para una mano ocurre en `selectstart`, condicionada a que `controller.userData.inputSource?.hand` sea verdadero.

**"Enter AR" se rechaza de inmediato con un error relacionado con una función.** El dispositivo o navegador no es compatible con `hit-test`, aunque sí lo sea con `immersive-ar` en general. Esto es esperado en muchos teléfonos y visores; el mensaje de estado debería decirlo, y "Place object (2D)" debería seguir funcionando.

**La mira nunca aparece en AR.** Apunta el dispositivo hacia una superficie plana, bien iluminada y con textura (una pantalla o una pared en blanco puede ser demasiado uniforme para la detección de superficies de muchos dispositivos) y sostenlo firme un momento; `frame.getHitTestResults()` puede legítimamente no devolver nada todavía.

**La háptica nunca vibra.** Muchos controles, y prácticamente todas las manos rastreadas, no exponen `hapticActuators`. Confírmalo con `console.log(inputSource.gamepad?.hapticActuators)`; un resultado vacío o indefinido significa que este dispositivo no puede vibrar, no que el código esté mal.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.md)**: agrega un cuarto botón al menú del mundo, conectado de la misma forma que los otros tres.
2. **[Creativo](challenges/challenge-2.md)**: reescribe el menú y cada mensaje de estado con tus propias palabras o las de tu comunidad, y cambia qué elemento de la exhibición se puede agarrar y colocar.
3. **[Explorador](challenges/challenge-3.md)**: agrega selección por permanencia de mirada para visores sin controles, y compara los marcadores de posición `'boxes'`/`'spheres'` de `XRHandModelFactory` contra su malla de mano real.

## Cómo entregar tu trabajo

1. Completa cada elemento de [`tests/checklist.md`](tests/checklist.md).
2. Toma capturas de pantalla: el laboratorio de escritorio, el menú del mundo, un modelo de control o mano en VR (o en el emulador), y la mira de AR o el resultado de "Place object (2D)".
3. Guárdalas, junto con este proyecto, en tu diario de aprendizaje y portafolio. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. En tu diario, responde: ¿por qué el agarre usa `squeeze` para un control pero `select` para una mano rastreada, y qué saldría mal para una estudiante si una lección supusiera en silencio que cada fuente de entrada funciona igual?

## Lecturas adicionales

- [W3C: WebXR Device API](https://www.w3.org/TR/webxr/) (en inglés)
- [W3C: WebXR Hand Input Module](https://www.w3.org/TR/webxr-hand-input-1/) (en inglés)
- [W3C: WebXR Hit Test Module](https://www.w3.org/TR/webxr-hit-test-1/) (en inglés)
- [MDN: Inputs and input sources](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API/Inputs) (en inglés)
- [Documentación de three.js: `XRControllerModelFactory`](https://threejs.org/docs/#examples/en/webxr/XRControllerModelFactory) (en inglés)

## Mujeres que conviene conocer

**Ming C. Lin**, nacida en Taiwán, es Distinguished University Professor en la Universidad de Maryland y pionera de la detección de colisiones -incluido el algoritmo de características más cercanas Lin-Canny-, la simulación basada en física, la háptica, y el renderizado de sonido. Recibió el IEEE VGTC Virtual Reality Technical Achievement Award en 2010, fue incorporada a la IEEE VR Academy en 2022, y cofundó Impulsonic, cuya tecnología de audio fue adquirida por Valve y lanzada como Steam Audio.

El "agarre directo" de esta lección es, por debajo, una comprobación de distancia entre dos objetos: una pieza pequeña y cotidiana del problema de detección de colisiones que su investigación hizo lo bastante rápido para gráficos en tiempo real. Su pulso háptico pertenece al mismo campo más amplio en el que ha pasado buena parte de su carrera, dando una base física al tacto y al sonido virtuales.

> **Nota editorial: verificar antes de publicar.** Los datos biográficos de las secciones «Mujeres que conviene conocer» deben verificarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

Las APIs de esta lección provienen de tres especificaciones relacionadas, todas publicadas por el **Immersive Web Working Group** del W3C: la **WebXR Device API** central (sesiones, fuentes de entrada, eventos `select`/`squeeze`); el **WebXR Hand Input Module**, que agrega `XRHand` y sus 25 articulaciones rastreadas; y el **WebXR Hit Test Module**, que agrega `XRHitTestSource` para la detección de superficies en AR. Las tres siguen siendo borradores en evolución dentro del camino hacia Recommendation, no Recommendations terminadas, lo cual es una razón por la que esta lección trata el seguimiento de manos y la compatibilidad con hit-test como algo que hay que comprobar, nunca suponer. `XRControllerModelFactory` y `XRHandModelFactory` de three.js no son estándares en sí mismos: son conveniencias de código abierto, construidas sobre el proyecto comunitario [WebXR input profiles](https://github.com/immersive-web/webxr-input-profiles), que implementan por debajo estas mismas APIs del W3C.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
