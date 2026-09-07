# SPEC-14 — AI Implementation Playbook

**Version:** 1.0

**Status:** Production Ready

**Priority:** Critical

---

# Part 1 — Foundation & Implementation Rules

---

# 1. Purpose

This specification defines how the portfolio must be implemented.

Previous specifications describe:

- what to build
- how content should be rendered
- how information should be structured

This document defines **how the AI Agent should execute the implementation**.

It acts as the operational manual for development.

---

# 2. Objectives

The AI Agent should be able to:

- understand every specification
- build the project incrementally
- avoid hallucinations
- preserve consistency
- produce maintainable code
- minimize unnecessary rewrites

---

# 3. Scope

This specification covers:

- implementation workflow
- project setup
- folder structure
- component implementation
- motion implementation
- data management
- quality assurance
- deployment preparation

---

# 4. Dependencies

Implementation depends on:

- SPEC-01 Portfolio Foundation
- SPEC-02 Design System
- SPEC-03 Information Architecture
- SPEC-04 Visual Identity
- SPEC-05 Component System
- SPEC-06 Motion System
- SPEC-07 Responsive Strategy
- SPEC-08 Accessibility
- SPEC-09 Asset Specification
- SPEC-10 Interaction Specification
- SPEC-11 Case Study Strategy
- SPEC-12 Content Rendering Specification
- SPEC-13 Project Content Specification

All specifications must be considered before implementation begins.

---

# 5. Source Priority

If multiple specifications contain overlapping information, resolve conflicts using this priority.

```text
SPEC-13

↓

SPEC-12

↓

SPEC-11

↓

SPEC-10

↓

SPEC-09

↓

...

↓

SPEC-01
```

Higher priority specifications override lower ones.

Never merge conflicting information.

---

# 6. AI Responsibilities

The AI Agent is responsible for:

- implementing specifications
- maintaining consistency
- validating implementation
- avoiding unsupported assumptions
- preserving architecture

The AI Agent is not responsible for inventing missing project information.

---

# 7. Implementation Philosophy

Implementation should prioritize:

1. Correctness

2. Maintainability

3. Readability

4. Reusability

5. Performance

Visual polish should never compromise architecture.

---

# 8. Engineering Principles

Every implementation should satisfy:

- Single Responsibility Principle

- Reusable Components

- Separation of Concerns

- Composition over Duplication

- Accessibility First

- Mobile First

- Progressive Enhancement

Avoid unnecessary abstraction.

Avoid premature optimization.

---

# 9. AI Constraints

The AI must never:

- invent project features
- invent architecture
- invent deployment
- invent APIs
- invent project assets
- invent business logic
- invent engineering decisions

Unknown information should remain unknown.

Request clarification when necessary.

---

# 10. Development Rules

Implement one layer at a time.

Recommended order:

```text
Foundation

↓

Layout

↓

Navigation

↓

Sections

↓

Components

↓

Motion

↓

Responsive

↓

Accessibility

↓

Optimization

↓

Testing
```

Do not skip layers.

---

# 11. Incremental Development

Every completed step should:

- compile successfully
- preserve previous functionality
- remain production-ready

Avoid large unverified changes.

Small validated iterations are preferred.

---

# 12. Code Quality Rules

Generated code should be:

- modular
- typed
- readable
- reusable
- documented where necessary

Avoid:

- duplicated logic
- deeply nested components
- unnecessary complexity
- magic numbers
- hardcoded content

---

# 13. Reusability Rules

Every reusable component should:

- receive props
- avoid embedded project data
- avoid duplicated styling
- remain independent

Content belongs to data sources.

Presentation belongs to components.

---

# 14. Validation Before Progress

Before starting the next implementation stage, verify:

- previous stage works
- no TypeScript errors
- no lint errors
- responsive layout preserved
- accessibility maintained

Never build on unstable implementation.

---

# 15. Definition of Done

A task is complete only if:

- implementation matches specification
- code compiles
- layout is responsive
- accessibility preserved
- animations work
- no placeholder remains unintentionally
- no unsupported claim introduced

Completion means specification compliance, not visual completion.

