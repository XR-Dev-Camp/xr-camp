# Fundamentos de Web3D

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `web3d-developer` · **Lección:** `web3d-fundamentals-01` · **Tiempo:** unas 14 horas · 19 sesiones de 45 minutos · unas 5 semanas con 4 sesiones por semana

---

> Crea un laboratorio de comparación de tecnologías con ejemplos breves y un análisis escrito.

---

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Colocar objetos en 3D con **coordenadas** (x, y, z, en metros), y explicar hacia dónde apunta cada eje.
2. Explicar el **grafo de escena**: los objetos están anidados, y los hijos se mueven con sus padres.
3. **Transformar** objetos: posición, rotación (grados y radianes), y escala.
4. Elegir una **cámara**, perspectiva u ortográfica, y explicar el campo de visión.
5. Iluminar una escena con luces **ambiental**, **direccional** y **puntual**.
6. Explicar cómo un **material** decide cómo reacciona una superficie a la luz.
7. Comparar **WebGL**, **three.js**, **A-Frame** y **X3D**, describir Babylon.js, PlayCanvas y WebGPU, y elegir uno para un proyecto, con razones.
8. Describir cualquier escena 3D con palabras, para que la información nunca viva solo en la imagen.

## Requisitos previos

- **Fase 2: Conviértete en desarrolladora frontend**, en especial los módulos (2.1) y la arquitectura de un trabajo por archivo (2.3).
- El **Curso 0.5: Historia de Web3D** cuenta la historia de estas tecnologías. Esta lección trata de cómo funcionan.

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Un navegador moderno con WebGL | Cada página de esta lección | Gratis |
| VS Code y un servidor local | Los módulos y los mapas de importación necesitan `http://` | Gratis |
| El panel **Network** (red) del navegador | Medir cuánto pesa descargar cada biblioteca | Gratis |

**Primero verifica WebGL:** abre `compare/webgl.html`. Si ves un triángulo naranja, tu navegador está listo. Si no, actualiza tu navegador, o activa la aceleración por hardware en su configuración.

Las bibliotecas se cargan desde `cdn.jsdelivr.net`, `aframe.io` y `x3dom.org`. Si alguna es lenta o está bloqueada donde vives, descarga el archivo una vez donde sí funcione, guárdalo junto a la página, y cambia la dirección al archivo local.

## Lo que vas a construir

La primera parte de la **exhibición virtual** que construirás a lo largo de toda la Fase 3: un **laboratorio de Web3D** en dos mitades.

1. **El laboratorio de conceptos** (`index.html`): una pequeña exhibición, una mesa con una olla de barro y una piedra, y un panel de controles. Mueve la piedra, gira la mesa, cambia de cámara, cambia las luces y los materiales, y observa cómo cambian juntos la escena, su **descripción** y su **grafo de escena**.
2. **La comparación de motores** (`compare/`): la misma exhibición construida con WebGL puro (solo un triángulo, para ver por qué existen los motores), three.js, A-Frame y X3D. Luego un **análisis** escrito que los compara, y otras tres tecnologías que investigarás: Babylon.js, PlayCanvas y WebGPU.

La solución de referencia está en [`completed/`](completed/). El starter tiene las páginas, los controles y los objetos de la escena; tú escribes las partes que los conectan: quince TODOs.

## Guía de carpetas

