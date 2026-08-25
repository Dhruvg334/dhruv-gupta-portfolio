import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { ScrollToTop } from './components/ScrollToTop'

// Eager load HomePage for instantaneous initial paint, lazy load other routes
import { HomePage } from './pages/HomePage'

const ProjectsPage = lazy(() =>
  import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage }))
)
const ProjectDetailPage = lazy(() =>
  import('./pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage }))
)
const ResumePage = lazy(() =>
  import('./pages/ResumePage').then((m) => ({ default: m.ResumePage }))
)
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
)

function PageLoadingFallback() {
  return (
    <div className="page-wrapper" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="shell text-center" style={{ padding: '64px 0' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            border: '2px solid rgba(230, 83, 69, 0.2)',
            borderTopColor: '#e65345',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 16px',
          }}
        />
        <p style={{ color: 'var(--text-muted, #a19ba2)', fontFamily: 'DM Mono, monospace', fontSize: '0.875rem' }}>
          Loading system view...
        </p>
      </div>
    </div>
  )
}

export function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />

      <main id="main-content">
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </HashRouter>
  )
}
