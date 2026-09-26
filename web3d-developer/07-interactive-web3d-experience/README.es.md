# Proyecto final de la Fase 3: Experiencia interactiva en Web3D

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `web3d-developer` · **Lección:** `interactive-web3d-experience-07` · **Tiempo:** unas 20 horas · 27 sesiones de 45 minutos · unas 7 semanas con 4 sesiones por semana

---

> Publica una experiencia pulida en Web3D usando A-Frame o three.js.

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Integrar el código de varias lecciones de three.js (o de A-Frame, si tomaste ese camino) en una sola página pulida, con sensación de estar publicada, sin reescribir lo que ya funciona.
2. Construir un panel de información que se abra con los detalles correctos para un objeto 3D seleccionado, incluidos crédito y licencia para un recurso cargado.
3. Plantear un límite de rendimiento como números, y verificar una escena contra él en vivo, en lugar de solo adivinar si es "lo bastante rápida".
4. Mantener un gemelo 2D de una escena 3D: los mismos datos, en palabras, siempre presentes, no solo como alternativa.
5. Escribir notas de versión (`CHANGELOG.md`) que describan qué entregó realmente una versión de un proyecto.
6. Reunir una revisión de accesibilidad completa en una escena 3D existente: descripción de la escena, ruta por teclado, movimiento reducido, y contraste de color, todo revisado en conjunto en lugar de uno a la vez.
7. Leer un brief y una rúbrica antes de construir, y usar la rúbrica para revisar tu propio trabajo antes de entregarlo.
8. Explicar, en tus propias palabras, las ventajas y desventajas detrás de la exhibición que elegiste mantener, cambiar, o extender.

## Requisitos previos

- **Curso 3.1: Fundamentos de Web3D** hasta **Curso 3.6: Ingeniería de rendimiento para Web3D** (este proyecto final continúa la exhibición construida ahí; la solución de referencia aquí continúa la edición en three.js de 3.4-3.6).
- Comodidad leyendo y extendiendo módulos de JavaScript existentes, en lugar de escribir una escena 3D desde cero.
- Un proyecto basado en GLTFLoader que puedas ejecutar a través de un servidor local (como lo ha sido cada lección de Web3D Developer hasta ahora).

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Un navegador moderno (Chrome, Firefox, Edge, o Safari) | Ejecuta la exhibición y su canvas de WebGL 2. | Gratis |
| Un servidor local de archivos estáticos (por ejemplo, `python3 -m http.server`, o Live Server de VS Code) | Sirve la página por `http://`, que tanto los módulos ES como la carga de glTF basada en `fetch()` requieren. | Gratis |
| Un editor de texto (por ejemplo, VS Code) | Editar HTML, CSS, y JavaScript. | Gratis |
| DevTools del navegador (integrado en cada navegador de arriba) | La Consola, para errores; el panel Performance, para medir tus números de límite. | Gratis |

Ninguna cuenta de pago, ninguna clave de API, y ningún servicio bloqueado en China continental se usa en ninguna parte de esta lección.

## Lo que vas a construir

El proyecto final de la Fase 3: la exhibición cultural virtual que has construido una lección a la vez desde 3.1, publicada como una sola página pulida. Esta solución de referencia continúa el camino de three.js de 3.4 a 3.6 (las mismas cinco exhibiciones: una olla de barro, un aro de canasta tejida, una piedra de jade, una figura de zorro, y un camión de leche Cesium) y agrega encima el trabajo de integración propio de este proyecto final: un panel de información que se abre con los detalles de cada exhibición, un límite de rendimiento verificado en vivo contra los números de abajo, una página de atribución independiente, y notas de versión en `CHANGELOG.md`. Si en cambio construiste el camino de A-Frame en 3.2-3.3, integra desde ahí; el brief y la rúbrica aplican de cualquier forma.

