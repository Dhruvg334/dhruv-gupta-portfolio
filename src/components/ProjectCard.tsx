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

function GitHubMark({ size = 14 }: { size?: number }) {
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
  const [activeTab, setActiveTab] = useState<'overview' | 'tradeoffs' | 'nodes'>('overview')

  const activeNode: ArchitectureNode = project.nodes[selectedNodeIndex]

  const getNodeTypeBadge = (type: ArchitectureNode['type']) => {
    switch (type) {
      case 'deterministic':
        return <span className="node-badge node-badge--det">DETERMINISTIC</span>
      case 'hybrid':
        return <span className="node-badge node-badge--hybrid">HYBRID GRAPH+VEC</span>
      case 'gate':
        return <span className="node-badge node-badge--gate">SECURITY GATE</span>
      case 'human':
        return <span className="node-badge node-badge--human">HUMAN CHECKPOINT</span>
      case 'model':
        return <span className="node-badge node-badge--model">GOVERNED LLM</span>
    }
  }

  return (
    <article className="project-card" id={`system-${project.id}`}>
      {/* Project Card Header */}
      <div className="card-top">
        <div className="top-id">
          <span className="top-num">{project.number}</span>
          <span className="top-cat">{project.category}</span>
        </div>

        <div className="top-metrics">
          {project.metrics.map((m) => (
            <div key={m.label} className="metric-pill">
              <strong>{m.value}</strong>
              <span>{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Grid */}
      <div className="card-grid">
        {/* Left: Architecture Visualizer Box */}
        <div className="card-visual-wrap">
          <div className={`flow-container flow-container--${project.tone}`}>
            <div className="flow-top">
              <div className="flow-label">
                <Cpu size={13} />
                <span>Execution Pipeline</span>
              </div>
              <span className="flow-count">{project.nodes.length} Stages</span>
            </div>

            {/* 4 Interactive Nodes */}
            <div className="flow-nodes-grid" role="tablist">
              {project.nodes.map((node, index) => {
                const isSelected = selectedNodeIndex === index
                return (
                  <button
                    key={node.step}
                    className={`flow-step-btn ${isSelected ? 'active' : ''}`}
                    onClick={() => setSelectedNodeIndex(index)}
                    role="tab"
                    aria-selected={isSelected}
                    title={`Inspect stage ${node.step}: ${node.name}`}
                  >
                    <span className="step-num">{node.step}</span>
                    <span className="step-title">{node.name}</span>
                  </button>
                )
              })}
            </div>

            {/* Active Stage Inspector */}
            <div className="flow-active-inspector">
              <div className="inspector-topline">
                <div className="inspector-title">
                  <span className="step-tag">STAGE {activeNode.step}</span>
                  <strong>{activeNode.name}</strong>
                </div>
                {getNodeTypeBadge(activeNode.type)}
              </div>
              <p className="inspector-text">{activeNode.description}</p>
              <div className="inspector-contract">
                <span>Contract:</span>
                <code>{activeNode.outputSignature}</code>
              </div>
            </div>

            <div className="flow-bottom">
              <span className="inspect-hint">
                <i className="status-dot" /> Click any stage above to inspect contract
              </span>
              <button
                className="case-study-trigger"
                onClick={() => onOpenModal(project)}
              >
                Deep Specs <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Info, Tabs & Actions */}
        <div className="card-info-wrap">
          <div className="info-title-group">
            <h3 className="project-name">{project.name}</h3>
            <p className="project-tagline">{project.tagline}</p>
          </div>

          {/* Tab Navigation */}
          <div className="info-tabs">
            <button
              className={`info-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`info-tab-btn ${activeTab === 'tradeoffs' ? 'active' : ''}`}
              onClick={() => setActiveTab('tradeoffs')}
            >
              Key Tradeoffs
            </button>
            <button
              className={`info-tab-btn ${activeTab === 'nodes' ? 'active' : ''}`}
              onClick={() => setActiveTab('nodes')}
            >
              Architecture Core
            </button>
          </div>

          {/* Tab Content */}
          <div className="info-tab-pane">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.18 }}
                className="pane-content"
              >
                <p className="summary-text">{project.summary}</p>
                <p className="detail-text">{project.detail}</p>
                <div className="signals-row">
                  {project.signals.map((sig) => (
                    <span key={sig} className="signal-tag">
                      <ShieldCheck size={12} /> {sig}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'tradeoffs' && (
              <motion.div
                key="tradeoffs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.18 }}
                className="pane-content"
              >
                <div className="tradeoffs-stack">
                  {project.tradeoffs.map((t) => (
                    <div key={t.decision} className="tradeoff-box">
                      <span className="decision-label">{t.decision}</span>
                      <strong className="chosen-label">
                        <Sparkles size={12} /> {t.chosenPath}
                      </strong>
                      <p className="rationale-text">{t.rationale}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'nodes' && (
              <motion.div
                key="nodes"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.18 }}
                className="pane-content"
              >
                <p className="arch-core-text">{project.architecturalCore}</p>
                <div className="mini-stages-list">
                  {project.nodes.map((n) => (
                    <div key={n.step} className="mini-stage">
                      <span className="stage-num">{n.step}</span>
                      <div>
                        <strong>{n.name}</strong>
                        <p>{n.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Stack Pills */}
          <div className="stack-wrap">
            <span className="stack-heading">Stack:</span>
            {project.stack.map((t) => (
              <span key={t} className="stack-pill">{t}</span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="actions-row">
            <button
              className="btn btn--primary"
              onClick={() => onOpenModal(project)}
            >
              <Layers size={14} /> Full Case Study
            </button>

            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="btn btn--secondary"
            >
              <GitHubMark size={14} /> GitHub Code
            </a>

            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="btn btn--secondary"
              >
                <ExternalLink size={14} /> Live Demo
              </a>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="btn btn--secondary"
              >
                <Play size={14} /> Video Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
