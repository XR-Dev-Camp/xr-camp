# Fundamentos de JavaScript

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `web-developer` · **Lección:** `javascript-foundations-06` · **Tiempo:** unas 16 horas · 22 sesiones de 45 minutos · unas 6 semanas con 4 sesiones por semana

---

> Construye un panel interactivo o un explorador de información.

---

## Objetivos de aprendizaje

Al terminar este proyecto serás capaz de:

1. Conectar un archivo de JavaScript a una página, y usar la consola del navegador para probar y depurar.
2. Guardar información en variables y elegir el tipo correcto: texto, número, verdadero o falso, arreglo u objeto.
3. Escribir funciones que reciben datos de entrada y devuelven resultados.
4. Tomar decisiones con `if` y con comparaciones, y repetir trabajo con bucles.
5. Encontrar elementos en la página, crear elementos nuevos y cambiar su texto.
6. Responder a eventos: escribir, elegir, hacer clic y enviar.
7. Guardar pequeñas cantidades de información en el navegador con `localStorage`.
8. Leer un mensaje de error y encontrar la línea que lo causó.

## Requisitos previos

- **Cursos 1.1–1.5.** Tienes un sitio accesible, con estilos y adaptable.

## Herramientas necesarias

| Herramienta | Para qué sirve | Costo |
| --- | --- | --- |
| Un navegador moderno, con su consola | Ejecutar y depurar JavaScript | Gratis |
| Un editor de texto (se recomienda VS Code) | Escribir JavaScript | Gratis |
| Un servidor local, como la extensión Live Server de VS Code (opcional) | Algunos navegadores limitan `localStorage` en los archivos abiertos directamente | Gratis |

## Lo que vas a construir

Un **explorador de programas** para el sitio de tu comunidad: las personas que lo visitan buscan entre los programas mientras escriben, los filtran según para quién son y si son gratuitos, y guardan los que les gustan en una lista que sigue ahí la próxima vez que vuelven. La cantidad de resultados se anuncia a los lectores de pantalla, y todo funciona con el teclado.

La solución de referencia está en [`completed/`](completed/). El punto de partida tiene la página HTML terminada y un archivo de JavaScript con doce TODO que completas una idea a la vez.

## Guía de carpetas

```text
06-javascript-foundations/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── explorer.js      # Begin here: a script with 12 TODOs
│   ├── index.html       # The explorer page (finished)
│   ├── styles.css       # The site's stylesheet, with explorer styles added
│   └── 3d-moment.html   # This lesson's 3D moment
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Configuración

1. Copia la carpeta `starter` de esta lección dentro de la carpeta de tu sitio con el nombre `explorer`, o copia sus tres archivos en tu sitio.
2. Agrega un enlace al explorador en la navegación de tu sitio.
3. Abre `index.html` en tu navegador y luego abre la **consola**: presiona **F12** (en una Mac, **⌘ + Option + J** en Chrome, **⌘ + Option + K** en Firefox) y elige **Console** (consola). Déjala abierta durante toda la lección.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; Paso 1 (TODO 1) | Tu primer mensaje en la consola |
| 2 | Paso 2: valores y variables | Puedes guardar y cambiar información |
| 3 | Paso 3: arreglos y objetos (TODO 2) | Tus programas convertidos en datos |
| 4 | Paso 3, continuación: leer datos en la consola | Puedes encontrar cualquier valor |
| 5 | Paso 4: encontrar elementos (TODO 3) | Los controles de la página guardados en variables |
| 6 | Paso 5: funciones | Puedes escribir y llamar una función |
| 7 | Paso 6: crear elementos (TODO 4) | Una función que construye una tarjeta |
| 8 | Paso 6, continuación | Una tarjeta en la página |
| 9 | Paso 7: bucles (TODO 5) | Todos los programas en la página |
| 10 | Paso 8: plantillas literales (TODO 6) | Un contador de resultados |
| 11 | Paso 9: decisiones (TODO 7) | Una función que decide qué coincide |
| 12 | Paso 9, continuación: `filter` | Resultados que siguen los filtros |
| 13 | Paso 10: eventos (TODO 8) | Resultados que se actualizan mientras escribes |
| 14 | Paso 10, continuación: el botón de envío y el foco | Un formulario cómodo para el teclado |
| 15 | Paso 11: el estado vacío (TODO 9) | Un mensaje útil cuando nada coincide |
| 16 | Paso 12: botones con estado (TODO 10) | Botones de guardar que recuerdan |
| 17 | Paso 13: localStorage (TODO 11) | Programas guardados que sobreviven a una recarga |
| 18 | Paso 13, continuación: `try...catch` | Una página que funciona incluso cuando el almacenamiento no |
| 19 | Paso 14: la lista de guardados (TODO 12) | Un explorador terminado |
| 20 | Paso 15: depuración, y el **Momento 3D** | Tu primer evento en 3D |
| 21 | [`tests/checklist.md`](tests/checklist.md) | Un explorador probado |
| 22 | Un reto adicional y luego **Cómo entregar tu trabajo** | Tu explorador en tu portafolio |

### Paso 1: conecta el script (TODO 1)

La página carga el script con:

```html
<script src="explorer.js" defer></script>
```

`defer` significa «ejecuta esto después de leer el HTML de la página», así que cada elemento que busca el script ya existe.

En `explorer.js`, escribe:

```js
console.log('The explorer is connected.');
```

Guarda, recarga y mira la consola. `console.log` es la herramienta de depuración más útil que tienes: úsala para comprobar cuánto vale cualquier valor, en cualquier momento.

### Paso 2: valores y variables

Una **variable** es un nombre para un valor:

```js
const centreName = 'Riverside';   // text: a string, in quotes
const programmesCount = 8;        // a number
let isOpenToday = true;           // true or false: a boolean
isOpenToday = false;              // let can change; const cannot
```

En los comentarios del código: un texto se llama *string* (cadena) y va entre comillas; `true` o `false` es un *boolean* (booleano); `let` puede cambiar y `const` no.

Usa `const` a menos que el valor tenga que cambiar; en ese caso, usa `let`. Escribe estas líneas en la consola y presiona Enter para ver cada una.

### Paso 3: arreglos y objetos (TODO 2)

Un **arreglo** (*array*) es una lista, entre corchetes. Un **objeto** agrupa valores con nombre, entre llaves. Los datos del explorador son un arreglo de objetos:

```js
const programmes = [
  { id: 'homework', name: 'Homework club', audience: 'children', free: true },
  { id: 'english', name: 'English conversation practice', audience: 'adults', free: true },
];

