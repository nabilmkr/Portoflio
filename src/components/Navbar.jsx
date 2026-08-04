/* 04_Component_Spec.md §1 — Navbar */
/* State: isMenuOpen (mobile only), activeSection (scroll-spy) */
/* Responsive: hamburger below md, full horizontal from md up */
/* Animation: active link underline transitions color 300ms to accent-primary */
/* 09_SEO_Accessibility_Spec.md §9 — Keyboard nav, Escape closes menu */
/* 09_SEO_Accessibility_Spec.md §11 — aria-label on nav and menu toggle */

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
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
      setIsScrolled(window.scrollY > 20);
    });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Scroll-spy: track which section is in view */
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
        { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  /* Escape key closes mobile menu — 09_SEO_Accessibility_Spec.md §9 */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-bg-primary/95 backdrop-blur-sm border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: motionConfig.duration.normal,
          ease: motionConfig.ease.entrance,
          delay: 0.1,
        }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Name */}
          <a
            href="#"
            className="text-text-heading font-bold text-lg tracking-tight hover:text-accent-primary transition-colors duration-300"
          >
            NM
          </a>

          {/* Desktop nav — visible from md up */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  activeSection === link.href.replace("#", "")
                    ? "text-accent-primary"
                    : "text-text-body hover:text-text-heading"
                }`}
              >
                {link.label}
                {/* Active underline indicator */}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-accent-primary transition-all duration-300 ${
                    activeSection === link.href.replace("#", "")
                      ? "w-full"
                      : "w-0"
                  }`}
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>

          {/* Mobile menu toggle — below md */}
          <button
            className="md:hidden p-2 text-text-body hover:text-text-heading transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile menu overlay — below md */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-md z-[9990]"
          >
            <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">
              <div className="absolute top-5 right-5">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close mobile menu"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-text-body hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex flex-col items-center justify-center gap-8 w-full max-w-md text-center">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    className={`text-3xl font-semibold transition-colors duration-300 ${
                      activeSection === link.href.replace("#", "")
                        ? "text-accent-primary"
                        : "text-white hover:text-accent-primary"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
