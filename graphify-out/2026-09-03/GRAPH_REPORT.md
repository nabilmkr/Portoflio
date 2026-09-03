# Graph Report - Portofolio  (2026-07-24)

## Corpus Check
- 72 files · ~160,675 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1191 nodes · 1211 edges · 117 communities (104 shown, 13 thin omitted)
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
- 10_Motion_Interaction_Spec.md
- 11 — Project Case Study Specification
- Implementation Guide: Spec Alignment & Gap Closure
- What You Must Do When Invoked
- What You Must Do When Invoked
- Engineering Decisions
- Engineering Decisions
- Challenge 1
- Challenge 1
- Challenge 1
- Engineering Decisions
- Engineering Decisions
- Part A — SEO
- 12_Content_Rendering_ Specification.md
- Personal Portfolio Website — Nabil Makarim
- Challenge 1
- 37. Directory Responsibilities
- Personal Portfolio Website — Nabil Makarim (Full-Stack Web & Applied AI Developer)
- Personal Portfolio Website — Nabil Makarim
- Personal Portfolio Website — Nabil Makarim
- Personal Portfolio Website — Nabil Makarim
- Personal Portfolio Website — Nabil Makarim
- 18. Technology Stack
- Nabil Makarim Portfolio
- graphify reference: extra exports and benchmark
- graphify reference: extra exports and benchmark
- Personal Portfolio Website — Nabil Makarim
- Personal Portfolio Website — Nabil Makarim
- Project Overview
- Project Overview
- Project Overview
- Project Overview
- 12. Hero Section Specification
- 30. Rendering Validation Checklist
- 6. Global Rendering Principles
- 24. Cross-Project Consistency
- Implementation
- 100. Hero Section
- graphify reference: query, path, explain
- graphify reference: query, path, explain
- 15. Challenge Section
- 16. Engineering Decisions
- 19. Gallery Section
- 24. Accessibility Rules
- 28. Rendering Anti-Patterns
- Implementation
- Implementation
- Implementation
- 101. About Section
- 102. Skills Section
- 103. Experience Section
- 104. Projects Preview
- 58. Validation Workflow
- 13. Overview Section
- 14. Problem Section
- 17. Architecture Section
- 18. Implementation Section
- 22. Motion Rendering Rules
- 5. Rendering Philosophy
- 25. Portfolio Quality Checklist
- 105. Contact Section
- 67. RootLayout
- 69. Section Wrapper
- 83. Navbar
- 84. Logo
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- 20. Reflection Section
- 21. Future Improvements
- 23. Responsive Rendering Rules
- 26. Portfolio-Level Validation
- 27. AI Rendering Instructions
- System Architecture
- System Architecture
- System Architecture
- System Architecture
- Hero
- Hero
- Hero
- Hero
- 68. Main Container
- 70. Container Component
- 86. Resume Button
- 87. Theme Toggle
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- 27. AI Rendering Constraints
- 85. Navigation Links
- CLAUDE.md
- CLAUDE.md
- extraction-spec.md
- copilot-instructions.md
- extraction-spec.md
- 106. Footer
- 88. Mobile Navigation

## God Nodes (most connected - your core abstractions)
1. `11 — Project Case Study Specification` - 27 edges
2. `37. Directory Responsibilities` - 16 edges
3. `react` - 14 edges
4. `Personal Portfolio Website — Nabil Makarim` - 14 edges
5. `What You Must Do When Invoked` - 12 edges
6. `What You Must Do When Invoked` - 12 edges
7. `Personal Portfolio Website — Nabil Makarim` - 12 edges
8. `Implementation Guide: Spec Alignment & Gap Closure` - 11 edges
9. `Personal Portfolio Website — Nabil Makarim` - 11 edges
10. `18. Technology Stack` - 11 edges

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

## Communities (117 total, 13 thin omitted)

### Community 0 - "App Layout & Sections"
Cohesion: 0.13
Nodes (9): App(), ContactSection, ExperienceSection, ProjectsSection, SkillsSection, ErrorBoundary, Footer(), SOCIAL_LINKS (+1 more)

