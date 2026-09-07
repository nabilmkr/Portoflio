# Phase 1 Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace old dark/gold/Three.js foundation with Soft Modern light tokens and remove unused visual-effects code without breaking the SPA build.

**Architecture:** Keep React, Tailwind, Framer Motion, GSAP, Lenis, and existing component boundaries. Move visual foundation to warm CSS/Tailwind tokens, expose reusable motion variants, remove `Hero3D` and `CustomCursor` at their import/render boundaries, and remove stale Three.js bundling configuration and dependencies.

**Tech Stack:** React 19, Vite 8, Tailwind CSS 3, Framer Motion 11, GSAP 3, Lenis 1, npm, oxlint.

**Spec:** `docs/superpowers/specs/2026-09-03-soft-modern-redesign-design.md`

## Global Constraints

- Light-first palette: `bg-primary #FAFAF8`, `bg-surface #F2F0EC`, `bg-surface-alt #E8E5DF`, `text-heading #1A1A1A`, `text-body #6B6B6B`, `accent-primary #E8613A`, `accent-soft #E8613A` at 10%, `border #E0DDD7`.
- Keep `Syne` for headings and `Onest` for body/UI.
- Remove gold `#C5A880` references from active source styling.
- Remove `Hero3D.jsx`, `CustomCursor.jsx`, and `three`, `@react-three/fiber`, `@react-three/drei` dependencies.
- Preserve accessibility behavior, including visible focus rings and `prefers-reduced-motion` handling.
- Preserve GSAP, Lenis, Framer Motion, lazy sections, ErrorBoundary, and Formspree.
- Do not redesign Navbar, Hero, or content sections in this Phase 1 plan.
- Run `graphify update .` after source changes.

## File Map

- Modify `tailwind.config.js`: canonical color tokens used by Tailwind classes.
- Modify `src/styles/globals.css`: global light base, focus ring, typography, optional low-cost grain utility.
- Modify `src/styles/motion.js`: reusable `clipReveal`, `slideInLeft`, and `slideInRight` variants.
- Modify `src/App.jsx`: remove dead custom cursor import/render; retain app shell and scrolling.
- Modify `vite.config.js`: remove obsolete Three.js manual chunk rule.
- Modify `package.json` and `package-lock.json`: remove unused Three.js packages.
- Delete `src/components/ui/Hero3D.jsx`: no remaining owner after Hero redesign; Phase 1 removes dead module.
- Delete `src/components/ui/CustomCursor.jsx`: no remaining owner after App cleanup.
- Modify `docs/superpowers/specs/2026-09-03-soft-modern-redesign-tasks.md`: mark Phase 1 tasks complete only after verification.

## Task 1: Replace Tailwind color foundation

**Files:**
- Modify: `tailwind.config.js:8-16`
- Test: `package.json` build script via `npm run build`

**Interfaces:**
- Produces Tailwind classes `bg-bg-primary`, `bg-bg-surface`, `bg-bg-surface-alt`, `text-text-heading`, `text-text-body`, `bg-accent-primary`, `bg-accent-soft`, `border-border`, and corresponding text/border variants for later component tasks.

- [ ] **Step 1: Edit token map**

Replace `theme.extend.colors` with:

```js
colors: {
  "bg-primary": "#FAFAF8",
  "bg-surface": "#F2F0EC",
  "bg-surface-alt": "#E8E5DF",
  "accent-primary": "#E8613A",
  "accent-soft": "rgba(232, 97, 58, 0.1)",
  border: "#E0DDD7",
  "text-heading": "#1A1A1A",
  "text-body": "#6B6B6B",
},
```

Keep `fontFamily.sans` and `fontFamily.display` unchanged.

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: Vite build completes; old classes remain compilable because token names used by existing components are preserved.

- [ ] **Step 3: Commit foundation tokens**

```bash
git add tailwind.config.js
git commit -m "refactor: replace portfolio color tokens"
```

## Task 2: Update global CSS foundation

**Files:**
- Modify: `src/styles/globals.css:20-60`
- Test: `npm run lint`

