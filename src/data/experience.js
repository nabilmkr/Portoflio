/* 05_Tech_Spec.md §6 — WorkHistoryItem schema */
/* 06_Content.md §4 — Experience & Leadership */

export const orgExperience = {
  id: "himatik-pnup",
  org: "HIMATIK-PNUP",
  role: "Vice Chairperson for Internal Affairs",
  period: "Sep 2025 – Present",
  description:
    "Coordinate and supervise 4 internal departments (Education, Cadre, Secretariat, Talent) to streamline operations and ensure strategic alignment.",
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
        "Secured 6 corporate sponsorships (including Dicoding & idCloudHost), 9 community partners (including GDG chapters), 5 media partners; attracted 300+ seminar attendees and 20+ competitive programming teams.",
    },
    {
      text: "Oversaw Mini Bootcamp HIMATIK — 100% session completion rate, all participant teams shipped Web Development projects.",
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
        "2 corporate sponsorships, 800+ attendees, formal recognition from university director and department heads.",
    },
  ],
};

export const workHistory = [
  {
    id: "cv-aydin-perkasa",
    org: "CV Aydin Perkasa",
    role: "Administrative Assistant",
    period: "Jan–Mar 2024",
    note: "Managed marketplace listings, maintained sales/inventory data in Excel.",
    order: 1,
  },
  {
    id: "waroeng-lago",
    org: "Waroeng Lago",
    role: "Barista",
    period: "Oct–Dec 2022",
    note: "Maintained service quality and flow during peak hours.",
    order: 2,
  },
];
