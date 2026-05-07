'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, X, ChevronLeft, ChevronRight, Folder } from 'lucide-react'
import { Project } from '@/lib/types/project'

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

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onClick={() => setIsModalOpen(true)}
        className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col border border-white/5 cursor-pointer group hover:scale-[1.02] transition-transform duration-300"
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsModalOpen(true)
          }
        }}
      >
        {/* Top Row: Icon & Tags */}
        <div className="flex items-start justify-between gap-4 mb-auto">
          {/* Left Icon container */}
          <div className="w-11 h-11 liquid-glass rounded-[0.75rem] flex items-center justify-center border border-white/10 shrink-0">
            <Folder className="h-5 w-5 text-white/80 group-hover:text-white transition-colors" />
          </div>

          {/* Right Tags */}
          <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap border border-white/5">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="liquid-glass rounded-full px-2 py-1 text-[11px] text-white/70 font-body whitespace-nowrap border border-white/5">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Middle Spacer */}
        <div className="flex-1 min-h-[4rem]" />

        {/* Bottom Content */}
        <div className="mt-6">
          <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px] leading-none mb-3 group-hover:text-white/90 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-white/70 font-body font-light leading-snug line-clamp-3">
            {project.description}
          </p>
        </div>
      </motion.div>

      {/* Modal - Keeps liquid glass theme */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto liquid-glass-strong rounded-[2rem] border border-white/10 flex flex-col md:flex-row shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby={`modal-title-${project.id}`}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 liquid-glass rounded-full text-white/80 hover:text-white transition-colors border border-white/10"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Image Gallery */}
              <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[400px] bg-black/50">
                <Image
                  src={project.images[currentImageIndex].url}
                  alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {project.images.length > 1 && (
                  <div className="absolute inset-x-0 bottom-4 flex justify-center gap-4 px-4">
                    <button
                      onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                      className="liquid-glass p-2 rounded-full text-white border border-white/20 hover:bg-white/10 transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                      className="liquid-glass p-2 rounded-full text-white border border-white/20 hover:bg-white/10 transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col">
                <h2 id={`modal-title-${project.id}`} className="font-heading italic text-4xl md:text-5xl text-white mb-6 tracking-tight">
                  {project.title}
                </h2>

                <div className="prose prose-invert prose-sm font-body font-light text-white/80 mb-8 max-w-none">
                  {project.description.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-4 last:mb-0 leading-relaxed">{paragraph}</p>
                  ))}
                </div>

                <div className="mb-8">
                  <h4 className="text-sm font-medium text-white mb-3 uppercase tracking-wider">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="liquid-glass px-3 py-1.5 rounded-full text-xs text-white/90 border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex gap-4 pt-6 border-t border-white/10">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 liquid-glass-strong rounded-full px-6 py-3 flex items-center justify-center gap-2 text-sm font-medium text-white hover:scale-105 transition-transform"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Site
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 liquid-glass rounded-full px-6 py-3 flex items-center justify-center gap-2 text-sm font-medium text-white border border-white/10 hover:bg-white/5 transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      Source
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
