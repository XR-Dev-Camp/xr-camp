# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 60 minutos.

Una navegación que se pliega en un botón «Menu» en pantallas chicas.

## Tarea

Cuando un sitio tiene muchas páginas, su navegación ocupa toda la parte de arriba de la pantalla de un celular. Un patrón común es un botón **Menu** (menú) que la muestra y la esconde.

1. Antes de la lista de navegación, agrega un botón:

   ```html
   <button type="button" id="menu-button" aria-expanded="false" aria-controls="main-menu" hidden>Menu</button>
   ```

   y ponle al `<ul>` el id `main-menu`. Agrega también `nav ul[hidden] { display: none; }` a tu hoja de estilos: si no, tu regla `nav ul { display: flex; }` le ganaría al atributo `hidden`, y el menú nunca se cerraría.

2. Antes de `</body>`, agrega:

   ```html
   <script>
     const button = document.getElementById('menu-button');
     const menu = document.getElementById('main-menu');
     const small = matchMedia('(max-width: 40rem)');

     function setUp() {
       button.hidden = !small.matches;       // the button only exists on small screens
       menu.hidden = small.matches;          // start closed on small screens
       button.setAttribute('aria-expanded', 'false');
     }

     button.addEventListener('click', () => {
       const open = button.getAttribute('aria-expanded') === 'true';
       button.setAttribute('aria-expanded', String(!open));
       menu.hidden = open;
     });

     small.addEventListener('change', setUp);
     setUp();
   </script>
   ```

   Los comentarios dicen: el botón solo existe en pantallas chicas, y el menú empieza cerrado en pantallas chicas.

3. Pruébalo con el teclado y con un lector de pantalla a 390 píxeles de ancho, y comprueba que sin JavaScript el menú simplemente se queda abierto.

## Por qué esto importa

`aria-expanded` les dice a quienes usan lector de pantalla si el menú está abierto. Y como el botón empieza con `hidden` y el menú empieza visible, la navegación sigue funcionando si el script falla. Es otra vez la mejora progresiva, aplicada a la navegación.

## Se completa cuando

- [ ] En una pantalla chica, el menú empieza cerrado y el botón lo abre y lo cierra.
- [ ] El botón anuncia «contraído» y «expandido» en un lector de pantalla.
- [ ] En una pantalla ancha, no hay botón y el menú siempre se ve.
