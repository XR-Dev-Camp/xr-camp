# Investigación y definición del proyecto final

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `capstone` · **Lección:** `capstone-research-and-definition-01` · **Tiempo:** unas 8 horas · 11 sesiones de 45 minutos · unas 3 semanas con 4 sesiones por semana

---

> Produce un brief de proyecto final aprobado.

---

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Elegir un proyecto final que puedas terminar de forma realista, y explicar por qué importa.
2. Escribir un brief de una página que declare el problema, la audiencia, y el alcance.
3. Mapear a tus partes interesadas (stakeholders): quién lo usa, quién lo aprueba, quién lo mantiene después de ti.
4. Decir con claridad qué está fuera de alcance, y por qué.
5. Encontrar una socia real o realista para un proyecto de web espacial (una ONG, museo, escuela, o biblioteca).
6. Conseguir aprobación por escrito de tu mentora antes de construir nada.
7. Planificar tus propias sesiones a lo largo de un proyecto largo, como lo hiciste en el Curso 2.3.

## Requisitos previos

- **Curso 6.1: Desarrollo profesional y práctica profesional.** Tienes un portafolio y un plan de qué construir después.
- **Curso 3.6: Ingeniería de rendimiento para Web3D**, o un curso equivalente de web3D/XR, si tu proyecto final incluirá un prototipo 3D o XR (la Etapa 7.3 asume esto).

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Un editor de texto (VS Code o similar) | Escribir tu brief y tu mapa de partes interesadas en Markdown | Gratis |
| Un servidor local, para abrir el ejemplo completado | El mismo servidor que ya usas para otras lecciones | Gratis |
| Correo o una app de mensajería que tu mentora ya use | Conseguir la aprobación por escrito de tu mentora | Gratis |

No se necesitan herramientas de pago, cuentas, ni claves de API para esta etapa. Si tu proyecto final va a usar un servicio en la nube más adelante, planifica uno con un nivel gratuito que también funcione en China continental (ver las notas de herramientas en etapas posteriores).

## Lo que vas a construir

Esta es la Etapa 1 del **Proyecto Final Profesional**, cinco etapas que llevan un proyecto real de web espacial desde la idea hasta el lanzamiento. En esta etapa no escribes ningún código de aplicación. Escribes un **brief de proyecto final**, un **mapa de partes interesadas**, y consigues **aprobación de mentoría**: los tres documentos sobre los que se construye cada etapa posterior.

Tienes dos opciones de qué construir:

1. **Continuar la exhibición virtual.** Convierte la exhibición que construiste a lo largo de la Fase 3 (`web3d-developer/07`) en un proyecto final real: una exhibición cultural virtual para un museo comunitario, ampliada con el pensamiento de producto, el diseño de sistema, y la calidad de producción que enseña este proyecto final.
2. **Un proyecto nuevo con una socia.** Propón un proyecto de web espacial para una socia real o realista: una organización no gubernamental, un museo, una escuela, o una biblioteca. Mantén el alcance lo bastante pequeño para terminarlo en cinco etapas.

La solución de referencia en [`completed/`](completed/) sigue a Ana, una estudiante ficticia de XR Camp, mientras planifica una exhibición virtual para un museo comunitario ficticio en su ciudad. Su brief, mapa de partes interesadas, y aprobación de mentoría están completados por entero para que veas cómo se ve "terminado"; [`completed/index.html`](completed/index.html) presenta los tres uno junto al otro. El starter tiene tres plantillas Markdown con 6 TODOs entre ellas, más una rúbrica que te dice cómo se ve cada nivel de calidad.

## Guía de carpetas

```text
01-capstone-research-and-definition/
├── README.md              # This guide
├── README.es.md           # Spanish
├── README.zh-Hans.md      # Simplified Chinese
├── project.json           # Lesson metadata
├── starter/
│   ├── index.html          # Start page: links to every template below
│   ├── brief.md             # TODOs 1–3: problem, audience, scope
│   ├── stakeholder-map.md   # TODOs 4–5: who is involved, and how
│   ├── mentor-approval.md   # TODO 6: the approval record
│   └── rubric.md            # How this stage is assessed
├── completed/              # Ana's filled-in capstone brief: open this last
├── challenges/             # Three challenges: Foundation is required
├── tests/checklist.md      # Self-review before you submit
├── assets/
└── screenshots/
```

## Configuración

