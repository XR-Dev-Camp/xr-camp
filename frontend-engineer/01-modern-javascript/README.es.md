# JavaScript moderno

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `frontend-engineer` · **Lección:** `modern-javascript-01` · **Tiempo:** unas 14 horas · 19 sesiones de 45 minutos · unas 5 semanas con 4 sesiones por semana

---

> Construye una aplicación web modular basada en datos.

---

## Objetivos de aprendizaje

Al terminar este proyecto serás capaz de:

1. Dividir una aplicación en módulos ES que importan y exportan lo que necesitan.
2. Explicar el ámbito (scope): dónde se puede ver una variable, y por qué `const` y `let` son más seguros que `var`.
3. Escribir funciones flecha, parámetros por defecto y callbacks.
4. Desestructurar objetos y arreglos para leer los valores que necesitas.
5. Cargar datos con `fetch`, `async` y `await`, y explicar qué es una Promise.
6. Manejar errores para que una falla muestre un mensaje útil en lugar de una página en blanco.
7. Transformar datos con `map`, `filter` y `reduce`, y escribir funciones puras.
8. Leer y escribir código que otras personas puedan entender.

## Requisitos previos

- **Fase 1**, especialmente el **Curso 1.6: Fundamentos de JavaScript** y el **Curso 1.7: Herramientas para desarrolladores.**

## Herramientas necesarias

| Herramienta | Para qué sirve | Costo |
| --- | --- | --- |
| Un navegador moderno, con sus herramientas de desarrollo | Ejecutar y depurar | Gratis |
| VS Code (recomendado) | Escribir módulos | Gratis |
| Un servidor local: la extensión **Live Server** de VS Code, o `python3 -m http.server` | **Obligatorio**: los módulos y `fetch` no funcionan desde `file://` | Gratis |

## Lo que vas a construir

La primera parte de **My XR Camp**, un panel de aprendizaje que seguirás construyendo durante la Fase 2: un **mapa de cursos** que muestra cada fase y lección de XR Camp, con su duración y si está lista, cargado desde los propios datos de cursos de XR Camp. Tiene un filtro de «solo listas», un resumen y un mensaje amigable con un botón **Try again** (Intentar de nuevo) cuando los datos no se pueden cargar.

El código está dividido en cuatro **módulos**, cada uno con una sola tarea:

| Módulo | Tarea |
| --- | --- |
| `js/format.js` | Convertir números en palabras («12 horas · 16 sesiones») |
| `js/data.js` | Cargar los datos y calcular a partir de ellos |
| `js/render.js` | Convertir datos en elementos de la página |
| `js/main.js` | Iniciar todo y conectar las piezas |

La solución de referencia está en [`completed/`](completed/). El punto de partida tiene el HTML, el CSS y los datos ya terminados, y los cuatro módulos con catorce TODO.

## Guía de carpetas

```text
01-modern-javascript/
├── README.md            # Esta guía (en inglés)
├── README.es.md         # Español
├── README.zh-Hans.md    # Chino simplificado
├── project.json         # Metadatos de la lección
├── starter/
│   ├── index.html       # La página del mapa de cursos (terminada)
│   ├── styles.css
│   ├── data/catalog.json   # Una instantánea de los datos de cursos de XR Camp
│   ├── js/format.js, data.js, render.js, main.js   # Empieza aquí: 14 TODO
│   └── 3d-moment.html   # El momento 3D de esta lección
├── completed/           # Solución de referencia: ábrela al final
├── challenges/          # Tres desafíos: Fundamento es obligatorio
├── tests/checklist.md   # Autorrevisión antes de entregar
├── assets/
└── screenshots/
```

## Configuración

1. Copia la carpeta `starter` de esta lección dentro de tu carpeta `xr-camp` con el nombre `my-xr-camp`. Seguirás agregando cosas ahí en los Cursos 2.2, 2.5, 2.6 y 2.9.
2. Inicia un servidor local en esa carpeta: en VS Code, abre la carpeta y elige **Go Live**; o, en una terminal dentro de esa carpeta, ejecuta `python3 -m http.server 8000` y abre `http://localhost:8000`.
3. Abre la página y su **Consola**. De ahora en adelante, abre siempre tus proyectos a través del servidor.

