# Especificación: Arquitectura CSP-Tenant

**Rama**: `004-arquitectura-csp-tenant`  
**Creada**: 2026-10-09  
**Estado**: Borrador

## Resumen

Quien presenta la arquitectura necesita explicar con más detalle qué es un
CSP-Tenant, cómo se crea (Nuevo, Existente bajo otro distribuidor, Existente
creado fuera de la plataforma), sus estados, su traslado entre clientes y las
funcionalidades propias de cada proveedor. Se añade un diagrama «CSP-Tenant» a
la navegación; el diagrama «Cliente & CSP-Tenant» se conserva y enlaza a él.
Fuente de las reglas: `prompts/AjusteCsp.md`.

## Escenarios de usuario y pruebas

### Historia de usuario 1 - Entender qué es un CSP-Tenant (Prioridad: P1)

El presentador explica que el CSP (cloud solution provider) y el Tenant forman
un conjunto inseparable: no existe un CSP sin Tenant ni un Tenant sin CSP. El
Tenant es el intermediario entre la distribución de Controles Empresariales y el
proveedor.

**Prueba independiente**: abrir el diagrama «CSP-Tenant» y revisar el nodo
«CSP-Tenant» y sus detalles.

**Escenarios de aceptación**:

1. **Dado** el diagrama, **cuando** se selecciona el nodo «CSP-Tenant»,
   **entonces** se indica que está asociado a un cliente, que tiene relación uno
   a uno entre CSP y Tenant, y que «Controles Empresariales» es el nombre
   (razón social) de la compañía distribuidora.
2. **Dado** el nodo de segmentos, **cuando** se selecciona, **entonces** se
   listan Comercial, Educación, Gobierno y Sin ánimo de lucro, con sus
   subsegmentos: Comercial y Sin ánimo de lucro no tienen; Educación tiene Sin
   ánimo de lucro, Educación superior y Colegios; Gobierno tiene Federal y
   Estatal.
3. **Dado** el nodo de contactos, **cuando** se selecciona, **entonces** se
   indica que cada contacto tiene nombre, correo y teléfono, y que existe un
   contacto principal al que el flujo envía las notificaciones.

---

### Historia de usuario 2 - Formas de creación (Prioridad: P1)

El presentador distingue tres orígenes. «Nuevo» no es un estado, sino el caso en
que el CSP-Tenant no está asociado a otro distribuidor ni fue creado fuera de
Multivendor (el cliente no tiene ninguno o quiere abrir uno más).

**Prueba independiente**: recorrer los tres caminos de creación en el diagrama.

**Escenarios de aceptación**:

1. **Dado** el origen «Nuevo», **cuando** se selecciona, **entonces** se indica
   que lo crea Comercial desde Multivendor, que no requiere traslado y que
   inicia en «Pendiente Creación», donde un servicio Windows registra la
   solicitud y la procesa automáticamente.
2. **Dado** el origen «Existente bajo otro distribuidor», **cuando** se recorre,
   **entonces** se ven en orden: estado «Pendiente Invitación» → notificación al
   cliente por Adobe Sign para migrar del distribuidor actual a Controles
   Empresariales (un webhook escucha la respuesta) → el cliente acepta → el
   webhook detecta la aceptación → estado «Pendiente Validación Invitación».
3. **Dado** el origen «Existente creado fuera de la plataforma», **cuando** se
   selecciona, **entonces** se indica que no requiere solicitud de traslado
   porque ya está bajo el dominio de Controles Empresariales, que queda en
   «Pendiente Aprobación» y que se notifica al área de Operaciones.
4. **Dado** los dos caminos de «Existente», **cuando** llegan a Operaciones,
   **entonces** se ve la validación común: Operaciones ejecuta desde Multivendor
   una consulta para saber si el Tenant está asociado a Controles Empresariales;
   si lo está, el estado pasa a «Activo»; si no, se muestra un error («CSP-Tenant
   no encontrado como relacionado») y el caso se gestiona manualmente.

---

### Historia de usuario 3 - Estados del CSP-Tenant (Prioridad: P1)

**Prueba independiente**: seleccionar cada nodo de estado y verificar su
descripción.

**Escenarios de aceptación**:

