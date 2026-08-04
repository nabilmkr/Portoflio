/* 04_Component_Spec.md §4 — ProjectsSection */
/* Props: projects array (4 items) */

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./ui/SectionWrapper";
import ProjectCard from "./ProjectCard";
import CaseStudyPanel from "./CaseStudyPanel";
import { fadeInUp, staggerContainer } from "../styles/motion";
import projects from "../data/projects";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);

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

  return (
    <SectionWrapper id="projects" className="bg-bg-primary">
      <motion.div variants={fadeInUp} className="w-full mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-accent-secondary mb-2 block">
          SELECTED WORK
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-heading mb-3">
          Selected Projects
        </h2>
        <p className="text-text-body max-w-2xl text-sm md:text-base">
          A curated selection of projects showcasing full-stack development and applied AI integration.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} onOpen={openProject} />
        ))}
      </motion.div>

      <CaseStudyPanel
        projectId={selectedProject?.id}
        open={Boolean(selectedProject)}
        onClose={closeProject}
      />
    </SectionWrapper>
  );
}

