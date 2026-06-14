'use client'

import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Award, Calendar, MapPin, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Experience, ExperiencePeriod } from '@/lib/types/experience'
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

// Ensure period rendering works gracefully
const formatPeriod = (period: ExperiencePeriod | string) => {
  if (typeof period === 'string') return period;
  if (period && typeof period === 'object') {
    if (period.start && period.end) return `${period.start} - ${period.end}`;
    if (period.start && period.current) return `${period.start} - Present`;
    if (period.start) return period.start;
  }
  return '';
}

// Normalize descriptions
const formatDescription = (description: string | string[]) => {
  if (Array.isArray(description)) {
    return description.join(' ');
  }
  return typeof description === 'string' ? description : '';
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-24 bg-black relative content-visibility-auto"
      aria-labelledby="experience-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-sm font-body text-white/80 mb-6 uppercase tracking-widest">{/* Journey */}</div>
            <h2 id="experience-heading" className="text-5xl md:text-7xl lg:text-[6rem] font-heading italic text-white leading-[0.9] tracking-[-3px] mb-6">
              Experience & <br/> Education
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto font-body font-light">
              My professional journey, academic background, and continuous learning path.
            </p>
          </motion.div>
        </div>

        {/* Timeline Layout */}
        <div className="max-w-4xl mx-auto relative">

          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/0 via-white/20 to-white/0 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {(experiences as Experience[]).map((item, index) => {
              const isEven = index % 2 === 0
              // Support both naming conventions from the JSON or type mapping
              const role = item.role || item.title;
              const company = item.company || item.organization;
              const technologies = item.technologies || item.skillsUsed;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6 }}
                  className={cn(
                    "relative flex flex-col md:flex-row gap-8 md:gap-0",
                    isEven ? "md:flex-row-reverse" : ""
                  )}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-black border-2 border-white/20 transform -translate-x-1/2 flex items-center justify-center z-10 hidden md:flex">
                    <div className="w-2 h-2 rounded-full bg-white/80" />
                  </div>

                  {/* Content Card - liquid glass style */}
                  <div className={cn(
                    "md:w-1/2 flex flex-col pl-12 md:pl-0",
                    isEven ? "md:pr-16" : "md:pl-16"
                  )}>
                    <div className="liquid-glass rounded-[1.25rem] p-6 md:p-8 border border-white/5 hover:border-white/20 transition-colors group">

                      {/* Card Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 liquid-glass rounded-[0.75rem] flex items-center justify-center border border-white/10 text-white/90">
                            {getTypeIcon(item.type)}
                          </div>
                          <div>
                            <div className="text-sm font-body text-white/50 mb-1 flex items-center gap-2">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatPeriod(item.period)}
                            </div>
                            <div className="text-sm font-body text-white/50 flex items-center gap-2">
                              {item.type !== 'certification' && item.location && (
                                <>
                                  <MapPin className="w-3.5 h-3.5" />
                                  {item.location}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div>
                        <h3 className="font-heading italic text-3xl md:text-4xl text-white tracking-tight leading-none mb-2 group-hover:text-white/90 transition-colors">
                          {role}
                        </h3>
                        <div className="text-lg text-white/80 font-body mb-6">
                          {company}
                        </div>

                        <div className="text-sm text-white/70 font-body font-light leading-relaxed mb-6">
                          {Array.isArray(item.description)
                            ? item.description.map((desc: string, i: number) => (
                                <p key={i} className={i > 0 ? "mt-2" : ""}>{desc}</p>
                              ))
                            : <p>{formatDescription(item.description)}</p>
                          }
                        </div>

                        {/* Achievements */}
                        {item.achievements && item.achievements.length > 0 && (
                          <div className="mb-6">
                            <ul className="space-y-2">
                              {item.achievements.map((achievement: string, i: number) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-white/70 font-body font-light">
                                  <ArrowUpRight className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Technologies */}
                        {technologies && technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                            {technologies.map((tech: string) => (
                              <span key={tech} className="liquid-glass px-3 py-1 rounded-full text-[11px] text-white/80 font-body border border-white/5">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
