/* 04_Component_Spec.md §9 — SectionWrapper */
/* Wraps each main section, handles Intersection Observer entry animation trigger */
/* Consistent vertical padding */
/* 03_UI_UX_Spec.md §4 — Section entry animation triggers on scroll-into-view */

import { motion, useReducedMotion } from "framer-motion";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { staggerContainer, clipReveal } from "../../styles/motion";

export default function SectionWrapper({ id, children, className = "", variant = "stagger" }) {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : variant === "clip" ? clipReveal : staggerContainer;

  return (
    <section
      id={id}
      ref={ref}
      className={`py-16 md:py-24 scroll-mt-20 md:scroll-mt-28 ${className}`}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={hasIntersected ? "visible" : "hidden"}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {children}
      </motion.div>
    </section>
  );
}
