# El Modelo de Objetos del Documento y las interfaces dinámicas

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `frontend-engineer` · **Lección:** `the-document-object-model-and-dynamic-interfaces-02` · **Tiempo:** unas 10 horas · 14 sesiones de 45 minutos · unas 4 semanas con 4 sesiones por semana

---

> Crea un panel de aprendizaje interactivo y accesible.

---

## Objetivos de aprendizaje

Al terminar este proyecto serás capaz de:

1. Describir el DOM como un árbol de objetos, y moverte por él con `closest`, `querySelector` y `children`.
2. Crear, modificar y eliminar elementos, atributos y clases.
3. Explicar cómo se propagan los eventos (bubbling) y usar un solo listener para muchos elementos (delegación de eventos).
4. Mantener el estado de una aplicación en un solo lugar, y actualizar la página cuando cambia.
5. Actualizar solo lo que cambió, para no alterar el foco del teclado ni interrumpir a los lectores de pantalla.
6. Mover el foco de forma deliberada cuando se agrega o se elimina contenido.
7. Anunciar cambios con regiones dinámicas (live regions).

## Requisitos previos

- **Curso 2.1: JavaScript moderno.** Construiste el mapa del curso con módulos.

## Herramientas necesarias

| Herramienta | Para qué sirve | Costo |
| --- | --- | --- |
| Un navegador moderno, con sus herramientas de desarrollador | El panel Elements (llamado Inspector en Firefox) muestra el DOM en vivo | Gratis |
| VS Code y un servidor local | Los módulos necesitan `http://` | Gratis |
| Un lector de pantalla | Para probar el foco y los anuncios | Gratis |

## Lo que vas a construir

La segunda parte de **My XR Camp**: un **panel de aprendizaje**. Marca cada lección al terminarla, y observa tu progreso por fase y en total. Una tarjeta **Next up** (Siguiente) muestra la próxima lección lista para empezar. Una lista **My goals** (Mis metas) te permite agregar y eliminar tus propias metas de aprendizaje. Todo se guarda en este navegador, y todo funciona con el teclado y con un lector de pantalla.

La solución de referencia está en [`completed/`](completed/). El punto de partida tiene terminados la página, los estilos, los datos y `state.js`; `dashboard.js` y `main.js` tienen diez TODO. Cada función de `dashboard.js` empieza como un pequeño marcador de posición, así la página funciona mientras trabajas: cuando llegues a su TODO, reemplaza el marcador de posición con tu función real.

## Guía de carpetas

```text
02-the-document-object-model-and-dynamic-interfaces/
├── README.md            # Esta guía (en inglés)
├── README.es.md         # Español
├── README.zh-Hans.md    # Chino simplificado
├── project.json         # Metadatos de la lección
├── starter/
│   ├── index.html, styles.css, data/catalog.json   # Terminados
│   ├── js/format.js, js/data.js    # Del Curso 2.1
│   ├── js/state.js      # Progreso y metas, guardados en el navegador (terminado)
│   ├── js/dashboard.js  # Construir y actualizar elementos: TODO 3–6 y 8
│   ├── js/main.js       # Eventos y foco: TODO 1–2, 7, 9–10
│   └── 3d-moment.html   # El momento 3D de esta lección
├── completed/           # Solución de referencia: ábrela al final
├── challenges/          # Tres desafíos: Fundamento es obligatorio
├── tests/checklist.md   # Autorrevisión antes de entregar
├── assets/
└── screenshots/
```

## Configuración

