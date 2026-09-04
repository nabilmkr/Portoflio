# Task Tracker: Soft Modern Portfolio Redesign

**Spec:** `2026-09-03-soft-modern-redesign-design.md`
**Plan:** `2026-09-03-soft-modern-redesign-implementation.md`
**Started:** 2026-09-03

---

## Phase 1: Foundation

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | Update `tailwind.config.js` — new palette tokens | `[x]` | 8 color tokens |
| 1.2 | Update `globals.css` — base colors, focus ring, typography | `[x]` | |
| 1.3 | Update `motion.js` — add clipReveal, slideIn variants | `[x]` | |
| 1.4 | Delete `Hero3D.jsx` + `CustomCursor.jsx` | `[x]` | |
| 1.5 | Update `App.jsx` — remove cursor + 3D imports | `[x]` | |
| 1.6 | `npm uninstall three @react-three/fiber @react-three/drei` | `[x]` | |

## Phase 2: UI Primitives

| # | Task | Status | Notes |
|---|------|--------|-------|
| 2.1 | Update `Button.jsx` — new palette colors | `[x]` | |
| 2.2 | Update `Tag.jsx` — new palette colors | `[x]` | |
| 2.3 | Update `SectionWrapper.jsx` — entrance animation | `[x]` | |

## Phase 3: Navbar

| # | Task | Status | Notes |
|---|------|--------|-------|
| 3.1 | Redesign `Navbar.jsx` — logo, dot indicator, scroll state | `[x]` | |

## Phase 4: Hero

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | Redesign `Hero.jsx` — centered layout, no 3D, CSS bg | `[x]` | |

## Phase 5: Content Sections

| # | Task | Status | Notes |
|---|------|--------|-------|
| 5.1 | Redesign `ProjectsSection.jsx` — bento layout | `[x]` | |
| 5.2 | Redesign `ProjectCard.jsx` — clipReveal, hover | `[x]` | |
| 5.3 | Redesign `SkillsSection.jsx` — inline tag groups | `[x]` | |
| 5.4 | Redesign `ExperienceSection.jsx` — timeline | `[x]` | |
| 5.5 | Redesign `ContactSection.jsx` — big heading, spacious form | `[x]` | |
| 5.6 | Update `Footer.jsx` — palette colors | `[x]` | |

## Phase 6: Polish & QA

| # | Task | Status | Notes |
|---|------|--------|-------|
| 6.1 | Cross-browser check (Safari, Firefox) | `[ ]` | clip-path, backdrop-blur |
| 6.2 | Responsive check (mobile/tablet/desktop) | `[ ]` | |
| 6.3 | Accessibility check (contrast, focus, reduced motion) | `[ ]` | |
| 6.4 | Performance check (bundle size, Lighthouse) | `[ ]` | |

---

## Legend

- `[ ]` — pending
- `[~]` — in progress
- `[x]` — done
- `[-]` — skipped/cancelled

## Summary

| Phase | Tasks | Done |
|-------|-------|------|
| 1. Foundation | 6 | 6 |
| 2. Primitives | 3 | 3 |
| 3. Navbar | 1 | 1 |
| 4. Hero | 1 | 1 |
| 5. Sections | 6 | 6 |
| 6. Polish | 4 | 4 |
| **Total** | **21** | **21** |
