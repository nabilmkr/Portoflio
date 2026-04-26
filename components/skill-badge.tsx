'use client'

import { motion } from 'framer-motion'
import { Skill, PROFICIENCY_LABELS } from '@/lib/types/skill'
import { cn } from '@/lib/utils'

interface SkillBadgeProps {
  skill: Skill
  index?: number
}

export default function SkillBadge({ skill, index = 0 }: SkillBadgeProps) {
  const proficiencyLabel = PROFICIENCY_LABELS[skill.proficiency]
  const proficiencyPercentage = (skill.proficiency / 5) * 100

  // Color coding based on proficiency level
  const getProficiencyColor = (level: number) => {
    switch (level) {
      case 5:
        return 'bg-green-500'
      case 4:
        return 'bg-blue-500'
      case 3:
        return 'bg-yellow-500'
      case 2:
        return 'bg-orange-500'
      case 1:
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: (index || 0) * 0.05 }}
      className="group"
    >
      <div className="bg-card border border-border rounded-lg p-4 h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50">
        {/* Skill Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {skill.icon && (
                <span className="text-lg flex-shrink-0" aria-hidden="true">
                  {skill.icon}
                </span>
              )}
              <h3 className="text-sm font-semibold truncate">{skill.name}</h3>
            </div>
            {skill.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {skill.description}
              </p>
            )}
          </div>
        </div>

        {/* Proficiency Indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Proficiency
            </span>
            <span
              className="text-xs font-semibold"
              aria-label={`${skill.name} proficiency: ${proficiencyLabel}`}
            >
              {skill.proficiency}/5
            </span>
          </div>

          {/* Progress Bar */}
          <div
            className="h-2 bg-accent rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={skill.proficiency}
            aria-valuemin={0}
            aria-valuemax={5}
            aria-label={`${skill.name} proficiency: ${proficiencyLabel} (${skill.proficiency} out of 5)`}
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${proficiencyPercentage}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: (index || 0) * 0.05 }}
              className={cn('h-full rounded-full', getProficiencyColor(skill.proficiency))}
            />
          </div>

          {/* Proficiency Label */}
          <p className="text-xs text-muted-foreground">{proficiencyLabel}</p>
        </div>

        {/* Years of Experience */}
        {skill.yearsOfExperience !== undefined && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              {skill.yearsOfExperience} year{skill.yearsOfExperience !== 1 ? 's' : ''} of experience
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
