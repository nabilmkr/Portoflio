'use client'

import { useEffect } from 'react'

// Report Web Vitals to console (replace with analytics service in production)
function reportWebVitals(metric: {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
}) {
  if (process.env.NODE_ENV === 'development') {
    const color =
      metric.rating === 'good'
        ? '\x1b[32m'
        : metric.rating === 'needs-improvement'
        ? '\x1b[33m'
        : '\x1b[31m'
    console.log(`${color}[Web Vitals] ${metric.name}: ${Math.round(metric.value)}ms (${metric.rating})\x1b[0m`)
  }
}

export default function WebVitals() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Observe LCP
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number }
      const value = lastEntry.startTime
      reportWebVitals({
        name: 'LCP',
        value,
        rating: value < 2500 ? 'good' : value < 4000 ? 'needs-improvement' : 'poor',
      })
    })
    try { lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true }) } catch {}

    // Observe CLS
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const e = entry as PerformanceEntry & { hadRecentInput: boolean; value: number }
        if (!e.hadRecentInput) clsValue += e.value
      }
      reportWebVitals({
        name: 'CLS',
        value: clsValue,
        rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor',
      })
    })
    try { clsObserver.observe({ type: 'layout-shift', buffered: true }) } catch {}

    // Observe FID / INP
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const e = entry as PerformanceEntry & { processingStart: number; startTime: number }
        const value = e.processingStart - e.startTime
        reportWebVitals({
          name: 'FID',
          value,
          rating: value < 100 ? 'good' : value < 300 ? 'needs-improvement' : 'poor',
        })
      }
    })
    try { fidObserver.observe({ type: 'first-input', buffered: true }) } catch {}

    return () => {
      lcpObserver.disconnect()
      clsObserver.disconnect()
      fidObserver.disconnect()
    }
  }, [])

  return null
}
