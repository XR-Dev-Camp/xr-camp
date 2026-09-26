# Fundamentos de three.js

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `web3d-developer` · **Lección:** `threejs-foundations-04` · **Tiempo:** unas 14 horas · 19 sesiones de 45 minutos · unas 5 semanas con 4 sesiones por semana

---

> Construye la edición en three.js de la exhibición: un renderer, una cámara que puedes orbitar, y un bucle de renderizado, construidos alrededor de la misma olla de barro, el aro de canasta tejida, y la piedra de jade del laboratorio de conceptos, sin nada que siga ejecutándose cuando nadie lo está viendo.

---

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Configurar un **WebGLRenderer**: antialiasing, espacio de color, mapeo de tonos, y una proporción de píxeles limitada para teléfonos.
2. Construir una **escena**, una **PerspectiveCamera**, y redimensionar ambas correctamente con un **ResizeObserver**.
3. Elegir entre un **bucle de renderizado** continuo (`renderer.setAnimationLoop`) y el **renderizado bajo demanda**, y explicar cuándo cada uno es la elección correcta.
4. Animar a la misma velocidad visible en cualquier pantalla, usando **`THREE.Timer`**, y explicar por qué `THREE.Clock` está obsoleto.
5. Agregar **OrbitControls**: amortiguación (damping), soporte de teclado, y límites de comodidad en la distancia y el ángulo de visión.
6. **Pausar** una animación, respetar el **movimiento reducido**, y detener el bucle de renderizado cuando la pestaña está oculta.
7. **Liberar (dispose)** geometrías, materiales y texturas, y demostrar con `renderer.info` que un botón "Reconstruir escena" no filtra memoria.
8. Dividir una aplicación de three.js en **módulos** con un solo trabajo cada uno: el motor, los objetos, la descripción, y la página.
9. Detectar el soporte de **WebGL 2**, y ofrecer una alternativa 2D que lleve la misma información.
10. Leer `renderer.info.render.calls` y explicar, en lenguaje simple, qué es una **llamada de dibujo** (draw call).

## Requisitos previos

- **Fundamentos de Web3D (3.1)**, en especial el grafo de escena, las cámaras, las luces y los materiales, y el renderizado bajo demanda.
- **Fundamentos de A-Frame y A-Frame avanzado (3.2-3.3)**: la misma exhibición virtual, en HTML. Esta lección construye la misma idea con la propia API de three.js.
- **Mi XR Camp**, la pequeña aplicación propia de la Fase 2 (mapa del curso, panel principal, planificador de sesiones): aquí continúa el mismo patrón de construir una sola cosa a lo largo de varias lecciones, con la exhibición virtual.

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Un navegador moderno con WebGL 2 | Cada página de esta lección | Gratis |
| VS Code y un servidor local | Los módulos y los mapas de importación necesitan `http://` | Gratis |
| El panel **Performance** o **Rendering** (rendimiento) del navegador | Observar los cuadros mientras la pestaña está oculta o la animación está en pausa | Gratis |

La biblioteca se carga desde `cdn.jsdelivr.net`. Si es lenta o está bloqueada donde vives, descarga los archivos fijos una vez donde sí funcionen, guárdalos junto a la página, y cambia las direcciones del mapa de importación a los archivos locales.

## Lo que vas a construir

La **edición en three.js** de la exhibición virtual que empezaste en 3.1 y volviste a construir en A-Frame en 3.2-3.3: la misma olla de barro, el aro de canasta tejida, y la piedra de jade, cada uno en su propio pedestal, construidos a partir de primitivas (sin archivos de modelo: glTF llega en 3.5). Esta vez tú escribes el motor, en cuatro módulos pequeños, y reutilizarás esta aplicación starter sin cambios en las lecciones 3.5 a 3.7.

La solución de referencia está en [`completed/`](completed/). El starter tiene la página y sus controles; tú escribes los cuatro módulos de JavaScript detrás de ellos: diecinueve TODOs.

## Guía de carpetas

