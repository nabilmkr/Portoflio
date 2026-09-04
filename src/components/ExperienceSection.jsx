/* 04_Component_Spec.md §6 — ExperienceSection */
/* Spec: Vertical timeline — alternating left-right on desktop, single column mobile */
/* Date on one side, detail on the other side — no center collision */
/* Animation: slideInLeft/slideInRight per entry, numeric counter on scroll */

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Users, Award, GraduationCap, Briefcase } from "lucide-react";
import SectionWrapper from "./ui/SectionWrapper";
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from "../styles/motion";
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
    <span ref={ref} className="text-2xl lg:text-3xl font-bold text-accent-primary tabular-nums">
      {count}{suffix}
    </span>
  );
}

function TimelineItem({ icon: Icon, iconBg, title, org, period, description, highlights, metrics, index }) {
  const shouldReduceMotion = useReducedMotion();
  const isEven = index % 2 === 0;

  const entryVariants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : isEven ? slideInLeft : slideInRight;

  return (
    <motion.div
      variants={entryVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="relative flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0"
    >
      {/* Mobile: Timeline line & node on the left */}
      <div className="lg:hidden absolute left-3 top-4 bottom-0 w-px bg-border" aria-hidden="true" />
      <div className="lg:hidden absolute left-1.5 top-3 w-3.5 h-3.5 rounded-full bg-accent-primary border-2 border-bg-primary z-10" aria-hidden="true" />

      {/* Desktop Left Side */}
      <div className={`w-full lg:w-1/2 ${isEven ? "lg:pr-14" : "lg:pl-14 lg:order-2"}`}>
        {/* Mobile Date Header */}
        <div className="lg:hidden pl-8 mb-2">
          <span className="inline-block px-3 py-1 bg-bg-surface border border-border rounded-full text-xs font-semibold text-accent-primary">
            {period}
          </span>
        </div>

        {/* Content Card */}
        <div className="p-6 md:p-7 rounded-2xl border border-border bg-bg-surface shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-accent-primary/40 transition-colors duration-300 ml-6 lg:ml-0">
          <div className="flex items-start gap-4">
            <div className={`p-2.5 rounded-xl ${iconBg} shrink-0`}>
              <Icon size={20} strokeWidth={1.75} className="text-accent-primary" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-text-heading leading-snug">{title}</h3>
              <p className="text-sm text-accent-primary font-medium mt-0.5">{org}</p>
            </div>
          </div>

          <p className="text-text-body text-sm leading-relaxed mt-4">{description}</p>

          {metrics && Object.keys(metrics).length > 0 && (
            <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-border/70">
              {Object.entries(metrics).map(([key, value]) => (
                <div key={key} className="p-3 rounded-xl bg-bg-primary border border-border/50 text-center">
                  <AnimatedCounter target={value} suffix={key.includes("Completion") ? "%" : "+"} />
                  <p className="text-text-body text-xs mt-1 font-medium leading-tight">
                    {key}
                  </p>
                </div>
              ))}
            </div>
          )}

          {highlights && highlights.length > 0 && (
            <ul className="space-y-2 mt-4 pt-4 border-t border-border/70">
              {highlights.map((achievement, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-text-body leading-relaxed">
                  <span className="text-accent-primary font-bold mt-0.5 shrink-0">•</span>
                  <span>{achievement.detail || achievement.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Desktop Center Node */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-7 w-5 h-5 rounded-full bg-bg-primary border-2 border-accent-primary items-center justify-center z-20">
        <div className="w-2 h-2 rounded-full bg-accent-primary" />
      </div>

      {/* Desktop Opposite Side: Date badge & metadata */}
      <div
        className={`hidden lg:flex w-1/2 items-center ${
          isEven
            ? "lg:pl-14 lg:justify-start"
            : "lg:pr-14 lg:justify-end lg:order-1"
        }`}
      >
        <div className={`space-y-1 ${isEven ? "text-left" : "text-right"}`}>
          <span className="inline-block px-3.5 py-1.5 bg-bg-surface border border-border rounded-full text-xs font-semibold text-text-heading shadow-xs">
            {period}
          </span>
          <p className="text-xs text-text-body/70 uppercase tracking-widest font-mono pt-1">
            {org}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const allEntries = [
    {
      type: "org",
      icon: Users,
      iconBg: "bg-accent-soft",
      title: orgExperience.role,
      org: orgExperience.org,
      period: orgExperience.period,
      description: orgExperience.description,
      highlights: orgExperience.achievements,
      metrics: {
        "Corporate Sponsors": 6,
        "Seminar Attendees": 300,
        "Inaugurasi Attendees": 800,
        "Bootcamp Completion": 100,
      },
    },
    ...certifications.map((cert) => ({
      type: "cert",
      icon: Award,
      iconBg: "bg-accent-soft",
      title: cert.title,
      org: cert.issuer,
      period: cert.period,
      description: cert.description,
      highlights: [],
      metrics: null,
    })),
    {
      type: "education",
      icon: GraduationCap,
      iconBg: "bg-accent-soft",
      title: education.degree,
      org: education.institution,
      period: education.period,
      description: `Academic status: ${education.status}. Key Coursework: ${education.coursework.join(", ")}.`,
      highlights: [],
      metrics: null,
    },
    ...workHistory.map((job) => ({
      type: "work",
      icon: Briefcase,
      iconBg: "bg-accent-soft",
      title: job.role,
      org: job.org,
      period: job.period,
      description: job.note,
      highlights: [],
      metrics: null,
    })),
  ];

  return (
    <SectionWrapper id="experience">
      <motion.div variants={fadeInUp} className="mb-12">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-primary mb-2 block">
          JOURNEY &amp; LEADERSHIP
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-heading mb-3">
          Experience &amp; Leadership
        </h2>
        <p className="text-text-body max-w-2xl text-sm md:text-base">
          Organizational leadership, technical apprenticeships, and academic foundation.
        </p>
      </motion.div>

      {/* Vertical Timeline */}
      <div className="relative">
        {/* Center line for desktop */}
        <div
          className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px bg-border"
          aria-hidden="true"
        />

        <motion.div
          variants={staggerContainer}
          className="space-y-10 lg:space-y-16"
        >
          {allEntries.map((entry, index) => (
            <TimelineItem
              key={`${entry.type}-${index}`}
              {...entry}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}