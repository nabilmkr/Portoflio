/* 04_Component_Spec.md §5 — SkillsSection */
/* Props: skillGroups array */
/* Soft Modern: Bento card grid — clean rounded cards, category icon/accent, structured tag clouds */
/* Animation: fade-in per card with stagger */

import { motion, useReducedMotion } from "framer-motion";
import { Code2, Layout, Database, Cpu, Cloud, Wrench } from "lucide-react";
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
      <motion.div variants={containerVariants} className="mb-12">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-primary mb-2 block">
          CAPABILITIES
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-heading mb-3">
          Tech Stack &amp; Skills
        </h2>
        <p className="text-text-body max-w-2xl text-sm md:text-base">
          Core technical competencies, frameworks, and modern tools across full-stack engineering and applied AI.
        </p>
      </motion.div>

      {/* Bento grid layout */}
      <motion.div
        variants={staggerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {skills.map((group) => {
          const IconComponent = CATEGORY_ICONS[group.category] || Code2;
          const isWide = group.id === "ai-dl-nlp";

          return (
            <motion.div
              key={group.id}
              variants={itemVariants}
              className={`rounded-2xl border border-border bg-bg-surface p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-accent-primary/50 transition-all duration-300 flex flex-col justify-between ${
                isWide ? "md:col-span-2 lg:col-span-2" : "col-span-1"
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-xl bg-accent-soft text-accent-primary shrink-0">
                    <IconComponent size={18} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-text-heading">
                      {group.category}
                    </h3>
                    <p className="text-xs text-text-body/60">
                      {group.items.length} tools &amp; libraries
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}