# Arquitectura de aplicaciones y código mantenible

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `frontend-engineer` · **Lección:** `application-architecture-and-maintainable-code-03` · **Tiempo:** unas 12 horas · 16 sesiones de 45 minutos · unas 4 semanas con 4 sesiones por semana

---

> Refactoriza una aplicación construida intencionalmente con mala estructura.

---

## Objetivos de aprendizaje

Al terminar este proyecto serás capaz de:

1. Reconocer **code smells** (señales de mal código) comunes: nombres poco claros, números mágicos, variables globales, código repetido y funciones que hacen demasiadas cosas.
2. **Refactorizar**: cambiar cómo está organizado el código sin cambiar lo que hace, un paso pequeño a la vez.
3. Dividir una aplicación en capas con responsabilidades claras: **configuración**, **utilidades**, **estado** (un store), **componentes**, y un archivo que las **conecta** entre sí.
4. Escribir **funciones puras**, y probarlas con una página de verificación sencilla.
5. Mantener el estado en un solo lugar, cambiarlo solo mediante acciones con nombre, y actualizar la página cuando cambia (**subscribe**).
6. Explicar por qué usar `innerHTML` con texto ingresado por la persona usuaria es peligroso, y construir elementos de forma segura en su lugar.
7. Usar **mejora progresiva**: la página es HTML útil desde el principio, y JavaScript agrega las partes que funcionan.

## Requisitos previos

- **Curso 2.1: JavaScript moderno** (módulos, `import` y `export`).
- **Curso 2.2: El DOM y las interfaces dinámicas** (construcción de elementos, delegación de eventos, gestión del foco, regiones dinámicas).

## Herramientas necesarias

| Herramienta | Para qué sirve | Costo |
| --- | --- | --- |
| Un navegador moderno, con sus herramientas de desarrollo | Probar el planificador viejo y el nuevo lado a lado | Gratis |
| VS Code y un servidor local | Los módulos necesitan `http://` | Gratis |
| Git (del Curso 1.8) | Un commit por cada paso de refactorización, para poder volver atrás siempre | Gratis |

## Lo que vas a construir

La tercera parte de **My XR Camp**: un **planificador de sesiones**. Planifica sesiones de estudio para la semana, márcalas como hechas, y mira qué tan cerca estás de tu meta semanal de cuatro sesiones.

El giro: el planificador ya funciona. Está en [`starter/old/`](starter/old/), y está escrito mal a propósito, como ocurre con mucho código real: nombres de una letra, números sin nombre, todo global, HTML pegado dentro de strings, y un problema de seguridad escondido. Tu tarea es **refactorizarlo** hacia una estructura limpia y probada, de modo que haga exactamente las mismas cosas, pero sea fácil de leer, cambiar y extender.

La solución de referencia está en [`completed/`](completed/). El punto de partida tiene la app vieja (no la edites), un `behaviour.md` para completar (TODOs 1-2), y los archivos nuevos con los TODOs 3-13.

## Guía de carpetas

```text
03-application-architecture-and-maintainable-code/
├── README.md            # Esta guía
├── README.es.md         # Español
├── README.zh-Hans.md    # Chino simplificado
├── project.json         # Metadatos de la lección
├── starter/
│   ├── old/index.html, old/app.js   # El planificador enredado: compáralo con el nuevo
│   ├── behaviour.md     # Qué hace la app vieja, y sus code smells: TODOs 1–2
│   ├── index.html       # La página nueva: TODO 11
│   ├── styles.css       # Terminado
│   ├── check.html       # Pruebas para utils.js (terminado)
│   ├── js/config.js     # TODO 3
│   ├── js/utils.js      # TODOs 4–5
│   ├── js/store.js      # TODOs 6–8
│   ├── js/components/   # TODOs 9–10
│   ├── js/main.js       # TODOs 12–13
│   └── 3d-moment.html   # Una escena 3D enredada para refactorizar
├── completed/           # Solución de referencia: ábrela al final
├── challenges/          # Tres desafíos: Fundamento es obligatorio
├── tests/checklist.md   # Autorrevisión antes de entregar
├── assets/
└── screenshots/
```

