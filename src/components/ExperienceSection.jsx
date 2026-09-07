/* 04_Component_Spec.md §6 — ExperienceSection */
/* Soft Modern: separated experience categories with 21st.dev-inspired tabs */
/* Accessibility: semantic tabs, visible focus states, reduced-motion fallback */

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Award,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Code2,
  GraduationCap,
  MapPin,
  Sparkles,
  Users,
  ArrowUpRight,
} from "lucide-react";
import SectionWrapper from "./ui/SectionWrapper";
import Tag from "./ui/Tag";
import { fadeInUp, motionConfig } from "../styles/motion";
import { orgExperience, workHistory, certifications, education } from "../data/experience";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const TABS = [
  { id: "work", label: "IT Work Experience", icon: BriefcaseBusiness },
  { id: "leadership", label: "Leadership", icon: Users },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "certifications", label: "Certs & Bootcamp", icon: Award },
];

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.5 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!hasIntersected) return undefined;
    if (shouldReduceMotion) {
      setCount(target);
      return undefined;
    }

    let frameId;
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 1200, 1);
      setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * target));
      if (progress < 1) frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [hasIntersected, shouldReduceMotion, target]);

  return (
    <span ref={ref} className="text-3xl lg:text-4xl font-extrabold text-accent-primary tabular-nums font-sans tracking-tight">
      {count}{suffix}
    </span>
  );
}

