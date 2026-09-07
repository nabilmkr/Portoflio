# 11 — Project Case Study Specification

**Project:** Nabil Makarim Portfolio  
**Document:** Project Case Study Specification  
**Version:** 1.0  
**Status:** Ready for Content & Implementation  
**Primary Goal:** Communicate engineering thinking, not only project output.

---

## 1. Purpose

This document defines how portfolio projects should communicate:

- why project exists
- what problem it addresses
- who experiences problem
- how problem was understood
- what constraints existed
- what decisions were made
- why decisions were made
- what trade-offs existed
- how solution was implemented
- what result was achieved
- what was learned

A project must not be presented only as:

```text
Screenshot
+
Project Name
+
Tech Stack
+
Features
```

Instead:

```text
Problem
    ↓
Understanding
    ↓
Decision
    ↓
Approach
    ↓
Implementation
    ↓
Result
    ↓
Reflection
```

---

## 2. Core Principle

> Show how I think, not only what I build.

A visitor should be able to answer:

- Why was this project built?
- Who was it built for?
- What problem did it solve?
- What constraints existed?
- Why was this approach chosen?
- Why were these technologies selected?
- What alternatives were rejected?
- What was the result?
- What did the developer learn?

If visitor cannot answer these questions, case study is incomplete.

---

## 3. Case Study Depth

### Level 1 — Small Project

```text
Problem
Approach
Result
```

Recommended length:

```text
300–600 words
```

### Level 2 — Medium Project

```text
Context
Problem
Users
Approach
Key Decisions
Implementation
Result
Reflection
```

Recommended length:

```text
600–1,200 words
```

### Level 3 — Major Project

```text
Context
Problem
Users
Research
Goals
Constraints
Alternatives
Approach
Key Decisions
Architecture
Implementation
Challenges
Result
Trade-offs
Reflection
Future Improvements
```

Recommended length:

```text
1,000–2,000 words
```

Do not force every project into Level 3.

Depth must match project significance.

---

## 4. Case Study Structure

### 4.1 Hero

Hero must immediately communicate:

```text
What is this project?
Why does it matter?
```

Structure:

```text
Project Name

Short descriptive statement.

[Primary Project Visual]

Role
Duration
Team
Status
```

Description must explain actual project.

Avoid vague descriptions such as:

```text
A modern innovative platform.
```

---

## 5. Context

### Question

Why does this project exist?

Context establishes situation before explaining solution.

If project was personal exploration:

```text
This project began as an exploration of...
```

Use honest framing.

---

## 6. Problem

### Question

What specific problem was being addressed?

Weak:

```text
People have difficulty learning.
```

Strong:

```text
Students may know their target role but lack
a clear way to compare their current skills
against the requirements of that role.
```

Use:

```text
Problem:
[Specific problem]

Impact:
[Why problem matters]
```

---

## 7. Users

### Question

Who experiences this problem?

Define:

```text
Primary users
Secondary users
```

If actual user research was not performed, do not claim:

```text
Users said...
```

Use:

```text
Target users
Intended users
Assumed users
```

---

## 8. Goals

Define what project attempted to achieve.

Goals must be measurable where possible.

Prefer:

```text
Allow users to compare current skills
against target role requirements.
```

Avoid:

```text
Make experience better.
```

---

## 9. Constraints

Document relevant constraints:

```text
Time
Team size
Technical knowledge
Data availability
Infrastructure
Budget
Hardware
Model limitations
```

Constraints explain why decisions were made.

---

## 10. Alternatives

Strong case studies show alternatives genuinely considered.

Structure:

```text
Option A
Pros:
...

Cons:
...

Option B
Pros:
...

Cons:
...

Decision:
...
```

Do not invent alternatives after the fact.

If no alternatives were considered:

```text
No formal alternatives were evaluated.
```

Honesty is better than fabricated process.

---

## 11. Approach

Explain high-level solution.

Structure:

```text
Input
    ↓
Processing
    ↓
Analysis
    ↓
Output
```

This section should be understandable without reading code.

---

## 12. Key Decisions

Every major technical or product decision should answer:

```text
Decision:
What was chosen?

Why:
Why was it chosen?

Trade-off:
What was sacrificed?

Result:
What did decision enable?
```

Template:

```text
### Decision: [Decision]

I chose [X] because [reason].

The main trade-off was [trade-off].

This allowed the project to [result].
```

Do not write:

```text
I used FastAPI because it is popular.
```

Popularity alone is not engineering reasoning.

---

## 13. Technical Implementation

Explain implementation after explaining reasoning.

Possible sections:

```text
Frontend
Backend
Data
AI / ML
Infrastructure
Hardware
```

For each:

```text
Responsibility
Technology
Reason
```

Do not turn section into generic tech stack list.

---

## 14. Architecture

Architecture should communicate relationships.

Example:

