# Componentes web

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `frontend-engineer` · **Lección:** `web-components-05` · **Tiempo:** unas 10 horas · 14 sesiones de 45 minutos · unas 4 semanas con 4 sesiones por semana

---

> Crea un componente reutilizable de XR Camp: una tarjeta de lección o un visor de proyectos.

---

## Objetivos de aprendizaje

Al terminar este proyecto serás capaz de:

1. Explicar qué son los **componentes web** (Web Components): tus propios elementos HTML, construidos con funciones estándar del navegador y sin ningún framework.
2. Definir un **elemento personalizado** con una clase y `customElements.define()`, y usar sus **callbacks de ciclo de vida**: `constructor`, `connectedCallback` y `attributeChangedCallback`.
3. Dar a un elemento estructura y estilos privados con el **shadow DOM** y un `<template>`, y dejar que la página coloque su propio contenido dentro con **slots**.
4. Dar estilo a un componente desde adentro (`:host`, `::slotted()`, propiedades personalizadas) y desde afuera (`::part()`).
5. Enviar información fuera de un componente con un **evento personalizado**, y explicar `bubbles` y `composed`.
6. Mantener un componente accesible a través del **límite del shadow DOM**: botones reales, etiquetas junto a sus controles, y un nivel de encabezado que la página pueda elegir.
7. Usar **mejora progresiva** con `:not(:defined)`, para que el contenido se muestre antes de que el elemento esté listo.
8. Escribir **documentación** que le permita a otra persona usar tu componente: atributos, slots, eventos y partes.

## Requisitos previos

- **Curso 2.2: El DOM y las interfaces dinámicas** (crear elementos, eventos y bubbling, regiones dinámicas). Esta lección usa el mismo `data/catalog.json`.
- **Curso 2.3: Arquitectura de aplicaciones** (módulos con una sola responsabilidad, mejora progresiva).
- **Curso 2.4: APIs, JSON y aplicaciones asíncronas** ayuda: la página carga el catálogo con `fetch` y `await`. El código de carga ya está terminado.

## Herramientas necesarias

| Herramienta | Para qué sirve | Costo |
| --- | --- | --- |
| Un navegador moderno, con sus herramientas de desarrollo | El panel Elements (llamado Inspector en Firefox) muestra los shadow roots y te deja cambiar atributos en vivo | Gratis |
| VS Code y un servidor local | Los módulos y `fetch` necesitan `http://` | Gratis |
| Un lector de pantalla | Para probar nombres, estados y anuncios | Gratis |

Todo en esta lección funciona sin conexión, excepto A-Frame en el momento 3D, que se carga desde `aframe.io`. Si esa dirección es lenta o está bloqueada donde vives (por ejemplo, en China continental), prueba la dirección de jsDelivr indicada en el `versions.json` del repositorio, o descarga `aframe.min.js` una vez, guárdalo junto a la página, y cambia el `src`.

## Lo que vas a construir

La quinta parte de **Mi XR Camp**: una **tarjeta de lección** que puedes usar en cualquier lugar, con la misma facilidad que un `<button>`:

```html
<lesson-card lesson-title="Web Components" minutes="600" status="ready" heading-level="3">
  <p slot="description">Build your own HTML elements.</p>
</lesson-card>
```

La tarjeta muestra el título, el tiempo en horas y sesiones, el estado en palabras, y tu descripción. Su botón **Done** (Hecho) le avisa a la página cuando se presiona, con un evento llamado `lesson-toggle`. Después usas la tarjeta para mostrar todas las lecciones del catálogo del curso desde el Curso 2.2, y guardas cuáles están hechas, en el mismo lugar donde el panel del Curso 2.2 las guarda.

En el momento 3D construyes un segundo elemento, `<model-stage>`: un pequeño visor 3D, con botones Pause (Pausar) y Turn (Girar), y un slot para su descripción.

La solución de referencia está en [`completed/`](completed/). El punto de partida trae la página, los datos, y catorce TODO.

## Guía de carpetas

