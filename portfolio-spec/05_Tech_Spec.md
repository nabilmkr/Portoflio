# 05. Tech Specification

## Personal Portfolio Website — Nabil Makarim

---

### 1. Stack

- **Framework:** React.js + Vite.
- **Styling:** Tailwind CSS, minified production build.
- **Language:** JavaScript (or TypeScript — pick TS for prop safety on `ProjectCardData` etc., recommended given component contracts in 04).
- **Motion:** **Framer Motion — whitelisted exception.** Reason: spring physics + stagger in 03/04 need real spring simulation, not fakeable cleanly with CSS alone. Everything else stays native (no Redux, no Zustand, no Lodash, no routing lib).

---

### 2. Anti-Dependency Rules (kept from original PRD)

- No Redux Toolkit / Zustand — local state via `useState` / `useContext` only.
- No Lodash — native `.map()` / `.filter()` / `.reduce()`.
- No routing lib — anchor tags + `scroll-behavior: smooth`.
- Scroll/intersection tracking — custom hook wrapping native `IntersectionObserver`.
- **Exception:** Framer Motion (see §1).

---

### 3. Hosting & Contact Form Decision

**Decision: Vercel.**
Reason: GitHub Pages is static-only — functional contact form would need third-party (Formspree/EmailJS) with its own dependency and reliability tradeoff. Vercel supports serverless API route, keeps form handling in-house, still fast Edge CDN delivery.

- Contact form: functional, submits via Vercel serverless function → forwards to email (e.g. Resend or Nodemailer via SMTP).
- Fallback: direct mailto/WhatsApp links always visible regardless of form status.

---

### 4. Folder Structure

```
src/
  components/
    Navbar.jsx
    Hero.jsx
    ProjectCard.jsx
    ProjectsSection.jsx
    SkillsSection.jsx
    ExperienceSection.jsx
    ContactSection.jsx
    Footer.jsx
    ui/
      Button.jsx
      Tag.jsx
      SectionWrapper.jsx
  hooks/
    useIntersectionObserver.js
  data/
    projects.js
    skills.js
    experience.js
  assets/
    images/
    icons/
    resume/
  styles/
    globals.css
  App.jsx
  main.jsx
api/
  contact.js        # Vercel serverless function
public/
  favicon.ico
```

---

### 5. Package List (pinned)

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "framer-motion": "^11.x",
    "lucide-react": "^0.x"
  },
  "devDependencies": {
    "vite": "^5.x",
    "tailwindcss": "^3.x",
    "postcss": "^8.x",
    "autoprefixer": "^10.x"
  }
}
```

`package-lock.json` committed, no version drift allowed.

---

### 6. Data Schema

Explicit shape, CMS-migration-friendly (plain JS files now, swap to CMS fetch later without touching component code — see 04_Component_Spec.md consumers).

```ts
type ProjectData = {
  id: string;              // slug, e.g. "gap-sense"
  title: string;
  focusDescription: string;
  techTags: string[];
  thumbnail: string;       // path, see 07_Asset_Manifest.md
  demoUrl?: string;
  repoUrl: string;
  featured: boolean;       // controls homepage display
  order: number;           // display sort order
};

type SkillGroup = {
  id: string;
  category: string;
  items: string[];
  order: number;
};

type WorkHistoryItem = {
  id: string;
  org: string;
  role: string;
  period: string;
  note: string;
  order: number;
};

type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  order: number;
};
```

`data/projects.js` filters by `featured` for homepage, sorts by `order`. Same pattern for skills/experience/certifications — one array, sorted, no hardcoded order in component.

---

### 6a. Error States

| Case | Handling |
|---|---|
| Project thumbnail fails to load | `<img onError>` fallback to placeholder (solid `bg-surface` block + project title text centered) |
| Section content loading (lazy) | Skeleton matching final height (see §9, CLS rule) |
| Resume PDF link 404 / missing | Disable button, show tooltip "Resume temporarily unavailable", never link to broken file |
| Projects array empty | Section hidden entirely (no "no projects found" — shouldn't happen in practice, but guard against build error) |
| Contact form network fail | Inline error message below form, form stays filled (don't clear input), fallback direct email/WhatsApp links stay visible always |
| Contact form success | Inline success confirmation, no page reload |

---

### 7. Deployment Pipeline

- Vercel auto-deploy on push to `main`.
- Compression: Brotli/Gzip active by default on Vercel Edge.
- Preview deploys on PR branches (free tier default).

---

### 8. Performance Budget (revised, realistic)

- LCP: under 2.5s on standard mobile network (was <1.8s — unrealistic given hero image + motion lib).
- FCP: under 1.8s.
- CLS: under 0.1 (target 0, hard ceiling 0.1) — enforced via explicit width/height on hero image, skeleton height locked to match lazy-loaded content.
- **JS bundle size: under 250KB (gzipped), initial load.** Framer Motion is the heaviest single dependency — if budget exceeded, use its `LazyMotion` + `domAnimation` feature subset instead of full import.
- Lighthouse Performance/Accessibility/Best Practices: all >90 (target >95 for Accessibility, per 09_SEO_Accessibility_Spec.md).

---

### 9. Asset Optimization

- `ditther-100726-044704-dither-blend.jpg` → convert to WebP/AVIF with JPG fallback, explicit `width`/`height` attributes.
- Lazy-load non-critical sections via `React.lazy()` + `Suspense`, skeleton fallback height-matched to prevent CLS.

---

### 10. Global CSS Rendering Base

```css
html {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

---

### 11. Analytics (minimal)

Tool: Vercel Analytics (zero-config, no extra script tag needed on Vercel hosting — avoids adding a new dependency).

Track these events:
- Resume download click
- Contact form submit (success)
- GitHub link click
- LinkedIn link click
- Project demo link click (per project)
- Scroll depth (25/50/75/100%) — optional, skip if adds bundle weight beyond budget in §8

---

### 12. Out of Scope for This Document

Actual copy → 06_Content.md. Asset file list/manifest → 07_Asset_Manifest.md. Build order → 08_Development_Roadmap.md. SEO/meta tags/accessibility detail → 09_SEO_Accessibility_Spec.md.
