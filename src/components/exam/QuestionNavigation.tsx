import React from 'react';
import { useThemeStore } from '../../store/themeStore';

interface QuestionNavigationProps {
  totalQuestions: number;
  currentQuestion: number;
  answers: number[];
  onQuestionSelect: (index: number) => void;
}

export default function QuestionNavigation({ 
  totalQuestions, 
  currentQuestion, 
  answers, 
  onQuestionSelect 
}: QuestionNavigationProps) {
  const isDarkMode = useThemeStore(state => state.isDarkMode);

  return (
    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Questions
      </h3>
      <div className="grid grid-cols-5 gap-2">
        {[...Array(totalQuestions)].map((_, index) => (
          <button
            key={index}
            onClick={() => onQuestionSelect(index)}
            className={`p-2 rounded-md text-center ${
              currentQuestion === index
                ? 'bg-indigo-600 text-white'
                : answers[index] !== undefined
                ? isDarkMode
                  ? 'bg-gray-600 text-white'
                  : 'bg-indigo-100 text-indigo-600'
                : isDarkMode
                ? 'bg-gray-800 text-gray-300'
                : 'bg-white text-gray-600'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-indigo-600 mr-2"></div>
          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Current</span>
        </div>
        <div className="flex items-center">
          <div className={`w-4 h-4 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-indigo-100'} mr-2`}></div>
          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Answered</span>
        </div>
        <div className="flex items-center">
          <div className={`w-4 h-4 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border mr-2`}></div>
          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Unanswered</span>
        </div>
      </div>
    </div>
  );
}