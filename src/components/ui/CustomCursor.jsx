/* Tier 1 Custom Cursor Component */
/* 09_SEO_Accessibility_Spec.md — Disabled on touch devices, fine pointer only */
/* Mix-blend-mode difference with smooth spring physics */

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { motionConfig } from "../../styles/motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const cursorXSpring = useSpring(cursorX, motionConfig.spring.responsive);
  const cursorYSpring = useSpring(cursorY, motionConfig.spring.responsive);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Track all interactive elements for cursor scale effect
    const addHoverListeners = () => {
      const targets = document.querySelectorAll("a, button, input, textarea, [role='button']");
      targets.forEach((target) => {
        target.addEventListener("mouseenter", () => setIsHovered(true));
        target.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    addHoverListeners();

    // Re-bind listeners on DOM updates (useful for React lazy loaded elements)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  // Disable custom cursor on mobile / touch devices and reduced motion preference
  if (
    shouldReduceMotion ||
    (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches)
  ) {
    return null;
  }

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-accent-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 2 : 1,
        }}
      />
      {/* Outer Circle Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-accent-primary rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.8 : 1,
          backgroundColor: isHovered ? "rgba(197, 168, 128, 0.1)" : "rgba(197, 168, 128, 0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </>
  );
}