1. **Dado** el diagrama, **cuando** se consultan los estados, **entonces** se
   describen: Activo (pasó por creación y activación); Inactivo (inactivado
   manual o automáticamente); Pendiente Creación (inicial para procesos
   totalmente nuevos, mientras un servicio Windows registra y procesa la
   solicitud); Pendiente Invitación (intermedio entre la creación y el envío de
   la solicitud de traslado); Pendiente Validación Invitación (se actualiza
   automáticamente por el webhook al recibir la aceptación del cliente);
   Pendiente Aprobación (existente creado fuera de la plataforma, sin solicitud
   al cliente); Pendiente Aceptación de términos y condiciones (deprecado:
   antes formalizaba el acuerdo cliente–Controles Empresariales).
2. **Dado** el nodo Inactivo, **cuando** se selecciona, **entonces** se explica
   que la inactivación manual la hace solo Operaciones por motivos
   administrativos (p. ej. falta de pago de suscripciones) y la automática
   ocurre cuando el sistema detecta que el CSP-Tenant ya no está bajo el
   dominio de Controles Empresariales (otro distribuidor pudo trasladarlo).

---

### Historia de usuario 4 - Traslado entre clientes (Prioridad: P2)

**Prueba independiente**: seleccionar el nodo de traslado.

**Escenarios de aceptación**:

1. **Dado** el nodo de traslado, **cuando** se selecciona, **entonces** se
   indica que un CSP-Tenant ya creado puede trasladarse a otro cliente solo si
   el cliente destino está Activo, el CSP-Tenant a trasladar está Activo y el
   cliente está dentro de la plataforma Multivendor.

---

### Historia de usuario 5 - Funcionalidades por proveedor y notas (Prioridad: P2)

**Prueba independiente**: seleccionar el nodo de funcionalidades por proveedor.

**Escenarios de aceptación**:

1. **Dado** el nodo, **cuando** se selecciona, **entonces** se explica que, por
   ser el Tenant la relación entre Controles Empresariales y cada proveedor,
   existen funcionalidades propias de cada proveedor que este suministra y que
   es obligatorio integrar; se mencionan, a nivel global, «Compromisos»
   (solo Adobe: nivel del contrato o compromiso de compra a 3 años, 3YC;
   Microsoft no lo tiene) y «Recomendaciones» (solo Adobe: productos más
   viables para comprar), sin más detalle.
2. **Dado** el nodo de notas, **cuando** se selecciona, **entonces** se indica
   que CSP y Tenant son dos entidades con los mismos estados y actualizaciones
   (mejora posible: unificarlas por redundancia) y que campos como Tipo TRM,
   Plazo de pago y Prefactura no tienen un uso importante en Multivendor.

---

### Historia de usuario 6 - Integración con el flujo actual (Prioridad: P2)

**Escenarios de aceptación**:

1. **Dado** el diagrama «Cliente & CSP-Tenant», **cuando** se selecciona el nodo
   de creación o activación del CSP-Tenant, **entonces** se ofrece saltar a
   «CSP-Tenant».
2. **Dado** la Visión general, **cuando** se selecciona el nodo «CSP-Tenant»,
   **entonces** se ofrece saltar a «CSP-Tenant».
3. **Dado** la navegación, **cuando** se muestra, **entonces** «CSP-Tenant»
   aparece como un diagrama más y los existentes se conservan.

## Requisitos funcionales

- **FR-001**: El visor DEBE incluir un diagrama «CSP-Tenant» en la navegación,
  con título, descripción, mensaje clave y puntos destacados en español.
- **FR-002**: El diagrama DEBE definir CSP-Tenant como conjunto inseparable
  (CSP y Tenant), asociado a un cliente y en relación uno a uno con un CSP.
- **FR-003**: El diagrama DEBE representar segmentos, subsegmentos, contactos y
  contacto principal según lo descrito.
- **FR-004**: El diagrama DEBE representar los tres orígenes de creación (Nuevo,
  Existente bajo otro distribuidor, Existente creado fuera de la plataforma)
  aclarando que «Nuevo» no es un estado.
- **FR-005**: El diagrama DEBE representar la invitación por Adobe Sign con
  webhook, la validación por Operaciones y los dos resultados (Activo o error con
  gestión manual).
- **FR-006**: El diagrama DEBE representar los estados: Activo, Inactivo,
  Pendiente Creación, Pendiente Invitación, Pendiente Validación Invitación,
  Pendiente Aprobación y Pendiente Aceptación de términos y condiciones
  (deprecado).
- **FR-007**: El diagrama DEBE indicar quién inactiva (solo Operaciones o
  automáticamente) y las condiciones del traslado entre clientes.