**¿Por qué un servidor?** Por seguridad, los navegadores no permiten que una página abierta desde `file://` importe módulos ni haga fetch de archivos. Un servidor local hace que tu computadora se comporte como un sitio web real, que es también cómo funcionarán tus páginas una vez publicadas.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración y servidor local; TODO 1 | Un módulo que se ejecuta |
| 2 | Paso 1: módulos, `import` y `export` | Puedes explicar qué es un módulo |
| 3 | Paso 2: ámbito, `const` y `let` | Puedes predecir dónde es visible una variable |
| 4 | Paso 3: funciones flecha y parámetros por defecto (TODO 2–3) | Dos funciones de formato |
| 5 | Paso 4: desestructuración (TODO 4) | `describeTime` |
| 6 | Paso 5: Promises, `async` y `await` | Puedes explicar qué es una Promise |
| 7 | Paso 5, continuación (TODO 5) | Datos cargados con `fetch` |
| 8 | Paso 6: `reduce` (TODO 6 y 8) | Lecciones agrupadas y contadas |
| 9 | Paso 6, continuación: funciones puras | Funciones que puedes probar con `console.log` después del Paso 7 |
| 10 | Paso 7: importar (TODO 7) | Módulos conectados |
| 11 | Paso 8: renderizado con `map` (TODO 9–10) | Una lección en la página |
| 12 | Paso 8, continuación (TODO 11) | Todas las fases en la página |
| 13 | Paso 9: iniciar la app (TODO 12) | Un mapa de cursos funcionando |
| 14 | Paso 10: errores (TODO 13) | Un error útil, y Try again |
| 15 | Paso 10, continuación: probar fallas a propósito | Un mapa que falla con elegancia |
| 16 | Paso 11: `filter` (TODO 14) | El filtro «solo listas» |
| 17 | Paso 12: código legible, y una nota sobre las clases | Código que una persona extraña podría seguir |
| 18 | El **momento 3D**, y luego [`tests/checklist.md`](tests/checklist.md) | El curso como un paisaje 3D |
| 19 | Un reto adicional, y luego **Cómo entregar tu trabajo** | La primera parte de My XR Camp |

### Paso 1: módulos

En el Curso 1.6, todo tu código estaba en un solo archivo. Eso está bien para 150 líneas; es un dolor de cabeza para 1500. Los **módulos** dividen el código en archivos, cada uno con una sola tarea. Un módulo elige qué compartir con `export`, y otros módulos lo toman con `import`:

```js
// format.js
export const hours = (minutes) => Math.round(minutes / 60);

// main.js
import { hours } from './format.js';
```

La página carga solo el módulo inicial, con `<script type="module" src="js/main.js">`. El navegador sigue los `import` y carga el resto. Los módulos se **difieren** automáticamente, y cada uno tiene su propio ámbito: nada se filtra hacia afuera a menos que lo exportes.

### Paso 2: ámbito

Una variable solo es visible dentro del bloque (`{ ... }`) donde se creó:

```js
const phase = 1;
if (phase > 0) {
  const message = 'Not the first phase';
  console.log(message);   // funciona
}
console.log(message);     // ReferenceError: message is not defined
```

Usa `const` por defecto, y `let` cuando el valor deba cambiar. Verás `var` en código antiguo: ignora los bloques, lo que provoca errores sorprendentes. No lo uses.

### Paso 3: funciones flecha y parámetros por defecto (TODO 2–3)

```js
export const hours = (minutes) => Math.round(minutes / 60);

export const plural = (count, one, many = `${one}s`) => (count === 1 ? one : many);
```

Una **función flecha** es una forma más corta de escribir una función. Si su cuerpo es una sola expresión, ese valor se retorna automáticamente. Un **parámetro por defecto** (`many = ...`) se usa cuando quien llama a la función lo omite. `condition ? a : b` elige entre dos valores.

Una función que se pasa a otra función para que la llame más tarde es un **callback**. Ya los usas desde el Curso 1.6: `addEventListener('click', changeColour)`.

### Paso 4: desestructuración (TODO 4)

Desestructurar saca valores de un objeto o un arreglo hacia variables, en una sola línea:

```js
const { minutes, sessions } = lesson;          // igual que lesson.minutes, lesson.sessions
const [first, second] = lessons;               // los primeros dos elementos

export const describeTime = ({ minutes, sessions }) =>
  `${hours(minutes)} hours · ${sessions} sessions`;
```

Desestructurar en la lista de parámetros muestra, de un vistazo, exactamente qué necesita una función. (La versión completa también usa `plural` para ambas palabras, así que dice «1 hour» y «1 session».)

### Paso 5: Promises, async y await (TODO 5)

Cargar un archivo toma tiempo. JavaScript no se detiene a esperar: `fetch` devuelve de inmediato una **Promise**, un objeto que dice «tendré la respuesta más tarde». `await` pausa **esta función** (no la página) hasta que llega la respuesta:

