/**
 * Experience utility functions for timeline ordering and manipulation
 */

import type { Experience } from './types/experience'

/**
 * Parse a year string to a comparable number
 * Handles formats like "2022", "2020-2022", etc.
 */
function parseYear(yearStr: string): number {
  const match = yearStr.match(/\d{4}/)
  return match ? parseInt(match[0], 10) : 0
}

/**
 * Convert an experience entry to a sortable date value
 * Returns a number that can be compared for chronological ordering
 * Current entries are treated as having the highest date value
 */
function getExperienceSortValue(experience: Experience): number {
  // If current, treat as year 9999 (future)
  if (experience.period.current) {
    return 9999
  }

  // Otherwise use end date if available, then start date
  const endYear = experience.period.end ? parseYear(experience.period.end) : 0
  const startYear = parseYear(experience.period.start)

  // Use end year if available, otherwise start year
  return endYear > 0 ? endYear : startYear
}

/**
 * Sort experiences in reverse chronological order (newest first)
 * Entries with current flag appear first, followed by most recent end dates
 * Entries with same dates maintain their original order (stable sort)
 */
export function sortExperiencesChronologically(
  experiences: Experience[]
): Experience[] {
  return [...experiences].sort((a, b) => {
    const aValue = getExperienceSortValue(a)
    const bValue = getExperienceSortValue(b)

    // Sort in descending order (newest first)
    return bValue - aValue
  })
}

/**
 * Validate that experiences are in chronological order
 * Returns true if sorted from newest to oldest
 */
export function isChronologicallyOrdered(experiences: Experience[]): boolean {
  for (let i = 0; i < experiences.length - 1; i++) {
    const current = getExperienceSortValue(experiences[i])
    const next = getExperienceSortValue(experiences[i + 1])

    // Current should be >= next (descending order)
    if (current < next) {
      return false
    }
  }
  return true
}

/**
 * Get the chronological order of an experience entry
 * Useful for debugging and testing
 */
export function getExperienceChronologicalValue(experience: Experience): {
  isCurrent: boolean
  year: number
  sortValue: number
} {
  const sortValue = getExperienceSortValue(experience)
  const year = experience.period.current
    ? 9999
    : experience.period.end
      ? parseYear(experience.period.end)
      : parseYear(experience.period.start)

  return {
    isCurrent: experience.period.current,
    year,
    sortValue,
  }
}
