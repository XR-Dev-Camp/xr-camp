# Reto 3: Explorador

**Extensión opcional.** Aproximadamente 90 minutos.

Convierte una segunda app de My XR Camp en una PWA, y compara qué necesita cada una.

## Tarea

1. Elige una de tus apps anteriores: el mapa del curso (Curso 2.1), el tablero de aprendizaje (Curso 2.2), o el planificador de sesiones (Curso 2.3).
2. Dale un manifiesto e iconos, un service worker con un esqueleto precacheado en una caché versionada, y una página sin conexión. Reutiliza tu `pwa.js`: no debería necesitar cambios. Si los necesita, mejóralo hasta que no los necesite.
3. Decide una estrategia para cada tipo de solicitud, y anótala en una pequeña tabla en tu diario: qué archivos, qué estrategia, y por qué. El planificador guarda todo en `localStorage`, así que tal vez no necesite ninguna estrategia de datos. El mapa del curso lee `data/catalog.json`: ¿eso es esqueleto (cache first) o datos (network first, o stale-while-revalidate)?
4. Prueba **stale-while-revalidate** en una de ellas: responde desde la caché de inmediato, y busca una copia nueva en segundo plano para la próxima vez. Compara cómo se siente frente a network first, con conexión y en **Slow 4G**.
5. Dale a ambas apps nombres de caché distintos (`planner-shell-v1`, no `weather-shell-v1`) y verifica que el `activate` de cada app elimine solo sus propias cachés antiguas. Dos apps en el mismo origen comparten un solo conjunto de cachés.

## Por qué esto importa

Una estrategia es una decisión sobre qué importa más para cada solicitud: velocidad, actualidad, o funcionar sin conexión. Tomar esa decisión dos veces, para dos apps distintas, es cómo aprendes que no hay una única respuesta correcta, solo una razón para cada elección.

## Se completa cuando

- [ ] La segunda app se instala, abre sin conexión, y muestra tu página sin conexión para las páginas no guardadas.
- [ ] Tu diario tiene una tabla de solicitudes, estrategias, y razones.
- [ ] Probaste stale-while-revalidate y escribiste una oración sobre cómo se sintió.
- [ ] Ninguna de las dos apps elimina las cachés de la otra.
