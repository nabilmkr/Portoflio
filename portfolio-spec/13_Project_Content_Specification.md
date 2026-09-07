# SPEC-13 — Project Content Specification

**Version:** 1.0  
**Status:** Production Ready  
**Priority:** Critical

---

# 1. Purpose

This document defines the canonical content for every project presented in the portfolio.

Unlike previous specifications that define design principles or rendering behavior, this document defines **what information must be presented** within each project case study.

It acts as the single source of truth for project narratives, engineering explanations, implementation details, and technical storytelling.

Whenever content conflicts with assumptions made during implementation, this document takes precedence.

---

# 2. Objectives

Every project page should enable visitors to understand:

- What problem the project solves.
- Why the project was built.
- Who the target users are.
- What engineering challenges were encountered.
- Why specific technologies were selected.
- How the system works internally.
- What technical lessons were learned.
- How the project can be improved in the future.

The objective is to demonstrate engineering thinking rather than simply displaying technologies or screenshots.

---

# 3. Scope

This specification applies to every primary portfolio project.

Current projects include:

- Luxe News
- CUANIFY
- Smart Fan CV Control
- Gap Sense

Every project must follow the same content structure defined in this specification.

---

# 4. Source of Truth

All project information must originate from verified sources, including:

- Project documentation
- Technical reports
- Final reports
- Source code
- README files
- Personal implementation experience
- Verified project discussions

If a statement cannot be verified through one of these sources, it must not appear in the portfolio.

---

# 5. Global Content Principles

Every project should prioritize engineering communication over visual presentation.

Content should explain:

- decisions
- trade-offs
- implementation
- reasoning
- lessons learned

instead of marketing language.

Every explanation should help visitors understand how the project was designed and built.

---

# 6. Writing Style

Content should be:

- technically accurate
- concise
- readable
- objective
- implementation-focused

Avoid:

- exaggerated claims
- unnecessary buzzwords
- unsupported superlatives
- repetitive explanations

Prefer explaining **why** a decision was made instead of only describing **what** was used.

Example:

Good

> Laravel was selected because it simplified REST API development and integrated well with Filament Admin for content management.

Avoid

> Laravel is a powerful framework.

---

# 7. Content Hierarchy

Every project must follow this exact structure.

```text
Hero

↓

Overview

↓

Problem

↓

Challenges

↓

Engineering Decisions

↓

System Architecture

↓

Implementation

↓

Gallery

↓

Reflection

↓

Future Improvements
```

No section should be removed or reordered unless explicitly approved by a future specification.

---

# 8. Content Validation Rules

Every technical statement must satisfy at least one of the following conditions.

- Personally implemented.
- Observable in source code.
- Documented.
- Reproducible.
- Verified through project documentation.

If none of these conditions are met, the statement must be removed.

---

# 9. Forbidden Claims

The AI must never generate unsupported statements such as:

- performance improvements without measurements
- scalability claims without evidence
- security guarantees without implementation
- user statistics
- production deployment claims
- benchmark results
- latency improvements
- business impact without verification

Missing information should remain missing until verified.

Never fabricate details.

---

# 10. Standard Project Structure

Every project inside this specification must follow the same template.

```text
Hero

Overview

Problem

Challenges

Engineering Decisions

System Architecture

Implementation

Gallery

Reflection

Future Improvements
```

Consistency is mandatory.

---

# 11. Standard Hero Structure

Each project Hero must contain:

- Project Name
- Project Category
- One-line Summary
- Personal Role
- Development Duration
- Team Size
- Project Status
- Primary Technologies
- Hero Image
- Primary Call-to-Action

The Hero should summarize the project in fewer than thirty words.

---

# 12. Standard Overview Structure

The Overview section provides factual project metadata.

Required fields:

- Role
- Duration
- Team Size
- Status
- Database
- Primary Technologies

This section should contain facts only.

No storytelling.

---

# 13. Standard Problem Structure

The Problem section explains why the project exists.

Every project should clearly identify:

- Background
- Target User
- Existing Pain Point
- Expected Outcome

Technology discussions should not appear in this section.

---

# 14. Standard Challenge Structure

Each engineering challenge should follow the same format.

```text
Challenge

↓

Why It Was Difficult

↓

Solution

↓

Outcome
```

Maximum four major challenges.

Merge related challenges whenever possible.

---

# 15. Standard Engineering Decision Structure

Every important technology should answer:

```text
Technology

↓

Reason

↓

Trade-off

↓

Contribution
```

Never list technologies without explaining why they were selected.

---

# 16. Standard Architecture Structure

Every architecture explanation should describe the complete data flow.

General format:

