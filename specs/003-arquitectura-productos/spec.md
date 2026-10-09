# Especificación: Arquitectura de productos

**Rama**: `003-arquitectura-productos`  
**Creada**: 2026-10-09  
**Estado**: Borrador

## Resumen

Quien presenta la arquitectura necesita explicar cómo se modelan, sincronizan y
usan los productos de los proveedores dentro del flujo multivendor. Se añade un
nuevo diagrama «Productos» a la navegación y se actualiza la Visión general para
que el componente «Catálogo sincronizado» conduzca a él. Fuente de las reglas:
`prompts/ArquitecturaProductos.md`.

## Escenarios de usuario y pruebas

### Historia de usuario 1 - Entender qué es un producto (Prioridad: P1)

El presentador muestra las características de un producto: costo fabricante,
precio máximo sugerido, segmento, código proveedor, términos de duración y ciclos
de facturación, y el código interno que los combina.

**Prueba independiente**: abrir el diagrama «Productos» y revisar los nodos de
características y de código interno.

**Escenarios de aceptación**:

1. **Dado** el diagrama «Productos», **cuando** se selecciona el nodo de
   características, **entonces** se listan costo fabricante, precio máximo
   sugerido, segmentos (Comercial, Educación, Gobierno), código proveedor y
   términos de duración y ciclos de facturación.
2. **Dado** el nodo de código interno, **cuando** se selecciona, **entonces** se
   explica que lo calcula el sistema concatenando código proveedor, segmento,
   término de facturación y duración, y que existe para tener códigos únicos
   porque el proveedor repite el código con costos distintos según término y
   segmento. Se muestra el ejemplo `65324789CA13A12:0-Comercial-Anual-P3Y`, sin
   explicar el significado de `P3Y`.

---

### Historia de usuario 2 - Tipos y estados del producto (Prioridad: P1)

El presentador explica los tipos de producto según el proveedor (Trial, Costo
Cero, Introductorio) y los estados (Activo, Descontinuado, Inactivo,
Inconsistente) con sus restricciones de venta.

**Prueba independiente**: seleccionar cada nodo de tipo y de estado y verificar
su descripción.

**Escenarios de aceptación**:

1. **Dado** el diagrama, **cuando** se consultan los tipos, **entonces** Trial
   se describe como producto de prueba que normalmente no tiene costo ni precio
   máximo sugerido; Costo Cero como complemento de otros productos sin valor; e
   Introductorio como producto de precio especial, fuera de la lista regular y
   solo para ventas autorizadas.
2. **Dado** el nodo Descontinuado, **cuando** se selecciona, **entonces** indica
   que ya no viene en la lista de precios, no se permite en ventas nuevas, solo
   se vende a clientes con suscripción activa mediante renovación, y si la
   suscripción vence sin renovarse ya no puede venderse.
3. **Dado** los nodos Activo, Inactivo e Inconsistente, **cuando** se
   seleccionan, **entonces** se indica: Activo está listo para agregarse al
   pedido; Inactivo ya no está en la lista actual o fue inactivado manualmente;
   Inconsistente fue creado por una actualización de listas y requiere ajuste
   manual.

---

### Historia de usuario 3 - Sincronización diaria de productos (Prioridad: P1)

El presentador recorre la sincronización: servicio Windows diario (~2 a. m.),
consulta por API por proveedor y segmento, un CSV por lista de precios,
procesamiento línea por línea, creación como Inconsistente, clasificación manual
que lleva a Activo, inactivación de no vistos y notificación de fallos.

**Prueba independiente**: seguir el recorrido en el diagrama de principio a fin.

**Escenarios de aceptación**:

1. **Dado** el flujo de sincronización, **cuando** se recorre, **entonces** se
   ven en orden: consulta API → archivos CSV (uno por lista; un proveedor puede
   tener varias, separadas por segmento o tipo) → verificación línea por línea →
   borrado del archivo procesado.
