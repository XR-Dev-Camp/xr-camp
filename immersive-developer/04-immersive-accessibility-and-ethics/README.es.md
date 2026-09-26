# Accesibilidad y ética en experiencias inmersivas

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `immersive-developer` · **Lección:** `immersive-accessibility-and-ethics-04` · **Tiempo:** unas 12 horas · 16 sesiones de 45 minutos · unas 4 semanas con 4 sesiones por semana

---

> Completa un rediseño de accesibilidad y ética de una experiencia inmersiva.

---

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Reconocer, en una escena XR funcional, la diferencia entre una escena que solo se renderiza y una que una persona con discapacidad realmente puede usar.
2. Explicar qué es un W3C Group Note, en qué se diferencia de un W3C Recommendation, y citar con precisión los XR Accessibility User Requirements (XAUR), incluyendo qué cubren y qué no.
3. Corregir subtítulos anclados en el espacio 3D del mundo para que sigan siendo legibles sin importar hacia dónde mire quien aprende, tanto en un visor como en una pantalla.
4. Ofrecer una alternativa completa, sin audio y sin XR, para contenido hablado, y una alternativa 2D completa para contenido que solo existe en una escena 3D.
5. Llevar un control interactivo a un alcance cómodo, con una mano, y sentado, y darle una ruta por teclado.
6. Distinguir el movimiento forzado de la cámara (nunca aceptable) de una animación que solo necesita una comprobación de movimiento reducido y un control de pausa.
7. Pedir consentimiento, a partir de un gesto genuino del usuario, antes de activar una cámara u otro sensor, y explicar en lenguaje simple qué podría revelar ese sensor.
8. Dar a un espacio XR compartido un límite de espacio personal y una forma de silenciar o bloquear a otra persona participante.

## Requisitos previos

- **Curso 4.1: Fundamentos de WebXR** (entrar y salir de una sesión VR).
- **Curso 4.2: Entrada e interacción en XR** (la escena de three.js de esta lección sigue el mismo patrón de motor).
- **Curso 4.3: Diseño de UX espacial.**
- Sentirte cómoda leyendo una página HTML corta y un módulo de JavaScript sin que te muestren dónde está cada parte.

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Un editor de texto (por ejemplo, VS Code) | Editar los archivos del starter | Gratis |
| Un navegador de escritorio moderno (Chrome, Firefox, o Edge) | Ejecutar y probar la escena; todos funcionan bien en China continental | Gratis |
| Un servidor local de archivos estáticos (por ejemplo, `python3 -m http.server`, o la extensión "Live Server" de VS Code) | Las páginas deben abrirse por `http://`, no `file://`, para que los módulos de JavaScript se carguen | Gratis |
| El inspector de accesibilidad y el teclado de tu navegador | Probar las correcciones: orden de Tab, foco, movimiento reducido | Gratis, integrado |

Esta lección no usa ninguna cuenta, ninguna clave de API, ni ningún servicio de pago. La voz proviene de la propia Web Speech API integrada del navegador, no de un servicio en la nube.

## Lo que vas a construir

Una breve charla de galería en XR: una presentadora, tres objetos de lecciones anteriores, narración hablada, una avatar visitante, y una función opcional de "personalización" basada en cámara. La versión del [`starter/`](starter/) está **deliberadamente rota**: se ejecuta sin errores, pero falla a estudiantes con discapacidad y toma libertades con su privacidad y comodidad, a propósito, para que tengas problemas reales que encontrar. Tu trabajo es auditarla contra los XR Accessibility User Requirements (XAUR) del W3C y WCAG 2.2, y luego corregir lo que encuentres. La solución de referencia está en [`completed/`](completed/), junto con [`completed/audit.md`](completed/audit.md): una auditoría completa que asocia cada corrección con la necesidad de usuario de XAUR o el criterio de conformidad de WCAG exacto que responde, incluyendo tres correcciones que XAUR no cubre en absoluto. Hay 10 TODOs numerados en `starter/js/`.

## Guía de carpetas

```text
04-immersive-accessibility-and-ethics/
├── README.md
├── starter/          # begin here: the deliberately broken scene
│   ├── index.html
│   ├── styles.css
│   └── js/           # app.js, talk.js, visitor.js, sensors.js, xr.js, main.js
├── completed/        # reference solution, plus audit.md
├── challenges/       # Three challenges: Foundation is required
├── tests/            # self-review checklist
├── assets/
└── screenshots/
```

## Configuración

