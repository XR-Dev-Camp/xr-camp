# Interacción, recursos y animación en three.js

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `web3d-developer` · **Lección:** `threejs-interaction-assets-and-animation-05` · **Tiempo:** unas 16 horas · 22 sesiones de 45 minutos · unas 6 semanas con 4 sesiones por semana

---

> Construye el explorador de modelos de la exhibición: carga dos modelos glTF reales, con licencia CC, con `GLTFLoader`, junto a los tres objetos primitivos de 3.4, con una barra de carga, selección por raycasting también alcanzable desde el teclado, la animación propia de cada modelo, espacios de color correctos, y atribución en la página.

---

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Cargar un archivo `.glb` con **`GLTFLoader`**, y seguir su progreso con un **`LoadingManager`**.
2. Manejar un modelo que falla al cargar, sin romper el resto de la escena, usando `Promise.allSettled`.
3. Ajustar un modelo de tamaño desconocido a un pedestal midiéndolo con **`THREE.Box3`**, en lugar de adivinar un número de escala.
4. Explicar por qué una textura de color (color base, emisiva) es **sRGB** y una textura de datos (normal, rugosidad/metalicidad) es **lineal**, y dónde `GLTFLoader` ya lo configura correctamente.
5. Elegir un objeto con un puntero usando **`THREE.Raycaster`**, y darle a esa misma acción una ruta por teclado.
6. Reproducir la animación propia de un modelo con **`AnimationMixer`** y **`AnimationClip`**, y pausarla exactamente de la misma forma en que este curso ya pausa todo lo demás.
7. Leer el archivo de licencia de un modelo y escribir una atribución precisa en la página, junto con un `ATTRIBUTION.md` del repositorio.
8. Reconocer cuándo una textura o geometría se **comparte** entre varias mallas o materiales en un mismo archivo glTF, y liberarla exactamente una vez.

## Requisitos previos

- **Fundamentos de three.js (3.4)**: el starter de este proyecto es la aplicación terminada de 3.4, sin cambios en su renderer, cámara, controles, y bucle de renderizado.
- **Fundamentos de Web3D (3.1)** y **Fundamentos de A-Frame y A-Frame avanzado (3.2-3.3)**: la misma exhibición, que ahora gana los dos modelos reales que esas lecciones dejaron para después.

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Un navegador moderno con WebGL 2 | Cada página de esta lección | Gratis |
| VS Code y un servidor local | Los módulos, los mapas de importación, y `fetch` necesitan `http://` | Gratis |
| El panel **Network** (red) del navegador | Observar cómo cargan los dos archivos `.glb`, y simular una conexión lenta | Gratis |

La biblioteca y ambos modelos se cargan desde `cdn.jsdelivr.net` y la propia carpeta `assets/` de este proyecto. Si el CDN es lento o está bloqueado donde vives, descarga los archivos fijos una vez donde sí funcionen, guárdalos junto a la página, y cambia las direcciones del mapa de importación a los archivos locales; los dos archivos `.glb` ya son locales, así que no necesitan cambio.

## Lo que vas a construir

La exhibición gana dos objetos nuevos, en dos pedestales nuevos: una **figura de zorro** y un **camión de leche Cesium**, ambos modelos glTF reales, con licencia CC, de la propia biblioteca de recursos de ejemplo del Khronos Group, cargados con `GLTFLoader`. Haz clic o toca cualquiera de los cinco objetos (los tres primitivos de 3.4, más estos dos) para seleccionarlo, o usa un botón Seleccionar; cada modelo reproduce su propia animación integrada en cuanto termina de cargar, y una barra de carga y un mensaje de error en lenguaje simple cubren el tiempo antes de eso.

La solución de referencia está en [`completed/`](completed/). El starter es la aplicación terminada de 3.4, con su renderer, cámara, controles, y bucle de renderizado ya funcionando; tú la extiendes con doce TODOs.

