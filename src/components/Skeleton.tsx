import React from 'react'

interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  borderRadius?: string | number
  style?: React.CSSProperties
}

export function Skeleton({
  className = '',
  width,
  height,
  borderRadius,
  style = {},
}: SkeletonProps) {
  const inlineStyle: React.CSSProperties = {
    width: width ?? '100%',
    height: height ?? '1rem',
    borderRadius: borderRadius ?? 'var(--radius-sm, 6px)',
    ...style,
  }

  return <div className={`skeleton-shimmer ${className}`} style={inlineStyle} aria-hidden="true" />
}

export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`skeleton-text-group ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height="12px"
          width={i === lines - 1 ? '70%' : '100%'}
          style={{ marginBottom: '8px' }}
        />
      ))}
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-card-top">
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Skeleton width="30px" height="18px" />
          <Skeleton width="120px" height="14px" />
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Skeleton width="70px" height="32px" />
          <Skeleton width="70px" height="32px" />
        </div>
      </div>

      <div style={{ margin: '16px 0 12px' }}>
        <Skeleton width="50%" height="24px" style={{ marginBottom: '10px' }} />
        <Skeleton width="80%" height="14px" style={{ marginBottom: '14px' }} />
        <SkeletonText lines={3} />
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '16px 0' }}>
        <Skeleton width="60px" height="22px" />
        <Skeleton width="75px" height="22px" />
        <Skeleton width="65px" height="22px" />
        <Skeleton width="80px" height="22px" />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Skeleton width="180px" height="36px" borderRadius="999px" />
        <div style={{ display: 'flex', gap: '8px' }}>
          <Skeleton width="60px" height="36px" borderRadius="999px" />
          <Skeleton width="60px" height="36px" borderRadius="999px" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonDiagram() {
  return (
    <div className="skeleton-diagram-wrap" aria-hidden="true">
      <div className="skeleton-diagram-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Skeleton width="80px" height="18px" />
          <Skeleton width="160px" height="14px" />
        </div>
        <Skeleton width="70px" height="24px" />
      </div>
      <div className="skeleton-diagram-body">
        <div className="skeleton-node skeleton-node--1">
          <Skeleton width="120px" height="40px" borderRadius="8px" />
        </div>
        <div className="skeleton-connector" />
        <div className="skeleton-node skeleton-node--2">
          <Skeleton width="160px" height="50px" borderRadius="8px" />
        </div>
        <div className="skeleton-connector" />
        <div className="skeleton-node skeleton-node--3">
          <Skeleton width="140px" height="40px" borderRadius="8px" />
        </div>
      </div>
    </div>
  )
}
