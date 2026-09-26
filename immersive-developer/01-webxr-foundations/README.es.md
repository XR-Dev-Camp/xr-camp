# Fundamentos de WebXR

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `immersive-developer` · **Lección:** `webxr-foundations-01` · **Tiempo:** unas 14 horas · 19 sesiones de 45 minutos · unas 5 semanas con 4 sesiones por semana

---

> Crea una experiencia compatible con WebXR, con alternativas para escritorio y móvil.

---

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Detectar la compatibilidad con WebXR con **`navigator.xr.isSessionSupported()`**, y tratar "no compatible", "no permitido" y "esa API no existe" como una sola alternativa tranquila.
2. Explicar qué es un **contexto seguro** y por qué WebXR lo necesita.
3. Activar la compatibilidad con WebXR en three.js con **`renderer.xr.enabled`**, y elegir un **espacio de referencia** con `renderer.xr.setReferenceSpaceType()`.
4. Solicitar y terminar una **sesión immersive-vr** con `navigator.xr.requestSession()` y `session.end()`, y explicar por qué la solicitud debe ocurrir dentro de un gesto del usuario.
5. Reaccionar a **`sessionstart`** y **`sessionend`**, los eventos que despacha el propio `renderer.xr` de three.js, y mantener de acuerdo al motor, al botón y a una región dinámica sobre en qué modo está la página.
6. Reutilizar un bucle de renderizado tanto para la vista de escritorio como para WebXR, usando **`renderer.setAnimationLoop`**.
7. Construir una alternativa robusta: la vista 2D y 3D de la exhibición sigue funcionando por completo sin visor, sin compatibilidad con WebXR, o con una conexión insegura.
8. Diseñar para el **modo sentado**: mantener los objetos interactivos dentro de una vista cómoda, alcanzable y orientada al frente, sin obligar a ponerse de pie ni a girar.
9. Probar una función de WebXR sin tener un visor, usando la extensión de navegador gratuita **Immersive Web Emulator**, y saber qué esperar en un teléfono común.
10. Leer el código fuente de una biblioteca (`VRButton.js` de three.js) para comprobar qué hace realmente una llamada a la API, en lugar de suponerlo.

## Requisitos previos

