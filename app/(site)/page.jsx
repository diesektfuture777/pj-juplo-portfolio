// app/(site)/page.jsx
import HeroSplit from '@/components/HeroSplit'
import { getAllWorks } from '@/lib/data'

export const metadata = {
  title: 'PJ Juplo — Photographer & Filmmaker',
  description: 'Portfolio of PJ Juplo, photographer and filmmaker based in Manila.',
}

export default async function HeroPage() {
  const works = await getAllWorks()
  const featured = works.find(w => w.featured) || works[0]
  return <HeroSplit featuredWork={featured} />
}
