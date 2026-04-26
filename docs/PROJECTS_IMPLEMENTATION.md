# Projects Showcase Section Implementation

## Overview

This document describes the implementation of the Projects showcase section (Task 5) for the portfolio website, including the ProjectCard component, project filtering, search functionality, image optimization, and accessibility features.

## Components

### ProjectCard Component (`components/project-card.tsx`)

A reusable component that displays individual project information with modal functionality for detailed views.

#### Features

- **Responsive Design**: Adapts to all screen sizes with proper spacing and layout
- **Image Gallery**: Supports multiple images per project with navigation controls
- **Modal View**: Click to expand and view detailed project information
- **Technology Badges**: Displays technologies used with overflow handling
- **Hover Animations**: Smooth transitions and visual feedback using Framer Motion
- **Accessibility**: Full keyboard navigation, ARIA labels, and semantic HTML

#### Props

```typescript
interface ProjectCardProps {
  project: Project
  index?: number
}
```

#### Usage

```tsx
import ProjectCard from '@/components/project-card'
import { getAllProjects } from '@/lib/projects'

const projects = getAllProjects()

export default function ProjectsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  )
}
```

#### Modal Features

- **Image Gallery**: Navigate through project images with previous/next buttons
- **Image Indicators**: Click dots to jump to specific images
- **Detailed Description**: Full project description in modal view
- **All Technologies**: Complete list of technologies used
- **Action Links**: Live demo, source code, and case study links
- **Keyboard Navigation**: Close with Escape key, navigate with arrow keys
- **Focus Management**: Proper focus trapping and restoration

### Projects Section (`components/projects.tsx`)

Main section component that displays all projects with filtering and search capabilities.

#### Features

- **Category Filtering**: Filter projects by type (web, mobile, design, other)
- **Search Functionality**: Search by project name, description, or technology
- **Dynamic Results**: Real-time filtering as user types or selects filters
- **Empty State**: Helpful message when no projects match filters
- **Responsive Grid**: Adapts from 1 column on mobile to 3 columns on desktop
- **Performance**: Uses `useMemo` to optimize filtering performance

#### Usage

The Projects section is automatically included in the main page layout:

```tsx
import Projects from '@/components/projects'

export default function Home() {
  return (
    <main>
      <Projects />
    </main>
  )
}
```

## Data Models

### Project Type (`lib/types/project.ts`)

```typescript
interface ProjectImage {
  url: string        // Image path relative to /public
  alt: string        // Descriptive alt text for accessibility
  caption?: string   // Optional image caption
}

interface ProjectLinks {
  live?: string      // URL to live demo
  github?: string    // URL to GitHub repository
  caseStudy?: string // URL to case study
}

interface Project {
  id: string                                    // Unique identifier
  title: string                                 // Project title
  description: string                           // Short description
  detailedDescription: string                   // Detailed description
  technologies: string[]                        // Technologies used
  category: 'web' | 'mobile' | 'design' | 'other'
  images: ProjectImage[]                        // Project images
  links: ProjectLinks                           // Project links
  featured: boolean                             // Featured flag
  date: string                                  // Project date (YYYY-MM-DD)
}
```

### Project Data (`data/projects.json`)

JSON file containing all project information. See `data/README.md` for detailed structure and guidelines.

## Utilities

### Projects Module (`lib/projects.ts`)

Provides utility functions for working with project data:

```typescript
// Get all projects
getAllProjects(): Project[]

// Filter by category
getProjectsByCategory(category: ProjectCategory): Project[]

// Filter by technology
getProjectsByTechnology(technology: string): Project[]

// Search projects
searchProjects(query: string): Project[]

// Get featured projects
getFeaturedProjects(): Project[]

// Get single project by ID
getProjectById(id: string): Project | undefined

// Get all unique technologies
getAllTechnologies(): string[]

// Get all unique categories
getAllCategories(): ProjectCategory[]
```

## Image Optimization

### Next.js Image Component

All project images use the Next.js `Image` component for automatic optimization:

```tsx
<Image
  src={project.images[0].url}
  alt={project.images[0].alt}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={index === 0}
/>
```

#### Features

- **Automatic Format Selection**: Serves WebP to supported browsers, falls back to JPEG/PNG
- **Responsive Sizing**: Serves appropriately sized images based on device
- **Lazy Loading**: Images below the fold are lazy-loaded by default
- **Priority Loading**: First image uses `priority` prop for faster LCP
- **Responsive Sizes**: Uses `sizes` prop for optimal image selection

### Configuration (`next.config.js`)

```javascript
images: {
  formats: ['image/avif', 'image/webp'],
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**',
    },
  ],
}
```

