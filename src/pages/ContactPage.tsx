import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import {
  Mail,
  FileText,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Building,
  GraduationCap,
  Calendar,
  MessageSquare,
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

export function ContactPage() {
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<'contact' | 'resume'>('contact')
  const [submitted, setSubmitted] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (searchParams.get('tab') === 'resume') {
      setActiveTab('resume')
    }
  }, [searchParams])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('dhruvg3304@gmail.com')
    setCopied(true)
    showToast('Copied to clipboard: dhruvg3304@gmail.com')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
        if (res.ok) {
          setSubmitted(true)
          showToast(
            activeTab === 'resume'
              ? 'Resume request received. I will send it over shortly!'
              : 'Message sent successfully. I will get back to you soon!'
          )
        } else {
          showToast('Failed to send. Please email me directly at dhruvg3304@gmail.com')
        }
      })
      .catch(() => {
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
              Whether you are discussing AI system architecture, exploring potential roles, or requesting my technical resume.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Form & Info Section */}
      <section className="section contact-main-section">
        <div className="shell contact-grid-layout">
          {/* Left: Interactive Form Card */}
          <motion.div className="contact-card-wrap" {...reveal}>
            <div className="contact-form-container">
              {/* Tab Switcher */}
              <div className="contact-mode-tabs" role="tablist">
                <button
                  className={`mode-tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('contact')
                    setSubmitted(false)
                  }}
                  role="tab"
                  aria-selected={activeTab === 'contact'}
                >
                  <MessageSquare size={15} /> Send Message
                </button>
                <button
                  className={`mode-tab-btn ${activeTab === 'resume' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('resume')
                    setSubmitted(false)
                  }}
                  role="tab"
                  aria-selected={activeTab === 'resume'}
                >
                  <FileText size={15} /> Request Resume
                </button>
              </div>

              {submitted ? (
                <div className="form-success-state">
                  <CheckCircle2 size={42} className="text-emerald" />
                  <h3>
                    {activeTab === 'resume' ? 'Resume Request Received' : 'Message Sent Successfully'}
                  </h3>
                  <p>
                    Thank you for reaching out. I personally review every message and will respond to{' '}
                    <strong>your email</strong> promptly.
                  </p>
                  <button
                    className="btn btn--secondary"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form-body">
                  <input
                    type="hidden"
                    name="_subject"
                    value={
                      activeTab === 'resume'
                        ? 'Resume Request via Portfolio'
                        : 'New Message via Portfolio'
                    }
                  />
                  <input type="hidden" name="form_type" value={activeTab} />

                  {activeTab === 'resume' && (
                    <div className="resume-info-banner">
                      <FileText size={16} />
                      <p>
                        My resume contains updated project metrics, engineering leadership, and verified system benchmarks.
                      </p>
                    </div>
                  )}

                  <div className="form-field-pair">
                    <label>
                      <span>Your Name *</span>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Sarah Jenkins"
                      />
                    </label>

                    <label>
                      <span>Your Email *</span>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="e.g. sarah@company.com"
                      />
                    </label>
                  </div>

                  {activeTab === 'resume' ? (
                    <>
                      <div className="form-field-pair">
                        <label>
                          <span>Organization / Company</span>
                          <input
                            type="text"
                            name="organization"
                            placeholder="e.g. Anthropic / Stealth AI / University"
                          />
                        </label>

                        <label>
                          <span>Purpose of Request *</span>
                          <select name="purpose" required className="form-select">
                            <option value="Internship / Full-time Role">Internship / Full-Time Engineering</option>
                            <option value="Technical Collaboration">Technical Collaboration / Research</option>
                            <option value="Consulting / Architecture Review">System Architecture Review</option>
                            <option value="General Exploration">General Exploration</option>
                          </select>
                        </label>
                      </div>

                      <label>
                        <span>Note (Optional)</span>
                        <textarea
                          name="message"
                          rows={3}
                          placeholder="Any specific context or team details you'd like to share..."
                        />
                      </label>
                    </>
                  ) : (
                    <>
                      <label>
                        <span>Subject *</span>
                        <input
                          type="text"
                          name="subject"
                          required
                          placeholder="e.g. System Architecture / Question about Mnemos"
                        />
                      </label>

                      <label>
                        <span>Message *</span>
                        <textarea
                          name="message"
                          rows={5}
                          required
                          placeholder="Hi Dhruv, I wanted to discuss..."
                        />
                      </label>
                    </>
                  )}

                  <div className="form-submit-row">
                    <button type="submit" className="btn btn--primary btn--large">
                      <Send size={15} />
                      {activeTab === 'resume' ? 'Request Resume' : 'Send Message'}
                    </button>
                    <span className="submit-note">Delivered directly to inbox</span>
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
                        className="copy-icon-btn"
                        onClick={handleCopyEmail}
                        title="Copy email address"
                      >
                        {copied ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                </div>

                <a
                  href="https://github.com/Dhruvg334"
                  target="_blank"
                  rel="noreferrer"
                  className="channel-item channel-item--link"
                >
                  <div className="channel-icon">
                    <GitHubMark size={18} />
                  </div>
                  <div className="channel-detail">
                    <span className="channel-lbl">GitHub</span>
                    <strong>github.com/Dhruvg334</strong>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/dhruv-gupta-7a7500287/"
                  target="_blank"
                  rel="noreferrer"
                  className="channel-item channel-item--link"
                >
                  <div className="channel-icon">
                    <LinkedInMark size={18} />
                  </div>
                  <div className="channel-detail">
                    <span className="channel-lbl">LinkedIn</span>
                    <strong>linkedin.com/in/dhruv-gupta-7a7500287</strong>
                  </div>
                </a>
              </div>

              {/* Status & Availability Box */}
              <div className="availability-box">
                <h4>Availability & Academic Timeline</h4>
                <ul>
                  <li>
                    <GraduationCap size={15} />
                    <span><strong>B.Tech CSE @ KIIT</strong> (Graduating July 2027)</span>
                  </li>
                  <li>
                    <Calendar size={15} />
                    <span>Open for technical internships, research, and AI systems engineering discussions</span>
                  </li>
                  <li>
                    <Building size={15} />
                    <span>Remote or onsite engineering opportunities</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  )
}