---

# 16. Final AI Instruction

Always read the relevant specification before implementing.

Never assume.

Never improvise.

Never replace architectural decisions with personal preference.

When uncertainty exists:

Stop.

Request clarification.

Accuracy always takes priority over speed.

---

# End of Part 1

---

# Part 2 — Project Setup

---

# 17. Project Initialization

Initialize the project using the latest stable ecosystem that is compatible with all required dependencies.

The implementation should prioritize long-term maintainability over experimental tooling.

---

# 18. Technology Stack

## Framework

- React 19
- Vite
- TypeScript

---

## Styling

- Tailwind CSS
- tailwind-merge
- clsx

---

## Animation

- Motion (motion.dev)

---

## Icons

- Lucide React

---

## Routing

- React Router DOM

---

## State Management

Local React State

Context API only if required.

Avoid introducing global state libraries unless justified.

---

## Forms

- React Hook Form

---

## Validation

- Zod

---

## Utilities

- clsx
- tailwind-merge

---

## Deployment Target

Must support deployment to:

- Vercel
- Netlify

without code modification.

---

# 19. Package Management

Preferred package manager:

```text
pnpm
```

Fallback:

```text
npm
```

Do not mix package managers.

Only one lockfile should exist.

---

# 20. Project Naming

Use descriptive names.

Example

```text
portfolio/

src/

components/

features/

assets/
```

Avoid:

```text
new-folder/

temp/

component2/

untitled/
```

---

# 21. Environment Variables

Store sensitive configuration inside:

```text
.env
```

Never commit:

```text
.env
```

Commit only:

```text
.env.example
```

Example variables

```text
VITE_APP_NAME=

VITE_SITE_URL=

VITE_GITHUB_URL=

VITE_LINKEDIN_URL=

VITE_EMAIL=

VITE_RESUME_URL=
```

Never hardcode environment-specific values.

---

# 22. Required Dependencies

Core

```text
react

react-dom

typescript

vite
```

---

Routing

```text
react-router-dom
```

---

Animation

```text
motion
```

---

Styling

```text
tailwindcss

tailwind-merge

clsx
```

---

Icons

```text
lucide-react
```

---

Utilities

```text
zod

react-hook-form
```

---

Developer Experience

```text
eslint

prettier

typescript-eslint
```

---

# 23. TypeScript Configuration

Enable strict mode.

```text
strict

↓

true
```

Avoid:

```text
any
```

Prefer:

- unknown
- explicit interfaces
- utility types
- generic types

---

# 24. ESLint Rules

The project should fail linting when:

- unused variables exist
- unreachable code exists
- implicit any appears
- duplicate imports exist

Warnings should be minimized.

Errors must be resolved before implementation continues.

---

# 25. Formatting Rules

Use consistent formatting.

Indentation

```text
2 spaces
```

Maximum line length

```text
100–120 characters
```

Always use:

- semicolons
- trailing commas
- double quotes or single quotes consistently

Formatting should be automated.

---

# 26. Git Strategy

Default branch

```text
main
```

Feature branches

```text
feature/navbar

feature/projects

feature/motion

feature/about
```

Bug fixes

```text
fix/mobile-navbar

fix/footer-layout
```

Never develop directly on unstable branches.

---

# 27. Git Ignore

Ignore:

```text
node_modules/

dist/

.env

.vscode/

.idea/

coverage/
```

Commit only source files.

---

# 28. Initial Folder Preparation

Before writing code ensure these directories exist.

```text
src/

assets/

components/

features/

hooks/

layouts/

lib/

pages/

router/

types/

utils/

styles/

constants/

data/
```

Additional folders may be added only when justified.

---

# 29. Configuration Files

Project should include:

```text
package.json

tsconfig.json

vite.config.ts

eslint.config.js

tailwind.config.ts

postcss.config.js
```

Each configuration file should have a single responsibility.

---

# 30. Initial Verification

Before implementing any UI verify:

- dependencies install successfully
- project builds
- TypeScript passes
- lint passes
- development server runs
- hot reload functions correctly

Only after verification should implementation begin.

---