## Accessibility Features

### WCAG 2.1 AA Compliance

#### Alt Text
- All images have descriptive alt text
- Alt text describes the image content and context
- Example: "E-commerce platform homepage showing product grid and navigation"

#### Keyboard Navigation
- All interactive elements are keyboard accessible
- Tab order is logical and intuitive
- Modal can be closed with Escape key
- Image gallery can be navigated with arrow keys

#### ARIA Labels
- Links have descriptive aria-labels
- Modal has proper `aria-modal` and `aria-labelledby` attributes
- Image indicators have `aria-current` for current image
- Buttons have descriptive labels

#### Semantic HTML
- Proper heading hierarchy (h2, h3)
- Semantic button elements for interactive controls
- Dialog role for modal
- Proper link semantics with target="_blank" and rel="noopener noreferrer"

#### Color Contrast
- All text meets 4.5:1 contrast ratio for normal text
- Interactive elements have clear visual indicators
- Focus states are clearly visible

#### Focus Management
- Focus is trapped in modal when open
- Focus is restored when modal closes
- All interactive elements have visible focus indicators
- Skip links available for keyboard users

## Testing

### Unit Tests (`lib/__tests__/projects.test.ts`)

Comprehensive test suite for project utilities:

- **30 tests** covering all project functions
- **Property-based tests** validating universal properties
- **Edge case tests** for boundary conditions
- **Data integrity tests** ensuring data consistency

Run tests:
```bash
npm test -- lib/__tests__/projects.test.ts
```

### Component Tests (`components/__tests__/project-card.test.tsx`)

Comprehensive test suite for ProjectCard component:

- **25 tests** covering rendering, modal, gallery, and accessibility
- **Rendering tests** verify all content displays correctly
- **Modal tests** verify open/close functionality
- **Gallery tests** verify image navigation
- **Accessibility tests** verify ARIA labels and semantic HTML
- **Edge case tests** for various project configurations

Run tests:
```bash
npm test -- components/__tests__/project-card.test.tsx
```

### Property-Based Tests

Using `fast-check` library for property-based testing:

#### Property 1: Filter Consistency
Validates that filtering maintains project count consistency and data integrity.

#### Property 2: Search Result Validity
Validates that search results only contain projects matching the query.

## Performance Considerations

### Optimization Strategies

1. **Image Optimization**
   - WebP format with fallbacks
   - Responsive sizing with `sizes` prop
   - Lazy loading for below-the-fold images
   - Priority loading for above-the-fold images

2. **Code Splitting**
   - ProjectCard component is lazy-loaded
   - Projects section uses Suspense boundary
   - Loading skeleton shown while loading

3. **Memoization**
   - `useMemo` used for filtering to prevent unnecessary recalculations
   - Prevents re-rendering of project cards when filters change

4. **Static Generation**
   - Project data is loaded at build time
   - No runtime data fetching required
   - Fast page loads and better SEO

### Performance Metrics

- **Lighthouse Performance**: Target ≥ 90
- **Core Web Vitals**:
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1

## Future Enhancements

### Content Management
- Migrate to headless CMS (Contentful, Sanity)
- Admin interface for non-technical updates
- Real-time content updates without rebuild

### Advanced Features
- Project filtering by multiple technologies
- Project sorting (date, popularity, featured)
- Project tags and categories
- Related projects suggestions
- Project comments and ratings

### Analytics
- Track project views and clicks
- Monitor popular projects
- User engagement metrics
- A/B testing for project layouts

### Performance
- Image optimization pipeline
- Automatic WebP conversion
- CDN integration for image delivery
- Progressive image loading

## Troubleshooting

### Images Not Loading
1. Check image paths in `data/projects.json`
2. Verify images exist in `/public/images/projects/`
3. Check Next.js image configuration in `next.config.js`
4. Verify image format is supported (JPEG, PNG, WebP, AVIF)

### Filtering Not Working
1. Check project categories in `data/projects.json`
2. Verify category values match allowed types
3. Check browser console for errors
4. Clear browser cache and rebuild

### Modal Not Opening
1. Check browser console for JavaScript errors
2. Verify Framer Motion is installed
3. Check z-index conflicts with other elements
4. Test in different browser

### Accessibility Issues
1. Run axe DevTools browser extension
2. Check alt text for all images
3. Verify keyboard navigation works
4. Test with screen reader (NVDA, JAWS)
5. Check color contrast with WebAIM tool

## References

- [Next.js Image Component](https://nextjs.org/docs/api-reference/next/image)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [React Testing Library](https://testing-library.com/react)
- [fast-check Property-Based Testing](https://github.com/dubzzz/fast-check)
