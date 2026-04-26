'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { analytics } from '@/lib/analytics'
import { cn } from '@/lib/utils'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    analytics.optIn()
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie_consent', 'declined')
    analytics.optOut()
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          role="dialog"
          aria-label="Cookie consent"
          aria-modal="false"
          className={cn(
            'fixed bottom-4 left-4 right-4 z-50 max-w-lg mx-auto',
            'bg-card border border-border rounded-2xl p-5 shadow-2xl'
          )}
        >
          <p className="text-sm text-muted-foreground mb-4">
            This site uses anonymous analytics to improve the experience. No personal data is
            collected. You can opt out at any time.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={decline}
              className="px-4 py-2 text-sm rounded-lg border border-border hover:bg-accent transition-colors focus-visible-ring"
            >
              Decline
            </button>
            <button
              onClick={accept}
              className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors focus-visible-ring"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
