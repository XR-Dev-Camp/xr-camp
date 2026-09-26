# Prototipo del proyecto final

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `capstone` · **Lección:** `capstone-prototype-03` · **Tiempo:** unas 12 horas · 16 sesiones de 45 minutos · unas 4 semanas con 4 sesiones por semana

---

> Entrega un prototipo probado y una revisión de diseño.

---

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Construir una prueba técnica pequeña y funcional de tu diseño de la Etapa 2, en three.js.
2. Mantener un registro de pruebas continuo mientras construyes, no solo al final.
3. Probar tu prototipo por accesibilidad con un lector de pantalla y solo con teclado.
4. Probar tu prototipo contra el presupuesto de rendimiento que definiste en la Etapa 2.
5. Revisar la preparación de tu prototipo para la localización, incluso antes de que exista traducción.
6. Realizar una revisión de diseño, y registrar qué cambió como resultado.
7. Decidir, a partir de evidencia, qué está listo para pasar a la compilación de producción de la Etapa 4.

## Requisitos previos

- **Etapa 7.2: Diseño de experiencia y de sistema.** Necesitas un modelo de datos, grafo de escena, layout espacial, y plan de pruebas aprobados antes de que empiece esta etapa.
- **Curso 3.4: Fundamentos de three.js** y **Curso 3.6: Ingeniería de rendimiento para Web3D.**

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Un navegador moderno con WebGL 2 | Ejecuta el prototipo de three.js | Gratis |
| VS Code y un servidor local | Los módulos necesitan `http://` | Gratis |
| Un lector de pantalla (NVDA, VoiceOver, o similar) | Probar la accesibilidad del prototipo | Gratis |

## Lo que vas a construir

Etapa 3 del Proyecto Final Profesional: un **prototipo pequeño y funcional** que demuestra en código tu diseño de la Etapa 2, más un **registro de pruebas**, y un registro de **revisión de diseño**. Este no es el proyecto final terminado; es la porción más pequeña que demuestra que tus decisiones de diseño más riesgosas realmente funcionan.

La solución de referencia en [`completed/`](completed/) es una versión reducida de la sala de galería única de Ana de la Etapa 2: un soporte de exhibición construido con una primitiva de three.js, con una descripción de escena, una lista de alternativa 2D, controles de teclado, y un botón de pausa, reutilizando el patrón de página 3D accesible de `web3d-developer/07-interactive-web3d-experience`. El starter tiene tres plantillas de planificación (`prototype-plan.md`, `test-log.md`, `design-review.md`) con 7 TODOs, más una página starter mínima de three.js con sus propios TODOs por completar.

## Guía de carpetas

```text
03-capstone-prototype/
├── README.md
├── project.json
├── starter/
│   ├── index.html            # A minimal three.js page: 4 TODOs
│   ├── prototype-plan.md      # TODOs 1–3: what you will prove, and how
│   ├── test-log.md             # TODOs 4–5: a running log as you test
│   ├── design-review.md        # TODOs 6–7: the review record
│   └── rubric.md               # How this stage is assessed
├── completed/                 # The tiny working prototype: open this last
├── challenges/                 # Three challenges: Foundation is required
├── tests/checklist.md
├── assets/
└── screenshots/
```

## Configuración

