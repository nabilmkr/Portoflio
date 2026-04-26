import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
/**
 * Enhanced smooth scrolling utility with performance optimizations
 */
export function smoothScrollTo(elementId: string, options: {
  duration?: number
  offset?: number
  easing?: (t: number) => number
  onComplete?: () => void
} = {}) {
  const {
    duration = 800,
    offset = 0,
    easing = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    onComplete
  } = options

  const element = document.getElementById(elementId)
  if (!element) return

  const startPosition = window.scrollY
  const targetPosition = element.offsetTop + offset
  const distance = targetPosition - startPosition
  const startTime = performance.now()

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easing(progress)
    
    window.scrollTo(0, startPosition + distance * easedProgress)
    
    if (progress < 1) {
      requestAnimationFrame(animateScroll)
    } else {
      // Update URL hash after scroll completes
      window.history.replaceState(null, '', `#${elementId}`)
      onComplete?.()
    }
  }

  // Check for reduced motion preference
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (mediaQuery.matches || duration === 0) {
    // Instant scroll for reduced motion preference
    element.scrollIntoView({ behavior: 'auto' })
    window.history.replaceState(null, '', `#${elementId}`)
    onComplete?.()
  } else {
    requestAnimationFrame(animateScroll)
  }
}

/**
 * Debounced scroll handler for performance
 */
export function debounceScroll<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

/**
 * Throttled scroll handler for performance
 */
export function throttleScroll<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

/**
 * Check if element is in viewport with configurable threshold
 */
export function isInViewport(element: HTMLElement, threshold: number = 0): boolean {
  const rect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  const windowWidth = window.innerWidth || document.documentElement.clientWidth
  
  const verticalVisible = (
    (rect.top <= windowHeight * (1 - threshold)) &&
    (rect.bottom >= windowHeight * threshold)
  )
  
  const horizontalVisible = (
    (rect.left <= windowWidth) &&
    (rect.right >= 0)
  )
  
  return verticalVisible && horizontalVisible
}

/**
 * Get scroll position percentage (0 to 1)
 */
export function getScrollPercentage(): number {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  return docHeight > 0 ? scrollTop / docHeight : 0
}

/**
 * Add scroll event listener with performance optimizations
 */
export function addOptimizedScrollListener(
  callback: () => void,
  options: {
    passive?: boolean
    throttle?: number
    debounce?: number
  } = {}
): () => void {
  const { passive = true, throttle = 100, debounce } = options
  
  let handler = callback
  
  if (throttle) {
    handler = throttleScroll(callback, throttle)
  } else if (debounce) {
    handler = debounceScroll(callback, debounce)
  }
  
  window.addEventListener('scroll', handler, { passive })
  
  return () => {
    window.removeEventListener('scroll', handler)
  }
}

/**
 * Scroll to top utility
 */
export function scrollToTop(options: {
  duration?: number
  easing?: (t: number) => number
} = {}) {
  const { duration = 500, easing } = options
  
  smoothScrollTo('hero', {
    duration,
    easing,
    offset: 0
  })
}

/**
 * Initialize smooth scrolling for all anchor links
 */
export function initSmoothScrolling() {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    const link = target.closest('a[href^="#"]') as HTMLAnchorElement
    
    if (link) {
      event.preventDefault()
      const href = link.getAttribute('href')
      if (href && href.startsWith('#')) {
        const id = href.substring(1)
        smoothScrollTo(id)
      }
    }
  })
}