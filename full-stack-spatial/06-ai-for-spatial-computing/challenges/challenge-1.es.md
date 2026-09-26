# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 45 minutos.

Extiende la comprobación de alucinaciones para que también marque una descripción que omite una exhibición que en verdad está en la escena.

## Tarea

1. Abre `checkDescriptionForHallucinations` en `server/ai.js`. Ahora mismo solo comprueba una dirección: una exhibición *mencionada* en la descripción que *no* está en la escena. Agrega la otra dirección: para cada exhibición cuyo id **sí** está en `scene.objects`, comprueba (sin distinguir mayúsculas y minúsculas, de la misma forma que hace la comprobación existente) si su nombre aparece en algún lugar de `description`. Si no, agrega una advertencia más suave, por ejemplo:
   ```js
   warnings.push(`Does not mention "${exhibit.name}", which is placed in this scene — check nothing was left out.`);
   ```
2. Mantén esto como una advertencia, no un rechazo: una descripción puede razonablemente parafrasear o agrupar exhibiciones ("las tres piezas están cerca unas de otras") sin nombrar cada una, así que esta comprobación debería informar a quien revisa, no bloquearla.
3. Agrega una aserción a la prueba de alucinaciones de `server/server.test.js` (o una prueba nueva junto a ella) de que una descripción escrita a mano que le falta una exhibición real produce esta nueva advertencia.
4. Confirma que la advertencia aparece en el navegador: genera un borrador para la escena sembrada "Private draft: pot and basket only" (que coloca solo dos de las tres exhibiciones); la propia respuesta del proveedor simulado ya menciona solo lo que está ahí, así que intenta editar el área de texto del borrador a mano para quitar el nombre de una exhibición antes de comprobar que aparece la advertencia (no hay un botón para esto; editar el área de texto basta para dispararla una vez que regeneres, o puedes llamar a la función directamente en un script de prueba).

## Por qué importa

Una comprobación de alucinaciones que solo busca cosas que no deberían estar ahí se pierde el fallo opuesto: un modelo que omite algo en silencio. Ambos son riesgos reales con un modelo de lenguaje resumiendo datos estructurados, y una descripción a la que le falta una exhibición es igual de probable que engañe a alguien que no puede ver la escena que una que inventa una extra.

## Terminado cuando

- [ ] `checkDescriptionForHallucinations` advierte sobre una exhibición que está en la escena pero no se menciona en la descripción, además de la comprobación existente.
- [ ] La nueva advertencia es una advertencia, no un rechazo: una descripción válida todavía puede guardarse aunque dispare una.
- [ ] `node --test` pasa, incluyendo una nueva aserción para este comportamiento.
