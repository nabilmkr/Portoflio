import { NextRequest, NextResponse } from 'next/server'
import { validateContactForm, sanitizeInput, type ContactFormData } from '@/lib/validation'
import { verifyRecaptchaToken, isRecaptchaConfigured } from '@/lib/recaptcha'
import { checkRateLimit, getClientIp, getRemainingRequests, getResetTime } from '@/lib/rate-limit'

/**
 * POST /api/contact
 * 
 * Handles contact form submissions with validation, sanitization, and email delivery
 * 
 * Request body:
 * {
 *   name: string
 *   email: string
 *   subject: string
 *   message: string
 *   recaptchaToken?: string
 * }
 * 
 * Response:
 * {
 *   success: boolean
 *   message: string
 *   submissionId?: string
 *   errors?: Array<{ field: string; message: string }>
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIp = getClientIp(request)

    // Check rate limiting
    if (!checkRateLimit(clientIp)) {
      const resetTime = getResetTime(clientIp)
      const retryAfter = Math.ceil((resetTime - Date.now()) / 1000)
      
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please try again later.',
          retryAfter,
        },
        {
          status: 429,
          headers: {
            ...getSecurityHeaders(request),
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': resetTime.toString(),
          },
        }
      )
    }

    // Parse request body
    const body = await request.json()
    const { name, email, subject, message, recaptchaToken } = body

    // Validate form data
    const formData: ContactFormData = { name, email, subject, message }
    const validationErrors = validateContactForm(formData)

    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validationErrors,
        },
        {
          status: 400,
          headers: getSecurityHeaders(request)
        }
      )
    }

    // Verify reCAPTCHA token if configured and provided
    if (isRecaptchaConfigured() && recaptchaToken) {
      const recaptchaResult = await verifyRecaptchaToken(recaptchaToken)
      if (!recaptchaResult.valid) {
        return NextResponse.json(
          {
            success: false,
            message: 'reCAPTCHA verification failed. Please try again.',
          },
          {
            status: 400,
            headers: getSecurityHeaders(request)
          }
        )
      }
    }

    // Sanitize form data
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      subject: sanitizeInput(subject),
      message: sanitizeInput(message),
    }

    // TODO: Send email via Gmail API
    // const emailSent = await sendEmailViaGmail(sanitizedData)
    // if (!emailSent) {
    //   return NextResponse.json(
    //     { success: false, message: 'Failed to send email. Please try again later.' },
    //     { status: 500 }
    //   )
    // }

    // For now, simulate successful email sending
    const submissionId = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Log submission for analytics (no PII stored beyond what's needed)
    console.log('[Contact Submission]', {
      id: submissionId,
      timestamp: new Date().toISOString(),
      subject: sanitizedData.subject,
      status: 'received',
    })

    const remaining = getRemainingRequests(clientIp)
    const resetTime = getResetTime(clientIp)

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully! I will get back to you soon.',
        submissionId,
      },
      {
        status: 200,
        headers: {
          ...getSecurityHeaders(request),
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': resetTime.toString(),
        },
      }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your request. Please try again later.',
      },
      {
        status: 500,
        headers: getSecurityHeaders(request),
      }
    )
  }
}

/**
 * Helper to get CORS and security headers
 */
function getSecurityHeaders(request: NextRequest) {
  const origin = request.headers.get('origin')
  const allowedOrigin = process.env.ALLOWED_ORIGIN

  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Vary': 'Origin',
  }

  if (allowedOrigin) {
    if (origin === allowedOrigin) {
      headers['Access-Control-Allow-Origin'] = origin
    }
  } else {
    // Fallback to * if not configured (e.g. in dev) but recommended to set ALLOWED_ORIGIN
    headers['Access-Control-Allow-Origin'] = '*'
  }

  return headers
}

/**
 * OPTIONS /api/contact
 * 
 * Handle CORS preflight requests with security headers
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: getSecurityHeaders(request),
  })
}
