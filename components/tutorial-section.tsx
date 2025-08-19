'use client'

import { useState } from 'react'
import { BookOpen, ChevronRight, CheckCircle, Clock, ArrowLeft } from 'lucide-react'
import { tutorials, type Tutorial, type TutorialStep } from '@/lib/studio-data'
import { ModuleCard, TutorialCard } from './module-card'
import { ProgressBar, StepProgress } from './progress-bar'
import { Tabs } from './segmented-control'

export function TutorialSection() {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const markStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex])
    }
  }

  const getDifficultyBadge = (difficulty: Tutorial['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return { text: difficulty, variant: 'success' as const }
      case 'intermediate':
        return { text: difficulty, variant: 'warning' as const }
      case 'advanced':
        return { text: difficulty, variant: 'danger' as const }
    }
  }

  if (selectedTutorial) {
    const step = selectedTutorial.steps[currentStep]
    const isStepComplete = completedSteps.includes(currentStep)
    const progressPercentage = (completedSteps.length / selectedTutorial.steps.length) * 100

    const stepProgressData = selectedTutorial.steps.map((tutorialStep, index) => ({
      label: tutorialStep.title,
      completed: completedSteps.includes(index),
      current: currentStep === index
    }))

    return (
      <div className="container py-6">
        <div className="mb-6">
          <button
            onClick={() => setSelectedTutorial(null)}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to tutorials
          </button>
          
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground">{selectedTutorial.title}</h1>
                <span className={`
                  px-3 py-1 rounded-full text-xs font-medium
                  ${getDifficultyBadge(selectedTutorial.difficulty).variant === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : ''}
                  ${getDifficultyBadge(selectedTutorial.difficulty).variant === 'warning' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : ''}
                  ${getDifficultyBadge(selectedTutorial.difficulty).variant === 'danger' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : ''}
                `}>
                  {selectedTutorial.difficulty}
                </span>
              </div>
              <p className="text-muted-foreground text-lg">{selectedTutorial.description}</p>
            </div>
          </div>

          <ProgressBar
            value={completedSteps.length}
            max={selectedTutorial.steps.length}
            label="Overall Progress"
            showLabel
            animated
            className="mb-6"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Step navigation */}
          <div className="lg:col-span-1">
            <div className="modern-card p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Tutorial Steps
              </h3>
              <StepProgress steps={stepProgressData} />
            </div>
          </div>

          {/* Step content */}
          <div className="lg:col-span-3">
            <ModuleCard
              title={step.title}
              description={step.description}
              variant="glass"
              size="lg"
              interactive={false}
              className="mb-6"
            >
              {step.codeFile && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Related Code:</h4>
                  <code className="text-xs bg-muted px-2 py-1 rounded">{step.codeFile}</code>
                </div>
              )}
              
              {step.explanation && (
                <div className="mt-4 p-4 bg-accent/50 border border-accent rounded-lg">
                  <h4 className="text-sm font-semibold text-accent-foreground mb-2">Explanation:</h4>
                  <p className="text-sm text-accent-foreground">{step.explanation}</p>
                </div>
              )}
            </ModuleCard>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              <div className="flex gap-2">
                {!isStepComplete && (
                  <button
                    onClick={() => markStepComplete(currentStep)}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Mark Complete
                  </button>
                )}
                
                <button
                  onClick={() => setCurrentStep(Math.min(selectedTutorial.steps.length - 1, currentStep + 1))}
                  disabled={currentStep === selectedTutorial.steps.length - 1}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tutorial Section</h1>
            <p className="text-muted-foreground">Step-by-step guides to understand key workflows and features</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <TutorialCard
            key={tutorial.id}
            title={tutorial.title}
            description={tutorial.description}
            badge={getDifficultyBadge(tutorial.difficulty)}
            onClick={() => setSelectedTutorial(tutorial)}
            icon={BookOpen}
          >
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{tutorial.steps.length} steps</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                <span>Interactive</span>
              </div>
            </div>
          </TutorialCard>
        ))}
      </div>
    </div>
  )
}