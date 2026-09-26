# Fundamentos de CSS

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `web-developer` · **Lección:** `css-foundations-03` · **Tiempo:** unas 14 horas · 19 sesiones de 45 minutos · unas 5 semanas con 4 sesiones por semana

---

> Crea un sistema visual reutilizable para el proyecto de HTML.

---

## Objetivos de aprendizaje

Al terminar este proyecto serás capaz de:

1. Vincular una hoja de estilos a todas las páginas de un sitio, y explicar por qué una sola hoja de estilos es mejor que muchas.
2. Seleccionar elementos por tipo, clase, ID, atributo y estado.
3. Explicar la cascada, la herencia y la especificidad, y predecir qué regla gana.
4. Elegir colores que cumplan el contraste de WCAG, y comprobarlos.
5. Construir una escala tipográfica y una escala de espaciado con propiedades personalizadas y unidades `rem`.
6. Explicar el modelo de caja y usar `box-sizing: border-box`.
7. Dar estilo a enlaces, tablas y formularios sin romper su accesibilidad.
8. Hacer que el foco del teclado se vea con claridad en todas partes.
9. Organizar una hoja de estilos para que otra persona pueda entenderla.

## Requisitos previos

- **Curso 1.1: Fundamentos de HTML** y **Curso 1.2: Formularios accesibles.** Tienes el sitio de Riverside (o el tuyo) con una página de inicio y una página con formulario.

## Herramientas necesarias

| Herramienta | Para qué sirve | Costo |
| --- | --- | --- |
| Un navegador moderno, con sus herramientas para desarrolladores | Ver e inspeccionar tus estilos | Gratis |
| Un editor de texto | Escribir CSS | Gratis |
| [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) (comprobador de contraste) | Revisar tus colores | Gratis |

## Lo que vas a construir

Una sola hoja de estilos, `styles.css`, que da estilo a todas las páginas de tu sitio: tu **sistema visual**. Define tus colores, tamaños de letra y espaciados una sola vez, como valores con nombre, y los usa en todas partes. Así todo el sitio se ve coherente y se puede cambiar desde un solo lugar.

La solución de referencia en [`completed/`](completed/) da estilo a la página de inicio, la página de inscripción y la página de agradecimiento del sitio de Riverside.

## Guía de carpetas

```text
03-css-foundations/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── styles.css       # Begin here: a stylesheet with 12 TODOs
│   ├── index.html       # The Riverside home page (from Course 1.1)
│   ├── join.html        # The join page (from Course 1.2)
│   ├── thanks.html
│   ├── centre.svg       # A drawing of the centre
│   └── 3d-moment.html   # This lesson's 3D moment
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Configuración

1. Trabaja en la carpeta de tu propio sitio de los Cursos 1.1 y 1.2. Si prefieres, copia la carpeta `starter` de esta lección y trabaja ahí.
2. Copia `starter/styles.css` en la carpeta de tu sitio.
3. Abre tu página de inicio en el navegador. Todavía no tiene estilos: eso cambia en el primer paso.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; Paso 1 (TODO 1) | Todas las páginas vinculadas a una sola hoja de estilos |
| 2 | Paso 2: selectores | Puedes apuntar a cualquier elemento |
| 3 | Paso 3: la cascada y la herencia (TODO 2) | El cuerpo de la página con estilo |
| 4 | Paso 4: especificidad | Puedes predecir qué regla gana |
| 5 | Paso 5: color (TODO 4) | Una paleta como propiedades personalizadas |
| 6 | Paso 5: revisar el contraste | Cada par de colores revisado |
| 7 | Paso 6: tipografía (TODO 3 y 5) | Una escala tipográfica y una lista de fuentes |
| 8 | Paso 6: encabezados, enlaces, largo de línea | Texto fácil de leer |
| 9 | Paso 7: espaciado (TODO 6) | Una escala de espaciado |
| 10 | Paso 8: el modelo de caja (TODO 7) | Un diseño centrado |
| 11 | Paso 9: bordes y fondos (TODO 8) | Una franja de encabezado y la navegación |
| 12 | Paso 10: enlaces y foco (TODO 9 y 12) | Foco visible en todas partes |
| 13 | Paso 11: tablas (TODO 10) | El horario con estilo |
| 14 | Paso 12: formularios (TODO 11) | Una página de inscripción con estilo |
| 15 | Paso 12, continuación | Formularios probados con el teclado |
| 16 | Paso 13: organizar tu hoja de estilos | Una hoja de estilos que otra persona podría leer |
| 17 | El **Momento 3D** | 2D y 3D con un mismo sistema de colores |
| 18 | [`tests/checklist.md`](tests/checklist.md), zoom al 200 % | Un sitio probado |
| 19 | Un reto adicional y después **Cómo entregar tu trabajo** | Un sistema visual terminado |

### Paso 1: una hoja de estilos para todas las páginas (TODO 1)

En el `<head>` de cada página, agrega:

```html
<link rel="stylesheet" href="styles.css">
```

Recarga. Todavía no cambia nada, porque la hoja de estilos no tiene reglas. Pero ahora todas las páginas están conectadas a ella: cambias un archivo y cambia todo el sitio. Por eso el CSS vive en su propio archivo.

### Paso 2: selectores

Una regla de CSS tiene un **selector** (qué elementos) y **declaraciones** (qué cambiar):

```css
h1 {
  color: #3f1d5e;
}
```

| Selector | Selecciona | Ejemplo |
| --- | --- | --- |
| Tipo | Todos los elementos de ese tipo | `h1`, `p`, `table` |
| Clase | Los elementos con `class="card"` | `.card` |
| ID | El único elemento con `id="main"` | `#main` |
| Atributo | Los elementos que tienen un atributo | `input[type="email"]` |
| Descendiente | Elementos dentro de otros elementos | `nav a` |
| Pseudoclase | Elementos en un estado | `a:hover`, `:focus-visible` |

