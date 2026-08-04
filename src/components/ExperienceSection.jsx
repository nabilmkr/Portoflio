/* 04_Component_Spec.md §6 — ExperienceSection */
/* Props: orgExperience, workHistory[] */
/* Responsive: timeline stacked vertical all breakpoints */
/* Animation: numeric counter increments on scroll-into-view (one-time trigger) */

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Users } from "lucide-react";
import SectionWrapper from "./ui/SectionWrapper";
import { fadeInUp } from "../styles/motion";
import { orgExperience, workHistory } from "../data/experience";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.5 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!hasIntersected) return;
    if (shouldReduceMotion) {
      setCount(target);
      return;
    }

    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [hasIntersected, target, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-bold text-accent-primary tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience">
      <motion.div variants={fadeInUp}>
        <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-2">
          Experience &amp; Leadership
        </h2>
        <p className="text-text-body mb-10 max-w-2xl">
          Leadership roles and professional experience that shaped my collaborative and strategic skills.
        </p>
      </motion.div>

      {/* Organization Experience — main highlight */}
      <motion.div
        variants={fadeInUp}
        className="rounded-2xl border border-white/5 bg-bg-surface p-6 md:p-8 mb-8"
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="p-2 rounded-lg bg-accent-primary/10 shrink-0">
            <Users size={24} strokeWidth={1.5} className="text-accent-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-text-heading">
              {orgExperience.role}
            </h3>
            <p className="text-accent-secondary font-medium">
              {orgExperience.org}
            </p>
            <p className="text-text-body text-sm">{orgExperience.period}</p>
          </div>
        </div>

        <p className="text-text-body mb-6">{orgExperience.description}</p>

        {/* Key metrics with animated counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 rounded-xl bg-bg-primary">
            <AnimatedCounter target={6} suffix="" />
            <p className="text-text-body text-xs mt-1">Corporate Sponsors</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-bg-primary">
            <AnimatedCounter target={300} suffix="+" />
            <p className="text-text-body text-xs mt-1">Seminar Attendees</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-bg-primary">
            <AnimatedCounter target={800} suffix="+" />
            <p className="text-text-body text-xs mt-1">Inaugurasi Attendees</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-bg-primary">
            <AnimatedCounter target={100} suffix="%" />
            <p className="text-text-body text-xs mt-1">Bootcamp Completion</p>
          </div>
        </div>

        {/* Achievement details */}
        <ul className="space-y-3">
          {orgExperience.achievements.map((achievement, i) => (
            <li key={i} className="flex gap-3 text-sm text-text-body">
              <span className="text-accent-primary mt-0.5 shrink-0">•</span>
              <span>{achievement.detail || achievement.text}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Work History */}
      <motion.div variants={fadeInUp} className="mt-12">
        <h3 className="text-xl font-semibold text-text-heading mb-8">
          Additional Work Experience
        </h3>
        <div className="relative border-l border-white/5 ml-3 md:ml-4 pl-6 md:pl-8 space-y-8">
          {workHistory.map((job) => (
            <div key={job.id} className="relative group">
              {/* Timeline Dot Indicator */}
              <div className="absolute -left-[29px] md:-left-[37px] top-1.5 w-2.5 h-2.5 rounded-full border border-bg-primary bg-accent-secondary group-hover:bg-accent-primary transition-colors duration-300" />
              
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                <div>
                  <h4 className="text-text-heading font-semibold text-base group-hover:text-accent-primary transition-colors duration-300">
                    {job.role}
                  </h4>
                  <p className="text-accent-secondary font-medium text-sm">
                    {job.org}
                  </p>
                </div>
                <div className="text-text-body text-xs bg-bg-surface border border-white/5 px-2.5 py-1 rounded-full self-start md:self-auto">
                  {job.period}
                </div>
              </div>
              <p className="text-text-body text-sm mt-3 leading-relaxed max-w-2xl">
                {job.note}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