```text
04-threejs-foundations/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html, styles.css    # The page and its controls (finished)
│   └── js/
│       ├── app.js                # The engine: TODOs 1-11
│       ├── exhibit.js            # The objects: TODOs 12-15
│       ├── describe.js           # The description: TODO 16
│       └── main.js               # Wiring the page: TODOs 17-19
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Configuración

1. Copia el starter en tu carpeta `virtual-exhibit`, junto con tu trabajo de 3.1-3.3, y súbelo a Git con un commit.
2. Inicia tu servidor local, y abre `index.html`. Los controles están ahí, pero la caja del canvas queda vacía hasta el TODO 1: eso es normal.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; Paso 1: el renderer (TODO 1) | Un canvas gris llena su caja |
| 2 | Paso 1, continuación: acceso por teclado y lector de pantalla (TODO 2) | El canvas puede recibir el foco del teclado |
| 3 | Paso 2: la escena, la cámara y las luces (TODO 3) | Aparece una sala iluminada y vacía |
| 4 | Paso 3: redimensionar (TODO 4) | El canvas cambia de tamaño sin estirarse |
| 5 | Paso 4: la olla de barro (TODO 12) | La olla está de pie sobre su pedestal |
| 6 | Paso 4, continuación: el aro de canasta y la piedra de jade (TODOs 13-14) | Los tres objetos están de pie sobre sus pedestales |
| 7 | Paso 5: OrbitControls (TODO 5) | Puedes arrastrar para orbitar la cámara |
| 8 | Paso 6: límites de comodidad y soporte de teclado (TODO 6) | Las flechas también orbitan, dentro de límites |
| 9 | Paso 7: el bucle de renderizado, y `THREE.Timer` (TODOs 7-8) | La piedra de jade gira suavemente |
| 10 | Paso 8: iniciar y detener el bucle (TODO 9) | Puedes explicar `setAnimationLoop` frente al renderizado bajo demanda |
| 11 | Paso 9: restablecer vista (TODO 10) | Restablecer vista devuelve la cámara a su lugar |
| 12 | Paso 10: la descripción de la escena (TODO 16) | `#scene-description` coincide con la exhibición |
| 13 | Paso 11: pausar, y movimiento reducido (TODO 18) | Pausar funciona, y el movimiento reducido inicia en pausa |
| 14 | Paso 12: girar a la izquierda/derecha, y la verificación de pestaña oculta (TODO 19) | Cada interacción tiene una ruta por teclado |
| 15 | Paso 13: detección de WebGL 2 y la alternativa 2D (TODO 17) | La lista de objetos siempre presente, y el mensaje de sin WebGL |
| 16 | Paso 14: liberación de memoria (TODO 15) | `disposeExhibit` libera geometrías y materiales |
| 17 | Paso 15: reconstruir, y el panel Stats (TODO 11) | Reconstruir escena demuestra que nada se filtra |
| 18 | [`tests/checklist.md`](tests/checklist.md) | Una aplicación starter terminada |
| 19 | Un reto de extensión, luego **Cómo entregar tu trabajo** | La edición en three.js de la exhibición, lista para 3.5 |

### Paso 1: el renderer (TODO 1)

Un `WebGLRenderer` convierte una escena en píxeles en un `<canvas>`. Tres configuraciones importan más allá de lo básico:

- **`antialias: true`** suaviza los bordes dentados, a un pequeño costo de rendimiento que vale la pena pagar en una escena tan pequeña.
- **`outputColorSpace`** usa por defecto `THREE.SRGBColorSpace` en esta versión de three.js: los monitores esperan color codificado en sRGB, pero las matemáticas de iluminación de three.js funcionan en espacio **lineal** (la luz se suma y se mezcla físicamente de forma directa; sRGB es una codificación comprimida que ahorra bits donde los ojos humanos son menos sensibles). El renderer convierte de vuelta a sRGB al final. Fijarlo explícitamente, aunque ya sea el valor predeterminado, hace visible la conversión en tu propio código en lugar de esconderla dentro de un valor que nadie lee.
- **`toneMapping`** comprime los valores más brillantes de una escena al rango que una pantalla puede mostrar, de la misma forma que la exposición de una cámara. El valor predeterminado, `NoToneMapping`, simplemente recorta a blanco plano cualquier cosa demasiado brillante. `ACESFilmicToneMapping` suaviza los brillos altos en su lugar, lo cual conviene a un material iluminado y basado en física, como el de la piedra de jade.

