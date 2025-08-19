'use client';

import { useState } from 'react';
import { Search, BookOpen, Code, Lightbulb, HelpCircle, Menu, X } from 'lucide-react';
import { CodeExplorer } from '@/components/code-explorer';
import { TutorialSection } from '@/components/tutorial-section';
import { ArchitectureDiagram } from '@/components/architecture-diagram';
import { QuizSection } from '@/components/quiz-section';
import { SearchComponent } from '@/components/search-component';

type ActiveSection = 'explorer' | 'tutorials' | 'diagrams' | 'quiz' | 'search';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('explorer');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'explorer' as const, label: 'Code Explorer', icon: Code },
    { id: 'tutorials' as const, label: 'Tutorials', icon: BookOpen },
    { id: 'diagrams' as const, label: 'Architecture', icon: Lightbulb },
    { id: 'quiz' as const, label: 'Quiz', icon: HelpCircle },
    { id: 'search' as const, label: 'Search', icon: Search },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'explorer':
        return <CodeExplorer />;
      case 'tutorials':
        return <TutorialSection />;
      case 'diagrams':
        return <ArchitectureDiagram />;
      case 'quiz':
        return <QuizSection />;
      case 'search':
        return <SearchComponent />;
      default:
        return <CodeExplorer />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Studio Learning App</h1>
                <p className="text-sm text-gray-600">Learn the LeoHNDZ/studio repository</p>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <nav className={`md:col-span-1 ${isMobileMenuOpen ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>
              <ul className="space-y-2">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setActiveSection(item.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                          activeSection === item.id
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-md">
              {renderActiveSection()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}