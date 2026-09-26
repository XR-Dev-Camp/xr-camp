# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 45 minutos.

Agrega una ruta de verificación de estado (health check), y un quinto ajuste.

## Tarea

1. Agrega `GET /api/health` a `routes.js` y `server.js`. Debe responder `200` con `{ "status": "ok" }`, y no necesita validación ni estado guardado.
2. Agrega un quinto campo al objeto de configuración: `showLabels` (un booleano, `true` por defecto), que mostrará u ocultará los nombres de las exhibiciones como etiquetas en pantalla en una lección posterior. Agrégalo a `DEFAULT_SETTINGS` y a `validateSettings()` en `validation.js`, usando `checkBooleanField`.
3. Agrega una casilla para él en `index.html`, y léelo y aplícalo en `js/main.js` (no necesitas dibujar realmente las etiquetas en `js/scene.js`, solo guardar y cargar el ajuste correctamente).
4. Agrega una prueba para `GET /api/health` y al menos una para el nuevo campo en `server.test.js`.

## Por qué importa

Una API real crece un campo pequeño y cuidadoso a la vez. Este reto es la versión más pequeña posible de eso: toca los mismos cuatro archivos (`validation.js`, `store.js` no necesita cambios, `routes.js`, y el cliente) que tocará cada futuro campo, sin nada nuevo que diseñar.

## Terminado cuando

- [ ] `curl http://127.0.0.1:8877/api/health` devuelve `{ "status": "ok" }` con estado 200.
- [ ] `showLabels` va y vuelve correctamente a través de `PUT` y `GET`, igual que los otros cuatro campos.
- [ ] Enviar `"showLabels": "yes"` (una cadena de texto, no un booleano) se rechaza con un 400 y un mensaje claro.
- [ ] `node --test` sigue pasando, incluyendo tus nuevas pruebas.
