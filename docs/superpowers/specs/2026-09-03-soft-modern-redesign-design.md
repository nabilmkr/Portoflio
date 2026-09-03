# Soft Modern Portfolio Redesign

**Date:** 2026-09-03
**Status:** Approved (pre-implementation)
**Scope:** Visual identity overhaul — layout, palette, typography, motion. Keep component structure.

---

## 1. Problem Statement

Current portfolio reads as "AI-generated dark template":
- Generic dark bg + gold accent palette (seen on thousands of portfolios)
- Symmetric 2-col grid layouts everywhere — predictable
- Cookie-cutter navbar (logo + horizontal links)
- Hero: portrait left, text right, availability badge, two CTAs — template verbatim
- 3D torus knot background — decorative, disconnected from identity
- Custom cursor — gimmick without value
- Monotonous section rhythm — every section same padding, same grid, same card shape

## 2. Design Direction

**Soft Modern** — rounded, warm, approachable. Subtle gradients, generous spacing, micro-interactions that serve purpose. Gen-Z friendly without childish.

Reference energy: Vercel dashboard, Raycast website, Linear landing page.

Key principles:
- **Light-first** — immediately differentiates from dark-template crowd
- **Warm neutral base** — off-white, cream surfaces, not cold gray
- **One bold accent** — burnt orange, energetic but not aggressive
- **Asymmetry with intent** — layouts break the grid where it serves hierarchy
- **Every animation earns its place** — entrance guides attention, parallax creates depth, hover gives feedback. Nothing gratuitous.

## 3. Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `bg-primary` | `#FAFAF8` | Page background (warm off-white) |
| `bg-surface` | `#F2F0EC` | Card/surface backgrounds (warm cream) |
| `bg-surface-alt` | `#E8E5DF` | Secondary surfaces, hover states |
| `text-heading` | `#1A1A1A` | Near-black headings |
| `text-body` | `#6B6B6B` | Warm gray body text |
| `accent-primary` | `#E8613A` | Burnt orange — CTAs, active states, links |
| `accent-soft` | `#E8613A` at 10% | Badges, highlights, subtle backgrounds |
| `border` | `#E0DDD7` | Warm subtle borders |

Rationale: 90% of developer portfolios use dark themes. Light + warm = instant differentiation, more approachable, aligns with modern product design (Vercel, Notion, Raycast).

## 4. Typography

### Fonts (unchanged)
- **Syne** (600, 700, 800) — display/headings
- **Onest** (400, 500, 600) — body/UI

### Usage Changes
- Hero name: `text-7xl` to `text-9xl` — go big, own the space
- Mixed weight headings — name bold, subtitle light within same line
- Section labels: uppercase `text-xs tracking-[0.2em]` — editorial feel
- Selective italic Syne for emphasis words
- Letter-spacing tighter on large headings (`tracking-[-0.04em]`)

## 5. Layout Changes Per Section

### 5.1 Navbar

**Before:** "NM" logo + 4 horizontal links + underline active indicator.
**After:**
- Logo area: "nabil makarim" lowercase, light weight (not just initials)
- Active indicator: small **dot above** active link (not underline)
- Scroll state: smooth shrink, blur backdrop + warm cream tint
- Mobile overlay: same fullscreen but stagger entrance on links

### 5.2 Hero

**Before:** 2-col grid — portrait left, text right. 3D torus knot background.
**After:**
- **Single column, centered** layout
- Name HUGE centered (`text-8xl md:text-9xl`)
- One-line subtitle below, light weight
- Portrait below name — circular or rounded-square, smaller, accent not focal point
- Availability badge: subtle small pill above name
- CTAs spaced below
- **Background:** CSS gradient mesh or animated grain texture (replaces Three.js)
- **Scroll:** content fades + parallax up, portrait scales down slightly

### 5.3 Projects

**Before:** Uniform 2-col grid, all cards identical size.
**After:**
- **Asymmetric bento layout** — first project full-width featured, rest 2-col varied sizes
- Hover: pronounced lift + shadow shift
- Scroll entrance: `clip-path` reveal (bottom to top) per card
- Tech tags integrated into card design, more subtle
- Staggered y-offset entrance per card

### 5.4 Skills

