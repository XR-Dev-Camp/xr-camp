# Herramientas para desarrolladores, depuración y pruebas

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `web-developer` · **Lección:** `developer-tools-debugging-and-testing-07` · **Tiempo:** unas 9 horas · 12 sesiones de 45 minutos · unas 3 semanas con 4 sesiones por semana

---

> Completa un reto guiado de depuración y accesibilidad.

---

## Objetivos de aprendizaje

Al terminar este proyecto serás capaz de:

1. Usar las herramientas para desarrolladores del navegador: Elements y Styles, Console, Network, el modo de dispositivo y el depurador.
2. Descubrir por qué no se aplica un estilo, y corregirlo.
3. Leer un error de JavaScript, encontrar su línea y corregir su causa.
4. Pausar un script con un punto de interrupción y avanzar por él línea por línea.
5. Encontrar problemas de accesibilidad con herramientas automáticas y con tus propias pruebas.
6. Probar de forma sistemática con una lista de verificación.
7. Escribir un reporte de error con el que otra persona pueda actuar.

## Requisitos previos

- **Curso 1.6: Fundamentos de JavaScript.** Construiste el explorador de programas.
- **Curso 1.5: Fundamentos de accesibilidad web.** Sabes cómo auditar una página.

## Herramientas necesarias

| Herramienta | Para qué sirve | Costo |
| --- | --- | --- |
| Chrome, Edge o Firefox, con herramientas para desarrolladores | Todos los pasos | Gratis |
| [axe DevTools](https://www.deque.com/axe/devtools/) o [WAVE](https://wave.webaim.org/extension/) | Revisiones automáticas de accesibilidad | Versiones gratuitas |
| Un lector de pantalla (NVDA, VoiceOver o TalkBack) | Escuchar la página | Gratis |
| Un servidor local, como Live Server de VS Code (recomendado) | El panel Network funciona mejor con `http://` | Gratis |

## Lo que vas a construir

Nada nuevo, a propósito: vas a **arreglar** algo. El punto de partida es el explorador de programas del Curso 1.6 con **diez errores** (*bugs*) escondidos en su HTML, su CSS, su JavaScript y su accesibilidad. La guía de abajo te dice los **síntomas**, tal como los reportaría una persona usuaria, pero no las causas. Tu trabajo es encontrar y corregir cada uno, y escribir un reporte de error para cada uno en `bug-reports.md`.

La solución de referencia en [`completed/`](completed/) es el explorador corregido, con los diez reportes de error de Ana.

## Guía de carpetas

```text
07-developer-tools-debugging-and-testing/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html, explorer.js, styles.css   # The explorer, with 10 bugs
│   ├── bug-reports.md   # A template for your reports
│   └── 3d-moment.html   # A broken 3D scene
├── completed/
│   ├── index.html, explorer.js, styles.css   # Fixed
│   ├── bug-reports.md   # Ana's reports
│   └── 3d-moment.html   # The fixed scene
├── challenges/          # Three optional extensions
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Configuración

1. Copia la carpeta `starter` de esta lección dentro de tu carpeta `xr-camp` con el nombre `debugging`.
2. Ábrela con un servidor local si puedes (en VS Code, **Go Live** con la extensión Live Server), o abre `index.html` directamente.
3. Abre las herramientas para desarrolladores: **F12**, o haz clic derecho en la página y elige **Inspect** (Inspeccionar). En una Mac: **⌘ + Option + I**.

## Los síntomas

Una persona que visitó el sitio le envió al centro estas quejas. Todas son reales, y algunas tienen más de una causa.

1. «La página parece un documento de texto simple. ¿Dónde están los colores?»
2. «No aparece ningún programa.»
3. «Cuando hago clic en la etiqueta "Who is it for?" (¿para quién es?), el cursor salta al cuadro de búsqueda.»
4. «Parece que las tarjetas de los programas no tienen nombre.»
5. «En mi celular tengo que desplazarme hacia los lados para ver los filtros.»
6. «Cuando guardo un programa, su botón no cambia.»
7. «La casilla "Free only" (solo gratuitos) se marca sola, y cuando escribo "lunch" (almuerzo), no aparece nada.»
8. «El contador dice que hay 7 programas en total, pero hay 8.»
9. «Mi lector de pantalla dice "botón", pero no dice qué hace el botón.»
10. «Mi lector de pantalla no me avisa cuando cambian los resultados.»

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; Paso 1: un recorrido por las herramientas para desarrolladores | Puedes abrir todos los paneles |
| 2 | Paso 2: el panel Network | El síntoma 1 corregido |
| 3 | Paso 3: la consola | El primer error de JavaScript corregido |
| 4 | Paso 3, continuación | Aparecen los programas |
| 5 | Paso 4: Elements y Styles | Los síntomas 3, 4 y 6 corregidos |
| 6 | Paso 5: el modo de dispositivo | El síntoma 5 corregido |
| 7 | Paso 6: puntos de interrupción | El síntoma 7 corregido |
| 8 | Paso 6, continuación: avanzar paso a paso y observar valores | El síntoma 8 corregido |
| 9 | Paso 7: herramientas de accesibilidad y un lector de pantalla | Los síntomas 9 y 10 corregidos |
| 10 | Paso 8: prueba con una lista de verificación y termina tus reportes de error | Diez reportes |
| 11 | El **Momento 3D** | Una escena 3D depurada |
| 12 | [`tests/checklist.md`](tests/checklist.md), un reto y **Cómo entregar tu trabajo** | Un explorador que funciona |

### Paso 1: un recorrido por las herramientas para desarrolladores

| Panel | Qué muestra | Úsalo cuando |
| --- | --- | --- |
| **Elements** (Firefox: **Inspector**) | El HTML de la página tal como lo ve el navegador, en vivo | Algo falta, está en el lugar equivocado o tiene el atributo equivocado |
| **Styles** (dentro de Elements; Firefox: **Rules**) | Todas las reglas CSS del elemento seleccionado, incluidas las perdedoras tachadas | Un estilo no se aplica |
| **Console** | Errores, advertencias y tus mensajes de `console.log` | Cualquier cosa que tenga que ver con JavaScript |
| **Network** | Cada archivo que pidió la página, y si llegó | Algo no se cargó |
| **Sources** (Firefox: **Debugger**) | Tus scripts, con puntos de interrupción | El código se ejecuta pero hace algo incorrecto |
| **Device mode** (modo de dispositivo) | La página en cualquier tamaño de pantalla | Problemas de diseño en celulares |
| **Performance** | En qué gasta su tiempo el navegador | La página está lenta |

### Paso 2: el panel Network (síntoma 1)

Abre **Network** (red) y luego recarga la página. Cada fila es un archivo. Mira la columna **Status** (estado): **200** está bien; **404** significa «no encontrado». Un 404 en una hoja de estilos significa que la página no tiene estilos.

Compara el nombre de archivo que pide la página con el nombre del archivo en tu disco, letra por letra.

### Paso 3: la consola (síntoma 2)

Abre **Console** (consola) y recarga. Un mensaje en rojo es un error, con el archivo y el número de línea a la derecha. Haz clic en él para saltar a la línea.

`Cannot read properties of null` casi siempre significa que `querySelector` no encontró **nada**: el selector no coincide con ningún elemento. Compáralo con el HTML. Corrige un error, recarga y mira si aparece otro: los errores muchas veces se esconden unos detrás de otros.

### Paso 4: Elements y Styles (síntomas 3, 4 y 6)

Haz clic derecho sobre el problema y elige **Inspect** (Inspeccionar). El panel Elements salta a ese elemento.

- **Síntoma 3:** una etiqueta se vincula a un control con `for` e `id`. Mira los `id` de los controles cercanos. ¿Hay algún `id` repetido? Un `id` tiene que ser único en una página.
- **Síntoma 4:** selecciona el encabezado de una tarjeta. En Styles, busca qué regla define su `color`. ¿Cuál es, y cuál es el fondo?
- **Síntoma 6:** selecciona un botón guardado. Una propiedad con un **ícono de advertencia amarillo** o tachada no es válida o está anulada por otra. Pasa el puntero sobre el ícono para ver por qué.

Puedes editar los estilos directamente en el panel para probar una corrección, pero esos cambios desaparecen al recargar: copia la corrección en tu archivo.

### Paso 5: el modo de dispositivo (síntoma 5)

Activa el modo de dispositivo (**Ctrl + Shift + M**, o **⌘ + Shift + M** en una Mac, con las herramientas abiertas; en Firefox, **Responsive Design Mode**, **⌘ + Option + M** en una Mac) y elige 390 píxeles de ancho. Algo sobresale hacia la derecha. Selecciónalo y busca un `width` fijo en Styles.

### Paso 6: puntos de interrupción (síntomas 7 y 8)

Algunos errores no producen ningún mensaje de error: el código se ejecuta, pero hace algo incorrecto. Para esos, **pausa** el código:

1. Abre **Sources** (Firefox: **Debugger**) y abre `explorer.js`.
2. Haz clic en el número de la línea donde empieza la función `matches`. Aparece una marca azul: un **punto de interrupción** (*breakpoint*).
3. Escribe «lunch» en el cuadro de búsqueda. La página se congela en tu punto de interrupción.
4. Pasa el puntero sobre cualquier variable para ver su valor, o mira el panel **Scope** (ámbito).
5. Presiona **Step over** (pasar a la siguiente línea: la flecha curva, o **F10**) para ejecutar una línea a la vez, y observa cómo cambian los valores.

Observa `freeCheckbox.checked` mientras avanzas por las líneas con `if`. ¿Cambia? ¿Leer un valor debería cambiarlo alguna vez?

Para el síntoma 8, un `console.log` muchas veces es más rápido: registra `programmes.length` justo antes de que se escriba el contador, y compáralo con el mensaje.

### Paso 7: herramientas de accesibilidad y un lector de pantalla (síntomas 9 y 10)

Ejecuta axe DevTools o WAVE. Van a encontrar de inmediato uno de los dos problemas que quedan. El otro requiere a una persona: enciende tu lector de pantalla, escribe en el cuadro de búsqueda y escucha. ¿Debería anunciarse algo? Compara el párrafo del contador con el explorador del Curso 1.6.

### Paso 8: prueba con una lista de verificación y reporta

Cuando todo esté corregido, prueba todo el explorador con [`tests/checklist.md`](tests/checklist.md): cada función, cada forma de entrada, en cada ancho de pantalla. Una lista de verificación atrapa lo que olvidaste probar.

Luego termina `bug-reports.md`. Un buen reporte de error permite que alguien que nunca vio el problema lo reproduzca en un minuto:

- un **título** que diga qué está mal;
- **pasos para reproducirlo**, numerados;
- el resultado **esperado** y el resultado **real**;
- el **dispositivo y el navegador**;
- qué encontraste y cómo lo corregiste.

«No funciona» no es un reporte de error. «En Chrome para Android, "Free only" aparece marcada cuando se carga la página, y al escribir "lunch" no aparece ningún resultado» sí lo es.

## Explicación del código clave

**`=` y `===`.** `=` **asigna**: cambia un valor. `===` **compara**: pregunta si dos valores son iguales. `if (freeCheckbox.checked = true)` cambia la casilla, cada vez. Algunos equipos usan un *linter*, una herramienta que avisa justo de esto.

**`id` únicos.** Muchas cosas dependen de ellos: las etiquetas, `aria-describedby`, `querySelector`, los enlaces dentro de la página. Dos elementos con el mismo `id` rompen todo eso, muchas veces sin avisar.

**Nombres accesibles.** El nombre de un botón viene de su texto. La ✕ del cuadro de búsqueda está dentro de `<span aria-hidden="true">`, así que los lectores de pantalla la ignoran, y el botón no tiene ningún texto. Necesita `aria-label="Clear search"`.

## Momento 3D

Abre [`starter/3d-moment.html`](starter/3d-moment.html). El jardín de faroles debería tener tres faroles contra un cielo nocturno. Está roto de tres maneras: el cielo tiene el color equivocado, falta un farol y, después de un minuto, la página se vuelve cada vez más lenta.

1. Presiona **Ctrl + Alt + I** (en una Mac, **Control + Option + I**) para abrir el **A-Frame Inspector**. Haz clic en cada farol en el grafo de escena de la izquierda y lee su `position`. Recuerda del Curso 0.1: delante de la cámara, el tercer número (cerca/lejos) es negativo.
2. Selecciona el cielo. ¿Su color es un código de color válido?
3. Cierra el Inspector, abre el panel **Performance** (o el **Performance monitor** de Chrome, desde el menú **⋮ → More tools** de las herramientas) y observa durante un minuto. Algo no deja de crecer. Encuentra el script que lo causa.

Compara con [`completed/3d-moment.html`](completed/3d-moment.html), donde cada corrección se explica en un comentario. Los errores de rendimiento como el tercero son los problemas más comunes en proyectos 3D reales; los vas a estudiar a fondo en el Curso 3.6.

## Requisitos de accesibilidad

El explorador corregido debe cumplir todo lo del Curso 1.6, incluido:

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| Cada botón tiene un nombre accesible | 4.1.2 | «Clear search», no solo «botón». |
| Cada etiqueta apunta a exactamente un control | 1.3.1, 3.3.2 | `id` únicos. |
| Contraste del texto de al menos 4.5:1 | 1.4.3 | Los encabezados tienen que verse. |
| Sin desplazamiento hacia los lados a 320 píxeles | 1.4.10 | El contenido se reacomoda en los celulares. |
| Los cambios en los resultados se anuncian | 4.1.3 | Los mensajes de estado llegan a quienes usan lector de pantalla. |

## Consideraciones de rendimiento

El panel Network también muestra cuánto pesa cada archivo y cuánto tardó. Mira tu explorador: unos pocos kilobytes de HTML, CSS y JavaScript. Luego mira el Momento 3D: A-Frame es el archivo más grande. El panel Performance cuenta el resto de la historia: el trabajo que no deja de crecer, como las luciérnagas, termina volviendo lento cualquier dispositivo.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Corregir los estilos solo en el panel Styles | La corrección desaparece al recargar | Cópiala en tu archivo |
| Corregir varias cosas a la vez | No sabes qué cambio funcionó | Una corrección, luego recarga y prueba |
| Ignorar las advertencias | Los problemas pequeños quedan ocultos | Lee también las advertencias amarillas |
| Confiar solo en las herramientas automáticas | La mitad de los errores se quedan | Prueba con el teclado y con un lector de pantalla |
| Reportes de error vagos | Nadie puede reproducirlos | Pasos, esperado, real, dispositivo |

## Solución de problemas

**El panel Network está vacío.** Solo registra mientras está abierto: ábrelo primero y luego recarga.

**Mi punto de interrupción nunca se detiene.** El código de esa línea nunca se ejecutó. Revisa que el evento que debería ejecutarlo haya ocurrido de verdad, o pon el punto de interrupción antes.

**El atajo del A-Frame Inspector no hace nada.** Haz clic una vez en la escena primero y luego presiona las teclas.

## Retos adicionales

Tres extensiones opcionales, en [`challenges/`](challenges/):

1. **[Fundamento](challenges/challenge-1.es.md)**: esconde cinco errores tuyos e intercambia con una compañera o un compañero.
2. **[Creativo](challenges/challenge-2.es.md)**: explica un error, y cómo lo encontraste, en tu propio idioma.
3. **[Explorador](challenges/challenge-3.es.md)**: analiza el rendimiento de un sitio web real con el panel Performance.

## Cómo entregar tu trabajo

1. Completa todos los puntos de [`tests/checklist.md`](tests/checklist.md).
2. Toma una captura de pantalla del explorador corregido con la consola abierta y vacía, y otra de un punto de interrupción detenido en una línea.
3. Guárdalas, junto con tu `bug-reports.md`, en tu diario de aprendizaje y en tu portafolio. Cuando abra la comunidad de XR Camp, compártelas también allí.
4. En tu diario, responde: ¿qué error te costó más encontrar, y qué herramienta te ayudó a encontrarlo al final?

## Lecturas adicionales

- [Chrome DevTools documentation](https://developer.chrome.com/docs/devtools) (en inglés): documentación de las herramientas para desarrolladores de Chrome.
- [Firefox DevTools User Docs](https://firefox-source-docs.mozilla.org/devtools-user/) (en inglés): documentación de las herramientas para desarrolladores de Firefox.
- [MDN: What went wrong? Troubleshooting JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong) (en inglés): ¿qué salió mal? Cómo resolver problemas de JavaScript.
- [A-Frame: Visual Inspector and dev tools](https://aframe.io/docs/1.8.0/introduction/visual-inspector-and-dev-tools.html) (en inglés): el inspector visual y las herramientas de desarrollo de A-Frame.

## Mujeres que conviene conocer

**Marian Villa** es desarrolladora y creadora de comunidades en Medellín, Colombia. En 2016 cofundó **PionerasDev**, una comunidad colombiana sin fines de lucro que enseña a programar a mujeres, sobre todo JavaScript. Fue Google Developer Expert en UI/UX y ahora es Google Developer Expert en Tecnologías Web.

Comunidades como PionerasDev son donde muchas personas que desarrollan aprenden la habilidad de esta lección: no escribir código que nunca se rompe, sino averiguar con calma por qué se rompió, y ayudarse entre sí a hacerlo.

> **Nota editorial — verificar antes de publicar.** Las afirmaciones biográficas de las secciones Mujeres que conviene conocer deben contrastarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

Los navegadores ejecutan las mismas pruebas compartidas para asegurarse de que se comportan igual: las **Web Platform Tests**, una colección pública de pruebas de los estándares web que quienes fabrican navegadores escriben y ejecutan en conjunto. Cuando un navegador no pasa una, eso también es un reporte de error, y cualquier persona puede ver los resultados en wpt.fyi.

## Licencia

Código: [`LICENSE-CODE`](../../LICENSE-CODE) · Contenido: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
