/**
 * Truncates a URL to a maximum length with ellipsis
 */
export function truncateUrl(url: string, maxLength: number = 50): string {
  if (url.length <= maxLength) return url
  return url.substring(0, maxLength - 3) + '...'
}

/**
 * Formats a date to a readable string
 */
export function formatDate(date: Date | null | undefined): string {
  if (!date) return 'Never'
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

/**
 * Gets the full short URL from a code
 * Works in both server and client components
 */
export function getShortUrl(code: string, baseUrl?: string): string {
  if (baseUrl) {
    return `${baseUrl}/${code}`
  }
  
  // Client-side: use window.location.origin
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/${code}`
  }
  
  // Server-side: use environment variable or default
  const base = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  return `${base}/${code}`
}

