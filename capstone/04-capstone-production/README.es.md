# Producción del proyecto final

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `capstone` · **Lección:** `capstone-production-04` · **Tiempo:** unas 28 horas · 38 sesiones de 45 minutos · unas 10 semanas con 4 sesiones por semana

> **Esta es una lección más larga (38 sesiones).** Avanza paso a paso: cada sesión termina igual con algo que hiciste, y está bien tomar un descanso corto entre pasos.

---

> Construye la aplicación de producción.

---

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Convertir un prototipo y diseño aprobados en un plan de compilación de producción.
2. Trabajar una lista de verificación de compilación sin perder de vista qué está hecho.
3. Escribir documentación que una persona desconocida podría usar para ejecutar y entender tu proyecto.
4. Mantener un registro de cambios (changelog) mientras construyes, no solo al lanzamiento.
5. Aplicar los planes de accesibilidad, rendimiento, y seguridad de la Etapa 2 a código de producción real.
6. Revisar tu propio trabajo contra una lista de verificación de calidad antes de considerarlo terminado.
7. Reconocer cuándo recortar alcance en lugar de sacrificar calidad, usando tu lista de "fuera de alcance" de la Etapa 1 como guía.

## Requisitos previos

- **Etapa 7.3: Prototipo del proyecto final.** Necesitas un prototipo aprobado y probado, y una revisión de diseño, antes de que empiece esta etapa.
- Cada curso anterior de XR Camp relevante para las elecciones tecnológicas de tu proyecto final.

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| VS Code y un servidor local | Construir y probar la aplicación de producción | Gratis |
| Git y una cuenta gratuita de hospedaje Git (GitHub, o un equivalente disponible en China continental, como Gitee) | Control de versiones y un repositorio público para la Etapa 5 | Gratis |
| Un lector de pantalla, y la barra de dispositivos de las DevTools del navegador | Probar accesibilidad y capacidad de respuesta mientras construyes | Gratis |

## Lo que vas a construir

Etapa 4 del Proyecto Final Profesional: la **compilación de producción** de tu proyecto final, siguiendo tu diseño de la Etapa 2 y los hallazgos del prototipo de la Etapa 3. Esta es la etapa más larga (38 sesiones) porque construir con cuidado toma más tiempo que planificar o prototipar, y apresurarse deshace el valor de las primeras tres etapas.

En lugar de una segunda compilación resuelta (que solo repetiría el patrón de la Etapa 3 a mayor escala), la solución de referencia en [`completed/`](completed/) es la **documentación de producción completada** de Ana: su lista de verificación de compilación completada, una guía de usuaria, un README que una persona desconocida podría seguir, y un registro de cambios mantenido durante toda la compilación. [`completed/index.html`](completed/index.html) presenta los cuatro. El starter tiene las mismas cuatro plantillas, con 8 TODOs, más la rúbrica de esta etapa.

## Guía de carpetas

```text
04-capstone-production/
├── README.md
├── project.json
├── starter/
│   ├── index.html            # Start page: links to every template below
│   ├── build-checklist.md     # TODOs 1–3: your production build plan
│   ├── user-guide.md           # TODOs 4–5: instructions for the people who use it
│   ├── readme-template.md      # TODOs 6–7: a README a stranger could follow
│   ├── changelog.md            # TODO 8: a running log of what changed
│   └── rubric.md               # How this stage is assessed
├── completed/                 # Ana's filled-in production documents: open this last
├── challenges/                 # Three challenges: Foundation is required
├── tests/checklist.md
├── assets/
└── screenshots/
```

## Configuración

