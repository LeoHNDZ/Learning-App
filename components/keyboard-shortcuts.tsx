'use client'

import { useState, useEffect } from 'react'
import { X, Keyboard } from 'lucide-react'

interface KeyboardShortcut {
  key: string
  description: string
  action: () => void
}

interface KeyboardShortcutsProps {
  shortcuts: KeyboardShortcut[]
}

export function KeyboardShortcuts({ shortcuts }: KeyboardShortcutsProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Show shortcuts panel
      if (event.key === '?' && !event.shiftKey) {
        event.preventDefault()
        setIsOpen(true)
        return
      }

      // Close shortcuts panel
      if (event.key === 'Escape') {
        setIsOpen(false)
        return
      }

      // Execute shortcuts
      if (!isOpen) {
        const shortcut = shortcuts.find(s => s.key === event.key)
        if (shortcut) {
          event.preventDefault()
          shortcut.action()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts, isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <div className="shortcuts-overlay" onClick={() => setIsOpen(false)}>
      <div className="shortcuts-panel scale-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Keyboard Shortcuts</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-lg hover:bg-muted transition-colors flex items-center justify-center"
            aria-label="Close shortcuts"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-muted-foreground">{shortcut.description}</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">
                {shortcut.key === ' ' ? 'Space' : shortcut.key}
              </kbd>
            </div>
          ))}
          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-muted-foreground">Show this help</span>
            <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">?</kbd>
          </div>
        </div>
      </div>
    </div>
  )
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  return <KeyboardShortcuts shortcuts={shortcuts} />
}