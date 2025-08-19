'use client'

import { ReactNode } from 'react'
import { LucideIcon, ChevronRight } from 'lucide-react'

interface ModuleCardProps {
  title: string
  description: string
  icon?: LucideIcon
  badge?: {
    text: string
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  }
  onClick?: () => void
  children?: ReactNode
  className?: string
  variant?: 'default' | 'glass' | 'bordered'
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
}

export function ModuleCard({
  title,
  description,
  icon: Icon,
  badge,
  onClick,
  children,
  className = '',
  variant = 'default',
  size = 'md',
  interactive = true
}: ModuleCardProps) {
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  const variantClasses = {
    default: 'modern-card',
    glass: 'glass rounded-2xl',
    bordered: 'border-2 rounded-2xl bg-card hover:border-primary/50'
  }

  const badgeVariantClasses = {
    default: 'bg-muted text-muted-foreground',
    success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
  }

  const CardComponent = onClick ? 'button' : 'div'

  return (
    <CardComponent
      className={`
        ${variantClasses[variant]} ${sizeClasses[size]}
        ${onClick && interactive ? 'cursor-pointer' : ''}
        ${onClick && interactive ? 'hover:shadow-lg hover:-translate-y-1' : ''}
        transition-all duration-200 text-left w-full
        ${className}
      `}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          {Icon && (
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-foreground truncate pr-2">
                {title}
              </h3>
              {badge && (
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap
                  ${badgeVariantClasses[badge.variant || 'default']}
                `}>
                  {badge.text}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
            {children && (
              <div className="mt-4">
                {children}
              </div>
            )}
          </div>
        </div>
        {onClick && interactive && (
          <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 ml-2" />
        )}
      </div>
    </CardComponent>
  )
}

// Specialized card variants
export function TutorialCard(props: Omit<ModuleCardProps, 'variant'>) {
  return <ModuleCard {...props} variant="glass" />
}

export function FeatureCard(props: Omit<ModuleCardProps, 'variant'>) {
  return <ModuleCard {...props} variant="bordered" />
}