# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 45 minutos.

Agrega una segunda forma, independiente, de iniciar VR: una opción "Enter VR" que también aparezca en el área de la descripción de la escena, para una persona que recorre la página con Tab en un orden distinto.

## Tarea

1. En `completed/index.html` (o tu propia copia de trabajo del starter), agrega un segundo botón, `id="xr-button-secondary"`, cerca del encabezado de la descripción de la escena, con el mismo texto visible que el botón principal de Enter VR ("Enter VR").
2. En `main.js`, una vez que `supportsImmersiveVR()` se resuelva en true, deja de ocultar también este segundo botón, y dale el mismo comportamiento de clic que al primero: hacer clic en cualquiera de los dos debe iniciar o terminar la misma sesión.
3. Mantén sincronizado el texto de ambos botones (y su redacción tipo `aria-pressed`): cuando uno pase a "Exit VR", el otro también debe hacerlo.
4. Prueba con la sección de VR de la lista de verificación, usando Immersive Web Emulator si no tienes un visor.

## Por qué importa

Páginas reales son leídas en órdenes distintos por personas distintas: alguien que usa un lector de pantalla, alguien que solo usa Tab, y alguien que explora visualmente con el mouse pueden encontrar tus controles en secuencias diferentes. Dar a una acción importante más de un punto de entrada predecible y con la misma redacción es buena práctica exactamente por eso, la misma idea que ofrecer "Turn left" como botón y como flecha del teclado.

## Se completa cuando

- [ ] Ambos botones pueden iniciar y terminar la misma sesión de VR.
- [ ] Ambos botones siempre muestran el mismo texto entre sí.
- [ ] `tests/checklist.md` sigue pasando por completo.