### Community 1 - "Dependencies & Animation Libs"
Cohesion: 0.04
Nodes (45): autoprefixer, framer-motion, gsap, lenis, lucide-react, oxlint, dependencies, framer-motion (+37 more)

### Community 2 - "Hero & Case Study"
Cohesion: 0.18
Nodes (8): Hero(), Hero3D, Hero3DPlaceholder, skills, fadeIn, fadeInUp, heroPortrait, motionConfig

### Community 3 - "Dev Tooling Config"
Cohesion: 0.02
Nodes (106): 107. Section Transition, 108. Scroll Experience, 109. Responsive Rules, 10. Development Rules, 110. Accessibility, 111. Performance, 112. AI Constraints, 113. Definition of Done (+98 more)

### Community 4 - "Nav & Project Cards"
Cohesion: 0.27
Nodes (5): NAV_LINKS, Navbar(), ProjectCard(), Tag(), rafThrottle()

### Community 5 - "Package Scripts"
Cohesion: 0.03
Nodes (58): 10. Standard Project Structure, 11. Standard Hero Structure, 12. Standard Overview Structure, 13. Standard Problem Structure, 14. Standard Challenge Structure, 15. Standard Engineering Decision Structure, 16. Standard Architecture Structure, 17. Standard Implementation Structure (+50 more)

### Community 6 - "Case Study Panel Data"
Cohesion: 0.14
Nodes (4): CaseStudyPanel(), caseStudies, projects, staggerContainer

### Community 7 - "Experience & Scroll"
Cohesion: 0.38
Nodes (5): AnimatedCounter(), SectionWrapper(), orgExperience, workHistory, useIntersectionObserver()

### Community 8 - "Lint Config"
Cohesion: 0.33
Nodes (5): rules, react/only-export-components, react/rules-of-hooks, $schema, warn

### Community 9 - "Contact & Button"
Cohesion: 0.20
Nodes (6): plugins, oxc, react, CONTACT_LINKS, Button, variants

### Community 15 - "10_Motion_Interaction_Spec.md"
Cohesion: 0.05
Nodes (40): 10 — Motion & Interaction Specification, 10. Navigation, 11. Section Reveal, 12. Skills Interaction, 13. Project Card, 14. Project Image Reveal, 15. Project Detail Transition, 16. Experience Timeline (+32 more)

### Community 16 - "11 — Project Case Study Specification"
Cohesion: 0.05
Nodes (40): 10. Alternatives, 11. Approach, 11 — Project Case Study Specification, 12. Key Decisions, 13. Technical Implementation, 14. Architecture, 15. Challenges, 16. Trade-offs (+32 more)

### Community 17 - "Implementation Guide: Spec Alignment & Gap Closure"
Cohesion: 0.06
Nodes (33): Build & Deploy, Current Files to Clean, Current Status, Current Status, Decision Required, Decision Required, Execution Status Tracker, Execution Steps (+25 more)

### Community 18 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 19 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 20 - "Engineering Decisions"
Cohesion: 0.08
Nodes (25): Contribution, Contribution, Contribution, Contribution, Contribution, Contribution, Engineering Decisions, FastAPI (+17 more)

### Community 21 - "Engineering Decisions"
Cohesion: 0.09
Nodes (22): Contribution, Contribution, Contribution, Contribution, Contribution, Contribution, Engineering Decisions, Filament Admin (+14 more)

### Community 22 - "Challenge 1"
Cohesion: 0.10
Nodes (21): Challenge, Challenge, Challenge, Challenge, Challenge 1, Challenge 2, Challenge 3, Challenge 4 (+13 more)

### Community 23 - "Challenge 1"
Cohesion: 0.10
Nodes (21): Challenge, Challenge, Challenge, Challenge, Challenge 1, Challenge 2, Challenge 3, Challenge 4 (+13 more)