```text
Input

↓

Processing

↓

Storage

↓

Output
```

Projects containing AI pipelines may expand this flow to include:

```text
Input

↓

Preprocessing

↓

AI Model

↓

Backend

↓

Frontend

↓

User
```

Architecture explanations should describe system interaction rather than implementation details.

---

# 17. Standard Implementation Structure

Implementation explains how the system was built.

Possible topics include:

- Backend
- Frontend
- Database
- Authentication
- API
- AI Pipeline
- Hardware
- Integration

Only include topics relevant to each project.

---

# 18. Standard Gallery Structure

Every gallery item should contain:

- Title
- Description
- Engineering Purpose

Screenshots must support explanations rather than replace them.

Every image should provide engineering context.

---

# 19. Standard Reflection Structure

Reflection focuses on engineering growth.

Every reflection should answer:

- What worked well?
- What proved difficult?
- What changed during development?
- What engineering lesson was learned?

Avoid emotional reflections.

Focus on technical learning.

---

# 20. Standard Future Improvements

Future improvements should satisfy all of the following:

- technically feasible
- realistic
- aligned with current architecture
- valuable to users

Avoid unrealistic feature lists.

Every improvement should naturally extend the existing system.

---

# 21. AI Constraints

When generating portfolio content, the AI must:

- preserve factual accuracy
- avoid unsupported claims
- separate facts from assumptions
- maintain consistent writing style
- preserve engineering focus

If required information is unavailable:

- stop
- request clarification
- never hallucinate

---

# 22. Acceptance Criteria

This specification is complete when every project:

- follows identical content hierarchy
- explains engineering reasoning
- avoids unsupported claims
- remains technically accurate
- communicates implementation clearly
- aligns with SPEC-12 Content Rendering Specification

---

# End of Part 1

# Part 2 — Luxe News

---

# Project Overview

## Project Name

Luxe News

---

## Category

Full Stack Web Application

Gaming News Platform

---

## Status

Completed

---

## Personal Role

Backend Developer

REST API Developer

System Integration

---

## Team Size

4 Members

- 1 Frontend Developer
- 1 Backend Developer (Me)
- 2 Supporting Members

---

## Development Duration

Approximately 3–4 Months

---

## Database

MySQL

---

## Primary Technologies

Frontend

- React 18
- Vite
- React Router
- Axios
- Tailwind CSS

Backend

- Laravel 12
- Laravel Sanctum
- Filament Admin

Database

- MySQL

Development Tools

- Git
- GitHub
- Postman

---

# Hero

## One-line Summary

A modern gaming news platform built with React and Laravel, featuring dynamic content management through REST APIs and an integrated admin dashboard.

---

## Primary Goal

Create a maintainable news platform where administrators can publish gaming news and tournaments without modifying application code.

---

## Target Users

- Gaming enthusiasts
- Esports audiences
- Content administrators

---

# Problem

Many gaming news websites require manual content updates or tightly couple frontend pages with backend logic.

This makes publishing new articles, tournaments, banners, or categories inefficient and increases maintenance effort.

The project aimed to separate content management from presentation so administrators could update information through an admin interface while users always received dynamic content.

---

# Challenges

## Challenge 1

### Challenge

Managing multiple content types within one backend.

### Why It Was Difficult

The system needed to support news, tournaments, categories, banners, and comments while maintaining a consistent API structure.

### Solution

Built reusable REST API resources using Laravel and centralized content management through Filament Admin.

### Outcome

Content became easier to maintain and new resources could be added without restructuring the application.

---

## Challenge 2

### Challenge

Reducing unnecessary frontend loading.

### Why It Was Difficult

The homepage displays multiple visual assets and dynamic content.

Rendering everything immediately would increase loading time.

### Solution

Implemented lazy loading for selected React pages and components.

### Outcome

Only required content loads when needed, improving perceived responsiveness.

---

## Challenge 3

### Challenge

Keeping frontend and backend development independent.

### Why It Was Difficult

Both applications needed to evolve without tightly coupling implementation.

### Solution

Separated responsibilities using REST APIs between Laravel and React.

### Outcome

Frontend and backend could be developed independently while communicating through standardized endpoints.

---

# Engineering Decisions

---

## Laravel 12

### Reason

Provides a mature ecosystem for REST API development.

### Trade-off

PHP ecosystem compared to Python-based alternatives.

### Contribution

Served as the primary backend service exposing application data.

---

## Filament Admin

### Reason

Rapid development of administrative interfaces.

### Trade-off

Adds dependency on Filament ecosystem.

### Contribution

Allows administrators to manage application content without modifying source code.

---

## React 18

### Reason

Component-based architecture simplifies reusable UI development.

