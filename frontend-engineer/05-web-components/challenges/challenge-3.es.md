# Reto 3: Explorador

**Extensión opcional.** Aproximadamente 60–90 minutos.

Renderiza el shadow root de una tarjeta **sin nada de JavaScript**, usando shadow DOM declarativo.

## Tarea

1. El shadow DOM declarativo te permite escribir un shadow root directamente en el HTML, con un `<template shadowrootmode="open">` como primer hijo del elemento. El navegador lo adjunta mientras lee la página. Es parte del HTML Standard y las versiones actuales de los navegadores principales lo admiten. Escribe una tarjeta de esta forma, con una clase `prerendered` que vas a usar en un momento:

   ```html
   <lesson-card class="prerendered" lesson-title="Web Components" minutes="600" status="ready">
     <template shadowrootmode="open">
       <style>/* the card's styles */</style>
       <article part="card">
         <h3 part="heading">Web Components</h3>
         …
         <slot name="description"></slot>
       </article>
     </template>
     <p slot="description">Build your own HTML elements.</p>
   </lesson-card>
   ```

2. Apaga JavaScript (o comenta la etiqueta script), y recarga. Sus slots funcionan, pero la tarjeta no tiene todo el estilo: tu regla `lesson-card:not(:defined)` del TODO 9 también coincide con ella (el elemento nunca se define sin JavaScript), así que recibe una segunda caja, y su título aparece dos veces: una desde tu `<h3>` declarativo, otra desde `attr(lesson-title)`. ¿Qué falta?
3. Arréglalo excluyendo las tarjetas prerenderizadas de esa regla: cambia `lesson-card:not(:defined)` y `lesson-card:not(:defined)::before` por `lesson-card:not(:defined):not(.prerendered)`, y recarga con JavaScript todavía apagado. La caja extra y el segundo título desaparecen.
4. Ahora haz que la clase funcione con JavaScript. En el constructor, usa el root que ya existe, si lo hay, y copia el template solo cuando no haya ninguno:

   ```js
   const root = this.shadowRoot ?? this.attachShadow({ mode: 'open' });
   if (!root.hasChildNodes()) root.append(template.content.cloneNode(true));
   ```

   Vuelve a activar JavaScript: el botón ahora funciona, sin ningún parpadeo de contenido diferente.

5. En tu diario, responde: ¿cuándo escribirías el shadow root en HTML, y cuándo dejarías que JavaScript lo construyera? Piensa en las conexiones lentas, y en cuánto HTML repites por cada tarjeta.

## Por qué esto importa

El shadow DOM declarativo le permite a un servidor enviar componentes terminados como HTML simple, así que aparecen antes de que se ejecute cualquier JavaScript. Es la mejora progresiva llevada un paso más allá, y es la forma en que algunos frameworks renderizan componentes web en el servidor.

## Se completa cuando

- [ ] Una tarjeta se renderiza, con estilo, con JavaScript apagado.
- [ ] Con JavaScript activado, el botón Done de esa misma tarjeta funciona y dispara `lesson-toggle`.
- [ ] Las tarjetas creadas por `main.js` siguen funcionando exactamente igual que antes.
- [ ] Tu diario tiene tu respuesta al paso 5.
