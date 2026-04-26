/**
 * Form validation utilities for contact form
 * Provides validation rules and sanitization for user inputs
 */

export interface ValidationError {
  field: string
  message: string
  type: 'required' | 'format' | 'length' | 'server'
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

/**
 * Validation rules for contact form fields
 */
export const VALIDATION_RULES = {
  name: {
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s'-]+$/,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  subject: {
    minLength: 5,
    maxLength: 200,
  },
  message: {
    minLength: 10,
    maxLength: 5000,
  },
}

/**
 * Sanitize user input by removing potentially harmful characters
 * while preserving legitimate content
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim() // Trim again after removing potentially harmful content
}

/**
 * Validate a single form field
 */
export function validateField(
  field: keyof ContactFormData,
  value: string
): ValidationError | null {
  const trimmed = value.trim()

  // Check if required field is empty
  if (!trimmed) {
    return {
      field,
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
      type: 'required',
    }
  }

  // Validate name field
  if (field === 'name') {
    if (trimmed.length < VALIDATION_RULES.name.minLength) {
      return {
        field,
        message: `Name must be at least ${VALIDATION_RULES.name.minLength} characters`,
        type: 'length',
      }
    }
    if (trimmed.length > VALIDATION_RULES.name.maxLength) {
      return {
        field,
        message: `Name must not exceed ${VALIDATION_RULES.name.maxLength} characters`,
        type: 'length',
      }
    }
  }

  // Validate email field
  if (field === 'email') {
    if (!VALIDATION_RULES.email.pattern.test(trimmed)) {
      return {
        field,
        message: 'Please enter a valid email address',
        type: 'format',
      }
    }
  }

  // Validate subject field
  if (field === 'subject') {
    if (trimmed.length < VALIDATION_RULES.subject.minLength) {
      return {
        field,
        message: `Subject must be at least ${VALIDATION_RULES.subject.minLength} characters`,
        type: 'length',
      }
    }
    if (trimmed.length > VALIDATION_RULES.subject.maxLength) {
      return {
        field,
        message: `Subject must not exceed ${VALIDATION_RULES.subject.maxLength} characters`,
        type: 'length',
      }
    }
  }

  // Validate message field
  if (field === 'message') {
    if (trimmed.length < VALIDATION_RULES.message.minLength) {
      return {
        field,
        message: `Message must be at least ${VALIDATION_RULES.message.minLength} characters`,
        type: 'length',
      }
    }
    if (trimmed.length > VALIDATION_RULES.message.maxLength) {
      return {
        field,
        message: `Message must not exceed ${VALIDATION_RULES.message.maxLength} characters`,
        type: 'length',
      }
    }
  }

  return null
}

/**
 * Validate entire contact form
 */
export function validateContactForm(
  data: ContactFormData
): ValidationError[] {
  const errors: ValidationError[] = []

  ;(Object.keys(data) as Array<keyof ContactFormData>).forEach((field) => {
    const error = validateField(field, data[field])
    if (error) {
      errors.push(error)
    }
  })

  return errors
}

/**
 * Encode email address for mailto: links
 * Properly encodes special characters while preserving email validity
 */
export function encodeMailtoLink(email: string): string {
  const sanitized = sanitizeInput(email)
  // Encode special characters for mailto links
  return encodeURIComponent(sanitized)
}

/**
 * Generate mailto: link with proper encoding
 */
export function generateMailtoLink(
  email: string,
  subject?: string,
  body?: string
): string {
  const encodedEmail = encodeMailtoLink(email)
  let link = `mailto:${encodedEmail}`

  const params: string[] = []
  if (subject) {
    params.push(`subject=${encodeURIComponent(subject)}`)
  }
  if (body) {
    params.push(`body=${encodeURIComponent(body)}`)
  }

  if (params.length > 0) {
    link += `?${params.join('&')}`
  }

  return link
}