1. Copia los archivos del punto de partida dentro de tu carpeta `my-xr-camp` del Curso 2.1. Los archivos nuevos son `js/state.js`, `js/dashboard.js`, y el nuevo `index.html` y `styles.css`.
2. Inicia tu servidor local, y abre la página con el panel **Elements** (llamado **Inspector** en Firefox) y la **Console** abiertos.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; Paso 1: el árbol del DOM (TODO 1–2) | Puedes encontrar cualquier elemento en el árbol |
| 2 | Paso 2: estado (lee `state.js`) | Puedes explicar dónde vive el progreso |
| 3 | Paso 3: construir elementos (TODO 3) | Cada fase en la página |
| 4 | Paso 3, continuación (TODO 4–5) | Progreso total y Next up |
| 5 | Paso 4: eventos y bubbling | Puedes explicar la delegación |
| 6 | Paso 4, continuación (TODO 7) | Las marcas se guardan; el progreso total y Next up se actualizan |
| 7 | Paso 5: actualizar solo lo que cambió (TODO 6) | La barra de cada fase también se actualiza, y el foco permanece en la casilla |
| 8 | Paso 6: regiones dinámicas | Cada cambio se anuncia |
| 9 | Paso 7: un formulario dinámico (TODO 8–9) | Agregar metas |
| 10 | Paso 8: gestión del foco (TODO 10) | Eliminar metas, con el foco en el lugar correcto |
| 11 | Paso 9: prueba con teclado y lector de pantalla | Un panel probado |
| 12 | El **Momento 3D** | Un panel de control para una escena 3D |
| 13 | [`tests/checklist.md`](tests/checklist.md) | Un panel terminado |
| 14 | Un reto adicional, y luego **Cómo entregar tu trabajo** | La segunda parte de My XR Camp |

### Paso 1: el árbol del DOM (TODO 1–2)

Cuando el navegador lee tu HTML, construye el **Modelo de Objetos del Documento** (DOM): un árbol de objetos, uno por cada elemento, atributo y fragmento de texto. JavaScript nunca modifica tu archivo HTML; modifica este árbol, y el navegador vuelve a dibujar la página.

En el panel Elements, haz clic en las flechas para abrir y cerrar ramas. Cada elemento tiene un **padre**, y la mayoría tiene **hijos**. Formas útiles de moverte por el árbol:

| Código | Encuentra |
| --- | --- |
| `document.querySelector('#map')` | El primer elemento que coincide con un selector |
| `element.querySelectorAll('.lesson')` | Todas las coincidencias dentro de un elemento |
| `element.closest('.phase')` | El ancestro más cercano que coincide con un selector (o el propio elemento) |
| `element.children`, `element.parentElement` | Hijos directos, padre directo |

### Paso 2: estado

El **estado** del panel es todo lo que necesita recordar: qué lecciones están terminadas, y tus metas. Vive en un solo objeto, en `state.js`, que es también el único módulo que habla con `localStorage`. En `state.js`, `read()` construye un objeto con esta forma, llenado a partir de lo guardado:

```js
{ done: new Set(), goals: [] }
```

Un `Set` es una colección sin duplicados, con una comprobación `has` muy rápida: perfecto para «¿esta lección está terminada?». Cuando el estado cambia, la página debe cambiar para reflejarlo, y el resto de esta lección trata de hacerlo bien.

### Paso 3: construir elementos (TODO 3–5)

Ya conoces `createElement`, `textContent` y `append` del Curso 1.6. Tres cosas más que necesitas:

- **Atributos:** `element.setAttribute('aria-labelledby', id)`, o propiedades como `box.checked = true`.
- **Clases:** `element.className = 'phase'`, o `element.classList.add('selected')`, `.remove`, `.toggle`.
- **Atributos de datos:** `row.dataset.lessonId = lesson.id` se convierte en `data-lesson-id="…"`: una forma de guardar a qué parte del estado pertenece un elemento.

La etiqueta de cada casilla incluye el título de su lección, así que cada una tiene un nombre único: «Done: HTML Foundations» (Terminada: Fundamentos de HTML), no cincuenta y ocho casillas llamadas todas «Done». Un elemento `<progress>` muestra cada barra, siempre con su valor en palabras al lado.

### Paso 4: eventos y bubbling (TODO 7)

Cuando marcas una casilla, el evento `change` empieza en la casilla y luego se **propaga** (bubbling) hacia arriba: a su elemento de lista, a su lista, a su sección, a `#map`, y hasta el documento. Así, un solo listener en `#map` escucha cada casilla dentro de él, incluidas las que se agreguen después:

```js
map.addEventListener('change', (event) => {
  const box = event.target;                    // el elemento que cambió
  if (box.type !== 'checkbox') return;
  const row = box.closest('[data-lesson-id]');
  setDone(row.dataset.lessonId, box.checked);
});
```

Esto es **delegación de eventos**: un listener en lugar de cincuenta y ocho, y sigue funcionando cuando se agregan o eliminan elementos.

### Paso 5: actualizar solo lo que cambió (TODO 6)

