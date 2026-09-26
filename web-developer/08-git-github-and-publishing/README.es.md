# Git, GitHub y publicación

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `web-developer` · **Lección:** `git-github-and-publishing-08` · **Tiempo:** unas 9 horas · 12 sesiones de 45 minutos · unas 3 semanas con 4 sesiones por semana

---

> Publica el portafolio y la colección de proyectos de la Fase 1.

---

## Objetivos de aprendizaje

Al terminar este proyecto serás capaz de:

1. Explicar qué es el control de versiones, y qué son un repositorio, un *commit*, una rama y `main`.
2. Explicar la diferencia entre Git, la herramienta, y GitHub, un sitio web que guarda repositorios de Git.
3. Preparar una carpeta para publicarla: nombres de archivo ordenados, enlaces que funcionan en línea y nada privado.
4. Crear un repositorio, subir tus archivos y hacer *commits* de tus cambios usando solo el navegador.
5. Clonar un repositorio con GitHub Desktop, hacer un cambio en tu propia computadora, hacer un *commit* y enviarlo con *push*.
6. Escribir un README en Markdown que le explique a una persona desconocida qué es tu proyecto y cómo usarlo.
7. Publicar un sitio web con GitHub Pages y probarlo en un celular.
8. Elegir una licencia, explicar por qué el código y el contenido escrito suelen tener licencias diferentes, y dar crédito al trabajo de otras personas.
9. Explicar, a grandes rasgos, qué son un *fork* y un *pull request*.

## Requisitos previos

- **Curso 0.1: Bienvenida a XR Camp.** Tienes tu primer mundo 3D, en una carpeta llamada `my-first-world`.
- **Cursos 1.1 a 1.6.** Tienes tu sitio del Riverside Community Centre, o tu propio sitio, con su formulario de inscripción, su auditoría de accesibilidad y su explorador de programas.
- **Una dirección de correo electrónico** que puedas leer, para crear una cuenta gratuita de GitHub.

## Herramientas necesarias

