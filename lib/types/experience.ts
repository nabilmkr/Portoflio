/**
 * Experience data model for portfolio timeline
 * Defines the structure for work experience, education, and certifications
 */

interface ExperiencePeriod {
  start: string
  end?: string
  current: boolean
}

export interface Experience {
  id: string
  type: 'work' | 'education' | 'certification'
  title: string
  organization: string
  location?: string
  period: ExperiencePeriod
  description: string[]
  achievements?: string[]
  skillsUsed?: string[]
  link?: string
}