```text
01-web3d-fundamentals/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html, styles.css    # The lab's page and controls (finished)
│   ├── lab.js                    # The lab: TODOs 2–12
│   ├── analysis.md               # Your comparison: TODO 13
│   └── compare/
│       ├── webgl.html, x3d.html  # Finished: read them
│       ├── three.html            # TODO 14
│       └── aframe.html           # TODO 15
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Configuración

1. Copia el starter en una carpeta nueva, `virtual-exhibit`, y súbela a Git con un commit. Añadirás contenido a esta carpeta durante toda la Fase 3.
2. Inicia tu servidor local, y abre `index.html`. Los controles están ahí, pero todavía no pasa nada, y la escena está vacía: eso es normal hasta el TODO 12.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; Paso 1: de qué está hecha una escena 3D (TODO 1) | Puedes nombrar las partes de una escena |
| 2 | Paso 2: renderizado (TODO 12) | La exhibición en pantalla |
| 3 | Paso 3: coordenadas (TODO 2) | La piedra se mueve en x, y y z |
| 4 | Paso 4: rotación y escala (TODOs 3–4) | La mesa gira; la olla crece |
| 5 | Paso 5: el grafo de escena (TODO 5) | Puedes explicar padres e hijos |
| 6 | Paso 5, continuación: `add` frente a `attach` | Sabes por qué saltó la piedra |
| 7 | Paso 6: cámaras (TODO 6) | Perspectiva y ortográfica |
| 8 | Paso 7: luces (TODOs 7–8) | Ambiental, sol y lámpara |
| 9 | Paso 8: materiales (TODO 9) | Basic, Lambert y Standard |
| 10 | Paso 9: describir la escena (TODO 10) | Una descripción que sigue cada cambio |
| 11 | Paso 9, continuación (TODO 11) | El grafo de escena como lista |
| 12 | Paso 10: WebGL puro | Sabes qué hacen los motores por ti |
| 13 | Paso 11: la exhibición en three.js (TODO 14) | Versión dos |
| 14 | Paso 12: la exhibición en A-Frame (TODO 15) | Versión tres |
| 15 | Paso 13: X3D, y medición | Cuatro versiones, medidas |
| 16 | Paso 14: investigar Babylon.js, PlayCanvas y WebGPU | Notas sobre otras tres |
| 17 | Paso 15: tu análisis (TODO 13) | Un análisis escrito, y una elección |
| 18 | [`tests/checklist.md`](tests/checklist.md) | Un laboratorio terminado |
| 19 | Un reto de extensión, luego **Cómo entregar tu trabajo** | La primera parte de la exhibición virtual |

### Paso 1: de qué está hecha una escena 3D (TODO 1)

Todo motor 3D, sea cual sea su nombre, tiene las mismas partes:

| Parte | Qué es | En el laboratorio |
| --- | --- | --- |
| **Escena** | El mundo: un árbol con todo lo que contiene | La sala |
| **Mesh** (malla) | Un objeto visible: una **geometría** (su forma, hecha de triángulos) más un **material** (cómo se ve su superficie) | Mesa, olla, piedra |
| **Luz** | De dónde viene la luz | Ambiental, sol, lámpara |
| **Cámara** | Desde dónde miras, y cuánto ves | Tu ojo |
| **Renderer** (renderizador) | Convierte todo esto en píxeles en un `<canvas>`, usando WebGL | La imagen |

**TODO 1:** lee la mitad superior de `starter/lab.js` (hasta las cámaras) y encuentra cada parte de la tabla anterior. No cambies nada todavía.

### Paso 2: renderizado (TODO 12)

`renderer.render(scene, camera)` dibuja una imagen: esta escena, desde esta cámara. Nada más.

La mayoría de los ejemplos 3D dibujan 60 imágenes por segundo, sin parar, en un **bucle de animación**. Este laboratorio no lo hace: nada se mueve por sí solo, así que solo dibuja cuando cambias un control. Eso se llama **renderizado bajo demanda**, y permite que el chip gráfico descanse, lo que ahorra batería en un teléfono. Escribe el TODO 12, recarga la página, y la exhibición aparece.

### Paso 3: coordenadas (TODO 2)

Las posiciones son tres números, **x, y, z**, medidos en **metros** desde el centro del mundo:

- **x** va de izquierda (negativo) a derecha (positivo).
- **y** va de abajo a **arriba**. El piso está en y = 0.
- **z** va alejándose de ti (negativo) a **acercándose a ti** (positivo).

Las líneas roja, verde y azul del laboratorio son los **ejes**: x es rojo, y es verde, z es azul (RGB = XYZ, una rima útil). Usa tamaños reales: una mesa mide unos 0.75 m de alto. En VR, los tamaños son reales, y una mesa de 10 m de alto se siente mal.

### Paso 4: rotación y escala (TODOs 3–4)

Una **transformación** es la posición, rotación y escala de un objeto. La rotación tiene una trampa:

- **three.js mide los ángulos en radianes.** Una vuelta completa es 2π (unos 6.28), y un ángulo recto es π / 2.
- **A-Frame y la mayoría de las personas usan grados.** Una vuelta completa es 360.

El control deslizante da grados, así que conviértelos: `THREE.MathUtils.degToRad(90)` da π / 2. Olvidar esto es el error más común en three.js: una mesa girada "90" radianes da más de catorce vueltas.

**La escala** multiplica el tamaño: 2 es el doble de grande, 0.5 es la mitad. `setScalar(2)` escala las tres direcciones a la vez.

### Paso 5: el grafo de escena (TODO 5)

Los objetos de una escena están anidados, como los elementos HTML. La mesa es un **Group** (grupo): un padre invisible que contiene su tapa, sus patas, la olla y la piedra. Cuando el padre se mueve, gira o crece, sus **hijos** lo acompañan: gira la mesa, y todo lo que está sobre ella también gira.

La posición de un hijo se mide **desde su padre**, no desde el centro del mundo. Pruébalo: en el TODO 5, primero usa `scene.add(stone)` para sacar la piedra de la mesa, luego gira la mesa y marca la casilla de nuevo. La piedra salta, porque los mismos números ahora significan "desde la mesa", no "desde la sala". `attach()`, en cambio, recalcula los números para que la piedra se quede exactamente donde está. Esa diferencia merece una sesión completa.

La lista **Grafo de escena** bajo la imagen muestra el árbol. También es el gemelo 2D de la escena: una persona que usa lector de pantalla puede explorar la estructura ahí.

### Paso 6: cámaras (TODO 6)

- Una **cámara de perspectiva** funciona como un ojo: las cosas lejanas se ven más pequeñas. Su **campo de visión** (FOV) es cuánto abarca, en grados (en three.js, el ángulo vertical). Un FOV pequeño es como hacer zoom; uno grande ve más, pero estira los bordes.
- Una **cámara ortográfica** mantiene todo del mismo tamaño a cualquier distancia, como un plano de arquitecto. Buena para mapas, diagramas y juegos 2D.

Después de cambiar la configuración de una cámara, llama a `updateProjectionMatrix()`, o nada cambiará.

### Paso 7: luces (TODOs 7–8)

| Luz | Es como | Sombras y forma |
| --- | --- | --- |
| **Ambiental** | Luz que rebota por todas partes | Ilumina cada lado por igual: ninguna forma se nota |
| **Direccional** | El sol: rayos paralelos desde lejos | Muestra la forma; lo que importa es la dirección |
| **Puntual** | Un foco o bombilla | Brilla en todas direcciones desde un punto, y se atenúa con la distancia |

Baja la luz ambiental a 0: los lados en sombra se ven negros. Súbela a 2: todo se ve plano. Una buena iluminación es un equilibrio, casi siempre un poco de luz ambiental y una o dos luces más.

### Paso 8: materiales (TODO 9)

Un material decide cómo responde una superficie a la luz:

- **Basic** ignora las luces por completo: un color plano. Barato de dibujar, y bueno para elementos de interfaz.
- **Lambert** es mate, como la arcilla o el papel.
- **Standard** está **basado en física** (PBR): **rugosidad** (0 es un pulido tipo espejo, 1 es como tiza) y **metalicidad** (0 es pintura o piedra, 1 es metal puro). La mayoría de los modelos 3D modernos, incluidos los archivos glTF, usan este tipo.

Prueba **Basic** con la lámpara encendida y apagada: nada cambia. Así es como sabes que un material ignora la luz.

### Paso 9: describir la escena (TODOs 10–11)

Una escena 3D es una imagen dibujada por JavaScript, y los lectores de pantalla no pueden verla. Por eso cada escena en XR Camp tiene una **descripción de la escena**: la misma información en palabras, construida **a partir de los mismos valores** que la escena, así nunca puede quedar desactualizada. En el laboratorio dice dónde está la piedra, cuánto ha girado la mesa, qué cámara estás usando y qué luces están encendidas.

Esto no es solo para estudiantes ciegas. Ayuda a cualquiera con un dispositivo lento donde el 3D no cargue, y te obliga a saber qué muestra realmente tu escena.

### Paso 10: WebGL puro

Abre `compare/webgl.html` y lee su código. **WebGL** es la API gráfica integrada del navegador, estandarizada por el Khronos Group. No sabe nada de mesas, cámaras ni luces: solo de **triángulos**, y de dos programas diminutos llamados **shaders** que se ejecutan en el chip gráfico. Uno posiciona las esquinas (el vertex shader); el otro colorea los píxeles (el fragment shader).

Cuarenta líneas, para un solo triángulo plano. Todo lo que hay en el laboratorio (luces, materiales, cámaras, el grafo de escena) son miles de líneas de código de motor que convierten tus ideas en triángulos y shaders. Para eso sirve un motor.

### Paso 11: la exhibición en three.js (TODO 14)

**three.js** es la biblioteca 3D de JavaScript más usada. Creas cada objeto tú misma, en código, y le pides al renderer que dibuje. Construye la exhibición en `compare/three.html` con la menor cantidad de líneas posible, con las mismas posiciones y colores que el laboratorio.

### Paso 12: la exhibición en A-Frame (TODO 15)

**A-Frame** está construido sobre three.js, pero escribes **HTML**: `<a-box>`, `<a-cylinder>`. Agrega una cámara y luces si tú no lo haces, además de un botón de VR, y mide la rotación en **grados**. Construye la misma exhibición en `compare/aframe.html`. ¿Cuál fue más rápido de escribir? ¿Cuál es más fácil de leer?

### Paso 13: X3D, y medición

Abre `compare/x3d.html`. **X3D** es un estándar ISO del Web3D Consortium, más antiguo que WebGL, y todavía se usa en modelos científicos, médicos y de patrimonio cultural. X3DOM es una biblioteca de JavaScript que muestra X3D en páginas web. Fíjate en el anidamiento: un `Transform` contiene un `Shape`, que contiene un `Appearance` y una geometría.

Ahora **mide**. Abre cada página con el panel **Network** (red), recarga, y anota el tamaño de la biblioteca que descarga (la columna "transferred"). Cuenta también las líneas de código de la escena. Pon ambos datos en tu análisis.

### Paso 14: investigar Babylon.js, PlayCanvas y WebGPU

Otras tres que deberías conocer. Lee la página de inicio y un ejemplo de cada una, y toma notas:

- **Babylon.js**: un motor completo de código abierto, respaldado por Microsoft, con física, un editor y muchas herramientas integradas.
- **PlayCanvas**: un motor de código abierto con un editor visual en línea, popular para juegos y visores de productos.
- **WebGPU**: no es un motor, sino la nueva API gráfica que sucede a WebGL, del W3C. Da acceso más directo al chip gráfico, incluso para computación general. three.js y Babylon.js ya pueden usarla.

### Paso 15: tu análisis (TODO 13)

Completa `analysis.md`: las dos tablas, lo que aprendiste, y qué tecnología usarás para la exhibición virtual, y por qué. No hay una única respuesta correcta: una buena respuesta nombra las ventajas y desventajas. Compara la tuya con [`completed/analysis.md`](completed/analysis.md) solo cuando hayas terminado.

## Explicación del código clave

**`THREE.MathUtils.degToRad(deg)`** convierte grados a radianes: `deg × π / 180`.

**`parent.attach(child)`** mueve `child` a un nuevo padre **sin moverlo en el mundo**. `parent.add(child)` conserva sus números, así que sí se mueve.

**`camera.updateProjectionMatrix()`** debe llamarse después de cualquier cambio en `fov`, `aspect`, o en los bordes de una cámara ortográfica.

**`renderer.setPixelRatio(Math.min(devicePixelRatio, 2))`** dibuja con nitidez en pantallas de alta densidad, pero nunca más del doble de píxeles: un teléfono con una proporción de 3 dibujaría, si no fuera por esto, más del doble de píxeles que con 2, con poca ganancia visible.

**`new ResizeObserver(…)`** vuelve a dibujar cuando cambia el tamaño de la caja del canvas, no solo cuando cambia la ventana.

**El mapa de importación** asigna `three` al archivo fijo de three.js, y asigna el propio `three.core.js` de three.js a su copia minificada (consulta [`docs/en/3d-assets-and-versions.md`](../../docs/en/3d-assets-and-versions.md), en inglés).

## Accesibilidad en 3D y XR

Toda esta lección es una lección de 3D, así que su accesibilidad está integrada en lugar de ser un momento aparte:

- Cada página tiene una **descripción de la escena**, y la del laboratorio cambia mientras trabajas.
- La **lista del grafo de escena** del laboratorio es un gemelo 2D de la estructura de la escena.
- Cada control es un control de formulario estándar, con una etiqueta visible: los controles deslizantes funcionan con las flechas del teclado.
- **Nada se mueve** a menos que cambies un control, así que no hay nada que pausar, ni mareo por movimiento. Cada cámara es fija.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| Cada escena tiene una descripción en texto que sigue sus cambios | 1.1.1 | La información de la imagen también está en palabras. |
| Cada control tiene una etiqueta visible, y su valor se muestra | 1.3.1, 3.3.2 | Todas saben qué hace cada control deslizante y en qué posición está. |
| Los controles funcionan con el teclado | 2.1.1 | Los controles deslizantes, menús y botones son controles estándar. |
| El botón de la lámpara muestra su estado con `aria-pressed` | 4.1.2 | Los lectores de pantalla dicen "presionado" o "no presionado". |
| Nada se mueve por sí solo | 2.2.2 | No hay movimiento que detener, ni nada que maree a nadie. |
| La página nunca se desplaza hacia los lados en un teléfono | 1.4.10 | La escena queda sobre los controles en pantallas angostas. |

## Consideraciones de rendimiento

La lección de rendimiento más importante de esta lección es la que tú misma mides: **las bibliotecas cuestan datos**. A-Frame descarga unos 350 KB comprimidos, three.js unos 190 KB, y WebGL puro nada. Con un plan de teléfono prepago, esa diferencia es dinero real. Elige la herramienta más pequeña que haga el trabajo, y cárgala solo en las páginas que la necesiten.

El renderizado bajo demanda es la segunda: una escena que dibuja 60 veces por segundo mantiene ocupado el chip gráfico y drena la batería, incluso cuando nada cambia. La lección de rendimiento de la Fase 3 (3.6) profundiza mucho más en esto.

## Errores comunes

| Error | Qué pasa | En vez de eso |
| --- | --- | --- |
| Dar grados a three.js | La mesa gira sin control | Usa `degToRad` |
| Dar radianes a A-Frame | La mesa apenas gira | A-Frame usa grados |
| Cambiar `fov` sin `updateProjectionMatrix()` | Nada cambia | Llámalo siempre después |
| Usar `add` cuando querías `attach` | El objeto salta | `attach` conserva su lugar en el mundo |
| Solo luz ambiental | Todo se ve plano, sin forma | Agrega una luz direccional |
| Solo una luz direccional | Los lados en sombra se ven negros | Agrega un poco de luz ambiental |
| Tamaños en unidades al azar | Todo se ve mal en VR | Usa metros, en tamaños reales |

## Solución de problemas

**El canvas está en blanco.** Falta el TODO 12, o hay un error en la consola. Verifica que abriste la página por `http://`.

