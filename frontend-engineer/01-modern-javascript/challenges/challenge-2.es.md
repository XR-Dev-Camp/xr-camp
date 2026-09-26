# Reto 2: Creativo

**Opcional.** Unos 60 minutos.

Tus propios datos: un mapa de tu plan de estudio, o de las actividades de tu comunidad.

## Tarea

1. Escribe tu propio archivo JSON con exactamente la misma forma: una lista `phases` (cada una con un número `phase` y un `title`), y una lista `lessons` (cada una con un número `phase`, un `title`, `minutes`, `sessions`, y un `status` de `"ready"` o `"coming-soon"`).
2. Puede ser tu plan de estudio de XR Camp con tus propias fechas objetivo, o las actividades semanales de tu comunidad.
3. Apunta `loadCatalog` hacia tu archivo: `loadCatalog('data/my-plan.json')`.
4. Comprueba que el JSON sea válido: una coma faltante lo rompe. Tu mensaje de error te lo dirá.

## Por qué es importante

Como `render.js` y `format.js` nunca mencionan a XR Camp, funcionan con cualquier dato de la misma forma. El código que depende solo de la forma de los datos, y no de su origen, se puede reutilizar.

## Se completa cuando

- [ ] Tu página muestra tus propios datos, agrupados y totalizados.
- [ ] Un archivo JSON roto muestra tu mensaje de error, no una página en blanco.