### Paso 1, continuación: acceso por teclado y lector de pantalla al canvas (TODO 2)

Un `<canvas>` no puede recibir el foco del teclado por defecto, así que `tabIndex = 0` le da uno, que el soporte de flechas del Paso 6 necesita. `role="img"` y un `aria-label` le dicen a la tecnología de asistencia que este canvas es una imagen, no un control interactivo: la descripción real es el elemento de texto debajo de él.

### Paso 2: la escena, la cámara y las luces (TODO 3)

Nada aquí es nuevo respecto a 3.1: una `Scene`, una `PerspectiveCamera`, una `AmbientLight`, y una `DirectionalLight`. La diferencia está en lo que miras: tres pedestales en fila, en lugar de una mesa.

### Paso 3: redimensionar (TODO 4)

`renderer.setSize(width, height, false)` cambia el tamaño del buffer de dibujo; el tercer argumento, `false`, le indica que deje en paz el tamaño CSS propio del elemento canvas, porque la hoja de estilos ya lo controla con `.canvas-box`. Después de cualquier cambio en `camera.aspect`, debes llamar a `camera.updateProjectionMatrix()`, o la imagen se queda estirada. Un `ResizeObserver` en el contenedor llama a esto cada vez que su caja cambia de tamaño, no solo cuando lo hace toda la ventana.

### Paso 4: los objetos de la exhibición (TODOs 12-14)

Los mismos tres objetos de 3.1 y 3.2-3.3, construidos a partir de primitivas, sin archivos de modelo (glTF llega en 3.5):

| Objeto | Geometría | Por qué este material |
| --- | --- | --- |
| Olla de barro | `CylinderGeometry`, más angosta arriba que en el medio | Alta rugosidad, sin metalicidad: el barro sin esmaltar es mate |
| Aro de canasta tejida | `TorusGeometry`, colocado de plano | Alta rugosidad: la fibra tejida dispersa la luz de forma desigual |
| Piedra de jade | `IcosahedronGeometry` | Rugosidad más baja, sin metalicidad: pulida, pero no un metal |

`exhibit.js` mantiene los datos de cada objeto (`ITEMS`) separados de las mallas construidas a partir de ellos, así `describe.js` puede construir oraciones desde los mismos datos, y nunca dice algo que la escena no muestre.

### Paso 5: OrbitControls (TODO 5)

`OrbitControls`, de `three/addons/controls/OrbitControls.js`, orbita la cámara alrededor de un punto `target` cuando arrastras. `enableDamping` hace que ese movimiento se detenga suavemente en lugar de frenar en seco en cuanto sueltas. La amortiguación solo funciona si `controls.update()` se ejecuta en cada cuadro, una razón más por la que esta lección necesita un bucle de renderizado en lugar de renderizado bajo demanda.

### Paso 6: límites de comodidad y soporte de teclado (TODO 6)

Dos tipos de límite mantienen la exhibición cómoda de observar (consulta [`docs/en/xr-accessibility.md`](../../docs/en/xr-accessibility.md), en inglés):

- **`minDistance` / `maxDistance`** evitan que la cámara se acerque de forma incómoda o se aleje demasiado.
- **`minPolarAngle` / `maxPolarAngle`**, en radianes, evitan que la cámara suba por encima de la exhibición o baje por debajo del piso.

`controls.listenToKeyEvents(renderer.domElement)` le da a las flechas del teclado una ruta hacia la órbita, una vez que el canvas tiene el foco (el Paso 1, continuación, le dio uno). Lee el código fuente de r186 antes de confiar en cualquier método de three.js: recibe el elemento en el que escuchar, y sus combinaciones de teclas predeterminadas son las flechas.

