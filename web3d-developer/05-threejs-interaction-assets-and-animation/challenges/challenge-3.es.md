# Reto 3: Explorador

**Reto opcional.** Aproximadamente 90 minutos.

Deja que quien aprende elija qué clip de animación se reproduce, para un modelo que tiene más de uno.

## Tarea

1. En la consola del navegador, una vez que el zorro haya cargado, registra `app.items.find(i => i.data.id === 'fox').mixer._actions` (o agrega temporalmente `console.log(gltf.animations.map(c => c.name))` dentro de `loadModels()`). El archivo real `Fox.glb` que este proyecto ya descarga trae tres clips: `Survey`, `Walk`, y `Run`, aunque `loadModels()` solo reproduce `gltf.animations[0]`.
2. Cambia `loadModels()` (o una función nueva que llame) para conservar cada clip que tenga un modelo, no solo el primero, en el objeto `item` (por ejemplo, `item.clips = gltf.animations`).
3. Cuando el zorro esté seleccionado, muestra un pequeño conjunto de botones en `#selection-info` (o un elemento nuevo), uno por cada nombre de clip, que llame a `mixer.clipAction(clip).play()` para el elegido. Detén primero la acción anterior (`item.action.stop()`), o mézclalas de forma gradual (`newAction.crossFadeFrom(item.action, 0.3)`), para que dos clips nunca controlen el mismo esqueleto a la vez.
4. Dale a estos botones el mismo patrón de nombre accesible que este proyecto ya usa en otras partes: `"Reproducir: Survey"`, `"Reproducir: Walk"`, `"Reproducir: Run"`.
5. Respeta el botón de Pausa y el movimiento reducido exactamente igual que antes: el clip que esté elegido en ese momento debería seguir congelándose cuando `animating` sea falso.

## Por qué importa

Un modelo glTF real muy a menudo trae varios clips de animación para un mismo esqueleto (una pose de reposo, una caminata, una carrera, un saludo), y una aplicación real tiene que decidir, o dejar que decida quien la usa, cuál se reproduce y cuándo. Este reto es un lugar pequeño y seguro para enfrentar esa decisión por primera vez, antes de que el proyecto final de 3.7 te pida tomarla con contenido real de tu propia elección.

## Se completa cuando

- [ ] Los tres clips reales del zorro (`Survey`, `Walk`, `Run`) son alcanzables desde la página, no solo el primero.
- [ ] Elegir un clip distinto detiene o mezcla gradualmente el anterior, así el modelo nunca se ve roto.
- [ ] Pausar y el movimiento reducido siguen congelando el clip que esté reproduciéndose en ese momento.
