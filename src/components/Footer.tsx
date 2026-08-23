import { Link } from 'react-router-dom'
import avatarSvg from '../assets/avatar.svg'

function GitHubMark({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 .7a11.3 11.3 0 0 0-3.57 22.02c.57.1.78-.24.78-.55v-2.16c-3.18.69-3.85-1.35-3.85-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.54-.29-5.21-1.27-5.21-5.59 0-1.24.44-2.24 1.17-3.03-.12-.29-.51-1.45.11-2.99 0 0 .96-.31 3.12 1.16A10.9 10.9 0 0 1 12 6.06c.96 0 1.93.13 2.84.38 2.16-1.47 3.11-1.16 3.11-1.16.63 1.54.24 2.7.12 2.99.73.79 1.17 1.79 1.17 3.03 0 4.33-2.68 5.29-5.23 5.58.41.36.78 1.06.78 2.14v3.16c0 .31.2.66.79.55A11.3 11.3 0 0 0 12 .7Z" />
    </svg>
  )
}

function LinkedInMark({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.1 20.45H3.54V8.98H7.1v11.47Z" />
    </svg>
  )
}

interface FooterProps {
  onCopyEmail?: () => void
}

export function Footer({ onCopyEmail }: FooterProps) {
  return (
    <footer className="site-footer no-print">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <img src={avatarSvg} alt="Dhruv Gupta" className="footer-avatar" />
          <div>
            <strong>Dhruv Gupta</strong>
            <p>AI Systems Builder · KIIT CSE '27</p>
          </div>
        </div>

        <div className="footer-links-row">
          <Link to="/projects">Projects</Link>
          <Link to="/resume">Resume</Link>
          <Link to="/contact">Contact</Link>
          {onCopyEmail ? (
            <button onClick={onCopyEmail} className="footer-link-btn">
              Copy Email
            </button>
          ) : (
            <a href="mailto:dhruvg3304@gmail.com">Email</a>
          )}
          <a href="https://github.com/Dhruvg334" target="_blank" rel="noreferrer">
            <GitHubMark size={14} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/dhruv-gupta-7a7500287/" target="_blank" rel="noreferrer">
            <LinkedInMark size={14} /> LinkedIn
          </a>
        </div>

        <p className="footer-copy">
          Designed with clean architecture and verifiable systems engineering.
        </p>
      </div>
    </footer>
  )
}
