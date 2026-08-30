import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  Search,
  ArrowRight,
  FileText,
  Mail,
  ExternalLink,
  Copy,
  Check,
  Compass,
  FolderGit2,
  X,
  CornerDownLeft,
} from 'lucide-react'
import { projects } from '../data/projects'
import { GitHubMark, LinkedInMark, DevpostMark } from './SocialIcons'

interface CommandItem {
  id: string
  title: string
  subtitle?: string
  category: 'Navigation' | 'Case Studies' | 'Actions' | 'Social'
  icon: React.ReactNode
  onSelect: () => void
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onToast?: (msg: string) => void
}

export function CommandPalette({ isOpen, onClose, onToast }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copiedActionId, setCopiedActionId] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  const actions: CommandItem[] = useMemo(() => {
    const handleCopy = (text: string, id: string, label: string) => {
      navigator.clipboard.writeText(text)
      setCopiedActionId(id)
      onToast?.(`Copied ${label} to clipboard`)
      setTimeout(() => {
        setCopiedActionId(null)
        onClose()
      }, 600)
    }

    const items: CommandItem[] = [
      // Navigation
      {
        id: 'nav-overview',
        title: 'Home / Overview',
        subtitle: 'Main landing page & core focus areas',
        category: 'Navigation',
        icon: <Compass size={16} />,
        onSelect: () => {
          navigate('/')
          onClose()
        },
      },
      {
        id: 'nav-projects',
        title: 'Projects Directory',
        subtitle: 'Catalog of 6 production systems & pipeline sandbox',
        category: 'Navigation',
        icon: <FolderGit2 size={16} />,
        onSelect: () => {
          navigate('/projects')
          onClose()
        },
      },
      {
        id: 'nav-resume',
        title: 'Digital Resume',
        subtitle: 'ATS-friendly resume, credentials & PDF viewer',
        category: 'Navigation',
        icon: <FileText size={16} />,
        onSelect: () => {
          navigate('/resume')
          onClose()
        },
      },
      {
        id: 'nav-contact',
        title: 'Contact & Inquiry',
        subtitle: 'Direct inquiry channel & intent-based form',
        category: 'Navigation',
        icon: <Mail size={16} />,
        onSelect: () => {
          navigate('/contact')
          onClose()
        },
      },

      // Case Studies
      ...projects.map((p) => ({
        id: `case-${p.id}`,
        title: `${p.number} · ${p.name}`,
        subtitle: `${p.category} — ${p.tagline}`,
        category: 'Case Studies' as const,
        icon: <ArrowRight size={16} />,
        onSelect: () => {
          navigate(`/projects/${p.id}`)
          onClose()
        },
      })),

      // Actions
      {
        id: 'action-copy-email',
        title: 'Copy Email Address',
        subtitle: 'dhruvg3304@gmail.com',
        category: 'Actions',
        icon: copiedActionId === 'action-copy-email' ? <Check size={16} className="text-emerald" /> : <Copy size={16} />,
        onSelect: () => handleCopy('dhruvg3304@gmail.com', 'action-copy-email', 'email address'),
      },
      {
        id: 'action-copy-resume-link',
        title: 'Copy Resume Page Link',
        subtitle: 'Share link directly with recruiters',
        category: 'Actions',
        icon: copiedActionId === 'action-copy-resume-link' ? <Check size={16} className="text-emerald" /> : <Copy size={16} />,
        onSelect: () => handleCopy(window.location.origin + window.location.pathname + '#/resume', 'action-copy-resume-link', 'resume link'),
      },

      // Social Links
      {
        id: 'social-github',
        title: 'Open GitHub Profile',
        subtitle: 'github.com/Dhruvg334',
        category: 'Social',
        icon: <GitHubMark size={16} />,
        onSelect: () => {
          window.open('https://github.com/Dhruvg334', '_blank', 'noopener,noreferrer')
          onClose()
        },
      },
      {
        id: 'social-linkedin',
        title: 'Open LinkedIn Profile',
        subtitle: 'linkedin.com/in/dhruv-gupta-7a7500287',
        category: 'Social',
        icon: <LinkedInMark size={16} />,
        onSelect: () => {
          window.open('https://www.linkedin.com/in/dhruv-gupta-7a7500287/', '_blank', 'noopener,noreferrer')
          onClose()
        },
      },
      {
        id: 'social-devpost',
        title: 'Open Devpost Profile',
        subtitle: 'devpost.com/Dhruvg334',
        category: 'Social',
        icon: <DevpostMark size={16} />,
        onSelect: () => {
          window.open('https://devpost.com/Dhruvg334', '_blank', 'noopener,noreferrer')
          onClose()
        },
      },
    ]

    return items
  }, [navigate, onClose, onToast, copiedActionId])

  const filteredItems = useMemo(() => {
    if (!query.trim()) return actions
    const q = query.toLowerCase().trim()
    return actions.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
    )
  }, [actions, query])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].onSelect()
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    }
  }

  // Auto-scroll active item into view
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const activeEl = list.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="cmd-palette-overlay" onClick={onClose}>
          <motion.div
            className="cmd-palette-modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Search Input Bar */}
            <div className="cmd-palette-input-wrap">
              <Search size={18} className="cmd-search-icon" />
              <input
                ref={inputRef}
                type="text"
                className="cmd-palette-input"
                placeholder="Type a command or search systems (e.g. Civitas, Resume, Email)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                maxLength={80}
              />
              <button
                type="button"
                className="cmd-palette-close-btn"
                onClick={onClose}
                aria-label="Close command palette"
              >
                <kbd className="cmd-kbd">ESC</kbd>
              </button>
            </div>

            {/* Results List */}
            <div className="cmd-palette-list" ref={listRef}>
              {filteredItems.length === 0 ? (
                <div className="cmd-empty-state">
                  <p>No matching commands found for "{query}"</p>
                  <span>Try searching for "Civitas", "GraphRAG", "Resume", or "Email"</span>
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex
                  return (
                    <button
                      key={item.id}
                      type="button"
                      data-index={idx}
                      className={`cmd-item ${isSelected ? 'cmd-item--selected' : ''}`}
                      onClick={item.onSelect}
                      onMouseEnter={() => setSelectedIndex(idx)}
                    >
                      <div className="cmd-item-icon">{item.icon}</div>
                      <div className="cmd-item-text">
                        <span className="cmd-item-title">{item.title}</span>
                        {item.subtitle && <span className="cmd-item-subtitle">{item.subtitle}</span>}
                      </div>
                      <div className="cmd-item-meta">
                        <span className="cmd-item-badge">{item.category}</span>
                        {isSelected && <CornerDownLeft size={13} className="cmd-item-enter" />}
                      </div>
                    </button>
                  )
                })
              )}
            </div>

            {/* Footer Navigation Hints */}
            <div className="cmd-palette-footer">
              <div className="cmd-footer-hint">
                <kbd className="cmd-kbd">↑</kbd>
                <kbd className="cmd-kbd">↓</kbd>
                <span>Navigate</span>
              </div>
              <div className="cmd-footer-hint">
                <kbd className="cmd-kbd">↵</kbd>
                <span>Select</span>
              </div>
              <div className="cmd-footer-hint">
                <kbd className="cmd-kbd">ESC</kbd>
                <span>Close</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
