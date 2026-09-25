# Reto 3: Explorador

**Opcional.** Aproximadamente 45 minutos.

Crea una rama, cambia algo y fusiónala con un *pull request*. O prueba Git en la línea de comandos.

## Tarea A: una rama y un *pull request*, en el navegador

1. En la página principal de tu repositorio, abre el menú de **ramas** (dice `main`). Escribe un nombre nuevo, `new-card`, y elige **Create branch** (crear rama). Ahora estás en `new-card`.
2. Abre `index.html`, edítalo y agrega una tarjeta para algo nuevo: un reto que completaste, o un proyecto que estás planeando. Haz el *commit* en `new-card`.
3. Recarga tu sitio publicado. No cambió nada: Pages publica `main`, y tu cambio está solo en `new-card`.
4. GitHub te ofrece un botón **Compare & pull request** (comparar y crear un *pull request*). (Si no aparece, abre la pestaña **Pull requests** y elige **New pull request**, comparando `new-card` con `main`). Ponle un título, describe qué cambiaste y por qué, y créalo.
5. Lee tu propio *pull request*: la pestaña **Files changed** (archivos modificados) muestra cada línea agregada y borrada. Aquí es donde, en un equipo, otra persona revisaría tu trabajo.
6. Elige **Merge pull request** (fusionar el *pull request*) y confirma. Luego borra la rama cuando GitHub te lo ofrezca.
7. Espera unos minutos y recarga tu sitio. La tarjeta nueva ya está publicada.

Puedes hacer lo mismo en GitHub Desktop: **Branch → New branch** (Rama → Nueva rama), haz el *commit*, **Publish branch** (publicar la rama) y luego **Create Pull Request** (crear un *pull request*).

## Tarea B: Git en la línea de comandos

Git nació como un programa de línea de comandos, y todas las herramientas que usaste esta semana usan por dentro el mismo Git. Instala Git desde [git-scm.com](https://git-scm.com/) (en inglés), abre una terminal (en Windows, **Git Bash**, que viene incluido) y prueba:

```sh
git clone https://github.com/your-username/web-projects.git   # copy the repository
cd web-projects                                               # go into it
git status                                                    # what has changed?
git log --oneline                                             # the history, one line each
```

Cambia un archivo en tu editor y luego:

```sh
git status                                  # your file is listed as modified
git add index.html                          # choose it for the next commit
git commit -m "Improve the introduction"   # save the snapshot, with a message
git push                                    # send it to GitHub
```

La primera vez que haces *push*, Git te pide iniciar sesión en GitHub. GitHub ya no acepta la contraseña de tu cuenta para esto. Si se abre una ventana de inicio de sesión en tu navegador, úsala; si no, [GitHub Docs: Caching your GitHub credentials in Git](https://docs.github.com/en/get-started/git-basics/caching-your-github-credentials-in-git) (en inglés) explica cómo configurarlo.

## Por qué esto importa

Las ramas y los *pull requests* son la forma de trabajar de cualquier equipo de software, y la forma en que vas a contribuir al código abierto, incluido XR Camp, en el Curso 2.7. La línea de comandos es el mismo Git, sin botones: los tutoriales, las entrevistas de trabajo y los servidores la usan.

## Se completa cuando

- [ ] **Tarea A:** tu historial muestra un *pull request* fusionado, y el cambio está en tu sitio publicado.
- [ ] **O Tarea B:** clonaste, hiciste un *commit* y un *push* desde la línea de comandos, y `git log --oneline` muestra tu *commit*.
