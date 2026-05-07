'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Terminal, Layers, PenTool, Code, Server, Wrench, Smile } from 'lucide-react'
import { Skill, SKILL_CATEGORIES, SkillCategory } from '@/lib/types/skill'
import skillsData from '@/data/skills.json'
import { cn } from '@/lib/utils'

const skills = skillsData as Skill[]

const CATEGORY_ICONS: Record<SkillCategory, React.ElementType> = {
  frontend: Code,
  backend: Server,
  tools: Wrench,
  design: PenTool,
  soft: Smile
}

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'all'>('all')

  const filteredSkills = useMemo(() => {
    if (selectedCategory === 'all') return skills
    return skills.filter((skill) => skill.category === selectedCategory)
  }, [selectedCategory])

  return (
    <section
      id="skills"
      className="min-h-screen bg-black content-visibility-auto py-24 relative"
      aria-labelledby="skills-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="text-sm font-body text-white/80 mb-6 uppercase tracking-widest">{/* Technical Arsenal */}</div>
            <h2 id="skills-heading" className="text-5xl md:text-7xl lg:text-[6rem] font-heading italic text-white leading-[0.9] tracking-[-3px]">
              Capabilities
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-right"
          >
            <p className="text-lg text-white/80 font-body font-light max-w-md ml-auto">
              A comprehensive overview of my technical skills and proficiency levels across different domains.
            </p>
          </motion.div>
        </div>

        {/* Categories as liquid glass pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-16"
          role="group"
          aria-label="Filter skills by category"
        >
          <button
            onClick={() => setSelectedCategory('all')}
            className={cn(
              "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 font-body",
              selectedCategory === 'all'
                ? "bg-white text-black"
                : "liquid-glass text-white border border-white/5 hover:bg-white/10"
            )}
            aria-pressed={selectedCategory === 'all'}
          >
            All Skills
          </button>
          {(Object.entries(SKILL_CATEGORIES) as [SkillCategory, string][]).map(
            ([categoryKey, categoryLabel]) => (
              <button
                key={categoryKey}
                onClick={() => setSelectedCategory(categoryKey)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 font-body flex items-center gap-2",
                  selectedCategory === categoryKey
                    ? "bg-white text-black"
                    : "liquid-glass text-white border border-white/5 hover:bg-white/10"
                )}
                aria-pressed={selectedCategory === categoryKey}
              >
                {categoryLabel}
              </button>
            )
          )}
        </motion.div>

        {/* Skills Layout - Cinematic Cards instead of tiny badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => {
            const Icon = CATEGORY_ICONS[skill.category] || Terminal;

            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 10) * 0.05 }}
                className="liquid-glass rounded-[1.25rem] p-6 min-h-[180px] flex flex-col border border-white/5 group hover:border-white/20 transition-colors"
              >
                <div className="flex items-start justify-between mb-auto">
                  <div className="w-10 h-10 liquid-glass rounded-[0.75rem] flex items-center justify-center border border-white/10">
                    <Icon className="h-5 w-5 text-white/90" />
                  </div>

                  <div className="text-right">
                    <div className="font-heading italic text-2xl text-white tracking-tight">
                      {skill.proficiency}%
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-heading italic text-3xl text-white tracking-[-0.5px] leading-none mb-2">
                    {skill.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-body text-white/50 uppercase tracking-wider">
                      {SKILL_CATEGORIES[skill.category]}
                    </span>
                    <div className="h-[1px] flex-1 bg-white/10" />
                  </div>

                  {/* Progress bar subtle integration */}
                  <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                    <motion.div
                      className="h-full bg-white/40 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + ((index % 10) * 0.05) }}
                    />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