1. Copia la carpeta `starter/` a tu propio espacio de trabajo de proyecto final (una carpeta nueva, separada de lecciones anteriores; este proyecto es independiente).
2. Abre `starter/index.html` a través de un servidor local. Enlaza a las tres plantillas que vas a completar.
3. Lee [`starter/rubric.md`](starter/rubric.md) antes de escribir nada, para que sepas cómo se ve "aprobado".
4. Decide ahora: continuar la exhibición virtual, o un nuevo proyecto con una socia. Todo lo que sigue asume que ya elegiste uno.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; lee la rúbrica y el ejemplo de Ana | Una idea clara de cómo se ve "aprobado" |
| 2 | Paso 1: elige tu proyecto y tu audiencia | Una oración describiendo para quién es esto |
| 3 | Paso 2: la declaración del problema (TODO 1) | Una declaración de problema que tu mentora podría repetirte |
| 4 | Paso 3: alcance, dentro y fuera (TODOs 2–3) | Una lista de alcance con al menos tres cosas que *no* vas a construir |
| 5 | Paso 4: encuentra una socia (real o realista) | Un tipo de socia nombrado y una razón de una línea de por qué la necesita |
| 6 | Paso 5: el mapa de partes interesadas, parte 1 (TODO 4) | Cada parte interesada listada con su interés en el proyecto |
| 7 | Paso 5, continuación (TODO 5) | Decisiones que cada parte interesada puede tomar, y cómo vas a contactarla |
| 8 | Paso 6: riesgos y preguntas abiertas | Una lista corta de qué podría salir mal, y qué todavía necesitas averiguar |
| 9 | Paso 7: solicita aprobación de mentoría (TODO 6) | Un `mentor-approval.md` completado, enviado a tu mentora |
| 10 | [`tests/checklist.md`](tests/checklist.md); revisa el brief según la retroalimentación | Un brief listo para su aprobación final |
| 11 | Un reto de extensión, y luego **Cómo entregar tu trabajo** | Un brief de proyecto final aprobado |

### Paso 1: elige tu proyecto y tu audiencia

Un proyecto final es tan bueno como el problema detrás de él. Antes de escribir nada, responde una pregunta en voz alta: **¿para quién es esto, y qué es lo que no pueden hacer hoy que este proyecto les va a permitir hacer?**

Si estás continuando la exhibición virtual, tu audiencia ya existe: visitantes de un museo comunitario que no pueden viajar hasta ahí en persona, o que quieren volver a visitar una exhibición después de su visita. Si estás proponiendo un nuevo proyecto con una socia, dedica esta sesión solo a la idea. Las buenas ideas de proyecto final comparten tres cosas: una audiencia real, un alcance que puedes terminar en cinco etapas de trabajo a tiempo parcial, y una razón por la que la web y el 3D o XR realmente ayudan (no solo "porque sería genial").

### Paso 2: la declaración del problema (TODO 1)

Abre [`starter/brief.md`](starter/brief.md). El TODO 1 pide una **declaración del problema**: dos o tres oraciones que nombran la audiencia, su problema, y por qué importa ahora. Escríbela como si se la explicaras a alguien que nunca te ha conocido. Evita palabras como "innovador" o "revolucionario"; una mentora no puede aprobar un brief que no puede evaluar.

### Paso 3: alcance, dentro y fuera (TODOs 2–3)

El TODO 2 lista lo que **vas** a construir a lo largo de las cinco etapas. El TODO 3 es igual de importante: lo que **no** vas a construir, y por qué. Todo proyecto final que se quedó sin tiempo se saltó este paso. Nombrar tres cosas que estás recortando ahora, por escrito, es lo que te permite decir que no más adelante sin que se sienta como un fracaso.

### Paso 4: encuentra una socia (real o realista)

Un proyecto final es más fuerte con una socia en mente, incluso una hipotética modelada de cerca según un tipo real de organización. Buenos tipos de socia para un proyecto final de web espacial: un **museo local o sitio patrimonial** que quiere una exhibición virtual, una **ONG** que quiere explicar su trabajo a donantes, una **escuela o biblioteca** que quiere un espacio de aprendizaje interactivo. No nombres a una organización real como si hubiera aceptado esto a menos que realmente lo haya hecho. Es honesto e igual de útil escribir "un pequeño museo comunitario, similar a [tipo de lugar]" en tu brief.

### Paso 5: el mapa de partes interesadas (TODOs 4–5)

