
import React from 'react';
import { useThemeStore } from '../../store/themeStore';

interface Question {
  text: string;
  options: string[];
}

interface QuestionContentProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  selectedAnswer: number | undefined;
  onAnswerSelect: (index: number) => void;
}

export default function QuestionContent({
  question,
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect
}: QuestionContentProps) {
  const isDarkMode = useThemeStore(state => state.isDarkMode);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Select one answer
        </span>
      </div>
      
      <p className={`text-lg mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {question.text}
      </p>
      
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`w-full text-left p-4 rounded-lg border transition-colors ${
              selectedAnswer === index
                ? isDarkMode
                  ? 'border-indigo-500 bg-indigo-900 text-white'
                  : 'border-indigo-600 bg-indigo-50 text-gray-900'
                : isDarkMode
                  ? 'border-gray-600 hover:border-indigo-500 text-gray-300'
                  : 'border-gray-200 hover:border-indigo-600 text-gray-700'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                selectedAnswer === index
                  ? 'border-indigo-500'
                  : isDarkMode
                    ? 'border-gray-500'
                    : 'border-gray-300'
              }`}>
                {selectedAnswer === index && (
                  <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                )}
              </div>
              {option}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}