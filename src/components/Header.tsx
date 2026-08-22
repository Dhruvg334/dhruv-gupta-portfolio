import { useState, useEffect } from 'react'
import { Menu, X, FileText, ArrowRight } from 'lucide-react'
import { ContactMode } from '../types'
import avatarSvg from '../assets/avatar.svg'

interface HeaderProps {
  onOpenContact: (mode: ContactMode) => void
}

export function Header({ onOpenContact }: HeaderProps) {
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
          <img src={avatarSvg} alt="Dhruv Gupta" className="brand-avatar" />
          <span className="brand-name">Dhruv Gupta</span>
        </a>

        <nav className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`} aria-label="Primary navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Systems</a>
          <a href="#architecture" onClick={() => setMenuOpen(false)}>Architecture</a>
          <a href="#approach" onClick={() => setMenuOpen(false)}>Philosophy</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>

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
            className="header-resume-btn"
            onClick={() => onOpenContact('resume')}
          >
            <FileText size={13} /> Resume
          </button>

          <button
            className="header-contact-btn"
            onClick={() => onOpenContact('contact')}
          >
            Contact
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
