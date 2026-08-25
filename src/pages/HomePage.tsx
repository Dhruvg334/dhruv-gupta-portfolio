import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import {
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Search,
  CheckCircle,
  FileText,
  Mail,
  CheckCircle2,
} from 'lucide-react'
import { projects } from '../data/projects'

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

const clearPrinciples = [
  {
    number: '01',
    title: 'Grounded in Evidence',
    summary: 'Every response must cite specific, verified source data before taking action or making recommendations.',
  },
  {
    number: '02',
    title: 'Safety by Design',
    summary: 'High-impact actions require clear verification and human review gates before touching databases.',
  },
  {
    number: '03',
    title: 'Controlled Workflows',
    summary: 'AI models handle reasoning, while deterministic software manages permissions, capacity, and scheduling.',
  },
  {
    number: '04',
    title: 'Measurable Quality',
    summary: 'Systems are tested continuously with automated benchmarks to ensure accuracy and catch bugs early.',
  },
]

export function HomePage() {
  const reduceMotion = useReducedMotion()
  const featuredProjects = projects.slice(0, 3)

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
      {/* Centered, Clean Hero Section */}
      <section className="home-hero">
        <div className="hero-glow hero-glow--left" />
        <div className="hero-glow hero-glow--right" />

        <div className="shell">
          <motion.div
            className="home-hero-content"
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Status Pill */}
            <div className="hero-status-pill">
              <span className="status-dot-emerald" />
              <span>B.Tech CSE @ KIIT · Graduating July 2027</span>
            </div>

            <h1 className="home-hero-title">
              I build reliable software systems <span className="highlight-text">around AI models</span>.
            </h1>

            <p className="home-hero-intro">
              AI models are powerful, but real-world products need solid software engineering around them. I design full-stack applications with accurate search, safety guardrails, and human review gates so that AI operates dependably in production.
            </p>

            <div className="home-hero-cta">
              <Link to="/projects" className="btn btn--primary">
                Explore Projects & Case Studies <ArrowRight size={15} />
              </Link>
              <Link to="/resume" className="btn btn--secondary">
                <FileText size={15} /> View Resume
              </Link>
              <Link to="/contact" className="btn btn--ghost">
                <Mail size={15} /> Get in Touch
              </Link>
            </div>

            {/* Credential Metrics Strip */}
            <div className="hero-stats-row">
              <div className="hero-stat-card">
                <strong>9.45</strong>
                <span>CGPA · B.Tech CSE</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat-card">
                <strong>July 2027</strong>
                <span>Graduation Year</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat-card">
                <strong>6</strong>
                <span>Systems Built</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Socials & Summary Bar */}
      <section className="intro-bar">
        <div className="shell intro-bar__inner">
          <p>
            Specialized in <strong>civic intelligence, GraphRAG search, AI safety scanners, smart planning tools, and full-stack web platforms.</strong>
          </p>
          <div className="intro-socials">
            <a href="https://github.com/Dhruvg334" target="_blank" rel="noopener noreferrer">
              <GitHubMark /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/dhruv-gupta-7a7500287/" target="_blank" rel="noopener noreferrer">
              <LinkedInMark /> LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* 3 Core Focus Pillars */}
      <section className="section pillars-section">
        <div className="shell">
          <motion.div className="section-heading text-center" {...reveal}>
            <p className="section-label">Core Focus Areas</p>
            <h2>What I focus on when building AI systems.</h2>
            <p>
              Turning raw AI capabilities into practical, reliable tools that businesses and users can trust every day.
            </p>
          </motion.div>

          <div className="pillars-grid">
            <motion.div className="pillar-card" {...reveal}>
              <div className="pillar-icon">
                <Search size={22} />
              </div>
              <h3>1. Intelligent Search & Knowledge</h3>
              <p>
                Connecting company documents, databases, and structured knowledge graphs so AI can answer complex questions with verified citations instead of guessing.
              </p>
              <ul className="pillar-bullets">
                <li><CheckCircle2 size={14} /> Knowledge graphs & database search</li>
                <li><CheckCircle2 size={14} /> Source evidence & citation checks</li>
                <li><CheckCircle2 size={14} /> Fast, accurate retrieval across formats</li>
              </ul>
            </motion.div>

            <motion.div className="pillar-card" {...reveal}>
              <div className="pillar-icon">
                <ShieldCheck size={22} />
              </div>
              <h3>2. Safety Checks & Guardrails</h3>
              <p>
                Setting clear boundaries around AI models. Screening inputs for security risks, preventing unauthorized actions, and requiring human approval before critical data is updated.
              </p>
              <ul className="pillar-bullets">
                <li><CheckCircle2 size={14} /> Security scanning for AI agents</li>
                <li><CheckCircle2 size={14} /> Permission controls and rule checks</li>
                <li><CheckCircle2 size={14} /> Human review before database changes</li>
              </ul>
            </motion.div>

            <motion.div className="pillar-card" {...reveal}>
              <div className="pillar-icon">
                <CheckCircle size={22} />
              </div>
              <h3>3. Automated Testing & Reliability</h3>
              <p>
                Writing automated test suites to measure accuracy, catch errors early, and ensure AI features remain reliable and consistent across application updates.
              </p>
              <ul className="pillar-bullets">
                <li><CheckCircle2 size={14} /> Comprehensive automated test suites</li>
                <li><CheckCircle2 size={14} /> Regression checks to prevent failures</li>
                <li><CheckCircle2 size={14} /> Real-time activity and error monitoring</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="section featured-section">
        <div className="shell">
          <div className="section-heading-split">
            <motion.div {...reveal}>
              <p className="section-label">Featured Work</p>
              <h2>Production systems with full case studies.</h2>
              <p>
                Each system includes interactive architecture diagrams, live demos, test metrics, and source code.
              </p>
            </motion.div>
            <motion.div {...reveal}>
              <Link to="/projects" className="btn btn--secondary">
                View All Projects <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>

          <div className="featured-cards-stack">
            {featuredProjects.map((p) => (
              <motion.div key={p.id} className="featured-card" {...reveal}>
                <div className="featured-card-header">
                  <div className="featured-card-num-tag">
                    <span className="card-num">{p.number}</span>
                    <span className="card-cat">{p.category}</span>
                  </div>
                  <div className="featured-metrics-row">
                    {p.metrics.slice(0, 2).map((m) => (
                      <div key={m.label} className="featured-metric-item">
                        <strong>{m.value}</strong>
                        <span>{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="featured-card-body">
                  <h3>{p.name}</h3>
                  <p className="featured-tagline">{p.tagline}</p>
                  <p className="featured-summary">{p.summary}</p>

                  <div className="featured-stack-pills">
                    {p.stack.slice(0, 6).map((tech) => (
                      <span key={tech} className="tech-pill">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="featured-card-actions">
                  <Link to={`/projects/${p.id}`} className="btn btn--primary">
                    Read Case Study <ArrowRight size={14} />
                  </Link>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn btn--secondary">
                      <ExternalLink size={14} /> Live App
                    </a>
                  )}
                  <a href={p.repo} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                    <GitHubMark size={14} /> GitHub
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="center-cta-wrap">
            <Link to="/projects" className="btn btn--primary btn--large">
              Explore All 6 Architectural Case Studies <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Engineering Philosophy Section */}
      <section className="section philosophy-section">
        <div className="shell">
          <motion.div className="section-heading text-center" {...reveal}>
            <p className="section-label">Core Philosophy</p>
            <h2>How I approach software engineering.</h2>
            <p>
              Four practical principles I follow when designing applications, APIs, and systems.
            </p>
          </motion.div>

          <div className="principles-grid">
            {clearPrinciples.map((principle, index) => (
              <motion.div
                className="principle-box"
                key={principle.title}
                {...reveal}
                transition={{ duration: 0.45, delay: index * 0.05 }}
              >
                <span className="p-num">{principle.number}</span>
                <h3 className="p-title">{principle.title}</h3>
                <p className="p-summary">{principle.summary}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About & Education Section */}
      <section className="section about-summary-section">
        <div className="shell about-grid">
          <motion.div className="about-left" {...reveal}>
            <p className="section-label">Background & Education</p>
            <h2>Passionate about building software that solves real problems.</h2>
          </motion.div>

          <motion.div className="about-right" {...reveal}>
            <p>
              I am a final-year student pursuing my <strong>B.Tech in Computer Science and Engineering at KIIT Bhubaneswar</strong>, graduating in <strong>July 2027 with a 9.45 CGPA</strong>.
            </p>
            <p>
              My focus is building practical software products where AI enhances human productivity rather than replacing common-sense safeguards. I pair modern web frameworks (React, Next.js, TypeScript) with robust backends (FastAPI, PostgreSQL, Neo4j) and thorough automated tests.
            </p>
            <p>
              I also qualified GATE DA (Data Science & AI) 2026, backing practical product engineering with strong foundations in algorithms, databases, and mathematics.
            </p>

            <div className="about-stats-grid">
              <div className="stat-box">
                <strong>9.45</strong>
                <span>CGPA · B.Tech CSE</span>
              </div>
              <div className="stat-box">
                <strong>July 2027</strong>
                <span>Graduation Year</span>
              </div>
              <div className="stat-box">
                <strong>6</strong>
                <span>Systems Built</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact & Discussion Callout Banner */}
      <section className="contact-banner">
        <div className="shell contact-banner__inner">
          <motion.div {...reveal}>
            <p className="section-label">Ready to connect?</p>
            <h2>Let's build something reliable together.</h2>
            <p className="page-subtitle">
              Open to technical internships, engineering roles, and open-source systems collaboration.
            </p>
          </motion.div>
          <motion.div className="contact-banner__actions" {...reveal}>
            <Link to="/contact" className="btn btn--primary btn--large">
              Start a Conversation <ArrowRight size={15} />
            </Link>
            <Link to="/resume" className="btn btn--secondary btn--large">
              <FileText size={15} /> Resume
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
