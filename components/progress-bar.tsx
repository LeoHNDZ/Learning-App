'use client'

import { ReactNode } from 'react'

interface ProgressBarProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'danger'
  showLabel?: boolean
  label?: string
  animated?: boolean
  className?: string
}

export function ProgressBar({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showLabel = false,
  label,
  animated = true,
  className = ''
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  }
  
  const variantClasses = {
    default: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500'
  }

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-muted-foreground">
            {label || 'Progress'}
          </span>
          <span className="text-sm font-medium">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className={`
        w-full bg-muted rounded-full overflow-hidden
        ${sizeClasses[size]}
      `}>
        <div
          className={`
            ${variantClasses[variant]} ${sizeClasses[size]} rounded-full
            transition-all duration-500 ease-out
            ${animated ? 'progress-bar' : ''}
          `}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || `Progress: ${Math.round(percentage)}%`}
        />
      </div>
    </div>
  )
}

interface StepProgressProps {
  steps: Array<{
    label: string
    completed: boolean
    current?: boolean
  }>
  className?: string
}

export function StepProgress({ steps, className = '' }: StepProgressProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {steps.map((step, index) => (
        <div key={index} className="flex items-center space-x-3">
          <div className={`
            w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
            transition-all duration-200
            ${step.completed 
              ? 'bg-green-500 text-white' 
              : step.current 
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }
          `}>
            {step.completed ? '✓' : index + 1}
          </div>
          <span className={`
            text-sm transition-colors duration-200
            ${step.completed 
              ? 'text-foreground font-medium' 
              : step.current 
                ? 'text-primary font-medium'
                : 'text-muted-foreground'
            }
          `}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  )
}

interface CircularProgressProps {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  variant?: 'default' | 'success' | 'warning' | 'danger'
  children?: ReactNode
  className?: string
}

export function CircularProgress({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  variant = 'default',
  children,
  className = ''
}: CircularProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const variantColors = {
    default: 'stroke-primary',
    success: 'stroke-green-500',
    warning: 'stroke-yellow-500',
    danger: 'stroke-red-500'
  }

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgb(var(--muted))"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className={variantColors[variant]}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.5s ease-in-out',
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {children || (
            <span className="text-lg font-semibold">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      </div>
    </div>
  )
}