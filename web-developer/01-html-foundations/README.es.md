# Fundamentos de HTML

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `web-developer` · **Lección:** `html-foundations-01` · **Tiempo:** unas 12 horas · 16 sesiones de 45 minutos · unas 4 semanas con 4 sesiones por semana

> Crea un sitio web accesible de información personal o comunitaria.

---

## Objetivos de aprendizaje

Al terminar este proyecto serás capaz de:

1. Escribir un documento HTML válido de memoria y explicar para qué sirve cada parte del `<head>`.
2. Elegir los niveles de encabezado según la estructura del documento, no según el tamaño del texto.
3. Usar puntos de referencia semánticos (`<header>`, `<nav>`, `<main>`, `<footer>`) para que la tecnología de asistencia pueda recorrer tu página.
4. Escribir texto alternativo que transmita el propósito de una imagen en lugar de describir su apariencia.
5. Marcar datos verdaderamente tabulares con encabezados y ámbitos que los lectores de pantalla puedan interpretar.
6. Insertar video o audio con subtítulos y una alternativa para los navegadores que no puedan reproducirlo.
7. Escribir textos de enlace que tengan sentido leídos fuera de contexto.
8. Validar tu HTML y leer los resultados del validador.

## Requisitos previos

- **Curso 0.2 — Fundamentos de computación.** Sabes crear carpetas, guardar archivos y volver a encontrarlos.
- **Curso 0.3 — Internet y la web.** Sabes qué solicita un navegador y qué devuelve un servidor.

No se presupone experiencia previa en programación. Si nunca has escrito una línea de código, estás en el lugar correcto y en el punto correcto.

## Herramientas necesarias

