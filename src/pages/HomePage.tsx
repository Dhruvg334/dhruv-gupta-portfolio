import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import {
  ArrowRight,
  ShieldCheck,
  Network,
  Cpu,
  FileText,
  Mail,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react'
import { projects } from '../data/projects'
import { engineeringPrinciples } from '../data/competencies'

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
      {/* Centered Hero Section */}
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
            {/* Clean Pill without duplicate avatar */}
            <div className="hero-status-pill">
              <span className="status-dot-emerald" />
              <span>B.Tech CSE @ KIIT · Graduating July 2027</span>
            </div>

            <h1 className="home-hero-title">
              I build reliable software systems <span className="highlight-text">around AI models</span>.
            </h1>

            <p className="home-hero-intro">
              AI models generate text, but real production applications require strict validation rules, clean knowledge retrieval, security guardrails, and human review gates. I design and build full-stack architectures that make agentic workflows predictable, safe, and verifiable.
            </p>

            <div className="home-hero-cta">
              <Link to="/projects" className="btn btn--primary">
                Explore Projects & Case Studies <ArrowRight size={15} />
              </Link>
              <Link to="/contact?tab=resume" className="btn btn--secondary">
                <FileText size={15} /> Request Resume
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
                <strong>5</strong>
                <span>Architectures Built</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Socials & Summary Bar */}
      <section className="intro-bar">
        <div className="shell intro-bar__inner">
          <p>
            Focused on <strong>knowledge graphs (Neo4j), agent security gates, deterministic planning, and evaluation harnesses.</strong>
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

      {/* Core Engineering Pillars (What I Build) */}
      <section className="section pillars-section">
        <div className="shell">
          <motion.div className="section-heading text-center" {...reveal}>
            <p className="section-label">Core Specialization</p>
            <h2>What I focus on when building AI systems.</h2>
            <p>
              Moving beyond basic prompt engineering into full-stack systems engineering that solves the real operational challenges of AI.
            </p>
          </motion.div>

          <div className="pillars-grid">
            <motion.div className="pillar-card" {...reveal}>
              <div className="pillar-icon">
                <Network size={24} />
              </div>
              <h3>1. Knowledge Graphs & Hybrid RAG</h3>
              <p>
                Connecting unstructured documentation to structured relational schemas and Neo4j entity graphs. Fusing vector similarity with exact keyword codes and multi-hop relationship traversals for precise, hallucination-resistant retrieval.
              </p>
              <ul className="pillar-bullets">
                <li><CheckCircle2 size={14} /> Neo4j graph projections & Cypher queries</li>
                <li><CheckCircle2 size={14} /> pgvector & Qdrant hybrid search</li>
                <li><CheckCircle2 size={14} /> Scoped multi-tenant asset hierarchies</li>
              </ul>
            </motion.div>

            <motion.div className="pillar-card" {...reveal}>
              <div className="pillar-icon">
                <ShieldCheck size={24} />
              </div>
              <h3>2. Agent Safety & Policy Guardrails</h3>
              <p>
                Enforcing strict deterministic boundaries before and after model invocation. Screening for prompt injection, preventing unauthorized tool execution, and establishing durable approval checkpoints in PostgreSQL for high-impact actions.
              </p>
              <ul className="pillar-bullets">
                <li><CheckCircle2 size={14} /> Static AST tool sink inspection</li>
                <li><CheckCircle2 size={14} /> 16-point guardrail verification matrix</li>
                <li><CheckCircle2 size={14} /> Durable human-in-the-loop sign-offs</li>
              </ul>
            </motion.div>

            <motion.div className="pillar-card" {...reveal}>
              <div className="pillar-icon">
                <Cpu size={24} />
              </div>
              <h3>3. Testing & Evaluation Suites</h3>
              <p>
                Building reproducible, offline regression test harnesses to measure pipeline accuracy, citation precision, and abstention behavior without relying blindly on expensive live model calls or vibe-based checks.
              </p>
              <ul className="pillar-bullets">
                <li><CheckCircle2 size={14} /> Deterministic regression benchmarks</li>
                <li><CheckCircle2 size={14} /> Span-level OpenTelemetry (Arize AX)</li>
                <li><CheckCircle2 size={14} /> Pytest & Vitest test suites</li>
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
              <h2>Production architectures with full case studies.</h2>
              <p>
                Each system includes deep documentation, interactive Mermaid architecture diagrams, tradeoffs, and live deployments.
              </p>
            </motion.div>
            <motion.div {...reveal}>
              <Link to="/projects" className="btn btn--secondary">
                View All 5 Projects <ArrowRight size={15} />
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
                    Read Architecture Case Study <ArrowRight size={14} />
                  </Link>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="btn btn--secondary">
                      <ExternalLink size={14} /> Live Product
                    </a>
                  )}
                  <a href={p.repo} target="_blank" rel="noreferrer" className="btn btn--ghost">
                    <GitHubMark size={14} /> Code
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="center-cta-wrap">
            <Link to="/projects" className="btn btn--secondary btn--large">
              Browse All Projects & Systems Archive <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Engineering Philosophy Snippet */}
      <section className="section philosophy-section">
        <div className="shell">
          <motion.div className="section-heading text-center" {...reveal}>
            <p className="section-label">Engineering Philosophy</p>
            <h2>The model is only one component in the machine.</h2>
            <p>
              How I approach software architecture before, around, and after model invocation.
            </p>
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

      {/* About & Education Section */}
      <section className="section about-summary-section">
        <div className="shell about-grid">
          <motion.div className="about-left" {...reveal}>
            <p className="section-label">Background & Academic Foundation</p>
            <h2>Engineering dependable software with mathematical grounding.</h2>
          </motion.div>

          <motion.div className="about-right" {...reveal}>
            <p>
              I am currently pursuing my <strong>B.Tech in Computer Science and Engineering at KIIT Bhubaneswar</strong>, graduating in <strong>July 2027 with a 9.45 CGPA</strong>.
            </p>
            <p>
              My engineering focus centers on deterministic boundaries for AI: combining knowledge graphs (Neo4j), vector databases (pgvector, Qdrant), static AST code analysis (A-DAP-T), and regression test harnesses (Vitest, Pytest) to make agentic workflows verifiable and safe.
            </p>
            <p>
              I also qualified GATE DA (Data Science & AI) 2026, pairing hands-on full-stack product building with strong mathematical fundamentals across linear algebra, calculus, probability, and database internals.
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
                <strong>5</strong>
                <span>Systems Built</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="contact-banner">
        <div className="shell contact-banner__inner">
          <motion.div {...reveal}>
            <p className="section-label">Open for Opportunities</p>
            <h2>Building serious AI systems? Let’s talk architecture.</h2>
          </motion.div>

          <motion.div className="contact-banner__actions" {...reveal}>
            <Link to="/contact" className="btn btn--primary">
              Start Conversation <ArrowRight size={15} />
            </Link>
            <Link to="/contact?tab=resume" className="btn btn--secondary">
              <FileText size={15} /> Request Resume
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
