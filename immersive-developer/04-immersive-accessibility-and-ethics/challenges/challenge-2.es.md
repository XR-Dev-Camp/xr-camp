# Reto 2: Creativo

**Opcional.** Aproximadamente 45-60 minutos.

Dale a la charla tu propia voz: tu idioma, tu comunidad, o un tema que de verdad te importe.

## Tarea

1. Reemplaza `TALK_SCRIPT` en `js/talk.js` con tres a cinco líneas sobre algo de tu propia cultura, comunidad, o campo de estudio -tres objetos, tres lugares, o tres ideas, siguiendo la misma forma de una oración por línea que el original.
2. Si lo escribes en un idioma distinto del inglés, comprueba si la propiedad `lang` de `SpeechSynthesisUtterance` tiene una voz coincidente disponible en tu navegador (`speechSynthesis.getVoices()`); si no, dilo en un comentario y mantén la transcripción como la alternativa confiable, ya que nunca depende de que haya una voz instalada.
3. Actualiza `#scene-description` y el texto de respuesta en "Ask a question" para que coincidan con tu nuevo tema.
4. Mantén funcionando cada corrección de accesibilidad de la lección principal: recorre de nuevo `tests/checklist.md` con tu nuevo contenido.

## Por qué importa

Un diseño accesible que solo funciona para una escritura específica y un tema específico no es plenamente accesible -simplemente aún no se ha probado contra nada más. Cambiar el contenido es una prueba rápida y real de si tus correcciones (la transcripción, los subtítulos, las rutas por teclado) se construyeron a partir de los datos, o quedaron fijadas a esta charla en particular.

## Se completa cuando

- [ ] La charla cubre un tema de tu elección, con tus propias palabras.
- [ ] La transcripción, los subtítulos, y la descripción de la escena coinciden todos con el nuevo contenido.
- [ ] Cada elemento de `tests/checklist.md` sigue pasando con el nuevo contenido en su lugar.