```text
05-web-components/
├── README.md            # Esta guía (en inglés)
├── README.es.md         # Español
├── README.zh-Hans.md    # Chino simplificado
├── project.json         # Metadatos de la lección
├── starter/
│   ├── index.html       # La página de tarjetas de lección: TODO 1
│   ├── js/lesson-card.js  # Tu elemento personalizado: TODO 2–8
│   ├── styles.css       # Terminado, excepto TODO 9
│   ├── js/main.js       # Carga el catálogo (terminado): TODO 10–11
│   ├── js/data.js, js/format.js, js/progress.js   # Terminados
│   ├── data/catalog.json  # Los mismos datos que el Curso 2.2
│   ├── components.md    # La documentación: TODO 12
│   ├── 3d-moment.html   # La página del visor 3D (terminada)
│   └── js/model-stage.js  # El elemento del visor 3D: TODO 13–14
├── completed/           # Solución de referencia: ábrela al final
├── challenges/          # Tres desafíos: Fundamento es obligatorio
├── tests/checklist.md   # Autorrevisión antes de entregar
├── assets/
└── screenshots/
```

## Configuración

1. Crea una carpeta nueva, `lesson-cards`, junto a tu carpeta `my-xr-camp`, y copia dentro los archivos del punto de partida. Conviértela en un repositorio Git y confirma (commit) el punto de partida sin modificar.
2. Inicia tu servidor local, y abre `index.html` con el panel **Elements** y la **Console** abiertos.
3. Si usas el mismo servidor y la misma dirección para tu panel del Curso 2.2, ambas páginas comparten tu progreso: una lección marcada como hecha en una aparece hecha en la otra.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; Paso 1: un elemento que el navegador no conoce (TODO 1) | Tu tarjeta en el HTML, mostrada como texto simple |
| 2 | Paso 2: defínelo (TODO 2) | El navegador conoce `<lesson-card>` |
| 3 | Paso 3: un template, un shadow root, y slots (TODO 3–4) | Tus párrafos dentro de la estructura de la tarjeta |
| 4 | Paso 4: estilos dentro del shadow (TODO 5) | Una tarjeta con los colores de XR Camp |
| 5 | Paso 5: atributos (TODO 6) | Título, tiempo y estado a partir de atributos |
| 6 | Paso 5, continuación: niveles de encabezado (TODO 7) | Un atributo cambiado en el panel Elements actualiza la tarjeta |
| 7 | Paso 6: un botón real y un evento personalizado (TODO 8) | `lesson-toggle` en la Console |
| 8 | Paso 7: estilo desde afuera, y antes de estar definido (TODO 9) | Una insignia con estilo propio, y una tarjeta que se lee bien sin JavaScript |
| 9 | Paso 8: tarjetas desde el catálogo (TODO 10–11) | Cada lección de la Fase 2 como tarjeta; Done se guarda y se anuncia |
| 10 | Paso 9: prueba la accesibilidad a través del límite del shadow DOM | Una tarjeta que funciona con teclado y con lector de pantalla |
| 11 | Paso 10: documéntalo (TODO 12) | `components.md`, probado siguiéndolo |
| 12 | El **momento 3D** (TODO 13–14) | Un visor 3D en tu propio elemento |
| 13 | [`tests/checklist.md`](tests/checklist.md) | Una tarjeta de lección terminada |
| 14 | Un desafío de extensión, y luego **Cómo entregar tu trabajo** | La quinta parte de Mi XR Camp |

### Paso 1: un elemento que el navegador no conoce (TODO 1)

En `index.html`, escribe tu primera tarjeta, directamente en el HTML (el TODO 1 muestra cómo). Después recarga.

El navegador todavía no conoce `<lesson-card>`, y no se queja: un elemento desconocido con un guion en su nombre se trata como un elemento simple, algo parecido a un `<span>`, y los párrafos de adentro se muestran como texto normal. Mira en el panel Elements: la etiqueta está ahí, con sus atributos.

Esta es la primera cosa buena de los componentes web. Tu contenido está en el HTML desde el principio. JavaScript lo va a mejorar, pero no lo crea.

### Paso 2: defínelo (TODO 2)

Un **elemento personalizado** es una clase que extiende `HTMLElement`, registrada bajo un nombre:

```js
export class LessonCard extends HTMLElement { }
customElements.define('lesson-card', LessonCard);
```

El nombre **debe contener un guion**. Los elementos integrados nunca lo llevan, así que tu elemento nunca puede chocar con un futuro `<card>` de HTML. En la Console, escribe `customElements.get('lesson-card')`: devuelve tu clase. Cada `<lesson-card>` en la página queda ahora "actualizada" (upgraded) a una instancia de ella.

