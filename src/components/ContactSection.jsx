/* 04_Component_Spec.md §7 — ContactSection */
/* Props: email, whatsapp, linkedinUrl, githubUrl */
/* State: formData, submitStatus (functional form) */
/* Responsive: stacked links base, inline row from md */
/* Animation: icon hover color shift to accent-secondary */
/* 05_Tech_Spec.md §3 — Functional form + fallback direct links always visible */
/* 05_Tech_Spec.md §6a — Form error/success states */
/* 06_Content.md §5 — Contact info */

import { useForm, ValidationError } from "@formspree/react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, Send, CheckCircle, Loader2 } from "lucide-react";
import SectionWrapper from "./ui/SectionWrapper";
import Button from "./ui/Button";
import { fadeInUp } from "../styles/motion";

const CONTACT_LINKS = [
  {
    id: "email",
    icon: Mail,
    label: "Email",
    value: "nabilmkr16@gmail.com",
    href: "mailto:nabilmkr16@gmail.com",
    ariaLabel: "Send email to Nabil Makarim",
  },
  {
    id: "whatsapp",
    icon: Phone,
    label: "WhatsApp",
    value: "+62 877 6220 1957",
    href: "https://wa.me/6287762201957",
    ariaLabel: "Contact via WhatsApp",
  },
  {
    id: "linkedin",
    icon: Linkedin,
    label: "LinkedIn",
    value: "nabil-makarim16",
    href: "https://linkedin.com/in/nabil-makarim16",
    ariaLabel: "LinkedIn profile",
  },
  {
    id: "github",
    icon: Github,
    label: "GitHub",
    value: "nabilmkr",
    href: "https://github.com/nabilmkr",
    ariaLabel: "GitHub profile",
  },
];

export default function ContactSection() {
  const [state, handleSubmit] = useForm("myeggpre");

  return (
    <SectionWrapper id="contact">
      <motion.div variants={fadeInUp}>
        <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-2">
          Get in Touch
        </h2>
        <p className="text-text-body mb-10 max-w-2xl">
          Interested in working together? Feel free to reach out through any of these channels.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <motion.div variants={fadeInUp}>
          {state.succeeded ? (
            <div className="rounded-2xl border border-white/5 bg-bg-surface p-6 md:p-8 flex flex-col items-center justify-center gap-4 text-center min-h-[320px]">
              <CheckCircle size={40} strokeWidth={1.5} className="text-accent-primary" />
              <p className="text-text-heading font-semibold text-lg">Message sent!</p>
              <p className="text-text-body text-sm">Thanks for reaching out. I'll get back to you soon.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/5 bg-bg-surface p-6 md:p-8 space-y-5"
            >
              <div>
                <label htmlFor="contact-name" className="block text-sm text-text-heading font-medium mb-1.5">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-white/5 text-text-heading text-sm placeholder:text-text-body/50 focus:border-accent-primary transition-colors duration-300 outline-none"
                  placeholder="Your name"
                />
                <ValidationError field="name" prefix="Name" errors={state.errors} className="text-xs text-red-400 mt-1" />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm text-text-heading font-medium mb-1.5">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-white/5 text-text-heading text-sm placeholder:text-text-body/50 focus:border-accent-primary transition-colors duration-300 outline-none"
                  placeholder="your@email.com"
                />
                <ValidationError field="email" prefix="Email" errors={state.errors} className="text-xs text-red-400 mt-1" />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm text-text-heading font-medium mb-1.5">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-white/5 text-text-heading text-sm placeholder:text-text-body/50 focus:border-accent-primary transition-colors duration-300 outline-none resize-none"
                  placeholder="Your message..."
                />
                <ValidationError field="message" prefix="Message" errors={state.errors} className="text-xs text-red-400 mt-1" />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={state.submitting}
              >
                {state.submitting ? (
                  <>
                    <Loader2 size={16} strokeWidth={1.5} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} strokeWidth={1.5} />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          )}
        </motion.div>

        {/* Direct contact links — always visible per 05_Tech_Spec.md §3 */}
        <motion.div variants={fadeInUp} className="space-y-4">
          {CONTACT_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.id}
                href={link.href}
                target={link.id !== "email" ? "_blank" : undefined}
                rel={link.id !== "email" ? "noopener noreferrer" : undefined}
                aria-label={link.ariaLabel}
                className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 hover:border-accent-primary/30 bg-bg-surface transition-colors duration-500 ease-out group"
              >
                <div className="p-2.5 rounded-lg bg-accent-secondary/10 group-hover:bg-accent-secondary/20 transition-colors duration-300">
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                    className="text-accent-secondary"
                  />
                </div>
                <div>
                  <p className="text-xs text-text-body uppercase tracking-wider">
                    {link.label}
                  </p>
                  <p className="text-sm text-text-heading font-medium">
                    {link.value}
                  </p>
                </div>
              </a>
            );
          })}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
