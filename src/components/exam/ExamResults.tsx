"use client"
// import React from 'react';

import { useThemeStore } from '../../store/themeStore';
import  { useRouter } from 'next/navigation';


interface ExamResultsProps {
  score: number;
  totalQuestions: number;
  passingScore: number;
  certificate?: string;
}

export default function ExamResults({ score, totalQuestions, passingScore, certificate }: ExamResultsProps) {
  const isDarkMode = useThemeStore(state => state.isDarkMode);
  
  const router=useRouter();
  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = percentage >= passingScore;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-12`}>
      <div className="max-w-3xl mx-auto px-4">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-8`}>
          <h2 className={`text-2xl font-bold text-center mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Exam Results
          </h2>
          <div className="text-center">
            <div className={`text-4xl font-bold mb-4 ${passed ? 'text-green-500' : 'text-red-500'}`}>
              {percentage}%
            </div>
            <p className={`text-xl mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {passed ? 'Congratulations! You passed!' : 'Unfortunately, you did not pass.'}
            </p>
            <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              You answered {score} out of {totalQuestions} questions correctly.
            </p>
            {certificate && (
              <div className="mb-6">
                <p className="text-green-500 mb-2">Your certificate has been generated!</p>
                <a
                  href={certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-500 hover:text-indigo-600 underline"
                >
                  View Certificate
                </a>
              </div>
            )}
            <button
            
              onClick={() => router.push('/subjects')}

              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
            >
              Return to Subjects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}