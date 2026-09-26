# Reto 3: Explorador

**Reto opcional.** Aproximadamente 90 minutos.

Deja que la dueña de una escena invite a otra cuenta como **colaboradora**, que pueda editar los objetos y anotaciones de la escena pero nunca eliminar la escena ni quitarle el acceso a la dueña: una relación genuinamente nueva que este esquema todavía no tiene.

## Tarea

1. Diseña una tabla de unión, `scene_collaborators`, con una migración: `scene_id` y `user_id`, ambas claves foráneas con `ON DELETE CASCADE`, y una clave primaria compuesta `(scene_id, user_id)` para que la misma persona no pueda agregarse dos veces. Esta es la forma estándar de modelar una relación de muchos a muchos (una escena puede tener muchas colaboradoras; una cuenta puede colaborar en muchas escenas): ni `scenes` ni `users` por sí solas pueden contenerla.
2. Agrega funciones a `db.js`: `addCollaborator(sceneId, userId)`, `removeCollaborator(sceneId, userId)`, `listCollaborators(sceneId)`, y `isCollaborator(sceneId, userId)`.
3. Agrega una ruta (solo para la dueña, verificada con CSRF) para agregar una colaboradora por nombre de usuario, y otra para quitarla.
4. Cambia las verificaciones de permisos en `updateScene`, `addAnnotation`, y `removeAnnotation` (pero deliberadamente **no** `removeScene`) para permitir también a una colaboradora, no solo a la dueña. Escribe, en un comentario, exactamente por qué `removeScene` debería seguir siendo exclusivo de la dueña incluso con esta función.
5. Agrega una interfaz pequeña: la dueña puede escribir y agregar el nombre de usuario de una colaboradora; una colaboradora ve un formulario "Add" para anotaciones y los controles de transformación habilitados, pero nunca un botón para eliminar la escena.
6. Agrega pruebas: una colaboradora puede editar objetos y agregar anotaciones; una colaboradora no puede eliminar la escena ni agregar otra colaboradora; eliminar la cuenta de una colaboradora (`DELETE /api/account`) elimina sus filas de `scene_collaborators` sin tocar la escena misma.

## Por qué importa

Casi toda aplicación espacial o colaborativa real eventualmente necesita más de una editora sobre el mismo dato; este es precisamente el problema de modelado que una tabla de unión y una verificación de permisos un poco más rica existen para resolver, y es un adelanto directo y práctico de las salas compartidas y multiusuario que construye a continuación el Curso 5.4.

## Terminado cuando

- [ ] `scene_collaborators` existe, con ambas claves foráneas configuradas como `ON DELETE CASCADE`, y una clave primaria compuesta.
- [ ] Una colaboradora puede editar los objetos y anotaciones de una escena, pero no puede eliminar la escena ni agregar otra colaboradora.
- [ ] Eliminar la cuenta de una colaboradora elimina sus filas de `scene_collaborators`, pero la escena y sus otros datos quedan intactos.
- [ ] Las pruebas nuevas cubren los tres límites de permisos anteriores, y `node --test` pasa.