1. Confirma que los documentos de diseño de la Etapa 2 están aprobados por mentoría antes de empezar.
2. Copia `starter/` a tu espacio de trabajo de proyecto final.
3. Abre `starter/index.html` a través de un servidor local; un canvas en blanco con un mensaje de consola es lo esperado antes de completar sus TODOs.
4. Lee [`starter/rubric.md`](starter/rubric.md).

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; vuelve a leer tu grafo de escena de la Etapa 2 | Un plan para la escena más pequeña que demuestre tu diseño |
| 2 | Paso 1: el plan de prototipo, parte 1 (TODOs 1–2) | Una lista nombrada de las cosas más riesgosas que este prototipo debe demostrar |
| 3 | Paso 1, continuación (TODO 3) | Un alcance para el prototipo, más pequeño que el proyecto final completo |
| 4 | Paso 2: renderer, cámara, y escena (TODO 1 en `index.html`) | Una escena vacía de three.js renderizando en el navegador |
| 5 | Paso 3: construir tu(s) objeto(s) primitivo(s) (TODO 2) | Tu(s) objeto(s) de la Etapa 2 visibles en pantalla |
| 6 | Paso 3, continuación | Iluminación y materiales que coinciden con tu layout espacial |
| 7 | Paso 4: la descripción de la escena y la alternativa 2D (TODO 3) | Una alternativa de texto que coincide con la escena, siempre visible |
| 8 | Paso 5: controles de teclado (TODO 4) | Cada interacción 3D tiene una ruta de teclado funcional |
| 9 | Paso 6: movimiento reducido y el botón de pausa | La animación respeta `prefers-reduced-motion`, con un control de pausa funcional |
| 10 | Paso 7: pruebas, parte 1 — accesibilidad (TODOs 4–5 en `test-log.md`) | Un recorrido con lector de pantalla y teclado, registrado |
| 11 | Paso 7, continuación — rendimiento | Draw calls y triángulos medidos contra tu presupuesto de la Etapa 2 |
| 12 | Paso 7, continuación — localización | Una comprobación de que ningún texto está codificado a mano fuera de tu modelo de datos |
| 13 | Paso 8: la revisión de diseño (TODOs 6–7) | Una reunión de revisión (real o con una compañera/mentora) registrada en `design-review.md` |
| 14 | Revisa el prototipo según la retroalimentación de la revisión | Cambios hechos y registrados |
| 15 | [`tests/checklist.md`](tests/checklist.md); solicita aprobación de mentoría | Un prototipo probado y revisado |
| 16 | Un reto de extensión, y luego **Cómo entregar tu trabajo** | Un prototipo de proyecto final aprobado |

### Paso 1: el plan de prototipo (TODOs 1–3)

Abre [`starter/prototype-plan.md`](starter/prototype-plan.md). No todas las partes de tu diseño de la Etapa 2 necesitan un prototipo: elige las dos o tres cosas más riesgosas (las partes con más probabilidad de fallar o más caras de corregir después) y planifica demostrar solo esas. El plan de Ana demuestra una cosa: ¿puede mostrarse, describirse, y controlarse de forma accesible un solo objeto de exhibición construido con primitivas, dentro del presupuesto?

### Paso 2: renderer, cámara, y escena (TODO 1 en `starter/index.html`)

Configura una `THREE.Scene`, una `PerspectiveCamera`, y un `WebGLRenderer`, el mismo patrón que `web3d-developer/04-threejs-foundations`. Usa exactamente el mapa de importaciones fijado de `versions.json` de este repositorio.

### Paso 3: tu(s) objeto(s) (TODO 2)

Construye el objeto que nombró tu plan de prototipo, con primitivas de three.js (una `BoxGeometry`, `SphereGeometry`, o similar) y un `MeshStandardMaterial`, más al menos una luz. Mantenlo pequeño: este paso demuestra la forma de tu pipeline, no el arte final.

### Paso 4: descripción de la escena y alternativa 2D (TODO 3)

Agrega un `<p id="scene-description">` construido a partir de los mismos datos que usa tu escena, y una lista o tabla 2D siempre presente con la misma información. Ninguna de las dos es un respaldo mostrado solo cuando falla el 3D; ambas están siempre ahí (WCAG 1.3.1).

### Paso 5: controles de teclado (TODO 4)

Agrega botones (o manejadores de keydown) que hagan exactamente lo que haría un arrastre o clic de mouse: girar la vista, o seleccionar el objeto. Cada interacción 3D necesita una ruta de teclado funcional.

### Paso 6: movimiento reducido y el botón de pausa

Si algo se anima, comprueba `matchMedia('(prefers-reduced-motion: reduce)')` antes de iniciarlo, y agrega un botón **Pause animation** con `aria-pressed` que funcione sin importar esa preferencia.

### Paso 7: pruebas (TODOs 4–5 en `test-log.md`)

