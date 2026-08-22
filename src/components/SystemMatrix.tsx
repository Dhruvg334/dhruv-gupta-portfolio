import { useState } from 'react'
import { motion } from 'motion/react'
import {
  Layers,
  CheckCircle2,
  Cpu,
  Shield,
  Database,
  Terminal,
  Activity,
  GitBranch,
} from 'lucide-react'
import { systemArchitectureLayers } from '../data/competencies'

export function SystemMatrix() {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number | null>(null)

  const getLayerIcon = (idx: number) => {
    switch (idx % 6) {
      case 0:
        return <Terminal size={16} />
      case 1:
        return <GitBranch size={16} />
      case 2:
        return <Cpu size={16} />
      case 3:
        return <Database size={16} />
      case 4:
        return <Shield size={16} />
      default:
        return <Activity size={16} />
    }
  }

  return (
    <section className="section architecture-matrix-section" id="architecture">
      <div className="shell">
        <div className="section-heading">
          <p className="section-label">12-Layer System Architecture</p>
          <div>
            <h2>Production AI is software with models embedded.</h2>
            <p>
              Rather than building thin LLM wrappers, my systems are structured across 12 production layers that decouple deterministic constraints, hybrid retrieval, security gates, and evaluation from raw model inference.
            </p>
          </div>
        </div>

        <div className="matrix-grid">
          {systemArchitectureLayers.map((layer, idx) => {
            const isExpanded = selectedLayerIndex === idx
            return (
              <motion.article
                key={layer.number}
                className={`matrix-card ${isExpanded ? 'matrix-card--expanded' : ''}`}
                onClick={() => setSelectedLayerIndex(isExpanded ? null : idx)}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.18 }}
              >
                <div className="matrix-card-head">
                  <div className="matrix-num-icon">
                    <span className="matrix-number">{layer.number}</span>
                    <div className="matrix-icon">{getLayerIcon(idx)}</div>
                  </div>
                  <span className="matrix-tag">{layer.tag}</span>
                </div>

                <h3 className="matrix-title">{layer.name}</h3>
                <p className="matrix-desc">{layer.description}</p>

                <div className="matrix-impl-box">
                  <span className="matrix-impl-label">Implementation:</span>
                  <p className="matrix-impl-text">{layer.implementationExample}</p>
                </div>

                <div className="matrix-projects-row">
                  <span className="matrix-applied-label">Applied in:</span>
                  <div className="matrix-applied-pills">
                    {layer.keyProjects.map((proj) => (
                      <span key={proj} className="applied-pill">
                        <CheckCircle2 size={11} /> {proj}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        <div className="matrix-handbook-banner">
          <div className="handbook-banner-left">
            <Layers size={20} />
            <div>
              <strong>Adheres to Universal Agentic AI Engineering Standards</strong>
              <p>
                Every project enforces strict separation of deterministic validation from generative completions, full cryptographic source provenance, and database-level multi-tenant isolation.
              </p>
            </div>
          </div>
          <a href="#work" className="button button--light">
            Inspect Applied Flagship Systems
          </a>
        </div>
      </div>
    </section>
  )
}
