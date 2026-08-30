import { useEffect } from 'react'

/**
 * Dynamically updates document title and description meta tags on route changes.
 */
export function useDocumentTitle(title: string, description?: string) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) {
        metaDesc.setAttribute('content', description)
      }
    }

    return () => {
      document.title = prevTitle
    }
  }, [title, description])
}
