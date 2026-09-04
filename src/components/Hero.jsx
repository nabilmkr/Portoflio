/* 04_Component_Spec.md §2 — Hero */
/* 10_Motion_Interaction_Spec.md §9 — Hero Scroll Transition (Tier 2)
 *   portrait: scale 1.00→0.88, y 0→-60px
 *   content: opacity 1→0, y 0→-24px
 * Uses GSAP ScrollTrigger (registered in App.jsx)
 *
 * Soft Modern: Single column centered layout, responsive display typography */

import { motion, useReducedMotion } from "framer-motion";
import { Download, Mail, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./ui/Button";
import { motionConfig, staggerContainer, fadeInUp, heroPortrait } from "../styles/motion";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  /* Refs for GSAP scroll animation */
  const heroRef = useRef(null);
  const portraitWrapRef = useRef(null);
  const textWrapRef = useRef(null);

  /* 10_Motion_Interaction_Spec.md §9 — Hero Scroll Transition */
  useEffect(() => {
    if (shouldReduceMotion || !heroRef.current) return;

    /* Portrait: scale 1.00→0.88, y 0→-60px */
    if (portraitWrapRef.current) {
      gsap.to(portraitWrapRef.current, {
        scale: 0.88,
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    /* Content: opacity 1→0, y 0→-24px */
    if (textWrapRef.current) {
      gsap.to(textWrapRef.current, {
        opacity: 0,
        y: -24,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars?.trigger === heroRef.current) t.kill();
      });
    };
  }, [shouldReduceMotion]);

  const itemVariants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : fadeInUp;

  const portraitVariants = shouldReduceMotion
    ? itemVariants
    : {
        ...heroPortrait,
        visible: {
          ...heroPortrait.visible,
          transition: {
            duration: motionConfig.duration.moderate,
            ease: motionConfig.ease.entrance,
            delay: 0.35,
          },
        },
      };

  const delayedFadeInUp = (delay = 0) =>
    shouldReduceMotion
      ? itemVariants
      : {
          hidden: { opacity: 0, y: 24 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: motionConfig.duration.normal,
              ease: motionConfig.ease.entrance,
              delay,
            },
          },
        };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col items-center justify-center pt-24 pb-16 lg:pt-28 lg:pb-20 overflow-hidden"
    >
      {/* Hero background — CSS gradient mesh */}
      <div className="absolute inset-0 hero-grain" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 w-full z-10">
        {/* Single column centered layout */}
        <div className="flex flex-col items-center text-center">

          {/* Text & Primary info container (linked to GSAP textWrapRef) */}
          <div ref={textWrapRef} className="flex flex-col items-center w-full">
            {/* Availability badge */}
            <motion.div variants={delayedFadeInUp(0.1)} className="mb-5 sm:mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-accent-primary bg-accent-soft rounded-full border border-accent-primary/20 shadow-xs">
                <span className="w-1.5 h-1.5 bg-accent-primary rounded-full animate-pulse" aria-hidden="true" />
                Open to Full-time Internship — Aug–Dec 2026
              </span>
            </motion.div>

            {/* Name — responsive huge display typography */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-text-heading tracking-[-0.04em] leading-[0.98] mb-4 sm:mb-6">
              <span className="inline-block overflow-hidden mr-2 sm:mr-3">
                <motion.span
                  variants={{
                    hidden: { y: "110%" },
                    visible: {
                      y: 0,
                      transition: {
                        ...motionConfig.spring.gentle,
                        delay: 0.2,
                      },
                    },
                  }}
                  className="inline-block"
                >
                  nabil
                </motion.span>
              </span>
              <span className="inline-block overflow-hidden">
                <motion.span
                  variants={{
                    hidden: { y: "110%" },
                    visible: {
                      y: 0,
                      transition: {
                        ...motionConfig.spring.gentle,
                        delay: 0.25,
                      },
                    },
                  }}
                  className="inline-block"
                >
                  makarim
                </motion.span>
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              variants={delayedFadeInUp(0.35)}
              className="text-base sm:text-xl lg:text-2xl text-text-body font-normal max-w-2xl leading-relaxed mb-6 sm:mb-8"
            >
              Software Developer Intern <span className="text-accent-primary/60 px-1">•</span> Full-Stack Web <span className="text-accent-primary/60 px-1">•</span> Applied AI
            </motion.p>
          </div>

          {/* Portrait accent — compact rounded square */}
          <div
            ref={portraitWrapRef}
            className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mb-6 sm:mb-8"
          >
            <motion.div
              variants={portraitVariants}
              initial="hidden"
              animate="visible"
              className="w-full h-full"
            >
              <div className="w-full h-full relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-border hover:border-accent-primary transition-colors duration-500 shadow-md">
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
                    className="w-full h-full object-cover object-top"
                  />
                </picture>
              </div>
            </motion.div>
          </div>

          {/* Bio & Location & CTAs */}
          <div className="flex flex-col items-center max-w-xl">
            <motion.p
              variants={delayedFadeInUp(0.45)}
              className="text-text-body text-sm sm:text-base leading-relaxed mb-4 text-center"
            >
              Diploma IV student in Informatics and Computer Engineering, building
              production-grade AI and full-stack applications — from AI-powered
              financial tracking to real-time skill-gap analysis platforms.
            </motion.p>

            <motion.p
              variants={delayedFadeInUp(0.5)}
              className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-text-body/80 mb-7"
            >
              <MapPin size={15} strokeWidth={1.75} className="text-accent-primary" aria-hidden="true" />
              Makassar, Indonesia
            </motion.p>

            <motion.div
              variants={delayedFadeInUp(0.55)}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
            >
              <Button
                as="a"
                href="/resume/resume.pdf"
                download
                variant="primary"
                className="shadow-sm"
              >
                <Download size={16} strokeWidth={1.75} />
                Download Resume
              </Button>
              <Button as="a" href="#contact" variant="secondary">
                <Mail size={16} strokeWidth={1.75} />
                Contact Me
              </Button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}