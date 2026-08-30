import { Component, ErrorInfo, ReactNode } from 'react'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_error: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log internally for debugging without surfacing raw trace to user
    console.error('Application ErrorBoundary caught an error:', error, errorInfo)

    // If this is a dynamic module chunk load failure from a recent deployment, auto-refresh once
    const isChunkLoadError =
      error.message?.includes('Failed to fetch dynamically imported module') ||
      error.message?.includes('Importing a module script failed') ||
      error.message?.includes('Loading chunk') ||
      error.name === 'ChunkLoadError'

    if (isChunkLoadError) {
      const hasRetried = sessionStorage.getItem('chunk_load_retried')
      if (!hasRetried) {
        sessionStorage.setItem('chunk_load_retried', 'true')
        window.location.reload()
      }
    }
  }

  private handleReload = () => {
    sessionStorage.removeItem('chunk_load_retried')
    this.setState({ hasError: false })
    window.location.reload()
  }

  private handleGoHome = () => {
    sessionStorage.removeItem('chunk_load_retried')
    this.setState({ hasError: false })
    window.location.href = window.location.origin + window.location.pathname + '#/'
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback-boundary">
          <div className="error-fallback-card">
            <div className="error-icon-wrap">
              <AlertCircle size={36} />
            </div>

            <h2 className="error-title">Something went wrong</h2>

            <p className="error-description">
              We encountered a momentary issue while loading this page. Please try refreshing to load the latest version of the portfolio.
            </p>

            <div className="error-actions-group">
              <button
                type="button"
                className="btn btn--primary"
                onClick={this.handleReload}
              >
                <RefreshCw size={15} /> Reload Page
              </button>

              <button
                type="button"
                className="btn btn--secondary"
                onClick={this.handleGoHome}
              >
                <Home size={15} /> Return Home
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
