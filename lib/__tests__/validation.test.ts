import {
  validateField,
  validateContactForm,
  sanitizeInput,
  encodeMailtoLink,
  generateMailtoLink,
  type ContactFormData,
} from '@/lib/validation'

describe('Validation Utilities', () => {
  describe('sanitizeInput', () => {
    it('should trim whitespace', () => {
      expect(sanitizeInput('  hello  ')).toBe('hello')
    })

    it('should remove angle brackets', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script')
    })

    it('should remove javascript: protocol', () => {
      expect(sanitizeInput('javascript:alert("xss")')).toBe('alert("xss")')
    })

    it('should remove event handlers', () => {
      expect(sanitizeInput('onclick=alert("xss")')).toBe('alert("xss")')
    })

    it('should preserve legitimate content', () => {
      expect(sanitizeInput('Hello, World!')).toBe('Hello, World!')
    })
  })

  describe('validateField', () => {
    describe('name field', () => {
      it('should return error for empty name', () => {
        const error = validateField('name', '')
        expect(error).not.toBeNull()
        expect(error?.message).toBe('Name is required')
        expect(error?.type).toBe('required')
      })

      it('should return error for name too short', () => {
        const error = validateField('name', 'A')
        expect(error).not.toBeNull()
        expect(error?.message).toContain('at least 2 characters')
        expect(error?.type).toBe('length')
      })

      it('should return error for name too long', () => {
        const longName = 'A'.repeat(101)
        const error = validateField('name', longName)
        expect(error).not.toBeNull()
        expect(error?.message).toContain('not exceed 100 characters')
        expect(error?.type).toBe('length')
      })

      it('should accept valid name', () => {
        const error = validateField('name', 'John Doe')
        expect(error).toBeNull()
      })

      it('should accept name with apostrophe', () => {
        const error = validateField('name', "O'Brien")
        expect(error).toBeNull()
      })
    })

    describe('email field', () => {
      it('should return error for empty email', () => {
        const error = validateField('email', '')
        expect(error).not.toBeNull()
        expect(error?.message).toBe('Email is required')
        expect(error?.type).toBe('required')
      })

      it('should return error for invalid email format', () => {
        const error = validateField('email', 'invalid-email')
        expect(error).not.toBeNull()
        expect(error?.message).toBe('Please enter a valid email address')
        expect(error?.type).toBe('format')
      })

      it('should accept valid email', () => {
        const error = validateField('email', 'user@example.com')
        expect(error).toBeNull()
      })

      it('should accept email with subdomain', () => {
        const error = validateField('email', 'user@mail.example.co.uk')
        expect(error).toBeNull()
      })
    })

    describe('subject field', () => {
      it('should return error for empty subject', () => {
        const error = validateField('subject', '')
        expect(error).not.toBeNull()
        expect(error?.message).toBe('Subject is required')
        expect(error?.type).toBe('required')
      })

      it('should return error for subject too short', () => {
        const error = validateField('subject', 'Test')
        expect(error).not.toBeNull()
        expect(error?.message).toContain('at least 5 characters')
        expect(error?.type).toBe('length')
      })

      it('should return error for subject too long', () => {
        const longSubject = 'A'.repeat(201)
        const error = validateField('subject', longSubject)
        expect(error).not.toBeNull()
        expect(error?.message).toContain('not exceed 200 characters')
        expect(error?.type).toBe('length')
      })

      it('should accept valid subject', () => {
        const error = validateField('subject', 'Project Inquiry')
        expect(error).toBeNull()
      })
    })

    describe('message field', () => {
      it('should return error for empty message', () => {
        const error = validateField('message', '')
        expect(error).not.toBeNull()
        expect(error?.message).toBe('Message is required')
        expect(error?.type).toBe('required')
      })

      it('should return error for message too short', () => {
        const error = validateField('message', 'Short')
        expect(error).not.toBeNull()
        expect(error?.message).toContain('at least 10 characters')
        expect(error?.type).toBe('length')
      })

      it('should return error for message too long', () => {
        const longMessage = 'A'.repeat(5001)
        const error = validateField('message', longMessage)
        expect(error).not.toBeNull()
        expect(error?.message).toContain('not exceed 5000 characters')
        expect(error?.type).toBe('length')
      })

      it('should accept valid message', () => {
        const error = validateField('message', 'This is a valid message for testing purposes.')
        expect(error).toBeNull()
      })
    })
  })

  describe('validateContactForm', () => {
    it('should return no errors for valid form data', () => {
      const data: ContactFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Project Inquiry',
        message: 'I am interested in your services.',
      }
      const errors = validateContactForm(data)
      expect(errors).toHaveLength(0)
    })

    it('should return multiple errors for invalid form data', () => {
      const data: ContactFormData = {
        name: '',
        email: 'invalid',
        subject: 'Bad',
        message: 'Short',
      }
      const errors = validateContactForm(data)
      expect(errors.length).toBeGreaterThan(0)
      expect(errors.some(e => e.field === 'name')).toBe(true)
      expect(errors.some(e => e.field === 'email')).toBe(true)
      expect(errors.some(e => e.field === 'subject')).toBe(true)
      expect(errors.some(e => e.field === 'message')).toBe(true)
    })

    it('should validate all fields independently', () => {
      const data: ContactFormData = {
        name: 'John Doe',
        email: 'invalid-email',
        subject: 'Valid Subject',
        message: 'This is a valid message.',
      }
      const errors = validateContactForm(data)
      expect(errors).toHaveLength(1)
      expect(errors[0].field).toBe('email')
    })
  })

  describe('encodeMailtoLink', () => {
    it('should encode email address for mailto link', () => {
      const encoded = encodeMailtoLink('user@example.com')
      expect(encoded).toBe('user%40example.com')
    })

    it('should handle special characters', () => {
      const encoded = encodeMailtoLink('user+tag@example.com')
      expect(encoded).toContain('%2B')
    })

    it('should sanitize malicious input', () => {
      const encoded = encodeMailtoLink('user@example.com<script>')
      expect(encoded).not.toContain('<')
      expect(encoded).not.toContain('>')
    })
  })

  describe('generateMailtoLink', () => {
    it('should generate basic mailto link', () => {
      const link = generateMailtoLink('user@example.com')
      expect(link).toContain('mailto:')
      expect(link).toContain('user%40example.com')
    })

    it('should include subject parameter', () => {
      const link = generateMailtoLink('user@example.com', 'Test Subject')
      expect(link).toContain('subject=')
      expect(link).toContain('Test%20Subject')
    })

    it('should include body parameter', () => {
      const link = generateMailtoLink('user@example.com', undefined, 'Test body')
      expect(link).toContain('body=')
      expect(link).toContain('Test%20body')
    })

    it('should include both subject and body', () => {
      const link = generateMailtoLink('user@example.com', 'Subject', 'Body')
      expect(link).toContain('subject=')
      expect(link).toContain('body=')
      expect(link).toContain('?')
      expect(link).toContain('&')
    })

    it('should properly encode special characters in parameters', () => {
      const link = generateMailtoLink('user@example.com', 'Subject with spaces', 'Body with\nnewlines')
      expect(link).toContain('%20')
      expect(link).toContain('%0A')
    })
  })
})
