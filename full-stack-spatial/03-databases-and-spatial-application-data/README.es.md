# Bases de datos y datos de aplicaciones espaciales

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `full-stack-spatial` · **Lección:** `databases-and-spatial-application-data-03` · **Tiempo:** unas 12 horas · 16 sesiones de 45 minutos · unas 4 semanas con 4 sesiones por semana

---

> Guarda y carga escenas o anotaciones creadas por la usuaria.

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Diseñar un pequeño esquema relacional (tablas, columnas, y las relaciones entre ellas) para datos espaciales: posiciones, rotaciones, y las notas que alguien que aprende adjunta a un objeto.
2. Explicar por qué una clave foránea necesita `ON DELETE CASCADE`, y activar las eliminaciones en cascada con `PRAGMA foreign_keys = ON`.
3. Leer y escribir una base de datos SQLite desde Node.js con el módulo integrado `node:sqlite`, usando sentencias preparadas en lugar de construir SQL a partir de cadenas de texto.
4. Envolver una escritura de varios pasos (reemplazar cada objeto de una escena) en una transacción, para que tenga éxito por completo o no deje nada a medias.
5. Hacer cumplir permisos a nivel de fila en el código del servidor: una dueña puede leer y cambiar su propia fila; cualquier otra persona solo puede leer una fila marcada como pública.
6. Escribir y ejecutar un pequeño conjunto numerado de migraciones de base de datos, y explicar qué pasa si un servidor arranca contra una base de datos que aún no las ha ejecutado.
7. Describir el ciclo de vida de los datos de una base de datos (qué debería pasar con las filas relacionadas cuando se elimina una cuenta) y respaldar un archivo SQLite de forma segura con `VACUUM INTO`.
8. Extender el servidor de autenticación del Curso 5.2 sin debilitarlo: las cuentas, sesiones y protección CSRF siguen funcionando exactamente igual.

## Requisitos previos

- **Curso 5.2: Autenticación y cuentas de usuario**: esta lección parte de su servidor terminado y mantiene funcionando sus cuentas, sesiones y protección CSRF.
- **Curso 5.1: Fundamentos de backend y API**: rutas, cuerpos JSON, validación y códigos de estado.
- Comodidad con `async`/`await` y leer un stack trace, del **Curso 4 (Desarrolladora Frontend)**.

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Node.js 22.5 o posterior (se recomienda la LTS "24 Krypton") | Ejecuta el servidor, incluido el módulo integrado `node:sqlite` que usa esta lección | Gratis |
| Un editor de texto (por ejemplo, VS Code) | Escribir el código del servidor y del cliente | Gratis |
| Un navegador moderno (Chrome, Firefox, Safari o Edge) | Ejecutar la exhibición y probar tu trabajo | Gratis |
| DB Browser for SQLite (opcional) | Una forma gráfica, gratuita y sin conexión de mirar dentro del archivo `.sqlite` que crea esta lección; este curso nunca lo exige, ya que `node server/inspect-db.js` hace el mismo trabajo desde la terminal | Gratis |

