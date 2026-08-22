import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Play,
  CheckCircle2,
  AlertOctagon,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Terminal,
  ChevronRight,
  Database,
  Layers,
  Cpu,
  Shield,
  Activity,
  GitBranch,
} from 'lucide-react'
import { sandboxScenarios } from '../data/systems'
import { systemArchitectureLayers } from '../data/competencies'
import { SandboxScenario } from '../types'

export function ArchitectureWorkspace() {
  const [activeTab, setActiveTab] = useState<'sandbox' | 'matrix'>('sandbox')
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0)
  const [executing, setExecuting] = useState(false)
  const [currentStageIdx, setCurrentStageIdx] = useState(3)
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number | null>(null)

  const scenario: SandboxScenario = sandboxScenarios[activeScenarioIndex]

  const runSimulation = (idx: number) => {
    setActiveScenarioIndex(idx)
    setExecuting(true)
    setCurrentStageIdx(0)

    const t1 = setTimeout(() => setCurrentStageIdx(1), 300)
    const t2 = setTimeout(() => setCurrentStageIdx(2), 600)
    const t3 = setTimeout(() => setCurrentStageIdx(3), 950)
    const t4 = setTimeout(() => setExecuting(false), 1100)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }

  const getStageStatusBadge = (status: string) => {
    switch (status) {
      case 'GROUNDED':
        return (
          <span className="ws-status-badge ws-status--grounded">
            <CheckCircle2 size={12} /> GROUNDED
          </span>
        )
      case 'PASSED':
        return (
          <span className="ws-status-badge ws-status--passed">
            <CheckCircle2 size={12} /> PASSED
          </span>
        )
      case 'BLOCKED':
        return (
          <span className="ws-status-badge ws-status--blocked">
            <AlertOctagon size={12} /> BLOCKED
          </span>
        )
      case 'REVIEW REQUIRED':
        return (
          <span className="ws-status-badge ws-status--review">
            <ShieldCheck size={12} /> REVIEW REQUIRED
          </span>
        )
      default:
        return null
    }
  }

  const getLayerIcon = (idx: number) => {
    switch (idx % 5) {
      case 0: return <Terminal size={15} />
      case 1: return <GitBranch size={15} />
      case 2: return <Cpu size={15} />
      case 3: return <Database size={15} />
      default: return <Shield size={15} />
    }
  }

  return (
    <section className="section workspace-section" id="architecture">
      <div className="shell">
        <div className="section-heading">
          <p className="section-label">Architecture & Execution</p>
          <div>
            <h2>How the systems execute in production.</h2>
            <p>
              Explore how deterministic guardrails, hybrid retrieval, and human review gates decouple mission-critical software rules from generative model inference.
            </p>
          </div>
        </div>

        <div className="workspace-container">
          {/* Top Mode Switcher */}
          <div className="workspace-mode-nav">
            <button
              className={`mode-nav-btn ${activeTab === 'sandbox' ? 'active' : ''}`}
              onClick={() => setActiveTab('sandbox')}
            >
              <Activity size={15} /> Live Pipeline Sandbox
            </button>
            <button
              className={`mode-nav-btn ${activeTab === 'matrix' ? 'active' : ''}`}
              onClick={() => setActiveTab('matrix')}
            >
              <Layers size={15} /> 12-Layer System Matrix
            </button>
          </div>

          {/* TAB 1: Live Pipeline Sandbox */}
          {activeTab === 'sandbox' && (
            <div className="workspace-sandbox-view">
              {/* Scenario Pills */}
              <div className="scenario-pills-row">
                {sandboxScenarios.map((scen, idx) => (
                  <button
                    key={scen.id}
                    className={`scenario-pill-btn ${activeScenarioIndex === idx ? 'active' : ''}`}
                    onClick={() => runSimulation(idx)}
                    disabled={executing}
                  >
                    <span className="scen-badge">{scen.badge}</span>
                    <span className="scen-title">{scen.title}</span>
                  </button>
                ))}
              </div>

              {/* Sandbox Body Grid */}
              <div className="sandbox-grid">
                {/* Left: Input & Context */}
                <div className="sandbox-input-col">
                  <div className="sandbox-input-card">
                    <div className="sandbox-card-header">
                      <div className="header-tag">
                        <Terminal size={14} />
                        <span>Incoming Scenario Prompt</span>
                      </div>
                      <button
                        className={`run-sim-btn ${executing ? 'running' : ''}`}
                        onClick={() => runSimulation(activeScenarioIndex)}
                        disabled={executing}
                      >
                        {executing ? <RotateCcw size={13} className="spinning" /> : <Play size={13} />}
                        <span>{executing ? 'Simulating...' : 'Re-run Simulation'}</span>
                      </button>
                    </div>

                    <div className="prompt-display">
                      <p className="prompt-text">"{scenario.userPrompt}"</p>
                      <div className="context-note">
                        <Database size={13} />
                        <span>{scenario.context}</span>
                      </div>
                    </div>
                  </div>

                  <div className="sandbox-guarantee-card">
                    <Sparkles size={16} />
                    <div>
                      <strong>Deterministic Execution Guarantee</strong>
                      <p>
                        Every pipeline enforces schema validation, cryptographic source citation, and explicit review states before mutating persistent databases or external APIs.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Pipeline Stages */}
                <div className="sandbox-stages-col">
                  <div className="stages-header">
                    <span>Multi-Stage Deterministic Pipeline</span>
                    <span>{currentStageIdx + 1} of 4 Stages Verified</span>
                  </div>

                  <div className="stages-stream">
                    {scenario.stages.map((stage, idx) => {
                      const isVisible = idx <= currentStageIdx
                      if (!isVisible) return null

                      return (
                        <motion.div
                          key={stage.title}
                          className="stage-card"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="stage-card-top">
                            <div className="stage-num-tag">
                              <span className="stage-num">0{idx + 1}</span>
                              <span className="stage-layer">{stage.layer}</span>
                            </div>
                            {getStageStatusBadge(stage.status)}
                          </div>

                          <h4 className="stage-name">{stage.title}</h4>
                          <p className="stage-desc">{stage.details}</p>

                          <div className="stage-payload-box">
                            <div className="payload-tag">
                              <ChevronRight size={11} />
                              <span>State Output:</span>
                            </div>
                            <code>{stage.inspectableOutput}</code>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 12-Layer System Matrix */}
          {activeTab === 'matrix' && (
            <div className="workspace-matrix-view">
              <div className="matrix-cards-grid">
                {systemArchitectureLayers.map((layer, idx) => {
                  const isExpanded = selectedLayerIndex === idx
                  return (
                    <motion.div
                      key={layer.number}
                      className={`matrix-grid-card ${isExpanded ? 'active' : ''}`}
                      onClick={() => setSelectedLayerIndex(isExpanded ? null : idx)}
                    >
                      <div className="card-topline">
                        <div className="num-icon">
                          <span className="layer-num">{layer.number}</span>
                          <span className="layer-icon">{getLayerIcon(idx)}</span>
                        </div>
                        <span className="layer-tag">{layer.tag}</span>
                      </div>

                      <h3 className="layer-name">{layer.name}</h3>
                      <p className="layer-desc">{layer.description}</p>

                      <div className="layer-impl">
                        <span className="impl-label">Implementation:</span>
                        <p>{layer.implementationExample}</p>
                      </div>

                      <div className="layer-projects">
                        <span className="proj-label">Applied in:</span>
                        <div className="proj-pills">
                          {layer.keyProjects.map((p) => (
                            <span key={p} className="proj-pill">
                              <CheckCircle2 size={11} /> {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
