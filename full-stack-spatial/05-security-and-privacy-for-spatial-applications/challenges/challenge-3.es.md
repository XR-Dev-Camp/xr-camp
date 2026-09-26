# Reto 3: Explorador

**Reto opcional.** Aproximadamente 90 minutos.

Agrega un límite de tasa real por conexión a la creación de chat y anotaciones, con la misma forma que ya usó el `realtime.js` del Curso 5.4 para las actualizaciones de posición.

## Tarea

1. Vuelve a leer el `realtime.js` del Curso 5.4 (`full-stack-spatial/04-real-time-and-multi-user-applications/completed/server/realtime.js`), específicamente `POSITION_MIN_INTERVAL_MS` y cómo `handlePosition` lo comprueba *antes* de validar o transmitir cualquier cosa.
2. En el `completed/server/realtime.js` de esta lección, agrega un límite de tasa de ventana deslizante al manejador de chat: no más de, por ejemplo, 5 mensajes cada 10 segundos por conexión (el patrón `CHAT_WINDOW_MS`/`CHAT_MAX_MESSAGES` de 5.4 es un modelo razonable), devolviendo un mensaje `error` claro sobre el WebSocket una vez excedido, no descartando el mensaje en silencio sin ninguna retroalimentación.
3. Agrega un límite equivalente a `createAnnotation` en `routes.js` (una cuenta con sesión iniciada no debería poder dejar anotaciones más rápido de lo que plausiblemente podría una persona real).
4. Escribe aserciones de `node:test` para ambos límites: envía mensajes/anotaciones más rápido que el límite y afirma que el servidor responde con un error (sobre el WebSocket) o un `429` (sobre HTTP) una vez alcanzado el límite, y que un ritmo más lento nunca se bloquea.
5. En tu diario, compara esta corrección con la del Reto 1 (si lo hiciste): ¿qué es distinto entre limitar la tasa de un mensaje de WebSocket frente a una solicitud HTTP, y por qué el límite de sincronización de posición de 5.4 comprueba la tasa *antes* de validar el contenido del mensaje?

## Por qué importa

Una conexión en tiempo real no tiene una pausa natural entre mensajes como sí la tiene el envío de un formulario; nada impide que un cliente modificado (o un script en lugar de un navegador) envíe tan rápido como lo permita la red. Este es el mismo principio que ya aplicó el Curso 5.4 a las actualizaciones de posición; este reto te pide notar que nunca se aplicó a las propias funciones de chat y anotaciones de esta lección, y corregir esa brecha de la misma forma, en el servidor, independientemente de lo que ya haga por su cuenta un cliente bien portado.

## Terminado cuando

- [ ] Los mensajes de chat más rápidos que el límite que elegiste reciben un error claro, no silencio.
- [ ] Las anotaciones más rápidas que el límite que elegiste reciben un `429`.
- [ ] `node:test` demuestra ambos límites, y un ritmo de uso normal y más lento nunca se bloquea por error.
- [ ] Una nota breve de diario compara esta corrección con limitar la tasa de un endpoint HTTP.