# 31. AI Constraints

The AI must never:

- install unnecessary libraries
- introduce overlapping dependencies
- use deprecated packages
- disable TypeScript strict mode
- disable lint rules to bypass errors

Every dependency must have a clear implementation purpose.

---

# 32. Definition of Done

Project setup is complete only if:

- dependencies installed
- TypeScript configured
- Tailwind configured
- Motion configured
- routing configured
- lint configured
- formatting configured
- environment template created
- project builds successfully

No feature implementation should begin before these conditions are satisfied.

---

# Part 3 — Architecture & Folder Structure

---

# 33. Architecture Philosophy

The portfolio must adopt a feature-oriented architecture with clear separation between presentation, business logic, reusable components, and static data.

The architecture should prioritize:

- maintainability
- scalability
- readability
- low coupling
- high cohesion

Every directory should have a single responsibility.

---

# 34. High-Level Architecture

```text
App

↓

Router

↓

Layout

↓

Page

↓

Section

↓

Feature

↓

Reusable Component

↓

UI Primitive
```

Data should always flow downward.

Avoid bidirectional dependencies.

---

# 35. Root Directory Structure

```text
portfolio/

├── public/
├── spec/
├── src/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
├── tailwind.config.ts
└── README.md
```

Only project-level configuration belongs in the root.

---

# 36. Source Directory Structure

```text
src/

├── app/
├── assets/
├── components/
├── constants/
├── data/
├── features/
├── hooks/
├── layouts/
├── lib/
├── pages/
├── router/
├── services/
├── styles/
├── types/
├── utils/
└── main.tsx
```

Every directory must have a clearly defined responsibility.

---

# 37. Directory Responsibilities

## app/

Global application providers.

Example

- Theme Provider
- Motion Provider

---

## assets/

Static assets.

Examples

- images
- icons
- svg
- fonts

Never place application logic here.

---

## components/

Reusable UI components.

Examples

```text
Button

Card

Badge

Modal

Tooltip

Container
```

Components should never contain project-specific content.

---

## constants/

Application-wide constants.

Example

```text
navigation.ts

social.ts

theme.ts
```

Avoid magic strings.

---

## data/

Portfolio content.

Examples

```text
projects.ts

experience.ts

skills.ts

timeline.ts

education.ts
```

All portfolio information originates here.

---

## features/

Feature-specific components.

Example

```text
hero/

projects/

about/

contact/

experience/
```

Each feature may contain:

```text
components/

hooks/

types/

utils/
```

---

## hooks/

Reusable custom hooks.

Example

```text
useScroll.ts

useTheme.ts

useCursor.ts

useIntersection.ts
```

Hooks should never render UI.

---

## layouts/

Application layouts.

Example

```text
RootLayout

ProjectLayout
```

Layouts define page structure only.

---

## lib/

Third-party wrappers.

Example

```text
motion.ts

analytics.ts
```

Do not place business logic here.

---

## pages/

Top-level route pages.

Example

```text
Home

Projects

Project Detail

About

404
```

Pages assemble sections.

Pages should contain minimal logic.

---

## router/

Application routing.

Contains:

```text
routes.tsx
```

Routing should remain centralized.

---

## services/

External communication.

Example

```text
analytics

email

future APIs
```

Current portfolio should avoid unnecessary services.

---

## styles/

Global styles.

Contains:

```text
globals.css

variables.css
```

Component-specific styles should remain inside components whenever possible.

---

## types/

Shared TypeScript types.

Example

```text
Project

Skill

Experience

Navigation
```

Never duplicate interfaces.

---

## utils/

Pure utility functions.

Example

```text
formatDate()

slugify()

groupProjects()
```

Utilities should have no side effects.

---

# 38. Feature Structure

Every feature should follow this layout.

```text
features/

projects/

├── components/
├── hooks/
├── types.ts
├── utils.ts
└── index.ts
```

This structure improves scalability.

---

# 39. Component Hierarchy

```text
Page

↓

Section

↓

Feature Component

↓

Reusable Component

↓

Primitive
```

Example