La solución de referencia está en [`completed/`](completed/). Tiene 6 TODOs numerados entre `starter/index.html` y `starter/js/main.js`; todo lo demás en el starter (el motor de 3.5: `js/app.js`, `js/exhibit.js`, `js/loader.js`, `js/describe.js`) ya funciona, porque este proyecto final trata de integración, no de construir una escena 3D desde cero. Lee [`starter/brief.md`](starter/brief.md) y [`starter/rubric.md`](starter/rubric.md) antes de empezar.

Más adelante, una vez que "Mi XR Camp" (2.1-2.3) tenga un lugar para ello, esta exhibición del proyecto final es el tipo de proyecto al que enlazaría una entrada de diario de aprendizaje o de portafolio: guarda tus capturas de pantalla y tu `CHANGELOG.md` en algún lugar donde puedas volver a encontrarlos.

## Guía de carpetas

```text
07-interactive-web3d-experience/
├── README.md
├── ATTRIBUTION.md
├── starter/                 # begin here: brief.md, rubric.md, and 6 numbered TODOs
│   ├── brief.md
│   ├── rubric.md
│   ├── index.html
│   ├── attribution.html
│   ├── CHANGELOG.md
│   ├── styles.css
│   └── js/
├── completed/               # reference solution
│   ├── index.html
│   ├── attribution.html
│   ├── CHANGELOG.md
│   ├── styles.css
│   └── js/
├── challenges/               # Three challenges: Foundation is required
├── tests/                    # self-review checklist
├── assets/                   # the two glTF models, reused unchanged from 3.5
└── screenshots/
```

## Configuración

