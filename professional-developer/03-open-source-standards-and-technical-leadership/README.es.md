# Código abierto, estándares y liderazgo técnico

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `professional-developer` · **Lección:** `open-source-standards-and-technical-leadership-03` · **Tiempo:** unas 12 horas · 16 sesiones de 45 minutos · unas 4 semanas con 4 sesiones por semana

---

> Publica una contribución de código abierto y un plan de participación en estándares.

---

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Explicar en qué se diferencia un Community Group del W3C de un Working Group con carta constitutiva, y cómo una especificación pasa de uno a otro.
2. Crear una cuenta gratuita del W3C y unirte a un Community Group cuya misión encaje con algo que hayas construido.
3. Escribir un explainer (documento explicativo) que siga la plantilla de explainer del W3C TAG.
4. Reconocer, y escribir, un issue de especificación que le dé a quien mantiene el proyecto todo lo que necesita para actuar.
5. Presentar un issue o pull request real en un repositorio público real, y registrar qué pasa.
6. Dejar un comentario de revisión específico, amable y útil sobre el trabajo real de otra persona.
7. Configurar lo básico que un pequeño proyecto de código abierto necesita para funcionar por sí mismo: gobernanza, un código de conducta, y una licencia elegida de la SPDX License List.
8. Escribir un registro de decisión breve, y describir cómo mentorías a la próxima persona que se una a tu proyecto.

## Requisitos previos

