import * as fc from 'fast-check'
import {
  getAllProjects,
  getProjectsByCategory,
  getProjectsByTechnology,
  searchProjects,
  getFeaturedProjects,
  getProjectById,
  getAllTechnologies,
  getAllCategories,
} from '../projects'
import { Project, ProjectCategory } from '../types/project'

describe('Projects Module', () => {
  describe('getAllProjects', () => {
    it('should return an array of projects', () => {
      const projects = getAllProjects()
      expect(Array.isArray(projects)).toBe(true)
      expect(projects.length).toBeGreaterThan(0)
    })

    it('should return projects with required fields', () => {
      const projects = getAllProjects()
      projects.forEach(project => {
        expect(project).toHaveProperty('id')
        expect(project).toHaveProperty('title')
        expect(project).toHaveProperty('description')
        expect(project).toHaveProperty('detailedDescription')
        expect(project).toHaveProperty('technologies')
        expect(project).toHaveProperty('category')
        expect(project).toHaveProperty('images')
        expect(project).toHaveProperty('links')
        expect(project).toHaveProperty('featured')
        expect(project).toHaveProperty('date')
      })
    })
  })

  describe('getProjectsByCategory', () => {
    it('should return all projects when category is "all"', () => {
      const allProjects = getAllProjects()
      const result = getProjectsByCategory('all')
      expect(result).toEqual(allProjects)
    })

    it('should filter projects by specific category', () => {
      const webProjects = getProjectsByCategory('web')
      webProjects.forEach(project => {
        expect(project.category).toBe('web')
      })
    })

    it('should return empty array for category with no projects', () => {
      const result = getProjectsByCategory('other')
      expect(Array.isArray(result)).toBe(true)
    })

    it('should maintain project integrity when filtering', () => {
      const webProjects = getProjectsByCategory('web')
      webProjects.forEach(project => {
        expect(project.id).toBeDefined()
        expect(project.title).toBeDefined()
        expect(project.technologies).toBeDefined()
      })
    })
  })

  describe('getProjectsByTechnology', () => {
    it('should find projects by technology name', () => {
      const nextProjects = getProjectsByTechnology('React')
      expect(nextProjects.length).toBeGreaterThan(0)
      nextProjects.forEach(project => {
        expect(project.technologies.some(t =>
          t.toLowerCase().includes('react')
        )).toBe(true)
      })
    })

    it('should be case-insensitive', () => {
      const result1 = getProjectsByTechnology('react')
      const result2 = getProjectsByTechnology('REACT')
      expect(result1.length).toBe(result2.length)
    })

    it('should return empty array for non-existent technology', () => {
      const result = getProjectsByTechnology('NonExistentTech123')
      expect(result).toEqual([])
    })
  })

  describe('searchProjects', () => {
    it('should find projects by title', () => {
      const results = searchProjects('News')
      expect(results.length).toBeGreaterThan(0)
      expect(results.some(p => p.title.includes('News'))).toBe(true)
    })

    it('should find projects by description', () => {
      const results = searchProjects('platform')
      expect(results.length).toBeGreaterThan(0)
    })

    it('should find projects by technology', () => {
      const results = searchProjects('Python')
      expect(results.length).toBeGreaterThan(0)
    })

    it('should be case-insensitive', () => {
      const result1 = searchProjects('dashboard')
      const result2 = searchProjects('DASHBOARD')
      expect(result1.length).toBe(result2.length)
    })

    it('should return empty array for non-matching query', () => {
      const results = searchProjects('xyz123nonexistent')
      expect(results).toEqual([])
    })

    it('should handle whitespace-only queries', () => {
      const results = searchProjects('   ')
      expect(results).toEqual([])
    })
  })

  describe('getFeaturedProjects', () => {
    it('should return only featured projects', () => {
      const featured = getFeaturedProjects()
      featured.forEach(project => {
        expect(project.featured).toBe(true)
      })
    })

    it('should return a subset of all projects', () => {
      const all = getAllProjects()
      const featured = getFeaturedProjects()
      expect(featured.length).toBeLessThanOrEqual(all.length)
    })
  })

  describe('getProjectById', () => {
    it('should return a project by id', () => {
      const projects = getAllProjects()
      const firstProject = projects[0]
      const result = getProjectById(firstProject.id)
      expect(result).toEqual(firstProject)
    })

    it('should return undefined for non-existent id', () => {
      const result = getProjectById('non-existent-id-123')
      expect(result).toBeUndefined()
    })
  })

  describe('getAllTechnologies', () => {
    it('should return an array of unique technologies', () => {
      const techs = getAllTechnologies()
      expect(Array.isArray(techs)).toBe(true)
      expect(techs.length).toBeGreaterThan(0)
    })

    it('should not contain duplicates', () => {
      const techs = getAllTechnologies()
      const uniqueTechs = new Set(techs)
      expect(techs.length).toBe(uniqueTechs.size)
    })

    it('should be sorted', () => {
      const techs = getAllTechnologies()
      const sorted = [...techs].sort()
      expect(techs).toEqual(sorted)
    })
  })

  describe('getAllCategories', () => {
    it('should return an array of unique categories', () => {
      const categories = getAllCategories()
      expect(Array.isArray(categories)).toBe(true)
      expect(categories.length).toBeGreaterThan(0)
    })

    it('should not contain duplicates', () => {
      const categories = getAllCategories()
      const uniqueCategories = new Set(categories)
      expect(categories.length).toBe(uniqueCategories.size)
    })

    it('should be sorted', () => {
      const categories = getAllCategories()
      const sorted = [...categories].sort()
      expect(categories).toEqual(sorted)
    })
  })

  // Property-Based Tests
  describe('Property: Filter Consistency', () => {
    it('should maintain project count consistency when filtering', () => {
      fc.assert(
        fc.property(fc.constantFrom('all', 'web', 'mobile', 'design', 'other'), (category) => {
          const allProjects = getAllProjects()
          const filtered = getProjectsByCategory(category as ProjectCategory)

          if (category === 'all') {
            expect(filtered.length).toBe(allProjects.length)
          } else {
            expect(filtered.length).toBeLessThanOrEqual(allProjects.length)
            filtered.forEach(p => {
              expect(p.category).toBe(category)
            })
          }
        })
      )
    })

    it('should preserve project data integrity during filtering', () => {
      fc.assert(
        fc.property(fc.constantFrom('all', 'web', 'mobile', 'design', 'other'), (category) => {
          const filtered = getProjectsByCategory(category as ProjectCategory)

          filtered.forEach(project => {
            expect(project.id).toBeDefined()
            expect(project.title).toBeDefined()
            expect(typeof project.title).toBe('string')
            expect(project.title.length).toBeGreaterThan(0)
            expect(Array.isArray(project.technologies)).toBe(true)
            expect(project.technologies.length).toBeGreaterThan(0)
            expect(Array.isArray(project.images)).toBe(true)
            expect(project.images.length).toBeGreaterThanOrEqual(0)
          })
        })
      )
    })

    it('should return consistent results for repeated searches', () => {
      fc.assert(
        fc.property(fc.string({ minLength: 1, maxLength: 20 }), (query) => {
          const result1 = searchProjects(query)
          const result2 = searchProjects(query)

          expect(result1.length).toBe(result2.length)
          expect(result1.map(p => p.id)).toEqual(result2.map(p => p.id))
        })
      )
    })

    it('should return subset of all projects for any filter', () => {
      fc.assert(
        fc.property(fc.constantFrom('all', 'web', 'mobile', 'design', 'other'), (category) => {
          const allProjects = getAllProjects()
          const filtered = getProjectsByCategory(category as ProjectCategory)

          expect(filtered.length).toBeLessThanOrEqual(allProjects.length)
          filtered.forEach(filteredProject => {
            expect(allProjects.some(p => p.id === filteredProject.id)).toBe(true)
          })
        })
      )
    })
  })

  // Validates: Requirements 2.4
  describe('Property: Search Result Validity', () => {
    it('should only return projects matching the search query', () => {
      fc.assert(
        fc.property(fc.string({ minLength: 1, maxLength: 15 }), (query) => {
          const results = searchProjects(query)
          const lowerQuery = query.toLowerCase()

          results.forEach(project => {
            const matches =
              project.title.toLowerCase().includes(lowerQuery) ||
              project.description.toLowerCase().includes(lowerQuery) ||
              project.detailedDescription.toLowerCase().includes(lowerQuery) ||
              project.technologies.some(tech =>
                tech.toLowerCase().includes(lowerQuery)
              )

            expect(matches).toBe(true)
          })
        })
      )
    })
  })
})
