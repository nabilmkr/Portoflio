/**
 * Skill data model for portfolio skills display
 * Defines the structure for skill information including proficiency levels and categories
 */

export interface Skill {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'tools' | 'design' | 'soft'
  proficiency: 1 | 2 | 3 | 4 | 5 // 1=Beginner, 5=Expert
  description?: string
  icon?: string
  yearsOfExperience?: number
}

export type SkillCategory = 'frontend' | 'backend' | 'tools' | 'design' | 'soft'

export const SKILL_CATEGORIES: Record<SkillCategory, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Tools',
  design: 'Design',
  soft: 'Soft Skills',
}

export const PROFICIENCY_LABELS: Record<number, string> = {
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Proficient',
  4: 'Advanced',
  5: 'Expert',
}