- **FR-008**: El diagrama DEBE describir globalmente las funcionalidades por
  proveedor (Compromisos y Recomendaciones, solo Adobe) y las notas (entidades
  redundantes, campos sin uso importante).
- **FR-009**: Los nodos DEBEN ser seleccionables con teclado y ratón, con
  descripciones accesibles, y seguir el patrón visual de los diagramas
  existentes (recorrido horizontal; caminos alternos y errores en fila inferior).
- **FR-010**: Se DEBEN enlazar «Visión general» y «Cliente & CSP-Tenant» con el
  nuevo diagrama y ajustar los textos existentes que contradigan estas reglas
  (p. ej. el detalle «No se especifican identificadores únicos ni mecanismos de
  integración adicionales»).
- **FR-011**: La constitución DEBE enmendarse a 1.3.0 para registrar las reglas
  de negocio de CSP-Tenant (ya realizado).

## Casos límite

- Pantallas pequeñas: el diagrama debe poder encuadrarse y recorrerse como los demás.
- Si el Tenant no está asociado a Controles Empresariales durante la validación,
  el caso sale del flujo automático y se gestiona manualmente.
- Si el cliente rechaza o no responde la invitación, el CSP-Tenant permanece en
  «Pendiente Invitación» y Comercial hace seguimiento directo con el cliente.
- El paso de «Pendiente Creación» a «Activo» del origen «Nuevo» se indica como
  no especificado.
- Un CSP-Tenant Activo puede pasar a Inactivo si otro distribuidor lo traslada.
- El estado «Pendiente Aceptación de términos y condiciones» se muestra como
  deprecado y no forma parte de ningún flujo vigente.

## Fuera de alcance

- Formularios, CRUD, backend, autenticación y operaciones reales.
- Enviar o simular invitaciones por Adobe Sign, webhooks, consultas de
  asociación, traslados o cambios de estado.
- Detallar «Compromisos» y «Recomendaciones» más allá de su descripción global.
- Modificar los diagramas de Productos, Pedido, Aprovisionamiento y Suscripciones.

## Criterios de éxito

- **SC-001**: Desde la Visión general se llega al diagrama «CSP-Tenant» en dos
  interacciones.
- **SC-002**: Cada regla de `prompts/AjusteCsp.md` es consultable en algún nodo.
- **SC-003**: `npm run lint` y `npm run build` terminan sin errores tras la
  implementación.

## Suposiciones

- Los datos se mantienen estáticos y locales al frontend.
- Se mantiene la regla vigente de que Comercial crea el CSP-Tenant (en los tres
  orígenes) y Operaciones valida, activa e inactiva.
- «Controles Empresariales» es la razón social de la compañía distribuidora.
- La validación de Operaciones es la misma en «Existente bajo otro distribuidor»
  y «Existente creado fuera de la plataforma».

## Preguntas pendientes

- Ninguna bloqueante.

## Aclaraciones

### Sesión 2026-10-09

- P: ¿Existe un estado «Nuevo»? → R: No. El CSP-Tenant nunca tiene estado
  «Nuevo»; es solo el origen en que se crea desde cero, sin traslado entre
  distribuidores ni existencia fuera de Multivendor. Inicia en «Pendiente
  Creación». «Pendiente Aprobación» corresponde al existente creado fuera de la
  plataforma e «Pendiente Invitación» al envío de la notificación al cliente
  para aceptar el traslado entre distribuidores.
- P: ¿Cómo pasa el origen «Nuevo» de «Pendiente Creación» a «Activo»? → R: No
  está documentado; el diagrama lo indica como no especificado (solo se sabe que
  un servicio Windows registra y procesa la solicitud).
- P: En la validación, ¿«el sistema actualiza a Activo» y «Operaciones activa»
  son pasos distintos? → R: Un mismo paso: Operaciones ejecuta la consulta y, si
  el Tenant está asociado, el sistema deja el CSP-Tenant en Activo.
- P: ¿Quién crea el CSP-Tenant y cuándo aplica «Pendiente Aprobación»? → R:
  Comercial crea los tres orígenes (Nuevo y ambos Existentes);
  «Pendiente Aprobación» aplica solo al existente creado fuera de la
  plataforma.
- P: ¿Qué pasa si el cliente rechaza o no responde la invitación de Adobe Sign?
  → R: El estado nunca cambia y permanece en «Pendiente Invitación». Comercial,
  por su comunicación directa con el cliente, lo contacta para saber si rechazó
  o no ha visto la invitación. No hay plazo ni cambio automático de estado.
