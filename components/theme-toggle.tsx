'use client'

import * as React from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg bg-muted animate-pulse" />
    )
  }

  const themes = [
    { name: 'light', icon: Sun, label: 'Light mode' },
    { name: 'dark', icon: Moon, label: 'Dark mode' },
    { name: 'system', icon: Monitor, label: 'System theme' },
  ]

  const currentThemeIndex = themes.findIndex(t => t.name === theme)
  const nextTheme = themes[(currentThemeIndex + 1) % themes.length]
  const CurrentIcon = themes[currentThemeIndex]?.icon || Sun

  return (
    <button
      onClick={() => setTheme(nextTheme.name)}
      className="w-9 h-9 rounded-lg bg-muted hover:bg-accent transition-colors duration-200 flex items-center justify-center"
      aria-label={`Switch to ${nextTheme.label}`}
      title={`Current: ${themes[currentThemeIndex]?.label}. Click for ${nextTheme.label}`}
    >
      <CurrentIcon className="h-4 w-4" />
    </button>
  )
}