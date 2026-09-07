# Graph Report - .  (2026-07-24)

## Corpus Check
- 87 files · ~160,564 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 146 nodes · 204 edges · 15 communities (12 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- App Layout & Sections
- Dependencies & Animation Libs
- Hero & Case Study
- Dev Tooling Config
- Nav & Project Cards
- Package Scripts
- Case Study Panel Data
- Experience & Scroll
- Lint Config
- Contact & Button
- API Contact
- Test Files

## God Nodes (most connected - your core abstractions)
1. `react` - 14 edges
2. `fadeInUp` - 8 edges
3. `ErrorBoundary` - 6 edges
4. `SectionWrapper()` - 6 edges
5. `motionConfig` - 6 edges
6. `scripts` - 5 edges
7. `useIntersectionObserver()` - 5 edges
8. `rafThrottle()` - 5 edges
9. `staggerContainer` - 4 edges
10. `plugins` - 3 edges

## Surprising Connections (you probably didn't know these)
- `App()` --references--> `lenis`  [EXTRACTED]
  src/App.jsx → package.json
- `AnimatedCounter()` --calls--> `useIntersectionObserver()`  [EXTRACTED]
  src/components/ExperienceSection.jsx → src/hooks/useIntersectionObserver.js
- `Navbar()` --calls--> `rafThrottle()`  [EXTRACTED]
  src/components/Navbar.jsx → src/utils/performance.js
- `ProjectCard()` --calls--> `rafThrottle()`  [EXTRACTED]
  src/components/ProjectCard.jsx → src/utils/performance.js
- `SectionWrapper()` --calls--> `useIntersectionObserver()`  [EXTRACTED]
  src/components/ui/SectionWrapper.jsx → src/hooks/useIntersectionObserver.js

## Import Cycles
- None detected.

## Communities (15 total, 3 thin omitted)

### Community 0 - "App Layout & Sections"
Cohesion: 0.11
Nodes (10): react, App(), ContactSection, ExperienceSection, ProjectsSection, SkillsSection, ErrorBoundary, Footer() (+2 more)

### Community 1 - "Dependencies & Animation Libs"
Cohesion: 0.10
Nodes (21): framer-motion, gsap, lenis, lucide-react, dependencies, framer-motion, gsap, lenis (+13 more)

### Community 2 - "Hero & Case Study"
Cohesion: 0.13
Nodes (11): CaseStudyPanel(), Hero(), Hero3D, Hero3DPlaceholder, projects, skills, fadeIn, fadeInUp (+3 more)

### Community 3 - "Dev Tooling Config"
Cohesion: 0.12
Nodes (17): autoprefixer, oxlint, devDependencies, autoprefixer, oxlint, postcss, tailwindcss, @types/react (+9 more)

### Community 4 - "Nav & Project Cards"
Cohesion: 0.27
Nodes (5): NAV_LINKS, Navbar(), ProjectCard(), Tag(), rafThrottle()

### Community 5 - "Package Scripts"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, lint, preview, type (+1 more)

### Community 7 - "Experience & Scroll"
Cohesion: 0.38
Nodes (5): AnimatedCounter(), SectionWrapper(), orgExperience, workHistory, useIntersectionObserver()

### Community 8 - "Lint Config"
Cohesion: 0.25
Nodes (7): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema, oxc, warn

### Community 9 - "Contact & Button"
Cohesion: 0.40
Nodes (3): CONTACT_LINKS, Button, variants

## Knowledge Gaps
- **44 isolated node(s):** `$schema`, `oxc`, `react/rules-of-hooks`, `warn`, `name` (+39 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Dependencies & Animation Libs` to `Package Scripts`?**
  _High betweenness centrality (0.453) - this node is a cross-community bridge._
- **Why does `lenis` connect `Dependencies & Animation Libs` to `App Layout & Sections`?**
  _High betweenness centrality (0.405) - this node is a cross-community bridge._
- **Why does `App()` connect `App Layout & Sections` to `Dependencies & Animation Libs`?**
  _High betweenness centrality (0.405) - this node is a cross-community bridge._
- **What connects `$schema`, `oxc`, `react/rules-of-hooks` to the rest of the system?**
  _44 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Layout & Sections` be split into smaller, more focused modules?**
  _Cohesion score 0.11462450592885376 - nodes in this community are weakly interconnected._
- **Should `Dependencies & Animation Libs` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `Hero & Case Study` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._