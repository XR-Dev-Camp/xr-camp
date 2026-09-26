# Reto 3: Explorador

**Reto opcional.** Aproximadamente 90 minutos.

Detecta y advierte automáticamente sobre texto demasiado largo para su contenedor.

## Tarea

1. Escribe una función pequeña, `checkOverflow(root = document)`, que recorra cada elemento en `root` que tenga `data-i18n` y revise si `element.scrollWidth > element.clientWidth` o `element.scrollHeight > element.clientHeight` (un desbordamiento real, no solo texto que salta de línea).
2. Llámala después de cada `renderAll()` en `main.js`, y usa `console.warn` con la clave del elemento y el idioma actual para cualquier cosa que se desborde.
3. Activa la pseudolocalización y recorre los tres idiomas reales con ella activada. Corrige cualquier desbordamiento que encuentre tu nueva comprobación, usualmente un `min-width` que debería ser un `flex-basis`, o un `white-space: nowrap` que no debería estar ahí (consulta "Layout a prueba de expansión de texto" en el README).
4. Estiramiento adicional opcional: en lugar de solo advertir, agrega un pequeño panel en la página (oculto a menos que la pseudolocalización esté activada) que liste cada clave desbordada, para que la revisión de un traductor no necesite la consola del navegador.

## Por qué importa

Nadie hace clic manualmente en cada cadena de cada idioma antes de cada lanzamiento. Una comprobación automática de desbordamiento, ejecutada como parte de tu suite de pruebas o de CI (un trabajo para el pipeline del Curso 6.1, no de esta lección), es lo que detecta que la oración más larga de un traductor rompió un botón antes de que alguien que aprende lo vea.

## Se completa cuando

- [ ] `checkOverflow` marca correctamente al menos un elemento deliberadamente roto (reduce temporalmente el `max-width` de un `.hint` para probar que funciona).
- [ ] No reporta nada una vez que los desbordamientos reales están corregidos.
- [ ] La pseudolocalización más esta comprobación encuentra problemas que la pseudolocalización sola no hace evidentes a simple vista.
