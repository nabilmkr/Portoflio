'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, Monitor } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getThemeIcon = () => {
    if (!mounted) {
      return <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
    }
    
    switch (theme) {
      case 'light':
        return <Sun className="h-5 w-5" />
      case 'dark':
        return <Moon className="h-5 w-5" />
      default:
        return <Monitor className="h-5 w-5" />
    }
  }

  const getThemeLabel = () => {
    if (!mounted) return 'Loading theme toggle'
    
    switch (theme) {
      case 'light':
        return 'Switch to dark mode'
      case 'dark':
        return 'Switch to system theme'
      default:
        return 'Switch to light mode'
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-full w-10 h-10 touch-target glass-effect hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-primary-400 dark:focus:ring-offset-primary-950 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
      aria-label={getThemeLabel()}
      title={getThemeLabel()}
      disabled={!mounted}
    >
      {getThemeIcon()}
      <span className="sr-only">{getThemeLabel()}</span>
    </button>
  )
}