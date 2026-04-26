'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Sparkles, Code, Palette, Zap } from 'lucide-react'
import { cn, smoothScrollTo } from '@/lib/utils'

export default function Hero() {
  const scrollToProjects = () => {
    smoothScrollTo('projects')
  }

  const scrollToContact = () => {
    smoothScrollTo('contact')
  }

  return (
    <section 
      id="hero" 
      className="min-h-screen-responsive flex items-center justify-center relative overflow-hidden will-change-scroll"
      aria-label="Hero section with introduction"
    >
      {/* Enhanced Background Effects - Glassmorphism + Dark Luxe */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-accent-950 dark:from-primary-950 dark:via-primary-900 dark:to-accent-950 animate-gradient-shift" />
      
      {/* Floating Glass Elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-72 h-72 glass-effect-accent rounded-full blur-3xl"
        animate={{ 
          y: [0, -20, 0],
          x: [0, 10, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 glass-effect rounded-full blur-3xl"
        animate={{ 
          y: [0, 15, 0],
          x: [0, -15, 0]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px)]" />
      
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-1 h-1 bg-accent-500/30 rounded-full"
            initial={{
              x: Math.random() * 1000,
              y: Math.random() * 1000,
              opacity: 0.3
            }}
            animate={{
              y: [null, -100],
              opacity: [0.3, 0, 0.3]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container-responsive relative z-10 content-visibility-auto">
        <div className="max-w-5xl mx-auto text-center">
          {/* Enhanced Welcome Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.6,
              type: "spring",
              stiffness: 100
            }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full glass-effect animate-glass-glow">
              <Sparkles className="h-5 w-5 text-accent-500" />
              <span className="text-sm font-medium text-foreground">Welcome to my portfolio</span>
              <div className="flex gap-1">
                <Code className="h-4 w-4 text-primary-400" />
                <Palette className="h-4 w-4 text-accent-400" />
                <Zap className="h-4 w-4 text-primary-300" />
              </div>
            </div>
          </motion.div>

          {/* Enhanced Headline with Gradient Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7,
              delay: 0.1,
              type: "spring",
              stiffness: 80
            }}
          >
            <h1 className="text-responsive-2xl tracking-tight mb-6">
              <span className="block text-foreground">Crafting Digital</span>
              <span className="block text-gradient bg-gradient-to-r from-primary-600 via-accent-600 to-primary-400">
                Experiences
              </span>
              <span className="block text-foreground">That Inspire</span>
            </h1>
          </motion.div>

          {/* Enhanced Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6,
              delay: 0.2
            }}
            className="text-responsive-lg text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            I specialize in building <span className="font-semibold text-primary-500">high-performance web applications</span> with 
            a focus on <span className="font-semibold text-accent-500">modern design systems</span>, 
            <span className="font-semibold text-primary-400"> accessibility-first development</span>, and 
            <span className="font-semibold text-accent-400"> exceptional user experiences</span>. 
            Let&apos;s create something amazing together.
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6,
              delay: 0.3
            }}
            className="flex flex-col sm:flex-row gap-5 justify-center mb-16"
          >
            <button
              onClick={scrollToProjects}
              className={cn(
                'px-10 py-4 rounded-xl font-semibold transition-all duration-300 touch-target',
                'bg-gradient-to-r from-primary-600 to-accent-600 text-primary-foreground',
                'hover:from-primary-700 hover:to-accent-700 hover:shadow-2xl hover:-translate-y-1',
                'shadow-lg shadow-primary/30 focus-ring',
                'flex items-center justify-center gap-3'
              )}
              aria-label="View my projects"
            >
              <Code className="h-5 w-5" />
              View Projects
            </button>
            <button
              onClick={scrollToContact}
              className={cn(
                'px-10 py-4 rounded-xl font-semibold transition-all duration-300 touch-target',
                'glass-effect border border-primary/20 text-foreground',
                'hover:bg-primary/5 hover:shadow-2xl hover:-translate-y-1',
                'shadow-lg shadow-primary/10 focus-ring',
                'flex items-center justify-center gap-3'
              )}
              aria-label="Get in touch"
            >
              <Sparkles className="h-5 w-5" />
              Get in Touch
            </button>
          </motion.div>

          {/* Enhanced Stats/Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.6,
              delay: 0.5
            }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12"
          >
            {[
              { label: 'Projects', value: '50+', icon: '🚀' },
              { label: 'Technologies', value: '20+', icon: '⚡' },
              { label: 'Experience', value: '5+ yrs', icon: '🎯' },
              { label: 'Clients', value: '30+', icon: '💼' }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="glass-effect rounded-xl p-4 text-center"
              >
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className="text-lg mt-2">{stat.icon}</div>
              </div>
            ))}
          </motion.div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.6,
              delay: 0.8
            }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <button
              onClick={scrollToProjects}
              className="group p-3 rounded-full glass-effect border border-border/50 focus-ring"
              aria-label="Scroll down to projects"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <ArrowDown className="h-6 w-6 text-muted-foreground group-hover:text-accent-500 transition-colors" />
              </motion.div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                Scroll
              </div>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Performance Optimizations */}
      <div className="sr-only">
        Hero section with glassmorphism design, animated elements, and call-to-action buttons
      </div>
    </section>
  )
}