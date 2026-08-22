import { useState, useMemo } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  ArrowRight,
  Mail,
  FileText,
  ChevronDown,
  ExternalLink,
} from 'lucide-react'
import { projects, supportingProjects } from './data/projects'
import { engineeringPrinciples } from './data/competencies'
import { Project, ProjectDomain, ContactMode } from './types'
import { Header } from './components/Header'
import { HeroTraceConsole } from './components/HeroTraceConsole'
import { ProjectCard } from './components/ProjectCard'
import { ProjectModal } from './components/ProjectModal'
import { ArchitectureSandbox } from './components/ArchitectureSandbox'
import { SystemMatrix } from './components/SystemMatrix'
import { ContactModal } from './components/ContactModal'
import { Toast } from './components/Toast'

function GitHubMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 .7a11.3 11.3 0 0 0-3.57 22.02c.57.1.78-.24.78-.55v-2.16c-3.18.69-3.85-1.35-3.85-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.54-.29-5.21-1.27-5.21-5.59 0-1.24.44-2.24 1.17-3.03-.12-.29-.51-1.45.11-2.99 0 0 .96-.31 3.12 1.16A10.9 10.9 0 0 1 12 6.06c.96 0 1.93.13 2.84.38 2.16-1.47 3.11-1.16 3.11-1.16.63 1.54.24 2.7.12 2.99.73.79 1.17 1.79 1.17 3.03 0 4.33-2.68 5.29-5.23 5.58.41.36.78 1.06.78 2.14v3.16c0 .31.2.66.79.55A11.3 11.3 0 0 0 12 .7Z" />
    </svg>
  )
}

function LinkedInMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.1 20.45H3.54V8.98H7.1v11.47Z" />
    </svg>
  )
}