### Paso 7: el bucle de renderizado, y `THREE.Timer` (TODOs 7-8)

`THREE.Clock` está **obsoleto desde r183**; usa `THREE.Timer` en su lugar. Ambos miden el tiempo, pero `Timer` separa medir el tiempo (`update()`) de leerlo (`getDelta()`, `getElapsed()`), así que llamar a `getDelta()` dos veces en un mismo cuadro no da en silencio dos respuestas distintas. `timer.connect(document)` usa la Page Visibility API para que volver a una pestaña que estuvo oculta mucho tiempo no reporte un salto enorme de tiempo.

Multiplica el movimiento por `timer.getDelta()`, no por un número fijo, y se vuelve **independiente de la velocidad de cuadros**: la piedra de jade gira a la misma velocidad visible en una pantalla que dibuja 30 cuadros por segundo y en una que dibuja 120.

### Paso 8: iniciar y detener el bucle (TODO 9)

`renderer.setAnimationLoop(callback)` inicia un bucle de renderizado; `renderer.setAnimationLoop(null)` lo detiene por completo, liberando la GPU en lugar de simplemente omitir trabajo dentro del callback. Las aplicaciones siempre deberían iniciar y detener su bucle de esta forma, no con `requestAnimationFrame` directamente: esto también cubre las sesiones de WebXR automáticamente.

Esta exhibición mantiene su bucle ejecutándose continuamente, porque la amortiguación de `OrbitControls` necesita un cuadro para detenerse suavemente después de cada arrastre, incluso mientras la propia animación de la piedra de jade está en pausa. Compara esto con el laboratorio de conceptos de 3.1, que renderizaba **bajo demanda**, porque nada ahí se movía por sí solo y no se usaba amortiguación. El reto Explorador te pide combinar ambos: renderizar bajo demanda una vez que la cámara se haya asentado y la animación esté en pausa.

### Paso 9: restablecer vista (TODO 10)

Registra la posición inicial de la cámara y el objetivo inicial de los controles una sola vez, cuando se crea la aplicación. "Restablecer vista" los copia de vuelta con `Vector3.copy()`, y luego llama a `controls.update()` para que el cambio surta efecto de inmediato.

### Paso 10: la descripción de la escena (TODO 16)

La misma idea que en 3.1: una escena 3D es una imagen dibujada por JavaScript, y los lectores de pantalla no pueden verla, así que `#scene-description` lleva la misma información en palabras, construida a partir de los mismos datos `ITEMS` con los que se construyen las mallas. También necesita decir si la piedra de jade está girando en este momento, y cómo mirar alrededor, porque ambas cosas pueden cambiar mientras alguien está en la página.

### Paso 11: pausar, y movimiento reducido (TODO 18)

El estado `aria-pressed` del botón de Pausa, y su propio texto visible, siempre deben decir qué es verdad en este momento y qué hará presionarlo a continuación: "Pausar animación" cuando se está ejecutando, "Reanudar animación" una vez en pausa. Alguien cuyo sistema pida movimiento reducido nunca debería ver la animación empezar a moverse por sí sola: revisa `prefers-reduced-motion` una vez, temprano, e inicia ya en pausa si está activado.

### Paso 12: girar a la izquierda/derecha, y la verificación de pestaña oculta (TODO 19)

`controls.rotateLeft(angle)` orbita la cámara mediante programación, exactamente como si quien aprende hubiera arrastrado. Revisa el código fuente de r186 para conocer su convención de signos antes de decidir qué botón pasa un ángulo positivo y cuál uno negativo. `document.visibilitychange`, comprobando `document.hidden`, es la forma estándar de saber cuándo una pestaña no es visible: detén ahí el bucle de renderizado, y la batería de nadie se agota por una escena que nadie puede ver.

### Paso 13: detección de WebGL 2 y la alternativa 2D (TODO 17)