Abre las herramientas para desarrolladores de tu navegador (**F12**), elige **Elements** (elementos; **Inspector** en Firefox) y haz clic en cualquier elemento: el panel **Styles** (estilos; **Rules** en Firefox) muestra todas las reglas que se le aplican.

### Paso 3: la cascada y la herencia (TODO 2)

Las hojas de estilo **en cascada** (Cascading Style Sheets) se llaman así por la forma en que se combinan las reglas: muchas reglas pueden aplicarse a un mismo elemento, y el navegador decide cuál gana.

**Herencia:** algunas propiedades, como `color`, `font-family` y `line-height`, pasan de un elemento a todo lo que tiene dentro. Defínelas una vez, en `body`, y toda la página las sigue.

Haz el TODO 2. Empieza con `box-sizing: border-box` en todos los elementos: en el Paso 8 vas a ver por qué.

### Paso 4: especificidad

Cuando dos reglas definen la misma propiedad en el mismo elemento, gana el selector más **específico**:

- Un ID (`#main`) le gana a una clase (`.card`), que le gana a un tipo (`p`).
- Si dos selectores son igual de específicos, gana el que aparece **después**.

```css
p { color: black; }
.note { color: purple; }   /* wins on <p class="note">: a class beats a type */
```

(El comentario dice: gana en `<p class="note">`, porque una clase le gana a un tipo).

Usa de preferencia clases y tipos, y evita los ID en CSS: las reglas muy específicas son difíciles de cambiar después. En tus herramientas para desarrolladores, las reglas que perdieron aparecen tachadas.

### Paso 5: color y contraste (TODO 4)

Define tus colores una sola vez, como **propiedades personalizadas** (también llamadas variables de CSS), en `:root`, es decir, en todo el documento:

```css
:root {
  --color-text: #1b1b1f;
  --color-bg: #fdfcf8;
  --color-primary: #5b2a86;
}

body {
  color: var(--color-text);
  background: var(--color-bg);
}
```

Ahora revisa cada par de colores de texto y fondo con el [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/). WCAG 2.2 pide:

- **4.5:1** para el texto normal;
- **3:1** para el texto grande, y para cosas que las personas necesitan ver, como los bordes de los campos y los contornos de foco.

Escribe cada proporción en un comentario junto al color. Un color que no pasa se puede usar como decoración, pero nunca como la única forma de ver algo.

### Paso 6: tipografía (TODO 3 y 5)

- **Lista de fuentes (font stack):** una lista de fuentes; gana la primera que esté disponible. Incluye fuentes del sistema para chino (`"PingFang SC"`, `"Microsoft YaHei"`), para que el texto en chino se vea bien en todos los dispositivos.
- **Unidades `rem`:** `1rem` es el tamaño de letra que la persona que lee eligió en su navegador. Los tamaños en `rem` crecen cuando las personas agrandan el texto; los tamaños en `px`, no.
- **Una escala tipográfica:** cada tamaño es una proporción fija más grande que el anterior, aquí 1.25. Los encabezados siguen la escala, así la página se ve diseñada y no al azar.
- **Largo de línea:** las líneas largas cansan al leer. Limita el texto a unos 65 caracteres de ancho con `max-width: 65ch`.
- **Altura de línea:** entre 1.5 y 1.6 para el texto normal.

Recuerda el Curso 1.1: los encabezados se eligen por **estructura**. El CSS decide su tamaño. Nunca elijas `<h4>` porque se ve más chico.

