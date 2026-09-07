# Nabil Makarim — Portfolio

Personal portfolio website showcasing production-grade full-stack web engineering, applied AI workflows, and software development leadership. Built with React 19, Vite 8, Tailwind CSS 3, Framer Motion 11, GSAP, and Lenis.

## 🚀 Overview

- **Hero Section**: Asymmetric editorial bento grid with duotone portrait treatment, live status indicator, and engineering metrics.
- **Projects Section**: Interactive featured project showcases with live demos, GitHub links, and accessible modal case studies (`aria-modal="true"`, Escape key dismissal).
- **Tech Stack & Skills**: Structured capabilities bento grid highlighting full-stack architectures, applied AI / NLP pipelines, and data systems.
- **Experience & Growth**: Multi-tab journey covering IT work experience, HIMATIK leadership metrics, academic background (GPA 3.49), and certifications with animated counters.
- **Contact Section**: Direct outreach form powered by `@formspree/react` with real-time field validation, active availability badge, and direct communication links.
- **Performance & Polish**: Zero-bundle-waste static export, Lenis smooth scrolling with GSAP ticker sync, and strict `prefers-reduced-motion` fallbacks.

## ⚙️ Tech Stack

- **Framework & Runtime**: React 19, Vite 8
- **Styling**: Tailwind CSS 3, PostCSS, Autoprefixer
- **Animation & Scroll**: Framer Motion 11, GSAP 3 + ScrollTrigger, Lenis 1.3
- **Icons**: Lucide React
- **Forms**: `@formspree/react`
- **Code Quality**: Oxlint (Rust-based linter)
- **Deployment**: Vercel (Vite SPA preset)

## 🎨 Design System

- **Aesthetic**: Warm Obsidian Editorial Dark (`#0d0d0c` ground, `#141412` cards, `#e8613a` burnt orange accent, `#f4f0e8` soft cream text).
- **Typography Pairing**:
  - `Syne` (700/800): Restricted exclusively to the Hero H1 for bold editorial impact.
  - `Onest` (400–800): Applied to all H2–H6 section headings, metric counters (`GPA 3.49`, `6+`, `300+`), and UI body text with tight negative tracking (`tracking-tight` / `tracking-[-0.03em]`) for optimal reading density.
- **Accessibility**: Semantic HTML5 landmarks (`<nav>`, `<main>`, `<contentinfo>`), ARIA-compliant tablists and dialogs, keyboard navigation, and focus-visible rings.

## 📦 Getting Started

### Prerequisites

- Node.js 18+ or 20+ (Node 22 recommended)
- npm or pnpm

### Installation

```bash
git clone https://github.com/nabilmkr/Portoflio.git
cd Portoflio
npm install
```

### Development Server

```bash
npm run dev
```

Runs the Vite dev server at `http://localhost:5173/` with hot module replacement (HMR).

### Linting & Static Analysis

```bash
npm run lint
```

Runs `oxlint` across the codebase for fast static analysis.

### Production Build

```bash
npm run build
npm run preview
```

Generates a minified, chunk-split production build in `dist/` and runs a local preview server at `http://localhost:4173/`.

## 🚀 Deployment on Vercel

The project is pre-configured for seamless deployment on [Vercel](https://vercel.com) via `vercel.json`:

1. Import the repository `nabilmkr/Portoflio` into your Vercel dashboard.
2. Ensure settings match:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build` (or `vite build`)
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
3. Deploy. The configured `rewrites` rule ensures all SPA deep links redirect to `index.html` without 404 errors.

## 📁 Project Structure

```text
Portoflio/
├── public/               # Static assets (images, PDF resume, SVG favicon)
│   ├── images/           # Editorial portraits and project thumbnails
│   └── resume/           # nabil-makarim-resume.pdf
├── src/
│   ├── components/       # UI sections & shared primitives
│   │   ├── ui/           # Button, Tag, SectionWrapper
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── ProjectsSection.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── CaseStudyPanel.jsx
│   │   ├── SkillsSection.jsx
│   │   ├── ExperienceSection.jsx
│   │   ├── ContactSection.jsx
│   │   ├── Footer.jsx
│   │   └── ErrorBoundary.jsx
│   ├── data/             # Content data (projects, skills, experience JSON)
│   ├── hooks/            # Custom hooks (useIntersectionObserver)
│   ├── styles/           # Global styles, typography hierarchy, motion config
│   ├── utils/            # Performance utilities (rafThrottle)
│   ├── App.jsx           # Root application with Lenis & Suspense
│   └── main.jsx          # DOM entry point
├── index.html            # HTML entry point with metadata and fonts
├── tailwind.config.js    # Design tokens, obsidian palette, font stacks
├── vite.config.js        # Vite 8 build & plugin configuration
├── vercel.json           # Vercel deployment configuration & SPA rewrites
└── README.md
```

## 📄 License

MIT © [Nabil Makarim](https://github.com/nabilmkr).
