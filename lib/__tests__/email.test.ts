import { generateEmailTemplate, escapeHtml, createGmailMessage, validateEmailConfig } from '@/lib/email'

describe('Email Utilities', () => {
  describe('escapeHtml', () => {
    it('should escape HTML special characters', () => {
      expect(escapeHtml('<script>alert("xss")</script>')).toBe(
        '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
      )
    })

    it('should escape ampersands', () => {
      expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry')
    })

    it('should escape single quotes', () => {
      expect(escapeHtml("It's a test")).toBe('It&#039;s a test')
    })

    it('should preserve normal text', () => {
      expect(escapeHtml('Hello World')).toBe('Hello World')
    })

    it('should handle multiple special characters', () => {
      expect(escapeHtml('<div class="test">Hello & "goodbye"</div>')).toBe(
        '&lt;div class=&quot;test&quot;&gt;Hello &amp; &quot;goodbye&quot;&lt;/div&gt;'
      )
    })
  })

  describe('generateEmailTemplate', () => {
    const testData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Project Inquiry',
      message: 'I am interested in your services.',
    }

    it('should generate email template with all fields', () => {
      const template = generateEmailTemplate(testData)

      expect(template.subject).toContain('Portfolio Contact')
      expect(template.subject).toContain('Project Inquiry')
      expect(template.text).toContain('John Doe')
      expect(template.text).toContain('john@example.com')
      expect(template.text).toContain('Project Inquiry')
      expect(template.text).toContain('I am interested in your services.')
      expect(template.replyTo).toBe('john@example.com')
    })

    it('should generate HTML template', () => {
      const template = generateEmailTemplate(testData)

      expect(template.html).toContain('<!DOCTYPE html>')
      expect(template.html).toContain('John Doe')
      expect(template.html).toContain('john@example.com')
      expect(template.html).toContain('Project Inquiry')
    })

    it('should escape HTML in message content', () => {
      const dataWithHtml = {
        ...testData,
        message: '<script>alert("xss")</script>',
      }

      const template = generateEmailTemplate(dataWithHtml)

      expect(template.html).not.toContain('<script>')
      expect(template.html).toContain('&lt;script&gt;')
    })

    it('should preserve line breaks in message', () => {
      const dataWithLineBreaks = {
        ...testData,
        message: 'Line 1\nLine 2\nLine 3',
      }

      const template = generateEmailTemplate(dataWithLineBreaks)

      expect(template.html).toContain('<br>')
      expect(template.text).toContain('Line 1\nLine 2\nLine 3')
    })

    it('should include reply-to header', () => {
      const template = generateEmailTemplate(testData)

      expect(template.replyTo).toBe(testData.email)
    })
  })

  describe('createGmailMessage', () => {
    const testData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Project Inquiry',
      message: 'I am interested in your services.',
    }

    it('should create base64url encoded message', () => {
      const template = generateEmailTemplate(testData)
      const message = createGmailMessage('owner@example.com', template)

      // Should be base64url encoded (no +, /, or = padding)
      expect(message).not.toContain('+')
      expect(message).not.toContain('/')
      expect(message).not.toContain('=')

      // Should be decodable
      const decoded = Buffer.from(message, 'base64').toString('utf-8')
      expect(decoded).toContain('To: owner@example.com')
      expect(decoded).toContain('Reply-To: john@example.com')
    })

    it('should include required email headers', () => {
      const template = generateEmailTemplate(testData)
      const message = createGmailMessage('owner@example.com', template)
      const decoded = Buffer.from(message, 'base64').toString('utf-8')

      expect(decoded).toContain('To: owner@example.com')
      expect(decoded).toContain('Reply-To: john@example.com')
      expect(decoded).toContain('Subject: Portfolio Contact: Project Inquiry')
      expect(decoded).toContain('MIME-Version: 1.0')
      expect(decoded).toContain('Content-Type: text/html; charset=UTF-8')
    })

    it('should include HTML content', () => {
      const template = generateEmailTemplate(testData)
      const message = createGmailMessage('owner@example.com', template)
      const decoded = Buffer.from(message, 'base64').toString('utf-8')

      expect(decoded).toContain('<!DOCTYPE html>')
      expect(decoded).toContain('John Doe')
    })
  })

  describe('validateEmailConfig', () => {
    const originalEnv = process.env

    beforeEach(() => {
      process.env = { ...originalEnv }
    })

    afterEach(() => {
      process.env = originalEnv
    })

    it('should validate when all required env vars are set', () => {
      process.env.GMAIL_USER_EMAIL = 'user@gmail.com'
      process.env.GMAIL_FROM_EMAIL = 'noreply@example.com'
      process.env.GMAIL_API_KEY = 'test-key'

      const result = validateEmailConfig()

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should report error when GMAIL_USER_EMAIL is missing', () => {
      delete process.env.GMAIL_USER_EMAIL
      process.env.GMAIL_FROM_EMAIL = 'noreply@example.com'
      process.env.GMAIL_API_KEY = 'test-key'

      const result = validateEmailConfig()

      expect(result.valid).toBe(false)
      expect(result.errors).toContain('GMAIL_USER_EMAIL environment variable is not set')
    })

    it('should report error when GMAIL_FROM_EMAIL is missing', () => {
      process.env.GMAIL_USER_EMAIL = 'user@gmail.com'
      delete process.env.GMAIL_FROM_EMAIL
      process.env.GMAIL_API_KEY = 'test-key'

      const result = validateEmailConfig()

      expect(result.valid).toBe(false)
      expect(result.errors).toContain('GMAIL_FROM_EMAIL environment variable is not set')
    })

    it('should report error when Gmail API credentials are missing', () => {
      process.env.GMAIL_USER_EMAIL = 'user@gmail.com'
      process.env.GMAIL_FROM_EMAIL = 'noreply@example.com'
      delete process.env.GMAIL_API_KEY
      delete process.env.GMAIL_REFRESH_TOKEN

      const result = validateEmailConfig()

      expect(result.valid).toBe(false)
      expect(result.errors).toContain('Gmail API credentials are not configured')
    })

    it('should accept GMAIL_REFRESH_TOKEN as alternative to GMAIL_API_KEY', () => {
      process.env.GMAIL_USER_EMAIL = 'user@gmail.com'
      process.env.GMAIL_FROM_EMAIL = 'noreply@example.com'
      delete process.env.GMAIL_API_KEY
      process.env.GMAIL_REFRESH_TOKEN = 'test-refresh-token'

      const result = validateEmailConfig()

      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })
  })
})