Abre [`starter/test-log.md`](starter/test-log.md) y mantenlo abierto mientras pruebas. Registra, con fechas: tu recorrido con lector de pantalla, tu recorrido solo con teclado, tus draw calls y triángulos medidos contra el presupuesto de la Etapa 2, y una comprobación de que ningún texto visible está codificado a mano fuera de tu modelo de datos.

### Paso 8: la revisión de diseño (TODOs 6–7)

Abre [`starter/design-review.md`](starter/design-review.md). Muéstrale tu prototipo funcional a tu mentora o a una compañera. Registra qué dijo, y (esta es la parte que se saltan quienes aprenden) qué cambiaste como resultado, o por qué elegiste no hacerlo.

## Explicación del código clave

- **Prototipo.** La porción más pequeña y funcional que demuestra una decisión de diseño, deliberadamente más pequeña en alcance que la compilación final.
- **`prefers-reduced-motion`.** Una media query que el navegador expone desde los ajustes de accesibilidad del sistema operativo; el código la comprueba antes de iniciar cualquier animación que no se pidió.
- **Registro de pruebas.** Un registro fechado de qué probaste y qué encontraste, mantenido sobre la marcha, no reconstruido de memoria después.
- **Revisión de diseño.** Un momento estructurado donde alguien distinto de quien construye mira el trabajo y quien construye registra el resultado, incluyendo los cambios hechos.
- **Draw call.** Una instrucción de la CPU que le dice a la GPU que dibuje algo; menos draw calls, más grandes, suelen ser más baratos que muchos pequeños.

## Accesibilidad 3D y XR

Cada requisito de `docs/en/xr-accessibility.md` aplica al prototipo de esta etapa, en miniatura: un elemento `scene-description` construido a partir de los mismos datos que la escena, una lista 2D con la misma información, una ruta de teclado para cada interacción, una comprobación de movimiento reducido antes de que se anime cualquier cosa, un botón de pausa funcional, y ningún movimiento de cámara que la persona visitante no haya pedido. Probar a fondo este prototipo pequeño ahora es mucho más barato que descubrir un requisito olvidado en la compilación de producción, más grande, de la Etapa 4.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| `#scene-description` describe la escena actual | 1.1.1 Contenido no textual | Una persona que no puede ver el canvas necesita un equivalente |
| La lista 2D de objetos siempre está presente, no solo cuando falla WebGL | 1.3.1 Información y relaciones | La información no debería vivir solo en una imagen |
| Cada interacción 3D tiene una ruta de teclado | 2.1.1 Teclado | Las personas visitantes sin puntero deben alcanzar la misma funcionalidad |
| La animación comprueba `prefers-reduced-motion` y ofrece un botón de pausa | 2.2.2 Pausar, detener, ocultar | El contenido en movimiento puede distraer o dañar a algunas personas visitantes a menos que se pueda detener |
| El foco es visible en cada control | 2.4.7 Foco visible | Quienes usan teclado necesitan ver dónde están |

## Consideraciones de rendimiento

Mide draw calls y triángulos con `renderer.info`, la misma técnica que `web3d-developer/06-performance-engineering-for-web3d`, y compara contra el presupuesto en tu `test-plan.md` de la Etapa 2. Un prototipo que ya está sobre presupuesto con un solo objeto es una señal para simplificar antes de que la Etapa 4 agregue más.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Construir toda la escena antes de probar nada | Los problemas de accesibilidad y rendimiento se encuentran tarde, cuando son caros de corregir | Prueba primero la pieza más pequeña y funcional, antes de agregar más |
| Saltarse la revisión de diseño porque "es solo un prototipo" | Los defectos de diseño llegan a la compilación de producción, mucho más grande, de la Etapa 4 | Muéstrale el prototipo funcional a alguien más, aunque sea informalmente, y registra el resultado |
| Codificar texto visible a mano en lugar de leerlo de los datos | La localización se convierte en una reescritura en lugar de agregar traducciones | Lee cada cadena visible de un pequeño archivo de datos local, como planificó la Etapa 2 |
| Agregar animación sin comprobar primero el movimiento reducido | El prototipo falla una comprobación de accesibilidad que es fácil incorporar desde el inicio | Comprueba `prefers-reduced-motion` antes de que empiece cualquier animación, siempre |
| Tratar el registro de pruebas como una ocurrencia tardía | Las pruebas se reconstruyen de memoria, perdiendo detalles | Registra fechas y hallazgos sobre la marcha, no después de los hechos |

