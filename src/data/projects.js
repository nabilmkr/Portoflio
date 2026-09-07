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
    repoUrl: "https://github.com/Alvin-Ardiyansyah/Capstone-Project-Dicoding",
    featured: true,
    order: 1,
  },
  {
    id: "cuanify",
    title: "Cuanify",
    subtitle: "Academic Project",
    focusDescription:
      "AI-powered personal finance assistant combining Random Forest financial-health classification (Kritis/Sehat/Waspada) with Google Gemini 2.5 Flash advisory narratives. Features synthetic dataset generation pipeline for cold-start and full-stack integration with React Native, Laravel 11, and FastAPI.",
    highlights: [
      "Self-generated synthetic dataset pipeline achieving 100% accuracy on synthetic test set.",
      "Secured with Google OAuth and Laravel Sanctum in a clean monorepo architecture.",
    ],
    techTags: [
      "React Native",
      "Laravel 11",
      "FastAPI",
      "Random Forest",
      "Scikit-learn",
      "Gemini 2.5 Flash",
      "MySQL",
    ],
    thumbnail: "/images/projects/cuanify.jpeg",
    demoUrl: undefined,
    repoUrl: "https://github.com/nabilmkr/Cuanify",
    featured: true,
    order: 2,
  },
  {
    id: "luxe-news",
    title: "Luxe News",
    subtitle: "Academic Project",
    focusDescription:
      "Full-scale monorepo gaming news portal separating a public frontend (React 18, Vite, Tailwind CSS) from a REST API backend (Laravel 12). Engineered the Laravel backend, Filament CMS, and 50+ REST API endpoints covering news, games, tournaments, categories, banners, and comments. Secured all endpoints with Laravel Sanctum; slug-based routing reduces manual publishing overhead.",
    highlights: [
      "50+ REST API endpoints with Filament CMS admin management.",
      "Lazy loading and on-demand Axios API calls for optimal initial load performance.",
    ],
    techTags: [
      "React 18",
      "Vite",
      "Tailwind CSS",
      "Laravel 12",
      "Filament",
      "MySQL",
      "Laravel Sanctum",
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
      "Touchless smart fan controller on Raspberry Pi 4 using DeepFace (ArcFace) biometric face verification to gate access and MediaPipe hand gesture recognition (1–5 fingers) to adjust fan speed via GPIO/PWM. Orchestrated locally via Finite State Machine (FSM) and FastAPI without cloud dependency.",
    highlights: [
      "Real-time edge computer vision inference on Raspberry Pi 4.",
      "FSM architecture orchestrating biometric security and touchless PWM hardware control.",
    ],
    techTags: [
      "Raspberry Pi 4",
      "DeepFace (ArcFace)",
      "MediaPipe",
      "FastAPI",
      "OpenCV",
      "GPIO/PWM",
    ],
    thumbnail: "/images/projects/smart-fan.png",
    demoUrl: undefined,
    repoUrl: "https://github.com/nabilmkr/smart-fan-cv-control",
    featured: true,
    order: 4,
  },
];

export default projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order);
