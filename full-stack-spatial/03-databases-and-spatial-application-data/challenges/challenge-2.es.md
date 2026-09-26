# Reto 2: Creativo

**Opcional.** Aproximadamente 45–60 minutos.

Reemplaza uno de los tres objetos de la exhibición con algo de tu propia cultura, idioma o comunidad, y haz que cada capa de la aplicación esté de acuerdo con eso.

## Tarea

1. Elige un objeto real que signifique algo para ti (una artesanía, un instrumento, una comida, un edificio) y dale una descripción breve y respetuosa (una frase basta; escríbela de la forma en que "made" describe hoy la vasija de barro, el aro de la canasta y la piedra de jade).
2. Actualiza `KNOWN_EXHIBITS` en `server/validation.js` y el arreglo `EXHIBITS` en `js/scene.js` para reemplazar una entrada con el id y el nombre de tu nueva exhibición.
3. En `buildMesh` de `js/scene.js`, agrega una geometría y un color simples de three.js para ella; no necesita ser un modelo realista, una forma reconocible como sustituto basta (mira las tres formas existentes para el nivel de detalle esperado).
4. Actualiza el `<select>` de anotaciones de `starter/index.html` y `completed/index.html` para que coincida con tu nueva lista de exhibiciones.
5. Si el nombre de tu objeto usa caracteres fuera del ASCII simple (acentos, caracteres chinos, o cualquier otra cosa que los tres nombres existentes de `KNOWN_EXHIBITS` no usen), confirma que se sigue mostrando correctamente en todos lados donde aparece, incluidas las etiquetas de superposición HTML que dibuja `scene.js`, no la propia geometría de texto de three.js (ver la nota del estilo de la casa sobre por qué).
6. Guarda una escena que use tu nueva exhibición, recarga la página, y cárgala de vuelta.

## Por qué importa

La exhibición de XR Camp es un marcador de posición para lo que sea que quien aprende termine construyendo: un museo desde casa, un objeto familiar, una pieza de artesanía local. Cambiar el contenido de la exhibición de principio a fin (validación, almacenamiento, y la vista 3D) es un ensayo pequeño para la versión mucho más grande del mismo cambio: construir una exhibición completamente distinta sobre el mismo esquema y las mismas reglas de permisos que ya te dio esta lección.

## Terminado cuando

- [ ] Tu nueva exhibición aparece en la vista 3D, la tabla de posición/rotación, y el formulario de anotaciones.
- [ ] Una escena que la usa se valida, se guarda y se carga de vuelta correctamente.
- [ ] Cualquier texto no ASCII que agregaste se muestra correctamente en cada navegador que puedas probar.
- [ ] `node scripts/validate-projects.mjs` sigue pasando (las versiones fijadas de bibliotecas y los archivos requeridos no se ven afectados por este cambio).
