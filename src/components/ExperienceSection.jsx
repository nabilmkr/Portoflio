/* 04_Component_Spec.md §6 — ExperienceSection */
/* Props: orgExperience, workHistory[] */
/* Responsive: timeline stacked vertical all breakpoints */
/* Animation: numeric counter increments on scroll-into-view (one-time trigger) */

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Users, Award, GraduationCap, Briefcase } from "lucide-react";
import SectionWrapper from "./ui/SectionWrapper";
import { fadeInUp } from "../styles/motion";
import { orgExperience, workHistory, certifications, education } from "../data/experience";
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

      {/* Certifications & Education Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Certifications (takes 2 cols on lg) */}
        <motion.div
          variants={fadeInUp}
          className="lg:col-span-2 rounded-2xl border border-white/5 bg-bg-surface p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-accent-primary/10 shrink-0">
              <Award size={20} strokeWidth={1.5} className="text-accent-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-heading">
                Certifications &amp; Bootcamps
              </h3>
              <p className="text-xs text-text-body">Verified credentials &amp; specialization tracks</p>
            </div>
          </div>

          <div className="space-y-4">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-4 rounded-xl bg-bg-primary/70 border border-white/5 hover:border-accent-primary/30 transition-colors duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <h4 className="text-sm font-semibold text-text-heading">
                    {cert.title}
                  </h4>
                  <span className="text-xs text-accent-secondary shrink-0 font-medium">
                    {cert.period}
                  </span>
                </div>
                <p className="text-xs text-accent-primary/90 font-medium mb-1.5">
                  {cert.issuer}
                </p>
                <p className="text-xs text-text-body leading-relaxed">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education (takes 1 col on lg) */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-white/5 bg-bg-surface p-6 md:p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-accent-secondary/10 shrink-0">
                <GraduationCap size={20} strokeWidth={1.5} className="text-accent-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-heading">
                  Education
                </h3>
                <p className="text-xs text-text-body">Academic background</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-text-heading">
                  {education.institution}
                </h4>
                <p className="text-xs text-accent-primary mt-0.5">
                  {education.degree}
                </p>
                <p className="text-xs text-text-body mt-1">
                  {education.period} • {education.location}
                </p>
              </div>

              <div className="inline-block px-3 py-1.5 rounded-lg bg-bg-primary border border-white/5 text-xs text-accent-secondary font-medium">
                {education.status}
              </div>

              <div className="pt-3 border-t border-white/5">
                <p className="text-xs text-text-body uppercase tracking-wider mb-2 font-medium">
                  Coursework
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {education.coursework.map((course) => (
                    <span
                      key={course}
                      className="px-2.5 py-1 text-xs text-text-body bg-bg-primary rounded-md border border-white/5"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Work History */}
      <motion.div variants={fadeInUp} className="mt-8 rounded-2xl border border-white/5 bg-bg-surface p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-white/5 shrink-0">
            <Briefcase size={20} strokeWidth={1.5} className="text-text-body" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-heading">
              Additional Work Experience
            </h3>
            <p className="text-xs text-text-body">Operational and administrative roles</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workHistory.map((job) => (
            <div
              key={job.id}
              className="p-4 rounded-xl bg-bg-primary/70 border border-white/5 hover:border-accent-secondary/30 transition-colors duration-300"
            >
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <h4 className="text-sm font-semibold text-text-heading">
                  {job.role}
                </h4>
                <span className="text-xs text-text-body bg-bg-surface border border-white/5 px-2 py-0.5 rounded-full">
                  {job.period}
                </span>
              </div>
              <p className="text-xs text-accent-secondary font-medium mb-2">
                {job.org}
              </p>
              <p className="text-xs text-text-body leading-relaxed">
                {job.note}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
