// app/(site)/portfolio/[slug]/page.jsx
import { notFound } from 'next/navigation'
import WorkDetail from '@/components/WorkDetail'
import { getAllWorks, getWorkBySlug } from '@/lib/data'

export async function generateStaticParams() {
  const works = await getAllWorks()
  return works.map(w => ({ slug: w.slug }))
}

export async function generateMetadata({ params }) {
  const work = await getWorkBySlug(params.slug)
  if (!work) return {}
  return { title: `${work.title} — PJ Juplo` }
}

export default async function WorkDetailPage({ params }) {
  const works = await getAllWorks()
  const index = works.findIndex(w => w.slug === params.slug)
  if (index === -1) notFound()
  const work = works[index]
  return (
    <WorkDetail
      work={work}
      prevWork={works[index - 1] || null}
      nextWork={works[index + 1] || null}
    />
  )
}
