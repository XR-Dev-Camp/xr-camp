# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 45 minutos.

Sabe siempre si estás conectada, y qué versión está corriendo.

## Tarea

1. Agrega una insignia **Offline** cerca del encabezado: la palabra «Offline», con un borde (nunca solo color). Muéstrala cuando `navigator.onLine` sea `false`, y actualízala con los eventos `online` y `offline` de la ventana.
2. Anuncia el cambio en la región de estado que ya existe: «Estás sin conexión. Los pronósticos guardados siguen funcionando.» y «De vuelta en línea.»
3. Muestra la versión activa en letra pequeña al final de la página: «Version v1». La página no puede leer las variables de `sw.js`, así que pregúntale al worker: envíale un mensaje `{ type: 'GET_VERSION' }`, y en `sw.js` responde con `event.source.postMessage({ type: 'VERSION', version: VERSION })`. Escucha con `navigator.serviceWorker.addEventListener('message', …)`.
4. Cambia `VERSION` a `v2`, presiona **Reload** cuando se ofrezca, y verifica que la línea cambie.

`navigator.onLine` es solo una pista: `true` significa «conectada a una red», no «internet funciona». Por eso el pronóstico sigue teniendo sus propios estados de error.

## Por qué esto importa

Las personas confían en una app que les cuenta lo que está pasando. Y cuando alguien reporta un error, «¿qué versión estás usando?» es la primera pregunta que hace cualquier equipo.

## Se completa cuando

- [ ] La insignia aparece y desaparece al marcar y desmarcar **Offline**, y cada cambio se anuncia.
- [ ] La insignia dice «Offline» con palabras.
- [ ] La línea de versión viene del service worker, y cambia después de una actualización.
