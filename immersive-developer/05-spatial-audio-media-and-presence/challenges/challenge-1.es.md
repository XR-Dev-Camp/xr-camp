# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 45 minutos.

Dale a la pantalla de historia su propio sonido espacial silencioso, separado de los tres pedestales.

## Tarea

1. Genera un nuevo tono corto en bucle con la misma técnica de Python de la sección "Media optimisation" del README (`wave` y `numpy`, sin necesidad de grabar), o reutiliza uno de los archivos existentes en `assets/`. Mantenlo dentro del presupuesto de audio de 2 MB (los archivos existentes están todos muy por debajo de 150 KB).
2. En `js/audio.js` (o una pequeña función nueva junto a él), crea un `THREE.PositionalAudio` más, carga tu nuevo sonido en él, y adjúntalo a la malla de la pantalla de historia (`storyScreen.mesh.add(sound)`, la misma idea que el TODO 2) en lugar de a un pedestal.
3. Agrégalo a `playAll`/`pauseAll` (o conecta un segundo botón pequeño) para que empiece y se detenga con el control existente "Start pedestal sounds", y actualiza la descripción de la escena para mencionarlo.

## Por qué importa

`THREE.PositionalAudio` funciona de la misma forma sin importar a qué esté adjuntado: un pedestal, una pantalla, o cualquier otro objeto de la escena. Practicarlo en un segundo objeto distinto es lo que hace que el patrón se quede grabado, en lugar de solo haberlo visto hecho una vez, en los tres pedestales que la lección ya construyó por ti.

## Se completa cuando

- [ ] Un cuarto sonido espacial se reproduce desde la posición de la pantalla de historia, distinto de los tres sonidos de pedestal.
- [ ] Empieza y se detiene con la misma regla de gesto de usuario que los demás: nada se reproduce hasta un clic real.
- [ ] El selector de modelo de distancia también cambia cómo cae su volumen.
- [ ] La descripción de la escena lo menciona.
