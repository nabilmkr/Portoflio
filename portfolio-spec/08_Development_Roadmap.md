# 08. Development Roadmap

## Personal Portfolio Website — Nabil Makarim

---

### Phase 0 — Pre-Build Blockers (resolve first)

Must close before coding starts:

- [ ] 4 project thumbnails (see 07_Asset_Manifest.md)
- [ ] Favicon
- [ ] OG/social preview image
- [ ] Resume PDF finalized (availability date fixed, Cuanify/Smart Fan decision locked)
- [ ] Confirm footer tagline (06_Content.md open item)

---

### Coding Conventions

**Naming:**
- Components: PascalCase (`ProjectCard.jsx`).
- Hooks: camelCase, prefixed `use` (`useIntersectionObserver.js`).
- Data files: camelCase (`projects.js`).
- CSS/Tailwind: no custom class names beyond utility tokens (see 02_Design_System.md §3).
- IDs in data (project/skill/experience): kebab-case slug (`gap-sense`, `smart-fan-control`).

**Commit convention:** Conventional Commits — `feat:`, `fix:`, `style:`, `perf:`, `docs:`, `chore:`. Example: `feat: add ProjectCard component with hover animation`.

**Folder ownership:** each component owns its own file, no shared "misc" or "utils" dumping ground beyond `hooks/` (logic only, no UI).

**Animation constants:** centralize in `src/styles/motion.js` — export shared `staggerChildren`, `springConfig` objects, import into components instead of inlining magic numbers (keeps 03_UI_UX_Spec.md values in one place).

**Linting:** ESLint + Prettier, run on pre-commit (husky optional, manual `npm run lint` acceptable minimum). Config: standard React + Vite defaults, no custom rule set needed (YAGNI).

**Testing:** Vitest for `useIntersectionObserver` hook logic only (pure logic, worth testing). Full component test suite (Playwright/RTL) — **skip**, not worth the setup cost for a static 1-page portfolio; manual QA in Phase 7 covers this instead. Revisit if site grows beyond single page.

---

### Acceptance Criteria (per component, summary)

| Component | Acceptance |
|---|---|
| `<Navbar />` | Links scroll to correct section; active state updates on scroll; mobile menu opens/closes; keyboard-navigable (Tab + Enter) |
| `<Hero />` | Image loads with locked dimensions (no CLS); CTA buttons link correctly; entry animation respects `prefers-reduced-motion` |
| `<ProjectCard />` | Renders from data object only (no hardcoded content); thumbnail error falls back gracefully; all links open correctly (demo new tab, repo new tab) |
| `<SkillsSection />` | Renders all groups from data, sorted by `order` |
| `<ExperienceSection />` | Counter animates once on scroll-into-view, doesn't re-trigger on re-scroll |
| `<ContactSection />` | Form validates required fields; submit shows loading/success/error states; fallback links always visible |
| `<Footer />` | All social links correct, opens in new tab |

---

### Phase 1 — Project Scaffold

1. Init Vite + React project.
2. Install pinned packages (05_Tech_Spec.md §5).
3. Configure Tailwind (colors, spacing from 02_Design_System.md as theme tokens).
4. Set up folder structure exactly per 05_Tech_Spec.md §4.
5. Add global CSS rendering base (font smoothing rules).

**Done when:** blank page renders with Tailwind + theme colors working, no console errors.

---

### Phase 2 — Static Shell

1. Build `<Navbar />` (static links first, no scroll-spy yet).
2. Build `<Footer />`.
3. Build `<SectionWrapper />` primitive (padding, Intersection Observer hook wired but animation stubbed).
4. Wire up `App.jsx` with anchor-based smooth scroll.

**Done when:** all sections navigable via anchor links, no animation yet.

---

### Phase 3 — Content Sections (data-driven)

1. Create `data/projects.js`, `data/skills.js`, `data/experience.js` — populate from 06_Content.md.
2. Build `<Hero />` (static layout, no animation).
3. Build `<ProjectCard />` + `<ProjectsSection />`.
4. Build `<SkillsSection />`.
5. Build `<ExperienceSection />` (no counter animation yet).
6. Build `<ContactSection />` (links only, form deferred to Phase 5).

**Done when:** all content visible, responsive at all breakpoints (03_UI_UX_Spec.md §5), zero motion yet.

---

### Phase 4 — Motion & Polish

1. Add Framer Motion entry stagger to `<Hero />` and section entries.
2. Add hairline border hover + gradient mask on hero image.
3. Add numeric counter animation in `<ExperienceSection />`.
4. Add scroll-spy active state to `<Navbar />`.

**Done when:** all animations match 03_UI_UX_Spec.md spec, no layout shift introduced.

---

### Phase 5 — Contact Form + Serverless

1. Build `api/contact.js` Vercel serverless function.
2. Wire form state in `<ContactSection />`.
3. Test email delivery (Resend/Nodemailer).
4. Confirm fallback direct links still work if form fails.

**Done when:** test submission successfully delivers email.

---

### Phase 6 — Performance Pass

1. Convert hero image to WebP/AVIF, lock width/height.
2. Add `React.lazy()` + `Suspense` for below-fold sections, skeleton height-matched.
3. Run Lighthouse — target all metrics >90, LCP <2.5s, CLS 0 (05_Tech_Spec.md §8).
4. Fix any flagged accessibility issues (focus states, alt text, contrast).

**Done when:** Lighthouse scores pass threshold on both mobile and desktop simulation.

---

### Phase 7 — Deploy & QA

1. Push to `main`, verify Vercel auto-deploy.
2. Check all external links (GitHub, LinkedIn, demos, resume download) — zero broken links (01_PRD.md success metric).
3. Cross-browser check (Chrome, Safari, Firefox mobile+desktop).
4. Final review against all 9 spec docs — confirm no drift.

**Done when:** live URL passes full checklist, ready to share with recruiters.

---

### Dependency Notes

- Phase 3 cannot start until Phase 0 assets exist (thumbnails needed for `<ProjectCard />`).
- Phase 5 (form) blocked until hosting decision confirmed — already resolved as Vercel in 05_Tech_Spec.md.
- Phase 6 CLS fix depends on Phase 4 motion being finalized (skeleton height must match final animated content, not pre-animation state).
