import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import {
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Search,
  CheckCircle,
  FileText,
  CheckCircle2,
} from 'lucide-react'
import { projects } from '../data/projects'
import { CardSpotlight } from '../components/motion/CardSpotlight'
import { StatCounter } from '../components/motion/StatCounter'
import { GitHubMark, LinkedInMark, DevpostMark } from '../components/SocialIcons'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

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

  useDocumentTitle(
    'Dhruv Gupta — AI Systems Builder',
    'AI models are powerful, but real-world products need solid software engineering around them. I design full-stack applications with accurate search, safety guardrails, and human review gates.'
  )

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-20px' },
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
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
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
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
            </div>

            {/* Credential Metrics Strip */}
            <div className="hero-stats-row">
              <div className="hero-stat-card">
                <strong className="hero-stat-value">
                  <StatCounter value={9.45} decimals={2} />
                </strong>
                <span className="hero-stat-label">CGPA · B.Tech CSE</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat-card">
                <strong className="hero-stat-value">
                  <StatCounter value={2027} prefix="July " />
                </strong>
                <span className="hero-stat-label">Graduation Year</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat-card">
                <strong className="hero-stat-value">
                  <StatCounter value={projects.length} />
                </strong>
                <span className="hero-stat-label">Systems Built</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Centered Social Profile Links Bar */}
      <section className="profile-links-bar">
        <div className="shell profile-links-bar__inner">
          <a
            href="https://github.com/Dhruvg334"
            target="_blank"
            rel="noopener noreferrer"
            className="profile-link-btn"
          >
            <GitHubMark size={16} />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/dhruv-gupta-7a7500287/"
            target="_blank"
            rel="noopener noreferrer"
            className="profile-link-btn"
          >
            <LinkedInMark size={16} />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://devpost.com/Dhruvg334"
            target="_blank"
            rel="noopener noreferrer"
            className="profile-link-btn"
          >
            <DevpostMark size={16} />
            <span>Devpost</span>
          </a>
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
            <motion.div {...reveal} transition={{ duration: 0.35, delay: 0 }}>
              <CardSpotlight className="pillar-card">
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
              </CardSpotlight>
            </motion.div>

            <motion.div {...reveal} transition={{ duration: 0.35, delay: 0.06 }}>
              <CardSpotlight className="pillar-card">
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
              </CardSpotlight>
            </motion.div>

            <motion.div {...reveal} transition={{ duration: 0.35, delay: 0.12 }}>
              <CardSpotlight className="pillar-card">
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
              </CardSpotlight>
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
            {featuredProjects.map((p, idx) => (
              <motion.div key={p.id} {...reveal} transition={{ duration: 0.35, delay: idx * 0.05 }}>
                <CardSpotlight className="featured-card">
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
                </CardSpotlight>
              </motion.div>
            ))}
          </div>

          <div className="center-cta-wrap">
            <Link to="/projects" className="btn btn--primary btn--large">
              Explore All {projects.length} Architectural Case Studies <ArrowRight size={16} />
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
                key={principle.title}
                {...reveal}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <CardSpotlight className="principle-box">
                  <span className="p-num">{principle.number}</span>
                  <h3 className="p-title">{principle.title}</h3>
                  <p className="p-summary">{principle.summary}</p>
                </CardSpotlight>
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
              I also qualified GATE DA (Data Science & AI) 2026 (AIR 1109), backing practical product engineering with strong foundations in algorithms, databases, and mathematics.
            </p>

            <div className="about-stats-grid">
              <div className="about-stat-card">
                <strong className="about-stat-value">
                  <StatCounter value={9.45} decimals={2} />
                </strong>
                <span className="about-stat-label">CGPA · KIIT CSE</span>
              </div>
              <div className="about-stat-card">
                <strong className="about-stat-value">
                  <StatCounter value={2027} prefix="July " />
                </strong>
                <span className="about-stat-label">Graduation Year</span>
              </div>
              <div className="about-stat-card">
                <strong className="about-stat-value">
                  AIR 1109
                </strong>
                <span className="about-stat-label">GATE DA 2026</span>
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