**`Failed to resolve module specifier "three"`.** Falta el mapa de importación, o aparece después del script de módulo. Debe ir primero.

**La página de X3D está en blanco.** X3DOM solo dibuja cuando su script y su hoja de estilos cargan ambos: revisa el panel Network en busca de `x3dom.js` y `x3dom.css`.

**Todo está negro.** Ninguna luz llega a los objetos: revisa la intensidad de las luces, o usa un material Basic para probar.

**La escena de A-Frame llena la página, o muestra un botón de VR.** Mantén `embedded` y `xr-mode-ui="enabled: false"` en `<a-scene>`.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: agrega un cuarto objeto, y un control deslizante que cambie la luminosidad de su color.
2. **[Creativo](challenges/challenge-2.es.md)**: un objeto de tu propia cultura, construido con formas primitivas, con una descripción.
3. **[Explorador](challenges/challenge-3.es.md)**: construye la exhibición en Babylon.js o PlayCanvas, o renderiza la versión de three.js con WebGPU.

## Cómo entregar tu trabajo

1. Completa cada punto de [`tests/checklist.md`](tests/checklist.md).
2. Toma capturas de pantalla del laboratorio con la piedra fuera de la mesa y la mesa girada, y de tus cuatro páginas de comparación una junto a otra.
3. Guárdalas, junto con tu `analysis.md`, en tu diario de aprendizaje y tu portafolio. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. En tu diario, responde: ¿qué idea de esta lección te sorprendió, y cómo se la explicarías a una amiga usando solo objetos de una mesa real?

