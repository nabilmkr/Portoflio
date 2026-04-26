/**
 * Project data model for portfolio showcase
 * Defines the structure for project information including images, technologies, and links
 */

export interface ProjectImage {
  url: string
  alt: string
  caption?: string
}

export interface ProjectLinks {
  live?: string
  github?: string
  caseStudy?: string
}

export interface Project {
  id: string
  title: string
  description: string
  detailedDescription: string
  technologies: string[]
  category: 'web' | 'mobile' | 'design' | 'other'
  images: ProjectImage[]
  links: ProjectLinks
  featured: boolean
  date: string
}

export type ProjectCategory = 'all' | 'web' | 'mobile' | 'design' | 'other'