## Configuración

1. Crea una carpeta nueva, `planner`, junto a tu carpeta `my-xr-camp`, y copia dentro los archivos del punto de partida.
2. Conviértela en un repositorio Git y confirma el punto de partida sin tocar: `git init`, después `git add .` y `git commit -m "Starter"`. Desde ahora, haz un commit después de cada paso. Si un paso sale mal, puedes volver atrás.
3. Inicia tu servidor local. Abre `old/index.html` en una pestaña e `index.html` en otra, cada una con su **Consola** abierta.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; usa el planificador viejo, y lista lo que hace (TODO 1) | Una lista de comportamientos |
| 2 | Paso 1: code smells (TODO 2) | Ocho smells, con números de línea |
| 3 | Paso 2: planifica la arquitectura | Un dibujo de las cinco capas |
| 4 | Paso 3: configuración (TODO 3) | Cada ajuste en un solo archivo |
| 5 | Paso 4: funciones puras (TODO 4) | `plural` y `describeMinutes` escritas; la consola ahora nombra la siguiente exportación faltante |
| 6 | Paso 4, continuación (TODO 5) | Cada verificación pasa |
| 7 | Paso 5: el store (TODO 6) | Las sesiones guardadas se cargan, incluidas las viejas |
| 8 | Paso 5, continuación (TODOs 7–8) | Acciones y subscribe |
| 9 | Paso 6: componentes (TODOs 9–10) | Elementos seguros, sin `innerHTML` |
| 10 | Paso 7: mejora progresiva (TODO 11) | El formulario escrito en HTML |
| 11 | Paso 8: conectando todo (TODO 12) | Agregar sesiones funciona |
| 12 | Paso 8, continuación (TODO 13) | Hecho y Eliminar funcionan, con el foco en el lugar correcto |
| 13 | Paso 9: compara con la lista de comportamientos | Una refactorización en la que puedes confiar |
| 14 | El **Momento 3D** | Una exhibición 3D ordenada |
| 15 | [`tests/checklist.md`](tests/checklist.md) | Un planificador terminado |
| 16 | Un reto adicional, y luego **Cómo entregar tu trabajo** | La tercera parte de My XR Camp |

### Paso 1: entiende qué hace, luego encuentra los smells (TODOs 1–2)

**Refactorizar** significa cambiar la estructura del código sin cambiar su comportamiento. Así que, antes de cambiar nada, necesitas saber exactamente cuál es ese comportamiento. Usa el planificador viejo durante diez minutos, y escribe cada comportamiento que encuentres en `behaviour.md`: qué pasa cuando agregas una sesión, la marcas como hecha, la eliminas, recargas la página, agregas un tema vacío, llegas a cuatro sesiones.

Después lee `old/app.js` y busca **code smells**: señales de que el código será difícil de cambiar. Todavía no necesitas arreglar nada. Busca:

| Smell | En el planificador viejo |
| --- | --- |
| Nombres que no dicen nada | `a`, `x`, `fn2`, `h`, `n`, `dn` |
| **Números mágicos**: valores sin nombre | `45`, `4`, y la clave `'xrc_s'` |
| Variables globales que cualquiera puede cambiar | `a` y `x`, usadas por todas las funciones |
| Una función que hace muchas cosas | `fn2` ordena, construye HTML, cuenta, calcula y guarda |
| Código repetido | Los dos bucles en `fn2`; la lista de días |
| Código muerto | `x` se asigna, y nunca se lee |
| Comentarios que repiten el código | `// this function renders` |
| HTML construido con strings | Cada parte de la página está pegada dentro de `innerHTML` |
| Posiciones usadas como identidad | `tog(i)` y `del(i)` usan posiciones del arreglo, que cambian cuando se ordena la lista |

Y un smell que también es un **bug**: intenta agregar una sesión con el tema `<b>Hello</b>`. La app vieja no muestra el texto que escribiste: lo convierte en HTML en negrita. Así funcionan los ataques de cross-site scripting, y el Curso 5.5 vuelve sobre esto.

### Paso 2: planifica la arquitectura

