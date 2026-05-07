import { checkRateLimit, getRemainingRequests, getResetTime, getClientIp } from '@/lib/rate-limit'

describe('Rate Limiting', () => {
  beforeEach(() => {
    // Clear rate limit store between tests
    jest.clearAllMocks()
  })

  describe('checkRateLimit', () => {
    it('should allow requests within the limit', () => {
      const ip = '192.168.1.1'
      
      for (let i = 0; i < 5; i++) {
        expect(checkRateLimit(ip)).toBe(true)
      }
    })

    it('should reject requests exceeding the limit', () => {
      const ip = '192.168.1.2'
      
      // Use up all requests
      for (let i = 0; i < 5; i++) {
        checkRateLimit(ip)
      }
      
      // Next request should be rejected
      expect(checkRateLimit(ip)).toBe(false)
    })

    it('should track different IPs independently', () => {
      const ip1 = '192.168.1.3'
      const ip2 = '192.168.1.4'
      
      // Use up requests for ip1
      for (let i = 0; i < 5; i++) {
        checkRateLimit(ip1)
      }
      
      // ip2 should still have requests available
      expect(checkRateLimit(ip2)).toBe(true)
    })
  })

  describe('getRemainingRequests', () => {
    it('should return max requests for new IP', () => {
      const ip = '192.168.1.5'
      expect(getRemainingRequests(ip)).toBe(5)
    })

    it('should decrease remaining requests after each call', () => {
      const ip = '192.168.1.6'
      
      checkRateLimit(ip)
      expect(getRemainingRequests(ip)).toBe(4)
      
      checkRateLimit(ip)
      expect(getRemainingRequests(ip)).toBe(3)
    })

    it('should return 0 when limit is exceeded', () => {
      const ip = '192.168.1.7'
      
      for (let i = 0; i < 5; i++) {
        checkRateLimit(ip)
      }
      
      expect(getRemainingRequests(ip)).toBe(0)
    })
  })

  describe('getClientIp', () => {
    it('should extract IP from request.ip property', () => {
      const mockRequest = {
        ip: '192.168.1.1',
        headers: {
          get: () => null,
        },
      } as any
      
      const result = getClientIp(mockRequest)
      expect(result).toBe('192.168.1.1')
    })

    it('should ignore spoofed x-forwarded-for header and use request.ip', () => {
      const mockRequest = {
        ip: '192.168.1.1',
        headers: {
          get: (key: string) => key === 'x-forwarded-for' ? 'spoofed-ip, 127.0.0.1' : null,
        },
      } as any
      
      const result = getClientIp(mockRequest)
      expect(result).toBe('192.168.1.1')
    })

    it('should return unknown when no IP property present', () => {
      const mockRequest = {
        headers: {
          get: () => null,
        },
      } as any
      
      const result = getClientIp(mockRequest)
      expect(result).toBe('unknown')
    })
  })
})