1. Abre esta carpeta en tu editor.
2. Inicia un servidor local en la raíz del repositorio (por ejemplo `python3 -m http.server 8766`), para que la página se sirva por `http://`, no abierta como una ruta `file://`.
3. Abre `starter/index.html` a través de ese servidor.
4. Lee [`starter/brief.md`](starter/brief.md) y [`starter/rubric.md`](starter/rubric.md) por completo antes de escribir cualquier código.
5. Confirma que el starter ya funciona: cinco exhibiciones cargan, el gemelo 2D las lista, y los botones Seleccionar, Girar a la izquierda/derecha, Pausar, y Recargar funcionan todos. Ese es el motor de 3.5, sin cambios; nada aquí está roto antes de que empieces.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Lee `brief.md` y `rubric.md`; revisa las carpetas completadas de 3.1-3.6 para ver qué puedes reutilizar. | Un plan breve: qué exhibiciones mantienes, cambias, o agregas. |
| 2 | Configura el starter y confirma que el motor de 3.5 funciona sin cambios. | Cinco exhibiciones cargando, seleccionables, y animándose en tu navegador. |
| 3 | Lee por completo `js/exhibit.js`, `js/loader.js`, `js/describe.js`, y `js/app.js`. | Notas sobre qué controla cada archivo, así integras en lugar de reescribir. |
| 4 | Paso 3: construye el contenedor del panel de información (TODO 1). | Un elemento `#info-panel` vacío pero presente en la página. |
| 5 | Paso 4: construye el marcado del límite de rendimiento (TODO 2). | `#budget-calls`, `#budget-triangles`, y `#budget-result` visibles en la página. |
| 6 | Paso 5: escribe `renderInfoPanel()` para las tres exhibiciones primitivas (TODO 3, parte 1). | Una función que devuelve el encabezado y párrafo correctos para un primitivo. |
| 7 | Paso 5, continuación: extiende `renderInfoPanel()` para el crédito y enlace de un modelo cargado (TODO 3, parte 2). | La misma función, ahora correcta para las cinco exhibiciones. |
| 8 | Paso 6: llama a `renderInfoPanel()` desde `selectItem()` (TODO 4). | Hacer clic o tocar cualquier exhibición abre su panel de información. |
| 9 | Pase solo con teclado: usa Tab hasta cada botón Seleccionar y confirma que el panel se abre de la misma forma. | Prueba de que el panel de información tiene una ruta completa por teclado, no solo de puntero. |
| 10 | Paso 7: agrega la constante `BUDGET` y la comparación de llamadas de dibujo (TODO 5, parte 1). | Números de llamadas de dibujo en vivo junto a tu límite. |
| 11 | Paso 7, continuación: agrega la comparación de triángulos y el texto de aprobado/reprobado (TODO 5, parte 2). | Una oración de resultado del límite que cambia correctamente. |
| 12 | Paso 8: limpia el panel de información al recargar (TODO 6); confirma que la liberación de memoria sigue cuadrando. | Una recarga limpia sin texto viejo en el panel de información. |
| 13 | Paso 9: mide tus propios números con `renderer.info` y el panel Performance. | Números reales "en mi máquina" para la tabla de rendimiento del README. |
| 14 | Paso 10: construye la página de atribución independiente. | `attribution.html` acreditando ambos modelos con enlaces funcionales. |
| 15 | Verifica `ATTRIBUTION.md` contra `js/exhibit.js` y la página de atribución. | Tres copias consistentes de los mismos datos de crédito y licencia. |
| 16 | Paso 11: escribe la entrada `1.0.0` de `CHANGELOG.md`. | Una nota de versión que describe lo que realmente entrega tu proyecto final. |
| 17 | Paso 12: un pase de accesibilidad: descripción de la escena, regiones dinámicas, y orden de encabezados. | Texto relevante para lector de pantalla confirmado leyéndolo tú misma en voz alta. |
| 18 | Un pase de movimiento reducido: confirma que la animación inicia en pausa cuando el sistema operativo lo pide. | El movimiento reducido comportándose correctamente en la emulación de tu navegador. |
| 19 | Prueba a 390 px y 1280 px; corrige cualquier desbordamiento horizontal. | Una página que funciona en ambos anchos. |
| 20 | Un pase completo solo con teclado por cada control de la página. | Cada interacción confirmada alcanzable y usable sin un mouse. |
| 21 | Prueba la ruta de alternativa sin WebGL (desactiva WebGL, o usa DevTools para simularlo). | Confirmación de que el gemelo 2D sigue llevando cada dato. |
| 22 | Vuelve a leer tu propio código y comentarios buscando intención, no solo corrección. | Comentarios que explican por qué, no solo qué. |
| 23 | Repasa `tests/checklist.md` de principio a fin. | Cada casilla marcada, o una corrección para la que no lo esté. |
| 24 | Haz el reto Fundamento (`challenges/challenge-1.es.md`). | El reto obligatorio completo. |
| 25 | Elige Creativo o Explorador, y empiézalo. | Una primera versión funcional de tu extensión elegida. |
| 26 | Termina tu reto elegido; actualiza `CHANGELOG.md` si cambiaste algo. | La extensión completa y documentada. |
| 27 | Entrega final: capturas de pantalla, la lista revisada de nuevo, y tu pregunta de diario respondida. | Un proyecto final listo para entregar. |

### Paso 1: lee el brief y la rúbrica

Abre [`starter/brief.md`](starter/brief.md) y [`starter/rubric.md`](starter/rubric.md). Este proyecto final, a diferencia de lecciones anteriores, empieza con un brief: un documento breve que nombra qué entregar, y una rúbrica que nombra exactamente cómo se revisará. Leer ambos antes de escribir cualquier código es en sí parte de la habilidad que enseña esta lección: así se ve el brief de un proyecto real.

### Paso 2: recorre el starter

Abre `starter/js/exhibit.js`, `js/loader.js`, `js/describe.js`, y `js/app.js`. Los cuatro están terminados, sin cambios respecto a [3.5](../05-threejs-interaction-assets-and-animation/completed/): los pedestales, los dos modelos glTF, la selección por raycasting, y el `AnimationMixer` propio de cada modelo. Tu trabajo en este proyecto final vive solo en `js/main.js` e `index.html`.

### Paso 3: el contenedor del panel de información (TODO 1)

En `starter/index.html`, encuentra "3. Info panel" y agrega un elemento contenedor con `id="info-panel"`, `role="status"`, y un mensaje inicial. `role="status"` significa que un lector de pantalla anuncia el nuevo contenido del panel cuando cambia, sin que quien aprende necesite mover el foco hasta ahí por su cuenta.

