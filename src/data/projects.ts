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
      { value: '<1.2MB', label: 'Payload Size', context: 'Client HTML5 canvas downsampling from 40MB' },
      { value: '100%', label: 'Anti-Fraud Integrity', context: 'Zero-trust EXIF & dHash photo duplicate check' },
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
    id: 'carbonly',
    number: '06',
    name: 'Carbonly',
    tagline: 'Auditable carbon intelligence and enterprise decarbonization optimization platform.',
    category: 'Auditable Carbon Accounting & ESG Intelligence Platform',
    domain: 'eval',
    summary:
      'Enterprise ESG reporting requires auditable, reproducible calculations without arithmetic hallucinations. Carbonly converts operational activity data into traceable GHG Protocol inventories (Scope 1, 2, and 3), performs time-series model selection competition (Holt-Winters vs ARIMA), quantifies risk via 10,000-iteration Monte Carlo simulations, detects multi-variate anomalies via 5x5 Gauss-Jordan Mahalanobis matrix inversion, and optimizes capital investments via Primal Simplex linear programming.',
    detail:
      'Strictly separates deterministic mathematical execution from AI narrative reasoning. Groq LLM (LLaMA-3.3-70B) operates purely as a read-only explanatory proxy over immutable calculation proofs, while mathematical algorithms handle matrix elimination, Simplex pivots, and DEFRA/EPA emission factor resolution.',
    architecturalCore:
      'Pure deterministic mathematical engine backed by an immutable Emission Factor Registry, Directed Acyclic Graph (DAG) provenance tracer, 5x5 Mahalanobis matrix inverter, and Primal Simplex linear programming solver.',
    nodes: [
      {
        step: '01',
        name: 'Idempotent Ingestion & Quality Audit',
        type: 'deterministic',
        description: 'Validates streaming NDJSON payloads, enforces schema bounds, detects drift, and deduplicates using transaction idempotency keys.',
        outputSignature: 'ValidatedBatch { processed_count: number, idempotency_keys: string[] }',
      },
      {
        step: '02',
        name: 'Emission Factor Registry Resolver',
        type: 'deterministic',
        description: 'Resolves versioned DEFRA and EPA eGRID factors with immutable lifecycle governance (Draft, Reviewed, Approved, Active, Deprecated).',
        outputSignature: 'ResolvedFactors { efr_version: string, scope1_rate, scope2_rate, scope3_rates }',
      },
      {
        step: '03',
        name: 'Deterministic Scope 1/2/3 Engine',
        type: 'deterministic',
        description: 'Calculates exact GHG Protocol Scope 1, Scope 2 (market/location), and Scope 3 lifecycle totals with calculation provenance IDs.',
        outputSignature: 'CarbonInventory { calc_id: UUID, total_co2e_kg: number, scope_breakdown: ScopeTotals }',
      },
      {
        step: '04',
        name: 'Time-Series Model Competition',
        type: 'hybrid',
        description: 'Competes Holt-Winters Triple Exponential Smoothing vs ARIMA(1,1,1) with CSS MA(1) estimation vs Seasonal Naive benchmarks on out-of-sample test splits.',
        outputSignature: 'WinningModel { model: string, out_of_sample_smape_pct: number, forecast_horizon: MonthlyPoint[] }',
      },
      {
        step: '05',
        name: 'Mahalanobis 5x5 Matrix Anomaly Detection',
        type: 'deterministic',
        description: 'Inverts sample covariance matrix via 5x5 Gauss-Jordan elimination to detect joint multi-variate anomalies exceeding Chi-Square thresholds.',
        outputSignature: 'AnomalyReport { mahalanobis_dist: number, is_outlier: boolean, chi_sq_critical: 11.07 }',
      },
      {
        step: '06',
        name: '10k-Iteration Monte Carlo Uncertainty',
        type: 'deterministic',
        description: 'Draws 10,000 independent Log-Normal and Box-Muller Gaussian stochastic iterations to generate P10-P90 and P2.5-P97.5 confidence bounds.',
        outputSignature: 'UncertaintyBounds { p10: number, p50: number, p90: number, std_dev: number }',
      },
      {
        step: '07',
        name: 'Primal Simplex Decarbonization Solver',
        type: 'deterministic',
        description: 'Constructs a 5-row Simplex Tableau and executes Gauss-Jordan pivots to maximize carbon avoided under annual capital budget limits.',
        outputSignature: 'OptimizationPlan { max_co2e_avoided_kg: number, optimal_allocation: ProjectShare[] }',
      },
      {
        step: '08',
        name: 'Evidence-Grounded AI Proxy',
        type: 'model',
        description: 'Groq LLaMA-3.3-70B synthesizes executive insights and compliance audit reports strictly grounded in verified calculation proofs.',
        outputSignature: 'ExecutiveNarrative { summary: string, proof_hash: string, recommendations: string[] }',
      },
    ],
    tradeoffs: [
      {
        decision: 'Decoupled Deterministic Math vs. LLM Direct Arithmetic',
        chosenPath: '100% deterministic code for all equations and matrix operations; LLM strictly read-only explanation proxy.',
        rationale: 'Passing arithmetic to LLMs causes non-reproducible calculations and audit disqualifications. Deterministic engines guarantee mathematical certainty.',
      },
      {
        decision: 'Full 5x5 Covariance Matrix Inversion vs. Univariate Z-Scores',
        chosenPath: '5x5 Gauss-Jordan matrix inversion for Mahalanobis distance quadratic form.',
        rationale: 'Univariate Z-scores fail to detect joint cross-variable anomalies (e.g. normal fuel use alongside zero electricity in active operating facilities).',
      },
      {
        decision: 'Holt-Winters / ARIMA Model Selection Competition vs. Static Forecasting',
        chosenPath: 'Empirical out-of-sample sMAPE competition selecting the top model per facility time-series.',
        rationale: 'Different facilities exhibit differing seasonal and trend dynamics; competition guarantees optimal predictive accuracy.',
      },
    ],
    metrics: [
      { value: '0.0000 kg', label: 'Arithmetic Error', context: 'Zero floating-point standard deviation' },
      { value: '10,000 Draws', label: 'Monte Carlo Simulation', context: 'Non-parametric Log-Normal confidence intervals' },
      { value: '100% Passed', label: '40 Test Cases', context: 'Automated Node.js validation test suite' },
    ],
    stack: [
      'Node.js',
      'Express 5',
      'JavaScript',
      'FastAPI',
      'Groq LLaMA-3.3-70B',
      'Primal Simplex LP',
      'Gauss-Jordan Inversion',
      'Monte Carlo Engine',
      'Netlify',
      'Render',
    ],
    signals: [
      'Deterministic GHG Protocol Scope 1/2/3 calculation engine',
      '5x5 Gauss-Jordan Mahalanobis matrix inversion anomaly detection',
      '10,000-draw Log-Normal Monte Carlo uncertainty quantification',
      'Holt-Winters vs ARIMA(1,1,1) time-series model selection competition',
      'Primal Simplex linear programming decarbonization capital optimizer',
    ],
    repo: 'https://github.com/Dhruvg334/Carbonly',
    live: 'https://carbonlyai.netlify.app/',
    tone: 'planning',
    mermaidDiagram: `flowchart TD
    DataIn[Enterprise Activity Stream] --> Pipe[High-Throughput Ingestion Pipeline]
    Pipe --> Quality[Data Quality & Schema Drift Engine]
    Quality --> Reg[Emission Factor Registry EFR]
    Reg --> Engine[Deterministic Scope 1/2/3 Carbon Engine]
    
    Engine --> DAG[Lineage DAG & Proof Store calc_83a91f]
    DAG --> Comp[Time-Series Competition HW vs ARIMA vs Naive]
    DAG --> Mahal[5x5 Mahalanobis Distance Matrix Inverter]
    DAG --> Monte[10k-Iteration Monte Carlo Uncertainty Engine]
    DAG --> Simplex[Primal Simplex Linear Decarbonization Solver]
    DAG --> SHAP[KernelSHAP Surrogate Explainer]
    
    Comp --> AIProxy[Evidence-Grounded AI Proxy - Groq LLaMA-3.3]
    Mahal --> AIProxy
    Monte --> AIProxy
    Simplex --> AIProxy
    SHAP --> AIProxy
    
    AIProxy --> Reports[Audit-Ready ESG Inventory Report]
    AIProxy --> Export[Columnar Warehouse NDJSON Export]`,
    caseStudy: {
      problemStatement:
        'Corporate sustainability reporting faces increasing regulatory scrutiny under CSRD and SEC disclosure mandates. However, enterprise emission calculation pipelines frequently suffer from unversioned factor changes, unquantified uncertainty bounds, and unverified AI arithmetic hallucinations where generic models estimate carbon metrics without deterministic backing.',
      systemDesign:
        'Carbonly solves this by enforcing a strict architectural seam: all quantitative calculations (Scope 1, Scope 2 market/location, Scope 3 categories, matrix inversions, and Simplex linear programming) are performed by deterministic mathematical engines. An immutable Emission Factor Registry tracks versioned factors, a DAG provenance tracer attaches calculation IDs, and the Groq LLM operates as a grounded explanatory proxy over verified calculation proofs.',
      guardrailArchitecture:
        'Enforces input schema assertion bounds ($0 \\le \\text{transportKm} \\le 100,000$), idempotency deduplication keys, 5x5 Gauss-Jordan matrix correlation boundaries, and KernelSHAP surrogate model verification satisfying the efficiency axiom ($\\sum \\phi_i = f(x) - E[f(x)]$).',
      evaluationAndMetrics:
        'Verified across 40 automated test cases with 100% pass rate. Evaluates floating-point deviation to $\\pm 10^{-6} \\text{ kg CO}_2\\text{e}$ tolerance with zero arithmetic deviation from UK DEFRA and US EPA benchmark vectors.',
    },
  },
  {
    id: 'daedalus',
    number: '07',
    name: 'Daedalus',
    tagline: 'AI-powered career simulation and decision platform with deterministic fit scoring.',
    category: 'Structured Career Decision & AI Exposure Navigation System',
    domain: 'planning',
    summary:
      'Students and early-career professionals struggle to evaluate career trajectories, understand automation exposure, and turn career ambiguity into structured plans. Daedalus delivers personalized career simulations, task-level AI exposure matrices, prioritized skill gap roadmaps, and 7-day action sprint plans backed by transparent scoring traces.',
    detail:
      'Built around structured data and deterministic algorithms rather than generic open-ended chat. A multi-stage scoring engine computes fit, difficulty, growth, and AI exposure signals across career archetypes with transparent trace logs and curated learning resources.',
    architecturalCore:
      'Structured simulation engine combining multi-factor candidate ranking, task-level AI exposure modeling, graph skill distance calculation, and Gemini reranking with full decision trace auditability.',
    nodes: [
      {
        step: '01',
        name: 'Profile Normalization',
        type: 'deterministic',
        description: 'Normalizes student skills, working styles, risk tolerances, and interests into a standardized candidate feature vector.',
        outputSignature: 'CandidateVector { skills: string[], work_style: Vector, risk_pref: number }',
      },
      {
        step: '02',
        name: 'Multi-Factor Scoring Engine',
        type: 'deterministic',
        description: 'Evaluates candidate vectors against career archetypes, computing fit scores, growth velocity, and prerequisite distance.',
        outputSignature: 'ScoredPaths { candidate_paths: CareerScore[], baseline_ranks: Rank[] }',
      },
      {
        step: '03',
        name: 'Task-Level AI Exposure Analysis',
        type: 'hybrid',
        description: 'Deconstructs selected career paths into task taxonomies, evaluating automation exposure vs human-in-the-loop advantages.',
        outputSignature: 'ExposureMatrix { routine_cognitive: number, creative_judgment: number, ai_exposure_score: number }',
      },
      {
        step: '04',
        name: '7-Day Action Sprint Generator',
        type: 'model',
        description: 'Synthesizes an immediate daily project sprint plan with curated learning resources and internship opportunity matches.',
        outputSignature: 'SprintPlan { daily_milestones: DayTask[], learning_hubs: Resource[], trace_id: UUID }',
      },
    ],
    tradeoffs: [
      {
        decision: 'Deterministic Multi-Factor Scoring vs. Generative Career Chatbot',
        chosenPath: 'Structured deterministic scoring algorithms with AI used strictly for explanation and sprint synthesis.',
        rationale: 'Career advice requires consistent, transparent metrics rather than non-deterministic conversational suggestions.',
      },
      {
        decision: 'Task-Level AI Exposure Matrix vs. Broad Job Category Automation Risk',
        chosenPath: 'Deconstruct careers into specific tasks (routine vs cognitive vs social) to pinpoint human advantage.',
        rationale: 'Whole-job risk labels create unwarranted panic; task-level analysis shows specific skills where human judgment excels.',
      },
    ],
    metrics: [
      { value: '100% Traceable', label: 'Decision Transparency', context: 'Audit trace on all scoring paths' },
      { value: '3 Paths', label: 'Comparative Simulation', context: 'Side-by-side career trade-off matrix' },
      { value: '7-Day', label: 'Action Sprint', context: 'Immediate project-based roadmap conversion' },
    ],
    stack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'FastAPI',
      'Python 3.12',
      'Pydantic',
      'SQLAlchemy',
      'Tailwind CSS',
      'Radix UI',
      'Gemini Flash',
      'Vercel',
    ],
    signals: [
      'Structured profile normalization and deterministic scoring engine',
      'Task-level AI exposure and automation vulnerability matrix',
      'Priority skill gap and curated learning resource resolver',
      '7-day sprint conversion for immediate actionability',
      'Auditable recommendation traces with confidence transparency',
    ],
    repo: 'https://github.com/Dhruvg334/Daedalus',
    live: 'https://daedalus-iota.vercel.app/',
    tone: 'planning',
    mermaidDiagram: `flowchart TD
    User([User Profile Input]) --> Ingest[Profile Normalization Gateway]
    Ingest --> Vector[Candidate Feature Vector]
    
    subgraph SimulationEngine [Deterministic Decision Engine]
      Vector --> Scorer[Multi-Factor Career Scoring Engine]
      Scorer --> Exposure[Task-Level AI Exposure Analyzer]
      Scorer --> Skills[Skill Gap Distance Graph]
      Exposure --> Comp[Career Comparison Matrix]
      Skills --> Hub[Learning & Opportunity Resolver]
    end
    
    Comp --> Sprint[7-Day Action Sprint Planner]
    Hub --> Sprint
    Sprint --> Trace[Decision Trace & Audit Log]
    Trace --> Dashboard[Interactive Career Cockpit]`,
    caseStudy: {
      problemStatement:
        'Students and early-career engineers face unprecedented career ambiguity in the age of AI. Traditional career counseling relies on generic psychometric tests or open-ended chatbots that offer vague encouragement without structured analysis of technical skill gaps, market automation exposure, or actionable execution plans.',
      systemDesign:
        'Daedalus combines structured input normalization, deterministic multi-factor scoring, and task-level AI exposure analysis with a Next.js 15 client and FastAPI backend. It generates a multi-dimensional career simulation comparing 3 distinct trajectories, highlights specific human-advantage competencies, and builds a concrete 7-day action sprint.',
      guardrailArchitecture:
        'Scores are bound to reproducible mathematical weights with fallback deterministic paths if external model APIs are unreachable. All recommendation decisions output transparent calculation traces explaining why specific career paths scored highest.',
      evaluationAndMetrics:
        'Validated across 12 distinct persona test profiles with 100% deterministic score reproducibility across repeated runs and zero hallucinated skill requirements.',
    },
  },
  {
    id: 'aidyn',
    number: '08',
    name: 'AIDYN',
    tagline: 'AI disaster response cockpit and multi-hazard priority coordinator for emergency operations.',
    category: 'AI Disaster Response & Multi-Hazard Priority Coordinator',
    domain: 'safety',
    summary:
      'During humanitarian crises, emergency response teams receive scattered, high-volume reports across hazard alerts, water contamination, hospital overloading, and road blockages. AIDYN coordinates disparate incident reports, extracts multi-hazard risk signals, computes deterministic priority rankings, matches resource deficits, and synthesizes responder-ready mission briefs with human supervisor review.',
    detail:
      'Engineered around an explicit operational decision flow: Report → Signal → Deterministic Score → Human Review → Resource Gap → Response Task → Mission Brief. Prevents black-box AI prioritization by enforcing domain-specific scoring equations across hazard, water, health, and logistics signals.',
    architecturalCore:
      'Multi-modular priority coordination engine backed by deterministic domain scoring rules, emergency supply deficit matchers, and structured responder brief synthesis.',
    nodes: [
      {
        step: '01',
        name: 'Field Report Ingestion',
        type: 'deterministic',
        description: 'Ingests unstructured crisis incident reports from field teams, SMS channels, and sensor telemetry.',
        outputSignature: 'RawIncidentReport { report_id: UUID, location: GeoPoint, timestamp: ISO8601, text: string }',
      },
      {
        step: '02',
        name: 'Multi-Modal Signal Extraction',
        type: 'model',
        description: 'Extracts domain-specific risk signals across infrastructure damage, water potable status, casualty counts, and access routes.',
        outputSignature: 'ExtractedSignals { hazard_level: 1..5, water_unsafe: boolean, hospital_overload: boolean, road_blocked: boolean }',
      },
      {
        step: '03',
        name: 'Multi-Module Priority Scorer',
        type: 'deterministic',
        description: 'Executes mathematical domain scoring formulas across hazard, water, health, and logistics modules to calculate community urgency.',
        outputSignature: 'CommunityPriorityQueue { ranked_communities: PriorityNode[], deficit_flags: Deficit[] }',
      },
      {
        step: '04',
        name: 'Supervisor Review & Brief Generator',
        type: 'gate',
        description: 'Enforces human coordinator sign-off before synthesizing structured, responder-ready deployment briefs.',
        outputSignature: 'ResponderBrief { mission_id: UUID, priority_rank: number, tasks: TaskItem[], approved_by: UserID }',
      },
    ],
    tradeoffs: [
      {
        decision: 'Multi-Module Domain Scorer vs. Monolithic LLM Urgency Rating',
        chosenPath: 'Dedicated deterministic sub-modules for Hazard, Water, Health, and Logistics.',
        rationale: 'Monolithic LLM ratings exhibit arbitrary score drift; modular mathematical equations ensure life-safety priority consistency.',
      },
      {
        decision: 'Mandatory Human Gate vs. Fully Autonomous Task Dispatch',
        chosenPath: 'Enforce human emergency coordinator review before releasing responder briefs.',
        rationale: 'Autonomous resource dispatch in emergency conditions carries extreme life-safety liability; coordinators must retain final sign-off authority.',
      },
    ],
    metrics: [
      { value: '<2.1s', label: 'Triage Latency', context: 'Fast multi-signal incident processing' },
      { value: '4 Modules', label: 'Domain Coordination', context: 'Hazard, water, health, logistics' },
      { value: '100%', label: 'Human Gate', context: 'Mandatory sign-off on dispatch actions' },
    ],
    stack: [
      'React 19',
      'TypeScript',
      'FastAPI',
      'Python 3.12',
      'Pydantic',
      'Tailwind CSS',
      'Lucide Icons',
      'Vercel',
    ],
    signals: [
      'Omnichannel crisis incident report extraction',
      'Multi-module deterministic hazard, water, health & logistics scoring',
      'Resource deficit matching against available emergency supply pools',
      'Mandatory human supervisor review before action dispatch',
      'Structured responder-ready mission briefs with transparent evidence traces',
    ],
    repo: 'https://github.com/Dhruvg334/aidyn',
    tone: 'safety',
    mermaidDiagram: `flowchart TD
    Field[Scattered Field Reports] --> Ingest[Incident Ingestion Engine]
    Ingest --> Signals[Multi-Modal Signal Extraction]
    
    subgraph PriorityCoordinator [Multi-Module Priority Engine]
      Signals --> HazMod[Hazard Severity Module]
      Signals --> WaterMod[Water Safety Module]
      Signals --> HealthMod[Health & Casualty Module]
      Signals --> LogMod[Logistics & Access Module]
      
      HazMod --> Coordinator[Priority Queue Coordinator]
      WaterMod --> Coordinator
      HealthMod --> Coordinator
      LogMod --> Coordinator
    end
    
    Coordinator --> Deficit[Emergency Resource Deficit Matcher]
    Deficit --> ReviewGate{Human Supervisor Review Gate}
    ReviewGate -->|Approved| BriefGen[Responder-Ready Mission Brief Generator]
    ReviewGate -->|Adjust| Coordinator
    BriefGen --> Dispatch[Field Response Units]`,
    caseStudy: {
      problemStatement:
        'In natural disasters and humanitarian crises, emergency command centers fail not from lack of information, but because incoming data is chaotic, conflicting, and scattered across multiple domain channels. Responders need immediate clarity on which community needs help first, why, and what specific resources must be dispatched.',
      systemDesign:
        'AIDYN ingests field reports, extracts structured risk signals, and routes them through four deterministic domain modules (Hazard, Water, Health, Logistics). The Priority Coordinator ranks communities according to objective vulnerability formulas, matches resource gaps against aid depots, and prepares structured mission briefs for emergency coordinator review.',
      guardrailArchitecture:
        'All priority rankings maintain explicit evidence citations detailing the specific field reports and sensor readings that triggered the score. Automated resource allocations cannot execute without coordinator sign-off.',
      evaluationAndMetrics:
        'Simulated across high-load multi-hazard disaster scenarios with sub-2.1s report-to-triage processing time and 100% adherence to human gate sign-off protocols.',
    },
  },
  {
    id: 'preliator',
    number: '09',
    name: 'Preliator',
    tagline: 'Agentic production-readiness, security, and architectural risk evaluator.',
    category: 'Agentic Production-Readiness & Architectural Risk Evaluator',
    domain: 'safety',
    summary:
      'Preliator is an automated engineering evaluator that performs deep static AST analysis, trust boundary mapping, security vulnerability triage, infrastructure scale readiness grading, and synthesized code remediation diffs prior to production deployments.',
    detail:
      'Reviews applications across 7 critical dimensions: security, architecture, scalability, infrastructure, operational readiness, code quality, and risk posture. Maps API surfaces, sensitive operations, and database query sinks to generate actionable pull-request patches before launch.',
    architecturalCore:
      'Static AST parsing pipeline combined with capability inventory mapping, tri-state policy gate enforcement, and automated schema-validated remediation patch synthesis.',
    nodes: [
      {
        step: '01',
        name: 'Repository Structure & AST Ingest',
        type: 'deterministic',
        description: 'Analyzes project file trees, module manifests, frameworks, and syntax trees as text only.',
        outputSignature: 'RepoInventory { modules: Module[], routes: Route[], ast_nodes: ASTMap }',
      },
      {
        step: '02',
        name: 'Trust Boundary & Capability Mapper',
        type: 'deterministic',
        description: 'Maps untrusted inputs, authentication barriers, database sinks, external APIs, and file operations.',
        outputSignature: 'CapabilityMap { sensitive_sinks: Sink[], auth_gaps: Route[] }',
      },
      {
        step: '03',
        name: 'Security & Scale Policy Evaluation',
        type: 'hybrid',
        description: 'Evaluates architectural rules across SQL injection risks, concurrency bottlenecks, and unauthenticated endpoints.',
        outputSignature: 'EvaluationMatrix { passed_rules: string[], security_findings: Finding[], scale_score: number }',
      },
      {
        step: '04',
        name: 'Policy Gate & Patch Generator',
        type: 'gate',
        description: 'Outputs BLOCK / REVIEW / ALLOW deployment decisions and synthesizes code remediation diffs.',
        outputSignature: 'ReadinessReport { decision: "BLOCK" | "REVIEW" | "ALLOW", diffs: PatchDiff[] }',
      },
    ],
    tradeoffs: [
      {
        decision: 'Static AST Text Inspection vs. Dynamic Sandbox Execution',
        chosenPath: 'Strict static text and AST analysis with zero untrusted code execution.',
        rationale: 'Static parsing is instantaneous, safe, and avoids complex container spin-up overhead and security risks.',
      },
      {
        decision: 'Automated Remediation Diffs vs. Generic Text Advice',
        chosenPath: 'Synthesize exact syntax-validated code diffs that developers can apply directly.',
        rationale: 'Concrete code patches eliminate ambiguity and dramatically accelerate security vulnerability remediation.',
      },
    ],
    metrics: [
      { value: '<1.5s', label: 'Full AST Scan', context: 'Instantaneous static codebase audit' },
      { value: '7 Dimensions', label: 'Readiness Scope', context: 'Security, scale, infra, architecture' },
      { value: '0 False Neg', label: 'Critical Sink Detection', context: 'Unrestricted database/auth sinks' },
    ],
    stack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'FastAPI',
      'Python 3.12',
      'AST Parser',
      'Pydantic',
      'Tailwind CSS',
      'Vercel',
    ],
    signals: [
      'Deep static AST repository structure and capability inventory',
      'Trust boundary and sensitive operation permission mapping',
      'Tri-state production deployment policy gate (BLOCK, REVIEW, ALLOW)',
      'Automated code remediation diff generation with schema validation',
      'Infrastructure and database bottleneck scalability evaluation',
    ],
    repo: 'https://github.com/Dhruvg334/Preliator',
    tone: 'safety',
    mermaidDiagram: `flowchart TD
    Source[Codebase Repository] --> Parser[Static AST & Syntax Analyzer]
    Parser --> Map[Trust Boundary & Capability Mapper]
    
    subgraph MultiDimensionAuditor [Production-Readiness Engine]
      Map --> Sec[Security & Vulnerability Triage]
      Map --> Arch[Architecture & Dependency Review]
      Map --> Scale[Scale & Bottleneck Readiness]
      Map --> Infra[Infrastructure & Config Audit]
      
      Sec --> Matrix[7-Dimension Readiness Matrix]
      Arch --> Matrix
      Scale --> Matrix
      Infra --> Matrix
    end
    
    Matrix --> Gate{Deployment Policy Gate}
    Gate -->|Critical Risks| Block[BLOCK Release]
    Gate -->|Warnings| Review[REVIEW Required]
    Gate -->|Passed| Allow[ALLOW Production]
    
    Block --> Diff[Remediation Diff Synthesizer]
    Review --> Diff`,
    caseStudy: {
      problemStatement:
        'Engineering teams frequently deploy applications without verifying production readiness across architecture, security, and scale dimensions. Traditional linters only check code style, while standard security scanners miss architectural bottlenecks, missing human confirmation gates on autonomous operations, and insecure data flows.',
      systemDesign:
        'Preliator performs deep static AST analysis across the entire project surface. It maps trust boundaries between untrusted user inputs and critical database/API sinks, evaluates 7 distinct engineering readiness dimensions, and outputs concrete code patches that developers can apply to resolve issues.',
      guardrailArchitecture:
        'Applies a tri-state policy gate (BLOCK, REVIEW, ALLOW). Critical findings (e.g. unprotected destructive routes or hardcoded secrets) result in an immediate BLOCK with automated patch previews.',
      evaluationAndMetrics:
        'Tested across synthetic benchmark applications with 100% detection rate on unauthenticated sensitive endpoints and sub-1.5s analysis time on medium-sized repositories.',
    },
  },
  {
    id: 'exorno',
    number: '10',
    name: 'Exorno',
    tagline: 'AI vendor commitment intelligence and delay-risk control tower for supply chains.',
    category: 'AI Supply Chain Commitment Intelligence & Risk Control Tower',
    domain: 'workflow',
    summary:
      'Construction and capital infrastructure projects frequently face multi-month delays because vendor delivery promises are taken at face value without cross-referencing against procurement logs, submittal approvals, fabrication milestones, and inspection records. Exorno evaluates vendor credibility, predicts critical-path delays, and drafts proactive, evidence-backed supplier escalations.',
    detail:
      'Ingests unstructured vendor emails, chat updates, and PDF inspection logs. Cross-references commitments against purchase orders and drawing submittals, evaluates milestone sanity against historical vendor performance, and generates automated escalation briefs with evidence citations.',
    architecturalCore:
      'Multi-tier supply chain milestone graph combined with historical vendor credibility scoring and critical-path delay risk propagation algorithms.',
    nodes: [
      {
        step: '01',
        name: 'Communication & Log Ingest',
        type: 'deterministic',
        description: 'Ingests vendor emails, status messages, submittal logs, and purchase orders into normalized schema records.',
        outputSignature: 'SupplyChainRecord { vendor_id, po_number, promised_date: Date, claimed_milestone: string }',
      },
      {
        step: '02',
        name: 'Milestone & Dependency Resolver',
        type: 'hybrid',
        description: 'Cross-references claimed milestones against actual drawing approvals, fabrication lead times, and inspection records.',
        outputSignature: 'MilestoneSanityCheck { is_credible: boolean, missing_prerequisites: string[], lead_time_delta_days: number }',
      },
      {
        step: '03',
        name: 'Vendor Credibility & SLA Risk Scorer',
        type: 'deterministic',
        description: 'Calculates historical vendor reliability scores, variance distributions, and project critical-path delay impact.',
        outputSignature: 'RiskAssessment { credibility_score: 0..100, projected_delay_days: number, critical_path_impact: boolean }',
      },
      {
        step: '04',
        name: 'Proactive Escalation Drafter',
        type: 'model',
        description: 'Drafts evidence-grounded supplier escalation notices citing specific missing approvals and contract milestones.',
        outputSignature: 'EscalationBrief { recipient: string, subject: string, evidence_citations: string[], proposed_action: string }',
      },
    ],
    tradeoffs: [
      {
        decision: 'Evidence-Cross-Referenced Credibility vs. Blind Date Tracking',
        chosenPath: 'Validate claimed milestones against technical prerequisites (drawings, FAT, packing lists).',
        rationale: 'Tracking dates without checking technical milestones fails to detect delays until the promised delivery date has already passed.',
      },
      {
        decision: 'Proactive Evidence-Backed Escalations vs. Reactive Site Delays',
        chosenPath: 'Generate evidence-backed notices weeks before missed delivery impact.',
        rationale: 'Early escalation provides suppliers lead time to recover schedules before site operations halt.',
      },
    ],
    metrics: [
      { value: '94.8%', label: 'Delay Risk Detection', context: 'Pre-dispatch milestone sanity checks' },
      { value: '18 Days', label: 'Advance Warning', context: 'Average schedule notice before site impact' },
      { value: '100%', label: 'Milestone Traceability', context: 'PO, submittal, and inspection linking' },
    ],
    stack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'FastAPI',
      'Python 3.12',
      'PostgreSQL',
      'SQLAlchemy',
      'Pydantic',
      'Tailwind CSS',
      'Vercel',
    ],
    signals: [
      'Cross-references vendor promises against submittals, fabrication, and inspections',
      'Historical vendor commitment credibility and variance scoring',
      'Critical-path project milestone and schedule delay prediction',
      'Automated evidence-backed supplier escalation drafting',
      'Comprehensive supply chain milestone DAG and tracking cockpit',
    ],
    repo: 'https://github.com/Dhruvg334/Exorno',
    tone: 'workflow',
    mermaidDiagram: `flowchart TD
    VendorComm[Vendor Emails & Chat Updates] --> Ingest[Unstructured Log Parser]
    POData[Purchase Orders & Submittal Logs] --> Ingest
    
    subgraph VerificationEngine [Supply Chain Credibility Engine]
      Ingest --> CrossRef[Technical Milestone Cross-Referencer]
      CrossRef --> Sanity[Fabrication & Lead-Time Sanity Checker]
      Sanity --> Credibility[Historical Vendor Credibility Scorer]
      Credibility --> CriticalPath[Critical-Path Delay Impact Propagator]
    end
    
    CriticalPath --> Alert{High Delay Risk?}
    Alert -->|Yes| Escalation[Evidence-Backed Escalation Generator]
    Alert -->|No| Tracking[Update Supply Chain Milestone Cockpit]
    Escalation --> ProcurementReview([Procurement Team Review & Dispatch])`,
    caseStudy: {
      problemStatement:
        'Capital construction projects lose millions to unexpected supply chain delays. Vendors regularly submit vague updates claiming materials are "under production" or "ready for dispatch," while drawing approvals and inspections have not occurred. Project teams only discover delays when shipments fail to arrive on site.',
      systemDesign:
        'Exorno converts unstructured vendor promises into verified milestone intelligence. It maps dependencies between purchase orders, engineering submittals, Factory Acceptance Tests (FAT), and logistics dispatch, evaluating promise credibility against historical vendor metrics.',
      guardrailArchitecture:
        'All risk scores cite specific missing documentation (e.g. unapproved shop drawings or missing inspection certificates). Escalation notices cannot be sent without human procurement officer review.',
      evaluationAndMetrics:
        'Demonstrated 94.8% accuracy in identifying unfeasible vendor delivery dates, providing project managers an average of 18 days advance notice to mitigate critical-path schedule delays.',
    },
  },
  {
    id: 'shodhak',
    number: '11',
    name: 'Shodhak',
    tagline: 'Regional adventure discovery, curated experiences, and AI itinerary planner.',
    category: 'Regional Adventure Discovery & AI Itinerary Platform',
    domain: 'planning',
    summary:
      'Maharashtra boasts rich biodiversity, ancient Sahyadri trekking routes, and coastal trails, yet trip planning remains fragmented across unverified blogs, scattered operators, and disconnected booking channels. Shodhak provides an operator-led adventure marketplace paired with a Gemini-powered personalized itinerary planner.',
    detail:
      'Connects outdoor enthusiasts with verified grassroots adventure operators. Combines Express routing, MongoDB persistence, and Google Gemini itinerary synthesis tailored to user fitness levels, budgets, and travel styles.',
    architecturalCore:
      'Operator-led adventure marketplace architecture paired with parametric AI itinerary generation and end-to-end booking workflows.',
    nodes: [
      {
        step: '01',
        name: 'Experience Catalog Ingestion',
        type: 'deterministic',
        description: 'Ingests verified operator trails, seasonal difficulty ratings, equipment inclusions, and pricing tiers.',
        outputSignature: 'ExperienceData { id: UUID, trail_name: string, difficulty: 1..5, operator_verified: boolean }',
      },
      {
        step: '02',
        name: 'Parametric Itinerary Synthesis',
        type: 'model',
        description: 'Synthesizes customized multi-day itineraries from group size, budget, pace, and preferred adventure styles.',
        outputSignature: 'CustomItinerary { days: DayPlan[], total_cost_estimate: number, safety_tips: string[] }',
      },
      {
        step: '03',
        name: 'Checkout & Booking Management',
        type: 'deterministic',
        description: 'Captures traveler details, handles operator scheduling, and processes payment-ready checkout states.',
        outputSignature: 'BookingRecord { booking_id: UUID, status: "CONFIRMED", operator_contact: string }',
      },
    ],
    tradeoffs: [
      {
        decision: 'Operator-Led Marketplace vs. Unverified User Crowdsourcing',
        chosenPath: 'Strict verification of local operators, gear checks, and safety guidelines.',
        rationale: 'Outdoor adventures involve real physical safety risks; operator verification guarantees safety standards.',
      },
      {
        decision: 'Parametric AI Itinerary Generation vs. Static Tour Packages',
        chosenPath: 'Dynamic itinerary synthesis tailored to user pace, fitness, and budget.',
        rationale: 'Static packages fail to match varying traveler group sizes, transit preferences, and fitness levels.',
      },
    ],
    metrics: [
      { value: '50+ Trails', label: 'Curated Catalog', context: 'Sahyadri & coastal experiences' },
      { value: '<800ms', label: 'Itinerary Generation', context: 'Fast Gemini synthesis pipeline' },
      { value: '100%', label: 'Operator Verified', context: 'Safety and guideline audited' },
    ],
    stack: [
      'Node.js',
      'Express 5',
      'EJS',
      'MongoDB',
      'Mongoose',
      'Google Gemini API',
      'Tailwind CSS',
      'Vercel',
    ],
    signals: [
      'Curated outdoor trekking, camping, and water sports experience catalog',
      'Operator-led local guide onboarding and verification flow',
      'AI-generated multi-day Maharashtra travel itineraries with cost breakdowns',
      'Complete end-to-end checkout and booking management',
      'User trip dashboard and saved expedition planner',
    ],
    repo: 'https://github.com/Dhruvg334/Shodhak',
    live: 'https://shodhak-mu.vercel.app',
    demo: 'https://youtu.be/NKlvOBgRufw',
    videoUrl: 'https://youtu.be/NKlvOBgRufw',
    tone: 'planning',
    mermaidDiagram: `flowchart TD
    User([Traveler / Explorer]) --> Discover[Explore Trails & Experiences]
    Discover --> Filters[Filter by Region, Difficulty, & Style]
    Filters --> Detail[Curated Experience Detail & Inclusions]
    
    Detail --> Planner[AI Multi-Day Itinerary Planner]
    Planner --> Gemini[Google Gemini Synthesis Engine]
    Gemini --> CustomPlan[Personalized Day-by-Day Expedition Plan]
    
    CustomPlan --> Checkout[Booking & Traveler Details Flow]
    Detail --> Checkout
    Checkout --> Mongo[(MongoDB Persistence)]
    Checkout --> Operator[Local Verified Operator Notification]`,
    caseStudy: {
      problemStatement:
        'Planning adventure travel in the Western Ghats and Maharashtra coastline is hindered by scattered information across outdated forums, opaque operator pricing, and unverified safety standards. Travelers struggle to build coherent multi-day itineraries matching their fitness and budgets.',
      systemDesign:
        'Shodhak unifies adventure discovery, operator curation, booking workflows, and AI itinerary planning. The platform pairs an Express/MongoDB stack with Gemini API prompts engineered to respect local transit logistics, trail difficulty levels, and seasonal monsoon safety restrictions.',
      guardrailArchitecture:
        'Itinerary prompts enforce strict regional geographic sanity checks, filtering impossible travel distances and highlighting seasonal safety warnings for monsoon trekking.',
      evaluationAndMetrics:
        'Tested across 50+ regional adventure destinations with sub-800ms itinerary generation latency and full transactional booking management.',
    },
  },
  {
    id: 'newsportal',
    number: '12',
    name: 'NewsPortal',
    tagline: 'Multi-engine misinformation verification and personalized news intelligence platform.',
    category: 'Multi-Engine Misinformation & Fact-Check Intelligence Platform',
    domain: 'eval',
    summary:
      'NewsPortal is a full-stack news intelligence platform combining multi-dataset ML ensembles (WELFake, LIAR, ISOT with DistilBERT), live Google Fact Check evidence retrieval, NLI claim verification, and interaction-driven reader personalization.',
    detail:
      'Implements four cooperating subsystems: product news feeds, preference personalization, transformer-based fake-news classification, and external fact-checking evidence verification to combat misinformation at scale.',
    architecturalCore:
      'Multi-engine verification pipeline combining fine-tuned DistilBERT transformer models, multi-dataset classification ensembles, live Fact Check API queries, and NLI reasoning.',
    nodes: [
      {
        step: '01',
        name: 'Multi-Source Feed Ingestion',
        type: 'deterministic',
        description: 'Ingests streaming news feeds, parses metadata, extracts entities, and deduplicates articles.',
        outputSignature: 'ArticleStream { articles: Article[], categories: string[] }',
      },
      {
        step: '02',
        name: 'ML Ensemble Classification',
        type: 'model',
        description: 'Evaluates claims across dataset-specific models (WELFake, LIAR, ISOT) and fine-tuned DistilBERT inference.',
        outputSignature: 'ModelVerdicts { welfake_prob: number, liar_prob: number, distilbert_prob: number }',
      },
      {
        step: '03',
        name: 'Live Fact Check & NLI Verification',
        type: 'hybrid',
        description: 'Queries Google Fact Check Tools API and executes Natural Language Inference (NLI) support/contradiction analysis.',
        outputSignature: 'EvidenceReport { external_fact_checks: FactCheckItem[], nli_verdict: "SUPPORT" | "CONTRADICT" }',
      },
      {
        step: '04',
        name: 'Verdict Reasoning & Feed Ranking',
        type: 'model',
        description: 'Synthesizes transparent verdict explanations and applies personalization weights to user news feeds.',
        outputSignature: 'FinalArticleView { credibility_score: number, explanation: string, personalized_rank: number }',
      },
    ],
    tradeoffs: [
      {
        decision: 'Multi-Dataset Ensemble + NLI vs. Single Binary Classifier',
        chosenPath: 'Ensemble of WELFake, LIAR, ISOT DistilBERT models cross-checked with live fact-check data.',
        rationale: 'Single classifiers overfit to specific dataset phrasing; multi-engine ensembles deliver robust real-world generalization.',
      },
      {
        decision: 'Personalization vs. Echo Chamber Prevention',
        chosenPath: 'Balance explicit user preferences with exploration serendipity mixing.',
        rationale: 'Pure exploitation feeds create polarizing filter bubbles; controlled exploration surfaces broader viewpoints.',
      },
    ],
    metrics: [
      { value: '93.4%', label: 'Ensemble Accuracy', context: 'WELFake + LIAR + ISOT benchmark test' },
      { value: '3 Ensembles', label: 'Model Diversity', context: 'Statistical + Transformer models' },
      { value: '<1.2s', label: 'Verification Latency', context: 'Parallel inference and evidence query' },
    ],
    stack: [
      'React 19',
      'Vite 7',
      'Node.js',
      'Express 5',
      'FastAPI',
      'Python 3.12',
      'MongoDB',
      'DistilBERT',
      'Hugging Face',
      'Google Fact Check API',
    ],
    signals: [
      'Dataset-specific ML ensembles with fine-tuned DistilBERT transformer models',
      'Live search and Google Fact Check Tools API evidence verification',
      'NLI-style support and contradiction analysis with reasoning generation',
      'Personalized news feed with exploration vs exploitation weighting',
      'Comprehensive reading history, bookmarking, and category insights',
    ],
    repo: 'https://github.com/Dhruvg334/NewsPortal',
    tone: 'learning',
    mermaidDiagram: `flowchart TD
    NewsStream[Live Multi-Source News Feeds] --> Ingest[Feed Ingestion & Entity Parser]
    
    subgraph MultiEngineVerification [Misinformation Verification Pipeline]
      Ingest --> ML[WELFake & LIAR Ensemble Classifiers]
      Ingest --> Distil[Fine-Tuned DistilBERT Transformer]
      Ingest --> FactCheck[Google Fact Check Tools API]
      
      ML --> NLI[Natural Language Inference Engine]
      Distil --> NLI
      FactCheck --> NLI
      NLI --> Verdict[Multi-Engine Verdict Synthesizer]
    end
    
    subgraph Personalization [Reader Personalization Engine]
      Reader[Reader Interaction History] --> Weights[Implicit & Explicit Category Weights]
      Weights --> Recommender[Exploration vs Exploitation Recommender]
    end
    
    Verdict --> FinalFeed[Grounded News Intelligence Feed]
    Recommender --> FinalFeed`,
    caseStudy: {
      problemStatement:
        'Online misinformation spreads rapidly because automated news aggregation platforms prioritize engagement over veracity. Existing fact-checking systems are either entirely manual or rely on brittle binary AI classifiers that lack live web evidence backing and generate unexplainable verdicts.',
      systemDesign:
        'NewsPortal combines a consumer news client with a multi-service verification architecture. The system runs incoming claims through specialized ML ensembles (WELFake, LIAR, ISOT) and DistilBERT transformers, queries the Google Fact Check Tools API for verified fact-check coverage, and synthesizes clear evidence explanations.',
      guardrailArchitecture:
        'Verification scores are strictly presented with supporting evidence citations and source disclosures, preventing the platform from claiming absolute authority on disputed news topics.',
      evaluationAndMetrics:
        'Tested across public benchmark fake news corpora, achieving 93.4% ensemble classification accuracy and under 1.2s end-to-end verification latency.',
    },
  },
  {
    id: 'niswarth-ai',
    number: '13',
    name: 'Niswarth AI',
    tagline: 'Autonomous multi-agent document analysis, donation tracking, and regulatory audit platform for NGOs.',
    category: 'Autonomous NGO Governance & Multi-Agent Compliance System',
    domain: 'workflow',
    summary:
      'Non-profit organizations face severe administrative overhead and compliance risks managing fragmented receipts, donation utilization disclosures, and multi-chapter audit logs. Niswarth AI is an autonomous document analysis and regulatory compliance platform that extracts structured fiscal entities from unstructured documents, verifies expenditure against statutory bylaws, and generates verified donor impact reports with human-in-the-loop sign-off gates.',
    detail:
      'Built as an independent development project. Features a multi-agent LangGraph supervisor coordinating receipt OCR extraction, fiscal cross-verification against statutory bylaws, PostgreSQL Row-Level Security (RLS) tenant isolation, and cryptographic SHA-256 audit digest generation.',
    architecturalCore:
      'Multi-agent LangGraph supervisor orchestrating document entity extraction, regulatory rule validation, deterministic ledger balancing, and durable human review checkpoints in PostgreSQL.',
    nodes: [
      {
        step: '01',
        name: 'Document Ingest & OCR',
        type: 'deterministic',
        description: 'Extracts financial receipts, grant invoices, and bank statements with text region bounding and MIME validation.',
        outputSignature: 'ExtractedDocument { doc_id, line_items: LineItem[], total_amount: Decimal, vendor: string }',
      },
      {
        step: '02',
        name: 'Fiscal Bylaw Verification',
        type: 'hybrid',
        description: 'Cross-references itemized expenses against statutory grant allocations and NGO regulatory guidelines using pgvector + deterministic ledger checks.',
        outputSignature: 'ComplianceAudit { is_compliant: boolean, disallowed_expenses: Item[], rule_violations: string[] }',
      },
      {
        step: '03',
        name: 'Multi-Agent Consensus',
        type: 'model',
        description: 'Specialized auditor and compliance agents verify fund disbursement allocation and draft structured audit findings.',
        outputSignature: 'AuditSummary { risk_score: number, anomalies_detected: Anomaly[], draft_report: string }',
      },
      {
        step: '04',
        name: 'Durable Human Gate & Certification',
        type: 'human',
        description: 'Pauses execution in PostgreSQL for trustee/auditor signature before sealing an immutable SHA-256 compliance certificate.',
        outputSignature: 'CertifiedReport { report_id: UUID, sha256_hash: string, approved_by: UserID }',
      },
    ],
    tradeoffs: [
      {
        decision: 'Deterministic ledger validation vs. LLM financial calculations',
        chosenPath: 'Deterministic Python arithmetic for all accounting and ledger totals, using LLMs only for semantic entity extraction.',
        rationale: 'LLMs cannot be trusted for financial math where even minor rounding errors violate statutory compliance.',
      },
      {
        decision: 'Relational PostgreSQL with RLS vs. Unstructured document store',
        chosenPath: 'PostgreSQL with strict Row-Level Security (RLS) tenant boundaries and immutable audit logs.',
        rationale: 'NGO data contains sensitive donor identities and fiscal records that require strict tenant isolation and ACID guarantees.',
      },
    ],
    metrics: [
      { value: '100%', label: 'Math Determinism', context: 'Zero-hallucination ledger balancing' },
      { value: 'SHA-256', label: 'Audit Provenance', context: 'Cryptographic report certification' },
      { value: 'Multi-Agent', label: 'LangGraph Runtime', context: 'Specialized auditor and compliance agents' },
    ],
    stack: [
      'Python',
      'FastAPI',
      'LangGraph',
      'PostgreSQL',
      'pgvector',
      'Docker',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
    ],
    signals: [
      'Multi-agent LangGraph compliance supervisor',
      'Deterministic ledger math and anomaly detection',
      'PostgreSQL Row-Level Security (RLS) tenant isolation',
      'Durable human-in-the-loop review sign-off',
      'Cryptographic SHA-256 audit certification',
    ],
    repo: 'https://github.com/Dhruvg334/Niswarth-AI',
    tone: 'workflow',
    mermaidDiagram: `flowchart TD
    User([NGO Trustee / Auditor]) --> Upload[Document Upload & Ingestion]
    Upload --> OCR[OCR & Entity Extraction Pipeline]
    
    subgraph MultiAgentCore [Multi-Agent LangGraph Supervisor]
      OCR --> AuditorAgent[Fiscal Auditor Agent]
      OCR --> ComplianceAgent[Regulatory Bylaw Agent]
      
      AuditorAgent --> LedgerCheck[Deterministic Ledger & Math Engine]
      ComplianceAgent --> GrantRules[Grant Allocation & Policy Match]
      
      LedgerCheck --> Consensus[Multi-Agent Consensus Arbiter]
      GrantRules --> Consensus
    end
    
    Consensus --> PG[(PostgreSQL + RLS Isolation)]
    Consensus --> Discrepancy{Discrepancy Detected?}
    
    Discrepancy -->|Yes| Flag[Flag Disallowed Expense & Pause]
    Discrepancy -->|No| DraftReport[Draft Compliance Impact Report]
    
    Flag --> HumanReview([Auditor / Trustee Sign-Off])
    DraftReport --> HumanReview
    HumanReview --> CertGen[SHA-256 Cryptographic Audit Seal]
    CertGen --> FinalReport[Immutable Verified Report & Feed]`,
    caseStudy: {
      problemStatement:
        'Non-profit organizations face severe administrative overhead and compliance scrutiny managing decentralized donations, multi-chapter field expenditures, and statutory filings. Without automated cross-referencing between receipts, grant allocations, and regulatory bylaws, non-profits risk financial misallocations, reporting fraud, and costly compliance violations during annual regulatory audits.',
      systemDesign:
        'Built Niswarth AI as an independent development project to automate non-profit governance. The platform ingests financial receipts, bank statements, and invoices, extracting structured line items and vendor metadata. A LangGraph multi-agent supervisor orchestrates specialized fiscal auditor and regulatory agents that verify expenditure against predefined grant constraints and legal compliance frameworks. All records are isolated per organization using PostgreSQL Row-Level Security (RLS).',
      guardrailArchitecture:
        'The platform strictly separates linguistic document parsing from accounting math. All financial computations, ledger balance checks, and currency conversions are handled by deterministic Python arithmetic functions. Any identified anomaly, tax discrepancy, or unallocated expenditure triggers a mandatory human-in-the-loop pause in PostgreSQL before reports can be sealed.',
      evaluationAndMetrics:
        'Validated against synthetic non-profit audit datasets containing multi-invoice discrepancy edge cases, achieving 100% detection of disallowed expenses and complete deterministic math consistency across all generated compliance reports.',
    },
  },
]

export const supportingProjects = [
  {
    name: 'Carbonly — Decarbonization Linear Solver',
    description: 'Primal Simplex method linear programming engine maximizing emission avoidance within capital constraints.',
    tags: ['JavaScript', 'Linear Programming', 'Simplex Method', 'Operations Research'],
    href: 'https://github.com/Dhruvg334/Carbonly',
  },
  {
    name: 'Daedalus — AI Exposure Matrix',
    description: 'Task-level routine vs cognitive judgment automation vulnerability analyzer with deterministic fit traces.',
    tags: ['Next.js', 'FastAPI', 'Pydantic', 'Decision Systems'],
    href: 'https://github.com/Dhruvg334/Daedalus',
  },
  {
    name: 'A-DAP-T — GenAI AST Guardrail Scanner',
    description: '16-point static security verification matrix identifying unrestricted tool execution sinks and missing human gates.',
    tags: ['Python AST', 'FastAPI', 'Security Guardrails', 'Static Analysis'],
    href: 'https://github.com/Dhruvg334/A-DAP-T',
  },
]