El `WebGLRenderer` de three.js solicita un contexto `webgl2` por defecto en esta versión. Detectar ese soporte **antes** de crear el renderer significa que un navegador sin él ve un mensaje claro en lugar de un fallo silencioso o un error de consola. La lista de objetos de la exhibición no solo se muestra en ese caso: siempre está en la página, así que la información de la exhibición nunca vive solo en la imagen (WCAG 1.3.1).

### Paso 14: liberación de memoria (TODO 15)

Los datos de triángulos de una geometría y el programa de shader compilado de un material viven en la memoria de la GPU, fuera del heap de JavaScript que administra el recolector de basura del navegador. Quitar una malla del grafo de escena no libera esa memoria: debes llamar tú misma a `.dispose()` en su geometría y su material (y en cualquier textura que un material tenga, una vez que 3.5 las agregue).

### Paso 15: reconstruir, y el panel Stats (TODO 11)

"Reconstruir escena" libera la exhibición actual y construye una nueva. `renderer.info.memory.geometries` y `.textures` cuentan lo que está actualmente cargado en la GPU: si la liberación funcionó, estos números vuelven a lo que eran antes del clic. Si suben un poco cada vez, algo no se liberó.

Estos conteos solo se actualizan una vez que una geometría realmente se ha dibujado, no desde el momento en que se crea, así que `rebuild()` renderiza un cuadro por sí misma antes de devolver el control: de lo contrario, un panel Stats que lea `renderer.info` inmediatamente después podría mostrar brevemente los números viejos, recién liberados, en lugar de los reales de la nueva exhibición.

Espera que `.textures` muestre **1**, no 0, aunque esta exhibición no cargue ningún archivo de imagen: three.js crea una pequeña textura interna de consulta la primera vez que renderiza cualquier `MeshStandardMaterial`, y la reutiliza para cada material basado en física después. No es tuya para liberar, y no es una fuga, siempre que se mantenga en 1. Lo que importa para demostrar la liberación es que ambos números se mantengan planos a través de reconstrucciones repetidas, no que alguno llegue a cero.

## Explicación del código clave

**`THREE.Timer`** reemplaza a `THREE.Clock`, obsoleto desde r183. Llama a `timer.update(time)` una vez por cuadro, antes de `timer.getDelta()`.

**`renderer.setAnimationLoop(callback)`** inicia un bucle de renderizado que también funciona dentro de una sesión de WebXR; `setAnimationLoop(null)` lo detiene por completo.

**`controls.listenToKeyEvents(domElement)`** le da a `OrbitControls` una ruta por teclado, usando las flechas por defecto, una vez que `domElement` tiene el foco.

**`controls.rotateLeft(angle)`** y **`controls.rotateUp(angle)`** orbitan la cámara un ángulo dado en radianes, exactamente como lo hace arrastrar.

**`camera.updateProjectionMatrix()`** debe llamarse después de cualquier cambio en `fov`, `aspect`, o los planos cercano/lejano.

**`renderer.setPixelRatio(Math.min(devicePixelRatio, 2))`** dibuja con nitidez en pantallas de alta densidad sin pedirle a la GPU que dibuje más del doble de los píxeles de los que una pantalla realmente se beneficia.

**`renderer.info.render.calls`** y **`.triangles`** cuentan lo que costó el cuadro renderizado más reciente; **`renderer.info.memory.geometries`** y **`.textures`** cuentan lo que está actualmente cargado, que es cómo se demuestra que la liberación funcionó.

**El mapa de importación** asigna `three` al build fijo, asigna el propio `three.core.js` de three.js a su copia minificada, y asigna `three/addons/` a la carpeta `examples/jsm/` donde vive `OrbitControls.js` (consulta [`docs/en/3d-assets-and-versions.md`](../../docs/en/3d-assets-and-versions.md), en inglés).

## Accesibilidad en 3D y XR

