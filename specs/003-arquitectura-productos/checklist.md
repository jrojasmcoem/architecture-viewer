# Lista de verificación: Arquitectura de productos

**Propósito**: Validar que el diagrama «Productos» y su integración con el flujo multivendor cumplen la especificación, el plan y la constitución  
**Funcionalidad**: `specs/003-arquitectura-productos/spec.md`

## Cobertura

- [ ] El diagrama «Productos» aparece en la navegación entre «Cliente & CSP-Tenant» y «Pedido & aprobaciones», con título, descripción, mensaje clave y puntos destacados en español (FR-001).
- [ ] El nodo de producto lista costo fabricante, precio máximo sugerido, segmentos (Comercial, Educación, Gobierno), código proveedor y menciona términos de duración y ciclos de facturación sin valores (FR-002, FR-008).
- [ ] El código interno explica su composición y su motivo de unicidad, muestra `65324789CA13A12:0-Comercial-Anual-P3Y` y no explica `P3Y` (FR-002).
- [ ] Los tipos Trial, Costo Cero e Introductorio y los estados Activo, Descontinuado, Inactivo e Inconsistente coinciden con `prompts/ArquitecturaProductos.md` (FR-003).
- [ ] Descontinuado se indica como asignado manualmente; Inactivo (incluso manual) y Descontinuado vuelven a Activo al reaparecer en la lista (FR-010).
- [ ] El flujo de sincronización muestra servicio diario (~2 a. m.), API por proveedor y segmento, un CSV por lista, verificación línea por línea y borrado del archivo (FR-004).
- [ ] La inactivación se describe solo para Activos con fecha de actualización anterior a la ejecución; el fallo notifica al buzón de operaciones parametrizado (FR-004).
- [ ] Un producto nuevo se crea como Inconsistente y lo clasifica un Administrador, tras lo cual queda Activo.
- [ ] Las reglas de venta cubren estado Activo, segmento igual al del CSP-Tenant, márgenes por producto, margen calculado sin fórmula y parámetro por proveedor (FR-005).
- [ ] Cada regla del documento fuente es consultable en algún nodo (SC-002).
- [ ] Los límites y supuestos (fórmula no especificada, «Trial» = «Tria», valores de ciclos fuera de alcance) están documentados.

## Integración con el flujo actual

- [ ] «Catálogo sincronizado» en la Visión general enlaza a «Productos» y refleja segmentos y estados (FR-006).
- [ ] Desde la Visión general se llega a «Productos» en dos interacciones (SC-001).
- [ ] «Reglas de venta» enlaza a «Pedido & aprobaciones».
- [ ] Los diagramas existentes conservan su contenido y orden relativo.
- [ ] El diagrama sigue el patrón visual existente: recorrido horizontal, excepciones en fila inferior (FR-011).

## Alineación con el producto

- [ ] La propuesta se limita a diagramas interactivos y presentación.
- [ ] No agrega formularios, CRUD, backend ni operaciones reales; ningún nodo simula la sincronización ni cambia estados.
- [ ] Los datos siguen siendo estáticos y locales, sin recursos remotos ni dependencias nuevas.
- [ ] «Administrador» es solo una etiqueta visual de rol, sin permisos ni autenticación.
- [ ] No se inventan reglas de negocio fuera del documento fuente.
- [ ] La constitución v1.2.0 recoge las reglas de productos (FR-009, ya realizado).

## Accesibilidad y presentación

- [ ] Los nodos nuevos se seleccionan con teclado y ratón y tienen descripción accesible.
- [ ] El rol Administrador tiene color distinto y aparece en la leyenda y en la insignia del panel.
- [ ] La barra lateral admite el sexto ítem sin desbordar.
- [ ] El diagrama se encuadra y recorre en pantallas pequeñas.
- [ ] Los botones anterior/siguiente recorren los seis diagramas correctamente.

## Validación

- [ ] `npm run lint` termina sin errores (SC-003).
- [ ] `npm run build` termina sin errores (SC-003).
