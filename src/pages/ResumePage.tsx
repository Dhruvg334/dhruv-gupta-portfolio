import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  Printer,
  Download,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Award,
  CheckCircle2,
  Calendar,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Code2,
  Layers,
  Sparkles,
  Share2,
} from 'lucide-react'
import { Toast } from '../components/Toast'

function GitHubMark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 .7a11.3 11.3 0 0 0-3.57 22.02c.57.1.78-.24.78-.55v-2.16c-3.18.69-3.85-1.35-3.85-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.54-.29-5.21-1.27-5.21-5.59 0-1.24.44-2.24 1.17-3.03-.12-.29-.51-1.45.11-2.99 0 0 .96-.31 3.12 1.16A10.9 10.9 0 0 1 12 6.06c.96 0 1.93.13 2.84.38 2.16-1.47 3.11-1.16 3.11-1.16.63 1.54.24 2.7.12 2.99.73.79 1.17 1.79 1.17 3.03 0 4.33-2.68 5.29-5.23 5.58.41.36.78 1.06.78 2.14v3.16c0 .31.2.66.79.55A11.3 11.3 0 0 0 12 .7Z" />
    </svg>
  )
}

function LinkedInMark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.1 20.45H3.54V8.98H7.1v11.47Z" />
    </svg>
  )
}