Node.js se puede descargar desde [nodejs.org](https://nodejs.org/); estudiantes en China continental también pueden usar el [espejo de Node.js de npmmirror](https://registry.npmmirror.com/binary.html?path=node/) si el sitio oficial va lento. Nada en esta lección necesita un paquete de npm ni una conexión a internet una vez instalado Node.js: `node:sqlite`, `node:http` y `node:test` vienen todos incluidos en el propio Node.

## Lo que vas a construir

El Curso 5.2 le dio a cada estudiante una cuenta con sesión iniciada. Esta lección le da a cada cuenta un lugar real donde guardar su propio trabajo: una pequeña base de datos SQLite, que guarda **escenas** (un arreglo guardado de la vasija de barro, el aro de la canasta y la piedra de jade, las mismas tres exhibiciones de los cursos de Desarrolladora Web3D) y **anotaciones** (una nota breve que alguien que aprende adjunta a una exhibición dentro de una escena). Diseñarás el esquema, escribirás las migraciones que lo crean, y construirás la API y las verificaciones de permisos que permiten a una dueña arreglar y guardar una escena, marcarla como pública o mantenerla privada, y verla cargar exactamente como la dejó, mientras otra persona con sesión iniciada solo puede mirar una escena pública, nunca cambiarla.

Este es el tercer paso de la **exhibición cultural virtual** en curso que atraviesa la Fase 5: 5.1 le dio una API, 5.2 le dio cuentas, y esta lección le da datos reales, estructurados, de múltiples filas, con las relaciones y permisos que necesita una aplicación en crecimiento. El Curso 5.4 retoma esta misma base de datos para agregar salas en tiempo real, multiusuario.

La solución de referencia está en [`completed/`](completed/); el starter tiene **13 TODOs numerados**, la mayoría en `server/`, con tres archivos terminados (`js/scene.js`, `server/auth.js`, `server/sessions.js`, y `server/rateLimit.js`) heredados para que esta lección pueda enfocarse en la base de datos.

## Guía de carpetas

```text
03-databases-and-spatial-application-data/
├── README.md
├── starter/                # begin here
│   ├── index.html, styles.css, js/
│   └── server/
│       ├── migrations/     # numbered .sql files, run in order
│       ├── db.js           # the only file that touches SQLite
│       ├── validation.js, routes.js, server.js
│       ├── auth.js, sessions.js, rateLimit.js   # carried over from 5.2
│       ├── inspect-db.js, backup.js             # small command-line tools
│       └── server.test.js
├── completed/               # reference solution
├── challenges/               # Three challenges: Foundation is required
├── tests/                    # self-review checklist
├── assets/
└── screenshots/
```

## Configuración

1. Abre una terminal y ejecuta `node --version`. Necesitas la 22.5 o posterior; este curso está escrito y probado contra Node 24 (la LTS actual).
2. Haz `cd` a `starter/server` y copia `.env.example` a `.env` (ajusta `PORT` solo si otra cosa en tu máquina ya usa el 8879).
3. Sirve todo el repositorio desde su raíz con cualquier servidor de archivos estático (por ejemplo `python3 -m http.server 8766`, o el que ya ejecutan las propias herramientas de este curso), así `starter/index.html` abre sobre `http://`, no `file://`.
4. En una segunda terminal, desde `starter/server`, ejecuta `node server.js`. Deberías ver `Scenes and annotations server listening on http://127.0.0.1:8879`, y, una vez, una advertencia de una línea `ExperimentalWarning: SQLite is an experimental feature`. Ambas cosas son esperadas; ver Solución de problemas.
5. Abre el `starter/index.html` servido en tu navegador. Verás la exhibición y su arreglo por defecto; "Your account" es el único panel funcional hasta el Paso 12.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Lee este Recorrido y los archivos del starter; ejecuta `node server/server.js` y confirma que responde `{ "ok": true }`. | El starter corriendo, y un plan para los 13 TODOs por delante. |
| 2 | Diseña primero en papel las tablas `scenes`, `scene_objects` y `annotations` (columnas, tipos, qué clave foránea apunta a dónde); escribe las tres migraciones `CREATE TABLE` del TODO 1. | Tres archivos de migración terminados, aún sin ejecutar. |
| 3 | TODO 2: termina y activa `runMigrations()`. | `node server/inspect-db.js` imprime las cinco tablas, sus claves foráneas, y cuatro migraciones aplicadas. |
| 4 | TODO 3: funciones de usuario en `db.js` (de `insertUser` a `deleteUser`), con sentencias preparadas. | `node --test` pasa el registro y el inicio de sesión sin lanzar errores (las aserciones llegan en el Paso 13). |
| 5 | TODO 4: funciones de escena (de `insertScene` a `deleteScene`). | Una escena que insertas a mano (en un script de prueba, o el depurador) vuelve desde `getSceneById` con la dueña correcta. |
| 6 | TODO 5: funciones de `scene_objects`, incluyendo una transacción en `replaceSceneObjects`. | Tres objetos guardados para una escena vuelven en las mismas posiciones que les diste. |
| 7 | TODO 6: funciones de anotaciones. | Una anotación que insertas vuelve desde `listAnnotationsForScene`. |
| 8 | TODO 7: validación para metadatos de escena, objetos de escena y anotaciones. | Una escena con una posición no numérica se rechaza antes de llegar siquiera a `db.js`. |
| 9 | TODO 8: `createScene`, `listMyScenes`, `listPublicSceneGallery`, `getScene` en `routes.js`. | Estas funciones devuelven la forma correcta al llamarlas directamente; conectarlas a HTTP es el Paso 11. |
| 10 | TODO 9: `updateScene` y `removeScene`, con la verificación de propiedad al frente de cada escritura. | Renombrar o eliminar una escena que no es tuya se rechaza antes de que el Paso 11 siquiera exista para probarlo por HTTP. |
| 11 | TODO 10 (rutas de anotaciones) y TODO 11 (el enrutamiento de `server.js`, incluyendo los dos patrones de parámetro de ruta). | Cada ruta funciona por `curl` o la pestaña de red del navegador: crear, listar, ver, editar, eliminar una escena; agregar y eliminar una anotación. |
| 12 | TODO 12: conecta `js/main.js`: cargar "My scenes" y "Public scenes", guardar el arreglo que construiste, cargar uno guardado de vuelta a la vista 3D. | Guarda una escena, recarga la página, cárgala de vuelta: la exhibición reaparece exactamente donde la dejaste. |
| 13 | TODO 13: termina las aserciones de `server.test.js`; ejecuta `node --test` hasta que pase todo; ejecuta `node server/backup.js` y confirma que aparece un archivo nuevo bajo `server/data/backups/`. | Una suite de pruebas en verde, y un archivo de respaldo real que puedes abrir con `node server/inspect-db.js` (apunta `DB_FILE` hacia él). |
| 14 | Trabaja [`tests/checklist.md`](tests/checklist.md) de principio a fin, con un teclado real y, si tienes uno, un lector de pantalla. | Cada elemento marcado, o una nota sobre qué no pudiste probar y por qué. |
| 15 | Completa el [reto Fundamento](challenges/challenge-1.es.md) obligatorio. | Tu propia extensión pequeña y deliberada al esquema o a las reglas de permisos. |
| 16 | Un reto de extensión (Creativo o Explorador), y luego **Entregando tu trabajo**. | Capturas de pantalla, tu entrada de diario, y un proyecto listo para mostrar. |

### Paso 1: lee el esquema que vas a construir (sin TODO todavía)

Antes de escribir SQL, dibuja en papel la forma de los datos. Esta lección tiene cuatro tablas:

```text
users ──< scenes ──< scene_objects
              └────< annotations >── users
```

Una fila de `scenes` pertenece a exactamente una fila de `users` (su dueña). Una fila de `scene_objects` pertenece a exactamente una fila de `scenes` (una exhibición colocada). Una fila de `annotations` pertenece a exactamente una fila de `scenes` *y* nombra la fila de `users` que la escribió. Dibuja las flechas antes de escribir un solo `CREATE TABLE`: una clave foránea equivocada es mucho más costosa de corregir una vez que filas reales dependen de ella.

### Paso 2: diseña las tablas (TODO 1)

Abre `server/migrations/002_create_scenes.sql`, `003_create_scene_objects.sql`, y `004_create_annotations.sql`. Cada uno tiene un comentario que describe exactamente qué columnas agregar y qué claves foráneas necesitan `ON DELETE CASCADE`. `001_create_users.sql` (ya terminado, heredado de la fila de cuenta del Curso 5.2) muestra el estilo: una sentencia por archivo, tipos de columna simples, sin ingenio de más.

```sql
-- from 001_create_users.sql, already finished:
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  recovery_code_hash TEXT NOT NULL,
  created_at TEXT NOT NULL
);
```

La posición y la rotación se guardan como columnas numéricas separadas (`position_x`, `position_y`, `position_z`, `rotation_y`), no como un solo blob JSON. Esa es una compensación deliberada: hace que cada valor pueda verificarse en su tipo por la propia SQLite, y es lo que le permite a `validation.js` (Paso 8) rechazar un campo de posición no numérico, campo por campo; pero sí significa que agregar más adelante una nueva propiedad por objeto necesita una migración nueva, no solo una clave nueva en un blob.

### Paso 3: escribe un ejecutor de migraciones (TODO 2)

`db.js` ya abre la base de datos y activa `PRAGMA foreign_keys = ON`: SQLite ignora cada `ON DELETE CASCADE` en tus migraciones a menos que esto se ejecute primero, en cada conexión, cada vez. Termina `runMigrations()`: debe leer `migrations/*.sql` en orden de nombre de archivo, saltar cualquier archivo ya registrado en una tabla `_migrations`, y ejecutar cada uno nuevo dentro de su propia transacción, para que un fallo a mitad de camino nunca deje una tabla creada a medias sin ningún registro del intento.

```js
db.exec('BEGIN');
try {
  db.exec(sql);
  db.prepare('INSERT INTO _migrations (name, applied_at) VALUES (?, ?)').run(file, new Date().toISOString());
  db.exec('COMMIT');
} catch (error) {
  db.exec('ROLLBACK');
  throw new Error(`Migration ${file} failed and was rolled back: ${error.message}`);
}
```

Una vez terminado, descomenta la llamada protegida debajo. Ejecuta `node server/inspect-db.js`, sin dependencia que instalar, solo `node:sqlite` leyendo `sqlite_master` y `_migrations`, y deberías ver las cuatro tablas, sus claves foráneas, y cuatro nombres de migración aplicados.

### Paso 4: funciones de usuario con sentencias preparadas (TODO 3)

Cada función en `db.js` sigue la misma forma: `db.prepare('... ? ...').run(value)` o `.get(value)` o `.all(value)`. El `?` se llena por separado del texto SQL: un valor nunca se convierte en parte de la propia cadena SQL:

```js
export function findUserByUsername(username) {
  return rowToUser(db.prepare('SELECT * FROM users WHERE username = ?').get(username));
}
```

Termina `insertUser`, `findUserByUsername`, `findUserById`, `updateUserPassword`, y `deleteUser` de esta manera. `deleteUser` es la función más corta de todo el archivo, un solo `DELETE FROM users WHERE id = ?`, porque la cascada que diseñaste en el Paso 2 hace el resto.

### Paso 5: funciones de escena (TODO 4)

`insertScene` y `getSceneById` ya están terminadas como ejemplo: `getSceneById` une `scenes` con `users` para que una escena vuelva con el nombre de usuario de su dueña, no solo un id opaco:

```js
export function getSceneById(id) {
  return rowToScene(db.prepare(`
    SELECT scenes.*, users.username AS owner_username
    FROM scenes JOIN users ON users.id = scenes.owner_id
    WHERE scenes.id = ?
  `).get(id));
}
```

Termina `listScenesByOwner`, `listPublicScenes` (el mismo join, filtrado por `is_public = 1`), `updateSceneMeta`, y `deleteScene`.

### Paso 6: objetos de escena y una transacción (TODO 5)

`replaceSceneObjects(sceneId, objects)` es la única función de este proyecto que escribe más de una fila a la vez: elimina cada objeto existente de una escena, y luego inserta la lista nueva. Ambos pasos ocurren dentro de `db.exec('BEGIN')` / `db.exec('COMMIT')`, con `db.exec('ROLLBACK')` si falla: la misma forma que usa el ejecutor de migraciones del Paso 3. Sin la transacción, un error de validación lanzado entre la eliminación y la última inserción dejaría una escena con solo algunos de sus objetos guardados, y nada en la base de datos lo diría.

### Paso 7: anotaciones (TODO 6)

El último conjunto de funciones de `db.js`: `insertAnnotation`, `listAnnotationsForScene`, `getAnnotationById`, `deleteAnnotation`. El mismo patrón de sentencia preparada que cada función anterior.

### Paso 8: valida escenas, objetos y anotaciones (TODO 7)

`server/validation.js` ya tiene `validateCredentials` terminada (heredada de 5.2). Termina `validateSceneMeta`, `validateSceneObjects`, y `validateAnnotation`. La comprobación más importante es sobre cada número que un cliente envía:

```js
function isFiniteNumberWithin(value, max) {
  return typeof value === 'number' && Number.isFinite(value) && Math.abs(value) <= max;
}
```

Esto no es una defensa contra inyección SQL: la vinculación de parámetros (Pasos 4-7) ya cerró esa puerta. Detiene que una escena guarde en silencio `NaN`, o un valor de un campo de formulario al que se le olvidó `type="number"`, mucho antes de que llegue a una columna `REAL` que lo aceptaría sin quejarse.

### Paso 9: rutas de lectura: crear, listar, obtener (TODO 8)

`routes.js` hereda `register`, `login`, `logout`, `me`, `recover`, y `removeAccount` del Curso 5.2 sin cambios, salvo que llaman a `db.js` en lugar del archivo JSON del Curso 5.2. Termina `createScene`, `listMyScenes`, `listPublicSceneGallery`, y `getScene`. La verificación de permisos de `getScene` es la que hay que leer con cuidado:

```js
if (scene.ownerId !== auth.user.id && !scene.isPublic) {
  return sendJson(res, 404, { error: 'Scene not found.' });
}
```

Una escena privada que no es tuya responde `404`, el mismo "no encontrado", no `403` "prohibido"; así un cliente nunca puede usar solo el código de estado para saber que una escena con cierto id siquiera existe.

### Paso 10: rutas de escritura: actualizar y eliminar (TODO 9)

`updateScene` y `removeScene` agregan una verificación más al frente de la misma verificación CSRF que introdujo el Curso 5.2: la propiedad.

```js
if (scene.ownerId !== auth.user.id) {
  return sendJson(res, 403, { error: 'Only the owner can edit this scene.' });
}
```

Aquí, a diferencia de `getScene`, `403` es la respuesta correcta: llegar a esta línea ya requirió una sesión válida, así que confirmar que la escena existe no cuesta nada extra.

### Paso 11: rutas de anotaciones y enrutamiento de server.js (TODO 10, TODO 11)

Termina `addAnnotation` y `removeAnnotation`: solo para la dueña, la misma forma que el Paso 10. Luego termina el listener de solicitudes de `server.js`. Dos rutas llevan un id dentro de la ruta (`/api/scenes/<id>` y `/api/scenes/<id>/annotations/<id>`); sin ningún paquete de enrutamiento, dos expresiones regulares pequeñas las emparejan:

```js
const SCENE_PATH = /^\/api\/scenes\/([^/]+)$/;
const ANNOTATION_PATH = /^\/api\/scenes\/([^/]+)\/annotations\/([^/]+)$/;
```

Una vez hecho esto, cada ruta del proyecto es alcanzable por HTTP por primera vez. Prueba con `curl` antes de pasar al navegador: un código de estado equivocado es mucho más fácil de detectar en una terminal que en una interfaz.

### Paso 12: conecta el cliente (TODO 12)

`js/scene.js` ya expone `applyObjects(objects)`, `setAnnotationMarkers(annotations)`, y `getObjects()`: este paso nunca toca three.js directamente. Termina las funciones en `js/main.js` que llaman a `fetch()`: `loadSceneIntoView`, `loadDefaultView`, `refreshSceneLists`, `renderSceneList`, `openScene`, `saveScene`, `deleteCurrentScene`, `addAnnotation`, y `removeAnnotation`. Cada una sigue el patrón del Curso 5.2: `credentials: 'include'` en cada solicitud, y un encabezado `X-CSRF-Token` en cada solicitud que cambia algo.

### Paso 13: termina las pruebas (TODO 13)

`server.test.js` ya hace cada solicitud que necesita cada prueba; agrega la llamada `assert.equal` / `assert.deepEqual` / `assert.ok` que describe cada comentario. Ejecuta `node --test` desde `server/` hasta que cada prueba pase, luego ejecuta `node server/backup.js` una vez a mano y confirma que aparece un nuevo archivo `.sqlite` bajo `server/data/backups/`.

## Explicación del código clave

- **Sentencias preparadas (`db.prepare(sql).run(...)`).** El texto SQL y los valores que lo llenan viajan a SQLite por separado: un marcador `?` nunca se reemplaza por concatenación de cadenas. Esto es lo que detiene la inyección SQL: un nombre de usuario como `'; DROP TABLE users; --` se guarda (y se compara) como una cadena literal e inofensiva, nunca se ejecuta como SQL.
- **`PRAGMA foreign_keys = ON`.** SQLite viene con la aplicación de claves foráneas desactivada, por compatibilidad hacia atrás con bases de datos escritas antes de que existiera la función. `db.js` la activa en cada conexión, cada vez que abre el archivo; sin esto, `ON DELETE CASCADE` en las migraciones se ignora en silencio, y las escenas de una usuaria eliminada quedarían en la base de datos para siempre.
- **Transacciones (`db.exec('BEGIN')` … `db.exec('COMMIT')`, con `db.exec('ROLLBACK')` si falla).** Cada escritura de este proyecto que toca más de una fila (ejecutar una migración, reemplazar los objetos de una escena) está envuelta de esta forma, así ocurre por completo o no deja rastro, nunca algo intermedio.
- **404 para "no es tuya y no es pública", 403 para "es tuya para ver pero no para cambiar".** `getScene` responde a una escena privada que no es tuya con el mismo `404` que le daría a un id de escena que nunca existió, así el código de estado por sí solo nunca confirma la existencia de una escena privada. `updateScene` y `removeScene` responden `403` en su lugar, porque llegar a ellas ya prueba que la escena existe (podrías leer su copia pública o ser su dueña).
- **`VACUUM INTO`, no una simple copia de archivo.** `server/backup.js` le pide a la propia SQLite que escriba una copia completa y consistente de la base de datos en un archivo nuevo. Un `cp` simple del archivo `.sqlite` no tiene forma de saber si SQLite está escribiendo a la mitad cuando la copia empieza; atraparlo en el instante equivocado puede producir una copia que no abrirá, o que abre con filas faltando en silencio.

## Accesibilidad 3D y XR

- **Descripción de la escena.** `#scene-description` se construye a partir del mismo arreglo `objects` que renderiza la vista 3D, cada vez que una escena carga o cambia, así ambas nunca pueden contradecirse (WCAG 1.1.1, 1.3.1).
- **Edición solo con teclado.** Cada posición y rotación es un `<input type="number">`, cambiado con el teclado o un botón de incremento; este proyecto nunca le pide a quien aprende que arrastre algo en 3D para arreglar una escena.
- **Un gemelo 2D de la vista 3D.** La tabla de posición/rotación bajo el lienzo contiene los mismos números que muestra la vista 3D, siempre, haya o no WebGL disponible.
- **Las anotaciones existen como texto real, no solo como marcadores.** Los marcadores flotantes "📝" que dibuja `scene.js` sobre el lienzo son decorativos; la `#annotation-list` bajo el lienzo es la copia accesible y siempre presente de la misma información.
- **Movimiento reducido y un control de Pausa.** El giro lento de la piedra de jade empieza pausado cuando `prefers-reduced-motion: reduce` está activado, y el botón **Pause animation** (con `aria-pressed`) funciona sin importar esa preferencia.
- **Comodidad.** La cámara nunca se mueve salvo una vez, a su posición inicial fija; nada en esta lección mueve el punto de vista que quien aprende no pidió.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| Cada campo de formulario tiene un `<label>` visible y asociado | 2.5.3 | El nombre accesible debe empezar con el texto de la etiqueta visible. |
| Los errores de campo de una respuesta 400 aparecen como texto, en una lista, junto al formulario | 1.4.1, 3.3.1 | Una escena o anotación rechazada no debe señalarse solo con color. |
| `role="list"` en cada `<ul>` con `list-style: none` | Buena práctica | Safari elimina la semántica de lista de un `<ul>` al que se le quitó el estilo de lista. |
| La tabla de posición/rotación tiene un `<caption>` y `<th scope="col">`/`<th scope="row">` | 1.3.1 | Un lector de pantalla anuncia a qué exhibición y a qué eje pertenece cada número. |
| La animación respeta `prefers-reduced-motion` y ofrece un botón de Pausa | 2.2.2 | El movimiento que se inicia solo, sin que quien aprende lo pida, debe poder detenerse. |
| Cada interacción 3D tiene una ruta de teclado | 2.1.1 | Arreglar una escena funciona por completo con `Tab` y los controles numéricos de paso. |

## Consideraciones de rendimiento

- **Indexa cada columna por la que filtra una consulta.** `scenes.owner_id` y `scenes.is_public` tienen ambos un índice (ver `002_create_scenes.sql`); sin uno, "my scenes" o "public scenes" escanearían cada fila de la tabla a medida que crece.
- **Un join gana a una consulta por fila.** `listPublicScenes` une `scenes` con `users` en una sola consulta, en lugar de pedir `findUserById` una vez por escena: el clásico error de "N+1 consultas", invisible con tres escenas y doloroso con tres mil.
- **Una transacción agrupa las escrituras.** Envolver el eliminar-y-luego-insertar de `replaceSceneObjects` en una transacción no es solo por corrección (Paso 6): SQLite también tiene menos contabilidad que hacer para una transacción confirmada que para varias separadas.
- **`VACUUM` (y `VACUUM INTO`) recuperan espacio.** SQLite no reduce automáticamente un archivo después de eliminar muchas filas; un respaldo hecho con `VACUUM INTO` es también una copia compactada, como efecto secundario útil.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Construir SQL con un template literal (`` `SELECT * FROM users WHERE username = '${username}'` ``) | Funciona en cada prueba manual, y luego se rompe o filtra datos en el instante en que un nombre de usuario contiene una comilla, o está deliberadamente diseñado para eso | Usa siempre una sentencia preparada con marcadores `?` |
| Olvidar `PRAGMA foreign_keys = ON` | `ON DELETE CASCADE` se ignora en silencio; las usuarias eliminadas dejan escenas huérfanas para siempre | Establece el pragma una vez, en `db.js`, antes de que corra cualquier consulta |
| Eliminar los objetos de una escena sin una transacción | Un fallo o un error lanzado entre la eliminación y las inserciones puede dejar una escena sin ningún objeto | Envuelve la eliminación y cada inserción en un solo `BEGIN`/`COMMIT` |
| Comprobar `if (req.body.ownerId === auth.user.id)` | Un cliente puede poner cualquier `ownerId` que quiera en un cuerpo de solicitud; esa línea confía en que el atacante diga la verdad | Compara siempre el id de cuenta de la **sesión** contra la fila ya guardada en la base de datos |
| Copiar el archivo `.sqlite` con `cp` mientras el servidor está corriendo | Un respaldo que no abrirá, o que abre con filas faltando en silencio | Usa `VACUUM INTO`, como hace `server/backup.js` |

## Solución de problemas

**`ExperimentalWarning: SQLite is an experimental feature and might change at any time`.** Esperado, cada vez que se importa `node:sqlite`, en cada versión de Node 22-24. Es una advertencia, no un error: el servidor sigue corriendo. Desaparecerá una vez que Node marque el módulo como estable en una versión futura.

**`Error: Cannot open database because the directory does not exist`, o un `ENOENT` similar.** `db.js` crea `server/data/` por ti con `mkdirSync(..., { recursive: true })`; si moviste o renombraste esa carpeta, elimina `server/data` por completo y reinicia el servidor para que pueda recrearla.

**`SqliteError: FOREIGN KEY constraint failed`.** Intentaste insertar una fila de `scene_objects` o `annotations` cuyo `scene_id` (o el `owner_id` de una usuaria) todavía no existe. Comprueba que la escena en verdad se haya creado, y confirmado, antes de intentar adjuntarle objetos o anotaciones.

**Las escenas de una cuenta eliminada siguen en la base de datos.** Casi siempre significa que `PRAGMA foreign_keys = ON` no se ejecutó antes de la eliminación; comprueba que `db.js` lo establece inmediatamente después de abrir la conexión, y que nada más abrió el mismo archivo primero, saltándose eso.

**`node server/inspect-db.js` (o el servidor) lanza `TODO 2: runMigrations is not implemented yet`, aunque ya lo hayas escrito.** Comprueba que descomentaste la llamada protegida debajo de `runMigrations()`: la función puede estar terminada y aun así nunca ejecutarse si nada la llama.

**Safari o Firefox: el código de recuperación no se selecciona con un clic.** Haz triple clic (o usa `Cmd/Ctrl+A` después de hacer clic dentro) — `user-select: all` selecciona todo el texto del elemento con el primer clic en Chrome y Edge, pero algunas versiones de Safari y Firefox aún necesitan el paso extra.

**El puerto 8879 ya está en uso.** Establece un `PORT` distinto en `server/.env`, y actualiza `ALLOWED_ORIGIN` para que coincida, o detén lo que sea que lo esté usando.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: agrega una cuarta columna, de solo lectura, a `scenes` y ponla a trabajar.
2. **[Creativo](challenges/challenge-2.es.md)**: haz que la exhibición refleje tu propio idioma, cultura o comunidad.
3. **[Explorador](challenges/challenge-3.es.md)**: un desafío más difícil y abierto, con migraciones y permisos.

## Cómo entregar tu trabajo

1. Trabaja [`tests/checklist.md`](tests/checklist.md).
2. Toma capturas de pantalla: la exhibición con una escena guardada cargada, la tabla de posición/rotación, y la salida de terminal de `node server/inspect-db.js`.
3. Guárdalas en tu diario de aprendizaje y portafolio. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. Pregunta de diario: tu base de datos ahora hace cumplir una regla ("solo la dueña puede editar una escena") en el código del servidor, no solo en la interfaz. Encuentra un lugar en este proyecto donde la interfaz *también* oculta un control que una solicitud rechazada igual bloquearía, y uno donde no lo hace. ¿Qué saldría mal si se eliminara la verificación del lado del servidor pero se mantuviera la de la interfaz?

## Lecturas adicionales

- [Node.js docs: `node:sqlite`](https://nodejs.org/api/sqlite.html) (en inglés)
- [SQLite documentation: Foreign Key Support](https://www.sqlite.org/foreignkeys.html) (en inglés)
- [SQLite documentation: The `VACUUM` command (including `VACUUM INTO`)](https://www.sqlite.org/lang_vacuum.html) (en inglés)
- [Node.js docs: `node:test`](https://nodejs.org/api/test.html) (en inglés)
- [OWASP Cheat Sheet Series: SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html) (en inglés)

## Mujeres que conviene conocer

**Claudia Bauzer Medeiros** es profesora titular de bases de datos en la Unicamp (Universidad de Campinas) en Brasil, donde su investigación ha abarcado sistemas de información geográfica y la gestión de grandes conjuntos de datos científicos, incluyendo proyectos de datos agroambientales y de biodiversidad. En 2003 se convirtió en la primera mujer elegida presidenta de la Sociedade Brasileira de Computação (SBC), y ejerció el cargo hasta 2007.

Su carrera se conecta directamente con el tema de esta lección: diseñar bases de datos que contienen información real, estructurada y espacial, y hacer cumplir las reglas sobre quién puede leerla o cambiarla, es exactamente el tipo de ingeniería de bases de datos que su investigación ha impulsado durante décadas, aplicado aquí a las escenas y anotaciones guardadas de la exhibición.

> **Nota editorial: verificar antes de publicar.** Los datos biográficos de las secciones «Mujeres que conviene conocer» deben verificarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

SQL en sí mismo es un estándar: ISO/IEC 9075, mantenido por ISO/IEC JTC 1/SC 32, define el lenguaje que implementa la mayoría de las bases de datos relacionales (incluidas PostgreSQL y MySQL), cada una con sus propias extensiones. SQLite, la base de datos que usa esta lección, implementa la mayor parte de ese estándar más sus propias extensiones (incluida `VACUUM INTO`, usada en el script de respaldo de esta lección), y documenta cada diferencia con el estándar en su propia documentación de referencia, a la que esta lección enlaza directamente en lugar de al estándar ISO, que está detrás de un muro de pago.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
