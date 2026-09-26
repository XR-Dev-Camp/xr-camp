# Reto 3: Explorador

**Reto opcional.** Aproximadamente 90 minutos.

Agrega un aviso de bloqueo de cuenta, y una forma de probarlo sin herramientas de administración.

## Tarea

1. En `rateLimit.js`, agrega `msUntilUnlocked(key)`, que devuelva cuántos milisegundos faltan antes de que `isRateLimited(key)` vuelva a devolver `false` (o `0` si no está limitada en este momento).
2. Haz que la respuesta `429` de `login` incluya `{ error, retryAfterSeconds }`, usando esa función (redondeada hacia arriba a segundos completos). Agrega un encabezado HTTP `Retry-After` con el mismo valor: un encabezado HTTP real y estándar ([MDN: `Retry-After`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After)) que los clientes y proxies ya saben leer.
3. En `js/main.js`, muestra esa cuenta regresiva en el mensaje de error del formulario de inicio de sesión ("Demasiados intentos. Vuelve a intentarlo en 3:42.") y actualízala cada segundo (ya existe una región dinámica para esto; reutiliza `#login-errors`, o el banner de estado).
4. Agrega una ruta, disponible solo en un entorno de pruebas (protégela con `if (process.env.NODE_ENV === 'test')` o algo similar, y di con claridad en un comentario que nunca debe llegar a un despliegue real), que borre el limitador de intentos para una clave; esto es lo que hace que la cuenta regresiva se pueda probar en `server.test.js` sin esperar 15 minutos reales en cada corrida de pruebas.
5. Agrega pruebas para el nuevo campo `retryAfterSeconds` y el límite de la cuenta regresiva (0 segundos restantes, frente a todavía limitada).

## Por qué importa

Un límite de intentos que no da ninguna retroalimentación simplemente parece roto para la persona a la que protege: "contraseña inválida" cinco veces seguidas, para siempre, sin explicación, no enseña nada sobre lo que en verdad pasó. Una cuenta regresiva visible y honesta es una decisión pequeña de experiencia de usuario con valor real de seguridad: desalienta exactamente el comportamiento de "seguir intentando" que el límite existe para frenar, sin ocultar lo que está pasando. La puerta trasera exclusiva para pruebas es en sí misma una lección: las funciones escritas solo para hacer posibles las pruebas automatizadas necesitan el mismo cuidado para no filtrarse a producción que cualquier otra ruta de código; el Curso 5.5 estudia exactamente esta categoría de error.

## Terminado cuando

- [ ] Una respuesta `429` incluye un encabezado `Retry-After` y un campo `retryAfterSeconds` que cuenta hacia atrás correctamente a través de solicitudes repetidas.
- [ ] El formulario de inicio de sesión muestra y actualiza una cuenta regresiva legible para humanos.
- [ ] La ruta de restablecimiento exclusiva para pruebas está protegida, comentada, y nunca es alcanzable cuando `NODE_ENV` no es `test`.
- [ ] `node --test` pasa, incluyendo pruebas para el nuevo comportamiento.