### Paso 4: el marcado del límite de rendimiento (TODO 2)

En el mismo archivo, encuentra "5. Performance budget" y agrega el `<dl>` con `#budget-calls` y `#budget-triangles`, además de un párrafo `#budget-result` con `role="status"`. Son elementos simples con texto inicial; `js/main.js` los completa.

### Paso 5: `renderInfoPanel()` (TODO 3)

En `starter/js/main.js`, escribe `renderInfoPanel(item)`. Dado `null`, muestra un mensaje de "nada seleccionado". Dada una exhibición primitiva, muestra un encabezado y de qué está hecha. Dado un modelo cargado, también muestra el crédito del modelo y un enlace a su origen y licencia: los mismos datos que `js/exhibit.js` ya lleva en `data.credit` y `data.sourceUrl`, leídos una vez, no vueltos a escribir.

### Paso 6: conectar el panel de información con la selección (TODO 4)

Llama a `renderInfoPanel(app.getSelected())` desde dentro de `selectItem()`. Esta es la única línea que conecta la función del TODO 3 con cada forma existente de seleccionar una exhibición (hacer clic en el canvas, tocarlo, o un botón Seleccionar), porque los tres ya llaman a `selectItem()`.

### Paso 7: la verificación del límite de rendimiento (TODO 5)

Agrega una constante `BUDGET` (`{ calls: 20, triangles: 25000 }`) y, dentro de `updateStats()`, compara `app.renderer.info.render.calls` y `.triangles` contra ella. Escribe los números en vivo y la oración de aprobado/reprobado en los elementos del Paso 4. Este es el mismo objeto `renderer.info` que usó 3.6 para demostrar que la liberación de memoria funcionaba; aquí demuestra que la exhibición se mantiene dentro de un límite declarado.

### Paso 8: limpiar el panel al recargar (TODO 6)

Llama a `renderInfoPanel(null)` dentro del manejador de clic del botón Recargar, junto con limpiar el estado `aria-pressed` de los botones Seleccionar. Sin esto, una recarga dejaría mostrándose el panel de información de la selección anterior, junto a una exhibición donde ya nada está realmente seleccionado.

### Paso 9: medir tus propios números

Abre el panel Performance en las DevTools de tu navegador, y también lee `app.renderer.info` directamente (como ya lo muestra el panel Stats). Registra lo que ves, en tu propia máquina, y escribe esos números en la tabla "Consideraciones de rendimiento" de este README más abajo, reemplazando los que se escribieron cuando se redactó esta lección. "En mi máquina" es la forma correcta y honesta de reportar un número de rendimiento; será distinto del propio dispositivo de una estudiante, y eso es esperado, no un error.

### Paso 10: la página de atribución y `ATTRIBUTION.md`

`completed/attribution.html` es una página independiente que acredita ambos modelos por completo, separada de la lista de atribución en la página. Construye lo mismo para tu propia versión, y mantén `ATTRIBUTION.md` sincronizado con ella: los mismos datos, con las mismas palabras, en ambos lugares, para que nadie tenga que adivinar cuál está actualizado.

### Paso 11: la entrada `1.0.0` de `CHANGELOG.md`

Escribe una entrada `1.0.0` en `CHANGELOG.md` que describa lo que entrega tu proyecto final: qué es nuevo (el panel de información, el límite de rendimiento, la página de atribución), y cualquier limitación conocida (por ejemplo, que el límite se midió en una sola máquina). Es la misma disciplina que enseña frontend-engineer/09 para una versión: decir qué se entregó, en una entrada con fecha, no disperso en mensajes de commit que nadie volverá a leer.

### Paso 12: un pase de accesibilidad

Lee en voz alta el texto de `scene-description`. Confirma que cada región dinámica (`role="status"`) anuncia exactamente una vez por cambio, no en cada cuadro de animación. Confirma que el orden de encabezados no se rompe (`h1` → `h2` → `h3`, sin saltar ningún nivel). Este paso reúne verificaciones que lecciones anteriores enseñaron una a la vez; un proyecto final es donde todas tienen que sostenerse a la vez.

