import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Mail,
  Menu,
  Play,
  Send,
  ShieldCheck,
  X,
} from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

const links = {
  github: 'https://github.com/Dhruvg334',
  linkedin: 'https://www.linkedin.com/in/dhruv-gupta-7a7500287/',
  email: 'mailto:dhruvg3304@gmail.com',
}

type Project = {
  number: string
  name: string
  category: string
  summary: string
  detail: string
  stack: string[]
  signals: string[]
  repo: string
  live?: string
  demo?: string
  tone: 'graph' | 'safety' | 'learning' | 'planning' | 'workflow'
}

const projects: Project[] = [
  {
    number: '01',
    name: 'Mnemos',
    category: 'Industrial GraphRAG · Operational Intelligence',
    summary:
      'An asset-centric operational memory that turns maintenance records, inspections, manuals, and field knowledge into evidence-backed investigation workflows.',
    detail:
      'Built around hybrid retrieval, graph context, evidence provenance, operational timelines, and governed agent traces rather than a generic chat layer.',
    stack: ['Next.js', 'FastAPI', 'PostgreSQL', 'pgvector', 'Neo4j'],
    signals: ['GraphRAG', 'Evidence provenance', 'Agent traces'],
    repo: 'https://github.com/Dhruvg334/mnemos',
    live: 'https://mnemos-lake.vercel.app',
    demo: 'https://youtu.be/fs54N2vzHsM',
    tone: 'graph',
  },
  {
    number: '02',
    name: 'A-DAP-T',
    category: 'AI Agent Safety · Release Readiness',
    summary:
      'A pre-release review system for agentic applications that surfaces risky tool access, missing approval gates, weak auditability, exposed secrets, and prompt-injection-prone workflows.',
    detail:
      'Deterministic review logic drives findings and ALLOW / REVIEW / BLOCK decisions; model calls are reserved for explanation and remediation guidance.',
    stack: ['Next.js', 'TypeScript', 'FastAPI', 'Firebase', 'Gemini'],
    signals: ['Static review', 'Release gates', 'Human approval'],
    repo: 'https://github.com/Dhruvg334/a-dap-t',
    live: 'https://a-dap-t.vercel.app/',
    demo: 'https://www.youtube.com/watch?v=VzN88xAFiDA',
    tone: 'safety',
  },
  {
    number: '03',
    name: 'Tessarion',
    category: 'RAG Evaluation · Evidence-linked Learning',
    summary:
      'A learning workspace where users teach concepts back, receive source-grounded diagnosis, inspect concept relationships, and recover through guided tutoring.',
    detail:
      'The stronger engineering story is the evaluation layer: deterministic suites cover retrieval quality, concept extraction, diagnosis, mastery state, review scheduling, tutoring policy, and resilience.',
    stack: ['Next.js', 'Supabase', 'Qdrant', 'Neo4j', 'Vitest'],
    signals: ['Teach-back', 'RAG evaluation', 'Concept graph'],
    repo: 'https://github.com/Dhruvg334/Tessarion',
    live: 'https://tessarion.vercel.app',
    demo: 'https://www.youtube.com/watch?v=wEGKEA1_CVE',
    tone: 'learning',
  },
  {
    number: '04',
    name: 'ChronOS',
    category: 'Controlled Agentic Planning · Execution Recovery',
    summary:
      'An adaptive execution system that converts commitments, projects, routines, calendar constraints, and working preferences into realistic plans with approval-based recovery.',
    detail:
      'Model-assisted planning is bounded by deterministic validators for feasibility, overlap, protected time, dependencies, capacity, ownership, and persistence.',
    stack: ['React', 'FastAPI', 'Supabase', 'pgvector', 'Google Calendar'],
    signals: ['Planning validators', 'Approval flow', 'Failure handling'],
    repo: 'https://github.com/Dhruvg334/chronos',
    tone: 'planning',
  },
  {
    number: '05',
    name: 'Niswarth AI',
    category: 'Full-stack AI Workflows · Human Review',
    summary:
      'A full-stack workflow platform for NGOs to manage campaigns, field updates, volunteers, and human-reviewed impact reports inside organization-scoped workspaces.',
    detail:
      'The product combines RLS-backed data isolation, role-specific workflows, report drafting, evidence context, revision history, review states, AI logs, and deployment checks.',
    stack: ['React', 'Vite', 'Supabase', 'Gemini', 'GitHub Actions'],
    signals: ['RLS isolation', 'Review workflow', 'CI / deployment'],
    repo: 'https://github.com/Dhruvg334/niswarth-ai',
    live: 'https://niswarth-ai.vercel.app/',
    tone: 'workflow',
  },
]