```text
Home Page

↓

Projects Section

↓

Project Grid

↓

Project Card

↓

Button
```

Components should never skip hierarchy.

---

# 40. Data Ownership

Portfolio content must exist only once.

Correct

```text
data/projects.ts
```

Incorrect

```text
ProjectCard.tsx

↓

hardcoded project
```

UI reads data.

UI never owns data.

---

# 41. Import Rules

Allowed

```text
Page

↓

Feature

↓

Component

↓

Utility
```

Avoid

```text
Component

↓

imports Page
```

Dependency direction must remain consistent.

---

# 42. Naming Convention

Components

```text
ProjectCard.tsx
```

Hooks

```text
useScroll.ts
```

Types

```text
project.types.ts
```

Utilities

```text
project.utils.ts
```

Constants

```text
project.constants.ts
```

Use PascalCase for components.

Use camelCase for functions.

Use kebab-case only when required by tooling.

---

# 43. Barrel Exports

Every feature should expose a single entry point.

Example

```text
features/projects/index.ts
```

Avoid deep imports.

Preferred

```typescript
import { ProjectGrid } from "@/features/projects";
```

Avoid

```typescript
import ProjectGrid from "@/features/projects/components/grid/project-grid";
```

---

# 44. Scalability Rules

Architecture should support adding:

- new projects
- new sections
- new animations
- new pages
- new case studies

without restructuring existing directories.

---

# 45. AI Constraints

The AI must never:

- duplicate data
- hardcode portfolio content
- bypass folder hierarchy
- create circular dependencies
- mix responsibilities between directories

Every file should have one clear purpose.

---

# 46. Definition of Done

Architecture implementation is complete when:

- folder structure matches specification
- responsibilities are respected
- imports follow hierarchy
- data remains centralized
- components remain reusable
- no circular dependencies exist
- project is ready for feature implementation

---

# End of Part 3

---

# Part 4 — Development Workflow

---

# 47. Development Philosophy

Implementation must be incremental.

Every completed stage should remain functional before moving to the next stage.

Avoid implementing multiple unrelated systems simultaneously.

Prefer many small validated iterations over one large implementation.

---

# 48. Global Development Order

The AI Agent must follow this sequence.

```text
Read Specifications

↓

Initialize Project

↓

Configure Environment

↓

Create Folder Structure

↓

Create Data Layer

↓

Create Layout

↓

Implement Sections

↓

Implement Components

↓

Implement Motion

↓

Responsive Refinement

↓

Accessibility

↓

Performance Optimization

↓

Testing

↓

Deployment Preparation
```

Skipping stages is prohibited.

---

# 49. Specification Reading Order

Before writing code, read specifications in this order.

```text
SPEC-01

↓

SPEC-02

↓

SPEC-03

↓

SPEC-04

↓

SPEC-05

↓

SPEC-06

↓

SPEC-07

↓

SPEC-08

↓

SPEC-09

↓

SPEC-10

↓

SPEC-11

↓

SPEC-12

↓

SPEC-13

↓

SPEC-14
```

Implementation begins only after all relevant specifications have been understood.

---

# 50. Feature Development Order

Implement features sequentially.

```text
Navigation

↓

Hero

↓

About

↓

Skills

↓

Experience

↓

Projects

↓

Case Study

↓

Contact

↓

Footer
```

Avoid switching between unfinished features.

Each feature should reach production quality before continuing.

---

# 51. Section Development Workflow

Every section follows the same lifecycle.

```text
Planning

↓

Structure

↓

Data Binding

↓

UI

↓

Motion

↓

Responsive

↓

Accessibility

↓

Validation
```

Each stage must be completed before the next begins.

---

# 52. Component Development Workflow

For every component:

```text
Purpose

↓

Props

↓

Layout

↓

State

↓

Behavior

↓

Motion

↓

Accessibility

↓

Optimization
```

Do not add animation before functionality works correctly.

---

# 53. Motion Development Workflow

Animations are implemented only after UI is complete.

Recommended order.

```text
Entrance

↓

Scroll Reveal

↓

Hover

↓

Micro Interaction

↓

Page Transition

↓

Performance Review
```