```js
export async function loadCatalog(url = 'data/catalog.json') {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not load the course data (${response.status}).`);
  }
  return response.json();
}
```

`await` solo funciona dentro de una función `async` (o en el nivel superior de un módulo). Fíjate en la verificación: `fetch` solo falla ante errores de red. Un archivo faltante igual «tiene éxito», con el estado 404, así que debes comprobar `response.ok` tú misma.

### Paso 6: reduce, y funciones puras (TODO 6 y 8)

`reduce` recorre un arreglo y construye **un solo** resultado a partir de él: un total, o un objeto:

```js
export function totals(lessons) {
  return lessons.reduce(
    (sum, { minutes, status }) => ({
      minutes: sum.minutes + minutes,
      ready: sum.ready + (status === 'ready' ? 1 : 0),
    }),
    { minutes: 0, ready: 0 },        // el valor inicial
  );
}
```

Las funciones de `format.js` y `totals` son **puras**: la misma entrada siempre da la misma salida, y no cambian nada más. Las funciones puras son las más fáciles de probar y de confiar en ellas. Para probar una, imprímela desde `main.js` una vez que la importes en el Paso 7: `console.log(totals([{ minutes: 90, status: 'ready' }]))`. (Escribir `totals(...)` directamente en la consola no funciona: lo que exporta un módulo no es global.)

### Paso 7: importar (TODO 7)

Importa solo lo que necesita cada módulo, con rutas que empiecen con `./`, e incluye `.js`. Prueba tus funciones de inmediato en `main.js` con `console.log`.

### Paso 8: renderizado con map (TODO 9–11)

`map` convierte cada elemento de un arreglo en otra cosa, y devuelve un nuevo arreglo:

```js
list.append(...lessons.map(renderLesson));
```

`...` (spread) pasa los elementos del arreglo a `append` uno por uno. `render.js` nunca hace fetch ni guarda nada: solo convierte datos en elementos. Mantener esas tareas separadas es lo que hace que cada módulo sea fácil de cambiar.

### Paso 9: iniciar la app (TODO 12)

`main.js` conecta todo: carga los datos, calcula, renderiza. Muestra primero «Loading the course map…» en la región dinámica `#summary`, para que las personas sepan que algo está pasando.

### Paso 10: errores (TODO 13)

Cualquier solicitud de red puede fallar: sin señal, un error de tipeo en el nombre de un archivo, un servidor caído. Envuelve la carga en `try...catch`, y muestra un mensaje que diga qué pasó y qué hacer, con un botón **Try again** (Intentar de nuevo):

```js
try {
  catalog = await loadCatalog();
  draw();
} catch (error) {
  map.replaceChildren(renderError(error.message, start));
}
```

`role="alert"` en el cuadro de error hace que los lectores de pantalla lo anuncien de inmediato. Pruébalo: cambia el nombre de `catalog.json` por un momento, recarga, y luego vuelve a ponerle su nombre y presiona Try again.

### Paso 11: filter (TODO 14)

Cuando cambie «solo listas», vuelve a renderizar con `catalog.lessons.filter(...)`, y oculta las fases que no tengan nada que mostrar. Los datos se cargaron una sola vez; volver a renderizar es instantáneo.

### Paso 12: código legible, y clases

Lee tus módulos como si nunca los hubieras visto:

- Los **nombres** dicen qué son las cosas (`loadCatalog`, no `getData2`).
- Las **funciones** hacen una sola cosa, y son cortas.
- Los **comentarios** explican *por qué*, no *qué*: el código ya dice qué hace.

También te vas a encontrar con las **clases** en código de otras personas: `class Lesson { constructor(title) { this.title = title; } }`. Agrupan datos y las funciones que trabajan con ellos. Los componentes de A-Frame y los objetos de three.js, en la Fase 3, se construyen así. Para datos como los nuestros, los objetos y funciones simples son más sencillos, y suficientes.

## Explicación del código clave

**`<script type="module">`.** Habilita `import` y `export`, le da al archivo su propio ámbito, y lo difiere.

**`groups[lesson.phase] ??= []`.** `??=` asigna solo si el lado izquierdo es `null` o `undefined`: «crea la lista la primera vez que la necesites».

**`response.ok`.** Verdadero para los estados 200–299. Compruébalo siempre después de `fetch`.

**`role="alert"` y `role="status"`.** Ambas son regiones dinámicas: `alert` interrumpe, para errores; `status` espera con educación, para actualizaciones.

## Momento 3D

Abre [`starter/3d-moment.html`](starter/3d-moment.html) una vez que tus módulos funcionen. Importa **tu** `data.js`, y construye un paisaje 3D a partir de los mismos datos de cursos: una columna por fase, un bloque por lección, morado cuando la lección está lista. La descripción de la escena también se genera a partir de los datos, así que siempre coincide con la escena.

