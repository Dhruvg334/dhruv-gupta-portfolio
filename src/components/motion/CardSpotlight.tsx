import React, { useRef, useCallback } from 'react'

interface CardSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
  radius?: number
}

/**
 * Hardware-accelerated pointer spotlight that updates CSS variables directly
 * on the DOM node to achieve 120fps without triggering React re-renders.
 */
export function CardSpotlight({
  children,
  className = '',
  spotlightColor = 'rgba(230, 83, 69, 0.14)',
  radius = 320,
  style,
  ...props
}: CardSpotlightProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--spotlight-x', `${x}px`)
    el.style.setProperty('--spotlight-y', `${y}px`)
  }, [])

  const handleMouseEnter = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    el.style.setProperty('--spotlight-opacity', '1')
  }, [])

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    el.style.setProperty('--spotlight-opacity', '0')
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`card-spotlight-wrap ${className}`}
      style={
        {
          '--spotlight-radius': `${radius}px`,
          '--spotlight-color': spotlightColor,
          '--spotlight-opacity': 0,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="card-spotlight-border" aria-hidden="true" />
      <div className="card-spotlight-inner">{children}</div>
    </div>
  )
}