## Guía de carpetas

```text
05-threejs-interaction-assets-and-animation/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html, styles.css    # The page and its controls (finished)
│   └── js/
│       ├── loader.js              # LoadingManager and GLTFLoader: TODO 1
│       ├── exhibit.js             # Fitting, colour spaces, loading: TODOs 2-4
│       ├── app.js                 # Picking, selection, animation: TODOs 5-7
│       ├── describe.js            # The description: TODO 8
│       └── main.js                # Wiring the page: TODOs 9-12
├── completed/            # Reference solution: open this last
├── challenges/           # Three challenges: Foundation is required
├── tests/checklist.md    # Self-review before you submit
├── assets/               # Fox.glb and CesiumMilkTruck.glb
└── screenshots/
```

## Configuración

1. Copia el starter en tu carpeta `virtual-exhibit`, junto con tu trabajo de 3.1-3.4, y súbelo a Git con un commit.
2. Revisa que `assets/` ya tenga `Fox.glb` y `CesiumMilkTruck.glb`: el `ATTRIBUTION.md` de este proyecto indica exactamente de dónde vienen.
3. Inicia tu servidor local, y abre `index.html`. Los tres primitivos y sus pedestales aparecen de inmediato, exactamente como los dejó 3.4; los dos pedestales de modelos se quedan vacíos (un marcador de posición atenuado) hasta que completes los TODOs de abajo.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; lee las nuevas entradas de `ITEMS` en `js/exhibit.js` y `loader.js` | Puedes explicar para qué sirve cada campo nuevo (`file`, `credit`, `licenseUrl`) |
| 2 | Paso 1: el LoadingManager y GLTFLoader (TODO 1) | `createManager()` informa progreso y errores |
| 3 | Paso 2: ajustar un modelo a su pedestal (TODO 2) | Puedes explicar por qué un número de escala fijo estaría mal |
| 4 | Paso 3: espacios de color (TODO 3) | Puedes nombrar qué texturas glTF son sRGB y cuáles son lineales |
| 5 | Paso 4: cargar ambos modelos (TODO 4), parte 1 | Un archivo `.glb` se descarga, visible en el panel Network |
| 6 | Paso 4, continuación: `Promise.allSettled` y los clips de animación | Un modelo aparece en su pedestal, reproduciendo su propia animación |
| 7 | Paso 5: raycasting (TODO 5) | Hacer clic en un objeto registra su id en la consola |
| 8 | Paso 6: resaltar la selección (TODO 6) | El objeto en el que se hizo clic se tiñe visiblemente |
| 9 | Paso 7: animar cada modelo cargado (TODO 7) | Ambos modelos reproducen su propia animación a la vez |
| 10 | Paso 8: la descripción de la escena (TODO 8) | `#scene-description` nombra los estados de carga, cargado, y seleccionado |
| 11 | Paso 9: la barra de carga (TODO 9) | Una barra de progreso se llena mientras un modelo se descarga |
| 12 | Paso 10: atribución en la página (TODO 10) | El crédito y el enlace de licencia de cada modelo aparecen en la página |
| 13 | Paso 11: seleccionar un objeto, y elegir uno en el canvas (TODO 11), parte 1 | Un botón Seleccionar actualiza `#selection-info` |
| 14 | Paso 11, continuación: el manejador de clic del canvas | Hacer clic en un modelo lo selecciona, exactamente igual que su botón Seleccionar |
| 15 | Paso 12: recargar (TODO 12) | Recargar exhibición libera y vuelve a cargar ambos modelos |
| 16 | Probar con una conexión limitada (panel Network) | La barra de carga y el mensaje de error funcionan como se espera |
| 17 | Probar cada interacción solo con el teclado | Tab, las flechas, y cada botón alcanzan cada función |
| 18 | Probar con movimiento reducido activado | Ambos modelos cargan ya en pausa |
| 19 | Revisar los archivos `LICENSE.md` de ambos modelos contra `ATTRIBUTION.md` | Cada crédito y enlace de licencia es exacto |
| 20 | [`tests/checklist.md`](tests/checklist.md) | Una aplicación starter terminada |
| 21 | Un reto de extensión | Tu propia extensión del explorador de modelos |
| 22 | **Cómo entregar tu trabajo** | El explorador de modelos de la exhibición, listo para 3.6 |

