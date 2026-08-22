import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'
import { Copy, Check, RefreshCw } from 'lucide-react'

interface MermaidDiagramProps {
  chart: string
  title?: string
}

export function MermaidDiagram({ chart, title }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svgContent, setSvgContent] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [rendering, setRendering] = useState(true)

  useEffect(() => {
    let isMounted = true

    try {
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
        securityLevel: 'loose',
      })
    } catch (e) {
      console.error('Mermaid init error:', e)
    }

    const renderChart = async () => {
      setRendering(true)
      setError(null)
      const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`

      try {
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
          <span className="mermaid-badge">ARCHITECTURE FLOW</span>
          {title && <h4>{title}</h4>}
        </div>
        <div className="mermaid-actions">
          <button
            className="mermaid-btn"
            onClick={handleCopyCode}
            title="Copy Mermaid Code"
            aria-label="Copy Mermaid diagram code"
          >
            {copied ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      <div className="mermaid-body" ref={containerRef}>
        {rendering && (
          <div className="mermaid-loading">
            <RefreshCw size={18} className="spinning" />
            <span>Rendering architecture diagram...</span>
          </div>
        )}

        {error ? (
          <div className="mermaid-fallback">
            <pre><code>{chart}</code></pre>
          </div>
        ) : (
          <div
            className="mermaid-svg-wrap"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        )}
      </div>
    </div>
  )
}
