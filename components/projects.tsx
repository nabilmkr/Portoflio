'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Filter, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import ProjectCard from './project-card'
import { getAllProjects, getAllCategories, searchProjects } from '@/lib/projects'
import { ProjectCategory } from '@/lib/types/project'

export default function Projects() {
  const projects = getAllProjects()
  const categories = getAllCategories()
  
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    let result = selectedCategory === 'all'
      ? projects
      : projects.filter(project => project.category === selectedCategory)

    if (searchQuery.trim()) {
      const searchResults = searchProjects(searchQuery)
      result = result.filter(project =>
        searchResults.some(p => p.id === project.id)
      )
    }

    return result
  }, [selectedCategory, searchQuery, projects])

  return (
    <section id="projects" className="section-spacing bg-black content-visibility-auto" aria-labelledby="projects-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="text-sm font-body text-white/80 mb-6 uppercase tracking-widest">{/* Projects */}</div>
          <h2 id="projects-heading" className="text-5xl md:text-7xl lg:text-[6rem] font-heading italic text-white leading-[0.9] tracking-[-3px] mb-6">
            Featured <br/> Work
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto font-body font-light">
            Explore my recent work showcasing modern web development practices and innovative solutions.
          </p>
        </motion.div>

        {/* Search & Filters in a liquid glass container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16 liquid-glass rounded-[2rem] p-6 max-w-4xl mx-auto border border-white/5"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all duration-200"
                aria-label="Search projects"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
              <Filter className="h-4 w-4 text-white/50 mr-2 hidden md:block" />

              <button
                onClick={() => setSelectedCategory('all')}
                className={cn(
                  'px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300',
                  selectedCategory === 'all'
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/5'
                )}
                aria-label="Show all projects"
                aria-pressed={selectedCategory === 'all'}
              >
                All
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    'px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300',
                    selectedCategory === category
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/5'
                  )}
                  aria-label={`Filter projects by ${category}`}
                  aria-pressed={selectedCategory === category}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Project Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="region"
          aria-label="Projects list"
          aria-live="polite"
          aria-atomic="false"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 liquid-glass rounded-2xl border border-white/5 mt-8"
          >
            <p className="text-lg text-white/60">
              {searchQuery
                ? `No projects found matching "${searchQuery}". Try a different search.`
                : 'No projects found in the selected category.'}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
