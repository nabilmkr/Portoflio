# 10 — Motion & Interaction Specification

**Project:** Nabil Makarim Portfolio  
**Version:** 1.0  
**Status:** Ready for Implementation  
**Stack:** React + Vite + Tailwind CSS + Motion for React

---

## 1. Purpose

This document defines intentional motion, interaction, transition, and animation behavior.

Motion exists to:

- guide attention
- communicate hierarchy
- provide feedback
- connect related content
- make transitions feel continuous
- reinforce personal branding

Motion must never exist only for decoration.

Priority:

1. Usability
2. Accessibility
3. Performance
4. Visual polish

---

## 2. Motion Philosophy

> Quietly impressive.

Portfolio should feel:

- intentional
- technical
- modern
- responsive
- premium
- human

Portfolio must NOT feel:

- noisy
- gimmicky
- game-like
- overloaded
- slow
- difficult to navigate

---

## 3. Motion Hierarchy

### Tier 1 — Must Have

- page entrance sequence
- section reveal
- project card interaction
- navigation active-state transition
- project detail transition
- responsive motion behavior
- reduced-motion support

### Tier 2 — High Value

- scroll-linked hero transition
- skill-to-project interaction
- animated metrics
- image reveal
- timeline progression

### Tier 3 — Optional

- subtle cursor interaction
- magnetic buttons
- ambient background motion
- short boot sequence

---

## 4. Motion Tokens

Centralize motion values.

```ts
export const motionConfig = {
  duration: {
    instant: 0.15,
    fast: 0.25,
    normal: 0.4,
    moderate: 0.6,
    slow: 0.9,
  },

  ease: {
    standard: [0.22, 1, 0.36, 1],
    entrance: [0.16, 1, 0.3, 1],
    exit: [0.7, 0, 0.84, 0],
  },

  spring: {
    gentle: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      mass: 0.8,
    },

    responsive: {
      type: "spring",
      stiffness: 260,
      damping: 25,
      mass: 0.5,
    },
  },
};
```

Do not scatter arbitrary animation values throughout components.

---

## 5. Global Motion Rules

### Entrance

Default:

```text
opacity: 0
y: 20–32px
        ↓
opacity: 1
y: 0
```

Recommended duration: `0.4s – 0.8s`.

### Exit

Exit should be faster than entrance:

```text
opacity: 1 → 0
y: 0 → -8px
```

Duration: `0.2s – 0.4s`.

### Stagger

Use only for related elements.

Recommended stagger: `0.05s – 0.12s`.

Do not stagger every element on page.

---

## 6. Reduced Motion

MUST respect:

```css
@media (prefers-reduced-motion: reduce)
```

When enabled:

- remove parallax
- remove cursor-following effects
- remove large transform animations
- remove infinite decorative animations
- reduce transition duration
- preserve useful opacity transitions
- preserve functional state changes

Example:

```tsx
const prefersReducedMotion = useReducedMotion();
```

Normal:

```text
opacity + transform + spring
```

Reduced motion:

```text
opacity only
```

---

# 7. Page Entrance

**ID:** `MOTION-PAGE-001`  
**Priority:** Tier 1

### Trigger

Initial page load.

### Sequence

```text
0.00s  page background visible
0.10s  navigation enters
0.20s  hero portrait begins reveal
0.30s  name enters
0.45s  role enters
0.60s  supporting text enters
0.75s  CTA enters
```

Sequence must be fast and must not block interaction.

---

# 8. Hero Portrait

**ID:** `MOTION-HERO-001`  
**Priority:** Tier 1

### Initial

```text
opacity: 0
scale: 0.96
y: 20px
```

### Final

```text
opacity: 1
scale: 1
y: 0
```

Duration: `0.6s – 0.9s`.

### Desktop Pointer Interaction

Optional subtle parallax:

```text
x: ±8px
y: ±4px
```

Use spring smoothing.

Portrait must never visibly chase pointer.

### Mobile