1. Abre una terminal en la carpeta padre de esta, `immersive-developer/`.
2. Inicia un servidor local desde la raíz del repositorio, por ejemplo `python3 -m http.server 8000`.
3. Abre `http://localhost:8000/immersive-developer/04-immersive-accessibility-and-ethics/starter/index.html`.
4. Abre `starter/index.html`, `starter/styles.css`, y cada archivo en `starter/js/` en tu editor. Busca `TODO` para encontrar los 10, en el orden de la lección.
5. Mantén [`docs/en/xr-accessibility.md`](../../docs/en/xr-accessibility.md) y el [documento XAUR](https://www.w3.org/TR/xaur/) abiertos en una pestaña mientras trabajas.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Ejecuta el starter. Lee el aviso de que está roto. Prueba la escena como una estudiante vidente que usa mouse, y luego pruébala con los ojos cerrados y sin usar el mouse. | Una lista escrita de al menos cinco problemas que notaste, antes de leer ningún TODO. |
| 2 | Lee las 19 necesidades de usuario del documento XAUR y `docs/en/xr-accessibility.md`. Compara tu lista de la sesión 1 con ellas. | Notas sobre cuáles de tus problemas ya tienen una necesidad de usuario en XAUR, y cuáles no. |
| 3 | Corrige el TODO 1: construye `#scene-description` y la lista de transcripción a partir de `TALK_SCRIPT`. | Una transcripción de toda la charla visible en la página antes de presionar "Start the talk". |
| 4 | Corrige el TODO 2: elimina la trayectoria forzada de la cámara en `app.js`. | Arrastrar la escena mueve la cámara; soltar la deja exactamente donde la dejaste. |
| 5 | Corrige el TODO 4: condiciona la animación inactiva de la presentadora a `prefers-reduced-motion`, y agrega un botón de Pausa. | Activar "reducir movimiento" en la configuración de tu sistema hace que la presentadora empiece quieta; el botón de Pausa funciona de cualquier forma. |
| 6 | Corrige el TODO 3: mueve los subtítulos de un plano anclado al mundo a uno emparentado con la cámara, más una barra de subtítulos en el DOM. | Girar la cámara lejos de la presentadora sigue mostrando el subtítulo actual. |
| 7 | Corrige el TODO 5: reemplaza la malla 3D inalcanzable "Ask a question" por un botón real, operable por teclado. | Presionar Tab repetidamente llega a "Ask a question"; presionar Enter revela la respuesta. |
| 8 | Corrige el TODO 6: haz que la transcripción, la respuesta, y el panel de consentimiento funcionen con WebGL desactivado. | Con WebGL desactivado en las banderas de tu navegador (o `chrome://flags`), la página sigue mostrando la transcripción y te permite hacer una pregunta. |
| 9 | Corrige el TODO 7: exige un clic genuino antes de solicitar la cámara. | La cámara nunca se solicita hasta que presionas "Turn on camera personalization". |
| 10 | Corrige el TODO 8: escribe el aviso de privacidad que se muestra antes de ese botón. | Un párrafo en lenguaje simple que explica qué podría revelar un cuadro de la cámara, visible antes de poder hacer clic en "Turn on". |
| 11 | Corrige el TODO 9: dale a la visitante un radio de espacio personal. | La visitante camina hacia ti, y luego se detiene a unos 1.2 metros de distancia, y la región de estado lo indica. |
| 12 | Corrige el TODO 10: agrega los botones "Mute visitor" y "Block visitor". | Hacer clic en "Block visitor" hace que la visitante desaparezca y deje de moverse; hacer clic de nuevo la hace regresar. |
| 13 | Redacta tu propia tabla de auditoría: una fila por corrección, con la necesidad de usuario de XAUR o el criterio de conformidad de WCAG 2.2 que responde (o "no cubierto por XAUR" donde sea cierto). | Una tabla borrador, verificada línea por línea contra [`completed/audit.md`](completed/audit.md). |
| 14 | Prueba todo con el mouse guardado, con el movimiento reducido activado, y con WebGL desactivado, uno a la vez. | Cada elemento de [`tests/checklist.md`](tests/checklist.md) marcado. |
| 15 | Trabaja en el reto Fundamento. | La lista "Se completa cuando" del reto Fundamento satisfecha. |
| 16 | Toma tus capturas de pantalla, vuelve a leer tus notas de diario de las sesiones 1 y 2, y entrega. | Todo lo indicado en **Cómo entregar tu trabajo** más abajo, completado. |

### Paso 1: leer la escena como una auditoría, no como una lista de errores (TODO 1, 3, 6)

Tres de los problemas de esta lección son todos versiones de la misma pregunta: *si esta persona no puede ver el lienzo 3D, o no puede escuchar el audio, o no puede mirar hacia donde sea que estén los subtítulos, ¿de todos modos recibe el contenido?* `starter/js/talk.js` responde "no" de tres formas distintas: sin transcripción, subtítulos anclados al mundo, y una página que queda en blanco sin WebGL. Corrige las tres construyendo una sola fuente de verdad pequeña y honesta -`TALK_SCRIPT`- y leyendo de ella en todas partes: la lista de transcripción, la descripción de la escena, y los subtítulos.

```js
// completed/js/main.js
function renderTranscript() {
  const list = $('transcript-list');
  list.replaceChildren(...TALK_SCRIPT.map((line) => {
    const li = document.createElement('li');
    li.textContent = line.text;
    return li;
  }));
}
```

### Paso 2: distinguir "la cámara se movió" de "algo se animó" (TODO 2, 4)

`docs/en/xr-accessibility.md` establece la regla de comodidad con claridad: *la cámara nunca se mueve a menos que quien aprende la mueva.* No "a menos que el movimiento reducido esté desactivado" -nunca. Por eso la órbita forzada de cámara del starter en `app.js` simplemente se elimina, no se envuelve en una comprobación de `prefers-reduced-motion`. El pequeño balanceo inactivo de la presentadora es distinto: es una animación real, así que sigue la misma regla que usa cada lección 3D de este curso -empezar en pausa bajo movimiento reducido, y siempre ofrecer un control de Pausa visible.

```js
// completed/js/app.js
let idleAnimating = !window.__reducedMotion;
```

### Paso 3: anclar los subtítulos a quien mira, no al mundo (TODO 3)

Un subtítulo dibujado sobre un plano que se queda quieto en la escena solo es legible desde una dirección. Emparentar el plano a `camera` en lugar de a `scene` lo mantiene en el mismo lugar en la *vista* de quien aprende, de la misma forma en que una pista de subtítulos permanece en la parte inferior de un video sin importar hacia dónde se mueva la cámara del video.

```js
// completed/js/talk.js
const captionPlane = new THREE.Mesh(geometry, material);
captionPlane.position.set(0, -0.32, -1); // relative to the camera, not the world
camera.add(captionPlane);
```

### Paso 4: dar a cada interacción una ruta por teclado (TODO 5)

Una malla 3D no es, por sí sola, alcanzable con Tab. Donde la interacción pueda ser un control HTML común en lugar de un objeto 3D -como puede serlo "Ask a question"- esa es la corrección más simple y robusta, no un compromiso: es alcanzable con Tab, activable con Enter o Espacio, y cumple el tamaño mínimo de objetivo de WCAG 2.2 sin ningún trabajo adicional.

### Paso 5: pedir permiso antes de percibir, y decir qué podrías encontrar (TODO 7, 8)

La propia WebXR no deja que una página solicite una sesión fuera de un clic genuino; trata una solicitud de cámara de la misma forma. `requestCamera` de `js/sensors.js` solo se ejecuta desde dentro del propio manejador `click` de un botón, después de un aviso que nombra, específicamente, qué podría mostrar un cuadro de cámara -no solo "tu cara".

### Paso 6: dar un límite al espacio compartido (TODO 9, 10)

La visitante de esta lección está simulada -no hay un servidor multijugador en vivo- pero la corrección es la misma que necesita cualquier espacio XR compartido real: detener a otra avatar antes de que llegue hasta ti, y ofrecer una forma de silenciarla o bloquearla si su presencia no es deseada.

```js
// completed/js/visitor.js
const PERSONAL_SPACE_RADIUS = 1.2; // metres
```

## Explicación del código clave

- **`describeScene()`** construye el párrafo `#scene-description` a partir de los mismos hechos con los que se construye la escena 3D, para que los dos nunca puedan estar en desacuerdo.
- **`captionPlane` emparentado a `camera`** es la técnica estándar de "HUD" en XR: un objeto que se mueve con la cabeza de quien mira en lugar de quedarse fijo en el mundo, la misma idea que usó el menú del mundo de 4.2, aplicada a texto en lugar de a botones.
- **`requestCamera(onGranted, onDenied)`** nunca se ejecuta por sí sola; existe solo para ser llamada desde un manejador de clic, así que una solicitud de cámara siempre sigue a un gesto de usuario real e informado.
- **`PERSONAL_SPACE_RADIUS`** es una simple comprobación de distancia, ejecutada en cada cuadro en `visitor.update()`, entre la visitante y la cámara -todo el "límite" es esta única comparación.
- **`window.__reducedMotion`**, leído una vez de `matchMedia('(prefers-reduced-motion: reduce)')` antes de que se ejecute el script del módulo, decide si la animación inactiva de la presentadora empieza activada o desactivada.

## Accesibilidad 3D y XR

Esta lección es 3D y XR de principio a fin, así que sus requisitos de accesibilidad son las comprobaciones manuales de [`docs/en/xr-accessibility.md`](../../docs/en/xr-accessibility.md), aplicadas específicamente a la escena de la charla de galería:

| Comprobación | Cómo la cumple esta escena |
| --- | --- |
| Descripción de la escena | `#scene-description`, construida por `describeScene()`. |
| Ruta por teclado para cada interacción | "Start the talk", "Turn off captions", "Pause presenter animation", "Ask a question", los botones de consentimiento de cámara, y "Mute"/"Block visitor" son todos elementos `<button>` comunes. |
| Movimiento reducido | La animación inactiva de la presentadora empieza en pausa bajo `prefers-reduced-motion`; la cámara nunca se mueve por sí sola sin importar eso. |
| Alternativa 2D | La transcripción, el texto de la respuesta, el panel de consentimiento, y los controles de la visitante funcionan todos con WebGL desactivado. |
| Comodidad | Sin trayectoria forzada de cámara. La visitante se detiene a una distancia de espacio personal en lugar de acercarse indefinidamente. |

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| Cada línea hablada tiene un equivalente en texto, presente antes de que empiece la reproducción | 1.1.1 | Una persona que no puede escuchar la síntesis de voz, o cuyo navegador carece de ella, igual recibe el contenido. |
| Los subtítulos se mantienen a la vista sin importar hacia dónde mire quien aprende | Buena práctica (ningún criterio de conformidad cubre por sí solo los subtítulos en vivo en 3D) | La necesidad de usuario 19 de XAUR lo nombra directamente; los criterios de subtitulado de WCAG están escritos para video pregrabado. |
| Sin movimiento automático de cámara | 2.2.2 | El movimiento forzado del punto de vista es la principal causa de mareo por movimiento en VR (necesidad de usuario 16 de XAUR). |
| Cada control interactivo es alcanzable por teclado | 2.1.1 | No toda estudiante puede apuntar con precisión un mouse o un control VR. |
| Los controles interactivos cumplen el tamaño mínimo de objetivo | 2.5.8 | Da soporte a estudiantes con movilidad limitada o visión restringida (necesidad de usuario 4 de XAUR). |
| Un sensor (cámara, micrófono) se solicita solo después de una explicación clara y un clic real | Buena práctica (fuera del alcance de XAUR y de WCAG) | El consentimiento tiene que venir antes del acceso, no después. |

## Consideraciones de rendimiento

- La escena tiene tres mallas pequeñas, una presentadora, y una visitante: se renderiza cómodamente incluso en laptops modestas y teléfonos de gama media.
- `SpeechSynthesisUtterance` se ejecuta en el dispositivo; no agrega ninguna solicitud de red ni carga medible.
- La actualización de posición de la visitante se ejecuta en un `setInterval` común, no dentro del bucle de renderizado, así que pausar la pestaña (`visibilitychange`) tampoco congela la comprobación de espacio personal de una forma que le permita "teletransportarse" cuando la pestaña vuelve a estar a la vista -la restricción de distancia en `visitor.update()` siempre vuelve a comprobar desde la posición actual.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Condicionar la órbita forzada de cámara a `prefers-reduced-motion` en lugar de eliminarla | Estudiantes sin el movimiento reducido activado siguen teniendo una cámara incontrolable | Elimina por completo el movimiento forzado de cámara; solo la propia entrada de quien aprende debería mover la cámara jamás. |
| Citar un número de "necesidad de usuario" de XAUR para consentimiento o seguridad multiusuario | Tergiversa lo que realmente dice un W3C Group Note | Di con claridad que XAUR no lo cubre, como hace `completed/audit.md`. |
| Anclar los subtítulos a la cámara pero olvidar la barra de subtítulos del DOM | Quienes usan visor ven los subtítulos; quienes aprenden en escritorio usando tecnología de asistencia en la página no, ya que el HUD 3D es invisible para ellas | Mantén ambos: un plano adjunto a la cámara para presentar, y un elemento del DOM para la vista de página común. |
| Solicitar la cámara tan pronto como la sección de "personalización" entra en la vista al hacer scroll | Sigue sin ser una solicitud genuinamente iniciada por un clic | Solicítala solo dentro del propio manejador `click` del botón. |

## Solución de problemas

**El audio nunca se reproduce.** Algunos navegadores solo exponen las voces de `speechSynthesis` después de que se ha interactuado una vez con la página, o necesitan un momento para cargar las voces de forma asíncrona. La transcripción sigue funcionando de todos modos; este es exactamente el tipo de vacío que la transcripción existe para cubrir.

**"Enter VR" nunca aparece.** Eso significa que este navegador o dispositivo no es compatible con `immersive-vr`. La charla, la transcripción, y cada control funcionan por completo sin él.

**La personalización con cámara siempre falla, incluso después de otorgar el permiso.** En Firefox, revisa el panel "Permissions" del ícono de candado; en Safari, revisa Safari → Settings → Websites → Camera. Ambos deben mostrar "Allow" para el origen de esta página.

**La charla de la visitante nunca se detiene después de silenciarla.** Confirma que presionaste "Mute visitor" y no "Block visitor" -silenciar detiene la charla pero mantiene a la visitante visible y acercándose; bloquear detiene ambas cosas.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.md)**: agrega una corrección más asociada a XAUR para un problema que esta lección no cubrió.
2. **[Creativo](challenges/challenge-2.md)**: hazlo personal -tu idioma, tu comunidad, o una charla sobre algo que te importe.
3. **[Explorador](challenges/challenge-3.md)**: una técnica más difícil -subtítulos en vivo impulsados por el `SpeechRecognition` de la Web Speech API, o una segunda participante remota real usando WebRTC.

