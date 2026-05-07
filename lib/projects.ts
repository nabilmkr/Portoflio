import { Project, ProjectCategory } from './types/project'
import projectsData from '@/data/projects.json'

// Pre-calculate and cache unique categories and technologies at the module level
const cachedCategories: ProjectCategory[] = Array.from(
  new Set((projectsData as Project[]).map((p) => p.category))
).sort() as ProjectCategory[]

const cachedTechnologies: string[] = Array.from(
  new Set((projectsData as Project[]).flatMap((p) => p.technologies))
).sort()

/**
 * Get all projects from the data source
 */
export function getAllProjects(): Project[] {
  return projectsData as Project[]
}

/**
 * Get projects filtered by category
 */
export function getProjectsByCategory(category: ProjectCategory): Project[] {
  if (category === 'all') {
    return getAllProjects()
  }
  return getAllProjects().filter(project => project.category === category)
}

/**
 * Get projects filtered by technology
 */
export function getProjectsByTechnology(technology: string): Project[] {
  return getAllProjects().filter(project =>
    project.technologies.some(tech =>
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  )
}

/**
 * Search projects by title or description
 */
export function searchProjects(query: string): Project[] {
  const lowerQuery = query.toLowerCase()
  return getAllProjects().filter(project =>
    project.title.toLowerCase().includes(lowerQuery) ||
    project.description.toLowerCase().includes(lowerQuery) ||
    project.detailedDescription.toLowerCase().includes(lowerQuery) ||
    project.technologies.some(tech =>
      tech.toLowerCase().includes(lowerQuery)
    )
  )
}

/**
 * Get featured projects
 */
export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter(project => project.featured)
}

/**
 * Get a single project by ID
 */
export function getProjectById(id: string): Project | undefined {
  return getAllProjects().find(project => project.id === id)
}

/**
 * Get all unique technologies across all projects
 */
export function getAllTechnologies(): string[] {
  return cachedTechnologies
}

/**
 * Get all unique categories
 */
export function getAllCategories(): ProjectCategory[] {
  return cachedCategories
}
