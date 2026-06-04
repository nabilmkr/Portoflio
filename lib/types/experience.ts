/**
 * Experience data model for portfolio timeline
 * Defines the structure for work experience, education, and certifications
 */

export interface ExperiencePeriod {
  start: string
  end?: string
  current: boolean
}

export interface Experience {
  id: string
  type: 'work' | 'education' | 'certification'
  title: string
  role?: string
  organization: string
  company?: string
  location?: string
  period: ExperiencePeriod | string
  description: string | string[]
  achievements?: string[]
  skillsUsed?: string[]
  technologies?: string[]
  link?: string
}
