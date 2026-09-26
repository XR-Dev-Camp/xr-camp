# Reto 2: Creativo

**Opcional.** Aproximadamente 45-60 minutos.

Personaliza el proyecto para que refleje tus propios intereses, comunidad, o idioma.

## Tarea

1. Reescribe `mockDescription` de `server/ai.js` para que sus frases suenen como algo que en verdad diría una curadora o guía de tu propia comunidad; mantenla construida solo a partir del nombre real de la escena y el texto de anotación (nunca inventes hechos sobre una escena específica), pero cambia la redacción, el tono, o la estructura para que se sienta tuya.
2. Si tu idioma usa una escritura no completamente soportada por la fuente de texto por defecto de A-Frame (ver el estilo de la casa de este repositorio sobre texto y acentos en A-Frame), prueba que cualquier texto nuevo propio de la interfaz se siga mostrando correctamente; el panel de descripción es HTML simple, no texto de A-Frame, así que esto debería funcionar sin esfuerzo extra, pero confírmalo.
3. Actualiza `<meta name="description">` y el texto de sugerencia del panel de descripción en `index.html` para que coincidan con tu nueva voz, en inglés (las traducciones vienen después).
4. Agrega una nota breve a la entrada `1.0.0` de `CHANGELOG.md` que describa qué cambiaste y por qué.

## Por qué importa

Una descripción está pensada para ayudar a alguien a imaginar una escena que no puede ver directamente; las palabras que hacen eso bien son distintas en cada idioma y cultura. El Curso 5.6 construyó esta función neutral respecto al proveedor a propósito para que su salida no esté atada a una sola voz; este reto te pide demostrarlo dándole la tuya.

## Terminado cuando

- [ ] `mockDescription` produce texto en tu propia voz, todavía construido solo a partir de datos reales de la escena.
- [ ] El propio texto del panel de descripción (sugerencia, etiquetas) coincide con esa voz.
- [ ] `npm test` sigue pasando; la redacción exacta de tus datos de prueba no necesita coincidir con las aserciones de la prueba original a menos que las hayas cambiado deliberada y consistentemente.
- [ ] `CHANGELOG.md` nombra tu cambio.
