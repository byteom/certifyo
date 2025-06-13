'use client';

import React, { useState } from 'react';
import { useThemeStore } from '@/store/themeStore';
import { Code, Filter } from 'lucide-react';
import Link from 'next/link';

// Temporary mock data - will be replaced with actual data later
const mockQuestions = [
  {
    id: '1',
    title: 'Create a React Counter Component',
    description: 'Build a simple counter component with increment and decrement functionality.',
    category: 'react',
    difficulty: 'easy',
  },
  {
    id: '2',
    title: 'Implement Todo List',
    description: 'Create a todo list application with add, delete, and mark as complete features.',
    category: 'react',
    difficulty: 'medium',
  },
  // Add more mock questions as needed
];

const categories = ['All', 'React', 'JavaScript', 'HTML', 'CSS'];

export default function WebDevPage() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredQuestions = selectedCategory === 'All'
    ? mockQuestions
    : mockQuestions.filter(q => q.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <h1 className={`text-3xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Web Development Practice
        </h1>
        <p className={`text-lg ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Practice your web development skills with hands-on coding challenges
        </p>
      </div>

      {/* Filter Section */}
      <div className="flex items-center space-x-4">
        <Filter className={`h-5 w-5 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`} />
        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? isDarkMode
                    ? 'bg-indigo-600 text-white'
                    : 'bg-indigo-600 text-white'
                  : isDarkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuestions.map((question) => (
          <Link
            key={question.id}
            href={`/practice/web-dev/${question.category}/${question.id}`}
            className={`p-6 rounded-lg border transition-all duration-200 ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700 hover:border-indigo-500'
                : 'bg-white border-gray-200 hover:border-indigo-500'
            }`}
          >
            <div className="flex items-center space-x-2 mb-4">
              <Code className={`h-5 w-5 ${
                isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
              }`} />
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
              }`}>
                {question.category.toUpperCase()}
              </span>
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {question.title}
            </h3>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {question.description}
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className={`text-xs px-2 py-1 rounded-full ${
                question.difficulty === 'easy'
                  ? isDarkMode
                    ? 'bg-green-900/50 text-green-400'
                    : 'bg-green-100 text-green-800'
                  : question.difficulty === 'medium'
                  ? isDarkMode
                    ? 'bg-yellow-900/50 text-yellow-400'
                    : 'bg-yellow-100 text-yellow-800'
                  : isDarkMode
                    ? 'bg-red-900/50 text-red-400'
                    : 'bg-red-100 text-red-800'
              }`}>
                {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 