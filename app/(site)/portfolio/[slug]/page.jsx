// app/(site)/portfolio/[slug]/page.jsx
import { notFound } from 'next/navigation'
import WorkDetail from '@/components/WorkDetail'
import JsonLd from '@/components/JsonLd'
import { getAllWorks, getWorkBySlug } from '@/lib/data'
import { pageMeta, ogImageFrom, OG_IMAGE_URL, SITE_URL, SITE_NAME } from '@/lib/site'

export async function generateStaticParams() {
  const works = await getAllWorks()
  return works.map(w => ({ slug: w.slug }))
}

// A work's description is optional in the CMS, but both the meta description and
// the structured data need one, so they build the same sentence from the fields
// that are required.
function workDescription(work) {
  return (
    work.description ||
    `${work.title}, a ${work.category || work.type} project by ${SITE_NAME}.`
  )
}

export async function generateMetadata({ params }) {
  const work = await getWorkBySlug(params.slug)
  if (!work) return {}
  // Use the work's own cover image as its share card when present; ogImageFrom
  // crops it to card size and falls back to the site default otherwise.
  return pageMeta({
    title: `${work.title} - PJ Juplo`,
    description: workDescription(work),
    path: `/portfolio/${work.slug}`,
    type: 'article',
    images: [ogImageFrom(work.coverImage, work.title)],
    openGraph: work.publishedAt ? { publishedTime: work.publishedAt } : {},
  })
}

export default async function WorkDetailPage({ params }) {
  const works = await getAllWorks()
  const index = works.findIndex(w => w.slug === params.slug)
  if (index === -1) notFound()
  const work = works[index]

  // A photo project is a Photograph; a video project is a VideoObject. Both are
  // CreativeWork subtypes, authored by the site's Person node so the piece is
  // attributed to PJ across the site.
  const workUrl = `${SITE_URL}/portfolio/${work.slug}`
  const isVideo = work.type === 'video'
  // name, description, thumbnailUrl and uploadDate are all required on a
  // VideoObject, but cover image and published date are optional fields in the
  // CMS. Falling back to the site card and to the document's creation date keeps
  // a sparsely filled video from emitting invalid structured data.
  const thumbnail = ogImageFrom(work.coverImage, work.title)
  const thumbnailUrl = thumbnail.url.startsWith('http') ? thumbnail.url : OG_IMAGE_URL
  const uploadDate = work.publishedAt || work._createdAt
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': isVideo ? 'VideoObject' : 'Photograph',
    '@id': `${workUrl}#work`,
    name: work.title,
    description: workDescription(work),
    url: workUrl,
    // `contentUrl`, `thumbnailUrl` and `uploadDate` are MediaObject properties,
    // valid on VideoObject but not on Photograph (a CreativeWork subtype), where
    // `image` is what consumers read.
    ...(isVideo
      ? { thumbnailUrl }
      : work.coverImage
        ? { image: work.coverImage }
        : {}),
    ...(work.videoFile && isVideo ? { contentUrl: work.videoFile } : {}),
    ...(work.category ? { genre: work.category } : {}),
    ...(work.publishedAt ? { datePublished: work.publishedAt } : {}),
    ...(isVideo && uploadDate ? { uploadDate } : {}),
    creator: { '@id': `${SITE_URL}/#person` },
    author: { '@id': `${SITE_URL}/#person` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <WorkDetail
        work={work}
        prevWork={works[index - 1] || null}
        nextWork={works[index + 1] || null}
      />
    </>
  )
}
