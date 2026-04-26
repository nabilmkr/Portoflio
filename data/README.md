# Project Data Structure

This directory contains the content data for the portfolio website.

## Files

### `projects.json`

Contains all project information for the portfolio showcase section.

#### Project Schema

Each project object contains:

```typescript
{
  id: string                    // Unique identifier for the project
  title: string                 // Project title
  description: string           // Short description (1-2 sentences)
  detailedDescription: string   // Longer description for modal view
  technologies: string[]        // Array of technology names used
  category: 'web' | 'mobile' | 'design' | 'other'  // Project category
  images: Array<{
    url: string                 // Image path (relative to /public)
    alt: string                 // Descriptive alt text for accessibility
    caption?: string            // Optional image caption
  }>
  links: {
    live?: string               // URL to live demo
    github?: string             // URL to GitHub repository
    caseStudy?: string          // URL to case study
  }
  featured: boolean             // Whether to highlight as featured
  date: string                  // Project date (YYYY-MM-DD format)
}
```

#### Adding New Projects

1. Add a new object to the `projects.json` array
2. Ensure all required fields are populated
3. Use descriptive alt text for all images (accessibility requirement)
4. Place project images in `/public/images/projects/`
5. Use WebP format when possible with fallbacks

#### Image Guidelines

- **Format**: WebP (primary) with JPG/PNG fallbacks
- **Size**: Optimize for web (typically 1200x675px for thumbnails)
- **Alt Text**: Descriptive, specific to the image content
- **Naming**: Use kebab-case (e.g., `ecommerce-1.jpg`)

#### Technology Tags

Use consistent technology names across projects. Common examples:
- Frontend: React, Vue.js, Next.js, Angular, Svelte
- Backend: Node.js, Python, Django, Express, FastAPI
- Styling: Tailwind CSS, CSS-in-JS, SCSS
- Databases: PostgreSQL, MongoDB, Firebase
- Tools: TypeScript, Docker, Webpack, Storybook

#### Categories

- **web**: Web applications and websites
- **mobile**: Mobile apps (iOS, Android, React Native)
- **design**: Design systems, UI kits, design tools
- **other**: Other project types

## Usage

### In Components

```typescript
import { getAllProjects, getProjectsByCategory, searchProjects } from '@/lib/projects'

// Get all projects
const projects = getAllProjects()

// Filter by category
const webProjects = getProjectsByCategory('web')

// Search projects
const results = searchProjects('React')
```

### Data Loading

Projects are loaded statically from `projects.json` at build time. To update projects:

1. Edit `data/projects.json`
2. Rebuild the application (`npm run build`)
3. Deploy the updated build

## Future Enhancements

- **CMS Integration**: Migrate to Contentful, Sanity, or similar for dynamic content management
- **Database**: Store projects in a database for real-time updates
- **Admin Panel**: Create an admin interface for non-technical content updates
- **Image Optimization**: Implement automatic image optimization pipeline
- **Versioning**: Track project updates and versions

## Accessibility

All projects must include:
- Descriptive alt text for all images
- Clear, concise descriptions
- Proper semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility

## Performance

- Images are optimized with Next.js Image component
- Lazy loading for images below the fold
- WebP format with fallbacks for browser compatibility
- Static generation for fast page loads