**Web Components** no es una sola función: es un nombre paraguas para varias funciones estándar que trabajan juntas. Esta lección usa tres: elementos personalizados, shadow DOM, y el elemento `<template>`.

### Paso 3: un template, un shadow root, y slots (TODO 3–4)

Un `<template>` contiene HTML que no se muestra, ni se ejecuta. Lo copias para cada tarjeta. El TODO 3 escribe la estructura de la tarjeta: un `<article>`, un encabezado, una línea con el tiempo, una insignia, dos slots, y un botón.

Después, en el constructor (TODO 4), le das al elemento un **shadow root**, y colocas la copia dentro:

```js
const root = this.attachShadow({ mode: 'open' });
root.append(template.content.cloneNode(true));
```

El **shadow DOM** es un árbol DOM pequeño y privado, adjunto a tu elemento. El CSS de la página no llega hasta adentro, y `document.querySelector` no encuentra nada dentro. El contenido de la página, los párrafos que escribiste en el Paso 1, es el **light DOM**. Se queda donde está.

Un **slot** es un hueco en el shadow DOM donde se muestra contenido del light DOM:

- `<slot name="description">` muestra el hijo con `slot="description"`.
- `<slot>` sin nombre (el **slot por defecto**) muestra todos los demás hijos.
- Lo que sea que esté dentro de un `<slot>` es su **contenido de respaldo** (fallback): "No description yet." (Sin descripción todavía) se muestra solo cuando no hay nada asignado al slot.

Recarga. Tus párrafos ahora aparecen dentro de la estructura de la tarjeta. En el panel Elements, abre `#shadow-root (open)` y busca los slots.

### Paso 4: estilos dentro del shadow (TODO 5)

Un `<style>` dentro del shadow root da estilo solo al shadow root. Nada se filtra hacia adentro, y nada se filtra hacia afuera: tu clase `.badge` no puede chocar con un `.badge` de la página.

Tres cosas son especiales:

- **`:host`** es el elemento mismo, visto desde adentro. `:host([done])` coincide cuando la tarjeta tiene el atributo `done`.
- **Las propiedades personalizadas cruzan el límite.** Se heredan, como `color` y `font-family`. Así, `var(--color-primary, #5b2a86)` dentro de la tarjeta usa el morado de la página, y recurre al mismo color en una página sin los tokens de XR Camp.
- **Las reglas normales de la página no.** Las reglas `button { … }` y `:focus-visible { … }` de la página se detienen en el límite, así que la tarjeta debe dar estilo a su propio botón y a su propio contorno de foco.

`::slotted(p)` da estilo a los párrafos de la página que están en un slot, pero solo un poco: los estilos propios de la página siguen aplicándose, porque siguen estando en la página.

### Paso 5: atributos (TODO 6–7)

Los atributos son la forma en que el HTML configura un elemento. Enumera los que te interesan, y el navegador te avisa cada vez que uno cambia:

```js
static observedAttributes = ['lesson-title', 'minutes', 'status', 'done', 'heading-level'];

attributeChangedCallback() {
  this.#render();
}
```

`#render()` lee los atributos y coloca texto en el shadow DOM, siempre con `textContent`. Se ejecuta cuando la tarjeta se agrega a la página (`connectedCallback`), y después de cada cambio. Pruébalo: en el panel Elements, haz doble clic en `status="coming-soon"` y cámbialo a `ready`. La insignia cambia al instante. O, en la Console:

```js
document.querySelector('lesson-card').setAttribute('minutes', '90');
```

¿Por qué `lesson-title` y no `title`? `title` es un **atributo global**: en cualquier elemento, muestra una información sobreimpresa (tooltip), y los lectores de pantalla pueden leerlo. No reutilices nombres de atributos integrados para tu propio significado.

**Niveles de encabezado (TODO 7).** Un encabezado debe encajar en el esquema de la página (WCAG 1.3.1), pero la tarjeta no puede saber dónde se va a usar: bajo un `<h2>`, su título debería ser un `<h3>`; en una barra lateral bajo un `<h3>`, un `<h4>`. Por eso la página decide, con `heading-level="3"`, y `#render()` cambia al elemento correcto cuando ese valor cambia.

### Paso 6: un botón real y un evento personalizado (TODO 8)

El botón de la tarjeta es un `<button>` real: se puede alcanzar con Tab, presionar con Enter o Espacio, y gracias a `aria-pressed`, un lector de pantalla dice si está presionado. Nunca uses un `<div>` con clic como si fuera un botón.

