# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 45 minutos.

Agrega un límite de tasa al endpoint de borrador de descripción, para que una cuenta no pueda pedir borradores ilimitados seguidos.

## Tarea

1. Abre `server/rateLimit.js` y vuelve a leer cómo ya funcionan `isRateLimited`, `recordFailedAttempt`, y `clearAttempts` para los intentos de inicio de sesión en la función `login` de `routes.js`.
2. En `describeScene` (`server/routes.js`), construye una clave de límite de tasa a partir de la cuenta, por ejemplo `` `describe:${auth.user.id}` ``.
3. Antes de construir un borrador, llama a `isRateLimited` con esa clave. Si está limitada por tasa, responde con estado 429 y un error JSON corto, la misma forma que ya usa `login`.
4. Después de un borrador exitoso, llama a `recordFailedAttempt` con la misma clave (reutilizar la función existente, aunque nada "falló", es la forma más simple de reutilizar el contador de `rateLimit.js`; dilo en un comentario).
5. Escribe una prueba de `node:test` en `server/server.test.js` que pida un borrador más veces de las que permite el límite en rápida sucesión, y afirme que al menos una de esas solicitudes devuelve 429.
6. Ejecuta `npm test` y confirma que tu nueva prueba pasa junto con las diez existentes.

## Por qué importa

El comentario de `server/ai.js` ya señala que un proveedor de IA real cuesta dinero o tiempo por llamada, aunque el proveedor mock usado en este proyecto final no. Un límite de tasa en este endpoint es lo que se interpone entre "seguro para desplegar" y "un script de cliente con errores que llama a esto en un bucle" una vez que alguna vez se conecte un proveedor real (ver el reto Explorador), y es buena práctica incluso mientras el proveedor siga siendo mock, ya que un endpoint sin límite sigue siendo una cosa más que un atacante podría usar para ralentizar tu servidor.

## Terminado cuando

- [ ] `describeScene` devuelve 429 después de demasiadas solicitudes de la misma cuenta en una ventana corta.
- [ ] Una solicitud normal y ocasional sigue teniendo éxito.
- [ ] Una nueva prueba de `node:test` demuestra ambos comportamientos.
- [ ] `npm test` pasa por completo, incluyendo tu nueva prueba.