Motion should enhance usability, not distract from content.

---

# 54. Data Integration Workflow

Portfolio data should be connected after layout exists.

```text
Static Data

↓

Type Definition

↓

Component Props

↓

Rendering

↓

Validation
```

Never hardcode project information inside components.

---

# 55. Responsive Workflow

Responsive refinement occurs after desktop implementation.

Order.

```text
Desktop

↓

Laptop

↓

Tablet

↓

Mobile
```

Avoid designing mobile and desktop independently.

Maintain one consistent component system.

---

# 56. Accessibility Workflow

Accessibility should be verified after responsive implementation.

Checklist.

- semantic HTML
- keyboard navigation
- focus visibility
- aria labels
- image alt text
- sufficient color contrast
- reduced motion support

Accessibility should never be postponed until the end of the project.

---

# 57. Performance Workflow

After all UI is complete:

Review:

- unnecessary renders
- oversized assets
- duplicate components
- excessive animations
- bundle size
- lazy loading opportunities

Optimize only after identifying measurable bottlenecks.

Avoid premature optimization.

---

# 58. Validation Workflow

Every completed feature must pass.

## Functional

- renders correctly
- no runtime errors
- correct data displayed

---

## Technical

- TypeScript passes
- lint passes
- build passes

---

## Visual

- spacing
- typography
- alignment
- animation

---

## Responsive

- desktop
- tablet
- mobile

---

## Accessibility

- keyboard navigation
- semantic structure
- screen reader compatibility

---

# 59. Error Handling Strategy

If implementation fails:

```text
Identify Problem

↓

Find Root Cause

↓

Apply Small Fix

↓

Rebuild

↓

Retest

↓

Continue
```

Avoid large refactors unless absolutely necessary.

---

# 60. Refactoring Rules

Refactor only when:

- duplication exists
- architecture improves
- readability improves
- maintainability improves

Never refactor solely for personal preference.

Behavior must remain unchanged.

---

# 61. AI Decision Rules

When multiple implementations are possible:

Prioritize:

1. Specification compliance.
2. Maintainability.
3. Readability.
4. Simplicity.
5. Performance.

Never choose complexity without clear justification.

---

# 62. Progress Tracking

Each completed milestone should be verifiable.

Example.

```text
✓ Project initialized

✓ Routing complete

✓ Hero complete

✓ About complete

✓ Projects complete

✓ Motion complete

✓ Responsive complete

✓ Accessibility verified

✓ Build successful
```

Progress should reflect implementation, not intention.

---

# 63. AI Constraints

The AI must never:

- skip validation
- implement unfinished features partially
- move to another section before stabilizing the current one
- introduce breaking changes without verification
- ignore specification conflicts

If uncertainty exists:

Pause implementation.

Request clarification.

---

# 64. Definition of Done

Development workflow is complete when:

- every section is implemented
- every component validated
- all specifications respected
- responsive behavior verified
- accessibility verified
- performance reviewed
- project ready for production deployment

---

# End of Part 4

---

# Part 5.1 — Core Layout Components

---

# 65. Component Philosophy

Every component should have one responsibility.

Components should be:

- reusable
- composable
- accessible
- responsive
- independent

Business logic belongs outside presentation whenever possible.

---

# 66. Component Hierarchy

```text
App

↓

Layout

↓

Section

↓

Feature Component

↓

Reusable Component

↓

Primitive
```

Never skip hierarchy.

---

# 67. RootLayout

## Purpose

Provides global application structure.

---

## Responsibilities

- Navigation
- Page Container
- Footer
- Global Providers
- Scroll Restoration

---

## Should NOT

- contain project content
- contain business logic
- fetch data

---

## Children

```text
Navbar

↓

Main

↓

Footer
```

---

# 68. Main Container

## Purpose

Defines overall page width and spacing.

---

## Responsibilities

- max width
- horizontal padding
- responsive spacing
- layout consistency

---

## Requirements

Should be reused across every page.

Avoid custom spacing inside pages.

---

# 69. Section Wrapper

## Purpose

Provides consistent spacing between sections.

---