function PanelShell({ eyebrow, title, description, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: motionConfig.duration.normal, ease: motionConfig.ease.entrance }}
      className="space-y-6"
    >
      <div className="pb-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-primary mb-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
          {eyebrow}
        </p>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-heading tracking-[-0.03em] mb-2">
          {title}
        </h3>
        <p className="text-sm md:text-base text-text-body max-w-2xl leading-relaxed">
          {description}
        </p>
      </div>
      {children}
    </motion.div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-3xl border border-white/10 bg-[#141412] shadow-2xl shadow-black/40 ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ icon: Icon, label, period, current = false }) {
  return (
    <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
      <div className="flex items-center gap-3 min-w-0">
        <div className="p-2.5 rounded-2xl bg-accent-soft text-accent-primary shrink-0 border border-accent-primary/20">
          <Icon size={19} strokeWidth={2} />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-primary truncate">
          {label}
        </p>
      </div>
      <span className="inline-flex items-center gap-2 shrink-0 text-xs font-medium text-white/60 bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/10">
        {current && <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" aria-hidden="true" />}
        {period}
      </span>
    </div>
  );
}

function WorkPanel() {
  return (
    <PanelShell
      eyebrow="Professional Experience"
      title="IT Work & Engineering"
      description="Hands-on engineering centered on production web architecture, digital operations, and shipping LLM-assisted tools."
    >
      <div className="space-y-6">
        {workHistory.map((job, index) => (
          <Card
            key={job.id}
            className={`p-6 sm:p-8 md:p-10 transition-all duration-300 hover:border-white/20 ${
              job.current
                ? "border-accent-primary/30 bg-gradient-to-br from-accent-soft/20 via-[#141412] to-[#141412] relative overflow-hidden"
                : ""
            }`}
          >
            {job.current && (
              <div
                className="absolute top-0 right-0 w-72 h-72 bg-accent-primary/[0.06] rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
              />
            )}

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-[#0d0d0c] border border-white/15 text-accent-primary shrink-0 shadow-lg">
                  {job.current ? <Code2 size={24} strokeWidth={2} /> : <BriefcaseBusiness size={24} strokeWidth={2} />}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                    <h4 className="text-xl sm:text-2xl font-extrabold text-text-heading">
                      {job.role}
                    </h4>
                    {job.current && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-soft text-accent-primary text-[11px] font-bold uppercase tracking-wider border border-accent-primary/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                        Current Role
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-accent-primary flex items-center gap-2">
                    {job.org}
                    <span className="text-white/60 font-normal">· Makassar, Indonesia</span>
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-2 text-xs font-medium text-white/60 bg-white/[0.03] px-3.5 py-1.5 rounded-full border border-white/10 md:pt-1.5">
                <CalendarDays size={14} className="text-accent-primary" /> {job.period}
              </span>
            </div>

            <p className="text-sm sm:text-base text-text-body leading-relaxed md:ml-[76px] max-w-3xl">
              {job.note}
            </p>

            {index === 0 && (
              <div className="mt-6 md:ml-[76px] pt-6 border-t border-white/10 flex flex-wrap gap-2">
                <Tag>Enterprise Logistics</Tag>
                <Tag>Full-Stack Architecture</Tag>
                <Tag>Applied AI &amp; Automation</Tag>
                <Tag>Cross-departmental Workflow</Tag>
              </div>
            )}
          </Card>
        ))}
      </div>
    </PanelShell>
  );
}

function LeadershipPanel() {
  const metrics = [
    ["Corporate Sponsors", 6, "+"],
    ["Seminar Attendees", 300, "+"],
    ["Inaugurasi Attendees", 800, "+"],
    ["Bootcamp Completion", 100, "%"],
  ];

  return (
    <PanelShell
      eyebrow="Organizational Leadership"
      title={orgExperience.role}
      description="Program coordination, team leadership, cross-departmental operations, and execution of large-scale technology events."
    >
      <Card className="p-6 sm:p-8 md:p-10">
        <CardHeader icon={Users} label={orgExperience.org} period={orgExperience.period} current />
        <p className="text-text-body text-sm sm:text-base leading-relaxed mt-6 max-w-3xl">
          {orgExperience.description}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/10">
          {metrics.map(([label, value, suffix]) => (
            <div key={label} className="p-4 sm:p-5 rounded-2xl bg-[#0d0d0c]/80 border border-white/10">
              <AnimatedCounter target={value} suffix={suffix} />
              <p className="text-xs text-white/60 mt-1.5 font-medium leading-tight">{label}</p>
            </div>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
          {orgExperience.achievements.map((achievement) => (
            <div key={achievement.text} className="rounded-2xl bg-[#0d0d0c]/60 border border-white/5 p-4 sm:p-5">
              <CheckCircle2 size={18} className="text-accent-primary mb-3" />
              <p className="text-sm text-text-body leading-relaxed">{achievement.detail || achievement.text}</p>
            </div>
          ))}
        </div>
      </Card>
    </PanelShell>
  );
}

function EducationPanel() {
  return (
    <PanelShell
      eyebrow="Academic Foundation"
      title={education.degree}
      description="Rigorous coursework in algorithms, distributed systems, human-computer interaction, and applied artificial intelligence."
    >
      <Card className="p-6 sm:p-8 md:p-10">
        <CardHeader icon={GraduationCap} label={education.institution} period={education.period} />
        <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-8 mt-8">
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-accent-soft/40 via-[#0d0d0c] to-[#0d0d0c] border border-accent-primary/25">
              <p className="text-xs uppercase tracking-wider font-bold text-accent-primary mb-2">
                Current Standing
              </p>
              <p className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">GPA 3.49</p>
              <p className="text-xs text-white/60 mt-1.5">
                {education.status.split("|")[0].trim()} · 4.00 Scale
              </p>
            </div>
            <p className="flex items-center gap-2 text-sm text-white/70">
              <MapPin size={16} className="text-accent-primary" />
              {education.location}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider font-bold text-accent-primary mb-4">
              Selected Core Coursework
            </p>
            <div className="flex flex-wrap gap-2">
              {education.coursework.map((course) => <Tag key={course}>{course}</Tag>)}
            </div>
          </div>
        </div>
      </Card>
    </PanelShell>
  );
}

function CertificationPanel() {
  return (
    <PanelShell
      eyebrow="Continuous Learning"
      title="Certifications &amp; Bootcamps"
      description="Specialized programs extending foundational computing into applied AI, data engineering, and cloud deployment."
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {certifications.map((cert) => (
          <Card
            key={cert.id}
            className="p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-1.5 hover:border-white/25 transition-all duration-300"
          >
            <div>
              <CardHeader icon={Award} label={cert.issuer} period={cert.period} />
              <h4 className="text-lg font-bold text-text-heading leading-snug mt-6 mb-3">
                {cert.title}
              </h4>
              <p className="text-sm text-text-body leading-relaxed">
                {cert.description}
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-accent-primary">
              <span className="flex items-center gap-1.5">
                <Sparkles size={14} /> Applied Track
              </span>
              <ArrowUpRight size={15} />
            </div>
          </Card>
        ))}
      </div>
    </PanelShell>
  );
}

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState("work");
  const tabListId = useId();
  const shouldReduceMotion = useReducedMotion();
  const activePanelId = `${tabListId}-${activeTab}-panel`;

  const handleTabKeyDown = (event, index) => {
    const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!direction) return;
    event.preventDefault();
    const nextIndex = (index + direction + TABS.length) % TABS.length;
    setActiveTab(TABS[nextIndex].id);
    document.getElementById(`${tabListId}-${TABS[nextIndex].id}`)?.focus();
  };

  const renderPanel = () => {
    if (activeTab === "work") return <WorkPanel />;
    if (activeTab === "leadership") return <LeadershipPanel />;
    if (activeTab === "education") return <EducationPanel />;
    if (activeTab === "certifications") return <CertificationPanel />;
    return <WorkPanel />;
  };

  return (
    <SectionWrapper id="experience">
      <motion.div variants={fadeInUp} className="mb-10 lg:mb-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-accent-primary bg-accent-soft rounded-full border border-accent-primary/20">
            <Sparkles size={13} className="text-accent-primary" />
            Trajectory // 03
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-white/70 hidden sm:inline-block">
            Professional &amp; Academic Journey
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-text-heading mb-3">
          Experience &amp; Growth
        </h2>
        <p className="text-text-body max-w-2xl text-sm md:text-base leading-relaxed">
          The engineering roles, organizational leadership, and academic path shaping how I build software products.
        </p>
      </motion.div>

      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Experience categories"
        className="flex w-full overflow-x-auto p-1.5 mb-10 rounded-2xl bg-[#141412] border border-white/10 gap-1.5 scrollbar-none shadow-xl shadow-black/40"
      >
        {TABS.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`${tabListId}-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tabListId}-${tab.id}-panel`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className="relative inline-flex min-w-max flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-xs sm:text-sm font-semibold text-white/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50 transition-colors"
            >
              {isActive && (
                <motion.span
                  layoutId="experience-active-tab"
                  transition={shouldReduceMotion ? { duration: 0 } : motionConfig.spring.gentle}
                  className="absolute inset-0 rounded-xl bg-[#0d0d0c] shadow-lg shadow-black/50 border border-white/15"
                />
              )}
              <Icon
                size={16}
                strokeWidth={2}
                className={`relative z-10 ${isActive ? "text-accent-primary" : "text-white/60"}`}
              />
              <span className={`relative z-10 ${isActive ? "text-white" : ""}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={activePanelId}
        role="tabpanel"
        aria-labelledby={`${tabListId}-${activeTab}`}
        tabIndex={0}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/40 rounded-3xl"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={activeTab}>{renderPanel()}</motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
