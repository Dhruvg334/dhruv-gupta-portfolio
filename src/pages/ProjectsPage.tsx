import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import {
  ArrowRight,
  ExternalLink,
  Play,
  CheckCircle2,
  Search,
  X,
  Layers,
} from 'lucide-react'
import { projects, supportingProjects } from '../data/projects'
import { ProjectDomain } from '../types'
import { ArchitectureWorkspace } from '../components/ArchitectureWorkspace'
import { CardSpotlight } from '../components/motion/CardSpotlight'
import { GitHubMark } from '../components/SocialIcons'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const filterTabs = [
  { id: 'all', label: 'All Systems (6)' },
  { id: 'workflow', label: 'Civic & Full-Stack' },
  { id: 'graph', label: 'Industrial GraphRAG' },
  { id: 'safety', label: 'Agent Security & Safety' },
  { id: 'planning', label: 'Controlled Planning' },
  { id: 'eval', label: 'Evaluation & Learning' },
]

export function ProjectsPage() {
  const [selectedDomain, setSelectedDomain] = useState<ProjectDomain>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const reduceMotion = useReducedMotion()

  useDocumentTitle(
    'Systems Directory & Case Studies · Dhruv Gupta',
    'Explore 6 production systems built with verifiable architecture, deterministic business logic, and safety guardrails.'
  )

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesDomain = selectedDomain === 'all' || p.domain === selectedDomain
      const matchesQuery =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.stack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesDomain && matchesQuery
    })
  }, [selectedDomain, searchQuery])

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-20px' },
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
      }

  return (
    <div className="page-wrapper projects-page">
      {/* Page Header */}
      <section className="page-hero">
        <div className="shell">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="page-eyebrow">Systems Directory</p>
            <h1 className="page-title">Production Systems & Case Studies</h1>
            <p className="page-subtitle">
              Explore 6 AI systems built with verifiable architecture, deterministic business logic, and safety guardrails.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section className="section catalog-main-section">
        <div className="shell">
          {/* Controls Bar: Domain Filter Tabs + Search */}
          <div className="catalog-controls-bar">
            {/* Domain Filter Pills */}
            <div className="catalog-filters-list" role="tablist" aria-label="Filter projects by domain">
              {filterTabs.map((f) => {
                const isActive = selectedDomain === f.id
                return (
                  <button
                    key={f.id}
                    className={`filter-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setSelectedDomain(f.id as ProjectDomain)}
                    role="tab"
                    aria-selected={isActive}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeFilterBubble"
                        className="filter-btn-highlight"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      />
                    )}
                    <span className="filter-btn-text">{f.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Quick Live Search Input */}
            <div className="catalog-search-wrap">
              <Search size={15} className="search-icon" />
              <input
                type="text"
                placeholder="Search by stack, keyword, or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="catalog-search-input"
                aria-label="Filter projects by keyword or tech stack"
                maxLength={100}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Results Counter */}
          <div className="catalog-results-meta">
            <span>
              Showing <strong>{filteredProjects.length}</strong> of {projects.length} production systems
            </span>
            {searchQuery && (
              <span className="search-filter-tag">
                Matching: "{searchQuery.slice(0, 30)}"
              </span>
            )}
          </div>

          {/* Detailed Projects Grid */}
          <div className="projects-catalog-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.length === 0 ? (
                <motion.div
                  className="catalog-empty-state"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Layers size={36} className="text-muted" />
                  <h3>No systems match your criteria</h3>
                  <p>Try searching for a different keyword (e.g. Civitas, PostGIS, FastAPI, Neo4j, LangGraph) or clear filters.</p>
                  <button
                    type="button"
                    className="btn btn--secondary"
                    onClick={() => {
                      setSelectedDomain('all')
                      setSearchQuery('')
                    }}
                  >
                    Reset All Filters
                  </button>
                </motion.div>
              ) : (
                filteredProjects.map((p, idx) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, delay: idx * 0.03, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <CardSpotlight className="catalog-project-card">
                      <div className="catalog-card-top">
                        <div className="catalog-num-tag">
                          <span className="cat-num">{p.number}</span>
                          <span className="cat-badge">{p.category}</span>
                        </div>

                        <div className="catalog-metrics-group">
                          {p.metrics.map((m) => (
                            <div key={m.label} className="metric-pill">
                              <strong>{m.value}</strong>
                              <span>{m.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="catalog-card-body">
                        <h2 className="catalog-project-title">
                          <Link to={`/projects/${p.id}`}>{p.name}</Link>
                        </h2>
                        <p className="catalog-tagline">{p.tagline}</p>
                        <p className="catalog-summary">{p.summary}</p>

                        {/* Key Highlights */}
                        <div className="catalog-signals-list">
                          {p.signals.slice(0, 3).map((sig) => (
                            <div key={sig} className="catalog-signal-item">
                              <CheckCircle2 size={13} className="text-accent" />
                              <span>{sig}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="catalog-tech-stack">
                          {p.stack.map((tech) => (
                            <span key={tech} className="tech-pill">{tech}</span>
                          ))}
                        </div>
                      </div>

                      <div className="catalog-card-footer">
                        <Link to={`/projects/${p.id}`} className="btn btn--primary">
                          Read Architecture Case Study <ArrowRight size={14} />
                        </Link>

                        <div className="catalog-ext-links">
                          {p.live && (
                            <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn btn--secondary" title="Open Live Application">
                              <ExternalLink size={14} /> Live
                            </a>
                          )}
                          {p.demo && (
                            <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn btn--ghost" title="Watch Demo Video">
                              <Play size={14} /> Demo
                            </a>
                          )}
                          <a href={p.repo} target="_blank" rel="noopener noreferrer" className="btn btn--ghost" title="View Source on GitHub">
                            <GitHubMark size={14} /> GitHub
                          </a>
                        </div>
                      </div>
                    </CardSpotlight>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Architecture Workspace (Interactive Pipeline Simulator) */}
      <ArchitectureWorkspace />

      {/* Supporting Builds & Archive Section */}
      <section className="section archive-section">
        <div className="shell">
          <motion.div className="section-heading" {...reveal}>
            <p className="section-label">Engineering Archive</p>
            <div>
              <h2>Supporting builds & specialized tools.</h2>
              <p>
                Earlier projects and experimental builds across career graphs, SOP automation, and disaster decision support.
              </p>
            </div>
          </motion.div>

          <div className="archive-grid">
            {supportingProjects.map((proj) => (
              <motion.div key={proj.name} {...reveal}>
                <CardSpotlight className="archive-card">
                  <a
                    className="archive-card-link-wrap"
                    href={proj.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="archive-content">
                      <h3>{proj.name}</h3>
                      <p>{proj.description}</p>
                      <div className="archive-tags">
                        {proj.tags.map((t) => (
                          <span key={t} className="archive-tag">{t}</span>
                        ))}
                      </div>
                    </div>
                    <ArrowRight size={18} className="archive-arrow" />
                  </a>
                </CardSpotlight>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
