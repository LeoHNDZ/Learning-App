'use client'

import { useState } from 'react'
import { Search, BookOpen, Code, Lightbulb, HelpCircle } from 'lucide-react'
import { NavigationBar } from '@/components/navigation-bar'
import { Sidebar } from '@/components/sidebar'
import { useKeyboardShortcuts } from '@/components/keyboard-shortcuts'
import { CodeExplorer } from '@/components/code-explorer'
import { TutorialSection } from '@/components/tutorial-section'
import { ArchitectureDiagram } from '@/components/architecture-diagram'
import { QuizSection } from '@/components/quiz-section'
import { SearchComponent } from '@/components/search-component'

type ActiveSection = 'explorer' | 'tutorials' | 'diagrams' | 'quiz' | 'search'

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('explorer')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    { id: 'explorer' as const, label: 'Code Explorer', icon: Code },
    { id: 'tutorials' as const, label: 'Tutorials', icon: BookOpen, badge: '4' },
    { id: 'diagrams' as const, label: 'Architecture', icon: Lightbulb },
    { id: 'quiz' as const, label: 'Quiz', icon: HelpCircle },
    { id: 'search' as const, label: 'Search', icon: Search },
  ]

  const keyboardShortcuts = [
    { key: '1', description: 'Code Explorer', action: () => setActiveSection('explorer') },
    { key: '2', description: 'Tutorials', action: () => setActiveSection('tutorials') },
    { key: '3', description: 'Architecture', action: () => setActiveSection('diagrams') },
    { key: '4', description: 'Quiz', action: () => setActiveSection('quiz') },
    { key: '5', description: 'Search', action: () => setActiveSection('search') },
    { key: '/', description: 'Focus search', action: () => setActiveSection('search') },
    { key: 'Escape', description: 'Close menu', action: () => setIsMobileMenuOpen(false) },
  ]

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'explorer':
        return <CodeExplorer />
      case 'tutorials':
        return <TutorialSection />
      case 'diagrams':
        return <ArchitectureDiagram />
      case 'quiz':
        return <QuizSection />
      case 'search':
        return <SearchComponent />
      default:
        return <CodeExplorer />
    }
  }

  const handleSectionChange = (section: string) => {
    setActiveSection(section as ActiveSection)
    setIsMobileMenuOpen(false)
  }

  const keyboardShortcutsComponent = useKeyboardShortcuts(keyboardShortcuts)

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar
          items={navigationItems}
          activeItem={activeSection}
          onItemSelect={handleSectionChange}
          isOpen={isMobileMenuOpen}
        />
        
        <main 
          id="main-content"
          className="flex-1 overflow-auto"
          role="main"
          aria-label="Main content"
        >
          <div className="container py-6">
            <div className="fade-in">
              {renderActiveSection()}
            </div>
          </div>
        </main>
      </div>

      {keyboardShortcutsComponent}
    </div>
  )
}