### Trade-off

Requires explicit state management.

### Contribution

Delivered responsive user interface consuming backend APIs.

---

## React Router

### Reason

Supports dynamic routing using slugs.

### Contribution

Enables pages such as:

/news/{slug}

without manual routing.

---

## Laravel Sanctum

### Reason

Protect authenticated API endpoints.

### Contribution

Provides secure authentication for administrative functionality.

---

## Tailwind CSS

### Reason

Accelerates responsive interface development.

### Contribution

Maintains consistent design system across pages.

---

# System Architecture

## Architecture Summary

The system follows a separated frontend-backend architecture.

React is responsible for presentation.

Laravel provides REST APIs.

Filament manages administrative content.

MySQL stores application data.

---

## Data Flow

```text
Administrator

↓

Filament Admin

↓

Laravel REST API

↓

MySQL

↓

REST API

↓

React Frontend

↓

Visitor
```

---

## Content Flow

```text
Admin publishes article

↓

Stored in MySQL

↓

Laravel exposes REST endpoint

↓

React requests endpoint

↓

News rendered dynamically
```

---

# Implementation

## Backend

Developed REST API endpoints for:

- News
- Categories
- Tournaments
- Comments
- Banners

---

## Frontend

Consumes backend APIs using Axios.

Displays dynamic content using reusable React components.

---

## Authentication

Laravel Sanctum protects authenticated endpoints used for administrative operations.

---

## Database

MySQL stores:

- News
- Categories
- Tournament data
- Comments
- Banner information

---

## Integration

React communicates exclusively through REST APIs.

No direct database access exists from the frontend.

---

# Gallery

Recommended screenshots.

- Homepage
- News Detail
- Tournament Page
- Filament Dashboard
- Category Management
- REST API Example

Each screenshot should explain its engineering purpose.

---

# Reflection

This project reinforced the importance of separating presentation and business logic.

Using Laravel as an API backend and React as the presentation layer simplified maintenance and reduced coupling between applications.

Developing with Filament also demonstrated how administrative interfaces can significantly reduce future operational effort.

---

# Future Improvements

- Full-text search for news.
- Tournament filtering.
- Image optimization pipeline.
- Pagination improvements.
- Notification system for newly published content.

---

# Verified Facts

Duration

Approximately 3–4 months.

---

Team

4 members.

Backend developed primarily by me.

Frontend handled by one frontend developer.

---

Database

MySQL.

---

Status

Completed.

---

Personal Contribution

Designed and developed backend services.

Implemented REST APIs.

Integrated backend with React frontend.

Configured Filament Admin.

---

# AI Constraints

Do not claim:

- production deployment
- active users
- scalability benchmarks
- measured performance improvements
- security certifications

Do not invent missing implementation details.

If additional information becomes available, update this section instead of generating assumptions.

---

End of Part 2.

# Part 3 — CUANIFY

---

# Project Overview

## Project Name

CUANIFY

---

## Category

AI-Powered Personal Finance Mobile Application

---

## Status

Completed

---

## Personal Role

Full Stack Developer

AI Developer

Backend Developer

Mobile Developer

---

## Team Size

3 Members

- 1 Administrative & Business
- 1 UI/UX Designer
- 1 Full Technical Developer (Me)

---

## Development Duration

Approximately 3–4 Months

---

## Database

MySQL

---

## Primary Technologies

Mobile

- React Native
- Expo

Backend

- Laravel 11
- Laravel Sanctum

AI Service

- FastAPI
- Python
- Scikit-learn
- Google Gemini 2.5 Flash

Database

- MySQL

Authentication

- Google OAuth

Development Tools

- Git
- GitHub
- Postman

---

# Hero

## One-line Summary

An AI-powered personal finance assistant that analyzes spending habits and generates personalized financial recommendations through machine learning and generative AI.

---

## Primary Goal

Help young users understand their financial condition through intelligent analysis instead of passive expense tracking.

---

## Target Users

- Students
- Young adults
- Beginner budget planners

---

# Problem

Most financial tracking applications only record transactions without helping users understand their financial behavior.

Users often know where money is spent but struggle to identify unhealthy spending patterns or receive practical recommendations for improvement.

The project aims to transform financial records into actionable insights through AI-driven analysis.

---

# Challenges

## Challenge 1

### Challenge

Building an AI pipeline capable of producing meaningful financial insights.

### Why It Was Difficult

Machine learning classification and generative AI serve different purposes and require different processing stages.

### Solution

Separated the workflow into structured stages where the classification model determines financial health before sending contextual information to the LLM for narrative generation.

### Outcome

The generated advice becomes more personalized and consistent with the user's financial condition.

