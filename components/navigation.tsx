'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight, Home, Briefcase, Code, GraduationCap, Mail } from 'lucide-react'
import { cn, smoothScrollTo } from '@/lib/utils'
import { ThemeToggle } from './theme-toggle'

const navItems = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'experience', label: 'Experience', icon: GraduationCap },
  { id: 'contact', label: 'Contact', icon: Mail },
]

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Handle scroll and active section detection with Intersection Observer
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    // Use Intersection Observer for better performance and accuracy
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px', // Adjust margins for better section detection
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          if (sectionId && navItems.some(item => item.id === sectionId)) {
            setActiveSection(sectionId)
            // Update URL hash without page jump
            window.history.replaceState(null, '', `#${sectionId}`)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    navItems.forEach(item => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    // Initial scroll check
    handleScroll()
    
    // Throttle scroll events for performance
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', throttledScroll)
      observer.disconnect()
    }
  }, [])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
        // Focus on menu button
        const menuButton = document.querySelector('[aria-label="Open menu"]') as HTMLButtonElement
        menuButton?.focus()
      }
    }

    // Close mobile menu when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMobileMenuOpen && 
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(e.target as Node) &&
        navRef.current &&
        !navRef.current.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false)
    
    smoothScrollTo(sectionId, {
      duration: isReducedMotion ? 0 : 800,
      onComplete: () => {
        // Additional actions after scroll completes
        const element = document.getElementById(sectionId)
        element?.focus({ preventScroll: true })
      }
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent, sectionId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      scrollToSection(sectionId)
    } else if (e.key === 'Escape') {
      setIsMobileMenuOpen(false)
    }
  }

  // Keyboard navigation for desktop nav items
  const handleDesktopNavKeyDown = (e: React.KeyboardEvent, index: number) => {
    const items = document.querySelectorAll('[role="navigation"] button[tabindex="0"]')
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIndex = (index + 1) % items.length
      ;(items[nextIndex] as HTMLButtonElement)?.focus()
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      const prevIndex = (index - 1 + items.length) % items.length
      ;(items[prevIndex] as HTMLButtonElement)?.focus()
    } else if (e.key === 'Home') {
      e.preventDefault()
      ;(items[0] as HTMLButtonElement)?.focus()
    } else if (e.key === 'End') {
      e.preventDefault()
      ;(items[items.length - 1] as HTMLButtonElement)?.focus()
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 will-change-transform',
          isScrolled
            ? 'glass-effect-light dark:glass-effect-dark shadow-glass border-b border-white/30 dark:border-black/30'
            : 'bg-transparent'
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-responsive">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo with enhanced visual design */}
            <div className="flex-shrink-0">
              <button
                onClick={() => scrollToSection('hero')}
                className="group flex items-center gap-2 px-3 py-2 rounded-lg touch-target focus-visible-ring transition-all duration-200 hover:scale-105 active:scale-95"
                aria-label="Scroll to home section"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    scrollToSection('hero')
                  }
                }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full blur opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-8 h-8 rounded-full glass-effect flex items-center justify-center">
                    <span className="text-lg font-bold text-primary-foreground">P</span>
                  </div>
                </div>
                <span className="text-xl font-bold text-gradient bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-[length:200%_auto] animate-gradient-shift">
                  Portfolio
                </span>
              </button>
            </div>

            {/* Desktop Navigation - Enhanced with glassmorphism */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2" role="menubar" aria-label="Desktop navigation menu">
              {navItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={item.id} className="relative" role="none">
                    <button
                      onClick={() => scrollToSection(item.id)}
                      onKeyDown={(e) => {
                        handleKeyDown(e, item.id)
                        handleDesktopNavKeyDown(e, index)
                      }}
                      className={cn(
                        'group flex items-center gap-2 px-4 py-3 rounded-xl touch-target focus-visible-ring transition-all duration-300',
                        'hover:scale-105 active:scale-95',
                        activeSection === item.id
                          ? 'glass-effect-accent text-primary-foreground font-semibold'
                          : 'text-muted-foreground hover:text-foreground hover:glass-effect'
                      )}
                      role="menuitem"
                      aria-current={activeSection === item.id ? 'page' : undefined}
                      tabIndex={0}
                      aria-label={`Navigate to ${item.label} section`}
                    >
                      <Icon className={cn(
                        'h-4 w-4 transition-transform duration-300',
                        activeSection === item.id ? 'scale-110' : 'group-hover:scale-110'
                      )} />
                      <span className="text-sm font-medium">{item.label}</span>
                      
                      {/* Active indicator with gradient */}
                      {activeSection === item.id && (
                        <motion.div
                          layoutId="desktopActiveIndicator"
                          className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </button>
                    
                    {/* Hover gradient effect */}
                    <div className="absolute inset-0 -z-20 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )
              })}
              
              {/* Theme Toggle with enhanced styling */}
              <div className="ml-2 lg:ml-4" role="none">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Menu Button and Theme Toggle */}
            <div className="md:hidden flex items-center gap-2" role="none">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative p-3 rounded-xl touch-target focus-visible-ring transition-all duration-300 hover:scale-105 active:scale-95 glass-effect"
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-haspopup="menu"
              >
                <div className="relative w-6 h-6">
                  {isMobileMenuOpen ? (
                    <X className="absolute inset-0 h-6 w-6 text-primary-foreground" />
                  ) : (
                    <Menu className="absolute inset-0 h-6 w-6 text-primary-foreground" />
                  )}
                </div>
                
                {/* Pulsing animation for attention */}
                {!isMobileMenuOpen && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 animate-pulseSoft" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Enhanced with dark luxe aesthetic */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-menu"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ 
              duration: isReducedMotion ? 0.1 : 0.2,
              ease: "easeOut"
            }}
            className="md:hidden fixed inset-x-4 top-20 z-40 rounded-2xl shadow-2xl overflow-hidden"
            role="menu"
            aria-label="Mobile navigation menu"
            aria-modal="true"
          >
            {/* Glassmorphism background */}
            <div className="absolute inset-0 glass-effect-dark backdrop-blur-2xl" />
            
            {/* Gradient border */}
            <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-primary/30 to-accent/30">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10" />
            </div>
            
            <div className="relative px-3 py-4 space-y-1">
              {navItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    onKeyDown={(e) => {
                      handleKeyDown(e, item.id)
                      // Mobile menu keyboard navigation
                      if (e.key === 'ArrowDown') {
                        e.preventDefault()
                        const nextItem = document.querySelectorAll('#mobile-menu button')[index + 1] as HTMLButtonElement
                        nextItem?.focus()
                      } else if (e.key === 'ArrowUp') {
                        e.preventDefault()
                        const prevItem = document.querySelectorAll('#mobile-menu button')[index - 1] as HTMLButtonElement
                        prevItem?.focus()
                      }
                    }}
                    className={cn(
                      'group flex items-center justify-between w-full px-4 py-4 rounded-xl touch-target-lg focus-visible-ring transition-all duration-200',
                      'hover:scale-[1.02] active:scale-[0.98]',
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-primary/20 to-accent/20 text-primary-foreground border-l-4 border-accent-500'
                        : 'hover:bg-white/5 dark:hover:bg-black/5 text-muted-foreground hover:text-foreground'
                    )}
                    role="menuitem"
                    aria-current={activeSection === item.id ? 'page' : undefined}
                    tabIndex={0}
                    aria-label={`Navigate to ${item.label} section`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'p-2 rounded-lg transition-all duration-300',
                        activeSection === item.id 
                          ? 'bg-gradient-to-br from-primary/30 to-accent/30' 
                          : 'bg-white/5 dark:bg-black/5 group-hover:bg-white/10 dark:group-hover:bg-black/10'
                      )}>
                        <Icon className={cn(
                          'h-4 w-4',
                          activeSection === item.id ? 'text-accent-foreground' : 'text-muted-foreground'
                        )} />
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    
                    {activeSection === item.id && (
                      <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <ChevronRight className="h-4 w-4 text-accent-500" />
                      </motion.div>
                    )}
                    
                    {/* Hover effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  </button>
                )
              })}
              
              {/* Theme info with enhanced styling */}
              <div className="px-4 py-4 mt-2 border-t border-white/10 dark:border-black/10">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    Theme preference
                  </div>
                  <div className="text-sm text-primary font-medium">
                    Auto (system)
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground/70">
                  Tap theme toggle to cycle through light/dark/system
                </div>
              </div>
              
              {/* Close instruction for screen readers */}
              <div className="sr-only" aria-live="polite">
                Mobile menu opened. Use arrow keys to navigate, Enter to select, or Escape to close.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Skip to main content link for keyboard users */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:font-medium"
        onClick={(e) => {
          e.preventDefault()
          scrollToSection('hero')
        }}
      >
        Skip to main content
      </a>
    </>
  )
}