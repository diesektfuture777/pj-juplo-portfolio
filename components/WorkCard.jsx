// components/WorkCard.jsx
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Play } from 'lucide-react'

export default function WorkCard({ work, featured = false }) {
  const { title, slug, type, category, coverImage, videoFile } = work

  return (
    <Link href={`/portfolio/${slug}`} className="block group relative overflow-hidden">
      <div className={`relative overflow-hidden ${featured ? 'aspect-[3/4]' : 'aspect-square'}`}>
        {type === 'video' && videoFile ? (
          <video
            src={videoFile}
            poster={coverImage || undefined}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        ) : coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#C8C3BB] to-[#9A9590] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
        )}

        {type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center backdrop-blur-sm bg-black/10 transition-transform duration-300 group-hover:scale-110">
              <Play size={13} className="text-white ml-0.5" fill="white" />
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <p className="font-body text-[9px] tracking-[3px] text-white/60 uppercase mb-1">
            {category}
          </p>
          <p className="font-display text-xl text-white leading-tight">{title}</p>
        </div>
      </div>
    </Link>
  )
}