---

## Challenge 2

### Challenge

Integrating AI services without affecting backend stability.

### Why It Was Difficult

AI inference requires additional computation and depends on external services.

### Solution

Separated the AI pipeline into a FastAPI microservice while Laravel handled authentication and business logic.

### Outcome

Backend responsibilities remained isolated from AI processing.

---

## Challenge 3

### Challenge

Maintaining secure authentication across the mobile application.

### Why It Was Difficult

User authentication needed to remain simple while protecting API access.

### Solution

Implemented Google OAuth for user login and Laravel Sanctum for API authentication.

### Outcome

Authentication became easier for users while backend endpoints remained protected.

---

## Challenge 4

### Challenge

Connecting multiple application layers.

### Why It Was Difficult

The application consists of React Native, Laravel, FastAPI, Machine Learning, and Gemini AI services.

### Solution

Established a layered architecture where each service performs a single responsibility.

### Outcome

System maintenance became easier because each service can evolve independently.

---

# Engineering Decisions

---

## React Native

### Reason

Build Android and iOS applications from a single codebase.

### Trade-off

Requires native bridge integration for platform-specific functionality.

### Contribution

Provides a consistent mobile experience across platforms.

---

## Laravel 11

### Reason

Acts as the primary backend service responsible for authentication, business logic, and REST APIs.

### Trade-off

Requires communication with external AI services.

### Contribution

Coordinates application logic and mobile communication.

---

## FastAPI

### Reason

Provides high-performance AI endpoints while integrating naturally with Python machine learning libraries.

### Trade-off

Introduces an additional backend service.

### Contribution

Executes AI-related processing independently from Laravel.

---

## Google Gemini 2.5 Flash

### Reason

Generates personalized financial explanations from structured AI outputs.

### Trade-off

Depends on external API availability.

### Contribution

Transforms classification results into human-readable recommendations.

---

## Scikit-learn

### Reason

Implements financial health classification using supervised machine learning.

### Trade-off

Prediction quality depends on available training data.

### Contribution

Determines financial condition before narrative generation.

---

## MySQL

### Reason

Stores user accounts, financial transactions, and application data.

### Trade-off

Structured relational database.

### Contribution

Acts as the primary persistent storage.

---

# System Architecture

## Architecture Summary

CUANIFY follows a multi-service architecture separating mobile presentation, backend services, AI processing, and language generation.

Laravel manages business logic.

FastAPI manages AI computation.

React Native serves as the client application.

---

## Data Flow

```text
Mobile User

↓

React Native

↓

Laravel REST API

↓

MySQL

↓

FastAPI

↓

Machine Learning Model

↓

Google Gemini

↓

Laravel

↓

React Native

↓

Financial Insight
```

---

## AI Pipeline

```text
Transaction History

↓

Data Preparation

↓

Random Forest Classification

↓

Financial Status

↓

Prompt Construction

↓

Google Gemini

↓

Personalized Recommendation
```

---

# Implementation

## Mobile Application

Built using React Native and Expo.

Provides transaction management, authentication, dashboard visualization, and AI insights.

---

## Backend

Laravel handles:

- Authentication
- User management
- Transaction management
- REST APIs
- Communication with AI service

---

## AI Service

FastAPI executes:

- data preprocessing
- feature preparation
- machine learning inference
- AI response generation

---

## Authentication

Google OAuth authenticates users.

Laravel Sanctum secures API communication.

---

## Database

MySQL stores:

- Users
- Transactions
- Categories
- Financial summaries
- AI history (when available)

---

## Integration

React Native communicates with Laravel.

Laravel communicates with FastAPI.

FastAPI communicates with Google Gemini.

Each service performs a dedicated responsibility.

---

# Gallery

Recommended screenshots.

- Dashboard
- Transaction List
- AI Insight Screen
- Monthly Summary
- Login Screen
- Financial Health Result

Every screenshot should explain its engineering purpose.

---

# Reflection

CUANIFY demonstrated the importance of separating business logic from AI processing.

Building the AI service independently simplified experimentation without affecting the primary backend.

The project also highlighted how combining traditional machine learning with generative AI can produce more understandable recommendations than either approach alone.

---

# Future Improvements

- Budget planning module.
- Smart anomaly detection.
- Spending trend visualization.
- Offline insight caching.
- Multi-language AI responses.

---

# Verified Facts

Duration

Approximately 3–4 months.

---

Team

3 members.

Only one developer responsible for technical implementation.

---

Database

MySQL.

---

Status

Completed.

---

Personal Contribution

Designed overall system architecture.

Developed Laravel backend.

Developed FastAPI AI service.

