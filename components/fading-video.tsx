'use client'

import React, { useRef, useEffect, useState } from 'react'

interface FadingVideoProps {
  src: string
  className?: string
  style?: React.CSSProperties
}

export default function FadingVideo({ src, className, style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [opacity, setOpacity] = useState(0)

  // Configuration
  const FADE_OUT_LEAD = 0.55

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => {
      setOpacity(1)
      video.play().catch(e => console.error("Auto-play prevented", e))
    }

    const handleTimeUpdate = () => {
      if (isNaN(video.duration)) return
      const timeLeft = video.duration - video.currentTime

      if (timeLeft <= FADE_OUT_LEAD && timeLeft > 0) {
        setOpacity(0)
      }
    }

    const handleEnded = () => {
      setTimeout(() => {
        if (!videoRef.current) return
        videoRef.current.currentTime = 0
        videoRef.current.play().catch(e => console.error("Play on restart prevented", e))
        setOpacity(1)
      }, 100)
    }

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    return () => {
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
      style={{
        ...style,
        opacity,
        transition: 'opacity 0.5s ease-in-out',
      }}
      autoPlay
      muted
      playsInline
      preload="auto"
    />
  )
}
