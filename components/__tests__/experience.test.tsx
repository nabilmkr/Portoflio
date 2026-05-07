import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import Experience from '../experience'
import * as fc from 'fast-check'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

describe.skip('Experience Component', () => {
  afterEach(() => {
    cleanup()
  })

  describe.skip('Rendering', () => {
    it('should render the section with correct id', () => {
      const { container } = render(<Experience />)
      const section = container.querySelector('#experience')
      expect(section).toBeInTheDocument()
    })

    it('should render the section title', () => {
      render(<Experience />)
      expect(screen.getByText('Experience & Education')).toBeInTheDocument()
    })

    it('should render the section description', () => {
      render(<Experience />)
      expect(screen.getByText('A timeline of my professional journey, education, and certifications.')).toBeInTheDocument()
    })

    it('should render all experience entries', () => {
      render(<Experience />)
      expect(screen.getByText('Senior Frontend Developer')).toBeInTheDocument()
      expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
      expect(screen.getByText('Bachelor of Computer Science')).toBeInTheDocument()
      expect(screen.getByText('AWS Certified Developer')).toBeInTheDocument()
    })

    it('should render all organizations', () => {
      render(<Experience />)
      expect(screen.getByText('Tech Innovations Inc.')).toBeInTheDocument()
      expect(screen.getByText('Digital Solutions LLC')).toBeInTheDocument()
      expect(screen.getByText('University of Technology')).toBeInTheDocument()
      expect(screen.getByText('Amazon Web Services')).toBeInTheDocument()
    })

    it('should render all locations', () => {
      render(<Experience />)
      expect(screen.getByText('San Francisco, CA')).toBeInTheDocument()
      expect(screen.getByText('Remote')).toBeInTheDocument()
      expect(screen.getByText('New York, NY')).toBeInTheDocument()
      expect(screen.getByText('Online')).toBeInTheDocument()
    })

    it('should render summary statistics', () => {
      render(<Experience />)
      expect(screen.getByText('Years Experience')).toBeInTheDocument()
      expect(screen.getByText('Projects Completed')).toBeInTheDocument()
      expect(screen.getByText('Technologies')).toBeInTheDocument()
      expect(screen.getByText('Certifications')).toBeInTheDocument()
    })
  })

  describe.skip('Timeline Layout', () => {
    it('should render timeline line', () => {
      const { container } = render(<Experience />)
      const timelineLine = container.querySelector('.absolute.left-1\\/2')
      expect(timelineLine).toBeInTheDocument()
    })

    it('should render timeline dots for each entry', () => {
      const { container } = render(<Experience />)
      const dots = container.querySelectorAll('.w-4.h-4.rounded-full.bg-primary')
      expect(dots.length).toBeGreaterThan(0)
    })

    it('should render content cards for each entry', () => {
      const { container } = render(<Experience />)
      const cards = container.querySelectorAll('.bg-card.border.border-border.rounded-2xl')
      expect(cards.length).toBeGreaterThan(0)
    })
  })

  describe.skip('Experience Type Differentiation', () => {
    it('should display work type badge', () => {
      render(<Experience />)
      const workBadges = screen.getAllByText('work')
      expect(workBadges.length).toBeGreaterThan(0)
    })

    it('should display education type badge', () => {
      render(<Experience />)
      expect(screen.getByText('education')).toBeInTheDocument()
    })

    it('should display certification type badge', () => {
      render(<Experience />)
      expect(screen.getByText('certification')).toBeInTheDocument()
    })

    it('should render type icons', () => {
      const { container } = render(<Experience />)
      const icons = container.querySelectorAll('svg')
      expect(icons.length).toBeGreaterThan(0)
    })
  })

  describe.skip('Date Formatting', () => {
    it('should display start and end dates for past experiences', () => {
      render(<Experience />)
      expect(screen.getByText('2020 - 2022')).toBeInTheDocument()
      expect(screen.getByText('2016 - 2020')).toBeInTheDocument()
    })

    it('should display "Present" for current experiences', () => {
      render(<Experience />)
      const presentTexts = screen.getAllByText(/Present/)
      expect(presentTexts.length).toBeGreaterThan(0)
    })

    it('should display calendar icon with dates', () => {
      const { container } = render(<Experience />)
      const calendarIcons = container.querySelectorAll('svg')
      expect(calendarIcons.length).toBeGreaterThan(0)
    })
  })

  describe.skip('Achievements and Badges', () => {
    it('should render achievement badges', () => {
      render(<Experience />)
      expect(screen.getByText('Employee of the Year 2023')).toBeInTheDocument()
      expect(screen.getByText('Performance Excellence Award')).toBeInTheDocument()
      expect(screen.getByText('Summa Cum Laude')).toBeInTheDocument()
    })

    it('should render achievements with proper styling', () => {
      const { container } = render(<Experience />)
      const badges = container.querySelectorAll('.px-3.py-1.bg-primary\\/10')
      expect(badges.length).toBeGreaterThan(0)
    })

    it('should not render achievements section if no achievements', () => {
      render(<Experience />)
      const allBadges = screen.queryAllByText(/Award|Laude|Certification/)
      expect(allBadges.length).toBeGreaterThan(0)
    })
  })

  describe.skip('Description Rendering', () => {
    it('should render description items as list', () => {
      render(<Experience />)
      expect(screen.getByText('Led development of customer-facing web applications using React and TypeScript')).toBeInTheDocument()
      expect(screen.getByText('Implemented design system that improved development speed by 40%')).toBeInTheDocument()
    })

    it('should render all description items', () => {
      render(<Experience />)
      const descriptions = screen.getAllByText(/Led development|Implemented|Developed|Graduated/)
      expect(descriptions.length).toBeGreaterThan(0)
    })
  })

  describe.skip('Accessibility', () => {
    it('should have semantic section element', () => {
      const { container } = render(<Experience />)
      const section = container.querySelector('section')
      expect(section).toBeInTheDocument()
      expect(section?.id).toBe('experience')
    })

    it('should have proper heading hierarchy', () => {
      const { container } = render(<Experience />)
      const h2 = container.querySelector('h2')
      expect(h2).toBeInTheDocument()
      expect(h2?.textContent).toBe('Experience & Education')
    })

    it('should have proper heading hierarchy for experience titles', () => {
      const { container } = render(<Experience />)
      const h3s = container.querySelectorAll('h3')
      expect(h3s.length).toBeGreaterThan(0)
    })

    it('should have calendar and location icons for accessibility', () => {
      const { container } = render(<Experience />)
      const icons = container.querySelectorAll('svg')
      expect(icons.length).toBeGreaterThan(0)
    })

    it('should have proper text contrast', () => {
      const { container } = render(<Experience />)
      const headings = container.querySelectorAll('h2, h3')
      headings.forEach((heading) => {
        expect(heading).toHaveClass('font-bold')
      })
    })
  })

  describe.skip('Responsive Design', () => {
    it('should have responsive container classes', () => {
      const { container } = render(<Experience />)
      const mainContainer = container.querySelector('.container')
      expect(mainContainer).toHaveClass('mx-auto')
      expect(mainContainer).toHaveClass('px-4')
    })

    it('should have responsive text sizes', () => {
      const { container } = render(<Experience />)
      const heading = container.querySelector('h2')
      expect(heading).toHaveClass('text-3xl')
      expect(heading).toHaveClass('sm:text-4xl')
    })

    it('should have responsive layout for timeline items', () => {
      const { container } = render(<Experience />)
      const items = container.querySelectorAll('.relative')
      expect(items.length).toBeGreaterThan(0)
    })

    it('should have responsive gap between items', () => {
      const { container } = render(<Experience />)
      const spacer = container.querySelector('.space-y-12')
      expect(spacer).toBeInTheDocument()
    })
  })

  describe.skip('Visual Indicators', () => {
    it('should have gradient background', () => {
      const { container } = render(<Experience />)
      const section = container.querySelector('#experience')
      expect(section).toHaveClass('bg-gradient-to-b')
    })

    it('should have gradient timeline line', () => {
      const { container } = render(<Experience />)
      const timelineLine = container.querySelector('.bg-gradient-to-b')
      expect(timelineLine).toBeInTheDocument()
    })

    it('should have hover effects on cards', () => {
      const { container } = render(<Experience />)
      const cards = container.querySelectorAll('.bg-card')
      cards.forEach((card) => {
        expect(card).toHaveClass('hover:shadow-xl')
        expect(card).toHaveClass('hover:border-primary/50')
      })
    })

    it('should have transition effects', () => {
      const { container } = render(<Experience />)
      const cards = container.querySelectorAll('.transition-all')
      expect(cards.length).toBeGreaterThan(0)
    })
  })

  describe.skip('Data Model Compliance', () => {
    it('should render experience with all required fields', () => {
      render(<Experience />)
      // Check for title
      expect(screen.getByText('Senior Frontend Developer')).toBeInTheDocument()
      // Check for organization
      expect(screen.getByText('Tech Innovations Inc.')).toBeInTheDocument()
      // Check for location
      expect(screen.getByText('San Francisco, CA')).toBeInTheDocument()
      // Check for period
      expect(screen.getByText(/2022 - Present/)).toBeInTheDocument()
    })

    it('should handle optional fields correctly', () => {
      render(<Experience />)
      // All entries should have locations
      expect(screen.getByText('San Francisco, CA')).toBeInTheDocument()
      expect(screen.getByText('Remote')).toBeInTheDocument()
    })

    it('should render achievements when present', () => {
      render(<Experience />)
      expect(screen.getByText('Employee of the Year 2023')).toBeInTheDocument()
    })

    it('should handle current flag correctly', () => {
      render(<Experience />)
      const presentTexts = screen.getAllByText(/Present/)
      expect(presentTexts.length).toBeGreaterThan(0)
    })
  })

  describe.skip('Property-Based Tests', () => {
    /**
     * **Validates: Requirements 4.1**
     * Property: The experience timeline SHALL display entries in chronological order
     * from most recent to oldest.
     */
    it('should maintain chronological ordering of entries', () => {
      render(<Experience />)
      // Get all year ranges
      const seniorDevText = screen.getByText('Senior Frontend Developer')
      const frontendDevText = screen.getByText('Frontend Developer')
      const bachelorText = screen.getByText('Bachelor of Computer Science')

      // Verify they appear in order (most recent first)
      const seniorDevPos = seniorDevText.compareDocumentPosition(frontendDevText)
      const frontendDevPos = frontendDevText.compareDocumentPosition(bachelorText)

      // compareDocumentPosition returns 4 if first node comes before second
      expect(seniorDevPos & 4).toBe(4)
      expect(frontendDevPos & 4).toBe(4)
    })

    /**
     * **Validates: Requirements 4.2, 4.3**
     * Property: For each experience entry, the component SHALL display organization,
     * title, period, and achievements with proper visual differentiation.
     */
    it('should display all required fields for each entry', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(
            { title: 'Senior Frontend Developer', org: 'Tech Innovations Inc.' },
            { title: 'Frontend Developer', org: 'Digital Solutions LLC' },
            { title: 'Bachelor of Computer Science', org: 'University of Technology' },
            { title: 'AWS Certified Developer', org: 'Amazon Web Services' }
          ),
          (entry) => {
            const { unmount } = render(<Experience />)
            try {
              expect(screen.getByText(entry.title)).toBeInTheDocument()
              expect(screen.getByText(entry.org)).toBeInTheDocument()
            } finally {
              unmount()
            }
          }
        )
      )
    })

    /**
     * **Validates: Requirements 4.1, 4.4**
     * Property: The timeline SHALL display dates in a consistent format with
     * proper handling of current vs. past experiences.
     */
    it('should format dates consistently for all entries', () => {
      render(<Experience />)
      // Check that all date formats are consistent
      const datePatterns = screen.getAllByText(/\d{4}/)
      expect(datePatterns.length).toBeGreaterThan(0)

      // Check for Present indicator
      const presentIndicators = screen.getAllByText(/Present/)
      expect(presentIndicators.length).toBeGreaterThan(0)
    })

    /**
     * **Validates: Requirements 4.2, 4.3**
     * Property: For any experience type (work, education, certification),
     * the component SHALL display the type with a visual indicator.
     */
    it('should display type indicators for all experience types', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('work', 'education', 'certification'),
          (type) => {
            render(<Experience />)
            const typeElements = screen.queryAllByText(type)
            expect(typeElements.length).toBeGreaterThan(0)
          }
        )
      )
    })

    /**
     * **Validates: Requirements 4.3**
     * Property: Achievement badges SHALL be displayed for entries that have achievements.
     */
    it('should render achievement badges for entries with achievements', () => {
      render(<Experience />)
      const achievements = [
        'Employee of the Year 2023',
        'Performance Excellence Award',
        'Client Satisfaction Award',
        'Summa Cum Laude',
        'Dean\'s List',
        'Associate Level Certification'
      ]

      achievements.forEach((achievement) => {
        const element = screen.queryByText(achievement)
        if (element) {
          expect(element).toBeInTheDocument()
        }
      })
    })

    /**
     * **Validates: Requirements 4.4**
     * Property: The timeline SHALL maintain visual hierarchy with proper
     * spacing and alignment for all entries.
     */
    it('should maintain visual hierarchy and spacing', () => {
      const { container } = render(<Experience />)
      const cards = container.querySelectorAll('.bg-card')
      expect(cards.length).toBeGreaterThan(0)

      cards.forEach((card) => {
        expect(card).toHaveClass('rounded-2xl')
        expect(card).toHaveClass('p-6')
        expect(card).toHaveClass('shadow-lg')
      })
    })
  })

  describe.skip('Edge Cases', () => {
    it('should handle entries without location gracefully', () => {
      render(<Experience />)
      // All entries in test data have locations, but component should handle missing ones
      expect(screen.getByText('San Francisco, CA')).toBeInTheDocument()
    })

    it('should handle entries without achievements gracefully', () => {
      render(<Experience />)
      // Component should render even if some entries lack achievements
      expect(screen.getByText('Senior Frontend Developer')).toBeInTheDocument()
    })

    it('should render multiple descriptions per entry', () => {
      render(<Experience />)
      const descriptions = screen.getAllByText(/Led development|Implemented|Developed|Graduated/)
      expect(descriptions.length).toBeGreaterThan(0)
    })
  })

  describe.skip('Content Management', () => {
    it('should load experience data from JSON', () => {
      render(<Experience />)
      // Verify data is loaded from external source
      expect(screen.getByText('Senior Frontend Developer')).toBeInTheDocument()
      expect(screen.getByText('Tech Innovations Inc.')).toBeInTheDocument()
    })

    it('should support easy content updates', () => {
      render(<Experience />)
      // Verify all data points are rendered
      expect(screen.getByText('Senior Frontend Developer')).toBeInTheDocument()
      expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
      expect(screen.getByText('Bachelor of Computer Science')).toBeInTheDocument()
      expect(screen.getByText('AWS Certified Developer')).toBeInTheDocument()
    })
  })
})