### Paso 1: el LoadingManager y GLTFLoader (TODO 1)

Un `THREE.LoadingManager` sigue cada solicitud hecha a través de los loaders construidos con él: el propio `GLTFLoader`, más las solicitudes separadas de `.bin` e imágenes que disparan las texturas de cada archivo `.glb`. `manager.onProgress(url, loaded, total)` se dispara en cada una de ellas, así que un solo manager, compartido entre ambos modelos, informa un progreso **combinado** sin que el código de esta lección tenga que sumar dos números por su cuenta. `manager.onError(url)` se dispara si alguna falla.

### Paso 2: ajustar un modelo a su pedestal (TODO 2)

Un modelo exportado por una artista distinta, en una herramienta distinta, llega en las unidades que ella haya usado: metros, centímetros, o una unidad arbitraria de motor de videojuegos. Escribir un número de escala fijo (`model.scale.setScalar(0.03)`, adivinado a ojo) estaría mal para algunos modelos y necesitaría volver a adivinarse para cada uno nuevo. `THREE.Box3().setFromObject(model)` mide la caja delimitadora real de un modelo en las unidades en que haya llegado; escalarlo para que su altura coincida con un objetivo fijo, y luego medir de nuevo y leer el `min.y` de la nueva caja, coloca el punto más bajo real de cualquier modelo exactamente sobre su pedestal, sin importar las unidades de su autor.

### Paso 3: espacios de color (TODO 3)

El **mapa de color base** y el **mapa emisivo** de un material guardan color de la misma forma en que lo hace una fotografía: una artista miró la imagen y se veía bien, codificada en **sRGB**, que dedica más de su rango numérico a los tonos oscuros a los que los ojos humanos son más sensibles. Un **mapa normal** o un **mapa de metalicidad/rugosidad** guarda números, no color (una dirección, o un porcentaje), y debe mantenerse **lineal**, o esos números se aclararían de forma incorrecta con la misma curva que hace que una fotografía se vea bien. `GLTFLoader` ya configura `texture.colorSpace` correctamente para cada textura que crea, así que `ensureColorSpaces()` en este proyecto es una red de seguridad que lo confirma, no una corrección de algo roto.

### Paso 4: cargar ambos modelos (TODO 4)

`Promise.allSettled`, no `Promise.all`, es el punto central aquí: `Promise.all` se rechaza en el instante en que cualquier promesa lo hace, lo que significaría que la red bloqueada de una estudiante, o una ruta de archivo incorrecta, tumbaría toda la exhibición. `allSettled` espera a que cada promesa se resuelva o se rechace, y deja que este proyecto maneje cada una por su cuenta: un zorro funcionando junto al mensaje de error en lenguaje simple de un camión de leche, uno al lado del otro.

Una vez que llega el grafo de escena de un modelo, `gltf.animations` es un arreglo de objetos `THREE.AnimationClip`: 0, 1, o más, según lo que haya creado la artista. Los dos modelos de este proyecto traen cada uno un clip que se reproduce en bucle; un modelo con varios (el archivo real `Fox.glb`, no el uso que le da este proyecto, trae tres: Survey, Walk, y Run) necesitaría código que decida cuál reproducir, ya que un solo esqueleto por lo general no puede reproducir dos a la vez.

### Paso 5: raycasting (TODO 5)

