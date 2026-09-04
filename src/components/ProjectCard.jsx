/* 04_Component_Spec.md §3 — ProjectCard */
/* Props: title, focusDescription, techTags, demoUrl?, repoUrl, isFeatured? */
/* Animation: clipReveal entrance on scroll-into-view */
/* 05_Tech_Spec.md §6a — Image error fallback: solid bg-surface + title text */
/* Soft Modern: Horizontal split bento for featured item on desktop, lift + shadow hover */

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import Tag from "./ui/Tag";
import { clipReveal } from "../styles/motion";

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
  isFeatured = false,
}) {
  const [imgError, setImgError] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isInteractive = typeof onOpen === "function";

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

  return (
    <motion.article
      layout={isInteractive}
      layoutId={isInteractive ? `project-card-${id}` : undefined}
      variants={clipReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`group relative rounded-2xl border border-border hover:border-accent-primary bg-bg-surface transition-all duration-500 ease-out overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 h-full flex ${
        isFeatured ? "flex-col lg:flex-row" : "flex-col"
      } focus-within:ring-2 focus-within:ring-accent-primary/20 ${isInteractive ? "cursor-pointer" : ""}`}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={isInteractive ? `Open details for ${title}` : undefined}
    >
      {/* Thumbnail Area */}
      <div
        className={`relative overflow-hidden bg-bg-surface ${
          isFeatured
            ? "w-full lg:w-3/5 min-h-[260px] lg:min-h-[380px] border-b lg:border-b-0 lg:border-r border-border"
            : "w-full aspect-video border-b border-border"
        }`}
      >
        {!imgError ? (
          <motion.img
            layout={isInteractive}
            layoutId={isInteractive ? `project-image-${id}` : undefined}
            src={thumbnail}
            alt={`${title} project thumbnail`}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02] group-focus-within:scale-[1.02]"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-bg-surface p-6">
            <span className="text-text-heading font-semibold text-lg">
              {title}
            </span>
          </div>
        )}

        {/* Featured pill badge */}
        {isFeatured && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-bg-primary/95 backdrop-blur border border-border rounded-full text-xs font-semibold text-accent-primary shadow-xs">
              <Sparkles size={13} className="text-accent-primary" />
              Featured Project
            </span>
          </div>
        )}

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-all duration-300 translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <div className="inline-block rounded-xl bg-bg-primary/95 backdrop-blur px-3.5 py-1.5 text-xs font-medium text-text-heading border border-border shadow-sm">
            {isFeatured ? "Read full case study ↗" : "Read case study ↗"}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div
        className={`flex flex-col justify-between ${
          isFeatured ? "w-full lg:w-2/5 p-6 lg:p-8" : "w-full p-6"
        } gap-6 h-full`}
      >
        <div>
          {subtitle && (
            <p className="text-xs text-accent-primary font-semibold uppercase tracking-wider mb-2">
              {subtitle}
            </p>
          )}

          <h3
            className={`font-bold text-text-heading mb-3 ${
              isFeatured ? "text-2xl lg:text-3xl" : "text-xl"
            }`}
          >
            {title}
          </h3>

          <p className="text-text-body text-sm leading-relaxed mb-4">
            {focusDescription}
          </p>

          {highlights && highlights.length > 0 && (
            <ul className="space-y-1.5 mb-5">
              {highlights.map((h, i) => (
                <li key={i} className="text-text-body text-xs sm:text-sm flex gap-2 leading-relaxed">
                  <span className="text-accent-primary font-bold shrink-0">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
            {techTags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          {isInteractive && (
            <p className="lg:hidden text-xs text-text-body/60 mt-2 flex items-center gap-1">
              <span>↗</span> Tap card for deep-dive case study
            </p>
          )}
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-4 pt-4 border-t border-border/70">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-text-heading hover:text-accent-primary transition-colors duration-300"
              aria-label={`View ${title} live demo`}
            >
              <ExternalLink size={15} strokeWidth={1.75} />
              Live Demo
            </a>
          )}
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-text-heading hover:text-accent-primary transition-colors duration-300"
            aria-label={`View ${title} source code on GitHub`}
          >
            <Github size={15} strokeWidth={1.75} />
            Source Code
          </a>
        </div>
      </div>
    </motion.article>
  );
}