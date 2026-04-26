'use client'

import { useEffect, useState, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface PerformanceOptimizerProps {
  children: ReactNode
  id?: string
  threshold?: number
  rootMargin?: string
  className?: string
  lazyLoad?: boolean
}

export default function PerformanceOptimizer({
  children,
  id,
  threshold = 0.1,
  rootMargin = '100px',
  className = '',
  lazyLoad = true
}: PerformanceOptimizerProps) {
  const [isVisible, setIsVisible] = useState(!lazyLoad)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    if (!lazyLoad || !id) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Load content after intersection
            setTimeout(() => setHasLoaded(true), 100)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )

    const element = document.getElementById(id)
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [id, lazyLoad, threshold, rootMargin])

  // Performance monitoring
  useEffect(() => {
    if (isVisible && 'performance' in window) {
      const markName = `component_visible_${id || 'unknown'}`
      performance.mark(markName)
      
      // Measure time to interactive
      setTimeout(() => {
        performance.measure(`tti_${id || 'unknown'}`, markName)
      }, 100)
    }
  }, [isVisible, id])

  if (!isVisible) {
    return (
      <div 
        id={id} 
        className={`min-h-[200px] bg-gradient-to-r from-primary/5 to-accent/5 animate-pulseSoft rounded-2xl ${className}`}
        aria-hidden="true"
      />
    )
  }

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3,
        ease: "easeOut"
      }}
      className={`will-change-scroll ${className}`}
      style={{ 
        contentVisibility: 'auto',
        contain: 'content'
      }}
    >
      {children}
    </motion.div>
  )
}