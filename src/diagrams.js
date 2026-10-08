import { MarkerType } from '@xyflow/react'

export const roles = {
  commercial: { label: 'Comercial', color: '#5376db' },
  management: { label: 'Gerencia', color: '#9570ce' },
  operations: { label: 'Operaciones', color: '#d99832' },
  system: { label: 'Sistema', color: '#24998b' },
  external: { label: 'Externo', color: '#718096' },
}

function node(id, title, subtitle, role, x, y, details, extra = {}) {
  return {
    id, type: 'diagram', position: { x, y },
    ariaLabel: `${title}. ${roles[role].label}. ${subtitle}`,
    data: { title, subtitle, role, details, ...extra },
  }
}

function edge(source, target, label = '', extra = {}) {
  return {
    id: `${source}-${target}`, source, target, label, type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed, color: '#8899ad' },
    style: { stroke: '#8899ad', strokeWidth: 1.5 },
    labelStyle: { fill: '#475569', fontSize: 11, fontWeight: 600 },
    labelBgStyle: { fill: '#f8fafc', fillOpacity: 0.96 },
    labelBgPadding: [7, 5], labelBgBorderRadius: 5,
    ...extra,
  }
}

const priceRules = [
  'Margen de servicios: un porcentaje único por CSP-Tenant, aplicado a todas sus ventas.',
  'Margen de utilidad: porcentaje configurable por producto.',
  'Ambos porcentajes se calculan sobre el costo: precio final = costo + (costo × % servicios / 100) + (costo × % utilidad / 100).',
  'Importes en USD, redondeados a máximo dos decimales. No se incluyen impuestos.',
]

const orderRules = [
  'Un pedido pertenece a un cliente y a un solo proveedor. Nunca mezcla proveedores.',
  'Puede incluir varios CSP-Tenants del mismo cliente y proveedor, todos en estado Activo.',
  'Cada línea/producto está vinculada a exactamente un CSP-Tenant.',
  'El pedido completo contiene solo productos nuevos o solo productos asociados a suscripciones activas; no se pueden mezclar, incluso entre CSP-Tenants.',
  'Nuevo significa que ese CSP-Tenant no tiene una suscripción asociada a ese producto.',
]

