# Nabil Makarim Portfolio

A personal portfolio website built with React, Vite, Tailwind CSS, Framer Motion, and Three.js.

## 🚀 Project Overview

This repository hosts a polished portfolio experience with:

- Hero section with animated headings, portrait treatment, and 3D background support
- Project cards with hover states, image lazy-loading, and detail overlays
- Skills, experience, and contact sections with smooth section entry animations
- Lazy-loaded page sections to reduce initial bundle work
- Tailwind-based responsive styling and accessible interactions

## ⚙️ Built With

- React 19
- Vite 8
- Tailwind CSS 3
- Framer Motion 11
- GSAP + ScrollTrigger
- Lenis smooth scrolling
- Three.js via `@react-three/fiber` and `@react-three/drei`
- `@formspree/react` for contact form

## 📦 Scripts

- `npm run dev` — start the Vite development server with HMR
- `npm run build` — create a production-ready build
- `npm run preview` — preview the production build locally
- `npm run lint` — run Oxlint on the project

## 💡 Interactive Features

- `React.lazy()` + `Suspense` for non-critical sections
- `loading="lazy"` for project thumbnails
- Conditional reduced-motion support for accessibility
- `Hero3D` component loaded only when motion is allowed
- Image format fallback using AVIF / WebP / PNG via `<picture>`
- Formspree-powered contact form with field-level validation

## 🎨 Design System

- **Theme**: Premium Editorial Dark
- **Colors**: #111317 (bg-primary), #1A1D24 (bg-surface), #C5A880 (accent-primary/gold), #4A6B82 (accent-secondary/steel-blue), #EAEFF5 (text-heading), #94A3B8 (text-body)
- **Typography**: Syne (display/headlines) + Onest (body/ui)
- **Motion**: `prefers-reduced-motion` respected globally, `rafThrottle` for pointer events

## 🧪 Quick Start

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal.

## 🛠️ Production Build

```bash
npm run build
npm run preview
```

## 📁 Repo Structure

- `src/` — main application source code
- `src/components/` — reusable UI sections and elements
- `src/data/` — project, skills, and experience content
- `src/styles/` — motion variants and global styles
- `src/utils/` — performance utilities (rafThrottle)
- `src/hooks/` — custom hooks (useIntersectionObserver)
- `public/` — static assets and manifest files
- `portfolio-spec/` — design and technical documentation for the portfolio

## 📝 Contact Form Setup

The contact form uses [Formspree](https://formspree.io). To enable:

1. Create a free Formspree account
2. Create a new form and copy the form ID (e.g., `myeggpre`)
3. The form ID is already configured in `src/components/ContactSection.jsx`
4. Submissions appear in your Formspree dashboard

## ✅ Notes

- The app is optimized for modern browsers.
- PNG fallback is available for browsers that do not support AVIF/WebP.
- The development setup already supports fast refresh through Vite.

## 📚 Want to Improve It?

- Add an automated image conversion step for AVIF/WebP assets
- Add offline support / PWA caching
- Add deeper analytics or tracking for project views

---

Made as a responsive portfolio site with modern React tooling and motion-first UI patterns.