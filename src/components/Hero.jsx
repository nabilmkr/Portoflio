/* 04_Component_Spec.md §2 — Hero */
/* 10_Motion_Interaction_Spec.md §9 — Hero Scroll Transition (Tier 2)
 *   portrait: scale 1.00→0.88, y 0→-60px
 *   content: opacity 1→0, y 0→-24px
 * Uses GSAP ScrollTrigger (registered in App.jsx) */

import { motion, useReducedMotion } from "framer-motion";
import { Download, Mail, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./ui/Button";
import { motionConfig, staggerContainer, fadeInUp, heroPortrait } from "../styles/motion";
import { useState, useEffect, useRef } from "react";
import Hero3D from "./ui/Hero3D";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [show3D, setShow3D] = useState(false);

  /* Refs for GSAP scroll animation */
  const heroRef = useRef(null);
  const portraitWrapRef = useRef(null);
  const textWrapRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShow3D(true), 1000);
    return () => clearTimeout(timer);
  }, []);

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

  /* Framer Motion variants */
  const containerVariants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : staggerContainer;

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
            delay: 0.2,
          },
        },
      };

  const textContainerVariants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
          },
        },
      };

  const delayedFadeInUp = (delay = 0) =>
    shouldReduceMotion
      ? itemVariants
      : {
          hidden: { opacity: 0, y: 30 },
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
    <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden">
      {/* 3D Background — 03_UI_UX_Spec.md §1 */}
      {!shouldReduceMotion && show3D && <Hero3D />}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Portrait — hidden on mobile, visible lg+ — 03_UI_UX_Spec.md §1 */}
          <div ref={portraitWrapRef} className="hidden lg:block">
            <motion.div
              variants={portraitVariants}
              initial="hidden"
              animate="visible"
              className="order-1 lg:order-1"
            >
              <div className="relative max-w-md mx-auto lg:mx-0">
                <div
                  className="rounded-2xl overflow-hidden border border-white/5 hover:border-accent-primary transition-colors duration-500 ease-out"
                >
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
                      className="w-full h-auto object-cover"
                      style={{
                        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
                      }}
                    />
                  </picture>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Text content — GSAP scroll ref */}
          <div ref={textWrapRef}>
            <motion.div
              variants={textContainerVariants}
              initial="hidden"
              animate="visible"
              className="order-2 lg:order-2 text-center lg:text-left"
            >
              {/* Availability tag */}
              <motion.div variants={delayedFadeInUp(0.3)}>
                <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-accent-primary bg-accent-primary/10 rounded-full mb-6">
                  <span className="w-1.5 h-1.5 bg-accent-primary rounded-full animate-pulse" aria-hidden="true" />
                  Open to Full-time Internship — August–December 2026
                </span>
              </motion.div>

              {/* Name — h1, single per page */}
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-text-heading mb-4 tracking-tighter leading-[1.05] flex flex-wrap justify-center lg:justify-start">
                {"Nabil Makarim".split(" ").map((word, index) => (
                  <span key={index} className="relative inline-block overflow-hidden mr-4">
                    <motion.span
                      variants={{
                        hidden: { y: "110%" },
                        visible: {
                          y: 0,
                          transition: {
                            ...motionConfig.spring.gentle,
                            delay: 0.45 + index * 0.05,
                          },
                        },
                      }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h1>

              {/* Title */}
              <motion.p
                variants={delayedFadeInUp(0.45)}
                className="text-lg md:text-xl text-accent-primary font-medium mb-4"
              >
                Software Developer Intern | Full-Stack Web & Applied AI
              </motion.p>

              {/* Location */}
              <motion.p
                variants={delayedFadeInUp(0.55)}
                className="flex items-center justify-center lg:justify-start gap-2 text-sm text-text-body mb-6"
              >
                <MapPin size={16} strokeWidth={1.5} aria-hidden="true" />
                Makassar, Indonesia
              </motion.p>

              {/* Bio */}
              <motion.p
                variants={delayedFadeInUp(0.65)}
                className="text-text-body leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8"
              >
                Diploma IV student in Informatics and Computer Engineering, building
                production-grade AI and full-stack applications — from AI-powered
                financial tracking to real-time skill-gap analysis platforms.
                Proficient in React, Laravel, FastAPI, and TensorFlow.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={delayedFadeInUp(0.75)}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
              >
                <Button
                  as="a"
                  href="/resume/resume.pdf"
                  download
                  variant="primary"
                >
                  <Download size={16} strokeWidth={1.5} />
                  Download Resume
                </Button>
                <Button as="a" href="#contact" variant="secondary">
                  <Mail size={16} strokeWidth={1.5} />
                  Contact Me
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}