import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import StatsCard from '@/components/StatsCard'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ code: string }>
}

export default async function StatsPage({ params }: PageProps) {
  const { code } = await params

  try {
    const link = await prisma.link.findUnique({
      where: { code },
    })

    if (!link) {
      notFound()
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900">TinyLink</h1>
            <p className="mt-1 text-sm text-gray-500">Link Statistics</p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <StatsCard link={link} />
        </main>
      </div>
    )
  } catch (error) {
    console.error('Error fetching link:', error)
    notFound()
  }
}

