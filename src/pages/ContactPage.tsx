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
import { GitHubMark, LinkedInMark, DevpostMark } from '../components/SocialIcons'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

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
    placeholder: 'Hi Dhruv, I checked out your Civitas / Mnemos / Carbonly / ChronOS case studies and had a question about...',
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

  useDocumentTitle(
    'Contact & Inquiries · Dhruv Gupta',
    'Get in touch with Dhruv Gupta for software engineering roles, technical internships, architecture reviews, and open-source systems collaboration.'
  )

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

                <a
                  href="https://devpost.com/Dhruvg334"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-item channel-item--link"
                >
                  <div className="channel-icon">
                    <DevpostMark size={18} />
                  </div>
                  <div className="channel-detail">
                    <span className="channel-lbl">Devpost Profile</span>
                    <strong>devpost.com/Dhruvg334</strong>
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
            </div>
          </motion.div>
        </div>
      </main>

      {/* Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  )
}
