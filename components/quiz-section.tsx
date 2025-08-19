'use client';

import { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';
import { quizQuestions, type QuizQuestion } from '@/lib/studio-data';

type QuizState = {
  currentQuestion: number;
  selectedAnswers: { [key: number]: number };
  showResults: boolean;
  score: number;
  completed: boolean;
};

export function QuizSection() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    selectedAnswers: {},
    showResults: false,
    score: 0,
    completed: false,
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(quizQuestions.map(q => q.category)))];
  
  const filteredQuestions = selectedCategory === 'all' 
    ? quizQuestions 
    : quizQuestions.filter(q => q.category === selectedCategory);

  const currentQuestion = filteredQuestions[quizState.currentQuestion];
  const isLastQuestion = quizState.currentQuestion === filteredQuestions.length - 1;

  const selectAnswer = (answerIndex: number) => {
    setQuizState(prev => ({
      ...prev,
      selectedAnswers: {
        ...prev.selectedAnswers,
        [prev.currentQuestion]: answerIndex
      }
    }));
  };

  const nextQuestion = () => {
    if (isLastQuestion) {
      // Calculate final score
      const correct = filteredQuestions.reduce((count, question, index) => {
        const selectedAnswer = quizState.selectedAnswers[index];
        return selectedAnswer === question.correctAnswer ? count + 1 : count;
      }, 0);

      setQuizState(prev => ({
        ...prev,
        score: correct,
        showResults: true,
        completed: true
      }));
    } else {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    }
  };

  const previousQuestion = () => {
    setQuizState(prev => ({
      ...prev,
      currentQuestion: Math.max(0, prev.currentQuestion - 1)
    }));
  };

  const resetQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      selectedAnswers: {},
      showResults: false,
      score: 0,
      completed: false,
    });
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'Excellent! You have a great understanding of the studio repository.';
    if (percentage >= 60) return 'Good job! You understand most concepts, but could review a few areas.';
    return 'Keep studying! Review the tutorials and code explorer to improve your understanding.';
  };

  if (quizState.showResults) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-yellow-600" />
            <span>Quiz Results</span>
          </h2>
        </div>

        <div className="bg-white border rounded-lg p-6 text-center">
          <div className="mb-6">
            <div className={`text-4xl font-bold ${getScoreColor(quizState.score, filteredQuestions.length)} mb-2`}>
              {quizState.score} / {filteredQuestions.length}
            </div>
            <div className="text-lg text-gray-600">
              {Math.round((quizState.score / filteredQuestions.length) * 100)}% Correct
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-700">
              {getScoreMessage(quizState.score, filteredQuestions.length)}
            </p>
          </div>

          {/* Detailed Results */}
          <div className="text-left mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Review:</h3>
            <div className="space-y-4">
              {filteredQuestions.map((question, index) => {
                const selectedAnswer = quizState.selectedAnswers[index];
                const isCorrect = selectedAnswer === question.correctAnswer;
                
                return (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          {index + 1}. {question.question}
                        </h4>
                        <div className="text-sm space-y-1">
                          <div className={`${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                            Your answer: {question.options[selectedAnswer]}
                          </div>
                          {!isCorrect && (
                            <div className="text-green-700">
                              Correct answer: {question.options[question.correctAnswer]}
                            </div>
                          )}
                          <div className="text-gray-600 mt-2 p-2 bg-gray-50 rounded">
                            {question.explanation}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <HelpCircle className="w-6 h-6 text-blue-600" />
          <span>Knowledge Quiz</span>
        </h2>
        <p className="text-gray-600 mt-2">
          Test your understanding of the studio repository
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Category:</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                resetQuiz();
              }}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-100 text-blue-700 border-blue-200'
                  : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All Categories' : category}
            </button>
          ))}
        </div>
      </div>

      {currentQuestion && (
        <div className="bg-white border rounded-lg p-6">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                Question {quizState.currentQuestion + 1} of {filteredQuestions.length}
              </span>
              <span className="text-sm text-gray-600">
                Category: {currentQuestion.category}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((quizState.currentQuestion + 1) / filteredQuestions.length) * 100}%`
                }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {currentQuestion.question}
            </h3>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = quizState.selectedAnswers[quizState.currentQuestion] === index;
                
                return (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    className={`w-full text-left p-4 border rounded-lg transition-colors ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                      }`}>
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <span className="text-gray-900">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={previousQuestion}
              disabled={quizState.currentQuestion === 0}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <button
              onClick={nextQuestion}
              disabled={quizState.selectedAnswers[quizState.currentQuestion] === undefined}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}