- La escena tiene una descripción en texto (`#scene-description`) que sigue cada cambio: qué objetos hay, si la animación se está ejecutando, y cómo mirar alrededor.
- Cada interacción 3D tiene una ruta por teclado: Tab alcanza el canvas, las flechas lo orbitan, y "Girar a la izquierda", "Girar a la derecha", "Restablecer vista", "Pausar animación" y "Reconstruir escena" son todos botones normales.
- Se respeta el movimiento reducido: la exhibición carga ya en pausa cuando el sistema operativo lo pide, y el botón de Pausa siempre funciona sin importar eso.
- La información de la exhibición también vive en una lista HTML siempre presente, así que funciona sin WebGL 2 disponible, en un dispositivo lento, o para alguien que usa lector de pantalla y se salta el canvas por completo.
- La cámara nunca se mueve a menos que una persona la mueva: sin trayectoria automática, sin autorrotación, sin sacudidas de cámara. Solo la piedra de jade se anima, y solo cuando no está en pausa.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| La escena tiene una descripción en texto que sigue sus cambios | 1.1.1 | La información de la imagen también está en palabras. |
| Cada interacción 3D también funciona con el teclado | 2.1.1 | Orbitar, girar, restablecer, pausar y reconstruir son alcanzables sin un mouse. |
| El botón de Pausa muestra su estado con `aria-pressed`, y su texto nombra qué pasa después | 4.1.2 | Los lectores de pantalla dicen "presionado" o "no presionado"; las personas videntes leen el mismo dato en la etiqueta. |
| Se respeta el movimiento reducido, y existe un control de pausa visible de todos modos | 2.2.2, 2.3.3 | A nadie se le muestra movimiento que no pidió, y cualquiera puede detener lo que queda. |
| El contenido de la exhibición existe como HTML, no solo dentro del canvas | 1.3.1 | La información no se pierde cuando WebGL no está disponible. |
| La página nunca se desplaza hacia los lados en un teléfono | 1.4.10 | La exhibición queda sobre los controles en pantallas angostas. |

## Consideraciones de rendimiento

Tres ideas continúan desde 3.1 y van más allá aquí. **Una proporción de píxeles limitada** evita pedirle a la GPU de un teléfono que dibuje píxeles que nadie puede distinguir. **Detener el bucle de renderizado cuando la pestaña está oculta** (`setAnimationLoop(null)` en `visibilitychange`) significa que una pestaña en segundo plano no dibuja nada en absoluto, en lugar de 60 cuadros desperdiciados por segundo. **La liberación de memoria** importa en el momento en que una aplicación permite que quien aprende reconstruya o reemplace lo que hay en pantalla: sin ella, la memoria sube un poco en cada reconstrucción hasta que la pestaña eventualmente se vuelve lenta o falla. `renderer.info` hace visible todo esto en lugar de invisible: las llamadas de dibujo, los triángulos, y los conteos de memoria del panel Stats son los mismos números de los que partiría una revisión de rendimiento real. La lección de rendimiento de la Fase 3 (3.6) profundiza mucho más en reducir las llamadas de dibujo con geometría fusionada e instanciado.

## Errores comunes

| Error | Qué pasa | En vez de eso |
| --- | --- | --- |
| Cambiar `camera.aspect` sin `updateProjectionMatrix()` | La imagen se ve estirada después de un cambio de tamaño | Llámalo siempre después |
| Usar `THREE.Clock` | Una advertencia en la consola, y código que no seguirá funcionando en el futuro | `THREE.Timer`, obsoleto desde r183 |
| Olvidar `controls.update()` en el bucle de renderizado | La amortiguación e inercia nunca se asientan, o nunca se mueven | Llámalo una vez en cada cuadro, sin condición |
| Liberar la geometría de una malla pero no su material (o al revés) | La memoria sigue subiendo en cada reconstrucción | Libera ambos, y cualquier textura que tenga un material |
| Un número fijo sumado a la rotación en cada cuadro | El objeto gira más rápido en una pantalla rápida, más lento en una lenta | Multiplica por `timer.getDelta()` |
| `listenToKeyEvents` en un elemento que no puede recibir el foco | Las flechas nunca hacen nada | Dale al elemento `tabIndex = 0` primero |

## Solución de problemas

