# Design Document

## Overview

A modern, professional portfolio website designed to showcase technical skills, projects, and experience to potential clients, recruiters, and industry colleagues. The website prioritizes visual appeal, performance, accessibility, and user experience across desktop and mobile platforms.

**Target Audience:** Potential clients, recruiters, industry colleagues
**Platform:** Web (desktop & mobile)
**Technology Stack:** Next.js/React, Tailwind CSS, Framer Motion
**Design Philosophy:** Modern, creative, professional, memorable

### Design Goals
1. **Showcase Excellence:** Visually highlight projects and skills in an engaging manner
2. **Professional Credibility:** Establish trust through polished design and clear information architecture
3. **Accessibility First:** Ensure all users can access content regardless of ability
4. **Performance Optimized:** Fast loading times and smooth interactions
5. **Mobile-First Responsive:** Seamless experience across all device sizes
6. **Easy Maintenance:** Structured content management for future updates

### Key Design Decisions
- **Single-Page Application (SPA) with sections:** Smooth scrolling navigation between sections
- **Dark/Light Mode Support:** Automatic theme switching based on system preference
- **Progressive Enhancement:** Core content accessible without JavaScript
- **Component-Based Architecture:** Reusable, maintainable React components
- **Design System:** Consistent visual language across all sections

## Architecture

### Technical Architecture
```
┌─────────────────────────────────────────────┐
│              User Browser                    │
├─────────────────────────────────────────────┤
│         Next.js App Router (React)          │
│  ┌─────────────┬─────────────┬────────────┐ │
│  │   Pages     │ Components  │   API      │ │
│  └─────────────┴─────────────┴────────────┘ │
├─────────────────────────────────────────────┤
│         Tailwind CSS (Styling)              │
│         Framer Motion (Animations)          │
├─────────────────────────────────────────────┤
│         Serverless Functions (API Routes)   │
│  ┌───────────────────────────────────────┐ │
│  │  Contact Form Handler                 │ │
│  │  • Form validation & sanitization      │ │
│  │  • Email sending via Gmail API        │ │
│  │  • Rate limiting & spam protection    │ │
│  └───────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│         Email Service Integration           │
│  ┌───────────────────────────────────────┐ │
│  │  Gmail API / SMTP Service             │ │
│  │  • Secure email delivery              │ │
│  │  • Email templates                    │ │
│  │  • Delivery status tracking           │ │
│  └───────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│         Static Export / Vercel Hosting     │
└─────────────────────────────────────────────┘
```

### File Structure
```
src/
├── app/
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Main portfolio page
│   ├── globals.css          # Global styles
│   └── components/          # Reusable components
│       ├── Navigation/
│       ├── Hero/
│       ├── ProjectCard/
│       ├── SkillBadge/
│       ├── TimelineItem/
│       └── ContactForm/
├── lib/
│   ├── utils.ts             # Utility functions
│   ├── constants.ts         # Content constants
│   └── analytics.ts         # Analytics utilities
└── public/
    ├── images/              # Optimized images
    └── fonts/               # Custom fonts
```

### Data Flow
1. **Static Content:** Projects, skills, experience stored in JSON files for easy updates
2. **Dynamic Content:** Contact form submissions sent to serverless function
3. **Email Delivery:** Form submissions processed and sent directly to Gmail via secure API
4. **State Management:** React hooks for UI state (theme, active section, form state)
5. **Analytics:** Privacy-focused tracking via serverless functions

### Email Delivery Flow
1. **Form Submission:** Visitor submits contact form with name, email, subject, message
2. **Validation:** Client-side validation → Server-side validation & sanitization
3. **Processing:** Serverless function formats email with proper headers and content
4. **Delivery:** Email sent directly to portfolio owner's Gmail via Gmail API or SMTP
5. **Confirmation:** Visitor receives success message, owner receives email notification
6. **Logging:** Submission logged for analytics and spam protection

### Performance Strategy
- **Static Generation:** Pre-render all pages at build time
- **Image Optimization:** Next.js Image component with WebP fallbacks
- **Code Splitting:** Automatic code splitting by Next.js
- **Lazy Loading:** Images and components below the fold
- **Font Optimization:** Local font loading with font-display: swap

## Components and Interfaces

### Core Components

