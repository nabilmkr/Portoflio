/* Main App — 05_Tech_Spec.md §4 */
/* SPA, smooth-scroll navigation — 01_PRD.md §4 */
/* 05_Tech_Spec.md §2 — No routing lib, anchor tags + scroll-behavior: smooth */
/* 05_Tech_Spec.md §9 — Lazy-load non-critical sections via React.lazy() + Suspense */

import { Suspense, lazy, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ErrorBoundary } from "./components/ErrorBoundary";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

const ProjectsSection = lazy(() => import("./components/ProjectsSection"));
const SkillsSection = lazy(() => import("./components/SkillsSection"));
const ExperienceSection = lazy(() => import("./components/ExperienceSection"));
const ContactSection = lazy(() => import("./components/ContactSection"));

function SectionSkeleton() {
  return (
    <div className="py-16 md:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full animate-pulse">
      <div className="h-10 w-48 bg-white/5 rounded-lg mb-4"></div>
      <div className="h-4 w-96 bg-white/5 rounded mt-2 mb-10"></div>
      <div className="h-64 bg-white/5 rounded-2xl w-full"></div>
    </div>
  );
}

export default function App() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Register GSAP ScrollTrigger globally
    gsap.registerPlugin(ScrollTrigger);

    if (shouldReduceMotion) {
      return undefined;
    }

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };

    // Connect GSAP ticker to Lenis
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.ticker.remove(raf);
    };
  }, [shouldReduceMotion]);

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <main>
        <Hero />
        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton />}>
            <ProjectsSection />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton />}>
            <SkillsSection />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton />}>
            <ExperienceSection />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton />}>
            <ContactSection />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

