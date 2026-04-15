// app/(site)/contact/page.jsx
import { Mail, ExternalLink } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import { getSettings } from '@/lib/data'

export const metadata = { title: 'Contact — PJ Juplo' }

export default async function ContactPage() {
  const { email, instagram, facebook } = await getSettings()
  return (
    <main className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          <div>
            <p className="font-body text-[10px] tracking-[4px] text-muted uppercase mb-8">
              Contact
            </p>
            <h1 className="font-display text-5xl md:text-6xl text-ink tracking-[-2px] leading-tight mb-10">
              Let&apos;s work<br />together.
            </h1>
            <div className="w-8 h-px bg-muted mb-10" />
            <div className="space-y-4">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 font-body text-xs text-muted hover:text-ink transition-colors"
              >
                <Mail size={13} />
                {email}
              </a>
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-body text-xs text-muted hover:text-ink transition-colors"
                >
                  <ExternalLink size={13} />
                  Instagram
                </a>
              )}
              {facebook && (
                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-body text-xs text-muted hover:text-ink transition-colors"
                >
                  <ExternalLink size={13} />
                  Facebook
                </a>
              )}
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  )
}
