# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 45 minutos.

Agrega una cuarta exhibición interactiva, usando el mismo componente y la misma ruta de código compartida que las otras tres.

## Tarea

1. En `completed/index.html` (o tu propia copia de trabajo del starter), agrega una nueva entidad: cualquier primitiva que prefieras (`a-box`, `a-cylinder`, `a-torus`, y otras funcionan igual), con su propio `id`.
2. Dale `class="interactive"` e `interactive-exhibit="exhibitId: <tu-id>; action: turn"` (o `lift`, o `none` si prefieres que solo se resalte).
3. Agrega un objeto correspondiente a `exhibitData` en `main.js`: `id`, `label`, `description`, `action`, y `hasAudio: false`.
4. Recarga la página. Confirma que tu nueva exhibición aparece en la lista 2D, obtiene su propio botón "Seleccionar" automáticamente, y reacciona de la misma forma a un clic, un toque, su botón, y (si puedes probarlo) el gatillo de un control de VR.

## Por qué importa

Un componente y una función compartida `selectExhibit()` existen para que agregar una cuarta exhibición sea un cambio de datos y una entidad HTML, no código nuevo. Si te encontraste escribiendo una función nueva para tu cuarta exhibición, algo sigue codificado a mano en "tres exhibiciones" en alguna parte: encuéntralo y generalízalo.

## Se completa cuando

- [ ] La nueva exhibición aparece en la sala, en la lista 2D, y en los botones "Seleccionar", todo construido a partir de la misma entrada de `exhibitData`.
- [ ] Seleccionarla (por cualquier entrada) reproduce su acción y actualiza el panel de información y `#status`, sin ninguna función nueva más allá de la entrada de `exhibitData` y los atributos HTML.
