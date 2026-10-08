import { useState } from 'react'
import {
  Background, Controls, Handle, MiniMap, Position,
  ReactFlow, ReactFlowProvider, useReactFlow,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { diagrams, roles } from './diagrams.js'
import './App.css'

function DiagramNode({ data, selected }) {
  return (
    <div className={`diagram-node role-${data.role}${data.deprecated ? ' deprecated' : ''}${selected ? ' is-selected' : ''}`}>
      <Handle type="target" position={Position.Left} />
      <Handle type="target" position={Position.Top} id="top" />
      <span className="node-role">{roles[data.role].label}{data.deprecated ? ' · Deprecado' : ''}</span>
      <strong>{data.title}</strong>
      <span className="node-subtitle">{data.subtitle}</span>
      <Handle type="source" position={Position.Right} />
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </div>
  )
}

const nodeTypes = { diagram: DiagramNode }
const flowLabels = {
  'node.a11yDescription.default': 'Selecciona un nodo con Enter para consultar sus detalles.',
  'controls.zoomIn.ariaLabel': 'Acercar',
  'controls.zoomOut.ariaLabel': 'Alejar',
  'controls.fitView.ariaLabel': 'Ajustar diagrama',
  'minimap.ariaLabel': 'Mapa del diagrama',
}

function DiagramCanvas({ diagram, selectedId, onSelect }) {
  const { fitView, setCenter } = useReactFlow()
  const nodes = diagram.nodes.map((node) => ({ ...node, selected: node.id === selectedId }))

  function handleNodesChange(changes) {
    const selection = changes.find((change) => change.type === 'select' && change.selected)
    if (selection) {
      onSelect(selection.id)
      const node = diagram.nodes.find((item) => item.id === selection.id)
      setCenter(node.position.x + 123, node.position.y + 65, { zoom: 1, duration: 350 })
    } else if (changes.some((change) => change.type === 'select' && change.id === selectedId && !change.selected)) {
      onSelect(null)
    }
  }

  return (
    <section className="canvas" aria-label={`Diagrama: ${diagram.title}`}>
      <div className="canvas-caption"><span className="live-dot" /> DIAGRAMA INTERACTIVO <span>Selecciona un nodo para explorar</span></div>
      <ReactFlow
        nodes={nodes}
        edges={diagram.edges}
        nodeTypes={nodeTypes}
        onNodesChange={handleNodesChange}
        onPaneClick={() => onSelect(null)}
        fitView
        fitViewOptions={{ padding: 0.18, maxZoom: 1 }}
        minZoom={0.25}
        maxZoom={1.8}
        nodesDraggable={false}
        nodesConnectable={false}
        edgesFocusable={false}
        deleteKeyCode={null}
        elementsSelectable
        ariaLabelConfig={flowLabels}
        proOptions={{ hideAttribution: false }}
      >
        <Background color="#cbd5e1" gap={24} size={1} />
        <Controls showInteractive={false} />
        <MiniMap nodeColor={(node) => roles[node.data.role].color} pannable zoomable />
      </ReactFlow>
      <button className="fit-button" onClick={() => fitView({ padding: 0.18, maxZoom: 1, duration: 350 })}>↗ Ajustar vista</button>
    </section>
  )
}

export default function App() {
  const [activeId, setActiveId] = useState(diagrams[0].id)
  const [selectedId, setSelectedId] = useState(null)
  const [presentation, setPresentation] = useState(false)
  const diagram = diagrams.find((item) => item.id === activeId)
  const selected = diagram.nodes.find((node) => node.id === selectedId)?.data
  const activeIndex = diagrams.indexOf(diagram)

  function navigate(id) {
    setActiveId(id)
    setSelectedId(null)
  }

  return (
    <div className={`app-shell${presentation ? ' presentation' : ''}`}>
      <aside className="sidebar">
        <a className="brand" href="#overview" onClick={(event) => { event.preventDefault(); navigate('overview') }}>
          <span className="brand-mark">◈</span><span>CSP <b>Atlas</b><small>ARQUITECTURA & NEGOCIO</small></span>
        </a>
        <div className="sidebar-heading">MAPA DEL SISTEMA</div>
        <nav aria-label="Vistas de diagramas">
          {diagrams.map((item, index) => (
            <button key={item.id} className={`nav-item${activeId === item.id ? ' active' : ''}`} aria-current={activeId === item.id ? 'page' : undefined} onClick={() => navigate(item.id)}>
              <span className="nav-number">0{index + 1}</span><span>{item.navTitle}<small>{item.navSubtitle}</small></span>
              <span className="nav-arrow">›</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-note"><span>◎</span><strong>Una visión compartida</strong><p>Del origen del cliente a la entrega. Procesos, controles y responsabilidades en un solo mapa.</p></div>
        <div className="local-badge"><span className="live-dot" /> DEMO LOCAL · SIN BACKEND</div>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <span className="breadcrumb">Sistema de distribución <span>/</span> <b>{diagram.navTitle}</b></span>
          <button className="presentation-button" aria-pressed={presentation} onClick={() => setPresentation(!presentation)}>
            {presentation ? '↙ Salir de presentación' : '⛶ Modo presentación'}
          </button>
        </header>
        <section className="view-heading" aria-labelledby="view-title">
          <div><div className="eyebrow">VISTA 0{activeIndex + 1} / 05 <span>EXPLORACIÓN DE ARQUITECTURA</span></div><h1 id="view-title">{diagram.title}</h1><p>{diagram.description}</p></div>
          <div className="view-pagination">
            <button aria-label="Diagrama anterior" disabled={activeIndex === 0} onClick={() => navigate(diagrams[activeIndex - 1].id)}>←</button>
            <button aria-label="Diagrama siguiente" disabled={activeIndex === diagrams.length - 1} onClick={() => navigate(diagrams[activeIndex + 1].id)}>→</button>
          </div>
        </section>
        <div className="diagram-layout">
          <ReactFlowProvider key={activeId}>
            <DiagramCanvas diagram={diagram} selectedId={selectedId} onSelect={setSelectedId} />
          </ReactFlowProvider>
          <aside className="details-panel" aria-label="Detalles del diagrama" aria-live="polite">
            <div className="panel-eyebrow">{selected ? 'NODO SELECCIONADO' : 'CLAVES DE ESTA VISTA'}</div>
            {selected ? (
              <>
                <span className={`role-badge role-${selected.role}`}>{roles[selected.role].label}</span>
                <h2>{selected.title}</h2>
                {selected.deprecated && <div className="warning">Flujo legado deprecado. Se mantiene como referencia; será retirado.</div>}
                <p className="detail-summary">{selected.subtitle}</p>
                <ul className="detail-list">{selected.details.map((text) => <li key={text}>{text}</li>)}</ul>
                {selected.related && <button className="related-button" onClick={() => navigate(selected.related)}>Explorar {diagrams.find((item) => item.id === selected.related).navTitle.toLowerCase()} →</button>}
                <button className="clear-button" onClick={() => setSelectedId(null)}>Volver al resumen</button>
              </>
            ) : (
              <>
                <h2>{diagram.takeaway}</h2>
                <ul className="detail-list">{diagram.highlights.map((text) => <li key={text}>{text}</li>)}</ul>
                <div className="explore-hint">↖ <span>Selecciona cualquier nodo para conocer sus reglas y conexiones.</span></div>
              </>
            )}
            <div className="panel-footer"><span>↔</span> Arrastra el lienzo para desplazarte.<br />Usa los controles o la rueda para acercar.</div>
          </aside>
        </div>
        <footer className="legend" aria-label="Leyenda de responsabilidades">
          <strong>RESPONSABILIDADES</strong>
          {Object.entries(roles).map(([key, role]) => <span key={key}><i style={{ backgroundColor: role.color }} />{role.label}</span>)}
          <span className="legacy-key"><i />Legado / deprecado</span>
          <small>USD · máximo 2 decimales · sin impuestos</small>
        </footer>
      </main>
    </div>
  )
}