1. Confirma que el prototipo de la Etapa 3 fue aprobado, y reúne su registro de pruebas y las notas de la revisión de diseño; vas a construir sobre ambos.
2. Copia `starter/` a tu espacio de trabajo de proyecto final.
3. Configura un repositorio Git para tu código de producción ahora, aunque lo mantengas privado hasta la Etapa 5.
4. Lee [`starter/rubric.md`](starter/rubric.md).

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; vuelve a leer tu diseño de la Etapa 2 y el registro de pruebas de la Etapa 3 | Un plan de compilación fundamentado en lo que ya demostraste que funciona |
| 2–3 | Paso 1: la lista de verificación de compilación (TODOs 1–2) | Una lista de verificación dividida en tareas pequeñas y comprobables |
| 4 | Paso 1, continuación (TODO 3) | Tareas ordenadas para que las tempranas desbloqueen las posteriores |
| 5–20 | Paso 2: construye la experiencia central, un elemento de la lista a la vez | Cada sesión termina con un elemento más marcado, funcionando de forma visible |
| 21 | Revisión a mitad de compilación: vuelve a probar contra tus planes de accesibilidad y rendimiento de la Etapa 2 | Una lista de cualquier regresión por corregir antes de continuar |
| 22–30 | Paso 2, continuación: elementos restantes de la lista | La experiencia completa funcionando de extremo a extremo |
| 31 | Paso 3: la guía de usuaria (TODOs 4–5) | Instrucciones que una usuaria real podría seguir sin ayuda |
| 32 | Paso 4: el README (TODOs 6–7) | Un README que una persona desconocida podría usar para ejecutar tu proyecto localmente |
| 33 | Paso 5: el registro de cambios (TODO 8) | Un registro fechado de qué cambió, y por qué |
| 34 | Revisión completa de accesibilidad: teclado, lector de pantalla, movimiento reducido, contraste de color | Una revisión de accesibilidad con problemas registrados y corregidos |
| 35 | Revisión completa de rendimiento: mide contra tu presupuesto de la Etapa 2 | Una compilación dentro de presupuesto, o un plan documentado para llegar ahí |
| 36 | Revisión de calidad contra `tests/checklist.md` | Una compilación lista para una autorrevisión final |
| 37 | Corrige lo que encontró la revisión; solicita aprobación de mentoría | Una compilación de producción aprobada |
| 38 | Un reto de extensión, y luego **Cómo entregar tu trabajo** | Una aplicación de proyecto final terminada |

### Paso 1: la lista de verificación de compilación (TODOs 1–3)

Abre [`starter/build-checklist.md`](starter/build-checklist.md). Divide tu diseño de la Etapa 2 en tareas pequeñas y comprobables (TODO 1), agrupadas por área (escena, datos, accesibilidad, rendimiento; TODO 2), y ordenadas de forma que las tareas fundamentales vayan antes que las que dependen de ellas (TODO 3). Una lista de verificación que realmente puedas ir marcando, elemento por elemento, evita que una compilación de 38 sesiones se sienta sin forma.

### Paso 2: construye

Este no es un solo paso del recorrido: es la mayor parte de la etapa. Trabaja tu lista de verificación, un elemento a la vez, probando sobre la marcha como te enseñó la Etapa 3: teclado, lector de pantalla, movimiento reducido, y rendimiento, aplicados de forma continua en lugar de guardarlos para el final. Reutiliza el patrón de página 3D accesible y las versiones fijadas de bibliotecas de la Etapa 3 y de `web3d-developer/07` donde tu proyecto final los necesite.

### Paso 3: la guía de usuaria (TODOs 4–5)

Abre [`starter/user-guide.md`](starter/user-guide.md). Escribe instrucciones para las personas que realmente van a usar tu proyecto final (TODO 4): lenguaje sencillo, sin conocimiento técnico asumido, e instrucciones para cualquiera que lo mantenga después de ti (TODO 5), incluyendo cualquier cosa que una persona mantenedora necesitaría saber que no es obvia a partir del código.

### Paso 4: el README (TODOs 6–7)

Abre [`starter/readme-template.md`](starter/readme-template.md). Escribe un README que una persona desconocida pudiera usar para poner en marcha tu proyecto localmente desde cero (TODO 6), y una sección corta que describa qué tecnologías usa y por qué (TODO 7). Es la misma disciplina que cada `README.md` de este repositorio.

