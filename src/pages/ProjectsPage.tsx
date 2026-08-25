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

function GitHubMark({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 .7a11.3 11.3 0 0 0-3.57 22.02c.57.1.78-.24.78-.55v-2.16c-3.18.69-3.85-1.35-3.85-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.54-.29-5.21-1.27-5.21-5.59 0-1.24.44-2.24 1.17-3.03-.12-.29-.51-1.45.11-2.99 0 0 .96-.31 3.12 1.16A10.9 10.9 0 0 1 12 6.06c.96 0 1.93.13 2.84.38 2.16-1.47 3.11-1.16 3.11-1.16.63 1.54.24 2.7.12 2.99.73.79 1.17 1.79 1.17 3.03 0 4.33-2.68 5.29-5.23 5.58.41.36.78 1.06.78 2.14v3.16c0 .31.2.66.79.55A11.3 11.3 0 0 0 12 .7Z" />
    </svg>
  )
}

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
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.1 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
      }

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <section className="page-header-section">
        <div className="shell">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-label">Engineering Directory</p>
            <h1 className="page-title">Systems & Architectures</h1>
            <p className="page-subtitle">
              Comprehensive case studies spanning multimodal civic incident intelligence, industrial knowledge graphs (Neo4j), static agent security scanners, and deterministic planning solvers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects List Section */}
      <section className="section projects-catalog-section">
        <div className="shell">
          {/* Controls Bar: Filters & Live Search */}
          <div className="catalog-controls-bar">
            {/* Domain Filter Pills with Motion layout indicator */}
            <div className="filter-pills-bar" role="tablist">
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
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
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
                  <motion.article
                    key={p.id}
                    className="catalog-project-card"
                    layout
                    initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  >
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
                  </motion.article>
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
              <motion.a
                key={proj.name}
                className="archive-card"
                href={proj.href}
                target="_blank"
                rel="noopener noreferrer"
                {...reveal}
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
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
