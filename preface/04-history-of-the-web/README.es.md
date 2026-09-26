# Historia de la web

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `preface` · **Lección:** `history-of-the-web-04` · **Tiempo:** unas 5 horas · 7 sesiones de 45 minutos · unas 2 semanas con 4 sesiones por semana

---

> Crea y publica una línea de tiempo adaptable con los hitos más importantes de la web.

---

## Objetivos de aprendizaje

Al terminar este proyecto serás capaz de:

1. Contar la historia de la web en cinco eras, desde las primeras ideas sobre documentos enlazados hasta el 3D, la XR y la IA.
2. Explicar la diferencia entre internet y la web, y por qué importa.
3. Explicar por qué la web es abierta y libre para construir sobre ella, y quién se encarga de que siga así.
4. Marcar una línea de tiempo con una lista ordenada y fechas legibles por máquinas.
5. Encontrar, comprobar y citar una fuente para un dato histórico.

## Requisitos previos

- **Curso 0.1: Bienvenida a XR Camp.** Sabes abrir un archivo en tu navegador y en tu editor de texto, cambiarlo, guardarlo y recargarlo.

## Herramientas necesarias

| Herramienta | Para qué sirve | Costo |
| --- | --- | --- |
| Un navegador moderno | Ver tu línea de tiempo | Gratis |
| Un editor de texto sin formato | Editar tu línea de tiempo | Gratis |
| Tu diario de aprendizaje | Notas y fuentes | Gratis |

## Lo que vas a construir

Una línea de tiempo de la web que funciona en un celular y en una pantalla ancha, con hitos de cinco eras y una sección final para hitos de tu propia vida.

La solución de referencia en [`completed/`](completed/) es la línea de tiempo de Ana. Los estilos ya vienen hechos en el punto de partida; tu trabajo es la historia.

## Guía de carpetas