#### 1. Navigation Component
```typescript
interface NavigationProps {
  sections: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
  }>;
  activeSection: string;
  onSectionClick: (id: string) => void;
}

// Features:
// - Desktop: Horizontal navigation bar
// - Mobile: Hamburger menu with slide-out drawer
// - Active section indicator
// - Keyboard navigation support
// - Smooth scroll behavior
```

#### 2. ProjectCard Component
```typescript
interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

// Features:
// - Responsive grid layout
// - Hover animations with Framer Motion
// - Technology badges
// - Modal for detailed view
// - Accessibility: alt text, keyboard navigation
```

#### 3. SkillBadge Component
```typescript
interface SkillBadgeProps {
  name: string;
  category: string;
  proficiency: number; // 1-5 scale
  icon?: React.ReactNode;
}

// Features:
// - Visual proficiency indicator (progress bar or stars)
// - Category filtering
// - Responsive sizing
// - Accessibility: ARIA labels for proficiency
```

#### 4. TimelineItem Component
```typescript
interface TimelineItemProps {
  title: string;
  organization: string;
  period: string;
  description: string[];
  type: 'work' | 'education' | 'certification';
  achievements?: string[];
}

// Features:
- Vertical timeline layout
- Date formatting
- Achievement badges
- Responsive design
```

#### 5. ContactForm Component
```typescript
interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<FormSubmissionResult>;
  ownerEmail: string; // Portfolio owner's Gmail address
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormSubmissionResult {
  success: boolean;
  message: string;
  submissionId?: string;
  errors?: FormError[];
}

// Features:
- Form validation with real-time feedback
- Loading states with progress indicators
- Success/error notifications with detailed messages
- Accessibility: proper labels, error announcements
- Email delivery confirmation
- Spam protection with reCAPTCHA integration
- Rate limiting protection
```

### Page Sections

#### 1. Hero Section
- Full-viewport height with background
- Animated introduction text
- Call-to-action buttons
- Scroll indicator

#### 2. Projects Section
- Filterable project grid
- Category filters
- Search functionality
- Detailed project modals

#### 3. Skills Section
- Categorized skill groups
- Interactive proficiency visualization
- Technology icons
- Downloadable resume button

#### 4. Experience Section
- Chronological timeline
- Work/education/certification differentiation
- Achievement highlights
- Company logos

#### 5. Contact Section
- Contact form
- Social media links
- Direct contact information
- Location/map integration

## Data Models

### Content Data Structure

#### 1. Project Data Model
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'design' | 'other';
  images: Array<{
    url: string;
    alt: string;
    caption?: string;
  }>;
  links: {
    live?: string;
    github?: string;
    caseStudy?: string;
  };
  featured: boolean;
  date: string;
}
```

#### 2. Skill Data Model
```typescript
interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'design' | 'soft';
  proficiency: 1 | 2 | 3 | 4 | 5; // 1=Beginner, 5=Expert
  description?: string;
  icon?: string;
  yearsOfExperience?: number;
}
```

#### 3. Experience Data Model
```typescript
interface Experience {
  id: string;
  type: 'work' | 'education' | 'certification';
  title: string;
  organization: string;
  location?: string;
  period: {
    start: string;
    end?: string;
    current: boolean;
  };
  description: string[];
  achievements?: string[];
  skillsUsed?: string[];
  link?: string;
}
```

#### 4. Contact Configuration
```typescript
interface ContactConfig {
  email: string; // Portfolio owner's Gmail address
  phone?: string;
  location?: string;
  socialLinks: Array<{
    platform: 'github' | 'linkedin' | 'twitter' | 'dribbble' | 'behance';
    url: string;
    label: string;
  }>;
  formEndpoint: string;
  emailService: {
    provider: 'gmail-api' | 'smtp' | 'resend' | 'sendgrid';
    apiKey?: string; // Securely stored as environment variable
    fromEmail: string; // Sender email (can be same as owner email)
    templateId?: string; // Email template ID if using template service
  };
  security: {
    recaptchaSiteKey: string;
    rateLimit: {
      maxRequests: number;
      windowMs: number;
    };
  };
}
```

#### 5. Email Submission Model
```typescript
interface EmailSubmission {
  id: string;
  timestamp: string;
  sender: {
    name: string;
    email: string;
  };
  recipient: string; // Portfolio owner's Gmail
  subject: string;
  message: string;
  status: 'pending' | 'sent' | 'failed' | 'delivered';
  deliveryAttempts: number;
  lastAttemptAt?: string;
  error?: string;
  metadata: {
    userAgent: string;
    ipAddress: string; // Anonymized for privacy
    referrer?: string;
  };
}