### Paso 7: espaciado (TODO 6)

Agrega una escala de espaciado, de `--space-1` a `--space-6`, y usa solo esos valores para `margin` y `padding`. Unos pocos tamaños coherentes hacen que una página se sienta tranquila; muchos tamaños al azar la hacen sentir desordenada.

### Paso 8: el modelo de caja (TODO 7)

Cada elemento es una caja hecha de cuatro capas: el **contenido**, el **relleno** (`padding`, espacio interior), el **borde** y el **margen** (`margin`, espacio exterior). Las herramientas para desarrolladores de tu navegador la dibujan para cualquier elemento que selecciones.

Por defecto, `width` define solo el contenido, así que al agregar relleno la caja queda más ancha de lo que pediste. `box-sizing: border-box`, que agregaste en el Paso 3, hace que `width` incluya el relleno y el borde. Por eso casi todas las hojas de estilos empiezan con esa regla.

Ahora centra tu contenido: un `max-width` y `margin: 0 auto` en `header`, `main` y `footer`.

### Paso 9: bordes y fondos (TODO 8)

Dale al encabezado una franja de fondo y un borde, y muestra la lista de navegación en una fila con `display: inline-block` en sus elementos. (En el Curso 1.4 la vas a hacer adaptable con flexbox).

Haz que las imágenes y los videos nunca sean más anchos que su contenedor: `max-width: 100%; height: auto`.

### Paso 10: enlaces y foco (TODO 9 y 12)

- Conserva el **subrayado** de los enlaces: le dice a las personas qué se puede presionar sin depender del color.
- Haz que los enlaces `:visited` (visitados) se vean distintos.
- Haz que el **foco** del teclado se vea con claridad en todo: un contorno grueso, de un color con un contraste de al menos 3:1. `:focus-visible` lo muestra a quienes usan el teclado sin dibujar un anillo en cada clic del mouse.
- Esconde el enlace de salto fuera de la pantalla y haz que vuelva a aparecer cuando recibe el foco.

**Nunca** escribas `outline: none` sin un reemplazo mejor. Hace que tu sitio no se pueda usar con el teclado.

### Paso 11: tablas (TODO 10)

`border-collapse: collapse`, relleno en cada celda, un `<caption>` con estilo y un fondo en la fila de encabezados. La estructura HTML del Curso 1.1 queda exactamente igual: el CSS solo cambia el aspecto.

### Paso 12: formularios (TODO 11)

Dale estilo a la página de inscripción: los `fieldset`, las leyendas, las etiquetas, los campos y el botón. Mantén los bordes de los campos con un contraste de al menos 3:1 contra su fondo, haz un poco más grandes los botones de opción y las casillas, y usa `font: inherit` para que los campos usen tu fuente. Después, vuelve a llenar el formulario con el teclado: cada campo tiene que seguir mostrando el foco.

### Paso 13: organizar tu hoja de estilos

Ordena tu hoja de estilos de lo general a lo específico: tokens (valores de diseño), base, tipografía, diseño, componentes y estados. Pon un comentario breve arriba de cada sección. Dentro de seis meses, tú (u otra persona) vas a necesitar encontrar las cosas rápido.

## Explicación del código clave

**`:root` y `var()`.** `:root` es todo el documento; las propiedades personalizadas que se definen ahí están disponibles en todas partes. `var(--color-primary)` usa una. La cambias una vez y cambia en todos los lugares donde se usa.

**`*, *::before, *::after { box-sizing: border-box; }`.** Se aplica a todos los elementos, incluidos los decorativos que agrega el CSS.

**`nav a[aria-current="page"]`.** Selecciona el enlace a la página actual usando el mismo atributo que usan los lectores de pantalla. Una sola fuente de verdad para los dos.

**`body > a[href="#main"]:first-child`.** Selecciona el enlace de salto sin agregar una clase: un combinador de hijo, un selector de atributo y una pseudoclase estructural. Sin `body >`, también escondería cualquier enlace «Back to top» (volver arriba) que sea el primer elemento dentro de su contenedor.

## Momento 3D

Abre [`starter/3d-moment.html`](starter/3d-moment.html). Enmarca una escena 3D dentro de tu página con estilo, y las figuras de la escena leen sus colores de tus propiedades personalizadas, con unas pocas líneas de JavaScript (`getComputedStyle`). Cambia `--color-primary` en `styles.css`, recarga, y la página **y** la escena 3D cambian juntas.

Las figuras usan los tokens `--color-primary`, `--color-accent` y `--color-primary-dark`, indicados en el atributo `data-token` de cada figura. Si tus tokens tienen otros nombres, cambia esos atributos para que coincidan.