Built React Native mobile application.

Integrated Google Gemini.

Integrated Machine Learning pipeline.

Connected all services.

---

# AI Constraints

Do not claim:

- financial prediction accuracy
- model precision
- benchmark performance
- production deployment
- real-world user statistics
- enterprise-grade security
- scalability metrics

Do not invent training dataset size.

Do not invent model evaluation results.

Only present verified implementation details.

---

End of Part 3.

# Part 4 — Smart Fan CV Control

---

# Project Overview

## Project Name

Smart Fan CV Control

---

## Category

Edge AI

Computer Vision

IoT Automation

Assistive Technology

---

## Status

Completed

---

## Personal Role

Software Developer

Computer Vision Developer

System Integration

Raspberry Pi Configuration

---

## Team Size

3 Members

- Software Developer (Me)
- Hardware Engineer
- Procurement & Project Support

---

## Development Duration

Approximately 3–4 Months

---

## Database

None

The system operates locally without requiring a persistent relational database.

Configuration and runtime state are managed directly by the application.

---

## Primary Technologies

Hardware

- Raspberry Pi 4
- DC Fan
- MOSFET Driver
- USB Camera

Backend

- FastAPI

Computer Vision

- MediaPipe
- DeepFace
- OpenCV

Programming Language

- Python

Development Tools

- Git
- GitHub

---

# Hero

## One-line Summary

A touchless smart fan controlled using face verification and hand gesture recognition to improve accessibility for people with physical disabilities.

---

## Primary Goal

Replace physical interaction with computer vision so users can safely operate a fan using facial authentication and hand gestures.

---

## Target Users

- People with physical disabilities.
- Users requiring touchless interaction.
- Smart home accessibility demonstrations.

---

# Problem

Traditional electrical appliances require physical interaction through buttons or switches.

For users with limited mobility, these interactions can become difficult or impossible.

The project explores how computer vision can replace conventional physical controls with natural human interaction.

---

# Challenges

## Challenge 1

### Challenge

Running computer vision models on Raspberry Pi.

### Why It Was Difficult

Raspberry Pi has limited processing resources compared to desktop hardware.

Real-time image processing can easily introduce lag.

### Solution

Selected lightweight computer vision libraries and optimized the processing pipeline to reduce unnecessary computation.

### Outcome

The system remained responsive while performing real-time detection.

---

## Challenge 2

### Challenge

Maintaining smooth camera performance during authentication.

### Why It Was Difficult

Face verification requires additional computation that can interrupt continuous video processing.

### Solution

Separated verification into background processing while keeping the camera stream active.

### Outcome

The camera remained responsive during authentication.

---

## Challenge 3

### Challenge

Preventing unauthorized fan control.

### Why It Was Difficult

Gesture recognition alone cannot distinguish authorized users.

### Solution

Added a face verification stage before enabling gesture recognition.

### Outcome

Only authenticated users can control the fan.

---

## Challenge 4

### Challenge

Managing multiple system states.

### Why It Was Difficult

Face authentication and gesture recognition cannot run simultaneously without clear coordination.

### Solution

Implemented a Finite State Machine (FSM) controlling authentication and interaction flow.

### Outcome

System behavior became predictable and easier to maintain.

---

# Engineering Decisions

---

## Raspberry Pi 4

### Reason

Provides affordable edge computing capable of running computer vision locally.

### Trade-off

Limited CPU resources compared to desktop computers.

### Contribution

Acts as the central processing unit for the entire system.

---

## MediaPipe

### Reason

Efficient real-time hand landmark detection.

### Trade-off

Requires good lighting for optimal detection.

### Contribution

Recognizes finger gestures used to control fan speed.

---

## DeepFace

### Reason

Provides facial verification before granting access.

### Trade-off

Verification requires additional computation.

### Contribution

Restricts system access to authorized users.

---

## FastAPI

### Reason

Exposes lightweight system endpoints while remaining asynchronous.

### Trade-off

Adds another software component.

### Contribution

Supports monitoring and system integration.

---

## OpenCV

### Reason

Handles camera input and image preprocessing.

### Trade-off

Requires efficient frame management.

### Contribution

Provides the video stream used by all vision components.

---

# System Architecture

## Architecture Summary

The system executes entirely on Raspberry Pi.

Computer vision operates locally without requiring cloud processing.

Authentication occurs before gesture recognition.

Gesture recognition controls hardware through GPIO.

---

## System Flow

```text
Camera

↓

OpenCV

↓

DeepFace Verification

↓

Authentication Success

↓

MediaPipe Hand Tracking

↓

Gesture Recognition

↓

GPIO

↓

MOSFET

↓

DC Fan
```

