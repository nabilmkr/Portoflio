/* 05_Tech_Spec.md §6 — SkillGroup schema */
/* 06_Content.md §3 — Tech Stack & Skills */

const skills = [
  {
    id: "programming-languages",
    category: "Programming Languages",
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
    ],
    order: 2,
  },
  {
    id: "backend-db",
    category: "Backend & DB",
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
    category: "AI/DL/NLP",
    items: [
      "CNN",
      "Transfer Learning (DenseNet121)",
      "SBERT",
      "Sentiment Classification",
      "Text Preprocessing (Sastrawi)",
      "TensorFlow",
    ],
    order: 4,
  },
  {
    id: "tools-deployment",
    category: "Tools & Deployment",
    items: [
      "Git",
      "GitHub",
      "Postman",
      "Figma",
      "Hugging Face Spaces",
      "Streamlit",
      "Notion",
    ],
    order: 5,
  },
];

export default skills.sort((a, b) => a.order - b.order);
