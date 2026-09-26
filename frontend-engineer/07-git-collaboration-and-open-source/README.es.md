# Colaboración en Git y código abierto

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `frontend-engineer` · **Lección:** `git-collaboration-and-open-source-07` · **Tiempo:** unas 9 horas · 12 sesiones de 45 minutos · unas 3 semanas con 4 sesiones por semana

---

> Completa una contribución mediante un issue y un pull request.

---

## Objetivos de aprendizaje

Al terminar este proyecto serás capaz de:

1. Explicar cómo funciona un proyecto de código abierto: quienes lo mantienen, quienes contribuyen, las licencias, `CONTRIBUTING.md` y un código de conducta.
2. Escribir un **issue** claro, y usar etiquetas para organizar el trabajo.
3. Crear una **rama** (*branch*), y abrir un **pull request** (solicitud de cambios) que enlace su issue.
4. **Revisar** el pull request de otra persona con amabilidad y utilidad, y responder a las revisiones del tuyo.
5. Resolver un **merge conflict** (conflicto de fusión), y explicar por qué ocurrió.
6. Contribuir a un proyecto que no es tuyo, con un **fork** (bifurcación).
7. Escribir notas de una **release** (versión publicada), etiquetar una versión y publicarla.

## Requisitos previos

- **Curso 1.8: Git, GitHub y publicación.** Tienes una cuenta de GitHub, y ya hiciste *commits* y *push*.
- **Curso 2.3: Arquitectura de aplicaciones.** *Commits* pequeños, un cambio a la vez.

## Herramientas necesarias

| Herramienta | Para qué sirve | Costo |
| --- | --- | --- |
| Una cuenta de GitHub (del Curso 1.8) | Issues, pull requests, revisiones y releases | Gratis |
| GitHub Desktop, o Git en una terminal | Ramas y fusiones en tu computadora | Gratis |
| VS Code | Resolver conflictos de fusión | Gratis |
| Una compañera de estudio (recomendado) | Revisar el trabajo de la otra | Gratis |

**¿No tienes compañera?** Todos los pasos funcionan sola: haces ambos papeles, abres un pull request desde una rama y lo revisas tú misma. Es menos divertido, pero aprendes las mismas habilidades.

**Si GitHub es lento o está bloqueado donde vives:** GitHub funciona en China continental, pero puede ser lento o poco confiable. Puedes hacer toda esta lección en **Gitee** (gitee.com), que tiene issues, pull requests, revisiones y releases en chino: sube los archivos de `starter/practice-copy/` a un repositorio nuevo de Gitee. Gitee pide un número de teléfono para registrarse, y puede revisar un repositorio público nuevo antes de que otras personas puedan verlo. También puedes practicar ramas, fusiones y conflictos usando solo Git, en tu computadora, sin ninguna cuenta.

## Lo que vas a construir

Esta vez no es una página: es un **historial de contribuciones**. Trabajando en tu propia copia del repositorio de práctica de XR Camp, vas a abrir issues, resolverlos mediante pull requests, revisar el trabajo de una compañera, resolver un conflicto de fusión, corregir un problema real de accesibilidad en una escena 3D y publicar una release con sus notas. Cada paso deja un registro público y enlazable que puedes mostrar en un portafolio o en una entrevista.

El repositorio de práctica es una **plantilla** (*template*): <https://github.com/XR-Dev-Camp/contribution-practice>. Nunca le envías cambios directamente: haces tu propia copia, así que tú eres quien la mantiene, y puedes equivocarte sin riesgo.

La carpeta [`completed/`](completed/) muestra cómo quedó la copia de Ana al final, con pull requests de ejemplo, revisiones y notas de release.

## Guía de carpetas

