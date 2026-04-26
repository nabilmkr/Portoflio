import { verifyRecaptchaToken, isRecaptchaConfigured } from '@/lib/recaptcha'

// Mock fetch
global.fetch = jest.fn()

describe('reCAPTCHA Verification', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Clear environment variables
    delete process.env.RECAPTCHA_SECRET_KEY
    delete process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  })

  describe('verifyRecaptchaToken', () => {
    it('should return error when secret key is not configured', async () => {
      const result = await verifyRecaptchaToken('test-token')
      
      expect(result.valid).toBe(false)
      expect(result.score).toBe(0)
      expect(result.error).toBe('reCAPTCHA not configured')
    })

    it('should verify valid token with high score', async () => {
      process.env.RECAPTCHA_SECRET_KEY = 'test-secret'
      
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          score: 0.9,
          action: 'submit',
          challenge_ts: '2024-01-01T00:00:00Z',
          hostname: 'example.com',
        }),
      })

      const result = await verifyRecaptchaToken('valid-token')
      
      expect(result.valid).toBe(true)
      expect(result.score).toBe(0.9)
      expect(result.error).toBeUndefined()
    })

    it('should reject token with low score', async () => {
      process.env.RECAPTCHA_SECRET_KEY = 'test-secret'
      
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          score: 0.2,
          action: 'submit',
          challenge_ts: '2024-01-01T00:00:00Z',
          hostname: 'example.com',
        }),
      })

      const result = await verifyRecaptchaToken('low-score-token')
      
      expect(result.valid).toBe(false)
      expect(result.score).toBe(0.2)
      expect(result.error).toContain('Score too low')
    })

    it('should handle failed verification', async () => {
      process.env.RECAPTCHA_SECRET_KEY = 'test-secret'
      
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: false,
          error_codes: ['invalid-input-response'],
        }),
      })

      const result = await verifyRecaptchaToken('invalid-token')
      
      expect(result.valid).toBe(false)
      expect(result.score).toBe(0)
      expect(result.error).toBe('invalid-input-response')
    })

    it('should handle API errors', async () => {
      process.env.RECAPTCHA_SECRET_KEY = 'test-secret'
      
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Internal Server Error',
      })

      const result = await verifyRecaptchaToken('test-token')
      
      expect(result.valid).toBe(false)
      expect(result.score).toBe(0)
      expect(result.error).toContain('reCAPTCHA API error')
    })

    it('should handle network errors', async () => {
      process.env.RECAPTCHA_SECRET_KEY = 'test-secret'
      
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network error')
      )

      const result = await verifyRecaptchaToken('test-token')
      
      expect(result.valid).toBe(false)
      expect(result.score).toBe(0)
      expect(result.error).toBe('Network error')
    })
  })

  describe('isRecaptchaConfigured', () => {
    it('should return false when keys are not configured', () => {
      expect(isRecaptchaConfigured()).toBe(false)
    })

    it('should return false when only secret key is configured', () => {
      process.env.RECAPTCHA_SECRET_KEY = 'test-secret'
      expect(isRecaptchaConfigured()).toBe(false)
    })

    it('should return false when only site key is configured', () => {
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY = 'test-site-key'
      expect(isRecaptchaConfigured()).toBe(false)
    })

    it('should return true when both keys are configured', () => {
      process.env.RECAPTCHA_SECRET_KEY = 'test-secret'
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY = 'test-site-key'
      expect(isRecaptchaConfigured()).toBe(true)
    })
  })
})
