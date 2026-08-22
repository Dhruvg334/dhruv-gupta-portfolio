import { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'mnemos',
    number: '01',
    name: 'Mnemos',
    tagline: 'Industrial knowledge intelligence and root-cause analysis platform built around the asset hierarchy.',
    category: 'Industrial GraphRAG & Multi-Agent Runtime',
    domain: 'graph',
    summary:
      'Industrial teams possess extensive maintenance records, but evidence remains fragmented across CMMS, EAM, revision-controlled procedures, and shift logs. Mnemos reconstructs that operational history around physical equipment tags, fusing hybrid vector retrieval, Neo4j graph context, and an 11-stage LangGraph runtime to deliver verifiable root-cause diagnostics.',
    detail:
      'Engineered with an asset-centered data model where every retrieval query is scoped to organization, site, asset tag, and procedure revision. The runtime enforces bounded reflection loops, deterministic citation verification, and durable human-in-the-loop approval checkpoints in PostgreSQL before high-consequence maintenance recommendations can be acted upon.',
    architecturalCore:
      'An 11-stage LangGraph supervisor orchestrating hybrid dense/sparse retrieval with 2-hop Neo4j Cypher traversals. Enforces strict schema validations and pauses execution in PostgreSQL whenever critical mechanical interlocks or safety overrides are recommended.',
    nodes: [
      {
        step: '01',
        name: 'Asset Resolution',
        type: 'deterministic',
        description: 'Resolves raw equipment tags (e.g. PU-101A) against the organizational taxonomy and active revisions.',
        outputSignature: 'ResolvedScope { org_id, site_id, asset_id, valid_revisions }',
      },
      {
        step: '02',
        name: 'Hybrid Graph Retrieval',
        type: 'hybrid',
        description: 'Executes parallel dense vector search (pgvector), lexical BM25 matching, and 2-hop Neo4j Cypher traversal.',
        outputSignature: 'EvidencePool { chunks: VectorChunk[], relations: GraphEdge[] }',
      },
      {
        step: '03',
        name: 'Evidence Verification',
        type: 'gate',
        description: 'Evaluates chunk relevance, detects conflicting revision dates, and calculates confidence before synthesis.',
        outputSignature: 'VerificationReport { passed: boolean, missing_evidence: string[] }',
      },
      {
        step: '04',
        name: 'Durable Human Gate',
        type: 'human',
        description: 'Pauses execution in PostgreSQL when diagnostic recommendations involve critical components or safety overrides.',
        outputSignature: 'CheckpointState { checkpoint_id: UUID, approved_by: UserID | null }',
      },
    ],
    tradeoffs: [
      {
        decision: 'Relational PostgreSQL as canonical store vs. Graph-only database',
        chosenPath: 'PostgreSQL canonical store with Neo4j as rebuildable graph projection',
        rationale: 'Ensures strict ACID compliance, tenant isolation, and durable checkpoint storage while allowing graph projections to be re-indexed freely without risking primary records.',
      },
      {
        decision: 'Synchronous end-to-end generation vs. Checkpointed stage execution',
        chosenPath: 'Checkpointed 11-stage pipeline with durable PostgreSQL pauses',
        rationale: 'Industrial investigations outlive standard HTTP request timeouts. Checkpointing enables human-in-the-loop approvals, audit logging, and process recovery after restarts.',
      },
      {
        decision: 'Pure semantic vector retrieval vs. Multi-modal hybrid search',
        chosenPath: 'Vector + Lexical (equipment codes) + Graph (topology) + Reranking',
        rationale: 'Pure vector search frequently confuses exact alphanumeric equipment serials (e.g., P-102 vs P-102R). Lexical and graph traversals preserve exact mechanical taxonomy.',
      },
    ],
    metrics: [
      { value: '0.8438', label: 'Evaluation Score', context: 'Weighted deterministic regression baseline' },
      { value: '0.9167', label: 'Citation Precision', context: 'Source-region evidence verification' },
      { value: '0.9375', label: 'Abstention Quality', context: 'Safe refusal on insufficient context' },
    ],
    stack: [
      'Python 3.12',
      'FastAPI',
      'Next.js 16',
      'React 19',
      'PostgreSQL',
      'pgvector',
      'Neo4j',
      'Redis',
      'LangGraph',
      'Docker',
    ],
    signals: [
      '11-Stage LangGraph runtime',
      'pgvector + Neo4j hybrid search',
      'Durable review checkpoints',
      'Tenant & site-level isolation',
      'Reproducible regression test harness',
    ],
    repo: 'https://github.com/Dhruvg334/Mnemos',
    live: 'https://mnemos-lake.vercel.app',
    demo: 'https://youtu.be/fs54N2vzHsM',
    tone: 'graph',
    caseStudy: {
      problemStatement:
        'In industrial process plants, equipment maintenance data is fragmented across computerized maintenance management systems (CMMS), PDF work manuals, vendor specification sheets, shift turnover notes, and inspection records. When unexpected failures occur, reliability engineers must manually correlate error logs against revision-controlled SOPs. Conventional naive RAG pipelines fail because they lack asset hierarchy awareness, confuse alphanumeric part numbers, retrieve superseded procedures, and cannot pause execution for required human safety sign-offs.',
      systemDesign:
        'Mnemos implements a layered architecture separating canonical storage from derived retrieval projections. Primary user accounts, site permissions, investigation sessions, and workflow checkpoints reside in PostgreSQL with Row Level Security (RLS). A Neo4j graph stores asset parent-child hierarchies, historical failure modes, and procedure dependencies. Ingestion extracts document regions, attaches temporal validity windows, and computes dense embeddings via pgvector. During execution, a LangGraph supervisor orchestrates query routing, multi-hop retrieval, evidence verification, and specialist diagnostic agents.',
      guardrailArchitecture:
        'The platform applies a multi-tier governance model: (1) Scope Isolation: Every query dynamically resolves the authenticated user\'s site and asset boundaries, preventing cross-tenant leakage. (2) Evidence Grounding: Claims must retain source URI, document version, and page offsets. If evidence is contradictory or missing, the system abstains rather than inventing certainty. (3) Human Authority: Consequential actions (e.g., equipment lockout recommendations or operating parameter changes) trigger a durable pause in PostgreSQL that requires authorized supervisor review before finalizing.',
      evaluationAndMetrics:
        'Evaluated across a deterministic synthetic regression suite of industrial failure scenarios. The test harness runs offline without live model dependencies to guarantee regression resistance: Weighted Pipeline Score of 0.8438, Citation Precision of 0.9167, and Abstention Quality of 0.9375 on ambiguous inputs. Live integration tracks latency across hybrid retrieval stages with p95 completion under 2.4s.',
    },
  },
  {
    id: 'a-dap-t',
    number: '02',
    name: 'A-DAP-T',
    tagline: 'Static AI-agent security review platform and release gatekeeper for GenAI applications.',
    category: 'Static Agent Risk Scanner & Release Gatekeeper',
    domain: 'safety',
    summary:
      'GenAI and agentic applications expose unique attack surfaces: unrestricted tool execution sinks, prompt injection escalation paths, memory poisoning, and unauthenticated API endpoints. A-DAP-T performs deep static analysis of repositories and project bundles without running untrusted code, evaluating 16 security guardrails and enforcing strict deployment gate decisions.',
    detail:
      'Parses Python and TypeScript ASTs, package manifests, and route definitions to construct dependency graphs, API surface inventories, and trust-boundary flows. Evaluates policies against custom rule packs, generates static attack proof paths, provides developer patch previews, and outputs a decisive BLOCK, REVIEW, or ALLOW release decision.',
    architecturalCore:
      'Deterministic AST parser and pattern matcher extracting security signals into structured report artifacts. Applies a 16-point guardrail matrix to calculate risk scores and evaluate policy gates without executing project code.',
    nodes: [
      {
        step: '01',
        name: 'Sandboxed Ingest',
        type: 'deterministic',
        description: 'Extracts GitHub repos or uploaded ZIPs with strict size, depth, and file-count bounds. Reads files as text only.',
        outputSignature: 'FileManifest { path: string, content_hash: string, ast_tree: ASTNode }',
      },
      {
        step: '02',
        name: 'Surface Mapping',
        type: 'deterministic',
        description: 'Identifies LLM model calls, tool execution sinks, external HTTP clients, and authentication middleware.',
        outputSignature: 'SecurityInventory { routes: APIRoute[], tools: ToolSink[], boundaries: Flow[] }',
      },
      {
        step: '03',
        name: 'Guardrail Matrix',
        type: 'hybrid',
        description: 'Checks for missing human approval on sensitive tools, unauthenticated endpoints, and prompt injection vulnerabilities.',
        outputSignature: 'GuardrailReport { passed: string[], failed: string[], critical_blockers: string[] }',
      },
      {
        step: '04',
        name: 'Deployment Gate',
        type: 'gate',
        description: 'Calculates security score and outputs BLOCK / REVIEW / ALLOW decision with patch previews for developers.',
        outputSignature: 'GateResult { decision: "BLOCK" | "REVIEW" | "ALLOW", remedy_plan: FixStep[] }',
      },
    ],
    tradeoffs: [
      {
        decision: 'Dynamic sandbox exploit execution vs. Static AST text analysis',
        chosenPath: 'Strict text-only AST analysis with static proof paths',
        rationale: 'Running untrusted third-party code in dynamic sandboxes introduces significant compute overhead and security exposure. Static analysis delivers predictable, instantaneous, zero-risk reviews.',
      },
      {
        decision: 'LLM-only vulnerability classification vs. Deterministic rule engine',
        chosenPath: 'Rule-based deterministic engine for findings; LLM used only for explanation',
        rationale: 'Using LLMs to determine vulnerability severity introduces non-deterministic grading and hallucinated CVEs. The core scoring and gate logic remains strictly deterministic.',
      },
    ],
    metrics: [
      { value: '16 Controls', label: 'Guardrail Matrix', context: 'Auth, tool allowlists, memory, SSRF' },
      { value: '100% Static', label: 'Zero Code Execution', context: 'Safe sandboxed text-only parser' },
      { value: '3-Tier Gate', label: 'Release Policy', context: 'BLOCK / REVIEW / ALLOW criteria' },
    ],
    stack: [
      'Python',
      'FastAPI',
      'Next.js',
      'TypeScript',
      'Firebase Auth',
      'Firestore',
      'Pydantic',
      'Gemini API',
    ],
    signals: [
      '16-point guardrail verification matrix',
      'AST-level agent tool sink detection',
      'Static attack proof path synthesis',
      'Interactive report-aware assistant (DAP)',
      'Automated fix sequence & patch generation',
    ],
    repo: 'https://github.com/Dhruvg334/A-DAP-T',
    live: 'https://a-dap-t.vercel.app',
    demo: 'https://www.youtube.com/watch?v=1r-QIjQmbbo',
    tone: 'safety',
    caseStudy: {
      problemStatement:
        'As software engineering teams transition from simple text generation to autonomous agentic architectures, traditional static application security testing (SAST) tools miss agent-specific risks: LLMs with direct shell or SQL tool access, absence of confirmation gates on mutating APIs, context poisoning via untrusted retrieved documents, and wildcard CORS policies on expensive inference endpoints. A-DAP-T was built to establish an automated release gate specifically for AI applications.',
      systemDesign:
        'A-DAP-T operates an ingestion pipeline capable of scanning public GitHub repositories or uploaded zip archives under strict memory bounds (20MB max zip, 300 files max, 6 nesting levels). The backend parses files into abstract syntax trees, identifying framework types (LangChain, LangGraph, FastAPI, Express), external network connectors, and tool decorators. It generates a comprehensive security artifact suite containing dependency risk signals, API route controls, trust boundary crossings, and a 16-point guardrail coverage matrix.',
      guardrailArchitecture:
        'The platform assesses 16 critical application security dimensions: Authentication & Authorization, Rate Limiting, CORS Configuration, Upload Sanitation, Input Validation, Output Encoding, Prompt Injection Defenses, Tool Allowlists, Human-in-the-Loop Approval, Audit Logging, Secrets Management, Dependency Integrity, Memory Isolation, PII Masking, and Command Sandboxing. If high-severity blockers are detected (such as unsandboxed command execution or missing approvals on destructive tools), the deployment gate automatically returns a BLOCK verdict with actionable code patches.',
      evaluationAndMetrics:
        'Validated using built-in dual test suites: an intentionally vulnerable support agent (containing unshielded tools, wildcard CORS, and SQL injection flaws) and a hardened, secured production agent. The system reliably blocks the vulnerable project and verifies the hardened implementation with sub-2-second scan turnaround times.',
    },
  },
  {
    id: 'tessarion',
    number: '03',
    name: 'Tessarion',
    tagline: 'Evidence-linked learning platform with Socratic teach-back, hybrid retrieval, and concept graph projections.',
    category: 'Source-Grounded Learning & Evaluation Suite',
    domain: 'eval',
    summary:
      'Tessarion transforms dense academic and technical literature into a structured, verifiable learning loop. Instead of relying on superficial multiple-choice quizzes or streaks, learners explain concepts in their own words. The system evaluates teach-backs against source evidence and concept dependencies, diagnosing omissions, misconceptions, and shallow explanations.',
    detail:
      'Built around a canonical PostgreSQL database with derived Qdrant hybrid vector indexes and Neo4j concept-graph projections. Features Socratic tutoring state machines, durable Inngest background jobs, Arize AX OpenTelemetry instrumentation, and a suite of 13 regression evaluation runners verifying diagnostic precision.',
    architecturalCore:
      'PostgreSQL canonical store with rebuildable Qdrant vector and Neo4j concept projections. Evaluates teach-backs through weighted rank fusion and routes learners through a finite-state Socratic tutor.',
    nodes: [
      {
        step: '01',
        name: 'Concept Ingestion',
        type: 'deterministic',
        description: 'Parses learner materials into bounded source chunks, extracting concepts and directional prerequisite relationships.',
        outputSignature: 'ConceptGraph { concepts: ConceptNode[], edges: DependencyEdge[] }',
      },
      {
        step: '02',
        name: 'Teach-Back Diagnosis',
        type: 'hybrid',
        description: 'Fuses dense and sparse Qdrant vectors with Neo4j graph bounds to classify gaps, misconceptions, and shallow claims.',
        outputSignature: 'DiagnosisReport { gaps: Gap[], misconceptions: Misconception[], grounded: boolean }',
      },
      {
        step: '03',
        name: 'Socratic Tutor Loop',
        type: 'model',
        description: 'Selects the highest-leverage conceptual gap and generates a single targeted question, returning learner to teach-back.',
        outputSignature: 'TutorTurn { question: string, target_gap_id: string, completed: boolean }',
      },
      {
        step: '04',
        name: 'Mastery Ledger',
        type: 'deterministic',
        description: 'Records verified mastery evidence and updates spaced-repetition schedules in PostgreSQL without false precision.',
        outputSignature: 'MasteryRecord { concept_id: string, mastery_score: float, next_review: Date }',
      },
    ],
    tradeoffs: [
      {
        decision: 'Single database for all capabilities vs. Multi-model projection architecture',
        chosenPath: 'PostgreSQL canonical store with derived Qdrant and Neo4j projections',
        rationale: 'PostgreSQL maintains canonical ownership of learner data, authorization, and review schedules. If vector or graph clusters fail, they can be re-projected from Postgres with zero data loss.',
      },
      {
        decision: 'Unbounded conversational tutor vs. One-question Socratic state machine',
        chosenPath: 'Strict one-question-at-a-time tutor returning learner to teach-back',
        rationale: 'Open-ended chat tutors often turn into lecture bots where the model does all the explaining. Restricting the tutor to one probe forces the learner to actively reconstruct understanding.',
      },
    ],
    metrics: [
      { value: '13 Suites', label: 'Evaluation Runners', context: 'RAG, concepts, diagnosis, mastery' },
      { value: 'Dual Projection', label: 'Qdrant + Neo4j', context: 'Rebuildable vector and graph stores' },
      { value: 'OTLP Tracing', label: 'Arize AX Telemetry', context: 'Span-level workflow observability' },
    ],
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Supabase',
      'PostgreSQL',
      'Qdrant',
      'Neo4j',
      'Inngest',
      'Arize AX',
      'Vitest',
    ],
    signals: [
      'Socratic teach-back diagnostic state machine',
      'Dual-projection architecture (Qdrant + Neo4j)',
      '13 metric-producing regression evaluation runners',
      'Inngest background job orchestration',
      'Arize AX OpenTelemetry trace pipeline',
    ],
    repo: 'https://github.com/Dhruvg334/Tessarion',
    live: 'https://tessarion.vercel.app',
    demo: 'https://youtu.be/wEGKEA1_CVE',
    tone: 'learning',
    caseStudy: {
      problemStatement:
        'Standard digital learning products measure engagement through shallow proxies: page views, completion checkmarks, multiple-choice quizzes, and daily streaks. These metrics fail to detect illusions of competence—where a learner recognizes technical vocabulary but cannot explain how underlying concepts interact. Tessarion was created to operationalize the Feynman technique and Socratic inquiry through verifiable retrieval and concept graph modeling.',
      systemDesign:
        'Tessarion ingests technical documentation, splits it into bounded source chunks, and extracts key concepts and prerequisite relationships. The primary application is built on Next.js 16 (React 19) and Supabase PostgreSQL. Vector embeddings are projected into Qdrant Cloud for hybrid dense/sparse search, while concept topologies are projected into Neo4j AuraDB. Long-running document chunking and background review recalculations are orchestrated via Inngest Cloud. Workflow telemetry is exported over OTLP into Arize AX.',
      guardrailArchitecture:
        'To prevent model hallucinations from corrupting diagnostic scores, Tessarion enforces strict evidence grounding: every diagnosis item (omission, misconception, or shallow explanation) must cite specific chunk IDs and concept nodes. The Socratic tutor is governed by a finite state machine that permits only one targeted probe per turn before requiring user response, preventing the agent from drifting into monologue or giving away answers directly.',
      evaluationAndMetrics:
        'The repository features 13 automated evaluation suites (`npm run eval:*`), benchmarking retrieval precision, concept extraction F1, gap detection accuracy, mastery calculation repeatability, and workflow fault tolerance. The public demo notebook demonstrates this pipeline live on a full computer architecture curriculum without requiring account registration.',
    },
  },
  {
    id: 'chronos',
    number: '04',
    name: 'ChronOS',
    tagline: 'Adaptive execution and capacity-aware daily planning system with deterministic schedule recovery.',
    category: 'Controlled Agentic Planning & Schedule Recovery',
    domain: 'planning',
    summary:
      'Most productivity tools are passive task databases that allow users to schedule impossible workloads. ChronOS turns scattered commitments, routines, and calendar constraints into realistic daily execution blocks, validating feasibility with deterministic rules and proposing bounded recovery when interruptions disrupt the schedule.',
    detail:
      'Engineered with a split architecture: React 19 / TanStack Query frontend on Netlify and FastAPI backend on Render with Supabase PostgreSQL (RLS & pgvector). Implements a 158-test backend suite, 105 synthetic evaluation cases, and a deterministic Strategy Engine enforcing work hours, buffer limits, and explicit user approval before plan modifications.',
    architecturalCore:
      'FastAPI Strategy Engine applying constraint solvers over Google Calendar events and task lists. When execution drifts, generates non-destructive recovery proposals that require atomic user approval.',
    nodes: [
      {
        step: '01',
        name: 'Intake & Extraction',
        type: 'hybrid',
        description: 'Extracts tasks, deadlines, estimated effort, and contextual dependencies from unstructured natural language.',
        outputSignature: 'ParsedCommitment { title: string, duration_min: int, deadline: Date | null }',
      },
      {
        step: '02',
        name: 'Capacity Validation',
        type: 'deterministic',
        description: 'Evaluates proposed tasks against fixed calendar events, focus limits, daily work hours, and transition buffers.',
        outputSignature: 'FeasibilityMatrix { capacity_minutes: int, allocated_minutes: int, is_overbooked: boolean }',
      },
      {
        step: '03',
        name: 'Schedule Synthesis',
        type: 'hybrid',
        description: 'Generates non-overlapping time blocks and explains why tasks were scheduled, deferred, or split.',
        outputSignature: 'GeneratedSchedule { blocks: TimeBlock[], deferred_tasks: DeferredTask[] }',
      },
      {
        step: '04',
        name: 'Execution Recovery',
        type: 'gate',
        description: 'When focus sessions run overtime or meetings interrupt the day, computes a repaired plan for explicit user approval.',
        outputSignature: 'RecoveryProposal { adjustments: PlanAdjustment[], required_approval: true }',
      },
    ],
    tradeoffs: [
      {
        decision: 'LLM-driven schedule placement vs. Deterministic capacity validation',
        chosenPath: 'LLM generates proposals; deterministic engine owns final feasibility and placement',
        rationale: 'Language models struggle with exact minute-level arithmetic, time-zone boundaries, and overlap detection. The deterministic engine guarantees schedules never contain overlapping commitments.',
      },
      {
        decision: 'Autonomous background plan mutation vs. Approval-first recovery proposals',
        chosenPath: 'Approval-first recovery requiring explicit user confirmation',
        rationale: 'Silently rearranging a user\'s calendar undermines user agency and trust. ChronOS presents clear before-and-after tradeoff diffs that require one-click user acceptance.',
      },
    ],
    metrics: [
      { value: '158 Tests', label: 'Backend Regression Suite', context: 'FastAPI, RLS isolation, atomic RPCs' },
      { value: '105 Cases', label: 'Synthetic Eval Cases', context: 'Deterministic schedule validation' },
      { value: 'Live App', label: 'Production Release', context: 'Netlify + Render + Supabase' },
    ],
    stack: [
      'React 19',
      'TypeScript',
      'Vite',
      'FastAPI',
      'Python 3.12',
      'Supabase',
      'PostgreSQL',
      'pgvector',
      'Groq API',
      'Tailwind CSS',
      'Pytest',
    ],
    signals: [
      'Deployed production application with public demo',
      'Deterministic Strategy Engine for capacity bounds',
      '158-test backend regression suite with RLS isolation',
      '105 synthetic schedule evaluation cases',
      'Approval-first execution recovery loops',
    ],
    repo: 'https://github.com/Dhruvg334/chronos',
    live: 'https://chronos-dhruv.netlify.app',
    demo: 'https://chronos-dhruv.netlify.app/demo',
    tone: 'planning',
    caseStudy: {
      problemStatement:
        'Knowledge workers regularly experience planning failure: daily to-do lists that ignore fixed calendar commitments, focus fatigue, and unexpected interruptions. When a scheduled block runs overtime or an urgent meeting arises, conventional task apps leave users with a broken schedule and no clear path to recover. ChronOS was built to treat planning as a dynamic, capacity-constrained execution problem.',
      systemDesign:
        'ChronOS is deployed as a split architecture: a responsive React 19 / TypeScript single-page application hosted on Netlify, connected via authenticated REST APIs to a Python 3.12 FastAPI backend on Render. Persistent storage, authentication, Row Level Security (RLS), and pgvector similarity search are managed on Supabase PostgreSQL. The backend Strategy Engine coordinates natural-language task intake, Google Calendar synchronization, hybrid vector retrieval for project context, and schedule optimization.',
      guardrailArchitecture:
        'The system operates on six fundamental principles: (1) Deterministic feasibility outranks model suggestions. (2) User approval outranks silent automation. (3) Explicit memories outrank inferred preferences. (4) Provenance outranks summarization. (5) Planning adapts to real capacity limits. (6) Recovery preserves continuity without streak penalties. External connectors (Google Calendar, GitHub, Notion) operate in read-first mode with strict allowlists and zero unrestricted remote execution.',
      evaluationAndMetrics:
        'The codebase contains a comprehensive testing harness: 158 backend tests in Pytest verifying RLS isolation, atomic RPC transactions, and calendar sync handlers; 37 frontend Vitest tests; and 105 synthetic evaluation scenarios testing deterministic schedule resolution under severe overload conditions. Live product and interactive public demo are available at chronos-dhruv.netlify.app.',
    },
  },
  {
    id: 'niswarth-ai',
    number: '05',
    name: 'Niswarth AI',
    tagline: 'Multi-tenant operational platform for NGO governance, document OCR intake, and donor transparency.',
    category: 'Full-Stack NGO Operational Workflows',
    domain: 'workflow',
    summary:
      'Grassroots non-profits face heavy administrative burdens reconciling handwritten donation receipts, expense vouchers, and audit compliance filings. Niswarth AI provides a multi-tenant operations platform featuring automated OCR intake pipelines, deterministic ledger reconciliation, and auditable donor transparency reports.',
    detail:
      'Architected with Next.js App Router, FastAPI, and PostgreSQL with tenant-scoped Row Level Security. Integrates structured vision OCR models for physical receipt digitization, rule-based financial validation, and verifiable PDF report generation.',
    architecturalCore:
      'FastAPI processing pipeline converting raw receipt imagery into validated double-entry accounting records with PostgreSQL Row Level Security tenant enforcement.',
    nodes: [
      {
        step: '01',
        name: 'Vision OCR Intake',
        type: 'hybrid',
        description: 'Scans physical donation receipts and expense vouchers, extracting line items, dates, and amounts.',
        outputSignature: 'ExtractedReceipt { vendor: string, amount: float, date: Date, tax_id: string }',
      },
      {
        step: '02',
        name: 'Ledger Validation',
        type: 'deterministic',
        description: 'Validates line items against category spending caps, tax exemption rules, and double-entry balance formulas.',
        outputSignature: 'ValidatedTransaction { is_balanced: boolean, category_id: UUID, anomalies: string[] }',
      },
      {
        step: '03',
        name: 'Compliance Audit Generation',
        type: 'deterministic',
        description: 'Compiles validated records into immutable, cryptographically verifiable financial transparency PDFs.',
        outputSignature: 'AuditReport { report_id: UUID, total_disbursed: float, download_url: string }',
      },
    ],
    tradeoffs: [
      {
        decision: 'Single shared database with RLS vs. Separate database per tenant',
        chosenPath: 'Single PostgreSQL database with strict Row Level Security policies',
        rationale: 'Allows affordable hosting for non-profit budgets while maintaining mathematical tenant isolation at the database kernel level.',
      },
    ],
    metrics: [
      { value: 'Multi-Tenant', label: 'Tenant Isolation', context: 'PostgreSQL Row Level Security' },
      { value: 'Automated OCR', label: 'Receipt Ingestion', context: 'Vision extraction to structured ledger' },
      { value: 'Audit Trail', label: 'Compliance Reporting', context: 'Deterministic financial reconciliation' },
    ],
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'FastAPI',
      'Python',
      'PostgreSQL',
      'Supabase',
      'Tailwind CSS',
    ],
    signals: [
      'PostgreSQL Row Level Security tenant isolation',
      'Automated receipt and voucher OCR processing',
      'Deterministic financial ledger reconciliation',
      'Cryptographically verifiable donor audit reports',
    ],
    repo: 'https://github.com/Dhruvg334/Niswarth-AI',
    tone: 'workflow',
    caseStudy: {
      problemStatement:
        'Grassroots non-governmental organizations (NGOs) often lose up to 30% of their operational bandwidth manually transcribing physical expense slips, reconciling bank statements, and preparing compliance filings for regulatory bodies and institutional donors. Errors in manual spreadsheets risk funding freezes and compliance penalties.',
      systemDesign:
        'Niswarth AI integrates vision-based OCR with a double-entry financial ledger backend. Built on Next.js and FastAPI, the platform isolates tenant workspaces via PostgreSQL Row Level Security. When field volunteers upload mobile photos of receipts, the ingestion engine extracts structured metadata, verifies merchant tax IDs, and cross-references transactions against active grant budgets.',
      guardrailArchitecture:
        'Every financial transaction requires dual-custody verification: entries flagged with high anomaly scores (e.g., duplicate invoice numbers or mismatched totals) are held in an escrow review queue until approved by an authorized financial trustee.',
      evaluationAndMetrics:
        'Tested across synthetic receipt datasets spanning degraded print quality, handwriting variations, and multiple currencies, reducing manual reconciliation effort by over 70%.',
    },
  },
]

export const supportingProjects = [
  {
    name: 'Career Guidance Graph Engine',
    description: 'Knowledge graph modeling engineering curricula, industry competency maps, and personalized learning trajectories.',
    href: 'https://github.com/Dhruvg334',
    tags: ['Neo4j', 'FastAPI', 'Cypher', 'Knowledge Graphs'],
  },
  {
    name: 'Gov-Ease SOP Automation',
    description: 'Conversational intake workflow assisting citizens with regional government procedural navigation and document checklists.',
    href: 'https://github.com/Dhruvg334',
    tags: ['FastAPI', 'Next.js', 'Deterministic Workflows'],
  },
  {
    name: 'Suraksha Disaster Decision Support',
    description: 'Geospatial crisis response coordinator integrating resource dispatch rules and emergency shelter availability tracking.',
    href: 'https://github.com/Dhruvg334',
    tags: ['React', 'Python', 'Leaflet', 'GeoJSON'],
  },
]
