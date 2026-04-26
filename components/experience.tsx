'use client'

import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Award, Calendar, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Experience as ExperienceItem } from '@/lib/types/experience'
import experiences from '@/data/experience.json'

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'work':
      return <Briefcase className="h-5 w-5" />
    case 'education':
      return <GraduationCap className="h-5 w-5" />
    case 'certification':
      return <Award className="h-5 w-5" />
    default:
      return <Briefcase className="h-5 w-5" />
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'work':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    case 'education':
      return 'bg-green-500/10 text-green-500 border-green-500/20'
    case 'certification':
      return 'bg-purple-500/10 text-purple-500 border-purple-500/20'
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
  }
}

export default function Experience() {
  return (
    <section id="experience" className="section-spacing bg-gradient-to-b from-background to-secondary/10 content-visibility-auto" aria-labelledby="experience-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 id="experience-heading" className="text-3xl sm:text-4xl font-bold mb-4">Experience & Education</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A timeline of my professional journey, education, and certifications.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20" aria-hidden="true" />

          <div className="space-y-12" role="list" aria-label="Experience timeline">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                role="listitem"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  'relative',
                  index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:text-right'
                )}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-10" aria-hidden="true">
                  <div className="w-4 h-4 rounded-full bg-primary border-4 border-background" />
                </div>

                {/* Content Card */}
                <div
                  className={cn(
                    'bg-card border border-border rounded-2xl p-6 shadow-lg',
                    'transition-all duration-300 hover:shadow-xl hover:border-primary/50',
                    index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                  )}
                >
                  {/* Header */}
                  <div className={cn(
                    'flex flex-col md:flex-row items-start md:items-center gap-4 mb-4',
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  )}>
                    <div className={cn(
                      'flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium',
                      getTypeColor(experience.type)
                    )}>
                      {getTypeIcon(experience.type)}
                      <span className="capitalize">{experience.type}</span>
                    </div>
                    
                    <div className={cn(
                      'flex-1',
                      index % 2 === 0 ? 'md:text-left' : 'md:text-right'
                    )}>
                      <h3 className="text-xl font-bold mb-1">{experience.title}</h3>
                      <p className="text-lg text-primary font-medium">{experience.organization}</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className={cn(
                    'flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground',
                    index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                  )}>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {experience.period.start} - {experience.period.current ? 'Present' : (experience.period.end || 'Present')}
                      </span>
                    </div>
                    {experience.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{experience.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <ul className={cn(
                    'space-y-2 mb-6',
                    index % 2 === 0 ? 'md:text-left' : 'md:text-right'
                  )}>
                    {experience.description.map((item, i) => (
                      <li key={i} className="text-muted-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Achievements */}
                  {experience.achievements && experience.achievements.length > 0 && (
                    <div className={cn(
                      'flex flex-wrap gap-2',
                      index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                    )}>
                      {experience.achievements.map((achievement, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-6">
            {[
              { label: 'Years Experience', value: '4+' },
              { label: 'Projects Completed', value: '50+' },
              { label: 'Technologies', value: '20+' },
              { label: 'Certifications', value: '5+' },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}