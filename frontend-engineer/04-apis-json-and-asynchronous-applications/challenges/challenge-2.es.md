# Desafío 2: Creativo

**Opcional.** Aproximadamente 60 minutos.

Un panel de datos públicos para **tu propia** comunidad.

## Tarea

1. Agrega tu propio pueblo o ciudad a `CITIES` en `config.js`: busca su latitud y longitud en cualquier mapa.
2. Agrega un valor diario más que importe donde vives. La documentación de Open-Meteo los enumera: por ejemplo `uv_index_max` (sol), `wind_speed_10m_max`, o `precipitation_sum` (cuánta lluvia, no solo la probabilidad). Agrégalo a la URL, a `toDays`, a la tabla y al archivo de ejemplo.
3. Cambia la frase de resumen por algo útil para tu comunidad: el mejor día para un mercado, para tender la ropa, para caminar a la biblioteca.
4. Muestra los días y los números en tu idioma: pon `<html lang>` en `es` o `zh-Hans`, y deja que `Intl` haga el resto. Traduce las etiquetas.
5. Da crédito a la fuente de los datos en la página, como pide su licencia.

## Por qué importa

Los mismos cuatro estados, la caché y la protección contra condiciones de carrera sirven para cualquier dato público: horarios de autobuses, calidad del aire, horarios de bibliotecas. Una vez que construyes bien un panel de datos, puedes construirlos para lo que tu comunidad necesite.

## Terminado cuando

- [ ] Tu ciudad está en la lista, con un nuevo valor diario en la tabla y en el archivo de ejemplo.
- [ ] El resumen dice algo útil para tu comunidad.
- [ ] Los días y las etiquetas aparecen en tu idioma.
- [ ] Se da crédito a la fuente de los datos.
