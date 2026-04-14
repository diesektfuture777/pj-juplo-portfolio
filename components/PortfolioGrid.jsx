// components/PortfolioGrid.jsx
'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import WorkCard from './WorkCard'

const FILTERS = ['All', 'Photos', 'Videos']

export default function PortfolioGrid({ works }) {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = works.filter(w => {
    if (activeFilter === 'Photos') return w.type === 'photo'
    if (activeFilter === 'Videos') return w.type === 'video'
    return true
  })

  const featured = filtered.find(w => w.featured) || filtered[0]
  const rest = filtered.filter(w => w !== featured)

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
        <h2 className="font-display text-6xl text-ink tracking-[-2px]">Work</h2>
        <div className="flex gap-6">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`font-body text-[10px] tracking-[3px] uppercase pb-0.5 transition-all duration-200 ${
                activeFilter === f
                  ? 'text-ink border-b border-ink'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnimatedTile className="md:col-span-2 md:row-span-2">
            <WorkCard work={featured} featured />
          </AnimatedTile>
          {rest.map(work => (
            <AnimatedTile key={work.slug}>
              <WorkCard work={work} />
            </AnimatedTile>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="font-body text-sm text-muted text-center py-24">No work in this category yet.</p>
      )}
    </section>
  )
}

function AnimatedTile({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
