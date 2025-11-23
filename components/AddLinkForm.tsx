'use client'

import { useState } from 'react'

interface AddLinkFormProps {
  onLinkAdded: () => void
}

export default function AddLinkForm({ onLinkAdded }: AddLinkFormProps) {
  const [targetUrl, setTargetUrl] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const validateUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url)
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
    } catch {
      return false
    }
  }

  const validateCode = (code: string): boolean => {
    if (!code) return true // Optional field
    return /^[A-Za-z0-9]{6,8}$/.test(code)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Validate URL
    if (!targetUrl.trim()) {
      setError('URL is required')
      return
    }

    if (!validateUrl(targetUrl)) {
      setError('Invalid URL format. Must start with http:// or https://')
      return
    }

    // Validate code if provided
    if (code && !validateCode(code)) {
      setError('Code must be 6-8 characters and contain only letters and numbers')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetUrl: targetUrl.trim(),
          code: code.trim() || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to create link')
        return
      }

      setSuccess(true)
      setTargetUrl('')
      setCode('')
      onLinkAdded()

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Create Short Link</h2>
      
      <div>
        <label htmlFor="targetUrl" className="block text-sm font-medium text-gray-700 mb-1">
          Target URL <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="targetUrl"
          value={targetUrl}
          onChange={(e) => {
            setTargetUrl(e.target.value)
            setError('')
          }}
          placeholder="https://example.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={loading}
          required
        />
      </div>

      <div>
        <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
          Custom Code (optional)
        </label>
        <input
          type="text"
          id="code"
          value={code}
          onChange={(e) => {
            setCode(e.target.value)
            setError('')
          }}
          placeholder="6-8 characters (letters/numbers)"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={loading}
          pattern="[A-Za-z0-9]{6,8}"
          maxLength={8}
        />
        <p className="mt-1 text-xs text-gray-500">
          6-8 characters, letters and numbers only
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
          Link created successfully!
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Creating...' : 'Create Link'}
      </button>
    </form>
  )
}

