# Plan de implementación: Renombrar el visor a "Arquitectura Multivendor"

**Rama**: `001-renombrar-visor` | **Fecha**: 2026-10-08 | **Spec**: `specs/001-renombrar-visor/spec.md`

## Resumen

Sustituir el texto "CSP Atlas" por "Arquitectura Multivendor" en lo que ve el
usuario (encabezado y título de la pestaña) y en la documentación de apoyo. Es un
cambio solo de rotulación: no se tocan diagramas, datos, estilos ni lógica. La
constitución ya fue enmendada a la versión 1.0.1.

## Contexto técnico

**Language/Version**: JavaScript (ES modules), versión de Node compatible con Vite  
**Primary Dependencies**: React, Vite, @xyflow/react (sin dependencias nuevas)  
**Storage**: N/A — datos estáticos embebidos en el frontend  
**Pruebas**: `npm run lint` y `npm run build`; no hay framework de pruebas automatizadas  
**Plataforma objetivo**: Navegador web, servido localmente  
**Project Type**: web  
**Objetivos de rendimiento**: Sin impacto; solo cambian cadenas de texto  
**Restricciones**: Sin formularios, CRUD, backend, servicios ni datos remotos  
**Escala/Alcance**: Cambio de texto en 2 archivos de la app y 12 de documentación

## Verificación de la constitución

- [x] La propuesta solo presenta o permite explorar diagramas (solo cambia un rótulo).
- [x] Usa datos estáticos locales y no introduce operaciones reales.
- [x] Es coherente con React/Vite y reutiliza la estructura existente.
- [x] Mantiene accesibilidad y funcionamiento en los tamaños admitidos (a validar
  que el nombre más largo no desborde el encabezado).

## Diseño

### Archivos afectados

Aplicación (FR-001, FR-002, FR-003):

- `index.html` (línea 7): `<title>` pasa a `Arquitectura Multivendor`, sin sufijo.
- `src/App.jsx` (línea 95): el rótulo `CSP <b>Atlas</b><small>ARQUITECTURA & NEGOCIO</small>`
  pasa a `Arquitectura Multivendor` en un único estilo, sin `<b>` ni `<small>`;
  se conserva el resto del marcado. Revisar el CSS de `.brand` (`b`, `small`) por
  si el encabezado queda desalineado o desborda con el nombre más largo, y
  ajustar solo lo necesario (cambio mínimo).

Documentación y apoyo (FR-004, FR-004b):

- `.specify/memory/constitution.md`: ya actualizado (v1.0.1); no requiere más cambios.
  Su nota de enmienda conserva la mención histórica al nombre anterior.
- `README.md` (línea 1) y `.github/copilot-instructions.md` (línea 1).
- `specs/README.md` (línea 1).
- Campo `description` de las habilidades en `.github/skills/`: `speckit-specify`,
  `speckit-checklist`, `speckit-clarify`, `speckit-plan`, `speckit-tasks`,
  `speckit-implement`, `speckit-converge`, `speckit-taskstoissues`
  (la de `speckit-constitution` se revisa por si menciona el nombre).

Sin cambios: carpeta `architecture-viewer/`, datos de diagramas, `@xyflow/react`,
Spec Kit de la raíz del repositorio (otro proyecto).

### Verificación

1. `npm run lint` y `npm run build` desde `architecture-viewer/`, sin errores.
2. Búsqueda de "CSP Atlas" en el repositorio (excluyendo `node_modules`, `dist`):
   solo deben quedar las menciones históricas de la enmienda de la constitución y
   las de `specs/001-renombrar-visor/`.
3. Manual con `npm run dev`: el encabezado muestra "Arquitectura Multivendor" en
   todas las vistas, la pestaña dice exactamente "Arquitectura Multivendor", y el
   nombre no se corta en pantallas estrechas y se lee correctamente con teclado y
   lector de pantalla.