### Community 24 - "Challenge 1"
Cohesion: 0.10
Nodes (21): Challenge 1, Challenge, Challenge, Challenge, Challenge, Challenge 2, Challenge 3, Challenge 4 (+13 more)

### Community 25 - "Engineering Decisions"
Cohesion: 0.10
Nodes (21): Contribution, Contribution, Contribution, Contribution, Contribution, DeepFace, Engineering Decisions, FastAPI (+13 more)

### Community 26 - "Engineering Decisions"
Cohesion: 0.10
Nodes (21): Contribution, Contribution, Contribution, Contribution, Contribution, Engineering Decisions, FastAPI, JSON & CSV Dataset (+13 more)

### Community 27 - "Part A — SEO"
Cohesion: 0.10
Nodes (19): 09. SEO & Accessibility Specification, 10. Focus Ring, 11. ARIA Labels, 12. Reduced Motion, 13. Screen Reader Order, 14. Color Contrast, 15. Out of Scope for This Document, 1. Title Template (+11 more)

### Community 28 - "12_Content_Rendering_ Specification.md"
Cohesion: 0.11
Nodes (17): 10. Writing Principles, 11. AI Constraints, 1. Purpose, 25. Empty States, 26. Error States, 29. Component Mapping, 2. Objectives, 31. Acceptance Criteria (+9 more)

### Community 29 - "Personal Portfolio Website — Nabil Makarim"
Cohesion: 0.12
Nodes (15): 05. Tech Specification, 10. Global CSS Rendering Base, 11. Analytics (minimal), 12. Out of Scope for This Document, 1. Stack, 2. Anti-Dependency Rules (kept from original PRD), 3. Hosting & Contact Form Decision, 4. Folder Structure (+7 more)

### Community 30 - "Challenge 1"
Cohesion: 0.12
Nodes (16): Challenge, Challenge 1, Challenge 2, Challenge 3, Challenge, Challenge, Challenges, Outcome (+8 more)

### Community 31 - "37. Directory Responsibilities"
Cohesion: 0.12
Nodes (16): 37. Directory Responsibilities, app/, assets/, components/, constants/, data/, features/, hooks/ (+8 more)

### Community 32 - "Personal Portfolio Website — Nabil Makarim (Full-Stack Web & Applied AI Developer)"
Cohesion: 0.13
Nodes (14): 01. Product Requirement Document (PRD), 1. Document Control, 2. Executive Summary & Core Objectives, 3. Target Audience (User Persona), 4. Feature Scope & Page Structure, 5. Success Metrics, 6. Out of Scope for This Document, A. Hero Section (+6 more)

### Community 33 - "Personal Portfolio Website — Nabil Makarim"
Cohesion: 0.14
Nodes (13): 08. Development Roadmap, Acceptance Criteria (per component, summary), Coding Conventions, Dependency Notes, Personal Portfolio Website — Nabil Makarim, Phase 0 — Pre-Build Blockers (resolve first), Phase 1 — Project Scaffold, Phase 2 — Static Shell (+5 more)

### Community 34 - "Personal Portfolio Website — Nabil Makarim"
Cohesion: 0.15
Nodes (12): 04. Component Specification, 10. Out of Scope for This Document, 1. `<Navbar />`, 2. `<Hero />`, 3. `<ProjectCard />`, 4. `<ProjectsSection />`, 5. `<SkillsSection />`, 6. `<ExperienceSection />` (+4 more)

### Community 35 - "Personal Portfolio Website — Nabil Makarim"
Cohesion: 0.15
Nodes (12): 06. Content, 1. Hero Section, 2. Selected Projects, 3. Tech Stack & Skills, 4. Experience & Leadership, 5. Contact & Footer, 6. Open Items, Cuanify — AI-Powered Advanced Financial Tracker (+4 more)

### Community 36 - "Personal Portfolio Website — Nabil Makarim"
Cohesion: 0.18
Nodes (10): 02. Design System, 1. Color Palette, 2. Typography, 3. Spacing Scale, 4. Border Radius, 5. Iconography, 6. Borders, 7. Rendering Base (Global CSS) (+2 more)

