/* 04_Component_Spec.md §7 — ContactSection */
/* Soft Modern: Direct outreach form + structured info card, GSAP scroll glow */

import { useForm, ValidationError } from "@formspree/react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, Send, CheckCircle, Loader2, MapPin, Calendar, Sparkles, MessageSquare } from "lucide-react";
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
    value: "Open to Full-time Internship · 2026",
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
        opacity: 0.15,
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
        className="absolute inset-0 bg-gradient-to-br from-[#e8613a]/20 via-transparent to-transparent opacity-0 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <motion.div ref={sectionRef} variants={fadeInUp} className="mb-10 lg:mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-accent-primary bg-accent-soft rounded-full border border-accent-primary/20">
              <Sparkles size={13} className="text-accent-primary" />
              Get In Touch // 04
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-white/40 hidden sm:inline-block">
              Collaboration &amp; Inquiries
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-text-heading tracking-[-0.03em] leading-tight mb-4 max-w-3xl">
            Let&apos;s build something resilient.
          </h2>
          <p className="text-text-body text-base md:text-lg max-w-2xl leading-relaxed">
            Interested in software engineering roles, internship opportunities, or discussing applied AI systems? Drop a line below.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
        >
          {/* Form */}
          <motion.div variants={fadeInUp} className="lg:col-span-7">
            {state.succeeded ? (
              <div className="rounded-3xl border border-white/10 bg-[#141412] p-8 md:p-12 flex flex-col items-center justify-center gap-4 text-center min-h-[420px] shadow-2xl shadow-black/40">
                <div className="p-4 rounded-2xl bg-accent-soft text-accent-primary">
                  <CheckCircle size={40} strokeWidth={1.75} />
                </div>
                <h3 className="text-text-heading font-extrabold text-2xl">Message Delivered</h3>
                <p className="text-text-body text-sm max-w-sm leading-relaxed">
                  Thank you for reaching out. I received your note and usually reply within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-white/10 bg-[#141412] p-6 sm:p-8 md:p-10 space-y-5 shadow-2xl shadow-black/40"
              >
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-text-heading mb-2">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-[#0d0d0c] border border-white/10 text-text-heading text-sm placeholder:text-white/30 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30 transition-all duration-200 outline-none"
                    placeholder="Your full name"
                  />
                  <ValidationError field="name" prefix="Name" errors={state.errors} className="text-xs text-accent-primary mt-1.5" />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-text-heading mb-2">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-[#0d0d0c] border border-white/10 text-text-heading text-sm placeholder:text-white/30 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30 transition-all duration-200 outline-none"
                    placeholder="you@company.com"
                  />
                  <ValidationError field="email" prefix="Email" errors={state.errors} className="text-xs text-accent-primary mt-1.5" />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-text-heading mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#0d0d0c] border border-white/10 text-text-heading text-sm placeholder:text-white/30 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30 transition-all duration-200 outline-none resize-none"
                    placeholder="What would you like to build or discuss?"
                  />
                  <ValidationError field="message" prefix="Message" errors={state.errors} className="text-xs text-accent-primary mt-1.5" />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-4 text-sm font-semibold justify-center shadow-lg shadow-accent-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all"
                  disabled={state.submitting}
                >
                  {state.submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending Message...
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
            <div className="rounded-3xl border border-white/10 bg-[#141412] p-6 sm:p-8 md:p-9 space-y-6 shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-accent-primary flex items-center gap-2">
                  <MessageSquare size={14} />
                  Direct Channels
                </h3>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/70 bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              </div>

              <div className="space-y-4">
                {DIRECT_INFO.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#0d0d0c]/60 border border-white/5">
                      <div className="p-2.5 rounded-xl bg-accent-soft text-accent-primary shrink-0 border border-accent-primary/15">
                        <Icon size={16} strokeWidth={2} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] uppercase tracking-wider text-white/40 font-semibold">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-sm font-semibold text-text-heading hover:text-accent-primary transition-colors duration-200 truncate block mt-0.5"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-semibold text-text-heading mt-0.5">{item.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-xs text-white/50 font-medium mb-3">Connect Online</p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://linkedin.com/in/nabil-makarim16"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="p-3 rounded-2xl border border-white/10 bg-[#0d0d0c] text-white/80 hover:text-white hover:border-accent-primary/40 hover:bg-accent-soft transition-all duration-200"
                  >
                    <Linkedin size={18} strokeWidth={1.75} />
                  </a>
                  <a
                    href="https://github.com/nabilmkr"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="p-3 rounded-2xl border border-white/10 bg-[#0d0d0c] text-white/80 hover:text-white hover:border-accent-primary/40 hover:bg-accent-soft transition-all duration-200"
                  >
                    <Github size={18} strokeWidth={1.75} />
                  </a>
                  <a
                    href="mailto:nabilmkr16@gmail.com"
                    aria-label="Send email"
                    className="p-3 rounded-2xl border border-white/10 bg-[#0d0d0c] text-white/80 hover:text-white hover:border-accent-primary/40 hover:bg-accent-soft transition-all duration-200"
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