`THREE.Raycaster` lanza una línea invisible desde la cámara, a través de un punto en la pantalla, hacia la escena, e informa todo lo que atraviesa, lo más cercano primero. Ese punto debe estar en **coordenadas de dispositivo normalizadas** (NDC): de -1 a 1 en todo el canvas, con la y invertida, porque las coordenadas de pantalla crecen hacia abajo y las NDC crecen hacia arriba. Obtener esto a partir de un evento de puntero significa restar primero la posición propia del canvas en la pantalla (`getBoundingClientRect()`), no solo la de la ventana: un canvas que no está pegado a los bordes del navegador, de lo contrario, elegiría el punto equivocado.

### Paso 6: resaltar la selección (TODO 6)

Un solo objeto primitivo tiene una malla y un material; un modelo glTF puede tener varios de cada uno. Seleccionar "el camión de leche" en realidad significa teñir cada material de cada malla bajo su objeto raíz, que es exactamente para lo que sirve `object3D.traverse()`. El color `emissive` original de cada material debe recordarse antes de sobrescribirlo, o restaurarlo después no tendría a qué volver.

### Paso 7: animar cada modelo cargado (TODO 7)

`mixer.update(delta)` debe ejecutarse en cada cuadro para que un `AnimationMixer` avance, el mismo requisito que tiene `controls.update()` para la amortiguación de `OrbitControls`. Omitir esa llamada mientras `animating` es falso (no llamarla con un delta de cero) es lo que congela un modelo exactamente donde estaba, tal como ya funcionaba la rotación de la piedra de jade de este proyecto en 3.4.

### Paso 8: la descripción de la escena (TODO 8)

Una escena con dos cosas cargando, y posiblemente un quinto objeto seleccionado, tiene más estados que describir de los que tenían los tres primitivos estáticos de 3.4. La descripción debe decir, para cada modelo, si todavía está cargando, si falló, o si está listo, porque alguien que usa lector de pantalla no tiene una barra de progreso a la que echar un vistazo.

### Paso 9: la barra de carga (TODO 9)

`<progress>` es un elemento HTML nativo con semántica de accesibilidad integrada; fijar sus atributos `value` y `max` basta para que la tecnología de asistencia anuncie el progreso en porcentaje, sin necesitar ningún ARIA. El texto de carga a su lado, en una región dinámica con `role="status"`, anuncia la misma información en palabras, para alguien cuyo lector de pantalla no muestra los valores de `<progress>` de la misma forma en todos los navegadores.

### Paso 10: atribución en la página (TODO 10)

Un `ATTRIBUTION.md` a nivel de repositorio es necesario pero no suficiente: alguien que solo abre la página no tiene razón para ir a buscar un archivo junto a ella. Construir el panel de atribución a partir de los mismos datos `ITEMS` que lee la escena significa que la línea de crédito, el enlace de licencia, y el enlace de origen nunca pueden decir algo distinto de lo que dice `ATTRIBUTION.md`, porque son las mismas palabras, en un solo lugar.

### Paso 11: seleccionar un objeto, y elegir uno en el canvas (TODO 11)

Un botón Seleccionar y un clic en el canvas terminan llamando a la misma función `selectItem(id)`: la interacción de puntero (raycasting) y su equivalente accesible por teclado (un botón) deben producir un resultado idéntico, o uno de los dos es un ciudadano de segunda clase. Un clic que no acierta en ningún objeto (el fondo, un pedazo vacío del piso) se ignora deliberadamente en lugar de tratarse como "no seleccionar nada": un pequeño desliz del puntero no debería deshacer una elección que alguien hizo a propósito.

### Paso 12: recargar (TODO 12)

"Recargar exhibición" libera cada malla, material y textura que hay actualmente en la escena (los tres primitivos que 3.4 ya demostró, y ahora también la geometría y las texturas propias de los dos modelos) y empieza a cargar desde cero. Observa el conteo de Geometries en el panel Stats: vuelve al mismo número cada vez, que es la prueba más fuerte que este proyecto puede ofrecer de que nada se acumula en silencio en la memoria de la GPU mientras alguien explora.

