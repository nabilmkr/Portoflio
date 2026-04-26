/**
 * reCAPTCHA v3 verification utilities
 * Validates reCAPTCHA tokens to prevent spam submissions
 */

export interface RecaptchaVerifyResponse {
  success: boolean
  score: number
  action: string
  challenge_ts: string
  hostname: string
  error_codes?: string[]
}

/**
 * reCAPTCHA configuration
 */
export const RECAPTCHA_CONFIG = {
  minScore: 0.5, // Minimum score to accept (0.0 - 1.0)
  get secretKey() {
    return process.env.RECAPTCHA_SECRET_KEY || ''
  },
  get siteKey() {
    return process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''
  },
}

/**
 * Verify reCAPTCHA token with Google's API
 */
export async function verifyRecaptchaToken(token: string): Promise<{
  valid: boolean
  score: number
  error?: string
}> {
  const secretKey = RECAPTCHA_CONFIG.secretKey
  
  if (!secretKey) {
    console.warn('reCAPTCHA secret key not configured')
    return { valid: false, score: 0, error: 'reCAPTCHA not configured' }
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    if (!response.ok) {
      throw new Error(`reCAPTCHA API error: ${response.statusText}`)
    }

    const data: RecaptchaVerifyResponse = await response.json()

    // Check if verification was successful
    if (!data.success) {
      return {
        valid: false,
        score: 0,
        error: data.error_codes?.join(', ') || 'Verification failed',
      }
    }

    // Check if score meets minimum threshold
    if (data.score < RECAPTCHA_CONFIG.minScore) {
      return {
        valid: false,
        score: data.score,
        error: `Score too low: ${data.score}`,
      }
    }

    return {
      valid: true,
      score: data.score,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('reCAPTCHA verification error:', errorMessage)
    return {
      valid: false,
      score: 0,
      error: errorMessage,
    }
  }
}

/**
 * Check if reCAPTCHA is configured
 */
export function isRecaptchaConfigured(): boolean {
  return !!RECAPTCHA_CONFIG.secretKey && !!RECAPTCHA_CONFIG.siteKey
}
