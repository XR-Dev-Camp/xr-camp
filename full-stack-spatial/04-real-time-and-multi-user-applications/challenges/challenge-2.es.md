# Reto 2: Creativo

**Opcional.** Aproximadamente 45-60 minutos.

Haz que la sala refleje tu propio idioma, cultura, o comunidad.

## Tarea

1. Cambia el nombre de la sala de "main-hall" a algo que signifique algo para ti: un lugar de tu ciudad, una palabra en tu propio idioma para "reunión" o "lugar de encuentro", actualizando `KNOWN_ROOMS` en `server/rooms.js` y la cadena de sala en `js/net.js` para que coincidan. Mantén el mecanismo subyacente (una lista de permitidos comprobada en el servidor) exactamente igual; solo cambia el nombre.
2. Dale a los avatares una pequeña identidad visual más allá de un color simple: un patrón, una forma de las tradiciones de artesanía o textil de tu propia cultura, o una paleta de colores que signifique algo específicamente para ti (no una elección genérica de "colores bonitos"; escribe, en un comentario, *por qué* la elegiste). `makeAvatarMesh` de `js/scene.js` es donde hacer este cambio.
3. Agrega un mensaje de chat del sistema, enviado desde el cliente cuando te unes, saludando a la sala en tu propio idioma junto con inglés; por ejemplo `"¡Hola! / Hello!"`, y explica en un comentario o en tu diario qué significa la frase y por qué la elegiste.
4. Vuelve a ejecutar los elementos de accesibilidad de `tests/checklist.md` contra tus cambios: una nueva forma o color de avatar todavía necesita pasar las verificaciones de contraste y movimiento, y cualquier texto nuevo todavía necesita un equivalente 2D en lenguaje simple.

## Por qué importa

Una sala compartida debe sentirse como un lugar; una "Room 1" genérica con avatares grises idénticos no lo logra. Decisiones pequeñas y deliberadas (un nombre, una forma, un saludo) son lo que hace que una herramienta se sienta construida por y para una comunidad real, no ensamblada a partir de una plantilla. Esto también es buena práctica para un portafolio: una captura de "el ejercicio, exactamente como se dio" dice menos de ti que un pequeño cambio que es claramente, específicamente tuyo.

## Terminado cuando

- [ ] El nombre de la sala está cambiado en cada lugar donde aparece (el servidor y el cliente coinciden, o la actualización de WebSocket se rechazará con un código de cierre 1008).
- [ ] Los avatares se ven distintos a los colores simples de la solución de referencia, de una forma que puedes explicar.
- [ ] Un saludo en tu propio idioma aparece cuando te unes, y todavía pasa la lista de verificación de accesibilidad.
