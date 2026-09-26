# Reto 3: Explorador

**Reto opcional.** Aproximadamente 90 minutos.

Agrega una comprobación automatizada básica a tu compilación.

## Tarea

1. Escribe un script pequeño (Node.js está bien, usando solo módulos integrados o `playwright-core` si ya lo tienes instalado, como hacen los propios scripts de prueba de este repositorio) que abra tu página de producción y revise errores de consola.
2. Documenta cómo ejecutarlo en tu README, bajo una sección "Testing".
3. Ejecútalo una vez, y anota el resultado en tu registro de cambios.

## Por qué importa

Una sola comprobación automatizada que detecta "la página lanza un error" cuesta poco escribir y puede detectar una regresión real antes de que la notes a mano. Este es un pequeño primer paso hacia el tipo de pruebas en las que confían los equipos profesionales.

## Se completa cuando

- [ ] Existe un script que abre la página de producción y reporta errores de consola.
- [ ] El README documenta cómo ejecutarlo.
- [ ] Se ha ejecutado al menos una vez, con el resultado registrado.
