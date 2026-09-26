# La web espacial

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `preface` · **Lección:** `the-spatial-web-06` · **Tiempo:** unas 5 horas · 7 sesiones de 45 minutos · unas 2 semanas con 4 sesiones por semana

---

> Compara y documenta una interfaz 2D, una aplicación 3D interactiva y una experiencia inmersiva.

---

## Objetivos de aprendizaje

Al terminar este proyecto serás capaz de:

1. Explicar la diferencia entre una interfaz 2D, el 3D interactivo y una experiencia inmersiva.
2. Definir la realidad virtual, la realidad aumentada y la realidad mixta, y dar un ejemplo de cada una.
3. Explicar qué son la computación espacial, los gemelos digitales y los sistemas de información geográfica.
4. Describir en qué casos la tecnología inmersiva ayuda a las personas y en qué casos estorba.
5. Elegir la dimensión adecuada para un contenido y justificar tu elección.

## Requisitos previos

- **Curso 0.1: Bienvenida a XR Camp.** Ya construiste una escena en A-Frame.
- **Curso 0.5: Historia de Web3D.** Sabes qué es WebXR.

## Herramientas necesarias

| Herramienta | Para qué sirve | Costo |
| --- | --- | --- |
| Un navegador moderno | Las tres vistas | Gratis |
| Un editor de texto sin formato | Tu página de comparación | Gratis |
| Una conexión a internet, la primera vez | Descargar A-Frame | Gratis |
| Un visor de realidad virtual o un celular compatible con realidad aumentada (opcional) | La vista inmersiva | No es necesario |

**No** necesitas un visor. Si tu dispositivo no puede mostrar VR ni AR, la página te lo dice, y la lección funciona sin eso.

## Lo que vas a construir

Una página que muestra el mismo objeto de tres formas (una tarjeta plana, un modelo 3D interactivo y una vista inmersiva) y una tabla comparativa escrita con tus propias palabras.

La solución de referencia en [`completed/`](completed/) es la planta de tomate de Ana. Tú vas a elegir un objeto de tu propia región.

## Guía de carpetas

