import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  Printer,
  Mail,
  Phone,
  ExternalLink,
  Award,
  Calendar,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Code2,
  Layers,
  Share2,
} from 'lucide-react'
import { Toast } from '../components/Toast'
import { GitHubMark, LinkedInMark, DevpostMark } from '../components/SocialIcons'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function ResumePage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const reduceMotion = useReducedMotion()

  useDocumentTitle(
    'Resume & Credentials · Dhruv Gupta',
    'Curriculum Vitae for Dhruv Gupta: Final-year B.Tech CSE @ KIIT (9.45 CGPA), GATE DA 2026 AIR 1109, engineering projects, and system architectures.'
  )

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    showToast('Resume link copied to clipboard!')
  }

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.1 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
      }

  return (
    <div className="page-wrapper resume-page">
      {/* Top Action Toolbar (Hidden during print) */}
      <section className="resume-toolbar no-print">
        <div className="shell resume-toolbar__inner">
          <div className="toolbar-left">
            <span className="toolbar-tag">
              Curriculum Vitae
            </span>
            <span className="toolbar-updated">Dhruv Gupta · KIIT CSE '27</span>
          </div>

          <div className="toolbar-actions">
            <button onClick={handlePrint} className="btn btn--primary" title="Print or Save as PDF">
              <Printer size={15} /> Print / Save as PDF
            </button>
            <button onClick={handleShare} className="btn btn--secondary" title="Share Resume Link">
              <Share2 size={15} /> Copy Link
            </button>
          </div>
        </div>
      </section>

      {/* Main Resume Document Sheet */}
      <main className="resume-sheet-container">
        <div className="shell">
          <motion.article className="resume-paper" {...reveal}>
            {/* Document Header */}
            <header className="resume-header">
              <div className="resume-header-top">
                <div>
                  <h1 className="resume-name">Dhruv Gupta</h1>
                  <p className="resume-role">
                    AI Systems Builder <span className="sep">|</span> Agentic AI <span className="sep">|</span> RAG <span className="sep">|</span> Full-Stack AI Products
                  </p>
                </div>
              </div>

              <div className="resume-contact-bar">
                <a href="tel:+919968463440" className="resume-contact-item">
                  <Phone size={13} /> +91 99684 63440
                </a>
                <a href="mailto:dhruvg3304@gmail.com" className="resume-contact-item">
                  <Mail size={13} /> dhruvg3304@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/dhruv-gupta-7a7500287/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-contact-item"
                >
                  <LinkedInMark size={13} /> LinkedIn
                </a>
                <a
                  href="https://github.com/Dhruvg334"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-contact-item"
                >
                  <GitHubMark size={13} /> GitHub
                </a>
                <a
                  href="https://devpost.com/Dhruvg334"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-contact-item"
                >
                  <DevpostMark size={13} /> Devpost
                </a>
                <a
                  href="https://dhruvg334.github.io/dhruv-gupta-portfolio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-contact-item"
                >
                  <ExternalLink size={13} /> Portfolio
                </a>
              </div>
            </header>

            {/* Summary Section */}
            <section className="resume-section">
              <h2 className="resume-section-title">
                <Layers size={16} /> Summary
              </h2>
              <p className="resume-summary-text">
                Final-year B.Tech CSE student building practical AI systems around retrieval, agent workflows, backend APIs, deterministic validation, human review, evaluation, auditability, and deployment. Built live projects across multimodal civic intelligence (Civitas), industrial GraphRAG (Mnemos), controlled agentic planning (ChronOS), AI-agent safety review (A-DAP-T), and source-grounded learning systems (Tessarion). GATE Data Science and Artificial Intelligence 2026 – AIR 1109.
              </p>
            </section>

            {/* Education Section */}
            <section className="resume-section">
              <h2 className="resume-section-title">
                <GraduationCap size={16} /> Education
              </h2>
              <div className="resume-entry">
                <div className="entry-header">
                  <div className="entry-title-group">
                    <h3 className="entry-role-title">B.Tech in Computer Science and Engineering</h3>
                    <span className="entry-org">Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar</span>
                    <span className="entry-degree">Cumulative Grade: <strong>9.45 / 10.0 CGPA</strong></span>
                  </div>
                  <div className="entry-meta">
                    <span className="entry-date">Expected Graduation: July 2027</span>
                    <span className="entry-loc">Bhubaneswar, Odisha</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Work & Internship Experience */}
            <section className="resume-section">
              <h2 className="resume-section-title">
                <Briefcase size={16} /> Experience & Internships
              </h2>

              {/* KIIT Internship */}
              <div className="resume-entry">
                <div className="entry-header">
                  <div className="entry-title-group">
                    <h3 className="entry-role-title">AI / ML Intern</h3>
                    <span className="entry-org">KIIT School of Computer Applications</span>
                  </div>
                  <div className="entry-meta">
                    <span className="entry-date">May 2026 – Jul 2026</span>
                    <span className="entry-loc">Bhubaneswar, Odisha</span>
                  </div>
                </div>
                <ul className="entry-bullets">
                  <li>
                    Completed an 8-week summer internship spanning NLP, cybersecurity, image processing, deep learning, agentic AI, software engineering, and production deployment under faculty mentorship.
                  </li>
                  <li>
                    Delivered the <em>Sahayak AI</em> student-support system through multi-turn conversational support, academic task flows, diagnostic reasoning, and an invention disclosure.
                  </li>
                </ul>
              </div>

              {/* InAmigos Internship */}
              <div className="resume-entry">
                <div className="entry-header">
                  <div className="entry-title-group">
                    <h3 className="entry-role-title">AI Web Development Intern</h3>
                    <span className="entry-org">InAmigos Foundation</span>
                  </div>
                  <div className="entry-meta">
                    <span className="entry-date">May 2026</span>
                    <span className="entry-loc">Remote</span>
                  </div>
                </div>
                <ul className="entry-bullets">
                  <li>
                    Audited NGO website flows and documented frontend, layout, content, and UI/UX improvement opportunities with annotated recommendations.
                  </li>
                  <li>
                    Built portfolio/web pages and Figma feature mockups, converting vague NGO requirements into clearer page structure, interaction ideas, and implementation-ready design notes.
                  </li>
                </ul>
              </div>
            </section>

            {/* Projects Section */}
            <section className="resume-section">
              <h2 className="resume-section-title">
                <FolderGit2 size={16} /> Featured Projects
              </h2>

              {/* Civitas */}
              <div className="resume-entry">
                <div className="entry-header">
                  <div className="entry-title-group">
                    <div className="proj-title-row">
                      <h3 className="entry-role-title">Civitas – Multimodal Civic Incident Intelligence</h3>
                      <div className="resume-proj-links no-print">
                        <a href="https://civitas-web.vercel.app" target="_blank" rel="noopener noreferrer" className="pill-link">
                          <ExternalLink size={11} /> Live
                        </a>
                        <a href="https://github.com/Dhruvg334/civitas" target="_blank" rel="noopener noreferrer" className="pill-link">
                          <GitHubMark size={11} /> Code
                        </a>
                      </div>
                    </div>
                    <span className="entry-stack">
                      Next.js 16, React 19, TypeScript, FastAPI, PostGIS, H3 Spatial, LangGraph, Groq, CLIP, Leaflet
                    </span>
                  </div>
                </div>
                <ul className="entry-bullets">
                  <li>
                    Built a multimodal civic incident platform converting citizen reports across Web PWA, WhatsApp, Telegram, and Open311 into structured work orders with policy-grounded routing and SHA-256 audit certificates.
                  </li>
                  <li>
                    Implemented client-side canvas downsampling (40MB to &lt;1.2MB in &lt;200ms), PostGIS spatial context, H3 hexagonal indexing (Resolution 8/9), and decoupled Severity vs. Priority scoring with school/hospital SLA acceleration.
                  </li>
                  <li>
                    Engineered hybrid BM25 + dense RRF policy retrieval ($k=60$) achieving <strong>99.2% statutory routing precision</strong>, automated Schedule of Rates (SOR) BOQ costing, and 64-bit dHash anti-fraud verification.
                  </li>
                </ul>
              </div>

              {/* Mnemos */}
              <div className="resume-entry">
                <div className="entry-header">
                  <div className="entry-title-group">
                    <div className="proj-title-row">
                      <h3 className="entry-role-title">Mnemos – Industrial Knowledge Intelligence</h3>
                      <div className="resume-proj-links no-print">
                        <a href="https://mnemos-lake.vercel.app" target="_blank" rel="noopener noreferrer" className="pill-link">
                          <ExternalLink size={11} /> Live
                        </a>
                        <a href="https://github.com/Dhruvg334/Mnemos" target="_blank" rel="noopener noreferrer" className="pill-link">
                          <GitHubMark size={11} /> Code
                        </a>
                      </div>
                    </div>
                    <span className="entry-stack">
                      Next.js 16, React 19, FastAPI, PostgreSQL, pgvector, Neo4j, Redis, LangGraph, OpenTelemetry
                    </span>
                  </div>
                </div>
                <ul className="entry-bullets">
                  <li>
                    Built an asset-centric operational memory platform connecting manuals, work orders, inspections, procedures, compliance evidence, expert notes, and asset timelines into governed industrial knowledge workflows.
                  </li>
                  <li>
                    Implemented hybrid retrieval using vector, lexical, structured, graph, and bounded multi-hop strategies with reranking, provenance checks, contradiction handling, confidence scoring, and missing-evidence disclosure.
                  </li>
                  <li>
                    <strong>Business impact:</strong> reduces maintenance and compliance search friction through evidence-backed root cause analysis (RCA), asset passports, compliance-gap workflows, and a governed investigation runtime with durable checkpoints and approval gates.
                  </li>
                </ul>
              </div>

              {/* ChronOS */}
              <div className="resume-entry">
                <div className="entry-header">
                  <div className="entry-title-group">
                    <div className="proj-title-row">
                      <h3 className="entry-role-title">ChronOS – Adaptive Execution System</h3>
                      <div className="resume-proj-links no-print">
                        <a href="https://chronos-dhruv.netlify.app" target="_blank" rel="noopener noreferrer" className="pill-link">
                          <ExternalLink size={11} /> Live
                        </a>
                        <a href="https://github.com/Dhruvg334/Chronos" target="_blank" rel="noopener noreferrer" className="pill-link">
                          <GitHubMark size={11} /> Code
                        </a>
                      </div>
                    </div>
                    <span className="entry-stack">
                      React 19, TypeScript, Vite, FastAPI, Supabase Auth/Postgres/RLS/Vault, pgvector, Groq, Render, Netlify
                    </span>
                  </div>
                </div>
                <ul className="entry-bullets">
                  <li>
                    Built a full-stack personal execution system turning commitments, projects, routines, preferences, and calendar constraints into realistic daily and weekly plans with approval-based recovery.
                  </li>
                  <li>
                    Implemented bounded AI workflows for intake, planning, retrieval, explanation, and recovery while deterministic services own feasibility, overlap detection, capacity, dependencies, permissions, approvals, and persistence.
                  </li>
                  <li>
                    Verified the release with <strong>158 backend tests, 37 frontend tests</strong>, RLS isolation, atomic transaction coverage, deployment tests, and 105 curated synthetic evaluation cases.
                  </li>
                </ul>
              </div>

              {/* A-DAP-T */}
              <div className="resume-entry">
                <div className="entry-header">
                  <div className="entry-title-group">
                    <div className="proj-title-row">
                      <h3 className="entry-role-title">A-DAP-T – AI-Agent Deployment Safety Review</h3>
                      <div className="resume-proj-links no-print">
                        <a href="https://a-dap-t.vercel.app" target="_blank" rel="noopener noreferrer" className="pill-link">
                          <ExternalLink size={11} /> Live
                        </a>
                        <a href="https://github.com/Dhruvg334/A-DAP-T" target="_blank" rel="noopener noreferrer" className="pill-link">
                          <GitHubMark size={11} /> Code
                        </a>
                      </div>
                    </div>
                    <span className="entry-stack">
                      Next.js, TypeScript, FastAPI, Firebase Auth, Firestore, Gemini, Vercel, Render
                    </span>
                  </div>
                </div>
                <ul className="entry-bullets">
                  <li>
                    Built a deployed AI-agent safety review platform scanning GitHub repositories and ZIP uploads for exposed secrets, unsafe tools, missing approval gates, weak auditability, and sensitive-data risks.
                  </li>
                  <li>
                    Implemented security surface mapping, 16-point guardrail matrix, deterministic release policy checks, static attack simulations, and automated code remediation diff generation.
                  </li>
                  <li>
                    Won <strong>3rd Prize at Global Tech Innovation 2026</strong> and <strong>Technical Excellence at Devlynix Buildathon 2.0</strong>.
                  </li>
                </ul>
              </div>

              {/* Tessarion */}
              <div className="resume-entry">
                <div className="entry-header">
                  <div className="entry-title-group">
                    <div className="proj-title-row">
                      <h3 className="entry-role-title">Tessarion – Evidence-Linked Learning</h3>
                      <div className="resume-proj-links no-print">
                        <a href="https://github.com/Dhruvg334/Tessarion" target="_blank" rel="noopener noreferrer" className="pill-link">
                          <GitHubMark size={11} /> Code
                        </a>
                      </div>
                    </div>
                    <span className="entry-stack">
                      Next.js 16, React 19, TypeScript, Supabase, Qdrant contracts, Neo4j projections, Cytoscape.js
                    </span>
                  </div>
                </div>
                <ul className="entry-bullets">
                  <li>
                    Built a source-grounded learning workspace where learners teach concepts back, receive evidence-linked diagnosis, explore concept graphs, and recover through guided tutoring workflows.
                  </li>
                  <li>
                    Implemented concept extraction, hybrid retrieval, graph-supported context, teach-back diagnosis, mastery/review logic, Socratic tutoring policies, and 50+ automated Vitest evaluation benchmarks.
                  </li>
                </ul>
              </div>

              {/* Niswarth AI */}
              <div className="resume-entry">
                <div className="entry-header">
                  <div className="entry-title-group">
                    <div className="proj-title-row">
                      <h3 className="entry-role-title">Niswarth AI – NGO Governance & Multi-Agent Compliance</h3>
                      <div className="resume-proj-links no-print">
                        <a href="https://github.com/Dhruvg334/Niswarth-AI" target="_blank" rel="noopener noreferrer" className="pill-link">
                          <GitHubMark size={11} /> Code
                        </a>
                      </div>
                    </div>
                    <span className="entry-stack">
                      FastAPI, Python, LangGraph, PostgreSQL, pgvector, Docker, React 19, TypeScript
                    </span>
                  </div>
                </div>
                <ul className="entry-bullets">
                  <li>
                    Built an autonomous multi-agent document analysis and compliance platform that extracts structured fiscal entities from unstructured invoices, receipts, and bank statements.
                  </li>
                  <li>
                    Implemented specialized LangGraph auditor and compliance agents that cross-reference itemized expenses against statutory grant allocations with deterministic ledger arithmetic.
                  </li>
                  <li>
                    Enforced organization-level data isolation with PostgreSQL Row-Level Security (RLS) and sealed verified donor impact summaries with cryptographic SHA-256 audit digests.
                  </li>
                </ul>
              </div>
            </section>

            {/* Achievements & Certifications */}
            <section className="resume-section">
              <h2 className="resume-section-title">
                <Award size={16} /> Achievements & Certifications
              </h2>
              <div className="resume-cert-grid">
                <div className="cert-item">
                  <strong>3rd Prize – Global Tech Innovation 2026</strong>
                  <p>Awarded for A-DAP-T agent deployment safety review platform.</p>
                </div>
                <div className="cert-item">
                  <strong>Technical Excellence – Devlynix Buildathon 2.0</strong>
                  <p>Recognized for deterministic AI safety and guardrail engineering.</p>
                </div>
                <div className="cert-item">
                  <strong>Winner – Zero to Live Challenge</strong>
                  <p>Awarded for Shodhak interactive career roadmap graph.</p>
                </div>
                <div className="cert-item">
                  <strong>GATE DA 2026 – AIR 1109</strong>
                  <p>Qualified in Data Science & Artificial Intelligence.</p>
                </div>
                <div className="cert-item">
                  <strong>Agentic AI Professional Training (70 Hours)</strong>
                  <p>Comprehensive agentic workflow curriculum by ExcelR with KIIT.</p>
                </div>
                <div className="cert-item">
                  <strong>Summer Internship Certificate</strong>
                  <p>8-week AI/ML research program at KIIT School of Computer Applications.</p>
                </div>
              </div>
            </section>

            {/* Technical Skills Stack */}
            <section className="resume-section">
              <h2 className="resume-section-title">
                <Code2 size={16} /> Technical Skills
              </h2>
              <div className="resume-skills-stack">
                <div className="skill-row">
                  <span className="skill-category">Programming Languages:</span>
                  <span className="skill-items">Python, TypeScript, JavaScript, SQL, Cypher (Neo4j)</span>
                </div>
                <div className="skill-row">
                  <span className="skill-category">AI & Agentic Systems:</span>
                  <span className="skill-items">LangGraph, GraphRAG, Hybrid Retrieval (RRF), Prompt Engineering, Static AST Scanning, Guardrails</span>
                </div>
                <div className="skill-row">
                  <span className="skill-category">Backend & Databases:</span>
                  <span className="skill-items">FastAPI, Pydantic, PostgreSQL, PostGIS, pgvector, Neo4j, Qdrant, Redis, Supabase, Firebase</span>
                </div>
                <div className="skill-row">
                  <span className="skill-category">Frontend & UI/UX:</span>
                  <span className="skill-items">Next.js 16, React 19, Vite, Tailwind CSS, Motion, Leaflet, Cytoscape.js, Mermaid.js</span>
                </div>
                <div className="skill-row">
                  <span className="skill-category">Testing & DevOps:</span>
                  <span className="skill-items">pytest, Vitest, Docker, Git, GitHub Actions, Vercel, Netlify, Render</span>
                </div>
              </div>
            </section>
          </motion.article>
        </div>
      </main>

      {/* Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  )
}
