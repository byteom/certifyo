import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lightbulb, Loader2, Plus, Minus, AlertTriangle } from 'lucide-react';

interface CustomQuizFormProps {
  isDarkMode: boolean;
  disabled: boolean;
}

export default function CustomQuizForm({ isDarkMode, disabled }: CustomQuizFormProps) {
  const router = useRouter();
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionCount, setQuestionCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (disabled) {
      setError('Please add your Groq API key in your profile settings first.');
      return;
    }

    if (!topic.trim()) {
      setError('Please enter a topic for your quiz.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // In a real implementation, we would make an API call to generate the quiz
      // For now, we'll just simulate a delay and redirect
      setTimeout(() => {
        router.push(`/quiz/custom?topic=${encodeURIComponent(topic)}&difficulty=${difficulty}&count=${questionCount}`);
      }, 1000);
    } catch {
      setError('Failed to generate quiz. Please try again.');
      setIsLoading(false);
    }
  };

  const decrementCount = () => {
    if (questionCount > 5) {
      setQuestionCount(questionCount - 5);
    }
  };

  const incrementCount = () => {
    if (questionCount < 25) {
      setQuestionCount(questionCount + 5);
    }
  };

  return (
    <div className={`max-w-2xl mx-auto ${disabled ? 'opacity-70' : ''}`}>
      <div className={`p-8 rounded-xl shadow-lg ${
        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <div className="flex items-center mb-6">
          <div className={`p-3 rounded-full ${
            isDarkMode ? 'bg-indigo-900/50' : 'bg-indigo-100'
          } mr-4`}>
            <Lightbulb className={`h-6 w-6 ${
              isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
            }`} />
          </div>
          <h2 className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Create Custom Quiz
          </h2>
        </div>

        {disabled && (
          <div className={`mb-6 p-4 rounded-lg flex items-start ${
            isDarkMode ? 'bg-yellow-900/20 border border-yellow-800/30' : 'bg-yellow-50 border border-yellow-200'
          }`}>
            <AlertTriangle className={`h-5 w-5 mr-3 mt-0.5 ${
              isDarkMode ? 'text-yellow-400' : 'text-yellow-500'
            }`} />
            <div>
              <p className={`font-medium ${
                isDarkMode ? 'text-yellow-400' : 'text-yellow-700'
              }`}>
                API Key Required
              </p>
              <p className={`text-sm ${
                isDarkMode ? 'text-yellow-300/80' : 'text-yellow-600'
              }`}>
                Please add your Groq API key in your profile settings to generate custom quizzes.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="topic" 
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Quiz Topic
            </label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic (e.g., JavaScript Basics, World History, Machine Learning)"
              className={`w-full px-4 py-3 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'border-gray-300 placeholder-gray-400'
              } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
              disabled={disabled || isLoading}
            />
          </div>

          <div>
            <label 
              htmlFor="difficulty" 
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Difficulty Level
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'
              } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
              disabled={disabled || isLoading}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div>
            <label 
              htmlFor="questionCount" 
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Number of Questions
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={decrementCount}
                className={`p-2 rounded-l-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
                    : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                } focus:outline-none`}
                disabled={questionCount <= 5 || disabled || isLoading}
              >
                <Minus className="h-5 w-5" />
              </button>
              <div 
                className={`px-4 py-2 w-16 text-center border-t border-b ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-700'
                }`}
              >
                {questionCount}
              </div>
              <button
                type="button"
                onClick={incrementCount}
                className={`p-2 rounded-r-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
                    : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                } focus:outline-none`}
                disabled={questionCount >= 25 || disabled || isLoading}
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <p className={`mt-1 text-xs ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Choose between 5 and 25 questions
            </p>
          </div>

          {error && (
            <div className={`p-3 rounded-lg ${
              isDarkMode ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-600'
            }`}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium ${
              disabled || isLoading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            } transition-colors`}
            disabled={disabled || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Generating Quiz...
              </>
            ) : (
              <>
                <Lightbulb className="h-5 w-5 mr-2" />
                Generate AI Quiz
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}