// Email Template Structure
interface EmailTemplate {
  subject: string;
  body: string;
  htmlBody?: string;
  replyTo: string; // Sender's email for reply functionality
  cc?: string[]; // Optional CC recipients
  bcc?: string[]; // Optional BCC recipients
}
```

### Email Service Implementation

#### Option 1: Gmail API (Recommended for direct Gmail delivery)
**Implementation:**
```typescript
// Serverless function (API route)
export async function POST(request: Request) {
  try {
    const formData = await request.json();
    
    // Validate and sanitize input
    const validatedData = validateContactForm(formData);
    
    // Create email content
    const emailContent = {
      to: process.env.OWNER_GMAIL,
      subject: `Portfolio Contact: ${validatedData.subject}`,
      text: `
        Name: ${validatedData.name}
        Email: ${validatedData.email}
        Subject: ${validatedData.subject}
        
        Message:
        ${validatedData.message}
      `,
      html: `
        <h2>New Portfolio Contact</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Subject:</strong> ${validatedData.subject}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message}</p>
      `,
      replyTo: validatedData.email
    };
    
    // Send email via Gmail API
    const result = await sendViaGmailAPI(emailContent);
    
    return Response.json({
      success: true,
      message: 'Message sent successfully!',
      submissionId: result.messageId
    });
  } catch (error) {
    console.error('Email sending failed:', error);
    return Response.json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    }, { status: 500 });
  }
}
```

**Security Considerations:**
- Store Gmail API credentials as environment variables
- Implement rate limiting to prevent abuse
- Add reCAPTCHA v3 for spam protection
- Validate and sanitize all user inputs
- Log submissions for monitoring

#### Option 2: SMTP Service (Alternative)
**Implementation:**
- Use Nodemailer with Gmail SMTP
- Requires app-specific password
- Simpler setup but less control

#### Option 3: Third-Party Email Service (Resend, SendGrid)
**Pros:**
- Better deliverability rates
- Advanced analytics
- Template management
- Higher sending limits

**Cons:**
- Additional cost
- External dependency

**Decision:** Start with Gmail API for direct delivery to owner's Gmail, with option to upgrade to professional service if volume increases.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Form Field Collection Completeness
*For any* valid contact form submission containing name, email, subject, and message fields, the form SHALL collect and retain all field values without data loss or corruption.

**Validates: Requirements 5.1**

### Property 2: Valid Submission Success Flow
*For any* contact form submission with valid data (non-empty name, valid email format, non-empty subject, non-empty message), submitting the form SHALL result in a success confirmation being displayed to the user.

**Validates: Requirements 5.2**

### Property 3: Invalid Input Error Messaging
*For any* contact form submission with invalid data (empty required fields, invalid email format, whitespace-only fields), the form SHALL display specific, actionable error messages corresponding to each validation failure.

**Validates: Requirements 5.3**

### Property 4: Email Link Encoding Correctness
*For any* email address string, when generating a mailto: link, the Portfolio_Website SHALL properly encode special characters and preserve the complete email address without corruption.

**Validates: Requirements 5.5**

### Property Reflection
The identified properties cover distinct aspects of the contact system:
1. **Data Integrity:** Property 1 ensures form data is collected correctly
2. **Success Flow:** Property 2 validates the happy path for valid submissions
3. **Error Handling:** Property 3 ensures proper user feedback for invalid inputs
4. **Link Generation:** Property 4 validates technical correctness of email links

These properties are not redundant as they test different system behaviors. The email sending functionality (direct to Gmail) is classified as an integration test due to external service dependency.

### Content Management Approach

#### Option A: JSON Files (Recommended for simplicity)
```
content/
├── projects.json
├── skills.json
├── experience.json
└── config.json
```

**Pros:**
- Simple to update
- No database required
- Version controlled
- Fast loading

**Cons:**
- Requires code deployment for updates
- Limited dynamic content

#### Option B: Headless CMS (Contentful/Sanity)
**Pros:**
- Non-technical content updates
- Rich content editing
- Content scheduling
- Multi-environment support

**Cons:**
- Additional cost
- Complexity
- External dependency

**Decision:** Start with JSON files, with architecture designed for easy migration to CMS if needed.

### Analytics Data Model
```typescript
interface AnalyticsEvent {
  type: 'page_view' | 'section_view' | 'project_click' | 'form_submit' | 'download';
  timestamp: string;
  section?: string;
  projectId?: string;
  formType?: string;
  userAgent?: string;
  referrer?: string;
}