```text
User
  ↓
Frontend
  ↓
API
  ↓
Processing Layer
  ↓
Database / AI Model
  ↓
Result
```

Architecture diagram should answer:

- What talks to what?
- Where does data move?
- Where does processing happen?

Do not create diagrams only for decoration.

---

## 15. Challenges

Explain difficult parts.

Use:

```text
Challenge
    ↓
Investigation
    ↓
Decision
    ↓
Outcome
```

This makes problem-solving visible.

---

## 16. Trade-offs

No solution is perfect.

Document important trade-offs.

Example:

```text
Decision:
Use simpler architecture.

Benefit:
Faster development and easier maintenance.

Cost:
Less flexibility for future scale.

Why acceptable:
Project scope did not require distributed
architecture.
```

This demonstrates engineering maturity.

---

## 17. Result

Explain what was actually achieved.

Possible result types:

```text
Functional result
Technical result
User result
Performance result
Learning result
```

Do not invent metrics.

If no formal metrics exist:

```text
The project successfully demonstrated...
```

or:

```text
The current implementation supports...
```

Never claim unsupported metrics.

---

## 18. Reflection

Answer:

```text
What did I learn?

What would I change?

What would I investigate next?
```

Reflection should be personal but professional.

---

## 19. Future Improvements

Only include realistic improvements.

Separate clearly:

```text
Implemented
```

from:

```text
Future
```

Never present planned features as completed features.

---

## 20. Interactive Storytelling

Case study should not be a wall of text.

Recommended sequence:

```text
Hero
  ↓
Problem
  ↓
User
  ↓
Approach
  ↓
Decision
  ↓
Implementation
  ↓
Result
  ↓
Reflection
```

Each section may use:

- scroll reveal
- diagrams
- animated architecture
- highlighted decision
- image comparison
- interactive technical visualization

Motion must support narrative.

---

## 21. Motion Rules for Case Studies

Motion should reveal relationships.

Good:

```text
Problem
    ↓
Approach
    ↓
Solution
```

Good:

```text
Input
    ↓
Processing
    ↓
Output
```

Good:

```text
Card
    ↓
Detailed Case Study
```

Bad:

```text
Text spins
Cards bounce
Background constantly moves
```

Motion must communicate meaning.

---

## 22. Content Integrity

AI agent MUST NOT:

- invent user research
- invent metrics
- invent users
- invent business results
- invent technical decisions
- invent challenges
- invent project history
- claim technologies not used
- claim features not implemented

If information is unavailable:

```text
MISSING CASE STUDY INFORMATION
```

Do not guess.

---

## 23. AI Agent Content Workflow

Before writing case study content:

### Step 1

Identify project facts.

### Step 2

Separate facts from assumptions.

```text
FACT
ASSUMPTION
UNKNOWN
```

### Step 3

Ask for missing information when necessary.

### Step 4

Create narrative structure.

```text
Problem
→
Decision
→
Implementation
→
Result
```

### Step 5

Write content.

### Step 6

Validate every claim against source information.

---

## 24. Project Content Schema

Recommended data structure:

```ts
type ProjectCaseStudy = {
  id: string;
  title: string;
  tagline: string;

  context: string;
  problem: string;

  users: {
    primary: string[];
    secondary?: string[];
  };

  goals: string[];

  constraints?: string[];

  approach: string;

  decisions: {
    decision: string;
    reason: string;
    tradeoff?: string;
    outcome?: string;
  }[];

  implementation: {
    area: string;
    technology: string[];
    responsibility: string;
  }[];

  challenges?: {
    challenge: string;
    response: string;
    outcome: string;
  }[];

  result: string[];

  reflection: string;

  futureImprovements?: string[];

  technologies: string[];

  images: string[];
};
```

---

## 25. Case Study Acceptance Criteria

- [ ] Project purpose is clear.
- [ ] Problem is specific.
- [ ] Intended user is clear.
- [ ] Goals are defined.
- [ ] Constraints are documented where relevant.
- [ ] Approach is explained.
- [ ] Major decisions include reasoning.
- [ ] Important trade-offs are acknowledged.
- [ ] Technical implementation is understandable.
- [ ] Results are honest.
- [ ] No unsupported metrics exist.
- [ ] No fabricated research exists.
- [ ] Reflection exists for significant projects.
- [ ] Future improvements are separated from completed work.
- [ ] Narrative can be understood without reading source code.
- [ ] Motion supports story rather than distracting from it.

---

## 26. Final Principle

A project page should answer:

> What problem did I see?

> How did I understand it?

> What did I decide?

> Why did I decide that?

> What did I build?

> What happened afterward?

> What did I learn?

The goal is not to make every project look like a startup case study.

The goal is to make engineering thinking visible.

A strong project case study should make visitor think:

> "I understand what this project does."

Then:

> "I understand why it was built."

Then:

> "I understand why these decisions were made."

Finally:

> "I understand how this person thinks."

That is the purpose of this portfolio.
