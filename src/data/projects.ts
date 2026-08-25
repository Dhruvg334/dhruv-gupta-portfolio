import { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'civitas',
    number: '01',
    name: 'Civitas',
    tagline: 'Multimodal civic incident intelligence platform converting citizen reports into structured, policy-grounded municipal action.',
    category: 'Multimodal Civic Intelligence & Spatial Decision System',
    domain: 'workflow',
    summary:
      'Civic incident reports typically arrive with incomplete context, duplicate submissions, and ambiguous jurisdiction. Civitas ingests omnichannel citizen reports (Web PWA, WhatsApp, Telegram, Open311), enforces zero-trust EXIF and binary verification, computes H3 hexagonal spatial clusters and defect metrics (cm²), grounds decisions in municipal policy via hybrid BM25 + dense RRF retrieval, and coordinates LangGraph work-order workflows with cryptographic SHA-256 resolution verification.',
    detail:
      'Designed for both residents and municipal operations teams. Features client-side HTML5 canvas image compression (40MB down to <1.2MB in <200ms), PostGIS spatial context, automated Bill of Quantities (BOQ) with Schedule of Rates (SOR) costing, spatial fleet route optimization, dynamic SLA acceleration for school and hospital corridors, and perceptual image hashing (dHash) to prevent contractor repair photo recycling.',
    architecturalCore:
      'An end-to-end LangGraph state machine coordinating zero-trust verification, CLIP vision defect sizing, H3 spatial recurrence analysis, decoupled severity/priority scoring, statutory jurisdictional resolution, and contractor anti-fraud validation sealed with immutable digital certificates.',
    nodes: [
      {
        step: '01',
        name: 'Zero-Trust Ingestion',
        type: 'deterministic',
        description: 'Validates binary magic bytes against declared MIME types, extracts EXIF GPS and timestamps, and strips camera make/model identifiers.',
        outputSignature: 'VerifiedSubmission { clean_media_url, coordinates: LatLng, timestamp: ISO8601 }',
      },
      {
        step: '02',
        name: 'Multimodal Feature Extraction',
        type: 'model',
        description: 'Computes CLIP vision embeddings, defect bounding geometry, estimated surface area (cm²), and Pavement Condition Index (PCI) scores.',
        outputSignature: 'DefectMetrics { distress_type: string, area_cm2: number, depth_mm: number, pci_score: number }',
      },
      {
        step: '03',
        name: 'H3 Spatial Hotspot & Duplicate Engine',
        type: 'deterministic',
        description: 'Indexes coordinates to H3 Resolution 8/9 hexagons, measures 6-month recurrence velocity, and clusters duplicate incident reports.',
        outputSignature: 'SpatialCluster { h3_index: string, is_chronic_zone: boolean, duplicate_cluster_id: UUID | null }',
      },
      {
        step: '04',
        name: 'Decoupled Severity & Priority Scoring',
        type: 'hybrid',
        description: 'Calculates physical infrastructure damage (Severity) and applies spatial proximity multipliers for schools (≤100m) and emergency corridors (≤250m) to dynamically accelerate statutory SLA.',
        outputSignature: 'PriorityAssessment { severity_level: 1..5, priority_score: 1..100, dynamic_sla_hours: number }',
      },
      {
        step: '05',
        name: 'Hybrid Policy Retrieval & Route Resolver',
        type: 'hybrid',
        description: 'Combines BM25 keyword matching and dense embeddings via Reciprocal Rank Fusion (RRF) to retrieve municipal operating standards and resolve maintenance authority without inter-agency ping-pong.',
        outputSignature: 'RoutePlan { primary_dept: string, jurisdiction: string, sor_items: SORCode[], policy_citations: string[] }',
      },
      {
        step: '06',
        name: 'Automated BOQ & Fleet Dispatch Batching',
        type: 'deterministic',
        description: 'Generates itemized material and labor Bill of Quantities with Schedule of Rates pricing and batches work orders into optimized turn-by-turn fleet routes across hexagonal neighborhoods.',
        outputSignature: 'WorkOrder { boq_total_inr: number, sor_breakdown: Item[], fleet_waypoints: LatLng[] }',
      },
      {
        step: '07',
        name: 'Critic Guardrail & Supervisor Gate',
        type: 'gate',
        description: 'Validates statutory entity normalization, verifies citation backing, filters prompt injection attacks, and enforces mandatory supervisor checkpoint approval.',
        outputSignature: 'ReviewState { guardrails_passed: boolean, supervisor_approved: boolean, approved_by: UserID }',
      },
      {
        step: '08',
        name: 'Resolution Verification & SHA-256 Certificate',
        type: 'deterministic',
        description: 'Computes 64-bit dHash perceptual image difference, validates spatial/temporal capture sanity, categorizes repair evidence, and seals an immutable SHA-256 municipal audit certificate.',
        outputSignature: 'AuditCertificate { cert_id: UUID, sha256_digest: string, status: RESOLVED }',
      },
    ],
    tradeoffs: [
      {
        decision: 'Decoupled Severity and Priority vs. Single Combined Urgency Score',
        chosenPath: 'Decoupled models where Severity tracks physical defect scale and Priority incorporates proximity to critical POIs and recurrence history.',
        rationale: 'A small pothole next to an elementary school gate requires faster dispatch urgency than a larger defect on an empty rural access road. Decoupling ensures operational safety without distorting engineering metrics.',
      },
      {
        decision: 'Hybrid BM25 + Dense RRF vs. Pure Vector Semantic Search',
        chosenPath: 'Reciprocal Rank Fusion (RRF) combining BM25 lexical keyword matching with dense embedding retrieval.',
        rationale: 'Pure semantic vectors often dilute exact alphanumeric municipal item codes, statutory act section numbers, and equipment catalog IDs. RRF guarantees exact statutory code recall while preserving semantic flexibility.',
      },
      {
        decision: 'Perceptual dHash + Spatial Sanity vs. Unchecked Before/After Photo Upload',
        chosenPath: 'Multi-tier automated anti-fraud validation checking dHash image differences, temporal sequencing, and 75-meter spatial radius.',
        rationale: 'Prevents municipal contractor billing fraud where contractors re-upload the original problem photo or stock images as proof of repair.',
      },
    ],
    metrics: [
      { value: '99.2%', label: 'Jurisdiction Accuracy', context: 'Hybrid BM25 + Dense RRF resolver' },
      { value: '<1.2MB', label: 'Downsampled Payload', context: 'Client HTML5 canvas downsampling from 40MB' },
      { value: '100%', label: 'Anti-Fraud Integrity', context: 'Zero-trust EXIF & dHash photo duplicate check' },
      { value: 'SHA-256', label: 'Audit Trail Sealing', context: 'Cryptographic municipal certificate generation' },
    ],
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'FastAPI',
      'Pydantic',
      'Python 3.12',
      'PostgreSQL',
      'PostGIS',
      'H3 Spatial',
      'LangGraph',
      'Groq',
      'CLIP',
      'Leaflet',
      'Supabase',
    ],
    signals: [
      'Omnichannel intake (Web, WhatsApp, Telegram, Open311)',
      'PostGIS + H3 Resolution 8/9 hexagonal spatial indexing',
      'Decoupled severity vs priority with dynamic SLA acceleration',
      'Hybrid BM25 + Dense RRF policy retrieval with citation backing',
      'Automated BOQ & Schedule of Rates (SOR) cost estimation',
      'Perceptual dHash contractor anti-fraud resolution verification',
      'Immutable SHA-256 municipal audit certificates',
    ],
    repo: 'https://github.com/Dhruvg334/civitas',
    live: 'https://civitas-web.vercel.app',
    tone: 'civic',
    mermaidDiagram: `flowchart TB
    subgraph Intake[Omnichannel Intake & Zero-Trust Verification]
        WEB[Next.js 16 Web Wizard & PWA]
        WA[WhatsApp / Telegram Webhooks]
        OPEN[Open311 GeoReport v2 API]
        MAGIC[Magic Bytes & MIME Validation]
        EXIF[EXIF GPS Extract & Device PII Strip]
    end

    subgraph Intelligence[Spatial & Multimodal Intelligence Engine]
        VISION[CLIP Vision & Defect Metric Sizing cm²]
        H3[H3 Res 8/9 Hexagonal Spatial Engine]
        DUP[Multi-Feature Duplicate Clustering]
        RISK[Decoupled Severity & Priority Engine]
        SLA[Dynamic School / Hospital SLA Accelerator]
    end

    subgraph Governance[Policy Grounding & LangGraph Workflow]
        RRF[Hybrid BM25 + Dense RRF Policy Retrieval]
        JURIS[Statutory Jurisdictional Resolver]
        GRAPH[LangGraph Checkpointed State Machine]
        BOQ[Automated BOQ & Schedule of Rates Costing]
        FLEET[Hex-Clustered Fleet Route Optimizer]
        GATE[Critic Guardrail & Supervisor Approval Gate]
    end

    subgraph Verification[Anti-Fraud Resolution & Municipal Audit]
        DHASH[64-Bit dHash Perceptual Difference Check]
        GEO_TIME[Spatial <=75m & Temporal Sanity Check]
        CERT[Cryptographic SHA-256 Audit Certificate]
        OUTBOUND[RFC 7946 GeoJSON & Contractor Scorecards]
    end

    WEB --> MAGIC
    WA --> MAGIC
    OPEN --> MAGIC
    MAGIC --> EXIF
    EXIF --> VISION
    EXIF --> H3
    VISION --> DUP
    H3 --> DUP
    DUP --> RISK
    RISK --> SLA
    SLA --> GRAPH
    GRAPH --> RRF
    RRF --> JURIS
    JURIS --> BOQ
    BOQ --> FLEET
    FLEET --> GATE
    GATE --> DHASH
    DHASH --> GEO_TIME
    GEO_TIME --> CERT
    CERT --> OUTBOUND`,
    caseStudy: {
      problemStatement:
        'Municipal public works and civic grievance channels struggle with incomplete, duplicated, and unverified citizen reports. Photos often lack technical context, duplicate complaints congest dispatcher queues, and ambiguous jurisdictional boundaries between national highways, state departments, and local municipal wards cause extensive delays. Furthermore, municipal operations face rampant contractor resolution fraud where unverified stock photos or recycled incident images are submitted to claim work completion without actual physical repairs.',
      systemDesign:
        'Civitas addresses these challenges through a unified multimodal architecture. Citizen reports from Web PWAs, WhatsApp, Telegram, or Open311 are first verified through binary magic byte validation and EXIF metadata extraction with privacy redaction. Media frames are processed by CLIP and computer vision defect sizing models to calculate surface distress areas (cm²) and depth. Reports are indexed to global H3 hexagonal grid cells (Res 8/9) to detect chronic infrastructure degradation hotspots and cluster duplicate submissions. Decisions are grounded via hybrid BM25 and dense embedding retrieval with Reciprocal Rank Fusion (RRF), ensuring statutory jurisdictional resolution. LangGraph coordinates the workflow through structured stages, generating automated Bills of Quantities (BOQ) with Schedule of Rates (SOR) costing and batched fleet crew routes, pausing for human supervisor approval before work order dispatch and verifying repairs through 64-bit dHash perceptual hashing.',
      guardrailArchitecture:
        'Civitas implements an explicit multi-tiered guardrail framework. Input guardrails filter prompt injections and sanitize citizen submissions. Domain guardrails normalize departmental aliases to statutory catalog entities and clamp dynamic SLAs within statutory policy envelopes (2h ≤ SLA ≤ 168h). Output guardrails verify citation backing and block hallucinated non-existent municipal bodies. Post-resolution anti-fraud guardrails calculate 64-bit perceptual dHash differences between before-and-after photos, verify capture timestamp sequencing, and enforce a 75-meter spatial proximity threshold to reject stock or off-site images before sealing an immutable SHA-256 audit digest.',
      evaluationAndMetrics:
        'The platform is validated through automated test harnesses across both frontend (Vitest) and backend (pytest) suites. The jurisdictional resolver achieves 99.2% statutory routing precision on ambiguous multi-agency boundary test sets. The client-side HTML5 canvas downsampler reduces raw 40MB mobile camera captures down to <1.2MB in under 200ms without loss of defect bounding fidelity. The perceptual dHash anti-fraud verification engine demonstrates 100% detection accuracy on duplicate and recycled repair photo submissions.',
    },
  },
  {
    id: 'mnemos',
    number: '02',
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
        description: 'Resolves raw equipment tags (e.g. PU-101A) against organizational taxonomies, sites, and active procedure revisions.',
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
    videoUrl: 'https://youtu.be/fs54N2vzHsM',
    docsUrl: 'https://github.com/Dhruvg334/Mnemos/tree/main/docs',
    tone: 'graph',
    mermaidDiagram: `flowchart TD
    User([Reliability Engineer]) --> UI[Next.js 16 Dashboard]
    UI --> API[FastAPI Gateway]
    API --> Auth[JWT & Site Scope Resolver]
    Auth --> Supervisor[LangGraph Investigation Supervisor]
    
    subgraph MultiStageRuntime [11-Stage Bounded Runtime]
      Supervisor --> Router[Query Router & Asset Resolver]
      Router --> Plan[Retrieval Planner]
      Plan --> ParallelRet[Parallel Multi-Hop Retrieval]
      ParallelRet --> Verifier[Evidence Verifier]
      Verifier -->|Insufficient| Fallback[Abstention & Gap Disclosure]
      Verifier -->|Verified| Specialist[Specialist Diagnostic Agents]
      Specialist --> Synthesis[RCA Report Composer]
      Synthesis --> GateCheck{Critical Action?}
    end
    
    ParallelRet --> PG[(PostgreSQL + pgvector)]
    ParallelRet --> Neo[(Neo4j Asset Graph)]
    
    GateCheck -->|Yes: Lockout / Overrides| Pause[(Durable Pause in PostgreSQL)]
    Pause --> HumanReview([Plant Supervisor Sign-off])
    HumanReview --> FinalReport[Immutable Verified Report]
    GateCheck -->|No| FinalReport`,
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
    number: '03',
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
      'Static AST code parser without code execution',
      'Tri-state release decision gates (BLOCK/REVIEW/ALLOW)',
      'Attack proof-path visualizer',
      'Automated remediation diff generator',
    ],
    repo: 'https://github.com/Dhruvg334/A-DAP-T',
    live: 'https://a-dap-t.vercel.app',
    demo: 'https://youtu.be/kU9Zc0hX8yM',
    videoUrl: 'https://youtu.be/kU9Zc0hX8yM',
    tone: 'safety',
    mermaidDiagram: `flowchart TD
    Repo[Source Repository / ZIP] --> Parser[Static AST & Syntax Parser]
    Parser --> Discovery[Surface Discovery Engine]
    
    subgraph AnalysisEngine [Deterministic Static Inspection]
      Discovery --> ToolCheck[Tool Execution Sink Auditor]
      Discovery --> AuthCheck[Route Auth & Boundary Checker]
      Discovery --> VectorCheck[Prompt Injection Heuristic Scanner]
      
      ToolCheck --> Matrix[16-Point Guardrail Verification Matrix]
      AuthCheck --> Matrix
      VectorCheck --> Matrix
    end
    
    Matrix --> GateDecision{Policy Evaluation}
    GateDecision -->|Critical Violations| Block[BLOCK: Release Aborted]
    GateDecision -->|Missing Human Gate| Review[REVIEW: Supervisor Approval Needed]
    GateDecision -->|Compliant| Allow[ALLOW: Deployment Approved]
    
    Review --> PatchGen[LLM Remediation Diff Generator]
    Block --> PatchGen`,
    caseStudy: {
      problemStatement:
        'As software engineering teams rapidly integrate autonomous AI agents and LLM tool-calling into production, applications inherit unprecedented security vulnerabilities: unconstrained database modification sinks, unsafe prompt-to-SQL bridges, insecure memory persistence, and missing human confirmation gates. Existing SAST tools focus on traditional OWASP Top 10 vulnerabilities (SQLi, XSS) and fail to detect agentic security anti-patterns like prompt injection privilege escalation or autonomous external tool invocation.',
      systemDesign:
        'A-DAP-T operates as a specialized static pre-deployment gatekeeper. It parses project repositories and uploaded archive bundles using Python and TypeScript Abstract Syntax Trees (AST). The discovery engine scans for declared tool manifests, HTTP client wrappers, database drivers, and system execution sinks. It maps trust boundaries between untrusted user prompts and sensitive execution capabilities, evaluating the codebase against 16 specialized GenAI security controls without executing untrusted code.',
      guardrailArchitecture:
        'The platform applies a tri-state policy gate (BLOCK, REVIEW, ALLOW). High-risk violations—such as unauthenticated routes invoking destructive DDL commands or missing human-in-the-loop barriers on payment/email tools—trigger an immediate BLOCK. Medium-risk items (e.g. unconstrained token budgets or raw prompt interpolation) trigger a REVIEW state with automatically synthesized code remediation diffs showing developers how to wrap tool sinks in parameter validation schemas.',
      evaluationAndMetrics:
        'Validated across synthetic benchmark repositories containing intentional OWASP LLM Top 10 vulnerabilities. Evaluates 16 distinct guardrail criteria with zero false-negative detection on unrestricted SQL sinks and unauthorized tool execution patterns. Static analysis pipeline completes full repository scans in under 1.5 seconds without incurring dynamic sandbox startup overhead.',
    },
  },
  {
    id: 'chronos',
    number: '04',
    name: 'ChronOS',
    tagline: 'Adaptive execution and constraint-aware calendar planning system for high-load individuals.',
    category: 'Deterministic Planning & Recovery Engine',
    domain: 'planning',
    summary:
      'High-performing students and founders struggle with calendar chaos, dynamic task interrupts, and unrealistic daily schedules. ChronOS pairs an adaptive AI interface with a deterministic capacity engine, parsing unstructured tasks and fitting them into realistic time slots with strict collision avoidance and Google Calendar synchronization.',
    detail:
      'Features a topological constraint solver with 158 backend tests and 37 frontend tests. Tasks are scheduled with buffer times, energy curves, and work-window limits. Includes human confirmation checkpoints and reversible sync receipts for instant rollback.',
    architecturalCore:
      'Deterministic calendar solver and capacity allocator wrapped in an event-driven FastAPI architecture. Ensures mathematically guaranteed non-overlapping schedules with two-way Google Calendar integration.',
    nodes: [
      {
        step: '01',
        name: 'Intent Parsing',
        type: 'model',
        description: 'Transforms unstructured brain dumps and task lists into structured duration, priority, and deadline constraints.',
        outputSignature: 'ParsedTaskSpec { id, duration_minutes, priority, deadline, energy_level }',
      },
      {
        step: '02',
        name: 'Constraint Validation',
        type: 'deterministic',
        description: 'Checks daily capacity bounds, sleep windows, fixed calendar anchors, and minimum break durations.',
        outputSignature: 'FeasibilityReport { is_feasible: boolean, available_slots: TimeBlock[] }',
      },
      {
        step: '03',
        name: 'Schedule Synthesis',
        type: 'hybrid',
        description: 'Solves optimal non-overlapping schedule using deterministic placement algorithms and energy curve heuristics.',
        outputSignature: 'ScheduleProposal { scheduled_tasks: ScheduledItem[], displaced_events: Event[] }',
      },
      {
        step: '04',
        name: 'Atomic Sync & Rollback',
        type: 'deterministic',
        description: 'Applies schedule to Google Calendar with reversible receipt tokens enabling instant single-click undo.',
        outputSignature: 'SyncReceipt { sync_id: UUID, events_created: number, rollback_token: string }',
      },
    ],
    tradeoffs: [
      {
        decision: 'LLM-generated schedule math vs. Deterministic constraint solver',
        chosenPath: 'Strict algorithmic placement with LLM used only for unstructured parsing',
        rationale: 'LLMs consistently hallucinate overlapping times, ignore time zones, and violate arithmetic duration bounds. Pure code solvers guarantee zero calendar collisions.',
      },
      {
        decision: 'Silent calendar mutation vs. Explicit proposal preview with rollback',
        chosenPath: 'Mandatory diff inspection with transactional rollback receipts',
        rationale: 'Users reject automated calendar tools that unpredictably overwrite existing commitments. Visual diffs ensure user confidence and total autonomy.',
      },
    ],
    metrics: [
      { value: '158 Tests', label: 'Backend Test Suite', context: 'pytest coverage across solver edge cases' },
      { value: '37 Tests', label: 'Frontend Test Suite', context: 'Vitest UI interaction & state validation' },
      { value: '0 Overlaps', label: 'Collision Rate', context: 'Mathematically guaranteed placement' },
    ],
    stack: [
      'React 19',
      'TypeScript',
      'Vite',
      'FastAPI',
      'Python 3.12',
      'Supabase Auth',
      'PostgreSQL',
      'pgvector',
      'Google Calendar API',
      'Groq',
      'Render',
      'Netlify',
    ],
    signals: [
      'Topological collision-free calendar solver',
      '158 backend + 37 frontend automated tests',
      'Reversible sync transactions with rollback tokens',
      'Two-way Google Calendar synchronization',
      'Energy-curve-aware task slot placement',
    ],
    repo: 'https://github.com/Dhruvg334/Chronos',
    live: 'https://chronos-dhruv.netlify.app',
    tone: 'planning',
    mermaidDiagram: `flowchart TD
    User([User Brain Dump]) --> NLP[FastAPI Task & Intent Parser]
    NLP --> Tasks[Structured Task Specifications]
    
    subgraph SolverCore [Deterministic Capacity Engine]
      Calendar[(Google Calendar Events)] --> AnchorResolver[Fixed Anchor Extractor]
      Tasks --> Feasibility[Capacity & Energy Validator]
      AnchorResolver --> Solver[Topological Collision Solver]
      Feasibility --> Solver
      Solver --> Proposal[Visual Schedule Proposal & Diff]
    end
    
    Proposal --> UserApproval{User Review & Approval}
    UserApproval -->|Accept| AtomicSync[Atomic Google Calendar Sync]
    UserApproval -->|Reject| Replan[Adjust Constraints & Re-solve]
    AtomicSync --> Rollback[(Rollback Receipt Token)]`,
    caseStudy: {
      problemStatement:
        'Knowledge workers, founders, and engineering students consistently suffer from schedule fragmentation and cognitive overload. While digital calendars excel at displaying scheduled meetings, they do not manage task capacity or adapt when meetings overrun. Most AI productivity tools rely on generative models to draft schedules, resulting in subtle mathematical errors: overlapping meetings, missing travel buffers, and unfeasible 14-hour deep work allocations that ignore human biological limits.',
      systemDesign:
        'ChronOS separates unstructured task comprehension from calendar arithmetic. An LLM parses free-form text input into structured task specifications (duration, priority, energy requirement, deadlines). These specifications are fed into a deterministic constraint engine written in Python. The engine pulls active events from Google Calendar via OAuth2, calculates real-world transit buffers and sleep windows, and algorithmically slots tasks into available spaces using a priority-weighted interval packing algorithm.',
      guardrailArchitecture:
        'The system enforces strict operational invariants: (1) Zero Collisions: Schedulers cannot create overlapping events under any circumstance. (2) Reversible Mutations: All calendar sync actions generate transactional receipt tokens stored in PostgreSQL, allowing users to restore their previous calendar state with one click. (3) Human Approval: Proposed schedule modifications are presented as visual diffs requiring explicit confirmation before calling external Google Calendar write APIs.',
      evaluationAndMetrics:
        'Tested comprehensively with 158 backend test suites (pytest) validating interval arithmetic, edge-case time zone conversions, DST transitions, and API failure modes. The frontend includes 37 Vitest component tests ensuring flawless drag-and-drop schedule adjustment and error state handling.',
    },
  },
  {
    id: 'tessarion',
    number: '05',
    name: 'Tessarion',
    tagline: 'Graph-grounded learning and evaluation platform with verified knowledge prerequisite tracking.',
    category: 'Source-Grounded Learning & Evaluation Suite',
    domain: 'eval',
    summary:
      'Traditional AI study tools encourage passive memorization and generate ungrounded answers. Tessarion enforces active recall through structured prerequisite concept graphs, Socratic dialogue, and automated Vitest evaluation suites that benchmark diagnostic precision against ground truth.',
    detail:
      'Combines Neo4j concept prerequisite graphs, Qdrant dense vector search, and interactive Cytoscape.js visualizations. Includes an evaluation harness with 50+ test cases measuring citation precision and diagnostic accuracy.',
    architecturalCore:
      'Graph-augmented RAG engine validating learner responses against formal curriculum ontologies. Employs Socratic evaluation loops to detect learning misconceptions before unlocking downstream concepts.',
    nodes: [
      {
        step: '01',
        name: 'Concept Ingestion',
        type: 'deterministic',
        description: 'Parses course syllabi and textbooks into hierarchical concept nodes with explicit prerequisite edges.',
        outputSignature: 'CurriculumGraph { nodes: ConceptNode[], edges: PrerequisiteEdge[] }',
      },
      {
        step: '02',
        name: 'Teach-Back Evaluation',
        type: 'hybrid',
        description: 'Analyzes student free-form explanations against source textbook chunks and prerequisite nodes.',
        outputSignature: 'DiagnosticReport { mastered_concepts: string[], misconceptions: Misconception[] }',
      },
      {
        step: '03',
        name: 'Socratic Dialogue Gate',
        type: 'model',
        description: 'Generates targeted counter-questions prompting student to discover reasoning gaps without giving away answers.',
        outputSignature: 'SocraticPrompt { target_concept: string, hint_level: 1..3, question: string }',
      },
      {
        step: '04',
        name: 'Mastery Progression',
        type: 'deterministic',
        description: 'Updates student knowledge state in Neo4j graph and unlocks downstream curriculum nodes upon verified mastery.',
        outputSignature: 'GraphUpdate { unlocked_nodes: string[], mastery_score: number }',
      },
    ],
    tradeoffs: [
      {
        decision: 'Direct answer generation vs. Socratic teach-back questioning',
        chosenPath: 'Constrained Socratic guidance requiring student self-explanation',
        rationale: 'Direct answer generation fosters passive dependency. Forcing students to explain mechanisms in their own words builds durable conceptual mastery.',
      },
      {
        decision: 'Vector similarity alone vs. Knowledge graph prerequisite enforcement',
        chosenPath: 'Neo4j prerequisite graphs combined with vector retrieval',
        rationale: 'Vector search retrieves related terms but lacks logical dependency awareness. Prerequisite graphs ensure students master fundamentals before attempting advanced topics.',
      },
    ],
    metrics: [
      { value: '50+ Cases', label: 'Evaluation Matrix', context: 'Vitest diagnostic precision benchmarks' },
      { value: '100% Citation', label: 'Evidence Grounding', context: 'All Socratic prompts link to textbook sources' },
      { value: 'Neo4j + Qdrant', label: 'Hybrid Graph & Vector', context: 'Curriculum ontology and dense retrieval' },
    ],
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Supabase',
      'Neo4j',
      'Qdrant',
      'Cytoscape.js',
      'Vitest',
      'Tailwind CSS',
    ],
    signals: [
      'Neo4j prerequisite knowledge graphs',
      'Cytoscape.js interactive curriculum visualizer',
      '50+ Vitest automated diagnostic test cases',
      'Socratic teach-back active recall framework',
      'Source-grounded citation linking to textbook passages',
    ],
    repo: 'https://github.com/Dhruvg334/Tessarion',
    tone: 'learning',
    mermaidDiagram: `flowchart TD
    Student([Student Explanation]) --> Ingest[Concept Extraction Pipeline]
    Ingest --> GraphLookup[Neo4j Prerequisite Graph Lookup]
    
    subgraph DiagnosticEngine [Ground-Truth Evaluation]
      GraphLookup --> VectorRet[Qdrant Dense Vector Retrieval]
      VectorRet --> Diagnostic[Misconception Classifier]
      Diagnostic --> EvalMatrix[Vitest 50+ Test Suite Harness]
    end
    
    Diagnostic --> Mastered{Mastery Threshold Met?}
    Mastered -->|Yes| Unlock[Unlock Downstream Concept in Neo4j]
    Mastered -->|No: Reasoning Gap| Socratic[Socratic Remediation Generator]
    
    Socratic --> SourceCitation[Attach Textbook Page Citation]
    SourceCitation --> NextPrompt([Prompt Student for Clarification])`,
    caseStudy: {
      problemStatement:
        'Most AI learning assistants act as conversational search engines that simply provide direct answers to homework problems. This encourages surface-level reading without building long-term retention. When students encounter complex, hierarchical subjects like Machine Learning, Operating Systems, or Control Theory, they frequently develop persistent misconceptions because they skip foundational prerequisites.',
      systemDesign:
        'Tessarion organizes curricula as a directed acyclic graph (DAG) in Neo4j where edges represent strict prerequisite relationships. Ingestion breaks verified academic textbooks into chunk embeddings stored in Qdrant. When a student attempts a concept, the interface initiates a teach-back challenge. The student\'s explanation is evaluated against the prerequisite ontology and source chunks to diagnose exact conceptual gaps.',
      guardrailArchitecture:
        'The platform prevents hallucinated feedback by constraining remediation exclusively to verified source textbook passages. Socratic responses must include exact book title, chapter, and page references. Students cannot unlock advanced topics until the diagnostic classifier confirms baseline mastery across all upstream graph dependencies.',
      evaluationAndMetrics:
        'Includes an automated test matrix of 50+ synthetic student explanations with known misconceptions. Evaluates the diagnostic classifier across precision, recall, and citation validity using Vitest regression suites.',
    },
  },
  {
    id: 'inamigos',
    number: '06',
    name: 'InAmigos Operations System',
    tagline: 'Enterprise NGO operational platform, volunteer automation, and transparent impact tracking.',
    category: 'Enterprise NGO Operations & Verification System',
    domain: 'workflow',
    summary:
      'Non-profit organizations manage high-volume volunteer initiatives and donation flows across decentralized chapters, leading to fragmented reporting and lost operational visibility. Built an enterprise web application unifying event management, verified volunteer logs, and donor impact dashboards with role-based access control.',
    detail:
      'Engineered during an internship with InAmigos Foundation. Features role-based permission tiers (Admin, Chapter Lead, Volunteer, Donor), automated activity audits, certificate verification generation, and responsive management dashboards.',
    architecturalCore:
      'Full-stack management architecture with PostgreSQL Row Level Security (RLS) policies, automated certificate generation with cryptographic hashes, and real-time operational metrics.',
    nodes: [
      {
        step: '01',
        name: 'RBAC Authentication',
        type: 'deterministic',
        description: 'Enforces strict role-based access control across national admins, chapter leads, and field volunteers.',
        outputSignature: 'AuthScope { user_id, role: RoleTier, chapter_id, permissions: string[] }',
      },
      {
        step: '02',
        name: 'Activity Logging',
        type: 'deterministic',
        description: 'Records volunteer work sessions with GPS verification, chapter association, and supervisor review states.',
        outputSignature: 'ActivityRecord { session_id, hours_logged, verified: boolean }',
      },
      {
        step: '03',
        name: 'Impact Aggregation',
        type: 'hybrid',
        description: 'Calculates real-time chapter metrics, donation utilization rates, and community outreach KPIs.',
        outputSignature: 'ImpactMetrics { total_beneficiaries, funds_deployed, active_volunteers }',
      },
      {
        step: '04',
        name: 'Certificate Verification',
        type: 'deterministic',
        description: 'Generates tamper-proof volunteer certificates with unique verification IDs and QR validation links.',
        outputSignature: 'Certificate { cert_id: UUID, verification_url: string, qr_code: string }',
      },
    ],
    tradeoffs: [
      {
        decision: 'Centralized admin controls vs. Delegated chapter-level autonomy',
        chosenPath: 'Hierarchical chapter RBAC with centralized oversight and audit trails',
        rationale: 'Allows local chapter leads to coordinate events rapidly while preserving national governance, financial transparency, and compliance.',
      },
      {
        decision: 'Simple static certificate templates vs. Cryptographically verifiable records',
        chosenPath: 'Database-backed certificate records with unique validation URLs',
        rationale: 'Prevents fraudulent credential claims and provides educational institutions with verifiable proof of volunteer service.',
      },
    ],
    metrics: [
      { value: '4 Roles', label: 'Access Control', context: 'Admin, Lead, Volunteer, Donor' },
      { value: '100% Verifiable', label: 'Certificate Integrity', context: 'QR-enabled verification engine' },
      { value: 'Real-Time', label: 'Impact Analytics', context: 'Live donation & outreach tracking' },
    ],
    stack: [
      'React 19',
      'TypeScript',
      'Vite',
      'Supabase',
      'PostgreSQL',
      'Tailwind CSS',
      'Lucide React',
    ],
    signals: [
      'Hierarchical role-based access control (RBAC)',
      'Cryptographically verifiable certificate generator',
      'Real-time volunteer and donation analytics',
      'PostgreSQL Row-Level Security (RLS) policies',
      'Mobile-responsive operations dashboard',
    ],
    repo: 'https://github.com/Dhruvg334',
    live: 'https://inamigosfoundation.org',
    tone: 'workflow',
    mermaidDiagram: `flowchart TD
    User([Portal User]) --> Auth[Supabase Auth & RBAC Resolver]
    Auth --> RoleCheck{Role Assignment}
    
    RoleCheck -->|National Admin| AdminView[National Governance & Analytics]
    RoleCheck -->|Chapter Lead| ChapterView[Event Planning & Volunteer Approvals]
    RoleCheck -->|Volunteer| VolView[Hours Logging & Certificate Hub]
    RoleCheck -->|Donor| DonorView[Transparent Impact Dashboard]
    
    subgraph OperationalCore [Verified Operations Engine]
      VolView --> HoursLog[Activity Verification Queue]
      ChapterView --> HoursLog
      HoursLog --> PG[(PostgreSQL + RLS Policies)]
      PG --> CertGen[Verifiable Certificate Generator]
      PG --> Analytics[Real-Time Impact Aggregator]
    end
    
    CertGen --> QRCode([Public QR Verification Link])
    Analytics --> DonorView`,
    caseStudy: {
      problemStatement:
        'Non-profit organizations managing volunteer programs across diverse geographic chapters frequently struggle with fragmented data: volunteer hours are tracked on spreadsheets, certificates are easily forged, and donors lack clear visibility into how contributions translate to tangible community impact. Without centralized verification, administrative overhead consumes substantial resources that should be directed toward grassroots operations.',
      systemDesign:
        'Engineered an enterprise NGO operations platform during an internship at InAmigos Foundation. The application provides an integrated web platform connecting volunteers, chapter leads, national administrators, and donors. Built with React, TypeScript, and Supabase, the architecture leverages PostgreSQL Row Level Security (RLS) to enforce data boundaries across chapter tiers.',
      guardrailArchitecture:
        'The platform implements strict verification guardrails: volunteer hours require explicit chapter supervisor confirmation before counting toward official credentials. Certificate generation binds unique UUIDs, recipient names, and completion dates into database-backed records accessible via public QR verification links, preventing credential tampering.',
      evaluationAndMetrics:
        'Deployed across active organizational workflows, supporting multi-chapter coordination, automated volunteer hour audits, and transparent donor impact reporting with zero security boundary violations.',
    },
  },
]

export const supportingProjects = [
  {
    name: 'Niswarth AI — NGO Governance System',
    description: 'Autonomous multi-agent document analysis system for NGO audit trails and regulatory compliance.',
    tags: ['FastAPI', 'LangGraph', 'PostgreSQL', 'Docker'],
    href: 'https://github.com/Dhruvg334/Niswarth-AI',
  },
  {
    name: 'Shodhak — Career Roadmap Graph',
    description: 'Interactive career knowledge graph with verified learning path projections. Winner, Zero to Live Challenge.',
    tags: ['Next.js', 'React Flow', 'Knowledge Graphs', 'Supabase'],
    href: 'https://github.com/Dhruvg334/Shodhak',
  },
  {
    name: 'Disaster Decision Support System',
    description: 'Geospatial emergency response routing and resource allocation engine under infrastructure constraints.',
    tags: ['Python', 'GIS', 'Routing Algorithms', 'FastAPI'],
    href: 'https://github.com/Dhruvg334',
  },
]
