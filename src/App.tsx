import { useState, useMemo } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  ArrowRight,
  Mail,
  FileText,
} from 'lucide-react'
import avatarSvg from './assets/avatar.svg'
import { projects, supportingProjects } from './data/projects'
import { engineeringPrinciples } from './data/competencies'
import { Project, ProjectDomain, ContactMode } from './types'
import { Header } from './components/Header'
import { HeroTraceConsole } from './components/HeroTraceConsole'
import { ProjectCard } from './components/ProjectCard'
import { ProjectModal } from './components/ProjectModal'
import { ArchitectureWorkspace } from './components/ArchitectureWorkspace'
import { ContactModal } from './components/ContactModal'
import { Toast } from './components/Toast'

function GitHubMark({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 .7a11.3 11.3 0 0 0-3.57 22.02c.57.1.78-.24.78-.55v-2.16c-3.18.69-3.85-1.35-3.85-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.54-.29-5.21-1.27-5.21-5.59 0-1.24.44-2.24 1.17-3.03-.12-.29-.51-1.45.11-2.99 0 0 .96-.31 3.12 1.16A10.9 10.9 0 0 1 12 6.06c.96 0 1.93.13 2.84.38 2.16-1.47 3.11-1.16 3.11-1.16.63 1.54.24 2.7.12 2.99.73.79 1.17 1.79 1.17 3.03 0 4.33-2.68 5.29-5.23 5.58.41.36.78 1.06.78 2.14v3.16c0 .31.2.66.79.55A11.3 11.3 0 0 0 12 .7Z" />
    </svg>
  )
}

