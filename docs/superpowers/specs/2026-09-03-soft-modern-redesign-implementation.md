# Implementation Plan: Soft Modern Portfolio Redesign

**Spec:** `2026-09-03-soft-modern-redesign-design.md`
**Approach:** Bottom-up — foundation first (tokens, globals), then components leaf-to-root.
**Branching:** Single feature branch `redesign/soft-modern`

---

## Phase 1: Foundation (tokens, globals, cleanup)

### 1.1 Update `tailwind.config.js`
- Replace all 6 color tokens with new palette
- Add `bg-surface-alt`, `accent-soft`, `border` tokens
- Keep font families unchanged

### 1.2 Update `src/styles/globals.css`
- Body base: `bg-bg-primary text-text-body` (now light)
- Focus ring color → `#E8613A`
- Typography hierarchy: tighter letter-spacing on h1, add section-label utility
- Add CSS grain texture keyframe (optional, for hero bg)
- Remove any hardcoded `#C5A880` references

### 1.3 Update `src/styles/motion.js`
- Add `clipReveal` variant (`clipPath: inset(100% 0 0 0)` → `inset(0)`)
- Add `slideInLeft` / `slideInRight` variants
- Keep existing duration/easing/spring configs

### 1.4 Cleanup: delete files
- Delete `src/components/ui/Hero3D.jsx`
- Delete `src/components/ui/CustomCursor.jsx`

### 1.5 Update `src/App.jsx`
- Remove `CustomCursor` import and render
- Remove `Hero3D` lazy import
- Remove Three.js-related code

### 1.6 Remove unused deps
- `npm uninstall three @react-three/fiber @react-three/drei`

---

## Phase 2: UI Primitives

### 2.1 Update `src/components/ui/Button.jsx`
- Primary variant: `bg-accent-primary text-white` (burnt orange)
- Secondary variant: `border-border text-text-heading` (warm border)
- Hover states match new palette

### 2.2 Update `src/components/ui/Tag.jsx`
- Color: `text-accent-primary bg-accent-soft` or `text-text-body bg-bg-surface`

### 2.3 Update `src/components/ui/SectionWrapper.jsx`
- Keep padding/max-width
- Section entrance animation: use `clipReveal` or keep `fadeInUp`

---

## Phase 3: Navbar

### 3.1 Redesign `src/components/Navbar.jsx`
- Logo: "nabil makarim" lowercase, `font-light text-sm tracking-wide`
- Active indicator: dot above link (small circle, `w-1 h-1 rounded-full bg-accent-primary`)
- Scroll state: `bg-bg-primary/90 backdrop-blur-md border-b border-border`
- Remove underline indicator
- Mobile overlay: update colors to light palette, stagger entrance

---

## Phase 4: Hero

### 4.1 Redesign `src/components/Hero.jsx`
- Layout: single column centered
- Name: `text-7xl md:text-8xl lg:text-9xl text-center tracking-[-0.04em]`
- Subtitle: one line, `text-lg text-text-body font-light text-center`
- Portrait: below name, `w-32 h-32 rounded-2xl mx-auto` (smaller, accent)
- Availability badge: small pill above name, subtle
- CTAs: centered below, spaced
- Background: CSS gradient mesh or subtle grain (no Three.js)
- GSAP parallax: keep but adjust for single-column layout
- Remove Hero3D import and render

---

## Phase 5: Content Sections

### 5.1 Redesign `src/components/ProjectsSection.jsx`
- First project: full-width featured card
- Remaining: 2-col asymmetric (alternate large/small or bento)
- Section label: uppercase small tracking-wide

### 5.2 Redesign `src/components/ProjectCard.jsx`
- Hover: `scale(1.02)` + `shadow-lg` elevation
- Scroll entrance: `clipReveal` animation
- Colors: `bg-bg-surface border-border`
- Tech tags: inline, subtle, integrated

### 5.3 Redesign `src/components/SkillsSection.jsx`
- Replace 3-col card grid with grouped inline list
- Category: bold label
- Skills: inline tags separated by `·` or comma
- Compact layout, less vertical space

### 5.4 Redesign `src/components/ExperienceSection.jsx`
- Vertical timeline with center line
- Desktop: alternating left-right entries
- Mobile: single column, all left-aligned
- Each entry: scroll-triggered `slideInLeft`/`slideInRight`
- Date badge on timeline line

### 5.5 Redesign `src/components/ContactSection.jsx`
- Heading: big, warm — "Let's work together."
- Form inputs: larger, rounded (`rounded-xl`), spacious padding
- Social links: icon row, not cards
- Colors match new palette

### 5.6 Update `src/components/Footer.jsx`
- Colors to new palette
- Keep structure

---

## Phase 6: Polish & QA

### 6.1 Cross-browser check
- Verify clip-path animations work in Safari/Firefox
- Test backdrop-blur support

### 6.2 Responsive check
- Every section mobile/tablet/desktop
- Navbar mobile overlay
- Timeline single-column on mobile

### 6.3 Accessibility check
- Focus rings visible on light bg
- Color contrast ratios (WCAG AA minimum)
- Reduced motion still respected

### 6.4 Performance
- Verify Three.js removed from bundle (check build output)
- Lighthouse score before/after

---

## Dependency Order

```
Phase 1 (foundation) → Phase 2 (primitives) → Phase 3-5 (components, parallel-safe) → Phase 6 (polish)
```

Phase 3, 4, 5 can be done in any order after Phase 2 completes — no cross-dependencies between Navbar, Hero, and content sections.
