# Tareas: Interacción de Copilot y Spec Kit en español

**Entrada**: Documentos de diseño en `specs/002-idioma-espanol/`  
**Prerrequisitos**: `spec.md` y `plan.md`

## Convenciones

- Formato: `[ID] [P?] [US?] Descripción con rutas concretas`.
- `[P]` indica que la tarea puede hacerse en paralelo (archivos distintos).
- Sin trabajo de backend, base de datos, formularios, CRUD ni código de la aplicación.
- No hay tareas de pruebas automatizadas; la verificación es manual.

## Fase 1: Preparación

- [x] T001 Revisar `.specify/memory/constitution.md` (principios VII y VIII) y `.github/copilot-instructions.md` para confirmar que incluyen la regla de español y la excepción de FR-008.

## Fase 2: Historias de usuario

### Historia de usuario 1 y 3 (Prioridad: P1/P2) - Regla visible para Copilot

- [x] T002 [US1] Corregir cualquier incoherencia encontrada en T001 en `.specify/memory/constitution.md` y `.github/copilot-instructions.md`.

### Historia de usuario 2 (Prioridad: P1) - Spec Kit en español

- [x] T003 [P] [US2] Añadir la regla de idioma (español obligatorio, excepción solo por petición explícita en la sesión) al inicio del cuerpo de `.github/skills/speckit-analyze/SKILL.md`.
- [x] T004 [P] [US2] Ídem en `.github/skills/speckit-checklist/SKILL.md`.
- [x] T005 [P] [US2] Ídem en `.github/skills/speckit-clarify/SKILL.md`.
- [x] T006 [P] [US2] Ídem en `.github/skills/speckit-constitution/SKILL.md`.
- [x] T007 [P] [US2] Ídem en `.github/skills/speckit-converge/SKILL.md`.
- [x] T008 [P] [US2] Ídem en `.github/skills/speckit-implement/SKILL.md`.
- [x] T009 [P] [US2] Ídem en `.github/skills/speckit-plan/SKILL.md`.
- [x] T010 [P] [US2] Ídem en `.github/skills/speckit-specify/SKILL.md`.
- [x] T011 [P] [US2] Ídem en `.github/skills/speckit-tasks/SKILL.md`.
- [x] T012 [P] [US2] Ídem en `.github/skills/speckit-taskstoissues/SKILL.md`.
- [x] T013 [US2] Confirmar que los textos de `.specify/templates/*.md` están en español y corregir los que no.

## Fase 3: Validación

- [x] T014 Revisar que constitución, instrucciones y los 10 `SKILL.md` no se contradicen (FR-004, FR-005, SC-003).
- [x] T015 Prueba manual en sesión nueva: consulta en inglés y un comando de Spec Kit; confirmar respuestas, preguntas y documentos en español (SC-001, SC-002).
- [x] T016 Prueba manual de la excepción: pedir otro idioma explícitamente y confirmar que solo aplica en esa sesión (FR-008).
- [x] T017 Ejecutar `npm run lint` desde `architecture-viewer/`.
- [x] T018 Ejecutar `npm run build` desde `architecture-viewer/`.
- [x] T019 Revisar los escenarios de aceptación y los límites de la especificación.
