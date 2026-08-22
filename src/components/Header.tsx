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
      setScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = () => {
    setMenuOpen(false)
  }

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="nav-shell">
        <a className="brand" href="#top" aria-label="Dhruv Gupta home">
          <span className="brand-mark">DG</span>
          <div className="brand-text">
            <span className="brand-name">Dhruv Gupta</span>
            <span className="brand-tag">AI Systems Engineer</span>
          </div>
        </a>

        <div className="header-status-pill" title="Current Status">
          <span className="pulse-dot" />
          <span>Final-Year CS · Open to Roles</span>
        </div>

        <nav className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`} aria-label="Primary navigation">
          <a href="#work" onClick={handleNavClick}>Systems</a>
          <a href="#sandbox" onClick={handleNavClick}>Sandbox</a>
          <a href="#architecture" onClick={handleNavClick}>12-Layer Matrix</a>
          <a href="#approach" onClick={handleNavClick}>Philosophy</a>
          <a href="#about" onClick={handleNavClick}>About</a>

          <div className="nav-actions-mobile">
            <button
              className="nav-btn-secondary"
              onClick={() => {
                onOpenContact('resume')
                setMenuOpen(false)
              }}
            >
              <FileText size={15} /> Request Resume
            </button>
            <button
              className="nav-contact"
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
            className="quick-copy-btn"
            onClick={onCopyEmail}
            title="Copy email to clipboard"
            aria-label="Copy email address"
          >
            {copiedEmail ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
            <span>{copiedEmail ? 'Copied!' : 'dhruvg3304@gmail.com'}</span>
          </button>

          <button
            className="nav-btn-secondary"
            onClick={() => onOpenContact('resume')}
          >
            <FileText size={15} /> Resume
          </button>

          <button
            className="nav-contact"
            onClick={() => onOpenContact('contact')}
          >
            Contact <ArrowRight size={14} />
          </button>
        </div>

        <button
          className="menu-button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  )
}
