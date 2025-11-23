'use client'

import { useState, useEffect } from 'react'
import AddLinkForm from '@/components/AddLinkForm'
import LinkTable from '@/components/LinkTable'

interface Link {
  id: string
  code: string
  targetUrl: string
  clicks: number
  lastClicked: Date | null
  createdAt: Date
}

export default function Dashboard() {
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchLinks = async () => {
    try {
      const response = await fetch('/api/links')
      if (response.ok) {
        const data = await response.json()
        setLinks(data)
      }
    } catch (error) {
      console.error('Error fetching links:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  const handleLinkAdded = () => {
    fetchLinks()
  }

  const handleDelete = (code: string) => {
    setLinks(links.filter((link) => link.code !== code))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">TinyLink</h1>
          <p className="mt-1 text-sm text-gray-500">URL Shortener</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <AddLinkForm onLinkAdded={handleLinkAdded} />

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">Your Links</h2>
              {links.length > 0 && (
                <div className="flex-1 max-w-md ml-4">
                  <input
                    type="text"
                    placeholder="Search by code or URL..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>

            {loading ? (
              <div className="bg-white p-12 rounded-lg shadow-md text-center">
                <p className="text-gray-500">Loading links...</p>
              </div>
            ) : (
              <LinkTable
                links={links}
                onDelete={handleDelete}
                searchQuery={searchQuery}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

