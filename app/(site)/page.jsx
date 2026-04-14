// app/(site)/page.jsx
import HeroSplit from '@/components/HeroSplit'
import mockWorks from '@/data/mockWorks'

export const metadata = {
  title: 'PJ Juplo — Photographer & Filmmaker',
  description: 'Portfolio of PJ Juplo, photographer and filmmaker based in Manila.',
}

export default function HeroPage() {
  const featured = mockWorks.find(w => w.featured) || mockWorks[0]
  return <HeroSplit featuredWork={featured} />
}
