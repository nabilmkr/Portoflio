# 02. Design System

## Personal Portfolio Website — Nabil Makarim

Theme: **Premium Editorial Dark** — sharp structural lines, solid charcoal fields, editorial typography. No neon, no glassmorphism, no unstable transparency.

---

### 1. Color Palette

| Token | Hex | Usage |
|---|---|---|
| `bg-primary` | `#111317` | Deep Obsidian Black — page base |
| `bg-surface` | `#1A1D24` | Soft Slate — card/container background |
| `accent-primary` | `#C5A880` | Muted Champagne Gold — titles, active nav, primary CTA |
| `accent-secondary` | `#4A6B82` | Tech Steel Blue — tags, icons, sub-headings |
| `text-heading` | `#EAEFF5` | Warm Alabaster White — headers, key metrics |
| `text-body` | `#94A3B8` | Muted Mallow Gray — body copy |

Rule: no other colors outside this table. No gradients except the one defined in 03_UI_UX_Spec.md (hero mask).

---

### 2. Typography

- **Family:** editorial sans-serif (e.g. Inter or similar) — final font choice pinned in 05_Tech_Spec.md.
- **Heading weight:** 600–700, color `text-heading`.
- **Body weight:** 400, color `text-body`.
- **Scale:** standard modular scale, base 16px. Exact step sizes → defined at component build time in 04_Component_Spec.md.

---

### 3. Spacing Scale

Use Tailwind default spacing scale (4px base unit). No custom spacing tokens unless component spec explicitly requires it. Avoid arbitrary values (`p-[13px]`) — stick to scale steps.

---

### 4. Border Radius

- Cards / image containers: `rounded-2xl` or `rounded-3xl` (squircle geometry, no sharp corners on containers).
- Buttons / tags: `rounded-full` or `rounded-lg` — pinned per component in 04_Component_Spec.md.

---

### 5. Iconography

- **Single style only:** desaturated line-art (Lucide Icons or matching custom SVG).
- **Stroke width:** fixed 1.5px or 2px — pick one, apply everywhere, no mixing.
- Bold, filled, colorful, or cartoonish icons: **prohibited**.

---

### 6. Borders

- Hairline border: 1px, low-opacity white (`border-white/5`), hover state shifts to `accent-primary`.
- Full interaction spec (hover transition timing) → 03_UI_UX_Spec.md.

---

### 7. Rendering Base (Global CSS)

```css
html {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

---

### 8. Out of Scope for This Document

Animation timing, motion primitives, gradient masking, layout guardrails → 03_UI_UX_Spec.md. Component-level prop/state/responsive rules → 04_Component_Spec.md.
