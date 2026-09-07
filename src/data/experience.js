/* 05_Tech_Spec.md §6 — Experience data */
/* 06_Content.md §4 — Leadership, education, certifications, and IT work */

export const orgExperience = {
  id: "himatik-pnup",
  org: "HIMATIK-PNUP",
  role: "Vice Chairperson for Internal Affairs",
  period: "Sep 2025 – Present",
  description:
    "Coordinate and supervise four internal departments—Education, Cadre, Secretariat, and Talent—to keep programs aligned, documented, and moving forward.",
  achievements: [
    {
      text: "Orchestrated cross-institutional collaboration with DCC Universitas Dipa for D-VERSE 2026 (GreenTech Era)",
      metrics: {
        sponsors: 6,
        communityPartners: 9,
        mediaPartners: 5,
        attendees: 300,
        programmingTeams: 20,
      },
      detail:
        "Secured 6 corporate sponsorships, 9 community partners, and 5 media partners; attracted 300+ seminar attendees and 20+ competitive programming teams.",
    },
    {
      text: "Oversaw Mini Bootcamp HIMATIK with a 100% session completion rate; every participant team shipped a Web Development project.",
      metrics: {
        completionRate: 100,
      },
      detail: "",
    },
    {
      text: "Directed strategic planning for Inaugurasi '25",
      metrics: {
        sponsors: 2,
        attendees: 800,
      },
      detail:
        "Built the execution plan around 2 corporate sponsorships and 800+ attendees, earning formal recognition from university and department leadership.",
    },
  ],
};

export const certifications = [
  {
    id: "microsoft-elevate",
    title: "Microsoft Elevate — Data Science & AI",
    issuer: "Microsoft",
    period: "Jun 2025 – Jun 2026",
    description:
      "Apprenticeship across Python Programming, Machine Learning, Data Processing, Microsoft Fabric, and Generative AI Applications with Azure.",
  },
  {
    id: "dicoding-ai",
    title: "Dicoding Bootcamp Batch 10 — Artificial Intelligence Path",
    issuer: "Dicoding Indonesia",
    period: "Oct 2025 – Apr 2026",
    description:
      "Intensive track covering machine learning, deep learning, semantic-search embeddings, and end-to-end AI project engineering.",
  },
  {
    id: "aws-cloud",
    title: "AWS Academy Graduate — Cloud Foundations",
    issuer: "Amazon Web Services (AWS)",
    period: "Issued Jul 2026",
    description:
      "Training across AWS architecture, core cloud services, security, pricing models, and support infrastructure.",
  },
];

export const education = {
  institution: "Politeknik Negeri Ujung Pandang",
  degree: "Diploma IV — Informatics and Computer Engineering",
  period: "Aug 2023 – Expected Aug 2027",
  location: "Makassar, Indonesia",
  status: "Semester 7 | GPA: 3.49 / 4.00",
  coursework: [
    "Web Development",
    "Database Systems",
    "System Analysis & Design",
    "Network Systems",
    "Human-Computer Interaction",
  ],
};

export const workHistory = [
  {
    id: "kalla-logistik",
    org: "Kalla Logistik",
    role: "IT Staff Intern",
    period: "Sep 2026 – Present",
    current: true,
    note:
      "Contributing to an internal software project, translating operational needs into practical product improvements and supporting the team through implementation, testing, and iteration.",
  },
  {
    id: "cv-aydin-perkasa",
    org: "CV Aydin Perkasa",
    role: "Administrative Assistant",
    period: "Jan–Mar 2024",
    current: false,
    note:
      "Maintained structured sales and inventory data, improved marketplace listings, and supported day-to-day digital operations with careful spreadsheet workflows.",
  },
];
