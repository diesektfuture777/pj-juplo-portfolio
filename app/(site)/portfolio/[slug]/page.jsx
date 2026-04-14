// app/(site)/portfolio/[slug]/page.jsx
import { notFound } from 'next/navigation'
import WorkDetail from '@/components/WorkDetail'
import mockWorks from '@/data/mockWorks'

export async function generateStaticParams() {
  return mockWorks.map(w => ({ slug: w.slug }))
}

export async function generateMetadata({ params }) {
  const work = mockWorks.find(w => w.slug === params.slug)
  if (!work) return {}
  return { title: `${work.title} — PJ Juplo` }
}

export default function WorkDetailPage({ params }) {
  const index = mockWorks.findIndex(w => w.slug === params.slug)
  if (index === -1) notFound()
  const work = mockWorks[index]
  return (
    <WorkDetail
      work={work}
      prevWork={mockWorks[index - 1] || null}
      nextWork={mockWorks[index + 1] || null}
    />
  )
}
