# Reto 3: Explorador

**Reto opcional.** Aproximadamente 90 minutos.

Agrega una segunda sala, y una forma de moverse entre ellas.

## Tarea

1. Agrega una segunda entrada a `KNOWN_ROOMS` en `server/rooms.js` (por ejemplo, `'quiet-corner'`), y un pequeño `<select>` o un par de botones en `index.html` para elegir una sala antes (o después) de conectar.
2. En `js/net.js`, soporta cambiar de sala sin recargar la página por completo: haz `stop()` de la conexión actual de forma limpia (envía un cierre real, no simplemente abandones el socket) y abre una nueva con el nombre de sala nuevo. Decide, y documenta en un comentario, qué pasa con el estado que pertenecía a la sala anterior: ¿deberían limpiarse el registro y el chat, o debería quien aprende poder volver y verlos de nuevo?
3. En el servidor, asegúrate de que un miembro que cambia de sala se elimine de la presencia de la sala anterior (se dispara un evento `leave` ahí) y se agregue a la nueva (se dispara un evento `join` ahí); el ciclo de vida existente de `handleConnection` asume una sala por conexión durante toda su vida, así que cambiar de sala en este diseño significa cerrar un WebSocket y abrir uno nuevo, lo cual dispara naturalmente la limpieza de `leaveRoom` para la sala anterior y la configuración de `joinRoom` para la nueva.
4. Agrega un indicador de corta duración de "salas recientemente activas": rastrea, en memoria del servidor, cuántos miembros hay actualmente en cada entrada de `KNOWN_ROOMS`, y expónlo; una ruta HTTP simple `GET /api/rooms` que devuelva `[{ roomId, memberCount }]` basta; no se necesita WebSocket para esta parte.
5. Escribe al menos una prueba que demuestre que un miembro que "se mueve" de una sala a otra deja de recibir los mensajes de esa sala y empieza a recibir los de la otra.

## Por qué importa

Todo sistema real de chat o presencia más allá de una sala única y fija tiene que responder la misma pregunta que plantea este reto: ¿qué pasa con la identidad y el estado de una conexión cuando cambia aquello a lo que está conectada? No hay una única respuesta correcta: cerrar y reabrir la conexión (el enfoque de este reto) es más simple de razonar que mantener una conexión viva a través de varias salas, al costo de una reconexión visible. Trabajar tú misma esa compensación, en lugar de que te den la respuesta, es el propósito de un reto "Explorador".

## Terminado cuando

- [ ] Existen al menos dos salas, y quien aprende puede elegir entre ellas desde la interfaz.
- [ ] Cambiar de sala elimina correctamente a un miembro del registro de la sala anterior (para todas las demás personas ahí) y lo agrega al de la nueva.
- [ ] `GET /api/rooms` devuelve un conteo preciso de miembros por sala.
- [ ] Una nueva prueba automatizada cubre el cambio de sala, y `node --test` pasa.
