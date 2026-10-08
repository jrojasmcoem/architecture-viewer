# Tareas: Renombrar el visor a "Arquitectura Multivendor"

**Entrada**: Documentos de diseño en `specs/001-renombrar-visor/`  
**Prerrequisitos**: `spec.md` y `plan.md`

## Convenciones

- Formato: `[ID] [P?] [US?] Descripción con rutas concretas`.
- `[P]` indica que la tarea puede hacerse en paralelo (archivos distintos).
- Sin trabajo de backend, base de datos, formularios ni CRUD.
- No hay infraestructura de pruebas automatizadas; se valida con lint, build y
  revisión manual.

## Fase 1: Preparación

- [x] T001 Revisar `.specify/memory/constitution.md` (v1.0.1) y el encabezado en
  `src/App.jsx` y su CSS (`.brand`, `b`, `small`) para conocer los estilos afectados.

## Fase 2: Historias de usuario

### Historia de usuario 1 - Nombre en el encabezado (Prioridad: P1)

- [x] T002 [US1] En `src/App.jsx` (línea ~95) sustituir `CSP <b>Atlas</b><small>ARQUITECTURA & NEGOCIO</small>`
  por el texto `Arquitectura Multivendor` en un único estilo, sin `<b>` ni `<small>`.
- [x] T003 [US1] Ajustar solo lo necesario en el CSS existente de `.brand` (ubicar
  el archivo en T001) si el encabezado queda desalineado o desborda.

### Historia de usuario 2 - Título de la pestaña (Prioridad: P1)

- [x] T004 [P] [US2] En `index.html` (línea 7) cambiar `<title>` a exactamente
  `Arquitectura Multivendor`.

### Historia de usuario 3 - Documentación coherente (Prioridad: P2)

- [x] T005 [P] [US3] Cambiar el título de `README.md` (línea 1) a "Arquitectura Multivendor".
- [x] T006 [P] [US3] Cambiar la línea 1 de `.github/copilot-instructions.md` a
  "Guía de Copilot para Arquitectura Multivendor".
- [x] T007 [P] [US3] Cambiar la línea 1 de `specs/README.md` a
  "Especificaciones de Arquitectura Multivendor".
- [x] T008 [P] [US3] Sustituir "CSP Atlas" por "Arquitectura Multivendor" en el
  campo `description` de `.github/skills/speckit-specify/SKILL.md`,
  `speckit-checklist`, `speckit-clarify`, `speckit-plan`, `speckit-tasks`,
  `speckit-implement`, `speckit-converge` y `speckit-taskstoissues` (cada uno en
  su `SKILL.md`), y revisar `speckit-constitution/SKILL.md`.

## Fase 3: Validación

- [x] T009 Ejecutar `npm run lint` desde `architecture-viewer/`.
- [x] T010 Ejecutar `npm run build` desde `architecture-viewer/`.
- [x] T011 Buscar "CSP Atlas" en el repositorio (sin `node_modules` ni `dist`):
  solo deben quedar la nota de enmienda de la constitución y `specs/001-renombrar-visor/`.
- [ ] T012 Con `npm run dev`, verificar que el encabezado muestra el nombre en todas
  las vistas, la pestaña dice exactamente "Arquitectura Multivendor", y que el nombre
  no se corta en pantallas estrechas y se lee con teclado y lector de pantalla.
- [x] T013 Revisar los escenarios de aceptación y límites de `spec.md`
  (FR-001 a FR-006).

## Fase 4: Convergencia (pendiente tras la revisión)

- [x] T014 [US1] Verificar visualmente en `src/App.jsx` / `src/App.css` (`.brand`,
  23 px; 20 px en pantallas estrechas) que "Arquitectura Multivendor" no se
  corta ni desborda la barra lateral de 242 px; el texto es más largo que el
  anterior y puede partirse en dos líneas. Si no se ve bien, ajustar solo el
  tamaño o salto de línea de `.brand` en `src/App.css`.
- [x] T015 [P] Corregir el formato en `specs/001-renombrar-visor/spec.md`
  (historia 2, escenario 1): `**   entonces**` debe ser `**entonces**`.

## Decisión futura (no es una brecha)

- Las reglas `.brand b` y `.brand small` en `src/App.css` quedaron sin uso;
  eliminarlas es opcional y queda a criterio del usuario.

## Dependencias

- T001 antes de T002 y T003; T003 depende de T002.
- T004 a T008 son independientes entre sí y de T002.
- Fase 3 al terminar las fases anteriores.