## Responsibilities

- vertical spacing
- anchor id
- responsive padding

---

## Props

```ts
id

children

className
```

---

## Rules

Every homepage section must use this wrapper.

---

# 70. Container Component

## Purpose

Limit content width.

---

## Standard Width

```text
max-w-7xl
```

unless specification requires otherwise.

---

## Responsibilities

- horizontal alignment
- responsive padding

---

# 71. Grid System

Preferred layout.

```text
Desktop

12 columns

↓

Tablet

6 columns

↓

Mobile

1 column
```

Avoid arbitrary layouts.

Use a consistent grid throughout the project.

---

# 72. Spacing Rules

Use spacing scale consistently.

Example.

```text
Section

py-24

↓

Card Gap

gap-8

↓

Content Gap

gap-4
```

Avoid random spacing values.

---

# 73. Typography Wrapper

Typography should remain consistent.

Each page should use predefined heading hierarchy.

```text
H1

↓

H2

↓

H3

↓

Body

↓

Caption
```

Never skip heading levels without reason.

---

# 74. Background Layer

Background decorations should exist independently.

Structure.

```text
Background

↓

Gradient

↓

Noise

↓

Grid

↓

Content
```

Decorative layers must never block interaction.

---

# 75. Layer Order

Recommended z-index hierarchy.

```text
Background

↓

Decoration

↓

Content

↓

Floating UI

↓

Modal
```

Avoid arbitrary z-index values.

---

# 76. Layout Responsiveness

Layouts should adapt through spacing.

Avoid changing component structure unless necessary.

Preferred.

```text
Grid

↓

Stack

↓

Collapse
```

Instead of creating multiple layouts.

---

# 77. Accessibility

Every layout component should support:

- landmark elements
- semantic HTML
- keyboard navigation
- reduced motion

---

# 78. Performance

Layout components should:

- avoid unnecessary rerenders
- avoid local state
- avoid expensive calculations

They should remain lightweight.

---

# 79. AI Constraints

Never:

- hardcode spacing repeatedly
- duplicate layout wrappers
- create multiple containers
- nest containers unnecessarily

Reuse existing layout primitives.

---

# 80. Definition of Done

Core Layout implementation is complete when:

- RootLayout exists
- Container exists
- Section wrapper exists
- Grid system implemented
- Typography hierarchy applied
- Responsive spacing verified
- Accessibility preserved

---

# SPEC-14 — AI Implementation Playbook

**Version:** 1.0

**Status:** Production Ready

**Priority:** Critical

---

# Part 5.2 — Navigation Components

---

# 81. Navigation Philosophy

Navigation is the primary interaction layer of the portfolio.

It should feel:

- effortless
- predictable
- responsive
- lightweight

Navigation must never distract from the portfolio content.

Motion should enhance orientation, not become the main attraction.

---

# 82. Navigation Structure

The global navigation consists of:

```text
Navbar

├── Logo
├── Navigation Links
├── Theme Toggle
├── Resume Button
└── Mobile Menu Button
```

Desktop and mobile share the same data source.

Never duplicate navigation data.

---

# 83. Navbar

## Purpose

Provides persistent navigation across the portfolio.

---

## Responsibilities

- Brand identity.
- Section navigation.
- Resume access.
- Theme switching.
- Mobile navigation trigger.

---

## Behavior

Desktop

- fixed
- transparent initially
- blurred after scrolling
- hides unnecessary visual weight

Mobile

- compact
- touch friendly
- collapsible

---

## Requirements

Navbar must remain accessible at every scroll position.

---

# 84. Logo

## Purpose

Represents personal identity.

---

## Behavior

Click

↓

Scroll to Hero section.

---

## Hover

Very subtle scale.

No rotation.

No excessive animation.

---

## Accessibility

Must include:

```html
aria-label="Home"
```

---

# 85. Navigation Links

Navigation items.

```text
About

Skills

Experience

Projects

Contact
```

---

## Behavior

Click

↓

Smooth scroll.

---

Current section

↓

Highlighted.

---

Hover

↓

Micro interaction only.

---

## Active State

The active section should update automatically while scrolling.

