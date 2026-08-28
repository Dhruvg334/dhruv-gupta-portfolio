import { Link } from 'react-router-dom'
import avatarSvg from '../assets/avatar.svg'
import { GitHubMark, LinkedInMark, DevpostMark } from './SocialIcons'

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
          <a href="https://github.com/Dhruvg334" target="_blank" rel="noopener noreferrer">
            <GitHubMark size={14} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/dhruv-gupta-7a7500287/" target="_blank" rel="noopener noreferrer">
            <LinkedInMark size={14} /> LinkedIn
          </a>
          <a href="https://devpost.com/Dhruvg334" target="_blank" rel="noopener noreferrer">
            <DevpostMark size={14} /> Devpost
          </a>
        </div>

        <p className="footer-copy">
          Designed with clean architecture and verifiable systems engineering.
        </p>
      </div>
    </footer>
  )
}
