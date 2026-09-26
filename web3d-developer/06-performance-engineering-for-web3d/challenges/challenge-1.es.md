# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 45 minutos.

Agrega una cuarta ala a la sala, con carga perezosa como las otras tres.

## Tarea

1. En `js/hall.js`, agrega una nueva entrada al arreglo `WINGS`: un nombre, una posición `x`/`z` lo bastante lejos de la cuadrícula principal y de las otras alas como para que se sienta como su propio espacio, y un tamaño `rows`/`cols`.
2. Agrega un destino de viaje "Ir a: ..." correspondiente en `js/main.js`, para que la nueva ala sea alcanzable por teclado, de la misma forma que los otros seis destinos.
3. Agrega una línea para ella en `renderList()` en `js/main.js`, para que aparezca en la lista siempre presente "Todo en la sala".
4. Carga la página, viaja a tu nueva ala, y confirma en el panel Stats que "Alas cargadas actualmente" aumenta cuando llegas y vuelve a bajar cuando regresas a la cuadrícula principal.
5. Confirma que la descripción de la escena menciona el nuevo conteo correcto de alas.

## Por qué importa

Agregar un nuevo destino a una escena que ya tiene carga perezosa debería ser un cambio pequeño y mecánico: una nueva entrada en una lista de datos, no una nueva copia de la lógica de carga y liberación. Si el paso 4 funciona sin tocar `createWingManager`, eso demuestra que el sistema de carga perezosa que construiste en el Paso 8 realmente se generaliza, en lugar de haber sido conectado a mano para exactamente tres alas.

## Se completa cuando

- [ ] Existe una cuarta ala en `WINGS`, con su propia posición y tamaño.
- [ ] Tiene un botón "Ir a..." funcional y una línea en la lista 2D.
- [ ] El conteo de "Alas cargadas actualmente" del panel Stats sube y baja correctamente al viajar hacia ella y de vuelta.
- [ ] Ninguna ala, vitrina, o la cuadrícula principal existentes cambiaron su comportamiento.