programmes.length;       // 2: how many
programmes[0];           // the first one (counting starts at 0)
programmes[0].name;      // 'Homework club'
```

`programmes.length` dice cuántos hay; `programmes[0]` es el primero (se empieza a contar desde 0).

Agrega tus propios programas, con exactamente la misma forma. La forma importa: todos los objetos deben tener los mismos nombres de propiedades.

### Paso 4: encontrar elementos (TODO 3)

```js
const results = document.querySelector('#results');
```

`document` es la página. `querySelector` recibe un **selector de CSS**, del mismo tipo que escribiste en el Curso 1.3, y devuelve el primer elemento que coincide. Encuentra cada control que necesitas y guárdalo en una `const`.

### Paso 5: funciones

Una **función** es un trabajo con nombre que puedes ejecutar una y otra vez. Puede recibir datos de entrada (parámetros) y devolver un resultado (`return`):

```js
function describe(programme) {
  return `${programme.name} is on ${programme.day}.`;
}

describe(programmes[0]);   // 'Homework club is on Weekdays.'
```

### Paso 6: crear elementos (TODO 4)

```js
function createCard(programme) {
  const card = document.createElement('li');
  card.className = 'card';

  const heading = document.createElement('h3');
  heading.textContent = programme.name;

  card.append(heading);
  return card;
}
```

Usa `textContent` para el texto, nunca `innerHTML`. `textContent` siempre trata el texto como texto; `innerHTML` lo trata como HTML, y en la Fase 5 vas a ver cómo eso permite que alguien con malas intenciones inyecte código.

Pruébala: escribe `results.append(createCard(programmes[0]))` en la consola.

### Paso 7: bucles (TODO 5)

Un bucle `for...of` ejecuta el mismo código para cada elemento de un arreglo:

```js
for (const programme of programmes) {
  results.append(createCard(programme));
}
```

Ponlo dentro de una función llamada `showResults()` y empiézala con `results.replaceChildren()`, que vacía la lista, para que las tarjetas nunca se dibujen dos veces.

### Paso 8: plantillas literales (TODO 6)

Las comillas invertidas (`` ` ``) te permiten poner valores dentro de un texto con `${ }`:

```js
count.textContent = `Showing ${found.length} of ${programmes.length} programmes.`;
```

`#count` tiene `role="status"`, así que los lectores de pantalla anuncian el texto nuevo cada vez que cambia.

### Paso 9: decisiones (TODO 7)

`if` ejecuta código solo cuando algo es verdadero. Las comparaciones dan verdadero o falso: `===` (es igual), `!==` (no es igual), `>`, `<`. Combínalas con `&&` (y), `||` (o) y `!` (no).

```js
function matches(programme) {
  if (freeCheckbox.checked && !programme.free) return false;
  if (audienceSelect.value !== 'all' && programme.audience !== audienceSelect.value) return false;
  return true;
}

const found = programmes.filter(matches);
```

`filter` ejecuta tu función con cada elemento y se queda con aquellos para los que devolvió `true`.

