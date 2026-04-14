'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-bg/90 backdrop-blur-md border-b border-black/5'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-lg tracking-[0.2em] text-ink uppercase"
          >
            PJ Juplo
          </Link>
          <div className="hidden md:flex items-center gap-10">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-body text-[11px] tracking-[0.15em] uppercase transition-colors duration-200 ${
                  pathname === href ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
          <button
            className="md:hidden text-ink"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-bg flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <Link
                href="/"
                className="font-display text-lg tracking-[0.2em] text-ink uppercase"
                onClick={() => setMenuOpen(false)}
              >
                PJ Juplo
              </Link>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X size={20} className="text-ink" />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-10">
              {links.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={href}
                    className="font-display text-5xl text-ink hover:text-accent transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
