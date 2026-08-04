# 07. Asset Manifest

## Personal Portfolio Website — Nabil Makarim

---

### 1. Images

| Asset | Source File | Target Path | Format/Notes |
|---|---|---|---|
| Hero portrait | `ditther-100726-044704-dither-blend.jpg` | `src/assets/images/hero-portrait.webp` | Convert to WebP + AVIF, JPG fallback. Explicit width/height locked (see 05_Tech_Spec.md CLS rule). |
| Gap Sense thumbnail | *not yet provided* | `src/assets/images/projects/gap-sense.webp` | Needs screenshot/mockup from Streamlit app or Hugging Face demo. |
| Cuanify thumbnail | *not yet provided* | `src/assets/images/projects/cuanify.webp` | Needs app screenshot (mobile mockup frame recommended, React Native app). |
| Luxe News thumbnail | *not yet provided* | `src/assets/images/projects/luxe-news.webp` | Needs screenshot of live/local frontend. |
| Smart Fan CV Control thumbnail | *not yet provided* | `src/assets/images/projects/smart-fan.webp` | Needs photo/demo capture of physical device + CV overlay. |

**Open item:** all 4 project thumbnails missing — need screenshots/mockups before build.

---

### 2. Documents

| Asset | Source | Target Path | Notes |
|---|---|---|---|
| Resume PDF | `resume__FIXX_.pdf` (uploaded) | `src/assets/resume/Nabil_Makarim_Resume.pdf` | Confirm this is final version before linking as CTA download. Availability text inside PDF says "late June 2026" — outdated, needs resume revision per 06_Content.md open item. |

---

### 3. Icons

- Icon set: Lucide Icons (per 02_Design_System.md — single line-art style, 1.5px or 2px stroke).
- No custom icon files needed — imported via `lucide-react` package (already pinned in 05_Tech_Spec.md).
- Tech stack tag icons (React, Laravel, Python logos etc.) — **open item:** decide whether to use brand logos (breaks "single icon style" rule) or skip logos, text-only tags. Recommend text-only tags to stay consistent with design system.

---

### 4. Favicon

**Open item — not yet provided.** Needs:
- `favicon.ico` (multi-size) or `favicon.svg`
- Target path: `public/favicon.ico`
- Suggest simple monogram ("NM") in `accent-primary` (#C5A880) on `bg-primary` (#111317), matches editorial theme.

---

### 5. Open Graph / Social Preview

**Open item — not yet specified in any prior doc.** Needs:
- `og-image.jpg` (1200×630px recommended)
- Meta tags: title, description, og:image — to be added in `index.html` at build time.

---

### 6. Summary of Missing Assets (action needed before build)

1. 4 project thumbnails (Gap Sense, Cuanify, Luxe News, Smart Fan CV Control)
2. Favicon
3. OG/social preview image
4. Confirmed final resume PDF (post-revision)
