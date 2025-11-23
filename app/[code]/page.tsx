import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ code: string }>
}

export default async function RedirectPage({ params }: PageProps) {
  const { code } = await params

  try {
    const link = await prisma.link.findUnique({
      where: { code },
    })

    if (!link) {
      notFound()
    }

    // Increment clicks and update lastClicked atomically
    await prisma.link.update({
      where: { code },
      data: {
        clicks: { increment: 1 },
        lastClicked: new Date(),
      },
    })

    // Perform 302 redirect
    redirect(link.targetUrl)
  } catch (error) {
    console.error('Error in redirect:', error)
    notFound()
  }
}