### Paso 5: el registro de cambios (TODO 8)

Abre [`starter/changelog.md`](starter/changelog.md). Mantén una entrada fechada por cada cambio significativo mientras construyes, no reconstruida de memoria al final. Un registro de cambios mantenido con honestidad suele ser la forma más rápida de responder "¿qué hice realmente en esta etapa?" cuando escribas el caso de estudio de la Etapa 5.

## Explicación del código clave

- **Lista de verificación de compilación.** Un plan de producción dividido en tareas pequeñas, ordenadas y comprobables: la diferencia entre "construir la app" y un plan que realmente puedas rastrear a lo largo de 38 sesiones.
- **Guía de usuaria.** Instrucciones para las personas que usan tu proyecto final terminado, escritas en lenguaje sencillo sin ningún trasfondo técnico asumido.
- **README.** El primer documento que cualquiera (una persona desconocida, una futura empleadora, tu propio yo futuro) lee para entender y ejecutar tu proyecto.
- **Registro de cambios.** Un registro fechado y continuo de qué cambió y por qué, mantenido sobre la marcha.
- **Revisión a mitad de compilación.** Una pausa deliberada a la mitad de una compilación larga para volver a probar contra planes anteriores, detectando regresiones antes de que se acumulen.

## Accesibilidad 3D y XR

Todo lo de las Etapas 2 y 3 ahora se construye a escala completa: cada escena necesita `#scene-description`, un equivalente 2D siempre presente, una ruta de teclado para cada interacción, una comprobación de movimiento reducido antes de cualquier animación, un botón de pausa funcional, y ningún movimiento de cámara no solicitado. A la escala de esta etapa, vuelve a probar después de cada adición significativa (un objeto nuevo, una interacción nueva, una sala nueva) en lugar de esperar hasta que toda la compilación esté terminada para comprobar cualquiera de esto.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| Cada página de producción declara `lang="en"` y un `<title>` | 3.1.1, 2.4.2 | Tanto la tecnología de asistencia como las pestañas del navegador necesitan esto |
| Cada control interactivo tiene un indicador de foco visible | 2.4.7 Foco visible | Quienes usan teclado necesitan ver dónde están |
| El contraste de color cumple 4.5:1 en toda la aplicación construida | 1.4.3 Contraste (mínimo) | El texto de bajo contraste es ilegible para muchas personas usuarias |
| Cada entrada de formulario tiene un `type` explícito y una etiqueta visible | 1.3.1, 4.1.2 | El verificador de pa11y requiere un `type`; una etiqueta visible inicia un nombre accesible |
| Los cambios de estado se anuncian a través de una región dinámica | 4.1.3 Mensajes de estado | Quienes usan lector de pantalla necesitan saber qué cambió sin mover el foco |

## Consideraciones de rendimiento

Vuelve a medir draw calls, triángulos, y peso de página con regularidad durante la compilación, no solo una vez al final; la Etapa 3 ya te dio un método de medición funcional y un presupuesto contra el cual comparar. Si te pasas del presupuesto, decide deliberadamente qué simplificar, usando tu lista de "fuera de alcance" de la Etapa 1 como el primer lugar donde buscar recortes.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Construir todo antes de probar algo | Los errores y problemas de accesibilidad se acumulan y se vuelven caros de aislar | Prueba después de cada elemento de la lista de verificación, como practicó la Etapa 3 |
| Escribir documentación solo al final | Se olvidan detalles, y el README subestima las decisiones reales tomadas en el camino | Actualiza el registro de cambios y el README sobre la marcha |
| Ignorar la revisión a mitad de compilación | Las regresiones introducidas temprano solo se encuentran cuando todo lo demás ya depende de ellas | Detente en el punto de control planificado y vuelve a probar deliberadamente |
| Agregar alcance más allá del plan de la Etapa 1 porque "sería fácil" | La etapa se queda sin sesiones antes de que termine la experiencia central | Compara ideas nuevas con la lista de "fuera de alcance" de la Etapa 1 antes de empezarlas |
| Saltarse la revisión de calidad porque la compilación "se ve terminada" | Problemas que una persona desconocida notaría de inmediato pasan desapercibidos para quien construyó | Trabaja `tests/checklist.md` por completo antes de solicitar aprobación |