export const diagrams = [
  {
    id: 'overview', navTitle: 'Visión general', navSubtitle: 'Componentes y responsabilidades',
    title: 'Una arquitectura, un recorrido completo',
    description: 'Clientes, proveedores y CSP-Tenants conectados por un proceso comercial con controles claros.',
    takeaway: 'Del cliente a la suscripción',
    highlights: [
      'Comercial prepara; Gerencia autoriza excepciones de margen; Operaciones valida la documentación.',
      'Los servicios automáticos actualizan el catálogo y aprovisionan por CSP-Tenant.',
      'Selecciona los componentes para saltar a sus diagramas de detalle.',
    ],
    nodes: [
      node('erp', 'ERP', 'Consulta externa por NIT', 'external', 0, 0, ['Es el origen vigente de los datos del cliente.', 'Sin respuesta válida no se crea el cliente.'], { related: 'lifecycle' }),
      node('legacy', 'Oportunidades', 'Estudio → aprobación → cliente', 'commercial', 0, 210, ['Ruta histórica que se retirará.', 'La oportunidad aprobada puede convertirse en cliente.'], { deprecated: true, related: 'lifecycle' }),
      node('client', 'Cliente', 'Un cliente · múltiples CSP-Tenants', 'system', 350, 90, ['Si ya existe por NIT, se reutiliza: no se crea de nuevo.', 'Puede tener varios CSP-Tenants por proveedor, segmento o fecha de corte.'], { related: 'lifecycle' }),
      node('tenant', 'CSP-Tenant', 'Exclusivo de un cliente y proveedor', 'commercial', 700, 90, ['Comercial lo crea desde el sistema.', 'Debe estar Activo para participar en pedidos.', ...priceRules], { related: 'lifecycle' }),
      node('provider', 'Proveedor', 'Catálogo y mínimos de margen', 'external', 350, 410, ['Distribuidor autorizado de uno o más proveedores.', 'Cada proveedor define mínimos configurables de servicios y utilidad.', 'Productos: licencias, servicios, hardware u otros.']),
      node('catalog', 'Catálogo sincronizado', 'Actualización automática background', 'system', 700, 410, ['Los servicios background incorporan y actualizan los productos del proveedor en la base de datos del sistema.', 'No es una carga manual ni sincronización de suscripciones.']),
      node('order', 'Pedido', 'Un cliente · un proveedor · varios CSP', 'commercial', 1050, 90, orderRules, { related: 'orders' }),
      node('controls', 'Controles del pedido', 'Márgenes → documentos → Operaciones', 'operations', 1400, 90, ['Gerencia aprueba dentro del sistema solo cuando se requiere por márgenes globales inferiores a los mínimos.', 'Operaciones valida documentos, productos, cantidades, costos y precios finales; no aprueba márgenes.'], { related: 'orders' }),
      node('provision', 'Aprovisionamiento', 'Compras separadas por CSP-Tenant', 'system', 1750, 90, ['Comienza desde el estado Por Aplicar.', 'Resultados: Aprovisionado, Error Envio o Aplicado Parcial.'], { related: 'provisioning' }),
      node('subscriptions', 'Suscripciones', 'Consulta y sincronización bajo demanda', 'system', 1050, 410, ['Se sincronizan al entrar al detalle del CSP-Tenant.', 'Cantidades y fechas de inicio y fin son consultables.'], { related: 'subscriptions' }),
      node('contacts', 'Contactos del CSP-Tenant', 'Información de referencia', 'commercial', 1400, 410, ['Pertenecen al CSP-Tenant, no al pedido.', 'No autorizan compras ni participan en aprobaciones.'], { related: 'subscriptions' }),
    ],
    edges: [
      edge('erp', 'client', 'Datos válidos'), edge('legacy', 'client', 'Legado', { style: { stroke: '#8899ad', strokeDasharray: '6 5' } }),
      edge('client', 'tenant', '1 → N'), edge('provider', 'catalog', 'Background'),
      edge('tenant', 'order', 'Activo'), edge('catalog', 'order', 'Productos'),
      edge('order', 'controls', 'Validaciones'), edge('controls', 'provision', 'Por Aplicar'),
      edge('tenant', 'subscriptions', 'Detalle CSP'), edge('tenant', 'contacts', 'Referencia', { sourceHandle: 'bottom', targetHandle: 'top' }),
    ],
  },
  {
    id: 'lifecycle', navTitle: 'Cliente & CSP-Tenant', navSubtitle: 'Origen, exclusividad y activación',
    title: 'Un origen confiable para cada cliente',
    description: 'El ERP valida el registro; Comercial crea los CSP-Tenants que conectan al cliente con cada proveedor.',
    takeaway: 'Sin datos válidos, no hay alta',
    highlights: ['Reutilizar al cliente existente evita duplicados.', 'Un CSP-Tenant no puede compartirse entre clientes ni proveedores.', 'Varios CSP-Tenants pueden responder a segmentos o fechas de corte diferentes.'],
    nodes: [
      node('nit', 'Buscar cliente por NIT', '¿Existe en el sistema?', 'commercial', 0, 0, ['La consulta identifica si el cliente ya está registrado.', 'Si existe, no se vuelve a crear.']),
      node('erp-check', 'Consultar ERP', 'Solo para un cliente no registrado', 'external', 340, 190, ['El ERP trae los datos necesarios para registrar un cliente real.', 'Esta ruta no pasa por oportunidades.']),
      node('blocked', 'Alta bloqueada · error', 'NIT no encontrado o servicio fallido', 'system', 680, 380, ['Si el ERP no encuentra el NIT, se muestra error de cliente inexistente.', 'Si falla el servicio o la respuesta no es válida, se muestra error y no se permite crear el cliente.']),
      node('create', 'Registrar cliente', 'Respuesta correcta del ERP', 'system', 680, 190, ['Se registra exclusivamente con datos válidos del ERP.', 'No se ofrece un alta manual alternativa ante errores del ERP.']),
      node('client', 'Cliente disponible', 'Existente o registrado desde ERP', 'system', 1020, 0, ['El cliente se reutiliza si ya está en el sistema.', 'Un cliente puede tener uno o varios CSP-Tenants de un mismo proveedor.']),
      node('opportunity', 'Oportunidad · estudio', 'Flujo legado deprecado', 'commercial', 340, -220, ['Se crea una oportunidad, se realizan estudios y, si se aprueba, se convierte en cliente.', 'Esta ruta está deprecada y será retirada.'], { deprecated: true }),
      node('convert', 'Convertir en cliente', 'Solo si el estudio es aprobado', 'commercial', 680, -220, ['Conversión histórica de una oportunidad aprobada.', 'No se añaden condiciones ni estados de estudio no confirmados.'], { deprecated: true }),
      node('tenant', 'Crear CSP-Tenant', 'Comercial · desde nuestro sistema', 'commercial', 1360, 0, ['Pertenece exclusivamente a un cliente y un proveedor; no puede pertenecer a dos clientes.', 'Puede diferenciar segmentos: gobierno, educación o comercial; también rangos de facturación y fechas de corte.', 'No se especifican identificadores únicos ni mecanismos de integración adicionales.']),
      node('active', 'CSP-Tenant Activo', 'Condición para utilizarlo en un pedido', 'system', 1700, 0, ['Solo un CSP-Tenant en estado Activo puede usarse en un pedido.', ...priceRules], { related: 'orders' }),
    ],
    edges: [
      edge('nit', 'client', 'Sí · reutilizar'), edge('nit', 'erp-check', 'No'),
      edge('erp-check', 'create', 'Respuesta válida'), edge('erp-check', 'blocked', 'No encontrado / error'),
      edge('create', 'client'), edge('opportunity', 'convert', 'Estudio aprobado', { style: { stroke: '#8899ad', strokeDasharray: '6 5' } }),
      edge('convert', 'client', 'Legado', { style: { stroke: '#8899ad', strokeDasharray: '6 5' } }),
      edge('client', 'tenant', '1 → N'), edge('tenant', 'active', 'Uso en pedidos'),
    ],
  },
  {
    id: 'orders', navTitle: 'Pedido & aprobaciones', navSubtitle: 'Márgenes, documentos y controles',
    title: 'Vender con control, aprobar con criterio',
    description: 'El margen se evalúa sobre todo el pedido. Gerencia resuelve excepciones y Operaciones verifica los soportes.',
    takeaway: 'Dos controles, responsabilidades distintas',
    highlights: ['Solo márgenes globales por debajo de algún mínimo requieren aprobación. La igualdad no la requiere.', 'Documentos faltantes bloquean el avance con un mensaje de error.', 'El rechazo de Gerencia conserva el estado; Devuelto corresponde al retorno de Operaciones.'],
    nodes: [
      node('prepare', 'Alistamiento', 'Comercial prepara y guarda el pedido', 'commercial', 0, 0, [...orderRules, 'Comercial agrega productos, configura márgenes y adjunta los documentos obligatorios.']),
      node('margin', 'Verificación de márgenes', 'Evaluación ponderada / global del pedido', 'system', 350, 0, [...priceRules, 'Se comparan los márgenes globales de servicios y utilidad con los mínimos configurables por proveedor.', 'Si cualquiera queda por debajo, se requiere aprobación de Gerencia. Si ambos igualan o superan los mínimos, no se requiere.', 'La fórmula exacta y los pesos del ponderado global no fueron especificados; este visor no inventa un cálculo ni evalúa líneas individualmente.']),
      node('management', 'Aprobación de Gerencia', 'Excepción de margen dentro del sistema', 'management', 700, 220, ['Gerencia estudia si los márgenes globales son adecuados para el negocio y aprueba dentro del sistema.', 'Operaciones no puede aprobar un pedido con aprobación requerida pendiente o rechazada.']),
      node('adjust', 'Ajustar según observaciones', 'Comercial corrige · conserva el estado', 'commercial', 350, 430, ['Si Gerencia rechaza, el pedido mantiene su estado y Comercial ajusta según sus observaciones.', 'Se vuelve a verificar si el pedido ajustado necesita aprobación.', 'No se crea un estado adicional de rechazo.']),
      node('documents', 'Documentos completos', 'Control antes de ingresar a Operaciones', 'system', 1050, 0, ['Comercial debe adjuntar documentos obligatorios antes de la revisión de Operaciones.', 'Los documentos requeridos son iguales para todos los proveedores; no se inventa una lista de tipos.']),
      node('missing', 'Avance bloqueado · error', 'Faltan documentos obligatorios', 'system', 1050, 430, ['Se muestra un mensaje indicando que no puede continuar porque faltan documentos.', 'Comercial completa los adjuntos antes de intentar avanzar de nuevo.']),
      node('operations', 'Pendiente Validar Operaciones', 'Contrastar pedido y documentos adjuntos', 'operations', 1400, 0, ['Operaciones valida productos, cantidades, costos y precios finales contra los documentos.', 'Todo debe coincidir. Operaciones no crea ni aprueba solicitudes de margen.', 'Solo se llega aquí sin requerir aprobación de margen o con aprobación de Gerencia obtenida.']),
      node('returned', 'Devuelto', 'Operaciones retorna a Comercial', 'operations', 1400, 430, ['Comercial corrige costos, cantidades, productos u otros datos observados.', 'Tras corregir se repiten los controles aplicables de márgenes y documentos.']),
      node('ready', 'Por Aplicar', 'Operaciones validó el pedido', 'system', 1750, 0, ['La aprobación de Operaciones no significa que el pedido esté aprovisionado.', 'Queda disponible para el servicio background de aprovisionamiento.'], { related: 'provisioning' }),
    ],
    edges: [
      edge('prepare', 'margin'), edge('margin', 'management', 'Algún margen < mínimo'),
      edge('margin', 'documents', 'Ambos ≥ mínimos'), edge('management', 'documents', 'Aprobado'),
      edge('management', 'adjust', 'Rechazado', { sourceHandle: 'bottom', targetHandle: 'top' }),
      edge('adjust', 'margin', 'Reevaluar', { sourceHandle: 'bottom', targetHandle: 'top' }),
      edge('documents', 'operations', 'Sí'), edge('documents', 'missing', 'No', { sourceHandle: 'bottom', targetHandle: 'top' }),
      edge('missing', 'documents', 'Completar adjuntos', { sourceHandle: 'bottom', targetHandle: 'top' }),
      edge('operations', 'ready', 'Coincide · aprobado'), edge('operations', 'returned', 'No coincide', { sourceHandle: 'bottom', targetHandle: 'top' }),
      edge('returned', 'prepare', 'Correcciones', { sourceHandle: 'bottom', targetHandle: 'top' }),
    ],
  },
  {
    id: 'provisioning', navTitle: 'Aprovisionamiento', navSubtitle: 'Compras por CSP y resultados',
    title: 'Cada CSP-Tenant, una compra independiente',
    description: 'Un servicio background divide el pedido por CSP-Tenant y consolida los resultados de las compras.',
    takeaway: 'Reintentar sin duplicar lo entregado',
    highlights: ['Las compras siempre corresponden al único proveedor del pedido.', 'Aprovisionado significa que todo se completó correctamente.', 'En Aplicado Parcial solo se ajustan y reintentan los elementos no aprovisionados.'],
    nodes: [
      node('ready', 'Por Aplicar', 'Pedido validado por Operaciones', 'system', 0, 0, ['Punto de entrada del aprovisionamiento automático.', 'Pedido de un único cliente y proveedor, con uno o varios CSP-Tenants.'], { related: 'orders' }),
      node('split', 'Separar por CSP-Tenant', 'Servicio background', 'system', 350, 0, ['Agrupa los productos del pedido según su CSP-Tenant, no según el cliente.', 'Genera las compras correspondientes a cada CSP-Tenant del pedido.']),
      node('purchase', 'Comprar en el proveedor', 'Intento por cada CSP-Tenant', 'external', 700, 0, ['Para el proveedor, el CSP-Tenant identifica al cliente de la compra.', 'Todos los intentos corresponden al mismo proveedor; el pedido nunca mezcla proveedores.']),
      node('result', 'Consolidar resultados', 'Éxito total, fallo total o parcial', 'system', 1050, 0, ['El resultado conjunto determina el estado del pedido.', 'No se considera terminado al aprobar Operaciones ni al iniciar las compras.']),
      node('success', 'Aprovisionado', 'Todos los intentos fueron exitosos', 'system', 1400, -210, ['El pedido se considera terminado en este estado.', 'Los detalles de suscripciones se sincronizan bajo demanda al entrar al CSP-Tenant.'], { related: 'subscriptions' }),
      node('error', 'Error Envio', 'Todos los intentos fallaron', 'system', 1400, 0, ['No hubo compras exitosas.', 'No se especificó una política de reintentos automáticos para fallo total; no se inventa.']),
      node('partial', 'Aplicado Parcial', 'Algunos éxitos y algunos fallos', 'system', 1400, 210, ['Se conservan los elementos que ya fueron aprovisionados.', 'Comercial revisa por qué fallaron los elementos con Error Envio.']),
      node('retry', 'Revisar, ajustar y reintentar', 'Comercial · solo no aprovisionados', 'commercial', 1050, 430, ['Comercial revisa los fallos y ajusta los productos no aprovisionados.', 'Solo esos elementos se envían nuevamente al aprovisionamiento, agrupados por CSP-Tenant.', 'Los elementos ya aprovisionados no se compran de nuevo.', 'El resultado consolidado tiene en cuenta los éxitos anteriores y los nuevos intentos.']),
    ],
    edges: [
      edge('ready', 'split'), edge('split', 'purchase', 'Por CSP'), edge('purchase', 'result', 'Resultados'),
      edge('result', 'success', 'Todos exitosos'), edge('result', 'error', 'Todos fallidos'),
      edge('result', 'partial', 'Éxitos + fallos'),
      edge('partial', 'retry', 'Revisar fallos', { sourceHandle: 'bottom', targetHandle: 'top' }),
      edge('retry', 'split', 'Solo pendientes', { sourceHandle: 'bottom', targetHandle: 'top' }),
    ],
  },
  {
    id: 'subscriptions', navTitle: 'Suscripciones', navSubtitle: 'Consulta bajo demanda y contactos',
    title: 'El detalle actualizado, cuando lo necesitas',
    description: 'Entrar al detalle del CSP-Tenant dispara la sincronización de suscripciones. Los contactos son informativos.',
    takeaway: 'Consulta local, datos del proveedor',
    highlights: ['La sincronización es bajo demanda, no una tarea periódica del catálogo.', 'El detalle incluye cantidades, fechas de inicio y fin.', 'Los contactos pertenecen al CSP-Tenant y no intervienen en las aprobaciones.'],
    nodes: [
      node('client', 'Cliente', 'Seleccionar su CSP-Tenant', 'commercial', 0, 0, ['Un cliente puede tener varios CSP-Tenants de un mismo proveedor.', 'Cada CSP-Tenant es exclusivo de ese cliente y proveedor.'], { related: 'lifecycle' }),
      node('detail', 'Entrar al detalle del CSP', 'Disparador de sincronización bajo demanda', 'system', 350, 0, ['Al entrar a este detalle se sincronizan las suscripciones.', 'El visor representa este proceso: no ejecuta consultas reales a proveedores.']),
      node('provider', 'Consultar proveedor', 'Suscripciones del CSP-Tenant', 'external', 700, 0, ['Se solicitan los detalles asociados a ese CSP-Tenant.', 'No se afirma que haya una sincronización periódica adicional.']),
      node('sync', 'Sincronizar suscripciones', 'Actualizar información para consulta', 'system', 1050, 0, ['Actualiza el detalle al ingresar al CSP-Tenant.', 'La sincronización de suscripciones es distinta de la actualización automática del catálogo.']),
      node('subscriptions', 'Consultar detalle', 'Cantidades · fecha de inicio · fecha de fin', 'commercial', 1400, 0, ['Permite consultar suscripciones y sus detalles.', 'Los pedidos sobre suscripciones activas pueden modificar cantidades o cancelar, entre otras operaciones mencionadas.', 'No se definen aquí operaciones adicionales ni políticas para suscripciones vencidas o suspendidas.']),
      node('contacts', 'Contactos del CSP-Tenant', 'Datos de referencia ante dudas', 'commercial', 700, 260, ['Son contactos del CSP-Tenant, no del pedido ni compartidos entre clientes.', 'Son informativos y no autorizan compras, márgenes o aprovisionamientos.']),
      node('order', 'Pedido sobre suscripciones', 'Sin mezclar con productos nuevos', 'commercial', 1400, 260, orderRules, { related: 'orders' }),
    ],
    edges: [
      edge('client', 'detail'), edge('detail', 'provider', 'Al ingresar'), edge('provider', 'sync', 'Datos'),
      edge('sync', 'subscriptions'), edge('detail', 'contacts', 'Información', { sourceHandle: 'bottom', targetHandle: 'top' }),
      edge('subscriptions', 'order', 'Flujo relacionado', { sourceHandle: 'bottom', targetHandle: 'top' }),
    ],
  },
]
