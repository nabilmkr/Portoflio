/* 04_Component_Spec.md §7 — ContactSection */
/* Soft Modern: Direct outreach form + structured info card, GSAP scroll glow */

import { useForm, ValidationError } from "@formspree/react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, Send, CheckCircle, Loader2, MapPin, Calendar } from "lucide-react";
import SectionWrapper from "./ui/SectionWrapper";
import Button from "./ui/Button";
import { fadeInUp, staggerContainer } from "../styles/motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DIRECT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "nabilmkr16@gmail.com",
    href: "mailto:nabilmkr16@gmail.com",
  },
  {
    icon: Phone,
    label: "WhatsApp / Phone",
    value: "+62 877 6220 1957",
    href: "https://wa.me/6287762201957",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Makassar, Indonesia (WITA / UTC+8)",
  },
  {
    icon: Calendar,
    label: "Availability",
    value: "Open to Full-time Internship (Aug–Dec 2026)",
  },
];

export default function ContactSection() {
  const [state, handleSubmit] = useForm("myeggpre");
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const gradientRef = useRef(null);

  useEffect(() => {
    if (shouldReduceMotion || !sectionRef.current || !gradientRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(gradientRef.current, {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <SectionWrapper id="contact" className="relative overflow-hidden">
      {/* Background glow on scroll */}
      <div
        ref={gradientRef}
        className="absolute inset-0 bg-gradient-to-br from-accent-soft via-transparent to-transparent opacity-0 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <motion.div ref={sectionRef} variants={fadeInUp} className="mb-10 lg:mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-primary mb-2 block">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-text-heading tracking-[-0.03em] leading-tight mb-4 max-w-3xl">
            Let&apos;s build something great.
          </h2>
          <p className="text-text-body text-base md:text-lg max-w-2xl">
            Open to internship opportunities, collaborative software projects, and technical discussions.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
        >
          {/* Form */}
          <motion.div variants={fadeInUp} className="lg:col-span-7">
            {state.succeeded ? (
              <div className="rounded-2xl border border-border bg-bg-surface p-8 md:p-12 flex flex-col items-center justify-center gap-4 text-center min-h-[380px]">
                <CheckCircle size={48} strokeWidth={1.5} className="text-accent-primary" />
                <h3 className="text-text-heading font-bold text-xl">Message Delivered</h3>
                <p className="text-text-body text-sm max-w-sm">
                  Thank you for reaching out. I usually respond within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-border bg-bg-surface p-6 sm:p-8 md:p-10 space-y-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
              >
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-text-heading mb-2">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-bg-primary border border-border text-text-heading text-sm placeholder:text-text-body/40 focus:border-accent-primary focus:ring-2 focus:ring-accent-soft transition-colors duration-200 outline-none"
                    placeholder="Your name"
                  />
                  <ValidationError field="name" prefix="Name" errors={state.errors} className="text-xs text-accent-primary mt-1.5" />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-text-heading mb-2">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-bg-primary border border-border text-text-heading text-sm placeholder:text-text-body/40 focus:border-accent-primary focus:ring-2 focus:ring-accent-soft transition-colors duration-200 outline-none"
                    placeholder="your@email.com"
                  />
                  <ValidationError field="email" prefix="Email" errors={state.errors} className="text-xs text-accent-primary mt-1.5" />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-text-heading mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3.5 rounded-xl bg-bg-primary border border-border text-text-heading text-sm placeholder:text-text-body/40 focus:border-accent-primary focus:ring-2 focus:ring-accent-soft transition-colors duration-200 outline-none resize-none"
                    placeholder="Project details or question..."
                  />
                  <ValidationError field="message" prefix="Message" errors={state.errors} className="text-xs text-accent-primary mt-1.5" />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-3.5 text-sm font-semibold justify-center"
                  disabled={state.submitting}
                >
                  {state.submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Structured Info Card */}
          <motion.div variants={fadeInUp} className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-border bg-bg-surface p-6 sm:p-8 space-y-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-accent-primary">
                Direct Contact &amp; Details
              </h3>

              <div className="space-y-4">
                {DIRECT_INFO.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-3.5">
                      <div className="p-2 rounded-lg bg-accent-soft text-accent-primary shrink-0 mt-0.5">
                        <Icon size={16} strokeWidth={1.75} />
                      </div>
                      <div>
                        <p className="text-xs text-text-body/60 font-medium">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-sm font-medium text-text-heading hover:text-accent-primary transition-colors duration-200"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-text-heading">{item.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-border/70">
                <p className="text-xs text-text-body/60 font-medium mb-3">Connect Online</p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://linkedin.com/in/nabil-makarim16"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="p-2.5 rounded-xl border border-border bg-bg-primary text-text-heading hover:text-accent-primary hover:border-accent-primary/40 transition-colors duration-200"
                  >
                    <Linkedin size={18} strokeWidth={1.75} />
                  </a>
                  <a
                    href="https://github.com/nabilmkr"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="p-2.5 rounded-xl border border-border bg-bg-primary text-text-heading hover:text-accent-primary hover:border-accent-primary/40 transition-colors duration-200"
                  >
                    <Github size={18} strokeWidth={1.75} />
                  </a>
                  <a
                    href="mailto:nabilmkr16@gmail.com"
                    aria-label="Send email"
                    className="p-2.5 rounded-xl border border-border bg-bg-primary text-text-heading hover:text-accent-primary hover:border-accent-primary/40 transition-colors duration-200"
                  >
                    <Mail size={18} strokeWidth={1.75} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}