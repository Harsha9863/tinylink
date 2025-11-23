import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ code: string }>
}

export default async function RedirectPage({ params }: PageProps) {
  const { code } = await params

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

  // Perform 307 redirect (Next.js uses 307 for redirect())
  // Note: redirect() throws a special NEXT_REDIRECT error that Next.js handles
  // We don't catch it - it must propagate to work correctly
  redirect(link.targetUrl)
}

