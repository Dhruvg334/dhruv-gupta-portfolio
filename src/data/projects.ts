import { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'mnemos',
    number: '01',
    name: 'Mnemos',
    tagline: 'Industrial Operational Memory & GraphRAG Investigation Engine',
    category: 'Industrial GraphRAG · Operational Intelligence',
    domain: 'graph',
    summary:
      'An asset-centric operational memory that turns complex industrial maintenance records, manuals, inspection logs, and field knowledge into evidence-backed investigation traces.',
    detail:
      'Engineered around hybrid graph-vector retrieval, explicit evidence provenance, asset hierarchy traversal, and governed agent traces rather than a generic ungrounded chat interface.',
    architecturalCore:
      'Combines Neo4j knowledge graphs for structural asset topology with pgvector for semantic search across unstructured maintenance logs. Every LLM response is bounded to retrieved citation nodes with exact page and telemetry offsets.',
    nodes: [
      {
        step: '01',
        name: 'Asset Graph Lookup',
        type: 'deterministic',
        description: 'Traverses Neo4j Cypher graph for parent-child asset hierarchy, historical fault codes, and dependency chains.',
        outputSignature: 'AssetContext { asset_id, topology_nodes: 14, fault_history: 6 }',
      },
      {
        step: '02',
        name: 'Hybrid Dense Vector Search',
        type: 'hybrid',
        description: 'Queries pgvector with HNSW index for dense embeddings across manuals, inspection reports, and technician notes.',
        outputSignature: 'DocumentChunk[] { count: 8, min_similarity: 0.84 }',
      },
      {
        step: '03',
        name: 'Evidence Assembly & Provenance',
        type: 'deterministic',
        description: 'Fuses graph topology paths with dense text chunks into an immutable, verifiable citation bundle.',
        outputSignature: 'ProvenanceBundle { verified_sources: 5, confidence: 0.96 }',
      },
      {
        step: '04',
        name: 'Governed Trace Reasoning',
        type: 'model',
        description: 'LLM synthesizes root-cause diagnosis strictly bounded to the provenance bundle with explicit citation links.',
        outputSignature: 'DiagnosisReport { root_cause, mitigation_steps, citations }',
      },
    ],
    tradeoffs: [
      {
        decision: 'Vector Search + Knowledge Graph vs Pure Vector RAG',
        chosenPath: 'Hybrid Neo4j Cypher + pgvector Retrieval',
        rationale:
          'Pure vector search fails when understanding that a valve failure upstream causes compressor pressure drops. Neo4j models structural asset causality while pgvector handles unstructured human logs.',
      },
      {
        decision: 'Evidence Provenance vs Generative Summarization',
        chosenPath: 'Deterministic Source Offset Binding',
        rationale:
          'Industrial operations require verifiable legal and safety accountability. Every recommendation must cite exact document chunk IDs and telemetry timestamps.',
      },
    ],
    metrics: [
      { label: 'Retrieval Latency', value: '<120ms', context: 'Hybrid Cypher + Vector search' },
      { label: 'Provenance Rate', value: '100%', context: 'Verifiable document link citations' },
      { label: 'Graph Depth', value: '5 Nodes', context: 'Hierarchical asset topology traversal' },
    ],
    stack: ['Next.js', 'FastAPI', 'PostgreSQL', 'pgvector', 'Neo4j', 'LangChain', 'Docker'],
    signals: ['GraphRAG', 'Evidence provenance', 'Asset topology', 'Agent traces'],
    repo: 'https://github.com/Dhruvg334/mnemos',
    live: 'https://mnemos-lake.vercel.app',
    demo: 'https://youtu.be/fs54N2vzHsM',
    tone: 'graph',
  },
  {
    id: 'a-dap-t',
    number: '02',
    name: 'A-DAP-T',
    tagline: 'AI Agent Safety & Pre-Release Readiness Gatekeeper',
    category: 'AI Agent Safety · Release Readiness',
    domain: 'safety',
    summary:
      'A pre-release review system for agentic applications that surfaces risky tool access, missing approval gates, weak auditability, exposed secrets, and prompt-injection-prone workflows.',
    detail:
      'Deterministic review logic drives findings and ALLOW / REVIEW / BLOCK decisions; model calls are strictly reserved for explanation and localized remediation guidance.',
    architecturalCore:
      'Static AST parsing and deterministic security heuristics evaluate tool execution boundaries, permission escalation vectors, and injection surfaces before any runtime deployment.',
    nodes: [
      {
        step: '01',
        name: 'AST & Manifest Extraction',
        type: 'deterministic',
        description: 'Parses agent definition files, tool declarations, prompt templates, and execution permissions into a normalized graph.',
        outputSignature: 'AgentManifest { tool_count: 12, prompt_templates: 8, permissions }',
      },
      {
        step: '02',
        name: 'Deterministic Risk Scanner',
        type: 'deterministic',
        description: 'Applies OWASP Top 10 for LLM heuristics checking for unconstrained tool invocation, raw SQL/Shell execution, and credential exposure.',
        outputSignature: 'RiskFindings { critical: 1, medium: 2, low: 0 }',
      },
      {
        step: '03',
        name: 'Release Gate Evaluator',
        type: 'gate',
        description: 'Deterministic tri-state gate assigns ALLOW, REVIEW_REQUIRED, or HARD_BLOCK based on risk severity matrix.',
        outputSignature: 'GateDecision { status: "REVIEW_REQUIRED", score: 72/100 }',
      },
      {
        step: '04',
        name: 'Remediation Synthesizer',
        type: 'model',
        description: 'LLM generates concrete code diffs and architectural fixes for the exact flagged security vulnerabilities.',
        outputSignature: 'PatchSuggestions { diff_count: 3, security_notes }',
      },
    ],
    tradeoffs: [
      {
        decision: 'Deterministic Rule Matrix vs LLM Security Judge',
        chosenPath: 'Deterministic AST Scanners for Gate Decisions',
        rationale:
          'Using LLMs to judge other LLMs introduces non-deterministic hallucinations and bypass risks. A-DAP-T relies on deterministic AST rules for the security gate, using LLMs only to write remediation patches.',
      },
      {
        decision: 'Pre-Deployment Static Analysis vs Runtime Monitoring',
        chosenPath: 'Pre-Release CI/CD Static Gate Engine',
        rationale:
          'Catching architectural flaws (like an un-gated database mutation tool) in CI/CD is orders of magnitude safer and cheaper than mitigating runtime breaches.',
      },
    ],
    metrics: [
      { label: 'Gate Determinism', value: '100%', context: 'Zero hallucinated security approvals' },
      { label: 'Decision Engine', value: '3-Tier', context: 'ALLOW / REVIEW / BLOCK gates' },
      { label: 'Execution', value: 'Static CI', context: 'Integrates into automated CI pipelines' },
    ],
    stack: ['Next.js', 'TypeScript', 'FastAPI', 'Firebase', 'Gemini API', 'TailwindCSS'],
    signals: ['Static review', 'Release gates', 'Human approval', 'OWASP LLM rules'],
    repo: 'https://github.com/Dhruvg334/a-dap-t',
    live: 'https://a-dap-t.vercel.app/',
    demo: 'https://www.youtube.com/watch?v=VzN88xAFiDA',
    tone: 'safety',
  },
  {
    id: 'tessarion',
    number: '03',
    name: 'Tessarion',
    tagline: 'Evidence-Linked Learning Workspace with Deterministic RAG Evaluation Suite',
    category: 'RAG Evaluation · Evidence-linked Learning',
    domain: 'eval',
    summary:
      'A learning workspace where users teach concepts back, receive source-grounded diagnosis, inspect concept relationships, and recover through guided tutoring.',
    detail:
      'The standout engineering achievement is the deterministic evaluation layer: automated suites measure retrieval recall, concept extraction accuracy, diagnosis precision, and tutoring policy consistency.',
    architecturalCore:
      'Combines Qdrant vector search with Neo4j prerequisite graphs. Backed by 50+ Vitest test suites that benchmark diagnostic accuracy against known misconception benchmarks.',
    nodes: [
      {
        step: '01',
        name: 'Concept Graph Ingestion',
        type: 'hybrid',
        description: 'Parses academic sources into vector chunks and Neo4j concept nodes with prerequisite directional edges.',
        outputSignature: 'KnowledgeGraph { concepts: 34, relationships: 48 }',
      },
      {
        step: '02',
        name: 'Teach-Back Alignment Engine',
        type: 'hybrid',
        description: 'Extracts semantic entities from user explanation and aligns them against source vector chunks and graph definitions.',
        outputSignature: 'AlignmentMap { matched_concepts: 4, missing_prerequisites: 1 }',
      },
      {
        step: '03',
        name: 'Deterministic Diagnosis Matrix',
        type: 'deterministic',
        description: 'Classifies student understanding into: Complete Mastery, Partial Misconception, or Prerequisite Gap.',
        outputSignature: 'DiagnosticResult { state: "MISCONCEPTION", target_concept: "Backprop" }',
      },
      {
        step: '04',
        name: 'Guided Recovery Tutor',
        type: 'model',
        description: 'Generates Socratic follow-up questions referencing exact source excerpts to guide student back on track.',
        outputSignature: 'TutorStep { question, source_citation, hint }',
      },
    ],
    tradeoffs: [
      {
        decision: 'Synthetic Benchmarking vs Subjective User Feedback',
        chosenPath: '50+ Automated Vitest Evaluation Suites',
        rationale:
          'Educational diagnostics cannot rely on vibe-coding. Deterministic regression tests verify that diagnostic classifications remain 100% stable across prompt edits.',
      },
      {
        decision: 'Concept Prerequisite Graphs vs Flat Document Retrieval',
        chosenPath: 'Neo4j Prerequisite Traversal',
        rationale:
          'Learning is sequential. If a student misunderstands gradient descent, the tutor must check if the prerequisite partial derivative concept was mastered first.',
      },
    ],
    metrics: [
      { label: 'Evaluation Suites', value: '50+ Tests', context: 'Vitest deterministic regression suites' },
      { label: 'Retrieval Engine', value: 'Qdrant + Neo4j', context: 'Dual vector & prerequisite graph' },
      { label: 'State Retention', value: 'Multi-turn', context: 'Session-persistent concept mastery' },
    ],
    stack: ['Next.js', 'Supabase', 'Qdrant', 'Neo4j', 'Vitest', 'FastAPI', 'TypeScript'],
    signals: ['Teach-back', 'RAG evaluation', 'Concept graph', 'Regression testing'],
    repo: 'https://github.com/Dhruvg334/Tessarion',
    live: 'https://tessarion.vercel.app',
    demo: 'https://www.youtube.com/watch?v=wEGKEA1_CVE',
    tone: 'learning',
  },
  {
    id: 'chronos',
    number: '04',
    name: 'ChronOS',
    tagline: 'Controlled Agentic Planning & Execution Recovery Engine',
    category: 'Controlled Agentic Planning · Execution Recovery',
    domain: 'planning',
    summary:
      'An adaptive execution system that converts commitments, projects, routines, calendar constraints, and working preferences into realistic plans with approval-based recovery.',
    detail:
      'Model-assisted planning is strictly bounded by deterministic constraint solvers for temporal feasibility, overlap prevention, buffer allocation, and capacity limits.',
    architecturalCore:
      'Separates fuzzy intent understanding (LLM) from hard temporal constraint satisfaction (deterministic Python algorithms). Integrates two-way Google Calendar synchronization with rollback safeguards.',
    nodes: [
      {
        step: '01',
        name: 'Intent & Commitment Parser',
        type: 'model',
        description: 'Transforms messy user task dumps into structured entities with duration estimates, energy levels, and deadlines.',
        outputSignature: 'ParsedTask[] { count: 6, priority_weights }',
      },
      {
        step: '02',
        name: 'Deterministic Constraint Solver',
        type: 'deterministic',
        description: 'Validates calendar bounds, travel buffers, fixed meetings, sleep protection, and daily cognitive capacity.',
        outputSignature: 'ScheduleMatrix { valid_slots: 5, conflicts_resolved: 2 }',
      },
      {
        step: '03',
        name: 'Approval & Confirmation Gate',
        type: 'human',
        description: 'Presents proposed plan with highlighted tradeoffs and requires explicit human confirmation before mutating external calendar.',
        outputSignature: 'HumanDecision { approved: true, timestamp }',
      },
      {
        step: '04',
        name: 'External Calendar Sync & Recovery',
        type: 'deterministic',
        description: 'Pushes confirmed schedule to Google Calendar API; monitors task slips and triggers deterministic replanning.',
        outputSignature: 'SyncResult { events_created: 5, rollback_token }',
      },
    ],
    tradeoffs: [
      {
        decision: 'Deterministic Math Validator vs LLM Scheduling',
        chosenPath: 'Topological Constraint Solver for Time Math',
        rationale:
          'LLMs fail at multi-constraint calendar arithmetic, frequently scheduling overlapping meetings. ChronOS delegates math to deterministic algorithms and uses the LLM only for intent parsing.',
      },
      {
        decision: 'Human-in-the-Loop Gate vs Autonomous Calendar Mutation',
        chosenPath: 'Explicit User Approval Checkpoint',
        rationale:
          'Unconstrained calendar mutations destroy user trust. All AI schedule shifts require a 1-click preview and approval step.',
      },
    ],
    metrics: [
      { label: 'Calendar Overlaps', value: '0 Allowed', context: 'Mathematically guaranteed collision-free' },
      { label: 'Constraint Types', value: '7 Rules', context: 'Capacity, buffers, sleep, deadlines' },
      { label: 'Sync Resilience', value: '2-Way Sync', context: 'Google Calendar API with rollback' },
    ],
    stack: ['React', 'FastAPI', 'Supabase', 'pgvector', 'Google Calendar API', 'Python'],
    signals: ['Planning validators', 'Approval flow', 'Failure recovery', 'Constraint solver'],
    repo: 'https://github.com/Dhruvg334/chronos',
    tone: 'planning',
  },
  {
    id: 'niswarth-ai',
    number: '05',
    name: 'Niswarth AI',
    tagline: 'Multi-Tenant NGO Campaign Coordination & Human-Reviewed AI Reporting',
    category: 'Full-stack AI Workflows · Human Review',
    domain: 'workflow',
    summary:
      'A full-stack workflow platform for NGOs to coordinate campaigns, field updates, volunteers, and human-reviewed impact reports inside organization-scoped workspaces.',
    detail:
      'Combines PostgreSQL Row-Level Security (RLS) data isolation, role-specific review states, structured report drafting, AI audit logs, and automated deployment pipelines.',
    architecturalCore:
      'Enforces database-level tenant isolation via Supabase RLS. Reports follow a strict Draft -> Supervisor Review -> Approved -> Published lifecycle with immutable audit history.',
    nodes: [
      {
        step: '01',
        name: 'Tenant-Scoped Data Ingestion',
        type: 'deterministic',
        description: 'PostgreSQL RLS ensures NGO data, volunteer profiles, and campaign logs are cryptographically isolated per organization.',
        outputSignature: 'TenantContext { org_id: "ngo_92a", rls_enforced: true }',
      },
      {
        step: '02',
        name: 'Field Evidence Aggregation',
        type: 'hybrid',
        description: 'Aggregates verified field receipts, geotagged volunteer logs, and donor milestones into structured context.',
        outputSignature: 'EvidenceContext { verified_receipts: 18, log_entries: 42 }',
      },
      {
        step: '03',
        name: 'Draft Report Generation',
        type: 'model',
        description: 'Gemini synthesizes structured impact reports with financial breakdowns and KPI metrics backed by field logs.',
        outputSignature: 'DraftReport { status: "PENDING_REVIEW", version: 1 }',
      },
      {
        step: '04',
        name: 'Human Review & Immutable Audit',
        type: 'human',
        description: 'NGO directors inspect report diffs, edit numbers, and approve for stakeholder distribution; logs every AI action.',
        outputSignature: 'PublishedReport { approved_by: "director_id", audit_logged: true }',
      },
    ],
    tradeoffs: [
      {
        decision: 'PostgreSQL RLS vs Application-Level Tenant Isolation',
        chosenPath: 'Database-Enforced Row-Level Security',
        rationale:
          'Application-level filters can fail on edge-case queries. Supabase RLS policies guarantee at the database engine level that no organization can read or write another tenant’s data.',
      },
      {
        decision: 'Multi-Stage Human Review vs Direct AI Publishing',
        chosenPath: 'Draft -> Review -> Publish Lifecycle',
        rationale:
          'Impact reports involve donor funds and institutional credibility. Direct publishing is prohibited; AI drafts are staging documents requiring human sign-off.',
      },
    ],
    metrics: [
      { label: 'Data Isolation', value: '100% RLS', context: 'Database-enforced tenant boundaries' },
      { label: 'Audit Trail', value: 'Immutable', context: 'Every AI mutation versioned & logged' },
      { label: 'Deployment', value: 'CI/CD Automated', context: 'GitHub Actions workflow testing' },
    ],
    stack: ['React', 'Vite', 'Supabase', 'Gemini API', 'PostgreSQL RLS', 'GitHub Actions'],
    signals: ['RLS isolation', 'Review workflow', 'CI / deployment', 'Audit trail'],
    repo: 'https://github.com/Dhruvg334/niswarth-ai',
    live: 'https://niswarth-ai.vercel.app/',
    tone: 'workflow',
  },
]

