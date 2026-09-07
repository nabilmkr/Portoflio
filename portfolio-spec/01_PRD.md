# 01. Product Requirement Document (PRD)

## Personal Portfolio Website — Nabil Makarim (Full-Stack Web & Applied AI Developer)

---

### 1. Document Control

- **Project Name:** Nabil Makarim Personal Portfolio Website
- **Version:** 2.0 (Restructured)
- **Date:** July 14, 2026
- **Status:** Approved, Ready for Design & Engineering

---

### 2. Executive Summary & Core Objectives

Interactive digital portfolio to showcase Nabil Makarim's technical skill, leadership track record, and project portfolio. Goal: attract recruiters (HRD), technical reviewers, and academics to secure a **Full-time Internship** for June 2026 or August–December 2026.

#### Core Goals

- **Competence Representation** — show Full-Stack Web Dev + Applied AI integration.
- **Recruitment Conversion** — instant access to resume (PDF), GitHub repos, live demos.
- **Professionalism & Credibility** — highlight leadership track record.

---

### 3. Target Audience (User Persona)

1. **Tech Recruiters / HRD** — 5–10 sec review window. Need clean layout, concise summary, clear CTA.
2. **Technical Reviewers / Team Leads** — evaluate architecture, tech stack, AI metric validity, code quality.
3. **Academics / Faculty** — assess methodological rigor, project alignment.

---

### 4. Feature Scope & Page Structure

Single-Page Application (SPA), smooth-scroll navigation.

#### A. Hero Section
- Portrait visual, job title (*Software Developer Intern | Full-Stack Web & Applied AI*), availability tag.
- CTA: Download Resume (PDF), Contact link.

#### B. Selected Projects (4 primary)
1. **Gap Sense** — AI skill-gap & career trend platform. SBERT semantic match, TensorFlow classifier, Streamlit + FastAPI, deployed on Hugging Face Spaces.
2. **Cuanify** — AI financial tracker. Random Forest health-status prediction, Gemini AI advisory narrative, Laravel Sanctum + Google Sign-In auth.
3. **Luxe News** — Gaming/esports news portal. React 18 + Vite + Tailwind frontend, Laravel 12 REST API, Filament admin panel.
4. **Smart Fan CV Control** — Edge AI/CV on Raspberry Pi 4. DeepFace (ArcFace) face auth, MediaPipe hand-gesture fan control, FastAPI + GPIO/PWM.

#### C. Tech Stack & Skills
Grouped cards: Programming Languages, Frontend, Backend & DB, AI/DL/NLP, Tools & Deployment. (Full list → see 06_Content.md)

#### D. Experience & Leadership
- Vice Chairperson Internal Affairs, HIMATIK-PNUP — led D-VERSE 2026 (6 sponsors incl. Dicoding Indonesia, 300+ attendees).
- Prior work: CV Aydin Perkasa (Admin/Inventory), Waroeng Lago (Barista).

#### E. Contact & Footer
- Email, WhatsApp, LinkedIn, GitHub.
- **Open decision:** functional form vs. direct links only — depends on hosting choice (see 05_Tech_Spec.md).

---

### 5. Success Metrics

- 100% functional external links, zero broken links.
- Google Lighthouse: Performance / Accessibility / Best Practices all >90.
- LCP under 2.5s on standard mobile network (realistic target, not <1.8s).

---

### 6. Out of Scope for This Document

Design tokens, animation spec, component contracts, tech/folder structure, full copy, asset list, and build roadmap — all live in files 02–08.
