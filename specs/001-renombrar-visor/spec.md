# Especificación: Renombrar el visor a "Arquitectura Multivendor"

**Rama**: `001-renombrar-visor`  
**Creada**: 2026-10-08  
**Estado**: Borrador

## Resumen

Quien presenta o explora el visor en el navegador actualmente ve el nombre
"CSP Atlas". Necesita que el nombre visible sea "Arquitectura Multivendor" para
que la presentación refleje el nombre deseado del producto. El cambio es solo de
rotulación; no altera diagramas, datos ni navegación.

## Escenarios de usuario y pruebas

### Historia de usuario 1 - Ver el nuevo nombre en la interfaz (Prioridad: P1)

Al abrir el visor, la marca mostrada en el encabezado debe decir
"Arquitectura Multivendor" en lugar de "CSP Atlas".

**Prueba independiente**: Abrir el visor localmente y revisar el encabezado en
todas las vistas disponibles.

**Escenarios de aceptación**:

1. **Dado** que el visor está abierto, **cuando** se observa el encabezado,
   **entonces** se muestra "Arquitectura Multivendor" y no aparece "CSP Atlas".
2. **Dado** que el usuario navega entre las vistas o diagramas existentes,
   **cuando** el encabezado permanece visible, **entonces** el nuevo nombre se
   mantiene sin cambios.

### Historia de usuario 2 - Ver el nuevo nombre en la pestaña del navegador (Prioridad: P1)

El título de la pestaña del navegador debe usar el nuevo nombre.

**Prueba independiente**: Abrir el visor y leer el título de la pestaña.

**Escenarios de aceptación**:

1. **Dado** que el visor está abierto en el navegador, **cuando** se lee el
   título de la pestaña, **entonces** es exactamente "Arquitectura Multivendor".

### Historia de usuario 3 - Documentación y constitución coherentes (Prioridad: P2)

La constitución mencionaba "CSP Atlas" como nombre del producto; ya fue
enmendada (versión 1.0.1) para usar el nuevo nombre. La documentación de apoyo
debe ser coherente.

**Prueba independiente**: Buscar "CSP Atlas" en la documentación del proyecto y
confirmar que no quedan referencias al nombre anterior como nombre del producto.

**Escenarios de aceptación**:

1. **Dado** la documentación y la constitución vigentes, **cuando** se busca
   "CSP Atlas", **entonces** no se encuentra como nombre del producto.

## Requisitos funcionales

- **FR-001**: El visor DEBE mostrar "Arquitectura Multivendor" como nombre del
  producto en el encabezado.
- **FR-002**: El título de la pestaña del navegador DEBE ser exactamente
  "Arquitectura Multivendor".
- **FR-003**: El texto "CSP Atlas" NO DEBE aparecer en ninguna parte visible
  para el usuario en el visor.
- **FR-004**: La constitución DEBE usar "Arquitectura Multivendor" como nombre
  del producto, con versión y fecha de enmienda actualizadas, sin modificar sus
  principios (ya aplicado: versión 1.0.1).
- **FR-004b**: Los archivos de apoyo (README, guía de Copilot, `specs/README.md`
  y descripciones de habilidades de Spec Kit) DEBEN usar el nuevo nombre dentro
  de esta funcionalidad (decisión confirmada).
- **FR-005**: El resto de la interfaz (diagramas, controles y navegación) DEBE
  permanecer igual.
- **FR-006**: El encabezado DEBE mostrar el nombre completo con un único estilo
  (sin énfasis parcial) y sin subtítulo debajo (se elimina "ARQUITECTURA & NEGOCIO"
  por repetir la palabra "Arquitectura"; decisión confirmada).

## Casos límite

- El nombre más largo no debe cortarse ni desbordar el encabezado en los
  tamaños de pantalla admitidos.
- El nombre debe seguir siendo legible y accesible, como el anterior.
- Verificación de constitución: este cambio no introduce formularios, CRUD,
  backend, autenticación ni efectos operativos.

## Fuera de alcance

- Formularios, CRUD, backend, autenticación y operaciones reales.
- Cambios en diagramas, datos, colores, logotipo o funcionalidad.
- Renombrar la carpeta o el repositorio `architecture-viewer`.
- Modificar el Spec Kit de la raíz del repositorio (pertenece a otro proyecto).

## Criterios de éxito

- **SC-001**: En el 100 % de las vistas, el nombre mostrado es
  "Arquitectura Multivendor".
- **SC-002**: Buscar "CSP Atlas" en la interfaz visible y en el título de la
  pestaña no devuelve resultados.
- **SC-003**: La aplicación se valida con `npm run lint` y `npm run build` sin
  errores.

## Suposiciones

- Los datos se mantienen estáticos y locales al frontend.
- El subtítulo "ARQUITECTURA & NEGOCIO" del encabezado se elimina y el nombre se
  muestra con un único estilo.
- El título de la pestaña será exactamente "Arquitectura Multivendor", sin el
  sufijo anterior ("· Arquitectura y negocio").
- Capitalización exacta: "Arquitectura Multivendor".
- Las menciones en archivos de apoyo (README, guía de Copilot, descripciones de
  habilidades de Spec Kit) se actualizan por coherencia.

## Preguntas pendientes

- Ninguna.
