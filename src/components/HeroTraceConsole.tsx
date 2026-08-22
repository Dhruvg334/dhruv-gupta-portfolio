import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  RotateCw,
  Terminal,
  Activity,
  ChevronRight,
  Code2,
} from 'lucide-react'
import { heroTracePresets } from '../data/systems'
import { TracePreset, TraceStep } from '../types'

export function HeroTraceConsole() {
  const [activePresetIndex, setActivePresetIndex] = useState(0)
  const [activeStepIndex, setActiveStepIndex] = useState(3) // all steps visible by default
  const [isSimulating, setIsSimulating] = useState(false)
  const [inspectedStep, setInspectedStep] = useState<number | null>(null)

  const activePreset: TracePreset = heroTracePresets[activePresetIndex]

  const triggerSimulation = (index: number) => {
    setActivePresetIndex(index)
    setIsSimulating(true)
    setActiveStepIndex(0)
    setInspectedStep(null)

    const timer1 = setTimeout(() => setActiveStepIndex(1), 300)
    const timer2 = setTimeout(() => setActiveStepIndex(2), 650)
    const timer3 = setTimeout(() => setActiveStepIndex(3), 1050)
    const timer4 = setTimeout(() => setIsSimulating(false), 1200)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }

  useEffect(() => {
    // Initial mount subtle pulse
    setActiveStepIndex(3)
  }, [])

  const getStatusBadge = (status: TraceStep['status']) => {
    switch (status) {
      case 'passed':
        return (
          <span className="trace-status-pill trace-status--passed">
            <CheckCircle2 size={12} /> PASS
          </span>
        )
      case 'flagged':
        return (
          <span className="trace-status-pill trace-status--flagged">
            <AlertTriangle size={12} /> FLAGGED
          </span>
        )
      case 'human_review':
        return (
          <span className="trace-status-pill trace-status--review">
            <ShieldCheck size={12} /> GATE
          </span>
        )
      case 'verified':
        return (
          <span className="trace-status-pill trace-status--verified">
            <CheckCircle2 size={12} /> 100% PROVENANCE
          </span>
        )
    }
  }

  return (
    <div className="hero-console-wrapper" aria-label="Interactive AI system trace console">
      <div className="console-nav-tabs">
        {heroTracePresets.map((preset, idx) => (
          <button
            key={preset.id}
            className={`console-tab-btn ${activePresetIndex === idx ? 'active' : ''}`}
            onClick={() => triggerSimulation(idx)}
            disabled={isSimulating}
          >
            <span>{preset.name.split(' ')[0]}</span>
            <small>{preset.systemTag.split(' / ')[1]}</small>
          </button>
        ))}
      </div>

      <div className="hero-console">
        {/* Terminal Header */}
        <div className="console-header">
          <div className="console-header-left">
            <div className="terminal-dots">
              <span className="dot dot--red" />
              <span className="dot dot--amber" />
              <span className="dot dot--green" />
            </div>
            <div className="console-title">
              <Terminal size={14} />
              <span>system_trace::{activePreset.id}</span>
            </div>
          </div>

          <div className="console-header-right">
            <span className="metric-pill">
              <Activity size={12} /> {activePreset.totalLatency}
            </span>
            <button
              className={`replay-btn ${isSimulating ? 'spinning' : ''}`}
              onClick={() => triggerSimulation(activePresetIndex)}
              title="Re-run trace simulation"
              aria-label="Re-run trace"
            >
              <RotateCw size={13} />
            </button>
          </div>
        </div>

        {/* Console Subheader / Context */}
        <div className="console-subhead">
          <div className="console-subhead-info">
            <span className="system-tag">{activePreset.systemTag}</span>
            <p>{activePreset.description}</p>
          </div>
          <span className="deterministic-tag">{activePreset.deterministicRatio}</span>
        </div>

        {/* Steps Stream */}
        <div className="console-body">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePreset.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="trace-steps-container"
            >
              {activePreset.steps.map((step, idx) => {
                const isVisible = idx <= activeStepIndex
                const isInspected = inspectedStep === idx

                if (!isVisible) return null

                return (
                  <motion.div
                    key={step.stepNumber + step.name}
                    className={`trace-row ${isInspected ? 'trace-row--inspected' : ''}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="trace-row-main" onClick={() => setInspectedStep(isInspected ? null : idx)}>
                      <div className="trace-idx-col">
                        <span className="step-num">{step.stepNumber}</span>
                        <span className="step-layer">{step.layer}</span>
                      </div>

                      <div className="trace-info-col">
                        <div className="step-title-row">
                          <strong className="step-name">{step.name}</strong>
                          <span className="step-latency">+{step.latencyMs}ms</span>
                        </div>
                        <p className="step-detail">{step.detail}</p>
                      </div>

                      <div className="trace-status-col">
                        {getStatusBadge(step.status)}
                        {step.inspectableData && (
                          <button
                            className="inspect-toggle-btn"
                            title="Inspect step payload"
                            aria-label="Inspect step payload"
                          >
                            <Code2 size={13} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Inspectable Payload Drawer */}
                    {isInspected && step.inspectableData && (
                      <motion.div
                        className="step-inspect-payload"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="payload-header">
                          <span>
                            <ChevronRight size={12} /> inspectable_payload::{step.layer.toLowerCase().replace(/\s+/g, '_')}
                          </span>
                        </div>
                        <pre className="payload-code">
                          {JSON.stringify(step.inspectableData, null, 2)}
                        </pre>
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Terminal Footer */}
        <div className="console-footer">
          <div className="footer-status">
            <span className="status-live-dot" />
            <span>Multi-Layer Execution Complete</span>
          </div>
          <div className="footer-inspect-hint">
            <span>Click any node to inspect payload</span>
          </div>
        </div>
      </div>
    </div>
  )
}
