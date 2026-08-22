import { AnimatePresence, motion } from 'motion/react'
import { CheckCircle2, Info } from 'lucide-react'

interface ToastProps {
  message: string | null
  type?: 'success' | 'info'
  onClose?: () => void
}

export function Toast({ message, type = 'success' }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className={`toast-notification toast--${type}`}
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {type === 'success' ? <CheckCircle2 size={16} /> : <Info size={16} />}
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
