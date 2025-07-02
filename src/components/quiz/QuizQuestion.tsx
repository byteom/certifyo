import React from 'react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: number | undefined;
  onSelectAnswer: (index: number) => void;
  isDarkMode: boolean;
}

export default function QuizQuestion({ 
  question, 
  selectedAnswer, 
  onSelectAnswer,
  isDarkMode
}: QuizQuestionProps) {
  return (
    <div className={`p-8 rounded-xl shadow-lg ${
      isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    }`}>
      <h3 className={`text-xl font-bold mb-6 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        {question.text}
      </h3>
      
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(index)}
            className={`w-full text-left p-4 rounded-lg border transition-colors ${
              selectedAnswer === index
                ? isDarkMode
                  ? 'border-indigo-500 bg-indigo-900/30 text-white'
                  : 'border-indigo-600 bg-indigo-50 text-gray-900'
                : isDarkMode
                  ? 'border-gray-700 hover:border-indigo-500/70 hover:bg-gray-700/50 text-gray-300'
                  : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50 text-gray-700'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                selectedAnswer === index
                  ? 'border-indigo-500'
                  : isDarkMode
                    ? 'border-gray-600'
                    : 'border-gray-300'
              }`}>
                {selectedAnswer === index && (
                  <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                )}
              </div>
              <span>{option}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}