// Privacy-focused implementation:
// - No personal identifiers
// - IP anonymization
// - GDPR/CCPA compliance
// - Opt-out mechanism
```

## Error Handling

### Client-Side Error Handling

#### 1. Form Validation Errors
```typescript
interface FormError {
  field: string;
  message: string;
  type: 'required' | 'format' | 'length' | 'server';
}

// Validation Rules:
// - Name: Required, min 2 characters, max 100
// - Email: Required, valid email format
// - Subject: Required, min 5 characters, max 200
// - Message: Required, min 10 characters, max 5000
```

**User Experience:**
- Real-time validation as user types
- Clear error messages below each field
- Visual indicators (red border, icon)
- Focus management to first error field
- Persistent errors until corrected

#### 2. Network/API Errors
```typescript
interface ApiError {
  status: number;
  message: string;
  retryable: boolean;
  timestamp: string;
}

// Error Scenarios:
// - Contact form submission failure
// - Analytics tracking failure
// - Image loading failure
// - Font loading failure
```

**Handling Strategy:**
- Graceful degradation (show cached content)
- Retry mechanisms with exponential backoff
- User-friendly error messages
- Logging for debugging

#### 3. Resource Loading Errors
```typescript
interface ResourceError {
  resourceType: 'image' | 'font' | 'script' | 'style';
  url: string;
  error: Error;
}

// Fallback Strategies:
// - Images: Show placeholder with alt text
// - Fonts: Fallback to system fonts
// - Scripts: Critical functionality preserved
```

### Server-Side Error Handling

#### 1. Contact Form Submission & Email Delivery
```typescript
interface FormSubmissionResponse {
  success: boolean;
  message: string;
  errors?: FormError[];
  submissionId?: string;
  emailStatus?: 'sent' | 'failed' | 'pending';
}

// Error Scenarios:
// - Rate limiting exceeded
// - Invalid reCAPTCHA
// - Gmail API authentication failure
// - Email quota exceeded (Gmail limits)
// - Invalid recipient email format
// - Network connectivity issues
// - SMTP server errors
// - Email content too large
// - Spam filter triggered
// - Attachment size limits exceeded (if supporting attachments)

// Gmail API Specific Errors:
// - 429: Too many requests (rate limit)
// - 403: Insufficient permissions
// - 400: Invalid request (malformed email)
// - 401: Authentication required
// - 503: Service unavailable
```

**Recovery Actions:**
- Queue failed email submissions for automatic retry (exponential backoff)
- Send notifications to admin via alternative channel (Slack, SMS)
- Provide user with alternative contact methods (direct email, social media)
- Log detailed error context with email content (sanitized)
- Implement fallback email service (SMTP if Gmail API fails)
- Store submissions temporarily for manual processing if automated system fails

**Email-Specific Recovery:**
1. **Temporary Gmail API failures:** Retry with increasing delays (1min, 5min, 15min)
2. **Authentication failures:** Alert admin to refresh credentials
3. **Quota exceeded:** Switch to fallback service or queue for next day
4. **Content issues:** Sanitize and retry with cleaned content
5. **Network issues:** Implement circuit breaker pattern

#### 2. Analytics Tracking
```typescript
interface AnalyticsError {
  eventType: string;
  error: Error;
  retryCount: number;
}

