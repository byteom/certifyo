import React from 'react';
import { useRouter } from 'next/navigation';
import { Brain, ArrowRight, Lock } from 'lucide-react';
import { Subject } from '@/types';
import Image from 'next/image';

interface SubjectQuizCardProps {
  subject: Subject;
  isDarkMode: boolean;
  disabled: boolean;
}

export default function SubjectQuizCard({ subject, isDarkMode, disabled }: SubjectQuizCardProps) {
  const router = useRouter();

  const handleStartQuiz = () => {
    if (disabled) return;
    router.push(`/quiz/${subject.id}`);
  };

  return (
    <div
      className={`rounded-xl overflow-hidden border transition-all duration-300 ${
        disabled
          ? `${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-100/50 border-gray-200'} opacity-70`
          : `${
              isDarkMode
                ? 'bg-gray-800 border-gray-700 hover:border-indigo-500'
                : 'bg-white border-gray-200 hover:border-indigo-400'
            } hover:shadow-lg cursor-pointer`
      }`}
      onClick={handleStartQuiz}
    >
      <div className="h-40 overflow-hidden relative">
        <Image
          src={subject.image}
          alt={subject.name}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h3 className="text-xl font-bold text-white">{subject.name}</h3>
        </div>
      </div>

      <div className="p-5">
        <p className={`mb-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {subject.description}
        </p>

        <div className="flex justify-between items-center">
          <div className={`flex items-center ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
            <Brain className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">AI Quiz</span>
          </div>

          {disabled ? (
            <div className="flex items-center text-sm text-gray-500">
              <Lock className="h-4 w-4 mr-1" />
              <span>API Key Required</span>
            </div>
          ) : (
            <button
              className={`flex items-center text-sm font-medium ${
                isDarkMode
                  ? 'text-indigo-400 hover:text-indigo-300'
                  : 'text-indigo-600 hover:text-indigo-800'
              } transition-colors group`}
            >
              Start Quiz
              <ArrowRight className="ml-1 h-4 w-4 transform transition-transform duration-150 ease-in-out group-hover:translate-x-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}