La **arquitectura** es cómo divides un programa en partes, y cómo esas partes se comunican entre sí. Una buena regla: cada archivo tiene **una sola responsabilidad**, y puedes describirla en una sola frase.

```text
config.js          Ajustes: los días, 45 minutos, una meta de 4, la clave de almacenamiento
utils.js           Funciones puras: plural, describeMinutes, bySchedule, sessionLabel
store.js           El estado, y el único código que lo cambia o lo guarda
components/        Construyen elementos a partir de datos; nunca cambian el estado
main.js            Conecta los elementos y eventos de la página con el store
```

Las flechas van en un solo sentido. `main.js` usa el store y los componentes; los componentes usan las utilidades; todos pueden leer config. Nada apunta de vuelta a `main.js`. Cuando quieras saber «¿dónde pasa esto?», la estructura te lo dice.

Dibuja esto en papel, con flechas, y mantenlo cerca mientras trabajas.

### Paso 3: configuración (TODO 3)

Dale nombre a cada número mágico, en un solo archivo:

```js
export const SESSION_MINUTES = 45;
export const WEEKLY_GOAL = 4;
```

Ahora «cambiar la meta semanal a cinco» es un cambio de una sola línea, y el nombre explica qué significaba el 4. Mantén la misma clave de almacenamiento que usaba la app vieja: quienes usan el planificador viejo tienen sesiones guardadas bajo esa clave.

### Paso 4: funciones puras y una página de verificación (TODOs 4–5)

Una **función pura** da el mismo resultado para la misma entrada, y no cambia nada más: nada de DOM, ni almacenamiento, ni variables globales. Las funciones puras son el código más fácil de probar, porque una prueba es simplemente «dale esto, espera aquello».

`check.html` es una pequeña página de pruebas. Llama a tus funciones y compara las respuestas:

```js
check('1 hour 30 minutes', describeMinutes(90), '1 hour 30 minutes');
```

Ábrela antes de escribir el TODO 4: la consola dice que `utils.js` no tiene esa exportación. Escribe `plural` y `describeMinutes`, recarga, y observa cómo cambia el error: ahora nombra a `bySchedule`. Cuando el TODO 5 también esté listo, aparecerá cada línea, y debería decir PASS. Así trabajan los equipos profesionales: funciones pequeñas, verificadas automáticamente, para que un cambio posterior que rompa una se detecte de inmediato.

Fíjate en que `describeMinutes(0)` da «0 minutes», mientras que la app vieja decía «0 hours 0 minutes». Ese es un **cambio deliberado**, no un accidente: anótalo en la sección «Deliberate changes» de `behaviour.md`.

### Paso 5: el store (TODOs 6–8)

El **store** guarda el estado, y es el único código autorizado para cambiarlo. Todo lo demás pregunta:

- `getSessions()` da una **copia** ordenada. La app vieja ordenaba el arreglo real dentro de su función de dibujo, así que las posiciones de los botones eran correctas solo por coincidencia: cualquier cambio que reordenara el arreglo sin volver a dibujar haría que `tog(i)` cambiara la sesión equivocada.
- Tres **acciones**, `addSession`, `toggleSession` y `removeSession`, son las únicas formas de cambiarlo. Cada una termina con `commit()`: guarda, y luego avisa a todos.
- `subscribe(listener)` permite que otro código diga «avísame cuando algo cambie».

Cada sesión recibe un **id** de `crypto.randomUUID()`. Las acciones usan ids, nunca posiciones, así que ordenar o eliminar nunca puede hacer que cambies la sesión equivocada.

**Los datos duran más que el código.** La app vieja guardaba `{ d, t, w, done }`. Tu función `upgrade` lee tanto la forma vieja como la nueva, así el plan guardado de una persona sobrevive a la refactorización:

```js
day: saved.day ?? saved.d,
```

### Paso 6: componentes (TODOs 9–10)

Un **componente**, aquí, es una función que recibe datos y devuelve elementos. Nunca cambia el estado, y nunca agrega listeners: solo construye.

```js
const text = document.createElement('span');
text.textContent = sessionLabel(session);   // el texto se queda como texto
```

