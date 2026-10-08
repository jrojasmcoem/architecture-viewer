# Plan de implementación: Interacción de Copilot y Spec Kit en español

**Rama**: `002-idioma-espanol` | **Fecha**: 2026-10-08 | **Spec**: `specs/002-idioma-espanol/spec.md`

## Resumen

Asegurar que Copilot y cualquier modelo respondan, pregunten y generen
artefactos en español. El enfoque solo modifica archivos de configuración y
documentación (constitución, instrucciones de Copilot, skills y plantillas de
Spec Kit). No toca el código de la aplicación ni los diagramas.

## Contexto técnico

**Language/Version**: JavaScript (ES modules), versión de Node compatible con Vite; sin cambios de código  
**Primary Dependencies**: React, Vite, @xyflow/react (sin cambios ni nuevas dependencias)  
**Storage**: N/A — datos estáticos embebidos en el frontend  
**Pruebas**: `npm run lint` y `npm run build`; no hay framework de pruebas automatizadas  
**Plataforma objetivo**: Navegador web, servido localmente  
**Project Type**: web  
**Objetivos de rendimiento**: Sin impacto; la aplicación no cambia  
**Restricciones**: Sin formularios, CRUD, backend, servicios ni datos remotos; solo archivos `.md`  
**Escala/Alcance**: Archivos de configuración de Copilot y Spec Kit dentro de `architecture-viewer/`

## Verificación de la constitución

- [x] La propuesta no altera el visor; solo afecta la comunicación del asistente.
- [x] No usa datos remotos ni introduce operaciones reales.
- [x] No modifica React/Vite ni la estructura existente.
- [x] No afecta la accesibilidad ni los tamaños admitidos de la aplicación.
- [x] Cumple los principios VII y VIII (markdown y comunicación en español).

## Diseño

### Archivos afectados

- `.specify/memory/constitution.md`: ya incluye el principio VIII (v1.1.0) con la excepción de idioma explícita; solo se verifica la coherencia.
- `.github/copilot-instructions.md`: ya incluye la regla de idioma; solo se verifica la coherencia.
- `.github/skills/speckit-*/SKILL.md` (10 archivos): añadir al inicio del cuerpo una línea que obligue a conversar, preguntar y redactar artefactos en español (con la excepción de FR-008), para que los flujos de Spec Kit la respeten aunque no se lea la constitución.
- `.specify/templates/*.md`: confirmar que los encabezados y textos ya están en español; corregir los que no lo estén.
- Sin cambios en `src/`, `package.json` ni configuración de Vite.

### Verificación

- Revisión manual de que constitución, instrucciones y los 10 `SKILL.md` contienen la regla y no se contradicen (FR-004, FR-005, SC-003).
- Prueba manual en sesión nueva: consulta en inglés y un comando de Spec Kit; confirmar respuestas, preguntas y documentos en español (SC-001, SC-002).
- Prueba manual de la excepción: pedir otro idioma explícitamente y confirmar que solo aplica en esa sesión (FR-008).
- `npm run lint` y `npm run build` para confirmar que la aplicación sigue intacta.
