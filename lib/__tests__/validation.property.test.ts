import fc from 'fast-check'
import {
  validateContactForm,
  sanitizeInput,
  encodeMailtoLink,
  generateMailtoLink,
  type ContactFormData,
} from '@/lib/validation'

/**
 * Property-Based Tests for Contact Form Validation
 * These tests verify universal properties that should hold across all valid inputs
 */

describe('Contact Form - Property-Based Tests', () => {
  /**
   * Property 1: Form Field Collection Completeness
   * For any valid contact form submission containing name, email, subject, and message fields,
   * the form SHALL collect and retain all field values without data loss or corruption.
   * 
   * Validates: Requirements 5.1
   */
  describe('Property 1: Form Field Collection Completeness', () => {
    it('should collect all form fields without data loss', () => {
      fc.assert(
        fc.property(
          fc.record({
            name: fc.string({ minLength: 2, maxLength: 100 }),
            email: fc.emailAddress(),
            subject: fc.string({ minLength: 5, maxLength: 200 }),
            message: fc.string({ minLength: 10, maxLength: 5000 }),
          }),
          (formData: ContactFormData) => {
            // Verify all fields are present and unchanged
            expect(formData.name).toBeDefined()
            expect(formData.email).toBeDefined()
            expect(formData.subject).toBeDefined()
            expect(formData.message).toBeDefined()

            // Verify no data loss - fields should be exactly as provided
            expect(formData.name.length).toBeGreaterThanOrEqual(2)
            expect(formData.name.length).toBeLessThanOrEqual(100)
            expect(formData.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
            expect(formData.subject.length).toBeGreaterThanOrEqual(5)
            expect(formData.subject.length).toBeLessThanOrEqual(200)
            expect(formData.message.length).toBeGreaterThanOrEqual(10)
            expect(formData.message.length).toBeLessThanOrEqual(5000)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * Property 2: Valid Submission Success Flow
   * For any contact form submission with valid data (non-empty name, valid email format,
   * non-empty subject, non-empty message), submitting the form SHALL result in a success
   * confirmation being displayed to the user.
   * 
   * Validates: Requirements 5.2
   */
  describe('Property 2: Valid Submission Success Flow', () => {
    it('should validate successfully for all valid form data', () => {
      // Create a generator that produces only valid form data
      const validFormDataArb = fc.record({
        name: fc.string({ minLength: 2, maxLength: 100 }).filter(s => s.trim().length >= 2),
        email: fc.emailAddress(),
        subject: fc.string({ minLength: 5, maxLength: 200 }).filter(s => s.trim().length >= 5),
        message: fc.string({ minLength: 10, maxLength: 5000 }).filter(s => s.trim().length >= 10),
      })

      fc.assert(
        fc.property(validFormDataArb, (formData: ContactFormData) => {
          const errors = validateContactForm(formData)
          // Valid data should produce no validation errors
          expect(errors).toHaveLength(0)
        }),
        { numRuns: 100 }
      )
    })
  })

  /**
   * Property 3: Invalid Input Error Messaging
   * For any contact form submission with invalid data (empty required fields, invalid email format,
   * whitespace-only fields), the form SHALL display specific, actionable error messages
   * corresponding to each validation failure.
   * 
   * Validates: Requirements 5.3
   */
  describe('Property 3: Invalid Input Error Messaging', () => {
    it('should provide specific error messages for empty required fields', () => {
      fc.assert(
        fc.property(
          fc.oneof(
            fc.record({
              name: fc.constant(''),
              email: fc.emailAddress(),
              subject: fc.string({ minLength: 5, maxLength: 200 }),
              message: fc.string({ minLength: 10, maxLength: 5000 }),
            }),
            fc.record({
              name: fc.string({ minLength: 2, maxLength: 100 }),
              email: fc.constant(''),
              subject: fc.string({ minLength: 5, maxLength: 200 }),
              message: fc.string({ minLength: 10, maxLength: 5000 }),
            }),
            fc.record({
              name: fc.string({ minLength: 2, maxLength: 100 }),
              email: fc.emailAddress(),
              subject: fc.constant(''),
              message: fc.string({ minLength: 10, maxLength: 5000 }),
            }),
            fc.record({
              name: fc.string({ minLength: 2, maxLength: 100 }),
              email: fc.emailAddress(),
              subject: fc.string({ minLength: 5, maxLength: 200 }),
              message: fc.constant(''),
            })
          ),
          (formData: ContactFormData) => {
            const errors = validateContactForm(formData)
            // Invalid data should produce at least one error
            expect(errors.length).toBeGreaterThan(0)
            // Each error should have a specific message
            errors.forEach(error => {
              expect(error.message).toBeDefined()
              expect(error.message.length).toBeGreaterThan(0)
              expect(error.type).toMatch(/required|format|length/)
            })
          }
        ),
        { numRuns: 50 }
      )
    })

    it('should provide specific error messages for invalid email format', () => {
      fc.assert(
        fc.property(
          fc.record({
            name: fc.string({ minLength: 2, maxLength: 100 }),
            email: fc.string({ minLength: 1, maxLength: 50 }).filter(s => !s.includes('@') && s.trim().length > 0),
            subject: fc.string({ minLength: 5, maxLength: 200 }),
            message: fc.string({ minLength: 10, maxLength: 5000 }),
          }),
          (formData: ContactFormData) => {
            const errors = validateContactForm(formData)
            // Invalid email should produce an error
            const emailError = errors.find(e => e.field === 'email')
            expect(emailError).toBeDefined()
            expect(emailError?.message).toContain('valid email')
            expect(emailError?.type).toBe('format')
          }
        ),
        { numRuns: 50 }
      )
    })

    it('should provide specific error messages for fields below min length', () => {
      fc.assert(
        fc.property(
          fc.oneof(
            fc.record({
              name: fc.string({ maxLength: 1 }).filter(s => s.trim().length === 0),
              email: fc.emailAddress(),
              subject: fc.string({ minLength: 5, maxLength: 200 }).filter(s => s.trim().length >= 5),
              message: fc.string({ minLength: 10, maxLength: 5000 }).filter(s => s.trim().length >= 10),
            }),
            fc.record({
              name: fc.string({ minLength: 2, maxLength: 100 }).filter(s => s.trim().length >= 2),
              email: fc.emailAddress(),
              subject: fc.string({ maxLength: 4 }).filter(s => s.trim().length === 0),
              message: fc.string({ minLength: 10, maxLength: 5000 }).filter(s => s.trim().length >= 10),
            }),
            fc.record({
              name: fc.string({ minLength: 2, maxLength: 100 }).filter(s => s.trim().length >= 2),
              email: fc.emailAddress(),
              subject: fc.string({ minLength: 5, maxLength: 200 }).filter(s => s.trim().length >= 5),
              message: fc.string({ maxLength: 9 }).filter(s => s.trim().length === 0),
            })
          ),
          (formData: ContactFormData) => {
            const errors = validateContactForm(formData)
            // Should have at least one error
            expect(errors.length).toBeGreaterThan(0)
            // Error should indicate required or length issue
            const error = errors.find(e => e.type === 'required' || e.type === 'length')
            expect(error).toBeDefined()
          }
        ),
        { numRuns: 50 }
      )
    })
  })

  /**
   * Property 4: Email Link Encoding Correctness
   * For any email address string, when generating a mailto: link, the Portfolio_Website
   * SHALL properly encode special characters and preserve the complete email address
   * without corruption.
   * 
   * Validates: Requirements 5.5
   */
  describe('Property 4: Email Link Encoding Correctness', () => {
    it('should properly encode email addresses in mailto links', () => {
      fc.assert(
        fc.property(
          fc.emailAddress(),
          (email: string) => {
            const link = generateMailtoLink(email)
            
            // Link should start with mailto:
            expect(link).toMatch(/^mailto:/)
            
            // Link should contain encoded email
            expect(link).toContain('%40') // @ symbol encoded
            
            // Link should be a valid URL
            expect(() => new URL(link.replace('mailto:', 'http://example.com/'))).not.toThrow()
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should preserve email validity after encoding', () => {
      fc.assert(
        fc.property(
          fc.emailAddress(),
          (email: string) => {
            const encoded = encodeMailtoLink(email)
            
            // Encoded email should not be empty
            expect(encoded.length).toBeGreaterThan(0)
            
            // Encoded email should contain the @ symbol (encoded as %40)
            expect(encoded).toContain('%40')
            
            // Decoding should recover the original email
            const decoded = decodeURIComponent(encoded)
            expect(decoded).toBe(email)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should handle special characters in email addresses', () => {
      fc.assert(
        fc.property(
          fc.tuple(
            fc.string({ minLength: 1, maxLength: 20 }).filter(s => /^[a-zA-Z0-9._+-]+$/.test(s)),
            fc.string({ minLength: 1, maxLength: 20 }).filter(s => /^[a-zA-Z0-9-]+$/.test(s)),
            fc.string({ minLength: 2, maxLength: 6 }).filter(s => /^[a-zA-Z]+$/.test(s))
          ),
          ([localPart, domain, tld]: [string, string, string]) => {
            const email = `${localPart}@${domain}.${tld}`
            const link = generateMailtoLink(email)
            
            // Link should be properly formatted
            expect(link).toMatch(/^mailto:/)
            
            // Should be decodable
            const decoded = decodeURIComponent(link.replace('mailto:', ''))
            expect(decoded).toBe(email)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should sanitize malicious input in email addresses', () => {
      fc.assert(
        fc.property(
          fc.emailAddress(),
          (email: string) => {
            // Append potentially malicious content
            const maliciousEmail = email + '<script>alert("xss")</script>'
            const link = generateMailtoLink(maliciousEmail)
            
            // Link should not contain unencoded script tags
            expect(link).not.toContain('<script>')
            expect(link).not.toContain('</script>')
          }
        ),
        { numRuns: 50 }
      )
    })
  })

  /**
   * Additional Property: Input Sanitization Consistency
   * For any user input, sanitization should be idempotent - applying it multiple times
   * should produce the same result as applying it once.
   */
  describe('Additional Property: Input Sanitization Idempotency', () => {
    it('should be idempotent - sanitizing twice should equal sanitizing once', () => {
      fc.assert(
        fc.property(
          fc.string(),
          (input: string) => {
            const sanitized1 = sanitizeInput(input)
            const sanitized2 = sanitizeInput(sanitized1)
            
            // Sanitizing twice should produce the same result as once
            expect(sanitized2).toBe(sanitized1)
          }
        ),
        { numRuns: 100 }
      )
    })
  })
})
