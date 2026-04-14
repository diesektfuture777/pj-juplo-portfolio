// app/api/contact/route.js
export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return Response.json({ error: 'Missing fields' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY

    if (!apiKey) {
      // Resend not configured yet — log submission so nothing is lost in dev
      console.log('[Contact Form — no RESEND_API_KEY]', { name, email, message })
      return Response.json({ ok: true })
    }

    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.RESEND_TO_EMAIL || email,
      subject: `Portfolio inquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    })

    if (error) {
      console.error('[Contact API] Resend error:', error)
      return Response.json({ error: 'Email failed' }, { status: 500 })
    }

    return Response.json({ ok: true })
  } catch (err) {
    console.error('[Contact API]', err)
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