## Solución de problemas

**Mi escena se renderiza en negro.** Revisa que se haya agregado una luz a la escena (un `MeshStandardMaterial` necesita una), y que la cámara esté posicionada de forma que no esté dentro de tu objeto.

**La comprobación de movimiento reducido no parece funcionar.** En las DevTools de Chrome, usa el control "Emulate CSS media feature prefers-reduced-motion" del panel "Rendering" para probar sin cambiar el ajuste de tu sistema operativo. Firefox y Safari leen directamente el ajuste de accesibilidad a nivel del sistema operativo.

**Mis draw calls ya son altos con un solo objeto.** Revisa que no estés creando un material o geometría nuevos por cuadro dentro de tu bucle de render; crea los objetos una vez, fuera del bucle que llama a `renderer.render()`.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: Haz un recorrido completo solo con teclado de tu prototipo con el mouse desconectado (o el trackpad desactivado) y registra cada lugar donde te quedaste atascada.
2. **[Creativo](challenges/challenge-2.es.md)**: Crea el prototipo de un detalle que refleje tu propio idioma o comunidad, y prueba que se lee correctamente para alguien de fuera de ella.
3. **[Explorador](challenges/challenge-3.es.md)**: Agrega un segundo tipo de objeto distinto a tu prototipo y vuelve a medir tu presupuesto de rendimiento con ambos presentes.

## Cómo entregar tu trabajo

1. Trabaja [`tests/checklist.md`](tests/checklist.md).
2. Toma una captura de pantalla de tu prototipo funcional y de los números de rendimiento de tu registro de pruebas.
3. Guarda tu plan de prototipo, registro de pruebas, y revisión de diseño en tu diario de aprendizaje y portafolio. Cuando abra la comunidad de XR Camp, compártelos ahí.
4. Pregunta de diario: ¿qué cambió tu revisión de diseño sobre el plan que tenías al entrar a esta etapa?

## Lecturas adicionales

- [three.js manual: Fundamentals](https://threejs.org/manual/#en/fundamentals) (en inglés)
- [MDN: `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) (en inglés)
- [W3C WAI: Evaluating Web Accessibility Overview](https://www.w3.org/WAI/test-evaluate/) (en inglés)
- [docs/en/xr-accessibility.md](../../docs/en/xr-accessibility.md) (en inglés)

## Mujeres que conviene conocer

Katya Echazarreta es una ingeniera eléctrica, nacida en Guadalajara, México, que trabajó en el Laboratorio de Propulsión a Chorro (JPL) de la NASA de 2018 a 2021 en cinco misiones, incluidos el róver marciano Perseverance y el Europa Clipper. En junio de 2022 se convirtió en la primera mujer nacida en México en viajar al espacio, volando en el vuelo suborbital NS-21 de Blue Origin como astronauta ciudadana de Space for Humanity.

Cada misión en la que trabajó en el JPL dependía de pruebas en tierra que demostraran que un sistema funcionaría antes de que dejara la Tierra alguna vez. Eso es exactamente lo que te pide esta etapa para tu proyecto final: demostrar que las partes más riesgosas funcionan, en tierra, en un prototipo pequeño, antes de comprometerte con la compilación de producción completa.

> **Nota editorial: verificar antes de publicar.** Los datos biográficos de las secciones «Mujeres que conviene conocer» deben verificarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

La especificación **WebGL 2** del Khronos Group es lo que hace posible el renderer de three.js en cada navegador moderno sin ningún plugin. Khronos también publica glTF, el formato de modelo 3D usado en los cursos de Web3D de XR Camp; una etapa de prototipo es un buen lugar para confirmar temprano de cuáles de estos estándares abiertos va a depender tu proyecto final.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