- **Desarrolladora Web3D, Fundamentos de three.js (3.4)**: el starter de esta lección es la exhibición terminada de 3.4. Ya deberías sentirte cómoda con `WebGLRenderer`, `OrbitControls` y `renderer.setAnimationLoop`.
- **Fundamentos de A-Frame y A-Frame avanzado (3.2-3.3)** e **Ingeniería de rendimiento para Web3D (3.6)**, si las completaste, son contexto útil pero no obligatorio.
- **My XR Camp**, la pequeña app propia de la Fase 2 (mapa del curso, panel, planificador de sesiones): la misma idea de construir una sola cosa a lo largo de varias lecciones continúa aquí, llevando la exhibición virtual a VR.

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Un navegador de escritorio basado en Chromium (Chrome o Edge) | Compatibilidad con WebXR y DevTools | Gratis |
| La extensión de navegador [Immersive Web Emulator](https://github.com/meta-quest/immersive-web-emulator) | Probar sesiones VR sin tener un visor | Gratis |
| Un visor VR (opcional) | Pruebas en un dispositivo real, si tienes acceso a uno | Varía; no es obligatorio |
| Un servidor local | Los módulos, los mapas de importación y la propia WebXR necesitan `http://` | Gratis |

Immersive Web Emulator es de código abierto (licencia MIT) y se instala desde la Chrome Web Store o la tienda de complementos de Microsoft Edge; ambas funcionan igual. Si ninguna tienda es accesible donde vives, la página de GitHub del proyecto (`meta-quest/immersive-web-emulator`) también explica cómo instalarla desde una versión sin empaquetar. La biblioteca `three` se carga desde `cdn.jsdelivr.net`; si eso es lento o está bloqueado, descarga los archivos fijados una vez donde sí funcionen y cambia el mapa de importación para que apunte a tu propia copia.

## Lo que vas a construir

La exhibición que construiste en three.js en 3.4 se vuelve **compatible con WebXR**: aparece un botón "Enter VR" (Entrar a VR) siempre que el navegador y el dispositivo lo permitan, un clic te lleva dentro de la exhibición a tamaño completo con un visor, y todo lo demás sigue funcionando exactamente igual para todas las demás personas. Este es el primer paso de la exhibición hacia la Fase 4, donde pasa de ser una imagen en una pantalla a algo dentro de lo cual puedes pararte, o sentarte.

La solución de referencia está en [`completed/`](completed/). El starter es la exhibición terminada de 3.4 con un archivo nuevo, `js/xr.js`, y pequeños añadidos en otros tres: ocho TODOs en total.

## Guía de carpetas

```text
01-webxr-foundations/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html, styles.css    # The page, controls, and Enter VR panel (finished)
│   └── js/
│       ├── app.js                # The engine, from 3.4: TODOs 2-3
│       ├── exhibit.js            # The objects, from 3.4 (finished)
│       ├── describe.js           # The description: TODO 7
│       ├── xr.js                 # New: entering and leaving VR. TODOs 1, 4-5
│       └── main.js               # Wiring the page: TODO 6, TODO 8
├── completed/            # Reference solution: open this last
├── challenges/           # Three challenges: Foundation is required
├── tests/checklist.md    # Self-review before you submit
├── assets/
└── screenshots/
```

## Configuración

1. Copia el starter dentro de tu carpeta `virtual-exhibit`, junto a tu trabajo de 3.1-3.4, y súbelo con Git (commit).
2. Inicia tu servidor local y abre `index.html`. La exhibición de escritorio funciona exactamente igual que al final de 3.4. El panel "Enter VR" dice "Checking whether this browser and device support VR…" (comprobando si este navegador y dispositivo son compatibles con VR) y no avanza hasta que termines los TODOs.
3. Instala ahora la extensión de navegador Immersive Web Emulator, para que esté lista cuando llegues a las sesiones de prueba.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración: copia la exhibición terminada de 3.4 como el starter de esta lección | La exhibición de escritorio sin cambios, más un panel "Enter VR" vacío |
| 2 | Paso 1: `'xr' in navigator` (TODO 1, parte 1) | `supportsImmersiveVR()` devuelve `false` en un navegador sin la API de WebXR |
| 3 | Paso 1, continuación: `isSessionSupported('immersive-vr')` (TODO 1, parte 2) | Reporta correctamente `true` o `false` en un navegador que sí tiene la API |
| 4 | Paso 2: `renderer.xr.enabled` (TODO 2, parte 1) | WebXR queda activada (aún sin cambio visible) |
| 5 | Paso 2, continuación: `renderer.xr.setReferenceSpaceType('local-floor')` (TODO 2, parte 2) | Puedes explicar qué es un espacio de referencia |
| 6 | Paso 3: pausar `OrbitControls` mientras se presenta (TODO 3) | `setPresenting(true)` desactiva el arrastre y las flechas del teclado |
| 7 | Paso 4: restablecer la vista antes de cada sesión (TODO 4, parte 1) | Puedes explicar por qué esto importa para la comodidad |
| 8 | Paso 4, continuación: `requestSession` y `session.end()` (TODO 4, parte 2) | Al hacer clic en el botón (una vez visible) se solicita una sesión real |
| 9 | Paso 5: `sessionstart` (TODO 5, parte 1) | El texto del botón y `#xr-status` se actualizan en el instante en que empieza una sesión |
| 10 | Paso 5, continuación: `sessionend` (TODO 5, parte 2) | Terminar la sesión restablece el texto del botón y el mensaje de estado |
| 11 | Paso 6: mostrar el botón, o una alternativa (TODO 6) | El botón Enter VR finalmente aparece, o una razón clara de por qué no |
| 12 | Paso 7: la descripción de la escena en VR (TODO 7) | `#scene-description` cambia su redacción una vez que estás en VR |
| 13 | Paso 8: conectando todo en `main.js` (TODO 8) | Un panel Enter VR completo y funcional |
| 14 | Pruebas con Immersive Web Emulator | Una sesión VR real (emulada), vista dentro de DevTools |
| 15 | Pruebas en un teléfono, y cómo debería verse "no compatible" | Confirmación de que la alternativa 2D/3D funciona en todas partes |
| 16 | Revisión de comodidad en modo sentado, según [`docs/en/xr-accessibility.md`](../../docs/en/xr-accessibility.md) | Puedes señalar las líneas exactas que mantienen esta exhibición segura para el modo sentado |
| 17 | [`tests/checklist.md`](tests/checklist.md) | Una exhibición terminada y compatible con WebXR |
| 18 | Un reto de extensión | Tu extensión elegida |
| 19 | **Entregando tu trabajo** | La primera edición WebXR de la exhibición, lista para 4.2 |

### Paso 1: detección de funciones (TODO 1)

`navigator.xr` solo existe en navegadores que implementan la WebXR Device API. Aun así, `navigator.xr.isSessionSupported('immersive-vr')` devuelve una promesa que puede resolverse en `false` (la API existe, pero ahora mismo no hay ningún dispositivo o runtime immersive-vr disponible) o, en algunos navegadores, rechazarse directamente para un modo no permitido o no implementado. `supportsImmersiveVR()` trata los tres resultados como una sola cosa: no compatible, para que el resto de la página tenga una sola pregunta clara que responder, no tres.

### Paso 2: activar WebXR y elegir un espacio de referencia (TODO 2)

`renderer.xr.enabled` es `false` por defecto. Sin ponerlo en `true`, entregar una sesión a `renderer.xr.setSession()` más adelante no dibujaría nada dentro del visor. Un **espacio de referencia** es el sistema de coordenadas contra el que se mide el seguimiento del visor: `local-floor` coloca su origen a nivel del piso, bajo donde estaba la cámara en el instante en que empieza la sesión, que es lo que quiere una experiencia sentada (ver [`docs/en/xr-accessibility.md`](../../docs/en/xr-accessibility.md)). El `WebXRManager` de three.js ya usa `local-floor` por defecto internamente en esta versión; establecerlo explícitamente lo deja escrito en el código para quien lo lea, en lugar de depender de un valor por defecto que nadie anotó. Esta llamada solo funciona antes de que empiece una sesión: three.js registra una advertencia y la ignora si se llama mientras se está presentando.

### Paso 3: comodidad - pausar `OrbitControls` mientras se presenta (TODO 3)

`OrbitControls` no sabe que existe un visor. Si siguiera escuchando arrastres y flechas del teclado mientras un visor mueve la cámara según los movimientos de la cabeza de quien lo lleva puesto, ambos competirían por hacia dónde apunta la cámara. `setPresenting(true)` desactiva `controls.enabled`; `setPresenting(false)` lo vuelve a activar cuando la sesión termina. Exactamente una cosa controla la cámara en cada momento.

### Paso 4: restablecer la vista y luego solicitar una sesión (TODO 4)

Cualquiera que sea la posición y rotación de la cámara en el instante exacto en que empieza una sesión `local-floor` se convierte en el origen a nivel del piso de esa sesión. Sin este paso, una persona que hubiera arrastrado la vista de escritorio antes de hacer clic en "Enter VR" se pondría el visor mirando hacia una dirección arbitraria, posiblemente desorientadora. Llamar primero a `app.resetView()` garantiza la misma postura inicial segura para el modo sentado, cada vez.

`navigator.xr.requestSession('immersive-vr', options)` debe llamarse directamente dentro de un gesto del usuario genuino y aún activo, como el propio manejador `click` de un botón, sin nada esperado (`await`) antes en esa cadena de llamadas: esta es la regla de **activación transitoria** de la WebXR Device API, la misma idea que impide que código en segundo plano abra ventanas emergentes. `optionalFeatures: ['local-floor', 'bounded-floor']` solicita ambas, sin exigir ninguna: la sesión debe seguir funcionando en un visor que no ofrezca ni un origen a nivel del piso ni un área de juego rastreada.

### Paso 5: `sessionstart` y `sessionend` (TODO 5)

Estos dos eventos son propios de three.js: `renderer.xr` los despacha una vez que una sesión realmente empieza o termina. El objeto `XRSession` crudo de WebXR no tiene ningún evento de "inicio", solo `'end'` (usado para limpiar la variable local `session` en `xr.js`). Escuchar en `renderer.xr` en lugar de en la sesión mantiene un solo lugar responsable de avisarle al motor, al botón y a la región dinámica de estado que el modo cambió.

### Paso 6: mostrar el botón, o explicar por qué no (TODO 6)

Comprobar `supportsImmersiveVR()` una vez, al cargar la página, en lugar de reaccionar solo cuando se hace clic en un botón, significa que una persona sin visor nunca ve un botón que no haría nada. `describeUnsupported()` en `xr.js` distingue dos razones distintas para el "no": una conexión insegura (`window.isSecureContext` es `false`, así que WebXR no está disponible sin importar el dispositivo) y simplemente no tener un navegador o visor compatible. Cada mensaje también dice que la exhibición de arriba sigue funcionando por completo sin VR, porque así es.

### Paso 7: la descripción de la escena en VR (TODO 7)

`describeExhibit()` ya le decía a una persona que usa lector de pantalla qué había en la exhibición y cómo mirar alrededor. Ahora también necesita decir cuándo mirar alrededor significa girar la cabeza, no arrastrar o presionar flechas del teclado, porque un visor cambia lo que esas instrucciones significan. La bandera `presenting`, leída de `app.isPresenting()`, decide qué frase agregar.

### Paso 8: conectando todo en `main.js` (TODO 8)

`main.js` llama a `supportsImmersiveVR()`, muestra u oculta `#xr-button` según el resultado, llama a `initXR()` cuando es compatible, y actualiza `#scene-description` tanto en `sessionstart` como en `sessionend` para que nunca quede desactualizada. Ninguna API de three.js ni de WebXR aparece en `main.js`: solo lee resultados de `xr.js` y `app.js` y actualiza la página.

## Explicación del código clave

**`navigator.xr.isSessionSupported(mode)`** devuelve una promesa que se resuelve en `true` o `false` según si se puede crear ahora mismo una sesión de ese modo (`'immersive-vr'`, `'immersive-ar'` o `'inline'`); requiere un contexto seguro y puede rechazarse en lugar de resolverse en `false` en algunos navegadores.

**`renderer.xr.enabled`** y **`renderer.xr.setReferenceSpaceType(type)`** deben establecerse antes de que empiece una sesión; cambiar el tipo de espacio de referencia mientras se presenta solo registra una advertencia.

**`renderer.xr.addEventListener('sessionstart' | 'sessionend', handler)`** son eventos sintéticos propios de three.js, no parte del objeto `XRSession` crudo de WebXR, que solo tiene `'end'`.

**`navigator.xr.requestSession('immersive-vr', { optionalFeatures })`** debe llamarse de forma síncrona dentro de un gesto del usuario; `session.end()` la termina desde tu propio código, y el menú del sistema del propio visor también puede terminarla, disparando el mismo evento `'end'` en ambos casos.

**`renderer.setAnimationLoop(callback)`**, ya usado en 3.4 para el bucle de renderizado de escritorio, no necesita ningún cambio para WebXR: una vez que se entrega una sesión a `renderer.xr.setSession()`, three.js empieza a llamar al mismo callback una vez por cuadro XR en lugar de una vez por cuadro del navegador.

## Accesibilidad 3D y XR

- La descripción de la escena (`#scene-description`) refleja cualquiera que sea la vista activa, escritorio o VR, y se actualiza en el instante en que una sesión empieza o termina.
- La cámara nunca se mueve por sí sola, ni en una pantalla ni dentro de un visor: solo la propia mano, las flechas del teclado o los movimientos de cabeza de quien aprende la mueven.
- `local-floor`, junto con la altura de ojos de 1.6 m y la distancia de visión de 4.2 m ya elegidas en 3.4, mantienen toda la experiencia VR usable estando sentada, sin nada por encima de la altura de la cabeza ni detrás de quien la usa.
- Cada acción disponible en VR (mirar alrededor) tiene una alternativa completa e igual de capaz fuera de ella: arrastrar, las flechas del teclado, y los botones "Turn left"/"Turn right" (girar a la izquierda/girar a la derecha).
- La información de la exhibición también vive en una lista HTML siempre presente y una descripción de texto siempre presente, exactamente como en 3.4, sin importar si WebGL, WebXR o un visor están disponibles.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| El texto visible del botón Enter VR siempre coincide con lo que hace en ese momento | 2.5.3, 4.1.2 | "Enter VR" y "Exit VR" dicen exactamente qué pasará a continuación, tanto para personas videntes como para quienes usan lector de pantalla. |
| `#xr-status` es una región dinámica que anuncia los cambios de sesión | Buena práctica | Una persona que no puede ver la vista del visor igual escucha que algo cambió. |
| Cada acción en XR tiene una alternativa fuera de XR | 2.1.1 | Toda la exhibición es completamente usable con un mouse, un dedo o un teclado; VR siempre es opcional. |
| La experiencia funciona sentada, sin nada fuera del alcance cómodo ni por encima de la altura de la cabeza | Buena práctica | No todas las personas pueden pararse, alcanzar cosas altas o girarse libremente. |
| La cámara nunca se mueve a menos que quien aprende la mueva, en una pantalla o en un visor | 2.2.2 | El movimiento no solicitado desorienta, y puede causar malestar físico real en VR. |
| El contenido de la exhibición existe como HTML, no solo dentro del lienzo o un visor | 1.3.1 | La información nunca se pierde cuando WebGL, WebXR o un dispositivo no están disponibles. |

## Consideraciones de rendimiento

El `WebXRManager` de three.js ya se encarga por ti de las partes sensibles al rendimiento de presentar: mientras una sesión está activa, fija la relación de píxeles del renderer en `1` y la redimensiona al framebuffer propio del visor, y luego restablece la relación de píxeles y el tamaño de tu página en el instante en que la sesión termina (verificado en el código fuente de r186: ningún código de esta lección necesita hacer ninguna de las dos cosas). Lo que no hace por ti es nada sobre la propia escena: esta exhibición es lo bastante ligera (tres mallas primitivas, sin texturas) que el renderizado estéreo, dos vistas en lugar de una, cuesta poco aquí. Una escena más pesada necesitaría todo lo que cubre la lección de rendimiento de la Fase 3 (3.6), y el doble una vez que se renderiza dos veces por cuadro en lugar de una.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Olvidar `renderer.xr.enabled = true` | La sesión empieza, pero nada se dibuja dentro del visor | Establécelo una vez, en `app.js`, antes de que pueda empezar cualquier sesión |
| Llamar a `requestSession()` después de un `await` anterior en el manejador de clic | El navegador la rechaza: la activación transitoria ya expiró | Llámala como lo primero que hace el manejador |
| Escuchar un evento `'start'` en el propio `XRSession` | No pasa nada; ese evento no existe en la sesión cruda | Escucha `'sessionstart'` en `renderer.xr` en su lugar |
| Dejar `OrbitControls` activado mientras se presenta | Arrastres o teclas perdidas compiten con el seguimiento propio del visor | Lo opuesto de `setPresenting(false)`: desactívalo en `'sessionstart'` |
| No restablecer la vista antes de solicitar una sesión | Quien aprende puede empezar VR mirando hacia una dirección arbitraria y desorientadora | Llama a `app.resetView()` justo antes de `requestSession()` |
| Suponer que `isSessionSupported` resolviéndose en `true` garantiza que hay un visor conectado ahora mismo | `requestSession()` puede fallar de todos modos | Siempre envuelve `requestSession()` en try/catch y muestra su `error.message` |

## Solución de problemas

**El botón Enter VR nunca aparece, ni siquiera en Chrome.** Comprueba que estás en `http://localhost` o `http://127.0.0.1`, no en una dirección IP de red común: WebXR requiere un contexto seguro, y solo esas dos cuentan como seguras sin HTTPS. Revisa la consola en busca de una promesa rechazada de `isSessionSupported`.

**Hacer clic en Enter VR no hace nada, sin ningún error.** Probablemente `renderer.xr.enabled` nunca se puso en `true`. Revisa `app.js`.

**El texto de estado nunca se actualiza cuando empieza una sesión.** Comprueba que el listener está en `renderer.xr`, no en el objeto `session`: solo `renderer.xr` despacha `'sessionstart'`.

**`requestSession` se rechaza con un error relacionado con seguridad.** La llamada ocurrió demasiado tarde, después de un `await`, fuera del propio turno del manejador de clic. Muévela a la primera línea dentro de `enterVR()`.

**El panel de Immersive Web Emulator está vacío, o la página lo ignora.** Vuelve a cargar la página después de abrir el panel de DevTools de la extensión y elegir un dispositivo: el `navigator.xr` emulado se inyecta de nuevo en cada carga de página. En Firefox la extensión no está disponible en absoluto; usa Chrome o Edge para esta sesión de pruebas.

**En mi teléfono, el botón nunca aparece.** Esto suele ser correcto, no un error: la mayoría de los navegadores de teléfono no implementan `immersive-vr` a menos que el teléfono esté emparejado con un visor compatible (por ejemplo, a través del propio navegador de un visor independiente). El resto de la página debería seguir funcionando como la exhibición 2D/3D común.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.md)**: agrega un segundo botón Enter VR, mantenido en sincronía con el primero.
2. **[Creativo](challenges/challenge-2.md)**: reescribe las palabras del panel Enter VR para tu propio idioma o comunidad, y opcionalmente cambia un objeto por uno de tu propia cultura.
3. **[Explorador](challenges/challenge-3.md)**: compara tu propio código contra `VRButton` de three.js, y detecta la función `immersive-ar` junto con `immersive-vr`.