`textContent` trata todo como texto, así que `<b>Hello</b>` aparece exactamente como se escribió. Eso corrige el bug de seguridad del Paso 1. Anótalo en «Deliberate changes».

Cada botón tiene `data-action="toggle"` o `data-action="delete"`, y el elemento de la lista tiene `data-id`. Eso es todo lo que `main.js` necesita saber para identificar qué botón se presionó, y para qué sesión.

### Paso 7: mejora progresiva (TODO 11)

La app vieja construía todo su formulario a partir de un string de JavaScript. Si el script fallaba, la página quedaba vacía. La **mejora progresiva** consiste en empezar con HTML plano y con significado, y dejar que JavaScript agregue funcionalidad encima:

- El encabezado, la explicación y los dos títulos de lista están en `index.html`.
- El formulario también está escrito en HTML, con `<label>`s reales, pero tiene el atributo `hidden`. `main.js` lo quita cuando todo terminó de cargar, así el formulario nunca aparece sin funcionar.
- Un mensaje `<noscript>` explica qué falta si JavaScript está desactivado.

Escrito en HTML, el formulario también es más fácil de leer y de revisar en cuanto a accesibilidad que el mismo formulario dentro de un string.

### Paso 8: conectando todo (TODOs 12–13)

`main.js` es el único archivo que conoce los elementos de esta página. Hace tres cosas:

1. **Dibujar**: `render(sessions)` llena ambas listas y el resumen. `subscribe(render)` hace que se ejecute después de cada acción, automáticamente.
2. **Escuchar**: un listener de `submit` para el formulario, y un listener delegado de `click` para cada botón en ambas listas (como en el Curso 2.2).
3. **Cuidar a la persona usuaria**: mover el foco, mostrar errores, y anunciar cambios.

`alert('Error!')` desapareció. Un tema vacío ahora muestra un mensaje junto al campo, marca el campo con `aria-invalid="true"`, y devuelve el foco a él (Curso 1.2).

En el Curso 2.2 actualizabas solo lo que cambiaba. Aquí, la lista completa se vuelve a dibujar después de cada acción, lo cual es más simple, pero destruye el botón que tenía el foco. Por eso `main.js` devuelve el foco de forma deliberada: después de **Done**, al botón de esa misma sesión en su nueva lista, encontrado por su id; después de **Delete**, al siguiente botón Delete, al anterior, o a la casilla de tema. Ambos enfoques son válidos; para una lista corta, el más simple está bien, siempre que gestiones el foco.

### Paso 9: compara con la lista de comportamientos

Vuelve a `behaviour.md` y prueba cada línea en ambos planificadores, uno junto al otro. Todos los comportamientos deben coincidir, excepto los cambios deliberados que anotaste. Más allá del texto «0 minutes» y la corrección de seguridad, `completed/` también hace pequeños cambios deliberados que quizá notes: rechaza un tema de solo espacios, su mensaje de meta alcanzada está redactado distinto, las listas vacías dicen «Nothing here yet.», y los botones y anuncios de estado ganaron etiquetas de accesibilidad. Son mejoras, no errores, así que agrégalos a tu propia lista de «Deliberate changes» en lugar de tratarlos como discrepancias. Este es el momento en que una refactorización se vuelve confiable.

Luego lee tu código nuevo como lo haría alguien que nunca lo vio. ¿Podría alguien encontrar dónde se define la meta semanal en diez segundos? ¿Dónde se guardan las sesiones? ¿Qué pasa cuando se presiona Delete?

## Explicación del código clave

**`subscribe` devuelve una función.** `const stop = subscribe(render)` empieza a escuchar; llamar a `stop()` después detiene la escucha. Este patrón «observador» es cómo la mayoría de los frameworks de frontend le avisan a la página que el estado cambió.

**`[...sessions].sort(bySchedule)`.** `sort` cambia el arreglo sobre el que se llama. Copiar primero (`[...sessions]`) mantiene intacto el orden guardado.

**`a || b` dentro de `bySchedule`.** Si los días son distintos, su diferencia no es cero, así que se usa esa. Si es cero (mismo día), `||` pasa a comparar las horas.

