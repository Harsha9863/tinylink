/**
 * Validates if a string is a valid HTTP/HTTPS URL
 */
export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Validates if a code matches the required format: [A-Za-z0-9]{6,8}
 */
export function isValidCode(code: string): boolean {
  const codeRegex = /^[A-Za-z0-9]{6,8}$/
  return codeRegex.test(code)
}

/**
 * Generates a random code of length between 6 and 8 characters
 */
export function generateRandomCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const length = Math.floor(Math.random() * 3) + 6 // 6, 7, or 8
  let code = ''
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