```text
07-git-collaboration-and-open-source/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── practice-copy/   # The practice repository's files, for Gitee or offline use
│   └── contribution-log.md   # Record every issue, review, and pull request here
├── completed/           # Ana's finished work and example writing
│   ├── index.html, 3d/index.html   # The fixed pages
│   ├── CHANGELOG.md, pull-request-example.md, contribution-log.md
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Configuración

1. Inicia sesión en GitHub. Abre <https://github.com/XR-Dev-Camp/contribution-practice>, y presiona **Use this template → Create a new repository** (usar esta plantilla → crear un repositorio nuevo). Ponle el nombre `contribution-practice`, hazlo **Public** (público) y créalo.
2. Invita a tu compañera de estudio: **Settings → Collaborators → Add people** (Configuración → Colaboradores → Agregar personas). Acepta también su invitación, para que puedan trabajar cada una en la copia de la otra.
3. Activa Pages: **Settings → Pages**, **Deploy from a branch** (implementar desde una rama), `main`, `/ (root)` (la raíz), **Save** (guardar). En unos minutos, tu muro de consejos de estudio estará en línea.
4. Copia `starter/contribution-log.md` en un lugar seguro: tu diario de aprendizaje, o tu repositorio de portafolio.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración: tu copia, una compañera, Pages | Tu propio repositorio de práctica, en línea |
| 2 | Paso 1: cómo funciona el código abierto | Leíste `CONTRIBUTING.md` como lo haría alguien que contribuye |
| 3 | Paso 2: issues y etiquetas | Seis issues en tu repositorio |
| 4 | Paso 3: una rama y tu primer pull request | Un pull request que dice `Fixes #3` |
| 5 | Paso 4: revisar | Tu primera revisión del trabajo de tu compañera |
| 6 | Paso 5: responder y fusionar | Tu primer pull request fusionado |
| 7 | Paso 6: un conflicto de fusión, a propósito | Un conflicto, resuelto |
| 8 | Paso 7: el **Momento 3D** | Un ejemplo 3D accesible, fusionado |
| 9 | Paso 8: forks y proyectos reales | Sabes cómo contribuir en cualquier lugar |
| 10 | Paso 9: notas de release y una release | Versión 1.1.0, publicada |
| 11 | [`tests/checklist.md`](tests/checklist.md) | Un historial de contribuciones completo |
| 12 | Un reto adicional, y luego **Cómo entregar tu trabajo** | Un historial que mostrar |

### Paso 1: cómo funciona el código abierto

El software de **código abierto** se publica con una licencia que permite a cualquier persona leerlo, usarlo, cambiarlo y compartirlo. Buena parte de la web funciona así: A-Frame, three.js, el propio Git, y los navegadores donde pruebas tu trabajo están construidos en gran parte con código abierto.

Cada proyecto tiene personas en dos roles:

- Quienes **mantienen** el proyecto (*maintainers*) deciden qué se incorpora. Revisan, fusionan y publican releases. Muchas veces son voluntarias, con poco tiempo disponible.
- Quienes **contribuyen** (*contributors*) proponen cambios: cualquier persona, incluida tú.

Antes de contribuir a cualquier proyecto, lee tres archivos: el **README** (qué es), `CONTRIBUTING.md` (cómo quieren que ayudes) y la **licencia** (qué puedes hacer con él). Muchos proyectos también tienen un **código de conducta**: cómo deben tratarse las personas entre sí. Lee ahora el `CONTRIBUTING.md` de tu repositorio de práctica. ¿Qué debes hacer antes de empezar un cambio grande?

### Paso 2: issues y etiquetas

Un **issue** es una nota pública sobre algo que hay que hacer: un error, una idea, una pregunta. Los buenos issues ahorran tiempo a todo el mundo. Compara:

| Débil | Fuerte |
| --- | --- |
| «La página 3D está rota» | «Ejemplo 3D: los lectores de pantalla no dicen nada sobre la escena» |
| «No funciona» | Pasos para reproducirlo, qué esperabas, qué pasó, tu navegador |

