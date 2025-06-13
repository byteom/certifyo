'use client';

import React from 'react';
import { useThemeStore } from '@/store/themeStore';
import { Construction } from 'lucide-react';

export default function DSAPage() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div className={`min-h-[calc(100vh-8rem)] flex items-center justify-center ${
      isDarkMode ? 'text-gray-300' : 'text-gray-600'
    }`}>
      <div className="flex flex-col items-center space-y-4">
        <Construction className={`w-16 h-16 ${
          isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
        }`} />
        <h1 className={`text-3xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          DSA Section Under Construction
        </h1>
        <p className={`text-lg ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Data Structures and Algorithms challenges Coming Soon!
        </p>
      </div>
    </div>
  );
} 