export function ResumePage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const reduceMotion = useReducedMotion()

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
                  rel="noreferrer"
                  className="resume-contact-item"
                >
                  <LinkedInMark size={13} /> LinkedIn
                </a>
                <a
                  href="https://github.com/Dhruvg334"
                  target="_blank"
                  rel="noreferrer"
                  className="resume-contact-item"
                >
                  <GitHubMark size={13} /> GitHub
                </a>
                <a
                  href="https://dhruvg334.github.io/dhruv-gupta-portfolio/"
                  target="_blank"
                  rel="noreferrer"
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
                Final-year B.Tech CSE student building practical AI systems around retrieval, agent workflows, backend APIs, deterministic validation, human review, evaluation, auditability, and deployment. Built live projects across industrial GraphRAG, controlled agentic planning, AI-agent safety review, and source-grounded learning systems. GATE Data Science and Artificial Intelligence 2026 – AIR 1109.
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
                    <h3 className="entry-org">Kalinga Institute of Industrial Technology (KIIT)</h3>
                    <span className="entry-degree">B.Tech in Computer Science and Engineering · <strong>CGPA: 9.45</strong></span>
                  </div>
                  <div className="entry-meta">
                    <span className="entry-date">2023 – Present (Graduating July 2027)</span>
                    <span className="entry-loc"><MapPin size={12} /> Bhubaneswar, India</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Experience Section */}
            <section className="resume-section">
              <h2 className="resume-section-title">
                <Briefcase size={16} /> Experience
              </h2>

              <div className="resume-entry">
                <div className="entry-header">
                  <div className="entry-title-group">
                    <h3 className="entry-role-title">AI/ML Intern</h3>
                    <span className="entry-org">KIIT School of Computer Applications</span>
                  </div>
                  <div className="entry-meta">
                    <span className="entry-date">May 2026 – Jul 2026</span>
                    <span className="entry-loc"><MapPin size={12} /> Bhubaneswar, India</span>
                  </div>
                </div>
                <ul className="entry-bullets">
                  <li>
                    Completed an 8-week AI/ML-focused summer internship covering modern AI/ML, NLP, cybersecurity, and image-processing concepts through university-led training and guided technical work.
                  </li>
                  <li>
                    Prepared <strong>Sahayak AI</strong>, an invention disclosure for a privacy-aware student-support ML system using academic activity patterns, explainable support alerts, mentor review, and feedback-based improvement.
                  </li>
                  <li>
                    Strengthened responsible AI workflow judgment around privacy cleaning, interpretable signals, human review, evaluation tradeoffs, and safe use of educational data.
                  </li>
                </ul>
              </div>

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

              {/* Mnemos */}
              <div className="resume-entry">
                <div className="entry-header">
                  <div className="entry-title-group">
                    <div className="proj-title-row">
                      <h3 className="entry-role-title">Mnemos – Industrial Knowledge Intelligence</h3>
                      <div className="resume-proj-links no-print">
                        <a href="https://github.com/Dhruvg334" target="_blank" rel="noreferrer" className="pill-link">
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
                  <li>
                    Added regression-style evaluation gates for citation precision, abstention quality, routing, retrieval recall, and workflow completion.
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
                        <a href="https://chronos-dhruv.netlify.app" target="_blank" rel="noreferrer" className="pill-link">
                          <ExternalLink size={11} /> Live
                        </a>
                        <a href="https://github.com/Dhruvg334" target="_blank" rel="noreferrer" className="pill-link">
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
                    Engineered memory/context retrieval, explicit/inferred preference handling, source attribution, focus sessions, recovery flows, Google Calendar read-first architecture, and scoped MCP integration foundations.
                  </li>
                  <li>
                    Verified the release with <strong>158 backend tests, 37 frontend tests</strong>, migration chain through 028, RLS isolation, atomic transaction coverage, deployment tests, and 105 curated synthetic evaluation cases.
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
                        <a href="https://github.com/Dhruvg334" target="_blank" rel="noreferrer" className="pill-link">
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
                    Built a deployed AI-agent safety review platform scanning GitHub repositories, ZIP uploads, and demo agents for exposed secrets, unsafe tools, missing approval gates, weak auditability, and sensitive-data risks.
                  </li>
                  <li>
                    Implemented security surface mapping, guardrail matrix, deterministic release policy checks, static attack simulations, patch previews, saved reports, report comparison, and an evidence-aware assistant.
                  </li>
                  <li>
                    <strong>Business impact:</strong> turns manual GenAI/agent release review into a repeatable deployment gate with deterministic ALLOW/REVIEW/BLOCK decisions and Gemini limited to summaries and remediation guidance.
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
                        <a href="https://github.com/Dhruvg334" target="_blank" rel="noreferrer" className="pill-link">
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
                    Implemented concept extraction, hybrid retrieval, graph-supported context, teach-back diagnosis, mastery/review logic, Socratic tutoring policies, workflow traces, and deterministic public demo notebooks.
                  </li>
                  <li>
                    <strong>Business impact:</strong> moves beyond generic AI tutoring by testing whether learners can reconstruct ideas with source evidence, explicit gaps, supported claims, and measurable recovery paths.
                  </li>
                </ul>
              </div>
            </section>

            {/* Achievements Section */}
            <section className="resume-section">
              <h2 className="resume-section-title">
                <Award size={16} /> Achievements & Competitive Standing
              </h2>
              <ul className="resume-list-simple">
                <li>
                  <CheckCircle2 size={13} className="text-emerald" />
                  <span><strong>3rd Prize</strong>, Global Tech Innovation 2026 – A-DAP-T (AI-agent deployment safety platform).</span>
                </li>
                <li>
                  <CheckCircle2 size={13} className="text-emerald" />
                  <span><strong>Technical Excellence Winner</strong>, Devlynix Buildathon 2.0 – A-DAP-T.</span>
                </li>
                <li>
                  <CheckCircle2 size={13} className="text-emerald" />
                  <span><strong>Winner</strong>, Zero to Live Website Challenge – Shodhak (Live adventure discovery and booking platform).</span>
                </li>
                <li>
                  <CheckCircle2 size={13} className="text-emerald" />
                  <span><strong>GATE Data Science and Artificial Intelligence 2026</strong> – AIR 1109.</span>
                </li>
              </ul>
            </section>

            {/* Certifications Section */}
            <section className="resume-section">
              <h2 className="resume-section-title">
                <Award size={16} /> Certifications
              </h2>
              <div className="resume-cert-grid">
                <div className="cert-item">
                  <strong>Agentic AI Professional Training</strong>
                  <p>70-hour course by ExcelR in association with KIIT University.</p>
                </div>
                <div className="cert-item">
                  <strong>8 Weeks Summer Internship Certificate</strong>
                  <p>AI/ML, Cybersecurity, Image Processing, and NLP · KIIT School of Computer Applications.</p>
                </div>
              </div>
            </section>

            {/* Technical Skills Section */}
            <section className="resume-section">
              <h2 className="resume-section-title">
                <Code2 size={16} /> Technical Skills
              </h2>
              <div className="resume-skills-stack">
                <div className="skill-row">
                  <strong className="skill-category">Languages:</strong>
                  <span className="skill-items">Python, JavaScript, TypeScript, C, Java</span>
                </div>
                <div className="skill-row">
                  <strong className="skill-category">AI / LLM Systems:</strong>
                  <span className="skill-items">
                    LangGraph, LangChain, RAG, GraphRAG, RAGAS, Gemini API, Groq API, Structured Outputs, Tool Use, Retrieval Evaluation, Citation Precision, Abstention Testing, Human-in-the-Loop AI
                  </span>
                </div>
                <div className="skill-row">
                  <strong className="skill-category">Backend & Databases:</strong>
                  <span className="skill-items">
                    FastAPI, Node.js, Express, Pydantic, REST APIs, SQLAlchemy, PostgreSQL, pgvector, Neo4j, Redis, Supabase (Auth/Postgres/RLS/Vault), Firebase Auth, Firestore, MongoDB, SQLite, ChromaDB
                  </span>
                </div>
                <div className="skill-row">
                  <strong className="skill-category">Frontend & DevOps:</strong>
                  <span className="skill-items">
                    React, Next.js, Vite, Tailwind CSS, Cytoscape.js, Streamlit, Docker, Vercel, Render, Netlify, GitHub Actions, Pytest, Vitest, OpenTelemetry hooks, Structured Logging, Git
                  </span>
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
