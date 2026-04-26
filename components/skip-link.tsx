'use client'

import { cn } from '@/lib/utils'

interface SkipLinkProps {
  href?: string
  label?: string
}

export default function SkipLink({ href = '#main-content', label = 'Skip to main content' }: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'sr-only focus:not-sr-only',
        'focus:fixed focus:top-4 focus:left-4 focus:z-[100]',
        'focus:px-4 focus:py-2 focus:rounded-lg',
        'focus:bg-primary focus:text-primary-foreground',
        'focus:font-medium focus:text-sm',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'focus:shadow-lg'
      )}
    >
      {label}
    </a>
  )
}