```text
04-history-of-the-web/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/             # Begin here: a timeline with one milestone per era and 9 TODOs
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Configuración

1. En tu carpeta `xr-camp`, copia la carpeta `starter` y cambia el nombre de la copia a `web-timeline`.
2. Abre `web-timeline/index.html` en tu navegador y en tu editor de texto, uno al lado del otro.
3. Haz la ventana del navegador angosta y luego ancha. La línea de tiempo se reorganiza sola. Eso es el diseño adaptable (responsive design), y aprenderás a construirlo en la Fase 1.

## La historia

Lee una era por sesión y luego agrega sus hitos a tu línea de tiempo. Los hitos en **negrita** están en la solución de referencia; puedes usarlos o buscar los tuyos.

### Antes de la web (1945–1988)

La web empezó como un sueño mucho antes de ser una tecnología. En **1945**, el ingeniero Vannevar Bush imaginó un escritorio llamado *memex* que guardaría documentos y los enlazaría entre sí, del mismo modo en que la mente salta de una idea a la siguiente. En **1965**, Ted Nelson le dio nombre a esa idea: *hipertexto*, texto que enlaza con otro texto. En **1968**, Douglas Engelbart le mostró a una sala llena de gente un mouse, enlaces en los que se podía hacer clic y a dos personas editando el mismo documento desde lugares distintos. Se hizo conocida como «La madre de todas las demos».

Mientras tanto, una red iba creciendo. En **1969**, dos computadoras en California intercambiaron el primer mensaje en ARPANET. El **1 de enero de 1983**, ARPANET pasó a usar TCP/IP, las reglas que las computadoras siguen usando hoy para intercambiar datos.

**Internet no es la web.** Internet es la red: los cables, los enlaces de radio y las reglas que mueven datos entre computadoras. La web es una de las cosas que funcionan sobre ella: páginas unidas por enlaces que lees en un navegador. El correo electrónico y las videollamadas usan internet sin formar parte de la web.

### La web de documentos (1989–1998)

En **marzo de 1989**, Tim Berners-Lee, un científico británico del CERN, el laboratorio europeo de física en Suiza, propuso una forma de que los investigadores compartieran documentos por medio de enlaces. Para **diciembre de 1990**, el primer servidor web, el primer navegador y el primer sitio web ya estaban funcionando en el CERN. Una estudiante en prácticas, Nicola Pellow, escribió un sencillo **navegador en modo línea** para que la gente pudiera usar la web desde terminales de texto básicas, no solo desde costosas estaciones de trabajo. Desde su primer año, la web estaba pensada para todo el mundo.

La decisión más importante llegó el **30 de abril de 1993**: el CERN puso el software de la web en el dominio público. Cualquier persona podía construir un navegador, un servidor o un sitio web sin pedir permiso ni pagar. Por eso hoy puedes aprender desarrollo web gratis, y por eso XR Camp puede existir.

A partir de ahí, la web se extendió rápidamente. El navegador **Mosaic** (1993) mostraba imágenes dentro de las páginas. El **20 de abril de 1994**, **China** hizo su primera conexión completa a internet, después de que Hu Qiheng, de la Academia China de Ciencias, convenciera a la Fundación Nacional de Ciencias de Estados Unidos (US National Science Foundation) de permitirlo. En **octubre de 1994**, Berners-Lee fundó el **World Wide Web Consortium (W3C)** para redactar los estándares de la web, y Håkon Wium Lie propuso **CSS**. En **1995**, Brendan Eich creó **JavaScript** en Netscape, y en China **Zhang Shuxin** fundó Yinghaiwei, a la que a menudo se considera la primera empresa de internet del país.

### La web de aplicaciones (1999–2006)

Las páginas empezaron a convertirse en programas. En **mayo de 1999**, las primeras **Pautas de Accesibilidad para el Contenido Web (WCAG 1.0)** establecieron cómo hacer que la web pudieran usarla las personas con discapacidad. Ese mismo año, Internet Explorer 5 incorporó una forma de obtener datos sin recargar la página, y otros navegadores pronto la copiaron. Para **2005**, Gmail y Google Maps mostraron lo que eso hacía posible, y la técnica recibió un nombre: **Ajax**. En **2004**, las empresas que hacen navegadores formaron el **WHATWG** para que HTML siguiera evolucionando para las aplicaciones.

### La web en todas partes (2007–2019)

En **junio de 2007** salió a la venta el iPhone con un navegador web completo, y los teléfonos empezaron a reemplazar a las computadoras como la forma en que la mayoría de la gente llega a la web. Quienes diseñaban tuvieron que responder: en **mayo de 2010**, Ethan Marcotte le dio nombre al **diseño web adaptable** (responsive web design), una sola página que se adapta a cualquier pantalla. **HTML5** (2014) agregó video, audio y gráficos nativos. En **2015**, Frances Berriman y Alex Russell les dieron nombre a las **aplicaciones web progresivas** (progressive web apps): sitios web que se instalan como aplicaciones y siguen funcionando sin conexión. En **mayo de 2019**, el W3C y el WHATWG acordaron mantener juntos un único estándar de HTML.

### La web espacial e inteligente (2011–hoy)

En **marzo de 2011**, **WebGL** permitió que los navegadores dibujaran gráficos 3D rápidos sin complementos, y la web ganó una tercera dimensión. En **diciembre de 2019**, la **WebXR Device API** llegó a un navegador importante, de modo que un sitio web podía abrirse dentro de un visor de realidad virtual o aumentada. En **noviembre de 2022** se lanzó **ChatGPT**, y los asistentes de IA empezaron a cambiar la forma en que la gente busca, aprende y escribe código. En **mayo de 2023**, **WebGPU** trajo al navegador gráficos modernos y cálculo para IA. Y en **octubre de 2023**, **WCAG 2.2** actualizó las reglas de accesibilidad que todas estas tecnologías tienen que seguir cumpliendo.

De esta parte de la historia se trata XR Camp, y es la parte que estás a punto de ayudar a escribir.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración, TODO 1–2, lee **Antes de la web**, TODO 3 | Tu nombre en la página y la primera era completa |
| 2 | Lee **La web de documentos**, TODO 4 | Diez hitos |
| 3 | Lee **La web de aplicaciones** y **La web en todas partes**, TODO 5–6 | Cuatro eras completas |
| 4 | Lee **La web espacial e inteligente**, TODO 7 | Toda la historia de la web |
| 5 | TODO 8–9: tus propios hitos y fuentes | Una línea de tiempo que te incluye |
| 6 | Revisa [`tests/checklist.md`](tests/checklist.md) | Todos los puntos marcados |
| 7 | Un reto adicional y luego **Cómo entregar tu trabajo** | Una línea de tiempo terminada en tu portafolio |

### Cómo agregar un hito

Cada hito es el mismo bloque de HTML:

```html
<li>
  <time datetime="1994-04-20">20 April 1994</time>
  <h3>China connects</h3>
  <p>China's first full connection to the internet goes live.</p>