Cuando se presiona, la tarjeta invierte su atributo `done`, y luego le avisa a la página con un **evento personalizado**:

```js
this.#button.dispatchEvent(new CustomEvent('lesson-toggle', {
  bubbles: true,
  composed: true,
  detail: { lessonId, title, done },
}));
```

- `bubbles: true` le permite viajar hacia arriba por los elementos padre, así una sola escucha (listener) puede enterarse de cada tarjeta (delegación de eventos, del Curso 2.2).
- `composed: true` le permite salir del shadow root. Prueba con `composed: false`: la página no escucha nada.
- `detail` lleva los datos.

Fuera de la tarjeta, `event.target` es el `<lesson-card>`, no el botón. El navegador **reasigna el objetivo** (retargets) de los eventos que salen de un shadow root, así la página nunca ve las entrañas privadas de la tarjeta.

`done` es también una **propiedad** que refleja el atributo: `card.done = true` agrega `done`, y `card.done` lo lee. Asignarlo desde el código no dispara el evento; solo lo hace la acción de la persona que aprende. Así, la página no puede escuchar accidentalmente sus propios cambios.

### Paso 7: estilo desde afuera, y antes de estar definido (TODO 9)

**Partes (parts).** La tarjeta elige qué piezas puede estilar la página, dándoles un atributo `part`. La página les da estilo con `::part()`:

```css
lesson-card::part(badge) { text-transform: uppercase; }
```

Prueba con `lesson-card article { … }`: no pasa nada. Solo las partes son públicas. Esta es una promesa para quienes usen tu tarjeta: puedes cambiar todo lo demás más adelante sin romper sus páginas.

**Mejora progresiva.** Hasta que se ejecuta `customElements.define()`, el elemento **no está definido**, y `:not(:defined)` coincide con él. Ese momento es corto en una conexión rápida, y largo en una lenta, o eterno si el script falla. Dale estilo como si fuera una tarjeta simple, y muestra su título a partir del atributo:

```css
lesson-card:not(:defined)::before { content: attr(lesson-title); font-weight: 700; }
```

Comenta la etiqueta `<script>` y recarga: la tarjeta todavía tiene su título y su descripción. No hay botón Done, y está bien: es una mejora, no el contenido.

### Paso 8: tarjetas desde el catálogo (TODO 10–11)

`main.js` ya carga `data/catalog.json` y llena la lista de **Fase**. El TODO 10 crea una tarjeta por lección, exactamente como la escribirías en HTML:

```js
const card = document.createElement('lesson-card');
card.setAttribute('lesson-title', lesson.title);
card.setAttribute('minutes', lesson.minutes);
```

Fíjate en lo que `main.js` **no** hace: nunca toca `card.shadowRoot`. Establece atributos, agrega hijos, y escucha eventos: las mismas tres cosas que haces con cualquier elemento integrado. Eso es lo que hace que la tarjeta sea reutilizable.

El TODO 11 agrega **una sola** escucha en `<main>` para `lesson-toggle`. Se entera de la tarjeta que escribiste en HTML y de cada tarjeta agregada después. Guarda el cambio con `setDone()`, y lo anuncia en la región dinámica: "Marked as done: Modern JavaScript." (Marcada como hecha: Modern JavaScript.)

`progress.js` usa la misma clave, `my-xr-camp-progress`, y la misma forma de datos que el panel del Curso 2.2, y mantiene los objetivos del panel. Los datos que sobreviven a una sola página también son una promesa.

### Paso 9: prueba la accesibilidad a través del límite del shadow DOM

El shadow DOM cambia algo importante: **los id no cruzan el límite**. `aria-labelledby`, `aria-describedby`, y `<label for>` dentro de la tarjeta no pueden apuntar a un elemento de la página, y la página no puede apuntar hacia adentro de la tarjeta. Entonces:

- **Mantén la etiqueta y el control juntos.** El nombre del botón se define adentro de la tarjeta: `aria-label="Done: Modern JavaScript"`. Diez tarjetas no le dan a diez botones el mismo nombre, solo "Done", y la palabra visible va primero, así una persona que usa entrada por voz puede decir "click Done" (WCAG 2.5.3).
- **Usa elementos reales** dentro del shadow root: `<article>`, un encabezado real, un `<button>` real. Los lectores de pantalla leen el shadow DOM y el contenido asignado a los slots juntos, como una sola página.
- **Los anuncios pertenecen a la página.** La tarjeta dispara un evento; la única región dinámica de la página lo anuncia.

