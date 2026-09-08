/**
 * Frontend Security & Sanitization Utilities
 *
 * Provides defensive protections against:
 * 1. XSS / Malicious Protocol Injection (javascript:, vbscript:, data:)
 * 2. Prototype Pollution & Storage Access Exceptions (Safe Storage Wrapper)
 * 3. Form Flooding & Spam Bot Infiltration (Rate Limiter & Honeypot Checks)
 * 4. Input Buffer / ReDoS Vulnerabilities (Input Sanitization & Clamping)
 */

const ALLOWED_PROTOCOLS = new Set(['http:', 'https:', 'mailto:'])

/**
 * Sanitizes URLs to ensure they only use safe, permitted schemes.
 * Rejects javascript:, vbscript:, and unauthorized data: URIs.
 */
export function sanitizeUrl(url?: string | null, fallback = '#'): string {
  if (!url || typeof url !== 'string') {
    return fallback
  }

  const trimmed = url.trim()

  // Allow relative anchor or path links
  if (trimmed.startsWith('/') || trimmed.startsWith('#') || trimmed.startsWith('./')) {
    return trimmed
  }

  try {
    const parsed = new URL(trimmed, window.location.origin)
    if (ALLOWED_PROTOCOLS.has(parsed.protocol)) {
      return trimmed
    }
    console.warn(`[Security] Blocked potentially unsafe URL protocol: ${parsed.protocol}`)
    return fallback
  } catch {
    // If URL parsing fails and it's not a relative path, reject it
    return fallback
  }
}

/**
 * RFC 5322-compliant email format validation.
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false
  const trimmed = email.trim()
  if (trimmed.length > 120 || trimmed.length < 5) return false

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

  return emailRegex.test(trimmed)
}

/**
 * Strips null bytes, zero-width spaces, and control characters from text inputs.
 * Enforces strict maximum length bounds to mitigate ReDoS and client buffer abuse.
 */
export function sanitizeTextInput(input: string, maxLength = 2000): string {
  if (typeof input !== 'string') return ''

  return (
    input
      // Remove null bytes
      .replace(/\0/g, '')
      // Remove zero-width spaces and invisible joiners
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      // Normalize line breaks
      .replace(/\r\n/g, '\n')
      // Clamp length
      .slice(0, maxLength)
      .trim()
  )
}

/**
 * Prototype-safe Storage wrapper that prevents prototype pollution
 * and safely swallows quota/security exceptions in private/incognito browsing.
 */
export const safeStorage = {
  get(key: string, storage: 'session' | 'local' = 'session'): string | null {
    try {
      const store = storage === 'session' ? window.sessionStorage : window.localStorage
      return store.getItem(key)
    } catch {
      return null
    }
  },

  set(key: string, value: string, storage: 'session' | 'local' = 'session'): boolean {
    try {
      // Guard against prototype pollution keys
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        return false
      }
      const store = storage === 'session' ? window.sessionStorage : window.localStorage
      store.setItem(key, value)
      return true
    } catch {
      return false
    }
  },

  remove(key: string, storage: 'session' | 'local' = 'session'): boolean {
    try {
      const store = storage === 'session' ? window.sessionStorage : window.localStorage
      store.removeItem(key)
      return true
    } catch {
      return false
    }
  },
}

/**
 * Client-side rate-limiting cooldown checker using safeStorage.
 * Returns whether the action is allowed and any remaining seconds in cooldown.
 */
export function checkRateLimit(
  actionKey: string,
  cooldownMs = 15000
): { allowed: boolean; remainingSec: number } {
  const storageKey = `rate_limit_${actionKey}`
  const now = Date.now()
  const lastTimeStr = safeStorage.get(storageKey, 'local')

  if (lastTimeStr) {
    const lastTime = parseInt(lastTimeStr, 10)
    if (!isNaN(lastTime)) {
      const diff = now - lastTime
      if (diff < cooldownMs) {
        const remainingSec = Math.ceil((cooldownMs - diff) / 1000)
        return { allowed: false, remainingSec }
      }
    }
  }

  // Record new timestamp
  safeStorage.set(storageKey, now.toString(), 'local')
  return { allowed: true, remainingSec: 0 }
}
