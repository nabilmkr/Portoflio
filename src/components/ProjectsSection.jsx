/* 04_Component_Spec.md §4 — ProjectsSection */
/* White Editorial Canvas (High-Contrast Clean Exhibition) */

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import CaseStudyPanel from "./CaseStudyPanel";
import ClickSpark from "./reactbits/ClickSpark";
import Magnet from "./reactbits/Magnet";
import Waves from "./reactbits/Waves";
import { fadeInUp, staggerContainer } from "../styles/motion";
import projects from "../data/projects";
import { Sparkles, Layers, Cpu, Globe } from "lucide-react";

const FILTER_OPTIONS = [
  { id: "all", label: "All Systems", count: 4, icon: Layers },
  { id: "ai", label: "Applied AI & CV", count: 3, icon: Cpu },
  { id: "web", label: "Full-Stack Web", count: 1, icon: Globe },
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
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

  /* Filter logic */
  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "ai") {
      return p.id === "gap-sense" || p.id === "cuanify" || p.id === "smart-fan-control";
    }
    if (activeFilter === "web") {
      return p.id === "luxe-news";
    }
    return true;
  });

  return (
    <section id="projects" className="relative scroll-mt-16 sm:scroll-mt-24 border-t border-[#e3e1d8]">
      {/* ── Main Section Ground: Pure Warm White Canvas (#f8f8f6) with ClickSpark Interactivity ── */}
      <ClickSpark sparkColor="#e8613a" sparkSize={11} sparkRadius={22} sparkCount={9} duration={400}>
        <div className="relative bg-[#f8f8f6] text-[#111110] pt-14 sm:pt-20 pb-16 sm:pb-20 overflow-hidden">
          {/* Subtle Architectural Waves Contour Pattern */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-75" aria-hidden="true">
            <Waves
              lineColor="rgba(17, 17, 16, 0.05)"
              backgroundColor="transparent"
              waveSpeedX={0.012}
              waveSpeedY={0.005}
              waveAmpX={32}
              waveAmpY={18}
              xGap={24}
              yGap={48}
              friction={0.92}
              tension={0.007}
              maxCursorMove={120}
            />
          </div>

          {/* Subtle Architectural Warm Radial Wash */}
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(232,97,58,0.04),transparent_70%)]"
            aria-hidden="true"
          />

          {/* Ambient Corner Atmosphere */}
          <div
            className="pointer-events-none absolute bottom-10 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,0,0,0.02),transparent_60%)]"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-[0.22em] text-white bg-[#111110] rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
                    <Sparkles size={13} className="text-[#e8613a]" />
                    Editorial Canvas // White
                  </span>
                  <span className="text-xs uppercase tracking-[0.22em] text-[#73716a] font-mono font-bold hidden sm:inline-block">
                    High Contrast Exhibition
                  </span>
                </div>

                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[-0.04em] text-[#0a0a0a] leading-[1.08]">
                  Featured Works
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-[#525049] font-normal leading-relaxed max-w-2xl mt-3">
                  Real-world web platforms, computer vision engines, and practical AI implementations presented on crisp architectural cards.
                </p>
              </div>

              {/* Filter Tabs Capsule with React Bits Magnet */}
              <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#eceae3] border border-[#dedcd2] self-start md:self-auto shadow-sm">
                {FILTER_OPTIONS.map((tab) => {
                  const isActive = activeFilter === tab.id;
                  const Icon = tab.icon;
                  return (
                    <Magnet key={tab.id} padding={20} magnetStrength={3}>
                      <button
                        onClick={() => setActiveFilter(tab.id)}
                        className={`relative flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                          isActive
                            ? "text-white font-bold"
                            : "text-[#5e5c54] hover:text-[#111110] hover:bg-black/[0.04]"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeFilterPill"
                            className="absolute inset-0 rounded-xl bg-[#111110] shadow-[0_4px_14px_rgba(0,0,0,0.22)]"
                            transition={{ type: "spring", stiffness: 420, damping: 32 }}
                          />
                        )}
                        <span className="relative z-10 flex items-center gap-1.5">
                          <Icon size={14} className={isActive ? "text-[#e8613a]" : ""} />
                          <span>{tab.label}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono transition-colors ${
                              isActive
                                ? "bg-white/20 text-white font-black"
                                : "bg-black/[0.06] text-[#5e5c54]"
                            }`}
                          >
                            {tab.count}
                          </span>
                        </span>
                      </button>
                    </Magnet>
                  );
                })}
              </div>
            </div>

          {/* Asymmetric Bento Magazine Exhibition Grid */}
          <motion.div layout className="space-y-6 sm:space-y-8">
            <AnimatePresence mode="popLayout">
              {activeFilter === "all" ? (
                /* ── Full Editorial Bento Layout (All 4 Projects) ── */
                <motion.div
                  key="all-bento"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch"
                >
                  {/* Tile 1: Gap Sense (Command Center AI — Full Width 12 cols) */}
                  <div className="lg:col-span-12">
                    <ProjectCard
                      {...projects[0]}
                      onOpen={openProject}
                      isFeatured={true}
                    />
                  </div>

                  {/* Tile 2: Cuanify (FinTech Assistant — 6 cols) */}
                  <div className="lg:col-span-6">
                    <ProjectCard
                      {...projects[1]}
                      onOpen={openProject}
                      isFeatured={false}
                    />
                  </div>

                  {/* Tile 3: Luxe News (Full-Scale News Portal — 6 cols) */}
                  <div className="lg:col-span-6">
                    <ProjectCard
                      {...projects[2]}
                      onOpen={openProject}
                      isFeatured={false}
                    />
                  </div>

                  {/* Tile 4: Smart Fan CV Control (Edge Computer Vision — Full Width 12 cols) */}
                  <div className="lg:col-span-12">
                    <ProjectCard
                      {...projects[3]}
                      onOpen={openProject}
                      isFeatured={true}
                    />
                  </div>
                </motion.div>
              ) : (
                /* ── Filtered Layout (Clean Grid of matching items) ── */
                <motion.div
                  key={activeFilter}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className={`grid gap-6 sm:gap-8 ${
                    filteredProjects.length === 1
                      ? "grid-cols-1 max-w-4xl mx-auto"
                      : "grid-cols-1 lg:grid-cols-2"
                  }`}
                >
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      {...project}
                      onOpen={openProject}
                      isFeatured={filteredProjects.length === 1}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          </div>
        </div>
      </ClickSpark>

      {/* Case Study Full-Screen Modal */}
      <CaseStudyPanel
        projectId={selectedProject?.id}
        open={Boolean(selectedProject)}
        onClose={closeProject}
      />
    </section>
  );
}
