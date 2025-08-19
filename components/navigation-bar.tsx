'use client'

import { useState } from 'react'
import { Menu, X, Code, GraduationCap } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'

interface NavigationBarProps {
  onMobileMenuToggle: () => void
  isMobileMenuOpen: boolean
}

export function NavigationBar({ onMobileMenuToggle, isMobileMenuOpen }: NavigationBarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80">
              <Code className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold leading-tight tracking-tight">
                Studio Learning App
              </h1>
              <p className="text-xs text-muted-foreground">
                Interactive code exploration
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="flex md:hidden items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
                <GraduationCap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">Learning App</span>
            </div>
          </div>
          
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            <button
              className="inline-flex items-center justify-center rounded-lg w-9 h-9 hover:bg-muted transition-colors md:hidden"
              onClick={onMobileMenuToggle}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}