2. **Dado** el nodo de verificación, **cuando** se selecciona, **entonces** se
   explica que si el producto existe se actualiza (nombre, descripción, precio,
   etc.) y si no existe se crea como Inconsistente porque el servicio no puede
   categorizarlo; una persona lo clasifica y queda Activo.
3. **Dado** el nodo de inactivación, **cuando** se selecciona, **entonces** se
   explica que, al terminar todos los archivos, se inactivan solo los productos
   Activos cuya fecha de actualización es anterior a la fecha de ejecución del
   servicio, pues se entiende que ya no están en la lista de precios.
4. **Dado** el nodo de fallos, **cuando** se selecciona, **entonces** indica
   que si falla la actualización de precios se notifica al buzón de operaciones
   parametrizado en base de datos.

---

### Historia de usuario 4 - Productos dentro del pedido (Prioridad: P2)

El presentador explica las reglas de venta: estado Activo, segmento igual al del
CSP-Tenant, márgenes de utilidad y el límite por proveedor sobre el precio
máximo sugerido.

**Prueba independiente**: seleccionar los nodos de reglas de venta.

**Escenarios de aceptación**:

1. **Dado** el nodo de reglas de venta, **cuando** se selecciona, **entonces**
   indica que solo se agregan productos Activos y solo del mismo segmento del
   CSP-Tenant (p. ej. un producto Comercial no se vende a un CSP-Tenant de
   Educación).
2. **Dado** el nodo de márgenes, **cuando** se selecciona, **entonces** indica
   que los márgenes de utilidad se parametrizan por producto y que, sin ellos, el
   sistema calcula el margen entre costo fabricante y precio máximo sugerido; la
   fórmula exacta no está especificada y no se muestra.
3. **Dado** el nodo del parámetro por proveedor, **cuando** se selecciona,
   **entonces** indica que, si está habilitado, el pedido no continúa cuando
   costo fabricante + margen de utilidad parametrizado supera el precio máximo
   sugerido, porque algunos proveedores multan a distribuidores que lo exceden.

---

### Historia de usuario 5 - Integración con el flujo actual (Prioridad: P2)

**Prueba independiente**: desde la Visión general llegar al diagrama «Productos».

**Escenarios de aceptación**:

1. **Dado** la Visión general, **cuando** se selecciona «Catálogo sincronizado»,
   **entonces** se ofrece saltar al diagrama «Productos».
2. **Dado** el diagrama «Productos», **cuando** se consultan los nodos de venta,
   **entonces** se ofrece saltar al diagrama «Pedido & aprobaciones».
3. **Dado** la navegación, **cuando** se muestra, **entonces** «Productos»
   aparece como un diagrama más, junto a los existentes, que se conservan sin
   cambios.

## Aclaraciones

### Sesión 2026-10-09

- P: ¿Cómo pasa un producto a Descontinuado? → R: Se asigna manualmente.
- P: ¿Un producto Inactivo se reactiva? → R: Sí, vuelve a Activo cuando
  reaparece en la lista de precios durante la sincronización.
- P: ¿Cómo se organiza el diagrama? → R: Un solo diagrama con recorrido de
  izquierda a derecha, como los existentes (p. ej. Pedido): origen en el
  proveedor → sincronización (API, CSV, verificación) → estados del producto →
  reglas de venta → enlace al diagrama «Pedido & aprobaciones». Las
  características, el código interno y los tipos se muestran como detalle de los
  nodos «Producto» y «Tipos de producto», no como zonas independientes. Los
  caminos alternos (Inconsistente, fallo, Descontinuado) usan una fila inferior,
  igual que «Devuelto» o «Avance bloqueado» en el diagrama de pedido.
- P: ¿Qué pasa con un Inactivo manual o un Descontinuado que reaparece en la
  lista? → R: Ambos vuelven a Activo durante la sincronización.
