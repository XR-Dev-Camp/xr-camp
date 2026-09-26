# Diseño web adaptable

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `web-developer` · **Lección:** `responsive-web-design-04` · **Tiempo:** unas 14 horas · 19 sesiones de 45 minutos · unas 5 semanas con 4 sesiones por semana

---

> Crea un sitio web adaptable de viajes, cultura, comunidad o servicios.

---

## Objetivos de aprendizaje

Al terminar este proyecto serás capaz de:

1. Diseñar primero para el celular (mobile first), y explicar por qué.
2. Usar unidades relativas (`rem`, `%`, `vw`, `ch`) en lugar de tamaños fijos.
3. Acomodar una fila de elementos con flexbox y una cuadrícula de tarjetas con CSS grid.
4. Agregar diseño para pantallas más grandes con media queries (consultas de medios), sin romper las más chicas.
5. Hacer que los encabezados crezcan de forma gradual con `clamp()`.
6. Entregar a cada pantalla el tamaño de imagen correcto con `srcset` y `sizes`.
7. Hacer que las áreas táctiles sean lo bastante grandes para los dedos.
8. Explicar qué agregan las container queries (consultas de contenedor), y usar una.
9. Probar un sitio en varios anchos y en dispositivos reales.

## Requisitos previos

- **Curso 1.3: Fundamentos de CSS.** Tienes un sitio con una sola hoja de estilos organizada con tokens.

## Herramientas necesarias

| Herramienta | Para qué sirve | Costo |
| --- | --- | --- |
| Un navegador moderno, con sus herramientas para desarrolladores | El modo de dispositivo, para probar anchos | Gratis |
| Un editor de texto | Escribir CSS | Gratis |
| Un celular y, si es posible, una tableta | Probar en dispositivos reales | Los tuyos |

## Lo que vas a construir

Tu sitio comunitario, adaptable: un mismo conjunto de páginas que funciona bien en un celular de 320 píxeles, en una tableta y en una pantalla de escritorio ancha. La navegación pasa a varias líneas y es fácil de tocar, los programas se convierten en una cuadrícula de tarjetas, la sección «About» (quiénes somos) se muestra en dos columnas en las pantallas anchas, la imagen se descarga en el tamaño correcto y la tabla del horario se desplaza dentro de su propio recuadro en lugar de romper la página.

La solución de referencia está en [`completed/`](completed/). El punto de partida es el sitio terminado del Curso 1.3; usa el tuyo si lo tienes.

## Guía de carpetas