## Explicación del código clave

- **`renderInfoPanel(item)`** reemplaza el texto de selección de una sola línea de lecciones anteriores con un panel real: un encabezado que nombra la exhibición, y un párrafo sobre su material o su crédito. Lee de los mismos datos `ITEMS` que ya exporta `js/exhibit.js`, así el panel nunca puede decir algo que la escena misma no muestre.
- **La constante `BUDGET`** convierte "¿esto es lo bastante rápido?" en una pregunta de sí o no con un número declarado, verificado cada vez que se ejecuta `updateStats()` (dos veces por segundo). Declarar un límite antes de medir, y luego comparar contra él, es lo opuesto a adivinar.
- **`role="status"` en `#info-panel` y `#budget-result`** son regiones dinámicas ARIA: un lector de pantalla anuncia su nuevo contenido automáticamente. Ambos empiezan con texto estático para que nunca estén vacíos antes de que se ejecute JavaScript.
- **`attribution.html`** existe por separado de la lista de atribución en la página para que una revisora, o una futura estudiante que reutilice tus recursos, tenga una página clara donde revisar las licencias, sin necesitar ejecutar la exhibición en absoluto.
- **`CHANGELOG.md`** es un archivo Markdown simple, no una base de datos ni una herramienta: las notas de versión son un hábito, no una función, y ese hábito es lo que enseña este paso.
- **Los seis TODOs numerados están todos en `index.html` y `main.js`**, nunca en `exhibit.js`, `loader.js`, `describe.js`, o `app.js`. Esa división es deliberada: un proyecto final que integra código que ya funciona, en lugar de reescribirlo, es una habilidad más realista que empezar desde cero cada vez.

## Accesibilidad en 3D y XR

Este proyecto final es 3D de principio a fin, continuando la exhibición de 3.1-3.6, así que el trabajo de accesibilidad aquí no es un momento dentro de una página 2D: es la página entera. Cada requisito de abajo ya se enseñó en una lección anterior de Web3D Developer; el trabajo de este proyecto final es asegurarse de que todos sigan cumpliéndose una vez que se agregan encima el panel de información y el límite de rendimiento.

- La descripción de la escena se actualiza en cada cambio relevante: selección, estado de la animación, y restablecer cámara (`js/describe.js`, reutilizado sin cambios de 3.5).
- El gemelo 2D (`#exhibit-list`) lleva los mismos datos que la vista 3D y el panel de información, así ningún dato existe solo dentro del canvas.
- Cada interacción tiene una ruta por teclado: los botones Seleccionar, Girar a la izquierda/derecha, Restablecer vista, Pausar/Reanudar, y Recargar, ninguno de los cuales requiere un puntero.
- Se respeta el movimiento reducido: `window.__reducedMotion` inicia la animación en pausa, y el botón de Pausa siempre indica qué hará a continuación.
- La cámara nunca se mueve por sí sola; `controls.enableDamping` solo suaviza un movimiento que quien aprende ya inició.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| `#info-panel` y `#budget-result` usan `role="status"` | 4.1.3 (Mensajes de estado) | Alguien que usa lector de pantalla escucha que el panel de información se abre, y que el resultado del límite cambia, sin mover el foco para averiguarlo. |
| El nombre accesible de cada botón empieza con su palabra visible ("Seleccionar: Figura de zorro") | 2.5.3 (Etiqueta en el nombre) | Alguien que usa control por voz o lector de pantalla puede activar un botón por la palabra que ve. |
| El color no es la única señal de exceder el límite | 1.4.1 (Uso del color) | `#budget-result.over-budget` cambia el fondo y el texto, no solo una muestra de color. |
| El foco es visible en cada control | 2.4.7 (Foco visible) | El contorno `:focus-visible` de este proyecto, sin cambios de lecciones anteriores, debe seguir mostrándose una vez que se agregan controles nuevos. |
| El movimiento reducido detiene toda animación | 2.2.2 (Pausar, detener, ocultar) | Tanto el giro de la piedra de jade como la animación propia de cada modelo inician en pausa cuando el sistema operativo pide menos movimiento. |
| `role="list"` en listas con estilo `list-style: none` | Buena práctica (Safari elimina la semántica de lista si no) | El gemelo 2D, los botones Seleccionar, y la lista de atribución se siguen anunciando como listas. |

