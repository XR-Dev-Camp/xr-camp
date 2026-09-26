# Reto 2: Creativo

**Opcional.** Aproximadamente 45–60 minutos.

Agrega una cuarta exhibición propia, de tu propio idioma, cultura, o comunidad, y confirma que ambas funciones de IA la manejan correctamente.

## Tarea

1. Elige un objeto pequeño que signifique algo para ti, tu cultura, o tu comunidad (un instrumento musical, un patrón textil, un recipiente de comida, una herramienta; cualquier cosa que puedas describir en una o dos frases). Agrégalo al arreglo `EXHIBITS` de `server/exhibits.js` con un id y un nombre nuevos.
2. Dale una malla three.js simple en `buildMesh` de `js/scene.js`, y agrega un par de pedestal y malla a juego de la forma en que lo hacen los tres existentes (reutiliza el bucle existente en `createScene`; no deberías necesitar cambiar mucho más allá de `buildMesh` y el `EXHIBITS` del lado del cliente que tu `main.js` ya importa de `scene.js`, más esta nueva entrada en `server/exhibits.js`).
3. Agrégale una entrada a los datos semilla de `seedIfEmpty` en `server/db.js`, en al menos una escena sembrada, con una anotación corta que la describa con tus propias palabras (en inglés para este archivo obligatorio; siéntete libre de también probarlo en tu propio idioma en una escena que crees a mano a través de la interfaz).
4. Genera una descripción para esa escena, y busca tu nueva exhibición por nombre. Confirma: el borrador la menciona correctamente (y la comprobación de alucinaciones no la marca como ausente cuando realmente está ahí, ni como presente cuando no lo está); la búsqueda encuentra una escena que la contiene cuando buscas una palabra de su nombre o de tu anotación.
5. Si el nombre de tu exhibición usa una escritura que la fuente por defecto de A-Frame no puede dibujar (caracteres latinos acentuados, chino, o cualquier otra cosa no ASCII); este proyecto ya usa texto de three.js mediante superposiciones HTML, así que debería funcionar, pero confirma que nada se renderiza como una caja de glifo faltante.

## Por qué importa

Una función de IA construida a partir de un conjunto de ejemplos fijo y solo en inglés puede parecer que "simplemente funciona" únicamente porque el ejemplo nunca la prueba contra nada desconocido. Agregar una exhibición que te importa a ti es una prueba real de si `sceneDataForPrompt`, la comprobación de alucinaciones, y el prompt de búsqueda en verdad generalizan, o si algo en esta lección asumió en silencio que solo siempre habría una vasija de barro, una canasta, y una piedra de jade.

## Terminado cuando

- [ ] Una cuarta exhibición existe en `server/exhibits.js`, `js/scene.js`, y al menos una escena sembrada.
- [ ] Generar una descripción para una escena que la contiene produce un borrador preciso, sin ninguna advertencia incorrecta de alucinación.
- [ ] Buscarla en lenguaje simple encuentra la escena en la que está.
- [ ] Su nombre se muestra correctamente en el navegador, en cualquier escritura que hayas elegido.