---

## State Flow

```text
IDLE

↓

AUTHENTICATING

↓

ACTIVE

↓

NO USER

↓

IDLE
```

---

# Implementation

## Face Verification

DeepFace verifies user identity before interaction begins.

Unauthenticated users cannot control the system.

---

## Gesture Recognition

MediaPipe detects hand landmarks.

Recognized finger patterns determine fan speed.

---

## Hardware Control

Recognized gestures are translated into GPIO signals.

GPIO controls the MOSFET driver connected to the DC fan.

---

## System Logic

Finite State Machine coordinates:

- Idle mode
- Authentication
- Active control
- Automatic reset

---

## Processing

All inference executes locally on Raspberry Pi.

No cloud communication is required.

---

# Gallery

Recommended screenshots.

- Raspberry Pi setup.
- Face verification.
- Gesture recognition.
- Camera interface.
- Hardware wiring.
- Fan control demonstration.

Every screenshot should explain its engineering relevance.

---

# Reflection

This project demonstrated that computer vision can replace conventional physical interaction for accessibility-focused applications.

Implementing the solution on Raspberry Pi emphasized the importance of balancing AI capability with hardware limitations.

The project also reinforced the value of state-based architecture when coordinating multiple AI components.

---

# Future Improvements

- Continuous face recognition.
- Multiple authorized users.
- Voice command integration.
- Mobile monitoring dashboard.
- Additional gesture commands.

---

# Verified Facts

Duration

Approximately 3–4 months.

---

Team

3 members.

---

Database

None.

---

Status

Completed.

---

Personal Contribution

Designed software architecture.

Developed computer vision pipeline.

Integrated DeepFace.

Integrated MediaPipe.

Configured Raspberry Pi.

Integrated software with hardware.

Performed functional testing.

---

# AI Constraints

Do not claim:

- medical certification
- commercial deployment
- facial recognition accuracy
- inference FPS
- benchmark performance
- hardware reliability metrics

Do not invent:

- latency values
- detection accuracy
- accessibility certifications
- production deployment

Present only verified implementation details.

---

End of Part 4.

# Part 5 — Gap Sense

---

# Project Overview

## Project Name

Gap Sense

---

## Category

AI-Powered Career Recommendation System

Decision Support System (DSS)

Skill Gap Analysis Platform

---

## Status

Completed

---

## Personal Role

AI System Developer

Backend Developer

Machine Learning Developer

LLM Integration

---

## Team Size

4 Members

- AI System Developer (Me)
- Data Engineer
- Frontend Developer
- Documentation & Research

> Update member roles if final responsibilities differ.

---

## Development Duration

February – April (Capstone Project)

Approximately 5 Weeks of Active Development

---

## Database

Primary Dataset

- JSON
- CSV

Data Sources

- Kaggle Datasets
- LinkedIn Job Posting Dataset
- Adzuna API

Future Storage

- Database planned for user search history.

---

## Primary Technologies

Frontend

- Streamlit

Backend

- FastAPI

Machine Learning

- Sentence-BERT (SBERT)

Large Language Model

- Llama 3.3 70B (Groq API)

Programming Language

- Python

Data Processing

- Pandas
- NumPy

Development Tools

- Git
- GitHub

---

# Hero

## One-line Summary

An AI-powered career recommendation platform that analyzes skill gaps against industry requirements and generates personalized learning roadmaps.

---

## Primary Goal

Help students and early-career developers understand missing skills required for their target careers using semantic matching and AI-generated recommendations.

---

## Target Users

- University students.
- Fresh graduates.
- Career switchers.
- Self-taught developers.

---

# Problem

Many learners know which career they want to pursue but struggle to understand which technical skills they still lack.

Traditional job searching requires manually comparing dozens of job descriptions, making it difficult to identify learning priorities.

Gap Sense automates this process by comparing user skills with industry demand and generating structured career recommendations.

---

# Challenges

## Challenge 1

### Challenge

Processing inconsistent job posting data.

### Why It Was Difficult

Job postings often contain duplicated, irrelevant, or inconsistent skill names.

The same technology may also appear under multiple aliases.

### Solution

Implemented preprocessing and normalization before analysis.

Skill aliases were standardized to reduce inconsistent matching.

### Outcome

Generated cleaner input for semantic comparison.

---

## Challenge 2

### Challenge

Matching similar skills instead of exact keywords.

### Why It Was Difficult

Keyword matching cannot recognize semantic similarity.

For example:

"JS"

and

"JavaScript"

should represent the same concept.

### Solution

Used Sentence-BERT embeddings with cosine similarity.

### Outcome