### Community 37 - "18. Technology Stack"
Cohesion: 0.18
Nodes (11): 18. Technology Stack, Animation, Deployment Target, Forms, Framework, Icons, Routing, State Management (+3 more)

### Community 38 - "Nabil Makarim Portfolio"
Cohesion: 0.18
Nodes (10): ⚙️ Built With, 💡 Interactive Features, Nabil Makarim Portfolio, ✅ Notes, 🛠️ Production Build, 🚀 Project Overview, 🧪 Quick Start, 📁 Repo Structure (+2 more)

### Community 39 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 40 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 41 - "Personal Portfolio Website — Nabil Makarim"
Cohesion: 0.22
Nodes (8): 03. UI/UX Specification, 1. Hero Visual Asset Treatment, 2. Motion Primitives, 3. Interaction States, 4. Layout Guardrails, 5. Responsive Breakpoints, 6. Out of Scope for This Document, Personal Portfolio Website — Nabil Makarim

### Community 42 - "Personal Portfolio Website — Nabil Makarim"
Cohesion: 0.22
Nodes (8): 07. Asset Manifest, 1. Images, 2. Documents, 3. Icons, 4. Favicon, 5. Open Graph / Social Preview, 6. Summary of Missing Assets (action needed before build), Personal Portfolio Website — Nabil Makarim

### Community 43 - "Project Overview"
Cohesion: 0.22
Nodes (9): Category, Database, Development Duration, Personal Role, Primary Technologies, Project Name, Project Overview, Status (+1 more)

### Community 44 - "Project Overview"
Cohesion: 0.22
Nodes (9): Category, Database, Development Duration, Personal Role, Primary Technologies, Project Name, Project Overview, Status (+1 more)

### Community 45 - "Project Overview"
Cohesion: 0.22
Nodes (9): Category, Database, Development Duration, Personal Role, Primary Technologies, Project Name, Project Overview, Status (+1 more)

### Community 46 - "Project Overview"
Cohesion: 0.22
Nodes (9): Category, Database, Development Duration, Personal Role, Primary Technologies, Project Name, Project Overview, Status (+1 more)

### Community 47 - "12. Hero Section Specification"
Cohesion: 0.29
Nodes (7): 12. Hero Section Specification, CTA Rules, Hero Image, Layout, Purpose, Required Content, Rules

### Community 48 - "30. Rendering Validation Checklist"
Cohesion: 0.29
Nodes (7): 30. Rendering Validation Checklist, Accessibility, Content, Motion, Responsive, Structure, Visual Consistency

### Community 49 - "6. Global Rendering Principles"
Cohesion: 0.29
Nodes (7): 6. Global Rendering Principles, Accessibility, Consistency, Modularity, Predictability, Readability, Responsiveness

### Community 50 - "24. Cross-Project Consistency"
Cohesion: 0.29
Nodes (7): 24. Cross-Project Consistency, Architecture, Challenges, Engineering Decisions, Hero, Problem, Reflection

### Community 51 - "Implementation"
Cohesion: 0.29
Nodes (7): AI Service, Authentication, Backend, Database, Implementation, Integration, Mobile Application

### Community 52 - "100. Hero Section"
Cohesion: 0.29
Nodes (7): 100. Hero Section, Accessibility, Layout, Motion, Purpose, Required Content, Responsibilities

### Community 53 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 54 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 55 - "15. Challenge Section"
Cohesion: 0.33
Nodes (6): 15. Challenge Section, Examples, Maximum, Purpose, Rendering, Structure

### Community 56 - "16. Engineering Decisions"
Cohesion: 0.33
Nodes (6): 16. Engineering Decisions, Forbidden, Preferred, Purpose, Rendering, Required Structure

### Community 57 - "19. Gallery Section"
Cohesion: 0.33
Nodes (6): 19. Gallery Section, Caption Rules, Image Rules, Layout, Purpose, Required Content