Pruébalo: recorre cada tarjeta con Tab; presiona Enter y Espacio; recarga y comprueba que Done se recuerda. En el árbol de accesibilidad de tu navegador (en las herramientas de desarrollo), revisa el nivel de encabezado de cada tarjeta, y el nombre y el estado presionado de cada botón. Después prueba con un lector de pantalla, y escucha la lista de encabezados.

### Paso 10: documéntalo (TODO 12)

Un componente que nadie más puede entender no es reutilizable. Escribe `components.md` para alguien que nunca vio tu código: un ejemplo corto, y después una tabla para cada uno de **atributos**, **propiedades**, **slots**, **eventos**, y **partes**, luego las propiedades personalizadas que usa, y qué debe hacer la página por la accesibilidad. La sección de `<model-stage>` ya está escrita, como ejemplo.

Pruébalo de la única manera que cuenta: síguelo al pie de la letra, en una página nueva y vacía. Donde tuviste que mirar el código, es que a la documentación le falta algo.

## Explicación del código clave

**`#heading`, `#render()`.** Un `#` hace que un campo o método sea **privado**: el código fuera de la clase no puede leerlo ni llamarlo. La página solo puede usar lo que decidiste hacer público: atributos, `done`, `lessonTitle`, el evento, y las partes.

**`static observedAttributes`.** El navegador lee esto una sola vez, cuando defines el elemento. Los atributos que no están en la lista nunca llaman a `attributeChangedCallback`.

**`template.content.cloneNode(true)`.** El contenido de un template es un fragmento de documento. `cloneNode(true)` hace una copia profunda, así cada tarjeta obtiene la suya.

**`attachShadow({ mode: 'open' })`.** "Open" significa que el código de la página puede entrar con `card.shadowRoot`, algo útil para probar. Es encapsulamiento de estilos y estructura, no una función de seguridad.

**`if (!customElements.get('lesson-card'))`.** Definir el mismo nombre dos veces lanza un error. Esta comprobación hace que el módulo se pueda importar de forma segura desde más de un archivo.

**`import './lesson-card.js'`** al principio de `main.js`, sin nombres: ejecuta el módulo, que define el elemento, antes de que cualquier código de más abajo asigne `card.done`. Si asignas una propiedad a un elemento antes de que esté definido, ese valor oculta al setter `done` de la clase más adelante.

## Momento 3D

Abre [`completed/3d-moment.html`](completed/3d-moment.html). Todo el visor es una sola etiqueta:

```html
<model-stage shape="torus" color="#5b2a86" label="3D view: a purple ring">
  <p slot="description" id="scene-description">A purple ring, like a thick bracelet, …</p>
</model-stage>
```

`<model-stage>` construye una escena de A-Frame a partir de sus atributos `shape` y `color` (sin archivos de modelos: son formas primitivas de A-Frame), agrega los botones **Pause animation** (Pausar animación), **Turn left** (Girar a la izquierda), y **Turn right** (Girar a la derecha), y conserva tu párrafo de descripción como la alternativa textual de la escena. Cambia `shape` en el panel Elements, y el modelo cambia, a través de `attributeChangedCallback`, exactamente igual que la tarjeta.

Pero este elemento **no tiene shadow root**, a propósito. A-Frame espera que su escena forme parte del documento principal: agrega sus estilos al `<head>` de la página, y partes de A-Frame buscan elementos con `document.querySelector()`, que no puede ver dentro de un shadow root. Una escena dentro de un shadow root puede no renderizarse o dimensionarse correctamente. Por eso `<model-stage>` construye sus botones y su escena como hijos normales, en el light DOM, y lo explica en un comentario al principio de `model-stage.js`.

Sin un shadow root, `<slot>` no hace nada, así que el elemento copia la idea: busca su hijo con `slot="description"` y lo deja donde lo escribiste. Y como todo está en un solo documento, la escena **sí puede** apuntar hacia él: `role="img"`, un nombre desde `label`, y `aria-describedby="scene-description"` (TODO 13). Elegir no tener shadow root es una decisión real que vas a volver a encontrar: cuando una biblioteca necesita el documento principal, trabaja con ella.