Skill matching became more flexible than traditional keyword comparison.

---

## Challenge 3

### Challenge

Producing recommendations that users can understand.

### Why It Was Difficult

Similarity scores alone provide little practical guidance.

### Solution

Combined structured analysis with an LLM capable of generating natural-language explanations.

### Outcome

Users receive both analytical results and actionable learning recommendations.

---

## Challenge 4

### Challenge

Separating analytical computation from presentation.

### Why It Was Difficult

Data processing, AI inference, and UI each require different responsibilities.

### Solution

Separated Streamlit, FastAPI, semantic analysis, and LLM generation into dedicated layers.

### Outcome

System became easier to maintain and extend.

---

# Engineering Decisions

---

## Streamlit

### Reason

Rapid development of interactive data applications.

### Trade-off

Less flexible than custom frontend frameworks.

### Contribution

Provides an intuitive interface for career analysis.

---

## FastAPI

### Reason

High-performance API framework for AI services.

### Trade-off

Introduces an additional backend layer.

### Contribution

Coordinates semantic analysis and AI communication.

---

## Sentence-BERT

### Reason

Measures semantic similarity instead of relying on exact keyword matching.

### Trade-off

Requires embedding generation before comparison.

### Contribution

Improves skill matching quality.

---

## Llama 3.3 70B

### Reason

Transforms structured analysis into understandable career recommendations.

### Trade-off

Requires external inference service.

### Contribution

Produces personalized learning roadmaps.

---

## JSON & CSV Dataset

### Reason

Simple and flexible format for structured job data.

### Trade-off

Requires preprocessing before analysis.

### Contribution

Serves as the primary knowledge source for skill comparison.

---

# System Architecture

## Architecture Summary

Gap Sense separates data preprocessing, semantic analysis, AI reasoning, and user interaction into independent stages.

Each stage performs one specific responsibility before passing structured results to the next layer.

---

## Data Flow

```text
User Input

↓

Input Validation

↓

Skill Normalization

↓

Sentence-BERT Embedding

↓

Cosine Similarity

↓

Gap Analysis

↓

FastAPI

↓

Llama 3.3

↓

Career Recommendation

↓

Streamlit Interface

↓

User
```

---

## Analysis Pipeline

```text
Target Role

+

User Skills

↓

Dataset Retrieval

↓

Semantic Matching

↓

Gap Identification

↓

Priority Ranking

↓

AI Explanation

↓

Learning Roadmap
```

---

# Implementation

## Frontend

Built with Streamlit.

Provides interactive forms, result visualization, and recommendation display.

---

## Backend

FastAPI coordinates:

- preprocessing
- semantic analysis
- LLM communication
- response generation

---

## Semantic Matching

Sentence-BERT converts user skills and job requirements into embeddings.

Cosine similarity measures relationship between both representations.

---

## AI Recommendation

Llama receives structured analysis instead of raw user input.

Generated recommendations are based on calculated skill gaps.

---

## Dataset

Primary datasets contain:

- job roles
- required skills
- industry requirements
- technology keywords

Datasets are cleaned before semantic processing.

---

# Gallery

Recommended screenshots.

- Home Interface
- Skill Input Form
- Analysis Result
- Skill Gap Visualization
- AI Recommendation
- Learning Roadmap

Each screenshot should explain what engineering process it represents.

---

# Reflection

Gap Sense reinforced that data quality has a significant impact on AI system performance.

Semantic similarity produced more flexible matching than traditional keyword comparison, while combining structured analysis with LLM explanations improved result readability.

The project also demonstrated the importance of separating AI reasoning from deterministic analysis.

---

# Future Improvements

- Support additional career paths.
- Expand dataset coverage.
- Store user analysis history.
- Visual learning progress tracker.
- Integrate additional job market APIs.

---

# Verified Facts

Duration

February – April.

Capstone Project.

Approximately five weeks of active development.

---

Team

4 members.

---

Primary Dataset

JSON.

CSV.

Kaggle Datasets.

LinkedIn Job Posting Dataset.

Adzuna API.

---

Status

Completed.

---

Personal Contribution

Designed AI analysis workflow.

Developed semantic matching pipeline.

Implemented FastAPI backend.

Integrated Sentence-BERT.

Integrated Llama API.

Developed analysis logic.

Connected all AI components.

---

# AI Constraints

Do not claim:

- recommendation accuracy
- prediction accuracy
- benchmark results
- enterprise deployment
- production users
- hiring success rate
- model precision
- recall
- F1-score

Do not invent:

- dataset size
- inference speed
- API latency
- evaluation metrics
- statistical improvements

Present only verified implementation details.

---

End of Part 5.