| Herramienta | Para qué sirve | Costo |
| --- | --- | --- |
| Un navegador moderno (Firefox, Chrome, Edge o Safari) | Ver e inspeccionar tu página | Gratis |
| Un editor de texto — VS Code, o el que trae tu sistema | Escribir HTML | Gratis |
| [Servicio de validación de marcado del W3C](https://validator.w3.org/) | Comprobar que tu HTML es válido | Gratis |

No necesitas instalar nada más allá de un editor de texto. No hace falta un servidor, ni herramientas de compilación, ni una cuenta en ningún sitio.

## Lo que vas a construir

Un sitio web informativo completo, con varias secciones, para una organización comunitaria real o imaginaria: un centro de barrio, un club, una biblioteca, un grupo de apoyo mutuo, una asociación escolar. También puedes hacer un sitio personal sobre ti. Elige un tema que de verdad te importe; vas a mirarlo durante diez horas.

La solución de referencia en [`completed/`](completed/) es la página de un centro comunitario con una sección de presentación, una tabla de horarios, una lista de programas, un video incrustado y datos de contacto.

**Tu página no tendrá estilos.** Se verá simple. Ese es precisamente el objetivo de este proyecto — véase [Explicación del código clave](#explicación-del-código-clave).

## Guía de carpetas

```text
01-html-foundations/
├── README.md            # Esta guía (en inglés)
├── README.es.md         # Español
├── README.zh-Hans.md    # Chino simplificado
├── project.json         # Metadatos de la lección
├── starter/             # Empieza aquí — un esqueleto con 11 TODO
├── completed/           # Solución de referencia — ábrela al final
├── challenges/          # Tres desafíos: Fundamento es obligatorio
├── tests/checklist.md   # Autorrevisión antes de entregar
├── assets/              # Imágenes y medios
└── screenshots/
```

## Configuración

1. Descarga esta carpeta de proyecto, o descarga todo el repositorio como ZIP y localízala.
2. Crea una carpeta para tu trabajo, en un lugar que puedas volver a encontrar; no en Descargas.
3. Copia el contenido de [`starter/`](starter/) dentro de ella.
4. Abre `index.html` en tu editor de texto.
5. Abre ese mismo archivo en el navegador: **Archivo → Abrir archivo**. Casi no verás nada. Es lo correcto.

Mantén ambas ventanas a la vista. Cada vez que guardes en el editor, recarga el navegador. Ese ciclo —editar, guardar, recargar— es el desarrollo web entero, y lo repetirás miles de veces.

## Recorrido paso a paso

El punto de partida contiene once comentarios `TODO` numerados. Ve en orden; cada uno se apoya en el anterior.

### Planifica tus sesiones

Este proyecto son unas 16 sesiones de 45 minutos. Con cuatro sesiones por semana, tardarás unas cuatro semanas. Cada sesión termina con algo que puedes ver en el navegador, así que puedes parar al final de cualquier fila sin perder nada. Si te saltas una semana, vuelve a empezar desde el principio de tu última sesión.

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Lee esta guía y completa la **Configuración** | El punto de partida abierto en el editor y en el navegador |
| 2 | Pasos 1–2: título, descripción, enlace de salto | Una pestaña con nombre y un enlace de salto que funciona |
| 3 | Pasos 3–4: encabezado y navegación | Un título de página y una lista de navegación |
| 4 | Paso 5: secciones y encabezados | Enlaces internos que saltan a cada sección |
| 5 | Paso 6: escribe tus textos | Párrafos reales sobre tu comunidad |
| 6 | Paso 6: imágenes y texto alternativo | Una imagen con texto alternativo que has leído en voz alta |
| 7 | Paso 7: la tabla | Una tabla que un lector de pantalla puede explicar |
| 8 | Paso 8: listas | Programas o servicios como listas de verdad |
| 9 | Paso 8: multimedia y subtítulos | Un video o audio con subtítulos |
| 10 | Pasos 9–10: datos de contacto y pie de página | Una página completa, de principio a fin |
| 11 | Paso 11: valida | Cero errores en el validador |
| 12 | Lee **Explicación del código clave** y **Requisitos de accesibilidad** | Notas en tu diario de aprendizaje |
| 13 | Revisa [`tests/checklist.md`](tests/checklist.md) | Todos los puntos marcados |
| 14 | Un reto adicional | Una segunda página o un toque personal |
| 15 | El **Momento 3D** | Un mundo 3D dentro de tu página |
| 16 | **Cómo entregar tu trabajo** y tu reflexión | Tu página, publicada y en tu portafolio |

### Paso 1 — Describe la página (TODO 1–2)

Agrega un `<meta name="description">` y escribe un `<title>` de verdad.

Recarga. La pestaña del navegador muestra ahora tu título. Es lo primero que anuncia un lector de pantalla y el texto que muestra un buscador. Merece más reflexión de la que suele recibir.

### Paso 2 — El enlace de salto (TODO 3)

```html
<a href="#main">Saltar al contenido principal</a>
```

Colócalo inmediatamente después de `<body>`. Recarga la página y presiona **Tab** una vez. El enlace recibe el foco.

Existe porque, de lo contrario, quien navega con teclado tendría que pasar por todos los enlaces de navegación de cada página antes de llegar al contenido. Estás incorporando la accesibilidad desde el primer elemento en lugar de agregarla después, que es justo el hábito que todo este programa intenta darte.

### Paso 3 — Cabecera y encabezado (TODO 4)

Un `<h1>` que nombre el sitio. Después, un párrafo breve.

Exactamente un `<h1>` por página. Responde a «¿qué es esta página?», no a «¿cuál es el texto más grande?».

### Paso 4 — La navegación como lista (TODO 5)

```html
<nav aria-label="Principal">
  <ul>
    <li><a href="#about">Quiénes somos</a></li>
  </ul>
</nav>
```

Parece escribir de más para algo que se mostrará como una simple lista con viñetas. Pero un lector de pantalla anuncia *«lista, cuatro elementos»*, de modo que la persona sabe cuánta navegación tiene por delante antes de entrar en ella. Unos `<a>` sueltos no le dan nada.

### Paso 5 — Secciones y encabezados (TODO 6)

Cuatro elementos `<section>`, cada uno con un `id` que coincida con un enlace de navegación y con su `<h2>`.

Ahora prueba tu navegación: haz clic en un enlace. El navegador salta a esa sección. Has construido una navegación interna funcional sin nada de JavaScript.

### Paso 6 — Texto e imagen (TODO 7)

Escribe primero los párrafos y después agrega la imagen.

El texto alternativo es lo más difícil de este proyecto. Prueba esto: tapa la imagen con la mano y lee en voz alta tu texto alternativo. ¿Has perdido algo? Entonces es demasiado corto. ¿Estás recitando detalles que nadie necesita? Demasiado largo.

```html
<img src="../assets/centre-exterior.jpg"
     alt="La entrada principal del centro, con una rampa sin escalones junto a las puertas."
     width="800" height="450">
```

Ese texto alternativo menciona la rampa porque *la información sobre accesibilidad le importa a este público*. Otra página podría describir la misma fotografía de otra manera con toda razón. El contexto decide.

### Paso 7 — Una tabla (TODO 8)

```html
<table>
  <caption>Horario durante el curso escolar</caption>
  <thead>
    <tr><th scope="col">Día</th><th scope="col">Abre</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">Viernes</th><td>9:00</td></tr>
  </tbody>
</table>
```

Los atributos `scope` son los que hacen el trabajo. Permiten que un lector de pantalla anuncie *«Viernes, Abre, 9:00»* en lugar de un «9:00» huérfano. Sin ellos, la tabla es una cuadrícula de números sin sentido para quien no puede ver su forma.

### Paso 8 — Listas y multimedia (TODO 9)

Usa `<ul>` cuando el orden no importe y `<ol>` cuando sí. Después agrega video o audio con `controls`, un `<track kind="captions">` y contenido alternativo entre las etiquetas.

Necesitarás archivos multimedia. Consulta [`assets/README.md`](assets/README.md): puedes grabar diez segundos con el celular o usar el enfoque de marcador de posición que allí se describe.

### Paso 9 — Datos de contacto (TODO 10)

Un `<dl>` empareja cada etiqueta con su valor. Usa enlaces `tel:` y `mailto:` para que desde un celular se pueda llamar con un toque.

### Paso 10 — Pie de página (TODO 11)

Un enlace «volver arriba», la letra pequeña dentro de `<small>` y un elemento `<time datetime="2026-07-30">`.

### Paso 11 — Validar

Pega tu HTML en el [validador del W3C](https://validator.w3.org/#validate_by_input). Corrige todos los errores. Las advertencias conviene leerlas, aunque no siempre haya que actuar sobre ellas.

Lee los mensajes en lugar de buscar coincidencias de patrones. «End tag `li` implied» te está diciendo algo concreto sobre dónde cree el navegador que terminó tu lista.

## Explicación del código clave

### Por qué tu página no tiene CSS

Abre [`completed/index.html`](completed/index.html) en un navegador. Es sobria: texto negro, enlaces azules, tipografías por defecto. Y *funciona por completo*. Se puede leer, recorrer con el teclado, y un lector de pantalla anuncia correctamente cada parte.

Esta es la idea más importante del proyecto. Un documento HTML bien estructurado ya es accesible, ya es adaptable y ya es utilizable. El CSS decora una página que funciona. No puede rescatar a una que no funciona.

La mayoría de quienes empiezan aprenden esto al revés: recurren de inmediato a los estilos, producen algo de aspecto llamativo e inutilizable para buena parte de su público potencial, y nunca llegan a enterarse. Tú lo estás aprendiendo en el orden correcto.

### Los puntos de referencia y cómo se mueven los lectores de pantalla

`<header>`, `<nav>`, `<main>` y `<footer>` son *puntos de referencia*. Quienes usan lector de pantalla saltan directamente entre ellos, igual que tu vista salta a un encabezado cuando ojeas un texto.

Una página construida solo con elementos `<div>` no tiene ningún punto de referencia. Se ve idéntica y es muchísimo más difícil de usar. Por eso el «HTML semántico» no es una cuestión de preferencia estilística: la semántica *es* la accesibilidad.

### Los encabezados son un esquema, no un tamaño de letra

Los niveles de encabezado forman el índice de tu documento. Quienes usan lector de pantalla navegan por encabezados constantemente, y saltar de `<h2>` a `<h4>` se percibe como una sección que falta, como un libro que pasara del capítulo 2 al apartado 2.1.3.

Si un encabezado se ve demasiado grande, es un problema de CSS con una solución de CSS. Nunca lo resuelvas cambiando el nivel.

## Requisitos de accesibilidad

Tu entrega debe cumplir todo lo siguiente. Se comprueba en [`tests/checklist.md`](tests/checklist.md).

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| `<html lang="es">` (o tu idioma) | 3.1.1 | Indica al lector de pantalla qué reglas de pronunciación usar. Sin esto, un texto en español leído por una voz inglesa es incomprensible. |
| Un solo `<h1>`; sin niveles omitidos | 1.3.1 | La navegación por encabezados es la forma de leer de mucha gente. |
| Cada `<img>` tiene un `alt` | 1.1.1 | Las imágenes decorativas llevan `alt=""`: vacío, pero presente. |
| Enlace de salto, el primero en `<body>` | 2.4.1 | Permite saltarse la navegación repetida. |
| Texto de enlace con sentido propio | 2.4.4 | Se puede listar cada enlace despojado de su contexto. |
| Las tablas usan `<caption>` y `scope` | 1.3.1 | Asocia cada celda con sus encabezados. |
| Los medios llevan subtítulos | 1.2.2 | Personas sordas o con pérdida auditiva; entornos ruidosos y silenciosos. |
| Todo alcanzable con el teclado | 2.1.1 | Muchas personas nunca tocan un mouse. |

**Pruébalo tú.** Aparta el mouse y recorre toda la página con **Tab**, **Shift+Tab** y **Enter**. Si tú no puedes llegar a algo, tampoco podrá buena parte de tu público. Después prueba un lector de pantalla: NVDA (Windows, gratuito), VoiceOver (macOS e iOS, incorporado) o TalkBack (Android, incorporado). Diez minutos escuchando tu propia página enseñan más que cualquier artículo.

## Consideraciones de rendimiento

Aquí no hay JavaScript ni CSS, así que tu página ya es rápida. Dos hábitos que conviene adquirir desde ahora:

1. **Pon `width` y `height` en las imágenes.** El navegador reserva el espacio antes de que llegue la imagen, así el texto no da saltos mientras se carga. Esos saltos se llaman desplazamiento de diseño y son una de las quejas más frecuentes sobre los sitios web actuales.
2. **Redimensiona las imágenes antes de subirlas.** Una foto recién salida del celular puede pesar 4 MB. Mostrada a 800 px de ancho necesita quizá 150 KB. Con un plan de datos móviles que se paga por uso, la diferencia es dinero real para quien te lee.

## Errores comunes

| Error | Por qué está mal | En su lugar |
| --- | --- | --- |
| Elegir el nivel de encabezado por su tamaño | Rompe el esquema del documento | Elige por estructura; cambia el tamaño con CSS más adelante |
| `alt="imagen"` o `alt="foto"` | No anuncia nada útil | Describe el propósito, o `alt=""` si es decorativa |
| «Haz clic aquí» como texto de enlace | No significa nada en una lista de enlaces | Nombra el destino |
| Tablas para maquetar | Absurdo para un lector de pantalla | Tablas solo para datos |
| Omitir `<caption>` y `scope` | Las celdas pierden sus encabezados | Incluye siempre ambos |
| Varios elementos `<h1>` | El propósito de la página queda ambiguo | Exactamente uno |
| Olvidar `lang` | Pronunciación equivocada en el lector de pantalla | Ponlo en `<html>` |
| Ignorar los errores del validador | Los errores pequeños se acumulan | Corrige todos antes de entregar |

## Solución de problemas

**Mi página está en blanco.** Comprueba que el archivo se llama `index.html` y que lo abriste con Archivo → Abrir archivo. Una página en blanco suele significar una etiqueta sin cerrar cerca del principio: valídala.

**Mi imagen no aparece.** La ruta de `src` es relativa al archivo HTML. Revisa la ortografía y las mayúsculas: en la mayoría de los servidores web `Foto.JPG` y `foto.jpg` son archivos distintos, aunque Windows los trate como el mismo.

**Mis enlaces internos no hacen nada.** El `href="#about"` debe coincidir exactamente con un `id="about"`. Distingue mayúsculas de minúsculas, y el `id` no lleva `#`.

**Mi video no se reproduce.** Los navegadores admiten formatos distintos; MP4 con H.264 es el más seguro. Si aparece el texto alternativo, es que falta el archivo o la ruta es incorrecta.

**El validador da errores que no entiendo.** Corrige el primero y vuelve a validar. Una sola etiqueta sin cerrar suele producir una cascada de diez errores que desaparecen todos juntos.

## Momento 3D

En **Bienvenida a XR Camp** construiste un mundo 3D en tu primera hora. Ahora ponlo dentro de tu página.

1. Copia el `index.html` de ese mundo en una carpeta llamada `world/`, junto al `index.html` de este proyecto.
2. Agrégalo dentro de una de tus secciones:

```html
<figure>
  <iframe src="world/index.html"
          title="Mi primer mundo 3D: un jardín con tres figuras"
          width="800" height="450" loading="lazy"></iframe>
  <figcaption>Mi primer mundo 3D. Arrastra o usa las flechas para mirar alrededor.</figcaption>
</figure>
```

El `title` del `<iframe>` es lo que anuncia un lector de pantalla, igual que el texto alternativo de una imagen. El `<figcaption>` explica a todo el mundo cómo usarlo. Indica `width` y `height` por la misma razón que en las imágenes: la página no salta mientras se carga el mundo.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)** — agrega una segunda página y enlaza ambas.
2. **[Creativo](challenges/challenge-2.es.md)** — haz la página realmente tuya: tu comunidad, tu idioma, tus imágenes.
3. **[Explorador](challenges/challenge-3.es.md)** — agrega datos estructurados y una declaración de accesibilidad.

## Cómo entregar tu trabajo

1. Completa todos los puntos de [`tests/checklist.md`](tests/checklist.md).
2. Valida en [validator.w3.org](https://validator.w3.org/) con cero errores.
3. Recorre toda la página usando solo el teclado.
4. Publícala. Aprenderás cómo en el **Curso 1.8 — Git, GitHub y publicación**; si ya sabes, GitHub Pages funciona bien.
5. Agrega el enlace a tu portafolio. Cuando abra la comunidad de XR Camp, compártelo también allí.
6. Escribe una breve reflexión en tu diario de aprendizaje: ¿qué te sorprendió del texto alternativo?

## Lecturas adicionales

- [MDN — Estructurar contenido con HTML](https://developer.mozilla.org/es/docs/Learn_web_development/Core/Structuring_content)
- [WebAIM — Texto alternativo](https://webaim.org/techniques/alttext/) (en inglés)
- [W3C — Tutoriales de accesibilidad web](https://www.w3.org/WAI/tutorials/) (en inglés)
- [HTML Living Standard](https://html.spec.whatwg.org/multipage/) (en inglés) — la especificación real. Es densa, pero es donde están finalmente las respuestas.

## Mujeres que conviene conocer

**Léonie Watson** es una ingeniera de accesibilidad británica y usuaria de lector de pantalla, cofundadora de la consultora de accesibilidad TetraLogical. Watson ha participado en grupos de trabajo del W3C que dan forma a los estándares de la plataforma web que usas en este mismo proyecto, y lleva mucho tiempo defendiendo que la accesibilidad se construya desde el nivel de la especificación en lugar de agregarse después.

La conexión con esta lección es directa: los puntos de referencia, los encabezados y el texto alternativo que has escrito hoy son útiles precisamente porque personas como Watson lucharon para que existieran en los estándares y se implementaran correctamente en los navegadores.

> **Nota editorial — verificar antes de publicar.** Las afirmaciones biográficas de esta sección deben contrastarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección.

## Estándar destacado

Este proyecto se apoya por completo en dos estándares abiertos: el [HTML Living Standard](https://html.spec.whatwg.org/multipage/) (WHATWG) y las [WCAG 2.2](https://www.w3.org/TR/WCAG22/) (W3C). Ambos son públicos, de lectura gratuita y abiertos a comentarios de cualquiera, incluida tú. Nada de lo que has escrito hoy depende del producto de ninguna empresa.

## Licencia

Código: [`LICENSE-CODE`](../../LICENSE-CODE) · Contenido: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)

