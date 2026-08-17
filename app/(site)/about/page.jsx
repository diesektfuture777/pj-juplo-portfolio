// app/(site)/about/page.jsx
import Image from 'next/image'
import { getAbout } from '@/lib/data'
import { pageMeta } from '@/lib/site'

export const metadata = pageMeta({
  title: 'About - PJ Juplo',
  description:
    'About PJ Juplo, a Singapore-based photographer and filmmaker working across portrait, commercial, and documentary work.',
  path: '/about',
  type: 'profile',
})

export default async function AboutPage() {
  const { headline, bio, portrait } = await getAbout()
  return (
    <main className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden">
            {portrait ? (
              <Image src={portrait} alt="PJ Juplo" fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 50vw" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#C8C3BB] to-[#9A9590]" />
            )}
          </div>
          <div className="md:pt-12">
            <p className="font-body text-[10px] tracking-[4px] text-muted uppercase mb-8">
              About
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-ink tracking-[-1px] leading-tight mb-10">
              {headline}
            </h1>
            <div className="w-8 h-px bg-muted mb-10" />
            {bio.map((para, i) => (
              <p key={i} className="font-body text-sm text-muted leading-relaxed mb-5">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
