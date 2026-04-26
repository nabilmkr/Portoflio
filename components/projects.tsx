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
    <section id="projects" className="section-spacing bg-gradient-to-b from-background to-secondary/10 content-visibility-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my recent work showcasing modern web development practices and innovative solutions.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects by name, description, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                'w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background',
                'text-foreground placeholder:text-muted-foreground',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                'transition-all duration-200'
              )}
              aria-label="Search projects"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <div className="flex items-center gap-2 mb-4 w-full justify-center">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filter by category:</span>
          </div>
          
          {/* All button */}
          <button
            onClick={() => setSelectedCategory('all')}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
              selectedCategory === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-accent text-accent-foreground hover:bg-accent/80'
            )}
            aria-label="Show all projects"
            aria-pressed={selectedCategory === 'all'}
          >
            All
          </button>

          {/* Category buttons */}
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-accent text-accent-foreground hover:bg-accent/80'
              )}
              aria-label={`Filter projects by ${category}`}
              aria-pressed={selectedCategory === category}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <div className="grid-responsive-3 gap-responsive-lg">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-lg text-muted-foreground">
              {searchQuery
                ? `No projects found matching "${searchQuery}". Try a different search!`
                : 'No projects found in the selected category. Try another filter!'}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}