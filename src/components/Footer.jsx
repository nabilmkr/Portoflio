/* 04_Component_Spec.md §8 — Footer */
/* Props: none (static) */
/* State: none */
/* 06_Content.md §5 — Contact links + tagline */
/* 09_SEO_Accessibility_Spec.md §11 — aria-label on icon-only social links */
/* 08_Development_Roadmap.md — All social links correct, opens in new tab */

import { Github, Linkedin, Mail, Phone } from "lucide-react";

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
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Tagline */}
          <p className="text-sm text-text-body italic">
            &ldquo;Aut viam inveniam, Aut Faciam&rdquo;
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  className="p-2 text-text-body hover:text-accent-secondary transition-colors duration-300"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <p className="text-xs text-text-body/60">
            &copy; {new Date().getFullYear()} Nabil Makarim
          </p>
        </div>
      </div>
    </footer>
  );
}
