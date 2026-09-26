# Historia de Web3D

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `preface` · **Lección:** `history-of-web3d-05` · **Tiempo:** unas 6 horas · 8 sesiones de 45 minutos · unas 2 semanas con 4 sesiones por semana

---

> Crea un laboratorio que compara tecnologías Web3D, con pequeños ejemplos y una línea de tiempo de estándares.

---

## Objetivos de aprendizaje

Al terminar este proyecto serás capaz de:

1. Contar la historia del 3D en la web, desde VRML en 1994 hasta WebXR y WebGPU hoy.
2. Explicar la diferencia entre el 3D **declarativo** y el **imperativo**, con un ejemplo de cada uno.
3. Explicar por qué los estándares abiertos como X3D, WebGL y glTF le importan a cualquier persona que construye en 3D.
4. Leer un pequeño ejemplo 3D en X3D, A-Frame y three.js, y decir con palabras sencillas qué hace cada línea.
5. Elegir una herramienta razonable para empezar un proyecto 3D y justificar tu elección.

## Requisitos previos

- **Curso 0.1: Bienvenida a XR Camp.** Ya construiste una escena en A-Frame.
- **Curso 0.4: Historia de la web.** Sabes qué es el W3C y por qué importan los estándares abiertos.

## Herramientas necesarias

| Herramienta | Para qué sirve | Costo |
| --- | --- | --- |
| Un navegador moderno | Ver el laboratorio | Gratis |
| Un editor de texto sin formato | Editar el laboratorio | Gratis |
| Una conexión a internet | Los tres ejemplos descargan sus bibliotecas 3D | Gratis |
| Tu diario de aprendizaje | Notas y fuentes | Gratis |

## Lo que vas a construir

Un **laboratorio de comparación**: una página con la misma caja morada construida de tres maneras (en X3D, A-Frame y three.js), una tabla que las compara, una línea de tiempo de los estándares Web3D y tus propias conclusiones.

Los tres ejemplos ya están construidos para ti, en `starter/examples/`. Tú eres la científica: los estudias, los cambias y anotas lo que descubres.

## Guía de carpetas