const supporting = [
  ['Daedalus', 'Career navigation product', 'https://github.com/Dhruvg334/Daedalus'],
  ['Shodhak', 'Travel discovery and booking', 'https://github.com/shyaaaa/Shodhak'],
  ['AIDYN', 'Explainable disaster decision support', 'https://github.com/Akkshita06/AIDYN-AI-Disaster-Yield-Network-'],
  ['Physics Study Buddy', 'Earlier LangGraph RAG system', 'https://github.com/Dhruvg334/Physics-Study-Buddy'],
  ['Closira', 'SOP-grounded support workflows', 'https://github.com/Dhruvg334/closira-smb-support-agent'],
  ['Carbonly', 'Carbon tracking and ML-service integration', 'https://github.com/Dhruvg334/Carbonly'],
]

const principles = [
  ['Evidence before confidence', 'Answers should trace back to retrieval, state, rules, or explicit assumptions.'],
  ['Deterministic where it matters', 'Use models for judgment and language; keep critical gates inspectable when rules can do the job.'],
  ['Human review for consequential actions', 'Approval is part of the workflow design, not an afterthought.'],
  ['Evaluation over vibes', 'A polished demo is useful; repeatable tests and failure analysis are more convincing.'],
]

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

type ContactMode = 'contact' | 'resume'

function ProjectVisual({ tone }: { tone: Project['tone'] }) {
  const labels = useMemo(() => {
    if (tone === 'graph') return ['ASSET', 'EVIDENCE', 'GRAPH', 'TRACE']
    if (tone === 'safety') return ['SCAN', 'FINDING', 'GATE', 'REVIEW']
    if (tone === 'learning') return ['SOURCE', 'CONCEPT', 'DIAGNOSE', 'REVIEW']
    if (tone === 'planning') return ['CAPTURE', 'VALIDATE', 'FOCUS', 'RECOVER']
    return ['FIELD', 'DRAFT', 'REVIEW', 'APPROVE']
  }, [tone])

  return (
    <div className={`system-visual system-visual--${tone}`} aria-hidden="true">
      <div className="visual-topline">
        <span>system / flow</span>
        <span>04 nodes</span>
      </div>
      <div className="visual-flow">
        {labels.map((label, index) => (
          <div className="visual-node-wrap" key={label}>
            <div className="visual-node">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{label}</strong>
            </div>
            {index < labels.length - 1 && <div className="visual-connector"><i /></div>}
          </div>
        ))}
      </div>
      <div className="visual-footer">
        <span><i className="status-dot" /> inspectable path</span>
        <span>Dhruv Gupta</span>
      </div>
    </div>
  )
}

