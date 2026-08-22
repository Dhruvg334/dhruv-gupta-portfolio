import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  X,
  Send,
  Mail,
  Copy,
  Check,
  FileText,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react'
import { ContactMode } from '../types'

function GitHubMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 .7a11.3 11.3 0 0 0-3.57 22.02c.57.1.78-.24.78-.55v-2.16c-3.18.69-3.85-1.35-3.85-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.54-.29-5.21-1.27-5.21-5.59 0-1.24.44-2.24 1.17-3.03-.12-.29-.51-1.45.11-2.99 0 0 .96-.31 3.12 1.16A10.9 10.9 0 0 1 12 6.06c.96 0 1.93.13 2.84.38 2.16-1.47 3.11-1.16 3.11-1.16.63 1.54.24 2.7.12 2.99.73.79 1.17 1.79 1.17 3.03 0 4.33-2.68 5.29-5.23 5.58.41.36.78 1.06.78 2.14v3.16c0 .31.2.66.79.55A11.3 11.3 0 0 0 12 .7Z" />
    </svg>
  )
}

function LinkedInMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.1 20.45H3.54V8.98H7.1v11.47Z" />
    </svg>
  )
}

const socialLinks = {
  github: 'https://github.com/Dhruvg334',
  linkedin: 'https://www.linkedin.com/in/dhruv-gupta-7a7500287/',
  email: 'dhruvg3304@gmail.com',
}

interface ContactModalProps {
  open: boolean
  mode: ContactMode
  onClose: () => void
  onCopyEmail: () => void
  copiedEmail: boolean
}

export function ContactModal({
  open,
  mode,
  onClose,
  onCopyEmail,
  copiedEmail,
}: ContactModalProps) {
  const [activeMode, setActiveMode] = useState<ContactMode>(mode)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setActiveMode(mode)
    setSubmitted(false)
  }, [mode, open])

  useEffect(() => {
    if (!open) return
    document.body.classList.add('modal-open')
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(event) => event.target === event.currentTarget && onClose()}
        >
          <motion.div
            className="contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Close modal dialog"
            >
              <X size={19} />
            </button>

            {/* Left Column: Intro and Direct Channels */}
            <div className="modal-intro">
              <div className="modal-mode-tabs">
                <button
                  className={`mode-tab-btn ${activeMode === 'contact' ? 'active' : ''}`}
                  onClick={() => setActiveMode('contact')}
                >
                  <MessageSquare size={14} /> General Inquiry
                </button>
                <button
                  className={`mode-tab-btn ${activeMode === 'resume' ? 'active' : ''}`}
                  onClick={() => setActiveMode('resume')}
                >
                  <FileText size={14} /> Resume Request
                </button>
              </div>

              <div className="modal-intro-body">
                <p className="section-label">
                  {activeMode === 'resume' ? 'Gated Verification' : 'Direct Channel'}
                </p>
                <h2 id="contact-modal-title">
                  {activeMode === 'resume'
                    ? 'Request current resume.'
                    : 'Let’s talk AI engineering.'}
                </h2>
                <p className="modal-intro-desc">
                  {activeMode === 'resume'
                    ? 'I do not publish my resume as an open download. Share who you are, your organization, and the role you are hiring for; I will review the request and send the PDF directly to your email.'
                    : 'If you are reaching out regarding an AI Systems role, internship, engineering collaboration, or technical evaluation, leave your note below and I will respond promptly.'}
                </p>

                {activeMode === 'resume' && (
                  <div className="resume-notice-box">
                    <ShieldCheck size={16} />
                    <span>
                      Recruiter verification ensures resume accuracy and direct communication.
                    </span>
                  </div>
                )}

                <div className="modal-direct-channels">
                  <span className="channels-title">Direct Links:</span>
                  <div className="modal-links">
                    <button
                      className="modal-link-btn"
                      onClick={onCopyEmail}
                      type="button"
                    >
                      {copiedEmail ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                      <span>{copiedEmail ? 'Copied to clipboard!' : 'Copy dhruvg3304@gmail.com'}</span>
                    </button>
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="modal-link-btn"
                    >
                      <LinkedInMark size={14} /> LinkedIn Profile
                    </a>
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noreferrer"
                      className="modal-link-btn"
                    >
                      <GitHubMark size={14} /> GitHub Repositories
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Submission Form */}
            <div className="modal-form-wrap">
              {submitted ? (
                <div className="form-success-state">
                  <div className="success-icon">
                    <Check size={32} />
                  </div>
                  <h3>Message Dispatched</h3>
                  <p>
                    Thank you for reaching out. Your request has been logged and forwarded. I will reply to your email shortly.
                  </p>
                  <button
                    className="button button--dark"
                    onClick={onClose}
                  >
                    Close Dialog
                  </button>
                </div>
              ) : (
                <form
                  className="contact-form"
                  action="https://formspree.io/f/xbdwaved"
                  method="POST"
                  onSubmit={() => {
                    // Standard Formspree submission
                  }}
                >
                  <input
                    type="hidden"
                    name="request_type"
                    value={activeMode === 'resume' ? 'Resume request' : 'General contact'}
                  />

                  <div className="field-pair">
                    <label>
                      <span>Your Name *</span>
                      <input
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="e.g. Sarah Connor"
                        required
                      />
                    </label>
                    <label>
                      <span>Work Email *</span>
                      <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="sarah@company.com"
                        required
                      />
                    </label>
                  </div>

                  {activeMode === 'resume' && (
                    <div className="field-pair">
                      <label>
                        <span>Company / Organization *</span>
                        <input
                          name="company"
                          type="text"
                          autoComplete="organization"
                          placeholder="e.g. Anthropic / DeepMind"
                          required
                        />
                      </label>
                      <label>
                        <span>Target Role / Team *</span>
                        <input
                          name="role"
                          type="text"
                          placeholder="e.g. AI Systems Engineer"
                          required
                        />
                      </label>
                    </div>
                  )}

                  <label>
                    <span>Subject *</span>
                    <input
                      name="subject"
                      type="text"
                      defaultValue={activeMode === 'resume' ? 'Resume Request: AI Systems Engineer' : ''}
                      placeholder="Role, technical inquiry, or collaboration"
                      required
                    />
                  </label>

                  <label>
                    <span>Message *</span>
                    <textarea
                      name="message"
                      rows={5}
                      defaultValue={
                        activeMode === 'resume'
                          ? 'Hi Dhruv, I would like to review your current resume for our engineering team. Here is brief context about the role:'
                          : ''
                      }
                      placeholder="Share a brief overview of what you are working on or hiring for."
                      required
                    />
                  </label>

                  <div className="form-submit-row">
                    <button className="button button--dark form-submit" type="submit">
                      {activeMode === 'resume' ? 'Submit Resume Request' : 'Send Message'}
                      <Send size={15} />
                    </button>
                    <span className="form-note">Direct delivery to personal inbox</span>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
