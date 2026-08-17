// app/(site)/page.jsx
import HeroSplit from '@/components/HeroSplit'
import { getAllWorks } from '@/lib/data'
import { pageMeta, SITE_TITLE, SITE_DESCRIPTION } from '@/lib/site'

export const metadata = pageMeta({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: '/',
})

export default async function HeroPage() {
  const works = await getAllWorks()
  const featured = works.find(w => w.featured) || works[0]
  return <HeroSplit featuredWork={featured} />
}