## Consideraciones de rendimiento

El límite declarado de este proyecto final, una vez que cada exhibición ha cargado: **como máximo 20 llamadas de dibujo y 25,000 triángulos.** Estos números se midieron en la máquina donde se escribió esta lección (una laptop de gama media, Chrome, gráficos integrados), con un pequeño margen sobre lo que realmente alcanza la solución de referencia; consulta el Paso 9 de arriba para medir los tuyos y actualizar esta tabla.

| Medición | En mi máquina (solución de referencia) | Límite |
| --- | --- | --- |
| Llamadas de dibujo, las cinco exhibiciones cargadas | 11 | 20 |
| Triángulos, las cinco exhibiciones cargadas | unos 18,000 | 25,000 |
| Geometrías en memoria después de Recargar | coincide con el conteo antes de Recargar | debe coincidir (demuestra la liberación) |
| Texturas en memoria después de Recargar | coincide con el conteo antes de Recargar | debe coincidir (demuestra la liberación) |
| Tamaño total del proyecto (`assets/` + código) | muy por debajo de 1 MB | 20 MB (límite del proyecto) |

Si tu propia exhibición excede este límite, aplica una técnica de 3.6 (instanciado, geometría fusionada, una textura más pequeña) o sube la constante `BUDGET` y explica por qué en `CHANGELOG.md`: un límite que cambió a propósito, y quedó anotado, es muy distinto de un límite que nadie revisó.

## Errores comunes

| Error | Qué pasa | En vez de eso |
| --- | --- | --- |
| Llamar a `renderInfoPanel()` solo desde el manejador de clic del canvas | Seleccionar con un botón Seleccionar (la ruta por teclado) nunca abre el panel | Llámala una vez, dentro de `selectItem()`, que ya llama cada ruta de selección |
| Codificar a mano los números del límite en el HTML en lugar de en `js/main.js` | Los números en vivo dejan de actualizarse, y el texto de aprobado/reprobado nunca cambia | Escríbelos una vez, en la constante `BUDGET`, y léelos de ahí |
| Escribir `ATTRIBUTION.md` y `attribution.html` de memoria, por separado | Los dos se desvían la primera vez que se edita cualquiera de los dos | Copia los datos de `data.credit` y `data.sourceUrl` de `js/exhibit.js` en ambos |
| Saltarse `CHANGELOG.md` porque "todavía no se entregó nada" | El proyecto final no tiene ningún registro de lo que realmente contiene | Escribe la entrada `1.0.0` una vez que se cumplan las ocho filas de la rúbrica, describiendo exactamente eso |
| Medir el rendimiento una vez y nunca en tu propia máquina | Los números del README describen la computadora de otra persona, no la tuya | Repite el Paso 9 tú misma, y reemplaza los números de la tabla de arriba |

## Solución de problemas

**El panel de información nunca aparece, incluso después de terminar el TODO 3 y el TODO 4.** Revisa que `#info-panel` exista en `index.html` con exactamente ese `id` (TODO 1); un error de tipeo aquí falla en silencio, porque `document.getElementById()` simplemente devuelve `null` y `renderInfoPanel()` no hace nada.

**Los números del límite muestran `0 / 20` para siempre.** `updateStats()` se ejecuta en un `setInterval`, no una sola vez. Confirma que el intervalo no se limpió por accidente, y que los elementos del TODO 2 existen antes del primer tick del intervalo.