Abre `GOOD-FIRST-ISSUES.md` en tu copia. Por cada problema, abre un issue nuevo (**Issues → New issue**, es decir, Issues → Issue nuevo): las plantillas te harán las preguntas correctas. Ponle a cada uno una etiqueta: **bug**, **enhancement** (mejora) o **good first issue** (buen primer issue). Las etiquetas ayudan a quienes contribuyen a encontrar trabajo a su medida. Repartan los issues con tu compañera, y **asígnense** cada una el suyo, para no arreglar las dos lo mismo.

### Paso 3: una rama y tu primer pull request

Nunca trabajes directamente en `main` dentro de un proyecto compartido. Crea una **rama** (*branch*): una línea de trabajo separada que no toca `main` hasta que se revisa.

Empieza con el error de tipeo del encabezado (issue 3), directamente en el navegador: abre `index.html`, presiona el lápiz (**Edit this file**, es decir, editar este archivo), corrígelo y elige **Create a new branch for this commit and start a pull request** (crear una rama nueva para este commit e iniciar un pull request). Nombra la rama `fix-heading-typo`.

En el **pull request** (PR), completa la plantilla, y escribe `Fixes #3` debajo de «Why?» (¿por qué?). Cuando se fusione el PR, GitHub cierra el issue 3 automáticamente. Después pide una revisión a tu compañera (**Reviewers**, a la derecha).

Con GitHub Desktop o una terminal, lo mismo se ve así:

```bash
git switch -c fix-heading-typo     # make a branch and move to it
# edit index.html, then:
git commit -am "Fix the typo in the study tips heading"
git push -u origin fix-heading-typo
```

### Paso 4: revisar (*code review*)

La **revisión de código** (*code review*) es donde ocurre la mayor parte del aprendizaje en un equipo. Abre el PR de tu compañera, y la pestaña **Files changed** (archivos modificados). Haz clic en el **+** junto a una línea para comentarla. Para proponer un cambio exacto, usa **Insert a suggestion** (insertar una sugerencia): ella puede aceptarlo con un clic.

Cuando termines, presiona **Review changes** (revisar cambios), y elige:

- **Comment** (comentario): preguntas o ideas pequeñas.
- **Approve** (aprobar): está listo.
- **Request changes** (pedir cambios): algo debe cambiar antes.

Las revisiones amables y útiles son específicas, explican el porqué y hablan del código, nunca de la persona:

| Poco útil | Útil |
| --- | --- |
| «Esto está mal». | «La descripción dice que las formas giran, pero la pelota no se mueve. ¿Puedes decir cuáles giran?» |
| «Mal color». | «`#999999` tiene un contraste de unos 2.8:1 sobre blanco; WCAG pide 4.5:1. `#595959` sí lo cumple». |
| (silencio sobre lo que está bien) | «Muy bueno: el texto alternativo es realmente claro». |

Prueba antes de aprobar: abre la versión de la página en esa rama, y úsala con el teclado.

### Paso 5: responder y fusionar

Cuando una revisión pide cambios, hazlos en la **misma rama** y vuelve a hacer *push*: el PR se actualiza solo. Responde a cada comentario («Corregido, gracias») y elige **Resolve conversation** (resolver conversación). No te lo tomes de manera personal: el código de todo el mundo recibe comentarios de revisión, todos los días.

Una vez aprobado, **fusiónalo** (*merge*). GitHub ofrece tres formas:

- **Create a merge commit** (crear un commit de fusión): conserva cada commit, más uno que los une.
- **Squash and merge** (aplastar y fusionar): convierte todos los commits del PR en un único commit limpio en `main`. Bueno para arreglos pequeños.
- **Rebase and merge** (rebasar y fusionar): reproduce cada commit encima de `main`, sin un commit de fusión.

Para este curso, usa **Squash and merge**. Después borra la rama (GitHub ofrece un botón): ya cumplió su función.

