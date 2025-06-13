'use client';

import React from 'react';
import { useThemeStore } from '@/store/themeStore';

export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
} 