## Explicación del código clave

**`new THREE.LoadingManager()`**, pasado al constructor de un loader, informa progreso y errores combinados de cada solicitud que hace ese loader (y cualquier otro loader construido con el mismo manager).

**`new THREE.Box3().setFromObject(object3D)`** calcula la caja delimitadora alineada a los ejes de un objeto en el espacio del mundo; `.getSize()` y `.getCenter()` leen un `Vector3` de ella, y `.min` / `.max` leen sus esquinas directamente.

**`texture.colorSpace`** es `THREE.SRGBColorSpace` para una textura de color (color base, emisiva) y `THREE.NoColorSpace` para una textura de datos (normal, rugosidad/metalicidad). `GLTFLoader` lo configura correctamente al cargar.

**`raycaster.setFromCamera(ndc, camera)`** y luego **`raycaster.intersectObjects(objects, true)`** devuelven cada objeto que atraviesa un rayo a través de un punto de la pantalla, el más cercano primero; el `true` también busca en los descendientes.

**`new THREE.AnimationMixer(root)`**, **`mixer.clipAction(clip)`**, y **`action.play()`** reproducen un `AnimationClip` sobre un objeto; `mixer.update(delta)` debe ejecutarse en cada cuadro mientras se reproduce.

**`Promise.allSettled(promises)`** espera a que cada promesa se resuelva, con éxito o no, a diferencia de `Promise.all`, que se rechaza en cuanto la primera lo hace.

## Accesibilidad en 3D y XR

- Cada interacción 3D tiene una ruta por teclado: Tab alcanza el canvas y los botones Seleccionar; las flechas lo orbitan; hacer clic o tocar un objeto en el canvas y presionar su botón Seleccionar hacen exactamente lo mismo.
- La descripción de la escena (`#scene-description`) sigue cada cambio: qué modelos han cargado, cuáles fallaron y por qué, qué objeto está seleccionado, y si algo se está animando.
- Se respeta el movimiento reducido: tanto la rotación de la piedra de jade como la animación propia de cada modelo cargado inician ya en pausa cuando el sistema operativo lo pide.
- La lista de la exhibición, y el panel de atribución, existen como HTML, así que la información de la exhibición y sus licencias nunca están disponibles solo dentro del canvas.
- La cámara nunca se mueve a menos que una persona la mueva, y la animación de un modelo es contenido de su propia autora (un ciclo de caminata, un bucle de manejo), nunca algo que este proyecto haya agregado.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| Seleccionar un objeto en el canvas también funciona desde un botón Seleccionar | 2.1.1 | El raycasting es por defecto una interacción exclusiva de puntero; el botón es su ruta por teclado. |
| El porcentaje de la barra de carga también se anuncia como texto | 4.1.2, 1.1.1 | La semántica accesible de `<progress>` varía según la tecnología de asistencia; el texto a su lado es exacto y universal. |
| Un modelo que falla muestra un mensaje en lenguaje simple, no un pedestal vacío | 1.1.1 | Un fallo silencioso no le da ninguna información a alguien que usa lector de pantalla, ni a nadie que mire un espacio vacío. |
| El movimiento reducido se respeta para la piedra de jade y para cada modelo cargado | 2.2.2 | A nadie se le muestra movimiento que no pidió, incluido movimiento que este proyecto no creó por sí mismo. |
| El crédito y la licencia de cada modelo son visibles en la página, no solo en un archivo del repositorio | Buena práctica | Alguien que solo abre la página igual puede ver qué está mirando, y bajo qué licencia. |
| La página nunca se desplaza hacia los lados en un teléfono | 1.4.10 | La exhibición queda sobre los controles en pantallas angostas. |

## Consideraciones de rendimiento

