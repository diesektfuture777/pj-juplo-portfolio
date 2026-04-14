// components/WorkDetail.jsx
'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function WorkDetail({ work, prevWork, nextWork }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <>
      <main className="min-h-screen bg-bg pt-24">
        <div className="max-w-7xl mx-auto px-6 pb-24">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-body text-[10px] tracking-[3px] text-muted uppercase hover:text-ink transition-colors mb-16"
          >
            <ChevronLeft size={12} />
            All Work
          </Link>

          <div className="mb-10">
            {work.type === 'video' ? (
              <video
                src={work.videoFile || undefined}
                controls
                className="w-full max-h-[80vh] object-contain bg-black"
                poster={work.coverImage || undefined}
              >
                {!work.videoFile && (
                  <div className="w-full aspect-video bg-gradient-to-br from-[#C8C3BB] to-[#9A9590] flex items-center justify-center">
                    <p className="font-body text-xs text-white/60 tracking-widest uppercase">Video coming soon</p>
                  </div>
                )}
              </video>
            ) : (
              <div
                className="relative cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setLightboxOpen(true)}
                aria-label="Expand image"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  {work.coverImage ? (
                    <Image src={work.coverImage} alt={work.title} fill className="object-cover" priority />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#C8C3BB] to-[#9A9590]" />
                  )}
                </div>
                <p className="absolute bottom-4 right-4 font-body text-[9px] tracking-[2px] text-white/50 uppercase select-none">
                  Click to expand
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <p className="font-body text-[10px] tracking-[3px] text-muted uppercase mb-2">
                {work.category}
              </p>
              <h1 className="font-display text-5xl text-ink tracking-[-1px]">{work.title}</h1>
              {work.description && (
                <p className="font-body text-sm text-muted mt-4 max-w-lg leading-relaxed">
                  {work.description}
                </p>
              )}
            </div>
            <div className="flex gap-8 shrink-0">
              {prevWork && (
                <Link
                  href={`/portfolio/${prevWork.slug}`}
                  className="flex items-center gap-2 font-body text-[10px] tracking-[3px] text-muted uppercase hover:text-ink transition-colors"
                >
                  <ChevronLeft size={12} /> Prev
                </Link>
              )}
              {nextWork && (
                <Link
                  href={`/portfolio/${nextWork.slug}`}
                  className="flex items-center gap-2 font-body text-[10px] tracking-[3px] text-muted uppercase hover:text-ink transition-colors"
                >
                  Next <ChevronRight size={12} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>
            <div
              className="relative w-full max-w-5xl"
              onClick={e => e.stopPropagation()}
            >
              {work.coverImage ? (
                <Image
                  src={work.coverImage}
                  alt={work.title}
                  width={1600}
                  height={1067}
                  className="object-contain w-full max-h-[90vh]"
                />
              ) : (
                <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#C8C3BB] to-[#9A9590]" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