Prefer Intersection Observer.

Avoid manual scroll listeners unless required.

---

# 86. Resume Button

## Purpose

Provides immediate access to resume.

---

## Behavior

Desktop

Visible.

---

Mobile

Visible inside menu.

---

## Interaction

Hover

↓

Background transition.

↓

Small lift.

↓

Cursor feedback.

Avoid dramatic effects.

---

# 87. Theme Toggle

## Purpose

Switch between:

- Light
- Dark

Future support:

- System

---

## Animation

Theme transition should be smooth.

Avoid flashing.

---

## Persistence

Remember user preference.

Preferred.

```text
localStorage
```

---

# 88. Mobile Navigation

Activated by:

Hamburger button.

---

Menu style.

```text
Full Screen Overlay
```

or

```text
Side Sheet
```

Choose one.

Remain consistent.

---

## Behavior

Open

↓

Background locked.

↓

Focus trapped.

↓

Menu animation.

---

Close

↓

Return focus.

↓

Restore scrolling.

---

# 89. Mobile Menu

Contains:

```text
Navigation

↓

Resume

↓

Theme Toggle

↓

Social Links
```

Avoid creating a separate mobile navigation structure.

Reuse existing navigation data.

---

# 90. Scroll Behavior

Navigation should respond to scrolling.

Top

↓

Transparent.

---

Scrolled

↓

Blur background.

↓

Border appears.

↓

Reduced height (optional).

---

Fast scroll

↓

No jitter.

No layout shift.

---

# 91. Scroll Spy

Current section should update automatically.

Preferred implementation.

```text
Intersection Observer
```

Avoid continuously calculating scroll position.

---

# 92. Motion Specification

Recommended animation sequence.

Navbar

↓

Fade

↓

Blur

↓

Slide

---

Menu

↓

Fade

↓

Scale

↓

Stagger Navigation

---

Navigation Links

↓

Hover underline.

↓

Micro translate.

↓

Opacity transition.

Motion duration.

Approximately.

```text
150–250 ms
```

Avoid slow navigation.

---

# 93. Keyboard Navigation

Support:

```text
Tab

Shift + Tab

Enter

Escape
```

Escape should close mobile menu.

Focus order should remain logical.

---

# 94. Accessibility

Navigation should provide:

- semantic nav element
- aria labels
- visible focus ring
- sufficient touch targets
- keyboard navigation
- screen reader compatibility

Minimum touch target.

```text
44 × 44 px
```

---

# 95. Performance

Navigation should:

- avoid rerendering entire page
- avoid expensive scroll listeners
- avoid unnecessary state updates

Scroll behavior should remain smooth.

---

# 96. AI Constraints

Never:

- hardcode navigation twice
- duplicate menu items
- create different desktop/mobile data
- animate every property
- use scroll polling when Intersection Observer is sufficient

Navigation should remain data-driven.

---

# 97. Definition of Done

Navigation implementation is complete when:

- Navbar implemented.
- Logo functional.
- Navigation links scroll correctly.
- Active section updates automatically.
- Theme toggle works.
- Resume button works.
- Mobile navigation complete.
- Keyboard navigation verified.
- Accessibility verified.
- Responsive behavior verified.
- Motion matches specification.

---

# SPEC-14 — AI Implementation Playbook

**Version:** 1.0

**Status:** Production Ready

**Priority:** Critical

---

# Part 5.3 — Landing Sections

---

# 98. Landing Page Philosophy

The landing page should communicate:

- who I am
- what I build
- why it matters
- evidence through projects
- how to contact me

Every section should naturally lead visitors to the next.

Avoid isolated sections.

---

# 99. Homepage Structure

The homepage follows this order.

```text
Navbar

↓

Hero

↓

About

↓

Skills

↓

Experience

↓

Projects

↓

Contact

↓

Footer
```

Do not change this order without updating the specifications.

---

# 100. Hero Section

## Purpose

Capture attention within the first few seconds.

Explain identity immediately.

---

## Responsibilities

- Personal introduction.
- Primary role.
- Short value proposition.
- Primary CTA.
- Secondary CTA.
- Hero portrait.
- Background motion.