El TODO 14 conecta los botones. El visor comienza pausado si el dispositivo pide movimiento reducido, y se pausa si esa preferencia se activa mientras la página está abierta. Turn left y Turn right mueven el modelo 15 grados y anuncian el nuevo ángulo: una ruta por teclado para lo que de otro modo necesitaría arrastrar con el mouse. La cámara nunca se mueve.

La descripción la escribes tú, no se genera sola, así que mantenla verdadera: si cambias la forma, cambia las palabras.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| El título de la tarjeta es un encabezado real, en el nivel que elige la página | 1.3.1, 2.4.6 | Los encabezados forman el esquema de una página, y quienes usan lector de pantalla se mueven por ellos. |
| Done es un `<button>` real, con `aria-pressed` | 2.1.1, 4.1.2 | Funciona con teclado, y su estado se anuncia. |
| El nombre de cada botón incluye la lección: "Done: Web Components" | 2.4.6, 4.1.2 | Diez tarjetas no le dan a diez botones el mismo nombre. |
| La palabra visible empieza el nombre de cada botón | 2.5.3 | Quienes usan entrada por voz pueden decir "click Done". |
| El estado se muestra en palabras, con un borde, no solo por color | 1.4.1 | El color no es la única forma de distinguir listo de próximamente. |
| El foco es visible dentro de la tarjeta | 2.4.7 | Los estilos de foco de la página no cruzan el límite del shadow DOM, así que la tarjeta tiene los suyos propios. |
| Los cambios se anuncian en la región dinámica de la página | 4.1.3 | "Marked as done: Web Components." |
| La escena 3D tiene una descripción textual, y se puede pausar | 1.1.1, 2.2.2 | Las palabras transmiten todo lo que muestra la imagen; el movimiento nunca es obligatorio. |
| El modelo 3D se puede girar con botones | 2.1.1 | Toda interacción 3D tiene una ruta por teclado. |

## Consideraciones de rendimiento

Cada tarjeta clona el mismo template, lo cual es más rápido que construir cada una a partir de una cadena de texto, y los navegadores generalmente pueden reutilizar los estilos ya interpretados del `<style>` idéntico en cada copia. (Para compartir una sola hoja de estilos con total seguridad, usa una hoja de estilos construible con `adoptedStyleSheets`.) `#render()` solo cambia unos pocos valores de `textContent`, así que volver a renderizar después de cada cambio de atributo es barato.

Los elementos personalizados no necesitan ningún framework: `lesson-card.js` pesa apenas unos kilobytes, y el navegador ya sabe cómo ejecutarlo.

El `tick` de A-Frame se ejecuta una vez por cuadro, solo mientras la escena está en marcha. Cuando el visor está pausado, `stage-turn` regresa de inmediato y el modelo deja de girar.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Un nombre sin guion: `customElements.define('lessoncard', …)` | Un error: "not a valid custom element name" | Incluye siempre un guion |
| Agregar atributos o hijos en el `constructor` | Un error cuando el elemento se crea con `createElement` | Construye el shadow root en el constructor; lee los atributos en `connectedCallback` y `attributeChangedCallback` |
| Olvidar `observedAttributes` | Cambiar un atributo no hace nada | Enumera cada atributo al que reaccionas |
| Usar `title` como tu propio atributo | Aparece una información sobreimpresa (tooltip) sobre toda la tarjeta | Usa un nombre propio: `lesson-title` |
| Un evento disparado desde dentro del shadow root sin `composed: true` | La página nunca lo escucha | `bubbles: true, composed: true` (o dispáralo sobre el elemento mismo) |
| `aria-labelledby` apuntando a través del límite del shadow DOM | La etiqueta se ignora: el botón recibe otro nombre (solo su propio texto), o ninguno | Mantén la etiqueta y el control juntos, adentro |
| Esperar que el CSS de la página dé estilo al interior | Nada cambia | Propiedades personalizadas hacia adentro, `::part()` desde afuera |
| Un `<div>` con una escucha de clic como si fuera el botón | Sin teclado, sin rol, sin estado | Un `<button>` real |
| Poner una escena de A-Frame dentro de un shadow root | La escena puede no renderizarse o dimensionarse correctamente | Constrúyela en el light DOM |

## Solución de problemas

**La tarjeta muestra solo mis párrafos, como texto simple.** El elemento no está definido. Busca el primer error en la Console, y comprueba que `main.js` importe `./lesson-card.js`.

