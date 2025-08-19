'use client'

import { ReactNode } from 'react'

interface SegmentedControlItem {
  value: string
  label: string
  icon?: ReactNode
  disabled?: boolean
}

interface SegmentedControlProps {
  items: SegmentedControlItem[]
  value: string
  onValueChange: (value: string) => void
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'pills'
  className?: string
}

export function SegmentedControl({
  items,
  value,
  onValueChange,
  size = 'md',
  variant = 'default',
  className = ''
}: SegmentedControlProps) {
  const sizeClasses = {
    sm: 'h-8 text-xs',
    md: 'h-10 text-sm',
    lg: 'h-12 text-base'
  }

  const itemSizeClasses = {
    sm: 'px-3 py-1',
    md: 'px-4 py-2',
    lg: 'px-6 py-3'
  }

  const containerClass = variant === 'pills' 
    ? 'flex gap-1 p-1 bg-muted rounded-xl'
    : 'segmented-control'

  return (
    <div 
      className={`${containerClass} ${sizeClasses[size]} ${className}`}
      role="tablist"
      aria-label="Content sections"
    >
      {items.map((item) => {
        const isActive = value === item.value
        const isDisabled = item.disabled

        return (
          <button
            key={item.value}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${item.value}`}
            disabled={isDisabled}
            className={`
              ${itemSizeClasses[size]}
              rounded-lg font-medium transition-all duration-200
              flex items-center justify-center gap-2 min-w-0 flex-1
              ${isActive 
                ? 'segmented-item active' 
                : 'segmented-item hover:bg-muted/50'
              }
              ${isDisabled 
                ? 'opacity-50 cursor-not-allowed' 
                : 'cursor-pointer'
              }
            `}
            onClick={() => !isDisabled && onValueChange(item.value)}
          >
            {item.icon && (
              <span className="flex-shrink-0">
                {item.icon}
              </span>
            )}
            <span className="truncate">
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

// Specialized variants
interface TabsProps extends Omit<SegmentedControlProps, 'variant'> {}

export function Tabs(props: TabsProps) {
  return <SegmentedControl {...props} variant="default" />
}

export function PillTabs(props: TabsProps) {
  return <SegmentedControl {...props} variant="pills" />
}