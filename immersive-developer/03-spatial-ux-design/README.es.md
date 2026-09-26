# Diseño de UX espacial

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `immersive-developer` · **Lección:** `spatial-ux-design-03` · **Tiempo:** unas 12 horas · 16 sesiones de 45 minutos · unas 4 semanas con 4 sesiones por semana

---

> Rediseña el panel de aprendizaje de My XR Camp como una interfaz espacial, con paneles anclados al mundo, al cuerpo y a la vista, y locomoción por teletransporte.

---

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Explicar la diferencia entre anclaje **al mundo** (world-locked), **al cuerpo** (body-locked), y **a la vista** (view-locked), y elegir entre ellos para un contenido dado.
2. Construir un **panel de textura en canvas** en three.js -un `<canvas>` dibujado con `CanvasTexture`, `MeshBasicMaterial`, y `PlaneGeometry`- y mantenerlo legible a distintas distancias de visión.
3. Calcular el **tamaño angular** de un panel a partir de su tamaño físico y su distancia, y usar ese número en lugar de adivinar si el texto será legible.
4. Tratar las guías publicadas de distancia cómoda y tamaño de texto como un **punto de partida para probar**, no como una regla fija, y decir de dónde viene cada número.
5. Implementar **locomoción por teletransporte** entre puntos fijos, incluyendo cómo debe mover una sesión de WebXR de forma distinta a la vista de escritorio.
6. Agregar una opción de **movimiento suave** con una viñeta de comodidad, y explicar por qué teletransportarse suele ser la opción por defecto más segura.
7. Marcar un **límite de espacio personal** simple, y explicar para qué sirve.
8. Escribir una breve **justificación de diseño** que sustente las decisiones espaciales, citando fuentes.

## Requisitos previos

