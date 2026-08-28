import { useMemo } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Play,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  GitBranch,
  BookOpen,
  FileText,
  Activity,
} from 'lucide-react'
import { projects } from '../data/projects'
import { MermaidDiagram } from '../components/MermaidDiagram'
import { ReadingProgressBar } from '../components/ReadingProgressBar'
import { CardSpotlight } from '../components/motion/CardSpotlight'
import { GitHubMark } from '../components/SocialIcons'

const sectionAnchors = [
  { id: 'section-problem', label: '1. Problem & Context', icon: BookOpen },
  { id: 'section-architecture', label: '2. Architecture Topology', icon: Cpu },
  { id: 'section-pipeline', label: '3. Execution & Contracts', icon: Activity },
  { id: 'section-guardrails', label: '4. Governance & Safety', icon: ShieldCheck },
  { id: 'section-benchmarks', label: '5. Testing & Benchmarks', icon: FileText },
  { id: 'section-tradeoffs', label: '6. Architectural Tradeoffs', icon: GitBranch },
]

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const reduceMotion = useReducedMotion()

  const projectIndex = useMemo(() => {
    return projects.findIndex((p) => p.id === id)
  }, [id])

  if (projectIndex === -1) {
    return <Navigate to="/projects" replace />
  }

  const project = projects[projectIndex]
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-20px' },
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
      }

  return (
    <div className="page-wrapper project-detail-page">
      {/* Dynamic Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Top Breadcrumbs Bar */}
      <div className="detail-top-bar">
        <div className="shell detail-top-bar__inner">
          <Link to="/projects" className="back-link">
            <ArrowLeft size={16} /> Back to Systems Directory
          </Link>
          <div className="project-index-pill">
            Project {project.number} of 06
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <header className="detail-hero-section">
        <div className="shell">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="detail-header-meta">
              <span className="meta-number">{project.number}</span>
              <span className="meta-category">{project.category}</span>
            </div>

            <h1 className="detail-title">{project.name}</h1>
            <p className="detail-tagline">{project.tagline}</p>

            {/* Quick Metrics Bar */}
            <div className="detail-metrics-grid">
              {project.metrics.map((m) => (
                <CardSpotlight key={m.label} className="detail-metric-card">
                  <span className="metric-val">{m.value}</span>
                  <strong className="metric-lbl">{m.label}</strong>
                  <span className="metric-ctx">{m.context}</span>
                </CardSpotlight>
              ))}
            </div>

            {/* Direct Action Links */}
            <div className="detail-actions-row">
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                <GitHubMark size={16} /> View Code on GitHub
              </a>

              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn--secondary">
                  <ExternalLink size={16} /> Open Live Product
                </a>
              )}

              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                  <Play size={16} /> Watch Demo Video
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Case Study Content Container */}
      <main className="section detail-content-section">
        <div className="shell detail-layout-grid">
          {/* Main Article Sections */}
          <div className="detail-main-article">
            {/* 1. Problem Statement */}
            <motion.section id="section-problem" className="detail-block" {...reveal}>
              <div className="block-header">
                <span className="block-number">01</span>
                <h2>Problem & Business Context</h2>
              </div>
              <div className="prose-block">
                <p>{project.caseStudy.problemStatement}</p>
              </div>
            </motion.section>

            {/* 2. Architecture & Topology (Mermaid) */}
            <motion.section id="section-architecture" className="detail-block" {...reveal}>
              <div className="block-header">
                <span className="block-number">02</span>
                <h2>Architecture & Topology</h2>
              </div>
              <p className="block-intro">
                System topology visualizing data flow, isolation boundaries, and verification gates.
              </p>
              <MermaidDiagram chart={project.mermaidDiagram} title={`${project.name} System Topology`} />
            </motion.section>

            {/* 3. Execution Pipeline & Contracts */}
            <motion.section id="section-pipeline" className="detail-block" {...reveal}>
              <div className="block-header">
                <span className="block-number">03</span>
                <h2>Execution Nodes & Typed Contracts</h2>
              </div>
              <p className="block-intro">
                Deterministic step execution sequence with strict input/output typed schemas.
              </p>

              <div className="nodes-timeline">
                {project.nodes.map((node) => (
                  <CardSpotlight key={node.step} className="node-item-card">
                    <div className="node-card-top">
                      <div className="node-step-tag">
                        <span className="node-step-num">{node.step}</span>
                        <h4 className="node-name">{node.name}</h4>
                      </div>
                      <span className={`node-type-pill node-type--${node.type}`}>
                        {node.type}
                      </span>
                    </div>

                    <p className="node-desc">{node.description}</p>

                    <div className="node-signature-wrap">
                      <span className="sig-label">Output Contract:</span>
                      <code>{node.outputSignature}</code>
                    </div>
                  </CardSpotlight>
                ))}
              </div>
            </motion.section>

            {/* 4. Safety Guardrails & Governance */}
            <motion.section id="section-guardrails" className="detail-block" {...reveal}>
              <div className="block-header">
                <span className="block-number">04</span>
                <h2>Governance, Guardrails & Human Gates</h2>
              </div>
              <div className="prose-block">
                <p>{project.caseStudy.guardrailArchitecture}</p>
              </div>
            </motion.section>

            {/* 5. Testing & Evaluation Benchmarks */}
            <motion.section id="section-benchmarks" className="detail-block" {...reveal}>
              <div className="block-header">
                <span className="block-number">05</span>
                <h2>Evaluation & Quality Benchmarks</h2>
              </div>
              <div className="prose-block">
                <p>{project.caseStudy.evaluationAndMetrics}</p>
              </div>
            </motion.section>

            {/* 6. Architectural Tradeoffs */}
            <motion.section id="section-tradeoffs" className="detail-block" {...reveal}>
              <div className="block-header">
                <span className="block-number">06</span>
                <h2>Architectural Decisions & Tradeoffs</h2>
              </div>
              <div className="tradeoffs-grid">
                {project.tradeoffs.map((t, idx) => (
                  <CardSpotlight key={idx} className="tradeoff-card">
                    <div className="tradeoff-top">
                      <span className="tradeoff-tag">Decision #{idx + 1}</span>
                      <h4>{t.decision}</h4>
                    </div>
                    <div className="tradeoff-choice">
                      <span className="choice-lbl">Selected Path:</span>
                      <p>{t.chosenPath}</p>
                    </div>
                    <div className="tradeoff-rationale">
                      <span className="rationale-lbl">Engineering Rationale:</span>
                      <p>{t.rationale}</p>
                    </div>
                  </CardSpotlight>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar Sticky Specs Column with Section Jump Links */}
          <aside className="detail-sidebar-column">
            <div className="sticky-sidebar-card">
              {/* Quick Jump Navigation */}
              <div className="spec-group">
                <span className="spec-label">Table of Contents</span>
                <nav className="sidebar-jump-nav" aria-label="Case study sections">
                  {sectionAnchors.map((item) => {
                    const Icon = item.icon
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="sidebar-jump-link"
                      >
                        <Icon size={13} />
                        <span>{item.label}</span>
                      </a>
                    )
                  })}
                </nav>
              </div>

              <div className="spec-group">
                <span className="spec-label">Domain</span>
                <strong className="spec-value">{project.category}</strong>
              </div>

              <div className="spec-group">
                <span className="spec-label">Primary Stack</span>
                <div className="sidebar-tech-pills">
                  {project.stack.map((t) => (
                    <span key={t} className="tech-pill">{t}</span>
                  ))}
                </div>
              </div>

              <div className="spec-group">
                <span className="spec-label">Architecture Signals</span>
                <ul className="sidebar-signals-list">
                  {project.signals.map((s) => (
                    <li key={s}>
                      <CheckCircle2 size={13} className="text-emerald" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="spec-group sidebar-links-group">
                <span className="spec-label">Repository & Links</span>
                <a href={project.repo} target="_blank" rel="noopener noreferrer" className="sidebar-link">
                  <GitHubMark size={14} /> GitHub Repository
                </a>
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="sidebar-link">
                    <ExternalLink size={14} /> Production Deployment
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="sidebar-link">
                    <Play size={14} /> Video Demonstration
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Pagination Navigation Footer */}
      <section className="detail-pagination-section">
        <div className="shell detail-pagination-grid">
          {prevProject ? (
            <CardSpotlight className="pagination-card-wrap">
              <Link to={`/projects/${prevProject.id}`} className="pagination-card pagination-card--prev">
                <span className="pag-label"><ArrowLeft size={14} /> Previous Project</span>
                <strong>{prevProject.name}</strong>
                <p>{prevProject.tagline}</p>
              </Link>
            </CardSpotlight>
          ) : (
            <div className="pagination-card pagination-card--disabled" />
          )}

          {nextProject ? (
            <CardSpotlight className="pagination-card-wrap">
              <Link to={`/projects/${nextProject.id}`} className="pagination-card pagination-card--next">
                <span className="pag-label">Next Project <ArrowRight size={14} /></span>
                <strong>{nextProject.name}</strong>
                <p>{nextProject.tagline}</p>
              </Link>
            </CardSpotlight>
          ) : (
            <CardSpotlight className="pagination-card-wrap">
              <Link to="/projects" className="pagination-card pagination-card--next">
                <span className="pag-label">Back to Catalog <ArrowRight size={14} /></span>
                <strong>All 6 Projects</strong>
                <p>Explore full architectural directory</p>
              </Link>
            </CardSpotlight>
          )}
        </div>
      </section>
    </div>
  )
}
