import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  X,
  ExternalLink,
  Play,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
  GitBranch,
} from 'lucide-react'
import { Project } from '../types'

function GitHubMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 .7a11.3 11.3 0 0 0-3.57 22.02c.57.1.78-.24.78-.55v-2.16c-3.18.69-3.85-1.35-3.85-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.54-.29-5.21-1.27-5.21-5.59 0-1.24.44-2.24 1.17-3.03-.12-.29-.51-1.45.11-2.99 0 0 .96-.31 3.12 1.16A10.9 10.9 0 0 1 12 6.06c.96 0 1.93.13 2.84.38 2.16-1.47 3.11-1.16 3.11-1.16.63 1.54.24 2.7.12 2.99.73.79 1.17 1.79 1.17 3.03 0 4.33-2.68 5.29-5.23 5.58.41.36.78 1.06.78 2.14v3.16c0 .31.2.66.79.55A11.3 11.3 0 0 0 12 .7Z" />
    </svg>
  )
}

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return
    document.body.classList.add('modal-open')
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', handleKey)
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          className="project-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Modal Header Bar */}
          <div className="project-modal-header">
            <div className="modal-header-tag">
              <span className="modal-project-num">{project.number}</span>
              <span>{project.category}</span>
            </div>
            <button
              className="modal-close-button"
              onClick={onClose}
              aria-label="Close case study modal"
            >
              <X size={20} />
            </button>
          </div>

          <div className="project-modal-content">
            {/* Hero / Intro Banner */}
            <div className="modal-hero-strip">
              <h2 id="modal-project-title">{project.name}</h2>
              <p className="modal-tagline">{project.tagline}</p>

              <div className="modal-metrics-grid">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="modal-metric-card">
                    <div className="modal-metric-val">{metric.value}</div>
                    <div className="modal-metric-lbl">{metric.label}</div>
                    <div className="modal-metric-ctx">{metric.context}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Architectural Deep Dive Grid */}
            <div className="modal-body-sections">
              {/* Architecture Core Breakdown */}
              <section className="modal-section">
                <div className="modal-section-title">
                  <Cpu size={18} />
                  <h3>Architectural Pipeline & Deterministic Boundary</h3>
                </div>
                <p className="modal-section-text">{project.architecturalCore}</p>

                <div className="modal-pipeline-flow">
                  {project.nodes.map((node, idx) => (
                    <div key={node.step} className="modal-pipeline-node">
                      <div className="pipeline-node-top">
                        <span className="pipeline-node-step">{node.step}</span>
                        <h4>{node.name}</h4>
                        <span className="pipeline-node-badge">{node.type.toUpperCase()}</span>
                      </div>
                      <p>{node.description}</p>
                      <div className="pipeline-node-out">
                        <span>Output Contract:</span>
                        <code>{node.outputSignature}</code>
                      </div>
                      {idx < project.nodes.length - 1 && (
                        <div className="pipeline-node-connector">
                          <ArrowRight size={14} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Engineering Tradeoffs */}
              <section className="modal-section">
                <div className="modal-section-title">
                  <GitBranch size={18} />
                  <h3>Key Engineering Decisions & Tradeoffs</h3>
                </div>
                <div className="modal-tradeoffs-grid">
                  {project.tradeoffs.map((item) => (
                    <div key={item.decision} className="modal-tradeoff-item">
                      <h4>{item.decision}</h4>
                      <div className="chosen-path-badge">
                        <CheckCircle2 size={14} /> Chosen: {item.chosenPath}
                      </div>
                      <p>{item.rationale}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Stack & Governance Signals */}
              <section className="modal-section">
                <div className="modal-section-title">
                  <Layers size={18} />
                  <h3>Stack & Governance Signals</h3>
                </div>
                <div className="modal-signals-wrap">
                  {project.signals.map((sig) => (
                    <span key={sig} className="modal-signal-tag">
                      <ShieldCheck size={14} /> {sig}
                    </span>
                  ))}
                </div>
                <div className="modal-tech-stack-wrap">
                  {project.stack.map((tech) => (
                    <span key={tech} className="modal-tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {/* Modal Footer Actions */}
            <div className="modal-footer-actions">
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="button button--dark"
              >
                <GitHubMark size={16} /> View Code on GitHub
              </a>

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="button button--light"
                >
                  <ExternalLink size={16} /> Open Live Deployment
                </a>
              )}

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="button button--ghost"
                >
                  <Play size={16} /> Watch Demo Video
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
