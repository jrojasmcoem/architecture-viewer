---
name: speckit-tasks
description: Generar tareas implementables a partir del plan de Arquitectura Multivendor.
---

# Tareas

**Idioma**: conversa, pregunta y redacta todo en español, salvo que el usuario pida expresamente otro idioma (solo durante esa sesión).

Lee la especificación, el plan y la constitución. Genera `tasks.md` en la carpeta
de la funcionalidad a partir de `.specify/templates/tasks-template.md`. Divide
el trabajo en tareas pequeñas, con identificadores, prioridades de historia y
rutas exactas. Incluye validación accesible y los comandos existentes cuando
corresponda. Omite tareas de backend, formularios, CRUD e infraestructura no
aplicable. No implementes las tareas.
