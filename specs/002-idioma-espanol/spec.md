# Especificación: Interacción de Copilot y Spec Kit en español

**Rama**: `002-idioma-espanol`  
**Creada**: 2026-10-08  
**Estado**: Borrador

## Resumen

Quien trabaja en este proyecto necesita que toda interacción con Copilot (CLI y
chat) y con los flujos de Spec Kit ocurra en español: preguntas, respuestas,
explicaciones, resúmenes y artefactos generados. La regla debe estar escrita en
los lugares que Copilot y otros modelos leen de forma automática, de modo que
se cumpla sin tener que pedirlo en cada sesión.

## Escenarios de usuario y pruebas

### Historia de usuario 1 - Respuestas y preguntas en español (Prioridad: P1)

Al conversar con Copilot en el CLI o en el chat dentro de este proyecto, todo
mensaje recibido está en español, incluidas las preguntas de aclaración.

**Prueba independiente**: Iniciar una sesión nueva, formular una pregunta en
inglés y comprobar que la respuesta y cualquier pregunta de aclaración llegan
en español.

**Escenarios de aceptación**:

1. **Dado** una sesión nueva sin instrucciones adicionales, **cuando** se hace una consulta en inglés, **entonces** la respuesta está en español.
2. **Dado** una tarea ambigua, **cuando** Copilot necesita aclaración, **entonces** formula la pregunta en español.

### Historia de usuario 2 - Flujos de Spec Kit en español (Prioridad: P1)

Al ejecutar cualquier comando de Spec Kit (especificar, aclarar, planificar,
tareas, implementar, analizar, etc.), los artefactos y los mensajes de
progreso están en español.

**Prueba independiente**: Ejecutar un comando de Spec Kit y revisar que los
documentos generados y los mensajes al usuario estén en español.

**Escenarios de aceptación**:

1. **Dado** un comando de Spec Kit, **cuando** se completa, **entonces** el documento generado y el resumen final están en español.
2. **Dado** que el código y los identificadores técnicos requieren nombres en inglés, **cuando** se mencionan, **entonces** se conservan tal cual y la explicación que los rodea está en español.

### Historia de usuario 3 - Regla visible para cualquier modelo (Prioridad: P2)

Cualquier modelo o agente que lea las instrucciones del proyecto encuentra la
regla de idioma de forma explícita y con carácter obligatorio.

**Prueba independiente**: Revisar la constitución y las instrucciones de
Copilot y confirmar que ambas establecen el español como idioma obligatorio.

**Escenarios de aceptación**:

1. **Dado** la constitución del proyecto, **cuando** se consulta, **entonces** contiene un principio de idioma que cubre conversación, preguntas y artefactos.
2. **Dado** las instrucciones de Copilot del proyecto, **cuando** se consultan, **entonces** indican responder y preguntar siempre en español.

## Requisitos funcionales

- **FR-001**: Copilot DEBE responder en español en el CLI y en el chat del proyecto.
- **FR-002**: Copilot DEBE formular preguntas de aclaración y opciones en español.
- **FR-003**: Los flujos de Spec Kit DEBEN producir mensajes y documentos en español.
- **FR-004**: La constitución DEBE declarar el español como idioma obligatorio de conversación, preguntas y artefactos, ampliando el principio VII actual (solo archivos markdown).
- **FR-005**: Las instrucciones de Copilot del proyecto DEBEN repetir la regla de idioma.
- **FR-006**: Código, identificadores, comandos y mensajes técnicos literales PUEDEN mantenerse en su idioma original; su explicación DEBE estar en español.
- **FR-007**: La regla DEBE aplicarse con independencia del idioma en que se escriba la solicitud.
- **FR-008**: Copilot PUEDE usar otro idioma únicamente cuando el usuario lo pida de forma explícita, y solo durante esa sesión; en una sesión nueva vuelve a español.

## Casos límite

- Solicitud escrita en inglés u otro idioma: la respuesta sigue siendo en español.
- Salida literal de herramientas (errores de compilación, lint): se cita sin traducir y se explica en español.
- Petición explícita de otro idioma en una sesión concreta: se atiende solo en esa sesión (FR-008).

## Fuera de alcance

- Formularios, CRUD, backend, autenticación y operaciones reales.
- Cambios en el código o la interfaz de la aplicación visor.
- Traducir contenido existente de la aplicación o los diagramas.
- Modificar el Spec Kit de la raíz del repositorio (pertenece a ContosoDashboard).
- Garantizar el comportamiento de modelos que ignoren las instrucciones del proyecto.

## Criterios de éxito

- **SC-001**: En 10 sesiones nuevas con solicitudes en inglés, 100 % de las respuestas y preguntas llegan en español.
- **SC-002**: Todos los comandos de Spec Kit generan documentos en español sin indicarlo en la solicitud.
- **SC-003**: La regla aparece de forma explícita en la constitución y en las instrucciones de Copilot.

## Suposiciones

- Los datos se mantienen estáticos y locales al frontend; esta funcionalidad no afecta a la aplicación.
- Las instrucciones del proyecto (`.github/copilot-instructions.md`) y la constitución son leídas por Copilot y por otros modelos.
- Los cambios en constitución e instrucciones no requieren nuevas dependencias ni servicios.

## Aclaraciones

### Sesión 2026-10-08

- P: ¿Se permite pedir otro idioma de forma puntual? → R: Sí, solo si el usuario lo pide explícitamente y únicamente durante esa sesión.

## Preguntas pendientes

- Ninguna.
