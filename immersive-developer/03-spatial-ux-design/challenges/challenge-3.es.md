# Reto 3: Explorador

**Reto opcional.** Aproximadamente 90 minutos.

Agrega un cuarto modo de anclaje: relativo a la mano (a veces llamado "palm UI"), que solo tiene sentido una vez que hay seguimiento real de manos o controles disponible -conéctalo con lo que ya sabes de **4.2: Entrada e interacción en XR**.

## Tarea

1. Repasa tus notas de 4.2 sobre `XRControllerModelFactory` y las poses de control/mano. Este reto no requiere que reconstruyas el laboratorio de interacción de esa lección -solo que reutilices la idea de "un objeto colocado en relación a una mano o control rastreados".
2. En `js/layout.js`, agrega una cuarta función, `applyHandLock(object, handOrControllerSpace, localOffset)`, que posicione `object` en relación a un `XRSpace` rastreado de la misma forma en que `applyBodyLock` lo posiciona en relación a la cámara. Si no tienes un visor con seguimiento de manos para probar, puedes simular el espacio rastreado con Immersive Web Emulator de 4.1, o sustituyendo temporalmente cualquier otro Object3D (un cubo que represente una mano) para poder demostrar que las matemáticas de posicionamiento funcionan.
3. Agrega una cuarta opción a los controles de modo de anclaje del panel de metas, y conéctala a través de `setLockMode`.
4. Actualiza `js/describe.js` y tu `design-rationale.md` para explicar cuándo tiene sentido un panel relativo a la mano y cuándo no (considera qué le pasa cuando las manos no son visibles para las cámaras del visor).

## Por qué importa

Las interfaces espaciales reales combinan varias estrategias de anclaje según lo que un visor realmente pueda rastrear, y el seguimiento de manos es una de las entradas menos confiables (ver la propia advertencia de 4.2 sobre la compatibilidad variable). Diseñar para un modo que puede desaparecer en silencio es un problema más difícil y más realista que los tres modos que garantiza esta lección.

## Se completa cuando

- [ ] `applyHandLock` existe y se ejerce con algo que puedas demostrar, aunque sea un objeto sustituto.
- [ ] El panel de metas se puede cambiar al nuevo modo desde los controles de la página.
- [ ] `design-rationale.md` explica una limitación real de la UI relativa a la mano, no solo cómo la construiste.