| Herramienta | Para qué sirve | Costo |
| --- | --- | --- |
| Un navegador moderno | El sitio web de GitHub, y probar tu sitio publicado | Gratis |
| Una cuenta de GitHub | Guardar tu repositorio y publicarlo | Gratis |
| [GitHub Desktop](https://desktop.github.com/) (Windows o macOS) | Trabajar con tu repositorio en tu propia computadora | Gratis |
| Un editor de texto (se recomienda VS Code) | Escribir tu página de colección y tu README | Gratis |
| Un celular (opcional, pero recomendado) | El Momento 3D: abrir tu mundo en un dispositivo real | El tuyo |

En Linux, o en una computadora donde no puedes instalar programas, usa para todo el flujo de trabajo en el navegador de los Pasos 6 y 7. Con eso alcanza para terminar toda la lección.

## Lo que vas a construir

Un **repositorio público** que contiene todos los proyectos que construiste en la Fase 1, publicado como un sitio web real con su propia dirección, que puedes enviarle a cualquier persona:

- Una **página de colección de proyectos**, `index.html`: la página de inicio de tu sitio publicado, con una tarjeta y un enlace claro para cada proyecto.
- Un **README** que explica el repositorio a cualquier persona que lo encuentre.
- Una **licencia** que dice cómo pueden usar tu trabajo otras personas, y **créditos** para todo lo que usaste y no hiciste tú.
- Tu **mundo 3D**, en línea, abierto en tu propio celular.

La solución de referencia está en [`completed/`](completed/): la página de colección de Ana, y archivos modelo de README, licencia y `.gitignore`. El punto de partida tiene la página de colección con diez TODO (tareas pendientes), y una plantilla de README con nueve.

## Guía de carpetas

```text
08-git-github-and-publishing/
├── README.md               # This guide
├── README.es.md            # Spanish
├── README.zh-Hans.md       # Simplified Chinese
├── project.json            # Lesson metadata
├── starter/
│   ├── index.html          # Begin here: your collection page, with 10 TODOs
│   └── README-template.md  # Your repository's README, with 9 TODOs
├── completed/              # Reference solution: open this last
│   ├── index.html          # Ana's collection page
│   ├── README-example.md   # A model README
│   ├── LICENSE-example     # The MIT Licence, filled in
│   └── gitignore-example   # A small .gitignore
├── challenges/             # Three extensions
├── tests/checklist.md      # Self-review before you submit
├── assets/
└── screenshots/
```

## Configuración

1. Crea una carpeta nueva para el trabajo de esta lección, llamada `web-projects`, dentro de tu carpeta `xr-camp`. Esta carpeta se va a convertir en tu repositorio.
2. Copia dentro de ella una **copia** de tu carpeta `my-first-world` del Curso 0.1, y una **copia** de la carpeta de tu sitio de los Cursos 1.1 a 1.6, con el nombre `riverside` (o un nombre corto para tu propio sitio). Trabaja con copias, para que tus originales queden a salvo.
3. Copia `starter/index.html` y `starter/README-template.md` dentro de `web-projects`, y cambia el nombre de la plantilla a `README.md`.

Ahora tu carpeta se ve así:

```text
web-projects/
├── index.html          # your collection page
├── README.md           # your README
├── my-first-world/
│   └── index.html
└── riverside/
    ├── index.html
    ├── join.html
    ├── audit.html
    ├── styles.css
    └── explorer/
        └── ...
```

> **Si estás en China continental.** Allí GitHub y GitHub Pages pueden ser lentos o poco confiables, y algunos días quizás no carguen. Gitee Pages, que antes usaban muchas personas en su lugar, dejó de funcionar en 2024. Las opciones de alojamiento cambian, así que pregunta qué funciona ahora en alguna de las [comunidades donde se ayudan quienes programan](../../docs/en/community.md) (en inglés). Todo lo de esta lección, salvo subir y publicar, también funciona sin conexión: Git y GitHub Desktop guardan todo tu historial en tu propia computadora, y tu página de colección se abre desde tu carpeta. Puedes hacer ahora los Pasos 1 a 5 y el Paso 11, y publicar cuando la conexión lo permita.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; Paso 1: control de versiones; Paso 2: tu cuenta de GitHub | Una cuenta con la verificación en dos pasos activada |
| 2 | Paso 3: prepara tu carpeta | Una carpeta ordenada, sin nada privado |
| 3 | Paso 4: la página de colección (TODO 1 a 7) | Una página de inicio con enlaces a tu mundo 3D y a tu sitio |
| 4 | Paso 4, continuación (TODO 8), y probar cada enlace | Una página de colección terminada que funciona en tu computadora |
| 5 | Paso 5: el README | Un `README.md` que una persona desconocida puede seguir |
| 6 | Paso 6: crea un repositorio y sube tus archivos | Tus proyectos en GitHub, en tu primer *commit* |
| 7 | Paso 7: *commits* e historial (TODO 9) | Un segundo *commit*, y un historial que puedes leer |
| 8 | Paso 8: GitHub Pages | Tu colección en una dirección web real |
| 9 | Paso 9: prueba en línea, y el **Momento 3D** | Tu mundo 3D abierto en tu propio celular |
| 10 | Paso 10: GitHub Desktop | Un cambio hecho en tu computadora, enviado y publicado |
| 11 | Paso 11: licencias, créditos y `.gitignore`; [Reto 1](challenges/challenge-1.es.md) (TODO 10) | Una licencia y créditos en tu repositorio |
| 12 | Paso 12: ramas, *forks* y *pull requests*; [`tests/checklist.md`](tests/checklist.md); **Cómo entregar tu trabajo** | Una colección publicada y probada, y su dirección en tu diario |

### Paso 1: qué es el control de versiones

Seguramente guardaste alguna vez archivos como `site-final.html`, `site-final-2.html` y `site-final-REALLY.html`. El **control de versiones** hace ese trabajo bien: recuerda cada versión de cada archivo, quién lo cambió, cuándo y por qué, y te deja volver a cualquiera de ellas.

Las palabras que necesitas:

| Palabra | Significa |
| --- | --- |
| **Repositorio** (o «repo») | Una carpeta de proyecto cuyo historial se registra: cada archivo, y además cada versión anterior de ese archivo. |
| **Commit** (confirmación) | Una instantánea guardada de todo el proyecto en un momento, con un mensaje corto que dice qué cambió. Tu historial es una lista de *commits*. |
| **Rama** (*branch*) | Una línea de trabajo separada dentro del repositorio, para que puedas probar algo sin cambiar la versión principal. |
| **`main`** | La rama principal: la versión que todas las personas ven, y la que va a publicar GitHub Pages. |
| **Clonar** (*clone*) | Hacer una copia completa de un repositorio en tu propia computadora, con todo su historial, que sigue conectada al original. |
| **Push** (enviar) | Mandar tus *commits* nuevos desde tu computadora a GitHub. |

**Git** es la herramienta que hace el control de versiones. Funciona en tu computadora, y es software libre y de código abierto. **GitHub** es un sitio web que guarda repositorios de Git en línea, para que puedas compartirlos, trabajar en ellos con otras personas y publicarlos. Git llegó primero; GitHub es uno de varios servicios construidos alrededor de Git.

### Paso 2: tu cuenta de GitHub

1. Ve a [github.com](https://github.com/) y regístrate.
2. **Elige tu nombre de usuario con cuidado.** Va a ser parte de la dirección de tu sitio web, y quienes te quieran contratar pueden verlo. No tiene que ser tu nombre real completo: lo mejor es algo corto, profesional y fácil de escribir.
3. Activa la **verificación en dos pasos** (*two-factor authentication*) en la configuración de tu cuenta, si GitHub todavía no te lo pidió. Tu repositorio va a contener tu portafolio: protégelo como tu correo electrónico.
4. En **Settings → Emails** (Configuración → Correos electrónicos), activa **Keep my email addresses private** (mantener privadas mis direcciones de correo). Así GitHub usa una dirección privada «noreply» en tus *commits*, en lugar de la real.

### Paso 3: prepara tu carpeta

Un sitio que funciona cuando lo abres desde tu computadora igual puede romperse en línea. Revisa cuatro cosas antes de subir nada.

**1. Nombres.** Usa letras minúsculas, números y guiones: `my-first-world`, `join.html`, `centre-960.jpg`. Sin espacios y sin acentos.

**2. Las mayúsculas tienen que coincidir exactamente.** En Windows y macOS, `Styles.css` y `styles.css` suelen abrir el mismo archivo. En el servidor donde funciona GitHub Pages son dos archivos diferentes, así que un enlace a `Styles.css` no encuentra nada. Busca en tu HTML cada `href` y cada `src`, y compara cada uno con el nombre real del archivo, letra por letra.

**3. Los enlaces tienen que ser relativos.** Un enlace como `riverside/join.html` o `../styles.css` funciona en cualquier lugar. Un enlace que empieza con `C:\Users\...` o `file:///` apunta a **tu** computadora, y se rompe para todas las demás personas. Busca `C:\` y `file:` en tus archivos y corrige lo que encuentres.

**4. Nada privado.** Cualquier persona puede leer todo lo que subes a un repositorio público, y es muy difícil borrarlo por completo. Revisa cada archivo, incluidos los comentarios, y busca:

- Contraseñas, claves o códigos de cualquier tipo.
- Tu dirección de casa, tu número de teléfono, o los de cualquier otra persona.
- Fotos de personas reales que no dieron su permiso, sobre todo de niñas y niños.
- Archivos que no querías incluir: notas, borradores, descargas.

Cada carpeta que es una página necesita un archivo llamado `index.html`: cuando alguien visita `.../my-first-world/`, el servidor busca `index.html` en esa carpeta.

### Paso 4: la página de colección (TODO 1 a 8)

Abre `index.html` en tu editor y en tu navegador. Es la página de inicio de tu repositorio: lo primero que ven las personas en tu dirección. Los estilos ya están terminados, así que solo escribes HTML.

Resuelve los TODO 1 a 8:

- **Los TODO 1 a 3** están en el `<head>`: el idioma de la página, su descripción y su título. El título es lo primero que dice un lector de pantalla, y el nombre en la pestaña del navegador, así que haz que diga de quién son estos proyectos.
- **Los TODO 4 y 5** son tu nombre y tu presentación. No tienes que usar tu nombre real completo. Esta página va a ser pública.
- **Los TODO 6 a 8** son las tarjetas: una para cada proyecto. Cada tarjeta es un elemento de lista:

  ```html
  <li class="card">
    <h3>Programme explorer</h3>
    <p class="course">Course 1.6</p>
    <p>Search and filter the centre's programmes as you type.</p>
    <p class="built-with">Built with HTML, CSS, and JavaScript.</p>
    <p class="view"><a href="riverside/explorer/index.html">Use the programme explorer</a></p>
  </li>
  ```

**El texto del enlace tiene que decir a dónde lleva.** Quien usa un lector de pantalla puede listar todos los enlaces de una página, fuera de contexto. Cinco enlaces que dicen «View project» (ver proyecto) suenan idénticos; «Visit my first 3D world» (visita mi primer mundo 3D) y «Use the programme explorer» (usa el explorador de programas), no.

Después **prueba cada enlace**: abre la página desde tu carpeta y haz clic en cada uno. Recorre también la página con **Tab**: el enlace para saltar al contenido debería aparecer primero, y cada enlace debería mostrar un contorno de foco claro.

Los TODO 9 y 10 vienen más adelante, en los Pasos 7 y 11.

### Paso 5: el README (Markdown)

Un **README** es la puerta de entrada de un repositorio. GitHub muestra `README.md` debajo de la lista de archivos, así que es lo primero que lee quien visita. El tuyo responde: ¿qué es esto?, ¿cómo lo veo?, ¿cómo se construyó?, ¿qué trabajo de otras personas contiene?, y ¿cómo puedo usarlo?

`.md` significa **Markdown**: texto simple, con unos pocos símbolos que GitHub convierte en encabezados, listas y enlaces:

```markdown
# A heading (level 1)
## A smaller heading (level 2)

A paragraph is just text. **Two stars** make bold text.

- A list item
- Another list item

[Words people click](https://example.com/)
![Alt text that describes the picture](screenshots/home.png)
```

Funciona como HTML, pero escribiendo menos: `#` es `<h1>`, `##` es `<h2>` y `-` es un elemento de lista. Los encabezados siguen yendo en orden, y el texto de los enlaces sigue diciendo a dónde llevan.

Abre tu `README.md` y resuelve sus TODO. Cuando termines, compáralo con [`completed/README-example.md`](completed/README-example.md). La dirección de tu sitio publicado (TODO 3) llega en el Paso 8: déjala para después.

### Paso 6: crea un repositorio y sube tus archivos

1. En GitHub, abre el menú **+** arriba de cualquier página y elige **New repository** (nuevo repositorio).
2. Ponle el nombre `web-projects`. Agrega una descripción de una oración.
3. Elige **Public** (público). En una cuenta gratuita, GitHub Pages solo publica repositorios públicos.
4. Deja **desactivadas** las opciones para agregar un README, un `.gitignore` y una licencia: vas a traer tus propios archivos.
5. Elige **Create repository** (crear repositorio).

Tu repositorio nuevo está vacío, y GitHub muestra una página con instrucciones de configuración. Busca el enlace para **upload an existing file** (subir un archivo existente). (En un repositorio que ya tiene archivos, está en **Add file → Upload files**, es decir, Agregar archivo → Subir archivos).

6. Abre tu carpeta `web-projects` en tu computadora. Selecciona **todo lo que hay dentro**: `index.html`, `README.md` y las dos carpetas. Arrástralos a la página de carga. Puedes arrastrar carpetas completas.
7. Debajo de la lista de archivos, escribe un **mensaje de commit**: `Add Phase 1 projects and collection page`.
8. Elige **Commit directly to the `main` branch** (hacer el *commit* directamente en la rama `main`) y presiona el botón verde para hacer el *commit*.

Ese fue tu primer *commit*. Tus archivos, y tu README, ya están en la página principal de tu repositorio.

Arrastra el **contenido** de `web-projects`, no la carpeta misma. Si arrastras la carpeta, todo queda un nivel más adentro, en `web-projects/web-projects/`, y Pages no va a encontrar tu `index.html`.

El navegador puede subir hasta 100 archivos a la vez, y cada archivo tiene que pesar menos de 25 MB. Si tienes más archivos, súbelos en varias tandas, cada una con su propio *commit*.

### Paso 7: *commits* e historial (TODO 9)

Ahora haz un cambio pequeño en el navegador, y mira cómo lo recuerda Git.

1. En la página principal de tu repositorio, abre `index.html` y elige el ícono del **lápiz** para editarlo.
2. Resuelve el TODO 9: agrega un enlace a tu repositorio. Su dirección es la que aparece ahora mismo en la barra de direcciones de tu navegador: `https://github.com/your-username/web-projects` (con tu nombre de usuario en lugar de `your-username`).
3. Haz un *commit* con el mensaje `Link to the repository from the collection page`.

Ahora abre el **historial** de tu repositorio: el enlace que muestra cuántos *commits* hay, cerca de la parte de arriba de la lista de archivos, con un ícono de reloj. Ves cada *commit*, del más nuevo al más viejo, con su mensaje, su autora o autor y su hora. Elige uno, y GitHub te muestra exactamente qué cambió: las líneas borradas en rojo y las agregadas en verde.

**Los buenos mensajes de commit** dicen qué hace el *commit*, en una oración corta: «Fix the broken link to the join form» (corrige el enlace roto al formulario de inscripción), «Add a card for the programme explorer» (agrega una tarjeta para el explorador de programas). Tu yo del futuro, cuando busque en qué momento se rompió algo, te lo va a agradecer. «Update» (actualización) y «changes» (cambios) no le dicen nada.

Nunca se pierde nada: cada versión anterior se queda en el historial.

### Paso 8: GitHub Pages

**GitHub Pages** convierte un repositorio en un sitio web.

1. En tu repositorio, abre **Settings** (configuración) y luego **Pages** en el menú lateral.
2. En **Build and deployment** (compilación e implementación), pon **Source** (origen) en **Deploy from a branch** (implementar desde una rama).
3. En **Branch** (rama), elige **`main`**, deja la carpeta como **`/ (root)`** (la raíz) y elige **Save** (guardar).
4. Espera. Puede tardar hasta 10 minutos. Recarga la página de configuración de Pages: cuando el sitio esté listo, muestra tu dirección y un botón **Visit site** (visitar el sitio).

Tu dirección es:

```text
https://your-username.github.io/web-projects/
```

Ábrela. Esa es tu colección, en internet de verdad. Cualquier persona, en cualquier lugar, puede abrirla.

A partir de ahora, **cada commit en `main` actualiza tu sitio** automáticamente, en pocos minutos. Vuelve a tu README, resuelve el TODO 3 (tu dirección) y haz un *commit*.

Tres cosas que conviene saber sobre GitHub Pages:

- **Es público.** Trata todo lo que hay en tu sitio publicado como algo que cualquier persona del mundo puede ver.
- **Es para sitios estáticos**: HTML, CSS, JavaScript, imágenes y modelos 3D. No puede guardar lo que las personas escriben en tu formulario de inscripción. El formulario igual abre su página de agradecimiento, pero no se guarda nada, y como el formulario usa `method="get"`, lo que se escribió aparece en la dirección de la página de agradecimiento. Cuando lo pruebes en línea, usa datos inventados. GitHub también dice que los sitios de Pages no deben usarse para transacciones delicadas, como enviar contraseñas o números de tarjetas de crédito.
- **Tiene límites**, generosos para un portafolio: un sitio publicado puede pesar hasta 1 GB.

Un repositorio que se llama exactamente `your-username.github.io` se convierte en un sitio en `https://your-username.github.io/`, sin nombre de carpeta. Cada cuenta puede tener uno. Por ahora, deja ese nombre libre: quizás lo quieras para tu portafolio.

### Paso 9: prueba en línea

Abre tu sitio publicado y pruébalo **ahí**, no en tu computadora:

1. Haz clic en cada enlace de la página de colección. Una página **404** significa que una ruta o una mayúscula no coincide (Paso 3).
2. Revisa que los estilos y las imágenes carguen en cada página.
3. Abre el explorador de programas, guarda un programa y recarga. Su `localStorage` también funciona en línea, pero es distinto del de tu computadora: para el navegador, una dirección diferente es un sitio diferente.
4. Después haz el **Momento 3D**, más abajo, en tu celular.

### Paso 10: GitHub Desktop

El navegador alcanza para cambios pequeños. Para el trabajo real, editas los archivos en tu propia computadora, en tu editor, y los envías a GitHub. **GitHub Desktop** lo hace fácil, sin escribir comandos.

1. Instala [GitHub Desktop](https://desktop.github.com/), ábrelo e inicia sesión con tu cuenta de GitHub.
2. **Clona** tu repositorio: en su página de GitHub, abre el menú verde **Code** (código) y elige **Open with GitHub Desktop** (abrir con GitHub Desktop), o en GitHub Desktop elige **File → Clone repository** (Archivo → Clonar repositorio). Elige dónde guardarlo y luego **Clone** (clonar).

   Elige una carpeta que **no** sincronicen OneDrive, Dropbox ni iCloud: las aplicaciones de sincronización y Git pueden estorbarse entre sí. La carpeta clonada es ahora tu copia de trabajo; tu carpeta `web-projects` original puede quedarse como respaldo.
3. Abre la carpeta clonada en tu editor y haz un cambio: mejora la descripción de un proyecto en tu página de colección. Guarda.
4. En GitHub Desktop, la pestaña **Changes** (cambios) muestra el archivo y las líneas que cambiaron. Escribe un resumen (tu mensaje de *commit*) abajo a la izquierda, y elige **Commit to main** (hacer *commit* en `main`).
5. Tu *commit* está solo en tu computadora. Elige **Push origin** (enviar al origen) para mandarlo a GitHub.
6. Espera uno o dos minutos y recarga tu sitio publicado. Tu cambio ya está publicado.

**Clonar y descargar no son lo mismo.** **Code → Download ZIP** (descargar ZIP) te da los archivos tal como están ahora: sin historial y sin conexión con GitHub. Clonar te da todo el historial, y una copia desde la que puedes hacer *commits* y *push*.

**Si también editas en el navegador**, tu computadora todavía no conoce esos *commits*. Antes de empezar a trabajar en GitHub Desktop, elige **Fetch origin** (buscar cambios en el origen) y después **Pull origin** (traer los cambios del origen) si te lo ofrece. Primero traes los cambios, luego trabajas, luego haces el *commit* y luego el *push*: ese hábito evita la mayoría de los problemas.

### Paso 11: licencias, créditos y .gitignore

**Licencias.** Una licencia es un texto legal corto que dice qué pueden hacer otras personas con tu trabajo. Sin licencia, la ley te da todos los derechos a ti, y nadie puede copiar, cambiar ni compartir tu trabajo. En GitHub, las personas igual pueden ver un repositorio público y hacerle un *fork*, porque los términos de GitHub lo permiten, pero no pueden hacer nada más. Si quieres que otras personas aprendan de tu código y lo reutilicen, dilo con una licencia.

**El código y el contenido escrito suelen tener licencias diferentes**, porque son tipos de trabajo diferentes:

- **Las licencias de software**, como la **licencia MIT**, están escritas para código. La MIT es corta: cualquier persona puede usar, copiar, cambiar y compartir el código, siempre que conserve tu aviso de derechos de autor y el texto de la licencia, y tú no eres responsable si algo falla. Es una de las licencias más comunes en GitHub.
- **Las licencias Creative Commons** están escritas para textos, imágenes, video y música. La propia Creative Commons recomienda **no** usar sus licencias para software: no tratan cosas que el software necesita, como el código fuente.

XR Camp hace exactamente esto. Su repositorio tiene dos archivos de licencia: [`LICENSE-CODE`](../../LICENSE-CODE) para el código, y [`LICENSE-CONTENT`](../../LICENSE-CONTENT) para las lecciones y la documentación, que usa **CC BY-NC-SA 4.0**:

| Parte | Significa |
| --- | --- |
| **BY** | Da crédito a quien lo creó. |
| **NC** | No comercial: no se puede usar para ganar dinero. |
| **SA** | Compartir igual: si lo cambias y lo compartes, usa la misma licencia. |

Para tu repositorio, el modelo de [`completed/`](completed/) usa la licencia MIT para el código, y se reserva todos los derechos sobre los textos y las imágenes. Elige lo que te haga sentir cómoda. Tus proyectos crecieron a partir de los archivos de inicio de XR Camp, así que dale crédito a XR Camp, y lee `LICENSE-CODE` para ver qué permite.

Para agregar una licencia en el navegador: **Add file → Create new file** (Agregar archivo → Crear archivo nuevo), ponle el nombre `LICENSE`, y GitHub te ofrece un botón **Choose a license template** (elegir una plantilla de licencia). Completa el año y tu nombre, y haz el *commit*.

**Créditos.** Todo lo que usaste y no hiciste tú necesita un crédito: su título, su autora o autor, de dónde viene y su licencia. A-Frame (MIT), las lecciones de XR Camp, una foto, una fuente tipográfica. Ponlos en la sección **Credits** (créditos) de tu README, o en un archivo `ATTRIBUTION.md` aparte, como hace cada lección de XR Camp. El Reto 1 te guía por las dos opciones.

**`.gitignore`.** Un archivo llamado `.gitignore`, en el nivel superior del repositorio, lista los archivos que Git nunca debe agregar. GitHub Desktop y Git en la línea de comandos lo respetan; una subida desde el navegador agrega exactamente los archivos que arrastras, así que revisa antes de arrastrar.

```text
.DS_Store
Thumbs.db
.env
private/
```

`.DS_Store` (macOS) y `Thumbs.db` (Windows) son archivos que tu computadora crea por su cuenta. `.env` es un archivo donde quienes desarrollan suelen guardar claves secretas. `private/` ignora una carpeta completa. Mira [`completed/gitignore-example`](completed/gitignore-example).

**Nunca hagas commit de contraseñas, claves ni datos personales.** Borrar un archivo en un *commit* posterior **no** lo quita del historial: cualquier persona puede abrir el *commit* viejo y leerlo. Si alguna vez un secreto entra en un *commit*, trátalo como público: cambia la contraseña, o cancela la clave, de inmediato.

### Paso 12: ramas, *forks* y *pull requests*

Trabajaste todo el tiempo en `main`, y eso está bien para un proyecto personal. Los equipos trabajan de otra forma, y tú también lo vas a hacer, en el Curso 2.7. Esta es la idea:

- Una **rama** es una línea de trabajo separada. Creas una rama llamada `new-card`, cambias cosas ahí, y `main`, y tu sitio publicado, se quedan exactamente como estaban.
- Un **pull request** (solicitud de cambios) pide que los cambios de una rama se fusionen con otra. Muestra cada línea que cambió, y las personas pueden comentarlo antes de que alguien presione **Merge** (fusionar).
- Un **fork** (bifurcación) es tu propia copia del repositorio de **otra persona**, en tu cuenta. Cambias tu *fork* y luego abres un *pull request* para proponer tu cambio al original.

Así funciona el código abierto, incluido XR Camp: corriges un error de tipeo de una lección en tu *fork*, abres un *pull request*, y una persona que mantiene el proyecto lo revisa y lo fusiona. El Reto 3 te deja probar una rama y un *pull request* en tu propio repositorio.

## Explicación del código clave

**`href="riverside/join.html"`.** Una ruta **relativa**: «desde donde está esta página, entra en `riverside` y abre `join.html`». Funciona en tu computadora y en línea, porque las carpetas se mueven juntas.

**`index.html`.** El archivo que envía un servidor cuando una dirección termina con el nombre de una carpeta. `https://your-username.github.io/web-projects/` envía `web-projects/index.html`.

**`[Words people click](address)`.** Un enlace en Markdown. La misma regla que en HTML: las palabras dicen a dónde lleva.

**Líneas de `.gitignore`.** Un patrón por línea. Un nombre ignora ese archivo en cualquier lugar; un nombre que termina en `/` ignora una carpeta completa; `*` significa «cualquier cosa», así que `*.key` ignora cada archivo que termina en `.key`.

**`Copyright (c) 2026 Ana`** en la licencia. La licencia solo funciona si dice quién tiene los derechos. Reemplaza el año y el nombre por los tuyos.

## Momento 3D

Tu primer mundo 3D del Curso 0.1 está en tu repositorio, en `my-first-world/`, así que ya está publicado:

```text
https://your-username.github.io/web-projects/my-first-world/
```

1. Abre esa dirección en tu **celular**. Escribirla es lento: abre tu página de colección en tu computadora y envíate el enlace, o escribe la dirección más corta de la colección y toca el enlace a tu mundo.
2. **Revisa que haya cargado.** Después de un momento, aparecen el cielo y las formas. Arrastra el dedo para mirar alrededor. Si la página se queda en blanco, A-Frame todavía se está descargando de internet: espera, y recarga una vez.
3. **Revisa que siga siendo accesible.** El mundo publicado tiene que seguir haciendo todo lo que hacía en tu computadora:
   - La **descripción de la escena** está en la página, y sigue coincidiendo con tu mundo.
   - El botón **Pause animation** (pausar la animación) detiene la forma que se mueve, y la vuelve a poner en marcha.
   - Con **reducir movimiento** activado en la configuración de accesibilidad de tu celular, la animación no empieza en absoluto.
4. Toma una captura de pantalla de tu mundo en tu celular, para tu diario.

Un mundo que construiste en tu primera hora en XR Camp ahora está en internet, y puedes mostrárselo a cualquier persona enviándole un solo enlace. Cada proyecto 3D de XR Camp se va a publicar de la misma manera.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| La página de colección tiene un título que dice de quién son los proyectos | 2.4.2 | Es lo primero que dice un lector de pantalla, y el nombre en la pestaña. |
| Cada enlace dice a dónde lleva | 2.4.4 | «Use the programme explorer», no «View». |
| Los proyectos son una lista real, con encabezados reales | 1.3.1 | Los lectores de pantalla anuncian «lista, 5 elementos» y pueden saltar entre encabezados. |
| El idioma de la página está definido | 3.1.1 | El lector de pantalla usa la voz correcta. |
| Un enlace para saltar al contenido, y un contorno de foco visible | 2.4.1, 2.4.7 | Quienes usan el teclado pueden saltar a los proyectos, y siempre ven dónde están. |
| El mundo 3D publicado conserva su descripción y su botón de pausa | 1.1.1, 2.2.2 | Publicarlo no debe quitarle lo que lo hacía accesible. |
| Las capturas de pantalla de tu README tienen texto alternativo | 1.1.1 | El README también es una página web. |
| Encabezados del README en orden, y texto de enlace descriptivo | Buena práctica (no es una regla de WCAG) | Las personas que usan lectores de pantalla también leen repositorios. |

## Consideraciones de rendimiento

Seguramente toda tu colección pesa unos pocos megabytes, casi todo en imágenes; una página de HTML pesa unos pocos kilobytes. GitHub Pages es rápido, pero no puede hacer pequeña una imagen grande: mantén cada imagen dentro del presupuesto de XR Camp de 1 MB, y usa las imágenes adaptables del Curso 1.4. A-Frame se carga desde `aframe.io`, no desde tu repositorio, así que no cuenta para tu sitio. Deja fuera de tu repositorio los archivos grandes que no publicas, como fotos y videos originales: cada archivo del que haces *commit* se queda en el historial, y hace más grande cada clon.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Subir la carpeta en lugar de su contenido | Tu sitio queda un nivel más adentro; la dirección muestra un 404 | Arrastra los archivos y carpetas que están **dentro** de `web-projects` |
| `Styles.css` en un enlace, `styles.css` en el disco | Funciona en tu computadora, falta en línea | Haz coincidir las mayúsculas exactamente; usa nombres en minúsculas |
| Enlaces que empiezan con `C:\` o `file:///` | Rotos para todas las personas, menos para ti | Enlaces relativos: `riverside/index.html` |
| Mensajes de *commit* como «update» | No puedes encontrar nada en tu historial | Di qué cambió: «Fix the join form link» |
| Borrar una contraseña en un *commit* nuevo | Sigue estando en el historial | Nunca hagas *commit* de ella; si lo hiciste, cámbiala de inmediato |
| Editar en el navegador y en tu computadora sin traer los cambios | GitHub Desktop se niega a hacer *push* | Primero **Fetch** y **Pull**, luego trabaja |
| Ninguna licencia | Nadie puede reutilizar tu trabajo legalmente | Agrega un archivo `LICENSE` |
| Clonar en una carpeta de OneDrive, Dropbox o iCloud | Conflictos extraños y archivos duplicados | Clona en una carpeta que no se sincronice |

## Solución de problemas

**Mi dirección muestra una página 404.** Espera 10 minutos después de activar Pages, y recarga. Luego revisa, en **Settings → Pages**, que la rama sea `main` y la carpeta sea `/ (root)`, y que `index.html` esté en el nivel superior de tu repositorio, no dentro de otra carpeta. El nombre tiene que ser exactamente `index.html`, en minúsculas.

**Mi dirección muestra mi README en lugar de mi página de colección.** GitHub Pages usa `README.md` como página de inicio solo cuando no hay un `index.html`. Revisa que `index.html` esté en el nivel superior y escrito en minúsculas.

**La página carga, pero sin estilos ni imágenes.** Una ruta o una mayúscula en un `href` o un `src` no coincide con el archivo real. Abre las herramientas para desarrolladores del navegador, busca en la **Console** (consola) el nombre del archivo que falta, y compáralo letra por letra.

**Mi cambio no aparece en mi sitio.** ¿Hiciste el *commit* y, en GitHub Desktop, el *push*? Pages tarda unos minutos en actualizarse. Después recarga sin la caché: **Ctrl + Shift + R** (en una Mac, **⌘ + Shift + R**; en Safari, **⌘ + Option + R**). En un celular, cierra la pestaña y vuelve a abrir la dirección.

**GitHub Desktop no hace push: dice que hay commits más nuevos.** Alguien, seguramente tú en el navegador, hizo un *commit* en GitHub desde la última vez que trajiste los cambios. Elige **Fetch origin**, luego **Pull origin** y luego **Push origin**.

**Mi mundo 3D se ve en blanco en mi celular.** Revisa que tu celular tenga conexión: A-Frame se descarga de internet la primera vez. Si sigue sin aparecer, abre la misma dirección en una computadora. Si ahí funciona, puede que el celular no sea compatible con WebGL: la descripción de la escena en la página existe justo para este caso.

## Retos adicionales

Tres extensiones, en [`challenges/`](challenges/):

1. **[Fundamento](challenges/challenge-1.es.md)** (obligatorio): agrega una licencia y créditos a tu repositorio.
2. **[Creativo](challenges/challenge-2.es.md)**: un README en tu propio idioma.
3. **[Explorador](challenges/challenge-3.es.md)**: crea una rama, cambia algo y fusiónala con un *pull request*, o prueba Git en la línea de comandos.

## Cómo entregar tu trabajo

1. Completa todos los puntos de [`tests/checklist.md`](tests/checklist.md).
2. Escribe la dirección de tu sitio publicado, y la de tu repositorio, en tu diario de aprendizaje.
3. Guarda la captura de pantalla de tu mundo 3D en tu celular, y una de tu página de colección, en tu diario y en tu portafolio. Comparte la dirección de tu sitio publicado con otras personas que programan (consulta [dónde compartir tu trabajo](../../docs/en/community.md), en inglés).
4. En tu diario, responde: ¿a quién le vas a enviar tu dirección primero, y qué quieres que vea?

## Lecturas adicionales

- [GitHub Docs: About Git](https://docs.github.com/en/get-started/using-git/about-git) (en inglés): acerca de Git.
- [GitHub Docs: Creating a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository) (en inglés): cómo crear un repositorio nuevo.
- [GitHub Docs: Adding a file to a repository](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository) (en inglés): cómo agregar un archivo a un repositorio.
- [GitHub Docs: Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) (en inglés): cómo configurar el origen de publicación de tu sitio de GitHub Pages.
- [GitHub Docs: GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) (en inglés): los límites de GitHub Pages.
- [GitHub Docs: Committing and reviewing changes in GitHub Desktop](https://docs.github.com/en/desktop/making-changes-in-a-branch/committing-and-reviewing-changes-to-your-project-in-github-desktop) (en inglés): cómo hacer *commits* y revisar cambios en GitHub Desktop.
- [GitHub Docs: Licensing a repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository) (en inglés): cómo ponerle una licencia a un repositorio.
- [GitHub Docs: Ignoring files](https://docs.github.com/en/get-started/git-basics/ignoring-files) (en inglés): cómo ignorar archivos.
- [Choose a License](https://choosealicense.com/) (en inglés): una guía para elegir una licencia.

## Mujeres que conviene conocer

**Tracy Chou** es una ingeniera de software que estuvo en los primeros equipos de ingeniería de Quora y de Pinterest. En octubre de 2013 creó un repositorio colaborativo en GitHub con datos sobre las mujeres en ingeniería en empresas de tecnología: personas y empresas agregaban allí sus propias cifras. En 2018 fundó Block Party, una herramienta contra el acoso en línea que más tarde se convirtió en una herramienta de privacidad para redes sociales; DeleteMe adquirió Block Party en marzo de 2026.

Un repositorio no es solo para código. Tracy Chou usó uno para reunir cifras difíciles de encontrar, en público, donde cualquier persona podía verlas y sumar las suyas. Todo lo que aprendiste en esta lección (un repositorio público, un README que lo explica, *commits* de muchas personas) puede ser una herramienta para el cambio.

> **Nota editorial — verificar antes de publicar.** Las afirmaciones biográficas de las secciones Mujeres que conviene conocer deben contrastarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

**Git** es software libre y de código abierto, así que cualquier persona puede usarlo, estudiarlo y alojar repositorios con él. **Markdown** nació sin una definición precisa, así que distintas herramientas mostraban el mismo archivo de maneras diferentes; **CommonMark** es una especificación de Markdown definida con rigor, y GitHub Flavored Markdown es un superconjunto estricto de CommonMark. Las licencias también tienen nombres cortos estándar: la lista de licencias **SPDX** le da a cada una un identificador, como `MIT` y `CC-BY-NC-SA-4.0`, para que las herramientas puedan leerlas. La Open Source Initiative aprueba licencias como «de código abierto»: la MIT está aprobada; la CC BY-NC-SA 4.0 no, porque prohíbe el uso comercial.

## Licencia

Código: [`LICENSE-CODE`](../../LICENSE-CODE) · Contenido: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