```text
05-history-of-web3d/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html       # Begin here: the lab page, with 7 TODOs
│   └── examples/        # The box in X3D, A-Frame, and three.js
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Configuración

1. En tu carpeta `xr-camp`, copia la carpeta `starter` y cambia el nombre de la copia a `web3d-lab`.
2. Abre `web3d-lab/index.html` en tu navegador. Al cabo de un momento aparecen tres cajas moradas.
3. Abre también en tu editor de texto cada archivo de `web3d-lab/examples/`. Vas a leer los tres.

## La historia

### El primer sueño: VRML (1994–2003)

Casi desde que existió la web, la gente quiso que fuera 3D. En **mayo de 1994**, en la primerísima conferencia de la World Wide Web, en una sesión sobre 3D para la web, Mark Pesce mostró una demostración que había construido con Tony Parisi, y nació la idea de **VRML**, el Virtual Reality Modeling Language (lenguaje de modelado de realidad virtual). La idea era simple y audaz: un mundo 3D debía ser un archivo al que se pudiera enlazar, igual que una página.

VRML se convirtió en un estándar internacional en **1997** (VRML97). Podías recorrer mundos 3D en un navegador, pero solo después de instalar un complemento, y a las computadoras y las conexiones por teléfono (dial-up) de los años noventa les costaba mucho. El sueño era correcto; la tecnología llegó demasiado pronto.

### Estándares que perduran: X3D (desde 2004)

El grupo que se encargaba de VRML se convirtió en el **Web3D Consortium**, y diseñó el sucesor de VRML: **X3D**, estándar ISO desde **2004**. X3D se usa donde los datos 3D tienen que seguir siendo legibles durante décadas: la ingeniería, la medicina y el patrimonio cultural, como los escaneos de edificios históricos. En **2009**, **X3DOM**, del instituto de investigación Fraunhofer IGD, permitió colocar X3D directamente dentro de una página HTML. Ese es el primer ejemplo de tu laboratorio.

### 3D sin complementos: WebGL y las bibliotecas (2010–2015)

El punto de inflexión llegó en **marzo de 2011**, cuando **WebGL 1.0** permitió que todos los navegadores dibujaran gráficos 3D rápidos sin ningún complemento. WebGL es potente pero de muy bajo nivel: dibujar una sola caja requiere muchas líneas de código. Por eso la gente construyó bibliotecas encima de él:

- **three.js** (2010), iniciada por Ricardo Cabello, hoy la biblioteca 3D más usada en la web. Tu tercer ejemplo.
- **Babylon.js** (2013), iniciada en Microsoft, popular para videojuegos.
- **A-Frame** (diciembre de 2015), del equipo de realidad virtual de Mozilla, que recuperó la idea de VRML del 3D como etiquetas dentro de una página, esta vez sobre WebGL y lista para visores. Tu segundo ejemplo.

### Compartir, inmersión y potencia: glTF, WebXR, WebGPU (2015–hoy)

Los modelos 3D necesitan un formato de archivo común, como las fotos tienen JPEG. **glTF**, del Khronos Group (la organización detrás de WebGL), llenó ese vacío: la versión 1.0 llegó en **octubre de 2015**, la versión 2.0 en **junio de 2017** y en **2022** se convirtió en estándar ISO. A menudo se le llama «el JPEG del 3D».

En **diciembre de 2019**, la **WebXR Device API** llegó a un navegador importante, de modo que una página web podía abrirse dentro de un visor de realidad virtual o aumentada. Y en **mayo de 2023** llegó **WebGPU**: el sucesor de WebGL, más rápido y capaz de ejecutar cálculos de IA además de gráficos.

Treinta años después de VRML, el sueño original por fin funciona: un mundo 3D al que puedes enlazar, abrir en un celular y en el que puedes entrar con un visor, sin complementos, construido con estándares abiertos.

### Declarativo e imperativo

Esta es la idea más importante de la lección, y te la vas a encontrar durante el resto de tu carrera.

- **Declarativo** significa que describes **qué** quieres: «una caja morada, aquí, girada así». La herramienta resuelve cómo dibujarla. X3D y A-Frame son declarativos. HTML también.
- **Imperativo** significa que das instrucciones paso a paso sobre **cómo** hacerlo: «crea un renderizador; crea una cámara; agrega una luz; crea una caja; agrégala a la escena; dibuja». three.js es imperativo. También lo es la mayor parte de JavaScript.

Lo declarativo es más rápido para empezar y más fácil de leer. Lo imperativo da más trabajo y te da más control. Los profesionales usan los dos, a menudo en el mismo proyecto: A-Frame mismo está construido sobre three.js.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración, TODO 1–2, lee **El primer sueño** y **Estándares que perduran** | El laboratorio abierto, con tu nombre |
| 2 | Estudia `examples/x3dom.html` y luego cambia su color | Tu primer X3D editado |
| 3 | Lee **3D sin complementos**; estudia `examples/aframe.html` y `examples/three.html` | Los tres ejemplos entendidos |
| 4 | Lee **Declarativo e imperativo**; TODO 3, la tabla de comparación | Una tabla completa |
| 5 | TODO 4–5: la línea de tiempo hasta 2015 | La mitad de la línea de tiempo |
| 6 | Lee **Compartir, inmersión y potencia**; TODO 6 | Toda la línea de tiempo |
| 7 | TODO 7, tus conclusiones; luego [`tests/checklist.md`](tests/checklist.md) | Un laboratorio terminado |
| 8 | Un reto adicional y luego **Cómo entregar tu trabajo** | Un laboratorio terminado en tu portafolio |

### Cómo estudiar un ejemplo

Para cada ejemplo, ábrelo en tu editor y responde tres preguntas en tu diario:

1. **¿Dónde está la caja?** Encuentra la línea o las líneas que la crean.
2. **¿Dónde está el color?** Cámbialo por otro color, guarda y recarga la página del laboratorio.
3. **¿Qué hizo la herramienta por mí?** Busca una cámara y luces. Si no las encuentras, la herramienta las agregó por ti.

Los colores se escriben de forma distinta en cada una: X3D usa tres números del 0 al 1 para el rojo, el verde y el azul (`0.36 0.16 0.53`), mientras que A-Frame y three.js usan los códigos hexadecimales que conociste en el Curso 0.1 (`#5b2a86`). Herramientas distintas, décadas distintas, el mismo color.

### Por qué las cajas se ven distintas

Mira con atención las tres cajas. Tienen tamaños distintos, están giradas de forma distinta y están iluminadas de forma distinta. Cada herramienta elige una posición de cámara y unas luces predeterminadas, y el ejemplo de three.js elige las suyas porque no tiene valores predeterminados. **Los valores predeterminados son decisiones que otra persona tomó por ti.** Darte cuenta de ellos es el primer paso para controlarlos.

## Explicación del código clave

**`<box size="1.5 1.5 1.5">` (X3D)** y **`<a-box>` (A-Frame)** describen los dos una caja con una etiqueta. El navegador no conoce estas etiquetas; la biblioteca que cargas (`x3dom.js` o `aframe.min.js`) se las enseña.

**`new THREE.Mesh(geometry, material)` (three.js)** construye la caja a partir de dos partes: una *geometría* (su forma) y un *material* (cómo se ve su superficie). Todos los motores 3D funcionan así por dentro, incluido A-Frame.

