# 03. UI/UX Specification

## Personal Portfolio Website — Nabil Makarim

---

### 1. Hero Visual Asset Treatment

Asset: `ditther-100726-044704-dither-blend.jpg`

- **Container geometry:** `rounded-2xl` or `rounded-3xl` (squircle, no hard corners).
- **Hairline border interaction:**
  ```html
  className="border border-white/5 hover:border-[#C5A880] transition-colors duration-500 ease-out"
  ```
- **Gradient mask** (merge image lower edge into bg canvas):
  ```html
  className="mask-image-[linear-gradient(to_bottom,rgba(0,0,0,1)_70%,rgba(0,0,0,0)_100%)]"
  ```
- Color note: portrait's inherent gold light naturally aligns with `accent-primary` (#C5A880) — no extra color grading needed.

---

### 2. Motion Primitives

**Library decision (open item):** spec below uses Framer-Motion-style API (spring physics). This conflicts with Anti-Dependency stance in 05_Tech_Spec.md — must resolve there: either whitelist Framer Motion as exception, or rewrite specs below in native CSS/Web Animations API before build.

- **Page entry choreography:**
  - `staggerChildren: 0.08`
  - `type: "spring", stiffness: 100, damping: 15`
  - Rigid `ease-in` animations banned.
- **Numeric counters:** high-importance metrics (e.g. AI validation rate %) animate via smooth scrolling digit increment on viewport entry.

---

### 3. Interaction States

- Hover: border color transition 500ms ease-out (see hairline border above).
- Active nav state: text/underline shifts to `accent-primary`.
- Focus states: must remain visible for keyboard nav (accessibility — do not strip outline without replacement).

---

### 4. Layout Guardrails

- No crude block transitions between sections — visual continuity via gradient mask + consistent card radius.
- Section entry animation triggers on scroll-into-view, not on page load (avoid layout thrash).

---

### 5. Responsive Breakpoints

Standard Tailwind scale, mobile-first:

| Breakpoint | Width | Layout behavior |
|---|---|---|
| Base (mobile) | <640px | Single column, stacked sections, hero image above text |
| `sm` | ≥640px | Slight padding increase, no structural change |
| `md` | ≥768px | Tablet — project cards 2-col grid |
| `lg` | ≥1024px | Desktop — hero 2-col (image + text side by side), project cards 2-col |
| `xl` | ≥1280px | Max content width capped (e.g. 1280px container), extra whitespace margins |

Nav: hamburger/collapsed below `md`, full horizontal nav from `md` up.

---

### 6. Out of Scope for This Document

Component-level prop/state contracts → 04_Component_Spec.md. Library/package pinning, perf budget → 05_Tech_Spec.md.