Para eso sirve un sistema visual: un mismo conjunto de decisiones, compartido por todo lo que construyes, en 2D y en 3D.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| Contraste del texto de al menos 4.5:1 | 1.4.3 | Se puede leer con baja visión y bajo el sol. |
| Contornos de foco y bordes de campos de al menos 3:1 | 1.4.11 | Las personas deben ver dónde están y qué pueden usar. |
| El foco siempre es visible | 2.4.7 | Quienes usan el teclado necesitan saber dónde están. |
| Los enlaces no se identifican solo por el color | 1.4.1 | Conserva el subrayado. |
| El texto se agranda al 200 % sin perder nada | 1.4.4 | Usa `rem`, no alturas fijas en píxeles. |
| El contenido se reacomoda en pantallas angostas | 1.4.10 | `max-width: 100%` en las imágenes; nada de anchos fijos. |

## Consideraciones de rendimiento

Una sola hoja de estilos, que el navegador guarda en caché después de la primera página, da estilo a todo el sitio. Las fuentes del sistema cargan al instante, funcionan sin conexión e incluyen caracteres chinos: una fuente web descargada con chino puede pesar varios megabytes.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| `outline: none` | Quienes usan el teclado no ven dónde están | Un estilo de foco más claro, nunca ninguno |
| Colores elegidos sin revisar el contraste | Texto que algunas personas no pueden leer | Revisa cada par |
| Dar estilo por ID en todas partes | Reglas imposibles de cambiar después | Clases y tipos |
| Tamaños de texto en `px` | Texto que no crece con la configuración de quien lee | `rem` |
| Elegir el nivel de encabezado por su tamaño | Un esquema de página roto | Elige por estructura; cambia el tamaño con CSS |
| Un color o espaciado nuevo cada vez | Un sitio desordenado e incoherente | Usa tus tokens |

## Solución de problemas

**Mis estilos no hacen nada.** Revisa que el `<link>` esté en el `<head>`, que el archivo se llame exactamente `styles.css` y que esté en la misma carpeta que la página. En las herramientas para desarrolladores, la pestaña **Network** (red) muestra si se cargó.

**Una regla aparece tachada en las herramientas para desarrolladores.** Otra regla es más específica o aparece después. El panel muestra cuál ganó.

**`var(--my-colour)` no hace nada.** Revisa cómo está escrito, incluidos los dos guiones, y que esté definido en `:root`.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: un tema oscuro, cambiando solo tus propiedades personalizadas.
2. **[Creativo](challenges/challenge-2.es.md)**: una paleta de tu propia cultura o lugar, con cada par revisado.
3. **[Explorador](challenges/challenge-3.es.md)**: sigue la configuración del sistema de quien lee: modo oscuro y movimiento reducido.

## Cómo entregar tu trabajo

1. Completa todos los puntos de [`tests/checklist.md`](tests/checklist.md).
2. Toma capturas de pantalla de tu página de inicio y de tu página de inscripción, en tamaño normal y con zoom al 200 %.
3. Guárdalas en tu diario de aprendizaje y en tu portafolio. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. En tu diario, responde: ¿qué color tuviste que cambiar después de revisar su contraste?

## Lecturas adicionales

- [MDN: Conceptos básicos de estilos con CSS](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics) (en inglés)
- [MDN: Uso de propiedades personalizadas de CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties) (en inglés)
- [MDN: Especificidad](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Specificity) (en inglés)
- [W3C: Entender el contraste (mínimo)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) (en inglés)

## Mujeres que conviene conocer

**Chen Hui Jing (陈慧晶)** es diseñadora y desarrolladora autodidacta, nacida en Malasia y que trabaja en Singapur. Escribe y da charlas sobre CSS para sistemas de escritura más allá del inglés, en especial la composición vertical del chino y de otras lenguas de Asia oriental con `writing-mode` y las propiedades lógicas. Cofundó el encuentro Talk.CSS.

La web se construyó primero alrededor del inglés, que se escribe de izquierda a derecha. El trabajo de Chen Hui Jing muestra lo que puede hacer el CSS cuando toma en serio todos los idiomas, incluidos los que hablan muchas de las personas que aprenden en XR Camp.

_Datos de fuentes públicas, verificados en 2026. ¿Encontraste un error? [Avísanos](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Estándar destacado

El CSS lo escribe el **CSS Working Group** (Grupo de Trabajo de CSS) del W3C, en muchos módulos separados (Selectors, Cascade, Color, Fonts y más) que pueden avanzar a distintas velocidades. Por eso no existe un «CSS4»: cada módulo tiene su propio nivel.

## Licencia

Código: [`LICENSE-CODE`](../../LICENSE-CODE) · Contenido: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
