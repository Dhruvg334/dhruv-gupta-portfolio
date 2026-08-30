import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import { Menu, X, ArrowRight, Search } from 'lucide-react'
import avatarSvg from '../assets/avatar.svg'

interface NavbarProps {
  onOpenCommandPalette?: () => void
}

const navItems = [
  { path: '/', label: 'Overview', end: true },
  { path: '/projects', label: 'Projects', end: false, preload: () => import('../pages/ProjectsPage') },
  { path: '/resume', label: 'Resume', end: false, preload: () => import('../pages/ResumePage') },
  { path: '/contact', label: 'Contact', end: false, preload: () => import('../pages/ContactPage') },
]

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

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
          {navItems.map((item) => {
            const isActive = item.end
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path)

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
                onMouseEnter={item.preload}
                onFocus={item.preload}
              >
                {isActive && (
                  <motion.span
                    layoutId="navActivePill"
                    className="nav-active-bubble"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="nav-link-label">{item.label}</span>
              </NavLink>
            )
          })}

          <div className="nav-actions-mobile">
            {onOpenCommandPalette && (
              <button
                type="button"
                className="btn btn--secondary mobile-cmd-btn"
                onClick={() => {
                  setMenuOpen(false)
                  onOpenCommandPalette()
                }}
              >
                <Search size={14} /> Quick Search (⌘K)
              </button>
            )}
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
          {onOpenCommandPalette && (
            <button
              type="button"
              className="header-cmd-trigger"
              onClick={onOpenCommandPalette}
              title="Open Command Palette (Ctrl+K / ⌘K)"
              aria-label="Open Command Palette"
            >
              <Search size={13} />
              <span className="cmd-hint-text">Search</span>
              <kbd className="cmd-key-badge">⌘K</kbd>
            </button>
          )}

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