**Firefox:** el panel Performance está en una disposición de pestañas distinta a la de Chrome; busca "Performance" en la misma barra de herramientas de DevTools (F12). Los números de `renderer.info` son idénticos en todos los navegadores; solo difiere la presentación del panel de DevTools.

**Safari:** `role="list"` se requiere en cualquier lista con `list-style: none`, exactamente como enseñaron lecciones anteriores; de lo contrario, el VoiceOver de Safari anuncia la lista como texto plano. Confirma que lo conservaste en cualquier marcado de lista nuevo que agregues.

**La lista de la exhibición duplica entradas después de una recarga.** `renderItemList()` usa `replaceChildren()`, no `append()`; si una edición del reto Creativo cambió eso a `append()`, los objetos viejos se quedan en el DOM junto a los nuevos.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: termina los seis TODOs numerados para que el panel de información y la verificación del límite de rendimiento funcionen ambos.
2. **[Creativo](challenges/challenge-2.es.md)**: reemplaza una exhibición con algo de tu propia cultura o comunidad.
3. **[Explorador](challenges/challenge-3.es.md)**: agrega una sexta exhibición usando una técnica que este proyecto final no usa de otra forma, y mide su costo.

## Cómo entregar tu trabajo

1. Repasa [`tests/checklist.md`](tests/checklist.md) de principio a fin, incluida la sección "3D and XR (manual)".
2. Toma dos o tres capturas de pantalla: la exhibición con un objeto seleccionado (panel de información abierto), y el panel del límite de rendimiento mostrando un resultado en vivo.
3. Guárdalas en tu diario de aprendizaje y tu portafolio. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. Pregunta de diario: ¿qué exhibición mantuviste exactamente como estaba en 3.5, y cuál cambiaste o agregaste para el reto Creativo o Explorador, y por qué tomaste esa decisión?

## Lecturas adicionales

- [MDN: ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) (en inglés)
- [three.js manual: WebGLRenderer.info](https://threejs.org/docs/#api/en/renderers/WebGLRenderer.info) (en inglés)
- [Keep a Changelog](https://keepachangelog.com/) (en inglés)
- [Khronos glTF-Sample-Assets](https://github.com/KhronosGroup/glTF-Sample-Assets) (en inglés)
- [W3C WAI: Writing a good alt text and text alternative](https://www.w3.org/WAI/tips/writing/) (en inglés)

## Mujeres que conviene conocer

Anita Havele es directora ejecutiva del Web3D Consortium, el organismo de estándares detrás de X3D, el formato de 3D para la web estandarizado por ISO/IEC, cuya versión 4.0 (anunciada en marzo de 2024) se integra con HTML5 y admite glTF, el mismo formato que usan los propios modelos de este proyecto final. Coordina el trabajo del Consorcio con el W3C, Khronos, OGC, e ISO, y fue copresidenta general de la conferencia ACM Web3D 2025; al inicio de su carrera trabajó en estándares de ingeniería en GM/EDS.

Publicar una experiencia pulida en Web3D, como pide este proyecto final, depende de que estándares como glTF y X3D se mantengan interoperables entre herramientas y navegadores, un trabajo que rara vez capta la atención de quien aprende, porque tiene éxito precisamente al ser invisible. El rol de Havele, coordinando el trabajo de un organismo de estándares con otros varios, es un recordatorio de que "simplemente funciona" suele ser el resultado de que personas mantienen deliberadamente los formatos compatibles.

> **Nota editorial: verificar antes de publicar.** Los datos biográficos de las secciones «Mujeres que conviene conocer» deben verificarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

Los modelos de esta lección son archivos glTF 2.0, un estándar del Khronos Group para la transmisión eficiente de recursos 3D, cargados aquí con el propio `GLTFLoader` de three.js. El panorama más amplio de estándares de Web3D incluye al W3C (que administra WebGL y, junto con Khronos, WebGPU) y al Web3D Consortium (que administra X3D y coordina con Khronos en glTF). Un proyecto final que "simplemente funciona" en distintos navegadores descansa en silencio sobre el acuerdo de estos tres organismos sobre los mismos formatos.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
