// app/(site)/portfolio/page.jsx
import PortfolioGrid from '@/components/PortfolioGrid'
import JsonLd from '@/components/JsonLd'
import { getAllWorks } from '@/lib/data'
import { pageMeta, SITE_URL } from '@/lib/site'

export const metadata = pageMeta({
  title: 'Work - PJ Juplo',
  description:
    'Selected photography and film work by PJ Juplo, across portrait, commercial, street, and documentary projects.',
  path: '/portfolio',
})

export default async function PortfolioPage() {
  const works = await getAllWorks()

  // ItemList of the works, built from the same array the grid renders so the
  // two cannot drift. Lets an answer engine enumerate the portfolio and link
  // each piece rather than reading titles out of grid markup.
  const listed = works.filter((w) => w.slug)
  const listJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Selected work by PJ Juplo',
    numberOfItems: listed.length,
    itemListElement: listed.map((w, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/portfolio/${w.slug}`,
      name: w.title,
    })),
  }

  return (
    <main className="min-h-screen bg-bg pt-16">
      <JsonLd data={listJsonLd} />
      <PortfolioGrid works={works} />
    </main>
  )
}