Disable pointer parallax.

---

# 9. Hero Scroll Transition

**ID:** `MOTION-HERO-002`  
**Priority:** Tier 2

As user scrolls away:

```text
portrait scale:
1.00 → 0.88

portrait y:
0 → -60px

hero content opacity:
1 → 0

hero content y:
0 → -24px
```

Use:

```text
useScroll
useTransform
useSpring
```

Transition must feel continuous.

---

# 10. Navigation

**ID:** `MOTION-NAV-001`  
**Priority:** Tier 1

Active navigation indicator transitions between items.

Recommended:

```tsx
<motion.div layoutId="nav-indicator" />
```

Hover:

```text
text color transition
subtle opacity change
scale: 1.00 → 1.02
```

Mobile uses native touch interaction.

---

# 11. Section Reveal

**ID:** `MOTION-SECTION-001`  
**Priority:** Tier 1

Trigger when section enters viewport.

Recommended:

```text
whileInView
```

or:

```text
useInView
```

Initial:

```text
opacity: 0
y: 24px
```

Final:

```text
opacity: 1
y: 0
```

Trigger once where possible.

Do not replay aggressively on every scroll.

---

# 12. Skills Interaction

**ID:** `MOTION-SKILLS-001`  
**Priority:** Tier 2

Do not use arbitrary skill percentages.

Skills should connect to real projects.

On hover or focus:

```text
skill scale:
1.00 → 1.05

related projects:
opacity 0.45 → 1.00

unrelated projects:
opacity 1.00 → 0.45
```

Keyboard focus must produce equivalent meaningful state.

No essential information may be available only through hover.

---

# 13. Project Card

**ID:** `MOTION-PROJECT-001`  
**Priority:** Tier 1

On hover/focus:

```text
image scale:
1.00 → 1.04

overlay:
opacity 0 → 1
```

Duration: `0.25s – 0.4s`.

Do not:

- rotate aggressively
- use excessive bounce
- use large scale
- use unnecessary glow
- make card jump

Keyboard focus must have a clear visible state.

---

# 14. Project Image Reveal

**ID:** `MOTION-PROJECT-002`  
**Priority:** Tier 2

When image enters viewport, optional reveal:

```text
clip-path:
inset(0 0 100% 0)
        ↓
inset(0 0 0% 0)
```

Alternative:

```text
opacity + y translation
```

Use only when it improves visual storytelling.

---

# 15. Project Detail Transition

**ID:** `MOTION-PROJECT-003`  
**Priority:** Tier 1

Concept:

```text
Project Card
    ↓
Project Detail
```

Where appropriate:

```tsx
layoutId
AnimatePresence
layout
```

Requirements:

- preserve visual continuity
- avoid abrupt replacement
- support back navigation
- support keyboard navigation
- support reduced motion

Reduced motion:

```text
opacity fade
```

---

# 16. Experience Timeline

**ID:** `MOTION-EXPERIENCE-001`  
**Priority:** Tier 2

Timeline line progressively reveals:

```text
height: 0% → 100%
```

Nodes:

```text
opacity: 0 → 1
scale: 0.8 → 1
```

Each item becomes active near its viewport position.

---

# 17. Metrics

**ID:** `MOTION-METRICS-001`  
**Priority:** Tier 2

Use real portfolio data only.

Examples:

```text
4 departments
6 corporate sponsors
9 community partners
800+ attendees
300+ seminar attendees
20+ competitive programming teams
```

Optional number animation:

```text
0 → final value
```

Duration: `0.8s – 1.5s`.

Do not fake or invent metrics.

---

# 18. Cursor Interaction

**ID:** `MOTION-CURSOR-001`  
**Priority:** Tier 3

Desktop only.

Optional states:

```text
default:
small dot

interactive:
subtle expanded state
```

Examples:

```text
button:
[ VIEW ]

project:
[ OPEN ]
```

Cursor must never block interaction or replace semantic labels.

