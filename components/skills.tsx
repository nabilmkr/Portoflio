'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { Skill, SKILL_CATEGORIES, SkillCategory } from '@/lib/types/skill'
import SkillBadge from './skill-badge'
import skillsData from '@/data/skills.json'

const skills = skillsData as Skill[]

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'all'>('all')

  // Group skills by category
  const groupedSkills = useMemo(() => {
    const groups: Record<SkillCategory, Skill[]> = {
      frontend: [],
      backend: [],
      tools: [],
      design: [],
      soft: [],
    }

    skills.forEach((skill) => {
      groups[skill.category].push(skill)
    })

    return groups
  }, [])

  // Filter skills based on selected category
  const filteredSkills = useMemo(() => {
    if (selectedCategory === 'all') {
      return skills
    }
    return skills.filter((skill) => skill.category === selectedCategory)
  }, [selectedCategory])

  // Calculate average proficiency by category
  const categoryAverages = useMemo(() => {
    const averages: Record<SkillCategory, number> = {
      frontend: 0,
      backend: 0,
      tools: 0,
      design: 0,
      soft: 0,
    }

    Object.entries(groupedSkills).forEach(([category, categorySkills]) => {
      if (categorySkills.length > 0) {
        const sum = categorySkills.reduce((acc, skill) => acc + skill.proficiency, 0)
        averages[category as SkillCategory] = sum / categorySkills.length
      }
    })

    return averages
  }, [groupedSkills])

  return (
    <section
      id="skills"
      className="section-spacing bg-gradient-to-b from-secondary/10 to-background content-visibility-auto"
      aria-labelledby="skills-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 id="skills-heading" className="text-3xl sm:text-4xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels across different
            domains.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
          role="group"
          aria-label="Filter skills by category"
        >
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-accent text-accent-foreground hover:bg-accent/80'
            }`}
            aria-pressed={selectedCategory === 'all'}
          >
            All Skills
          </button>
          {(Object.entries(SKILL_CATEGORIES) as [SkillCategory, string][]).map(
            ([categoryKey, categoryLabel]) => (
              <button
                key={categoryKey}
                onClick={() => setSelectedCategory(categoryKey)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === categoryKey
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent text-accent-foreground hover:bg-accent/80'
                }`}
                aria-pressed={selectedCategory === categoryKey}
              >
                {categoryLabel}
              </button>
            )
          )}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12"
          role="list"
          aria-label="Skills"
          aria-live="polite"
          aria-atomic="false"
        >
          {filteredSkills.map((skill, index) => (
            <div key={skill.id} role="listitem">
              <SkillBadge skill={skill} index={index} />
            </div>
          ))}
        </motion.div>

        {/* Screen reader count announcement */}
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {filteredSkills.length} skill{filteredSkills.length !== 1 ? 's' : ''} shown
        </p>

        {/* Proficiency Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold">Proficiency Summary</h3>
          </div>
          <p className="text-muted-foreground mb-6">
            My skills span across frontend development, design, backend systems, and development
            tools, with a strong focus on modern web technologies and best practices.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {(Object.entries(SKILL_CATEGORIES) as [SkillCategory, string][]).map(
              ([categoryKey, categoryLabel]) => (
                <div key={categoryKey} className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {categoryAverages[categoryKey].toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">{categoryLabel}</div>
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}