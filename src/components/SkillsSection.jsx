/* 04_Component_Spec.md §5 — SkillsSection */
/* Bento card grid — clean rounded cards, category icon/accent, structured tag clouds */
/* Animation: fade-in per card with stagger */

import { motion, useReducedMotion } from "framer-motion";
import { Code2, Layout, Database, Cpu, Cloud, Wrench, Sparkles, Terminal } from "lucide-react";
import SectionWrapper from "./ui/SectionWrapper";
import { fadeInUp, staggerContainer } from "../styles/motion";
import Tag from "./ui/Tag";
import skills from "../data/skills";

const CATEGORY_ICONS = {
  "Languages": Code2,
  "Frontend": Layout,
  "Backend & Database": Database,
  "AI & Machine Learning": Cpu,
  "Cloud & DevOps": Cloud,
  "Tools & Workflow": Wrench,
};

const CATEGORY_SUBTITLES = {
  "Languages": "Core syntax & scripting",
  "Frontend": "Modern responsive interfaces",
  "Backend & Database": "APIs, auth & data modeling",
  "AI & Machine Learning": "Applied CV, NLP & embeddings",
  "Cloud & DevOps": "Deployment & automated CI/CD",
  "Tools & Workflow": "Productivity & team tooling",
};

export default function SkillsSection() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : fadeInUp;

  const itemVariants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : fadeInUp;

  const staggerVariants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : staggerContainer;

  return (
    <SectionWrapper id="skills">
      <motion.div variants={containerVariants} className="mb-10 lg:mb-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-accent-primary bg-accent-soft rounded-full border border-accent-primary/20">
            <Sparkles size={13} className="text-accent-primary" />
            Capabilities // 02
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-white/70 hidden sm:inline-block">
            Production &amp; Applied AI
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-text-heading mb-3">
          Tech Stack &amp; Skills
        </h2>
        <p className="text-text-body max-w-2xl text-sm md:text-base leading-relaxed">
          Tested frameworks, modern databases, and machine learning pipelines used to build resilient software and applied AI tools.
        </p>
      </motion.div>

      {/* Bento grid layout */}
      <motion.div
        variants={staggerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
      >
        {skills.map((group) => {
          const IconComponent = CATEGORY_ICONS[group.category] || Code2;
          const isWide = group.id === "ai-dl-nlp";
          const subtitle = CATEGORY_SUBTITLES[group.category];

          return (
            <motion.div
              key={group.id}
              variants={itemVariants}
              className={`group relative rounded-3xl border border-white/10 bg-[#141412] p-6 sm:p-7 shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-black/60 hover:border-white/25 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                isWide ? "md:col-span-2 lg:col-span-2" : "col-span-1"
              }`}
            >
              {/* Subtle accent highlight on hover */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-accent-primary/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-accent-soft text-accent-primary shrink-0 border border-accent-primary/20">
                      <IconComponent size={18} strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-text-heading group-hover:text-white transition-colors">
                        {group.category}
                      </h3>
                      {subtitle && (
                        <p className="text-xs text-white/70 mt-0.5">
                          {subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {isWide ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent-soft text-[10px] font-bold uppercase tracking-wider text-accent-primary border border-accent-primary/30 shrink-0">
                      <Terminal size={12} />
                      Core Emphasis
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-white/65 tabular-nums shrink-0">
                      {group.items.length} items
                    </span>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </div>

              {/* Bottom micro-metadata */}
              <div className="relative z-10 mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-white/60">
                <span>Verified in production / lab</span>
                <span className="group-hover:text-accent-primary transition-colors">↗</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