```text
04-responsive-web-design/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── styles.css       # The Course 1.3 stylesheet, with a new section and TODOs
│   ├── index.html       # The home page, with 3 TODOs
│   ├── join.html, thanks.html
│   ├── centre-480.jpg, centre-960.jpg, centre-1440.jpg   # One picture, three sizes
│   └── 3d-moment.html   # This lesson's 3D moment
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Configuración

1. Trabaja en la carpeta de tu propio sitio, o copia la carpeta `starter` de esta lección.
2. Copia las tres imágenes `centre-*.jpg` en la carpeta de tu sitio. Si prefieres usar una foto tuya, guárdala en tres anchos (480, 960 y 1440 píxeles) con cualquier editor de imágenes, como GIMP, que es gratuito, o la app de fotos que trae tu computadora.
3. Abre tus herramientas para desarrolladores y activa el **modo de dispositivo**: **Ctrl + Shift + M** (en una Mac, **⌘ + Shift + M**) con las herramientas abiertas. En Firefox se llama **Responsive Design Mode** (modo de diseño adaptable), y en una Mac el atajo es **⌘ + Option + M**. Ahora puedes elegir cualquier ancho de pantalla.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; Paso 1 (TODO 1) | Una lista de lo que se rompe en cuatro anchos |
| 2 | Paso 2: primero el celular y unidades relativas | Puedes explicar las dos ideas |
| 3 | Paso 3: encabezados fluidos (TODO 2) | Encabezados que crecen de forma gradual |
| 4 | Paso 4: flexbox (TODO 3) | Una navegación que pasa a varias líneas |
| 5 | Paso 4, continuación (TODO 4) | Áreas táctiles de 44 píxeles |
| 6 | Paso 5: el HTML de las tarjetas (TODO 5) | Los programas como una lista de tarjetas |
| 7 | Paso 6: grid (TODO 6) | Una cuadrícula de tarjetas |
| 8 | Paso 6, continuación: cómo funciona auto-fill | Puedes predecir las columnas |
| 9 | Paso 7: container queries (TODO 7) | Tarjetas que responden a su propio ancho |
| 10 | Paso 8: imágenes adaptables (TODO 8) | La imagen correcta para cada pantalla |
| 11 | Paso 8, continuación: revisar qué imagen se cargó | La prueba en la pestaña Network |
| 12 | Paso 9: tablas (TODO 9–10) | Una tabla que nunca rompe la página |
| 13 | Paso 10: media queries (TODO 11) | Dos columnas en pantallas anchas |
| 14 | Paso 10, continuación: la página de inscripción | Un formulario que funciona en cualquier ancho |
| 15 | Paso 11: probar en dispositivos reales | Un registro de pruebas |
| 16 | Arreglar lo que encontró tu registro de pruebas | Un sitio que funciona en todas partes |
| 17 | El **Momento 3D** | Una escena 3D que se adapta a la pantalla |
| 18 | [`tests/checklist.md`](tests/checklist.md) | Un sitio probado |
| 19 | Un reto adicional y después **Cómo entregar tu trabajo** | Un sitio adaptable terminado |

### Paso 1: mira qué se rompe (TODO 1)

Antes de cambiar nada, mira cada página a **320**, **390**, **768** y **1280** píxeles de ancho en el modo de dispositivo. Anota todo lo que se vea mal: texto demasiado grande, una fila que no cabe, una tabla más ancha que la pantalla. Esa lista es tu lista de pendientes para esta lección.

### Paso 2: primero el celular, y unidades relativas

**Mobile first** (primero el celular) significa escribir primero los estilos para la pantalla más chica y después **agregar** diseño para las pantallas más grandes con media queries. Las pantallas chicas reciben la página más sencilla, que además es la más rápida; no hay que deshacer nada.

Tu sitio ya es casi mobile first: en el Curso 1.3 usaste `rem`, `max-width` y `max-width: 100%` en las imágenes. La razón son las unidades relativas:

| Unidad | Relativa a | Sirve para |
| --- | --- | --- |
| `rem` | El tamaño de letra del navegador de quien lee | Texto y espaciado |
| `%` | La caja que la contiene | Anchos |
| `vw` | El 1 % del ancho de la ventana | Tamaños fluidos |
| `ch` | El ancho del carácter «0» | Largo de línea |

### Paso 3: encabezados fluidos (TODO 2)

```css
h1 { font-size: clamp(var(--step-3), 1.5rem + 3vw, var(--step-4)); }
```

`clamp(mínimo, preferido, máximo)`: el tamaño preferido crece con la ventana, pero nunca baja del mínimo ni pasa del máximo. La parte en `rem` hace que siga creciendo cuando la persona agranda el tamaño del texto.

### Paso 4: flexbox (TODO 3–4)

Flexbox acomoda los elementos en una **fila** (o en una columna), y puede pasarlos a nuevas líneas:

```css
nav ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0 var(--space-4);
}
```

`gap` separa los elementos sin usar márgenes. Borra la regla anterior `nav li` de la sección 5: flexbox la reemplaza.

Después, haz que cada enlace mida al menos **44 por 44 píxeles de CSS**, para que los dedos puedan acertarle (TODO 4). WCAG 2.2 exige al menos 24 píxeles; 44 es el tamaño que más se recomienda, y es mucho más fácil para todo el mundo.

### Paso 5: el HTML de las tarjetas (TODO 5)

Convierte las dos listas de programas en una sola lista de tarjetas:

```html
<ul class="cards" role="list">
  <li class="card">
    <h3>Homework club</h3>
    <p>Weekdays after school.</p>
    <p class="tag">Children and young people</p>
  </li>
  <!-- one card for each programme -->
</ul>
```

Sigue siendo una lista, así que la mayoría de los lectores de pantalla anuncian «lista, 6 elementos». Las tarjetas van a usar `list-style: none`, y entonces Safari deja de tratar el `<ul>` como una lista. `role="list"` hace que siga siendo una lista para todo el mundo. Grid solo va a cambiar cómo se ve.

### Paso 6: grid (TODO 6)

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr));
  gap: var(--space-3);
}
```

Léelo de adentro hacia afuera: cada columna mide **al menos 15rem y reparte por igual el espacio que sobra** (`1fr`); **caben tantas columnas como sea posible** (`auto-fill`). Una tarjeta por fila en un celular, dos en una tableta, tres en una pantalla ancha, sin ninguna media query. `min(100%, 15rem)` evita que una tarjeta se salga en un celular muy angosto.

### Paso 7: container queries (TODO 7)

