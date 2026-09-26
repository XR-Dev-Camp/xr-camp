# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 45 minutos.

Agrega un octavo objetivo de revisión que esta lección todavía no cubre: un límite de tasa faltante al crear escenas y anotaciones, y una prueba de `node:test` que demuestre que lo corregiste.

## Tarea

1. En `completed/server/`, observa que `createScene` y `createAnnotation` (en `routes.js`) no tienen ningún límite de tasa: una cuenta con sesión iniciada puede crear tantas escenas o anotaciones como quiera, tan rápido como quiera. El `rateLimit.js` del Curso 5.2 (heredado sin cambios a esta lección) ya te da `isRateLimited`, `recordFailedAttempt`, y `clearAttempts`: las mismas funciones que ya usa `login`.
2. Agrega un límite de tasa a `createScene` y a `createAnnotation`: un techo razonable (por ejemplo, 10 escenas o anotaciones por cuenta cada 15 minutos; reutiliza la ventana existente de `rateLimit.js`, o elige y justifica la tuya propia) que devuelva `429` con un mensaje claro una vez excedido, la misma forma que ya usa `login` para los intentos fallidos repetidos.
3. Escribe una prueba de `node:test` en `server.test.js` que cree escenas más allá de tu límite y afirme que el servidor eventualmente responde `429`.
4. Actualiza la tabla del Modelo de amenazas del README: ¿a qué categoría STRIDE pertenece un endpoint de creación *sin límite*, y por qué los siete originales de esta lección no lo incluyeron?

## Por qué importa

Una cuenta con sesión iniciada sin límite de tasa en los endpoints de escritura igual puede causar daño real: llenar una base de datos de datos basura, disparar costos de almacenamiento, o usar la aplicación como retransmisor de spam contra otras usuarias que leen lo que crea (como la lista de anotaciones de `getScene`). Cada otra lección de este curso que podría abusarse de esta forma (intentos de inicio de sesión, chat, actualizaciones de posición) ya tiene un límite; este reto te pide notar, y cerrar, el que dejó abierto la propia revisión de esta lección.

## Terminado cuando

- [ ] Tanto `createScene` como `createAnnotation` devuelven `429` una vez excedido el límite que elegiste, con un mensaje que entendería quien aprende usando la aplicación real.
- [ ] Una nueva prueba de `node:test` lo demuestra, y `npm test` sigue pasando por completo.
- [ ] La tabla del Modelo de amenazas del README tiene una fila nueva (o una actualizada) que nombra esta amenaza.
