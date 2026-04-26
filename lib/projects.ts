import { Project, ProjectCategory } from './types/project'
import projectsData from '@/data/projects.json'

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
  const technologies = new Set<string>()
  getAllProjects().forEach(project => {
    project.technologies.forEach(tech => technologies.add(tech))
  })
  return Array.from(technologies).sort()
}

/**
 * Get all unique categories
 */
export function getAllCategories(): ProjectCategory[] {
  const categories = new Set<ProjectCategory>()
  getAllProjects().forEach(project => {
    categories.add(project.category)
  })
  return Array.from(categories).sort() as ProjectCategory[]
}