---

## Layout

Desktop

```text
Text

↓

Portrait
```

Mobile

```text
Text

↓

CTA

↓

Portrait
```

---

## Required Content

- Name
- Professional title
- One-sentence introduction
- CTA
- Social links

---

## Motion

- Text reveal.
- Portrait reveal.
- Background motion.
- CTA hover.
- Scroll indicator.

Avoid excessive entrance animations.

---

## Accessibility

Hero must contain exactly one H1.

---

# 101. About Section

## Purpose

Explain the person behind the projects.

Not a biography.

An engineering introduction.

---

## Responsibilities

Explain:

- background
- specialization
- interests
- current focus

---

## Layout

```text
Photo

↓

Description

↓

Highlights
```

---

## Highlights

Examples.

- Backend Development
- AI Engineering
- Problem Solving
- Continuous Learning

---

## Motion

Subtle reveal only.

Content should remain the focus.

---

# 102. Skills Section

## Purpose

Present technical capabilities.

Do not become a technology dump.

---

## Categories

Frontend

Backend

AI

Database

Cloud

Tools

Languages

---

## Representation

Prefer grouped cards.

Avoid endless badge walls.

---

## Behavior

Hover

↓

Description appears.

Optional.

Experience level visualization.

Avoid fake percentages.

---

## Motion

Stagger animation.

Small hover interactions.

---

# 103. Experience Section

## Purpose

Display engineering growth.

---

## Content

Education.

Organizations.

Projects.

Leadership.

Achievements.

---

## Layout

Vertical timeline.

---

## Timeline Card

Contains.

- Title
- Organization
- Period
- Description
- Technologies

---

## Motion

Scroll reveal.

Timeline progress indicator.

---

# 104. Projects Preview

## Purpose

Encourage visitors to explore case studies.

Not replace them.

---

## Responsibilities

Display featured projects only.

Each card should summarize.

- project
- category
- technologies
- short description

---

## CTA

Every project should link to:

Full Case Study.

---

## Layout

Desktop

```text
Grid
```

Mobile

```text
Stack
```

---

## Motion

Card hover.

Image reveal.

Cursor interaction.

Micro parallax.

---

# 105. Contact Section

## Purpose

Provide clear communication channels.

Reduce friction.

---

## Content

- Email
- GitHub
- LinkedIn
- Resume

Optional.

Contact form.

---

## CTA

Encourage collaboration.

Not sales.

---

## Motion

Minimal.

Focus should remain on interaction.

---

# 106. Footer

## Responsibilities

Display.

- copyright
- navigation
- social links
- credits (optional)

Footer should feel lightweight.

---

# 107. Section Transition

Each section should naturally lead into the next.

Recommended flow.

```text
Hero

↓

About

↓

Skills

↓

Experience

↓

Projects

↓

Contact
```

Avoid abrupt visual changes.

---

# 108. Scroll Experience

Scrolling should feel continuous.

Avoid:

- sudden layout shifts
- excessive spacing
- repeated animation patterns

Each section should introduce slight variation while maintaining consistency.

---

# 109. Responsive Rules

Every section should support.

Desktop.

Tablet.

Mobile.

Without changing content hierarchy.

Only layout should adapt.

---

# 110. Accessibility

Each section should provide.

- semantic landmarks
- heading hierarchy
- keyboard accessibility
- readable typography
- sufficient spacing
- reduced motion support

---

# 111. Performance

Landing page should.

- lazy load heavy assets
- optimize images
- defer below-the-fold media
- avoid unnecessary animation calculations

Prioritize smooth scrolling.

---

# 112. AI Constraints

Never.

- duplicate section content
- repeat technology lists
- create decorative sections without purpose
- sacrifice readability for animation

Every section must communicate information before decoration.

---

# 113. Definition of Done

Landing implementation is complete when.

- Hero complete.
- About complete.
- Skills complete.
- Experience complete.
- Projects preview complete.
- Contact complete.
- Footer complete.
- Responsive verified.
- Accessibility verified.
- Motion matches specification.

---