- P: ¿Quién clasifica los productos Inconsistentes? → R: Un Administrador. El
  diagrama lo nombra en el detalle del nodo; no es uno de los roles actuales
  (Comercial, Gerencia, Operaciones), por lo que su representación visual se
  define en el plan sin inventar permisos adicionales.

## Requisitos funcionales

- **FR-001**: El visor DEBE incluir un diagrama «Productos» en la navegación, con
  título, descripción, mensaje clave y puntos destacados en español.
- **FR-002**: El diagrama DEBE representar las características del producto y el
  código interno con el ejemplo indicado, sin definir el significado de `P3Y`.
- **FR-003**: El diagrama DEBE representar los tipos (Trial, Costo Cero,
  Introductorio) y los estados (Activo, Descontinuado, Inactivo, Inconsistente)
  con las reglas descritas arriba.
- **FR-004**: El diagrama DEBE representar el flujo de sincronización diaria,
  incluida la regla de inactivación (solo Activos con fecha de actualización
  anterior a la ejecución) y la notificación de fallos.
- **FR-005**: El diagrama DEBE representar las reglas de venta: estado Activo,
  coincidencia de segmento con el CSP-Tenant, márgenes por producto, margen
  calculado cuando no hay parametrización (sin fórmula) y parámetro por proveedor.
- **FR-006**: La Visión general DEBE enlazar «Catálogo sincronizado» con el nuevo
  diagrama y reflejar que los productos tienen segmentos y estados.
- **FR-007**: Los nodos DEBEN ser seleccionables con teclado y ratón, con
  descripciones accesibles, igual que los diagramas existentes.
- **FR-008**: Los términos de duración y ciclos de facturación DEBEN mencionarse
  como concepto, sin listar valores.
- **FR-009**: La constitución DEBE enmendarse (nueva versión) para registrar las
  reglas de negocio de productos (ya realizado: versión 1.2.0).
- **FR-010**: El diagrama DEBE indicar que Descontinuado se asigna manualmente y
  que un producto Inactivo (incluso manual) o Descontinuado vuelve a Activo si
  reaparece en la lista durante la sincronización.
- **FR-011**: El diagrama «Productos» DEBE seguir el patrón visual de los
  existentes (recorrido horizontal, filas inferiores para excepciones, nodos con
  rol y detalles seleccionables).

## Casos límite

- Pantallas pequeñas: el diagrama debe poder encuadrarse y recorrerse como los demás.
- Reglas no especificadas (fórmula del margen calculado, hora exacta, valores de
  ciclos) se indican como no especificadas, sin inventarlas.
- Si un producto Inconsistente o Descontinuado no aparece en la lista, la
  inactivación no lo afecta: solo aplica a Activos.
- Un Inactivo (incluso manual) o un Descontinuado que reaparece en la lista
  vuelve a Activo.

## Fuera de alcance

- Formularios, CRUD, backend, autenticación y operaciones reales.
- Ejecutar o simular la sincronización, clasificar productos o editar estados.
- Valores concretos de términos de duración y ciclos de facturación, y la
  fórmula del margen calculado.
- Modificar los diagramas de Cliente, Pedido, Aprovisionamiento y Suscripciones.
- Modificar la Visión general, salvo ampliar los detalles del nodo «Catálogo
  sincronizado» y enlazarlo a «Productos».

## Criterios de éxito

- **SC-001**: Una persona puede, desde la Visión general, llegar al diagrama
  «Productos» en dos interacciones.
- **SC-002**: Cada regla de `prompts/ArquitecturaProductos.md` es consultable en
  algún nodo del diagrama.
- **SC-003**: `npm run lint` y `npm run build` terminan sin errores tras la
  implementación.

## Suposiciones

- Los datos se mantienen estáticos y locales al frontend.
- «Trial» corresponde a «Tria» del documento fuente (tipo de prueba).
- «Término de facturación» y «duración» del código interno forman parte de los
  términos de duración y ciclos de facturación del producto.

## Preguntas pendientes

- Ninguna bloqueante.
