import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Copy, Check, Cpu } from 'lucide-react'
import { SkeletonDiagram } from './Skeleton'

interface MermaidDiagramProps {
  chart: string
  title?: string
}

let mermaidInitialized = false

export function MermaidDiagram({ chart, title }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svgContent, setSvgContent] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [rendering, setRendering] = useState(true)

  useEffect(() => {
    let isMounted = true

    const renderChart = async () => {
      setRendering(true)
      setError(null)
      const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`

      try {
        const mermaidModule = await import('mermaid')
        const mermaid = mermaidModule.default || mermaidModule

        if (!mermaidInitialized) {
          mermaid.initialize({
            startOnLoad: false,
            theme: 'dark',
            themeVariables: {
              darkMode: true,
              background: '#110e13',
              primaryColor: '#2a151b',
              primaryTextColor: '#ffffff',
              primaryBorderColor: '#e65345',
              lineColor: '#e65345',
              secondaryColor: '#1a1622',
              tertiaryColor: '#141a18',
              fontFamily: 'DM Mono, monospace',
              fontSize: '13px',
            },
            securityLevel: 'strict',
          })
          mermaidInitialized = true
        }

        const { svg } = await mermaid.render(id, chart)
        if (isMounted) {
          setSvgContent(svg)
          setRendering(false)
        }
      } catch (err: unknown) {
        if (isMounted) {
          console.error('Mermaid rendering failed:', err)
          setError(err instanceof Error ? err.message : 'Failed to render architecture diagram')
          setRendering(false)
        }
      }
    }

    renderChart()

    return () => {
      isMounted = false
    }
  }, [chart])

  const handleCopyCode = () => {
    navigator.clipboard.writeText(chart)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mermaid-card">
      <div className="mermaid-header">
        <div className="mermaid-title">
          <span className="mermaid-badge">
            <Cpu size={12} /> ARCHITECTURE TOPOLOGY
          </span>
          {title && <h4>{title}</h4>}
        </div>
        <div className="mermaid-actions">
          <button
            type="button"
            className="mermaid-btn"
            onClick={handleCopyCode}
            title="Copy Mermaid source syntax"
            aria-label="Copy Mermaid diagram code"
          >
            {copied ? <Check size={13} className="text-emerald" /> : <Copy size={13} />}
            <span>{copied ? 'Copied' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      <div className="mermaid-body" ref={containerRef}>
        {rendering ? (
          <SkeletonDiagram />
        ) : error ? (
          <div className="mermaid-fallback">
            <pre><code>{chart}</code></pre>
          </div>
        ) : (
          <motion.div
            className="mermaid-svg-wrap"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        )}
      </div>
    </div>
  )
}
