# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 45 minutos.

Agrega un cuarto tipo de mensaje, un gesto de "saludo," y retransmítelo de la misma forma que se retransmiten las actualizaciones de posición.

## Tarea

1. En el servidor, agrega un pequeño límite de tasa estilo `MAX_WAVES_PER_MINUTE` (reutiliza la idea de ventana deslizante de `isChatRateLimited` en `realtime.js`, a la tasa que te parezca razonable) y una nueva rama en el enrutador de mensajes de `handleConnection`: `if (message.type === 'wave') return handleWave(roomId, member, message);`.
2. Escribe `handleWave(roomId, member, message)`: comprueba el límite de tasa, y luego `broadcast()` `{ type: 'wave', userId: member.userId, username: member.username, serverTime: Date.now() }` a la sala; ningún campo necesita venir del mensaje entrante, ya que un saludo no lleva ningún dato más allá de "quién, y cuándo."
3. En el cliente, agrega un botón "Wave" junto a los controles de movimiento en `index.html`, un método `sendWave()` en `net.js` (un `send({ type: 'wave' })` de una línea, sin necesitar un objeto de limitación ya que el servidor ya limita la tasa), y un manejador `onWave` en `main.js` que muestre algo; una línea temporal en el registro de chat ("alice waved!") basta.
4. Agrega al menos una prueba a `server.test.js` que demuestre que un saludo se retransmite a otro miembro, y que exceder tu límite de tasa produce un error en lugar de una inundación de saludos.

## Por qué importa

Cada tipo de mensaje de esta lección (posición, chat, bloqueo, reporte) sigue la misma forma: validar lo que necesita validarse, limitar la tasa de lo que podría abusarse, resolver la identidad desde el propio registro del servidor, y transmitir a través de la única función compartida. Un gesto sin ninguna carga útil es el caso más simple posible de esa forma, y construir uno desde cero es la forma más rápida de demostrar que en verdad entendiste el patrón, no solo los cuatro tipos de mensaje específicos que esta lección escribió para ti.

## Terminado cuando

- [ ] Un botón "Wave" envía un mensaje `wave`, y cada otra pestaña en la sala lo ve.
- [ ] Saludar más rápido que tu propio límite de tasa produce un error, no una inundación sin límite de mensajes.
- [ ] Al menos una prueba nueva en `server.test.js` cubre el tipo de mensaje wave, y `node --test` pasa.