- **Curso 2.7: Colaboración con Git y código abierto** — esta lección asume que ya sabes abrir un issue, crear una rama, y abrir un pull request.
- **Curso 6.1: Despliegue en producción y DevOps** — comodidad trabajando con un repositorio de GitHub y su pestaña Actions.
- Comodidad escribiendo Markdown; esta lección no introduce ningún lenguaje de programación nuevo.

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Una cuenta de GitHub | Presentar y revisar issues y pull requests reales | Gratis |
| Una cuenta gratuita del W3C | Unirte a un Community Group | Gratis ([créala aquí](https://www.w3.org/account/request/)) |
| Un editor de texto (por ejemplo, VS Code) | Escribir tus documentos y tu página | Gratis |
| Un navegador moderno | Leer especificaciones, y abrir tu página terminada | Gratis |

Tanto el propio sitio del W3C como GitHub son accesibles desde China continental; si alguno está lento o bloqueado en tu red, un espejo (mirror) o VPN permitidos por tu institución, o simplemente leer la exportación en texto plano o PDF de una especificación, funcionan para las partes de lectura de esta lección.

## Lo que vas a construir

Un plan de participación en estándares y una contribución de código abierto real, presentada de verdad: no una simulación. Vas a crear una cuenta gratuita del W3C, unirte a un Community Group real, escribir un explainer usando la plantilla real del W3C TAG, planear y (en el reto obligatorio) presentar un issue de especificación real, hacer y registrar una contribución real a un repositorio público, revisar el trabajo real de otra persona, y diseñar la gobernanza, el código de conducta y la licencia para un pequeño proyecto de código abierto propio. Esta es la mitad de "publicar y liderar" de la Fase 6: todo lo anterior en esta fase publicó código; esta lección te publica a ti, como una persona con la que otras personas mantenedoras pueden trabajar.

La solución de referencia está en [`completed/`](completed/): el propio plan completado de Ana, y la pequeña página accesible que lo presenta. Tu proyecto starter tiene **15 TODOs numerados** repartidos en siete archivos.

## Guía de carpetas

```text
03-open-source-standards-and-technical-leadership/
├── README.md
├── starter/                  # begin here
│   ├── standards-plan.md     # TODOs 1, 2, 7, 9, 13
│   ├── explainer-draft.md    # TODOs 3-6
│   ├── contribution-record.md # TODO 8
│   ├── mini-project/         # TODOs 10-12
│   │   ├── GOVERNANCE.md
│   │   ├── CODE_OF_CONDUCT.md
│   │   └── decision-record-0001-choose-a-licence.md
│   └── index.html            # TODOs 14-15
├── completed/                 # reference solution (Ana's plan)
├── challenges/                # Three challenges: Foundation is required
├── tests/                     # self-review checklist
├── assets/
└── screenshots/
```

## Configuración

1. Abre `starter/index.html` a través del servidor local que usa el resto de este curso (no haciendo doble clic en el archivo).
2. Si todavía no tienes una cuenta gratuita del W3C, créala ahora en [w3.org/account/request](https://www.w3.org/account/request/); toma unos minutos y solo necesita una dirección de correo.
3. Mantén tu cuenta de GitHub con la sesión iniciada; la vas a usar de verdad, en esta lección.
4. Si quieres repasar issues, ramas y pull requests, vuelve a leer [`frontend-engineer/07-git-collaboration-and-open-source`](../../frontend-engineer/07-git-collaboration-and-open-source/README.md), solo lectura, ya está terminada.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Paso 1: cómo la web se convierte en un estándar; lista tres especificaciones de las que ya dependes sin saberlo | Una lista corta, en tu propio diario, de los estándares detrás de herramientas que ya usas |
| 2 | Paso 2: crea tu cuenta gratuita del W3C y explora Community Groups (TODO 1) | Una cuenta, y un Community Group elegido y registrado |
| 3 | Paso 2, continuación: únete al grupo, lee su carta constitutiva (TODO 2) | Una razón corta y honesta de por qué ese grupo encaja |
| 4 | Paso 3: la plantilla de explainer; redacta la Introducción (TODO 3) | Un párrafo de apertura que una persona desconocida podría entender |
| 5 | Paso 3, continuación: Goals, Non-goals, y User research (TODO 4-5) | Una idea de funcionalidad acotada y bien motivada |
| 6 | Paso 3, continuación: Proposed approach y Considered alternatives (TODO 5-6) | Un enfoque esbozado, y una alternativa rechazada explicada |
| 7 | Paso 3, continuación: la sección combinada de accesibilidad/i18n/privacidad/seguridad, y comentarios de partes interesadas (TODO 6) | Un borrador de explainer terminado |
| 8 | Paso 4: anatomía de un buen issue de especificación; redacta el tuyo (TODO 7) | Un título e un cuerpo de issue claro y específico, listo para presentar |
| 9 | Paso 5: haz una contribución real (TODO 8) | Un issue o pull request real, presentado en un repositorio real |
| 10 | Paso 6: revisa el trabajo real de otra persona (TODO 9) | Un comentario específico, amable y útil, realmente dejado |
| 11 | Paso 7: lo básico de mantener un proyecto — gobernanza y un código de conducta (TODOs 10-11) | Dos documentos de proyecto completados |
| 12 | Paso 7, continuación: elegir una licencia con SPDX (TODO 12) | Un registro de decisión que nombra un identificador SPDX exacto |
| 13 | Paso 8: liderazgo técnico — un plan de mentoría (TODO 13) | Un párrafo corto y concreto de mentoría |
| 14 | Paso 9: construye la página accesible con el resumen (TODOs 14-15) | Una página terminada que presenta todo tu plan |
| 15 | [`tests/checklist.md`](tests/checklist.md) | Un plan completo y verificado |
| 16 | Un reto de extensión, y luego **Cómo entregar tu trabajo** | Una contribución publicada y un plan terminado |

### Paso 1: cómo la web se convierte en un estándar

Cada etiqueta, atributo y API que has usado en este curso empezó como la idea de alguien, puesta por escrito, discutida, y eventualmente acordada. El **World Wide Web Consortium (W3C)** publica la Recommendation Track formal: un **Working Draft** se convierte en una **Candidate Recommendation** una vez que es lo bastante estable para implementarse y probarse (publicado como borradores y como instantáneas revisadas), y luego en una **W3C Recommendation** una vez que las organizaciones miembro del W3C lo revisan y aprueban formalmente. Mucho antes de todo eso, la mayoría de las ideas empiezan de forma mucho más informal, en un **Community Group**: abierto a cualquiera con una cuenta gratuita del W3C, sin cuota de membresía, y sin obligación de representar a un empleador. Los propios reportes de un Community Group no son estándares; son donde una idea se moldea lo suficiente como para que un Working Group con carta constitutiva algún día pueda adoptarla.

Otras organizaciones tienen sus propios procesos, con formas distintas, para las partes de la plataforma web que el W3C no cubre: **WHATWG** mantiene los Living Standards de HTML y del DOM, y el **IETF** publica los RFC detrás de HTTP y TLS. Todas comparten un hábito que esta lección practica directamente: reciben propuestas, issues y pull requests del público, en la web abierta, de la misma forma que cualquier proyecto de código abierto.

### Paso 2: una cuenta gratuita del W3C y un Community Group (TODOs 1-2)

Crea tu cuenta, y luego explora la lista de Community Groups en [w3.org/community/groups](https://www.w3.org/community/) buscando uno cuya misión conecte con algo que construiste antes en este curso: accesibilidad, internacionalización y web inmersiva son todas áreas activas. Unirte no cuesta nada y no requiere el permiso de ningún empleador, pero no está libre de consecuencias: cada participante acepta el **W3C Community Contributor License Agreement (CLA)**, un documento legal real que cubre derechos de autor y un compromiso de licencia de patente libre de regalías para cualquier cosa que contribuyas al trabajo de ese grupo. Léelo antes de hacer clic en unirte.

```markdown
<!-- TODO 1 in standards-plan.md -->
Created a free W3C account on <date>. Chosen group: <name>.
```

### Paso 3: escribir un explainer (TODOs 3-6)

Un **explainer** es un documento en lenguaje sencillo escrito antes de una especificación formal: existe para ser legible por alguien que no es experto en especificaciones, así un grupo más amplio de personas puede dar retroalimentación temprano, cuando todavía es barato cambiar de dirección. `starter/explainer-draft.md` sigue, sección por sección, la plantilla real y vigente del [explainer del W3C TAG](https://w3ctag.github.io/explainer-explainer/). Abre esa página una vez, completa, antes de empezar a escribir: explica por qué existe cada sección, no solo qué poner en ella.

Trabaja las secciones en orden: Introduction, Goals, Non-goals, User research, Proposed approach, Considered alternatives, la sección combinada de Accessibility/Internationalization/Privacy/Security, y Stakeholder feedback. Cada explainer necesita una alternativa genuina que rechazaste, y una retroalimentación genuina y específica que esperas recibir, no un vago "algunas personas podrían no estar de acuerdo."

### Paso 4: presentar un buen issue de especificación (TODO 7)

Un buen issue le da a quien mantiene el proyecto todo lo que necesita para actuar, sin que tenga que hacer primero una pregunta de seguimiento:

- **Un issue, un problema.** Dos quejas sin relación en un mismo issue significa que se atiende la que sea más fácil y la otra se olvida.
- **Un título específico y localizable (searchable).** "Clarify recommended practice for X" se puede encontrar después; "confusing" no.
- **Contexto, no solo una solicitud.** Di qué intentaste, qué esperabas, y qué pasó, o, para un issue de documentación o de redacción de especificación, cita el texto exacto que crees que debería cambiar.
- **Busca primero un duplicado.** Busca en los issues del repositorio, abiertos y cerrados, antes de presentar uno.

Redacta el tuyo en `standards-plan.md`, sección 4. Presentarlo de verdad, en un repositorio real, es el reto Fundamento obligatorio de esta lección (ver [`challenges/challenge-1.es.md`](challenges/challenge-1.es.md)).

### Paso 5: hacer una contribución real (TODO 8)

Presentar un issue de especificación es un tipo de contribución; un pull request pequeño, real y presentado es otro, y a menudo un lugar más fácil para empezar. Una corrección de documentación, un reporte de enlace roto, o un "good first issue" en un proyecto que ya usas son todos legítimos. `contribution-record.md` te pide documentar uno de verdad: qué cambiaste, por qué lo elegiste, qué lo hizo un buen issue o pull request según el estándar del Paso 4, y qué pasó después de presentarlo.

### Paso 6: revisar el trabajo de otras personas (TODO 9)

Revisar es una destreza propia, separada de escribir código. Un comentario de revisión útil nombra algo específico (una línea, una palabra, un comportamiento), explica por qué importa, y se mantiene amable: asume que quien escribió tuvo una razón para su elección, y pregunta por ella antes de asumir que fue un error. Encuentra un pull request o issue real y abierto fuera de tu propio trabajo, léelo con la atención suficiente para decir algo específico, y deja un comentario. Registra qué dijiste, y qué pasó, en `standards-plan.md`, sección 6.

### Paso 7: mantener un pequeño proyecto de código abierto (TODOs 10-12)

Un proyecto necesita más que código para funcionar por sí mismo en cuanto participa más de una persona:

- **Gobernanza** (`mini-project/GOVERNANCE.md`) nombra quién puede hacer qué, y cómo se toma una decisión. Sin ella, cada decisión se convierte en una discusión privada en lugar de un proceso conocido.
- **Un código de conducta** (`mini-project/CODE_OF_CONDUCT.md`) establece el comportamiento esperado de todas las personas, y, igual de importante, nombra una forma real de reportar un problema. Adoptar una plantilla conocida, como el [Contributor Covenant](https://www.contributor-covenant.org/), significa que quienes contribuyen ya saben más o menos qué esperar.
- **Una licencia** hace que el proyecto sea legalmente utilizable en absoluto. Sin una, los derechos de autor por defecto son "todos los derechos reservados," y nadie más puede legalmente usarlo, copiarlo, o contribuir a él, sin importar qué tan público se vea el repositorio. La [SPDX License List](https://spdx.org/licenses/) le da a cada licencia un identificador corto y exacto (`MIT`, `Apache-2.0`, `GPL-3.0-only`) que herramientas y personas pueden comprobar de un vistazo; escribe la tuya como un **registro de decisión**, en `mini-project/decision-record-0001-choose-a-licence.md`.

### Paso 8: liderazgo técnico: registros de decisión y mentoría (TODO 13)

Un **registro de decisión** (a veces llamado Architecture Decision Record, o ADR) es una nota corta y fechada que captura una decisión, su contexto, y sus consecuencias, para que alguien que se una después pueda entender una elección sin tener que preguntarle a quien la tomó. Ya escribiste uno, para tu licencia, en el Paso 7; el hábito se generaliza a cualquier decisión que valga la pena recordar. La otra mitad del liderazgo técnico es más silenciosa: cómo tratas a la próxima persona que llega. Escribe, en `standards-plan.md` sección 8, cómo mentorías a alguien que se une a tu Community Group elegido o a tu mini-proyecto, y cómo le darías retroalimentación sobre su primer pull request.

### Paso 9: la página accesible del plan (TODOs 14-15)

Todo lo anterior vive en documentos Markdown; el último paso lo presenta como una página web pequeña y accesible que una persona revisora, una mentora, o una futura empleadora podría abrir sin descargar nada. Construye `index.html` con un `<section>` por cada parte del plan, cada uno con su propio encabezado, y enlaza cada sección de vuelta al documento que resume en lugar de repetir ese documento por completo.

## Explicación del código clave

- **Community Group vs. Working Group.** Un Community Group está abierto a cualquiera con una cuenta gratuita del W3C y produce reportes sin ninguna condición formal propia; un Working Group tiene carta constitutiva de las organizaciones miembro del W3C y es el único tipo de grupo que puede hacer avanzar una especificación por la Recommendation Track.
- **El W3C Community Contributor License Agreement (CLA).** El acuerdo que acepta cada participante de un Community Group, que cubre los términos de derechos de autor del material contribuido y un compromiso de licencia de patente libre de regalías. Es un acuerdo real y vinculante, no una formalidad para pasar por alto.
- **Explainer.** Un documento en lenguaje sencillo, escrito antes de una especificación formal, cuyo trabajo es hacer que una idea sea revisable por personas que no son expertas en especificaciones, para que los problemas salgan a la luz cuando todavía es barato corregirlos.
- **`aria-describedby`.** Un atributo HTML/ARIA existente y ordinario que apunta de un elemento al texto que lo describe; el explainer de referencia propone recomendarlo por nombre para escenas 3D, en lugar de inventar un atributo nuevo.
- **Identificador SPDX.** Una cadena corta y exacta (`MIT`, `Apache-2.0`) que nombra una licencia específica sin ambigüedad, así una herramienta o una persona nunca tiene que adivinar a qué licencia "estilo MIT" se refiere realmente un proyecto.
- **Registro de decisión.** Una nota corta y fechada con secciones Status, Context, Decision y Consequences, escrita para que una elección siga siendo comprensible para alguien que no estuvo en la sala cuando se tomó.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| El idioma del documento está declarado | 3.1.1 | Los lectores de pantalla eligen la pronunciación y la voz correctas |
| Un solo `<h1>`, orden lógico de encabezados en cada sección | 2.4.6, 1.3.1 | Le permite a quien usa lector de pantalla navegar el plan por encabezado, igual que una persona vidente lo hojea |
| El propósito de cada enlace es claro por su texto o su contexto | 2.4.4 | "Read the full explainer draft" le dice a quien usa lector de pantalla qué va a obtener; "click here" no |
| Las listas con estilo `list-style: none` conservan `role="list"` | 1.3.1 | Safari elimina la semántica implícita de lista en cuanto no tiene viñetas, a diferencia de otros navegadores |
| El foco es visible en cada enlace | 2.4.7 | Quienes usan teclado siempre deben ver dónde están |
| El contraste de color cumple AA | 1.4.3 | Las palabras de estado ("Done", "Planned") deben ser legibles, no decorativas |
| El estado nunca es solo color | Buena práctica | "Done" y "Planned" son ambas palabras, no solo colores distintos |

## Consideraciones de rendimiento

El entregable de esta lección es texto: documentos Markdown y una página HTML pequeña, sin imágenes, sin 3D, y sin JavaScript. Todo su peso es una hoja de estilos ya compartida con el resto del curso. No hay nada aquí que optimizar; la disciplina que importa en su lugar es mantener cada documento lo bastante corto para que quien mantiene el proyecto, ocupada, realmente lo lea, que es su propio tipo de rendimiento.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Tratar el reporte de un Community Group como si fuera una Recommendation | Afirma que una funcionalidad es "estándar" cuando no ha pasado la revisión formal | Di "en discusión en el Community Group \<nombre\>," y comprueba su estado real |
| Presentar un issue vago ("esto no funciona") | Quien mantiene el proyecto tiene que hacer varias preguntas de seguimiento, o lo cierra | Da un título específico, un contexto exacto, y qué esperabas en su lugar |
| Escribir un explainer con solo un esbozo de API, sin Goals ni Alternatives | Quienes revisan no pueden saber qué problema resuelve o si existe una solución más simple | Sigue cada sección de la plantilla real, en orden |
| Elegir una licencia copiando un proyecto que te gustó, sin leerla | Puedes terminar prometiendo algo (como compartir de vuelta todos los cambios) que no pretendías | Elige un identificador SPDX exacto y anota el compromiso, como un registro de decisión |
| Un código de conducta que dice "contacta a quien mantiene el proyecto" sin ninguna dirección | Un reporte no tiene ningún lugar real a dónde ir | Nombra una vía de reporte específica y monitoreada |

## Solución de problemas

**Ningún Community Group parece encajar.** Explora la lista completa en [w3.org/community](https://www.w3.org/community/) en lugar de solo los conocidos; hay cientos, sobre temas muy específicos. Si ninguno encaja, cuatro personas pueden proponer uno nuevo juntas.

**Un bot de revisión de pull request te pide firmar algo.** Muchos repositorios reales corren una comprobación automatizada de Contributor License Agreement o Developer Certificate of Origin (DCO) en un primer pull request. Lee bien qué pide realmente antes de aceptar; es normal y esperado, no una señal de que hiciste algo mal.

**Tu `index.html` falla una comprobación de enlaces.** Un enlace relativo desde `completed/index.html` a un archivo en `mini-project/` necesita el nombre de la carpeta en la ruta (`mini-project/GOVERNANCE.md`), no solo el nombre del archivo.

**El verificador de accesibilidad marca una lista.** Si agregaste un `<ul>` con estilo `list-style: none` y no agregaste `role="list"`, VoiceOver en Safari lo leerá como texto plano sin ninguna semántica de lista; el soporte de lector de pantalla de Chrome y Firefox no tiene esta brecha, que es exactamente por qué es fácil pasarla por alto durante las pruebas.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: presenta de verdad el issue de especificación que planeaste.
2. **[Creativo](challenges/challenge-2.es.md)**: enraíza tu explainer y tu mini-proyecto en un problema de tu propio idioma, cultura o comunidad.
3. **[Explorador](challenges/challenge-3.es.md)**: escribe un segundo registro de decisión, más difícil, y consigue una revisión real de él.

## Cómo entregar tu trabajo

1. Trabaja [`tests/checklist.md`](tests/checklist.md) por completo.
2. Toma una captura de pantalla de tu issue o pull request real, presentado, y de tu `index.html` terminado.
3. Guárdalas en tu diario de aprendizaje y portafolio. Cuando abra la comunidad de XR Camp, compártelas ahí.
4. Pregunta de diario: ¿qué fue más difícil de lograr bien, el explainer técnico o el plan en lenguaje sencillo a su alrededor, y por qué?

## Lecturas adicionales

- [W3C Community Groups](https://www.w3.org/community/) (en inglés) — cómo explorar, unirte a uno, o empezar uno
- [How to Write an Explainer (W3C TAG)](https://w3ctag.github.io/explainer-explainer/) (en inglés) — la plantilla completa que usa esta lección
- [W3C Process Document](https://www.w3.org/policies/process/) (en inglés) — la Recommendation Track formal, para quien quiera todo el detalle
- [SPDX License List](https://spdx.org/licenses/) (en inglés) — los identificadores exactos detrás de las licencias de código abierto
- [Contributor Covenant](https://www.contributor-covenant.org/) (en inglés) — una plantilla de código de conducta ampliamente usada

## Mujeres que conviene conocer

**Chen Yang (Emily), 陈阳,** trabaja en China continental. Fue cofundadora principal, en 2014, de Kaiyuanshe (开源社), una alianza china de comunidades de código abierto, y más tarde la presidió en 2023. En 2008 inició el GNOME.Asia Summit, y es exdirectora de la junta de la GNOME Foundation. Ha trabajado como ingeniera y gerente de producto en Sun, Oracle y Microsoft.

Kaiyuanshe y GNOME.Asia son exactamente el tipo de estructuras abiertas y gestionadas por la comunidad que esta lección te pide practicar a unirte: un grupo que cualquiera puede proponer, que decide cosas en conjunto, y que sigue creciendo porque personas como Chen Yang siguen apareciendo para organizarlo, año tras año, no solo para escribir su código.

> **Nota editorial: verificar antes de publicar.** Los datos biográficos de las secciones «Mujeres que conviene conocer» deben verificarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

Toda esta lección es el estándar destacado. El **W3C** publica Recommendations formales a través de su Process Document, haciendo avanzar una especificación por Working Draft y Candidate Recommendation (borradores e instantáneas revisadas) antes de una revisión final de sus organizaciones miembro; sus **Community Groups** trabajan antes y de forma más informal, abiertos a cualquiera con una cuenta gratuita, bajo un Community Contributor License Agreement que cubre derechos de autor y patentes. Otros organismos tienen sus propias vías para las partes de la plataforma que el W3C no posee: **WHATWG** mantiene los Living Standards de HTML y del DOM, y el **IETF** publica los RFC detrás de los protocolos de red que hay debajo de todo esto. Cada uno de ellos recibe issues y pull requests públicos, por eso las destrezas del Curso 2.7 y de esta lección no son dos cosas distintas: son la misma destreza, dirigida a la propia plataforma web en lugar de a un proyecto de un solo curso.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
