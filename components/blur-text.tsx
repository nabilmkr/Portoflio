'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface BlurTextProps {
  text: string
  className?: string
  delayStart?: number
}

export default function BlurText({ text, className, delayStart = 0 }: BlurTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  const words = text.split(' ')

  return (
    <p
      ref={ref}
      className={className}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        rowGap: '0.1em'
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={isInView ? {
            filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
            opacity: [0, 0.5, 1],
            y: [50, -5, 0]
          } : {}}
          transition={{
            duration: 0.7,
            times: [0, 0.5, 1],
            ease: "easeOut",
            delay: delayStart + ((i * 100) / 1000)
          }}
          style={{
            display: 'inline-block',
            marginRight: '0.28em' // Instead of &nbsp;, allows tight tracking like tracking-[-4px]
          }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  )
}
