'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Project } from '@/lib/types/project'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  index?: number
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    )
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    )
  }

  const currentImage = project.images[currentImageIndex]

  return (
    <>
      {/* Project Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: (index || 0) * 0.1 }}
        whileHover={{ y: -8 }}
        className={cn(
          'group relative overflow-hidden rounded-2xl border border-border bg-card',
          'transition-all duration-300 hover:shadow-2xl hover:border-primary/50 cursor-pointer'
        )}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Project Image */}
        <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
          <Image
            src={project.images[0].url}
            alt={project.images[0].alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index === 0}
          />
          {project.featured && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
              Featured
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                aria-label={`Visit ${project.title} live site`}
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                aria-label={`View ${project.title} source code`}
              >
                <Github className="h-4 w-4" />
                Code
              </a>
            )}
          </div>
        </div>

        {/* Hover Overlay */}
        <motion.div
          initial={false}
          animate={{
            opacity: 0,
          }}
          className="absolute inset-0 bg-primary/5 pointer-events-none"
        />
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-background/95 backdrop-blur">
                <h2 id="modal-title" className="text-2xl font-bold">
                  {project.title}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Image Gallery */}
                {project.images.length > 0 && (
                  <div className="space-y-4">
                    <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg overflow-hidden">
                      <Image
                        src={currentImage.url}
                        alt={currentImage.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 600px"
                        priority
                      />
                    </div>

                    {/* Image Caption */}
                    {currentImage.caption && (
                      <p className="text-sm text-muted-foreground text-center">
                        {currentImage.caption}
                      </p>
                    )}

                    {/* Image Navigation */}
                    {project.images.length > 1 && (
                      <div className="flex items-center justify-between">
                        <button
                          onClick={handlePrevImage}
                          className="p-2 hover:bg-accent rounded-lg transition-colors"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <div className="flex gap-2">
                          {project.images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentImageIndex(idx)}
                              className={cn(
                                'h-2 rounded-full transition-all',
                                idx === currentImageIndex
                                  ? 'bg-primary w-6'
                                  : 'bg-accent w-2'
                              )}
                              aria-label={`Go to image ${idx + 1}`}
                              aria-current={idx === currentImageIndex}
                            />
                          ))}
                        </div>
                        <button
                          onClick={handleNextImage}
                          className="p-2 hover:bg-accent rounded-lg transition-colors"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">About this project</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.detailedDescription}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-accent text-accent-foreground text-sm font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                      aria-label={`Visit ${project.title} live site`}
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Live
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors font-medium"
                      aria-label={`View ${project.title} source code`}
                    >
                      <Github className="h-4 w-4" />
                      View Code
                    </a>
                  )}
                  {project.links.caseStudy && (
                    <a
                      href={project.links.caseStudy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors font-medium"
                      aria-label={`Read ${project.title} case study`}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Case Study
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
