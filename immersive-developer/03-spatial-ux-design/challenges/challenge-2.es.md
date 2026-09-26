# Reto 2: Creativo

**Opcional.** Aproximadamente 45-60 minutos.

Personaliza el proyecto para que refleje tus intereses, tu comunidad, o tu idioma.

## Tarea

1. Reemplaza el título del quiosco y el título del panel de metas (en `js/main.js`, las cadenas que se pasan a `app.setKioskText` y `redrawGoalsPanel`) con una redacción en tu propia voz, o con un segundo panel propio: una lista de lectura personal, una lista de encuentros locales, una cuenta regresiva para algo que te importa.
2. Si agregas un panel genuinamente nuevo, constrúyelo con `createPanel` y `drawPanelText` de `js/panels.js` exactamente como se construyen el quiosco y el panel de metas, y dale su propio modo de anclaje con `setLockMode`.
3. Si tu texto usa acentos o caracteres no latinos (á, ñ, 中文, y demás), comprueba que se dibujen correctamente en el canvas. A diferencia de la fuente integrada de A-Frame, una llamada `fillText()` de HTML5 Canvas usa la propia pila de fuentes del navegador, así que la mayoría de las escrituras que tu sistema puede mostrar deberían funcionar -pero compruébalo tú misma en lugar de suponerlo.
4. Actualiza la descripción de la escena en `js/describe.js` para que siga describiendo con precisión lo que agregaste.

## Por qué importa

Las decisiones de diseño de UX espacial -distancia, anclaje, legibilidad- aplican a cualquier contenido, no solo a un panel de progreso. Construir algo que te importa es una mejor prueba de si realmente entendiste *por qué* se tomó cada decisión, no solo cómo copiarla.

## Se completa cuando

- [ ] La sala muestra contenido que es significativamente tuyo, no solo la redacción original.
- [ ] Cualquier panel nuevo es legible en cada punto de referencia y tiene un modo de anclaje funcional.
- [ ] La descripción de la escena sigue coincidiendo con lo que realmente hay en la sala.