function ContactModal({ open, mode, onClose }: { open: boolean; mode: ContactMode; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    document.body.classList.add('modal-open')
    const handleKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => event.target === event.currentTarget && onClose()}
        >
          <motion.div
            className="contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="modal-close" onClick={onClose} aria-label="Close contact form"><X size={19} /></button>
            <div className="modal-intro">
              <p className="section-label">{mode === 'resume' ? 'Resume request' : 'Contact'}</p>
              <h2 id="contact-title">{mode === 'resume' ? 'Request my resume.' : 'Let’s talk about the work.'}</h2>
              <p>
                {mode === 'resume'
                  ? 'I do not publish my resume as an open download. Share who you are and the role or opportunity you are hiring for; I’ll review the request and send the current resume to your email personally.'
                  : 'If you’re reaching out about an AI engineering role, internship, project, or collaboration, send the context and I’ll get back to you.'}
              </p>
              <div className="modal-links">
                <a href={links.email}><Mail size={16} /> Email</a>
                <a href={links.linkedin} target="_blank" rel="noreferrer"><LinkedInMark /> LinkedIn</a>
                <a href={links.github} target="_blank" rel="noreferrer"><GitHubMark /> GitHub</a>
              </div>
            </div>
            <form className="contact-form" action="https://formspree.io/f/xbdwaved" method="POST">
              <input type="hidden" name="request_type" value={mode === 'resume' ? 'Resume request' : 'General contact'} />
              <div className="field-pair">
                <label>
                  <span>Name</span>
                  <input name="name" type="text" autoComplete="name" placeholder="Your name" required />
                </label>
                <label>
                  <span>Email</span>
                  <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
                </label>
              </div>
              {mode === 'resume' && (
                <div className="field-pair">
                  <label>
                    <span>Company / organisation</span>
                    <input name="company" type="text" autoComplete="organization" placeholder="Company or organisation" required />
                  </label>
                  <label>
                    <span>Role / opportunity</span>
                    <input name="role" type="text" placeholder="e.g. AI Systems Intern" required />
                  </label>
                </div>
              )}
              <label>
                <span>Subject</span>
                <input name="subject" type="text" defaultValue={mode === 'resume' ? 'Resume request' : ''} placeholder="Role, project, or collaboration" required />
              </label>
              <label>
                <span>Message</span>
                <textarea name="message" rows={6} defaultValue={mode === 'resume' ? 'I would like to request your current resume. Role / opportunity: ' : ''} placeholder="A little context helps me respond properly." required />
              </label>
              <button className="button button--dark form-submit" type="submit">{mode === 'resume' ? 'Submit resume request' : 'Send message'} <Send size={16} /></button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [contactMode, setContactMode] = useState<ContactMode>('contact')

  const openContact = (mode: ContactMode = 'contact') => {
    setContactMode(mode)
    setContactOpen(true)
  }
  const [scrolled, setScrolled] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.14 },
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
      }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
        <div className="nav-shell">
          <a className="brand" href="#top" aria-label="Dhruv Gupta home">
            <span className="brand-mark">DG</span>
            <span>Dhruv Gupta</span>
          </a>
          <nav className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`} aria-label="Primary navigation">
            <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
            <a href="#approach" onClick={() => setMenuOpen(false)}>Approach</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <button className="nav-contact" onClick={() => { openContact('contact'); setMenuOpen(false) }}>Contact <ArrowRight size={14} /></button>
          </nav>
          <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-noise" />
          <div className="hero-orbit hero-orbit--one" />
          <div className="hero-orbit hero-orbit--two" />
          <div className="shell hero-layout">
            <motion.div
              className="hero-copy"
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="hero-kicker"><span /> AI Systems · Agentic AI · RAG</p>
              <h1>I build systems <em>around</em> AI.</h1>
              <p className="hero-lede">
                I’m Dhruv Gupta, a final-year Computer Science student building practical AI products where models sit inside retrieval, rules, state, validation, permissions, traces, evaluation, fallback paths, and human review.
              </p>
              <div className="hero-actions">
                <a className="button button--light" href="#work">See selected work <ArrowRight size={17} /></a>
                <button className="button button--ghost" onClick={() => openContact('contact')}>Start a conversation <Mail size={17} /></button>
                <button className="hero-text-action" onClick={() => openContact('resume')}>Request resume <ArrowRight size={15} /></button>
              </div>
              <div className="hero-meta" aria-label="Profile highlights">
                <span>Final-year B.Tech CSE · KIIT</span>
                <span>GATE DA 2026 · AIR 1109</span>
                <span>Deployed systems + demos</span>
              </div>
            </motion.div>

            <motion.div
              className="hero-console"
              initial={reduceMotion ? undefined : { opacity: 0, x: 28 }}
              animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              aria-label="AI system architecture motif"
            >
              <div className="console-header">
                <span><i /> system_trace</span>
                <span>live portfolio</span>
              </div>
              <div className="console-body">
                <p className="console-comment">// model output is only one layer</p>
                {['retrieval', 'state + rules', 'validation', 'human review', 'evaluation'].map((item, index) => (
                  <motion.div
                    className="console-row"
                    key={item}
                    initial={reduceMotion ? undefined : { opacity: 0, x: 10 }}
                    animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                    transition={{ delay: 0.36 + index * 0.09 }}
                  >
                    <span className="console-index">0{index + 1}</span>
                    <span>{item}</span>
                    <CheckCircle2 size={15} />
                  </motion.div>
                ))}
              </div>
              <div className="console-footer">
                <span>status</span>
                <strong>inspectable</strong>
              </div>
            </motion.div>
          </div>
          <a className="scroll-cue" href="#work" aria-label="Scroll to selected work"><ChevronDown size={18} /></a>
        </section>

        <section className="intro-strip">
          <div className="shell intro-strip__inner">
            <p>My strongest work sits at the intersection of <strong>AI systems, retrieval, workflow design, backend engineering, and evaluation.</strong></p>
            <div className="intro-links">
              <a href={links.github} target="_blank" rel="noreferrer"><GitHubMark /> GitHub</a>
              <a href={links.linkedin} target="_blank" rel="noreferrer"><LinkedInMark /> LinkedIn</a>
            </div>
          </div>
        </section>

        <section className="section work-section" id="work">
          <div className="shell">
            <motion.div className="section-heading" {...reveal}>
              <p className="section-label">Selected work</p>
              <div>
                <h2>Five systems worth opening.</h2>
                <p>Curated by engineering signal and proof quality, not by chronology.</p>
              </div>
            </motion.div>

            <div className="project-list">
              {projects.map((project, index) => (
                <motion.article className="project" key={project.name} {...reveal}>
                  <div className="project-head">
                    <span className="project-number">{project.number}</span>
                    <p>{project.category}</p>
                  </div>
                  <div className="project-grid">
                    <ProjectVisual tone={project.tone} />
                    <div className="project-copy">
                      <h3>{project.name}</h3>
                      <p className="project-summary">{project.summary}</p>
                      <p className="project-detail">{project.detail}</p>
                      <div className="signal-row">
                        {project.signals.map((signal) => <span key={signal}><ShieldCheck size={13} /> {signal}</span>)}
                      </div>
                      <div className="stack-row">
                        {project.stack.map((tech) => <span key={tech}>{tech}</span>)}
                      </div>
                      <div className="project-links">
                        <a href={project.repo} target="_blank" rel="noreferrer"><GitHubMark /> Code</a>
                        {project.live && <a href={project.live} target="_blank" rel="noreferrer"><ExternalLink size={16} /> Live</a>}
                        {project.demo && <a href={project.demo} target="_blank" rel="noreferrer"><Play size={16} /> Demo</a>}
                      </div>
                    </div>
                  </div>
                  {index < projects.length - 1 && <div className="project-divider" />}
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section approach-section" id="approach">
          <div className="shell">
            <motion.div className="section-heading section-heading--light" {...reveal}>
              <p className="section-label">How I work</p>
              <div>
                <h2>The model is not the architecture.</h2>
                <p>I care about what happens before, around, and after the model call.</p>
              </div>
            </motion.div>
            <div className="principle-grid">
              {principles.map(([title, text], index) => (
                <motion.article className="principle-card" key={title} {...reveal} transition={{ duration: 0.58, delay: index * 0.05 }}>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="shell about-layout">
            <motion.div className="about-title" {...reveal}>
              <p className="section-label">About</p>
              <h2>I’m building toward AI systems engineering, one real system at a time.</h2>
            </motion.div>
            <motion.div className="about-copy" {...reveal}>
              <p>
                I’m a final-year B.Tech Computer Science student at KIIT. I’m most interested in products where the LLM is only one component: surrounded by retrieval, state, permissions, validation, evaluation, and human judgment.
              </p>
              <p>
                My projects span industrial GraphRAG, agent safety review, source-grounded learning, controlled planning, and full-stack workflow systems. I like the parts that force engineering decisions: failure paths, traceability, data boundaries, approval flows, and how to test something non-deterministic without hand-waving.
              </p>
              <div className="about-facts">
                <div><strong>9.45</strong><span>CGPA</span></div>
                <div><strong>1109</strong><span>GATE DA AIR</span></div>
                <div><strong>5</strong><span>Flagship systems</span></div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section more-work-section">
          <div className="shell">
            <motion.div className="section-heading" {...reveal}>
              <p className="section-label">More work</p>
              <div>
                <h2>Earlier builds and supporting projects.</h2>
                <p>Useful context, kept secondary so the strongest systems stay easy to find.</p>
              </div>
            </motion.div>
            <div className="more-work-grid">
              {supporting.map(([name, description, href]) => (
                <motion.a className="more-work-card" href={href} target="_blank" rel="noreferrer" key={name} {...reveal}>
                  <div>
                    <h3>{name}</h3>
                    <p>{description}</p>
                  </div>
                  <ArrowRight size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-cta">
          <div className="shell contact-cta__inner">
            <motion.div {...reveal}>
              <p className="section-label">Open to the right opportunities</p>
              <h2>If the role involves building serious AI systems, I’d like to hear about it.</h2>
            </motion.div>
            <motion.div className="contact-cta__actions" {...reveal}>
              <button className="button button--light" onClick={() => openContact('contact')}>Contact me <ArrowRight size={17} /></button>
              <button className="text-button-light" onClick={() => openContact('resume')}>Request resume <ArrowRight size={15} /></button>
              <a href={links.github} target="_blank" rel="noreferrer">Browse GitHub <ExternalLink size={15} /></a>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <div>
            <span className="brand-mark brand-mark--footer">DG</span>
            <p>Dhruv Gupta · AI Systems Builder</p>
          </div>
          <div className="footer-links">
            <a href={links.email}>Email</a>
            <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
          <p className="footer-note">Built to make the engineering work easier to inspect.</p>
        </div>
      </footer>

      <ContactModal key={contactMode} open={contactOpen} mode={contactMode} onClose={() => setContactOpen(false)} />
    </>
  )
}
