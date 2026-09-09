/* 04_Component_Spec.md §8 — Footer */
/* Editorial obsidian footer with smooth back-to-top and refined social links */

import { ArrowUp, Github, Linkedin, Mail, Phone, Sparkles } from "lucide-react";

const SOCIAL_LINKS = [
  {
    icon: Github,
    href: "https://github.com/nabilmkr",
    ariaLabel: "GitHub profile",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/nabil-makarim16",
    ariaLabel: "LinkedIn profile",
  },
  {
    icon: Mail,
    href: "mailto:nabilmkr16@gmail.com",
    ariaLabel: "Send email",
  },
  {
    icon: Phone,
    href: "https://wa.me/6287762201957",
    ariaLabel: "Contact via WhatsApp",
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative text-white/70 z-10">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-12 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-10 border-b border-white/10 pt-8 border-t border-white/[0.08]">
          {/* Col 1: Identity & Motto */}
          <div className="md:col-span-6 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent-primary">
              <Sparkles size={13} />
              <span>Nabil Makarim</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-text-heading">
              Building useful software for complex ideas.
            </p>
            <p className="text-xs text-white/60 italic">
              &ldquo;Aut viam inveniam, Aut Faciam&rdquo; · I shall either find a way or make one.
            </p>
          </div>

          {/* Col 2: Socials & Back to Top */}
          <div className="md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-3">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[#141412] border border-white/10 text-white/70 hover:text-white hover:border-accent-primary/40 hover:bg-accent-soft transition-all duration-300 shadow-md"
                >
                  <Icon size={18} strokeWidth={1.75} />
                </a>
              );
            })}

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top of page"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#141412] border border-white/10 text-xs font-semibold text-white/70 hover:text-white hover:border-white/30 transition-all duration-300 ml-2"
            >
              <ArrowUp size={14} />
              <span>Top</span>
            </button>
          </div>
        </div>

        {/* Bottom metadata row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>
            Designed &amp; built with React, Vite &amp; Tailwind. Hosted in Indonesia.
          </p>
          <div className="flex items-center gap-4">
            <span>Makassar, ID (UTC+8)</span>
            <span>&copy; {new Date().getFullYear()} Nabil Makarim</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
