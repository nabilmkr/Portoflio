/* 04_Component_Spec.md §5 — SkillsSection */
/* White Editorial Canvas (High-Contrast Clean Exhibition) */

import { motion, useReducedMotion } from "framer-motion";
import { Code2, Layout, Database, Cpu, Cloud, Wrench, Sparkles, Terminal } from "lucide-react";
import SectionWrapper from "./ui/SectionWrapper";
import { fadeInUp, staggerContainer } from "../styles/motion";
import Tag from "./ui/Tag";
import skills from "../data/skills";
import SpotlightCard from "./reactbits/SpotlightCard";
import ShinyText from "./reactbits/ShinyText";
import Waves from "./reactbits/Waves";

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
    <SectionWrapper id="skills" className="bg-[#f8f8f6] text-[#111110] relative overflow-hidden py-16 sm:py-24">
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

      {/* Subtle Ambient Radial Wash */}
      <div
        className="pointer-events-none absolute top-1/2 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(232,97,58,0.03),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <motion.div variants={containerVariants} className="mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-[0.22em] text-white bg-[#111110] rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
              <Sparkles size={13} className="text-[#e8613a]" />
              Capabilities // 02
            </span>
            <span className="text-xs uppercase tracking-[0.22em] text-[#73716a] font-mono font-bold hidden sm:inline-block">
              Production &amp; Applied AI
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[-0.04em] text-[#0a0a0a] leading-[1.08] mb-3">
            Tech Stack &amp; Skills
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#525049] font-normal leading-relaxed max-w-2xl mt-3">
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
                className={`group relative rounded-3xl border border-[#e3e1d8] bg-white text-[#111110] shadow-[0_4px_24px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_55px_rgba(0,0,0,0.11),0_4px_16px_rgba(0,0,0,0.05)] hover:border-[#111110]/40 transition-all duration-300 overflow-hidden ${
                  isWide ? "md:col-span-2 lg:col-span-2" : "col-span-1"
                }`}
              >
                <SpotlightCard
                  className="h-full p-6 sm:p-7 flex flex-col justify-between"
                  spotlightColor="rgba(232, 97, 58, 0.05)"
                  borderColor="rgba(17, 17, 16, 0.18)"
                >
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-6 pb-4 border-b border-black/[0.08]">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-2xl bg-[#eceae3] text-[#e8613a] shrink-0 border border-[#dedcd2]">
                          <IconComponent size={18} strokeWidth={2} />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-[#0a0a0a] group-hover:text-black transition-colors">
                            {group.category}
                          </h3>
                          {subtitle && (
                            <p className="text-xs text-[#5e5c54] mt-0.5">
                              {subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      {isWide ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111110] text-[10px] font-mono font-bold uppercase tracking-wider text-white shadow-sm shrink-0">
                          <Terminal size={12} className="text-[#e8613a]" />
                          <ShinyText text="Core Emphasis" className="text-white font-mono font-bold" />
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono font-semibold text-[#5e5c54] tabular-nums shrink-0">
                          {group.items.length} items
                        </span>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <Tag
                          key={item}
                          className="bg-[#f2f0e8] text-[#1c1b18] font-mono text-[11px] font-bold border border-[#dedcd2] hover:bg-[#111110] hover:text-white hover:border-[#111110] transition-all duration-200"
                        >
                          {item}
                        </Tag>
                      ))}
                    </div>
                  </div>

                  {/* Bottom micro-metadata */}
                  <div className="relative z-10 mt-6 pt-4 border-t border-black/[0.08] flex items-center justify-between text-[11px] text-[#73716a]">
                    <span>Verified in production / lab</span>
                    <span className="group-hover:text-[#e8613a] transition-colors font-bold">↗</span>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