- **Desarrolladora Inmersiva, Fundamentos de WebXR (4.1)**: esta lección reutiliza su configuración del renderer, el manejo de sesiones, y el patrón del botón `Enter VR` sin volver a explicarlos.
- **Desarrolladora Frontend, El Document Object Model y las interfaces dinámicas (2.2)**: esta lección rediseña el propio panel de aprendizaje de esa lección, y lee el mismo progreso guardado en tu navegador.

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Un navegador de escritorio basado en Chromium (Chrome o Edge) | Compatibilidad con WebXR y DevTools | Gratis |
| La extensión de navegador [Immersive Web Emulator](https://github.com/meta-quest/immersive-web-emulator) | Probar sesiones VR sin tener un visor | Gratis |
| Un lector de pantalla | Probar la descripción de la escena y las regiones dinámicas | Gratis |
| Un visor VR (opcional) | Pruebas en un dispositivo real, si tienes acceso a uno | Varía; no es obligatorio |

## Lo que vas a construir

Un **rediseño espacial del panel de My XR Camp** del Curso 2.2: en lugar de una página plana de barras de progreso, una pequeña sala con un **quiosco de progreso** (anclado al mundo, siempre en el mismo lugar) y un **panel de metas** que puedes cambiar entre anclado al mundo, al cuerpo, y a la vista mientras se ejecuta, para que sientas la diferencia en lugar de solo leerla. Tres marcadores en el piso te permiten teletransportarte entre tres distancias del quiosco -muy cerca, cómoda, y lejos- mientras una lectura en vivo reporta el **tamaño angular** del quiosco en grados en cada una. Un anillo en el piso marca tu propio espacio personal. Todo también funciona sentada en VR, usando el mismo patrón "Enter VR" de 4.1.

La solución de referencia está en [`completed/`](completed/). El starter tiene `index.html`, `styles.css`, `data/catalog.json`, y `js/app.js`, `js/data.js`, y `js/xr.js` terminados. `js/panels.js`, `js/layout.js`, `js/locomotion.js`, `js/describe.js`, y `js/main.js` tienen diez TODOs entre ellos; la sala ya funciona antes del TODO 1, con paneles simples de marcador de posición y teletransporte instantáneo sin desvanecer, para que puedas ver la forma de todo antes de empezar.

## Guía de carpetas

```text
03-spatial-ux-design/
├── README.md
├── README.es.md
├── README.zh-Hans.md
├── project.json
├── starter/
│   ├── index.html, styles.css, data/catalog.json   # Finished
│   ├── js/app.js, js/data.js, js/xr.js             # Finished
│   ├── js/panels.js     # TODOs 1–3: the canvas-texture panel
│   ├── js/layout.js     # TODOs 4–6: world-/body-/view-locking
│   ├── js/locomotion.js # TODOs 7–8: teleport and smooth movement
│   ├── js/describe.js   # TODO 9: the scene description
│   ├── js/main.js       # TODO 10: wiring the lock-mode and movement controls
│   └── design-rationale.md  # Fill this in as you build
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Configuración

1. Copia la carpeta `starter/` para trabajar en ella, o ábrela directamente.
2. Inicia tu servidor local y abre `starter/index.html` a través de él.
3. Abre la consola de DevTools de tu navegador y el panel Elements, y si tienes un lector de pantalla, actívalo para pasos posteriores.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; recorre el starter y el panel plano del Curso 2.2 | Puedes explicar qué ya funciona aquí y qué sigue siendo un marcador de posición |
| 2 | Discusión: lee las fuentes de distancia y tamaño de texto en Lecturas adicionales | Puedes indicar una distancia de panel cómoda y decir exactamente de dónde viene ese número |
| 3 | Paso 1: construir un panel (TODO 1) | Aparecen dos placas simples con el tamaño físico correcto |
| 4 | Paso 2: dibujar texto legible (TODO 2) | El panel del quiosco muestra números de progreso reales |
| 5 | Paso 2, continuación: el texto del panel de metas | Ambos paneles muestran texto real y legible |
| 6 | Paso 3: tamaño angular (TODO 3) | La línea de estado de movimiento reporta un número de grados real en cada punto de referencia |
| 7 | Paso 4: anclaje al mundo (TODO 4) | El quiosco está correctamente posicionado y orientado hacia la sala |
| 8 | Paso 5: anclaje al cuerpo (TODO 5) | El panel de metas te sigue y se mantiene nivelado mientras miras alrededor |
| 9 | Paso 6: cambiar entre modos de anclaje (TODO 6) | Los tres radios de modo de anclaje cambian visiblemente el comportamiento del panel de metas |
| 10 | Discusión: espacio personal y límites multiusuario | Puedes explicar para qué sirve el anillo en el piso |
| 11 | Paso 7: elegir un punto de referencia con un puntero (TODO 7) | Hacer clic o tocar un marcador del piso te teletransporta |
| 12 | Paso 8: teletransporte y movimiento suave (TODO 8) | Ambos estilos de movimiento funcionan, respetando la viñeta y el movimiento reducido |
| 13 | Paso 9: la descripción de la escena (TODO 9) | Un lector de pantalla escucha el estado completo y actual de la sala |
| 14 | Paso 10: conectando los últimos controles (TODO 10) | La casilla y los radios cambian el comportamiento de principio a fin |
| 15 | Pruebas: teclado, movimiento reducido, y VR si está disponible | Recorre [`tests/checklist.md`](tests/checklist.md) |
| 16 | Un reto de extensión, y luego Entregando tu trabajo | Tus capturas de pantalla y `design-rationale.md` están listos |

### Paso 1: construir un panel (TODO 1)

Un panel espacial empieza como un `<canvas>` HTML común, dibujado con la misma API de dibujo 2D que el canvas de cualquier página web, y luego envuelto en un `THREE.CanvasTexture` para que three.js lo pinte sobre una `PlaneGeometry`. Nada de esto es específico de XR: es la misma técnica usada para paneles, etiquetas, y letreros en cualquier escena de three.js.

```js
const texture = new THREE.CanvasTexture(canvas);
texture.colorSpace = THREE.SRGBColorSpace;
const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
```

### Paso 2: dibujar texto legible (TODO 2)

Dibuja con el contexto 2D común del canvas (`fillText`, `fillRect`), con tamaños relativos al propio ancho en píxeles del canvas para que el panel escale de forma razonable a cualquier tamaño físico. Llama a `texture.needsUpdate = true` después de cada redibujado, o la GPU seguirá mostrando los píxeles anteriores.

### Paso 3: tamaño angular (TODO 3)

Dos paneles con la misma resolución en píxeles pueden ser muy distintos en legibilidad, porque lo que realmente importa es qué tan grandes se ven desde donde estás parada: su **tamaño angular**, en grados. `2 * atan((height / 2) / distance)` da ese ángulo a partir de una altura física y una distancia de visión -el mismo panel a 2.5 m subtiende un ángulo mucho menor que a 0.6 m, sin que se haya cambiado ni un píxel de su textura.

### Paso 4: anclaje al mundo (TODO 4)

El contenido anclado al mundo se queda en un punto fijo de la sala, como siempre hace el quiosco de progreso de esta lección. No hace falta actualizarlo en cada cuadro, porque por definición no se mueve.

### Paso 5: anclaje al cuerpo (TODO 5)

El contenido anclado al cuerpo sigue a quien aprende, pero solo su orientación izquierda-derecha (**yaw**), nunca su inclinación (pitch) ni su balanceo (roll) -así que mirar hacia arriba o hacia abajo no vuelca un panel anclado al cuerpo. `camera.getWorldDirection()` y `Math.atan2(direction.x, direction.z)` dan ese rumbo, sea que una sesión de WebXR esté o no anulando la transformación propia de la cámara en ese momento.

### Paso 6: cambiar entre modos de anclaje (TODO 6)

Un `Object3D` solo puede tener un padre a la vez, así que cambiar de modo significa desprenderlo primero. El contenido anclado a la vista se vuelve hijo de la propia cámara (`camera.add(object)`); los otros dos modos lo adjuntan a la escena en su lugar. Prueba cada modo en el panel de metas y lee "Explicación del código clave" más abajo para conocer el compromiso de comodidad entre ellos.

### Paso 7: elegir un punto de referencia con un puntero (TODO 7)

Cada punto de referencia ya tiene un `<button>` real (construido en `main.js`), suficiente por sí solo para uso con teclado y lector de pantalla. El TODO 7 agrega una segunda forma, directa, de llegar a los mismos tres puntos: hacer clic o tocar sus marcadores en el piso, usando un `THREE.Raycaster` construido a partir de la posición del puntero y la cámara.

### Paso 8: teletransporte y movimiento suave (TODO 8)

El teletransporte salta instantáneamente, oculto por un breve desvanecido; el movimiento suave interpola de forma continua durante unos 700 ms, con una viñeta de comodidad visible todo el tiempo. El movimiento reducido omite por completo ambos efectos y va directo al destino.

### Paso 9: la descripción de la escena (TODO 9)

Construye un párrafo, a partir de los mismos números con los que se construye la sala, que cubra qué hay en la sala, el punto de referencia actual y su tamaño angular, cómo está anclado el panel de metas, y si hay un visor activo en ese momento.

### Paso 10: conectando los últimos controles (TODO 10)

Conecta la casilla "move smoothly" (moverse suavemente) y los tres radios de modo de anclaje a `app.setSmooth()` y `app.setGoalsLockMode()`. Esta es la última pieza: una vez hecho esto, cada control de la página hace algo.

## Explicación del código clave

- **`CanvasTexture` y `needsUpdate`**: una textura construida a partir de un canvas en vivo, no de un archivo estático, así que redibujar el canvas y poner `texture.needsUpdate = true` es suficiente para actualizar lo que se muestra en 3D -sin nueva geometría, sin recargar.
- **Tamaño angular**: `2 * atan((height / 2) / distance)`. Esta es la medida real de legibilidad, consciente de la distancia, que usa esta lección en lugar de un único "tamaño mínimo de fuente" fijo, porque la legibilidad de un mismo panel cambia según dónde estés parada, no solo según cómo se dibujó.
- **El rig de movimiento**: leer el código fuente de `WebXRManager` de three.js r186 muestra que, una vez que una sesión está activa, `camera.position` se sobrescribe en cada cuadro a partir de la pose del visor rastreado combinada con `camera.parent.matrixWorld`. Establecer `camera.position` directamente (que funciona antes de que empiece una sesión) no hace nada una vez que se está presentando. Esta lección lo resuelve emparentando la cámara a un `Group` (un "rig" o "dolly") y moviendo la posición del *rig* durante el teletransporte mientras se presenta -la transformación que realmente se multiplica.
- **`camera.getWorldPosition()` / `getWorldDirection()`**: se usan en lugar de leer `camera.position` y `camera.rotation` directamente, porque esos valores son relativos al padre de la cámara (el rig), que no es lo mismo que el espacio del mundo una vez que el rig se ha movido. Los métodos `getWorld…` siempre devuelven valores reales en espacio del mundo, dentro o fuera de una sesión.
- **Re-emparentar por modo de anclaje**: `object.parent.remove(object)` antes de adjuntarlo a cualquier otro lugar. Three.js no avisa si te saltas esto; el objeto simplemente se queda donde ya estaba, en silencio, lo cual es un error confuso de rastrear después.

## Accesibilidad 3D y XR

Esta lección es 3D de principio a fin, así que no tiene un único "momento 3D": cada panel, teletransporte, y modo de anclaje ya debe cumplir los requisitos de abajo, no solo una sección de la página.

- La información de cada panel también existe como texto HTML plano (la lista de fases, la lista de metas, la descripción de la escena): nada es exclusivo del espacio 3D.
- Cada teletransporte y cambio de modo de anclaje también es un `<button>`, `<input type="radio">`, o `<input type="checkbox">` real, alcanzable y operable solo con teclado.
- El movimiento reducido desactiva por completo el desvanecido y la viñeta, y corta al instante, tanto para el teletransporte como para el movimiento suave.
- La cámara solo se mueve porque quien aprende la arrastró, usó las flechas del teclado, o eligió un punto de referencia -nunca automáticamente.
- El teletransporte funciona de la misma forma, a través de los mismos botones, se esté presentando en VR o no (ver "Explicación del código clave").
- Cada punto de referencia y panel se mantiene dentro de un alcance sentado, orientado al frente, y cómodo; nada requiere pararse o girar por completo.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué | Cómo lo cumple esta lección |
| --- | --- | --- | --- |
| Alternativa de texto para la escena 3D | 1.1.1 | Un canvas es invisible para la tecnología de asistencia | `#scene-description`, reconstruida a partir de los mismos datos que la sala |
| Información completa disponible como texto | 1.3.1 | La imagen nunca es la única copia de los hechos | La lista de fases y la lista de metas duplican el quiosco y el panel de metas |
| Operabilidad con teclado | 2.1.1 | No todas las personas usan mouse, tacto, o un control VR | Cada acción tiene un control HTML real y enfocable |
| Foco visible | 2.4.7 | Quienes usan teclado necesitan ver dónde están | Heredado del estilo global `:focus-visible` de este repositorio |
| Sin movimiento no solicitado | 2.3.3, 2.2.2 | Trastornos vestibulares y mareo por movimiento | La cámara y quien juega solo se mueven a petición; el movimiento reducido elimina los desvanecidos y la viñeta |
| Los nombres accesibles empiezan con la etiqueta visible | 2.5.3 | Quienes usan control por voz dicen el texto visible | Los botones y etiquetas usan una redacción simple y coincidente |
| Actualizaciones de estado en vivo | Buena práctica | Quienes usan lector de pantalla deben escuchar los resultados sin perder su lugar | `#move-status` y `#xr-status` usan `role="status"` |

## Consideraciones de rendimiento

- Dos paneles significan dos canvases y dos texturas: barato comparado con los modelos glTF cargados que aparecen en Desarrolladora Web3D, pero redibújalos solo cuando sus datos realmente cambien (`redrawGoalsPanel` se llama después de cada agregar/quitar, no en cada cuadro).
- `applyBodyLock` se ejecuta una vez por cuadro solo mientras el panel de metas está en modo anclado al cuerpo; se omite por completo en modo anclado al mundo y a la vista, ya que ninguno de los dos necesita una actualización por cuadro.
- `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`, heredado de 4.1, limita el trabajo innecesario de la GPU en pantallas de teléfono y tableta de alta densidad.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Olvidar `texture.needsUpdate = true` | El canvas cambia, pero el panel sigue mostrando el texto anterior | Establécelo al final de cada función de redibujado |
| Leer `camera.position` durante una sesión XR | Obtiene un valor relativo al rig, no la posición real en el mundo | Usa `camera.getWorldPosition()` |
| Adjuntar un objeto a un nuevo padre sin desprenderlo antes | Falla en silencio al moverse, o termina en dos lugares | Siempre haz `parent.remove(object)` primero |
| Hacer todo anclado a la vista porque es lo más fácil de leer | Se siente invasivo y cansador en segundos | Reserva el anclaje a la vista solo para contenido breve y urgente |
| Una animación de teletransporte o movimiento suave que ignora el movimiento reducido | Falla el requisito de comodidad y puede provocar malestar real | Comprueba `window.__reducedMotion` antes de elegir un efecto, siempre |

## Solución de problemas

**Los paneles son rectángulos grises simples, sin texto.** El TODO 1/2 aún no están completados, o `texture.needsUpdate` nunca se puso en `true` después de dibujar.

**El panel de metas gira o tiembla mientras giro.** Comprueba que el TODO 5 use `atan2(direction.x, direction.z)` solo para el yaw -usar el `camera.quaternion` completo también copia el pitch y el roll.

**El teletransporte funciona en escritorio pero no mientras se presenta en VR.** Confirma que `app.setPresenting(true)` se está ejecutando (revisa el listener `sessionstart` de `xr.js`) y que el código de teletransporte mueve el rig, no `camera.position`, mientras se presenta.

**Firefox o Safari:** Firefox llama "Inspector" al panel Elements. Safari necesita el menú Develop activado en Preferences → Advanced antes de que su propio Web Inspector esté disponible.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.md)**: agrega un cuarto punto de referencia a una distancia que esta lección no prueba, y lee qué pasa.
2. **[Creativo](challenges/challenge-2.md)**: haz que el contenido de la sala sea tuyo.
3. **[Explorador](challenges/challenge-3.md)**: agrega un cuarto modo de anclaje, relativo a la mano, conectando con el seguimiento de controles y manos de 4.2.