// Fallback Strategy:
// - Queue failed events
// - Batch retry on reconnect
// - Local storage fallback
// - Privacy-preserving error logging
```

### User Interface Error States

#### 1. Loading States
- Skeleton screens for async content
- Progress indicators for form submission
- Loading spinners with accessible labels
- Optimistic UI updates where appropriate

#### 2. Empty States
- No projects found (filter results)
- No skills to display
- No experience entries
- Form submission success state

#### 3. Boundary Error Handling
```typescript
// React Error Boundaries for:
// - Component rendering errors
// - Unexpected data format
// - Third-party library failures
```

**Implementation:**
- Global error boundary for critical failures
- Section-specific boundaries for isolation
- Error recovery with retry buttons
- User-friendly error screens

### Accessibility Error Considerations

#### 1. Screen Reader Announcements
- Form error announcements
- Loading state announcements
- Success message announcements
- Navigation state changes

#### 2. Keyboard Navigation Errors
- Trap focus in modals
- Maintain logical tab order
- Provide skip links
- Handle focus loss scenarios

#### 3. Color Contrast Errors
- Automatic contrast checking
- Fallback text indicators
- High contrast mode support
- Theme-aware error colors

### Monitoring and Logging

#### 1. Client-Side Monitoring
```typescript
interface ClientErrorLog {
  type: 'error' | 'warning' | 'info';
  message: string;
  stackTrace?: string;
  componentStack?: string;
  userActions: string[];
  timestamp: string;
  sessionId: string;
}
```

**Implementation:**
- Console logging in development
- Error tracking service (Sentry) in production
- User consent for error reporting
- Anonymized error data

#### 2. Server-Side Monitoring
- Contact form submission logs
- Analytics event failures
- Performance metrics
- Security event monitoring

### Error Prevention Strategies

#### 1. Input Validation
- Client-side validation for immediate feedback
- Server-side validation for security
- Sanitization of user inputs
- Content security policies

#### 2. Resource Management
- Image size validation
- Font loading optimization
- Script dependency management
- Cache control headers

#### 3. State Management
- Immutable state updates
- Transactional operations
- Rollback mechanisms
- Conflict resolution

### Recovery and User Guidance

#### 1. Error Recovery Flows
- Automatic retry for transient errors
- Manual retry options
- Alternative paths
- Contact support options

#### 2. User Communication
- Clear, actionable error messages
- Technical details for developers
- Support contact information
- Estimated resolution time

#### 3. Documentation
- Error code reference
- Troubleshooting guide
- FAQ section
- Support ticket system

## Testing Strategy

### Dual Testing Approach
The portfolio website employs a comprehensive testing strategy combining property-based tests for universal properties and example-based tests for specific scenarios.

#### 1. Property-Based Testing (PBT)
**Applicability:** PBT is appropriate for the contact form validation logic and data transformation functions where universal properties can be defined.

**Property Test Configuration:**
- **Library:** Use `@fast-check` for TypeScript/JavaScript property-based testing
- **Iterations:** Minimum 100 iterations per property test
- **Seed Control:** Deterministic seeds for reproducible tests
- **Shrinking:** Enable shrinking to find minimal failing cases

**Property Test Implementation:**
```typescript
// Example: Property 1 - Form Field Collection Completeness
test.prop({
  name: fc.string({ minLength: 2, maxLength: 100 }),
  email: fc.emailAddress(),
  subject: fc.string({ minLength: 5, maxLength: 200 }),
  message: fc.string({ minLength: 10, maxLength: 5000 })
})('Property 1: Form collects all fields without data loss', (name, email, subject, message) => {
  const formData = { name, email, subject, message };
  const collectedData = contactForm.collect(formData);
  
  // Assert all fields are collected correctly
  expect(collectedData.name).toBe(name);
  expect(collectedData.email).toBe(email);
  expect(collectedData.subject).toBe(subject);
  expect(collectedData.message).toBe(message);
});

// Tag format for traceability
// Feature: portfolio-website, Property 1: Form Field Collection Completeness
```

#### 2. Example-Based Unit Testing
**Focus Areas:**
- Specific UI interactions (navigation clicks, modal openings)
- Component rendering with different props
- Integration between components
- Edge cases and error conditions

**Test Framework:** Jest + React Testing Library
**Coverage Target:** 80%+ for critical paths

#### 3. Integration Testing
**Email Delivery Integration:**
- Test contact form submission with mocked Gmail API
- Verify email formatting and content
- Test error handling for API failures
- Validate rate limiting implementation

**External Service Integration:**
- Analytics service integration
- CMS content fetching (if implemented)
- Third-party API integrations

#### 4. End-to-End Testing
**Tools:** Playwright or Cypress
**Test Scenarios:**
- Complete user journey through portfolio sections
- Contact form submission flow
- Mobile responsiveness testing
- Accessibility compliance verification

#### 5. Performance Testing
**Tools:** Lighthouse CI, WebPageTest
**Metrics:**
- Core Web Vitals (LCP, FID, CLS)
- Lighthouse Performance score ≥ 90
- Mobile performance benchmarks
- First Contentful Paint < 1.5s

#### 6. Accessibility Testing
**Tools:** axe-core, Lighthouse Accessibility
**Requirements:**
- WCAG 2.1 AA compliance
- Screen reader compatibility
- Keyboard navigation testing
- Color contrast verification

### Testing Pyramid
```
          E2E Tests (5%)
            /     \
   Integration Tests (15%)
         /           \
  Unit Tests (80%)
      /               \