export function App() {
  const [contactOpen, setContactOpen] = useState(false)
  const [contactMode, setContactMode] = useState<ContactMode>('contact')
  const [selectedDomain, setSelectedDomain] = useState<ProjectDomain>('all')
  const [modalProject, setModalProject] = useState<Project | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const reduceMotion = useReducedMotion()

  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => {
      setToastMessage(null)
    }, 2800)
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('dhruvg3304@gmail.com')
    setCopiedEmail(true)
    showToast('Email address copied: dhruvg3304@gmail.com')
    setTimeout(() => setCopiedEmail(false), 3000)
  }

  const openContact = (mode: ContactMode = 'contact') => {
    setContactMode(mode)
    setContactOpen(true)
  }

  const filteredProjects = useMemo(() => {
    if (selectedDomain === 'all') return projects
    return projects.filter((p) => p.domain === selectedDomain)
  }, [selectedDomain])

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.12 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
      }

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>

      {/* Global Navigation Header */}
      <Header
        onOpenContact={openContact}
        onCopyEmail={handleCopyEmail}
        copiedEmail={copiedEmail}
      />

      <main id="main">
        {/* Hero Section */}
        <section className="hero" id="top">
          <div className="hero-noise" />
          <div className="hero-grid-pattern" />

          <div className="shell hero-layout">
            <motion.div
              className="hero-copy"
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hero-kicker-pill">
                <span>AI Systems Engineering · RAG · Guardrails</span>
              </div>

              <h1>
                I build deterministic systems <em>around</em> AI.
              </h1>

              <p className="hero-lede">
                I’m Dhruv Gupta, a final-year Computer Science student building production-grade AI systems where models operate inside retrieval graphs, deterministic validation schemas, state machines, permission scopes, and human review gates.
              </p>

              <div className="hero-actions">
                <a className="button button--light" href="#work">
                  Inspect Flagship Systems <ArrowRight size={17} />
                </a>
                <button
                  className="button button--ghost"
                  onClick={() => openContact('resume')}
                >
                  <FileText size={17} /> Request Resume
                </button>
                <button
                  className="button button--ghost"
                  onClick={() => openContact('contact')}
                >
                  <Mail size={17} /> Start Conversation
                </button>
              </div>

              <div className="hero-metrics-strip" aria-label="Key Academic and Project Metrics">
                <div className="hero-stat-card">
                  <strong>9.45</strong>
                  <span>B.Tech CSE CGPA · KIIT</span>
                </div>
                <div className="hero-stat-card">
                  <strong>1109</strong>
                  <span>GATE DA 2026 AIR</span>
                </div>
                <div className="hero-stat-card">
                  <strong>5</strong>
                  <span>Flagship AI Architectures</span>
                </div>
              </div>
            </motion.div>

            {/* Interactive Hero Trace Console */}
            <motion.div
              className="hero-console-col"
              initial={reduceMotion ? undefined : { opacity: 0, x: 24 }}
              animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <HeroTraceConsole />
            </motion.div>
          </div>
        </section>

        {/* Intro Strip */}
        <section className="intro-strip">
          <div className="shell intro-strip__inner">
            <p>
              My core engineering focus sits at the intersection of <strong>GraphRAG, agent safety gates, RAG evaluation harnesses, deterministic planning, and full-stack cloud workflows.</strong>
            </p>
            <div className="intro-links">
              <a href="https://github.com/Dhruvg334" target="_blank" rel="noreferrer">
                <GitHubMark size={16} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/dhruv-gupta-7a7500287/" target="_blank" rel="noreferrer">
                <LinkedInMark size={16} /> LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Flagship Work Section */}
        <section className="section work-section" id="work">
          <div className="shell">
            <motion.div className="section-heading" {...reveal}>
              <p className="section-label">Selected Flagship Systems</p>
              <div>
                <h2>Five production architectures worth inspecting.</h2>
                <p>
                  Curated by engineering rigor, deterministic safety boundaries, and empirical evaluation proof rather than superficial demo wrappers.
                </p>
              </div>
            </motion.div>

            {/* Domain Filter Bar */}
            <div className="project-filter-bar" role="tablist" aria-label="Filter systems by technical domain">
              {[
                { id: 'all', label: 'All Systems (5)' },
                { id: 'graph', label: 'Industrial GraphRAG' },
                { id: 'safety', label: 'Agent Safety & Gatekeeping' },
                { id: 'eval', label: 'RAG Evaluation Suite' },
                { id: 'planning', label: 'Controlled Planning' },
                { id: 'workflow', label: 'Full-Stack NGO Governance' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  className={`filter-pill-btn ${selectedDomain === filter.id ? 'active' : ''}`}
                  onClick={() => setSelectedDomain(filter.id as ProjectDomain)}
                  role="tab"
                  aria-selected={selectedDomain === filter.id}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Project Cards Stack */}
            <div className="project-cards-stack">
              {filteredProjects.map((project) => (
                <motion.div key={project.id} {...reveal}>
                  <ProjectCard
                    project={project}
                    onOpenModal={(proj) => setModalProject(proj)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Architecture Sandbox */}
        <ArchitectureSandbox />

        {/* 12-Layer System Architecture Matrix */}
        <SystemMatrix />

        {/* Engineering Philosophy Section */}
        <section className="section approach-section" id="approach">
          <div className="shell">
            <motion.div className="section-heading section-heading--light" {...reveal}>
              <p className="section-label">Engineering Philosophy</p>
              <div>
                <h2>The model is only one component in the machine.</h2>
                <p>
                  How I approach the software architecture before, around, and after model invocation.
                </p>
              </div>
            </motion.div>

            <div className="principle-grid">
              {engineeringPrinciples.map((principle, index) => (
                <motion.article
                  className="principle-card"
                  key={principle.title}
                  {...reveal}
                  transition={{ duration: 0.55, delay: index * 0.06 }}
                >
                  <span>{principle.number}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.summary}</p>
                  <small>{principle.detail}</small>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="section about-section" id="about">
          <div className="shell about-layout">
            <motion.div className="about-title" {...reveal}>
              <p className="section-label">About the Builder</p>
              <h2>Engineering dependable AI systems, one architectural problem at a time.</h2>
            </motion.div>

            <motion.div className="about-copy" {...reveal}>
              <p>
                I am a final-year B.Tech Computer Science and Engineering student at Kalinga Institute of Industrial Technology (KIIT), graduating in 2026 with a 9.45 CGPA.
              </p>
              <p>
                I am deeply focused on systems engineering for AI: bridging the gap between non-deterministic models and mission-critical software requirements. My work centers on hybrid graph-vector retrieval (Neo4j, pgvector, Qdrant), deterministic security gatekeepers (A-DAP-T), regression evaluation harnesses (Vitest), and multi-tenant RLS isolation.
              </p>
              <p>
                I ranked AIR 1109 in GATE DA (Data Science & Artificial Intelligence) 2026, backing practical product engineering with rigorous mathematical foundations in multivariable calculus, linear algebra, probability, and database internals.
              </p>

              <div className="about-facts">
                <div>
                  <strong>9.45</strong>
                  <span>B.Tech CSE CGPA</span>
                </div>
                <div>
                  <strong>AIR 1109</strong>
                  <span>GATE DA 2026</span>
                </div>
                <div>
                  <strong>5</strong>
                  <span>Flagship AI Architectures</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Supporting Projects / Archive */}
        <section className="section more-work-section">
          <div className="shell">
            <motion.div className="section-heading" {...reveal}>
              <p className="section-label">Engineering Archive</p>
              <div>
                <h2>Supporting systems and specialized tools.</h2>
                <p>
                  Additional projects and earlier exploratory builds showcasing full-stack integration and experimentation.
                </p>
              </div>
            </motion.div>

            <div className="more-work-grid">
              {supportingProjects.map((proj) => (
                <motion.a
                  key={proj.name}
                  className="more-work-card"
                  href={proj.href}
                  target="_blank"
                  rel="noreferrer"
                  {...reveal}
                >
                  <div>
                    <h3>{proj.name}</h3>
                    <p>{proj.description}</p>
                    <div className="more-work-tags">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="more-work-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="contact-cta">
          <div className="shell contact-cta__inner">
            <motion.div {...reveal}>
              <p className="section-label">Open for Opportunities</p>
              <h2>Building a serious AI system? Let’s talk architecture.</h2>
            </motion.div>

            <motion.div className="contact-cta__actions" {...reveal}>
              <button
                className="button button--light"
                onClick={() => openContact('contact')}
              >
                Start Conversation <ArrowRight size={17} />
              </button>
              <button
                className="cta-resume-link"
                onClick={() => openContact('resume')}
              >
                <FileText size={15} /> Request Gated Resume <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="shell footer-inner">
          <div className="footer-brand-wrap">
            <span className="brand-mark">DG</span>
            <div>
              <strong style={{ color: '#fff' }}>Dhruv Gupta</strong>
              <p style={{ margin: 0, fontSize: '0.72rem' }}>AI Systems Builder · KIIT CSE</p>
            </div>
          </div>

          <div className="footer-links">
            <button onClick={handleCopyEmail} style={{ color: 'inherit', font: 'inherit', cursor: 'pointer' }}>
              Email
            </button>
            <a href="https://github.com/Dhruvg334" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/dhruv-gupta-7a7500287/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>

          <p className="footer-note">
            Built to make AI system architectures inspectable and verifiable.
          </p>
        </div>
      </footer>

      {/* Case Study Deep Dive Modal */}
      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />

      {/* Contact & Resume Modal */}
      <ContactModal
        open={contactOpen}
        mode={contactMode}
        onClose={() => setContactOpen(false)}
        onCopyEmail={handleCopyEmail}
        copiedEmail={copiedEmail}
      />

      {/* Floating Toast Notification */}
      <Toast message={toastMessage} />
    </>
  )
}
