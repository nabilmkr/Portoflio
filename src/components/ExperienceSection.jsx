/* 04_Component_Spec.md §6 — ExperienceSection */
/* White Editorial Canvas (High-Contrast Clean Exhibition) */

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
import Waves from "./reactbits/Waves";
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
    <span ref={ref} className="text-3xl lg:text-4xl font-extrabold text-[#e8613a] tabular-nums font-sans tracking-tight">
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
        <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#e8613a] mb-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e8613a]" />
          {eyebrow}
        </p>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#0a0a0a] tracking-tight mb-2">
          {title}
        </h3>
        <p className="text-sm md:text-base text-[#525049] max-w-2xl leading-relaxed">
          {description}
        </p>
      </div>
      {children}
    </motion.div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-3xl border border-[#e3e1d8] bg-white text-[#111110] shadow-[0_4px_24px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.09)] transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ icon: Icon, label, period, current = false }) {
  return (
    <div className="flex items-start justify-between gap-4 pb-4 border-b border-black/[0.08]">
      <div className="flex items-center gap-3 min-w-0">
        <div className="p-2.5 rounded-2xl bg-[#eceae3] text-[#e8613a] shrink-0 border border-[#dedcd2]">
          <Icon size={19} strokeWidth={2} />
        </div>
        <p className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-[#e8613a] truncate">
          {label}
        </p>
      </div>
      <span className="inline-flex items-center gap-2 shrink-0 text-xs font-mono font-medium text-[#5e5c54] bg-[#f2f0e8] px-3 py-1.5 rounded-full border border-[#dedcd2]">
        {current && <span className="w-1.5 h-1.5 rounded-full bg-[#e8613a] animate-pulse" aria-hidden="true" />}
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
            className={`p-6 sm:p-8 md:p-10 transition-all duration-300 hover:border-[#111110]/30 ${
              job.current
                ? "border-[#e8613a]/30 bg-gradient-to-br from-[#e8613a]/[0.04] via-white to-white relative overflow-hidden"
                : ""
            }`}
          >
            {job.current && (
              <div
                className="absolute top-0 right-0 w-72 h-72 bg-[#e8613a]/[0.05] rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
              />
            )}

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-[#eceae3] border border-[#dedcd2] text-[#e8613a] shrink-0 shadow-sm">
                  {job.current ? <Code2 size={24} strokeWidth={2} /> : <BriefcaseBusiness size={24} strokeWidth={2} />}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                    <h4 className="text-xl sm:text-2xl font-black text-[#0a0a0a]">
                      {job.role}
                    </h4>
                    {job.current && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111110] text-[#e8613a] text-[11px] font-mono font-bold uppercase tracking-wider shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e8613a] animate-pulse" />
                        Current Role
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-[#e8613a] flex items-center gap-2">
                    {job.org}
                    <span className="text-[#5e5c54] font-normal">· Makassar, Indonesia</span>
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#5e5c54] bg-[#f2f0e8] px-3.5 py-1.5 rounded-full border border-[#dedcd2] md:pt-1.5 self-start">
                <CalendarDays size={14} className="text-[#e8613a]" /> {job.period}
              </span>
            </div>

            <p className="text-sm sm:text-base text-[#42403b] leading-relaxed md:ml-[76px] max-w-3xl">
              {job.note}
            </p>

            {index === 0 && (
              <div className="mt-6 md:ml-[76px] pt-6 border-t border-black/[0.08] flex flex-wrap gap-2">
                <Tag className="bg-[#f2f0e8] text-[#1c1b18] font-mono text-[11px] font-bold border border-[#dedcd2]">Enterprise Logistics</Tag>
                <Tag className="bg-[#f2f0e8] text-[#1c1b18] font-mono text-[11px] font-bold border border-[#dedcd2]">Full-Stack Architecture</Tag>
                <Tag className="bg-[#f2f0e8] text-[#1c1b18] font-mono text-[11px] font-bold border border-[#dedcd2]">Applied AI &amp; Automation</Tag>
                <Tag className="bg-[#f2f0e8] text-[#1c1b18] font-mono text-[11px] font-bold border border-[#dedcd2]">Cross-departmental Workflow</Tag>
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
        <p className="text-[#42403b] text-sm sm:text-base leading-relaxed mt-6 max-w-3xl">
          {orgExperience.description}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-black/[0.08]">
          {metrics.map(([label, value, suffix]) => (
            <div key={label} className="p-4 sm:p-5 rounded-2xl bg-[#f8f8f6] border border-[#e3e1d8]">
              <AnimatedCounter target={value} suffix={suffix} />
              <p className="text-xs text-[#5e5c54] mt-1.5 font-medium leading-tight">{label}</p>
            </div>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-black/[0.08]">
          {orgExperience.achievements.map((achievement) => (
            <div key={achievement.text} className="rounded-2xl bg-[#f8f8f6] border border-[#e3e1d8] p-4 sm:p-5">
              <CheckCircle2 size={18} className="text-[#e8613a] mb-3" />
              <p className="text-sm text-[#42403b] leading-relaxed">{achievement.detail || achievement.text}</p>
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
            <div className="p-6 rounded-2xl bg-[#f2f0e8] border border-[#dedcd2]">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#e8613a] mb-2">
                Current Standing
              </p>
              <p className="text-3xl sm:text-4xl font-black text-[#0a0a0a] font-sans tracking-tight">GPA 3.49</p>
              <p className="text-xs text-[#5e5c54] mt-1.5 font-mono">
                {education.status.split("|")[0].trim()} · 4.00 Scale
              </p>
            </div>
            <p className="flex items-center gap-2 text-sm text-[#525049] font-medium">
              <MapPin size={16} className="text-[#e8613a]" />
              {education.location}
            </p>
          </div>
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#e8613a] mb-4">
              Selected Core Coursework
            </p>
            <div className="flex flex-wrap gap-2">
              {education.coursework.map((course) => (
                <Tag key={course} className="bg-[#f2f0e8] text-[#1c1b18] font-mono text-[11px] font-bold border border-[#dedcd2]">
                  {course}
                </Tag>
              ))}
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
            className="p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-1.5 hover:border-[#111110]/30 transition-all duration-300"
          >
            <div>
              <CardHeader icon={Award} label={cert.issuer} period={cert.period} />
              <h4 className="text-lg font-bold text-[#0a0a0a] leading-snug mt-6 mb-3">
                {cert.title}
              </h4>
              <p className="text-sm text-[#42403b] leading-relaxed">
                {cert.description}
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-black/[0.08] flex items-center justify-between text-xs font-mono font-bold text-[#e8613a]">
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
    <SectionWrapper
      id="experience"
      className="bg-[#f8f8f6] text-[#111110] relative overflow-hidden py-16 sm:py-24"
    >
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

      {/* Subtle ambient warm radial wash */}
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(232,97,58,0.03),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <motion.div variants={fadeInUp} className="mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-[0.22em] text-white bg-[#111110] rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
              <Sparkles size={13} className="text-[#e8613a]" />
              Trajectory // 03
            </span>
            <span className="text-xs uppercase tracking-[0.22em] text-[#73716a] font-mono font-bold hidden sm:inline-block">
              Professional &amp; Academic Journey
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[-0.04em] text-[#0a0a0a] leading-[1.08] mb-3">
            Experience &amp; Growth
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#525049] font-normal leading-relaxed max-w-2xl mt-3">
            The engineering roles, organizational leadership, and academic path shaping how I build software products.
          </p>
        </motion.div>

        {/* Tab bar */}
        <div
          role="tablist"
          aria-label="Experience categories"
          className="flex w-full overflow-x-auto p-1.5 mb-10 rounded-2xl bg-[#eceae3] border border-[#dedcd2] gap-1.5 scrollbar-none shadow-sm"
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
                className={`relative inline-flex min-w-max flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "text-white font-bold"
                    : "text-[#5e5c54] hover:text-[#111110] hover:bg-black/[0.04]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="experience-active-tab"
                    transition={shouldReduceMotion ? { duration: 0 } : motionConfig.spring.gentle}
                    className="absolute inset-0 rounded-xl bg-[#111110] shadow-[0_4px_14px_rgba(0,0,0,0.22)]"
                  />
                )}
                <Icon
                  size={16}
                  strokeWidth={2}
                  className={`relative z-10 ${isActive ? "text-[#e8613a]" : "text-[#5e5c54]"}`}
                />
                <span className="relative z-10">
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
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8613a]/40 rounded-3xl"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={activeTab}>{renderPanel()}</motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}