## Solución de problemas

**Me estoy quedando sin sesiones.** Vuelve a tu lista de verificación de compilación y a tu alcance de la Etapa 1. Recorta el elemento menos esencial que sigue sin marcar, y anota el recorte en tu registro de cambios y en el caso de estudio de la Etapa 5; un recorte honesto y documentado es una parte normal de publicar software.

**Mi presupuesto de rendimiento se sigue saliendo de control a medida que agrego funcionalidades.** Vuelve a medir después de cada adición, no solo al final, para detectar exactamente el cambio que te hizo pasar del presupuesto.

**No sé qué va en el README versus la guía de usuaria.** El README es para alguien que configura y ejecuta tu código (una desarrolladora, tu futura yo); la guía de usuaria es para alguien que usa la experiencia terminada (la audiencia real de tu proyecto final). Rara vez se superponen mucho.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: Sigue tu propio README desde una carpeta completamente nueva, como si fueras una persona desconocida, y corrige cada paso que no funcionó como estaba escrito.
2. **[Creativo](challenges/challenge-2.es.md)**: Agrega un detalle de producción (una etiqueta, una descripción, una interacción) que refleje tu propio idioma o comunidad, y confirma que se lee con claridad para alguien de fuera de ella.
3. **[Explorador](challenges/challenge-3.es.md)**: Agrega una comprobación automatizada básica (aunque sea un script simple que abra tu página y revise errores de consola) a tu proceso de compilación, y documenta cómo ejecutarla.

## Cómo entregar tu trabajo

1. Trabaja [`tests/checklist.md`](tests/checklist.md).
2. Toma capturas de pantalla de tu aplicación terminada y de tu lista de verificación de compilación completada.
3. Guarda tu lista de verificación de compilación, guía de usuaria, README, y registro de cambios en tu diario de aprendizaje y portafolio. Compártelos con otras personas que programan (consulta [dónde compartir tu trabajo](../../docs/en/community.md), en inglés).
4. Pregunta de diario: ¿qué recortaste de tu alcance original de la Etapa 1, y cómo lo decidiste?

## Lecturas adicionales

- [MDN: Understanding client needs and writing documentation](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines) (en inglés)
- [Keep a Changelog](https://keepachangelog.com/) (en inglés)
- [W3C WAI: WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) (en inglés)
- [docs/en/3d-assets-and-versions.md](../../docs/en/3d-assets-and-versions.md) (en inglés)

## Mujeres que conviene conocer

Jess Lee creció en Hong Kong antes de estudiar ciencias de la computación en Stanford. Como usuaria intensa de la app de moda Polyvore, le envió a su fundador una crítica detallada del producto por correo en 2008, fue contratada, y ascendió a cofundadora honoraria y luego a CEO en 2012. Yahoo adquirió Polyvore más tarde, y en 2016 se unió a Sequoia Capital como su primera socia de inversión sénior en Estados Unidos.

El camino de Lee empezó con una crítica detallada y específica de un producto real, la misma atención cercana a lo que realmente funciona, y lo que todavía no, que una etapa de producción larga como esta te exige, elemento por elemento de la lista de verificación.

> **Nota editorial: verificar antes de publicar.** Los datos biográficos de las secciones «Mujeres que conviene conocer» deben verificarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

**Keep a Changelog**, una convención comunitaria ampliamente usada (no una especificación formal de un organismo de estándares), plantea un formato simple y consistente para el tipo de registro de cambios que te pide mantener esta etapa. Junto a ella, la **W3C WAI-ARIA Authoring Practices Guide** documenta patrones aceptados y probados para construir controles personalizados accesibles, que vale la pena revisar antes de inventar tu propio patrón desde cero.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
