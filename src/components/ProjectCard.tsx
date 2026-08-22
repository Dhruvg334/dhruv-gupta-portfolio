import { useState } from 'react'
import { motion } from 'motion/react'
import {
  ExternalLink,
  Play,
  ShieldCheck,
  Cpu,
  Layers,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { Project, ArchitectureNode } from '../types'

function GitHubMark({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 .7a11.3 11.3 0 0 0-3.57 22.02c.57.1.78-.24.78-.55v-2.16c-3.18.69-3.85-1.35-3.85-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.54-.29-5.21-1.27-5.21-5.59 0-1.24.44-2.24 1.17-3.03-.12-.29-.51-1.45.11-2.99 0 0 .96-.31 3.12 1.16A10.9 10.9 0 0 1 12 6.06c.96 0 1.93.13 2.84.38 2.16-1.47 3.11-1.16 3.11-1.16.63 1.54.24 2.7.12 2.99.73.79 1.17 1.79 1.17 3.03 0 4.33-2.68 5.29-5.23 5.58.41.36.78 1.06.78 2.14v3.16c0 .31.2.66.79.55A11.3 11.3 0 0 0 12 .7Z" />
    </svg>
  )
}

interface ProjectCardProps {
  project: Project
  onOpenModal: (project: Project) => void
}

export function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<'overview' | 'nodes' | 'tradeoffs'>('overview')

  const activeNode: ArchitectureNode = project.nodes[selectedNodeIndex]

  const getNodeTypeBadge = (type: ArchitectureNode['type']) => {
    switch (type) {
      case 'deterministic':
        return <span className="node-type-pill node-type--det">DETERMINISTIC</span>
      case 'hybrid':
        return <span className="node-type-pill node-type--hybrid">HYBRID GRAPH+VEC</span>
      case 'gate':
        return <span className="node-type-pill node-type--gate">SECURITY GATE</span>
      case 'human':
        return <span className="node-type-pill node-type--human">HUMAN-IN-THE-LOOP</span>
      case 'model':
        return <span className="node-type-pill node-type--model">GOVERNED LLM</span>
    }
  }

  return (
    <article className="project-card" id={`system-${project.id}`}>
      {/* Project Card Header */}
      <div className="project-card-header">
        <div className="project-id-badge">
          <span className="project-num">{project.number}</span>
          <span className="project-cat">{project.category}</span>
        </div>

        <div className="project-header-metrics">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="header-metric-item">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="project-card-body">
        {/* Left Column: Interactive System Architecture Visualizer */}
        <div className="project-visual-column">
          <div className={`system-flow-box system-visual--${project.tone}`}>
            <div className="flow-box-top">
              <div className="flow-badge">
                <Cpu size={13} />
                <span>Architecture Pipeline Flow</span>
              </div>
              <span className="node-count">{project.nodes.length} Governed Stages</span>
            </div>

            {/* Interactive Node Path */}
            <div className="interactive-node-flow" role="tablist" aria-label="System architecture pipeline stages">
              {project.nodes.map((node, index) => {
                const isSelected = selectedNodeIndex === index
                return (
                  <div key={node.step} className="flow-node-wrapper">
                    <button
                      className={`flow-node-btn ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedNodeIndex(index)}
                      role="tab"
                      aria-selected={isSelected}
                      title={`Inspect stage ${node.step}: ${node.name}`}
                    >
                      <div className="flow-node-num">{node.step}</div>
                      <div className="flow-node-label">{node.name}</div>
                      <div className="flow-node-indicator" />
                    </button>
                    {index < project.nodes.length - 1 && (
                      <div className="flow-node-arrow" aria-hidden="true">
                        <i />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Active Node Detail Card */}
            <div className="active-node-inspector">
              <div className="inspector-head">
                <div className="inspector-head-title">
                  <span className="inspector-step">STAGE {activeNode.step}</span>
                  <strong>{activeNode.name}</strong>
                </div>
                {getNodeTypeBadge(activeNode.type)}
              </div>
              <p className="inspector-desc">{activeNode.description}</p>
              <div className="inspector-signature">
                <span>Output Signature:</span>
                <code>{activeNode.outputSignature}</code>
              </div>
            </div>

            <div className="flow-box-footer">
              <span className="provenance-status">
                <i className="status-dot" /> Click any stage to inspect execution boundary
              </span>
              <button
                className="expand-architecture-btn"
                onClick={() => onOpenModal(project)}
              >
                Deep Dive Case Study <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Project Context, Tabs, and Actions */}
        <div className="project-info-column">
          <div className="project-title-area">
            <h3 className="project-title">{project.name}</h3>
            <p className="project-tagline">{project.tagline}</p>
          </div>

          {/* Quick Tab Switcher */}
          <div className="project-tabs-nav">
            <button
              className={`project-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              System Overview
            </button>
            <button
              className={`project-tab-btn ${activeTab === 'nodes' ? 'active' : ''}`}
              onClick={() => setActiveTab('nodes')}
            >
              Pipeline Logic
            </button>
            <button
              className={`project-tab-btn ${activeTab === 'tradeoffs' ? 'active' : ''}`}
              onClick={() => setActiveTab('tradeoffs')}
            >
              Engineering Tradeoffs
            </button>
          </div>

          <div className="project-tab-content">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="tab-pane"
              >
                <p className="project-summary">{project.summary}</p>
                <p className="project-detail">{project.detail}</p>

                <div className="signal-row">
                  {project.signals.map((signal) => (
                    <span key={signal} className="signal-pill">
                      <ShieldCheck size={13} /> {signal}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'nodes' && (
              <motion.div
                key="nodes"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="tab-pane"
              >
                <p className="tab-pane-intro">{project.architecturalCore}</p>
                <div className="tab-nodes-mini-list">
                  {project.nodes.map((node) => (
                    <div key={node.step} className="mini-node-item">
                      <span className="mini-node-idx">{node.step}</span>
                      <div>
                        <strong>{node.name}</strong>
                        <p>{node.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'tradeoffs' && (
              <motion.div
                key="tradeoffs"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="tab-pane"
              >
                <div className="tradeoffs-list">
                  {project.tradeoffs.map((tradeoff) => (
                    <div key={tradeoff.decision} className="tradeoff-card">
                      <span className="tradeoff-decision">{tradeoff.decision}</span>
                      <strong className="tradeoff-choice">
                        <Sparkles size={12} /> {tradeoff.chosenPath}
                      </strong>
                      <p className="tradeoff-why">{tradeoff.rationale}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Tech Stack */}
          <div className="stack-row">
            <span className="stack-label">Stack:</span>
            {project.stack.map((tech) => (
              <span key={tech} className="stack-tag">
                {tech}
              </span>
            ))}
          </div>

          {/* Project Links & Actions */}
          <div className="project-actions-row">
            <button
              className="action-btn action-btn--primary"
              onClick={() => onOpenModal(project)}
            >
              <Layers size={15} /> Case Study & Specs
            </button>

            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="action-btn action-btn--secondary"
            >
              <GitHubMark size={15} /> Repository
            </a>

            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="action-btn action-btn--secondary"
              >
                <ExternalLink size={15} /> Live App
              </a>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="action-btn action-btn--secondary"
              >
                <Play size={15} /> Video Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
