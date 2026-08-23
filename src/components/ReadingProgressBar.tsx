import { motion, useScroll, useSpring } from 'motion/react'

export function ReadingProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="reading-progress-bar"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}