Ambos modelos se mantienen muy por debajo del límite de 5 MB por modelo de este proyecto (163 KB y 370 KB), porque los propios recursos de ejemplo del Khronos Group ya están razonablemente optimizados; 3.6 profundiza mucho más en comprimir lo que podrían necesitar los modelos propios, más grandes, de una estudiante. Cargar dos archivos pequeños todavía tiene un costo real y visible en una conexión lenta, por eso este proyecto muestra una barra de carga en lugar de una espera silenciosa. `Promise.allSettled` significa que un archivo lento o fallido nunca bloquea que el otro aparezca. Liberar cada geometría, material y textura en "Recargar exhibición" importa más aquí de lo que importaba en 3.4: una textura real, a diferencia del color plano de un primitivo, puede ser una cantidad importante de megabytes de memoria de GPU, y dejar que se acumule en recargas repetidas eventualmente ralentizaría la página o haría fallar la pestaña.

## Errores comunes

| Error | Qué pasa | En vez de eso |
| --- | --- | --- |
| Adivinar un número de escala fijo para un modelo | Queda cómicamente enorme, diminuto, o flotando sobre su pedestal | Mídelo con `THREE.Box3` y escala a partir de eso |
| Usar `Promise.all` para dos cargas de modelo independientes | Un modelo que falla bloquea que el otro aparezca | `Promise.allSettled`, manejado por objeto |
| Convertir las coordenadas NDC desde `event.clientX` y el tamaño de la ventana, no la propia caja del canvas | El raycasting elige el objeto equivocado cuando el canvas no está pegado a los bordes de la ventana | Resta el propio `left`/`top` de `getBoundingClientRect()` y divide por su propio `width`/`height` |
| Olvidar `mixer.update(delta)` en el bucle de renderizado | La animación de un modelo nunca avanza más allá de su primer cuadro | Llámalo en cada cuadro mientras el modelo del mixer se está animando |
| Liberar una textura compartida una vez por cada malla que la usa, sin revisar si ya se liberó | Ningún error visible, pero trabajo desperdiciado, y una trampa para código que asume una sola llamada de liberación por recurso | Registra los recursos ya liberados en un `Set` por `uuid` |
| Tratar un botón Seleccionar como una versión menor de hacer clic en el canvas | La ruta por teclado se queda atrás en silencio a medida que cambian los modelos | Enruta ambos a través de exactamente la misma función `selectItem(id)` |

## Solución de problemas

**El pedestal de un modelo se queda como una forma atenuada y vacía.** Revisa el panel Network en busca de un 404 en su archivo `.glb`: las entradas de `ITEMS` en `exhibit.js` usan una ruta relativa a `index.html` (`../assets/Fox.glb`), que difiere entre `starter/` y `completed/` solo en que ambos ya apuntan correctamente un nivel arriba. Si la ruta es correcta, revisa la Consola en busca de un error de análisis en su lugar.

**El modelo aparece, pero absurdamente grande o diminuto, o medio enterrado en su pedestal.** El TODO 2 (`fitAndPlaceModel`) falta, está incompleto, o mide la caja antes de escalar en lugar de después. Recuerda: la segunda medición de `Box3`, después de escalar, es cuyos números realmente usas para posicionarlo.

**Hacer clic en un modelo no hace nada, pero su botón Seleccionar sí funciona.** El TODO 5 (`pickItem`) no está convirtiendo a NDC correctamente, o no está subiendo por `.parent` lo suficiente para encontrar el `userData.itemId` que lleva el grupo ancestro de una malla más profunda.

**El conteo de Textures del panel Stats sube un poco con cada clic en "Recargar exhibición".** Geometries debería volver exactamente al mismo número cada vez; Textures puede variar en uno o dos cuando varios materiales de un modelo comparten una textura (el camión de leche de este proyecto lo hace, para sus ruedas), una aspereza en cómo maneja la propia contabilidad interna del renderer una textura usada por más de un material, no una señal de que tus propias llamadas de liberación estén mal. Lo que importa es que las recargas repetidas no hagan subir ninguno de los dos números en decenas o cientos: si lo hacen, revisa que cada material de cada malla realmente esté siendo alcanzado por el recorrido de `disposeObject()`.