### Paso 6: un merge conflict, a propósito

Un **merge conflict** (conflicto de fusión) ocurre cuando dos ramas cambian las mismas líneas de formas distintas. Git no puede saber cuál quieres, así que se lo pregunta a una persona.

Provoca uno a propósito, con tu compañera, en una de tus copias:

1. Las dos crean una rama desde `main`: `add-tip-ana` y `add-tip-lucia` (con sus nombres).
2. Las dos agregan su consejo de estudio **al final de la misma lista** en `index.html`, siguiendo `CONTRIBUTING.md`, y abren un pull request cada una.
3. Fusiona el primero. El segundo ahora dice **This branch has conflicts that must be resolved** (esta rama tiene conflictos que deben resolverse).
4. Presiona **Resolve conflicts** (resolver conflictos). Vas a ver los marcadores de conflicto:

```text
<<<<<<< add-tip-lucia
      <li>Explain your code to a friend who does not code. … (Lucía)</li>
=======
      <li>Read the error message out loud. … (Ana)</li>
>>>>>>> main
```

La parte de arriba de `=======` es una rama; la de abajo es la otra. Decide qué debe decir el archivo (aquí: los dos consejos), borra las tres líneas de marcador, presiona **Mark as resolved** (marcar como resuelto), y luego **Commit merge** (hacer el commit de la fusión). En VS Code, los mismos marcadores aparecen con botones: **Accept Current Change** (aceptar el cambio actual), **Accept Incoming Change** (aceptar el cambio entrante), **Accept Both Changes** (aceptar ambos cambios).

Un conflicto no es un error, y nada está roto. Es Git siendo cuidadoso.

### Paso 7: el Momento 3D

Los issues 1 y 2 son sobre `3d/index.html`: tres formas sobre un piso, dos de ellas girando. Quien usa un lector de pantalla no escucha nada sobre la escena, y el giro nunca se detiene, ni siquiera para las personas cuyo dispositivo pide menos movimiento. Corrige los dos, en dos pull requests separados, uno por issue:

- **Issue 1**: agrega un párrafo con `id="scene-description"` antes de la escena, que nombre las formas, sus colores y su orden, de izquierda a derecha.
- **Issue 2**: reemplaza los atributos `animation` en bucle por un pequeño componente que revise una sola bandera `motion.paused`, que empiece pausado cuando esté activo `prefers-reduced-motion: reduce`, y agrega un botón **Pause animation** (pausar animación) con `aria-pressed`. Hiciste exactamente esto en el Curso 2.3.

Mira [`completed/3d/index.html`](completed/3d/index.html) solo después de que tus PR estén fusionados. Después lee [`completed/pull-request-example.md`](completed/pull-request-example.md): muestra el PR de Ana para el issue 1, la revisión, y su respuesta.

Correcciones de accesibilidad pequeñas como estas son de las contribuciones más valiosas que puedes hacer a proyectos 3D reales de código abierto: quienes los mantienen suelen agradecerlas, y son fáciles de revisar.

### Paso 8: forks y proyectos reales

En tu copia de práctica, eres colaboradora. En la mayoría de los proyectos reales, no lo eres: no puedes enviar ramas directamente a ellos. Por eso creas un **fork** (bifurcación): tu propia copia de su repositorio, conectada al original (el *upstream*).

1. Presiona **Fork** en la página del proyecto.
2. Crea una rama en tu fork, y haz el commit de tu cambio ahí.
3. Abre un pull request **desde la rama de tu fork hacia el `main` del upstream**. GitHub lo ofrece con un botón **Contribute** (contribuir).
4. Quienes mantienen el proyecto lo revisan, igual que hizo tu compañera. Ten paciencia: pueden tardar días o semanas.
5. Antes de empezar más trabajo más adelante, usa **Sync fork** (sincronizar fork) para traer sus cambios más recientes.

