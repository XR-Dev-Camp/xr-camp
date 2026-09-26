# Reto 2: Creativo

**Opcional.** Aproximadamente 45–60 minutos.

Personaliza el proyecto para que refleje tus propios intereses, tu comunidad o tu idioma.

## Tarea

1. Reemplaza uno de los tres objetos de la exhibición por uno de tu propia cultura o comunidad, algo que puedas describir honestamente en una o dos oraciones, como `item.clay-pot.note` describe la vasija de barro. Cambia su geometría en `exhibit.js` (reutiliza una forma primitiva; no necesitas una técnica nueva) y sus claves `name`/`made`/`note` en los tres archivos de idioma.
2. Si hablas un idioma que esta lección no cubre, agrégalo como un cuarto idioma: una entrada nueva en `LOCALES` de `config.js`, un archivo nuevo `js/locales/<code>.js` con cada clave de `en.js` traducida (márcalo `draft: true`), y una entrada de pila de fuentes en `FONT_STACKS` de `main.js` si tu idioma necesita una para su etiqueta 3D (la mayoría de los idiomas con script latino no la necesitan; los scripts de derecha a izquierda necesitan más que una pila de fuentes; anota eso como una limitación si intentas uno, en lugar de improvisar una solución que esta lección no ha cubierto).
3. Asegúrate de que tu nuevo objeto se siga renderizando correctamente en cada idioma, incluidos los dos que no acabas de agregar.

## Por qué importa

Una traducción real nunca es exactamente como el ejemplo de relleno (placeholder) de una lección. Reemplazar un objeto, o un idioma entero, por uno que signifique algo para ti es la forma más rápida de encontrar los lugares donde el patrón de esta lección todavía no encaja del todo, que es exactamente lo que un traductor o un mercado nuevo le hace a una app real.

## Se completa cuando

- [ ] Tu objeto (o idioma) nuevo aparece correctamente en la vista 3D, el panel de información, la alternativa 2D y la descripción de la escena.
- [ ] La ruta de teclado sigue alcanzando todo.
- [ ] Nada se rompe cuando vuelves a los dos idiomas que no tocaste.
