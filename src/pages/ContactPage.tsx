import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  Mail,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Building,
  GraduationCap,
  Calendar,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Briefcase,
  Users,
  Cpu,
  Clock,
} from 'lucide-react'
import { Toast } from '../components/Toast'

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

interface ContactIntent {
  id: string
  label: string
  icon: typeof Briefcase
  defaultSubject: string
  placeholder: string
}

const contactIntents: ContactIntent[] = [
  {
    id: 'hiring',
    label: 'Full-Time / Internship Role',
    icon: Briefcase,
    defaultSubject: 'Engineering Opportunity / Role Discussion',
    placeholder: 'Hi Dhruv, we came across your work and would love to discuss an engineering role with our team...',
  },
  {
    id: 'collab',
    label: 'Project Collaboration',
    icon: Users,
    defaultSubject: 'Project Collaboration / Research',
    placeholder: 'Hi Dhruv, I am building something interesting in AI/RAG and would love to collaborate on...',
  },
  {
    id: 'arch',
    label: 'System Architecture Discussion',
    icon: Cpu,
    defaultSubject: 'Architecture Discussion / Questions',
    placeholder: 'Hi Dhruv, I checked out your Civitas / Mnemos / ChronOS case studies and had a question about...',
  },
  {
    id: 'general',
    label: 'General Inquiry',
    icon: MessageSquare,
    defaultSubject: 'Saying Hello / Inquiry',
    placeholder: 'Hi Dhruv, just reaching out to connect...',
  },
]

