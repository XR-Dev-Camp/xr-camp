# Desafío 3: Explorador

**Extensión opcional.** Unos 60–90 minutos.

Pon una trampa: pregúntale a varios asistentes sobre una API que no existe, y observa cuáles te lo dicen.

## Tarea

1. Instala un ejecutor de modelos locales, Ollama o LM Studio, y descarga un modelo pequeño de pesos abiertos. Antes, comprueba que tengas suficiente espacio libre en disco: los modelos suelen pesar varios gigabytes.
2. Elige tres asistentes: el modelo local, y dos alojados (al menos uno de un grupo distinto del Paso 2, si puedes acceder a él).
3. Hazle a cada uno la misma **pregunta capciosa**, una que asuma algo falso:
   - «¿Cómo uso `element.focusNext()` para mover el foco después de eliminar un elemento?»
   - «¿Qué hace la opción `copy` de `Array.prototype.sort`?»
4. Luego haz una pregunta **neutral** sobre lo mismo: «¿Existe un método del DOM que mueva el foco al siguiente elemento enfocable?».
5. Para cada respuesta, anota: ¿dijo que la API no existe? ¿Inventó una firma? ¿Sugirió algo real en su lugar? Verifica en MDN cada API real que haya sugerido.
6. Compara el modelo local con los alojados en precisión, velocidad, y qué tuviste que compartir.

## Por qué importa

Una pregunta que asume algo falso a menudo recibe una respuesta que le sigue la corriente. Saber esto cambia cómo preguntas: preguntas neutrales primero, y «¿esto existe?» antes de «¿cómo lo uso?». Ejecutar un modelo local también te muestra, en carne propia, la relación entre privacidad y calidad.

## Terminado cuando

- [ ] Tres asistentes, incluido un modelo local, cada uno con las mismas dos preguntas capciosas y una neutral.
- [ ] Una tabla de resultados: cuáles inventaron, cuáles se negaron, cuáles te corrigieron.
- [ ] Cada API real que sugirieron está verificada en MDN.
- [ ] Tres frases sobre qué harás distinto la próxima vez que preguntes.
