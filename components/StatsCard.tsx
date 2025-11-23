'use client'

import { formatDate, getShortUrl } from '@/lib/utils'

interface Link {
  id: string
  code: string
  targetUrl: string
  clicks: number
  lastClicked: Date | null
  createdAt: Date
}

interface StatsCardProps {
  link: Link
}

export default function StatsCard({ link }: StatsCardProps) {
  const shortUrl = getShortUrl(link.code)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      alert('Short URL copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Link Statistics</h1>
        <p className="text-gray-600">Detailed information about your short link</p>
      </div>

      <div className="space-y-4">
        <div className="border-b border-gray-200 pb-4">
          <label className="text-sm font-medium text-gray-500">Short Code</label>
          <div className="mt-1 flex items-center space-x-2">
            <p className="text-lg font-mono text-blue-600">{link.code}</p>
            <button
              onClick={copyToClipboard}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Copy short URL"
            >
              <svg
                className="w-5 h-5"
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
            </button>
          </div>
        </div>

        <div className="border-b border-gray-200 pb-4">
          <label className="text-sm font-medium text-gray-500">Short URL</label>
          <p className="mt-1 text-lg text-gray-900 break-all">{shortUrl}</p>
        </div>

        <div className="border-b border-gray-200 pb-4">
          <label className="text-sm font-medium text-gray-500">Target URL</label>
          <a
            href={link.targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 text-lg text-blue-600 hover:text-blue-800 break-all block"
          >
            {link.targetUrl}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <label className="text-sm font-medium text-gray-500">Total Clicks</label>
            <p className="mt-1 text-3xl font-bold text-blue-600">{link.clicks}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="text-sm font-medium text-gray-500">Last Clicked</label>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {formatDate(link.lastClicked)}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="text-sm font-medium text-gray-500">Created</label>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {formatDate(link.createdAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <a
          href="/"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Dashboard
        </a>
      </div>
    </div>
  )
}