Una plantilla te da una copia independiente; un fork se mantiene conectado a su original, así que puedes enviarle cambios de vuelta. Esa es la diferencia.

XR Camp mismo está abierto a contribuciones: errores de tipeo, oraciones más claras, traducciones y correcciones de accesibilidad. Lee primero su [guía de contribución](../../.github/CONTRIBUTING.md) (en inglés), y abre un issue antes de un cambio grande.

### Paso 9: notas de release y una release

Una **release** es una versión con nombre en la que se puede confiar: «la 1.1.0 funciona; la 1.2.0 agrega una función». Muchos proyectos usan **versionado semántico**, `MAJOR.MINOR.PATCH`:

- **PATCH** (1.0.**1**): solo correcciones.
- **MINOR** (1.**1**.0): funciones nuevas que no rompen nada.
- **MAJOR** (**2**.0.0): cambios que podrían romper algo con lo que la gente contaba.

Tus correcciones y consejos nuevos forman la **1.1.0**. Escribe las notas de la release en `CHANGELOG.md` para quienes usan el proyecto, no para ti: qué cambió para ellas, en palabras simples, con los números de issue. Compara las tuyas con [`completed/CHANGELOG.md`](completed/CHANGELOG.md).

Después publícala: **Releases → Draft a new release** (borrador de una release nueva), crea la etiqueta `v1.1.0`, ponle un título, pega tus notas (o prueba **Generate release notes**, generar notas de release, y edita lo que escribe), y **Publish release** (publicar release).

## Explicación del código clave

**`Fixes #3`** en la descripción de un pull request cierra el issue 3 cuando el PR se fusiona en la rama predeterminada. `Closes #3` y `Resolves #3` también funcionan.

**`git switch -c nombre`** crea una rama nueva y te mueve a ella. (Tutoriales más antiguos usan `git checkout -b nombre`: es lo mismo).

**Marcadores de conflicto**: `<<<<<<<` inicia la primera versión, `=======` las separa, `>>>>>>>` termina la segunda. Un archivo con marcadores olvidados está roto: bórralos siempre los tres.

**`git tag v1.1.0`** marca el commit actual con un nombre de versión, si publicas la release desde una terminal; luego `git push origin v1.1.0` lo envía a GitHub. **Draft a new release** de GitHub hace las dos cosas por ti.

## Requisitos de accesibilidad

Estos aplican a las páginas que cambias en el repositorio de práctica.

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| El idioma de la página está definido | 3.1.1 | Los lectores de pantalla eligen la voz correcta (issue 6). |
| El texto pequeño tiene al menos 4.5:1 de contraste | 1.4.3 | Todo el mundo puede leerlo (issue 4). |
| La escena 3D está descrita en texto | 1.1.1 | La información no está solo en la imagen (issue 1). |
| El contenido en movimiento se puede pausar | 2.2.2 | El movimiento nunca se impone a nadie (issue 2). |
| Quien revisa prueba con el teclado | 2.1.1 | La accesibilidad se revisa en cada review, no al final. |

## Consideraciones de rendimiento

Las animaciones en bucle del ejemplo 3D seguían corriendo aunque no hiciera falta mover nada. La versión corregida revisa una sola bandera dentro del ciclo de cuadros de A-Frame, y deja de cambiar cualquier cosa cuando está pausada. Las revisiones son un buen momento para detectar este tipo de desperdicio: pregunta «¿esto necesita correr todo el tiempo?».

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Trabajar en `main` | Los cambios sin revisar quedan publicados de inmediato | Una rama por cada cambio |
| Un solo pull request enorme | Nadie puede revisarlo bien | PR pequeños, uno por issue |
| No abrir un issue primero | Dos personas arreglan lo mismo, o quien mantiene el proyecto lo rechaza | Abre o reclama un issue |
| Dejar marcadores de conflicto en un archivo | La página muestra `<<<<<<<` | Borra las tres líneas de marcador |
| Tomarse los comentarios de revisión de forma personal | Dejas de aprender de ellos | Los comentarios son sobre el código, no sobre ti |
| Contribuir sin leer `CONTRIBUTING.md` | Cierran tu PR | Léelo primero, en cada proyecto |