**`<iframe src="examples/aframe.html" title="The box in A-Frame">`** coloca una página dentro de otra. Cada ejemplo vive en su propia página para que cada uno cargue solo su propia biblioteca. El `title` es lo que un lector de pantalla anuncia para el marco.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| Cada ejemplo tiene una descripción en texto (`id="scene-description"`) | 1.1.1 | Sin ella, un lienzo 3D es invisible para un lector de pantalla. |
| Cada `<iframe>` tiene un `title` | 4.1.2 | Si no, un lector de pantalla solo anuncia «marco». |
| La tabla tiene un `<caption>` y `scope` en sus encabezados | 1.3.1 | Cada celda sigue vinculada a su fila y su columna. |
| Nada se mueve | 2.2.2, 2.3.3 | Estos ejemplos están quietos. Si agregas animación en un reto, agrega también un botón de pausa. |
| Los ejemplos de código se desplazan horizontalmente dentro de su recuadro, no toda la página | 1.4.10 | La página sigue siendo legible con el ancho de un celular. |

## Consideraciones de rendimiento

Cada ejemplo descarga su biblioteca la primera vez: alrededor de 1.9 MB para three.js (en dos archivos), 0.8 MB para X3DOM y 1.3 MB para A-Frame. Los iframes usan `loading="lazy"`, así que en un celular los ejemplos que están más abajo en la página solo se cargan cuando llegas a ellos. Con una conexión lenta, abre el laboratorio una vez cuando tengas buena señal; después, tu navegador conserva las bibliotecas.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Editar el archivo del ejemplo pero recargar otra copia | No cambia nada | Comprueba que estás editando el archivo que está dentro de la carpeta que abriste |
| Usar un código hexadecimal en X3D (`#5b2a86`) | La caja se vuelve gris o negra | X3D usa tres números del 0 al 1 |
| Borrar las luces en three.js | La caja se vuelve negra | three.js no agrega luces por ti |
| Decir que three.js es «declarativo» | Una respuesta equivocada en tu tabla | three.js es imperativo: ejecuta instrucciones |

## Solución de problemas

**Un ejemplo se queda en blanco.** Su biblioteca todavía no se ha descargado. Revisa tu conexión y recarga.

**El ejemplo de three.js está en blanco, pero los demás funcionan.** Los navegadores muy antiguos no admiten el `importmap` que usa. Actualiza tu navegador.

**Cambié un color pero la página del laboratorio no se actualizó.** Recarga la página del laboratorio en sí. Si eso no funciona, abre la página del ejemplo por separado, recárgala y luego recarga el laboratorio.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: cambia la caja por una esfera en las tres herramientas.
2. **[Creativo](challenges/challenge-2.es.md)**: agrega un cuarto ejemplo, la misma escena que tu mundo del Curso 0.1.
3. **[Explorador](challenges/challenge-3.es.md)**: carga un modelo glTF real en A-Frame.

## Cómo entregar tu trabajo

1. Completa todos los puntos de [`tests/checklist.md`](tests/checklist.md).
2. Toma una captura de pantalla de tu laboratorio, con tu tabla y tus conclusiones a la vista.
3. Guárdala en tu diario de aprendizaje. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. En tu diario de aprendizaje, responde: ¿te consideras una persona más declarativa o más imperativa? ¿Por qué?

## Lecturas adicionales

- [Web3D Consortium: X3D](https://www.web3d.org/x3d/what-x3d) (en inglés)
- [Khronos Group: glTF](https://www.khronos.org/gltf/) (en inglés)
- [Khronos Group: WebGL](https://www.khronos.org/webgl/) (en inglés)
- [three.js](https://threejs.org/) y [A-Frame](https://aframe.io/) (en inglés): las dos bibliotecas que vas a usar en la Fase 3
- [Immersive Web Working Group (W3C)](https://www.w3.org/immersive-web/) (en inglés): donde se redacta WebXR

## Mujeres que conviene conocer

**Ada Rose Cannon** copreside el Immersive Web Working Group y el Community Group del W3C: las personas que redactan **WebXR**, el estándar que permite que las páginas web se abran en visores. Cannon es ingeniera de la plataforma web en Apple, donde trabaja en Safari y WebKit, y antes pasó seis años como developer advocate de Samsung Internet, promoviendo nuevas tecnologías web como WebXR.

El último hito de tu línea de tiempo no ocurrió sin más. Personas como Cannon pasaron años en reuniones, redactando especificaciones y construyendo demostraciones para que «un mundo 3D al que puedes enlazar» funcionara en todos los navegadores. El trabajo en estándares es una de las carreras que conocerás en el Curso 0.9.

_Datos de fuentes públicas, verificados en 2026. ¿Encontraste un error? [Avísanos](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Estándar destacado

En esta lección aparecen cuatro estándares abiertos: **X3D** (Web3D Consortium e ISO), **WebGL** (Khronos Group), **glTF** (Khronos Group e ISO) y **WebXR** (W3C). Un modelo glTF que hagas hoy debería seguir abriéndose en programas que todavía no se han escrito. Para eso sirve un estándar.

## Licencia

Código: [`LICENSE-CODE`](../../LICENSE-CODE) · Contenido: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