**`try { … } catch { … }`** sin `(error)`: el JavaScript moderno te permite omitirlo cuando no lo necesitas.

**`data-action` y `closest('button[data-action]')`.** El HTML indica qué hace cada botón; un solo listener lo lee. Agregar un nuevo tipo de botón no requiere un nuevo listener.

## Momento 3D

Abre [`starter/3d-moment.html`](starter/3d-moment.html): tres objetos sobre pedestales, girando lentamente. Funciona, pero su script está enredado: las mismas seis líneas copiadas tres veces, posiciones escritas a mano, nombres de una letra, y un `setInterval` que pide ejecutarse cada 16 milisegundos, y sigue corriendo incluso cuando la pestaña está oculta (el navegador solo lo hace más lento).

Ahora abre [`completed/3d-moment.html`](completed/3d-moment.html). La misma escena, refactorizada:

- **Configuración**: `EXHIBITS` es un arreglo de datos (nombre, forma, color). Agregar un cuarto objeto es una sola línea, y su posición, su pedestal y su descripción lo siguen automáticamente.
- **Componentes**: `pedestal` construye una base y un objeto; `turntable` hace que algo gire. Cada uno es un componente de A-Frame con una sola responsabilidad. Escribirás muchos más en la Fase 3.
- **El movimiento en un solo lugar**: el objeto `motion` empieza en pausa si la persona pidió que su dispositivo reduzca el movimiento, y el botón **Pause animation** (Pausar animación) lo cambia. `turntable` lo revisa en cada fotograma.
- **La descripción se construye a partir de los mismos datos** que la escena, así que nunca pueden contradecirse.

A-Frame llama a `tick` una vez por fotograma, y solo mientras la escena está corriendo, así que no queda ningún temporizador activo en una pestaña oculta. Prueba a agregar una cuarta exhibición a cada versión, y compara cuántas líneas tuviste que cambiar.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| El formulario tiene etiquetas visibles, escritas en HTML | 1.3.1, 3.3.2 | Cada campo tiene un nombre. |
| Los errores aparecen como texto junto al campo, no en `alert()` | 3.3.1 | El mensaje sigue visible mientras la persona corrige el error. |
| El foco va a un lugar sensato después de Done y Delete | 2.4.3 | Redibujar una lista no debe hacerle perder su lugar a la persona. |
| El nombre de cada botón incluye su sesión | 2.4.6, 4.1.2 | «Delete: CSS grid», no diez botones llamados «Delete». |
| La palabra visible inicia el nombre de cada botón | 2.5.3 | Quienes usan control por voz pueden decir «click Delete». |
| Los cambios se anuncian | 4.1.3 | Los mensajes de estado llegan a quienes usan lector de pantalla. |
| La escena 3D se puede pausar, y respeta el movimiento reducido | 2.2.2 | El movimiento nunca se impone a nadie. (Respetar el movimiento reducido es buena práctica más allá de las WCAG). |

## Consideraciones de rendimiento

El script 3D viejo ejecutaba un temporizador unas 60 veces por segundo, y lo mantenía corriendo para siempre, incluso en una pestaña oculta (donde el navegador lo hace más lento, pero nunca lo detiene), y cambiaba tres atributos como texto cada vez. El `turntable` refactorizado cambia un número directamente (`object3D.rotation.y`) dentro del propio bucle de fotogramas de A-Frame, que el navegador hace más lento o detiene cuando la pestaña está oculta. Una estructura limpia y un buen rendimiento suelen llegar juntos: cuando cada responsabilidad tiene un solo lugar, es más fácil ver qué es un desperdicio.

Redibujar una lista completa está bien para unas pocas docenas de elementos. Si una lista pudiera crecer a miles, volverías a actualizar solo lo que cambió (Curso 2.2).

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Refactorizar y agregar funcionalidades al mismo tiempo | Cuando algo se rompe, no puedes saber qué cambio lo causó | Refactoriza primero, haz commit, luego cambia el comportamiento |
| Pasos grandes sin commits | Un solo error y tienes que empezar de nuevo | Haz commit después de cada TODO |
| Cambiar la clave de almacenamiento o la forma de los datos | Las personas pierden sus sesiones guardadas | Mantén la clave; actualiza los datos viejos al cargarlos |
| Componentes que cambian el estado | Dos lugares cambian el mismo dato, y no coinciden | Los componentes solo construyen; las acciones cambian |
| Usar posiciones del arreglo como identidad | Se elimina la sesión equivocada después de ordenar | Usa ids |
| `innerHTML` con cualquier cosa escrita por la persona usuaria | Su texto se convierte en HTML, o en script | `textContent` y `createElement` |

