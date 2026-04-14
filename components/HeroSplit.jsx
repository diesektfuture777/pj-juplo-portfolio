// components/HeroSplit.jsx
'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function HeroSplit({ featuredWork = null }) {
  const imageSrc = featuredWork?.coverImage || null

  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left: text */}
      <div className="flex flex-col justify-between px-8 md:px-16 py-32 md:py-24 order-2 md:order-1 border-r border-black/[0.06]">
        <motion.div {...fadeUp(0.2)}>
          <p className="font-body text-[10px] tracking-[4px] text-muted uppercase">
            Portfolio
          </p>
        </motion.div>

        <div>
          <motion.h1
            {...fadeUp(0.35)}
            className="font-display text-[80px] md:text-[100px] lg:text-[120px] leading-[0.88] tracking-[-3px] text-ink mb-8"
          >
            PJ<br />Juplo
          </motion.h1>
          <motion.div {...fadeUp(0.5)} className="w-8 h-px bg-muted mb-6" />
          <motion.p
            {...fadeUp(0.6)}
            className="font-body text-[11px] tracking-[3px] text-muted uppercase leading-loose"
          >
            Photographer<br />&amp; Filmmaker
          </motion.p>
        </div>

        <motion.div {...fadeUp(0.75)}>
          <a
            href="/portfolio"
            className="inline-flex items-center gap-3 font-body text-[10px] tracking-[3px] text-ink uppercase group"
          >
            <span className="w-6 h-px bg-ink transition-all duration-300 group-hover:w-10" />
            View Work
          </a>
        </motion.div>
      </div>

      {/* Right: image with Ken Burns */}
      <div className="relative min-h-[55vw] md:min-h-screen overflow-hidden order-1 md:order-2">
        {imageSrc ? (
          <motion.div
            className="absolute inset-0"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 14, ease: 'easeInOut', repeat: Infinity }}
          >
            <Image src={imageSrc} alt="PJ Juplo" fill priority className="object-cover" />
          </motion.div>
        ) : (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#C8C3BB] to-[#9A9590]"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 14, ease: 'easeInOut', repeat: Infinity }}
          />
        )}
        <div className="absolute bottom-6 right-8 font-body text-[10px] tracking-[2px] text-white/40 uppercase select-none">
          01 / 01
        </div>
      </div>
    </section>
  )
}