**Interfaces:**
- Consumes new Tailwind tokens from Task 1.
- Produces light global body styling, orange focus ring, consistent heading typography, and a CSS-only `.hero-grain` utility for later Hero work.

- [ ] **Step 1: Replace focus color and typography rules**

Use this content for affected rules:

```css
:focus-visible {
  outline: 2px solid #E8613A;
  outline-offset: 3px;
}

h1, h2, h3, h4, h5, h6 {
  @apply text-text-heading font-bold tracking-tight font-display text-balance;
}

h1 {
  @apply text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] leading-[1.05];
}
```

Keep `body` `@apply bg-bg-primary text-text-body font-sans`, reduced-motion override, h2, and h3 rules. Add inside `@layer utilities`:

```css
.hero-grain {
  background-image:
    radial-gradient(circle at 20% 20%, rgba(232, 97, 58, 0.1), transparent 35%),
    radial-gradient(circle at 80% 10%, rgba(232, 97, 58, 0.06), transparent 30%);
}
```

Do not add animated noise or JavaScript; this utility is static and cheap. `accent-soft` remains available for components through Tailwind opacity/classes.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: no new lint errors from CSS changes.

- [ ] **Step 3: Commit global styling**

```bash
git add src/styles/globals.css
git commit -m "style: establish warm light global theme"
```

## Task 3: Add reusable motion variants

**Files:**
- Modify: `src/styles/motion.js:65-89`
- Test: `npm run lint`

**Interfaces:**
- Produces named Framer Motion variants `clipReveal`, `slideInLeft`, and `slideInRight` with `hidden` and `visible` states. Later components can import these exact names.

- [ ] **Step 1: Add variants after `fadeIn`**

Append:

```js
export const clipReveal = {
  hidden: {
    opacity: 0,
    clipPath: "inset(100% 0 0 0)",
  },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0 0 0)",
    transition: {
      duration: motionConfig.duration.moderate,
      ease: motionConfig.ease.entrance,
    },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: motionConfig.duration.normal,
      ease: motionConfig.ease.entrance,
    },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: motionConfig.duration.normal,
      ease: motionConfig.ease.entrance,
    },
  },
};
```

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS with no unused export errors; exports are allowed before consumers land.

- [ ] **Step 3: Commit motion variants**

```bash
git add src/styles/motion.js
git commit -m "feat: add soft modern motion variants"
```

## Task 4: Remove cursor and Three.js boundaries

**Files:**
- Modify: `src/App.jsx:13-17,71-74`
- Modify: `src/components/Hero.jsx:14,127` (remove stale Hero3D import/render now, before Phase 4 layout)
- Modify: `vite.config.js:10-20`
- Delete: `src/components/ui/Hero3D.jsx`
- Delete: `src/components/ui/CustomCursor.jsx`
- Test: `npm run build`

**Interfaces:**
- App no longer renders or imports `CustomCursor`.
- Hero no longer renders or imports `Hero3D`; Phase 4 can add CSS background without a dead dependency.
- Vite keeps default build chunking and no longer creates a named `threejs` chunk.

- [ ] **Step 1: Remove imports and JSX owners**

In `src/App.jsx`, remove:

```js
import CustomCursor from "./components/ui/CustomCursor";
```

and remove `<CustomCursor />` from the returned shell.

In `src/components/Hero.jsx`, remove:

```js
import Hero3D from "./ui/Hero3D";
```

and remove:

```jsx
{!shouldReduceMotion && show3D && <Hero3D />}
```

Also remove `show3D` state, its one-second timer effect, and any now-unused `useState` import. Keep GSAP hero scroll behavior intact. If `shouldReduceMotion` remains used by animation variants, keep it.

- [ ] **Step 2: Remove obsolete Vite manual chunking**

Replace the `build` block in `vite.config.js` with no Three.js-specific manual chunk configuration. Keep `plugins`, `resolve.extensions`, and valid Vite config syntax. The resulting config may omit `build` entirely if no other build option remains.

- [ ] **Step 3: Delete dead modules**

Delete:

```text
src/components/ui/Hero3D.jsx
src/components/ui/CustomCursor.jsx
```

