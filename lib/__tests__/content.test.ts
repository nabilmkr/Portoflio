import { safeLoad } from '../content'

describe('safeLoad', () => {
  let consoleErrorSpy: jest.SpyInstance

  beforeEach(() => {
    // Mock console.error to prevent noise in test output and to verify it's called
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  it('should return data when loader resolves successfully', async () => {
    const mockData = { id: 1, name: 'Test' }
    const loader = jest.fn().mockResolvedValue(mockData)
    const fallback = { id: 0, name: 'Fallback' }

    const result = await safeLoad(loader, fallback)

    expect(result).toEqual(mockData)
    expect(loader).toHaveBeenCalledTimes(1)
    expect(consoleErrorSpy).not.toHaveBeenCalled()
  })

  it('should return fallback and log error when loader throws', async () => {
    const error = new Error('Loading failed')
    const loader = jest.fn().mockRejectedValue(error)
    const fallback = [] as any[]

    const result = await safeLoad(loader, fallback)

    expect(result).toEqual(fallback)
    expect(loader).toHaveBeenCalledTimes(1)
    expect(consoleErrorSpy).toHaveBeenCalledWith('[Content] Failed to load content:', error)
  })

  it('should handle non-Error objects being thrown', async () => {
    const loader = jest.fn().mockRejectedValue('Something went wrong')
    const fallback = null

    const result = await safeLoad(loader, fallback)

    expect(result).toBeNull()
    expect(consoleErrorSpy).toHaveBeenCalledWith('[Content] Failed to load content:', 'Something went wrong')
  })

  it('should work with different types of fallback', async () => {
    const loader = jest.fn().mockRejectedValue(new Error())

    expect(await safeLoad(loader, 'default')).toBe('default')
    expect(await safeLoad(loader, 42)).toBe(42)
    expect(await safeLoad(loader, { a: 1 })).toEqual({ a: 1 })
    expect(await safeLoad(loader, [1, 2, 3])).toEqual([1, 2, 3])
  })
})