export const supportingProjects = [
  {
    name: 'Daedalus',
    description: 'AI-guided career navigation & skill gap analysis platform with interactive roadmaps.',
    href: 'https://github.com/Dhruvg334/Daedalus',
    tags: ['Career AI', 'Graph Roadmaps', 'React'],
  },
  {
    name: 'Shodhak',
    description: 'Autonomous travel discovery and itinerary engine with budget and booking constraints.',
    href: 'https://github.com/shyaaaa/Shodhak',
    tags: ['Itinerary AI', 'API Integrations', 'Next.js'],
  },
  {
    name: 'AIDYN',
    description: 'Explainable disaster yield and decision support system for emergency response.',
    href: 'https://github.com/Akkshita06/AIDYN-AI-Disaster-Yield-Network-',
    tags: ['Disaster AI', 'Spatial Data', 'Explainability'],
  },
  {
    name: 'Physics Study Buddy',
    description: 'Early LangGraph multi-agent RAG system for physics problem-solving and derivations.',
    href: 'https://github.com/Dhruvg334/Physics-Study-Buddy',
    tags: ['LangGraph', 'RAG', 'Python'],
  },
  {
    name: 'Closira',
    description: 'SOP-grounded support workflow automation agent for small-to-medium businesses.',
    href: 'https://github.com/Dhruvg334/closira-smb-support-agent',
    tags: ['SOP Automation', 'Agent Workflows', 'FastAPI'],
  },
  {
    name: 'Carbonly',
    description: 'Carbon emissions tracking platform with machine learning service integration.',
    href: 'https://github.com/Dhruvg334/Carbonly',
    tags: ['Sustainability', 'ML Services', 'Full-Stack'],
  },
]
