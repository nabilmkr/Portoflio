'use client'

import React, { useRef, useEffect } from 'react'

interface FadingVideoProps {
  src: string
  className?: string
  style?: React.CSSProperties
}

export default function FadingVideo({ src, className, style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const rAFRef = useRef<number>(0)
  const fadingOutRef = useRef(false)

  // Configuration
  const FADE_MS = 500
  const FADE_OUT_LEAD = 0.55

  const fadeTo = (targetOpacity: number, duration: number = FADE_MS) => {
    if (!videoRef.current) return
    const video = videoRef.current

    if (rAFRef.current) {
      cancelAnimationFrame(rAFRef.current)
    }

    // Read current opacity from inline style, default to 0
    let currentOpacity = parseFloat(video.style.opacity)
    if (isNaN(currentOpacity)) currentOpacity = 0

    const startTime = performance.now()
    const startOpacity = currentOpacity

    const animateFade = (currentTime: number) => {
      const elapsed = currentTime - startTime
      let progress = elapsed / duration

      if (progress >= 1) progress = 1

      const newOpacity = startOpacity + (targetOpacity - startOpacity) * progress

      if (videoRef.current) {
         videoRef.current.style.opacity = newOpacity.toString()
      }

      if (progress < 1) {
        rAFRef.current = requestAnimationFrame(animateFade)
      } else {
        rAFRef.current = 0
      }
    }

    rAFRef.current = requestAnimationFrame(animateFade)
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => {
      video.style.opacity = '0'
      video.play().catch(e => console.error("Auto-play prevented", e))
      fadeTo(1)
    }

    const handleTimeUpdate = () => {
      if (isNaN(video.duration)) return
      const timeLeft = video.duration - video.currentTime

      if (!fadingOutRef.current && timeLeft <= FADE_OUT_LEAD && timeLeft > 0) {
        fadingOutRef.current = true
        fadeTo(0)
      }
    }

    const handleEnded = () => {
      video.style.opacity = '0'

      setTimeout(() => {
        if (!videoRef.current) return
        videoRef.current.currentTime = 0
        videoRef.current.play().catch(e => console.error("Play on restart prevented", e))
        fadingOutRef.current = false
        fadeTo(1)
      }, 100)
    }

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    return () => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      style={{ ...style, opacity: 0 }}
      autoPlay
      muted
      playsInline
      preload="auto"
      // Loop is OFF intentionally as we handle looping via 'ended' event
    />
  )
}
