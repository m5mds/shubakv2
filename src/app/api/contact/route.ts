import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const REASON_LABELS: Record<string, string> = {
  idea: 'Clear idea',
  consult: 'Still cooking',
  revamp: 'Existing product',
  other: 'Something else',
}

const BUDGET_LABELS: Record<string, string> = {
  lt10: 'Under 10,000',
  '10-20': '10,000 – 20,000',
  '20-50': '20,000 – 50,000',
  '50-200': '50,000 – 200,000',
  gt200: '200,000+',
  unsure: 'Not sure',
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const { reason, products, budget, name, email, company, phone, brief, _hp } =
      body as Record<string, string | string[]>

    // Honeypot — silently discard bot submissions
    if (typeof _hp === 'string' && _hp.trim() !== '') {
      return NextResponse.json({ ok: true })
    }

    // Validation
    const nameStr = typeof name === 'string' ? name.trim() : ''
    const emailStr = typeof email === 'string' ? email.trim() : ''
    const phoneStr = typeof phone === 'string' ? phone.trim() : ''
    const briefStr = typeof brief === 'string' ? brief.trim() : ''

    if (!nameStr || !emailStr || !phoneStr || !briefStr) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'hello@shubak.ai'
    const reasonLabel = REASON_LABELS[reason as string] ?? (reason as string) ?? '—'
    const budgetLabel = BUDGET_LABELS[budget as string] ?? (budget as string) ?? '—'
    const productsList = Array.isArray(products) ? products.join(', ') : (products as string) ?? '—'
    const companyStr = typeof company === 'string' && company.trim() ? company.trim() : '—'

    const text = [
      `Name:     ${nameStr}`,
      `Email:    ${emailStr}`,
      `Phone:    ${phoneStr}`,
      `Company:  ${companyStr}`,
      ``,
      `Reason:   ${reasonLabel}`,
      `Products: ${productsList}`,
      `Budget:   ${budgetLabel}`,
      ``,
      `Brief:`,
      briefStr,
    ].join('\n')

    await resend.emails.send({
      from: `Shubak <${fromEmail}>`,
      to: fromEmail,
      replyTo: emailStr,
      subject: `New inquiry — ${reasonLabel} (${nameStr})`,
      text,
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[contact]', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