Una **media query** pregunta por la ventana. Una **container query** pregunta por la caja en la que está algo, así una tarjeta puede cambiar su diseño según lo ancha que sea la **tarjeta**, esté donde esté.

```css
.card { container-type: inline-size; }

@container (min-width: 22rem) {
  .tag { position: absolute; top: var(--space-3); right: var(--space-3); }
}
```

Cuando una tarjeta es lo bastante ancha por dentro (por ejemplo, una tarjeta por fila en un celular grande puesto de lado), la etiqueta se mueve a la esquina. Haz la ventana más angosta y más ancha, y mira cómo se mueve. Las container queries funcionan en todos los navegadores principales actuales; en un navegador viejo, la tarjeta simplemente conserva su diseño de celular, y eso está bien.

### Paso 8: imágenes adaptables (TODO 8)

Un celular no necesita una imagen de 1440 píxeles. Dale opciones al navegador y deja que elija:

```html
<img src="centre-960.jpg"
     srcset="centre-480.jpg 480w, centre-960.jpg 960w, centre-1440.jpg 1440w"
     sizes="(min-width: 48rem) 28rem, 100vw"
     alt="The centre's front entrance, with a step-free ramp beside the main doors."
     width="800" height="450">
```

- `srcset` enumera los archivos y sus anchos reales.
- `sizes` dice qué tan ancha se va a mostrar la imagen: 28rem en pantallas anchas y, si no, todo el ancho de la ventana.
- El navegador combina eso con la densidad de píxeles de la pantalla y descarga **un solo** archivo.

Compruébalo: en la pestaña **Network** (red), recarga en distintos anchos y mira qué imagen se cargó.

### Paso 9: tablas (TODO 9–10)

Una tabla no se puede apretar mucho. Ponla en un recuadro que se desplace de lado por su cuenta, para que la página no lo haga:

```html
<div class="table-wrap" role="region" aria-labelledby="hours-caption" tabindex="0">
  <table>
    <caption id="hours-caption">Opening hours during term time</caption>
```

`tabindex="0"` permite que quienes usan el teclado lleguen al recuadro y lo desplacen con las flechas; `role="region"` y la etiqueta les dicen a los lectores de pantalla qué es.

### Paso 10: media queries (TODO 11)

Para los diseños que solo tienen sentido en pantallas anchas, agrega una media query:

```css
@media (min-width: 48rem) {
  #about {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

Usa `min-width`, para que las reglas se **agreguen** al diseño para celular. Elige los puntos de quiebre (breakpoints) donde tu contenido se rompe, no donde termina un modelo de celular en particular.

### Paso 11: probar en dispositivos reales

El modo de dispositivo es un buen comienzo, pero los celulares reales son distintos: dedos reales, sol de verdad, conexiones lentas. Abre tu sitio en cada dispositivo que puedas pedir prestado y lleva un registro de pruebas: dispositivo, navegador, qué funcionó y qué no. Prueba también:

- **Zoom al 200 %** en una computadora.
- El celular en **horizontal**.
- El **tamaño de texto** más grande en la configuración de tu celular.

## Explicación del código clave

**`repeat(auto-fill, minmax(min(100%, 15rem), 1fr))`.** La línea más útil de CSS grid: columnas adaptables sin media queries.

**`container-type: inline-size`.** Convierte un elemento en un contenedor al que sus hijos pueden consultar por su ancho.

**`aspect-ratio`** (en el Momento 3D): mantiene la forma de una caja cuando cambia su ancho: `4 / 3`, `1 / 1`, `16 / 9`.

**`min()`, `max()` y `clamp()`.** CSS puede comparar valores: el más chico, el más grande o un valor entre dos límites.

## Momento 3D

Abre [`starter/3d-moment.html`](starter/3d-moment.html): un pequeño modelo 3D del centro. En un celular, la escena ocupa todo el ancho con forma 4:3; en una pantalla ancha, se ubica junto al texto como un cuadrado. El diseño es el mismo CSS grid que usaste para las tarjetas, y `aspect-ratio` mantiene la forma de la escena en cualquier ancho. Una escena 3D es solo otra caja en tu diseño.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| Nada de desplazamiento lateral a 320 píxeles de ancho, salvo dentro de las tablas | 1.4.10 | Quienes usan zoom al 400 % reciben una página de 320 píxeles. |
| El texto puede crecer al 200 % | 1.4.4 | `rem`, y `clamp()` con una parte en `rem`. |
| Áreas táctiles de al menos 24 píxeles; aquí usamos 44 | 2.5.8 | Más fáciles de tocar para todo el mundo. |
| Funciona en vertical y en horizontal | 1.3.4 | Algunas personas no pueden girar su dispositivo. |
| Se puede llegar con el teclado al recuadro de la tabla que se desplaza | 2.1.1 | `tabindex="0"` y una etiqueta. |
| El orden del contenido tiene sentido sin el diseño | 1.3.2 | Grid solo cambia cómo se ve, no el orden del HTML. |

## Consideraciones de rendimiento

Las imágenes adaptables son la mayor mejora de rendimiento de esta lección: un celular que descarga la imagen de 480 píxeles en lugar de la de 1440 se ahorra la mayor parte de los datos de la imagen. Grid y flexbox no cuestan nada de descarga. La biblioteca A-Frame del Momento 3D pesa unos 1.3 MB de código (unos 350 KB comprimida), y por eso el 3D se queda en su propia página.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Diseñar para escritorio y después apretar | Reglas que se sobrescriben por todas partes, y una página lenta en el celular | Primero el celular, después agrega |
| Anchos fijos en píxeles | Desplazamiento lateral en los celulares | `max-width`, `%` y grid |
| Puntos de quiebre para celulares específicos | Se rompe en el siguiente celular | Pon el quiebre donde se rompe tu contenido |
| Cambiar el orden del HTML para cambiar el diseño | Un orden confuso para los lectores de pantalla | Conserva el orden del HTML; mueve con CSS |
| Enlaces diminutos muy juntos | Las personas tocan el que no era | Áreas de 44 píxeles con separación |
| `display: block` en una `<table>` | Los lectores de pantalla pueden perder la tabla | Envuélvela en un recuadro que se desplace |

## Solución de problemas

**La página se sigue desplazando de lado en el celular.** En el modo de dispositivo, busca el elemento más ancho que la pantalla: abre el panel Elements y pasa el mouse sobre los elementos hasta que uno sobresalga. Casi siempre es una imagen sin `max-width: 100%`, o un ancho fijo.

**El navegador siempre carga la imagen más grande.** Puede que tu pantalla tenga una densidad de píxeles alta, y eso es correcto. Revisa `sizes`: si falta, el navegador supone que la imagen ocupa toda la ventana.

**Mi container query no hace nada.** El contenedor necesita `container-type: inline-size`, y la consulta debe ser sobre el contenedor, no sobre la ventana.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: una navegación que se pliega en un botón «Menu» en pantallas chicas.
2. **[Creativo](challenges/challenge-2.es.md)**: un registro de pruebas en tres dispositivos reales.
3. **[Explorador](challenges/challenge-3.es.md)**: pon el formulario de inscripción en dos columnas en pantallas anchas, sin cambiar su orden de lectura.

## Cómo entregar tu trabajo

1. Completa todos los puntos de [`tests/checklist.md`](tests/checklist.md).
2. Toma capturas de pantalla de tu página de inicio a 320, 768 y 1280 píxeles de ancho.
3. Guárdalas en tu diario de aprendizaje y en tu portafolio. Cuando abra la comunidad de XR Camp, compártelas también allí.
4. En tu diario, responde: ¿qué se rompió a 320 píxeles que no esperabas?

## Lecturas adicionales

- [MDN: Diseño web adaptable](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design) (en inglés)
- [MDN: Flexbox](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox) (en inglés)
- [MDN: Diseño con CSS grid](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids) (en inglés)
- [MDN: Imágenes adaptables](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images) (en inglés)
- [MDN: Container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries) (en inglés)

## Mujeres que conviene conocer

**Rachel Andrew** es una desarrolladora web, escritora y conferencista británica que ha sido integrante del CSS Working Group (Grupo de Trabajo de CSS) del W3C. Su sitio Grid by Example reunió ejemplos pequeños y claros de diseño con CSS grid, y ayudó a toda una generación de personas desarrolladoras a aprenderlo cuando era nuevo.

La cuadrícula que usaste para las tarjetas de los programas es un estándar: alguien tuvo que defenderla, explicarla y enseñarla. Buena parte de esa explicación la hizo Rachel Andrew.

> **Nota editorial — verificar antes de publicar.** Las afirmaciones biográficas de las secciones Mujeres que conviene conocer deben contrastarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

Flexbox, grid, las media queries y las container queries son módulos separados que escribe el CSS Working Group del W3C. `srcset` y `sizes` forman parte del HTML Living Standard. Todos los navegadores principales los implementan de la misma manera porque son estándares: eso es lo que hace posible «un solo sitio para todas las pantallas».

## Licencia

Código: [`LICENSE-CODE`](../../LICENSE-CODE) · Contenido: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