# Part 6 — Global Validation & Final AI Constraints

---

# 23. Portfolio Consistency Rules

Every project must follow the same storytelling structure.

```text
Hero

↓

Overview

↓

Problem

↓

Challenges

↓

Engineering Decisions

↓

System Architecture

↓

Implementation

↓

Gallery

↓

Reflection

↓

Future Improvements
```

Projects may differ in content but never in structure.

---

# 24. Cross-Project Consistency

Every project should answer the same engineering questions.

## Hero

- What is this project?
- Why should visitors care?

---

## Problem

- What real problem existed?
- Who experienced the problem?

---

## Challenges

- What technical obstacle appeared?
- Why was it difficult?
- How was it solved?

---

## Engineering Decisions

Every major technology should explain:

- Why selected.
- Alternative considered (if applicable).
- Contribution to system.

---

## Architecture

Explain:

- Data flow.
- Component interaction.
- System responsibility.

Do not explain implementation details here.

---

## Reflection

Focus on engineering growth.

Avoid personal emotion.

Good

> Separating AI processing into an independent service simplified future experimentation.

Avoid

> I enjoyed building this project.

---

# 25. Portfolio Quality Checklist

Every project should satisfy all items below.

## Technical Accuracy

- No hallucinated information.
- No unsupported metrics.
- No fabricated architecture.
- No invented deployment.
- No invented performance improvements.

---

## Storytelling

Project clearly explains:

- Why.
- What.
- How.
- Result.
- Lesson.

---

## Engineering

Project demonstrates:

- problem solving.
- architecture thinking.
- implementation reasoning.
- maintainability.

---

## Consistency

- Same writing style.
- Same hierarchy.
- Same formatting.
- Same terminology.

---

# 26. Portfolio-Level Validation

Before implementation verify:

## Content

- Every required section exists.
- No duplicate explanations.
- Screenshots support engineering discussion.
- Reflection is technical.

---

## Technical

- Technologies match implementation.
- Architecture matches project.
- Database information is correct.
- Team information is correct.
- Personal contribution is accurate.

---

## Language

Writing should remain:

- objective.
- concise.
- professional.
- technically focused.

Avoid marketing language.

---

# 27. AI Rendering Instructions

When rendering project pages:

Always prioritize:

1. Accuracy.
2. Consistency.
3. Readability.
4. Engineering clarity.

Visual appearance should never reduce technical understanding.

---

## Missing Information

If information is unavailable:

- Leave placeholder.
- Request clarification.
- Never generate assumptions.

Example

Good

> Deployment information unavailable.

Bad

> Deployed on AWS using Docker.

unless verified.

---

## Personal Contribution

Always distinguish:

Implemented by me.

Implemented by teammates.

Implemented collaboratively.

Never imply full ownership of features built by others.

---

## Future Updates

Future edits should modify only affected sections.

Avoid rewriting entire project unless architecture fundamentally changes.

---

# 28. Relationship with Other Specifications

SPEC-13 depends on:

- SPEC-01 — Portfolio Foundation
- SPEC-02 — Design System
- SPEC-03 — Information Architecture
- SPEC-04 — Visual Identity
- SPEC-05 — Component System
- SPEC-06 — Motion System
- SPEC-07 — Responsive Strategy
- SPEC-08 — Accessibility
- SPEC-09 — Asset Specification
- SPEC-10 — Interaction Specification
- SPEC-11 — Case Study Strategy
- SPEC-12 — Content Rendering Specification

SPEC-13 defines the project content consumed by SPEC-12.

SPEC-14 defines how developers and AI Agents implement these specifications.

---

# 29. Final AI Constraints

The AI must never:

- Invent technical details.
- Invent implementation history.
- Invent architecture.
- Invent security mechanisms.
- Invent benchmarks.
- Invent user statistics.
- Invent deployment infrastructure.
- Invent business impact.

The AI should always:

- Preserve factual accuracy.
- Explain engineering decisions.
- Separate facts from assumptions.
- Prefer clarity over complexity.
- Prefer verified information over completeness.

If uncertainty exists:

Stop.

Request clarification.

Do not hallucinate.

---

# 30. Acceptance Criteria

SPEC-13 is considered complete only when:

- All four projects follow the same structure.
- Every engineering decision has justification.
- Every challenge includes a solution.
- Every architecture matches implementation.
- Every reflection discusses engineering lessons.
- Every future improvement is realistic.
- Every statement can be verified.
- No unsupported claim exists.

---
l
# End of Document

Document Title

SPEC-13 — Project Content Specification

Version

1.0

Status

Production Ready

Purpose

Defines the complete canonical content for every project case study within the portfolio.

End.