Esa es la idea de esta lección en una sola imagen: una vez que tus datos y tu lógica viven en módulos, el mismo código puede alimentar una lista, un gráfico o un mundo 3D.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| La carga, los resultados y los errores se anuncian | 4.1.3 | `role="status"` y `role="alert"`. |
| El estado se muestra en palabras, no solo con color | 1.4.1 | Etiquetas «Ready» y «Coming soon». |
| Cada fase es una sección nombrada por su encabezado | 1.3.1 | Quienes usan lector de pantalla pueden saltar entre fases. |
| La casilla tiene una etiqueta | 1.3.1, 3.3.2 | Al hacer clic en el texto también se marca. |
| El paisaje 3D tiene una descripción generada a partir de los datos | 1.1.1 | El texto siempre coincide con la escena. |

## Consideraciones de rendimiento

Los datos de los cursos pesan unos 16 KB, y se cargan una sola vez; filtrar vuelve a dibujar desde la memoria. Los módulos se cargan en paralelo, y el navegador los guarda en caché. En el Curso 2.9 verás cómo las herramientas combinan muchos módulos en un solo archivo para producción.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Abrir la página desde `file://` | Errores de «CORS», y nada carga | Usa un servidor local |
| `import { hours } from './format'` | El navegador no encuentra el archivo | Incluye `.js` |
| Olvidar `export` | `does not provide an export named` | Exporta lo que otros módulos necesiten |
| Usar `await` dentro de una función que no es `async` | `SyntaxError` | Marca la función como `async` |
| No comprobar `response.ok` | Una página 404 se lee como datos, y `json()` falla | Compruébalo, y lanza un error claro |
| Volver a tener un `main.js` enorme | Módulos solo de nombre | Una tarea por módulo |

## Solución de problemas

**La consola dice «CORS» o «blocked».** Abriste la página desde `file://`. Usa la dirección de tu servidor local.

**`Failed to resolve module specifier`** (así lo dice Chrome; Firefox dice que el especificador «was a bare specifier»). Las rutas de los módulos deben empezar con `./`, `../` o `/` (o ser una URL completa).

**`Unexpected token '<'` al leer JSON.** El servidor envió una página HTML, casi siempre una página 404, en lugar de tus datos. Revisa la ruta.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: una caja de búsqueda que filtra lecciones por título.
2. **[Creativo](challenges/challenge-2.es.md)**: tus propios datos: un mapa de tu plan de estudio o de las actividades de tu comunidad.
3. **[Explorador](challenges/challenge-3.es.md)**: carga dos archivos a la vez con `Promise.all`.

## Cómo entregar tu trabajo

1. Completa todos los puntos de [`tests/checklist.md`](tests/checklist.md).
2. Toma una captura de pantalla de tu mapa de cursos, otra de su mensaje de error, y otra del paisaje 3D.
3. Guárdalas en tu diario de aprendizaje y tu portafolio. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. En tu diario, responde: ¿qué módulo cambiarías si los datos se mudaran a otra dirección, y por qué solo ese?

## Lecturas adicionales

- [MDN: Módulos de JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Modules) (en inglés)
- [MDN: Usar promesas](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Using_promises) (en inglés)
- [MDN: función async](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function) (en inglés)
- [MDN: Desestructuración](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring) (en inglés)
- [MDN: Array.prototype.reduce()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) (en inglés)

## Mujeres que conviene conocer

**Joyee Cheung** creció en Guangzhou, y es miembro del Comité Directivo Técnico (Technical Steering Committee) de Node.js y colaboradora («committer») de V8, el motor de JavaScript dentro de Chrome y Node.js. Lideró el trabajo de `require(esm)`, que permite que el código antiguo de Node.js cargue módulos ES: los mismos `import` y `export` que usaste en esta lección.

Los módulos solo ayudan si el código antiguo y el código nuevo pueden trabajar juntos. Hacer eso posible en una de las plataformas de JavaScript más usadas del mundo es un trabajo cuidadoso y paciente, y buena parte fue obra suya.

_Datos de fuentes públicas, verificados en 2026. ¿Encontraste un error? [Avísanos](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Estándar destacado

Los módulos ES, `async`/`await`, la desestructuración y las funciones flecha llegaron todos en ediciones de **ECMAScript** a partir de 2015, acordadas por TC39. Cada propuesta pasa por etapas públicas, desde una idea (etapa 0) hasta terminada (etapa 4), en GitHub, donde cualquiera puede leer la discusión. `fetch` en sí no es ECMAScript: es el **Fetch Standard** de WHATWG.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