## Cómo entregar tu trabajo

1. Recorre por completo [`tests/checklist.md`](tests/checklist.md).
2. Toma una captura de pantalla de tu escena terminada, y una captura de pantalla de tu propia tabla de auditoría de la sesión 13.
3. Guárdalas en tu diario de aprendizaje y portafolio. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. Pregunta de diario: ¿cuál de las once correcciones de esta lección te habrías perdido si solo hubieras leído XAUR, sin pensar también en la ética más allá del acceso por discapacidad, y por qué crees que XAUR no la cubre?

## Lecturas adicionales

- [W3C: XR Accessibility User Requirements (XAUR)](https://www.w3.org/TR/xaur/) (en inglés)
- [W3C: Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/) (en inglés)
- [XR Access](https://xraccess.org/) (en inglés)
- [MDN: Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) (en inglés)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) (en inglés)

## Mujeres que conviene conocer

Wanda Díaz-Merced es una astrónoma puertorriqueña que perdió la vista siendo joven estudiante y se convirtió en pionera de la sonificación en la astronomía moderna -convirtiendo datos astrofísicos en sonido para que puedan estudiarse de oído en lugar de a la vista. Tiene un doctorado de la Universidad de Glasgow y ha ocupado puestos de investigación en el Centro de Astrofísica Harvard-Smithsonian, el Observatorio Astronómico de Sudáfrica, y el Observatorio Gravitacional Europeo.

Su trabajo es una respuesta directa al tema de esta lección: en lugar de tratar las necesidades de una científica ciega como una idea de último momento, la sonificación hace que un conjunto de datos completo sea accesible mediante un sentido distinto de aquel para el que fue diseñado originalmente -el mismo principio detrás de dar a la charla de esta lección una transcripción de texto completa y una alternativa 2D completa, no solo un gesto hacia la accesibilidad añadido a un diseño pensado primero para lo visual. Ella sigue defendiendo la inclusión de la discapacidad en STEM.

> **Nota editorial: verificar antes de publicar.** Los datos biográficos de las secciones «Mujeres que conviene conocer» deben verificarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

El W3C publica varios tipos de documento, y esta lección usa deliberadamente uno de cada uno. WCAG 2.2 es una **Recommendation**: el estatus más maduro del W3C, alcanzado mediante un proceso formal, y el estándar contra el que este curso pone a prueba cada lección. XAUR es un **Group Note**: una instantánea de la investigación y las aportaciones de la comunidad de un grupo de trabajo, publicada para compartir conocimiento, pero que nunca pasó por el proceso de Recommendation ni fue votada como estándar. Un Group Note es valioso -XAUR es, al momento de escribir esto, el relato público más detallado de lo que las personas con discapacidad necesitan de XR- pero citarlo como si resolviera una pregunta con la misma autoridad que WCAG exagera lo que es. La buena práctica es decir exactamente qué estás citando: una Recommendation, un Note, o, donde ninguno de los dos diga nada en absoluto, tu propio juicio razonado.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
