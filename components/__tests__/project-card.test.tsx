import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ProjectCard from '../project-card'
import { Project } from '@/lib/types/project'

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  },
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

const mockProject: Project = {
  id: 'test-project',
  title: 'Test Project',
  description: 'A test project description',
  detailedDescription: 'A detailed description of the test project',
  technologies: ['React', 'TypeScript', 'Tailwind CSS'],
  category: 'web',
  images: [
    {
      url: '/images/test-1.jpg',
      alt: 'Test project image 1',
      caption: 'First image',
    },
    {
      url: '/images/test-2.jpg',
      alt: 'Test project image 2',
      caption: 'Second image',
    },
  ],
  links: {
    live: 'https://example.com',
    github: 'https://github.com/example',
    caseStudy: 'https://example.com/case-study',
  },
  featured: true,
  date: '2024-01-15',
}

describe('ProjectCard Component', () => {
  describe('Rendering', () => {
    it('should render project card with title', () => {
      render(<ProjectCard project={mockProject} />)
      expect(screen.getByText('Test Project')).toBeInTheDocument()
    })

    it('should render project description', () => {
      render(<ProjectCard project={mockProject} />)
      expect(screen.getByText('A test project description')).toBeInTheDocument()
    })

    it('should render technology badges', () => {
      render(<ProjectCard project={mockProject} />)
      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('TypeScript')).toBeInTheDocument()
      expect(screen.getByText('Tailwind CSS')).toBeInTheDocument()
    })

    it('should render featured badge when featured is true', () => {
      render(<ProjectCard project={mockProject} />)
      expect(screen.getByText('Featured')).toBeInTheDocument()
    })

    it('should not render featured badge when featured is false', () => {
      const nonFeaturedProject = { ...mockProject, featured: false }
      render(<ProjectCard project={nonFeaturedProject} />)
      expect(screen.queryByText('Featured')).not.toBeInTheDocument()
    })

    it('should render live demo link when available', () => {
      render(<ProjectCard project={mockProject} />)
      const liveLinks = screen.getAllByText('Live Demo')
      expect(liveLinks.length).toBeGreaterThan(0)
    })

    it('should render code link when available', () => {
      render(<ProjectCard project={mockProject} />)
      const codeLinks = screen.getAllByText('Code')
      expect(codeLinks.length).toBeGreaterThan(0)
    })
  })

  describe('Modal Functionality', () => {
    it('should open modal when card is clicked', async () => {
      render(<ProjectCard project={mockProject} />)
      const card = screen.getByText('Test Project').closest('div')?.parentElement

      fireEvent.click(card!)
      await waitFor(() => {
        expect(screen.getByText('About this project')).toBeInTheDocument()
      })
    })

    it('should display detailed description in modal', async () => {
      render(<ProjectCard project={mockProject} />)
      const card = screen.getByText('Test Project').closest('div')?.parentElement

      fireEvent.click(card!)
      await waitFor(() => {
        expect(
          screen.getByText('A detailed description of the test project')
        ).toBeInTheDocument()
      })
    })

    it('should display all technologies in modal', async () => {
      render(<ProjectCard project={mockProject} />)
      const card = screen.getByText('Test Project').closest('div')?.parentElement

      fireEvent.click(card!)
      await waitFor(() => {
        expect(screen.getByText('Technologies Used')).toBeInTheDocument()
      })
    })

    it('should close modal when close button is clicked', async () => {
      render(<ProjectCard project={mockProject} />)
      const card = screen.getByText('Test Project').closest('div')?.parentElement

      fireEvent.click(card!)
      await waitFor(() => {
        expect(screen.getByText('About this project')).toBeInTheDocument()
      })

      const closeButton = screen.getByLabelText('Close modal')
      fireEvent.click(closeButton)

      await waitFor(() => {
        expect(screen.queryByText('About this project')).not.toBeInTheDocument()
      })
    })

    it('should close modal when backdrop is clicked', async () => {
      render(<ProjectCard project={mockProject} />)
      const card = screen.getByText('Test Project').closest('div')?.parentElement

      fireEvent.click(card!)
      await waitFor(() => {
        expect(screen.getByText('About this project')).toBeInTheDocument()
      })

      const backdrop = screen.getByRole('dialog')
      fireEvent.click(backdrop)

      await waitFor(() => {
        expect(screen.queryByText('About this project')).not.toBeInTheDocument()
      })
    })
  })

  describe('Image Gallery', () => {
    it('should display first image by default', async () => {
      render(<ProjectCard project={mockProject} />)
      const card = screen.getByText('Test Project').closest('div')?.parentElement

      fireEvent.click(card!)
      await waitFor(() => {
        const images = screen.getAllByAltText('Test project image 1')
        expect(images.length).toBeGreaterThan(0)
      })
    })

    it('should navigate to next image', async () => {
      render(<ProjectCard project={mockProject} />)
      const card = screen.getByText('Test Project').closest('div')?.parentElement

      fireEvent.click(card!)
      await waitFor(() => {
        expect(screen.getByText('First image')).toBeInTheDocument()
      })

      const nextButton = screen.getByLabelText('Next image')
      fireEvent.click(nextButton)

      await waitFor(() => {
        expect(screen.getByText('Second image')).toBeInTheDocument()
      })
    })

    it('should navigate to previous image', async () => {
      render(<ProjectCard project={mockProject} />)
      const card = screen.getByText('Test Project').closest('div')?.parentElement

      fireEvent.click(card!)
      await waitFor(() => {
        expect(screen.getByText('First image')).toBeInTheDocument()
      })

      const nextButton = screen.getByLabelText('Next image')
      fireEvent.click(nextButton)

      await waitFor(() => {
        expect(screen.getByText('Second image')).toBeInTheDocument()
      })

      const prevButton = screen.getByLabelText('Previous image')
      fireEvent.click(prevButton)

      await waitFor(() => {
        expect(screen.getByText('First image')).toBeInTheDocument()
      })
    })

    it('should show image indicators', async () => {
      render(<ProjectCard project={mockProject} />)
      const card = screen.getByText('Test Project').closest('div')?.parentElement

      fireEvent.click(card!)
      await waitFor(() => {
        const indicators = screen.getAllByRole('button', { name: /Go to image/ })
        expect(indicators.length).toBe(2)
      })
    })

    it('should navigate to image by clicking indicator', async () => {
      render(<ProjectCard project={mockProject} />)
      const card = screen.getByText('Test Project').closest('div')?.parentElement

      fireEvent.click(card!)
      await waitFor(() => {
        expect(screen.getByText('First image')).toBeInTheDocument()
      })

      const secondIndicator = screen.getByLabelText('Go to image 2')
      fireEvent.click(secondIndicator)

      await waitFor(() => {
        expect(screen.getByText('Second image')).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper alt text for images', () => {
      render(<ProjectCard project={mockProject} />)
      const images = screen.getAllByAltText('Test project image 1')
      expect(images.length).toBeGreaterThan(0)
    })

    it('should have aria labels for links', () => {
      render(<ProjectCard project={mockProject} />)
      expect(
        screen.getByLabelText('Visit Test Project live site')
      ).toBeInTheDocument()
      expect(
        screen.getByLabelText('View Test Project source code')
      ).toBeInTheDocument()
    })

    it('should have proper modal role and attributes', async () => {
      render(<ProjectCard project={mockProject} />)
      const card = screen.getByText('Test Project').closest('div')?.parentElement

      fireEvent.click(card!)
      await waitFor(() => {
        const modal = screen.getByRole('dialog')
        expect(modal).toHaveAttribute('aria-modal', 'true')
        expect(modal).toHaveAttribute('aria-labelledby', 'modal-title')
      })
    })

    it('should have aria labels for navigation buttons', async () => {
      render(<ProjectCard project={mockProject} />)
      const card = screen.getByText('Test Project').closest('div')?.parentElement

      fireEvent.click(card!)
      await waitFor(() => {
        expect(screen.getByLabelText('Previous image')).toBeInTheDocument()
        expect(screen.getByLabelText('Next image')).toBeInTheDocument()
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle project with single image', () => {
      const singleImageProject = {
        ...mockProject,
        images: [mockProject.images[0]],
      }
      render(<ProjectCard project={singleImageProject} />)
      expect(screen.getByText('Test Project')).toBeInTheDocument()
    })

    it('should handle project without optional links', () => {
      const projectNoLinks = {
        ...mockProject,
        links: {},
      }
      render(<ProjectCard project={projectNoLinks} />)
      expect(screen.getByText('Test Project')).toBeInTheDocument()
    })

    it('should handle project with many technologies', () => {
      const manyTechProject = {
        ...mockProject,
        technologies: Array(10).fill('Tech'),
      }
      render(<ProjectCard project={manyTechProject} />)
      expect(screen.getByText('+7')).toBeInTheDocument()
    })

    it('should handle project without image captions', async () => {
      const noCaptionProject = {
        ...mockProject,
        images: [
          {
            url: '/images/test-1.jpg',
            alt: 'Test project image',
          },
        ],
      }
      render(<ProjectCard project={noCaptionProject} />)
      const card = screen.getByText('Test Project').closest('div')?.parentElement

      fireEvent.click(card!)
      await waitFor(() => {
        expect(screen.getByText('About this project')).toBeInTheDocument()
      })
    })
  })
})
