# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 45 minutos.

Agrega una funcionalidad al planificador limpio, y observa cómo te ayuda la estructura.

## Tarea

1. Agrega un botón **Edit** (Editar) a cada sesión en «Still to do» (Pendientes). Al presionarlo, se reemplaza el texto de la sesión por una casilla de texto con etiqueta («Topic for Tuesday at 19:00») y un botón **Save** (Guardar). Al presionar Save (o Enter) se cambia el tema.
2. Agrega una nueva acción al store, `renameSession(id, topic)`, que rechace un tema vacío.
3. Mantén el foco en un lugar sensato: dentro de la casilla de texto cuando empieza la edición, de vuelta en el botón Edit de la sesión después de guardar. Anuncia el cambio.
4. Lleva una lista de cada archivo que cambiaste, y por qué.
5. Ahora imagina agregar la misma funcionalidad a `old/app.js`. ¿Qué partes tendrías que tocar?

## Por qué importa

El objetivo de la arquitectura no es el orden por sí mismo: es que el próximo cambio sea fácil. Si tu lista del paso 4 dice «store: nueva acción; componente: nuevo botón; main: un caso más en el listener de click», la estructura está cumpliendo su función.

## Se completa cuando

- [ ] Las sesiones se pueden renombrar usando solo el teclado.
- [ ] Un tema vacío se rechaza, con un mensaje junto al campo.
- [ ] Solo el store cambia el estado; el componente solo construye.
- [ ] Tu diario tiene la lista de archivos cambiados, y tu respuesta al paso 5.
