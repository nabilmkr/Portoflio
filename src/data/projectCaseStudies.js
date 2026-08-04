/* SPEC-13 — Project Content Specification
/* Source of truth for all project narratives
/* Priority: SPEC-13 > SPEC-12 > SPEC-11 > SPEC-10 > ... > SPEC-01 (per 05_Tech_Spec.md source priority) */

const caseStudies = {
  /* ================================================================
   * GAP SENSE — AI Skill Gap & Career Platform
   * SPEC-13 Part 5 — Level 3 (Major Project, capstone)
   * ================================================================ */
  "gap-sense": {
    id: "gap-sense",
    title: "Gap Sense",
    tagline: "An AI-powered career recommendation platform that analyzes skill gaps against industry requirements and generates personalized learning roadmaps.",
    overview: {
      role: "AI System Developer & Backend Developer",
      duration: "5 weeks (Feb–Apr, Capstone Project)",
      teamSize: 4,
      status: "Completed",
      database: "JSON / CSV (Kaggle, LinkedIn, Adzuna API)",
      technologies: ["Python", "FastAPI", "Streamlit", "Sentence-BERT", "TensorFlow", "Groq (Llama 3.3)", "Pandas", "NumPy"],
    },
    context:
      "Gap Sense was built as a Dicoding capstone project to help students and early-career developers understand which technical skills they still lack for their target careers. The project automates the tedious process of manually comparing dozens of job descriptions to identify learning priorities.",
    problem:
      "Many learners know which career they want to pursue but struggle to understand which technical skills they still lack. Traditional job searching requires manually comparing dozens of job descriptions, making it difficult to identify learning priorities. Gap Sense automates this by comparing user skills with industry demand and generating structured career recommendations.",
    users: {
      primary: ["University students", "Fresh graduates", "Career switchers", "Self-taught developers"],
      secondary: ["Career advisors and educators"],
    },
    goals: [
      "Help users identify missing skills for their target careers using semantic matching.",
      "Generate structured, prioritized learning recommendations.",
      "Deliver AI-supported insights without requiring heavy manual input.",
    ],
    constraints: [
      "4-person capstone timeline with academic deadline.",
      "Inconsistent job posting data — duplicates, irrelevant entries, skill name aliases.",
      "Deployment budget limited to free-tier hosting (Hugging Face Spaces).",
    ],
    alternatives: [
      {
        option: "Manual skill checklist",
        pros: ["Fast to build", "Easy to understand"],
        cons: ["Too generic", "Does not capture semantic meaning"],
      },
      {
        option: "Rule-based keyword matching",
        pros: ["More precise than checklist", "Easier to deploy"],
        cons: ["Hard to maintain", "Fails for varied phrasing (e.g., 'JS' vs 'JavaScript')"],
      },
      {
        option: "Semantic similarity with AI embeddings",
        pros: ["Handles varied language naturally", "Flexibly matches skills to job postings"],
        cons: ["Higher implementation complexity", "Requires model inference"],
      },
    ],
    challenges: [
      {
        challenge: "Processing inconsistent job posting data.",
        why: "Job postings contain duplicates, irrelevant entries, and the same technology appears under multiple aliases (e.g., 'JS' vs 'JavaScript').",
        response: "Implemented preprocessing and normalization before analysis. Skill aliases were standardized to reduce inconsistent matching.",
        outcome: "Generated cleaner input for semantic comparison.",
      },
      {
        challenge: "Matching similar skills instead of exact keywords.",
        why: "Keyword matching cannot recognize semantic similarity. For example, 'JS' and 'JavaScript' should represent the same concept.",
        response: "Used Sentence-BERT embeddings with cosine similarity to measure semantic closeness rather than string matching.",
        outcome: "Skill matching became more flexible and accurate than traditional keyword comparison.",
      },
      {
        challenge: "Producing recommendations users can understand.",
        why: "Similarity scores alone provide little practical guidance for learning.",
        response: "Combined structured gap analysis with Llama 3.3 70B via Groq API to generate natural-language learning roadmaps.",
        outcome: "Users receive both analytical results (gap score, priority skills) and actionable learning recommendations.",
      },
      {
        challenge: "Separating analytical computation from presentation.",
        why: "Data processing, AI inference, and UI each require different responsibilities and performance characteristics.",
        response: "Separated Streamlit, FastAPI, semantic analysis, and LLM generation into dedicated layers with clear interfaces.",
        outcome: "System became easier to maintain, test, and extend independently.",
      },
    ],
    implementation: [
      {
        area: "Data Preprocessing",
        technology: ["Python", "Pandas", "NumPy"],
        responsibility:
          "Cleaned and normalized job posting data from Kaggle and LinkedIn datasets. Standardized skill aliases and removed duplicates before embedding.",
      },
      {
        area: "Backend API",
        technology: ["FastAPI", "Python"],
        responsibility:
          "Coordinates preprocessing, semantic analysis, and LLM communication. Exposes endpoints for skill submission and recommendation retrieval.",
      },
      {
        area: "Semantic Analysis",
        technology: ["Sentence-BERT", "TensorFlow"],
        responsibility:
          "Converts user skills and job postings into embeddings. Computes cosine similarity to rank skill gaps by priority.",
      },
      {
        area: "LLM Integration",
        technology: ["Groq API", "Llama 3.3 70B"],
        responsibility:
          "Transforms structured gap analysis into natural-language learning roadmaps and career advice.",
      },
      {
        area: "Frontend",
        technology: ["Streamlit"],
        responsibility:
          "Provides interactive forms for skill input, result visualization, and recommendation display.",
      },
    ],
    architecture:
      "User Input → Input Validation → Skill Normalization → Sentence-BERT Embedding → Cosine Similarity → Gap Analysis → FastAPI → Llama 3.3 (Groq) → Career Recommendation → Streamlit Interface.",
    decisions: [
      {
        technology: "Streamlit",
        reason: "Rapid development of interactive data applications.",
        tradeoff: "Less flexible than custom frontend frameworks.",
        contribution: "Provides an intuitive interface for career analysis.",
      },
      {
        technology: "FastAPI",
        reason: "High-performance API framework for AI services.",
        tradeoff: "Introduces an additional backend layer.",
        contribution: "Coordinates semantic analysis and AI communication.",
      },
      {
        technology: "Sentence-BERT",
        reason: "Measures semantic similarity instead of relying on exact keyword matching.",
        tradeoff: "Requires embedding generation before comparison.",
        contribution: "Improves skill matching quality.",
      },
      {
        technology: "Llama 3.3 70B",
        reason: "Transforms structured analysis into understandable career recommendations.",
        tradeoff: "Requires external inference service.",
        contribution: "Produces personalized learning roadmaps.",
      },
      {
        technology: "JSON & CSV Dataset",
        reason: "Simple and flexible format for structured job data.",
        tradeoff: "Requires preprocessing before analysis.",
        contribution: "Serves as the primary knowledge source for skill comparison.",
      },
    ],
    tradeOffs: [
      {
        decision: "Use Sentence-BERT embeddings instead of a large fine-tuned model.",
        benefit: "Faster development and simpler deployment on free-tier hosting.",
        cost: "Less tailored predictions for niche job roles.",
      },
      {
        decision: "Use JSON/CSV datasets instead of a database.",
        benefit: "Simpler setup, zero infrastructure cost.",
        cost: "Requires preprocessing before analysis. No user search history persistence.",
      },
      {
        decision: "Deploy on Hugging Face Spaces.",
        benefit: "Free hosting with GPU inference support.",
        cost: "Cold start latency. Limited compute resources.",
      },
    ],
    result: [
      "Deployed on Hugging Face Spaces with a working Streamlit demo.",
      "Led a 4-person capstone team; conceived and delivered the core product from data processing to frontend presentation.",
      "Successfully matched user skills to industry requirements using semantic similarity.",
    ],
    reflection:
      "I learned how to integrate semantic search into a web application and how to design a system that balances AI capability with deployability constraints. The capstone taught me the importance of separating concerns across the data pipeline — preprocessing, analysis, and presentation each benefit from independent refinement.",
    futureImprovements: [
      "Add role-specific input flows with resume parsing.",
      "Collect more structured job posting data from verified sources.",
      "Implement persistent user search history with a database.",
      "Improve the advisory narrative with user career goal context.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Streamlit",
      "Sentence-BERT",
      "TensorFlow",
      "Groq (Llama 3.3)",
      "Pandas",
      "NumPy",
    ],
  },

  /* ================================================================
   * CUANIFY — AI-Powered Financial Tracker
   * SPEC-13 Part 3 — Level 2 (Medium Project)
   * ================================================================ */
  "cuanify": {
    id: "cuanify",
    title: "Cuanify",
    tagline: "An AI-powered personal finance assistant that analyzes spending habits and generates personalized financial recommendations through machine learning and generative AI.",
    overview: {
      role: "Full-Stack Developer & AI Engineer",
      duration: "3–4 months",
      teamSize: 3,
      status: "Completed",
      database: "MySQL",
      technologies: ["React Native", "Laravel 11", "FastAPI", "Random Forest (Scikit-learn)", "Google Gemini 2.5 Flash", "Laravel Sanctum", "Google OAuth"],
    },
    context:
      "Cuanify was developed to combine finance tracking, predictive analytics, and automated advice in a single mobile dashboard. The project transforms passive expense recording into active financial health understanding through AI-driven analysis.",
    problem:
      "Most financial tracking applications only record transactions without helping users understand their financial behavior. Users often know where money is spent but struggle to identify unhealthy spending patterns or receive practical recommendations for improvement. Cuanify aims to transform financial records into actionable insights through AI-driven analysis.",
    users: {
      primary: ["Students", "Young adults", "Beginner budget planners"],
      secondary: ["Tech-savvy users seeking automated advisory support"],
    },
    goals: [
      "Provide clear financial health predictions (Healthy, Stable, Critical).",
      "Surface advisory narratives that feel personalized using generative AI.",
      "Keep authentication secure with modern tooling (Google OAuth + Laravel Sanctum).",
    ],
    constraints: [
      "Personal project scope with non-production data sources.",
      "Need to integrate multiple technology stacks in one monorepo.",
      "AI inference depends on external Gemini API availability.",
    ],
    alternatives: [
      {
        option: "Simple budget tracker only",
        pros: ["Faster to build", "Low data requirements"],
        cons: ["Less insight", "No predictive value"],
      },
      {
        option: "Full analytics platform with charts and dashboards",
        pros: ["Rich insight", "More engagement"],
        cons: ["Longer build time", "Higher complexity"],
      },
      {
        option: "ML classification + AI advisory narrative",
        pros: ["Combines prediction and explanation", "Demonstrates full AI pipeline"],
        cons: ["Requires separate ML and LLM services", "External API dependency"],
      },
    ],
    challenges: [
      {
        challenge: "Building an AI pipeline that produces meaningful financial insights.",
        why: "Machine learning classification (Healthy/Stable/Critical) and generative AI advisory text serve different purposes and require different processing stages.",
        response: "Separated the workflow into structured stages: Random Forest classifies financial health first, then contextual information is sent to Gemini for personalized narrative generation.",
        outcome: "Generated advice became more consistent with the user's actual financial condition.",
      },
      {
        challenge: "Integrating AI services without affecting backend stability.",
        why: "AI inference requires additional computation time and depends on external services that may be slow or unavailable.",
        response: "Separated the AI pipeline into a FastAPI microservice while Laravel handled authentication and business logic.",
        outcome: "Backend responsibilities remained isolated from AI processing. Laravel APIs stayed responsive even when Gemini was slow.",
      },
      {
        challenge: "Maintaining secure authentication across the mobile application.",
        why: "User authentication needed to remain simple (Google OAuth) while protecting all API access.",
        response: "Implemented Google OAuth for user login and Laravel Sanctum for securing all API endpoints.",
        outcome: "Users got a frictionless login experience while backend endpoints remained protected.",
      },
      {
        challenge: "Connecting multiple application layers (React Native, Laravel, FastAPI, ML, Gemini AI).",
        why: "The monorepo contains five distinct service layers that must communicate reliably.",
        response: "Established a layered architecture where each service performs a single responsibility and communicates through well-defined interfaces.",
        outcome: "System maintenance became easier because each layer can evolve independently.",
      },
    ],
    implementation: [
      {
        area: "Mobile Application",
        technology: ["React Native", "Expo"],
        responsibility:
          "Built a polished mobile interface for transaction input, financial dashboard, and AI insight display.",
      },
      {
        area: "Backend API",
        technology: ["Laravel 11", "MySQL", "Laravel Sanctum"],
        responsibility:
          "Manages user authentication, secure REST APIs, and data storage for transactions and financial summaries.",
      },
      {
        area: "AI Service",
        technology: ["FastAPI", "Python", "Scikit-learn", "Google Gemini 2.5 Flash"],
        responsibility:
          "Executes data preprocessing, Random Forest classification for financial health, and Gemini-powered advisory narrative generation.",
      },
      {
        area: "Authentication",
        technology: ["Google OAuth", "Laravel Sanctum"],
        responsibility:
          "Google OAuth handles user login. Laravel Sanctum secures all API communication between mobile app and backend.",
      },
    ],
    architecture:
      "Mobile User → React Native → Laravel REST API → MySQL (transactions) → FastAPI → Random Forest (health classification) → Google Gemini 2.5 Flash → Personalized Financial Recommendation → Laravel → React Native.",
    decisions: [
      {
        technology: "React Native",
        reason: "Build Android and iOS applications from a single codebase.",
        tradeoff: "Requires native bridge integration for platform-specific functionality.",
        contribution: "Provides a consistent mobile experience across platforms.",
      },
      {
        technology: "Laravel 11",
        reason: "Acts as the primary backend service responsible for authentication, business logic, and REST APIs.",
        tradeoff: "Requires communication with external AI services.",
        contribution: "Coordinates application logic and mobile communication.",
      },
      {
        technology: "FastAPI",
        reason: "Provides high-performance AI endpoints while integrating naturally with Python machine learning libraries.",
        tradeoff: "Introduces an additional backend service.",
        contribution: "Executes AI-related processing independently from Laravel.",
      },
      {
        technology: "Google Gemini 2.5 Flash",
        reason: "Generates personalized financial explanations from structured AI outputs.",
        tradeoff: "Depends on external API availability.",
        contribution: "Transforms classification results into human-readable recommendations.",
      },
      {
        technology: "Scikit-learn",
        reason: "Implements financial health classification using supervised machine learning.",
        tradeoff: "Prediction quality depends on available training data.",
        contribution: "Determines financial condition before narrative generation.",
      },
      {
        technology: "MySQL",
        reason: "Stores user accounts, financial transactions, and application data.",
        tradeoff: "Structured relational database.",
        contribution: "Acts as the primary persistent storage.",
      },
    ],
    tradeOffs: [
      {
        decision: "Use a monorepo structure for the full stack.",
        benefit: "Simpler dependency management and shared context across frontend and backend.",
        cost: "Potentially larger repository complexity.",
      },
      {
        decision: "Separate FastAPI AI service from Laravel backend.",
        benefit: "Isolates AI processing from core business logic. Easier to scale or replace the AI model.",
        cost: "Introduces inter-service communication overhead.",
      },
      {
        decision: "Use Random Forest for classification over a neural network.",
        benefit: "Interpretable model with clear feature importance. Easier to explain health status to users.",
        cost: "May not capture complex non-linear relationships as well as deep learning.",
      },
    ],
    result: [
      "A strong portfolio example of finance tracking, ML classification, and generative AI working together.",
      "Demonstrated ability to build a production-like mobile backend stack with secure authentication.",
      "Integrated multiple technology stacks into a coherent monorepo application.",
    ],
    reflection:
      "Cuanify taught me the importance of separating business logic from AI processing. Building the AI service independently simplified experimentation without affecting the primary backend. The project also highlighted how combining traditional machine learning with generative AI can produce more understandable recommendations than either approach alone.",
    futureImprovements: [
      "Add a budget planning module with spending limits and alerts.",
      "Support bank data import or aggregator connectivity for automatic transaction categorization.",
      "Implement spending trend visualization with historical charts.",
      "Add offline insight caching for poor connectivity environments.",
    ],
    technologies: [
      "React Native",
      "Laravel 11",
      "MySQL",
      "FastAPI",
      "Scikit-learn (Random Forest)",
      "Google Gemini 2.5 Flash",
      "Laravel Sanctum",
      "Google OAuth",
    ],
  },

  /* ================================================================
   * LUXE NEWS — Gaming & Esports News Portal
   * SPEC-13 Part 2 — Level 2 (Medium Project)
   * ================================================================ */
  "luxe-news": {
    id: "luxe-news",
    title: "Luxe News",
    tagline: "A modern gaming news platform built with React and Laravel, featuring dynamic content management through REST APIs and an integrated admin dashboard.",
    overview: {
      role: "Backend Developer & REST API Developer",
      duration: "3–4 months",
      teamSize: 4,
      status: "Completed",
      database: "MySQL",
      technologies: ["React 18", "Vite", "Tailwind CSS", "Laravel 12", "Filament", "Laravel Sanctum", "MySQL"],
    },
    context:
      "Luxe News was built as a portfolio project to demonstrate a full-stack news platform with editorial workflows and campaign management. The project separates public content delivery from administrative publishing to enable efficient content operations.",
    problem:
      "Many gaming news websites require manual content updates or tightly couple frontend pages with backend logic. This makes publishing new articles, tournaments, banners, or categories inefficient and increases maintenance effort. The project aimed to separate content management from presentation so administrators could update information through an admin interface while users always received dynamic content.",
    users: {
      primary: ["Gaming editors and publishers"],
      secondary: ["Readers seeking curated gaming news", "Esports audiences"],
    },
    goals: [
      "Build a scalable CMS-driven news portal with 50+ REST API endpoints.",
      "Keep editorial publishing secure and efficient through role-based admin access.",
      "Separate frontend and backend development via standardized API contracts.",
    ],
    constraints: [
      "Need to demonstrate both frontend and backend capabilities in one portfolio example.",
      "Limited time to implement a production-grade CMS workflow.",
      "4-person team with 1 frontend and 1 backend developer.",
    ],
    alternatives: [
      {
        option: "Static blog frontend only",
        pros: ["Faster completion", "Simpler deployment"],
        cons: ["Less backend depth", "No CMS support"],
      },
      {
        option: "Headless CMS service (Contentful, Strapi)",
        pros: ["Faster content management", "Less backend work"],
        cons: ["Less hands-on backend engineering", "External dependency"],
      },
      {
        option: "Custom Laravel backend with Filament CMS",
        pros: ["Full control over API design", "Demonstrates backend engineering"],
        cons: ["Longer development time", "More maintenance responsibility"],
      },
    ],
    challenges: [
      {
        challenge: "Managing multiple content types within one backend.",
        why: "The system needed to support news, tournaments, categories, banners, and comments while maintaining a consistent API structure across all resources.",
        response: "Built reusable REST API resources using Laravel and centralized content management through Filament Admin. Standardized response formats and error handling across all endpoints.",
        outcome: "Content became easier to maintain and new resources could be added without restructuring the application.",
      },
      {
        challenge: "Reducing unnecessary frontend loading on the homepage.",
        why: "The homepage displays multiple visual assets and dynamic content. Rendering everything immediately would increase initial load time significantly.",
        response: "Implemented lazy loading for selected React pages and components. Used Axios for on-demand API calls rather than fetching all data at once.",
        outcome: "Only required content loads when needed, improving perceived responsiveness.",
      },
      {
        challenge: "Keeping frontend and backend development independent.",
        why: "Both applications needed to evolve without tightly coupling implementation details.",
        response: "Separated responsibilities using REST APIs between Laravel and React. API contracts were documented first, enabling parallel development.",
        outcome: "Frontend and backend could be developed independently while communicating through standardized endpoints.",
      },
    ],
    implementation: [
      {
        area: "Backend API",
        technology: ["Laravel 12", "MySQL", "Laravel Sanctum"],
        responsibility:
          "Developed 50+ REST API endpoints for news, categories, tournaments, banners, and comments. Secured all endpoints with Laravel Sanctum authentication.",
      },
      {
        area: "Admin CMS",
        technology: ["Filament", "Laravel 12"],
        responsibility:
          "Configured Filament admin panel for content administrators to manage all content types without touching source code.",
      },
      {
        area: "Frontend",
        technology: ["React 18", "Vite", "Tailwind CSS", "Axios"],
        responsibility:
          "Built a responsive public-facing news portal that consumes the Laravel REST API. Implemented lazy loading and optimistic UI updates.",
      },
      {
        area: "Authentication",
        technology: ["Laravel Sanctum"],
        responsibility:
          "Protected administrative endpoints with session-based auth for Filament and token-based auth for API access.",
      },
    ],
    architecture:
      "Administrator → Filament Admin → Laravel REST API → MySQL (news, tournaments, categories, banners, comments) → REST API → React Frontend → Visitor.",
    decisions: [
      {
        technology: "Laravel 12",
        reason: "Provides a mature ecosystem for REST API development.",
        tradeoff: "PHP ecosystem compared to Python-based alternatives.",
        contribution: "Served as the primary backend service exposing application data.",
      },
      {
        technology: "Filament Admin",
        reason: "Rapid development of administrative interfaces.",
        tradeoff: "Adds dependency on Filament ecosystem.",
        contribution: "Allows administrators to manage application content without modifying source code.",
      },
      {
        technology: "React 18",
        reason: "Component-based architecture simplifies reusable UI development.",
        tradeoff: "Requires explicit state management.",
        contribution: "Delivered responsive user interface consuming backend APIs.",
      },
      {
        technology: "React Router",
        reason: "Supports dynamic routing using slugs.",
        tradeoff: "Requires coordination of paths and dynamic params.",
        contribution: "Enables pages such as /news/{slug} without manual routing.",
      },
      {
        technology: "Laravel Sanctum",
        reason: "Protect authenticated API endpoints.",
        tradeoff: "Requires session or token storage on the client side.",
        contribution: "Provides secure authentication for administrative functionality.",
      },
      {
        technology: "Tailwind CSS",
        reason: "Accelerates responsive interface development.",
        tradeoff: "Adds Tailwind-specific syntax inline inside React classes.",
        contribution: "Maintains consistent design system across pages.",
      },
    ],
    tradeOffs: [
      {
        decision: "Implement a custom Laravel backend instead of a headless SaaS CMS.",
        benefit: "Stronger backend engineering signal. Full control over API design and database schema.",
        cost: "Longer development time and more maintenance responsibility.",
      },
      {
        decision: "Use Filament for admin panel.",
        benefit: "Rapid development of administrative interfaces without custom UI code.",
        cost: "Adds dependency on the Filament ecosystem. Less flexible for complex publishing workflows.",
      },
      {
        decision: "Slug-based routing for content pages.",
        benefit: "SEO-friendly URLs. Allows administrators to update slugs without code changes.",
        cost: "Requires careful slug uniqueness validation and redirect handling on updates.",
      },
    ],
    result: [
      "A complete full-stack news platform with 50+ REST API endpoints and editorial workflows.",
      "Secured all API endpoints with Laravel Sanctum authentication.",
      "Showcased backend, frontend, and content management skills in one portfolio project.",
    ],
    reflection:
      "This project reinforced the importance of separating presentation and business logic. Using Laravel as an API backend and React as the presentation layer simplified maintenance and reduced coupling between applications. Developing with Filament also demonstrated how administrative interfaces can significantly reduce future operational effort.",
    futureImprovements: [
      "Add full-text search for news articles.",
      "Implement tournament filtering by game, date, and prize pool.",
      "Build an image optimization pipeline for automatic thumbnail generation.",
      "Add pagination improvements with infinite scroll and filter persistence.",
    ],
    technologies: [
      "React 18",
      "Vite",
      "Tailwind CSS",
      "Laravel 12",
      "Filament",
      "Laravel Sanctum",
      "MySQL",
      "Axios",
    ],
  },

  /* ================================================================
   * SMART FAN CV CONTROL — Edge AI & Computer Vision
   * SPEC-13 Part 4 — Level 2 (Medium Project)
   * ================================================================ */
  "smart-fan-control": {
    id: "smart-fan-control",
    title: "Smart Fan CV Control",
    tagline: "A touchless smart fan controlled using face verification and hand gesture recognition to improve accessibility for people with physical disabilities.",
    overview: {
      role: "Software & Computer Vision Developer",
      duration: "3–4 months",
      teamSize: 3,
      status: "Completed",
      database: "None (local runtime state)",
      technologies: ["Raspberry Pi 4", "DeepFace (ArcFace)", "MediaPipe", "FastAPI", "GPIO/PWM", "OpenCV", "MOSFET Driver", "Python"],
    },
    context:
      "This academic project combined hardware control and computer vision to create a contactless cooling interface. The goal was to replace physical interaction with natural human gestures and face authentication, exploring how CV can make everyday devices more accessible.",
    problem:
      "Traditional fan controls are mechanical and require physical button or switch interaction. For users with limited mobility, these interactions can become difficult or impossible. The project explored how computer vision can replace conventional physical controls with natural human interaction, making device automation more accessible.",
    users: {
      primary: ["People with physical disabilities requiring touchless interaction"],
      secondary: ["Smart home enthusiasts", "Students and makers exploring CV interfaces"],
    },
    goals: [
      "Enable touchless fan speed control using hand gesture recognition (1–5 fingers → fan speeds).",
      "Secure physical device access with biometric face authentication.",
      "Run entirely on local hardware without cloud dependency.",
    ],
    constraints: [
      "Hardware limited to Raspberry Pi 4 and a simple DC fan with MOSFET driver.",
      "Need to integrate vision processing, state management, and GPIO control in one system.",
      "Real-time processing must remain responsive on limited edge hardware.",
    ],
    alternatives: [
      {
        option: "Simple sensor-based fan controller (temperature or motion trigger)",
        pros: ["Easier hardware integration", "More reliable operation"],
        cons: ["Less innovative", "No personalization or security"],
      },
      {
        option: "Voice-activated control (speech recognition)",
        pros: ["Natural interaction for many users", "Good accessibility potential"],
        cons: ["Requires audio processing libraries", "Less discreet in quiet environments"],
      },
      {
        option: "Gesture-based control with face authentication (chosen)",
        pros: ["Intuitive for most users", "Combines security with convenience"],
        cons: ["Requires good lighting", "Computationally heavier than simple sensors"],
      },
    ],
    challenges: [
      {
        challenge: "Running computer vision models on Raspberry Pi 4.",
        why: "Raspberry Pi has limited CPU resources compared to desktop hardware. Real-time image processing can easily introduce lag or dropped frames.",
        response: "Selected lightweight CV libraries (DeepFace, MediaPipe) and optimized the processing pipeline to reduce unnecessary computation. Used frame sampling to balance responsiveness and CPU load.",
        outcome: "The system remained responsive while performing real-time face and hand detection.",
      },
      {
        challenge: "Maintaining smooth camera performance during authentication.",
        why: "Face verification requires additional computation that can interrupt the continuous video stream.",
        response: "Separated verification into background processing while keeping the camera stream active. Used a lightweight ArcFace model for fast embedding comparison.",
        outcome: "Camera remained responsive during authentication. Users experienced no visible stutter in the preview.",
      },
      {
        challenge: "Preventing unauthorized fan control.",
        why: "Gesture recognition alone cannot distinguish between authorized and unauthorized users.",
        response: "Added a face verification stage before enabling gesture recognition. Only authenticated users can access the control interface.",
        outcome: "Only authenticated users could control the fan. Unauthorized access was prevented at the application level.",
      },
      {
        challenge: "Managing multiple system states (idle, authenticating, active, no-user).",
        why: "Face authentication and gesture recognition cannot run simultaneously without clear coordination, and system state must persist correctly across transitions.",
        response: "Implemented a Finite State Machine (FSM) that coordinates authentication and interaction flow with well-defined transitions and timeout handling.",
        outcome: "System behavior became predictable, easier to test, and easier to extend with new states.",
      },
    ],
    implementation: [
      {
        area: "Face Authentication",
        technology: ["DeepFace (ArcFace)", "OpenCV"],
        responsibility:
          "Enrolls authorized users and verifies identity before granting control access. Runs embedding comparison locally on Raspberry Pi.",
      },
      {
        area: "Gesture Recognition",
        technology: ["MediaPipe", "OpenCV"],
        responsibility:
          "Detects hand landmarks in real time. Maps finger count (1–5) to fan speed levels 1–5.",
      },
      {
        area: "Hardware Control",
        technology: ["Raspberry Pi 4", "GPIO", "MOSFET Driver", "PWM"],
        responsibility:
          "Generates PWM signals through GPIO pins to control MOSFET driver. Manages fan speed transitions smoothly.",
      },
      {
        area: "System Orchestration",
        technology: ["FastAPI", "Python"],
        responsibility:
          "Coordinates camera capture, CV inference, state transitions, and GPIO control. Exposes local monitoring endpoints.",
      },
    ],
    architecture:
      "USB Camera → OpenCV → DeepFace (ArcFace) Verification → Authentication Success → MediaPipe Hand Tracking → Gesture Recognition → GPIO PWM → MOSFET Driver → DC Fan Speed Control.",
    decisions: [
      {
        technology: "Raspberry Pi 4",
        reason: "Provides affordable edge computing capable of running computer vision locally.",
        tradeoff: "Limited CPU resources compared to desktop computers.",
        contribution: "Acts as the central processing unit for the entire system.",
      },
      {
        technology: "MediaPipe",
        reason: "Efficient real-time hand landmark detection.",
        tradeoff: "Requires good lighting for optimal detection.",
        contribution: "Recognizes finger gestures used to control fan speed.",
      },
      {
        technology: "DeepFace (ArcFace)",
        reason: "Provides facial verification before granting access.",
        tradeoff: "Verification requires additional computation.",
        contribution: "Restricts system access to authorized users.",
      },
      {
        technology: "FastAPI",
        reason: "Exposes lightweight system endpoints while remaining asynchronous.",
        tradeoff: "Adds another software component.",
        contribution: "Supports monitoring and system integration.",
      },
      {
        technology: "OpenCV",
        reason: "Handles camera input and image preprocessing.",
        tradeoff: "Requires efficient frame management.",
        contribution: "Provides the video stream used by all vision components.",
      },
    ],
    tradeOffs: [
      {
        decision: "Run all vision models locally instead of cloud inference.",
        benefit: "Lower latency, offline capability, and privacy (no face data leaves the device).",
        cost: "Higher compute demand on the Raspberry Pi 4. Limited by available RAM and CPU.",
      },
      {
        decision: "Use a Finite State Machine for system orchestration.",
        benefit: "Predictable state transitions. Easier to test, debug, and extend.",
        cost: "Requires careful design upfront. More code than simple sequential logic.",
      },
      {
        decision: "Use MediaPipe instead of a custom hand tracking model.",
        benefit: "Pre-trained, optimized for real-time performance, well-documented.",
        cost: "External dependency (Google). May not be as customizable as a custom model.",
      },
    ],
    result: [
      "A working prototype of a touchless fan control system with biometric security.",
      "Demonstrated integration of CV, hardware control, and API orchestration on edge hardware.",
      "Achieved real-time gesture recognition on Raspberry Pi 4 without cloud dependency.",
    ],
    reflection:
      "This project demonstrated that computer vision can replace conventional physical interaction for accessibility-focused applications. Implementing the solution on Raspberry Pi emphasized the importance of balancing AI capability with hardware limitations. The project also reinforced the value of state-based architecture (FSM) when coordinating multiple AI components that share a physical output.",
    futureImprovements: [
      "Add continuous face recognition (authenticated users stay recognized without re-authenticating).",
      "Support multiple authorized users with per-user gesture preferences.",
      "Integrate voice commands as an alternative control method.",
      "Build a mobile monitoring dashboard for remote system status.",
    ],
    technologies: [
      "Raspberry Pi 4",
      "DeepFace (ArcFace)",
      "MediaPipe",
      "FastAPI",
      "OpenCV",
      "GPIO/PWM",
      "MOSFET Driver",
      "Python",
    ],
  },
};

export default caseStudies;