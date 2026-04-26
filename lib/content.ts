/**
 * Content loading abstraction layer
 * Separates content fetching from presentation logic.
 * Designed for easy migration to a CMS (Contentful, Sanity, etc.)
 *
 * ## CMS Migration Guide
 * To migrate from JSON files to a CMS:
 * 1. Replace the `import()` calls in each loader with `fetch()` calls to your CMS API
 * 2. Keep the same return types — all components will continue to work without changes
 * 3. Move secrets (API keys, space IDs) to environment variables
 * 4. See data/README.md for the full content schema reference
 *
 * Example (Contentful):
 *   const res = await fetch(`https://cdn.contentful.com/spaces/${SPACE_ID}/entries?content_type=project`, {
 *     headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
 *   })
 *   const { items } = await res.json()
 *   return items.map(mapContentfulProject)
 */

import type { Project } from '@/lib/types/project'
import type { Skill } from '@/lib/types/skill'
import type { Experience } from '@/lib/types/experience'

// ─── Validation helpers ───────────────────────────────────────────────────────

function isValidProject(item: unknown): item is Project {
  if (!item || typeof item !== 'object') return false
  const p = item as Record<string, unknown>
  return (
    typeof p.id === 'string' &&
    typeof p.title === 'string' &&
    typeof p.description === 'string' &&
    Array.isArray(p.technologies) &&
    Array.isArray(p.images) &&
    typeof p.featured === 'boolean'
  )
}

function isValidSkill(item: unknown): item is Skill {
  if (!item || typeof item !== 'object') return false
  const s = item as Record<string, unknown>
  return (
    typeof s.id === 'string' &&
    typeof s.name === 'string' &&
    typeof s.category === 'string' &&
    typeof s.proficiency === 'number' &&
    s.proficiency >= 1 &&
    s.proficiency <= 5
  )
}

function isValidExperience(item: unknown): item is Experience {
  if (!item || typeof item !== 'object') return false
  const e = item as Record<string, unknown>
  return (
    typeof e.id === 'string' &&
    typeof e.type === 'string' &&
    typeof e.title === 'string' &&
    typeof e.organization === 'string' &&
    e.period !== null &&
    typeof e.period === 'object' &&
    Array.isArray(e.description)
  )
}

// ─── Error handling wrapper ───────────────────────────────────────────────────

/**
 * Wraps a content loader with error handling and a typed fallback.
 * Logs errors in development; silently returns the fallback in production.
 */
export async function safeLoad<T>(loader: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await loader()
  } catch (error) {
    console.error('[Content] Failed to load content:', error)
    return fallback
  }
}

// ─── Projects ────────────────────────────────────────────────────────────────

/**
 * Load all projects.
 * CMS migration point: replace the import() with a fetch() to your CMS API.
 */
export async function getProjects(): Promise<Project[]> {
  return safeLoad(async () => {
    const data = await import('@/data/projects.json')
    const raw: unknown[] = Array.isArray(data.default) ? data.default : []
    const valid = raw.filter(isValidProject)
    if (valid.length !== raw.length) {
      console.warn(`[Content] ${raw.length - valid.length} project(s) failed validation and were skipped.`)
    }
    return valid
  }, [])
}

export async function getProjectById(id: string): Promise<Project | null> {
  if (!id) return null
  const projects = await getProjects()
  return projects.find((p) => p.id === id) ?? null
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects()
  return projects.filter((p) => p.featured)
}

// ─── Skills ──────────────────────────────────────────────────────────────────

/**
 * Load all skills.
 * CMS migration point: replace the import() with a fetch() to your CMS API.
 */
export async function getSkills(): Promise<Skill[]> {
  return safeLoad(async () => {
    const data = await import('@/data/skills.json')
    const raw: unknown[] = Array.isArray(data.default) ? data.default : []
    const valid = raw.filter(isValidSkill)
    if (valid.length !== raw.length) {
      console.warn(`[Content] ${raw.length - valid.length} skill(s) failed validation and were skipped.`)
    }
    return valid
  }, [])
}

export async function getSkillsByCategory(category: Skill['category']): Promise<Skill[]> {
  const skills = await getSkills()
  return skills.filter((s) => s.category === category)
}

// ─── Experience ──────────────────────────────────────────────────────────────

/**
 * Load all experience entries.
 * CMS migration point: replace the import() with a fetch() to your CMS API.
 */
export async function getExperiences(): Promise<Experience[]> {
  return safeLoad(async () => {
    const data = await import('@/data/experience.json')
    const raw: unknown[] = Array.isArray(data.default) ? data.default : []
    const valid = raw.filter(isValidExperience)
    if (valid.length !== raw.length) {
      console.warn(`[Content] ${raw.length - valid.length} experience entry/entries failed validation and were skipped.`)
    }
    return valid
  }, [])
}

export async function getExperienceByType(type: Experience['type']): Promise<Experience[]> {
  const experiences = await getExperiences()
  return experiences.filter((e) => e.type === type)
}
