'use client'

import { useEffect } from 'react'
import { analytics } from '@/lib/analytics'

const SECTIONS = ['hero', 'projects', 'skills', 'experience', 'contact']

export default function SectionTracker() {
  useEffect(() => {
    // Track initial page view
    analytics.pageView()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            analytics.sectionView(entry.target.id)
          }
        })
      },
      { threshold: 0.4 }
    )

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return null
}
