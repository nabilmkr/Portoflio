---
name: Nabil Makarim Portfolio
description: Warm Obsidian Editorial Dark theme for Nabil Makarim's Full-Stack Web & Applied AI Portfolio
colors:
  bg-primary: "#0d0d0c"
  bg-surface: "#141412"
  bg-surface-alt: "#1c1b18"
  accent-primary: "#e8613a"
  accent-soft: "rgba(232, 97, 58, 0.12)"
  text-heading: "#f4f0e8"
  text-body: "rgba(244, 240, 232, 0.68)"
  border: "rgba(255, 255, 255, 0.08)"
typography:
  display:
    fontFamily: "Syne, system-ui, sans-serif"
    weights: [700, 800]
    scope: "Hero H1 only"
    letterSpacing: "-0.04em"
  sans:
    fontFamily: "Onest, system-ui, sans-serif"
    weights: [400, 500, 600, 700, 800]
    scope: "H2-H6, metrics, metadata, body text"
    letterSpacing: "-0.03em"
---

# Design System: Warm Obsidian Editorial Dark

## 1. Aesthetic Identity

A refined, high-density editorial dark theme inspired by 21st.dev and modern Swiss typography, pairing deep obsidian charcoal surfaces with warm terracotta accents and soft cream typography.

## 2. Palette

- **Base Ground (`#0d0d0c`)**: Deep obsidian canvas eliminating harsh OLED black while preventing washed-out gray tones.
- **Card Surface (`#141412`)**: Low-elevation card surface with hairline borders (`border-white/10`).
- **Elevated Surface (`#1c1b18`)**: Elevated hover and active card backgrounds.
- **Accent Primary (`#e8613a`)**: Burnt terracotta orange for CTA buttons, active indicators, and focus rings.
- **Accent Soft (`rgba(232, 97, 58, 0.12)`)**: Translucent orange wash for tags, hover states, and glow highlights.
- **Text Heading (`#f4f0e8`)**: Soft cream with high contrast against dark ground.
- **Text Body (`rgba(244, 240, 232, 0.68)`)**: Secondary legible text with balanced contrast ratio.

## 3. Typography Rules

- **Hero H1 (`Syne`)**: Used strictly for the main hero headline to create a memorable architectural statement.
- **Section Headings H2–H6 (`Onest`)**: Set in `font-sans font-bold tracking-[-0.03em]` to eliminate over-wide, stretched characters and ensure tight, modern headline rhythm.
- **Engineering Numbers & Metrics (`Onest`)**: Metric counters (`GPA 3.49`, `6+`, `300+`, `800+`, `100%`) use `font-sans font-extrabold tracking-tight tabular-nums` for crisp readability.

## 4. Components & Elevation

- **Buttons**: Rounded-xl / full with smooth transitions. Primary buttons use `#e8613a` text in white.
- **Bento Cards**: `rounded-3xl border border-white/10 bg-[#141412]`, subtle ambient shadows.
- **Tabs**: Glassmorphism obsidian pill design with Framer Motion `layoutId` active indicator.
- **Modals**: Full viewport dark backdrop overlay with centered responsive dialog container.
