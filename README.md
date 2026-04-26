# Portfolio Website

A modern portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Modern Design**: Clean, professional design with dark/light mode support
- **Responsive Layout**: Fully responsive across all device sizes
- **Performance Optimized**: Fast loading times with optimized images and code splitting
- **Accessibility**: WCAG 2.1 AA compliant with proper semantic HTML and ARIA labels
- **Interactive Components**: Smooth animations and transitions with Framer Motion
- **Contact Form**: Integrated contact form with validation and email delivery
- **Project Showcase**: Filterable project gallery with detailed views
- **Skills Display**: Categorized skills with proficiency indicators
- **Experience Timeline**: Chronological timeline of work experience and education

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theming**: next-themes
- **Utilities**: clsx, tailwind-merge

## Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout with theme provider
│   ├── page.tsx            # Main portfolio page
│   └── globals.css         # Global styles and Tailwind directives
├── components/
│   ├── navigation.tsx      # Navigation component with smooth scrolling
│   ├── hero.tsx            # Hero section with animated introduction
│   ├── projects.tsx        # Project showcase with filtering
│   ├── skills.tsx          # Skills display with proficiency indicators
│   ├── experience.tsx       # Experience timeline
│   ├── contact.tsx         # Contact form with validation
│   └── theme-provider.tsx  # Theme switching provider
└── lib/
    └── utils.ts            # Utility functions (cn for class merging)
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   - `OWNER_GMAIL`: Your Gmail address for contact form
   - `GMAIL_CLIENT_ID`: Gmail API client ID
   - `GMAIL_CLIENT_SECRET`: Gmail API client secret
   - `GMAIL_REFRESH_TOKEN`: Gmail API refresh token

### Development
Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## Configuration

### Tailwind CSS
Customize design tokens in `tailwind.config.ts`:
- Colors (light/dark mode)
- Typography scale
- Animation keyframes
- Border radius scale

### Email Integration
The contact form uses Gmail API for email delivery. Configure in `.env.local`:
1. Set up Google Cloud Console project
2. Enable Gmail API
3. Create OAuth 2.0 credentials
4. Generate refresh token

### Environment Variables
See `.env.example` for all available environment variables.

## Features in Detail

### Navigation
- Smooth scrolling between sections
- Active section indicator
- Mobile hamburger menu with touch-friendly targets
- Keyboard navigation support
- Responsive design

### Projects Section
- Filterable project grid by technology category
- Project cards with hover animations
- Technology badges
- Live demo and GitHub links
- Featured project highlighting

### Skills Section
- Categorized skills (Frontend, Design, Backend, Tools)
- Visual proficiency indicators (1-5 scale)
- Responsive grid layout
- Average proficiency calculation per category

### Experience Section
- Chronological timeline with work/education/certification
- Achievement badges
- Location and duration information
- Responsive layout with alternating sides

### Contact Section
- Form validation with real-time feedback
- Loading states and success/error notifications
- Alternative contact methods (email, social media)
- Accessibility compliant form controls

## Performance Optimization

- **Image Optimization**: Next.js Image component with WebP format
- **Code Splitting**: Automatic code splitting by Next.js
- **Font Optimization**: Local font loading with `font-display: swap`
- **Lazy Loading**: Images and components below the fold
- **Minification**: Production builds are minified and optimized

## Accessibility

- **WCAG 2.1 AA Compliance**: Proper contrast ratios and semantic HTML
- **Keyboard Navigation**: Full keyboard support throughout
- **Screen Reader Support**: ARIA labels and proper landmark roles
- **Focus Management**: Visible focus indicators and focus trapping
- **Color Contrast**: Minimum 4.5:1 ratio for normal text

## Deployment

The project is configured for deployment on Vercel:

1. Push your code to a Git repository
2. Import the project in Vercel
3. Configure environment variables
4. Deploy automatically on push

## License

This project is open source and available under the MIT License.