## Lecturas adicionales

- [MDN: WebGL API](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) (en inglés)
- [three.js manual: Scene graph](https://threejs.org/manual/#en/scenegraph) (en inglés)
- [three.js manual: Cameras](https://threejs.org/manual/#en/cameras) (en inglés)
- [A-Frame: Introduction](https://aframe.io/docs/1.8.0/introduction/) (en inglés)
- [MDN: WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API) (en inglés)

## Mujeres que conviene conocer

**Kelsey Gilbert** es ingeniera de gráficos en Mozilla. Ha sido editora de la especificación **WebGL 2.0** del Khronos Group, y copresidió (en 2023), y luego presidió (en 2024), el Grupo de Trabajo de GPU para la Web del W3C, que desarrolla **WebGPU**.

La página de WebGL puro que leíste en esta lección funciona igual en todos los navegadores porque personas como ella escriben la especificación, línea por línea, y logran que los fabricantes de navegadores se pongan de acuerdo. Dos de las tecnologías de tu tabla de comparación llevan su trabajo.

> **Nota editorial: verificar antes de publicar.** Los datos biográficos de las secciones «Mujeres que conviene conocer» deben verificarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

Tres organismos de estandarización aparecen en esta sola lección. **WebGL** es un estándar del Khronos Group, basado en OpenGL ES. **WebGPU**, y su lenguaje de shaders **WGSL**, son desarrollados por el Grupo de Trabajo de GPU para la Web del W3C. **X3D** es un estándar internacional, ISO/IEC 19775, mantenido por el Web3D Consortium. Bibliotecas como three.js y A-Frame no son estándares: son proyectos de código abierto construidos sobre ellos, por eso pueden cambiar más rápido, y por eso XR Camp fija sus versiones.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
