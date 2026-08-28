import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

interface StatCounterProps {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export function StatCounter({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1.2,
  className = '',
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })
  const reduceMotion = useReducedMotion()
  const [displayValue, setDisplayValue] = useState<string>(
    reduceMotion ? value.toFixed(decimals) : (0).toFixed(decimals)
  )

  useEffect(() => {
    if (reduceMotion) {
      setDisplayValue(value.toFixed(decimals))
      return
    }

    if (!isInView) return

    let startTime: number | null = null
    let animationFrameId: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      // Quintic ease-out for ultra smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 5)
      const current = easeOut * value

      setDisplayValue(current.toFixed(decimals))

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      } else {
        setDisplayValue(value.toFixed(decimals))
      }
    }

    animationFrameId = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isInView, value, decimals, duration, reduceMotion])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  )
}
