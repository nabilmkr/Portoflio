/**
 * Privacy-focused analytics utilities
 * No personal identifiers, IP anonymization, GDPR/CCPA compliant
 */

export type AnalyticsEventType =
  | 'page_view'
  | 'section_view'
  | 'project_click'
  | 'form_submit'
  | 'download'
  | 'social_click'

export interface AnalyticsEvent {
  type: AnalyticsEventType
  timestamp: string
  section?: string
  projectId?: string
  formType?: string
  label?: string
}

// Check if user has opted out
function isOptedOut(): boolean {
  if (typeof window === 'undefined') return true
  return localStorage.getItem('analytics_opt_out') === 'true'
}

// Core track function — no PII, no IP
export function track(event: Omit<AnalyticsEvent, 'timestamp'>) {
  if (isOptedOut()) return

  const payload: AnalyticsEvent = {
    ...event,
    timestamp: new Date().toISOString(),
  }

  // Log in dev
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', payload)
  }

  // Send to GA4 if configured
  const gaId = process.env.NEXT_PUBLIC_GA_TRACKING_ID
  if (gaId && typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', event.type, {
      event_category: event.section || event.formType || 'general',
      event_label: event.label || event.projectId,
      non_interaction: event.type === 'section_view',
    })
  }
}

// Convenience helpers
export const analytics = {
  pageView: () => track({ type: 'page_view' }),
  sectionView: (section: string) => track({ type: 'section_view', section }),
  projectClick: (projectId: string, label?: string) =>
    track({ type: 'project_click', projectId, label }),
  formSubmit: (formType: string) => track({ type: 'form_submit', formType }),
  socialClick: (label: string) => track({ type: 'social_click', label }),
  optOut: () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('analytics_opt_out', 'true')
    }
  },
  optIn: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('analytics_opt_out')
    }
  },
  isOptedOut,
}