Para el cuadro de búsqueda, pasa a minúsculas tanto las palabras buscadas como el texto del programa (`toLowerCase()`) y compara con `includes()`, para que «English» y «english» coincidan las dos.

### Paso 10: eventos (TODO 8)

Un **evento** es algo que pasa: una tecla presionada, una casilla marcada, un botón en el que se hace clic. `addEventListener` ejecuta tu función cuando pasa:

```js
filters.addEventListener('input', showResults);
```

Un solo detector de eventos en todo el formulario capta los cambios en cada control que contiene. Después ocúpate del botón **Show results** (mostrar resultados): el evento `submit` normalmente recargaría la página, así que llama a `event.preventDefault()`, muestra los resultados y mueve el foco al contador para que quienes usan el teclado escuchen el resultado.

### Paso 11: el estado vacío (TODO 9)

Cuando nada coincide, una página vacía confunde. Dilo, y sugiere qué probar: «No programmes match. Try fewer words, or a different audience.» (Ningún programa coincide. Prueba con menos palabras o con otro público).

### Paso 12: botones con estado (TODO 10)

Cada tarjeta tiene un botón **Save** (guardar). Es un botón de alternar, así que usa `aria-pressed`, como en el Curso 0.1:

```js
button.setAttribute('aria-pressed', 'false');
button.dataset.id = programme.id;     // becomes data-id="homework"
```

Cuando se hace clic en él, agrega el `id` del programa a un arreglo `savedIds`, o quítalo si ya está ahí, y actualiza `aria-pressed`. La hoja de estilos muestra una palomita en los botones presionados: más que solo color.

### Paso 13: guardar en el navegador (TODO 11)

`localStorage` guarda texto en este navegador, incluso después de cerrar la página. Los arreglos no son texto, así que conviértelos en texto con `JSON.stringify`, y de vuelta con `JSON.parse`:

```js
try {
  localStorage.setItem('riverside-saved-programmes', JSON.stringify(savedIds));
} catch (error) {
  console.warn('Could not save programmes:', error);
}
```

El almacenamiento puede estar desactivado, bloqueado por la configuración de privacidad o lleno. `try...catch` significa que, si falla, el explorador sigue funcionando, solo que sin recordar. Planea siempre para lo que puede fallar.

`localStorage` existe solo en este navegador, en este dispositivo, y no es privado para otras personas que usen el mismo navegador. Nunca guardes en él contraseñas ni información personal. La página dice «Saved in this browser only» (guardado solo en este navegador): es honesto, y es verdad.

### Paso 14: la lista de guardados (TODO 12)

Escribe `showSaved()`, que muestra la lista de los programas guardados, o dice «Nothing saved yet» (todavía no hay nada guardado) cuando no hay ninguno. Llámala cuando se carga la página y después de cada vez que se guarda algo.

### Paso 15: leer errores

El código de cualquier persona que desarrolla se rompe. Cuando pasa, la consola muestra un mensaje en rojo con el **nombre del archivo y el número de línea**. Léelo despacio:

| Error | Normalmente significa |
| --- | --- |
| `Uncaught SyntaxError: Unexpected token` | Falta un corchete, una coma o una comilla, cerca de esa línea |
| `Uncaught TypeError: Cannot read properties of null` (Firefox: `... is null`) | `querySelector` no encontró nada: revisa el selector y el `id` |
| `Uncaught ReferenceError: x is not defined` | Un error de escritura, o una variable que nunca se creó o que está fuera de alcance |

Haz clic en el nombre del archivo en la consola para saltar a esa línea. Luego usa `console.log` justo antes para ver cuánto valen realmente los valores.

## Explicación del código clave

**`programmes.filter(matches)`.** Pasa la función misma, sin `()`, para que `filter` pueda llamarla una vez por cada programa.

**`results.replaceChildren()`.** Quita todo lo que hay dentro de un elemento en un solo paso.

**`button.dataset.id`.** Lee y escribe `data-id`. Los atributos de datos personalizados te permiten guardar la información que necesita tu script directamente en el elemento.

**`role="status"` con `tabindex="-1"`.** El contador se anuncia cuando cambia, y el script puede mover el foco a él después de enviar el formulario.

## Momento 3D

Abre [`starter/3d-moment.html`](starter/3d-moment.html). Un farol de papel cuelga en un cielo nocturno. Haz clic en él, o presiona el botón, y cambia de color, y un lector de pantalla anuncia el color nuevo.

