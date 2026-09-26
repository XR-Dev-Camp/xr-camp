# Reto 3: Explorador

**Reto opcional.** Aproximadamente 90 minutos.

Agrega un historial de configuraciones que el servidor conserve, y una ruta para "deshacer".

## Tarea

1. En `store.js`, agrega `appendHistory(settings)`, que escriba cada objeto de configuración guardado (con una marca de tiempo) como una línea de JSON en un segundo archivo, `data/history.jsonl` (el formato "JSON Lines": un valor JSON completo por línea, así puedes agregar sin releer ni volver a analizar el archivo entero).
2. Llámala desde `putSettings()` en `routes.js`, después de un guardado exitoso, sin retrasar ni hacer fallar la respuesta si ocurre un error (regístralo en el log en su lugar).
3. Agrega `GET /api/settings/history`, que devuelva las últimas 20 entradas (más reciente primero) como un arreglo JSON.
4. Agrega `POST /api/settings/undo`, que lea el historial, restaure la entrada penúltima (la anterior a la configuración actual), la guarde como la configuración actual, y la devuelva con `200`. Devuelve `409 Conflict` si no hay nada que deshacer.
5. Agrega pruebas para los tres comportamientos nuevos.

## Por qué importa

Mantener un historial de cambios, y poder deshacer uno, es un patrón que volverás a encontrar en cuanto usuarios reales puedan cometer errores (Curso 5.3 para escenas guardadas, Curso 5.5 para incidentes de seguridad). Hacerlo aquí, sobre tu propio almacén respaldado por archivos, es un lugar seguro para sentir las compensaciones: qué conservar, por cuánto tiempo, y qué debería siquiera significar "deshacer" cuando dos personas podrían estar editando a la vez (una pregunta a la que vuelve el Curso 5.4).

## Terminado cuando

- [ ] Cada `PUT /api/settings` exitoso agrega una línea a `data/history.jsonl`.
- [ ] `GET /api/settings/history` devuelve las entradas de más reciente a más antigua, y nunca más de 20.
- [ ] `POST /api/settings/undo` restaura la configuración anterior, y una segunda llamada seguida (sin nada más antiguo que restaurar) devuelve 409, no un fallo.
- [ ] `node --test` pasa, incluyendo pruebas para las tres rutas nuevas.