**Un error diciendo que el nombre "lesson-card" ya se usó (Chrome) o ya está definido (Firefox).** El elemento se definió dos veces. Usa la comprobación con `customElements.get()`.

**Un error que contiene `The result must not have attributes` (Chrome y Edge; Safari: `must not have attributes`).** Tu constructor agrega un atributo, o un hijo, al elemento mismo. Mueve ese trabajo a `connectedCallback`.

**El título nunca aparece.** El nombre del atributo debe coincidir exactamente: `lesson-title`, no `lessonTitle`.

**La tarjeta no se actualiza cuando cambio un atributo.** `observedAttributes` debe ser `static`, y debe incluir ese atributo.

**Mi descripción aparece dos veces, o ninguna.** Revisa la ortografía: `slot="description"` en el párrafo, y `<slot name="description">` en el template.

**La página no escucha `lesson-toggle`.** Revisa `bubbles: true` y `composed: true`, y que estés escuchando exactamente `lesson-toggle`.

**Done no se recuerda.** Comprueba que cada tarjeta tenga un `lesson-id`, y que estés usando el servidor local (`http://`), no un archivo abierto directamente.

**La escena 3D está vacía.** A-Frame debe cargarse antes que `model-stage.js`. Mantén la etiqueta `<script>` de A-Frame arriba del módulo.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: agrega un nuevo atributo y una nueva parte a la tarjeta, y actualiza la documentación.
2. **[Creativo](challenges/challenge-2.es.md)**: haz una tarjeta sobre algo de tu propia comunidad, con las palabras de la tarjeta en tu idioma.
3. **[Explorador](challenges/challenge-3.es.md)**: renderiza una tarjeta sin nada de JavaScript, usando shadow DOM declarativo.

## Cómo entregar tu trabajo

1. Completa cada punto de [`tests/checklist.md`](tests/checklist.md).
2. Toma una captura de pantalla de tus tarjetas de lección, y otra del visor 3D.
3. Guárdalas, junto con tu `components.md`, en tu diario de aprendizaje y tu portafolio. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. En tu diario, responde: ¿qué parte de la tarjeta es pública, y cuál es privada? ¿Por qué esa diferencia le importa a quienes usan tu componente?

## Lecturas adicionales

- [MDN: Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) (en inglés)
- [MDN: Using custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) (en inglés)
- [MDN: Using shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM) (en inglés)
- [MDN: Using templates and slots](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots) (en inglés)
- [MDN: ::part()](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) (en inglés)
- [WHATWG HTML Standard: Custom elements](https://html.spec.whatwg.org/multipage/custom-elements.html) (en inglés)
- [A-Frame 1.8.0 documentation](https://aframe.io/docs/1.8.0/introduction/) (en inglés)

## Mujeres que conviene conocer

**Monica Dinculescu** fue ingeniera sénior en Google durante unos ocho años, hasta 2021, donde trabajó en Polymer, componentes web, y Chrome. Dio muchas charlas sobre cómo construir y dar estilo a componentes web, en el Polymer Summit, el Chrome Dev Summit, y Google I/O, y en Google I/O 2018 presentó el PWA Starter Kit, construido con componentes web. Más tarde, en Google Brain, trabajó en Magenta, creando música y arte generativo con aprendizaje automático.

Dar estilo a los componentes, con `:host`, propiedades personalizadas, y partes, es una de las cosas más difíciles de dominar en esta lección, y fue tema de sus charlas. Su trayectoria, desde la ingeniería de navegadores hasta la música y el arte hechos con código, muestra que las habilidades de front-end pueden llevarte a lugares sorprendentes.

> **Nota editorial — verificar antes de publicar.** Las afirmaciones biográficas de las secciones Mujeres que conviene conocer deben contrastarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

**Web Components** es un nombre paraguas, no una sola especificación. Los elementos personalizados, `<template>`, y `<slot>` están definidos en el **HTML Standard** de la WHATWG, y los árboles de shadow DOM, la asignación de slots, y los eventos compuestos, en el **DOM Standard** de la WHATWG. `::part()` viene del CSS Working Group del W3C. Como son estándares integrados en todo navegador moderno, un `<lesson-card>` que escribas hoy funciona en cualquier framework, o en ninguno, y sigue funcionando cuando los frameworks cambian.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
