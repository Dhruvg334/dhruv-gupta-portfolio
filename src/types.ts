export type ProjectTone = 'graph' | 'safety' | 'learning' | 'planning' | 'workflow'

export type ProjectDomain = 'all' | 'graph' | 'safety' | 'eval' | 'planning' | 'workflow'

export interface ArchitectureNode {
  step: string
  name: string
  type: 'deterministic' | 'hybrid' | 'model' | 'gate' | 'human'
  description: string
  outputSignature: string
}

export interface TechnicalTradeoff {
  decision: string
  chosenPath: string
  rationale: string
}

export interface MetricHighlight {
  label: string
  value: string
  context: string
}

export interface CaseStudySection {
  problemStatement: string
  systemDesign: string
  guardrailArchitecture: string
  evaluationAndMetrics: string
}

export interface Project {
  id: string
  number: string
  name: string
  tagline: string
  category: string
  domain: 'graph' | 'safety' | 'eval' | 'planning' | 'workflow'
  summary: string
  detail: string
  architecturalCore: string
  nodes: ArchitectureNode[]
  tradeoffs: TechnicalTradeoff[]
  metrics: MetricHighlight[]
  stack: string[]
  signals: string[]
  repo: string
  live?: string
  demo?: string
  videoUrl?: string
  docsUrl?: string
  tone: ProjectTone
  caseStudy: CaseStudySection
  mermaidDiagram: string
}

export interface TraceStep {
  stepNumber: string
  layer: string
  name: string
  status: 'passed' | 'flagged' | 'human_review' | 'verified'
  latencyMs: number
  detail: string
  inspectableData?: Record<string, unknown>
}

export interface TracePreset {
  id: string
  name: string
  systemTag: string
  description: string
  totalLatency: string
  deterministicRatio: string
  steps: TraceStep[]
}

export interface SandboxStage {
  title: string
  layer: string
  type: 'gate' | 'retrieval' | 'synthesis' | 'validator' | 'approval'
  status: 'PASSED' | 'REVIEW REQUIRED' | 'BLOCKED' | 'GROUNDED'
  details: string
  inspectableOutput: string
}

export interface SandboxScenario {
  id: string
  title: string
  badge: string
  userPrompt: string
  context: string
  stages: SandboxStage[]
}

export interface SystemLayerItem {
  number: string
  name: string
  tag: string
  description: string
  implementationExample: string
  keyProjects: string[]
}

export type ContactMode = 'contact' | 'resume'
