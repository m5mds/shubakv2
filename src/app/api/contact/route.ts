import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const RATE_LIMIT = 3
const RATE_WINDOW_MS = 60 * 60 * 1000 // 1 hour

const rateMap = new Map<string, { count: number; resetAt: number }>()

function getClientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  return fwd?.split(',')[0]?.trim() ?? 'unknown'
}

function allow(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || entry.resetAt < now) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const { name, email, message, _hp } = body as Record<string, string>

    // Honeypot — silently discard bot submissions
    if (typeof _hp === 'string' && _hp.trim() !== '') {
      return NextResponse.json({ ok: true })
    }

    // Rate limit
    const ip = getClientIp(req)
    if (!allow(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'hello@shubak.ai'

    await resend.emails.send({
      from: `Shubak <${fromEmail}>`,
      to: fromEmail,
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[contact]', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