```text
06-the-spatial-web/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/             # Begin here: the three views, with 6 TODOs
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Configuración

1. Copia la carpeta `starter` de esta lección dentro de tu carpeta `xr-camp` y cambia su nombre a `spatial-web`.
2. Abre `spatial-web/index.html` en tu navegador y en tu editor de texto.
3. Arrastra la planta 3D para verla desde todos los lados. Luego lee lo que dice la sección inmersiva sobre tu dispositivo.

## La historia

### De las pantallas planas al espacio

Durante la mayor parte de su historia, la web ha sido plana: texto e imágenes sobre un rectángulo. Eso no es una limitación: es la razón por la que la web funciona en todos los celulares y todas las computadoras del mundo. Pero algunas cosas son difíciles de entender a partir de una imagen plana: la forma de un corazón, el tamaño de un edificio, la manera en que encajan las piezas de una máquina. Para esas cosas, la web ahora puede usar una tercera dimensión.

### Tres tipos de experiencia

- **Interfaz 2D:** páginas, formularios, listas, mapas. Rápida, conocida y la más fácil de hacer accesible.
- **3D interactivo:** una escena 3D dentro de una página normal, que giras y exploras con el mouse o con el dedo. Ya construiste una en el Curso 0.1.
- **Experiencia inmersiva:** la escena te rodea. Entras en ella con un visor, o la ves colocada en tu habitación a través de un celular.

### VR, AR y MR

- La **realidad virtual (VR)** reemplaza lo que ves por un mundo digital. Te pones un visor y la habitación que te rodea desaparece.
- La **realidad aumentada (AR)** agrega cosas digitales al mundo real: una planta virtual sobre tu mesa real, vista a través de la cámara de tu celular o de unos lentes.
- La **realidad mixta (MR)** es realidad aumentada en la que las cosas digitales entienden el espacio real y reaccionan a él: una pelota virtual que rebota en tu pared real.

**XR** (realidad extendida) es la palabra que abarca las tres, y **WebXR** es el estándar web que permite que una página web se abra en cualquiera de ellas, desde un enlace, sin instalar ninguna aplicación, en los navegadores que lo admiten.

### Computación espacial, gemelos digitales y mapas

- La **computación espacial** se refiere a computadoras que entienden el espacio que las rodea y a las personas que están en él: dónde están las paredes, dónde están tus manos, hacia dónde miras.
- Un **gemelo digital** es una copia digital en vivo de algo real (un edificio, una fábrica, una ciudad) que se actualiza con datos de sensores, para que las personas puedan revisarlo o planificar sin estar ahí.
- Un **sistema de información geográfica (SIG, o GIS en inglés)** guarda y muestra datos sobre lugares: mapas, caminos, ríos, zonas de inundación. La web espacial une estos mapas con el 3D y la XR.

### La IA y la web espacial

La IA está empezando a entender los espacios 3D además del texto y las imágenes: describe una escena con palabras para alguien que no puede verla, o construye un modelo 3D a partir de fotos. En la Fase 5 vas a construir con estas ideas.

### Dónde ayuda lo inmersivo, y dónde no

Las experiencias inmersivas funcionan mejor donde **importan el espacio, el tamaño o la presencia**: entrenar de forma segura para trabajos peligrosos, visitar un museo o un sitio patrimonial al que no puedes viajar, entender la anatomía, planificar un edificio antes de construirlo.

Son la opción equivocada para **información que se lee más rápido**, como un horario de atención, un horario de transporte o un formulario. Además, consumen más datos, necesitan dispositivos más potentes, pueden provocar mareos y son más difíciles de hacer accesibles. Una buena desarrolladora espacial sabe cuándo *no* usar 3D.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; lee **De las pantallas planas al espacio** y **Tres tipos de experiencia**; TODO 1 | Las tres vistas abiertas, con tu nombre en la página |
| 2 | Elige tu objeto; TODO 2 | Tu tarjeta 2D |
| 3 | TODO 3 | Tu objeto en 3D, con una descripción que coincide |
| 4 | Lee **VR, AR y MR**; TODO 4 | Tu vista inmersiva explicada |
| 5 | Lee **Computación espacial** y **La IA y la web espacial**; TODO 5 | Una tabla comparativa completa |
| 6 | Lee **Dónde ayuda lo inmersivo**; TODO 6; [`tests/checklist.md`](tests/checklist.md) | Una página terminada |
| 7 | Un reto adicional y luego **Cómo entregar tu trabajo** | Tu página en tu portafolio |

### Cómo elegir tu objeto (TODO 2)

Elige algo de tu propia vida o de tu región que sea interesante en 3D: una planta de maíz, una olla de barro, una planta de té, un farol, un instrumento musical. Constrúyelo con las mismas figuras simples (cajas, cilindros, conos, esferas) que usaste en el Curso 0.1.

### Cómo hacer que coincidan las tres vistas (TODO 3)

Cambia los colores, los tamaños y las posiciones de las figuras 3D para que coincidan con tu objeto. Luego vuelve a escribir la descripción de la escena: alguien que no puede ver la vista 3D tiene que poder imaginarla de todos modos.

## Explicación del código clave

**`<svg>`: un dibujo hecho de código.** El dibujo 2D es SVG: figuras como `<rect>` y `<circle>` con posiciones y colores. `role="img"` y `<title>` hacen que un lector de pantalla lo trate como una sola imagen, con una alternativa en texto.

**`<a-scene embedded>`.** Como en el Curso 0.1, la escena queda dentro de la página en lugar de cubrirla.

**Detección de funciones.** El script le pregunta al navegador si admite VR y AR (`navigator.xr.isSessionSupported`), y solo entonces muestra los botones. Nunca muestres un botón que no puede funcionar.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| El SVG tiene una alternativa en texto | 1.1.1 | Un dibujo necesita palabras para las personas que no pueden verlo. |
| La escena 3D tiene una descripción que coincide con ella | 1.1.1 | Lo mismo, para la vista 3D. |
| Los botones inmersivos solo aparecen cuando funcionan | Buena práctica (no es una regla de WCAG) | Sin callejones sin salida. |
| La tabla comparativa tiene un título y encabezados | 1.3.1 | Cada celda conserva su significado. |

## Consideraciones de rendimiento

La vista 2D pesa unos pocos kilobytes. La vista 3D descarga A-Frame (alrededor de 1.3 MB de código, o unos 350 KB después de que el servidor lo comprime) la primera vez. Esa diferencia es todo el argumento de esta lección: cada dimensión que agregas tiene un costo para las personas para quienes construyes.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Usar 3D porque se ve impresionante | Páginas más lentas y más difíciles | Usa 3D solo cuando importan la forma o el espacio |
| Cambiar la escena 3D pero no la descripción | Quienes usan lector de pantalla reciben el objeto equivocado | Actualiza las palabras junto con la escena |
| Confundir AR y VR | Explicaciones confusas | La VR reemplaza el mundo; la AR le agrega cosas |

## Solución de problemas

**La vista 3D está vacía.** A-Frame se descarga de internet la primera vez. Revisa tu conexión y recarga.

**No aparece ningún botón de VR ni de AR.** Tu dispositivo no los admite, algo normal en la mayoría de las computadoras. La página te lo indica. Prueba el Reto 3 para hacer pruebas con un emulador.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: clasifica cinco productos reales como 2D, 3D, VR, AR o MR.
2. **[Creativo](challenges/challenge-2.es.md)**: diseña una idea inmersiva para tu comunidad y decide con honestidad si debería ser inmersiva.
3. **[Explorador](challenges/challenge-3.es.md)**: prueba tu página en VR con un emulador en el navegador.

## Cómo entregar tu trabajo

1. Completa todos los puntos de [`tests/checklist.md`](tests/checklist.md).
2. Toma una captura de pantalla de cada una de las tres vistas (o del mensaje de la sección inmersiva).
3. Guárdalas en tu diario de aprendizaje. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. En tu diario, responde: ¿qué vista explica mejor tu objeto, y por qué?

## Lecturas adicionales

- [MDN: WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API) (en inglés)
- [MDN: SVG tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch) (en inglés): un tutorial de SVG.
- [W3C: Immersive Web Working Group](https://www.w3.org/immersive-web/) (en inglés): el grupo de trabajo de la web inmersiva.

## Mujeres que conviene conocer

**Fei-Fei Li (李飞飞)** es una científica de la computación de Stanford que creó ImageNet, la colección de fotografías etiquetadas que impulsó el aprendizaje profundo moderno. Codirige el Instituto de IA Centrada en el Ser Humano de Stanford (Stanford Human-Centered AI Institute) y cofundó AI4ALL, una organización sin fines de lucro que ayuda a estudiantes de grupos subrepresentados en la IA a estudiarla y a hacer carrera en ella. En 2024 cofundó World Labs, donde, como directora ejecutiva, trabaja en lo que ella llama «inteligencia espacial»: una IA que entiende mundos 3D.

Creció en Chengdu antes de mudarse a Estados Unidos a los dieciséis años. Su trabajo une dos ideas de esta lección: computadoras que aprenden a ver y computadoras que aprenden a entender el espacio.

_Datos de fuentes públicas, verificados en 2026. ¿Encontraste un error? [Avísanos](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Estándar destacado

**WebXR** lo redacta el Immersive Web Working Group (Grupo de Trabajo de la Web Inmersiva) del W3C, para que la misma página pueda abrirse en visores y celulares de distintas empresas. Sus reglas para pedir permiso antes de usar cámaras y sensores forman parte del estándar; no se agregaron a última hora.

## Licencia

Código: [`LICENSE-CODE`](../../LICENSE-CODE) · Contenido: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
