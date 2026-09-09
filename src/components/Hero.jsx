/* 04_Component_Spec.md §2 — Hero */
/* Redesigned into an Interactive Asymmetric Bento Grid */

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Download,
  Mail,
  Sparkles,
  Code2,
} from "lucide-react";
import { staggerContainer, fadeInUp } from "../styles/motion";
import Waves from "./reactbits/Waves";
import DecryptedText from "./reactbits/DecryptedText";
import ShinyText from "./reactbits/ShinyText";
import SpotlightCard from "./reactbits/SpotlightCard";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : staggerContainer;

  const itemVariants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : fadeInUp;

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 lg:pt-28 lg:pb-20 overflow-hidden"
    >
      {/* Interactive Perlin noise waves background */}
      <Waves
        lineColor="rgba(232, 97, 58, 0.35)"
        backgroundColor="transparent"
        waveSpeedX={0.018}
        waveSpeedY={0.008}
        waveAmpX={42}
        waveAmpY={24}
        xGap={15}
        yGap={32}
        friction={0.92}
        tension={0.007}
        maxCursorMove={140}
      />

      {/* Ambient warm gradient glow overlay */}
      <div className="absolute inset-0 hero-grain pointer-events-none z-[1]" aria-hidden="true" />

      {/* Seamless bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d0d0c] via-[#0d0d0c]/70 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
        {/* Editorial 2-Column Split */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
        >
          {/* Hero Left Column: Editorial Headline, Mission & Verified Metrics (7 cols on desktop) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 rounded-3xl border border-white/10 bg-[#141412] shadow-2xl shadow-black/40 hover:border-white/20 transition-all duration-500 overflow-hidden"
          >
            <SpotlightCard
              className="h-full p-6 sm:p-8 lg:p-10 flex flex-col justify-between"
              spotlightColor="rgba(232, 97, 58, 0.12)"
              borderColor="rgba(232, 97, 58, 0.35)"
            >
              <div>
                {/* Status Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8 pb-4 border-b border-white/10">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-semibold text-accent-primary bg-accent-soft rounded-full border border-accent-primary/20">
                    <span className="w-1.5 h-1.5 bg-accent-primary rounded-full animate-pulse" aria-hidden="true" />
                    <ShinyText text="Open to Full-time Internship · 2026" className="text-accent-primary" />
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/70 font-medium">
                    Makassar, Indonesia
                  </span>
                </div>

                {/* Identity & Eyebrow */}
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-accent-primary mb-3 flex flex-wrap items-center gap-2">
                  <Sparkles size={14} className="text-accent-primary shrink-0" />
                  <span className="text-white/80">Nabil Makarim ·</span>
                  <DecryptedText
                    text="Informatics Engineer · Full-Stack & Applied AI"
                    animateOn="view"
                    speed={35}
                    maxIterations={12}
                    className="text-accent-primary font-mono tracking-normal"
                    encryptedClassName="text-white/50 font-mono tracking-normal"
                  />
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-text-heading leading-[1.08] mb-4 sm:mb-6">
                  Building useful software for complex ideas.
                </h1>

                {/* Bio Statement */}
                <p className="text-sm sm:text-base lg:text-lg text-text-body font-normal leading-relaxed max-w-2xl mb-6">
                  Informatics Engineering student building production-grade web systems and applied AI — turning
                  real-world problems into clear, resilient digital products.
                </p>

                {/* Verified Metrics Ribbon */}
                <div className="grid grid-cols-3 gap-3 sm:gap-6 py-4 my-6 border-y border-white/10">
                  <div>
                    <span className="block text-2xl sm:text-3xl font-extrabold text-white tracking-tight">4</span>
                    <span className="text-[11px] text-white/60 block mt-0.5 font-medium">Featured Systems</span>
                  </div>
                  <div className="border-l border-white/10 pl-3 sm:pl-6">
                    <span className="block text-2xl sm:text-3xl font-extrabold text-white tracking-tight">300+</span>
                    <span className="text-[11px] text-white/60 block mt-0.5 font-medium">Seminar Attendees</span>
                  </div>
                  <div className="border-l border-white/10 pl-3 sm:pl-6">
                    <span className="block text-2xl sm:text-3xl font-extrabold text-accent-primary tracking-tight">3.49</span>
                    <span className="text-[11px] text-white/60 block mt-0.5 font-medium">GPA · D4 Informatics</span>
                  </div>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-4 border-t border-white/10">
                <a
                  href="#projects"
                  onClick={(e) => scrollToSection(e, "#projects")}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-accent-primary text-white hover:bg-accent-primary/90 transition-all duration-300 shadow-md shadow-accent-primary/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Explore Projects
                  <ArrowUpRight size={16} />
                </a>

                <a
                  href="/resume/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium border border-white/15 bg-white/[0.02] text-text-heading hover:border-white/40 hover:bg-white/[0.05] transition-all duration-300 active:scale-[0.98]"
                >
                  <Download size={16} />
                  Download Resume
                </a>

                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "#contact")}
                  className="inline-flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium text-text-body hover:text-accent-primary transition-colors duration-300 sm:ml-auto"
                >
                  <Mail size={15} />
                  Contact Me
                </a>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Hero Right Column: Editorial Portrait Card (5 cols on desktop) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 group relative rounded-3xl border border-white/10 bg-[#141412] overflow-hidden shadow-2xl shadow-black/50 hover:border-white/25 transition-all duration-500 flex flex-col justify-between"
          >
            {/* Editorial Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 text-[11px] font-medium tracking-[0.22em] text-white/70 bg-[#171715]/90 backdrop-blur-sm uppercase z-10">
              <span className="flex items-center gap-2 text-white/80">
                <Code2 size={14} className="text-accent-primary" />
                Editorial Portrait / 01
              </span>
              <span className="flex items-center gap-1.5 text-white/70">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                Makassar, ID
              </span>
            </div>

            {/* Portrait Canvas */}
            <div className="relative aspect-[4/4.7] sm:aspect-[4/4.2] lg:aspect-auto lg:flex-1 w-full overflow-hidden bg-[#0d0d0c] min-h-[340px]">
              <picture>
                <source srcSet="/images/hero-portrait.avif" type="image/avif" />
                <source srcSet="/images/hero-portrait.webp" type="image/webp" />
                <img
                  src="/images/hero-portrait.png"
                  alt="Nabil Makarim portrait"
                  width={500}
                  height={600}
                  decoding="async"
                  loading="eager"
                  className="w-full h-full object-cover object-top filter grayscale contrast-[1.18] brightness-[0.88] transition-all duration-700 ease-out group-hover:grayscale-[0.25] group-hover:brightness-95 group-hover:scale-[1.02]"
                />
              </picture>

              {/* Duotone warm gradient overlays */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141412] via-[#141412]/30 to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[#e8613a]/[0.08] mix-blend-color"
              />

              {/* Metadata Stamp */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-block rounded-full border border-white/15 bg-[#0d0d0c]/70 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-white/70 backdrop-blur-md">
                  RAW / 35MM TONE
                </span>
              </div>

              {/* Floating Trajectory Card at Bottom */}
              <div className="absolute bottom-4 left-4 right-4 z-10 rounded-2xl border border-white/15 bg-[#0d0d0c]/85 p-4 shadow-xl backdrop-blur-md">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent-primary">
                        Current Trajectory
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-text-heading">
                      Software Engineer Intern · Kalla Transport &amp; Logistik
                    </p>
                    <p className="text-xs text-white/70 mt-0.5">
                      Full-stack architecture &amp; applied AI systems
                    </p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 block">Focus</span>
                    <span className="text-xs text-white/80 font-medium">Web &amp; LLM</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
