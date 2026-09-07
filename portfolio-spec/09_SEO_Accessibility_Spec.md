# 09. SEO & Accessibility Specification

## Personal Portfolio Website — Nabil Makarim

---

## Part A — SEO

### 1. Title Template

- Homepage: `Nabil Makarim — Full-Stack Web & Applied AI Developer`
- No sub-pages (SPA, single route) — no template variation needed.

### 2. Meta Description

`Portfolio of Nabil Makarim, Full-Stack Web & Applied AI Developer. AI-powered financial tracking, skill-gap analysis, and full-stack projects built with React, Laravel, and TensorFlow.` (under 160 chars)

### 3. Canonical

```html
<link rel="canonical" href="https://[final-domain]/" />
```
Open item: final domain not yet decided (custom domain vs `*.vercel.app`).

### 4. Robots

```html
<meta name="robots" content="index, follow" />
```
`public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://[final-domain]/sitemap.xml
```

### 5. Sitemap

Single-URL sitemap (SPA, one route) — `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://[final-domain]/</loc></url>
</urlset>
```

### 6. Schema.org — Person

Inject as JSON-LD in `index.html` `<head>`:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Nabil Makarim",
  "jobTitle": "Full-Stack Web & Applied AI Developer",
  "url": "https://[final-domain]/",
  "sameAs": [
    "https://github.com/nabilmkr",
    "https://linkedin.com/in/nabil-makarim16"
  ],
  "email": "nabilmkr16@gmail.com"
}
```

### 7. OpenGraph

```html
<meta property="og:title" content="Nabil Makarim — Full-Stack Web & Applied AI Developer" />
<meta property="og:description" content="[same as meta description §2]" />
<meta property="og:image" content="https://[final-domain]/og-image.jpg" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://[final-domain]/" />
```
Depends on `og-image.jpg` — open item, see 07_Asset_Manifest.md.

### 8. Twitter Card

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Nabil Makarim — Full-Stack Web & Applied AI Developer" />
<meta name="twitter:description" content="[same as meta description §2]" />
<meta name="twitter:image" content="https://[final-domain]/og-image.jpg" />
```

---

## Part B — Accessibility

### 9. Keyboard Navigation

- All interactive elements (nav links, CTA buttons, project links, form fields) reachable via `Tab`, activatable via `Enter`/`Space`.
- Tab order follows visual/DOM order — no `tabindex` hacks unless unavoidable.
- Mobile menu: `Escape` closes it, focus returns to menu toggle button.

### 10. Focus Ring

- Never remove `outline` without replacement.
- Custom focus style: 2px solid `accent-primary` (#C5A880), offset 2px — visible against dark background (`bg-primary` #111317).
```css
:focus-visible {
  outline: 2px solid #C5A880;
  outline-offset: 2px;
}
```

### 11. ARIA Labels

- Icon-only buttons (mobile menu toggle, social icons in footer/contact) — require `aria-label` (e.g. `aria-label="Open menu"`, `aria-label="GitHub profile"`).
- `<nav>` landmark: `aria-label="Main navigation"`.
- Form inputs: associated `<label>` (visually hidden if design omits visible label, never `placeholder`-only).

### 12. Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
Framer Motion: use `useReducedMotion()` hook to conditionally disable spring stagger in `<Hero />` and section entries — fall back to instant/opacity-only transition.

### 13. Screen Reader Order

- DOM order must match visual order (no CSS `order` property creating mismatch between visual and reading sequence).
- Hero image: `alt="Nabil Makarim portrait"` (descriptive, not decorative — it's a primary content image).
- Decorative elements (gradient overlays, border accents): `aria-hidden="true"`.
- Section headings: proper hierarchy (`h1` once for name/hero, `h2` per major section, no skipped levels).

### 14. Color Contrast

Verify against 02_Design_System.md palette:
- `text-heading` (#EAEFF5) on `bg-primary` (#111317) — passes AA/AAA (high contrast by design).
- `text-body` (#94A3B8) on `bg-primary` (#111317) — verify AA minimum (4.5:1) before final build; muted gray on dark can be borderline, test with contrast checker.
- `accent-primary` (#C5A880) text on `bg-surface` (#1A1D24) — verify AA for any text usage (not just decorative).

---

### 15. Out of Scope for This Document

Component-level implementation → 04_Component_Spec.md. Performance/bundle budget → 05_Tech_Spec.md.