Disable on touch devices.

---

# 19. Magnetic Buttons

**ID:** `MOTION-CURSOR-002`  
**Priority:** Tier 3

Optional pointer attraction.

Maximum movement:

```text
x: ±6px
y: ±6px
```

Use spring smoothing.

Never make button difficult to click.

---

# 20. Ambient Background Motion

**ID:** `MOTION-BG-001`  
**Priority:** Tier 3

Possible:

- slow gradient movement
- subtle grid movement
- low-contrast particles
- ambient glow

Must be:

```text
slow
subtle
low contrast
non-distracting
```

Reduced motion disables ambient animation.

---

# 21. Optional Boot Sequence

**ID:** `MOTION-INTRO-001`  
**Priority:** Tier 3

Example:

```text
INITIALIZING PORTFOLIO...
PROJECTS ........ OK
EXPERIENCE ...... OK
SKILLS .......... OK
```

Rules:

- approximately 1 second maximum
- must not block access
- must be skippable
- should not replay on every navigation
- avoid hacker-terminal clichés

Remove if it harms first-load performance.

---

# 22. Motion Interaction Matrix

| Component | Trigger | Motion | Priority |
|---|---|---|---|
| Hero | page load | staggered entrance | Tier 1 |
| Portrait | pointer | subtle parallax | Tier 2 |
| Hero | scroll | scale/fade transition | Tier 2 |
| Navigation | active section | shared indicator | Tier 1 |
| Section | viewport | reveal | Tier 1 |
| Skill | hover/focus | project highlighting | Tier 2 |
| Project Card | hover/focus | image scale/overlay | Tier 1 |
| Project Detail | navigation | shared transition | Tier 1 |
| Timeline | scroll | line progression | Tier 2 |
| Metrics | viewport | number animation | Tier 2 |
| Cursor | pointer | context state | Tier 3 |
| Button | pointer | magnetic movement | Tier 3 |
| Background | continuous | ambient movement | Tier 3 |
| Intro | first load | short boot sequence | Tier 3 |

---

# 23. Mobile Rules

Mobile is not a smaller desktop.

Disable or simplify:

- custom cursor
- magnetic buttons
- pointer parallax
- hover-only interaction
- excessive background animation

Preserve:

- tap feedback
- focus states
- section reveal
- project transitions
- essential state changes

---

# 24. Performance Rules

Prefer animating:

```text
transform
opacity
```

Avoid animating layout properties where possible:

```text
width
height
top
left
margin
```

Avoid unnecessary:

- re-renders
- event listeners
- animation loops
- expensive calculations
- large canvas effects

Test on desktop and mobile.

---

# 25. AI Agent Implementation Rules

Before implementing motion:

1. Read this document.
2. Read relevant UI/UX specification.
3. Read relevant Component Specification.
4. Identify trigger.
5. Identify initial state.
6. Identify target state.
7. Identify responsive behavior.
8. Identify reduced-motion behavior.
9. Identify performance implications.

If information is missing:

```text
MISSING MOTION SPECIFICATION
```

Do not invent a new interaction without approval.

---

# 26. Acceptance Criteria

- [ ] Motion follows this document.
- [ ] Motion follows UI/UX specification.
- [ ] Motion follows Design System.
- [ ] Motion does not block interaction.
- [ ] Motion works on mobile.
- [ ] Keyboard-equivalent behavior exists where relevant.
- [ ] Reduced motion is supported.
- [ ] No excessive animation exists.
- [ ] No unnecessary dependency is introduced.
- [ ] No motion is added without purpose.
- [ ] No unsupported content is invented.
- [ ] Performance remains acceptable.

---

# 27. Final Principle

Every motion must answer:

> What does this motion communicate?

If answer is only:

> It looks cool.

That is not enough.

Good motion communicates:

- where user is
- what changed
- what can be interacted with
- what content is related
- what deserves attention
- how one state became another

Goal is not maximum animation.

Goal is maximum intentionality.
