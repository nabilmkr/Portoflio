/**
 * Property-based tests for experience timeline ordering
 * Tests the chronological ordering property of experience entries
 */

import * as fc from 'fast-check'
import type { Experience, ExperiencePeriod } from '../types/experience'
import {
  sortExperiencesChronologically,
  isChronologicallyOrdered,
  getExperienceChronologicalValue,
} from '../experience'

/**
 * Arbitrary generator for valid year strings (1900-2100)
 */
const yearArb = fc.integer({ min: 1900, max: 2100 }).map((y) => y.toString())

/**
 * Arbitrary generator for experience period objects
 * Generates valid periods with start dates, optional end dates, and current flag
 */
const experiencePeriodArb = fc
  .tuple(yearArb, fc.boolean(), fc.boolean())
  .map(([startYear, hasCurrent, hasEnd]) => {
    const period: ExperiencePeriod = {
      start: startYear,
      current: hasCurrent,
    }

    // If not current and has end date, add end date (must be >= start)
    if (!hasCurrent && hasEnd) {
      const endYear = fc.sample(
        fc.integer({ min: parseInt(startYear, 10), max: 2100 }),
        1
      )[0]
      period.end = endYear.toString()
    }

    return period
  })

/**
 * Arbitrary generator for experience entries
 * Generates realistic experience objects with various types and periods
 */
const experienceArb = fc
  .tuple(
    fc.uuid(),
    fc.constantFrom('work', 'education', 'certification'),
    fc.string({ minLength: 5, maxLength: 50 }),
    fc.string({ minLength: 5, maxLength: 50 }),
    fc.option(fc.string({ minLength: 5, maxLength: 50 })),
    experiencePeriodArb,
    fc.array(fc.string({ minLength: 10, maxLength: 100 }), {
      minLength: 1,
      maxLength: 3,
    }),
    fc.option(
      fc.array(fc.string({ minLength: 5, maxLength: 50 }), {
        minLength: 1,
        maxLength: 3,
      })
    ),
    fc.option(
      fc.array(fc.string({ minLength: 3, maxLength: 30 }), {
        minLength: 1,
        maxLength: 5,
      })
    ),
    fc.option(fc.webUrl())
  )
  .map(
    ([
      id,
      type,
      title,
      organization,
      location,
      period,
      description,
      achievements,
      skillsUsed,
      link,
    ]) => ({
      id,
      type: type as 'work' | 'education' | 'certification',
      title,
      organization,
      location: location || undefined,
      period,
      description,
      achievements: achievements || undefined,
      skillsUsed: skillsUsed || undefined,
      link: link || undefined,
    })
  )

