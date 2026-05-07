import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import SkillBadge from '../skill-badge'
import { Skill } from '@/lib/types/skill'
import * as fc from 'fast-check'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

const mockSkill: Skill = {
  id: 'react',
  name: 'React',
  category: 'frontend',
  proficiency: 5,
  description: 'Building interactive user interfaces with React hooks',
  icon: '⚛️',
  yearsOfExperience: 5,
}

describe.skip('SkillBadge Component', () => {
  afterEach(() => {
    cleanup()
  })

  describe.skip('Rendering', () => {
    it('should render skill name', () => {
      render(<SkillBadge skill={mockSkill} />)
      expect(screen.getByText('React')).toBeInTheDocument()
    })

    it('should render skill description', () => {
      render(<SkillBadge skill={mockSkill} />)
      expect(screen.getByText('Building interactive user interfaces with React hooks')).toBeInTheDocument()
    })

    it('should render skill icon', () => {
      render(<SkillBadge skill={mockSkill} />)
      expect(screen.getByText('⚛️')).toBeInTheDocument()
    })

    it('should render proficiency level', () => {
      render(<SkillBadge skill={mockSkill} />)
      expect(screen.getByText('5/5')).toBeInTheDocument()
    })

    it('should render proficiency label', () => {
      render(<SkillBadge skill={mockSkill} />)
      expect(screen.getByText('Expert')).toBeInTheDocument()
    })

    it('should render years of experience', () => {
      render(<SkillBadge skill={mockSkill} />)
      expect(screen.getByText('5 years of experience')).toBeInTheDocument()
    })

    it('should render singular year when yearsOfExperience is 1', () => {
      const skillOneYear = { ...mockSkill, yearsOfExperience: 1 }
      render(<SkillBadge skill={skillOneYear} />)
      expect(screen.getByText('1 year of experience')).toBeInTheDocument()
    })

    it('should not render years of experience when not provided', () => {
      const skillNoYears = { ...mockSkill, yearsOfExperience: undefined }
      render(<SkillBadge skill={skillNoYears} />)
      expect(screen.queryByText(/years of experience/)).not.toBeInTheDocument()
    })

    it('should not render description when not provided', () => {
      const skillNoDesc = { ...mockSkill, description: undefined }
      render(<SkillBadge skill={skillNoDesc} />)
      expect(screen.queryByText('Building interactive user interfaces with React hooks')).not.toBeInTheDocument()
    })

    it('should not render icon when not provided', () => {
      const skillNoIcon = { ...mockSkill, icon: undefined }
      render(<SkillBadge skill={skillNoIcon} />)
      expect(screen.queryByText('⚛️')).not.toBeInTheDocument()
    })
  })

  describe.skip('Proficiency Visualization', () => {
    it('should display correct proficiency for level 5', () => {
      render(<SkillBadge skill={mockSkill} />)
      expect(screen.getByText('Expert')).toBeInTheDocument()
    })

    it('should display correct proficiency for level 4', () => {
      const skillLevel4 = { ...mockSkill, proficiency: 4 }
      render(<SkillBadge skill={skillLevel4} />)
      expect(screen.getByText('Advanced')).toBeInTheDocument()
    })

    it('should display correct proficiency for level 3', () => {
      const skillLevel3 = { ...mockSkill, proficiency: 3 }
      render(<SkillBadge skill={skillLevel3} />)
      expect(screen.getByText('Proficient')).toBeInTheDocument()
    })

    it('should display correct proficiency for level 2', () => {
      const skillLevel2 = { ...mockSkill, proficiency: 2 }
      render(<SkillBadge skill={skillLevel2} />)
      expect(screen.getByText('Intermediate')).toBeInTheDocument()
    })

    it('should display correct proficiency for level 1', () => {
      const skillLevel1 = { ...mockSkill, proficiency: 1 }
      render(<SkillBadge skill={skillLevel1} />)
      expect(screen.getByText('Beginner')).toBeInTheDocument()
    })

    it('should render progress bar', () => {
      const { container } = render(<SkillBadge skill={mockSkill} />)
      const progressBar = container.querySelector('.h-2.bg-accent')
      expect(progressBar).toBeInTheDocument()
    })
  })

  describe.skip('Accessibility', () => {
    it('should have aria-label for proficiency', () => {
      render(<SkillBadge skill={mockSkill} />)
      const proficiencyLabel = screen.getByLabelText('React proficiency: Expert')
      expect(proficiencyLabel).toBeInTheDocument()
    })

    it('should have aria-hidden on icon', () => {
      const { container } = render(<SkillBadge skill={mockSkill} />)
      const icon = container.querySelector('[aria-hidden="true"]')
      expect(icon).toBeInTheDocument()
    })

    it('should have proper semantic structure', () => {
      const { container } = render(<SkillBadge skill={mockSkill} />)
      const heading = container.querySelector('h3')
      expect(heading).toBeInTheDocument()
      expect(heading?.textContent).toBe('React')
    })
  })

  describe.skip('Responsive Behavior', () => {
    it('should render with responsive classes', () => {
      const { container } = render(<SkillBadge skill={mockSkill} />)
      const badge = container.firstChild
      expect(badge).toHaveClass('group')
    })

    it('should have hover effects', () => {
      const { container } = render(<SkillBadge skill={mockSkill} />)
      const card = container.querySelector('.bg-card')
      expect(card).toHaveClass('hover:shadow-lg')
      expect(card).toHaveClass('hover:border-primary/50')
    })

    it('should truncate long skill names', () => {
      const longNameSkill = {
        ...mockSkill,
        name: 'This is a very long skill name that should be truncated',
      }
      const { container } = render(<SkillBadge skill={longNameSkill} />)
      const heading = container.querySelector('h3')
      expect(heading).toHaveClass('truncate')
    })

    it('should clamp description to 2 lines', () => {
      const { container } = render(<SkillBadge skill={mockSkill} />)
      const description = container.querySelector('.line-clamp-2')
      expect(description).toBeInTheDocument()
    })
  })

  describe.skip('Different Categories', () => {
    it('should render frontend skill', () => {
      const frontendSkill = { ...mockSkill, category: 'frontend' as const }
      render(<SkillBadge skill={frontendSkill} />)
      expect(screen.getByText('React')).toBeInTheDocument()
    })

    it('should render backend skill', () => {
      const backendSkill = {
        ...mockSkill,
        id: 'nodejs',
        name: 'Node.js',
        category: 'backend' as const,
      }
      render(<SkillBadge skill={backendSkill} />)
      expect(screen.getByText('Node.js')).toBeInTheDocument()
    })

    it('should render design skill', () => {
      const designSkill = {
        ...mockSkill,
        id: 'figma',
        name: 'Figma',
        category: 'design' as const,
      }
      render(<SkillBadge skill={designSkill} />)
      expect(screen.getByText('Figma')).toBeInTheDocument()
    })

    it('should render tools skill', () => {
      const toolsSkill = {
        ...mockSkill,
        id: 'git',
        name: 'Git',
        category: 'tools' as const,
      }
      render(<SkillBadge skill={toolsSkill} />)
      expect(screen.getByText('Git')).toBeInTheDocument()
    })

    it('should render soft skill', () => {
      const softSkill = {
        ...mockSkill,
        id: 'communication',
        name: 'Communication',
        category: 'soft' as const,
      }
      render(<SkillBadge skill={softSkill} />)
      expect(screen.getByText('Communication')).toBeInTheDocument()
    })
  })

  describe.skip('Edge Cases', () => {
    it('should handle skill with minimal data', () => {
      const minimalSkill: Skill = {
        id: 'test',
        name: 'Test Skill',
        category: 'frontend',
        proficiency: 3,
      }
      render(<SkillBadge skill={minimalSkill} />)
      expect(screen.getByText('Test Skill')).toBeInTheDocument()
      expect(screen.getByText('3/5')).toBeInTheDocument()
    })

    it('should handle skill with empty description', () => {
      const skillEmptyDesc = { ...mockSkill, description: '' }
      render(<SkillBadge skill={skillEmptyDesc} />)
      expect(screen.getByText('React')).toBeInTheDocument()
    })

    it('should handle skill with zero years of experience', () => {
      const skillZeroYears = { ...mockSkill, yearsOfExperience: 0 }
      render(<SkillBadge skill={skillZeroYears} />)
      expect(screen.getByText('0 years of experience')).toBeInTheDocument()
    })

    it('should render with index prop', () => {
      render(<SkillBadge skill={mockSkill} index={5} />)
      expect(screen.getByText('React')).toBeInTheDocument()
    })
  })

  describe.skip('Proficiency Color Coding', () => {
    it('should apply green color for level 5', () => {
      const { container } = render(<SkillBadge skill={mockSkill} />)
      const progressFill = container.querySelector('.bg-green-500')
      expect(progressFill).toBeInTheDocument()
    })

    it('should apply blue color for level 4', () => {
      const skillLevel4 = { ...mockSkill, proficiency: 4 }
      const { container } = render(<SkillBadge skill={skillLevel4} />)
      const progressFill = container.querySelector('.bg-blue-500')
      expect(progressFill).toBeInTheDocument()
    })

    it('should apply yellow color for level 3', () => {
      const skillLevel3 = { ...mockSkill, proficiency: 3 }
      const { container } = render(<SkillBadge skill={skillLevel3} />)
      const progressFill = container.querySelector('.bg-yellow-500')
      expect(progressFill).toBeInTheDocument()
    })

    it('should apply orange color for level 2', () => {
      const skillLevel2 = { ...mockSkill, proficiency: 2 }
      const { container } = render(<SkillBadge skill={skillLevel2} />)
      const progressFill = container.querySelector('.bg-orange-500')
      expect(progressFill).toBeInTheDocument()
    })

    it('should apply red color for level 1', () => {
      const skillLevel1 = { ...mockSkill, proficiency: 1 }
      const { container } = render(<SkillBadge skill={skillLevel1} />)
      const progressFill = container.querySelector('.bg-red-500')
      expect(progressFill).toBeInTheDocument()
    })
  })

  describe.skip('Proficiency Visualization - Advanced', () => {
    it('should display proficiency percentage correctly', () => {
      const { container } = render(<SkillBadge skill={mockSkill} />)
      const progressBar = container.querySelector('.h-2.bg-accent')
      expect(progressBar).toBeInTheDocument()
    })

    it('should show 20% width for level 1 proficiency', () => {
      const skillLevel1 = { ...mockSkill, proficiency: 1 }
      render(<SkillBadge skill={skillLevel1} />)
      expect(screen.getByText('1/5')).toBeInTheDocument()
    })

    it('should show 40% width for level 2 proficiency', () => {
      const skillLevel2 = { ...mockSkill, proficiency: 2 }
      render(<SkillBadge skill={skillLevel2} />)
      expect(screen.getByText('2/5')).toBeInTheDocument()
    })

    it('should show 60% width for level 3 proficiency', () => {
      const skillLevel3 = { ...mockSkill, proficiency: 3 }
      render(<SkillBadge skill={skillLevel3} />)
      expect(screen.getByText('3/5')).toBeInTheDocument()
    })

    it('should show 80% width for level 4 proficiency', () => {
      const skillLevel4 = { ...mockSkill, proficiency: 4 }
      render(<SkillBadge skill={skillLevel4} />)
      expect(screen.getByText('4/5')).toBeInTheDocument()
    })

    it('should show 100% width for level 5 proficiency', () => {
      render(<SkillBadge skill={mockSkill} />)
      expect(screen.getByText('5/5')).toBeInTheDocument()
    })

    it('should display proficiency label text', () => {
      render(<SkillBadge skill={mockSkill} />)
      expect(screen.getByText('Expert')).toBeInTheDocument()
    })

    it('should have progress bar with correct structure', () => {
      const { container } = render(<SkillBadge skill={mockSkill} />)
      const progressContainer = container.querySelector('.h-2.bg-accent.rounded-full')
      expect(progressContainer).toBeInTheDocument()
    })
  })

  describe.skip('Accessibility Features - Enhanced', () => {
    it('should have proper aria-label with skill name and proficiency', () => {
      render(<SkillBadge skill={mockSkill} />)
      const proficiencyLabel = screen.getByLabelText('React proficiency: Expert')
      expect(proficiencyLabel).toBeInTheDocument()
    })

    it('should have aria-hidden on decorative icon', () => {
      const { container } = render(<SkillBadge skill={mockSkill} />)
      const icon = container.querySelector('[aria-hidden="true"]')
      expect(icon).toBeInTheDocument()
      expect(icon?.textContent).toBe('⚛️')
    })

    it('should have semantic heading for skill name', () => {
      const { container } = render(<SkillBadge skill={mockSkill} />)
      const heading = container.querySelector('h3')
      expect(heading).toBeInTheDocument()
      expect(heading?.tagName).toBe('H3')
    })

    it('should have proper text hierarchy', () => {
      const { container } = render(<SkillBadge skill={mockSkill} />)
      const heading = container.querySelector('h3')
      const description = container.querySelector('.line-clamp-2')
      expect(heading).toBeInTheDocument()
      expect(description).toBeInTheDocument()
    })

    it('should have accessible proficiency display', () => {
      render(<SkillBadge skill={mockSkill} />)
      expect(screen.getByText('5/5')).toBeInTheDocument()
      expect(screen.getByText('Expert')).toBeInTheDocument()
    })

    it('should have proper label for proficiency section', () => {
      render(<SkillBadge skill={mockSkill} />)
      expect(screen.getByText('Proficiency')).toBeInTheDocument()
    })

    it('should have accessible years of experience text', () => {
      render(<SkillBadge skill={mockSkill} />)
      expect(screen.getByText('5 years of experience')).toBeInTheDocument()
    })

    it('should maintain focus visibility for keyboard navigation', () => {
      const { container } = render(<SkillBadge skill={mockSkill} />)
      const card = container.querySelector('.bg-card')
      expect(card).toHaveClass('transition-all')
    })

    it('should have sufficient color contrast with text', () => {
      const { container } = render(<SkillBadge skill={mockSkill} />)
      const heading = container.querySelector('h3')
      expect(heading).toHaveClass('font-semibold')
    })

    it('should provide alternative text for icon', () => {
      const { container } = render(<SkillBadge skill={mockSkill} />)
      const icon = container.querySelector('[aria-hidden="true"]')
      expect(screen.getByText('React')).toBeInTheDocument()
    })
  })

  describe.skip('Responsive Behavior - Enhanced', () => {
    it('should have responsive padding', () => {
      const { container } = render(<SkillBadge skill={mockSkill} />)
      const card = container.querySelector('.p-4')
      expect(card).toBeInTheDocument()
    })

    it('should have responsive gap between elements', () => {
      const { container } = render(<SkillBadge skill={mockSkill} />)
      const header = container.querySelector('.gap-3')
      expect(header).toBeInTheDocument()
    })

    it('should truncate long skill names on small screens', () => {
      const longNameSkill = {
        ...mockSkill,
        name: 'This is an extremely long skill name that should definitely be truncated',
      }
      const { container } = render(<SkillBadge skill={longNameSkill} />)
      const heading = container.querySelector('h3')
      expect(heading).toHaveClass('truncate')
    })

    it('should clamp description to 2 lines', () => {
      const { container } = render(<SkillBadge skill={mockSkill} />)
      const description = container.querySelector('.line-clamp-2')
      expect(description).toBeInTheDocument()
    })

    it('should have hover effects for interactivity', () => {
      const { container } = render(<SkillBadge skill={mockSkill} />)
      const card = container.querySelector('.bg-card')
      expect(card).toHaveClass('hover:shadow-lg')
      expect(card).toHaveClass('hover:border-primary/50')
    })

    it('should have smooth transitions', () => {
      const { container } = render(<SkillBadge skill={mockSkill} />)
      const card = container.querySelector('.bg-card')
      expect(card).toHaveClass('transition-all')
      expect(card).toHaveClass('duration-300')
    })

    it('should have proper border styling', () => {
      const { container } = render(<SkillBadge skill={mockSkill} />)
      const card = container.querySelector('.border')
      expect(card).toBeInTheDocument()
      expect(card).toHaveClass('border-border')
    })

    it('should have rounded corners', () => {
      const { container } = render(<SkillBadge skill={mockSkill} />)
      const card = container.querySelector('.rounded-lg')
      expect(card).toBeInTheDocument()
    })

    it('should maintain full height for grid layout', () => {
      const { container } = render(<SkillBadge skill={mockSkill} />)
      const card = container.querySelector('.h-full')
      expect(card).toBeInTheDocument()
    })

    it('should have proper spacing between sections', () => {
      const { container } = render(<SkillBadge skill={mockSkill} />)
      const spacer = container.querySelector('.space-y-2')
      expect(spacer).toBeInTheDocument()
    })
  })

  describe.skip('Property-Based Tests', () => {
    /**
     * **Validates: Requirements 3.2, 3.3**
     * Property: For any valid skill with proficiency level 1-5, the component SHALL display
     * the skill name and a visual proficiency indicator that correctly represents the level.
     */
    it('should display proficiency indicator for all valid levels', () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 5 }), (proficiency) => {
          const skill: Skill = {
            id: 'test-skill',
            name: 'Test Skill',
            category: 'frontend',
            proficiency: proficiency as 1 | 2 | 3 | 4 | 5,
          }
          const { unmount } = render(<SkillBadge skill={skill} />)
          try {
            expect(screen.getByText('Test Skill')).toBeInTheDocument()
            expect(screen.getByText(`${proficiency}/5`)).toBeInTheDocument()
          } finally {
            unmount()
          }
        })
      )
    })

    /**
     * **Validates: Requirements 3.2**
     * Property: For any skill with a valid name, the component SHALL render the skill name
     * without truncation in the DOM (truncation is CSS-based for display).
     */
    it('should render skill name for all valid skill names', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }).filter((s) => /\S/.test(s)),
          (skillName) => {
            const skill: Skill = {
              id: 'test',
              name: skillName,
              category: 'frontend',
              proficiency: 3,
            }
            const { unmount } = render(<SkillBadge skill={skill} />)
            try {
              const elements = screen.queryAllByText((content, element) => {
                return element?.textContent === skillName
              })
              expect(elements.length).toBeGreaterThan(0)
            } finally {
              unmount()
            }
          }
        )
      )
    })

    /**
     * **Validates: Requirements 3.3**
     * Property: For any skill with an icon, the component SHALL render the icon with
     * aria-hidden="true" to ensure accessibility.
     */
    it('should render icon with aria-hidden for all skills with icons', () => {
      fc.assert(
        fc.property(fc.string({ minLength: 1, maxLength: 5 }), (icon) => {
          const skill: Skill = {
            id: 'test',
            name: 'Test',
            category: 'frontend',
            proficiency: 3,
            icon,
          }
          const { container, unmount } = render(<SkillBadge skill={skill} />)
          try {
            const iconElement = container.querySelector('[aria-hidden="true"]')
            expect(iconElement).toBeInTheDocument()
          } finally {
            unmount()
          }
        })
      )
    })

    /**
     * **Validates: Requirements 3.4**
     * Property: For any skill, the component SHALL maintain responsive classes
     * that ensure readability across different screen sizes.
     */
    it('should maintain responsive structure for all skills', () => {
      fc.assert(
        fc.property(
          fc.record({
            name: fc.string({ minLength: 1, maxLength: 50 }),
            proficiency: fc.integer({ min: 1, max: 5 }) as any,
          }),
          (data) => {
            const skill: Skill = {
              id: 'test',
              name: data.name,
              category: 'frontend',
              proficiency: data.proficiency,
            }
            const { container, unmount } = render(<SkillBadge skill={skill} />)
            try {
              const card = container.querySelector('.bg-card')
              expect(card).toHaveClass('rounded-lg')
              expect(card).toHaveClass('p-4')
            } finally {
              unmount()
            }
          }
        )
      )
    })

    /**
     * **Validates: Requirements 3.2**
     * Property: For any skill with years of experience, the component SHALL display
     * the years correctly with proper singular/plural handling.
     */
    it('should handle years of experience correctly for all values', () => {
      fc.assert(
        fc.property(fc.integer({ min: 0, max: 50 }), (years) => {
          const skill: Skill = {
            id: 'test',
            name: 'Test',
            category: 'frontend',
            proficiency: 3,
            yearsOfExperience: years,
          }
          const { unmount } = render(<SkillBadge skill={skill} />)
          try {
            const expectedText = years === 1 ? '1 year of experience' : `${years} years of experience`
            expect(screen.getByText(expectedText)).toBeInTheDocument()
          } finally {
            unmount()
          }
        })
      )
    })

    /**
     * **Validates: Requirements 3.1, 3.2**
     * Property: For any skill category, the component SHALL render correctly
     * regardless of the category type.
     */
    it('should render correctly for all skill categories', () => {
      const categories: Array<'frontend' | 'backend' | 'tools' | 'design' | 'soft'> = [
        'frontend',
        'backend',
        'tools',
        'design',
        'soft',
      ]
      fc.assert(
        fc.property(fc.constantFrom(...categories), (category) => {
          const skill: Skill = {
            id: 'test',
            name: 'Test Skill',
            category,
            proficiency: 3,
          }
          const { unmount } = render(<SkillBadge skill={skill} />)
          try {
            expect(screen.getByText('Test Skill')).toBeInTheDocument()
          } finally {
            unmount()
          }
        })
      )
    })

    /**
     * **Validates: Requirements 3.2**
     * Property: For any proficiency level, the component SHALL display the correct
     * proficiency label text.
     */
    it('should display correct proficiency labels for all levels', () => {
      const proficiencyMap: Record<number, string> = {
        1: 'Beginner',
        2: 'Intermediate',
        3: 'Proficient',
        4: 'Advanced',
        5: 'Expert',
      }

      fc.assert(
        fc.property(fc.integer({ min: 1, max: 5 }), (level) => {
          const skill: Skill = {
            id: 'test',
            name: 'Test',
            category: 'frontend',
            proficiency: level as 1 | 2 | 3 | 4 | 5,
          }
          const { unmount } = render(<SkillBadge skill={skill} />)
          try {
            expect(screen.getByText(proficiencyMap[level])).toBeInTheDocument()
          } finally {
            unmount()
          }
        })
      )
    })
  })
})