export function ContactPage() {
  const [selectedIntent, setSelectedIntent] = useState(contactIntents[0])
  const [subject, setSubject] = useState(contactIntents[0].defaultSubject)
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      setCurrentTime(`${timeStr} IST (UTC+5:30)`)
    }

    updateTime()
    const interval = setInterval(updateTime, 10000)
    return () => clearInterval(interval)
  }, [])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('dhruvg3304@gmail.com')
    setCopied(true)
    showToast('Copied email to clipboard: dhruvg3304@gmail.com')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleIntentSelect = (intent: ContactIntent) => {
    setSelectedIntent(intent)
    setSubject(intent.defaultSubject)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const form = e.currentTarget
    const formData = new FormData(form)

    fetch('https://formspree.io/f/mqakbvzv', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => {
        setIsSubmitting(false)
        if (res.ok) {
          setSubmitted(true)
          setMessage('')
          showToast('Message sent successfully! I will get back to you soon.')
        } else {
          showToast('Failed to send. Please email me directly at dhruvg3304@gmail.com')
        }
      })
      .catch(() => {
        setIsSubmitting(false)
        showToast('Failed to send. Please email me directly at dhruvg3304@gmail.com')
      })
  }

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.1 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
      }

  return (
    <div className="page-wrapper contact-page">
      {/* Header */}
      <section className="page-header-section">
        <div className="shell">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-label">Connect & Collaborate</p>
            <h1 className="page-title">Get in Touch</h1>
            <p className="page-subtitle">
              Whether you are discussing engineering opportunities, exploring technical collaboration, or asking questions about my projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <main className="section contact-main-section">
        <div className="shell contact-layout-grid">
          {/* Left: Interactive Form */}
          <motion.div className="contact-form-wrap" {...reveal}>
            <div className="contact-form-card">
              <div className="form-card-header">
                <h2>Send a Message</h2>
                <p>Pick a topic to tailor your inquiry or compose a direct note below.</p>
              </div>

              {/* Topic Selector Pills */}
              <div className="intent-selector-group">
                <span className="intent-group-label">What would you like to discuss?</span>
                <div className="intent-pills-row">
                  {contactIntents.map((intent) => {
                    const Icon = intent.icon
                    const isSelected = selectedIntent.id === intent.id
                    return (
                      <button
                        key={intent.id}
                        type="button"
                        className={`intent-pill-btn ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleIntentSelect(intent)}
                      >
                        <Icon size={14} />
                        <span>{intent.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {submitted ? (
                <div className="contact-success-box">
                  <div className="success-icon-wrap">
                    <CheckCircle2 size={40} className="text-emerald" />
                  </div>
                  <h3>Message Sent Successfully!</h3>
                  <p>
                    Thank you for reaching out. Your note has been delivered to <strong>dhruvg3304@gmail.com</strong>. I typically respond within 24 hours.
                  </p>
                  <button
                    type="button"
                    className="btn btn--secondary"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form-body">
                  <input type="hidden" name="_intent" value={selectedIntent.label} />

                  <div className="form-field-pair">
                    <label>
                      <span>Your Name *</span>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Sarah Jenkins"
                        maxLength={100}
                      />
                    </label>

                    <label>
                      <span>Your Email *</span>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="e.g. sarah@company.com"
                        maxLength={120}
                      />
                    </label>
                  </div>

                  <div className="form-field-pair">
                    <label>
                      <span>Company / Organization (Optional)</span>
                      <input
                        type="text"
                        name="organization"
                        placeholder="e.g. Acme AI / University"
                        maxLength={100}
                      />
                    </label>

                    <label>
                      <span>Subject *</span>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Role Discussion / Question about Civitas"
                        maxLength={150}
                      />
                    </label>
                  </div>

                  <label>
                    <div className="label-top-row">
                      <span>Message *</span>
                      <span className="char-counter">{message.length} / 3000 characters</span>
                    </div>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={selectedIntent.placeholder}
                      maxLength={3000}
                    />
                  </label>

                  <div className="form-submit-row">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn--primary btn--large"
                    >
                      <Send size={15} />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                    <span className="submit-note">Delivered directly to dhruvg3304@gmail.com</span>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right: Direct Channels & Status Sidebar */}
          <motion.div className="contact-sidebar-wrap" {...reveal}>
            <div className="contact-info-card">
              <h3>Direct Channels</h3>

              <div className="direct-channels-list">
                <div className="channel-item">
                  <div className="channel-icon">
                    <Mail size={18} />
                  </div>
                  <div className="channel-detail">
                    <span className="channel-lbl">Email Address</span>
                    <div className="email-copy-row">
                      <strong>dhruvg3304@gmail.com</strong>
                      <button
                        type="button"
                        className="copy-icon-btn"
                        onClick={handleCopyEmail}
                        title="Copy email address"
                        aria-label="Copy email address"
                      >
                        {copied ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                </div>

                <a
                  href="https://github.com/Dhruvg334"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-item channel-item--link"
                >
                  <div className="channel-icon">
                    <GitHubMark size={18} />
                  </div>
                  <div className="channel-detail">
                    <span className="channel-lbl">GitHub Profile</span>
                    <strong>github.com/Dhruvg334</strong>
                  </div>
                  <ArrowRight size={14} className="channel-arrow" />
                </a>

                <a
                  href="https://www.linkedin.com/in/dhruv-gupta-7a7500287/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-item channel-item--link"
                >
                  <div className="channel-icon">
                    <LinkedInMark size={18} />
                  </div>
                  <div className="channel-detail">
                    <span className="channel-lbl">LinkedIn</span>
                    <strong>linkedin.com/in/dhruv-gupta</strong>
                  </div>
                  <ArrowRight size={14} className="channel-arrow" />
                </a>
              </div>

              {/* Status & Availability Box */}
              <div className="availability-box">
                <h4>Availability & Academic Timeline</h4>
                <ul>
                  <li>
                    <GraduationCap size={15} className="text-accent" />
                    <span>
                      <strong>Current Degree:</strong> B.Tech CSE @ KIIT Bhubaneswar
                    </span>
                  </li>
                  <li>
                    <Calendar size={15} className="text-accent" />
                    <span>
                      <strong>Graduation:</strong> July 2027 (Currently Final-Year)
                    </span>
                  </li>
                  <li>
                    <Building size={15} className="text-accent" />
                    <span>
                      <strong>Opportunities:</strong> Open to Full-Time, Technical Internships & Open-Source Research
                    </span>
                  </li>
                  <li>
                    <Clock size={15} className="text-accent" />
                    <span>
                      <strong>Current Local Time:</strong> {currentTime || 'IST (UTC+5:30)'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Verified Credentials Quick Summary */}
              <div className="credentials-mini-box">
                <h4>Academic & Technical Highlights</h4>
                <div className="cred-pill-list">
                  <div className="cred-pill">
                    <CheckCircle2 size={13} className="text-emerald" />
                    <span>9.45 / 10.0 CGPA</span>
                  </div>
                  <div className="cred-pill">
                    <CheckCircle2 size={13} className="text-emerald" />
                    <span>GATE DA 2026 Qualified (AIR 1109)</span>
                  </div>
                  <div className="cred-pill">
                    <CheckCircle2 size={13} className="text-emerald" />
                    <span>Global Tech Innovation 2026 Winner</span>
                  </div>
                  <div className="cred-pill">
                    <CheckCircle2 size={13} className="text-emerald" />
                    <span>6 Production Architectural Case Studies</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  )
}