function LinkedInMark({ size = 15 }: { size?: number }) {
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
    setTimeout(() => setToastMessage(null), 2600)
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('dhruvg3304@gmail.com')
    setCopiedEmail(true)
    showToast('Copied to clipboard: dhruvg3304@gmail.com')
    setTimeout(() => setCopiedEmail(false), 2800)
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
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.1 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
      }

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>

      {/* Minimal Global Header */}
      <Header onOpenContact={openContact} />

      <main id="main">
        {/* Hero Section */}
        <section className="hero" id="top">
          <div className="hero-glow hero-glow--left" />
          <div className="hero-glow hero-glow--right" />

          <div className="shell hero-grid">
            <motion.div
              className="hero-text-col"
              initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hero-badge-wrap">
                <img src={avatarSvg} alt="Dhruv Gupta" className="hero-avatar" />
                <div className="hero-badge">
                  <span className="badge-dot" />
                  <span>AI Systems · GraphRAG · Guardrails · Workflows</span>
                </div>
              </div>

              <h1 className="hero-title">
                Building reliable software systems <em>around AI models</em>.
              </h1>

              <p className="hero-description">
                I’m Dhruv Gupta, an engineering student at KIIT focused on building practical AI systems where models operate inside deterministic validation rules, graph retrieval, evaluation harnesses, and human review gates.
              </p>

              <div className="hero-cta-group">
                <a className="btn btn--primary" href="#work">
                  View Systems <ArrowRight size={15} />
                </a>
                <button
                  className="btn btn--secondary"
                  onClick={() => openContact('resume')}
                >
                  <FileText size={15} /> Request Resume
                </button>
                <button
                  className="btn btn--ghost"
                  onClick={() => openContact('contact')}
                >
                  <Mail size={15} /> Get in touch
                </button>
              </div>

              {/* Key Credentials Strip */}
              <div className="hero-credentials-bar">
                <div className="credential-item">
                  <strong>9.45</strong>
                  <span>CGPA · B.Tech CSE</span>
                </div>
                <div className="credential-divider" />
                <div className="credential-item">
                  <strong>July 2027</strong>
                  <span>Graduation · KIIT</span>
                </div>
                <div className="credential-divider" />
                <div className="credential-item">
                  <strong>5</strong>
                  <span>Production Architectures</span>
                </div>
              </div>
            </motion.div>

            {/* Interactive Hero Console Column */}
            <motion.div
              className="hero-monitor-col"
              initial={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <HeroTraceConsole />
            </motion.div>
          </div>
        </section>

        {/* Intro Strip */}
        <section className="intro-bar">
          <div className="shell intro-bar__inner">
            <p>
              Focused on <strong>GraphRAG, agent safety gates, deterministic planning, RAG evaluation suites, and multi-tenant cloud workflows.</strong>
            </p>
            <div className="intro-socials">
              <a href="https://github.com/Dhruvg334" target="_blank" rel="noreferrer">
                <GitHubMark /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/dhruv-gupta-7a7500287/" target="_blank" rel="noreferrer">
                <LinkedInMark /> LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Selected Systems Section */}
        <section className="section work-section" id="work">
          <div className="shell">
            <motion.div className="section-heading" {...reveal}>
              <p className="section-label">Selected Projects</p>
              <div>
                <h2>Five production architectures worth inspecting.</h2>
                <p>
                  Focused on architectural clarity, deterministic safety boundaries, and empirical evaluation rather than superficial demo wrappers.
                </p>
              </div>
            </motion.div>

            {/* Domain Filter Pills */}
            <div className="filter-pills-bar" role="tablist">
              {[
                { id: 'all', label: 'All Systems (5)' },
                { id: 'graph', label: 'Industrial GraphRAG' },
                { id: 'safety', label: 'Agent Safety & Gates' },
                { id: 'eval', label: 'RAG Evaluation Suite' },
                { id: 'planning', label: 'Controlled Planning' },
                { id: 'workflow', label: 'Full-Stack Workflows' },
              ].map((f) => (
                <button
                  key={f.id}
                  className={`filter-btn ${selectedDomain === f.id ? 'active' : ''}`}
                  onClick={() => setSelectedDomain(f.id as ProjectDomain)}
                  role="tab"
                  aria-selected={selectedDomain === f.id}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Projects Stack */}
            <div className="projects-stack">
              {filteredProjects.map((p) => (
                <motion.div key={p.id} {...reveal}>
                  <ProjectCard
                    project={p}
                    onOpenModal={(proj) => setModalProject(proj)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Unified Architecture & Execution Workspace */}
        <ArchitectureWorkspace />

        {/* Engineering Philosophy Section */}
        <section className="section philosophy-section" id="approach">
          <div className="shell">
            <motion.div className="section-heading" {...reveal}>
              <p className="section-label">Engineering Philosophy</p>
              <div>
                <h2>The model is only one component in the machine.</h2>
                <p>
                  How I approach the software architecture before, around, and after model invocation.
                </p>
              </div>
            </motion.div>

            <div className="principles-grid">
              {engineeringPrinciples.map((principle, index) => (
                <motion.div
                  className="principle-box"
                  key={principle.title}
                  {...reveal}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                >
                  <span className="p-num">{principle.number}</span>
                  <h3 className="p-title">{principle.title}</h3>
                  <p className="p-summary">{principle.summary}</p>
                  <p className="p-detail">{principle.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="section about-section" id="about">
          <div className="shell about-grid">
            <motion.div className="about-left" {...reveal}>
              <p className="section-label">About the Builder</p>
              <h2>Engineering dependable AI systems with mathematical grounding.</h2>
            </motion.div>

            <motion.div className="about-right" {...reveal}>
              <p>
                I am currently pursuing my B.Tech in Computer Science and Engineering at KIIT Bhubaneswar (graduating in July 2027 with a 9.45 CGPA). My focus is on the deterministic boundaries of AI: combining knowledge graphs (Neo4j), vector stores (pgvector, Qdrant), static AST code analysis (A-DAP-T), and regression test harnesses (Vitest, Pytest) to make agentic workflows verifiable and safe.
              </p>
              <p>
                I also qualified GATE DA (Data Science & AI) 2026, backing practical product engineering with strong foundations in linear algebra, calculus, probability, and database internals.
              </p>

              <div className="about-stats-grid">
                <div className="stat-box">
                  <strong>9.45</strong>
                  <span>CGPA · B.Tech CSE</span>
                </div>
                <div className="stat-box">
                  <strong>July 2027</strong>
                  <span>Graduation · KIIT</span>
                </div>
                <div className="stat-box">
                  <strong>5</strong>
                  <span>Systems Built</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Supporting Projects / Archive */}
        <section className="section archive-section" id="archive">
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
                  rel="noreferrer"
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

        {/* Contact CTA Banner */}
        <section className="contact-banner">
          <div className="shell contact-banner__inner">
            <motion.div {...reveal}>
              <p className="section-label">Open for Opportunities</p>
              <h2>Building serious AI systems? Let’s talk architecture.</h2>
            </motion.div>

            <motion.div className="contact-banner__actions" {...reveal}>
              <button
                className="btn btn--primary"
                onClick={() => openContact('contact')}
              >
                Start Conversation <ArrowRight size={15} />
              </button>
              <button
                className="btn btn--secondary"
                onClick={() => openContact('resume')}
              >
                <FileText size={15} /> Request Resume
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="shell footer-grid">
          <div className="footer-brand">
            <img src={avatarSvg} alt="Dhruv Gupta" className="footer-avatar" />
            <div>
              <strong>Dhruv Gupta</strong>
              <p>AI Systems Builder · KIIT CSE '27</p>
            </div>
          </div>

          <div className="footer-links-row">
            <button onClick={handleCopyEmail} className="footer-link-btn">
              Email
            </button>
            <a href="https://github.com/Dhruvg334" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/dhruv-gupta-7a7500287/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>

          <p className="footer-copy">
            Built to make AI system architectures inspectable and verifiable.
          </p>
        </div>
      </footer>

      {/* Deep Case Study Modal */}
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

      {/* Toast */}
      <Toast message={toastMessage} />
    </>
  )
}