**La animación de un modelo cargado se reproduce incluso con "Pausar animación" presionado, o con el movimiento reducido activado.** Falta el TODO 7 en `tick()`: revisa que la actualización del mixer esté dentro del mismo bloque `if (animating)` que ya usa la propia rotación de la piedra de jade.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: agrega un tercer modelo glTF de la biblioteca de recursos de ejemplo de Khronos, revisando tú misma su archivo de licencia.
2. **[Creativo](challenges/challenge-2.es.md)**: escribe tu propia descripción en la página de un modelo, en tu propio idioma, y agrega un panel de información que la muestre cuando ese modelo esté seleccionado.
3. **[Explorador](challenges/challenge-3.es.md)**: deja que quien aprende elija cuál de los varios clips de animación de un modelo se reproduce, cuando el modelo tiene más de uno.

## Cómo entregar tu trabajo

1. Completa cada punto de [`tests/checklist.md`](tests/checklist.md).
2. Toma capturas de la exhibición una vez que ambos modelos hayan cargado, y de nuevo con un objeto seleccionado.
3. Guárdalas, junto con este proyecto, en tu diario de aprendizaje y tu portafolio. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. En tu diario, responde: ¿por qué usa este proyecto `Promise.allSettled` en lugar de `Promise.all` para cargar sus dos modelos, y qué vería alguien si usara `Promise.all` en su lugar, el día en que un archivo falle al cargar?

## Lecturas adicionales

- [three.js manual: Load 3D models](https://threejs.org/manual/#en/load-gltf) (en inglés)
- [three.js docs: `GLTFLoader`](https://threejs.org/docs/#examples/en/loaders/GLTFLoader) (en inglés)
- [three.js docs: `AnimationMixer`](https://threejs.org/docs/#api/en/animation/AnimationMixer) (en inglés)
- [MDN: `Promise.allSettled()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) (en inglés)
- [Khronos Group: glTF-Sample-Assets](https://github.com/KhronosGroup/glTF-Sample-Assets) (en inglés)

## Mujeres que conviene conocer

**Soraia Raupp Musse** es profesora de computación gráfica en la PUCRS, en Porto Alegre, Brasil, e investigadora líder en simulación de multitudes y humanos virtuales. Obtuvo su doctorado en la EPFL bajo la dirección de Daniel Thalmann, y más tarde coescribió con él el libro de Springer *Crowd Simulation*.

El zorro y el camión de leche de este proyecto son modelos individuales, animados por separado; el campo al que ella ha dedicado su carrera plantea una pregunta más difícil: cómo animar a cientos de humanos virtuales a la vez, de forma creíble, en tiempo real. La misma idea de `AnimationMixer` que introduce este proyecto, mover un esqueleto a partir de un clip, es la unidad más pequeña de un problema que su investigación escala hasta una multitud.

> **Nota editorial: verificar antes de publicar.** Los datos biográficos de las secciones «Mujeres que conviene conocer» deben verificarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

**glTF 2.0**, el formato en el que llegan ambos modelos de este proyecto, es un estándar del Khronos Group: una especificación abierta y libre de regalías para transmitir escenas y modelos 3D, diseñada (como la describe el Khronos Group) para ser un "JPEG del 3D" pequeño y de carga rápida. `GLTFLoader` es la propia implementación de three.js de un lector de glTF, no un estándar en sí mismo, precisamente por eso las lecciones de este curso fijan su versión junto con la del propio three.js. Las licencias **Creative Commons** que llevan los dos modelos de este proyecto (CC0 1.0 y CC BY 4.0) no son un estándar de Khronos ni del W3C, pero sí un conjunto de licencias públicas ampliamente usado y estandarizado que hace posible, en primer lugar, revisar y acreditar los términos de un modelo.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
