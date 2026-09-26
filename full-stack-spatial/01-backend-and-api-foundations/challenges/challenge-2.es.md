# Reto 2: Creativo

**Opcional.** Aproximadamente 45–60 minutos.

Personaliza el proyecto para que refleje tus propios intereses, comunidad o idioma.

## Tarea

1. En `js/scene.js`, reemplaza una o más entradas de `EXHIBITS` con un objeto que signifique algo para ti (una comida, un edificio, un instrumento, un símbolo de tu propia cultura o comunidad); solo necesitas cambiar su nombre, su descripción `made`, y su color; la geometría puede seguir siendo una forma simple.
2. Agrega un preset de cámara propio a `CAMERA_PRESETS` (una quinta opción, junto a `front`/`left`/`right`/`close`), con un nombre en tu propio idioma, y conéctalo a los botones de radio en `index.html` y a la lista `CAMERA_PRESETS` en `validation.js` y `js/main.js`.
3. Escribe la descripción de tu nueva exhibición enteramente en tu propio idioma dentro de `updateDescription()`, o agrega una versión breve bilingüe.
4. Actualiza `ATTRIBUTION.md` si usaste alguna imagen de referencia o dato que no inventaste tú misma (un color y una forma simples que inventaste no necesitan crédito).

## Por qué importa

Una API que solo guarda los tres objetos de otra persona enseña la mecánica, pero no por qué podrían importarte a ti. Renombrar una exhibición y agregar un ángulo de cámara toca el mismo código de validación, almacenamiento y renderizado que la lección misma, solo que apuntado a algo personal.

## Terminado cuando

- [ ] Al menos una exhibición y un preset de cámara son propios, de principio a fin (se guardan, se cargan y se muestran correctamente).
- [ ] `node --test` sigue pasando, actualizado con el nombre de tu nuevo preset.
- [ ] La lista de exhibiciones 2D y la vista 3D siguen coincidiendo entre sí.