- [ ] **Step 4: Verify no active source imports remain**

Run: `rg -n "Hero3D|CustomCursor|@react-three|from ['\"]three['\"]|threejs" src vite.config.js`
Expected: no output.

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: PASS; no unresolved module errors and no `threejs` chunk in `dist/assets`.

- [ ] **Step 6: Commit boundary cleanup**

```bash
git add src/App.jsx src/components/Hero.jsx vite.config.js
git rm src/components/ui/Hero3D.jsx src/components/ui/CustomCursor.jsx
git commit -m "refactor: remove decorative threejs effects"
```

## Task 5: Remove unused npm dependencies

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Test: `npm run build`, `npm run lint`

**Interfaces:**
- Keeps all runtime packages still used by current app: `framer-motion`, `gsap`, `lenis`, `lucide-react`, `@formspree/react`, `react`, and `react-dom`.
- Removes only `three`, `@react-three/fiber`, and `@react-three/drei` plus lockfile-only transitive packages no longer reachable.

- [ ] **Step 1: Uninstall exact packages**

Run: `npm uninstall three @react-three/fiber @react-three/drei`
Expected: npm removes the three direct dependencies and updates both `package.json` and `package-lock.json` without manual lockfile edits.

- [ ] **Step 2: Verify dependency references**

Run: `rg -n '"three"|"@react-three/fiber"|"@react-three/drei"' package.json package-lock.json`
Expected: no direct dependency entries. If unrelated package metadata still mentions Three.js, inspect before removing; do not delete unrelated packages.

- [ ] **Step 3: Verify lint and build**

Run: `npm run lint`
Expected: PASS.

Run: `npm run build`
Expected: PASS; no Three.js bundle output.

- [ ] **Step 4: Commit dependency cleanup**

```bash
git add package.json package-lock.json
git commit -m "chore: remove unused threejs dependencies"
```

## Task 6: Refresh graph and task tracker

**Files:**
- Modify: `docs/superpowers/specs/2026-09-03-soft-modern-redesign-tasks.md`
- Generated/updated: `graphify-out/`
- Test: final verification commands

**Interfaces:**
- Produces current graph metadata and a tracker showing Phase 1 complete only after all checks pass.

- [ ] **Step 1: Refresh knowledge graph**

Run: `graphify update .`
Expected: graphify completes and updates `graphify-out/` without API calls.

- [ ] **Step 2: Mark Phase 1 tasks complete**

Change only these tracker rows from `[ ]` to `[x]`:

```text
1.1 Update tailwind.config.js — new palette tokens
1.2 Update globals.css — base colors, focus ring, typography
1.3 Update motion.js — add clipReveal, slideIn variants
1.4 Delete Hero3D.jsx + CustomCursor.jsx
1.5 Update App.jsx — remove cursor + 3D imports
1.6 npm uninstall three @react-three/fiber @react-three/drei
```

Update summary `Done` from `0` to `6` for Phase 1 and total done from `0` to `6`.

- [ ] **Step 3: Run final verification**

Run:

```bash
npm run lint
npm run build
rg -n "Hero3D|CustomCursor|@react-three|from ['\"]three['\"]|threejs|#C5A880" src vite.config.js package.json
```

Expected: lint PASS, build PASS, final search no output. Existing historical docs/spec references may retain old names; final search intentionally scopes active source/config/dependency files.

- [ ] **Step 4: Commit tracker and graph**

```bash
git add docs/superpowers/specs/2026-09-03-soft-modern-redesign-tasks.md graphify-out
 git commit -m "docs: track completed foundation redesign"
```

## Completion Criteria

- `npm run lint` passes.
- `npm run build` passes.
- Active `src`, Vite config, and package manifests contain no Three.js, React Three Fiber, Hero3D, CustomCursor, or old gold color references.
- Tailwind emits all eight new palette tokens.
- `motion.js` exports all three new variants with reduced-motion consumers able to bypass animation as existing components do.
- `graphify update .` completes after modifications.
- Phase 1 tracker rows show `[x]` only after verification.