**Before:** 3-col uniform card grid.
**After:**
- **Grouped inline list** — category label bold, skills as inline tags separated by `·`
- Or: compact **tag cloud** with category grouping
- Dramatically more compact, less "corporate skills matrix"
- Scroll: fade-in per group with stagger

### 5.5 Experience

**Before:** List-style entries.
**After:**
- **Vertical timeline** — alternating left-right on desktop, single column mobile
- Each entry scroll-triggered slide-in from its side
- Date on one side, detail on other
- More whitespace between entries

### 5.6 Contact

**Before:** Form + link cards.
**After:**
- Big heading: "Let's work together." or "Say hello."
- Form: more spacious, larger rounder inputs
- Social links: simple icon row below (not cards)
- Background: gradient shift on scroll

## 6. Motion & Scroll Philosophy

### Principles
1. Every animation has a job: entrance = guide attention, parallax = depth, hover = feedback
2. No decorative particle effects or disconnected 3D
3. Scroll-triggered reveals use `clip-path` + `transform` (crisper than fade-in)
4. Lenis smooth scroll stays — already good
5. Respect `prefers-reduced-motion` everywhere

### Specific Animations
- **Hero parallax:** content vs background at different scroll speeds
- **Project card reveal:** `clip-path: inset(100% 0 0 0)` → `inset(0)` on scroll
- **Section entrance:** `fadeInUp` with stagger, triggered by IntersectionObserver
- **Timeline entries:** slide from left/right alternating
- **Navbar shrink:** height transition on scroll threshold
- **Hover states:** scale(1.02) + shadow elevation on cards

### Motion Tokens (additions to `motion.js`)
- `clipReveal` variant: clip-path based entrance
- `slideInLeft` / `slideInRight` variants for timeline
- `parallaxLayer` config for GSAP ScrollTrigger layers

## 7. Removals

| Item | Reason |
|------|--------|
| `Hero3D.jsx` (Three.js) | Decorative, disconnected from identity, heavy bundle |
| `CustomCursor.jsx` | Gimmick, no functional value |
| Gold accent `#C5A880` | Generic "luxury template" signal |
| Uniform grid layouts | Predictable, template-like |
| Three.js + @react-three/* deps | No longer needed after Hero3D removal |

## 8. Files Impacted

| File | Change Type |
|------|-------------|
| `tailwind.config.js` | Palette overhaul, possible spacing tokens |
| `src/styles/globals.css` | Base colors, typography hierarchy, grain/gradient |
| `src/styles/motion.js` | New variants (clipReveal, slideIn, parallax) |
| `src/components/Navbar.jsx` | Layout + indicator redesign |
| `src/components/Hero.jsx` | Full layout restructure, remove 3D |
| `src/components/ui/Hero3D.jsx` | **Delete** |
| `src/components/ui/CustomCursor.jsx` | **Delete** |
| `src/components/ProjectsSection.jsx` | Bento layout + reveal animations |
| `src/components/ProjectCard.jsx` | Card hover + clip-path entrance |
| `src/components/SkillsSection.jsx` | Restructure to tag cloud/inline |
| `src/components/ExperienceSection.jsx` | Timeline layout |
| `src/components/ContactSection.jsx` | Spacing + heading + icon row |
| `src/components/ui/SectionWrapper.jsx` | Scroll animation updates |
| `src/components/ui/Button.jsx` | Color updates for new palette |
| `src/components/ui/Tag.jsx` | Color updates |
| `src/components/Footer.jsx` | Color updates |
| `src/App.jsx` | Remove CustomCursor, remove Hero3D lazy |
| `package.json` | Remove three/r3f/drei deps |

## 9. What Stays

- React 19 + Vite stack
- Framer Motion + GSAP + Lenis
- Component file structure (same files, new internals)
- Case study panel system
- Formspree contact integration
- Accessibility patterns (focus rings, reduced motion, ARIA)
- Lazy loading with Suspense/ErrorBoundary
- Data files (`projects.js`, `skills.js`, `experience.js`)

## 10. Out of Scope (for now)

- Dark mode toggle (can add later — design light-first, dark as enhancement)
- Blog/writing section
- CMS integration
- i18n
- Page transitions (single page, not needed)
