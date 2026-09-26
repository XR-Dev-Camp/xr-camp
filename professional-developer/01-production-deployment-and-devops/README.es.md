# Despliegue en producción y DevOps

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `professional-developer` · **Lección:** `production-deployment-and-devops-01` · **Tiempo:** unas 12 horas · 16 sesiones de 45 minutos · unas 4 semanas con 4 sesiones por semana

---

> Crea y documenta un pipeline de lanzamiento a producción.

---

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Explicar qué es un **pipeline de CI/CD**, y describirlo como una secuencia de jobs donde cada uno debe pasar antes de que corra el siguiente.
2. Escribir un flujo de trabajo de **GitHub Actions** con jobs de validación, una auditoría de accesibilidad, una compilación (build) y un despliegue.
3. Validar el HTML y los enlaces de un proyecto de forma automática, y ejecutar una **auditoría de accesibilidad** sin interfaz gráfica con `pa11y`.
4. Desplegar un sitio estático en **GitHub Pages** usando las propias acciones oficiales de GitHub.
5. Configurar un **entorno (environment)** con revisores obligatorios, para que un lanzamiento necesite la aprobación manual de una persona.
6. Realizar un **rollback**: volver a desplegar un lanzamiento anterior ya probado, en lugar de "deshacer" un cambio.
7. Publicar **notas de lanzamiento** de forma automática a partir de una etiqueta (tag) de versión.
8. Leer y explicar el flujo de CI/CD real de otra persona, como hace el caso de estudio de este proyecto.

## Requisitos previos

