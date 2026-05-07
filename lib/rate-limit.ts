/**
 * Rate limiting utilities for contact form submissions
 * Prevents abuse by limiting requests per IP address
 */

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

// In-memory store for rate limiting (in production, use Redis)
const rateLimitStore: RateLimitStore = {}

/**
 * Configuration for rate limiting
 */
export const RATE_LIMIT_CONFIG = {
  maxRequests: 5, // Maximum requests per window
  windowMs: 60 * 60 * 1000, // 1 hour window
}

/**
 * Get client IP address from request
 * Uses NextRequest's ip property which is securely provided by the hosting environment
 */
export function getClientIp(request: Request): string {
  // Use next/server's ip extraction mechanism via NextRequest
  // This is more secure than manually parsing headers which can be spoofed
  const ip = (request as any).ip || 'unknown'
  return ip
}

/**
 * Check if request is within rate limit
 */
export function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitStore[ip]

  // If no record exists or window has expired, create new record
  if (!record || now > record.resetTime) {
    rateLimitStore[ip] = {
      count: 1,
      resetTime: now + RATE_LIMIT_CONFIG.windowMs,
    }
    return true
  }

  // Check if within limit
  if (record.count < RATE_LIMIT_CONFIG.maxRequests) {
    record.count++
    return true
  }

  return false
}

/**
 * Get remaining requests for an IP
 */
export function getRemainingRequests(ip: string): number {
  const now = Date.now()
  const record = rateLimitStore[ip]

  if (!record || now > record.resetTime) {
    return RATE_LIMIT_CONFIG.maxRequests
  }

  return Math.max(0, RATE_LIMIT_CONFIG.maxRequests - record.count)
}

/**
 * Get reset time for rate limit window
 */
export function getResetTime(ip: string): number {
  const record = rateLimitStore[ip]
  return record?.resetTime || Date.now() + RATE_LIMIT_CONFIG.windowMs
}

/**
 * Clean up expired rate limit records (call periodically)
 */
export function cleanupExpiredRecords(): void {
  const now = Date.now()
  Object.keys(rateLimitStore).forEach((ip) => {
    if (now > rateLimitStore[ip].resetTime) {
      delete rateLimitStore[ip]
    }
  })
}