## Cómo entregar tu trabajo

1. Completa cada elemento de [`tests/checklist.md`](tests/checklist.md).
2. Toma capturas de pantalla: la exhibición de escritorio, el panel Enter VR antes y después de detectar la compatibilidad con WebXR, y, si probaste con Immersive Web Emulator o un visor, la propia vista del dispositivo del emulador.
3. Guárdalas, junto con este proyecto, en tu diario de aprendizaje y portafolio. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. En tu diario, responde: ¿por qué importa restablecer la vista antes de solicitar una sesión, para la comodidad, y qué podría salir mal para una estudiante si una lección se saltara ese paso?

## Lecturas adicionales

- [W3C: WebXR Device API](https://www.w3.org/TR/webxr/) (en inglés)
- [MDN: WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API) (en inglés)
- [MDN: `XRReferenceSpace`](https://developer.mozilla.org/en-US/docs/Web/API/XRReferenceSpace) (en inglés)
- [Documentación de three.js: `WebXRManager`](https://threejs.org/docs/#api/en/renderers/webxr/WebXRManager) (en inglés)
- [Immersive Web Emulator (GitHub)](https://github.com/meta-quest/immersive-web-emulator) (en inglés)

## Mujeres que conviene conocer

**Luciana Nedel** es profesora titular en la UFRGS de Brasil, donde ha investigado realidad virtual, visualización inmersiva e interacción 3D desde 2002. Fue presidenta del programa de IEEE VR 2025 y forma parte del comité de programa de IEEE VR 2026.

Los espacios de referencia, los eventos de sesión y el restablecimiento de la vista pueden sentirse como plomería técnica, pero existen para hacer posibles experiencias como las que estudia su investigación: cómo las personas perciben, se mueven a través de, e interactúan dentro de espacios virtuales y rastreados. Las decisiones de comodidad en modo sentado que toma esta lección son una pieza pequeña y práctica del campo mucho más grande en el que ella trabaja.

> **Nota editorial: verificar antes de publicar.** Los datos biográficos de las secciones «Mujeres que conviene conocer» deben verificarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

La **WebXR Device API**, todo lo que hay detrás de `navigator.xr` en esta lección, la publica el Immersive Web Working Group del W3C; a mediados de 2026 es un Candidate Recommendation Draft dentro del camino hacia Recommendation, aún no una Recommendation terminada, lo cual es una razón por la que esta lección detecta funciones en lugar de suponer compatibilidad. Los **contextos seguros**, la regla de HTTPS-o-localhost de la que depende WebXR, son su propia especificación del W3C, compartida por muchas APIs de navegador. Three.js y su `WebXRManager` no son un estándar: son un proyecto de código abierto que implementa por debajo esta misma API del W3C, por eso llamadas como `renderer.xr.setSession()` se corresponden tan directamente con `navigator.xr.requestSession()`.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
