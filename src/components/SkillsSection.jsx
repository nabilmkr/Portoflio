/* 04_Component_Spec.md §5 — SkillsSection */
/* Props: skillGroups array */
/* Responsive: 1-col base, 2-col md, grouped card per category from lg */
/* Animation: optional light fade-in on scroll */

import { motion } from "framer-motion";
import SectionWrapper from "./ui/SectionWrapper";
import { fadeInUp } from "../styles/motion";
import skills from "../data/skills";

export default function SkillsSection() {
  return (
    <SectionWrapper id="skills">
      <motion.div variants={fadeInUp}>
        <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-2">
          Tech Stack &amp; Skills
        </h2>
        <p className="text-text-body mb-10 max-w-2xl">
          Technologies and tools I work with across the full development lifecycle.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {skills.map((group) => (
          <motion.div
            key={group.id}
            variants={fadeInUp}
            className="rounded-2xl border border-white/5 hover:border-accent-primary/20 bg-bg-surface p-6 transition-all duration-500 ease-out"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-accent-primary border-b border-white/5 pb-3 mb-4">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="inline-block px-3.5 py-2 text-xs font-medium text-text-body bg-bg-primary border border-white/5 rounded-lg tracking-wide hover:border-accent-secondary/30 hover:text-text-heading transition-all duration-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
