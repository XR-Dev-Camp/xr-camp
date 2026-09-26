# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 45 minutos.

Agrega un cuarto dato formateado con Intl al panel de estadísticas, en los tres idiomas.

## Tarea

1. En `js/config.js`, agrega una nueva constante, `OPENING_HOUR = 9` (la exhibición "abre" a las 9 a. m. hora local).
2. En `js/i18n.js`, escribe `formatOpeningTime(hour, locale)`: construye `new Date(2024, 0, 1, hour)` y formatéala con `new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' })`.
3. Agrega una clave nueva, `stats.opensAt`, a los tres archivos de idioma: `'Opens daily at {time}.'` en inglés, y sus equivalentes en español y chino simplificado (márcalas como borradores, igual que el resto de `es.js` y `zh-Hans.js`).
4. En `renderStats()` de `main.js`, agrega una línea usando `t('stats.opensAt', { time: formatOpeningTime(OPENING_HOUR) })` al arreglo `lines`.
5. Revisa los tres idiomas: la hora debería leerse "9:00 AM" en inglés y una forma de 24 o 12 horas correcta para el idioma en español y chino, sin que tú misma escribas ninguno de los dos formatos.

## Por qué importa

Toda app real eventualmente necesita un formato para el que `Intl` no te dio ya una opción con nombre. Construirlo a partir de las opciones de hora/minuto de `Intl.DateTimeFormat`, en lugar de escribir `"${hour}:00"` a mano, es lo que lo mantiene correcto en cada idioma en el que esta app se publique alguna vez, incluidos los que todavía no has agregado.

## Se completa cuando

- [ ] `formatOpeningTime` existe y usa `Intl.DateTimeFormat`.
- [ ] Los tres idiomas muestran una hora de apertura correctamente formateada.
- [ ] Ningún idioma muestra `stats.opensAt` (un respaldo de clave faltante) en lugar de texto real.