### Community 58 - "24. Accessibility Rules"
Cohesion: 0.33
Nodes (6): 24. Accessibility Rules, Color, Headings, Images, Interactive Elements, Motion

### Community 59 - "28. Rendering Anti-Patterns"
Cohesion: 0.33
Nodes (6): 28. Rendering Anti-Patterns, Decorative Motion, Large Text Blocks, Repeated Information, Screenshot Gallery Without Context, Technology List Without Reasoning

### Community 60 - "Implementation"
Cohesion: 0.33
Nodes (6): AI Recommendation, Backend, Dataset, Frontend, Implementation, Semantic Matching

### Community 61 - "Implementation"
Cohesion: 0.33
Nodes (6): Authentication, Backend, Database, Frontend, Implementation, Integration

### Community 62 - "Implementation"
Cohesion: 0.33
Nodes (6): Face Verification, Gesture Recognition, Hardware Control, Implementation, Processing, System Logic

### Community 63 - "101. About Section"
Cohesion: 0.33
Nodes (6): 101. About Section, Highlights, Layout, Motion, Purpose, Responsibilities

### Community 64 - "102. Skills Section"
Cohesion: 0.33
Nodes (6): 102. Skills Section, Behavior, Categories, Motion, Purpose, Representation

### Community 65 - "103. Experience Section"
Cohesion: 0.33
Nodes (6): 103. Experience Section, Content, Layout, Motion, Purpose, Timeline Card

### Community 66 - "104. Projects Preview"
Cohesion: 0.33
Nodes (6): 104. Projects Preview, CTA, Layout, Motion, Purpose, Responsibilities

### Community 67 - "58. Validation Workflow"
Cohesion: 0.33
Nodes (6): 58. Validation Workflow, Accessibility, Functional, Responsive, Technical, Visual

### Community 68 - "13. Overview Section"
Cohesion: 0.40
Nodes (5): 13. Overview Section, Purpose, Rendering, Required Fields, Rules

### Community 69 - "14. Problem Section"
Cohesion: 0.40
Nodes (5): 14. Problem Section, Layout, Purpose, Required Questions, Rules

### Community 70 - "17. Architecture Section"
Cohesion: 0.40
Nodes (5): 17. Architecture Section, Description Rules, Preferred Visualization, Purpose, Required Elements

### Community 71 - "18. Implementation Section"
Cohesion: 0.40
Nodes (5): 18. Implementation Section, Purpose, Recommended Topics, Rendering, Rules

### Community 72 - "22. Motion Rendering Rules"
Cohesion: 0.40
Nodes (5): 22. Motion Rendering Rules, Motion Duration, Principles, Recommended Motion, Scroll Behaviour

### Community 73 - "5. Rendering Philosophy"
Cohesion: 0.40
Nodes (5): 5.1 Engineering Before Decoration, 5.2 Content First, 5.3 Progressive Disclosure, 5.4 Storytelling Through Engineering, 5. Rendering Philosophy

### Community 74 - "25. Portfolio Quality Checklist"
Cohesion: 0.40
Nodes (5): 25. Portfolio Quality Checklist, Consistency, Engineering, Storytelling, Technical Accuracy

### Community 75 - "105. Contact Section"
Cohesion: 0.40
Nodes (5): 105. Contact Section, Content, CTA, Motion, Purpose

### Community 76 - "67. RootLayout"
Cohesion: 0.40
Nodes (5): 67. RootLayout, Children, Purpose, Responsibilities, Should NOT

### Community 77 - "69. Section Wrapper"
Cohesion: 0.40
Nodes (5): 69. Section Wrapper, Props, Purpose, Responsibilities, Rules

### Community 78 - "83. Navbar"
Cohesion: 0.40
Nodes (5): 83. Navbar, Behavior, Purpose, Requirements, Responsibilities

### Community 79 - "84. Logo"
Cohesion: 0.40
Nodes (5): 84. Logo, Accessibility, Behavior, Hover, Purpose

