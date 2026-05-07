'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { cn, smoothScrollTo } from '@/lib/utils'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    smoothScrollTo(targetId)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-4 left-0 right-0 z-50 px-4 md:px-8 lg:px-16 transition-all duration-300',
          isScrolled ? 'opacity-95' : 'opacity-100'
        )}
      >
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          {/* Logo - Liquid Glass Circle */}
          <div className="flex-shrink-0">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center border border-white/10 hover:scale-105 transition-transform"
              aria-label="Home"
            >
              <span className="font-heading italic lowercase text-2xl text-white">n</span>
            </a>
          </div>

          {/* Desktop Navigation - Center Pill */}
          <nav className="hidden md:flex items-center justify-center">
            <div className="liquid-glass rounded-full px-1.5 py-1.5 flex items-center border border-white/5 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 font-body"
                >
                  {link.name}
                </a>
              ))}
              
              <button
                onClick={(e) => { e.preventDefault(); smoothScrollTo('contact'); }}
                className="ml-2 bg-white text-black rounded-full px-4 py-2 text-sm font-medium flex items-center gap-1 hover:scale-105 transition-transform whitespace-nowrap"
              >
                Hire Me <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button & Spacer (to balance logo on desktop) */}
          <div className="flex md:w-12 md:h-12 md:invisible items-center justify-end">
            <button
              className="md:hidden liquid-glass w-12 h-12 rounded-full flex items-center justify-center text-white border border-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden pt-24 pb-8 px-4 flex flex-col"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="liquid-glass rounded-2xl px-6 py-4 text-xl font-heading italic text-white text-center border border-white/10"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={(e) => { e.preventDefault(); smoothScrollTo('contact'); setIsMobileMenuOpen(false); }}
                className="mt-4 bg-white text-black rounded-2xl px-6 py-4 text-xl font-heading italic text-center flex items-center justify-center gap-2"
              >
                Hire Me <ArrowUpRight className="h-5 w-5" />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
