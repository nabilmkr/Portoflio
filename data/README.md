# Content Data

This directory contains the JSON content files for the portfolio website. All content is loaded through the abstraction layer in `lib/content.ts`, which makes it straightforward to migrate to a CMS later without touching any component code.

---

## Files

| File | Description |
|---|---|
| `projects.json` | Portfolio projects |
| `skills.json` | Technical skills with proficiency levels |
| `experience.json` | Work experience, education, and certifications |

---

## Content Schemas

### `projects.json`

```typescript
{
  id: string                    // Unique slug (kebab-case)
  title: string                 // Project title
  description: string           // Short description (1–2 sentences)
  detailedDescription: string   // Full description for modal view
  technologies: string[]        // Technology names used
  category: 'web' | 'mobile' | 'design' | 'other'
  images: Array<{
    url: string                 // Path relative to /public
    alt: string                 // Descriptive alt text (required for accessibility)
    caption?: string            // Optional caption
  }>
  links: {
    live?: string               // Live demo URL
    github?: string             // GitHub repository URL
    caseStudy?: string          // Case study URL
  }
  featured: boolean             // Highlight as featured project
  date: string                  // YYYY-MM-DD
}
```

### `skills.json`

```typescript
{
  id: string                    // Unique slug
  name: string                  // Display name
  category: 'frontend' | 'backend' | 'tools' | 'design' | 'soft'
  proficiency: 1 | 2 | 3 | 4 | 5  // 1=Beginner, 5=Expert
  description?: string          // Short description
  icon?: string                 // Emoji or icon identifier
  yearsOfExperience?: number    // Years of experience
}
```

### `experience.json`

```typescript
{
  id: string                    // Unique slug
  type: 'work' | 'education' | 'certification'
  title: string                 // Role or degree title
  organization: string          // Company or institution name
  location?: string             // City, country, or "Remote"
  period: {
    start: string               // Year (e.g. "2022")
    end?: string                // Year, omit if current
    current: boolean            // true if ongoing
  }
  description: string[]         // Bullet points describing the role
  achievements?: string[]       // Notable achievements or awards
  skillsUsed?: string[]         // Technologies/skills used
  link?: string                 // Optional external link
}
```

---

## Adding Content

### New project

1. Add an entry to `projects.json`
2. Place images in `/public/images/projects/` (WebP preferred, 1200×675px)
3. Rebuild: `npm run build`

### New skill

1. Add an entry to `skills.json` with a valid `category` and `proficiency` (1–5)

### New experience entry

1. Add an entry to `experience.json`; set `period.current: true` and omit `period.end` for ongoing roles

---

## CMS Migration Guide

All content is loaded through `lib/content.ts`. Components import from there, not directly from these JSON files. To migrate to a headless CMS (Contentful, Sanity, Hygraph, etc.):

1. **Keep the TypeScript types** in `lib/types/` — they define the contract between content and UI
2. **Replace the `import()` calls** in each loader in `lib/content.ts` with `fetch()` calls to your CMS API
3. **Add a mapping function** to transform the CMS response shape into the existing TypeScript types
4. **Move credentials** (API keys, space IDs) to environment variables in `.env.local`
5. **No component changes needed** — the return types stay the same

### Example: Contentful migration for projects

```typescript
// lib/content.ts — replace getProjects() body with:
export async function getProjects(): Promise<Project[]> {
  return safeLoad(async () => {
    const res = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?content_type=project`,
      { headers: { Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}` } }
    )
    if (!res.ok) throw new Error(`Contentful error: ${res.status}`)
    const { items } = await res.json()
    return items.map(mapContentfulProject) // write your own mapper
  }, [])
}
```

### Recommended CMS options

| CMS | Best for | Free tier |
|---|---|---|
| [Contentful](https://www.contentful.com) | Structured content, large teams | 25k records |
| [Sanity](https://www.sanity.io) | Flexible schemas, real-time | 3 users |
| [Hygraph](https://hygraph.com) | GraphQL-first | 1M API ops/month |
| [Notion API](https://developers.notion.com) | Simple, already using Notion | Free |

---

## Error Handling

The `safeLoad()` wrapper in `lib/content.ts` catches any load or parse errors and returns an empty array, so the UI degrades gracefully (empty sections) rather than crashing. Invalid entries that fail schema validation are skipped and logged to the console.
