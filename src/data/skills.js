/* 05_Tech_Spec.md §6 — SkillGroup schema */
/* 06_Content.md §3 — Tech Stack & Skills */

const skills = [
  {
    id: "programming-languages",
    category: "Languages",
    items: ["Python", "JavaScript", "PHP", "HTML", "CSS"],
    order: 1,
  },
  {
    id: "frontend",
    category: "Frontend",
    items: [
      "React.js",
      "Vite",
      "Tailwind CSS",
      "React Router",
      "Axios",
    ],
    order: 2,
  },
  {
    id: "backend-db",
    category: "Backend & Database",
    items: [
      "Laravel",
      "FastAPI",
      "REST API",
      "Laravel Sanctum",
      "MySQL",
      "Filament",
    ],
    order: 3,
  },
  {
    id: "ai-dl-nlp",
    category: "AI & Machine Learning",
    items: [
      "Random Forest",
      "Scikit-learn",
      "Sentence-BERT (SBERT)",
      "OpenCV",
      "MediaPipe",
      "DeepFace (ArcFace)",
      "TensorFlow",
      "Synthetic Dataset Design",
    ],
    order: 4,
  },
  {
    id: "cloud-devops",
    category: "Cloud & DevOps",
    items: [
      "AWS",
      "Microsoft Azure",
      "GitHub Actions (CI/CD)",
      "Hugging Face Spaces",
      "Streamlit Cloud",
    ],
    order: 5,
  },
  {
    id: "tools-workflow",
    category: "Tools & Workflow",
    items: [
      "Git",
      "GitHub",
      "Postman",
      "Figma",
      "Notion",
    ],
    order: 6,
  },
];

export default skills.sort((a, b) => a.order - b.order);
