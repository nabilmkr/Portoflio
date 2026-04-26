'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LoadingSkeletonProps {
  type: 'projects' | 'skills' | 'experience' | 'contact'
}

export default function LoadingSkeleton({ type }: LoadingSkeletonProps) {
  const getSkeletonConfig = () => {
    switch (type) {
      case 'projects':
        return {
          title: 'Loading Projects',
          items: 3,
          height: 'h-64',
          grid: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }
      case 'skills':
        return {
          title: 'Loading Skills',
          items: 4,
          height: 'h-48',
          grid: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
        }
      case 'experience':
        return {
          title: 'Loading Experience',
          items: 4,
          height: 'h-32',
          grid: 'grid-cols-1'
        }
      case 'contact':
        return {
          title: 'Loading Contact',
          items: 2,
          height: 'h-96',
          grid: 'grid-cols-1 lg:grid-cols-2'
        }
      default:
        return {
          title: 'Loading',
          items: 1,
          height: 'h-32',
          grid: 'grid-cols-1'
        }
    }
  }

  const config = getSkeletonConfig()

  return (
    <section 
      className="py-20 bg-gradient-to-b from-background to-secondary/10"
      aria-label={`${config.title} skeleton`}
      aria-busy="true"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <div className="h-10 w-48 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg mx-auto mb-4 animate-pulseSoft" />
          <div className="h-6 w-64 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg mx-auto animate-pulseSoft" />
        </div>

        {/* Content skeleton */}
        <div className={cn('grid gap-8', config.grid)}>
          {Array.from({ length: config.items }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={cn(
                'rounded-2xl border border-border bg-card overflow-hidden',
                'relative overflow-hidden'
              )}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg animate-pulseSoft" />
                  <div className="flex-1">
                    <div className="h-6 w-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded mb-2 animate-pulseSoft" />
                    <div className="h-4 w-24 bg-gradient-to-r from-primary/10 to-accent/10 rounded animate-pulseSoft" />
                  </div>
                </div>
                
                <div className={cn('w-full', config.height, 'bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg mb-4 animate-pulseSoft')} />
                
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gradient-to-r from-primary/10 to-accent/10 rounded animate-pulseSoft" />
                  <div className="h-4 w-3/4 bg-gradient-to-r from-primary/10 to-accent/10 rounded animate-pulseSoft" />
                  <div className="h-4 w-1/2 bg-gradient-to-r from-primary/10 to-accent/10 rounded animate-pulseSoft" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Loading indicator */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-2 w-2 bg-accent rounded-full animate-pulseSoft" />
            <div className="h-2 w-2 bg-accent rounded-full animate-pulseSoft" style={{ animationDelay: '0.2s' }} />
            <div className="h-2 w-2 bg-accent rounded-full animate-pulseSoft" style={{ animationDelay: '0.4s' }} />
            <span className="ml-2">Loading {type}...</span>
          </div>
        </div>
      </div>
    </section>
  )
}