**La caja del canvas queda vacía.** Falta el TODO 1, o hay un error en la Consola. Verifica que abriste la página por `http://`.

**`Failed to resolve module specifier "three"`.** Falta el mapa de importación, o aparece después de un script de módulo. Debe ir primero en `<head>`.

**Arrastrar funciona, pero las flechas no hacen nada.** El canvas necesita `tabIndex = 0` y necesita realmente tener el foco (haz clic en él, o presiona Tab) antes de que `listenToKeyEvents` escuche algo.

**Falta la piedra de jade, o la consola muestra un error al leer `.name` de `undefined`.** Una función `build...()` en `exhibit.js` (TODOs 12-14) todavía no ha devuelto una malla: esto es normal en el starter hasta que la termines.

**El conteo de Geometries o Textures sigue subiendo después de Reconstruir escena.** Algo en `disposeExhibit()` no está liberando cada geometría o material; revisa que se ejecute en cada objeto que visita el `traverse()` del grupo, no solo en las mallas del nivel superior.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: agrega un cuarto objeto a la exhibición, en su propio pedestal.
2. **[Creativo](challenges/challenge-2.es.md)**: cambia por objetos de tu propia cultura o comunidad, descritos en tu propio idioma.
3. **[Explorador](challenges/challenge-3.es.md)**: vuelve a agregar el renderizado bajo demanda, para cuando la animación está en pausa y la cámara se ha asentado.

## Cómo entregar tu trabajo

1. Completa cada punto de [`tests/checklist.md`](tests/checklist.md).
2. Toma capturas de la exhibición desde su vista inicial, y de nuevo después de usar "Girar a la izquierda" o las flechas.
3. Guárdalas, junto con este proyecto, en tu diario de aprendizaje y tu portafolio. Cuando abra la comunidad de XR Camp, compártelas ahí.
4. En tu diario, responde: ¿cuál es la diferencia entre un bucle de renderizado y el renderizado bajo demanda, y cuál elegirías para una escena donde absolutamente nada se mueve?

## Lecturas adicionales

- [three.js manual: How to update things](https://threejs.org/manual/#en/how-to-update-things) (en inglés)
- [three.js docs: `Timer`](https://threejs.org/docs/#examples/en/misc/Timer) (en inglés)
- [three.js docs: `OrbitControls`](https://threejs.org/docs/#examples/en/controls/OrbitControls) (en inglés)
- [MDN: Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) (en inglés)
- [MDN: Import maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap) (en inglés)

## Mujeres que conviene conocer

**Lisa Su 苏姿丰** nació en Tainán y se mudó a Estados Unidos a los tres años. Al inicio de su carrera, como ingeniera de semiconductores, ayudó a introducir las interconexiones de cobre en los chips de IBM. Ha sido la directora ejecutiva de AMD desde octubre de 2014, y su presidenta desde 2022, y en 2021 se convirtió en la primera mujer en recibir la medalla IEEE Robert N. Noyce.

Cada cuadro que dibuja el bucle de renderizado de esta lección lo dibuja una GPU, y AMD, la empresa que ella dirige, es una de las pocas empresas en el mundo que las diseña. El callback de `renderer.setAnimationLoop` que escribiste en esta lección es, en el fondo, una solicitud a hardware que personas como ella construyen y dirigen.

> **Nota editorial: verificar antes de publicar.** Los datos biográficos de las secciones «Mujeres que conviene conocer» deben verificarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

**WebGL 2**, la API gráfica que usa por defecto el renderer de esta lección, es un estándar del Khronos Group, basado en OpenGL ES 3.0. Los **mapas de importación**, el bloque `<script type="importmap">` en el que se apoya cada lección de three.js, son parte del WHATWG HTML Standard: permiten que una página escriba especificadores cortos como `"three"` en lugar de una URL larga y con versión de un CDN, y cada módulo que importa `"three"` se resuelve exactamente al mismo archivo fijo. Ni three.js ni su carpeta `addons/` son en sí un estándar: son un proyecto de código abierto construido sobre estos estándares, por eso XR Camp fija su versión.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