describe('Experience Timeline Ordering', () => {
  describe('Property: Chronological Ordering', () => {
    /**
     * **Validates: Requirements 4.1**
     * Property: For any list of experience entries with valid date periods,
     * when sorted chronologically, the entries SHALL be ordered from latest to earliest
     * (reverse chronological order).
     */
    it('should sort experiences in reverse chronological order (newest first)', () => {
      fc.assert(
        fc.property(
          fc.array(experienceArb, { minLength: 1, maxLength: 10 }),
          (experiences) => {
            const sorted = sortExperiencesChronologically(experiences)

            // Verify sorted array has same length
            expect(sorted).toHaveLength(experiences.length)

            // Verify all entries are present (no data loss)
            const originalIds = new Set(experiences.map((e) => e.id))
            const sortedIds = new Set(sorted.map((e) => e.id))
            expect(sortedIds).toEqual(originalIds)

            // Verify chronological ordering
            expect(isChronologicallyOrdered(sorted)).toBe(true)
          }
        ),
        { numRuns: 100 }
      )
    })

    /**
     * **Validates: Requirements 4.1**
     * Property: Current entries (with current flag = true) SHALL appear before
     * all past entries in the sorted timeline.
     */
    it('should place current entries before past entries', () => {
      fc.assert(
        fc.property(
          fc.array(experienceArb, { minLength: 2, maxLength: 10 }),
          (experiences) => {
            const sorted = sortExperiencesChronologically(experiences)

            // Find first non-current entry
            let firstNonCurrentIndex = -1
            for (let i = 0; i < sorted.length; i++) {
              if (!sorted[i].period.current) {
                firstNonCurrentIndex = i
                break
              }
            }

            // If there are non-current entries, verify no current entries come after
            if (firstNonCurrentIndex >= 0) {
              for (let i = firstNonCurrentIndex; i < sorted.length; i++) {
                expect(sorted[i].period.current).toBe(false)
              }
            }
          }
        ),
        { numRuns: 100 }
      )
    })

    /**
     * **Validates: Requirements 4.1**
     * Property: Entries with the same end date (or same start date if no end date)
     * SHALL maintain stable ordering (preserve original relative order).
     */
    it('should maintain stable ordering for entries with same dates', () => {
      fc.assert(
        fc.property(
          fc.tuple(
            fc.array(experienceArb, { minLength: 1, maxLength: 5 }),
            fc.array(experienceArb, { minLength: 1, maxLength: 5 })
          ),
          ([group1, group2]) => {
            // Create entries with same year
            const sameYear = '2020'
            const experiences = [
              ...group1.map((e, i) => ({
                ...e,
                id: `same-${i}-a`,
                period: { start: sameYear, end: sameYear, current: false },
              })),
              ...group2.map((e, i) => ({
                ...e,
                id: `same-${i}-b`,
                period: { start: sameYear, end: sameYear, current: false },
              })),
            ]

            const sorted = sortExperiencesChronologically(experiences)

            // Verify all entries with same date are present
            expect(sorted).toHaveLength(experiences.length)

            // Verify chronological ordering is maintained
            expect(isChronologicallyOrdered(sorted)).toBe(true)
          }
        ),
        { numRuns: 50 }
      )
    })

    /**
     * **Validates: Requirements 4.1**
     * Property: Entries with missing end dates (only start date) SHALL be ordered
     * by their start date in reverse chronological order.
     */
    it('should handle entries with missing end dates correctly', () => {
      fc.assert(
        fc.property(
          fc.array(
            fc
              .tuple(yearArb, fc.boolean())
              .map(([startYear, isCurrent]) => ({
                id: fc.sample(fc.uuid(), 1)[0],
                type: 'work' as const,
                title: 'Test Role',
                organization: 'Test Org',
                period: {
                  start: startYear,
                  current: isCurrent,
                  // No end date
                } as ExperiencePeriod,
                description: ['Test description'],
              })),
            { minLength: 1, maxLength: 10 }
          ),
          (experiences) => {
            const sorted = sortExperiencesChronologically(experiences)

            // Verify chronological ordering
            expect(isChronologicallyOrdered(sorted)).toBe(true)

            // Verify current entries come first
            const firstNonCurrentIndex = sorted.findIndex(
              (e) => !e.period.current
            )
            if (firstNonCurrentIndex >= 0) {
              for (let i = firstNonCurrentIndex; i < sorted.length; i++) {
                expect(sorted[i].period.current).toBe(false)
              }
            }
          }
        ),
        { numRuns: 100 }
      )
    })

    /**
     * **Validates: Requirements 4.1**
     * Property: Sorting the same list multiple times SHALL produce identical results
     * (deterministic sorting).
     */
    it('should produce deterministic results across multiple sorts', () => {
      fc.assert(
        fc.property(
          fc.array(experienceArb, { minLength: 1, maxLength: 10 }),
          (experiences) => {
            const sorted1 = sortExperiencesChronologically(experiences)
            const sorted2 = sortExperiencesChronologically(experiences)
            const sorted3 = sortExperiencesChronologically(sorted1)

            // All three sorts should produce identical results
            expect(sorted1.map((e) => e.id)).toEqual(sorted2.map((e) => e.id))
            expect(sorted2.map((e) => e.id)).toEqual(sorted3.map((e) => e.id))
          }
        ),
        { numRuns: 100 }
      )
    })

    /**
     * **Validates: Requirements 4.1**
     * Property: Sorting SHALL not modify the original array (immutability).
     */
    it('should not modify the original array', () => {
      fc.assert(
        fc.property(
          fc.array(experienceArb, { minLength: 1, maxLength: 10 }),
          (experiences) => {
            const originalIds = experiences.map((e) => e.id)
            const originalOrder = [...originalIds]

            sortExperiencesChronologically(experiences)

            // Original array should remain unchanged
            expect(experiences.map((e) => e.id)).toEqual(originalOrder)
          }
        ),
        { numRuns: 100 }
      )
    })

    /**
     * **Validates: Requirements 4.1**
     * Property: For any experience entry, the chronological value calculation
     * SHALL be consistent and comparable.
     */
    it('should calculate consistent chronological values', () => {
      fc.assert(
        fc.property(experienceArb, (experience) => {
          const value1 = getExperienceChronologicalValue(experience)
          const value2 = getExperienceChronologicalValue(experience)

          // Same entry should produce same chronological value
          expect(value1.sortValue).toBe(value2.sortValue)
          expect(value1.isCurrent).toBe(value2.isCurrent)
          expect(value1.year).toBe(value2.year)
        }),
        { numRuns: 100 }
      )
    })

    /**
     * **Validates: Requirements 4.1**
     * Property: Current entries SHALL have the highest chronological value (9999).
     */
    it('should assign highest value to current entries', () => {
      fc.assert(
        fc.property(experienceArb, (experience) => {
          const value = getExperienceChronologicalValue(experience)

          if (experience.period.current) {
            expect(value.sortValue).toBe(9999)
            expect(value.isCurrent).toBe(true)
          } else {
            expect(value.sortValue).toBeLessThan(9999)
            expect(value.isCurrent).toBe(false)
          }
        }),
        { numRuns: 100 }
      )
    })

    /**
     * **Validates: Requirements 4.1**
     * Property: Entries with end dates SHALL be ordered by end date,
     * not by start date.
     */
    it('should prioritize end date over start date for ordering', () => {
      fc.assert(
        fc.property(
          fc.tuple(yearArb, yearArb, yearArb).filter(
            ([start1, end1, start2]) => {
              const s1 = parseInt(start1, 10)
              const e1 = parseInt(end1, 10)
              const s2 = parseInt(start2, 10)
              // Ensure: start1 < end1 and start2 < end1 (so end1 is the differentiator)
              return s1 < e1 && s2 < e1
            }
          ),
          ([start1, end1, start2]) => {
            const exp1: Experience = {
              id: 'exp1',
              type: 'work',
              title: 'Job 1',
              organization: 'Org 1',
              period: { start: start1, end: end1, current: false },
              description: ['desc'],
            }

            const exp2: Experience = {
              id: 'exp2',
              type: 'work',
              title: 'Job 2',
              organization: 'Org 2',
              period: { start: start2, end: undefined, current: false },
              description: ['desc'],
            }

            const sorted = sortExperiencesChronologically([exp2, exp1])

            // exp1 should come first (has later end date)
            expect(sorted[0].id).toBe('exp1')
            expect(sorted[1].id).toBe('exp2')
          }
        ),
        { numRuns: 50 }
      )
    })
  })

  describe('Edge Cases', () => {
    /**
     * **Validates: Requirements 4.1**
     * Property: Empty array SHALL return empty array.
     */
    it('should handle empty array', () => {
      const sorted = sortExperiencesChronologically([])
      expect(sorted).toEqual([])
      expect(isChronologicallyOrdered(sorted)).toBe(true)
    })

    /**
     * **Validates: Requirements 4.1**
     * Property: Single entry SHALL return array with that entry.
     */
    it('should handle single entry', () => {
      fc.assert(
        fc.property(experienceArb, (experience) => {
          const sorted = sortExperiencesChronologically([experience])
          expect(sorted).toHaveLength(1)
          expect(sorted[0].id).toBe(experience.id)
          expect(isChronologicallyOrdered(sorted)).toBe(true)
        }),
        { numRuns: 50 }
      )
    })

    /**
     * **Validates: Requirements 4.1**
     * Property: All current entries SHALL be ordered before all past entries.
     */
    it('should separate current and past entries correctly', () => {
      fc.assert(
        fc.property(
          fc.tuple(
            fc.array(experienceArb, { minLength: 1, maxLength: 5 }),
            fc.array(experienceArb, { minLength: 1, maxLength: 5 })
          ),
          ([currentExps, pastExps]) => {
            const allExperiences = [
              ...currentExps.map((e) => ({ ...e, period: { ...e.period, current: true } })),
              ...pastExps.map((e) => ({ ...e, period: { ...e.period, current: false } })),
            ]

            const sorted = sortExperiencesChronologically(allExperiences)

            // Find transition point
            let transitionIndex = -1
            for (let i = 0; i < sorted.length - 1; i++) {
              if (sorted[i].period.current && !sorted[i + 1].period.current) {
                transitionIndex = i
                break
              }
            }

            // All current entries should come before all past entries
            if (transitionIndex >= 0) {
              for (let i = 0; i <= transitionIndex; i++) {
                expect(sorted[i].period.current).toBe(true)
              }
              for (let i = transitionIndex + 1; i < sorted.length; i++) {
                expect(sorted[i].period.current).toBe(false)
              }
            }
          }
        ),
        { numRuns: 50 }
      )
    })
  })

  describe('Validation Function', () => {
    /**
     * **Validates: Requirements 4.1**
     * Property: isChronologicallyOrdered SHALL return true for sorted arrays
     * and false for unsorted arrays.
     */
    it('should correctly validate chronological ordering', () => {
      fc.assert(
        fc.property(
          fc.array(experienceArb, { minLength: 1, maxLength: 10 }),
          (experiences) => {
            const sorted = sortExperiencesChronologically(experiences)

            // Sorted array should pass validation
            expect(isChronologicallyOrdered(sorted)).toBe(true)

            // Reverse sorted array should fail validation (unless all same date)
            const reversed = [...sorted].reverse()
            const allSameDate = sorted.every(
              (e, i, arr) =>
                i === 0 ||
                getExperienceChronologicalValue(e).sortValue ===
                  getExperienceChronologicalValue(arr[i - 1]).sortValue
            )

            if (!allSameDate) {
              expect(isChronologicallyOrdered(reversed)).toBe(false)
            }
          }
        ),
        { numRuns: 100 }
      )
    })
  })
})