## Solución de problemas

**`does not provide an export named`.** Un TODO en ese archivo aún no está terminado, o te olvidaste de `export`.

**`Cannot read properties of null (reading 'addEventListener')`** (Firefox: `form is null`). `main.js` buscó un elemento que todavía no está en `index.html`. Termina el TODO 11, y revisa que los ids coincidan exactamente.

**Mis sesiones viejas desaparecieron.** Revisa que `STORAGE_KEY` sea `'xrc_s'`, y que `upgrade` lea `saved.d`, `saved.t` y `saved.w`.

**`crypto.randomUUID is not a function`.** Solo funciona en páginas seguras: `https://`, o `http://localhost` y `http://127.0.0.1`. Si abriste el planificador mediante una dirección de red (como `http://192.168.1.5`), usa `localhost` en su lugar.

**El formulario nunca aparece.** `main.js` se detuvo antes de su última línea. Busca el primer error en la Consola.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: agrega una funcionalidad a la versión limpia (editar el tema de una sesión) y cuenta cuántos archivos tocaste.
2. **[Creativo](challenges/challenge-2.es.md)**: haz tuyo el planificador: tus propios ajustes, y los días y horas en tu idioma.
3. **[Explorador](challenges/challenge-3.es.md)**: agrega deshacer (undo) al store, usando sus acciones.

## Cómo entregar tu trabajo

1. Completa todos los puntos de [`tests/checklist.md`](tests/checklist.md).
2. Toma una captura de pantalla de tu planificador, y otra de `check.html` con todas las verificaciones en verde.
3. Guárdalas, junto con tu `behaviour.md` completado, en tu diario de aprendizaje y tu portafolio. Cuando abra la comunidad de XR Camp, compártelas también allí.
4. En tu diario, responde: ¿qué smell de la app vieja te sorprendió más, y cómo se lo explicarías a una amiga?

## Lecturas adicionales

- [MDN: módulos de JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) (en inglés)
- [MDN: mejora progresiva](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) (en inglés)
- [Wikipedia: función pura](https://en.wikipedia.org/wiki/Pure_function) (en inglés)
- [MDN: innerHTML, consideraciones de seguridad](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#security_considerations) (en inglés)
- [A-Frame: cómo escribir un componente](https://aframe.io/docs/1.8.0/introduction/writing-a-component.html) (en inglés)

## Mujeres que conviene conocer

**Estefany Aguilar** es desarrolladora frontend senior y docente, radicada en Medellín, Colombia. Ha dictado unos 20 cursos en Platzi, en español, incluyendo arquitectura CSS, sistemas de diseño y una prueba técnica profesional, y es exorganizadora de CSS Conf Colombia, además de haber dado talleres para la comunidad MedellínCSS.

La arquitectura y los sistemas de diseño son la forma en que los equipos mantienen el código ordenado a medida que crece: la misma idea que la configuración, el store y los componentes de esta lección. Aprenderlo en tu propio idioma, de alguien de tu propia región, hace mucho más fácil imaginarte haciéndolo.

> **Nota editorial — verificar antes de publicar.** Las afirmaciones biográficas de las secciones Mujeres que conviene conocer deben contrastarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

Los módulos en los que dividiste el planificador usan el estándar **ECMAScript**, publicado por el comité TC39 de Ecma International: `import`, `export` y `const` están todos definidos ahí. `crypto.randomUUID()` viene de la **Web Cryptography API** del W3C, y `textContent` y `replaceChildren` del **DOM Standard** del WHATWG. Por ser estándares, la misma estructura limpia funciona en todos los navegadores modernos, sin necesidad de instalar ningún framework.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
