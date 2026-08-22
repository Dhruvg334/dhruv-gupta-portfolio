import { useState } from 'react'
import { motion } from 'motion/react'
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
} from 'lucide-react'
import { sandboxScenarios } from '../data/systems'
import { SandboxScenario } from '../types'

export function ArchitectureSandbox() {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0)
  const [executing, setExecuting] = useState(false)
  const [currentStageIdx, setCurrentStageIdx] = useState(3) // all stages visible by default

  const scenario: SandboxScenario = sandboxScenarios[activeScenarioIndex]

  const runSimulation = (idx: number) => {
    setActiveScenarioIndex(idx)
    setExecuting(true)
    setCurrentStageIdx(0)

    const t1 = setTimeout(() => setCurrentStageIdx(1), 350)
    const t2 = setTimeout(() => setCurrentStageIdx(2), 700)
    const t3 = setTimeout(() => setCurrentStageIdx(3), 1100)
    const t4 = setTimeout(() => setExecuting(false), 1300)

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
          <span className="sandbox-status-badge sandbox-status--grounded">
            <CheckCircle2 size={12} /> GROUNDED
          </span>
        )
      case 'PASSED':
        return (
          <span className="sandbox-status-badge sandbox-status--passed">
            <CheckCircle2 size={12} /> PASSED
          </span>
        )
      case 'BLOCKED':
        return (
          <span className="sandbox-status-badge sandbox-status--blocked">
            <AlertOctagon size={12} /> BLOCKED
          </span>
        )
      case 'REVIEW REQUIRED':
        return (
          <span className="sandbox-status-badge sandbox-status--review">
            <ShieldCheck size={12} /> REVIEW REQUIRED
          </span>
        )
      default:
        return null
    }
  }

  return (
    <section className="section sandbox-section" id="sandbox">
      <div className="shell">
        <div className="section-heading section-heading--light">
          <p className="section-label">Interactive Sandbox</p>
          <div>
            <h2>Simulate how the architecture executes.</h2>
            <p>
              Test real operational scenarios to observe how deterministic guardrails, hybrid retrieval, and human checkpoints coordinate before, around, and after model calls.
            </p>
          </div>
        </div>

        <div className="sandbox-card">
          {/* Scenario Selector Tabs */}
          <div className="sandbox-scenarios-nav">
            {sandboxScenarios.map((scen, idx) => (
              <button
                key={scen.id}
                className={`sandbox-nav-btn ${activeScenarioIndex === idx ? 'active' : ''}`}
                onClick={() => runSimulation(idx)}
                disabled={executing}
              >
                <span className="sandbox-btn-badge">{scen.badge}</span>
                <strong className="sandbox-btn-title">{scen.title}</strong>
              </button>
            ))}
          </div>

          <div className="sandbox-interface">
            {/* Input Prompt Box */}
            <div className="sandbox-input-panel">
              <div className="sandbox-panel-top">
                <div className="panel-tag">
                  <Terminal size={14} />
                  <span>Incoming Scenario Request</span>
                </div>
                <button
                  className={`sandbox-run-btn ${executing ? 'running' : ''}`}
                  onClick={() => runSimulation(activeScenarioIndex)}
                  disabled={executing}
                >
                  {executing ? <RotateCcw size={14} className="spinning" /> : <Play size={14} />}
                  <span>{executing ? 'Executing Pipeline...' : 'Run Pipeline'}</span>
                </button>
              </div>

              <div className="sandbox-prompt-box">
                <p className="sandbox-prompt-text">"{scenario.userPrompt}"</p>
                <div className="sandbox-context-note">
                  <Database size={13} />
                  <span>{scenario.context}</span>
                </div>
              </div>
            </div>

            {/* Execution Stages Stream */}
            <div className="sandbox-stages-stream">
              <div className="stream-header">
                <span>Multi-Stage Deterministic Pipeline</span>
                <span>{currentStageIdx + 1} of 4 Stages Active</span>
              </div>

              <div className="sandbox-stages-list">
                {scenario.stages.map((stage, idx) => {
                  const isVisible = idx <= currentStageIdx
                  if (!isVisible) return null

                  return (
                    <motion.div
                      key={stage.title}
                      className="sandbox-stage-card"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="stage-card-head">
                        <div className="stage-num-layer">
                          <span className="stage-idx">0{idx + 1}</span>
                          <span className="stage-layer-tag">{stage.layer}</span>
                        </div>
                        {getStageStatusBadge(stage.status)}
                      </div>

                      <h4 className="stage-title">{stage.title}</h4>
                      <p className="stage-details">{stage.details}</p>

                      <div className="stage-output-block">
                        <div className="output-header">
                          <ChevronRight size={12} />
                          <span>Inspectable State Output:</span>
                        </div>
                        <code>{stage.inspectableOutput}</code>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <div className="sandbox-footer">
                <div className="sandbox-verdict">
                  <Sparkles size={15} />
                  <span>
                    Deterministic Execution Guardrails verified: No ungrounded hallucinations or un-gated mutations allowed.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
