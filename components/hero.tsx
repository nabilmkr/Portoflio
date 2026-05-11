'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Play } from 'lucide-react'
import { cn, smoothScrollTo } from '@/lib/utils'
import FadingVideo from './fading-video'
import BlurText from './blur-text'

export default function Hero() {
  const scrollToProjects = () => {
    smoothScrollTo('projects')
  }

  // Using a suitable abstract dark tech video URL. Feel free to swap!
  const VIDEO_SRC = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      aria-labelledby="hero-heading"
    >
      {/* Background Video (120% scale, centered top) */}
      <FadingVideo
        src={VIDEO_SRC}
        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"
        style={{ width: "120%", height: "120%" }}
      />
      
      {/* Overlay - Optional, adjusting brightness if video is too bright */}
      <div className="absolute inset-0 bg-black/30 z-0 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center pt-24 pb-16">

        {/* Badge */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="mb-8"
        >
          <div className="liquid-glass rounded-full flex items-center pr-4 pl-1 py-1 border border-white/5">
            <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-semibold mr-3">
              Crafting
            </span>
            <span className="text-sm text-white/90 font-body">
              Digital Experiences & Innovative Solutions
            </span>
          </div>
        </motion.div>

        {/* Headline using BlurText */}
        <BlurText
          text="Crafting Digital Experiences That Inspire"
          delayStart={0.6}
          className="text-5xl md:text-6xl lg:text-[5.5rem] font-heading italic text-white leading-[0.85] max-w-4xl text-center tracking-[-2px] md:tracking-[-4px] mb-6"
        />

        {/* Subheading */}
        <motion.p
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          className="text-sm md:text-base text-white/80 max-w-2xl text-center font-body font-light leading-relaxed tracking-wide mb-10"
        >
          Semester 6 student at Politeknik Negeri Ujung Pandang. Passionate about software development, full-stack web applications, and applied AI, bridging the gap between intelligent models and high-performance interfaces.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center gap-6 mb-16"
        >
          <button
            onClick={scrollToProjects}
            className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium text-white flex items-center gap-2 hover:scale-105 transition-transform duration-300"
          >
            Explore Projects
            <ArrowUpRight className="h-5 w-5" />
          </button>

          <button
            onClick={() => smoothScrollTo('contact')}
            className="liquid-glass rounded-full px-6 py-3 text-sm font-medium text-white/90 hover:text-white flex items-center gap-2 hover:scale-105 transition-all duration-300 border border-white/5"
          >
            Contact Me
            <div className="flex items-center justify-center h-5 w-5 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
              <Play className="h-3 w-3 fill-current ml-0.5" />
            </div>
          </button>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg mb-12"
        >
          {/* Card 1 */}
          <div className="liquid-glass p-5 rounded-[1.25rem] flex flex-col justify-between items-start border border-white/5 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300">
            <div className="text-white/80 mb-6">
               <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </div>
            <div>
              <div className="font-heading italic text-white text-4xl tracking-[-1px] leading-none mb-2">5+</div>
              <div className="text-xs text-white/70 font-body font-light">Projects Completed</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="liquid-glass p-5 rounded-[1.25rem] flex flex-col justify-between items-start border border-white/5 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300">
            <div className="text-white/80 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            </div>
            <div>
              <div className="font-heading italic text-white text-4xl tracking-[-1px] leading-none mb-2">2+ Yrs</div>
              <div className="text-xs text-white/70 font-body font-light">Development Experience</div>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack Row */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.4 }}
          className="flex flex-col items-center gap-4 mt-auto"
        >
          <div className="liquid-glass rounded-full px-4 py-1.5 text-xs font-medium text-white/90 border border-white/5">
            Powered by modern technologies
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 font-heading italic text-white/80 text-xl md:text-2xl tracking-tight">
            <span>Next.js</span>
            <span>·</span>
            <span>React</span>
            <span>·</span>
            <span>TypeScript</span>
            <span>·</span>
            <span>Tailwind</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
