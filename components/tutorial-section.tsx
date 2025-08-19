'use client';

import { useState } from 'react';
import { BookOpen, ChevronRight, CheckCircle, Clock } from 'lucide-react';
import { tutorials, type Tutorial, type TutorialStep } from '@/lib/studio-data';

export function TutorialSection() {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const markStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const getDifficultyColor = (difficulty: Tutorial['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-700 border-red-200';
    }
  };

  if (selectedTutorial) {
    const step = selectedTutorial.steps[currentStep];
    const isStepComplete = completedSteps.includes(currentStep);

    return (
      <div className="p-6">
        <div className="mb-6">
          <button
            onClick={() => setSelectedTutorial(null)}
            className="text-blue-600 hover:text-blue-800 mb-4 flex items-center space-x-1"
          >
            <span>← Back to tutorials</span>
          </button>
          
          <div className="flex items-center space-x-3 mb-2">
            <h2 className="text-2xl font-bold text-gray-900">{selectedTutorial.title}</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(selectedTutorial.difficulty)}`}>
              {selectedTutorial.difficulty}
            </span>
          </div>
          <p className="text-gray-600">{selectedTutorial.description}</p>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm text-gray-600">
              {completedSteps.length} / {selectedTutorial.steps.length} completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedSteps.length / selectedTutorial.steps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Step navigation */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Steps</h3>
            <ul className="space-y-2">
              {selectedTutorial.steps.map((tutorialStep, index) => (
                <li key={index}>
                  <button
                    onClick={() => setCurrentStep(index)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      currentStep === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {completedSteps.includes(index) ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          currentStep === index ? 'border-blue-500' : 'border-gray-300'
                        }`} />
                      )}
                      <span className={`text-sm ${
                        currentStep === index ? 'font-medium text-blue-700' : 'text-gray-700'
                      }`}>
                        {index + 1}. {tutorialStep.title}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Step content */}
          <div className="lg:col-span-3">
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                {!isStepComplete && (
                  <button
                    onClick={() => markStepComplete(currentStep)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Mark Complete
                  </button>
                )}
              </div>

              <p className="text-gray-700 mb-4">{step.description}</p>

              {step.codeFile && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Related File:</h4>
                  <div className="bg-gray-100 p-3 rounded border">
                    <code className="text-sm text-blue-600">{step.codeFile}</code>
                  </div>
                </div>
              )}

              {step.codeHighlight && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Code Example:</h4>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
                    <code>{step.codeHighlight}</code>
                  </pre>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">Explanation:</h4>
                <p className="text-blue-800">{step.explanation}</p>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentStep(Math.min(selectedTutorial.steps.length - 1, currentStep + 1))}
                  disabled={currentStep === selectedTutorial.steps.length - 1}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <span>Tutorial Section</span>
        </h2>
        <p className="text-gray-600 mt-2">
          Step-by-step guides to understand key workflows and features
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <div
            key={tutorial.id}
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedTutorial(tutorial)}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">{tutorial.title}</h3>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            
            <p className="text-gray-600 mb-4">{tutorial.description}</p>
            
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(tutorial.difficulty)}`}>
                {tutorial.difficulty}
              </span>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{tutorial.steps.length} steps</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}