/* 04_Component_Spec.md §3 — ProjectCard */
/* White Editorial Canvas (High-Contrast Clean Exhibition) */

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import Tag from "./ui/Tag";
import ShinyText from "./reactbits/ShinyText";
import SpotlightCard from "./reactbits/SpotlightCard";
import Magnet from "./reactbits/Magnet";

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
      className={`group relative rounded-3xl border border-[#e3e1d8] hover:border-[#111110]/40 bg-white text-[#111110] transition-all duration-400 ease-out overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_55px_rgba(0,0,0,0.11),0_4px_16px_rgba(0,0,0,0.05)] hover:-translate-y-1.5 h-full flex ${
        isFeatured ? "flex-col lg:flex-row" : "flex-col"
      } focus-within:ring-2 focus-within:ring-[#111110]/70 ${isInteractive ? "cursor-pointer" : ""}`}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={isInteractive ? `Open details for ${title}` : undefined}
    >
      <SpotlightCard
        className={`h-full w-full flex ${isFeatured ? "flex-col lg:flex-row" : "flex-col"}`}
        spotlightColor="rgba(232, 97, 58, 0.05)"
        borderColor="rgba(17, 17, 16, 0.18)"
      >
        {/* Thumbnail Area */}
        <div
          className={`relative overflow-hidden bg-[#0d0d0c] ${
            isFeatured
              ? "w-full lg:w-3/5 min-h-[260px] lg:min-h-[380px] border-b lg:border-b-0 lg:border-r border-[#e3e1d8]"
              : "w-full aspect-video border-b border-[#e3e1d8]"
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
            <div className="w-full h-full flex items-center justify-center bg-[#141412] p-6">
              <span className="text-white font-semibold text-lg">
                {title}
              </span>
            </div>
          )}

          {/* Featured pill badge */}
          {isFeatured && (
            <div className="absolute top-4 left-4 z-20">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#111110]/90 backdrop-blur-md border border-white/30 rounded-full text-xs font-mono font-bold text-white shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                <Sparkles size={13} className="text-white shrink-0" />
                <ShinyText text="FEATURED // 01" className="text-white font-mono font-bold" />
              </span>
            </div>
          )}

          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />
          <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-all duration-300 translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
            <div className="inline-block rounded-xl bg-[#111110] text-white px-4 py-2 text-xs font-black uppercase tracking-wider shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
              {isFeatured ? "Read full case study ↗" : "Read case study ↗"}
            </div>
          </div>
        </div>

        {/* Content Area on Pure White Ground */}
        <div
          className={`flex flex-col justify-between ${
            isFeatured ? "w-full lg:w-2/5 p-6 lg:p-8" : "w-full p-6"
          } gap-6 h-full bg-white`}
        >
          <div>
            {subtitle && (
              <p className="text-xs text-[#e8613a] font-mono font-bold uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8613a]" aria-hidden="true" />
                {subtitle}
              </p>
            )}

            <h3
              className={`font-black text-[#0a0a0a] tracking-tight mb-3 ${
                isFeatured ? "text-2xl lg:text-3xl" : "text-xl"
              }`}
            >
              {title}
            </h3>

            <p className="text-[#42403b] text-sm leading-relaxed mb-4">
              {focusDescription}
            </p>

            {highlights && highlights.length > 0 && (
              <ul className="space-y-1.5 mb-5">
                {highlights.map((h, i) => (
                  <li key={i} className="text-[#4e4c46] text-xs sm:text-sm flex gap-2 leading-relaxed font-sans">
                    <span className="text-[#e8613a] font-bold shrink-0">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
              {techTags.map((tag) => (
                <Tag
                  key={tag}
                  className="bg-[#f2f0e8] text-[#1c1b18] font-mono text-[11px] font-bold border border-[#dedcd2] hover:bg-[#111110] hover:text-white hover:border-[#111110] transition-all duration-200"
                >
                  {tag}
                </Tag>
              ))}
            </div>

            {isInteractive && (
              <p className="lg:hidden text-xs text-[#7a7870] font-mono mt-2 flex items-center gap-1">
                <span>↗</span> Tap card for deep-dive case study
              </p>
            )}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-3 pt-4 border-t border-black/[0.08]">
            {demoUrl && (
              <Magnet padding={20} magnetStrength={3.5}>
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider bg-[#111110] text-white hover:bg-black shadow-sm transition-all duration-300"
                  aria-label={`View ${title} live demo`}
                >
                  <ExternalLink size={13} strokeWidth={2.5} />
                  Demo
                </a>
              </Magnet>
            )}
            <Magnet padding={20} magnetStrength={3.5}>
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider border border-black/25 text-[#111110] hover:border-black hover:bg-black/5 transition-all duration-300"
                aria-label={`View ${title} source code on GitHub`}
              >
                <Github size={13} strokeWidth={2.5} />
                Code
              </a>
            </Magnet>
          </div>
        </div>
      </SpotlightCard>
    </motion.article>
  );
}