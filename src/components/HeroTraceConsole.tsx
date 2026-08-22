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
  const [activeStepIndex, setActiveStepIndex] = useState(3)
  const [isSimulating, setIsSimulating] = useState(false)
  const [inspectedStep, setInspectedStep] = useState<number | null>(null)

  const activePreset: TracePreset = heroTracePresets[activePresetIndex]

  const triggerSimulation = (index: number) => {
    setActivePresetIndex(index)
    setIsSimulating(true)
    setActiveStepIndex(0)
    setInspectedStep(null)

    const timer1 = setTimeout(() => setActiveStepIndex(1), 250)
    const timer2 = setTimeout(() => setActiveStepIndex(2), 550)
    const timer3 = setTimeout(() => setActiveStepIndex(3), 850)
    const timer4 = setTimeout(() => setIsSimulating(false), 1000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }

  useEffect(() => {
    setActiveStepIndex(3)
  }, [])

  const getStatusBadge = (status: TraceStep['status']) => {
    switch (status) {
      case 'passed':
        return (
          <span className="trace-pill trace-pill--passed">
            <CheckCircle2 size={11} /> PASS
          </span>
        )
      case 'flagged':
        return (
          <span className="trace-pill trace-pill--flagged">
            <AlertTriangle size={11} /> FLAGGED
          </span>
        )
      case 'human_review':
        return (
          <span className="trace-pill trace-pill--review">
            <ShieldCheck size={11} /> GATE
          </span>
        )
      case 'verified':
        return (
          <span className="trace-pill trace-pill--verified">
            <CheckCircle2 size={11} /> PROVENANCE
          </span>
        )
    }
  }

  return (
    <div className="hero-console-card" aria-label="Interactive AI system execution monitor">
      {/* Console Tab Switcher */}
      <div className="console-tabs-bar">
        {heroTracePresets.map((preset, idx) => (
          <button
            key={preset.id}
            className={`console-tab ${activePresetIndex === idx ? 'active' : ''}`}
            onClick={() => triggerSimulation(idx)}
            disabled={isSimulating}
          >
            <span className="tab-name">{preset.name.split(' ')[0]}</span>
            <span className="tab-type">{preset.systemTag.split(' / ')[1]}</span>
          </button>
        ))}
      </div>

      <div className="console-main">
        {/* Terminal Header */}
        <div className="console-header-bar">
          <div className="header-left">
            <div className="traffic-lights">
              <span className="light light--red" />
              <span className="light light--amber" />
              <span className="light light--green" />
            </div>
            <div className="header-title">
              <Terminal size={13} />
              <span>trace::{activePreset.id.split('-')[0]}</span>
            </div>
          </div>

          <div className="header-right">
            <span className="latency-badge">
              <Activity size={11} /> {activePreset.totalLatency}
            </span>
            <button
              className={`replay-btn ${isSimulating ? 'spinning' : ''}`}
              onClick={() => triggerSimulation(activePresetIndex)}
              title="Re-run trace simulation"
              aria-label="Re-run trace"
            >
              <RotateCw size={12} />
            </button>
          </div>
        </div>

        {/* Console Subhead */}
        <div className="console-sub-bar">
          <div className="sub-info">
            <strong className="sub-tag">{activePreset.systemTag}</strong>
            <p className="sub-desc">{activePreset.description}</p>
          </div>
          <span className="ratio-tag">{activePreset.deterministicRatio}</span>
        </div>

        {/* Steps Stream */}
        <div className="console-stream-body">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePreset.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="steps-wrapper"
            >
              {activePreset.steps.map((step, idx) => {
                const isVisible = idx <= activeStepIndex
                const isInspected = inspectedStep === idx

                if (!isVisible) return null

                return (
                  <div
                    key={step.stepNumber + step.name}
                    className={`step-item ${isInspected ? 'inspected' : ''}`}
                  >
                    <div
                      className="step-row"
                      onClick={() => setInspectedStep(isInspected ? null : idx)}
                    >
                      <div className="step-idx-tag">
                        <span className="idx-num">{step.stepNumber}</span>
                        <span className="idx-layer">{step.layer}</span>
                      </div>

                      <div className="step-content">
                        <div className="step-headline">
                          <span className="name">{step.name}</span>
                          <span className="duration">+{step.latencyMs}ms</span>
                        </div>
                        <p className="detail">{step.detail}</p>
                      </div>

                      <div className="step-status-wrap">
                        {getStatusBadge(step.status)}
                        {step.inspectableData && (
                          <button
                            className="inspect-btn"
                            title="Inspect step payload"
                            aria-label="Inspect step payload"
                          >
                            <Code2 size={12} />
                          </button>
                        )}
                      </div>
                    </div>

                    {isInspected && step.inspectableData && (
                      <motion.div
                        className="step-payload-drawer"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="payload-top">
                          <ChevronRight size={11} />
                          <span>payload::{step.layer.toLowerCase().replace(/\s+/g, '_')}</span>
                        </div>
                        <pre className="payload-json">
                          {JSON.stringify(step.inspectableData, null, 2)}
                        </pre>
                      </motion.div>
                    )}
                  </div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Terminal Footer */}
        <div className="console-footer-bar">
          <div className="footer-status">
            <span className="live-dot" />
            <span>Execution Verified & Traceable</span>
          </div>
          <span className="footer-hint">Click any step to inspect payload</span>
        </div>
      </div>
    </div>
  )
}
