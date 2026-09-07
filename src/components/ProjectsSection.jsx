/* 04_Component_Spec.md §4 — ProjectsSection */
/* Props: projects array (4 items) — first project featured full-width, rest 2-col bento */
/* Animation: clipReveal entrance per card with stagger */

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionWrapper from "./ui/SectionWrapper";
import ProjectCard from "./ProjectCard";
import CaseStudyPanel from "./CaseStudyPanel";
import { fadeInUp, staggerContainer } from "../styles/motion";
import projects from "../data/projects";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  /* Pass project id from card, find full object in projects array */
  const openProject = useCallback((projectId) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) setSelectedProject(project);
  }, []);

  const closeProject = useCallback(() => {
    setSelectedProject(null);
  }, []);

  useEffect(() => {
    if (!selectedProject) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeProject();
      }
    };

    window.addEventListener("keydown", handleEscape);
    document.body.classList.add("overflow-hidden");

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.classList.remove("overflow-hidden");
    };
  }, [selectedProject, closeProject]);

  if (!projects || projects.length === 0) return null;

  const [featuredProject, ...restProjects] = projects;

  const containerVariants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : fadeInUp;

  const staggerVariants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : staggerContainer;

  const cardVariants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : fadeInUp;

  return (
    <SectionWrapper id="projects" className="bg-bg-primary">
      <motion.div variants={containerVariants} className="w-full mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-accent-primary mb-2 block">
          SELECTED WORK
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-heading mb-3">
          Selected Projects
        </h2>
        <p className="text-text-body max-w-2xl text-sm md:text-base">
          A curated selection of projects showcasing full-stack development and applied AI integration.
        </p>
      </motion.div>

      {/* Bento layout: first project full-width featured, rest 2-col */}
      <motion.div
        variants={staggerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
      >
        {/* Featured project — full width on desktop */}
        {featuredProject && (
          <motion.div
            layout
            layoutId={`project-featured-${featuredProject.id}`}
            variants={cardVariants}
            className="lg:col-span-2"
          >
            <ProjectCard {...featuredProject} onOpen={openProject} isFeatured />
          </motion.div>
        )}

        {/* Rest projects — 2-col grid */}
        <motion.div
          variants={staggerVariants}
          className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {restProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              layoutId={`project-${project.id}`}
              variants={cardVariants}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <ProjectCard {...project} onOpen={openProject} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <CaseStudyPanel
        projectId={selectedProject?.id}
        open={Boolean(selectedProject)}
        onClose={closeProject}
      />
    </SectionWrapper>
  );
}