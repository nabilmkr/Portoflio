/* 04_Component_Spec.md §3 — ProjectCard */
/* Props: title, focusDescription, techTags, demoUrl?, repoUrl */
/* Animation: fade+slide-up on scroll-into-view */
/* 05_Tech_Spec.md §6a — Image error fallback: solid bg-surface + title text */
/* 02_Design_System.md §6 — Hairline border hover interaction + Gold Package 3D Tilt */

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Tag from "./ui/Tag";
import { fadeInUp } from "../styles/motion";
import { rafThrottle } from "../utils/performance";

export default function ProjectCard({
  id,
  title,
  subtitle,
  focusDescription,
  highlights,
  techTags,
  thumbnail,
  demoUrl,
  repoUrl,
  onOpen,
}) {
  const [imgError, setImgError] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const shouldReduceMotion = useReducedMotion();
  const isInteractive = typeof onOpen === "function";

  const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

  const handleCardClick = (event) => {
    if (!isInteractive) return;
    if (event.target.closest("a, button")) return;
    onOpen(id);
  };

  const handleCardKeyDown = (event) => {
    if (!isInteractive) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen(id);
    }
  };

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handlePointerMove = rafThrottle((element, clientX, clientY) => {
    if (!isInteractive || shouldReduceMotion) return;
    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left - rect.width / 2;
    const y = clientY - rect.top - rect.height / 2;
    const rotateX = clamp((-y / rect.height) * 12, -12, 12);
    const rotateY = clamp((x / rect.width) * 12, -12, 12);
    setTilt({ rotateX, rotateY });
    setMousePos({ x: clientX - rect.left, y: clientY - rect.top });
  });

  const handlePointerMoveEvent = (event) => {
    handlePointerMove(event.currentTarget, event.clientX, event.clientY);
  };

  const handlePointerLeave = () => {
    if (!isInteractive || shouldReduceMotion) return;
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.article
      layout={isInteractive}
      layoutId={isInteractive ? `project-card-${id}` : undefined}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`group relative rounded-2xl border border-white/5 hover:border-accent-primary/40 bg-bg-surface transition-all duration-500 ease-out overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_45px_rgba(0,0,0,0.35)] h-full flex flex-col focus-within:ring-2 focus-within:ring-accent-primary/20 ${isInteractive ? "cursor-pointer" : ""}`}
      style={shouldReduceMotion ? undefined : { perspective: 1200, transformStyle: "preserve-3d", transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)` }}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      onPointerMove={handlePointerMoveEvent}
      onPointerLeave={handlePointerLeave}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={isInteractive ? `Open details for ${title}` : undefined}
    >
      {/* Spotlight Hover Glow Overlay */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(197, 168, 128, 0.12), transparent 40%)`,
        }}
      />
      {/* Thumbnail */}
      <div className="relative aspect-video bg-bg-surface overflow-hidden border-b border-white/5">
        {!imgError ? (
          <motion.img
            layout={isInteractive}
            layoutId={isInteractive ? `project-image-${id}` : undefined}
            src={thumbnail}
            alt={`${title} project thumbnail`}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] group-focus-within:scale-[1.05]"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-bg-surface">
            <span className="text-text-heading font-semibold text-lg">
              {title}
            </span>
          </div>
        )}

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-all duration-300 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <div className="rounded-2xl bg-black/40 px-3 py-2 text-xs text-white backdrop-blur">
            View case study
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col justify-between gap-6 h-full">
        <div>
          {subtitle && (
            <p className="text-xs text-accent-secondary font-medium uppercase tracking-wider mb-2">
              {subtitle}
            </p>
          )}

          <h3 className="text-xl font-semibold text-text-heading mb-3">
            {title}
          </h3>

          <p className="text-text-body text-sm leading-relaxed mb-4">
            {focusDescription}
          </p>

          {highlights && highlights.length > 0 && (
            <ul className="space-y-1 mb-4">
              {highlights.map((h, i) => (
                <li key={i} className="text-text-body text-sm flex gap-2">
                  <span className="text-accent-primary mt-1 shrink-0">•</span>
                  {h}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            {techTags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          {/* Mobile touch affordance — hover-only hint tidak terlihat di touch */}
          {isInteractive && (
            <p className="md:hidden text-xs text-text-body/50 mb-2 flex items-center gap-1">
              <span aria-hidden="true">↗</span> Tap to read case study
            </p>
          )}
        </div>

        <div className="flex items-center gap-4 pt-2 border-t border-white/5">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-text-body hover:text-accent-primary transition-colors duration-300"
              aria-label={`View ${title} live demo`}
            >
              <ExternalLink size={14} strokeWidth={1.5} />
              Live Demo
            </a>
          )}
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-text-body hover:text-accent-primary transition-colors duration-300"
            aria-label={`View ${title} source code on GitHub`}
          >
            <Github size={14} strokeWidth={1.5} />
            Source Code
          </a>
        </div>
      </div>
    </motion.article>
  );
}

