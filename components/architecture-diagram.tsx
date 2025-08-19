'use client';

import { useState } from 'react';
import { Lightbulb, ArrowRight, Database, Globe, Layers, Code, Cpu } from 'lucide-react';

export function ArchitectureDiagram() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const components = [
    {
      id: 'frontend',
      name: 'Frontend Layer',
      icon: Globe,
      color: 'bg-blue-500',
      description: 'Next.js application with React components',
      details: [
        'Next.js 15 with App Router',
        'React 18 with hooks',
        'TypeScript for type safety',
        'Tailwind CSS for styling',
        'Responsive design'
      ],
      position: { top: '10%', left: '20%' }
    },
    {
      id: 'components',
      name: 'UI Components',
      icon: Layers,
      color: 'bg-green-500',
      description: 'Reusable React components for the interface',
      details: [
        'Composer Canvas for editing',
        'Ticket List for management',
        'Text Editor Overlay',
        'Radix UI primitives',
        'Custom styled components'
      ],
      position: { top: '10%', left: '60%' }
    },
    {
      id: 'logic',
      name: 'Business Logic',
      icon: Cpu,
      color: 'bg-purple-500',
      description: 'Core application logic and state management',
      details: [
        'React hooks for state',
        'Event handling',
        'Canvas manipulation',
        'Text positioning logic',
        'Auto-save functionality'
      ],
      position: { top: '40%', left: '40%' }
    },
    {
      id: 'data',
      name: 'Data Layer',
      icon: Database,
      color: 'bg-orange-500',
      description: 'Repository pattern for data management',
      details: [
        'Repository pattern implementation',
        'Local storage adapter',
        'API adapter (future)',
        'Composition persistence',
        'Data validation'
      ],
      position: { top: '70%', left: '20%' }
    },
    {
      id: 'autocomplete',
      name: 'Autocomplete System',
      icon: Code,
      color: 'bg-red-500',
      description: 'Intelligent phrase extraction and suggestions',
      details: [
        'N-gram phrase extraction',
        'Frequency and recency scoring',
        'Exponential decay algorithm',
        'Real-time suggestions',
        'Phrase caching'
      ],
      position: { top: '70%', left: '60%' }
    }
  ];

  const connections = [
    { from: 'frontend', to: 'components' },
    { from: 'frontend', to: 'logic' },
    { from: 'components', to: 'logic' },
    { from: 'logic', to: 'data' },
    { from: 'logic', to: 'autocomplete' },
    { from: 'data', to: 'autocomplete' }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <Lightbulb className="w-6 h-6 text-blue-600" />
          <span>Architecture & Data Flow</span>
        </h2>
        <p className="text-gray-600 mt-2">
          Visual representation of the studio repository's architecture
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Architecture Diagram */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-lg p-6 relative" style={{ height: '500px' }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Architecture</h3>
            
            {/* Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              {connections.map((connection, index) => {
                const fromComponent = components.find(c => c.id === connection.from);
                const toComponent = components.find(c => c.id === connection.to);
                
                if (!fromComponent || !toComponent) return null;
                
                const fromX = parseFloat(fromComponent.position.left) + 10; // Center adjustment
                const fromY = parseFloat(fromComponent.position.top) + 5;
                const toX = parseFloat(toComponent.position.left) + 10;
                const toY = parseFloat(toComponent.position.top) + 5;
                
                return (
                  <line
                    key={index}
                    x1={`${fromX}%`}
                    y1={`${fromY}%`}
                    x2={`${toX}%`}
                    y2={`${toY}%`}
                    stroke="#6B7280"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity="0.6"
                  />
                );
              })}
            </svg>

            {/* Components */}
            {components.map((component) => {
              const IconComponent = component.icon;
              const isSelected = selectedComponent === component.id;
              
              return (
                <div
                  key={component.id}
                  className={`absolute cursor-pointer transition-all duration-200 ${
                    isSelected ? 'scale-110 z-10' : 'z-20'
                  }`}
                  style={{
                    top: component.position.top,
                    left: component.position.left,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => setSelectedComponent(
                    selectedComponent === component.id ? null : component.id
                  )}
                >
                  <div className={`${component.color} ${
                    isSelected ? 'ring-4 ring-blue-300' : ''
                  } rounded-lg p-4 text-white shadow-lg hover:shadow-xl transition-shadow min-w-32 text-center`}>
                    <IconComponent className="w-8 h-8 mx-auto mb-2" />
                    <h4 className="text-sm font-semibold">{component.name}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Component Details */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-lg p-6">
            {selectedComponent ? (
              (() => {
                const component = components.find(c => c.id === selectedComponent);
                if (!component) return null;
                
                const IconComponent = component.icon;
                
                return (
                  <>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`${component.color} rounded-lg p-2`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{component.name}</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{component.description}</p>
                    
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {component.details.map((detail, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <ArrowRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                );
              })()
            ) : (
              <div className="text-center">
                <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Component</h3>
                <p className="text-gray-600">
                  Click on any component in the diagram to see detailed information about its role in the system.
                </p>
              </div>
            )}
          </div>
          
          {/* Data Flow Explanation */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">Data Flow Overview:</h4>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. User interacts with UI components</li>
              <li>2. Business logic processes events</li>
              <li>3. Data layer persists changes</li>
              <li>4. Autocomplete system provides suggestions</li>
              <li>5. UI updates reflect new state</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Technology Stack</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Next.js 15', category: 'Framework', color: 'bg-black' },
            { name: 'React 18', category: 'Library', color: 'bg-blue-600' },
            { name: 'TypeScript', category: 'Language', color: 'bg-blue-700' },
            { name: 'Tailwind CSS', category: 'Styling', color: 'bg-teal-600' },
            { name: 'Radix UI', category: 'Components', color: 'bg-purple-600' },
            { name: 'Vitest', category: 'Testing', color: 'bg-green-600' },
            { name: 'GenKit AI', category: 'AI Features', color: 'bg-orange-600' },
            { name: 'Firebase', category: 'Hosting', color: 'bg-yellow-600' },
          ].map((tech) => (
            <div key={tech.name} className="border rounded-lg p-3 text-center">
              <div className={`${tech.color} text-white text-xs px-2 py-1 rounded mb-2 inline-block`}>
                {tech.category}
              </div>
              <h4 className="text-sm font-semibold text-gray-900">{tech.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}