# Reto 3: Explorador

**Opcional.** Aproximadamente 60 minutos.

Construye un resumen de errores que se quede en la página.

## Tarea

Los mensajes de error propios del navegador desaparecen rápido y usan el idioma del navegador. Un patrón común y bien probado es el **resumen de errores**: un recuadro en la parte de arriba del formulario que enumera todos los problemas, con enlaces a cada campo.

1. Agrega `novalidate` al `<form>` de inscripción, para que el navegador deje de mostrar sus propios mensajes.
2. Arriba del formulario, agrega un recuadro vacío:

   ```html
   <div id="error-summary" tabindex="-1" hidden>
     <h2>There is a problem</h2>
     <ul id="error-list"></ul>
   </div>
   ```

3. Antes de `</body>`, agrega este script. Vas a aprender a escribir código así en el Curso 1.6; por ahora, lee los comentarios.

   ```html
   <script>
     const form = document.querySelector('form');
     const summary = document.getElementById('error-summary');
     const list = document.getElementById('error-list');

     form.addEventListener('submit', (event) => {
       list.innerHTML = '';
       // Every required field that is empty or invalid gets a link in the summary.
       const problems = [...form.querySelectorAll('[required]')].filter((field) => !field.checkValidity());
       if (problems.length === 0) return; // All good: let the form send.

       event.preventDefault();
       for (const field of problems) {
         const label = form.querySelector(`label[for="${field.id}"]`) || field.closest('fieldset').querySelector('legend');
         const item = document.createElement('li');
         item.innerHTML = `<a href="#${field.id}">${label.textContent}</a>`;
         list.append(item);
       }
       summary.hidden = false;
       summary.focus(); // Move focus to the summary so screen readers read it.
     });
   </script>
   ```

   Los comentarios dicen, en orden: cada campo obligatorio vacío o no válido recibe un enlace en el resumen; si todo está bien, se deja enviar el formulario; y el foco se mueve al resumen para que los lectores de pantalla lo lean.

4. Envía el formulario vacío. Aparece el resumen, el foco se mueve a él y cada enlace te lleva a un campo.

## Por qué esto importa

Servicios de gobierno de todo el mundo usan este patrón porque funciona para todas las personas, incluidas quienes usan lector de pantalla y quienes necesitan más tiempo. Acabas de usar tu primer JavaScript para mejorar algo que HTML ya hacía, en lugar de reemplazarlo.

## Se completa cuando

- [ ] Al enviar el formulario vacío aparece el resumen, y el foco se mueve a él.
- [ ] Cada enlace del resumen te lleva al campo correcto.
- [ ] Un formulario bien llenado se sigue enviando.
