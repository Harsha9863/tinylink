import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isValidUrl, isValidCode, generateRandomCode } from '@/lib/validation'

// GET /api/links - List all links
export async function GET() {
  try {
    const links = await prisma.link.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(links)
  } catch (error) {
    console.error('Error fetching links:', error)
    return NextResponse.json(
      { error: 'Failed to fetch links' },
      { status: 500 }
    )
  }
}

// POST /api/links - Create a new link
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { targetUrl, code } = body

    // Validate targetUrl
    if (!targetUrl || typeof targetUrl !== 'string') {
      return NextResponse.json(
        { error: 'targetUrl is required' },
        { status: 400 }
      )
    }

    if (!isValidUrl(targetUrl)) {
      return NextResponse.json(
        { error: 'Invalid URL format. Must be http:// or https://' },
        { status: 400 }
      )
    }

    let finalCode: string

    // If code is provided, validate it
    if (code) {
      if (typeof code !== 'string') {
        return NextResponse.json(
          { error: 'Code must be a string' },
          { status: 400 }
        )
      }

      if (!isValidCode(code)) {
        return NextResponse.json(
          { error: 'Code must be 6-8 characters and contain only letters and numbers' },
          { status: 400 }
        )
      }

      // Check if code already exists
      const existing = await prisma.link.findUnique({
        where: { code },
      })

      if (existing) {
        return NextResponse.json(
          { error: 'Code already exists' },
          { status: 409 }
        )
      }

      finalCode = code
    } else {
      // Generate a unique random code
      let attempts = 0
      let isUnique = false
      finalCode = generateRandomCode() // Initialize before loop
      
      while (!isUnique && attempts < 10) {
        const existing = await prisma.link.findUnique({
          where: { code: finalCode },
        })
        if (!existing) {
          isUnique = true
        } else {
          finalCode = generateRandomCode() // Generate new code if exists
          attempts++
        }
      }

      if (!isUnique) {
        return NextResponse.json(
          { error: 'Failed to generate unique code. Please try again.' },
          { status: 500 }
        )
      }
    }

    // Create the link
    const link = await prisma.link.create({
      data: {
        code: finalCode,
        targetUrl,
      },
    })

    return NextResponse.json(link, { status: 201 })
  } catch (error) {
    console.error('Error creating link:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to create link', details: errorMessage },
      { status: 500 }
    )
  }
}

