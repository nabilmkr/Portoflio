/* 04_Component_Spec.md §1 — Navbar */
/* Redesigned into a Floating Liquid Glass Island Capsule */

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { motionConfig } from "../styles/motion";
import { rafThrottle } from "../utils/performance";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = rafThrottle(() => {
      setIsScrolled(window.scrollY > 25);
    });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Scroll-spy: track which section is currently in view */
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.replace("#", ""));
    const observers = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.25, rootMargin: "-80px 0px 0px 0px" }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  /* Escape key closes mobile menu */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const handleNavClick = (e, href) => {
    setIsMenuOpen(false);
    if (href && href.startsWith("#")) {
      e.preventDefault();
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
    }
  };

  return (
    <header className="fixed top-3.5 sm:top-5 inset-x-0 z-50 flex justify-center pointer-events-none px-3">
      {/* Floating Liquid Glass Capsule */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Main navigation"
        className={`pointer-events-auto relative flex items-center justify-between gap-2 sm:gap-4 rounded-full px-3.5 sm:px-5 py-2 transition-all duration-500 ${
          isScrolled
            ? "bg-[#141412]/80 backdrop-blur-2xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_14px_36px_rgba(0,0,0,0.65),0_2px_8px_rgba(0,0,0,0.4)] scale-[0.98]"
            : "bg-[#141412]/60 backdrop-blur-xl border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_8px_24px_rgba(0,0,0,0.4)]"
        }`}
      >
        {/* Specular Liquid Top Glow Line */}
        <div
          className="pointer-events-none absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
          aria-hidden="true"
        />

        {/* Logo / Monogram */}
        <a
          href="#"
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-text-heading hover:text-accent-primary transition-colors py-1 pl-1"
        >
          <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse shadow-[0_0_8px_#e8613a]" />
          <span className="font-mono tracking-tight text-white/90">nabil.makarim</span>
        </a>

        {/* Glass Divider */}
        <div className="hidden sm:block w-px h-4 bg-white/15 mx-0.5" aria-hidden="true" />

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-white/65 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-white/[0.1] border border-white/20 shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </div>

        {/* Action CTA Pill */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-accent-primary text-white hover:bg-accent-primary/90 transition-all shadow-sm shadow-accent-primary/30 hover:scale-[1.03] active:scale-[0.97]"
          >
            <span>Let's Talk</span>
            <ArrowUpRight size={13} />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Floating Dropdown Island */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-auto md:hidden fixed top-16 inset-x-4 mx-auto max-w-sm rounded-3xl bg-[#141412]/90 backdrop-blur-2xl border border-white/20 p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_20px_45px_rgba(0,0,0,0.7)] z-50 flex flex-col gap-1.5"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-white/10 text-white font-semibold border border-white/15"
                      : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />}
                </a>
              );
            })}

            <div className="pt-2 mt-1 border-t border-white/10">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-semibold bg-accent-primary text-white shadow-md shadow-accent-primary/20"
              >
                <span>Get in Touch</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
