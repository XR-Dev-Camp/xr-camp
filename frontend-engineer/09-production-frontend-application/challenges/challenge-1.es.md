# Reto 1: Fundamento

Un pequeño cambio obligatorio que confirma que entendiste la idea central. Unos 45 minutos.

## Tarea

1. Elige un texto pequeño que la aplicación todavía no muestra en ningún lugar — por ejemplo, una breve oración de bienvenida en el panel de progreso, o una etiqueta para el texto de ayuda del selector de ciudad del clima.
2. Agrega su clave a los tres archivos de idioma (`en.js`, `es.js`, `zh-Hans.js`), escribiendo tú misma el español y el chino (o con un asistente de IA, registrado con honestidad en `ai-log.md`) — basta con un intento breve y honesto; no tiene que ser perfecto.
3. Úsala en la página con `t('your.key')`, o con `data-i18n="your.key"` si nunca necesita un parámetro.
4. Cambia de idioma con el selector de idioma, y confirma que tu nuevo texto también cambia.

## Por qué importa

Agregar una nueva cadena a mano, de principio a fin — la clave, las tres traducciones y un lugar donde se usa — es la unidad más pequeña de «lista para varios idiomas». Si puedes hacerlo una vez, correctamente, puedes hacerlo cien veces, que es lo que termina necesitando una aplicación real.

## Se completa cuando

- [ ] La nueva clave existe en los tres archivos de idioma.
- [ ] Aparece correctamente en inglés, español y chino simplificado.
- [ ] `node scripts/validate-projects.mjs` sigue pasando.