### Community 80 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 81 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 82 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 83 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 84 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 85 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 86 - "20. Reflection Section"
Cohesion: 0.50
Nodes (4): 20. Reflection Section, Purpose, Required Questions, Rules

### Community 87 - "21. Future Improvements"
Cohesion: 0.50
Nodes (4): 21. Future Improvements, Maximum, Purpose, Rules

### Community 88 - "23. Responsive Rendering Rules"
Cohesion: 0.50
Nodes (4): 23. Responsive Rendering Rules, Desktop, Mobile, Tablet

### Community 89 - "26. Portfolio-Level Validation"
Cohesion: 0.50
Nodes (4): 26. Portfolio-Level Validation, Content, Language, Technical

### Community 90 - "27. AI Rendering Instructions"
Cohesion: 0.50
Nodes (4): 27. AI Rendering Instructions, Future Updates, Missing Information, Personal Contribution

### Community 91 - "System Architecture"
Cohesion: 0.50
Nodes (4): AI Pipeline, Architecture Summary, Data Flow, System Architecture

### Community 92 - "System Architecture"
Cohesion: 0.50
Nodes (4): Analysis Pipeline, Architecture Summary, Data Flow, System Architecture

### Community 93 - "System Architecture"
Cohesion: 0.50
Nodes (4): Architecture Summary, Content Flow, Data Flow, System Architecture

### Community 94 - "System Architecture"
Cohesion: 0.50
Nodes (4): Architecture Summary, State Flow, System Architecture, System Flow

### Community 95 - "Hero"
Cohesion: 0.50
Nodes (4): Hero, One-line Summary, Primary Goal, Target Users

### Community 96 - "Hero"
Cohesion: 0.50
Nodes (4): Hero, One-line Summary, Primary Goal, Target Users

### Community 97 - "Hero"
Cohesion: 0.50
Nodes (4): Hero, One-line Summary, Primary Goal, Target Users

### Community 98 - "Hero"
Cohesion: 0.50
Nodes (4): Hero, One-line Summary, Primary Goal, Target Users

### Community 99 - "68. Main Container"
Cohesion: 0.50
Nodes (4): 68. Main Container, Purpose, Requirements, Responsibilities

### Community 100 - "70. Container Component"
Cohesion: 0.50
Nodes (4): 70. Container Component, Purpose, Responsibilities, Standard Width

### Community 101 - "86. Resume Button"
Cohesion: 0.50
Nodes (4): 86. Resume Button, Behavior, Interaction, Purpose

### Community 102 - "87. Theme Toggle"
Cohesion: 0.50
Nodes (4): 87. Theme Toggle, Animation, Persistence, Purpose

### Community 107 - "27. AI Rendering Constraints"
Cohesion: 0.67
Nodes (3): 27. AI Rendering Constraints, The AI Must, The AI Must Never

### Community 108 - "85. Navigation Links"
Cohesion: 0.67
Nodes (3): 85. Navigation Links, Active State, Behavior

## Knowledge Gaps
- **886 isolated node(s):** `$schema`, `oxc`, `react/rules-of-hooks`, `warn`, `name` (+881 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Engineering Decisions` connect `Engineering Decisions` to `Package Scripts`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `Engineering Decisions` connect `Engineering Decisions` to `Package Scripts`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `Challenges` connect `Challenge 1` to `Package Scripts`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `$schema`, `oxc`, `react/rules-of-hooks` to the rest of the system?**
  _886 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Layout & Sections` be split into smaller, more focused modules?**
  _Cohesion score 0.1286549707602339 - nodes in this community are weakly interconnected._
- **Should `Dependencies & Animation Libs` be split into smaller, more focused modules?**
  _Cohesion score 0.043478260869565216 - nodes in this community are weakly interconnected._
- **Should `Dev Tooling Config` be split into smaller, more focused modules?**
  _Cohesion score 0.018691588785046728 - nodes in this community are weakly interconnected._