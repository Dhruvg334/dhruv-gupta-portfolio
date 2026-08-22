import { useState, useEffect } from 'react'
import { ArrowRight, Copy, Check, Menu, X, FileText } from 'lucide-react'
import { ContactMode } from '../types'

interface HeaderProps {
  onOpenContact: (mode: ContactMode) => void
  onCopyEmail: () => void
  copiedEmail: boolean
}

export function Header({ onOpenContact, onCopyEmail, copiedEmail }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="nav-shell">
        <a className="brand" href="#top" aria-label="Dhruv Gupta home">
          <span className="brand-mark">DG</span>
          <div className="brand-text">
            <span className="brand-name">Dhruv Gupta</span>
            <span className="brand-role">AI Systems Engineer</span>
          </div>
        </a>

        <div className="header-status-pill" title="Status">
          <span className="status-live-beacon" />
          <span>KIIT CSE '26 · Open to Roles</span>
        </div>

        <nav className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`} aria-label="Primary navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Systems</a>
          <a href="#architecture" onClick={() => setMenuOpen(false)}>Architecture</a>
          <a href="#approach" onClick={() => setMenuOpen(false)}>Philosophy</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#archive" onClick={() => setMenuOpen(false)}>Archive</a>

          <div className="nav-actions-mobile">
            <button
              className="btn btn--secondary"
              onClick={() => {
                onOpenContact('resume')
                setMenuOpen(false)
              }}
            >
              <FileText size={14} /> Request Resume
            </button>
            <button
              className="btn btn--primary"
              onClick={() => {
                onOpenContact('contact')
                setMenuOpen(false)
              }}
            >
              Contact <ArrowRight size={14} />
            </button>
          </div>
        </nav>

        <div className="header-desktop-actions">
          <button
            className="quick-email-btn"
            onClick={onCopyEmail}
            title="Copy email address to clipboard"
            aria-label="Copy email address"
          >
            {copiedEmail ? <Check size={13} className="text-emerald" /> : <Copy size={13} />}
            <span>{copiedEmail ? 'Copied' : 'dhruvg3304@gmail.com'}</span>
          </button>

          <button
            className="header-resume-btn"
            onClick={() => onOpenContact('resume')}
          >
            <FileText size={14} /> Resume
          </button>

          <button
            className="header-contact-btn"
            onClick={() => onOpenContact('contact')}
          >
            Get in touch
          </button>
        </div>

        <button
          className="menu-button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  )
}
