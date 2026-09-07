# 04. Component Specification

## Personal Portfolio Website — Nabil Makarim

Note: motion API below assumes Framer Motion is whitelisted (see open item in 03_UI_UX_Spec.md / resolve in 05_Tech_Spec.md). If rejected, rewrite `animation` fields using native CSS transitions / Web Animations API.

---

### 1. `<Navbar />`

- **Props:** none (static links).
- **State:** `isMenuOpen: boolean` (mobile only), `activeSection: string` (scroll-spy).
- **Responsive:** hamburger below `md`, full horizontal links from `md` up.
- **Animation:** active link underline transitions color 300ms to `accent-primary`.

---

### 2. `<Hero />`

- **Props:** `imageSrc`, `title`, `availabilityTag`, `resumeUrl`, `contactUrl`.
- **State:** none (static).
- **Responsive:** stacked (image top, text below) on base; 2-col side-by-side from `lg`.
- **Animation:** entry stagger (`staggerChildren: 0.08`, spring `stiffness:100, damping:15`) on mount. Image hairline border hover per 03_UI_UX_Spec.md.

---

### 3. `<ProjectCard />`

- **Props:** `title`, `focusDescription`, `techTags: string[]`, `demoUrl?`, `repoUrl`.
- **State:** none.
- **Responsive:** full width base, 2-col grid from `md`.
- **Animation:** fade+slide-up on scroll-into-view (Intersection Observer trigger), stagger between sibling cards.

---

### 4. `<ProjectsSection />`

- **Props:** `projects: ProjectCardData[]` (4 items, see 05_Tech_Spec.md for data schema).
- **State:** none — static list, no filter/pagination (YAGNI).
- **Responsive:** grid per `<ProjectCard />` rules.

---

### 5. `<SkillsSection />`

- **Props:** `skillGroups: { category: string, items: string[] }[]`.
- **State:** none.
- **Responsive:** 1-col base, 2-col `md`, grouped card per category from `lg`.
- **Animation:** none required (static cards) — optional light fade-in on scroll.

---

### 6. `<ExperienceSection />`

- **Props:** `orgExperience`, `workHistory[]`.
- **State:** none.
- **Responsive:** timeline stacked vertical all breakpoints (no horizontal timeline — keep simple, YAGNI).
- **Animation:** numeric counter (sponsor count, attendee count) increments on scroll-into-view.

---

### 7. `<ContactSection />`

- **Props:** `email`, `whatsapp`, `linkedinUrl`, `githubUrl`.
- **State:** depends on form decision (open item, see 01_PRD.md §4E). If functional form added: `formData`, `submitStatus`.
- **Responsive:** stacked links base, inline row from `md`.
- **Animation:** icon hover color shift to `accent-secondary`.

---

### 8. `<Footer />`

- **Props:** none (static).
- **State:** none.

---

### 9. Shared Primitives

- `<Button variant="primary|secondary" />` — primary uses `accent-primary` bg, secondary uses hairline border only.
- `<Tag />` — small pill, `accent-secondary` text, used for tech stack tags.
- `<SectionWrapper />` — wraps each main section, handles Intersection Observer entry animation trigger, consistent vertical padding.

---

### 10. Out of Scope for This Document

Data shape for props (full schema) → 05_Tech_Spec.md. Actual copy text → 06_Content.md.
