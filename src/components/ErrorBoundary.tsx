import { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Gracefully handle runtime error without crashing whole app
    console.error('Portfolio ErrorBoundary caught an error:', error, errorInfo)
  }

  private handleReload = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback-boundary">
          <div className="error-fallback-card">
            <div className="error-icon-wrap">
              <AlertTriangle size={32} />
            </div>
            <h2>An unexpected UI error occurred</h2>
            <p>
              The application encountered a runtime issue. You can reload the page or reset the view state.
            </p>
            {this.state.error && (
              <pre className="error-details">
                {this.state.error.toString()}
              </pre>
            )}
            <button className="button button--light" onClick={this.handleReload}>
              <RefreshCw size={16} /> Reload application
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
