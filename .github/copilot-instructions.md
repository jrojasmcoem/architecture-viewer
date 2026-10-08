# Guía de Copilot para Arquitectura Multivendor

- Idioma: responde, haz preguntas de aclaración y explica todo SIEMPRE en
  español (CLI, chat y flujos de Spec Kit), aunque la solicitud esté en otro
  idioma. Solo si el usuario pide explícitamente otro idioma, úsalo durante esa
  sesión. Los artefactos y archivos `.md` también se escriben en español. El
  código, los identificadores y las salidas literales de herramientas pueden
  quedar en su idioma original, pero se explican en español.

- Este espacio de trabajo es `architecture-viewer/`, una aplicación local React/Vite
  para presentar y explorar diagramas interactivos.
- Respeta `.specify/memory/constitution.md`. No agregues formularios, CRUD,
  backend, autenticación, llamadas reales ni simulaciones operativas.
- Los datos de los diagramas son estáticos y viven en el frontend. No incorpores
  recursos externos en tiempo de ejecución.
- Reutiliza React, Vite, `@xyflow/react` y el código existente antes de agregar
  dependencias.
- Mantén las interacciones accesibles y limita los cambios a la especificación.
- Ejecuta `npm run lint` y `npm run build` desde esta carpeta al cambiar la app.
- El Spec Kit de la raíz del repositorio es independiente y pertenece a
  ContosoDashboard: no lo modifiques desde esta configuración.
