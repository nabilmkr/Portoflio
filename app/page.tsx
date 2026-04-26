import dynamic from 'next/dynamic'
import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import LoadingSkeleton from '@/components/loading-skeleton'

// Dynamic imports with Next.js for proper code splitting in App Router
const Projects = dynamic(() => import('@/components/projects'), {
  loading: () => <LoadingSkeleton type="projects" />,
})
const Skills = dynamic(() => import('@/components/skills'), {
  loading: () => <LoadingSkeleton type="skills" />,
})
const Experience = dynamic(() => import('@/components/experience'), {
  loading: () => <LoadingSkeleton type="experience" />,
})
const Contact = dynamic(() => import('@/components/contact'), {
  loading: () => <LoadingSkeleton type="contact" />,
})

export default function Home() {
  return (
    <main className="min-h-screen scroll-smooth">
      <Navigation />
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </main>
  )
}