## Solución de problemas

**No puedo enviar una rama al repositorio de alguien más.** No eres colaboradora. Pídele que te agregue, o haz un fork (Paso 8).

**El botón Resolve conflicts está en gris.** El conflicto es demasiado complejo para el editor del navegador. Resuélvelo en VS Code: trae ambas ramas, fusiónalas, corrige los marcadores, haz el commit y el push.

**`Fixes #3` no cerró el issue.** El PR se fusionó en una rama que no es la predeterminada, o la palabra clave está en el título del pull request o en un comentario, en lugar de en su descripción. Cierra el issue a mano, y enlaza el PR.

**Mi sitio de Pages no se actualizó después de fusionar.** Espera unos minutos, y recarga sin la caché (Curso 1.8).

**Gitee: mi repositorio no es visible para otras personas.** Los repositorios públicos nuevos en Gitee pueden revisarse primero. Espera, o usa un repositorio privado y agrega a tu compañera como miembro.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: revisa tres pull requests, y escribe una guía breve sobre revisiones amables.
2. **[Creativo](challenges/challenge-2.es.md)**: traduce el ejemplo 3D a tu idioma, mediante un pull request.
3. **[Explorador](challenges/challenge-3.es.md)**: haz una contribución real a un proyecto real de código abierto.

## Cómo entregar tu trabajo

1. Completa todos los puntos de [`tests/checklist.md`](tests/checklist.md).
2. Tu historial de contribuciones, con sus enlaces, es tu entrega: cada issue, revisión, pull request, y la release.
3. Guárdalo en tu diario de aprendizaje y en tu portafolio. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. En tu diario, responde: ¿qué te enseñó una revisión de tu trabajo que no habrías descubierto sola?

## Lecturas adicionales

- [GitHub Docs: About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) (en inglés)
- [GitHub Docs: Resolving a merge conflict on GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github) (en inglés)
- [GitHub Docs: About forks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks) (en inglés)
- [Open Source Guides: How to contribute to open source](https://opensource.guide/how-to-contribute/) (en inglés)
- [Semantic Versioning](https://semver.org/) (en inglés)

## Mujeres que conviene conocer

**Gabriela de Queiroz** es una estadística y científica de datos criada en Brasil. En 2012, en San Francisco, fundó R-Ladies (ahora RLadies+), que creció hasta convertirse en una red global de más de 200 capítulos para mujeres y minorías de género dentro de la comunidad del lenguaje R. En 2023 fue incluida en la lista «100 Brilliant Women in AI Ethics».

El código abierto lo hacen las comunidades, no solo el código. R-Ladies empezó como un solo meetup, y se convirtió en un lugar donde miles de mujeres encontraron sus primeras colaboradoras, revisoras y mentoras: exactamente lo que una compañera de estudio y un repositorio de práctica empiezan a darte.

_Datos de fuentes públicas, verificados en 2026. ¿Encontraste un error? [Avísanos](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Estándar destacado

Las licencias de código abierto también están estandarizadas: la **Open Source Initiative** (OSI) revisa las licencias comparándolas con su Open Source Definition, y **SPDX** le da a cada licencia un identificador corto y exacto (`MIT`, `CC0-1.0`, `Apache-2.0`) para que las herramientas y las personas puedan saber de un vistazo qué permite un proyecto. Los estándares web se desarrollan en público de la misma manera: el W3C y WHATWG reciben issues y pull requests en GitHub, así que las habilidades de esta lección son exactamente la forma en que se contribuye a la propia plataforma web.

## Licencia

Código: [`LICENSE-CODE`](../../LICENSE-CODE) · Contenido: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
