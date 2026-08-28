import { SandboxScenario } from '../types'

export const sandboxScenarios: SandboxScenario[] = [
  {
    id: 'scenario-civic',
    title: 'Water Main Rupture Near School Corridor',
    badge: 'Civitas / Spatial Incident Engine',
    userPrompt:
      'Citizen reports active major water pipeline burst flooding 2nd Main Road near St. Jude Elementary School with photo attachment.',
    context:
      'Omnichannel civic intake via WhatsApp with client-side canvas compression, PostGIS spatial context, and H3 indexing.',
    stages: [
      {
        title: 'Zero-Trust Intake & EXIF Geometry',
        layer: 'Binary & EXIF Redactor',
        type: 'gate',
        status: 'PASSED',
        details:
          'Verified image binary header; extracted GPS coordinates (12.9716, 77.5946); stripped camera serial and hardware telemetry.',
        inspectableOutput:
          '{ valid_mime: "image/jpeg", lat: 12.9716, lng: 77.5946, camera_pii_stripped: true }',
      },
      {
        title: 'H3 Spatial Hotspot & POI Acceleration',
        layer: 'PostGIS & H3 Engine',
        type: 'retrieval',
        status: 'GROUNDED',
        details:
          'Identified 65m proximity to St. Jude Elementary School; accelerated statutory SLA from 24h baseline to 4h emergency response.',
        inspectableOutput:
          '{ h3_res8: "88618925d3fffff", poi_name: "St. Jude Elementary", distance_m: 65, dynamic_sla_hours: 4 }',
      },
      {
        title: 'Hybrid Policy & Jurisdictional Resolver',
        layer: 'BM25 + Dense RRF Engine',
        type: 'validator',
        status: 'GROUNDED',
        details:
          'Resolved maintenance authority to Water Supply Board (BWSSB); generated automated Schedule of Rates (SOR) BOQ estimate.',
        inspectableOutput:
          '{ authority: "BWSSB Ward 12", sor_code: "SOR-W-104", estimated_cost_inr: 18500, boq_generated: true }',
      },
      {
        title: 'Supervisor Approval & SHA-256 Sealing',
        layer: 'LangGraph Review Gate',
        type: 'approval',
        status: 'REVIEW REQUIRED',
        details:
          'Dispatched emergency work order to field crew; generated immutable SHA-256 digital certificate pending supervisor sign-off.',
        inspectableOutput:
          '{ work_order_status: "DISPATCHED", supervisor_signoff_required: true, sha256_sealed: true }',
      },
    ],
  },
  {
    id: 'scenario-industrial',
    title: 'Industrial Equipment Failure Diagnosis',
    badge: 'GraphRAG + Provenance',
    userPrompt:
      'Hydraulic pressure dropped 30% in Main Extruder Pump during shift change. Identify root cause and next maintenance step.',
    context:
      'Industrial plant maintenance dataset with 12,000 PDF pages, SCADA sensor telemetry, and Neo4j asset topology.',
    stages: [
      {
        title: 'Deterministic Asset Context',
        layer: 'Neo4j Graph Engine',
        type: 'retrieval',
        status: 'GROUNDED',
        details:
          'Extracted Asset "Pump-EXT-02", upstream feed valves, filter assemblies, and 3 past seal failure records.',
        inspectableOutput:
          '{ asset: "Pump-EXT-02", dependencies: ["Feed Valve V-12", "Filter Unit F-04"], past_failures: 3 }',
      },
      {
        title: 'Hybrid Log Retrieval',
        layer: 'pgvector Vector Store',
        type: 'retrieval',
        status: 'GROUNDED',
        details:
          'Matched 4 technician log chunks mentioning hydraulic fluid cavitation and filter mesh blockage.',
        inspectableOutput:
          '{ matched_chunks: 4, top_source: "Log_2026_02_14.txt", similarity: 0.92 }',
      },
      {
        title: 'Safety Boundary Verification',
        layer: 'Deterministic Rule Gate',
        type: 'gate',
        status: 'PASSED',
        details:
          'Verified that recommended pressure relief procedures conform to OSHA Standard 1910.147 lock-out tag-out protocols.',
        inspectableOutput:
          '{ compliance_check: "OSHA 1910.147 PASSED", danger_threshold_exceeded: false }',
      },
      {
        title: 'Grounded Action Plan',
        layer: 'Evidence Synthesis Model',
        type: 'synthesis',
        status: 'PASSED',
        details:
          'Generated step-by-step diagnostic workflow with page citations referencing Maintenance Manual Sec 4.3.',
        inspectableOutput:
          '{ diagnosis: "Filter Unit F-04 bypass valve stuck open", action: "Inspect mesh filter and reset valve", citations: ["Manual_Sec_4.3.pdf#p44"] }',
      },
    ],
  },
  {
    id: 'scenario-agent-sec',
    title: 'Autonomous Agent Database Mutation Request',
    badge: 'Agent Safety & Human Gate',
    userPrompt:
      'Agent attempting: "DROP TABLE legacy_user_sessions; UPDATE users SET role=\'admin\' WHERE id=42;"',
    context:
      'Agentic tool execution request intercepted during pre-flight security scan in automated CI pipeline.',
    stages: [
      {
        title: 'Static AST & SQL Risk Interceptor',
        layer: 'A-DAP-T Static Engine',
        type: 'gate',
        status: 'BLOCKED',
        details:
          'Detected destructive DDL command (DROP TABLE) and unauthorized privilege escalation in raw unescaped SQL statement.',
        inspectableOutput:
          '{ violations: ["DROP_TABLE_DETECTED", "PRIVILEGE_ESCALATION_DETECTED"], severity: "CRITICAL" }',
      },
      {
        title: 'Release Gate Evaluation',
        layer: 'Deterministic Gatekeeper',
        type: 'gate',
        status: 'BLOCKED',
        details:
          'Triggered HARD_BLOCK gate: mutation execution aborted immediately without reaching production database.',
        inspectableOutput:
          '{ gate_decision: "HARD_BLOCK", execution_halted: true, security_incident_logged: true }',
      },
      {
        title: 'Remediation & Patch Generator',
        layer: 'Security Model Assistant',
        type: 'synthesis',
        status: 'PASSED',
        details:
          'Synthesized safe migration script utilizing idempotent ALTER commands and parameterized admin role assignment.',
        inspectableOutput:
          '{ safe_migration_diff: "CREATE TABLE archive_user_sessions AS SELECT ...", parameterized: true }',
      },
      {
        title: 'Human Super-Admin Sign-Off',
        layer: 'Human Checkpoint',
        type: 'approval',
        status: 'REVIEW REQUIRED',
        details:
          'Sent incident report and proposed migration diff to engineering lead for manual 2FA approval.',
        inspectableOutput:
          '{ review_ticket: "#SEC-882", state: "PENDING_HUMAN_SIGN_OFF" }',
      },
    ],
  },
  {
    id: 'scenario-planning',
    title: 'Calendar Conflict & Emergency Schedule Recovery',
    badge: 'Controlled Planning',
    userPrompt:
      'Schedule 3-hour urgent client demo prep today between 10:00 AM and 4:00 PM without missing existing team standup or doctor visit.',
    context:
      'Busy student / founder calendar with existing commitments, buffer constraints, and energy windows.',
    stages: [
      {
        title: 'Constraint Parsing & Energy Alignment',
        layer: 'ChronOS Intent Parser',
        type: 'retrieval',
        status: 'GROUNDED',
        details:
          'Identified required duration (180 mins), cognitive intensity (HIGH), and fixed hard calendar anchors.',
        inspectableOutput:
          '{ duration_minutes: 180, fixed_events: ["Team Standup 10:30-11:00", "Doctor 14:00-14:45"] }',
      },
      {
        title: 'Deterministic Feasibility Solver',
        layer: 'Topological Constraint Engine',
        type: 'validator',
        status: 'PASSED',
        details:
          'Calculated optimal collision-free slot: 11:15 AM - 1:45 PM (150m) + 3:00 PM - 3:30 PM (30m) with 15m transit buffers.',
        inspectableOutput:
          '{ viable_split: true, slot_1: "11:15-13:45", slot_2: "15:00-15:30", buffer_minutes: 15 }',
      },
      {
        title: 'Interactive User Confirmation Gate',
        layer: 'Human Approval Interface',
        type: 'approval',
        status: 'PASSED',
        details:
          'Rendered side-by-side calendar diff showing original vs proposed schedule with 1-click accept.',
        inspectableOutput:
          '{ user_confirmation: "ACCEPTED", calendar_diff_previewed: true }',
      },
      {
        title: 'Atomic Google Calendar Sync',
        layer: 'External API Execution',
        type: 'validator',
        status: 'GROUNDED',
        details:
          'Created calendar events via Google Calendar API with rollback receipt token for instant undo.',
        inspectableOutput:
          '{ gcal_status: "201 CREATED", rollback_token: "rollback_txn_104" }',
      },
    ],
  },
]
