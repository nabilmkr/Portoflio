/* 05_Tech_Spec.md §6 — ProjectData schema */
/* 06_Content.md §2 — Project copy */
/* 07_Asset_Manifest.md §1 — Thumbnail paths (placeholder until assets provided) */

const projects = [
  {
    id: "gap-sense",
    title: "Gap Sense",
    subtitle: "Dicoding Capstone Project",
    focusDescription:
      "AI-powered skill-gap analysis platform for IT fresh graduates. Uses SentenceTransformers (SBERT) for semantic similarity matching between user skills and real-world job posting data, a TensorFlow classification model, and a Groq-based AI career consultation module — delivered end-to-end via Streamlit, backed by FastAPI.",
    highlights: [
      "Led a 4-person capstone team; conceived the core product idea.",
      "Deployed FastAPI/AI backend to Hugging Face Spaces; Streamlit dashboard live at gapsense.streamlit.app.",
    ],
    techTags: [
      "Python",
      "FastAPI",
      "Streamlit",
      "TensorFlow",
      "SentenceTransformers",
      "Groq",
    ],
    thumbnail: "/images/projects/gap-sense-placeholder.svg",
    demoUrl: "https://gapsense.streamlit.app",
    repoUrl: "https://github.com/nabilmkr",
    featured: true,
    order: 1,
  },
  {
    id: "cuanify",
    title: "Cuanify",
    subtitle: "Personal Project",
    focusDescription:
      "Premium monorepo-based financial tracking application. Integrates a Random Forest ML model to predict financial health status (Healthy, Stable, Critical) and Google Gemini AI for automated, personalized advisory narratives. Authentication via Laravel Sanctum and Google Sign-In.",
    highlights: [],
    techTags: [
      "React Native",
      "Laravel",
      "MySQL",
      "FastAPI",
      "Random Forest",
      "Gemini AI",
      "Laravel Sanctum",
    ],
    thumbnail: "/images/projects/cuanify-placeholder.svg",
    demoUrl: undefined,
    repoUrl: "https://github.com/nabilmkr",
    featured: true,
    order: 2,
  },
  {
    id: "luxe-news",
    title: "Luxe News",
    subtitle: "Portfolio Project",
    focusDescription:
      "Full-scale monorepo gaming news portal separating a public frontend (React 18, Vite, Tailwind CSS) from a REST API backend (Laravel 12). Engineered the Laravel backend, Filament CMS, and 50+ REST API endpoints covering news, games, tournaments, categories, banners, and comments. Secured all endpoints with Laravel Sanctum; slug-based routing reduces manual publishing overhead.",
    highlights: [],
    techTags: [
      "React 18",
      "Vite",
      "Tailwind CSS",
      "Laravel 12",
      "Filament",
      "MySQL",
    ],
    thumbnail: "/images/projects/luxe-news-placeholder.svg",
    demoUrl: undefined,
    repoUrl: "https://github.com/nabilmkr/Luxe-News",
    featured: true,
    order: 3,
  },
  {
    id: "smart-fan-control",
    title: "Smart Fan CV Control",
    subtitle: "Academic Project",
    focusDescription:
      "Local physical device automation system on Raspberry Pi 4. Biometric face authentication via DeepFace (ArcFace); touchless fan speed control using MediaPipe Hand Tracking (1–5 finger gestures); software PWM signals via GPIO to a MOSFET module driving a 12V DC fan, orchestrated asynchronously via FastAPI.",
    highlights: [],
    techTags: [
      "Raspberry Pi 4",
      "DeepFace (ArcFace)",
      "MediaPipe",
      "FastAPI",
      "GPIO/PWM",
    ],
    thumbnail: "/images/projects/smart-fan-placeholder.svg",
    demoUrl: undefined,
    repoUrl: "https://github.com/nabilmkr",
    featured: true,
    order: 4,
  },
];

export default projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order);