La forma más simple de actualizar una página es volver a dibujarla entera. Pero eso destruye la casilla que acabas de marcar, y crea una nueva. El foco del teclado se pierde, y una persona que usa lector de pantalla vuelve de golpe al principio de la página.

Así que actualiza **solo lo que cambió**: la barra de progreso de esta fase, el progreso total y Next up. La casilla no se reconstruye, y el foco permanece exactamente donde lo dejó quien aprende.

```js
section.querySelector('.progress').replaceWith(progress(done, lessons.length, label));
```

### Paso 6: regiones dinámicas

Una persona que ve la pantalla nota que la barra de progreso se mueve. Una persona que usa lector de pantalla necesita escucharlo. Una región dinámica «polite» (educada) anuncia cada cambio:

```html
<p id="status" role="status" class="visually-hidden"></p>
```

`visually-hidden` la oculta a la vista, pero no a los lectores de pantalla. Mantén los anuncios breves: «HTML Foundations marked as done» (HTML Foundations marcada como terminada).

### Paso 7: un formulario dinámico (TODO 8–9)

Para agregar una meta: evita que el formulario recargue la página, comprueba que el texto no esté vacío, agrégalo al estado, agrega **un** nuevo elemento a la lista, limpia el campo de texto, y mantén el foco en el campo para que quien aprende pueda agregar otra meta de inmediato.

El botón Remove (Eliminar) de cada meta muestra la palabra «Remove», y tiene `aria-label="Remove goal: Finish Phase 1"` (Eliminar meta: Terminar Fase 1), así una persona con lector de pantalla escucha qué meta va a eliminar.

### Paso 8: gestión del foco (TODO 10)

Cuando eliminas una meta, el botón que tenía el foco desaparece. El navegador entonces envía el foco al principio de la página, y una persona que usa el teclado pierde su lugar. Por eso hay que mover el foco de forma deliberada:

```js
const buttons = goalList.querySelectorAll('.remove');
const target = buttons[index] ?? buttons[index - 1] ?? goalInput;
target.focus();
```

El botón de la siguiente meta, o el de la anterior si era la última, o de vuelta al campo de texto si la lista queda vacía. `??` elige el primer valor que exista.

### Paso 9: prueba con teclado y lector de pantalla

- Marca y desmarca lecciones con **Espacio**. ¿El foco se mantiene? ¿Cada cambio se anuncia?
- Agrega tres metas con **Enter**. Elimina la del medio, luego la última, luego la primera. ¿A dónde va el foco cada vez?
- Recarga: ¿sigue todo ahí?

## Explicación del código clave

**`event.target` y `closest`.** `target` es el elemento donde empezó el evento; `closest` sube desde ahí hasta el elemento que te interesa.

**`element.replaceWith(newElement)`.** Reemplaza un elemento por otro en el árbol, en su mismo lugar.

**`crypto.randomUUID()`** (en `state.js`). Le da a cada meta un identificador único, así eliminar una nunca elimina otra con el mismo texto.

**`??` (coalescencia nula).** `a ?? b` es `a`, salvo que `a` sea `null` o `undefined`, en cuyo caso es `b`.

## Momento 3D

Abre [`starter/3d-moment.html`](starter/3d-moment.html): un panel de control 2D para una escena 3D. Agrega cajas, esferas y conos; selecciona uno (se pone dorado); elimínalos. El panel es la fuente de verdad: un arreglo de figuras, dibujado dos veces, como botones y como objetos 3D.

Fíjate en cómo se gestiona el foco: después de seleccionar, el foco vuelve al botón redibujado; después de eliminar, se mueve a la siguiente figura, o de vuelta a **Add shape** (Agregar figura). Y la descripción de la escena enumera cada figura, de izquierda a derecha, así la escena 3D nunca es el único lugar donde vive esa información. Un panel como este es la forma en que harás accesibles con el teclado las escenas 3D y XR en las Fases 3 y 4.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| El foco permanece en un lugar lógico después de cada cambio | 2.4.3 | Quienes usan teclado y lector de pantalla no pierden su lugar. |
| Cada casilla y botón tiene un nombre único y descriptivo | 2.4.6, 4.1.2 | «Done: HTML Foundations», «Remove goal: …». |
| Los cambios se anuncian | 4.1.3 | Los mensajes de estado llegan a quienes usan lector de pantalla. |
| El progreso se muestra en palabras además de en barras | 1.1.1 | «3 de 9 terminadas (33%)». Las palabras van más allá del mínimo, y ayudan a todo el mundo. |
| Todo funciona con el teclado | 2.1.1 | Espacio, Enter, Tab. |

