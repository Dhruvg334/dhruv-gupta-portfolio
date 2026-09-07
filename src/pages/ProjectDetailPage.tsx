import { useState, useMemo, useEffect, useRef } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
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
  Share2,
  Copy,
  Check,
  Sparkles,
  ChevronDown,
  ArrowUp,
  Layers,
  Filter,
  Terminal,
} from 'lucide-react'
import { projects } from '../data/projects'
import { MermaidDiagram } from '../components/MermaidDiagram'
import { ReadingProgressBar } from '../components/ReadingProgressBar'
import { CardSpotlight } from '../components/motion/CardSpotlight'
import { GitHubMark } from '../components/SocialIcons'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { Toast } from '../components/Toast'

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
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const [copiedSigStep, setCopiedSigStep] = useState<string | null>(null)
  const [selectedNodeType, setSelectedNodeType] = useState<string>('all')
  const [activeSection, setActiveSection] = useState<string>('section-problem')
  const [isSwitcherOpen, setIsSwitcherOpen] = useState<boolean>(false)
  const switcherRef = useRef<HTMLDivElement>(null)

  const projectIndex = useMemo(() => {
    return projects.findIndex((p) => p.id === id)
  }, [id])

  if (projectIndex === -1) {
    return <Navigate to="/projects" replace />
  }

  const project = projects[projectIndex]
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null

  useDocumentTitle(
    `${project.name} (${project.number}) · Case Study — Dhruv Gupta`,
    project.summary
  )

  // ScrollSpy for sidebar TOC
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -55% 0px', threshold: 0 }
    )

    sectionAnchors.forEach((sec) => {
      const el = document.getElementById(sec.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [id])

  // Keyboard navigation: ArrowLeft for prev, ArrowRight for next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey
      ) {
        return
      }
      if (e.key === 'ArrowLeft' && prevProject) {
        navigate(`/projects/${prevProject.id}`)
      } else if (e.key === 'ArrowRight' && nextProject) {
        navigate(`/projects/${nextProject.id}`)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prevProject, nextProject, navigate])

  // Close project switcher on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(e.target as Node)) {
        setIsSwitcherOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Node type categories
  const nodeTypes = useMemo(() => {
    const types = Array.from(new Set(project.nodes.map((n) => n.type)))
    return ['all', ...types]
  }, [project.nodes])

  // Filtered nodes
  const filteredNodes = useMemo(() => {
    if (selectedNodeType === 'all') return project.nodes
    return project.nodes.filter((n) => n.type === selectedNodeType)
  }, [project.nodes, selectedNodeType])

  const handleShare = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    setToastMsg(`Copied ${project.name} case study link to clipboard`)
  }

  const handleCopySignature = (step: string, sig: string) => {
    navigator.clipboard.writeText(sig)
    setCopiedSigStep(step)
    setToastMsg(`Copied Node ${step} contract signature`)
    setTimeout(() => setCopiedSigStep(null), 1500)
  }

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
      {/* Toast Feedback */}
      <Toast message={toastMsg} onClose={() => setToastMsg(null)} />

      {/* Dynamic Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Top Breadcrumbs Bar */}
      <div className="detail-top-bar">
        <div className="shell detail-top-bar__inner">
          <Link to="/projects" className="back-link">
            <ArrowLeft size={16} /> Back to Systems Directory
          </Link>

          {/* Quick Project Switcher Dropdown */}
          <div className="project-switcher-wrap" ref={switcherRef}>
            <button
              type="button"
              className={`project-switcher-btn ${isSwitcherOpen ? 'active' : ''}`}
              onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
              aria-expanded={isSwitcherOpen}
              aria-label="Switch to another system case study"
              title="Click to jump to another project"
            >
              <span>
                Project {project.number} of {String(projects.length).padStart(2, '0')}
              </span>
              <ChevronDown size={14} className={`switcher-icon ${isSwitcherOpen ? 'open' : ''}`} />
            </button>

            {isSwitcherOpen && (
              <div className="project-switcher-dropdown">
                <div className="switcher-dropdown-header">
                  <span>Switch System ({projects.length} Total)</span>
                </div>
                <div className="switcher-items-list" role="menu">
                  {projects.map((p) => {
                    const isCurrent = p.id === project.id
                    return (
                      <Link
                        key={p.id}
                        to={`/projects/${p.id}`}
                        className={`switcher-item ${isCurrent ? 'active' : ''}`}
                        onClick={() => setIsSwitcherOpen(false)}
                        role="menuitem"
                      >
                        <span className="switcher-num">{p.number}</span>
                        <div className="switcher-meta">
                          <strong className="switcher-title">{p.name}</strong>
                          <span className="switcher-tagline">{p.category}</span>
                        </div>
                        {isCurrent && <Check size={14} className="text-accent ml-auto" />}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
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

            {/* Architectural Core Principle Callout */}
            {project.architecturalCore && (
              <div className="detail-core-card">
                <div className="core-card-header">
                  <Sparkles size={14} className="text-accent" />
                  <span className="core-card-tag">Architectural Core Principle</span>
                </div>
                <p className="core-card-text">{project.architecturalCore}</p>
              </div>
            )}

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

              <button type="button" onClick={handleShare} className="btn btn--ghost" title="Share Case Study Link">
                <Share2 size={16} /> Share Case Study
              </button>
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

            {/* 2. Architecture & Topology (Mermaid + System Design) */}
            <motion.section id="section-architecture" className="detail-block" {...reveal}>
              <div className="block-header">
                <span className="block-number">02</span>
                <h2>Architecture & Topology</h2>
              </div>

              {/* Comprehensive System Design Narrative */}
              {project.caseStudy.systemDesign && (
                <div className="system-design-block">
                  <div className="system-design-header">
                    <Layers size={15} className="text-accent" />
                    <strong>End-to-End System Design & Data Flow</strong>
                  </div>
                  <p>{project.caseStudy.systemDesign}</p>
                </div>
              )}

              <p className="block-intro">
                Interactive topology visualizing data flow, isolation boundaries, deterministic solvers, and verification gates.
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
                Deterministic step execution sequence with strict input/output typed schemas. Filter by node type to inspect safety gates and algorithmic steps.
              </p>

              {/* Node Type Filter Pills */}
              <div className="node-filter-bar">
                <div className="filter-bar-lead">
                  <Filter size={13} className="text-muted" />
                  <span>Filter by Node Type:</span>
                </div>
                <div className="node-filter-pills" role="tablist" aria-label="Filter execution nodes">
                  {nodeTypes.map((type) => {
                    const count =
                      type === 'all'
                        ? project.nodes.length
                        : project.nodes.filter((n) => n.type === type).length
                    const isSelected = selectedNodeType === type
                    return (
                      <button
                        key={type}
                        type="button"
                        className={`node-filter-btn ${isSelected ? 'active' : ''}`}
                        onClick={() => setSelectedNodeType(type)}
                        role="tab"
                        aria-selected={isSelected}
                      >
                        <span className="filter-type-name">{type}</span>
                        <span className="filter-type-count">{count}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Timeline Cards */}
              <div className="nodes-timeline">
                {filteredNodes.map((node) => (
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
                      <div className="node-signature-header">
                        <div className="sig-label-group">
                          <Terminal size={12} className="text-accent" />
                          <span className="sig-label">Output Contract Signature:</span>
                        </div>
                        <button
                          type="button"
                          className="sig-copy-btn"
                          onClick={() => handleCopySignature(node.step, node.outputSignature)}
                          aria-label={`Copy Node ${node.step} contract signature`}
                          title="Copy Output Contract"
                        >
                          {copiedSigStep === node.step ? (
                            <span className="sig-copied-text">
                              <Check size={12} className="text-emerald" /> Copied
                            </span>
                          ) : (
                            <span className="sig-copy-action">
                              <Copy size={12} /> Copy
                            </span>
                          )}
                        </button>
                      </div>
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
              <div className="prose-block guardrail-prose-block">
                <div className="prose-callout-header">
                  <ShieldCheck size={16} className="text-accent" />
                  <strong>Multi-Tiered Deterministic Guardrail Architecture</strong>
                </div>
                <p>{project.caseStudy.guardrailArchitecture}</p>
              </div>
            </motion.section>

            {/* 5. Testing & Evaluation Benchmarks */}
            <motion.section id="section-benchmarks" className="detail-block" {...reveal}>
              <div className="block-header">
                <span className="block-number">05</span>
                <h2>Evaluation & Quality Benchmarks</h2>
              </div>
              <div className="prose-block benchmark-prose-block">
                <div className="prose-callout-header">
                  <FileText size={16} className="text-emerald" />
                  <strong>Empirical Test Suites & Benchmark Precision</strong>
                </div>
                <p>{project.caseStudy.evaluationAndMetrics}</p>
              </div>
            </motion.section>

            {/* 6. Architectural Tradeoffs */}
            <motion.section id="section-tradeoffs" className="detail-block" {...reveal}>
              <div className="block-header">
                <span className="block-number">06</span>
                <h2>Architectural Decisions & Tradeoffs</h2>
              </div>
              <p className="block-intro">
                Real-world engineering constraints, considered alternatives, and technical justifications.
              </p>
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
              {/* Quick Jump Navigation with Active ScrollSpy */}
              <div className="spec-group">
                <div className="spec-group-header">
                  <span className="spec-label">Table of Contents</span>
                </div>
                <nav className="sidebar-jump-nav" aria-label="Case study sections">
                  {sectionAnchors.map((item) => {
                    const Icon = item.icon
                    const isActive = activeSection === item.id
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`sidebar-jump-link ${isActive ? 'active' : ''}`}
                      >
                        <Icon size={13} />
                        <span>{item.label}</span>
                      </a>
                    )
                  })}
                </nav>
              </div>

              {/* Scroll to Top helper */}
              <button
                type="button"
                className="scroll-top-btn"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                title="Return to top of page"
              >
                <ArrowUp size={13} /> Return to Top
              </button>

              <div className="spec-group">
                <span className="spec-label">Domain Category</span>
                <strong className="spec-value">{project.category}</strong>
              </div>

              <div className="spec-group">
                <span className="spec-label">Primary Tech Stack</span>
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
        <div className="shell">
          <div className="pagination-keyboard-hint no-print">
            <span>Use keyboard <kbd>←</kbd> and <kbd>→</kbd> arrow keys to switch case studies</span>
          </div>

          <div className="detail-pagination-grid">
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
                  <strong>All {projects.length} Projects</strong>
                  <p>Explore full architectural directory</p>
                </Link>
              </CardSpotlight>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