</li>
```

Copia un bloque completo, desde `<li>` hasta `</li>`, pégalo después del último de la misma era y cambia las tres líneas de adentro. Mantén los hitos en orden cronológico: la lista está numerada, así que su orden forma parte de su significado.

### Tus propios hitos (TODO 8)

La historia no es solo lo que les pasó a personas famosas. ¿Cuándo llegó internet a tu ciudad o a tu pueblo? ¿Cuándo te conectaste por primera vez, tú o tu mamá? Pregúntale a alguien mayor que tú. Anota lo que te diga y, cuando lo agregues, apunta en tu diario de dónde salió.

## Explicación del código clave

**`<ol>`: una lista ordenada.** Una línea de tiempo es una lista en la que el orden importa, así que es una lista ordenada. Un lector de pantalla anuncia «lista, 10 elementos» y lee la posición de cada elemento, para que quien escucha sepa en qué punto de la historia va.

**`<time datetime="1994-04-20">`.** El texto entre las etiquetas es para las personas, y se puede escribir en cualquier idioma o formato: *20 April 1994*, *20 de abril de 1994*, *1994年4月20日*. El atributo `datetime` es para las máquinas, y siempre se escribe año-mes-día. Los buscadores, los calendarios y las herramientas de traducción lo leen, sin importar en qué idioma esté la página.

**`<section aria-labelledby="...">`.** Cada era es una sección que recibe su nombre de su encabezado, para que quienes usan lector de pantalla puedan saltar de una era a otra.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| Los hitos son una lista ordenada | 1.3.1 | El orden forma parte del significado. |
| Cada fecha tiene un `datetime` | 1.3.1 | Las máquinas leen las fechas de forma confiable en cualquier idioma. |
| Encabezados en orden: un `h1`, las eras como `h2`, los hitos como `h3` | 1.3.1, 2.4.6 | Los encabezados son la forma en que muchas personas recorren una página larga. |
| La página funciona con el ancho de un celular | 1.4.10 | Nada debería necesitar desplazamiento horizontal. |
| `lang` coincide con tu idioma | 3.1.1 | Le indica a un lector de pantalla cómo pronunciar tus palabras. |

## Consideraciones de rendimiento

Esta página es solo HTML y un poco de CSS: sin imágenes, sin scripts, sin descargas. Carga casi al instante, incluso con una conexión lenta. Vale la pena recordarlo cuando más adelante empieces a agregar 3D. Cada funcionalidad tiene un costo, así que agrégala solo cuando le sirva a quien lee.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Pegar un bloque dentro de otro bloque | Los hitos quedan anidados unos dentro de otros | Pega después de un `</li>`, nunca antes |
| Olvidar `datetime`, o escribirlo como `20/04/1994` | Las máquinas no pueden leer la fecha | Siempre año-mes-día: `1994-04-20` |
| Hitos fuera de orden | La lista numerada cuenta una historia falsa | Mantén cada era en orden cronológico |
| Un dato sin fuente | Nadie puede comprobarlo | Anota cada fuente en tu diario |

## Solución de problemas

**El diseño se rompió después de pegar.** Probablemente pegaste solo una parte de un bloque. Cada `<li>` necesita su `</li>`. Deshaz el cambio y vuelve a copiar el bloque completo.

**Un hito aparece en la era equivocada.** Está dentro del `<ol>` equivocado. Córtalo y pégalo en la sección correcta.

**Dos fuentes dan fechas distintas.** Eso pasa a menudo en la historia. Prefiere la fuente más cercana al hecho: el archivo de la propia organización, o un registro escrito en su momento. Menciona el desacuerdo en tu diario.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: agrega la primera conexión a internet de tu país, con una fuente.
2. **[Creativo](challenges/challenge-2.es.md)**: entrevista a alguien sobre la primera vez que se conectó a internet.
3. **[Explorador](challenges/challenge-3.es.md)**: visita el primer sitio web de la historia y compáralo con un sitio web de hoy.

## Cómo entregar tu trabajo

1. Completa todos los puntos de [`tests/checklist.md`](tests/checklist.md).
2. Toma una captura de pantalla de tu línea de tiempo con el ancho de un celular y a ancho completo.
3. Guarda las dos en tu diario de aprendizaje. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés). (Aprenderás a publicar la página en sí en el Curso 1.8).
4. En tu diario de aprendizaje, responde: ¿qué hito te sorprendió más, y por qué?

## Lecturas adicionales

- [CERN: El nacimiento de la web](https://home.cern/science/computing/the-birth-of-the-web/) (en inglés)
- [El primer sitio web, restaurado por el CERN](https://info.cern.ch/hypertext/WWW/TheProject.html) (en inglés)
- [W3C: Acerca del W3C y su historia](https://www.w3.org/about/) (en inglés)
- [Internet Hall of Fame: Hu Qiheng](https://www.internethalloffame.org/inductee/qiheng-hu/) (en inglés)
- [Ethan Marcotte: Responsive Web Design (A List Apart, 2010)](https://alistapart.com/article/responsive-web-design/) (en inglés)

## Mujeres que conviene conocer

**Zhang Shuxin (张树新)** fundó Yinghaiwei (瀛海威) en 1995, a la que a menudo se considera la primera empresa de internet de China. Vendía acceso por conexión telefónica (dial-up) a hogares comunes y administraba uno de los primeros servicios en línea del país, en una época en que muy pocas personas en China se habían conectado alguna vez a internet. En sus primeros años colocó un famoso anuncio espectacular en el distrito de Zhongguancun, en Pekín, que preguntaba qué tan lejos estaba China de la superautopista de la información.

Yinghaiwei no sobrevivió, y en China su historia se cuenta a menudo como una lección sobre llegar demasiado pronto. Pero llegar pronto es también lo que hacen las pioneras. Muchos de los hitos de tu línea de tiempo los construyeron personas cuyos primeros intentos fracasaron.

> **Nota editorial — verificar antes de publicar.** Las afirmaciones biográficas de las secciones Mujeres que conviene conocer deben contrastarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

La web funciona en cualquier dispositivo, en cualquier país y en cualquier navegador porque sus reglas son estándares abiertos: **HTML** (WHATWG), **CSS** (W3C) y **JavaScript** (Ecma International, como ECMAScript). Ninguna empresa es dueña de ellos, cualquier persona puede leerlos gratis y cualquier persona puede participar en su redacción. Conocerás a las organizaciones que están detrás de ellos en el Curso 0.7.

## Licencia

Código: [`LICENSE-CODE`](../../LICENSE-CODE) · Contenido: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
