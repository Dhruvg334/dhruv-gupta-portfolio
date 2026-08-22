import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, FileText, ArrowRight } from 'lucide-react'
import avatarSvg from '../assets/avatar.svg'

export function Navbar() {
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
        <Link className="brand" to="/" aria-label="Dhruv Gupta home">
          <img src={avatarSvg} alt="Dhruv Gupta" className="brand-avatar" />
          <span className="brand-name">Dhruv Gupta</span>
        </Link>

        <nav className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`} aria-label="Primary navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => setMenuOpen(false)}
          >
            Overview
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => setMenuOpen(false)}
          >
            Systems & Projects
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => setMenuOpen(false)}
          >
            Contact & Resume
          </NavLink>

          <div className="nav-actions-mobile">
            <Link
              to="/contact?tab=resume"
              className="btn btn--secondary"
              onClick={() => setMenuOpen(false)}
            >
              <FileText size={14} /> Request Resume
            </Link>
            <Link
              to="/contact"
              className="btn btn--primary"
              onClick={() => setMenuOpen(false)}
            >
              Get in Touch <ArrowRight size={14} />
            </Link>
          </div>
        </nav>

        <div className="header-desktop-actions">
          <Link to="/contact?tab=resume" className="header-resume-btn">
            <FileText size={13} /> Resume
          </Link>
          <Link to="/contact" className="header-contact-btn">
            Get in Touch
          </Link>
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
