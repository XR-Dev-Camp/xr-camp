# Reto 2: Creativo

Personaliza el proyecto para que refleje tus intereses, tu comunidad o tu idioma. Entre 45 y 60 minutos.

## Tarea

Haz que My XR Camp sea tuyo. Elige al menos una opción:

- **Tu propio ícono.** Dibuja un nuevo `icon.svg` (y una versión maskable equivalente) con un estilo que se sienta como tú, y vuelve a generar los PNG. Actualiza `ATTRIBUTION.md`.
- **Tu propia ciudad.** Agrega una ciudad cercana a ti en `CITIES`, dentro de `config.js`, con su latitud y longitud, y una clave `city.<id>` en cada archivo de idioma.
- **Tu propio idioma.** Si hablas un idioma que todavía no es uno de los tres borradores, agrega un cuarto archivo de idioma, una entrada en `LOCALES` dentro de `config.js`, y una opción en el selector de idioma. Márcalo como borrador, igual que el español y el chino, a menos que seas una hablante nativa segura de que no necesita revisión.
- **Tu propia paleta de colores.** Cambia las propiedades personalizadas de CSS en `styles.css` (`--color-primary` y las demás), y vuelve a revisar cada par de colores contra WCAG 2.2 AA.

## Por qué importa

Una herramienta que solo funciona como la imaginó quien la creó es una demo. Una herramienta que una estudiante puede acomodar a su propia ciudad, su propio idioma, su propio gusto, sin tocar el código que la hace funcionar — eso está más cerca de algo que vale la pena conservar.

## Se completa cuando

- [ ] Al menos uno de los cambios de arriba está hecho, y funciona en cada idioma que soportas.
- [ ] `node scripts/validate-projects.mjs` sigue pasando.
- [ ] `tests/checklist.md` sigue pasando.