## Consideraciones de rendimiento

Actualizar solo lo que cambió no solo es mejor para el foco: también es más rápido. Redibujar 58 lecciones en cada marca es rápido en una laptop, y notablemente más lento en un celular viejo; reemplazar una sola barra de progreso es instantáneo en todas partes. La delegación de eventos también significa un listener en lugar de docenas.

## Errores comunes

| Error | Qué ocurre | En su lugar |
| --- | --- | --- |
| Redibujar todo en cada cambio | El foco salta al principio | Actualiza solo lo que cambió |
| Un listener por casilla | Se pierde cuando se redibujan los elementos | Delega en un elemento padre |
| Eliminar el elemento con foco y no hacer nada más | El foco cae a la página | Mueve el foco de forma deliberada |
| Todos los botones llamados «Remove» | Las personas con lector de pantalla no pueden distinguirlos | `aria-label` con el nombre del elemento |
| Estado guardado en el DOM (leer las marcas desde la página) | La página y los datos no coinciden | Un solo objeto de estado; la página lo muestra |

## Solución de problemas

**`does not provide an export named`** (Chrome y Edge; Firefox dice `doesn't provide an export named`, Safari dice `Importing binding name '…' is not found`). Falta una función en `dashboard.js`, o no está exportada: quizás borraste un marcador de posición antes de escribir su TODO. El navegador nombra solo una exportación faltante a la vez, y mientras el error esté ahí, nada de la página funciona.

**Marcar una casilla no hace nada.** Revisa que tu listener esté en `#map`, y que compruebe `event.target.type`, no `event.type`.

**El foco va al principio después de eliminar una meta.** Eliminaste el elemento, pero no llamaste a `focus()` en otro elemento después.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: un filtro «Mostrar solo lecciones sin terminar» que mantiene el foco en un lugar lógico.
2. **[Creativo](challenges/challenge-2.es.md)**: un toque personal: notas en cada lección.
3. **[Explorador](challenges/challenge-3.es.md)**: reordena metas con botones Move up y Move down.

## Cómo entregar tu trabajo

1. Completa todos los puntos de [`tests/checklist.md`](tests/checklist.md).
2. Toma una captura de pantalla de tu panel con algo de progreso, y otra del panel de control 3D.
3. Guárdalas en tu diario de aprendizaje y en tu portafolio. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. En tu diario, responde: ¿a dónde fue el foco la primera vez que eliminaste una meta, antes de que lo gestionaras tú?

## Lecturas adicionales

- [MDN: Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) (en inglés)
- [MDN: Event bubbling](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling) (en inglés)
- [MDN: ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions) (en inglés)
- [W3C: Developing a keyboard interface (ARIA Authoring Practices)](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/) (en inglés)

## Mujeres que conviene conocer

**Ire Aderinokun** es una desarrolladora front-end nigeriana, nacida en Lagos y en gran parte autodidacta, y Google Developer Expert en tecnologías web. En su blog, bitsofco.de, explica con claridad los fundamentos de HTML, CSS y JavaScript, incluido un artículo muy conocido, «What, exactly, is the DOM?» (¿Qué es exactamente el DOM?). También organizó Frontstack, una conferencia de ingeniería front-end en Nigeria.

El DOM confunde a muchas personas principiantes porque se parece a tu HTML, pero no es lo mismo. Explicar bien esa diferencia, y de forma gratuita, es exactamente el tipo de enseñanza que ayuda a desarrolladoras autodidactas en todas partes.

> **Nota editorial — verificar antes de publicar.** Las afirmaciones biográficas de las secciones Mujeres que conviene conocer deben contrastarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

El DOM está definido por el **DOM Standard** del WHATWG: el árbol, los eventos, el bubbling, `querySelector` y `closest`. Todos los navegadores implementan el mismo estándar, por eso el mismo panel funciona en todos ellos. Los roles y propiedades ARIA que usaste, como `role="status"` y `aria-label`, provienen de la especificación **WAI-ARIA** del W3C.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
