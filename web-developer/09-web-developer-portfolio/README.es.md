# Proyecto final de la Fase 1 - Portafolio de desarrolladora web

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `web-developer` · **Lección:** `web-developer-portfolio-09` · **Tiempo:** unas 15 horas · 20 sesiones de 45 minutos · unas 5 semanas con 4 sesiones por semana

---

> Publica un portafolio profesional, accesible y adaptable con varios proyectos web terminados.

---

## Objetivos de aprendizaje

Al terminar este proyecto serás capaz de:

1. Planificar un sitio web alrededor de un público y un objetivo, y dibujar su estructura antes de construirlo.
2. Elegir tus mejores proyectos, y describir cada uno en lenguaje claro: qué es, para quién es y qué hiciste tú.
3. Escribir un estudio de caso que muestre tu proceso y tus decisiones, no solo el resultado final.
4. Reutilizar tu HTML semántico, tu CSS con tokens y tu diseño adaptable de los Cursos 1.1 a 1.4 para construir rápido un sitio nuevo.
5. Darle a un sitio tu propia identidad visual, y revisar el contraste de cada color.
6. Auditar la accesibilidad de tu propio sitio con el método del Curso 1.5, y corregir lo que encuentres.
7. Agregar JavaScript que mejora una página sin que haga falta para usarla.
8. Probar en dispositivos reales, mantener una página rápida y documentar tu trabajo en un README.
9. Publicar tu portafolio con GitHub Pages, y decidir qué información personal no publicar nunca.

## Requisitos previos

- **Cursos 1.1 a 1.6.** Construiste un sitio accesible, con estilos y adaptable, auditaste una página y escribiste JavaScript.
- **Cursos 1.7 y 1.8.** Sabes usar las herramientas para desarrolladores para encontrar problemas, y sabes publicar un sitio con Git y GitHub Pages.
- **Al menos tres proyectos terminados** de la Fase 1. No tienen que ser perfectos.

## Herramientas necesarias

