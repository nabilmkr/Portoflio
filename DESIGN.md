---
name: Nabil Makarim Portfolio
description: Premium Editorial Dark theme for Nabil Makarim's Interactive 3D & Full-Stack Portfolio
colors:
  bg-primary: "#111317"
  bg-surface: "#1A1D24"
  accent-primary: "#C5A880"
  accent-secondary: "#4A6B82"
  text-heading: "#EAEFF5"
  text-body: "#94A3B8"
typography:
  display:
    fontFamily: "Syne, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.05em"
  headline:
    fontFamily: "Syne, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Syne, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Onest, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Onest, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    letterSpacing: "0.05em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.accent-primary}"
    textColor: "{colors.bg-primary}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "#d4b890"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text-heading}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  card:
    backgroundColor: "{colors.bg-surface}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.xl}"
    padding: "24px"
---

# Design System: Nabil Makarim Portfolio

## Overview

**Creative North Star: "Premium Editorial Dark"**

A high-craft digital aesthetic defined by deep obsidian fields, solid slate containers, warm alabaster typography, and muted champagne gold accents. Built to present engineering rigor alongside bespoke 3D interactive craft.

Key Characteristics:
- Sharp structural lines paired with squircle container geometry (`rounded-2xl` / `rounded-3xl`).
- High-contrast, scannable editorial typography hierarchy.
- Zero neon or glassmorphism gimmicks; solid desaturated surfaces only.
- Hairline subtle borders (`border-white/5`) with champagne gold hover interactions.

## Colors

Strict 6-token palette grounded in deep obsidian and muted metallic accents.

### Primary
- **Champagne Gold** (`#C5A880`): Reserved for main titles, active navigation states, primary buttons, and critical callouts.

### Secondary
- **Tech Steel Blue** (`#4A6B82`): Applied to tech stack tags, minor category badges, and auxiliary icons.

### Neutral
- **Deep Obsidian Black** (`#111317`): Base page background color.
- **Soft Slate** (`#1A1D24`): Card and container surface background.
- **Warm Alabaster White** (`#EAEFF5`): Primary text headings and active titles.
- **Muted Mallow Gray** (`#94A3B8`): Body paragraph text and subheadings.

### Named Rules
**The Champagne Rarity Rule.** Champagne Gold (`#C5A880`) is restricted to ≤10% of any viewport to preserve visual dominance and intentionality.

## Typography

**Display & Body Font:** Inter (sans-serif)

### Hierarchy
- **Display** (700, 36px–60px, 1.1): Hero section headline and main introduction.
- **Headline** (700, 30px–36px, 1.2): Section titles (Projects, Skills, Experience, Contact).
- **Title** (600, 20px–24px, 1.3): Project titles, card headers, role names.
- **Body** (400, 16px, 1.6): Paragraph descriptions, case study details.
- **Label** (500, 14px, uppercase/tracking-wider): Category tags, dates, skill labels.

## Layout

Single-Page Application (SPA) layout utilizing Tailwind 4px spacing scale. Container widths capped at `max-w-7xl` with responsive side padding (`px-4 sm:px-6 lg:px-8`).

## Elevation & Depth

Flat by default with subtle surface contrast (`#1A1D24` over `#111317`). No ambient drop shadows. Depth is created exclusively via elevation layer contrast, 3D Canvas interactivity, and subtle hairline border glows on hover.

## Shapes

- **Containers & Cards:** `rounded-2xl` (16px) or `rounded-3xl` (24px) squircle radius.
- **Buttons & Tags:** `rounded-full` (pill style) or `rounded-lg` (8px).

## Components

### Buttons
- **Primary:** Background `#C5A880`, Text `#111317`, `rounded-full`, px-6 py-3, font-semibold. Hover: subtle scale and brightness shift.
- **Secondary:** Background `transparent`, Border `border-white/10`, Text `#EAEFF5`, `rounded-full`, px-6 py-3. Hover: `border-[#C5A880]`.

### Cards
- **Project & Experience Cards:** Background `#1A1D24`, Border `border-white/5`, Radius `rounded-2xl`, Padding `p-6 md:p-8`. Hover: `border-[#C5A880]/30`.

### Navigation
- **Fixed Top Header:** Floating glass/solid bar (`bg-[#111317]/80 backdrop-blur-md`), pill outline, active indicator in `#C5A880`.

## Do's and Don'ts

### Do:
- **Do** use strict palette tokens (`#111317`, `#1A1D24`, `#C5A880`, `#4A6B82`, `#EAEFF5`, `#94A3B8`).
- **Do** use hairline borders (`border-white/5`) for quiet structure.
- **Do** maintain smooth-scroll performance and prefers-reduced-motion fallbacks.

### Don't:
- **Don't** add vibrant neon gradients, rainbow badges, or saturated accent colors.
- **Don't** use heavy blur glassmorphism or thick drop shadows.
- **Don't** mix inconsistent icon stroke weights (use Lucide 1.5px/2px).
