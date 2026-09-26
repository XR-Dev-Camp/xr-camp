# Reto 3: Explorador

**Reto opcional.** Aproximadamente 90 minutos.

Agrega un entorno de staging, para que los cambios lleguen a una URL real antes de que alguien tenga que aprobarlos para producción.

## Tarea

1. Agrega un entorno `staging` (sin revisores obligatorios) y un job `deploy-staging` que corra después de `build`, desplegando a él en cada push a `main`, en paralelo con la ruta existente `approve`/`deploy` hacia producción.
2. GitHub Pages solo sirve un sitio en vivo por repositorio, así que dale a staging su propia ruta o su propio proyecto de Pages: publícalo en una rama estilo `gh-pages` bajo una ruta `/staging/` con el `path` de `actions/upload-pages-artifact` apuntando a una carpeta que incluya ambos, o (más avanzado) despliega staging a un segundo repositorio, separado y dedicado a ello.
3. Actualiza el panel de lanzamiento con una sección "Staging vs. production" que explique la diferencia: staging se despliega automáticamente y no necesita aprobación; producción siempre espera una.
4. Confirma que un push a `main` actualiza staging de inmediato, mientras producción sigue esperando en el job `approve` hasta que la apruebes.

## Por qué importa

La mayoría de los equipos reales no despliegan directo a producción. Un entorno de staging es donde un equipo, o una sola persona revisora, puede ver un cambio en vivo antes de decidir si el público también debería verlo, la misma idea que la compuerta de aprobación manual, un paso antes.

## Se completa cuando

- [ ] Staging se despliega automáticamente, en cada push a `main`.
- [ ] Producción todavía requiere aprobación manual, sin cambios.
- [ ] El panel explica la diferencia entre ambos.