Lee el script: es el mismo detector de eventos que escribiste hoy, pero en un objeto 3D. `cursor="rayOrigin: mouse"` permite que los clics del mouse lleguen a la escena 3D; una sola función, `changeColour`, la llaman tanto el clic como el botón, así que el teclado y el mouse pueden hacer exactamente lo mismo. Esa regla, **toda interacción 3D tiene un camino con el teclado**, es una que vas a seguir durante el resto de XR Camp.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| Cada control tiene una etiqueta | 1.3.1, 3.3.2 | La búsqueda, el filtro y la casilla dicen qué son. |
| Los resultados y el «no se encontró nada» se anuncian | 4.1.3 | Quienes usan lector de pantalla saben que el filtro funcionó. |
| Los botones de guardar son botones reales con `aria-pressed` | 4.1.2 | Su estado se anuncia: «presionado» o «no presionado». |
| El estado de guardado se muestra con algo más que color | 1.4.1 | Una palomita, no solo un cambio de color. |
| Todo funciona con el teclado | 2.1.1 | Incluido el botón Show results y cada botón Save. |
| Nada cambia de contexto mientras escribes | 3.2.2 | Los resultados se actualizan en su lugar; el foco no salta. |

## Consideraciones de rendimiento

El explorador dibuja como mucho unas cuantas decenas de tarjetas, así que volver a dibujarlas todas con cada tecla es instantáneo. Con miles de elementos, esperarías a que la persona deje de escribir antes de volver a dibujar, una técnica llamada *debouncing* (antirrebote), que vas a conocer en la Fase 2. El script pesa unos pocos kilobytes, sin ninguna biblioteca que descargar.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Script en el `<head>` sin `defer` | `querySelector` devuelve `null` | `defer`, o el script al final del `<body>` |
| `=` en lugar de `===` en un `if` | Cambia el valor en vez de compararlo | `===` para comparar |
| `innerHTML` para el texto | Un riesgo de seguridad con datos reales | `textContent` |
| Olvidar `replaceChildren()` | Las tarjetas aparecen dos veces | Vacía la lista primero |
| `localStorage` sin `try...catch` | La página se rompe cuando el almacenamiento está bloqueado o lleno | Envuélvelo siempre |
| Mover el foco con cada tecla | Los lectores de pantalla pierden su lugar | Anuncia con una región dinámica; mueve el foco solo al enviar |

## Solución de problemas

**No pasa nada y la consola está vacía.** Revisa que el `src` de la etiqueta `<script>` coincida exactamente con el nombre del archivo, y que hayas guardado el archivo.

**`Cannot read properties of null`.** Un selector no encontró nada. Compara el `#id` de tu script con el `id` del HTML, letra por letra.

**Lo guardado desaparece después de recargar.** Abre la consola: si hay una advertencia, el almacenamiento está bloqueado. Algunos navegadores lo limitan en los archivos abiertos directamente; prueba con un servidor local.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: un botón «Clear filters» (borrar filtros).
2. **[Creativo](challenges/challenge-2.es.md)**: etiquetas y mensajes en tu propio idioma.
3. **[Explorador](challenges/challenge-3.es.md)**: ordena los resultados por día o por nombre.

## Cómo entregar tu trabajo

1. Completa todos los puntos de [`tests/checklist.md`](tests/checklist.md).
2. Toma una captura de pantalla de tu explorador con un filtro activado, y otra de la consola sin errores.
3. Guárdalas en tu diario de aprendizaje y en tu portafolio. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. En tu diario, responde: ¿cuál fue el primer error que te apareció, y cómo lo resolviste?

## Lecturas adicionales

- [MDN: JavaScript first steps](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting) (en inglés): primeros pasos en JavaScript.
- [MDN: Introduction to events](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events) (en inglés): introducción a los eventos.
- [MDN: Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) (en inglés)
- [MDN: Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) (en inglés)

## Mujeres que conviene conocer

**Loiane Groner** es una ingeniera de software y educadora brasileña, originaria de Espírito Santo y que ahora vive en Florida. Escribió el libro *Learning JavaScript Data Structures and Algorithms* y crea cursos gratuitos de programación en portugués muy populares. Es Google Developer Expert en Tecnologías Web, Microsoft MVP y Java Champion.

Cursos gratuitos en tu propio idioma, de alguien que empezó donde tú estás: así aprendieron muchas personas que desarrollan en América Latina. Los arreglos, los objetos y los bucles de esta lección son justo las bases sobre las que se construye su libro.

> **Nota editorial — verificar antes de publicar.** Las afirmaciones biográficas de las secciones Mujeres que conviene conocer deben contrastarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

El nombre oficial de JavaScript es **ECMAScript**, y lo mantiene el comité TC39 de Ecma International, con una edición nueva cada año. `querySelector`, `createElement` y los eventos no forman parte de ECMAScript: vienen del **DOM Standard** (WHATWG), y `localStorage`, del HTML Living Standard. JavaScript es el lenguaje; los estándares del navegador le dan la página.

## Licencia

Código: [`LICENSE-CODE`](../../LICENSE-CODE) · Contenido: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
