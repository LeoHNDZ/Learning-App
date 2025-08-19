'use client'

import { LucideIcon } from 'lucide-react'

interface NavigationItem {
  id: string
  label: string
  icon: LucideIcon
  badge?: string
  disabled?: boolean
}

interface SidebarProps {
  items: NavigationItem[]
  activeItem: string
  onItemSelect: (id: string) => void
  isOpen: boolean
  className?: string
}

export function Sidebar({ 
  items, 
  activeItem, 
  onItemSelect, 
  isOpen, 
  className = '' 
}: SidebarProps) {
  return (
    <aside 
      className={`
        w-64 border-r bg-muted/40 
        ${isOpen ? 'block' : 'hidden'} 
        md:block transition-all duration-200
        ${className}
      `}
      aria-label="Main navigation"
    >
      <div className="space-y-2 p-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Navigation
          </h2>
        </div>
        <div className="space-y-1">
          {items.map((item) => {
            const IconComponent = item.icon
            const isActive = activeItem === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => !item.disabled && onItemSelect(item.id)}
                disabled={item.disabled}
                className={`
                  nav-item w-full justify-start
                  ${isActive ? 'active' : ''}
                  ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Navigate to ${item.label}`}
              >
                <IconComponent className="h-4 w-4" />
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </aside>
  )
}