- **Curso 1.8: Git, GitHub y publicación** (commits, ramas, etiquetas y subir cambios a GitHub).
- **Curso 3.7: Experiencia interactiva Web3D** (la exhibición que vas a desplegar aquí).
- Una cuenta gratuita de [GitHub](https://github.com/).

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Una cuenta de GitHub y un repositorio que controles | Actions y Pages necesitan uno | Gratis |
| Un navegador moderno | Leer la pestaña Actions, y el sitio desplegado | Gratis |
| Un editor de texto | Escribir el panel y los archivos de flujo de trabajo | Gratis |

## Lo que vas a construir

La exhibición está terminada (es el proyecto final de la Fase 3 del Curso 3.7). Este proyecto trata de todo lo que pasa **después** de que el código está escrito: un pipeline que lo revisa, lo despliega, y le permite a un equipo revertirlo si algo sale mal.

Vas a escribir dos flujos de trabajo de ejemplo de GitHub Actions y una pequeña página de **panel de lanzamiento (release dashboard)**, accesible, que documenta lo que hacen. `starter/app/` contiene la exhibición que vas a desplegar (no la edites); el pipeline la trata como lo que se está publicando, no como algo que cambiar.

La solución de referencia está en [`completed/`](completed/). El starter tiene 12 TODOs, repartidos entre `index.html` y los dos archivos de flujo de trabajo.

## Guía de carpetas

```text
01-production-deployment-and-devops/
├── README.md
├── starter/
│   ├── index.html        # The release dashboard: TODOs 1-3
│   ├── styles.css        # Finished (shared tokens, plus this lesson's own section)
│   ├── app/               # The virtual exhibit you will deploy (do not edit)
│   └── workflows/
│       ├── deploy.yml     # TODOs 4-9
│       └── rollback.yml   # TODOs 10-12
├── completed/            # Reference solution: open this last
├── challenges/           # Three challenges: Foundation is required
├── tests/checklist.md    # Self-review before you submit
├── assets/
└── screenshots/
```

`workflows/` no es `.github/workflows/`: un archivo de flujo de trabajo solo se ejecuta desde esa carpeta exacta en la raíz de un repositorio, así que estos son ejemplos que vas a copiar a tu propio repositorio una vez terminados (la sección Configuración del README dice cómo).

## Configuración

1. Crea un repositorio nuevo y vacío en GitHub (público, para que GitHub Pages pueda servirlo gratis), y clónalo.
2. Copia `starter/app/`, `starter/index.html` y `starter/styles.css` a la raíz de tu nuevo repositorio.
3. Copia `starter/workflows/deploy.yml` y `starter/workflows/rollback.yml` a una carpeta nueva `.github/workflows/` en esa misma raíz. Todavía no va a correr nada: ambos archivos están sin terminar, y GitHub Actions simplemente omite un job sin pasos.
4. Haz commit y push. Abre **Settings → Pages** de tu repositorio, y pon **Source** en "GitHub Actions".
5. Abre **Settings → Environments**, crea un entorno llamado `production`, y marca **Required reviewers**, agregándote a ti misma. Este es el ajuste que convierte el job `approve` del Paso 7 en una compuerta de aprobación real: nada dentro de un archivo de flujo de trabajo puede pedir esa aprobación por sí solo.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; explora `app/` en un navegador, y lee una vez, sin cambiarlo, el [`.github/workflows/validate.yml`](../../.github/workflows/validate.yml) real de este repositorio | La exhibición corriendo localmente |
| 2 | Paso 1: el encabezado del panel (TODO 1) | Una página que dice qué documenta |
| 3 | Paso 1, continuación: la lista de etapas del pipeline (TODO 2) | Seis etapas listadas, en orden |
| 4 | Paso 1, continuación: las secciones de rollback y "fuera de GitHub" (TODO 3) | Un panel terminado |
| 5 | Paso 2: caso de estudio — leer `validate.yml` job por job | Notas sobre sus cuatro jobs, listas para el README |
| 6 | Paso 3: el job validate (TODO 4) | Comprobaciones de HTML y enlaces pasando en la pestaña Actions |
| 7 | Paso 4: el job de accesibilidad (TODO 5) | Una auditoría de `pa11y` pasando |
| 8 | Paso 5: el job build (TODO 6) | Un artefacto de Pages subido |
| 9 | Paso 6: los jobs de aprobación y despliegue (TODOs 7-8) | Una corrida pausada esperando aprobación, y luego una URL de Pages en vivo |
| 10 | Paso 7: notas de lanzamiento (TODO 9) | Un push con etiqueta publica un GitHub Release |
| 11 | Paso 8: el disparador de rollback (TODO 10) | Un formulario `workflow_dispatch` con un input `tag` |
| 12 | Paso 8, continuación: reconstruir y volver a desplegar una etiqueta (TODOs 11-12) | Una etiqueta anterior vuelve a estar en vivo, anotada en su release |
| 13 | Paso 9: opciones fuera de GitHub, con cautela | Una breve comparación escrita, en tus propias palabras |
| 14 | Paso 10: una corrida de extremo a extremo de todo el pipeline | Cada job en verde, desde el push hasta el release |
| 15 | [`tests/checklist.md`](tests/checklist.md) | Un pipeline terminado |
| 16 | Un reto de extensión, y luego **Cómo entregar tu trabajo** | Un pipeline de lanzamiento documentado |

### Paso 1: el panel de lanzamiento (TODOs 1-3)

Empieza con `index.html`: una página pequeña y estática que explica el pipeline a una persona, en lenguaje sencillo, sin llamar a ninguna API en vivo. Eso lo mantiene gratuito, funciona sin conexión, y es honesto: nunca dice mostrar un estado que en realidad no puede comprobar.

El TODO 1 es el encabezado y el párrafo de apertura. El TODO 2 es la lista "Pipeline stages" (etapas del pipeline): un `<ol class="stage-list" role="list">` con un `<li>` por job, cada uno con su propio `<h3>` y un `<p>` breve. Escribe estos dos después de haber leído el caso de estudio (Paso 2) y antes de escribir los flujos de trabajo (Paso 3 en adelante), para que las palabras coincidan con lo que el YAML realmente hace. El TODO 3 es la explicación del rollback, escrita al final, una vez que `rollback.yml` ya exista.

### Paso 2: caso de estudio — el propio pipeline de este repositorio

Abre [`.github/workflows/validate.yml`](../../.github/workflows/validate.yml), en la raíz de este repositorio. Es el flujo de trabajo real que revisa cada lección, incluida esta, antes de que se pueda fusionar (merge). Tiene cuatro jobs:

- **`structure`** ejecuta `node scripts/validate-projects.mjs` y `node scripts/build-readmes.mjs --check`: el mismo tipo de comprobación mecánica de estructura que estás por agregar para la exhibición, aplicada aquí al contenido de las lecciones y a sus README generados.
- **`secrets`** descarga una versión fijada de la herramienta de línea de comandos `gitleaks` y escanea todo el historial de Git en busca de credenciales. Hace el checkout con `fetch-depth: 0` (el historial completo, no solo el último commit) porque un secreto que se hizo commit una vez y luego se borró sigue estando en ese historial.
- **`links`** ejecuta `lycheeverse/lychee-action` contra cada archivo Markdown, aceptando una lista corta de códigos de estado HTTP (`403`, `429`) que significan "un sitio real rechazó una solicitud automatizada", no "el enlace está roto".
- **`accessibility`** instala una versión fijada de `pa11y` y audita cada `completed/index.html` del repositorio en Chrome sin interfaz gráfica, con las banderas `--no-sandbox` y de SwiftShader porque el runner no tiene GPU y normalmente bloquea el sandbox de Chrome. Sus propios comentarios dicen exactamente lo que vas a redescubrir en el Paso 4: `pa11y` no puede ver dentro de un canvas 3D, por eso existe la lista de verificación manual "3D and XR" junto a él.

Cada job que escribas de aquí en adelante reutiliza una de estas cuatro ideas: una comprobación mecánica, un escaneo de seguridad, una comprobación de enlaces, o una auditoría de accesibilidad sin interfaz gráfica.

### Paso 3: el job validate (TODO 4)

En `workflows/deploy.yml`, el job `validate` corre primero. Hace checkout del código, y luego:

```yaml
- name: Validate HTML
  run: |
    npm install --no-save html-validate@11
    npx html-validate --rule "no-redundant-role:off" --rule "prefer-native-element:off" --rule "long-title:off" 'app/**/*.html'
- name: Check links
  uses: lycheeverse/lychee-action@v2
  with:
    args: >-
      --no-progress --exclude-loopback --max-retries 3 --timeout 30
      --accept 200,202,206,403,429
      'app/**/*.html'
    fail: true
```

`html-validate` revisa el propio marcado (etiquetas sin cerrar, atributos inválidos); `lychee` comprueba que cada enlace en él realmente resuelva. Ninguno necesita cuenta ni clave de API. Las tres reglas desactivadas señalarían de otro modo las propias decisiones deliberadas de la exhibición: `role="list"` en un `<ul>`/`<ol>` con estilo (restaura la semántica de lista para Safari VoiceOver más antiguo), un landmark construido con `role="region"` en un `<div>`, y títulos que son descriptivos en lugar de cortos.

### Paso 4: el job de accesibilidad (TODO 5)

`accessibility` corre después de `validate` (`needs: validate`). Instala `pa11y`, igual que el propio job del caso de estudio, y audita `app/index.html`:

```yaml
- name: Audit the exhibit
  run: |
    echo '{ "chromeLaunchConfig": { "args": ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] }, "timeout": 120000 }' > /tmp/pa11y.json
    npx pa11y --config /tmp/pa11y.json --standard WCAG2AA "file://$PWD/app/index.html"
```

Esto revisa el DOM ya renderizado: cada etiqueta, encabezado y región dinámica alrededor de la vista 3D. No puede ver dentro del canvas WebGL, así que `tests/checklist.md` sigue necesitando su sección "3D and XR (manual)" para que una persona revise la escena misma.

### Paso 5: el job build (TODO 6)

`build` corre después de `accessibility`. Las propias acciones oficiales de GitHub empaquetan un sitio estático como un "artefacto de Pages":

```yaml
- uses: actions/configure-pages@v6
- uses: actions/upload-pages-artifact@v5
  with:
    path: app
```

`configure-pages` lee los ajustes de Pages de tu repositorio; `upload-pages-artifact` comprime la carpeta que le indiques y la guarda para que el job deploy la publique. Aquí no hay herramienta de compilación porque la exhibición es HTML, CSS y JavaScript sencillos; un proyecto que use un empaquetador (bundler) correría primero su comando de compilación, y subiría la carpeta de salida de ese comando en su lugar.

### Paso 6: aprobación manual, y luego despliegue (TODOs 7-8)

`approve` corre después de `build`, y casi no hace nada por sí mismo: un solo paso que imprime un mensaje. Lo que importa es `environment: name: production`, que coincide con el entorno que creaste en Configuración. GitHub pausa la corrida en este job hasta que un revisor obligatorio la apruebe desde la pestaña Actions, la misma revisión que recibe un pull request, pero para un lanzamiento.

`deploy` corre después de `approve`, con sus propios `permissions: pages: write` e `id-token: write` (Pages se autentica con un token de OpenID Connect de corta duración, así que solo este job debería poder solicitarlo):

```yaml
environment:
  name: github-pages
  url: ${{ steps.deployment.outputs.page_url }}
steps:
  - id: deployment
    uses: actions/deploy-pages@v5
```

El entorno `github-pages` se crea automáticamente la primera vez que esto corre; su URL luego aparece junto a cada despliegue en la pestaña **Environments** de tu repositorio.

### Paso 7: notas de lanzamiento (TODO 9)

El job `release` solo corre cuando el push fue una etiqueta de versión (`if: startsWith(github.ref, 'refs/tags/v')`). Usa la CLI de GitHub, `gh`, ya instalada en cada runner, sin acción ni cuenta adicional:

```yaml
- name: Create the release
  env:
    GH_TOKEN: ${{ github.token }}
  run: gh release create "${{ github.ref_name }}" --title "${{ github.ref_name }}" --generate-notes
```

`--generate-notes` construye las notas a partir de los commits y pull requests fusionados desde la etiqueta anterior, así que escribir buenos mensajes de commit y buenos títulos de pull request es parte de escribir buenas notas de lanzamiento.

### Paso 8: el flujo de trabajo de rollback (TODOs 10-12)

`rollback.yml` es un segundo archivo, separado, que solo se inicia a mano (`workflow_dispatch`), nunca con un push. El TODO 10 agrega un input `tag`, para que la pestaña Actions muestre un campo de texto para él. El TODO 11 repite el job de build, pero pasa `ref: ${{ inputs.tag }}` a `actions/checkout`, así hace checkout de esa etiqueta exacta en lugar de la rama actual. El TODO 12 repite sin cambios los jobs de aprobación y despliegue, y agrega un job `note` que usa `gh release view` y `gh release edit` para añadir una línea al release ya existente de esa etiqueta, dejando constancia de que volvió a estar en vivo, cuándo, y quién lo aprobó.

Un rollback aquí nunca reescribe el historial ni borra un release defectuoso: vuelve a publicar uno anterior, ya probado, honestamente, con un registro de lo que pasó.

### Paso 9: opciones amigables con China continental, con cautela

GitHub Actions y GitHub Pages son ambos gratuitos, pero los dominios de GitHub son lentos o están bloqueados para algunas personas visitantes en China continental. Escribe un párrafo breve, para tu propio panel o tus notas, nombrando dos opciones sin comprometerte con ninguna: **Gitee Go**, un producto de CI/CD en la plataforma china Gitee que puede compilar y desplegar a un servidor que tú controles, y un **runner autoalojado (self-hosted)**, que mantiene tus archivos de flujo de trabajo aquí en GitHub mientras la máquina que los ejecuta está en una red más cercana a tu audiencia. Gitee Pages, el propio producto gratuito de hospedaje estático de Gitee, dejó de funcionar en 2024, así que no lo sugieras. Anota, en tus propias palabras, que los términos de hospedaje cambian, y que cualquiera que dependa de esto debería revisar los términos vigentes por su cuenta.

### Paso 10: una corrida de extremo a extremo

Sube (push) un cambio pequeño a `main`, mira cada job correr en orden en la pestaña Actions, aprueba la pausa cuando aparezca, y confirma que la exhibición carga en su URL de Pages en vivo. Luego sube una etiqueta (`git tag v0.1.0 && git push origin v0.1.0`) y confirma que aparece un GitHub Release con notas generadas automáticamente. Finalmente, corre `rollback.yml` a mano contra esa misma etiqueta, y confirma que el release recibe su nota de rollback.

## Explicación del código clave

**`needs: validate`.** Un job sin `needs` empieza de inmediato; nombrar el id de otro job aquí hace que GitHub Actions espere a que ese job tenga éxito primero, que es como un pipeline se vuelve una secuencia en lugar de seis jobs corriendo a la vez.

**`environment: name: production`, sin `url`.** Un entorno no tiene que desplegar nada: nombrar uno aquí es solo una forma de adjuntar las reglas de protección de ese entorno (revisores obligatorios) a este job.

**`permissions` en un job, no solo al inicio del archivo.** El `permissions: contents: read` de nivel superior es lo que recibe cada job por defecto; un job que necesita más, como `pages: write` e `id-token: write` de `deploy`, lo declara ahí, para que ningún otro job del archivo pueda solicitar el mismo acceso por accidente.

**`if: startsWith(github.ref, 'refs/tags/v')`.** `github.ref` es el ref completo que disparó la corrida (`refs/heads/main` para una rama, `refs/tags/v1.0.0` para una etiqueta); comprobar su prefijo es cómo un job corre solo para lanzamientos etiquetados, no en cada push.

**`${{ steps.deployment.outputs.page_url }}`.** El `id` de un paso permite que una expresión posterior lea lo que produjo; `deploy-pages` genera como salida la URL en vivo, y el campo `url` del entorno es cómo termina mostrándose junto al despliegue en la propia interfaz de GitHub.

## Accesibilidad 3D y XR

La exhibición misma ya cumple sus propios requisitos de accesibilidad (el Curso 3.7 los construyó: una descripción de la escena, una alternativa 2D completa, controles de teclado, y una comprobación de movimiento reducido con un botón de pausa). Este proyecto no cambia nada de eso; se asegura de que un pipeline nunca publique una versión que lo rompa.

`pa11y`, en el job de accesibilidad, lee la página ya renderizada: revisa etiquetas, encabezados, contraste y mensajes de estado, pero no puede ver si el canvas WebGL realmente muestra el zorro, el camión, o algo en absoluto. Esa brecha es exactamente lo que dice el propio comentario del caso de estudio sobre el job `accessibility` del repositorio, y por eso `tests/checklist.md` mantiene una sección manual "3D and XR": después de cada despliegue, y especialmente después de cada rollback, una persona sigue abriendo la URL en vivo y revisando la escena a simple vista y con el teclado.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| El panel tiene un encabezado claro, y un orden lógico de encabezados | 1.3.1, 2.4.6 | Quienes usan lector de pantalla exploran una página por sus encabezados. |
| Cada sección es alcanzable y legible sin JavaScript | 4.1.2 | El panel es estático; nada debería depender de que un script se ejecute. |
| El texto de estado y resultado ("Approved.", un fallo del pipeline) nunca es solo color | 1.4.1 | Algunas personas lectoras no pueden ver el color, y los registros de algunos jobs son texto sin color. |
| Los enlaces describen su destino en su propio texto, no "click here" | 2.4.4 | Un enlace leído fuera de contexto igual debe tener sentido. |
| El texto cumple un contraste de 4.5:1 contra su fondo | 1.4.3 | Reutiliza los tokens de color ya existentes de este repositorio, ya comprobados. |

## Consideraciones de rendimiento

La exhibición misma no necesita ningún paso de compilación, así que `upload-pages-artifact` la sube directamente: un proyecto más grande agregaría primero un job de build, y su propio presupuesto de rendimiento (tamaño del paquete, peso de las imágenes) pertenecería ahí, no en el job de despliegue. Mantener la validación, la auditoría de accesibilidad y el build como jobs separados, cada uno con `needs`, también significa un fallo rápido: un enlace inválido falla en segundos, mucho antes de que empiece la auditoría de accesibilidad, más lenta, o incluso un despliegue, así que un pull request roto nunca deja a un runner esperando ocioso el paso de aprobación.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Poner `pages: write` e `id-token: write` al inicio del archivo | Cualquier job, no solo `deploy`, puede solicitar un token de despliegue de Pages | Configura esos permisos solo en el job `deploy` |
| Esperar que la aprobación funcione sin ningún entorno configurado | El job corre de inmediato; nada se pausa | Crea el entorno `production`, y marca Required reviewers, en Settings |
| Tratar un rollback como borrar el release defectuoso | El historial de releases deja de coincidir con lo que realmente se publicó | Vuelve a desplegar la etiqueta anterior, y agrega una nota; nunca borres el registro |
| Copiar `deploy.yml` a `workflows/.github/workflows/` dentro de la carpeta de esta lección | No corre nada: GitHub solo lee `.github/workflows/` en la raíz de un repositorio | Cópialo a `.github/workflows/` en la raíz de tu propio repositorio |
| Olvidar `--generate-notes` (o un `body`) en `gh release create` | El release se publica sin ninguna nota | Pasa siempre `--generate-notes`, o escribe las notas tú misma |

## Solución de problemas

**La pestaña Actions no muestra ninguna corrida.** Revisa que el archivo de flujo de trabajo esté en `.github/workflows/deploy.yml`, en la raíz de tu repositorio, no dentro de una carpeta `workflows/` en otro lugar, y que lo hayas subido a la rama nombrada en `on: push: branches:`.

**El job `approve` está atascado, pero no parece haber nada esperando.** Abre la corrida misma (no solo la lista de la pestaña Actions); GitHub muestra el aviso "Review pending deployments" en la propia página de la corrida, no en la lista principal de Actions del repositorio. Firefox y Safari lo muestran en el mismo lugar.

**`deploy` falla con un error de permisos o "not authorized".** Revisa que `permissions: pages: write` e `id-token: write` estén configurados en el job `deploy` mismo, y que Settings → Pages → Source sea "GitHub Actions", no "Deploy from a branch".

**`gh: command not found`, localmente.** `gh` viene preinstalado en los runners alojados por GitHub; en tu propia máquina, instala la [GitHub CLI](https://cli.github.com/) si quieres probar comandos de release antes de hacer push.

**El sitio en vivo muestra una versión antigua después de un rollback.** Revisa que hayas aprobado la propia pausa del rollback en la pestaña Actions (Paso 8); una corrida que queda esperando aprobación nunca despliega.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: agrega una opción "dry run" a `workflow_dispatch` en `deploy.yml` que solo corra la validación y la auditoría de accesibilidad, sin desplegar.
2. **[Creativo](challenges/challenge-2.es.md)**: reescribe el texto del panel de lanzamiento y la plantilla de notas de lanzamiento para tu propio proyecto, comunidad o idioma.
3. **[Explorador](challenges/challenge-3.es.md)**: agrega un entorno de staging, desplegado en cada push a `main`, con producción todavía protegida por aprobación manual y una etiqueta.

## Cómo entregar tu trabajo

1. Completa cada elemento de [`tests/checklist.md`](tests/checklist.md).
2. Toma una captura de pantalla de una corrida de Actions completa (todos los jobs en verde) y otra de la URL en vivo de GitHub Pages.
3. Guárdalas en tu diario de aprendizaje y portafolio. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. En tu diario, responde: ¿qué saldría mal si `deploy` corriera sin `needs: approve`, y por qué eso importa más para un proyecto real que para este ejercicio?

## Lecturas adicionales

- [GitHub Actions documentation](https://docs.github.com/en/actions) (en inglés)
- [GitHub Docs: Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) (en inglés)
- [GitHub Docs: Using environments for deployment](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment) (en inglés)
- [GitHub CLI manual: `gh release`](https://cli.github.com/manual/gh_release) (en inglés)
- [pa11y documentation](https://github.com/pa11y/pa11y) (en inglés)

## Mujeres que conviene conocer

**Fernanda G. Weiden** es una defensora brasileña del software libre, de Porto Alegre. Fue miembro fundadora del consejo de la Free Software Foundation Latin America (2005), se desempeñó como vicepresidenta de la FSFE de 2009 a 2011, contribuyó a Debian y Debian Women, y ayudó a organizar la conferencia FISL. Más tarde lideró ingeniería de producción y confiabilidad de sitios (site-reliability engineering) en Google y Facebook, antes de ser CTO de VTEX de 2022 a 2023.

La ingeniería de producción y confiabilidad de sitios es exactamente el territorio de esta lección: mantener algo real funcionando, con seguridad, después de que se publica. El camino de Fernanda, desde la organización comunitaria de software libre hasta liderar ingeniería de producción en algunas de las plataformas más grandes del mundo, muestra que las dos cosas no son carreras separadas.

_Datos de fuentes públicas, verificados en 2026. ¿Encontraste un error? [Avísanos](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Estándar destacado

Los flujos de trabajo de GitHub Actions son YAML, un formato de datos definido por la [especificación YAML](https://yaml.org/spec/) (en inglés), y GitHub Pages sirve HTTP simple sobre TLS, estandarizado por el IETF. Los entornos con aprobación manual y los tokens de despliegue de OpenID Connect son funciones propias de la plataforma de GitHub, no un estándar web, pero la accesibilidad que este pipeline revisa sí lo es: WCAG 2.2, publicado por la Web Accessibility Initiative del W3C, es lo que la bandera `--standard WCAG2AA` de `pa11y` realmente comprueba.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
