# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 45 minutos.

Agrega una forma segura de probar los primeros jobs del pipeline sin llegar nunca al despliegue.

## Tarea

1. En tu propia copia de `deploy.yml`, agrega un segundo input de disparo a `workflow_dispatch`: un booleano `dry_run`, con valor por defecto `false`.
2. Agrega `if: github.event.inputs.dry_run != 'true'` a los jobs `build`, `approve` y `deploy`, para que una corrida de prueba (dry run) se detenga después de `accessibility`.
3. Corre el flujo de trabajo a mano una vez con `dry_run` en `true`, y confirma en la pestaña Actions que solo corrieron `validate` y `accessibility`.
4. Corre otra vez con `dry_run` en `false` (o déjalo en su valor por defecto) y confirma que el pipeline completo corre como antes.

## Por qué importa

Un equipo real cambia un pipeline a menudo: una comprobación nueva, una versión distinta de Node, un job renombrado. Probar ese cambio con seguridad, sin un despliegue real y sin esperar a que alguien lo apruebe, es lo que le permite a un equipo mejorar su pipeline con confianza en lugar de miedo.

## Se completa cuando

- [ ] `dry_run` existe como input de `workflow_dispatch`, con un valor por defecto razonable.
- [ ] Una corrida de prueba se detiene visiblemente antes de `build`.
- [ ] Una corrida normal sigue completando el pipeline entero.