| Herramienta | Para qué sirve | Costo |
| --- | --- | --- |
| Un navegador moderno, con sus herramientas para desarrolladores | Probar anchos de pantalla, la consola y el panel Network | Gratis |
| Un editor de texto (se recomienda VS Code) | Escribir tu portafolio | Gratis |
| Un lector de pantalla: NVDA (Windows), VoiceOver (macOS y iPhone) o TalkBack (Android) | Tu auditoría de accesibilidad | Gratis |
| [axe DevTools](https://www.deque.com/axe/devtools/) o [WAVE](https://wave.webaim.org/extension/) | Revisiones automáticas | Versiones gratuitas |
| [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) | Revisar tus colores | Gratis |
| Una cuenta de GitHub | Publicar con GitHub Pages | Gratis |
| Un celular | Probar en un dispositivo real | El tuyo |

## Lo que vas a construir

Tu **portafolio**: un sitio web pequeño y rápido que muestra quién eres y qué sabes construir. Tiene:

- una **página de inicio** que dice quién eres y qué construyes, en dos oraciones;
- una **sección de proyectos**, con una tarjeta para cada proyecto de la Fase 1: una imagen, qué es, para quién era, las habilidades que muestra, y enlaces al proyecto publicado y a su código;
- al menos un **estudio de caso** completo: el problema, el público, tu proceso, tus decisiones y sus porqués, tu trabajo de accesibilidad y lo que aprendiste;
- **datos de contacto** que permiten que las personas te escriban sin que pierdas tu privacidad;
- una pequeña **galería 3D** de tus proyectos, con una lista simple de los mismos proyectos como alternativa.

Este es el proyecto final de la Fase 1: todas las habilidades de los Cursos 1.1 a 1.8 aparecen en él. También es lo primero que va a ver de tu trabajo una futura empleadora, un cliente o una docente, así que lo vas a conservar y actualizar durante el resto de XR Camp.

La solución de referencia en [`completed/`](completed/) es el portafolio de Ana, con un estudio de caso del sitio del Riverside Community Centre que construyó en los Cursos 1.1 a 1.6. El tuyo va a tratar de tus propios proyectos, con tus propias palabras.

## Guía de carpetas

```text
09-web-developer-portfolio/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html       # Home page: TODOs 1–4
│   ├── case-study.html  # Case study: TODOs 5–9
│   ├── styles.css       # The Riverside stylesheet, ready to reuse: TODOs 10–11
│   ├── gallery-3d.html  # The 3D gallery, nearly finished: TODO 12
│   ├── portfolio.js     # The project filter (finished)
│   ├── centre.svg, centre-480.jpg, centre-960.jpg   # Drawings of the Riverside centre
│   └── thumb-form.svg, thumb-audit.svg, thumb-explorer.svg   # Simple project pictures
├── completed/           # Reference solution: open this last
├── challenges/          # Three extensions: the first is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Configuración

1. Crea una carpeta llamada `portfolio` dentro de tu carpeta `xr-camp`, y copia en ella los archivos de la carpeta `starter` de esta lección.
2. Dentro de `portfolio`, crea una carpeta llamada `projects`, y copia allí cada proyecto de la Fase 1 en su propia carpeta: por ejemplo, `projects/riverside/`. Cuando publiques, todo va a estar en línea junto, y tus enlaces van a ser cortos y relativos: `projects/riverside/index.html`.
3. Abre cada proyecto desde su nuevo lugar y revisa que siga funcionando: imágenes, estilos y enlaces.
4. Abre `portfolio/index.html` en tu navegador, y toda la carpeta `portfolio` en tu editor.
5. Empieza una página nueva en tu diario de aprendizaje llamada **Plan del portafolio**. La vas a completar en las Sesiones 1 a 3.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; Paso 1: planifica tu portafolio | Un plan de un párrafo |
| 2 | Paso 2: elige tus proyectos y reúne evidencias | Un inventario de proyectos |
| 3 | Paso 3: arquitectura de la información | Un mapa del sitio en papel |
| 4 | Paso 4: escribe tus textos (TODO 1 y 2) | Tu presentación y tu sección About (sobre mí) |
| 5 | Paso 5: tarjetas de proyecto (TODO 3) | Una tarjeta para cada proyecto |
| 6 | Paso 6: datos de contacto y privacidad (TODO 4) | Una página de inicio completa |
| 7 | Paso 7: tu identidad visual (TODO 10) | Tus propios colores, con el contraste revisado |
| 8 | Paso 8: diseño adaptable (TODO 11) | Páginas que funcionan de 320 a 1280 píxeles |
| 9 | Paso 9: datos clave, problema y público del estudio de caso (TODO 5 y 6) | La primera mitad de un estudio de caso |
| 10 | Paso 9, continuación: proceso y decisiones (TODO 7) | Tres decisiones, explicadas |
| 11 | Paso 9, continuación: accesibilidad, resultados y aprendizajes (TODO 8 y 9) | Un estudio de caso completo |
| 12 | Paso 10: JavaScript que mejora la página | Un filtro de proyectos que puedes explicar |
| 13 | Paso 11: audita tu portafolio | Una tabla de auditoría |
| 14 | Paso 11, continuación: corrige lo que encontraste | Cada hallazgo corregido |
| 15 | Paso 12: prueba en dispositivos y revisa la velocidad | Un registro de pruebas |
| 16 | Paso 13: documentación | Un README para tu portafolio |
| 17 | Paso 14: publica | Tu portafolio en una dirección pública |
| 18 | El **Momento 3D** (TODO 12) | Una galería 3D, con una lista como alternativa |
| 19 | [Reto 1](challenges/challenge-1.es.md) (obligatorio): un segundo estudio de caso | Dos estudios de caso |
| 20 | [`tests/checklist.md`](tests/checklist.md), Paso 15 y **Cómo entregar tu trabajo** | Un portafolio probado y publicado |

### Paso 1: planifica tu portafolio

Antes de escribir código, responde tres preguntas en tu diario:

1. **¿Para quién es?** Elige una lectora o un lector principal: una empresa que contrata a una desarrolladora junior, una organización pequeña que necesita un sitio web, una universidad o una beca. No puedes escribir bien para todo el mundo a la vez.
2. **¿Qué debería saber en 30 segundos?** La mayoría de las personas lee por encima. Escribe la única oración que quieres que recuerde.
3. **¿Qué debería hacer después?** Por lo general: leer un estudio de caso y luego contactarte.

El plan de Ana era: *«Para organizaciones pequeñas y equipos que contratan a una desarrolladora junior. En 30 segundos deberían saber que construyo sitios web que todas las personas pueden usar. Después deberían leer mi estudio de caso de Riverside y escribirme un correo».*

### Paso 2: elige tus proyectos y reúne evidencias

Tres a cinco proyectos buenos son mejores que diez pequeños. Para cada proyecto que podrías incluir, anota:

| Pregunta | Riverside, por ejemplo |
| --- | --- |
| ¿Qué es, en una oración? | Un sitio web para un centro comunitario, en cualquier pantalla |
| ¿Para quién era? | Familias del barrio, muchas desde el celular |
| ¿Qué hiciste **tú**? | Todo: contenido, HTML, CSS, pruebas |
| ¿Dónde está? | `projects/riverside/index.html` |
| ¿Qué imagen lo muestra mejor? | Una captura de pantalla de la página de inicio en un celular |
| ¿De qué estás orgullosa? | La tabla de horarios funciona con un lector de pantalla |

Luego reúne tus **evidencias**: tus notas, tus registros de pruebas del Curso 1.4, tu auditoría del Curso 1.5, capturas de pantalla del antes y el después. Un estudio de caso se construye con esto.

Sé honesta sobre lo que fue cada proyecto. Un proyecto de práctica, o una organización imaginaria como Riverside, está bien: dilo. Un tutorial que copiaste paso a paso no es tu proyecto; un tutorial que cambiaste y ampliaste puede serlo, si dices qué agregaste.

### Paso 3: arquitectura de la información

La **arquitectura de la información** consiste en decidir qué va en cada lugar, y cómo se llama, antes de construir. Dibuja el mapa de tu sitio en papel:

```text
Home (index.html)
├── About me          (#about)
├── Projects          (#projects)  →  one card per project
│   └── Case study    (case-study.html)
├── How I built this site (#this-site)
├── Contact           (#contact)
└── 3D gallery        (gallery-3d.html)
```

Un portafolio pequeño puede ser una sola página con secciones, más una página por cada estudio de caso. Nombra los enlaces de navegación con palabras simples: «Proyectos», no «Vitrina de trabajos»; «Contacto», no «Conectemos». Cada página lleva **la misma navegación en el mismo orden**, para que nadie tenga que aprenderla dos veces.

### Paso 4: escribe tus textos (TODO 1 y 2)

Escribe tus textos antes de darle estilo a nada. Una página bonita no puede salvar un texto confuso, y un texto claro se ve bien incluso en HTML simple.

- **TODO 1:** tu nombre en el título, en la descripción y en el encabezado.
- **TODO 2:** tu presentación y tu sección About (sobre mí).

Consejos para escribir en lenguaje claro:

- Empieza por quién eres y qué construyes: *«Construyo sitios web que todas las personas pueden usar».*
- Oraciones cortas. Una idea por oración.
- Cosas que una persona puede **comprobar**, no adjetivos. *«Pruebo con un lector de pantalla»* dice más que *«apasionada por la accesibilidad»*.
- Estar aprendiendo no es una debilidad. *«Estoy aprendiendo desarrollo web en XR Camp»* es verdad, y les dice a las personas qué esperar.
- Léelo en voz alta. Si te trabas, vuelve a escribirlo.

### Paso 5: tarjetas de proyecto (TODO 3)

Cada proyecto es una tarjeta dentro de una lista, exactamente como las tarjetas de programas del Curso 1.4:

```html
<li class="card project" data-skills="responsive accessibility">
  <img src="centre.svg" alt="" width="800" height="450">
  <h3>Riverside Community Centre website</h3>
  <p>A website for a community centre: opening hours, programmes, and how to visit, on any screen.</p>
  <p><strong>Built for:</strong> local families, many on phones.</p>
  <ul class="tags" aria-label="Skills">
    <li>HTML</li>
    <li>CSS grid</li>
  </ul>
  <p class="links">
    <a href="case-study.html">Read the Riverside case study</a><br>
    <a href="projects/riverside/index.html">Visit the Riverside website</a>
  </p>
</li>
```

Tres decisiones en esta tarjeta:

- **`alt=""` en la imagen.** El encabezado ya nombra el proyecto, así que la imagen no le agrega nada a quien usa un lector de pantalla. Si tu imagen muestra algo que las palabras no dicen, describe eso.
- **Un texto de enlace que dice a dónde lleva.** Cuatro tarjetas que dicen «Demo» y «Code» le dan a quien usa un lector de pantalla una lista de enlaces que suenan todos igual. «Visit the Riverside website» (visita el sitio web de Riverside) se entiende en cualquier lugar.
- **`width` y `height` en cada imagen.** El navegador reserva el espacio correcto antes de que llegue la imagen, así que la página no salta mientras carga.

Para las imágenes, usa una captura de pantalla de tu proyecto, o un dibujo simple. Guarda las capturas de pantalla con unos 1000 píxeles de ancho: una captura a tamaño completo puede pesar muchas veces más que todo tu sitio. Nunca uses fotos de otras personas sin su permiso, y nunca capturas de pantalla que muestren nombres o datos de personas reales.

### Paso 6: datos de contacto y privacidad (TODO 4)

Tu portafolio es público: cualquier persona del mundo puede leerlo, y copiarlo, para siempre. Antes de escribir tu sección de contacto, decide qué **no** vas a publicar:

| No publiques | Por qué | En su lugar |
| --- | --- | --- |
| Tu dirección de casa | Cualquier persona puede encontrar tu casa | Tu ciudad o tu país, si quieres |
| Tu número de teléfono personal | Spam, estafas y llamadas no deseadas | Una dirección de correo electrónico |
| Tu número de identificación, tu fecha de nacimiento o tu pasaporte | Robo de identidad | Nada: nadie necesita estos datos en un portafolio |
| Fotos de tus hijas, tus hijos o tu familia | Su privacidad no es tuya para regalarla | Nada |
| Capturas de pantalla con datos de personas reales | Su privacidad, y posiblemente la ley | Capturas de pantalla con datos inventados |
| Contraseñas, claves de API o *tokens* en tu código | Cualquier persona puede usarlos | Mantenlos fuera de todo repositorio público |

Crea una **dirección de correo nueva solo para tu portafolio**. Si le llega spam, puedes cerrarla sin perder tu correo personal. Enlázala con `mailto:`:

```html
<a href="mailto:ana.builds@example.com">ana.builds@example.com</a>
```

Muestra también la dirección como texto del enlace, para que las personas puedan copiarla si su dispositivo no tiene una aplicación de correo.

### Paso 7: tu identidad visual (TODO 10)

Tu hoja de estilos es la hoja de estilos de Riverside de los Cursos 1.3 y 1.4. El diseño, los espacios y las reglas adaptables ya funcionan. Para hacerla tuya, cambia solo los **tokens de diseño** del principio: los valores, nunca los nombres.

Ana eligió verde azulado oscuro, terracota y arena cálida. Elige colores que se sientan como tú: de tu cultura, de tu ciudad o de un lugar que amas. Luego revisa cada color de texto en el [verificador de contraste](https://webaim.org/resources/contrastchecker/) (en inglés):

- Texto sobre el fondo, la superficie y la franja: **al menos 4.5:1**.
- El contorno de foco y los bordes de los formularios: **al menos 3:1**.

Escribe las relaciones de contraste en el comentario que está arriba de tus colores, como hizo Ana. Si un color no pasa, oscurécelo un poco y vuelve a revisar; la mayoría de los colores tienen una versión más oscura que se siente igual.

Conserva las fuentes del sistema. No cuestan nada de descargar, y la lista de fuentes ya incluye fuentes para chino y para letras con acentos.

### Paso 8: diseño adaptable (TODO 11)

Tus tarjetas ya son una cuadrícula adaptable. En el TODO 11 agregas un diseño para pantallas anchas: los datos clave del estudio de caso en dos columnas.

```css
@media (min-width: 48rem) {
  .facts {
    grid-template-columns: max-content 1fr;
    column-gap: var(--space-4);
  }
}
```

`max-content` hace que la primera columna sea exactamente tan ancha como el término más largo, como «My role» (mi rol); `1fr` le da el resto a las respuestas. Luego prueba cada página con **320, 390, 768 y 1280 píxeles** de ancho en el modo de dispositivo, como en el Curso 1.4.

### Paso 9: el estudio de caso (TODO 5 a 9)

Las capturas de pantalla muestran **qué** hiciste. Un estudio de caso muestra **cómo piensas**, y eso es lo que buscan quienes contratan y quienes enseñan. Elige el proyecto del que más aprendiste, no el que se ve mejor.

| Sección | Responde | TODO |
| --- | --- | --- |
| Datos clave | Tu rol, el tiempo, las herramientas, los enlaces, y una nota honesta si fue de práctica | 5 |
| El problema | Qué necesitaban las personas, y qué se lo impedía | 6 |
| Para quién es | Las personas, y una cosa de cada una que cambió la forma en que lo construiste | 6 |
| Mi proceso | Las etapas, en orden | 7 |
| Decisiones | Qué elegiste, por qué, y qué otras opciones consideraste | 7 |
| Accesibilidad | Qué hiciste, cómo lo probaste y qué todavía no es perfecto | 8 |
| Resultados y aprendizajes | Qué puedes medir, qué aprendiste y qué harías después | 9 |

Las **decisiones** son el corazón del estudio de caso. Escribe cada una en tres partes:

> **Qué elegí:** una tabla real dentro de una caja que se desplaza hacia los lados.
> **Por qué:** una tabla real permite que quienes usan lector de pantalla escuchen el día junto con cada horario.
> **Qué consideré:** convertir la tabla en bloques con CSS.

Una decisión que primero salió mal, y lo que cambiaste, muchas veces es la más interesante de leer. La cuarta decisión de Ana es un error que encontró con un lector de pantalla.

**Escribe sobre tu trabajo de accesibilidad.** Casi todo es invisible: nadie puede ver un buen orden de encabezados o una etiqueta. Si no lo dices, nadie va a saber que lo hiciste. Di también qué todavía no es perfecto: la honestidad convence más que decir que todo es perfecto.

### Paso 10: JavaScript que mejora la página

Abre `portfolio.js`. Está terminado: léelo y explícatelo a ti misma línea por línea. Es el explorador de programas del Curso 1.6, en pequeño: encuentra los elementos, escucha un cambio, decide qué tarjetas coinciden y anuncia el resultado.

La idea importante es la **mejora progresiva**. El filtro empieza `hidden` (oculto) en el HTML:

```html
<fieldset id="filters" class="filters" hidden>
```

y solo el script lo muestra:

```js
filters.hidden = false;
```

Así, si el script no llega a cargar (por una conexión lenta, o por un error), quien visita ve todos los proyectos y ningún control roto. Primero la página funciona, y JavaScript la mejora.

Pruébalo: elige cada filtro con el mouse, luego con el teclado (**Tab** hasta el grupo y después las **teclas de flecha**), y luego con tu lector de pantalla encendido, y escucha el mensaje «Showing 1 of 4 projects» (mostrando 1 de 4 proyectos).

### Paso 11: audita tu portafolio

Audita tu propio portafolio con el método del Curso 1.5, en cada página:

1. **Teclado:** recorre todo con Tab. ¿El foco se ve siempre? ¿Puedes llegar a cada enlace y control, y usarlo?
2. **Lector de pantalla:** lista los encabezados y los enlaces. ¿Tienen sentido por sí solos? ¿El filtro anuncia su conteo?
3. **Zoom, color y movimiento:** zoom al 200 % y al 400 %; cada color revisado; nada se mueve solo.
4. **Herramienta automática:** ejecuta axe DevTools o WAVE en cada página. Luego recuerda lo que no puede revisar.

Anota cada problema en una tabla, como en el Curso 1.5:

| # | Problema | WCAG 2.2 | A quién afecta | Corrección |
| --- | --- | --- | --- | --- |
| 1 | Dos tarjetas tienen un enlace llamado «Demo» | 2.4.4 (y 2.4.9) | Quienes usan lector de pantalla y listan los enlaces | Decir qué proyecto abre cada enlace |

Después corrige todo, una fila a la vez. Conserva la tabla: una versión corta va en tu sección «How I built this site» (cómo construí este sitio).

### Paso 12: prueba en dispositivos y revisa la velocidad

Prueba como en el Curso 1.4, y lleva un registro de pruebas en tu diario: dispositivo, navegador, qué funcionó y qué no.

- Cada página con 320, 390, 768 y 1280 píxeles.
- En al menos un celular real, en vertical y en horizontal.
- Con el tamaño de texto más grande de tu celular.

Luego revisa la velocidad. Abre el panel **Network**, marca **Disable cache** (desactivar la caché) y recarga. Abajo, las herramientas muestran cuánto descargó la página. Elige una conexión lenta en el menú de **throttling** (limitación de red), por ejemplo «Slow 4G», y vuelve a recargar: así se siente tu página con una señal móvil débil.

La página de inicio de Ana pesa unos 27 KB en total, menos que una sola foto de la cámara de un celular. Si la tuya pesa mucho más, la causa habitual son las imágenes grandes: cámbiales el tamaño.

### Paso 13: documentación

Cada repositorio necesita un `README.md`: la página que GitHub muestra primero. Crea uno en tu carpeta `portfolio`:

```markdown
# Ana's portfolio

My web development portfolio: https://your-username.github.io/portfolio/

## What is in it
- Home page, with my Phase 1 projects
- A case study of the Riverside Community Centre website
- A small 3D gallery, with a plain list as the fallback

## Built with
HTML, CSS, a little JavaScript, and A-Frame for the 3D gallery. No build tools.

## Accessibility
I aim for WCAG 2.2 level AA. Tested with the keyboard, NVDA, VoiceOver,
axe DevTools, 200% zoom, and two phones.

## Run it on your computer
Download the repository and open index.html in a browser.

## Credits
Drawings by XR Camp, shared under CC0.
```

La documentación es parte del trabajo, no un extra: es la forma en que la próxima persona, o tú dentro de un año, entiende lo que construiste.

### Paso 14: publica

Publica con Git y GitHub Pages, como en el Curso 1.8:

1. Crea un repositorio llamado `portfolio` y envía allí tu carpeta `portfolio` con *push*.
2. En **Settings** (configuración) del repositorio, abre **Pages** y publica desde tu rama principal.
3. Después de unos minutos, tu portafolio está en `https://your-username.github.io/portfolio/`.

Antes de compartir la dirección, revisa el sitio publicado, no tu copia local:

- **Cada enlace funciona.** Los enlaces tienen que ser relativos (`projects/riverside/index.html`), nunca una ruta de tu computadora (`C:\Users\...`).
- **Los nombres de archivo coinciden exactamente.** En la mayoría de los servidores web, incluido GitHub Pages, `Case-Study.html` y `case-study.html` son archivos diferentes. Usa minúsculas en todas partes.
- **Ábrelo en tu celular**, con datos móviles, no solo con tu wifi.
- **Léelo una vez más pensando en la privacidad**, con la tabla del Paso 6 al lado.

### Paso 15: mantenlo actualizado

Un portafolio nunca está terminado. Pon un recordatorio en tu calendario cada tres meses para:

- agregar tu proyecto más nuevo, y quitar el más flojo si tienes más de cinco;
- hacer clic en cada enlace, porque los enlaces se rompen cuando las cosas cambian de lugar;
- actualizar la fecha de «Last updated» (última actualización) en el pie de página;
- volver a leer tu sección About: ¿todavía te describe?

En cada fase de XR Camp vas a agregar cosas a este portafolio: escenas 3D en la Fase 3, XR en la Fase 4. Lo estás construyendo para años, no para esta lección.

## Explicación del código clave

**`hidden` y la mejora progresiva.** El atributo `hidden` quita un elemento de la página y de los lectores de pantalla. El filtro empieza oculto, y el script lo muestra, así que la página nunca muestra controles que no funcionan. `[hidden] { display: none !important; }` en la hoja de estilos asegura que ninguna otra regla pueda mostrar por error un elemento oculto.

**`data-skills` y `dataset`.** Un atributo de datos personalizado guarda información para tu script en el propio elemento. `card.dataset.skills` lee `data-skills`; `.split(' ')` convierte «responsive accessibility» en un arreglo.

**`<dl>`, `<dt>`, `<dd>`.** Una lista de descripciones: cada término (`dt`) seguido de su descripción (`dd`). El elemento correcto para datos clave como «My role» (mi rol) y «Time» (tiempo).

**`aria-current="page"`.** Les dice a los lectores de pantalla qué enlace de navegación corresponde a la página en la que están. La hoja de estilos también lo subraya, así que no se marca solo con el color.

**`mailto:`.** Un enlace que abre la aplicación de correo de quien visita, con tu dirección ya escrita.

**La lista es la fuente (en la galería 3D).** El script lee los proyectos de la lista HTML simple y construye un panel 3D para cada uno, así que la galería 3D y su alternativa nunca pueden contradecirse.

## Momento 3D

Abre [`starter/gallery-3d.html`](starter/gallery-3d.html). Es una pequeña sala de galería con un panel enmarcado en la pared para cada proyecto. Haz clic en un panel, o usa los botones **Previous project** (proyecto anterior) y **Next project** (proyecto siguiente): el panel seleccionado recibe un marco rojo y da un paso adelante, el enlace **Open** (abrir) cambia a ese proyecto, y un lector de pantalla anuncia cuál está seleccionado.

En el TODO 12, reemplaza la lista de proyectos por la tuya, y luego actualiza la descripción de la escena para que coincida con lo que ves. No escribes nada de código 3D: el script construye los paneles a partir de tu lista.

Lee el script y fíjate en cuatro reglas que vas a mantener durante el resto de XR Camp:

1. **El contenido 2D va primero.** La lista simple es el contenido real, y funciona en cualquier dispositivo, con o sin WebGL. El 3D se construye a partir de ella.
2. **Cada interacción 3D tiene un camino con el teclado.** Una sola función, `select`, se llama con un clic en un panel y con los dos botones.
3. **Una descripción de la escena** (`id="scene-description"`) dice con palabras lo que muestra la escena.
4. **Comodidad.** La cámara no tiene `look-controls` ni `wasd-controls`: la vista nunca se mueve, y nada se mueve solo. El panel seleccionado cambia de lugar al instante, en vez de deslizarse.

La galería está en su propia página, así que la biblioteca A-Frame solo se descarga para quienes eligen visitarla. Las revisiones manuales para cada página 3D están en [`docs/en/xr-accessibility.md`](../../docs/en/xr-accessibility.md) (en inglés).

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| Cada página tiene un idioma y un título descriptivo | 3.1.1, 2.4.2 | Los lectores de pantalla usan la voz correcta; las pestañas y los resultados de búsqueda se entienden. |
| Los encabezados, las listas y las regiones son HTML real | 1.3.1 | Las personas pueden moverse por encabezados y escuchar «lista, 4 elementos». |
| Las imágenes informativas tienen un `alt` con significado; las repetidas o decorativas tienen `alt=""` | 1.1.1 | Quienes usan lector de pantalla reciben la información, sin ruido. |
| Cada enlace dice a dónde lleva | 2.4.4, 2.4.9 | «Visit the Riverside website», nunca «Demo» cuatro veces. El nivel A permite que la tarjeta alrededor de un enlace lo explique; el nivel AAA (2.4.9) pide un texto de enlace que tenga sentido por sí solo, y eso es más amable con todas las personas. |
| Contraste del texto de al menos 4.5:1; contorno de foco y bordes de al menos 3:1 | 1.4.3, 1.4.11 | Se lee bajo el sol y con baja visión. |
| Sin desplazamiento hacia los lados a 320 píxeles de ancho | 1.4.10 | Quienes hacen zoom al 400 % reciben una página de 320 píxeles. |
| Todo funciona con el teclado, con el foco visible | 2.1.1, 2.4.7 | Incluidos el filtro y la galería 3D. |
| La misma navegación, en el mismo orden, en cada página | 3.2.3 | Las personas la aprenden una vez. |
| Se anuncia el número de resultados del filtro | 4.1.3 | Quienes usan lector de pantalla saben que el filtro funcionó. |
| La escena 3D tiene una descripción en texto | 1.1.1 | Para un lector de pantalla, un lienzo es un rectángulo vacío. |
| Nada en la escena 3D se mueve solo, y la cámara nunca se mueve | 2.2.2 | No hay movimiento que pausar, ni mareo por movimiento. |
| Ninguna información personal que no le dirías a una persona desconocida | Buena práctica (no es una regla de WCAG) | Tu seguridad, y la de tu familia. |

## Consideraciones de rendimiento

Un portafolio muchas veces se abre en un celular, y quien lo abre decide en segundos si sigue leyendo. La página de inicio de Ana, con su hoja de estilos, su script y sus cuatro dibujos, pesa unos 27 KB. El mayor riesgo para eso son las imágenes: una sola captura de pantalla a tamaño completo puede pesar más que todo lo demás junto, así que cambia el tamaño de las capturas a unos 1000 píxeles de ancho, y usa `srcset` para las grandes, como en el Curso 1.4.

A-Frame tiene unos 1.3 MB de código (unos 350 KB después de la compresión). Por eso la galería 3D tiene su propia página: quienes nunca la visitan nunca la descargan. La galería tampoco usa imágenes como texturas, solo formas de colores y texto, así que carga rápido y funciona cuando se abre directamente desde un archivo.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Solo capturas de pantalla, sin historia | Las personas ven el resultado, pero no cómo piensas | Al menos un estudio de caso con decisiones |
| Demasiados proyectos pequeños | Los buenos se pierden | De tres a cinco de tus mejores proyectos |
| «Demo» y «Code» en cada tarjeta | Una lista de enlaces que suenan todos igual | Un texto de enlace que nombra el proyecto |
| Tu dirección de casa o tu teléfono personal | Cualquier persona del mundo puede verlos | Una dirección de correo para el portafolio |
| Capturas de pantalla a tamaño completo | Una página lenta en los celulares | Cambia el tamaño a unos 1000 píxeles de ancho |
| Rutas de tu computadora (`C:\Users\...`) | Enlaces rotos una vez publicado | Rutas relativas, en minúsculas |
| La galería 3D en la página de inicio | Cada visita descarga A-Frame | El 3D en su propia página, con un enlace desde la página de inicio |
| Adjetivos en lugar de evidencias | «Apasionada» no le dice nada a quien lee | Di qué hiciste y cómo lo probaste |
| No actualizarlo nunca | Proyectos viejos y enlaces rotos | Un recordatorio cada tres meses |

## Solución de problemas

**Mi sitio funciona en mi computadora, pero GitHub Pages muestra «404».** Revisa que tu página de inicio se llame `index.html`, en minúsculas, y esté en el nivel superior del repositorio. Después de publicar, espera unos minutos y recarga.

**El sitio publicado no tiene estilos.** El `href` de tu `<link>` no coincide exactamente con el archivo. Compara las mayúsculas: en línea, `Styles.css` y `styles.css` son archivos diferentes.

**El filtro de proyectos no aparece.** Eso es lo que debería pasar cuando el script no se ejecuta. Abre la consola: revisa que el `src` de la etiqueta `<script>` coincida con `portfolio.js`, y busca un error en rojo.

**La galería 3D está vacía o gris.** A-Frame se descarga de internet, así que revisa tu conexión. Si el dispositivo no es compatible con WebGL, la escena no se puede dibujar: la lista de proyectos que está debajo sigue funcionando, y justamente para eso está.

**Los paneles no tienen nombres.** El texto de A-Frame también descarga su fuente de internet. Revisa tu conexión y la consola.

**Un color no pasa la revisión de contraste.** Oscurece el color del texto, o aclara el fondo, de a poco, hasta llegar a 4.5:1.

## Retos adicionales

Tres extensiones, en [`challenges/`](challenges/). La primera es obligatoria:

1. **[Fundamento](challenges/challenge-1.es.md)** (obligatorio): un segundo estudio de caso.
2. **[Creativo](challenges/challenge-2.es.md)**: una identidad visual personal, con una paleta de tu cultura y el contraste revisado.
3. **[Explorador](challenges/challenge-3.es.md)**: un modo ligero sin imágenes, o una hoja de estilos para imprimir.

## Cómo entregar tu trabajo

1. Completa todos los puntos de [`tests/checklist.md`](tests/checklist.md).
2. Escribe la dirección pública de tu portafolio en tu diario de aprendizaje.
3. Toma capturas de pantalla de tu página de inicio con 320 y 1280 píxeles de ancho, y una de tu estudio de caso.
4. Comparte tu dirección con otras personas que programan (consulta [dónde compartir tu trabajo](../../docs/en/community.md), en inglés), y lee los estudios de caso de otras dos personas que estén aprendiendo.
5. En tu diario, responde: ¿de qué decisión de tu estudio de caso estás más orgullosa, y por qué?

## Lecturas adicionales

- [GitHub Docs: Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) (en inglés): cómo crear un sitio de GitHub Pages.
- [GitHub Docs: About READMEs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes) (en inglés): acerca de los README.
- [W3C: Easy checks, a first review of web accessibility](https://www.w3.org/WAI/test-evaluate/preliminary/) (en inglés): revisiones fáciles, un primer repaso de la accesibilidad web.
- [W3C: Developing an accessibility statement](https://www.w3.org/WAI/planning/statements/) (en inglés): cómo escribir una declaración de accesibilidad.
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) (en inglés): el verificador de contraste de WebAIM.

## Mujeres que conviene conocer

**Shirley Wu** es diseñadora independiente de visualización de datos, y enseña D3.js, una biblioteca de JavaScript para dibujar datos en la web, con cursos en Frontend Masters. Junto con Nadieh Bremer, creó **Data Sketches**, un proyecto y un libro.

Un portafolio que muestra cómo llegaste a algún lugar, y no solo dónde terminaste, es una forma de enseñar. Cuando escribes tu estudio de caso, haces lo que hacen docentes como Shirley Wu: conviertes tu proceso en algo de lo que otras personas pueden aprender. Busca Data Sketches y pregúntate: ¿qué muestra, además de las imágenes terminadas?

_Datos de fuentes públicas, verificados en 2026. ¿Encontraste un error? [Avísanos](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Estándar destacado

Tu portafolio usa estándares de varios grupos. Los elementos HTML, incluidos `<dl>` y el atributo `hidden`, vienen del **HTML Living Standard** (WHATWG). Tu diseño viene de módulos de CSS escritos por el **CSS Working Group del W3C**. Tu meta de accesibilidad, **WCAG 2.2**, viene de la Web Accessibility Initiative del W3C, que también publica una guía para escribir una declaración de accesibilidad como tu sección «How I built this site». Incluso el enlace `mailto:` es un estándar: el RFC 6068 del IETF.

## Licencia

Código: [`LICENSE-CODE`](../../LICENSE-CODE) · Contenido: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