Abre [`starter/stakeholder-map.md`](starter/stakeholder-map.md). Un mapa de partes interesadas responde, para cada persona o grupo que toca este proyecto: ¿qué necesita de él, qué puede decidir, y cómo lo vas a contactar? El TODO 4 te pide listar cada parte interesada: visitantes, la organización socia, tu mentora, y cualquiera que mantenga el resultado después de que termines. El TODO 5 te pide registrar cómo te vas a comunicar con cada una, y con qué frecuencia.

### Paso 6: riesgos y preguntas abiertas

Todo proyecto real tiene cosas que todavía no sabes. Lístalas con claridad en tu brief: un riesgo técnico ("todavía no he confirmado que las fotos del museo sean de uso libre"), un riesgo de alcance ("la socia podría querer más de lo que permiten cinco etapas"), o un riesgo de habilidades ("nunca he construido una escena multiusuario antes"). Nombrar un riesgo no es una debilidad en un brief; dejar uno fuera que después descarrila el proyecto sí lo es.

### Paso 7: solicita aprobación de mentoría (TODO 6)

Abre [`starter/mentor-approval.md`](starter/mentor-approval.md). Completa los campos de resumen, y luego envía tu brief y mapa de partes interesadas a tu mentora (o, si todavía no tienes una, a una compañera, instructora, u otra persona revisora de confianza) para obtener aprobación por escrito. Registra su decisión y cualquier condición en este archivo. No empieces la Etapa 2 (`02-experience-and-system-design`) hasta que este archivo diga "Approved" o "Approved with changes" y hayas hecho esos cambios.

## Explicación del código clave

- **Declaración del problema.** La única oración que una mentora, una socia, o una futura compañera de equipo podrían repetir con precisión después de leer tu brief una vez.
- **Alcance, dentro y fuera.** Dos listas, no una: lo que vas a construir, y lo que deliberadamente no vas a construir. La segunda lista es lo que protege tus cinco etapas de crecer sin límite.
- **Parte interesada (stakeholder).** Cualquiera que se vea afectado por, o pueda afectar, el resultado del proyecto, no solo quienes lo usan.
- **Aprobación de mentoría.** Un registro escrito y fechado de aprobación, con cualquier condición adjunta. Es la compuerta entre "idea" y "proyecto comprometido."
- **Proyecto con socia.** Una organización real o realista a la que sirve tu proyecto final. Puede ser completamente hipotética, siempre que tu brief sea honesto al respecto.

## Accesibilidad 3D y XR

Esta etapa no produce código, así que todavía no hay nada que probar en un lector de pantalla. Pero las decisiones que tomes aquí definen qué tan accesible puede ser tu proyecto final más adelante. Cuando escribas tu declaración del problema y tu alcance, anota quién es tu audiencia en términos que importan para la accesibilidad: ¿usan lectores de pantalla, tienen banda ancha confiable, leen tu idioma con fluidez? La Etapa 2 convierte estas notas en requisitos de accesibilidad concretos, así que captúralas ahora mientras están frescas, aunque sea como una sola viñeta en tu brief.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| `completed/index.html` declara `lang="en"` | 3.1.1 Idioma de la página | La tecnología de asistencia necesita saber qué reglas de idioma aplicar |
| Cada encabezado sigue un orden lógico (h1, luego h2, sin saltar niveles) | 1.3.1 Información y relaciones | Quien usa lector de pantalla explora los encabezados para encontrar contenido |
| Los enlaces a los tres documentos son texto visible, no "click here" | 2.4.4 Propósito del enlace (en contexto) | El texto del enlace por sí solo debería decir qué es un documento |
| El foco es visible en cada enlace | 2.4.7 Foco visible | Quienes usan teclado necesitan ver dónde están |
| El contraste de color en todo el texto cumple 4.5:1 | 1.4.3 Contraste (mínimo) | El texto de bajo contraste es ilegible para muchas personas usuarias |

## Consideraciones de rendimiento