Property Tests     Example Tests
   (30%)              (50%)
```

### Test Environment Configuration

#### Development Environment
- **Mock Services:** Mock Gmail API for local development
- **Test Data:** Generated test content for projects, skills, experience
- **Visual Testing:** Storybook for component isolation

#### CI/CD Pipeline
- **Pre-commit:** Unit tests and linting
- **Pull Request:** Full test suite including integration tests
- **Deployment:** Performance and accessibility audits
- **Post-deployment:** Synthetic monitoring and alerting

### Email Service Testing Strategy

#### 1. Unit Testing (Property-Based)
- **Form Validation:** Test validation rules with random inputs
- **Email Formatting:** Test email template generation
- **Input Sanitization:** Test sanitization logic

#### 2. Integration Testing
- **Gmail API Integration:** Test with sandbox Gmail account
- **Error Handling:** Test API failure scenarios
- **Rate Limiting:** Test request limiting behavior

#### 3. End-to-End Testing
- **Complete Flow:** Form submission → Email delivery → Success UI
- **Error Scenarios:** Invalid inputs, network failures, quota limits
- **User Experience:** Loading states, error messages, retry flows

#### 4. Monitoring & Alerting
- **Email Delivery Monitoring:** Track success/failure rates
- **Performance Metrics:** Email send time, API response times
- **Error Rate Alerts:** Notify on increased failure rates
- **Quota Monitoring:** Alert before Gmail quota limits reached

### Test Data Management

#### 1. Property Test Generators
```typescript
// Contact form data generator
const contactFormDataArb = fc.record({
  name: fc.string({ minLength: 2, maxLength: 100 }),
  email: fc.emailAddress(),
  subject: fc.string({ minLength: 5, maxLength: 200 }),
  message: fc.string({ minLength: 10, maxLength: 5000 })
});

// Invalid form data generator
const invalidFormDataArb = fc.oneof(
  fc.record({ name: fc.constant('') }), // Empty name
  fc.record({ email: fc.constant('invalid-email') }), // Invalid email
  fc.record({ subject: fc.constant('   ') }), // Whitespace only
  fc.record({ message: fc.string({ maxLength: 9 }) }) // Too short
);
```

#### 2. Test Content Fixtures
- Project data fixtures with varied technologies
- Skill data with different proficiency levels
- Experience timeline with mixed entry types
- Contact configuration for different environments

### Continuous Testing Strategy

#### 1. Pre-production Testing
- **Development:** Fast feedback with unit and property tests
- **Staging:** Full integration with mocked external services
- **Preview:** Performance and accessibility validation

#### 2. Production Monitoring
- **Real User Monitoring (RUM):** Track actual user interactions
- **Synthetic Monitoring:** Regular health checks of critical flows
- **Error Tracking:** Capture and analyze production errors
- **Performance Monitoring:** Continuous performance measurement

### Test Maintenance Strategy

#### 1. Test Documentation
- **Property Documentation:** Clear mapping to requirements
- **Test Cases:** Documented example tests
- **Integration Tests:** Document external service dependencies
- **Performance Baselines:** Document performance expectations

#### 2. Test Refactoring
- **Regular Review:** Quarterly test suite review
- **Property Reflection:** Regular review of property redundancy
- **Coverage Analysis:** Identify untested critical paths
- **Performance Optimization:** Optimize slow-running tests

### Success Criteria
1. **Test Coverage:** 80%+ coverage for business logic
2. **Property Coverage:** All correctness properties implemented as tests
3. **Integration Coverage:** All external service integrations tested
4. **Performance:** Meets performance targets across test environments
5. **Accessibility:** Passes WCAG 2.1 AA compliance tests
6. **Reliability:** Test suite passes consistently (>95% pass rate)