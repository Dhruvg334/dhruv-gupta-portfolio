import React, { useRef, useState, useCallback } from 'react'

interface CardSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
  radius?: number
}

export function CardSpotlight({
  children,
  className = '',
  spotlightColor = 'rgba(230, 83, 69, 0.12)',
  radius = 320,
  ...props
}: CardSpotlightProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setPosition(null)
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
          position: 'relative',
          '--spotlight-x': position ? `${position.x}px` : '50%',
          '--spotlight-y': position ? `${position.y}px` : '50%',
          '--spotlight-radius': `${radius}px`,
          '--spotlight-color': spotlightColor,
          '--spotlight-opacity': isHovered ? 1 : 0,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="card-spotlight-border" aria-hidden="true" />
      <div className="card-spotlight-inner">{children}</div>
    </div>
  )
}