`completed/index.html` es una sola página ligera de enlaces y resúmenes: sin paso de compilación, sin imágenes, y sin ningún script más allá de la hoja de estilos compartida. Mantenla así; esta etapa trata sobre los documentos, no sobre la página que los lista.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Escribir el brief en lenguaje vago, de marketing | Una mentora no puede aprobar lo que no puede evaluar | Usa oraciones simples y específicas: quién, qué problema, qué alcance |
| Saltarse la lista de "fuera de alcance" | El proyecto crece hasta que la Etapa 4 se queda sin tiempo | Nombra al menos tres cosas que no vas a construir, por escrito |
| Empezar a programar antes de la aprobación | El trabajo se desecha cuando el brief cambia | Espera a que `mentor-approval.md` diga "Approved" o "Approved with changes" |
| Nombrar a una organización real que no ha aceptado el proyecto | Tergiversa una colaboración que no existe | Describe en su lugar un tipo de socia realista, hasta que una real lo confirme |
| Tratar el mapa de partes interesadas como una formalidad | Etapas posteriores pasan por alto los requisitos de quien toma una decisión | Anota qué puede decidir realmente cada parte interesada |

## Solución de problemas

**No tengo una mentora.** Usa en su lugar a una compañera, una instructora, o una persona revisora de confianza, y dilo en `mentor-approval.md`. El punto es una revisión externa de tu plan, no un puesto específico.

**Mi idea de proyecto con socia sigue creciendo.** Vuelve al Paso 3 y agrega a tu lista de "fuera de alcance". Un proyecto final que intenta servir a cada parte interesada posible rara vez termina bien ninguna de ellas.

**Las plantillas no abren.** Los archivos Markdown se abren en cualquier editor de texto; no necesitas un servidor local para ellos. `starter/index.html` sí necesita uno (`http://`, no `file://`), porque enlaza a archivos por ruta relativa.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: Escribe un "elevator pitch" de un párrafo para tu proyecto final que un mapa de partes interesadas por sí solo no puede mostrar: el *por qué ahora* de tu proyecto.
2. **[Creativo](challenges/challenge-2.es.md)**: Enraíza el brief en tu propio idioma, comunidad, o cultura: describe cómo tu proyecto final refleja un lugar o comunidad que conoces personalmente.
3. **[Explorador](challenges/challenge-3.es.md)**: Entrevista a una persona real cercana a tu audiencia prevista (una amiga, familiar, o compañera de clase) y agrega una cita directa suya a tu brief.

## Cómo entregar tu trabajo

1. Trabaja [`tests/checklist.md`](tests/checklist.md).
2. Toma una captura de pantalla de tu `mentor-approval.md` completado mostrando una decisión de aprobación.
3. Guarda tu brief, mapa de partes interesadas, y aprobación de mentoría en tu diario de aprendizaje y portafolio. Compártelos con otras personas que programan (consulta [dónde compartir tu trabajo](../../docs/en/community.md), en inglés).
4. Pregunta de diario: ¿cuál es el requisito de tu brief del que menos segura estás, y qué se necesitaría para tener más confianza en él?

## Lecturas adicionales

- [MDN: Soft skills for web developers](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Soft_skills) (en inglés)
- [W3C, Accessibility Requirements for People with Low Vision](https://www.w3.org/TR/low-vision-needs/) (en inglés)
- [Gov.uk Service Manual: Discovery](https://www.gov.uk/service-manual/agile-delivery/how-the-discovery-phase-works) (en inglés)

## Mujeres que conviene conocer

Cristina Junqueira es una empresaria brasileña, nacida en Ribeirão Preto, que en 2013 cofundó la fintech Nubank junto a David Vélez y Edward Wible. Su primer producto, una tarjeta de crédito sin cuota anual gestionada por completo desde una app móvil, hizo su primera transacción el 1 de abril de 2014, una respuesta simple y con alcance definido a un problema que millones de personas en Brasil enfrentaban con la banca tradicional. Nubank ha crecido desde entonces hasta servir a más de 140 millones de clientes.

Piensa en la historia de Junqueira como esta etapa en miniatura: un problema claramente definido, una audiencia, y un primer producto, construido antes que nada más ambicioso. En 2026 está liderando el lanzamiento de Nubank en Estados Unidos desde Miami, todavía trabajando desde la misma disciplina de nombrar el problema con precisión antes de construir la solución.

_Datos de fuentes públicas, verificados en 2026. ¿Encontraste un error? [Avísanos](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Estándar destacado

Las **Web Content Accessibility Guidelines (WCAG) 2.2** del W3C, publicadas por la Web Accessibility Initiative, son el estándar contra el que finalmente se juzgará tu proyecto final, empezando por las notas de accesibilidad que escribas en el brief de esta etapa. Etapas posteriores prueban criterios de conformidad específicos; esta etapa es donde te comprometes por primera vez, por escrito, a cumplirlos.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
