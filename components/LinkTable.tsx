'use client'

import { useState } from 'react'
import { truncateUrl, formatDate, getShortUrl } from '@/lib/utils'

interface Link {
  id: string
  code: string
  targetUrl: string
  clicks: number
  lastClicked: Date | null
  createdAt: Date
}

interface LinkTableProps {
  links: Link[]
  onDelete: (code: string) => void
  searchQuery: string
}

export default function LinkTable({ links, onDelete, searchQuery }: LinkTableProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [deletingCode, setDeletingCode] = useState<string | null>(null)

  const filteredLinks = links.filter((link) => {
    const query = searchQuery.toLowerCase()
    return (
      link.code.toLowerCase().includes(query) ||
      link.targetUrl.toLowerCase().includes(query)
    )
  })

  const copyToClipboard = async (code: string) => {
    const shortUrl = getShortUrl(code)
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopiedCode(code)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleDelete = async (code: string) => {
    if (!confirm('Are you sure you want to delete this link?')) {
      return
    }

    setDeletingCode(code)
    try {
      const response = await fetch(`/api/links/${code}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete link')
      }

      onDelete(code)
    } catch (err) {
      alert('Failed to delete link. Please try again.')
    } finally {
      setDeletingCode(null)
    }
  }

  if (links.length === 0) {
    return (
      <div className="bg-white p-12 rounded-lg shadow-md text-center">
        <p className="text-gray-500 text-lg">No links yet. Create your first short link above!</p>
      </div>
    )
  }

  if (filteredLinks.length === 0 && searchQuery) {
    return (
      <div className="bg-white p-12 rounded-lg shadow-md text-center">
        <p className="text-gray-500 text-lg">No links match your search.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Short Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Target URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Clicks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Clicked
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLinks.map((link) => (
              <tr key={link.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <a
                      href={`/code/${link.code}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      {link.code}
                    </a>
                    <button
                      onClick={() => copyToClipboard(link.code)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      title="Copy short URL"
                    >
                      {copiedCode === link.code ? (
                        <span className="text-green-600 text-xs">✓ Copied</span>
                      ) : (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <a
                    href={link.targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-900 hover:text-blue-600 truncate block max-w-md"
                    title={link.targetUrl}
                  >
                    {truncateUrl(link.targetUrl, 60)}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900 font-medium">{link.clicks}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">{formatDate(link.lastClicked)}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDelete(link.code)}
                    disabled={deletingCode === link.code}
                    className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {deletingCode === link.code ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