## Cómo entregar tu trabajo

1. Recorre [`tests/checklist.md`](tests/checklist.md).
2. Toma capturas de pantalla de la sala desde cada uno de los tres puntos de referencia, y del panel de metas en cada uno de sus tres modos de anclaje.
3. Guárdalas en tu diario de aprendizaje y portafolio. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. Pregunta de diario: ¿cuál de los tres modos de anclaje te resultó personalmente menos cómodo de usar por más de unos segundos, y por qué crees que fue así?

## Lecturas adicionales

- [Meta Horizon OS: Panels](https://developers.meta.com/horizon/design/panels/) (en inglés) - la guía de una plataforma en funcionamiento sobre el tamaño de paneles, léela con cautela como un dato entre varios, no como una regla universal.
- [Meta Horizon OS: Comfort](https://developers.meta.com/horizon/design/comfort/) (en inglés) - guía de locomoción y malestar por movimiento, incluyendo preferir el teletransporte sobre el movimiento continuo.
- [Android XR: Scale, sizes, and visual design](https://developer.android.com/design/ui/xr/guides/visual-design) (en inglés) - la distancia de panel por defecto propia de otra plataforma distinta, útil para ver que estos números varían.
- [W3C: XR Accessibility User Requirements (XAUR)](https://www.w3.org/TR/xaur/) (en inglés) - el documento de estándares detrás de las comprobaciones manuales de accesibilidad XR de este repositorio.
- [MDN: `CanvasRenderingContext2D`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) (en inglés) - la API de dibujo 2D con la que están construidos los paneles de esta lección.

## Mujeres que conviene conocer

**Clarisse Sieckenius de Souza** es una investigadora brasileña de HCI, ahora Profesora Emérita en la PUC-Rio, que co-creó la Ingeniería Semiótica, la primera teoría semiótica de la interacción humano-computadora surgida de las ciencias de la computación. Fundó el Grupo de Investigación en Ingeniería Semiótica de la PUC-Rio y fue incorporada a la ACM SIGCHI CHI Academy en 2013.

Cada decisión de esta lección -dónde se ubica un panel, cómo está etiquetado, qué comunica en silencio al quedarse quieto o al seguirte- es exactamente el tipo de pregunta que estudia su campo: no solo si una interfaz funciona, sino qué le dice a la persona que la usa, y cómo llega a entenderlo sin que se lo digan directamente.

_Datos de fuentes públicas, verificados en 2026. ¿Encontraste un error? [Avísanos](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Estándar destacado

La **WebXR Device API** detrás del botón "Enter VR" de esta lección la publica el Immersive Web Working Group del W3C, la misma especificación usada en 4.1. No existe un único estándar del W3C para el diseño de UX espacial en sí: los **W3C XR Accessibility User Requirements (XAUR)**, una Group Note y no una Recommendation, establecen expectativas de accesibilidad para interfaces espaciales sin prescribir un sistema de diseño específico, por lo cual esta lección se apoya en cambio en la guía de diseño propia y publicada de plataformas individuales (Meta Horizon OS, Android XR) y es explícita al tratar esos números como un punto de partida y no como un estándar.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
